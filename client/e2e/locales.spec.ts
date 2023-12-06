import { test } from "@playwright/test";
import { latestConfig } from "./mocks";

test("changing locale", async ({ page, isMobile }) => {
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

    return route.continue();
  });

  await page.goto("/en/us3");
  if (isMobile) await page.getByRole("button", { name: "Open menu" }).click();
  await page.locator(".Header__Locales").selectOption("es");
  await page.getByRole("menuitem", { name: "Información" }).click();
  if (isMobile) await page.getByRole("button", { name: "Open menu" }).click();
  await page.locator(".Header__Locales").selectOption("en");
  await page.getByRole("menuitem", { name: "About" }).click();
});
