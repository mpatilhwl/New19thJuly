import { Page, Locator, expect } from '@playwright/test';
import { testData } from '../testData';

export class LoginPage extends testData{
    readonly page: Page;
    readonly loginNameInput: Locator;
    readonly loginPasswordInput: Locator;
    readonly loginButton: Locator;
    public nextURL: string;

    constructor(page: Page) {
        super();
        this.page = page;
        this.loginNameInput = page.locator('#loginName');
        this.loginPasswordInput = page.locator('#loginPassword');
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async navigateToLogin(URL: string) {
        await this.page.goto(URL);
    }

    async fillLoginName(username: string) {
        await this.loginNameInput.click();
        await this.loginNameInput.fill(username);
        await this.loginNameInput.press('Tab');
    }

    async fillPassword(password: string) {
        await this.loginPasswordInput.click();
        await this.loginPasswordInput.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
        await this.page.waitForTimeout(5000);
    }

    async login(url: string, username: string, password: string) {
        await this.navigateToLogin(url);
        await this.fillLoginName(username);
        await this.fillPassword(password);
        await this.clickLoginButton();
      
    }
}
