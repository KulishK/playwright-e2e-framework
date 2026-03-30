import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model for the Dashboard (Inventory) Page.
 * Encapsulates actions and checks post-login.
 */
export class DashboardPage {
  readonly page: Page;
  readonly headerTitle: Locator;
  readonly menuButton: Locator;
  readonly logoutButton: Locator;
  readonly inventoryItems: Locator;
  readonly shoppingCartContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headerTitle = page.locator('.title');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutButton = page.locator('#logout_sidebar_link');
    // Using a class selector here as standard for the target demo app
    this.inventoryItems = page.locator('.inventory_item');
    this.shoppingCartContainer = page.locator('#shopping_cart_container');
  }

  /**
   * Performs the logout flow
   */
  async logout() {
    await this.menuButton.click();
    await this.logoutButton.waitFor({ state: 'visible' });
    await this.logoutButton.click();
  }

  /**
   * Retrieves the number of displayed inventory items
   */
  async getInventoryItemsCount(): Promise<number> {
    return await this.inventoryItems.count();
  }

  /**
   * Retrieves the header title text
   */
  async getHeaderText(): Promise<string | null> {
    return await this.headerTitle.textContent();
  }
}
