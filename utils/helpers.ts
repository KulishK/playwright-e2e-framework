import { Page } from '@playwright/test';

/**
 * Reusable utility functions for Playwright E2E tests
 */
export class Helpers {
  /**
   * Generates a random string of specified length
   * @param length The length of the random string
   */
  static generateRandomString(length: number = 8): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Waits for a specific network request to complete
   * @param page Playwright page object
   * @param urlSnippet Part of the URL to wait for
   */
  static async waitForNetworkRequest(page: Page, urlSnippet: string) {
    await page.waitForResponse(response => 
      response.url().includes(urlSnippet) && response.status() === 200
    );
  }

  /**
   * Takes a full page screenshot and attaches it to the report
   * @param page Playwright page object
   * @param screenshotName Name of the screenshot file
   */
  static async takeScreenshot(page: Page, screenshotName: string) {
    await page.screenshot({ path: `test-results/screenshots/${screenshotName}.png`, fullPage: true });
  }
}
