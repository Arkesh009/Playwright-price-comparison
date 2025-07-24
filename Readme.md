# Flipkart vs Amazon Price Comparison Automation

This project automates the process of comparing the price of a product (e.g., "iPhone 15 Plus") on Flipkart and Amazon using Playwright with TypeScript.

---

## 📋 What does this project do?

- **Searches for a product** on both Flipkart and Amazon at the same time (parallel execution).
- **Extracts the price** of the first listed product from both sites.
- **Prints both prices** in the console for easy reference.
- **Performs multiple checks** to ensure the prices are valid numbers and greater than zero.
- **Asserts that Flipkart's price is less than Amazon's**. If not, the test fails with a clear message showing both prices.
- **Collects Playwright traces** for easy debugging in case of test failures.

---

## 🚀 How to run

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the test (headless, Chrome)**
   ```bash
   npx playwright test --project=chromium
   ```

3. **Run the test in headed mode (see the browser)**
   ```bash
   npx playwright test --headed --project=chromium
   ```

4. **View the HTML report**
   ```bash
   npx playwright show-report
   ```

---

## 🧑‍💻 Acceptance Criteria Coverage

- ✅ **Playwright with TypeScript**: The project uses Playwright and TypeScript for robust, type-safe automation.
- ✅ **Parallel execution**: Both websites are opened and searched simultaneously using parallel browser contexts.
- ✅ **Price extraction**: The script extracts the price of the specified product from both Flipkart and Amazon.
- ✅ **Multiple assertions**: Checks ensure both prices are numbers, greater than zero, and that Flipkart is cheaper.
- ✅ **Console output**: Both prices are printed for transparency.
- ✅ **Clear error messages**: If Flipkart is not cheaper, the test fails with a detailed message showing both prices.
- ✅ **Traces for debugging**: Playwright traces are collected on test retry for easy debugging.

---

## 📝 Notes

- **Selectors** are chosen to be robust, but may need updates if Flipkart or Amazon change their website structure.
- **No login** is required; the script works for public product searches.
- **Easy to extend**: You can change the product name or add more assertions as needed.

---

## 📂 File Structure

```
/pages
  ├── amazonPage.ts
  └── flipkartPage.ts
/tests
  └── compare_price.spec.ts
playwright.config.ts
README.md
```

---

## 👨‍🎓 Author

- [Arkesh Bhargava]
- [23/07/2025]