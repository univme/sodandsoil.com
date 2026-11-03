import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/services",
  "/services/sod-installation",
  "/services/artificial-turf",
  "/sod-by-the-pallet",
  "/contact",
  "/projects",
  "/social",
  "/about",
  "/accessibility",
  "/privacy",
];

for (const route of routes) {
  test(`automated WCAG checks on ${route}`, async ({ page }) => {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveCount(1);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();

    const details = results.violations.map(violation => [
      `${violation.id}: ${violation.help} (impact: ${violation.impact})`,
      ...violation.nodes.map(node => `  ${node.target.join(" ")}: ${node.failureSummary}`),
    ].join("\n")).join("\n\n");

    expect(results.violations, details || "No automated violations detected").toEqual([]);
  });
}

test("video controls include visible label in accessible name", async ({ page }) => {
  await page.goto("/");
  const controls = page.locator(".video-play");
  await expect(controls).toHaveCount(2);

  for (const button of await controls.all()) {
    await expect(button).toContainText("WATCH PROJECT VIDEO");
    await expect(button).toHaveAccessibleName(/^Watch project video: /i);
    await button.focus();
    await expect(button).toBeFocused();
  }
});

test("skip link takes keyboard focus to main content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.locator(".skip")).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main")).toBeFocused();
});
