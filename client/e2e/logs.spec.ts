import { test } from "@playwright/test";
import { latestConfig, boardItemsPage1, boardItemsPage2 } from "./mocks";

test("downloading logs", async ({ page, isMobile }) => {
  // Mock Network calls
  await page.route("**/*", async (route) => {
    const url = route.request().url();

    // Intercept DBB latest config calls
    if (url.indexOf("us3/configuration/latest_config") > 0) {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(latestConfig),
      });
    }

    // Intercept download request
    if (url.indexOf("us3/download_log") > 0) {
      return route.fulfill({
        status: 200,
        contentType: "application/octet-stream",
        body: JSON.stringify({}),
      });
    }

    return route.continue();
  });

  await page.goto("/en/us3");
  if (!isMobile) await page.getByRole("menuitem", { name: "Logs" }).click();
  await page.getByRole("link", { name: "Activity logs" }).click();

  const downloadPromise = page.waitForEvent("download");
  await page
    .getByRole("button", { name: "Download the full election log (json)" })
    .click();
  const download = await downloadPromise;
});

test("traversing board items", async ({ page, isMobile }) => {
  // Mock Network calls
  await page.route("**/*", async (route) => {
    const url = route.request().url();

    // Intercept DBB latest config calls
    if (url.indexOf("us3/configuration/latest_config") > 0) {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(latestConfig),
      });
    }

    // Intercept page 1 of the board
    if (url.indexOf("us3/board?page=1") > 0) {
      return route.fulfill({
        status: 200,
        contentType: "application/octet-stream",
        body: JSON.stringify(boardItemsPage1),
      });
    }

    // Intercept page 2 of the board
    if (url.indexOf("us3/board?page=2") > 0) {
      return route.fulfill({
        status: 200,
        contentType: "application/octet-stream",
        body: JSON.stringify(boardItemsPage2),
      });
    }

    return route.continue();
  });

  await page.goto("/en/us3");
  if (!isMobile) await page.getByRole("menuitem", { name: "Logs" }).click();
  await page.getByRole("link", { name: "Configuration logs" }).click();

  // Page 1
  await page.getByText("16fSovo").click();
  await page.getByText("VMMHYWv").click();

  // Page 2
  await page.getByRole("button", { name: "Next page" }).click();
  await page.getByText("1yo3CEM").click();
  await page.getByText("12g69GA").click();

  // Page 1 again
  await page.getByRole("button", { name: "Previous page" }).click();
  await page.getByText("16fSovo").click();
  await page.getByText("VMMHYWv").click();
});
