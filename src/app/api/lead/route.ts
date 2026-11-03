import { NextResponse } from "next/server";
import sharp from "sharp";

export const runtime = "nodejs";

const MAX_REQUEST_BYTES = 4_300_000;
const MAX_PHOTOS = 3;
const MAX_FILE_BYTES = 1_300_000;
const MAX_TOTAL_PHOTO_BYTES = 3_700_000;
const MAX_PIXELS = 20_000_000;
const safeString = (value: FormDataEntryValue | null, max = 250) =>
  typeof value === "string" ? value.trim().slice(0, max).replace(/[\r\n\x00-\x1f]/g, " ") : "";

function fail(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status, headers: { "Cache-Control": "no-store" } });
}

/** Do not trust MIME or extension: validate signature AND real decoder output. */
function matchesMagic(bytes: Buffer, mime: string) {
  if (mime === "image/jpeg") {
    return bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  }
  if (mime === "image/png") {
    return bytes.length >= 8 && bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  }
  if (mime === "image/webp") {
    return bytes.length >= 12 && bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WEBP";
  }
  return false;
}

async function safePhoto(file: File, index: number) {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size < 50 || file.size > MAX_FILE_BYTES) {
    throw new Error(`Photo ${index + 1} is not an allowed JPG, PNG or WebP under 1.3 MB.`);
  }

  const input = Buffer.from(await file.arrayBuffer());
  if (!matchesMagic(input, file.type)) throw new Error(`Photo ${index + 1} has invalid image data.`);

  let metadata;
  try {
    metadata = await sharp(input, { failOn: "warning", limitInputPixels: MAX_PIXELS, pages: 1 }).metadata();
  } catch {
    throw new Error(`Photo ${index + 1} could not be read safely.`);
  }

  const allowedFormats: Record<string, string> = {
    "image/jpeg": "jpeg",
    "image/png": "png",
    "image/webp": "webp",
  };
  if (
    metadata.format !== allowedFormats[file.type] ||
    !metadata.width ||
    !metadata.height ||
    metadata.width * metadata.height > MAX_PIXELS ||
    (metadata.pages ?? 1) > 1
  ) {
    throw new Error(`Photo ${index + 1} has invalid dimensions or encoding.`);
  }

  // Decode and create brand-new JPEG pixel data: no uploaded original, EXIF,
  // embedded metadata, executable payloads, user filenames, or public links.
  let clean: Buffer;
  try {
    clean = await sharp(input, { failOn: "warning", limitInputPixels: MAX_PIXELS, pages: 1 })
      .rotate()
      .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
      .flatten({ background: "#ffffff" })
      .jpeg({ quality: 77, mozjpeg: true })
      .toBuffer();
  } catch {
    throw new Error(`Photo ${index + 1} failed image safety processing.`);
  }
  if (clean.length > 1_600_000) throw new Error(`Photo ${index + 1} is too large after processing.`);
  return {
    filename: `project-photo-${index + 1}.jpg`,
    content: clean.toString("base64"),
    content_type: "image/jpeg",
  };
}

export async function POST(request: Request) {
  const size = Number(request.headers.get("content-length") || "0");
  if (size > MAX_REQUEST_BYTES) return fail("Photos exceed the request limit. Choose fewer or smaller images.", 413);

  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return fail("Invalid request origin.", 403);
  if (!(request.headers.get("content-type") || "").startsWith("multipart/form-data")) {
    return fail("Invalid request encoding.");
  }

  if (!process.env.TURNSTILE_SECRET_KEY || !process.env.RESEND_API_KEY || !process.env.LEAD_FROM_EMAIL) {
    return fail("Online submissions are not configured yet. Please call Val at (239) 848-8290.", 503);
  }

  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return fail("Unable to read the request. Please use fewer or smaller photos.", 400);
  }

  if (safeString(data.get("website"))) {
    // Honeypot: don't confirm to automated senders that they were detected.
    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  }

  const name = safeString(data.get("name"), 100);
  const email = safeString(data.get("email"), 200);
  const phone = safeString(data.get("phone"), 35);
  const city = safeString(data.get("city"), 100);
  const kind = safeString(data.get("kind"), 20);

  if (
    name.length < 2 ||
    !/^\S+@\S+\.\S+$/.test(email) ||
    !/^[0-9+() .-]{7,35}$/.test(phone) ||
    !city ||
    !["estimate", "sod-order"].includes(kind)
  ) return fail("Please complete the required contact fields.");

  const photoEntries = data.getAll("photos");
  if (photoEntries.length > MAX_PHOTOS || (kind !== "estimate" && photoEntries.length > 0)) {
    return fail("Up to three photos are permitted for estimate inquiries only.");
  }
  let total = 0;
  for (const entry of photoEntries) {
    if (!(entry instanceof File)) return fail("Attachments must be image files.");
    total += entry.size;
    if (total > MAX_TOTAL_PHOTO_BYTES) return fail("Combined photos exceed the upload limit.", 413);
  }

  const token = safeString(data.get("cf-turnstile-response"), 4096);
  if (!token) return fail("Please complete the spam protection check.");
  try {
    const verification = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({ secret: process.env.TURNSTILE_SECRET_KEY, response: token }),
      signal: AbortSignal.timeout(8_000),
    });
    const result: { success?: boolean } = await verification.json();
    if (!verification.ok || !result.success) return fail("Security verification failed. Please try again.", 403);
  } catch {
    return fail("Unable to verify the security check. Please try again.", 503);
  }

  const attachments = [];
  for (const [index, entry] of photoEntries.entries()) {
    try {
      attachments.push(await safePhoto(entry as File, index));
    } catch (error) {
      return fail(error instanceof Error ? error.message : "Unable to process an uploaded photo.");
    }
  }

  const fields = [
    ["Type", kind],
    ["Name", name],
    ["Email", email],
    ["Phone", phone],
    ["City", city],
    ["Service", safeString(data.get("service"), 100)],
    ["Sod variety", safeString(data.get("product"), 100)],
    ["Quantity", safeString(data.get("quantity"), 20)],
    ["Fulfillment", safeString(data.get("fulfillment"), 100)],
    ["Project", safeString(data.get("message"), 2400)],
    ["Photos", String(attachments.length) + " sanitized JPEG attachments"],
  ];
  const text = fields.map(([label, value]) => `${label}: ${value}`).join("\n");

  try {
    const sent = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + process.env.RESEND_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.LEAD_FROM_EMAIL,
        to: ["expressturfrenovation@gmail.com"],
        cc: ["admin@vimu.net"],
        reply_to: email,
        subject: `[sodandsoil.com] ${kind} — ${city}`,
        text,
        attachments,
      }),
      signal: AbortSignal.timeout(20_000),
    });
    if (!sent.ok) return fail("Email could not be delivered. Please call Val at (239) 848-8290.", 502);
  } catch {
    return fail("Email service is temporarily unavailable. Please call (239) 848-8290.", 503);
  }

  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}
