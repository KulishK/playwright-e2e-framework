import { Page, Locator } from '@playwright/test';
import { ENV } from '../config/env';

/**
 * Page Object Model for the Login Page.
 * Encapsulates all selectors and actions for successful test abstraction.
 */
export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    // Prefer data-testid for robust selectors
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  /**
   * Navigates to the base URL (which brings up the login page)
   */
  async goto() {
    await this.page.goto(ENV.BASE_URL);
  }

  /**
   * Performs the login action with the given credentials
   */
  async login(username: string, password: string = ENV.PASSWORD) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Retrieves the text content of the error message element
   */
  async getErrorMessageText(): Promise<string | null> {
    return await this.errorMessage.textContent();
  }
}
