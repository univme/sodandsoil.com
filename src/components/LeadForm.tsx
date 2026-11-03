"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import Script from "next/script";

type Kind = "estimate" | "sod-order";
const MAX_PHOTOS = 3;
const MAX_PHOTO_SIZE = 1_200_000;
const MAX_TOTAL_SIZE = 3_500_000;
const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

/** Converts local photos into new, metadata-free JPEGs before upload. Server revalidates them. */
async function preparePhoto(file: File, index: number): Promise<File> {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    throw new Error("Only JPG, PNG, and WebP project photos are accepted.");
  }
  if (file.size > 12 * 1024 * 1024) {
    throw new Error("Please select a photo smaller than 12 MB.");
  }

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    throw new Error("This photo could not be read. Please choose a JPG, PNG, or WebP image.");
  }

  try {
    if (bitmap.width * bitmap.height > 40_000_000) {
      throw new Error("This image is too large. Please resize it before uploading.");
    }
    const canvas = document.createElement("canvas");
    let maxSide = 1600;

    async function encode(maxPixels: number, quality: number): Promise<Blob> {
      const ratio = Math.min(1, maxPixels / Math.max(bitmap.width, bitmap.height));
      canvas.width = Math.max(1, Math.round(bitmap.width * ratio));
      canvas.height = Math.max(1, Math.round(bitmap.height * ratio));
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Your browser cannot process this image.");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      return new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (blob) => blob ? resolve(blob) : reject(new Error("Photo conversion failed.")),
          "image/jpeg",
          quality
        );
      });
    }

    let jpeg = await encode(maxSide, 0.78);
    if (jpeg.size > MAX_PHOTO_SIZE) {
      maxSide = 1200;
      jpeg = await encode(maxSide, 0.65);
    }
    if (jpeg.size > MAX_PHOTO_SIZE) {
      throw new Error("This photo could not be compressed enough. Try a smaller image.");
    }
    return new File([jpeg], `project-photo-${index + 1}.jpg`, { type: "image/jpeg" });
  } finally {
    bitmap.close();
  }
}

export default function LeadForm({ kind = "estimate" }: { kind?: Kind }) {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [photoCount, setPhotoCount] = useState(0);
  const enabled = Boolean(siteKey);

  const onPhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const count = event.currentTarget.files?.length ?? 0;
    setPhotoCount(count);
    setStatus(count > MAX_PHOTOS ? `Please select no more than ${MAX_PHOTOS} photos.` : "");
  };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!enabled || busy) return;
    const form = event.currentTarget;
    setBusy(true);
    setStatus("");

    try {
      const data = new FormData(form);
      data.set("kind", kind);
      data.delete("photos");

      if (kind === "estimate") {
        const fileInput = form.elements.namedItem("photos") as HTMLInputElement | null;
        const files = Array.from(fileInput?.files || []);
        if (files.length > MAX_PHOTOS) throw new Error(`Maximum ${MAX_PHOTOS} photos per inquiry.`);
        const cleanFiles: File[] = [];
        for (const [index, file] of files.entries()) {
          cleanFiles.push(await preparePhoto(file, index));
        }
        const total = cleanFiles.reduce((sum, file) => sum + file.size, 0);
        if (total > MAX_TOTAL_SIZE) throw new Error("Combined photos are too large.");
        cleanFiles.forEach(file => data.append("photos", file));
      }

      const response = await fetch("/api/lead", { method: "POST", body: data });
      const result: { error?: string; ok?: boolean } = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(result.error || (response.status === 413
          ? "Photos exceeded the upload limit. Choose smaller images."
          : "Unable to submit. Please call Val at (239) 848-8290."));
      }

      setStatus("Thank you. Your request has been sent to Express Turf Renovation.");
      form.reset();
      setPhotoCount(0);
      (window as Window & { turnstile?: { reset: () => void } }).turnstile?.reset();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to submit. Please call (239) 848-8290.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="form" onSubmit={submit} encType="multipart/form-data">
      <div className="formgrid">
        <label className="field">Full name *
          <input name="name" required autoComplete="name" minLength={2} maxLength={100}/>
        </label>
        <label className="field">Phone number *
          <input name="phone" required autoComplete="tel" type="tel" maxLength={35}/>
        </label>
      </div>
      <div className="formgrid">
        <label className="field">Email address *
          <input name="email" required type="email" autoComplete="email" maxLength={200}/>
        </label>
        <label className="field">City / Project location *
          <input name="city" required autoComplete="address-level2" maxLength={100}/>
        </label>
      </div>
      {kind === "sod-order" ? (
        <>
          <div className="formgrid">
            <label className="field">Sod type
              <select name="product">
                <option value="">Help me choose</option>
                <option>St. Augustine</option>
                <option>Zoysia</option>
                <option>Paspalum</option>
                <option>Other / not sure</option>
              </select>
            </label>
            <label className="field">Pallet quantity
              <input name="quantity" type="number" min="1" max="1000"/>
            </label>
          </div>
          <label className="field">Pickup / delivery / installation
            <select name="fulfillment">
              <option>Request guidance</option>
              <option>Pickup</option>
              <option>Delivery</option>
              <option>Supply and installation</option>
            </select>
          </label>
        </>
      ) : (
        <label className="field">Service
          <select name="service">
            <option value="">Please select a service</option>
            {["Sod Installation","Artificial Turf","Hardscaping & Pavers","Land Cleanup","Tree Services","Low-Voltage Lighting","Outdoor Speakers","Irrigation","Planting & Nursery","Commercial Landscaping"].map(value => <option key={value}>{value}</option>)}
          </select>
        </label>
      )}
      <label className="field">Project details
        <textarea name="message" maxLength={2400} placeholder="Tell us about your project, timeline and any questions."/>
      </label>

      {kind === "estimate" && (
        <label className="field photo-input" htmlFor="project-photos">
          Project photos (optional)
          <input
            id="project-photos"
            name="photos"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={onPhotoChange}
            aria-describedby="photo-help"
            disabled={!enabled || busy}
          />
          <span id="photo-help" className="photo-help">
            Add up to 3 JPG, PNG or WebP photos. Your browser reduces photo size before sending; the server checks and recreates each image. No PDFs, videos or other file types.
          </span>
          <span className="photo-count" role="status">
            {photoCount ? `${photoCount} photo${photoCount === 1 ? "" : "s"} selected` : "No photos selected"}
          </span>
        </label>
      )}

      <div style={{ display: "none" }} aria-hidden="true">
        <label>Leave this field blank<input name="website" tabIndex={-1} autoComplete="off"/></label>
      </div>

      {enabled ? (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive"/>
          <div className="cf-turnstile" data-sitekey={siteKey}/>
        </>
      ) : (
        <p className="notice">Online inquiries and photo submissions will be enabled after email and security configuration. For now, please call Val at <a href="tel:+12398488290">(239) 848-8290</a>.</p>
      )}

      <p className="note">
        Your request and any selected photos are shared by email with Express Turf Renovation and copied to ViMu for follow-up. Photos are not posted publicly. Sending does not confirm pricing or availability.
      </p>
      <button className="btn orange" disabled={busy || !enabled} type="submit">
        {busy ? "PREPARING & SENDING..." : "SEND MY REQUEST ↗"}
      </button>
      <div className="status" role="status" aria-live="polite">{status}</div>
    </form>
  );
}
