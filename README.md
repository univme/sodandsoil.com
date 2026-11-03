# Express Turf Renovation LLC — sodandsoil.com

Next.js 15 / TypeScript marketing website and lead-generation source for Express Turf Renovation LLC. Built for the ViMu Vercel team.

## Development

```bash
npm install
npm run dev
npm run build
```

## Deployment

Connect this GitHub repository to the ViMu Vercel team. Deploy the preview first. Do not change Cloudflare production DNS until owner approval and testing.

## Forms

The quote and sod inquiry forms require Resend and Cloudflare Turnstile credentials. Set `RESEND_API_KEY`, `LEAD_FROM_EMAIL`, `TURNSTILE_SECRET_KEY`, and `NEXT_PUBLIC_TURNSTILE_SITE_KEY`. Sending address/domain must be verified. Recipient: expressturfrenovation@gmail.com; CC: admin@vimu.net. No keys belong in GitHub.

## Outstanding

* Verify business hours and project availability with owner.
* Confirm social profile ownership and use genuine video embeds as approved.
* Confirm sales/pallet pickup and delivery terms before accepting payments.
* Review final legal/accessibility statements and run real keyboard and screen-reader tests.
* Replace interim logo graphics with the final exact supplied brand master assets when approved.
* Ensure mobile performance and all navigation and images pass preview tests.

## Project photo inquiries

The /contact form permits up to **three JPG, PNG or WebP project photos** per request. Client-side processing converts source photos to small JPEGs (target <=1.2MB each, <=3.5MB aggregate) before multipart upload. Vercel serverless request bodies are limited to 4.5MB; this implementation caps total request size at 4.3MB.

The server requires a valid single-use Cloudflare Turnstile token and configured Resend sending-domain credentials before accepting a submission. It enforces same-origin requests, a honeypot, image count, size, MIME + magic bytes, strict Sharp decoder checks, pixel limits and **metadata-stripped JPEG re-encoding**. It emails sanitized output as attachments (not originals) to expressturfrenovation@gmail.com and copies admin@vimu.net; no public image store is provisioned.

Do not describe any upload facility as absolutely malware-proof. For stronger defense in depth, add provider-level WAF rate limits and malware scanning/quarantine before accepting broader formats or larger files. Test valid/invalid image files, large payloads, animated files, CAPTCHA expiry, emails and privacy disclosures before launch. Contact photos are sensitive and must not be used in marketing without consent.

## Videos

The homepage and /social page feature two company YouTube videos and the official TikTok and YouTube profiles. Iframes are loaded only after an explicit play action and use youtube-nocookie.com. Add more videos only after validating the business channel's URLs.
