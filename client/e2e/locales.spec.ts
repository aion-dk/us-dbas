import { test, expect } from "@playwright/test";
import { latestConfig, foundBallotStatus } from "./mocks.ts"

test("changing locale", async ({ page }) => {
  // Mock Network calls
  await page.route('**/*', async (route) => {
    const url = route.request().url()

    // Intercept DBB latest config calls
    if (url.indexOf("us3/configuration/latest_config") > 0) {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(latestConfig),
      });
    }

    return route.continue()
  })

  await page.goto('/en/us3');
  await page.getByRole('img').nth(2).click();
  await page.getByRole('link', { name: 'Información' }).click();
  await page.getByRole('img').nth(1).click();
  await page.getByRole('link', { name: 'About' }).click();
});
