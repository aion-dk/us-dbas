import { test, expect } from "@playwright/test";
import { latestConfig } from "./mocks";

test("verifying a ballot", async ({ page }) => {
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

    // // Intercept DBB verification lookup call
    // if (url.indexOf("us3/verification/vote_track") > 0) {
    //   return route.fulfill({
    //     status: 200,
    //     contentType: "application/json",
    //     body: verificationCodeFound,
    //   });
    // }

    return route.continue();
  });

  await page.goto("/en/us3");
  await expect(page.locator("h1")).toContainText("Funny Election");
  await page.getByRole("link", { name: "No", exact: true }).click();
  await page.getByPlaceholder("Ballot Checking Code").fill("5ksv8Ee");
  await page.locator('[data-test="btn"]').click();
  // await expect(page.toHaveContent("pairing code"))
});

test("verifying with an invalid verification code", async ({ page }) => {
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

    // Intercept DBB verification lookup call
    if (url.indexOf("us3/verification/vote_track") > 0) {
      return route.fulfill({
        status: 404,
        contentType: "application/json",
        body: "",
      });
    }

    return route.continue();
  });

  await page.goto("/en/us3");
  await expect(page.locator("h1")).toContainText("Funny Election");
  await page.getByRole("link", { name: "No", exact: true }).click();
  await page.getByPlaceholder("Ballot Checking Code").fill("invalid-code");
  await page.getByRole("button", { name: "Check My Ballot" }).click();
  await expect(page.locator(".Error__Title")).toContainText(
    "CHECKING CODE NOT FOUND"
  );
  await page.getByPlaceholder("Ballot Checking Code").fill("invalid-code");
});
