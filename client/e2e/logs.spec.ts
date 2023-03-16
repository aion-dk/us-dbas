import { test, expect } from "@playwright/test";
import { latestConfig, foundBallotStatus } from "./mocks.ts"

test.only("downloading logs", async ({ page }) => {
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

    // Intercept download request
    if (url.indexOf("us3/download_log") > 0) {
      return route.fulfill({
        status: 200,
        contentType: 'application/octet-stream',
        body: JSON.stringify({}),
      });
    }

    return route.continue()
  })

  await page.goto('/en/us3');
  await page.getByRole('link', { name: 'Logs' }).click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Download the full election activity log (json)' }).click();
  const download = await downloadPromise;
});
