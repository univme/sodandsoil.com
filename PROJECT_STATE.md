# PROJECT_STATE — Express Turf Renovation LLC — 2026-11-05

## Mission and outcome
Create a more visually distinctive, conversion-oriented site for sodandsoil.com, preserving verified business identity, authentic project imagery and dual conversion paths for sod pallets and landscape installation estimates. Current work is a **concept preview only**.

## Brand / approved facts
Express Turf Renovation LLC, family-owned, 16191 S Tamiami Trail, Fort Myers FL 33908, Val (239) 848-8290, expressturfrenovation@gmail.com; ViMu admin copied on production form emails. Service areas: Fort Myers, Cape Coral, Estero, Bonita Springs, Naples, Lehigh Acres. Core services: sod installation/sod by pallet, artificial turf, hardscapes, cleanup, tree services; supporting: lighting, speakers, irrigation, nursery, commercial. Authorized social profiles are in `src/lib/site.ts`. Hours, warranties and credential claims pending owner verification.

## Creative thesis
**Tropical Editorial:** architectural typography, dark forest and warm ivory with restrained orange/equipment red, strong genuine project imagery, confident editorial rhythm. Use client-selected palm/field identity; do not reuse the earlier agency logo concept.

## Stack / location
GitHub `univme/sodandsoil.com`; Next.js TypeScript on Vercel (ViMu). Existing main branch stays live. Concept branch `concept/tropical-editorial-v2` deploys via Git preview. Cloudflare remains unchanged.

## Concept scope
`src/app/page.tsx` — editorial hero, clear sod/turf positioning, image-driven services, sod supply, material choice, project gallery, compact social, steps, visible FAQs and quote CTA.
`src/app/concept.css` — scoped responsive design and subtle shared header refresh.
`src/app/layout.tsx` — accessible native details mobile menu.
`tests/accessibility.spec.ts` — concept and navigation regression tests.
`docs/concept-tropical-editorial-v2.md` — art direction and design rationale.

## Preserved functionality
Current ten service pages, SEO metadata/canonicals, project/social pages, sod inquiry, contact photo-upload pipeline, server-side validation and email-provider integration points, branding/social links and deployment workflow remain in place.

## Open / next
Review owner-approved hero crops, logo exports, mobile visual QA, a11y test results, form email/Turnstile end-to-end, consent-aware analytics and canonical www/non-www decision. Do not merge concept until user approval.
