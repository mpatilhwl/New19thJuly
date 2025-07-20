import { Locator, Page } from "@playwright/test";

export class SelectProgType {
  private page: Page;
  private programTypeDropdown: Locator;
  private programType: Locator;

  constructor(page: Page) {
    this.page = page;
    this.programTypeDropdown = page.locator("//div[@class='nice-select select-box add-select input__field input__field--hoshi custom-select']");
    this.programType = page.locator("//li[normalize-space()='AP and Physician']");
  }

  async selectProgramType() {
    await this.programTypeDropdown.click();
    await this.page.waitForTimeout(1000);  // Wait for the program type to be selected
    await this.programType.click();
    await this.page.waitForTimeout(3000);  // Wait for the selection to be confirmed
}
}