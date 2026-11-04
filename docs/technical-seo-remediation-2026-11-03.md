# SEO checkup remediation — 2026-11-03

## Baseline evidence
User-provided SEO Site Checkup screenshots showed 73/100 technical SEO, 65/100 vendor AI visibility, 11 failed and 7 warnings. Visible findings (not the entire detailed report):
- render-blocking resources (partially visible)
- page topic keywords in title, description, headings
- modern image formats
- distorted images
- properly sized images
- Google Analytics script missing
- inaccurate canonical URLs
- SPF DNS record absent
- >20 HTTP requests
- favicon missing/not referenced

73/100 and 65/100 are vendor metrics, not Google or AI-platform rankings. HTTP request count by itself is not a direct Google ranking factor.

## Source repairs
- Unique per-page canonical URLs, metadata, OG descriptions, and local-service language.
- Replace CSS Google Fonts import with Next.js font loading.
- Use next/image for Wix-hosted photographs and thumbnails to deliver responsive optimized formats with object-fit cover and lazy loading. Hero photo gets priority.
- Add favicon and metadata discovery.
- GA4 optional component: only emits a script if NEXT_PUBLIC_GA_MEASUREMENT_ID is configured.
- Add SEO metadata regression checks within Playwright.

## External/remaining tasks
- **SPF DNS:** No changes should be made until verifying which service, if any, sends mail as @sodandsoil.com. The business's Gmail recipient does not establish that domain's outgoing email provider. Configure one correct SPF TXT record through Cloudflare; do not add multiple conflicting SPF records.
- **GA4:** Owner must supply their own G-... measurement ID and confirm privacy requirements. No fabricated ID should be used.
- **Performance:** Recheck homepage with PageSpeed Insights and browser network requests after deploy; optimization does not guarantee a specific score or a less-than-20 request count.
- **Local SEO:** Complete real service proof, FAQs, before-after photo descriptions, reviews, project locations, and Search Console verification.
- **Cloudflare:** Check real production response, canonical output, robots.txt/sitemap.xml, and SSL with owner-controlled access when Cloudflare bot protection allows.
- **Wix migration:** Source remains portable at content and image level; Next.js functions/components require reimplementation in Wix Studio.
