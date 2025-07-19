import { Page, Locator } from "@playwright/test";

export class StaffPoolPage {
  private page: Page;
  private staffPool: Locator;
  private searchStaffName: Locator;
  private searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.staffPool = page.locator("//span[normalize-space()='Staff Pool']");
    this.searchStaffName = page.locator("#staffId");
    this.searchButton = page.locator("#srrchBtn");
   

  }

  async navigateToStaffPool() {
    await this.staffPool.click();
    await this.page.waitForTimeout(2000); // Wait for the staff pool to load    
  }
  async searchStaffByName() {
    await this.searchStaffName.click();
    await this.searchStaffName.fill("Gabriel");
    await this.searchButton.click();
    await this.page.waitForTimeout(2000); // Wait for the search results to load
    return this.page.locator("//tr[@id='rowNum7819']//span[@id='staffName']");
  }
}