import pdfParse from "pdf-parse";
import { Page, Response as PlaywrightResponse } from "@playwright/test";
import { expect, type Locator } from "@playwright/test";
import { step } from "allure-js-commons";
import { BasePage } from "./Base/BasePage.js";
import { LoadFnOutput } from "node:module";

export class SubNavBarPage extends BasePage {
  ellipsis: Locator;
  previewButton: Locator;
  quoteAnalysis: Locator;
  salesAnalysis: Locator;
  printButton: Locator;

  constructor(page: Page) {
    super(page);
    
    this.ellipsis = page.getByText("more_vert");
    this.previewButton = page.locator("#preview");
    this.quoteAnalysis = page.locator('label[for="quoteAnalysis"]').filter({ hasText: /^\s*Quote Analysis\s*$/i });
    this.salesAnalysis = page.locator('label[for="salesAnalysis"]:has-text("Sales Analysis")');
    this.printButton = page.locator('button[data-tooltip="Print report"]').filter({ hasText: /^\s*Print\s*$/i });
  }
  
  // Wait for table rows to fully load before opening preview
  async waitForTableToLoad(): Promise<void> {
    await step("Wait for table to load", async () => {
      await this.page.getByRole("table").first().getByRole("row").filter({ has: this.page.locator("td") }).first().waitFor({ state: "visible" });
    });
  }

  // Method to open the preview
  async openPreview() {
    await step("Click more options menu", async () => {
      await this.ellipsis.click();
    });
    await step("Click Preview", async () => {
      await this.previewButton.click();
    });
  }

  //------------------------- Print Preview Methods -------------------------//
  // Repairer Quote Option Model Flow
  async openQuoteAnalysis() {
    await step("Click Quote Analysis", async () => {
      await expect(this.quoteAnalysis).toBeVisible();
      await this.quoteAnalysis.click();
    });

    await step("Clicking Print Button", async () => {
      await expect(this.printButton).toBeVisible();
      await this.printButton.click();
    });
  }
  // Sales Analysis Option Model Flow
  async openSalesAnalysis() {
    await step("Click Sales Analysis", async () => {
      await expect(this.salesAnalysis).toBeVisible();
      await this.salesAnalysis.click();
    });

    await step("Clicking Print Button", async () => {
      await expect(this.printButton).toBeVisible();
      await this.printButton.click();
    });
  }
  // Method to Verify Print Preview H1 Title
  async verifyPrintPreviewTitle(page: Page = this.page): Promise<void> {
    await step("Verify Print Preview title", async () => {
      await expect(page).toHaveURL(/printpreview/);
      await expect(page).toHaveTitle(/Print Preview/i);
    });
  }
  // PDF Verification Method
  async verifyPdfLoadedAndNoError(reportName: string | string[], errorText?: string, page: Page = this.page, preCapturedResponse?: PlaywrightResponse) {
    await expect(page).toHaveURL(/printpreview/);
    const reportNames = Array.isArray(reportName) ? reportName : [reportName];
    const response = preCapturedResponse
      ? preCapturedResponse
      : await page.waitForResponse(
          (res) =>
            reportNames.some((name) =>
              res.url().includes(`/reports/postreport/${name}/pdf`),
            ) &&
            res.status() === 200 &&
            res.headers()["content-type"]?.includes("application/pdf"),
        );
    await step(`Verify PDF "${reportNames.join(" or ")}" loaded successfully`, async () => {
        expect(response.ok()).toBeTruthy();
    });
    if (errorText) {
      await step(`Verify "${errorText}" is not in PDF`, async () => {
        const pdfBuffer = await response.body();
        const isPdfValid =
          pdfBuffer[0] === 0x25 &&
          pdfBuffer[1] === 0x50 &&
          pdfBuffer[2] === 0x44 &&
          pdfBuffer[3] === 0x46;
        expect(isPdfValid, "Response is not a valid PDF").toBeTruthy();
        const pdfData = await pdfParse(pdfBuffer);
        const normalizedPdfText = pdfData.text.replace(/\s+/g, " ");
        const normalizedErrorText = errorText.replace(/\s+/g, " ");
        expect.soft(normalizedPdfText,`Error found in PDF: "${errorText}" should NOT be present`).not.toContain(normalizedErrorText);
      });
    }
    return response;
  }

}
