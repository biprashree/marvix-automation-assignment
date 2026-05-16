import { expect } from '@playwright/test';
import type { Page } from '@playwright/test';

export class SearchPage {
  constructor(private page: Page) {}

  // Closes marketing or login promo popups that may appear above the main search section.
  // Supports different close button variations like aria-labels, role-based buttons,
  // and icononly controls.
  // Safely skips when no popup is displayed.
  async dismissPromotionalModalIfPresent(): Promise<void> {
    const dialog = this.page.locator('[role="dialog"]');

    const closeCandidates = [
      dialog.locator('button[aria-label*="Close" i]'),
      this.page.locator('button[aria-label*="Close" i]'),
      this.page.getByRole('button', { name: /close/i }),
      this.page.getByLabel(/close|dismiss|not now/i),
    ];

    for (const locator of closeCandidates) {
      const target = locator.first();
      if (!(await target.isVisible().catch(() => false))) continue;
      try {
        await target.click({ timeout: 5000 });
        await expect(dialog).toBeHidden({ timeout: 5000 }).catch(() => {});
        return;
      } catch {
        // try next selector
      }
    }

    await this.page.keyboard.press('Escape');
    await this.page.keyboard.press('Escape');
  }

  async goto() {
    await this.page.goto('/');
    await this.page.waitForLoadState('domcontentloaded');
    await this.dismissPromotionalModalIfPresent();
  }

// Promo overlays may reappear after the first dismissal.
// Retry closing them until the destination field becomes clickable,
// Playwright blocks clicks when elements are covered by overlays.
  async searchMumbaiStay() {
    const destinationInput = this.page.getByPlaceholder(
      /search destinations/i
    );

    const maxAttempts = 6;
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      await this.dismissPromotionalModalIfPresent();

      const clicked = await destinationInput
        .click({ timeout: 4000 })
        .then(() => true)
        .catch(() => false);

      if (clicked) {
        await destinationInput.fill('Mumbai');
        await this.page.keyboard.press('Enter');
        await this.page.waitForLoadState('domcontentloaded');
        return;
      }
    }

    await this.dismissPromotionalModalIfPresent();
    await destinationInput.click({ force: true });
    await destinationInput.fill('Mumbai');
    await this.page.keyboard.press('Enter');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async openFirstListing() {
    const firstListing = this.page
      .locator('[itemprop="itemListElement"]')
      .first();

    await expect(firstListing).toBeVisible();

    await firstListing.click();
  }

  async extractHostName() {
    const hostInfo = this.page
      .locator('text=/Hosted by/i')
      .first();

    await expect(hostInfo).toBeVisible();

    return await hostInfo.textContent();
  }
}