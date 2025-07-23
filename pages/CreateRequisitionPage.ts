import { Page } from "@playwright/test";
export class CreateRequisitionPage {
    readonly page:Page;
    // readonly requisitoinMenu: string;
    // readonly createRequisitionButton: string;   

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToRequisition() {
        await this.page.locator("//span[normalize-space()='Requisitions']").click();
        await this.page.waitForTimeout(2000); // Adjust timeout as necessary
        await this.page.locator("//a[normalize-space()='Create Requisition']").click();
        await this.page.waitForTimeout(2000); // Adjust timeout as necessary
        await this.page.locator("a[id='closeRequisitionWizard'] span[aria-hidden='true']").click();
        await this.page.waitForTimeout(2000); // Adjust timeout as necessary
    }
}