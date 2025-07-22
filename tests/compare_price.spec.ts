import { test, expect } from '@playwright/test';
import { FlipkartPage } from '../pages/flipkartPage';
import { AmazonPage } from '../pages/amazonPage';

// Compare product price on Flipkart and Amazon in parallel
test('Compare product price on Flipkart and Amazon', async ({ browser }) => {
  const prod = 'iPhone 15 Plus';

  // Create browser contexts
  const [fkCtx, amzCtx] = await Promise.all([
    browser.newContext(),
    browser.newContext(),
  ]);
  const [fkPage, amzPage] = await Promise.all([
    fkCtx.newPage(),
    amzCtx.newPage(),
  ]);

  // Get prices from both sites
  const [fkPrice, amzPrice] = await Promise.all([
    (async () => {
      const fk = new FlipkartPage(fkPage);
      await fk.goto();
      await fk.searchProduct(prod);
      return await fk.getFirstProductPrice();
    })(),
    (async () => {
      const amz = new AmazonPage(amzPage);
      await amz.goto();
      await amz.searchProduct(prod);
      return await amz.getFirstProductPrice();
    })(),
  ]);

  // Print prices
  console.log(`Flipkart: ₹${fkPrice}, Amazon: ₹${amzPrice}`);

  // Check prices and comparison
  expect(typeof fkPrice, 'Flipkart price should be a number').toBe('number');
  expect(typeof amzPrice, 'Amazon price should be a number').toBe('number');
  expect(fkPrice, 'Flipkart price should be > 0').toBeGreaterThan(0);
  expect(amzPrice, 'Amazon price should be > 0').toBeGreaterThan(0);
  expect(fkPrice, `Flipkart price (₹${fkPrice}) is not less than Amazon price (₹${amzPrice})`).toBeLessThan(amzPrice);

  // wait for 5 seconds on both pages
  await fkPage.waitForTimeout(5000);
  await amzPage.waitForTimeout(5000);

  // Close contexts
  await fkCtx.close();
  await amzCtx.close();
});