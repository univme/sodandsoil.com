# PROJECT_STATE — sodandsoil.com

Updated 2026-11-08. Brand: Express Turf Renovation LLC; official website sodandsoil.com; original green/ivory/orange/red visual brand is preferred over the abandoned editorial split-hero concept. Audience: Southwest Florida homeowners, contractors, and commercial property contacts. Conversion goals: request landscape estimates and sod pallet pricing; no online payment checkout currently. Verified/owner-provided contact: Val (239) 848-8290, expressturfrenovation@gmail.com, 16191 S Tamiami Trail, Fort Myers, FL 33908; technology CC admin@vimu.net. Service areas per client: Fort Myers, Cape Coral, Estero, Bonita Springs, Naples, Lehigh Acres.

## Stack & source
Next.js/TypeScript on Vercel, repo `univme/sodandsoil.com`. Main is production, Cloudflare domain setup retained. Client-selected palm/field logo dark/light preview. Main services: sod, artificial turf, pavers/hardscape, cleanup, tree work; additional lighting, outdoor speakers, irrigation, nursery, and commercial landscapes. TikTok/YouTube/Instagram/Facebook are stored in `src/lib/site.ts`.

## Current work
Feature branch `feat/owner-project-photography`, PR #6. Seven owner-supplied genuine project photos were cleaned of EXIF, converted to optimized WebP, preserved dimensions, max 1600px and packaged in `express-turf-optimized-photos.zip` (the user-visible attachment). Home uses three project photos; /projects shows seven; compact Social grid shows six on its page/four on Home. Descriptive alt text, clean filenames and service links are in `src/lib/owner-projects.ts`. `ProjectImage` temporarily falls back to previous company imagery if optimized local media is absent.

## Critical blocker / do not merge
Binary photo assets have **not** been uploaded to GitHub due connector limitations. Extract zip and upload all seven WebP files to `public/projects/` on feature branch. Verify HTTP 200 URLs, visual crops and browser tests. Preview may display old Wix-hosted fallback until photos arrive. Production site unchanged.

## Integration caution
Resend email sending and Cloudflare Turnstile/contact-photo uploads require credentials and end-to-end verification. GA4 and SPF need actual owner mail/analytics settings. Do not invent reviews, licenses, project results or completed dates. Owner also provided three short videos: two MOV (~11s and ~5s), one MP4 only ~0.5s, so no new auto-playing media was added.

## Next
After asset upload, validate /projects, /social and Home at desktop/mobile, keyboard/screen-reader basics, page speed, optimized image delivery, alt/metadata, and protected customer inquiry email. Merge only upon owner review and passing tests.
