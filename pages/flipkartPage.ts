import { Page } from '@playwright/test';

export class FlipkartPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://www.flipkart.com/');
    // Close login popup if present
    const closeBtn = this.page.locator('button', {hasText: '✕'});
    if (await closeBtn.isVisible()) {
      await closeBtn.click();
    }
  }

  async searchProduct(product: string) {
    await this.page.fill('input[name="q"]', product);
    await this.page.press('input[name="q"]', 'Enter');
    // Wait for product cards to appear
    await this.page.waitForSelector('div[data-id]');
  }

  async getFirstProductPrice(): Promise<number> {
    // Find the first product card with a price
    const firstProduct = this.page.locator('div[data-id]').first();
    // Wait for the price element to be visible inside the first product card
    const priceLocator = firstProduct.locator('div.Nx9bqj._4b5DiR');
    await priceLocator.waitFor({ state: 'visible', timeout: 10000 });
    const priceText = await priceLocator.first().innerText();
    return Number(priceText.replace(/[₹,]/g, '').trim());
  }
}