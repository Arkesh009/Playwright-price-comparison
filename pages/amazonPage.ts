import { Page } from '@playwright/test';

export class AmazonPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://www.amazon.in/');
  }

  async searchProduct(product: string) {
    await this.page.fill('input#twotabsearchtextbox', product);
    await this.page.press('input#twotabsearchtextbox', 'Enter');
    await this.page.waitForSelector('.s-main-slot');
  }

  async getFirstProductPrice(): Promise<number> {
    const priceText = await this.page.locator('.a-price-whole').first().innerText();
    return Number(priceText.replace(/[,₹]/g, '').trim());
  }
}