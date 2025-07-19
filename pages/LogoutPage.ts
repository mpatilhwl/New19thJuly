import { Page, Locator, expect } from '@playwright/test';
import { testData } from '../testData';

export class LogoutPage {
    readonly page: Page;
    readonly profile: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.profile = page.locator('.profile' );
        this.logoutButton = page.locator('.logoutLink');
    }

    async Logoutflow() {    
        await this.profile.click();
        await this.page.waitForTimeout(2000);
        await this.logoutButton.click();
        await this.page.waitForTimeout(2000);
    }

    async Logout(){
        await this.Logoutflow();
    }
}