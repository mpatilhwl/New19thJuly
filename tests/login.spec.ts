import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { testData } from '../testData';
import { LogoutPage } from '../pages/LogoutPage';
import { StaffPoolPage } from '../pages/StaffPoolPage';

test.describe ('Login Tests', () => {
    let loginPage: LoginPage;
    let logoutPage: LogoutPage;
    let staffPoolPage: StaffPoolPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        logoutPage = new LogoutPage(page);
        staffPoolPage = new StaffPoolPage(page);
        loginPage.baseURL;
        loginPage.userName;
        loginPage.password;
    });
    //const { baseURL, userName, password } = new testData();

    test('should navigate to login page with correct URL', async ({ page }) => {
        await loginPage.login(loginPage.baseURL, loginPage.userName, loginPage.password);
        await staffPoolPage.navigateToStaffPool();
        const staffNameLocator = await staffPoolPage.searchStaffByName();
        const staffName = await staffNameLocator.textContent();
        if (staffName && staffName.includes('Gabriel')) {
            console.log("Staff member found: " + staffName);
        } else {
            console.log("Staff member not found");
        }

        await logoutPage.Logout();
    });
});
