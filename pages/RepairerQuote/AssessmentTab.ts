import { expect, type Page, type Locator } from "@playwright/test";
import { step } from "allure-js-commons";
import { BasePage } from "../Base/BasePage.js";

export class AssessmentTab extends BasePage {
  assessmentsTab: Locator;
  authoriseButton: Locator;
  authoriseCheckbox: Locator;
  confirmAuthoriseButton: Locator;

  
  constructor(page: Page) {
    super(page);

    // Assessment Navbar
    this.assessmentsTab = page.getByRole("link", {name: "verified_user Assessments"});
    this.authoriseButton = page.locator('a[data-tooltip="Submit authorise"]');
    this.authoriseCheckbox = page.locator("div.pretty", {has: page.locator('label:has-text("Select All Items")')}).locator("div.state");
    this.confirmAuthoriseButton = page.locator('a[data-tooltip="Autorise selected items"]');
  }
  
  // Navigation to Assessments Tab
  async goToAssessmentsTab() {
    await step("Click Assessments tab", async () => {
      await this.assessmentsTab.click();
    });
  }

  // Authorise AH-ON Quote
  async authoriseAHONQuote() {
    await step("Authorise AH-ON Quote", async () => {
      await expect(this.authoriseButton).toBeEnabled();
      await this.authoriseButton.click();
    });
    await step("Verify Confirm Authorise is disabled", async () => {
      await expect(this.confirmAuthoriseButton).toHaveAttribute("disabled","disabled");
    });
    await step("Check Select All Items", async () => {
      await this.authoriseCheckbox.click({ force: true });
    });
    await step("Click Confirm Authorise", async () => {
      await expect(this.confirmAuthoriseButton).not.toHaveAttribute("disabled");
      await this.confirmAuthoriseButton.click();
    });
  }

  async verifyQuoteStatusAuthorised() {
    await expect(this.page.locator(".tag.is-success", { hasText: "Authorised" })).toContainText("Authorised");
  }
}
