import { test, expect } from '../fixtures/baseTest';
import { testData } from '../utils/testData';
import { ENV } from '../config/env';

test.describe('Dashboard Validation Tests', () => {

  test.beforeEach(async ({ loginPage }) => {
    // Navigate and login before each test
    await loginPage.goto();
    await loginPage.login(ENV.USERNAME, ENV.PASSWORD);
  });

  test('TC04: Verify all inventory items are loaded', async ({ dashboardPage }) => {
    const itemsCount = await dashboardPage.getInventoryItemsCount();
    expect(itemsCount).toBe(testData.dashboardExpectations.inventoryItemCount);
    
    // Verify specific product visibility
    await expect(dashboardPage.inventoryItems.nth(0)).toBeVisible();
  });

  test('TC05: Logout flow is functioning correctly', async ({ dashboardPage, loginPage }) => {
    await dashboardPage.logout();
    
    // Verify redirect to login page
    await expect(loginPage.loginButton).toBeVisible();
    expect(loginPage.page.url()).toBe(ENV.BASE_URL + '/'); // Adjust trailing slashes based on actual app
  });

});
