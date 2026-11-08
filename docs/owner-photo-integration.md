# Owner-Supplied Project Photography — Deployment Notes

**Status:** Source integration staged on `feat/owner-project-photography`. The seven optimized binary WebP assets must be uploaded to the same branch before merge. Production remains on the original visual design.

## Contents
Seven project images provided by the client on 2026-11-07. The accompanying download `express-turf-optimized-photos.zip` contains the seven files under `public/projects/`, a metadata manifest, and descriptive alt text.

| File | Original role | Placement |
| --- | --- | --- |
| `side-yard-artificial-grass-renovation-swfl.webp` | Finished artificial turf side yard | Home gallery, Social, Projects |
| `custom-turf-ribbons-driveway-renovation-florida.webp` | Driveway turf inlay in progress | Home gallery, Social, Projects |
| `commercial-palm-tree-installation-naples-plaza.webp` | Commercial palm planting | Home gallery, Social, Projects |
| `curved-artificial-turf-bed-palm-tree-edging.webp` | Curved turf edging by palm | Social, Projects |
| `modern-paver-artificial-grass-installation-crew.webp` | Installation crew laying turf by pavers | Social, Projects |
| `express-renovation-crew-preparing-turf-materials.webp` | Crew preparing turf materials | Social, Projects |
| `express-renovation-driveway-turf-inlay-naples-fl.webp` | Crew at turf/paver driveway | Projects |

## Media handling
- Re-encode WebP, max 1600 pixels per side, no EXIF, original proportions preserved. Approx 1.8 MB across all seven optimized files, down from approximately 18.5 MB.
- Serve through Next.js Image Optimization with responsive `sizes` and lazy loading.
- Descriptive human-readable captions and image `alt`; avoid keyword repetition.
- Project images are company supplied; rights to photos involving people or private property should be confirmed before making them public.
- Photos are labeled as completed work or in progress according to visible content; no unsupported before-and-after, testimonials or completion dates are claimed.

## Upload & release
1. Extract `express-turf-optimized-photos.zip`. In GitHub choose branch `feat/owner-project-photography` and upload all 7 `.webp` files to `public/projects/`, preserving exact filename capitalization.
2. Verify all seven URLs return HTTP 200 in the Vercel branch preview (e.g. `/projects/side-yard-artificial-grass-renovation-swfl.webp`).
3. Check the Home, /projects and /social layouts, descriptive alt text, photo crops, keyboard navigation, 360px / 768px / 1440px layouts and Next Image URLs.
4. Rerun GitHub Playwright accessibility suite. Update files if any links/crops need adjustment.
5. Merge approved branch into main once assets load; do not publish broken photo URLs.

## Safety during review
The temporary `ProjectImage` component falls back to previous company-hosted images if a pending local file is missing, so preview visitors should not see a broken-image icon. This is **not** a substitute for uploading the final files.

## Video files received
- `synthetic-turf-installation-process-naples-fl.mov` (11.12 seconds)
- `commercial-trench-drain-channel-installation.mov` (5.37 seconds)
- `finished-luxury-turf-sideyard-walkthrough.mp4` (0.50 seconds; likely incomplete)

Video files have **not** been placed on the critical page-loading path. To publish them, verify the content and audio, produce accessible captions/transcripts when appropriate, and use a click-to-play poster with optimized MP4/WebM or a hosted video destination. Do not autoplay large files in the hero.
