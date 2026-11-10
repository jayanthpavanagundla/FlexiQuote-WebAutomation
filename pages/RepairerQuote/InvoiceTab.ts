import { expect, type Page, type Locator } from "@playwright/test";
import { step } from "allure-js-commons";
import { BasePage } from "../Base/BasePage.js";

export class InvoiceTab extends BasePage {
  invoiceTab: Locator;
  invoicePlusButton: Locator;
  invoiceCheckBox: Locator;
  raiseInvoiceButton: Locator;
  
  constructor(page: Page) {
    super(page);

    // Invoice Navbar
    this.invoiceTab = page.getByRole("link", {name: "receipt_long Invoice"});
    this.invoicePlusButton = page.locator(".tooltip > .button");
    this.invoiceCheckBox = page.locator('tbody tr td .pretty > input[type="checkbox"]').first();
    this.raiseInvoiceButton = page.getByRole('button', { name: 'Raise Invoice' })
  }
  
  // Navigation to Invoice Tab
  async goToInvoiceTab() {
    await step("Click Invoice tab", async () => {
      await this.invoiceTab.click();
    });
  }

  // Invoice Plus Button Click Method [AH-OFF Quotes]
  async clickInvoicePlusButton() {
    await step("Click Invoice Plus button", async () => {
      await this.invoicePlusButton.click();
    });
  }

  // Invoice CheckBox Method [AH-ON Quotes]
  async clickInvoiceCheckBox() {
    await step("Click Invoice CheckBox", async () => {
      await this.invoiceCheckBox.check();
      await expect(this.invoiceCheckBox).toBeChecked();
    });
  }

  // Raise Invoice Button Click Method [AH-OFF and AH-ON Quotes]
  async clickRaiseInvoiceButton() {
    await step("Click Raise Invoice button", async () => {
      await this.raiseInvoiceButton.click();
    });
  }
}
