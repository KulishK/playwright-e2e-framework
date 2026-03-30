import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

/**
 * Declare the types of your fixtures.
 */
type MyFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
};

/**
 * Extend basic test by providing our custom page objects.
 * This pattern injects the page objects automatically, preventing repetitive instantiation.
 */
export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    // Set up the fixture.
    const loginPage = new LoginPage(page);
    // Use the fixture value in the test.
    await use(loginPage);
  },
  
  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },
});

export { expect } from '@playwright/test';
