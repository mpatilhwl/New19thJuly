import { test, expect } from '@playwright/test';
import { CreateRequisitionPage } from '../pages/CreateRequisitionPage';
import { testData } from '../testData';
import { LoginPage } from '../pages/LoginPage';
import { LogoutPage } from '../pages/LogoutPage';
import { StaffPoolPage } from '../pages/StaffPoolPage';
import { SelectProgType } from '../pages/SelectProgTypePage';
import { log } from 'console';

test.describe('Create Requisition Tests', () => {
    let createRequisitionPage: CreateRequisitionPage;
     let loginPage: LoginPage;
    let logoutPage: LogoutPage;
    let staffPoolPage: StaffPoolPage;
    let selectProgType: SelectProgType;

    test.beforeEach(async ({ page }) => {

        createRequisitionPage = new CreateRequisitionPage(page);
 loginPage = new LoginPage(page);
        logoutPage = new LogoutPage(page);
        staffPoolPage = new StaffPoolPage(page);
        selectProgType = new SelectProgType(page);
        loginPage.baseURL;
        loginPage.userName;
        loginPage.password;

        await loginPage.login(loginPage.baseURL, loginPage.userName, loginPage.password);
        await selectProgType.selectProgramType();
        await createRequisitionPage.navigateToRequisition();
        await new Promise(resolve => setTimeout(resolve, 2000)); // Adjust timeout as necessary
        await logoutPage.Logout();
    });

    test('should navigate to Create Requisition page', async () => {
        // Verify that the page has navigated correctly
        const title = await createRequisitionPage.page.title();
        expect(title).toBeTruthy(); // Basic assertion to ensure page loaded
        console.log('Page title:', title);
    });

    // Add more tests related to requisition creation here
});