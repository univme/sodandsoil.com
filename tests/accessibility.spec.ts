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

test("compact project gallery and social links preserve accessible names", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".showcase-photo")).toHaveCount(4);
  await expect(page.locator(".showcase-video-link")).toHaveCount(2);
  const videoLinks = page.locator(".showcase-video-link");
  await expect(videoLinks.first()).toHaveAccessibleName(/palmetto turf installation.*youtube video/i);
  await expect(videoLinks.last()).toHaveAccessibleName(/turf installation in action.*youtube video/i);
  for (const link of await videoLinks.all()) {
    await expect(link).toHaveAttribute("href", /^https:\/\/www\.youtube\.com\/watch\?v=/);
    await expect(link).toHaveAttribute("rel", /noopener/);
    await link.focus();
    await expect(link).toBeFocused();
  }
  const socialNav = page.getByRole("navigation", { name: "Express Turf social media profiles" });
  await expect(socialNav.getByRole("link")).toHaveCount(4);
  for (const name of ["TikTok", "YouTube", "Instagram", "Facebook"]) {
    const link = socialNav.getByRole("link", { name });
    await expect(link).toBeVisible();
    await expect(link.locator("svg")).toHaveCount(1);
  }
});

test("social page displays compact image gallery and branded icons", async ({ page }) => {
  await page.goto("/social");
  await expect(page.locator(".showcase-photo")).toHaveCount(6);
  await expect(page.locator(".showcase-video-link")).toHaveCount(2);
  await expect(page.getByRole("navigation", { name: "Express Turf social media profiles" }).getByRole("link")).toHaveCount(4);
  await expect(page.getByRole("link", { name: "Back to Home" })).toHaveAttribute("href", "/");
});

test("skip link takes keyboard focus to main content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.locator(".skip")).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main")).toBeFocused();
});


test("every content page has a unique SEO canonical, title and description", async ({page}) => {
  for (const route of routes) {
    await page.goto(route, { waitUntil:"domcontentloaded" });
    const canonical=page.locator('head link[rel="canonical"]');
    await expect(canonical, "Exactly one canonical on "+route).toHaveCount(1);
    const expected="https://sodandsoil.com"+(route==="/"?"/":route);
    expect(new URL((await canonical.getAttribute("href")) || "").toString()).toBe(expected);
    const description=page.locator('head meta[name="description"]');
    await expect(description).toHaveCount(1);
    const text=await description.getAttribute("content");
    expect(text?.length||0).toBeGreaterThan(65);
    expect((await page.title()).length).toBeGreaterThan(25);
  }
});

test("homepage advertises sod and turf and provides optimized responsive images",async ({page})=>{
  await page.goto("/", {waitUntil:"domcontentloaded"});
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.getByText("SOD INSTALLATION · ARTIFICIAL TURF · FORT MYERS, FL")).toBeVisible();
  await expect(page.locator('head link[rel*="icon"]')).not.toHaveCount(0);
  const hero=page.locator(".hero img");
  await expect(hero).toHaveAttribute("src",/\/_next\/image\?/);
  await expect(hero).toHaveAttribute("sizes","100vw");
  await expect(page.locator(".services img")).toHaveCount(5);
});
