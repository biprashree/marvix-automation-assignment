import { test, expect } from "@playwright/test";
import { SearchPage } from "../../pages/SearchPage";

test("search Mumbai stay and extract host name", async ({ page, context }) => {
  const searchPage = new SearchPage(page);

  // Login automation was skipped because Airbnb and Google
 // apply anti bot verification checks on automated browsers.

  await test.step("Open Airbnb homepage", async () => {
    await searchPage.goto();
  });

  await test.step("Search for 1-night stay in Mumbai", async () => {
    await searchPage.searchMumbaiStay();
  });

  await test.step("Open first listing", async () => {
    await searchPage.dismissPromotionalModalIfPresent();

    await page.waitForLoadState("domcontentloaded");

    const listingCards = page.locator('[data-testid="card-container"]');

    await expect(listingCards.first()).toBeVisible();

    const [listingPage] = await Promise.all([
      context.waitForEvent("page"),
      listingCards.first().click(),
    ]);

    await listingPage.waitForLoadState();

    const hostInfo = listingPage.locator("text=/Hosted by/i").first();

    await expect(hostInfo).toBeVisible();

    const hostName = await hostInfo.textContent();

    console.log(`Host Name: ${hostName}`);

    expect(hostName).toBeTruthy();
  });
});
