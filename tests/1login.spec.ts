import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { testData } from '../testData';
import { LogoutPage } from '../pages/LogoutPage';

test.describe ('Login Tests', () => {
    let loginPage: LoginPage;
    let logoutPage: LogoutPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        logoutPage = new LogoutPage(page);
        loginPage.baseURL;
        loginPage.userName;
        loginPage.password;
    });
    //const { baseURL, userName, password } = new testData();

    test('should navigate to login page with correct URL', async ({ page }) => {
        await loginPage.login(loginPage.baseURL, loginPage.userName, loginPage.password);
        await logoutPage.Logout();
    });
});
