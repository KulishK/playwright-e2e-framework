import { test, expect } from '../fixtures/baseTest';
import { testData } from '../utils/testData';
import { ENV } from '../config/env';

test.describe('Login Flow Tests', () => {

  test.beforeEach(async ({ loginPage }) => {
    // Navigate to base URL before each test in this block
    await loginPage.goto();
  });

  test('TC01: Successful login with valid credentials', async ({ loginPage, dashboardPage }) => {
    await loginPage.login(ENV.USERNAME, ENV.PASSWORD);
    
    // Validate we are redirected and a dashboard element is visible
    const header = await dashboardPage.getHeaderText();
    expect(header).toBe(testData.dashboardExpectations.title);
    await expect(dashboardPage.inventoryItems.first()).toBeVisible();
  });

  test('TC02: Failed login with invalid credentials shows correct error', async ({ loginPage }) => {
    await loginPage.login(testData.invalidUser.username, testData.invalidUser.password);
    
    // Explicit wait is handled internally by Playwright's auto-waiting on the locator
    const errorText = await loginPage.getErrorMessageText();
    expect(errorText).toContain('Sorry, this user has been locked out.');
  });

  test('TC03: Empty username and password submission', async ({ loginPage }) => {
    await loginPage.loginButton.click();
    
    const errorText = await loginPage.getErrorMessageText();
    expect(errorText).toContain('Username is required');
  });

});
