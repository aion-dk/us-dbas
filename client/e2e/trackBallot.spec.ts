import { test, expect } from "@playwright/test";

test("tracking a ballot", async ({ page }) => {
  await page.goto("/en/us3");
  await expect(page.locator("h2")).toHaveText("Famous Names Election");
  await page.getByPlaceholder('Ballot tracking code').fill('5ksv8Ee');
  await page.getByRole('button', { name: 'Track my ballot' }).click();
  await page.locator('div:nth-child(5) > .BallotActivity__Row > .BallotActivity__Expander').click();
  await page.getByRole('button', { name: 'Cancel and track a new ballot' }).click();
});

test("tracking a non-existing ballot", async ({ page }) => {
  await page.goto("/en/us3");
  await expect(page.locator("h2")).toHaveText("Famous Names Election");
  await page.getByPlaceholder('Ballot tracking code').fill('abcdef');
  await page.getByRole('button', { name: 'Track my ballot' }).click();
  await page.getByRole('heading', { name: 'Tracking code not found' }).click();
});
