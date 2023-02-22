import { test, expect } from "@playwright/test";

// See here how to get started:
// https://playwright.dev/docs/intro
test("visits the 3f tables url", async ({ page }) => {
  await page.goto("/3f/tables/overview");
  await expect(page.locator("#statistics-service > header > h1")).toHaveText(
    "3f statistics"
  );
});
