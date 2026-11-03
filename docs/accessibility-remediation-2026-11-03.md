# Accessibility findings and remediation — November 3, 2026

**Website:** https://sodandsoil.com
**Company:** Express Turf Renovation LLC
**Target:** WCAG 2.2 Level AA as an engineering standard; not a certification or promise of legal compliance.

## Supplied external baseline

The site owner supplied a screenshot of an AccessibilityChecker.org audit showing **72/100**, **one critical issue spanning two elements**, **41 passed audits**, **22 manual audits**, and **56 not applicable**. The critical issue is titled **"Ensure visible labels match the element accessible name for voice control users."** The full element-by-element report was not available from that screenshot, so the identification below is based on comparison against the GitHub source—not a claim of independently reproducing the exact external report.

## Finding A11Y-001: Label-in-Name

**WCAG:** SC 2.5.3 (Level A)
**Location:** Home and Social pages, both `.video-play` controls in `src/components/VideoGallery.tsx`.
**Original implementation:** The visible label reads **WATCH PROJECT VIDEO** while an `aria-label` overrides the computed accessible name with **Play <video title>**. There are two instances, matching the count in the screenshot.
**Impact:** Speech-input users who attempt to activate "Watch project video" may not be able to discover/activate these controls by visible label.
**Fix:** Begin each computed accessible name with **Watch project video:** followed by the specific video title. The visible words are now present at the beginning of each name. The native button and keyboard activation remain unchanged.
**Status:** FIXED IN SOURCE — AWAIT PRODUCTION RESCAN.
**Verification:** Playwright visible-name regression plus automated axe-core WCAG checks in Chromium desktop and mobile; external scanner must be rerun after deployment.

## Why this was missed

1. Initial rollout used Next.js build/type checks, which do not test the browser accessibility tree or WCAG 2.5.3.
2. A source-level review and an accessibility statement were treated as progress, but the required accessibility launch gate was not executed.
3. No documented prelaunch axe/WAVE, keyboard-only, screen-reader, zoom/reflow or video-caption audits existed.
4. Subsequent feature additions (two video buttons and upload form) were merged without a mandatory accessibility regression run.

**Corrective process:** The CI workflow now runs Playwright + axe-core on 11 representative pages at desktop and mobile viewport sizes and asserts label-in-name for both video buttons. Any CI failure must block production merges through branch protection (configure in GitHub settings). Automated tests do not replace manual testing.

## Remaining verification / launch gate

- OPEN: Rerun the supplied AccessibilityChecker.org scan against the updated deployed version and preserve the detailed element report.
- OPEN: Complete keyboard-only traversal and voice-control testing on the full home/navigation/contact flows.
- OPEN: Use NVDA/Chrome or VoiceOver/Safari on the homepage, Social page, contact and sod inquiry forms.
- OPEN: Verify contrast in real backgrounds, all states, 200–400% zoom/reflow, text-spacing and pointer targets.
- OPEN: Confirm spoken content in YouTube/TikTok embeds has accurate captions or adequate equivalent alternatives.
- OPEN: Test Cloudflare Turnstile with assistive technology when its keys are configured; test validation errors and image upload controls.
- OPEN: Run a second automated scanner (WAVE or Lighthouse Accessibility) independently.
- OPEN: Review remaining service routes, mobile dark/light variants and any future commerce/CRM integration.
- OPEN: Update the accessibility statement with a dated evaluation once testing is completed.

## Legal context

U.S. DOJ guidance states that Title III businesses open to the public have ADA accessibility obligations and recommends an assessment combining automated and manual checks. A percentage grade from a commercial checker is not a legal finding; a site cannot be certified as legally compliant based solely on that grade.

Reference: https://www.ada.gov/resources/web-guidance/
Reference: https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html

## Finding A11Y-002: Color contrast uncovered by CI

**WCAG:** SC 1.4.3 (Level AA)
**Location:** /social page links inside `.sociallist`.
**Automated evidence:** The first axe-core/Playwright job (GitHub Actions run 41695022146, Chromium desktop and mobile) completed 24 passing and 2 failing tests. Four social links had white inherited foreground (#FFFFFF) over Soft Sage (#DCE8D8), measured contrast 1.26:1 versus the 4.5:1 AA threshold for normal text.
**Impact:** Text was difficult for low-vision visitors to perceive.
**Fix:** Explicit dark forest text for `.sociallist a` regardless of surrounding section; light ivory focus outlines on dark hero, header, footer, CTA, and social-video controls.
**Status:** FIXED IN SOURCE — VERIFY IN NEW TEST RUN.
**Verification:** Re-run axe-core for /social desktop/mobile and inspect focused controls with keyboard manually.

## Automated test evidence

- Initial run 41695022146: 24 passed, 2 contrast failures (/social desktop and mobile), no reported failure in the dedicated 2-video accessible-name regression.
- Later test runs: results should be appended after completion. A passing automation run is not a complete conformance assessment.
