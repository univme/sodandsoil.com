# Express Turf Renovation — AI Visibility Remediation Checklist

**Date:** 2026-11-09  
**Report:** User-provided Arobis AI Visibility Checker (sodandsoil.com): **85/100 Strong**, estimated ChatGPT 83, Gemini 84, Claude 85, Perplexity 84.
These are readiness estimates, not demonstrated live recommendations or rankings.

## Report interpretation

- PASS: AI crawlers can access homepage, structured data detected, `llms.txt` present, meta description (~162 characters), one visible H1, homepage content (~418 words), some About information, HTTPS.
- FLAG: no explicit `Organization` type identifying brand; homepage title too long (~78 characters).
- The existing source declared `LandscapingBusiness`, not a standard Schema.org type. Correct to `HomeAndConstructionBusiness`, alongside explicit `Organization` on **one entity** (one @id) instead of emitting conflicting duplicate business identities.

## Developer changes (this branch)

- [x] `src/app/layout.tsx`: homepage default title shortened to `Sod & Turf in Fort Myers | Express Turf Renovation`. The full company legal name remains in visible copy and JSON-LD.
- [x] `src/app/layout.tsx`: root JSON-LD `@type` array now includes both `HomeAndConstructionBusiness` and `Organization`; original stable `@id`, Fort Myers postal address, phone, email, service areas and verified social profiles preserved.
- [x] `src/app/layout.tsx`: added factual brand description and absolute logo URL with an existing deployed logo asset; no fabricated reviews, credentials, prices or hours.
- [x] `tests/accessibility.spec.ts`: regression checks title length, both entity types, stable `@id`, official contact/address, logo and service-page provider references.
- [ ] PASS GitHub Actions Next.js build and browser SEO/WCAG tests; verify preview and merge if green (record exact results in PR).
- [ ] Inspect rendered homepage metadata and JSON-LD in production and re-run Arobis and Schema Markup Validator after deployment.

## Owner/Cloudflare checklist (no Cloudflare changes are made from this repository)

**Arobis reports crawler access PASS. Review rather than disable Cloudflare protections.**

1. Log in to Cloudflare and select **sodandsoil.com**.
2. Go to **Security > Settings > Bot traffic > AI Crawler and Agent access policies**. Ensure **Search: Allow (do not block)**. If you want AI assistants to retrieve the site interactively, set **Agents: Allow (do not block)**. **Training:** choose according to owner preference—independent of search; keep existing policy unless intentionally changing.
3. Visit **AI Crawl Control > Crawlers** and review known search/assistant crawler request successes and errors. Allow search crawlers providing useful discovery where permitted by policy.
4. Check **Security > Security rules / Analytics / Events** for blocks, managed challenges or CAPTCHA from *verified* bot identities. A crawler allowed by AI Crawl Control can still be blocked by a higher-priority WAF rule. Correct only actual conflicts, using verified bot identity rather than an arbitrary user-agent string.
5. Inspect actual public **/robots.txt** and **/llms.txt** responses. Cloudflare's managed robots preferences can add instructions ahead of application robots.txt. Do not manually block OAI-SearchBot, Bingbot, verified Google Search, or other discovery crawlers you want to reach the site.
6. Confirm whether `sodandsoil.com` or `www.sodandsoil.com` is the canonical hostname; align Cloudflare redirect rules with Next.js canonical metadata, sitemap, and schema **before** changing canonical URLs. The current app uses apex URLs.
7. No SPF, mail DNS, WAF bypass, global bot toggle, or TLS change is required to correct Arobis's two flags.

## Business owner and content work

- [ ] Confirm whether the previous name `Express Renovation` is appropriate as a public alternate name before adding it to schema or About text.
- [ ] Approve concise business-history and real-project descriptions, locations and dates (only where verified).
- [ ] Publish seven original, optimized project photographs from separate media PR **#6** only after their binary files are uploaded and verified.
- [ ] Verify the contact form and optional photo uploads with Resend and Turnstile when those secrets are configured (separate from AI visibility).
- [ ] Connect GA4/Search Console if not already configured; judge outcomes by real organic impressions, business citations and qualified inquiries, not readiness score alone.

## Sources
- https://developers.cloudflare.com/bots/additional-configurations/block-ai-bots/
- https://developers.cloudflare.com/ai-crawl-control/configuration/ai-crawl-control-with-waf/
- https://developers.google.com/search/docs/appearance/structured-data/organization
- https://developers.google.com/search/docs/appearance/structured-data/local-business

## Release status
This branch is independent of the pending photo-media PR and does not alter the approved visual design. No DNS change is included. Do not claim a changed Arobis score until rescanned.
