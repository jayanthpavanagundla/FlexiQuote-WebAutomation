import pdfParse from "pdf-parse";
import { Page, Response as PlaywrightResponse } from "@playwright/test";
import { expect, type Locator } from "@playwright/test";
import { step, attachment, ContentType} from "allure-js-commons";
import { BasePage } from "./Base/BasePage.js";

export class SubNavBarPage extends BasePage {
  addNewButton: Locator;
  quoteNumberText: Locator;
  createButton: Locator;
  cloudDoneIcon: Locator;
  syncIcon: Locator;
  ellipsis: Locator;
  assessmentHistoryOff: Locator;
  assessmentHistoryOn: Locator;
  saveButton: Locator;
  previewButton: Locator;
  quoteAnalysis: Locator;
  salesAnalysis: Locator;
  printButton: Locator;
  okButton: Locator;
  noRecordsMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.addNewButton = page.getByText("addNew");
    this.quoteNumberText = page.locator("div.quote-info span.is-size-4.has-text-weight-bold");
    this.createButton = page.getByText("saveCreate");
    this.cloudDoneIcon = page.locator("span.material-symbols-rounded", { hasText: "cloud_done" }).first();
    this.syncIcon = page.locator("span.material-symbols-rounded.loading", { hasText: "sync" }).first();
    this.ellipsis = page.getByText("more_vert");
    this.assessmentHistoryOff = page.getByText("check_box_outline_blank Enable Assessment History");
    this.assessmentHistoryOn = page.getByText("check_box Enable Assessment History");
    this.saveButton = page.locator("a#save").nth(1);
    this.previewButton = page.locator("#preview");
    this.quoteAnalysis = page.locator('label[for="quoteAnalysis"]').filter({ hasText: /^\s*Quote Analysis\s*$/i });
    this.salesAnalysis = page.locator('label[for="salesAnalysis"]:has-text("Sales Analysis")');
    this.printButton = page.locator('button[data-tooltip="Print report"]').filter({ hasText: /^\s*Print\s*$/i });
    this.okButton = page.locator('button[data-tooltip="Generate report(s)"]:has-text("Ok")');
    this.noRecordsMessage = page.locator("div.content.has-text-centered").filter({ has: page.locator("i.mdi-emoticon-sad") }).filter({ hasText: /^\s*Nothing\s*$/ });
  }

  // Toast Validation Method
  getToast(message: string): Locator {
    const toastMsg = this.page.getByRole("alert").filter({ hasText: message });
    return toastMsg;
  }
  async expectToast(message: string): Promise<void> {
    await step(`Verify toast message: "${message}"`, async () => {
      await expect(this.getToast(message)).toBeVisible();
    });
  }

  async clickCreateButton() {
    await step("Click Create button", async () => {
      await this.createButton.click();
    });
  }

  // Quote Number Extraction and Storage
  async extractAndStoreQuoteNumber(): Promise<string> {
    return await step("Extract quote number", async () => {
      await expect(this.quoteNumberText).toBeVisible();
      const quoteNumber = (await this.quoteNumberText.textContent())?.trim();
      if (!quoteNumber) {
        throw new Error("Quote number was not found or text is empty");
      }
      await step(`Extracted Quote Number: ${quoteNumber}`, async () => {});
      return quoteNumber;
    });
  }

  // New + Button Click
  async clickPlusNewButton() {
    await step("Click New button", async () => {
      await this.addNewButton.click();
    });
  }

  // Handle AutoSave Sync
  async waitForAutoSaveCloudDone() {
    await step("Wait for Auto Save Cloud Done", async () => {
      try {
        await expect(this.syncIcon).toBeVisible();
      } catch {
        // sync may finish very fast, so ignore
      }
      await expect(this.syncIcon).toBeHidden();
      await expect(this.cloudDoneIcon).toBeVisible();
    });
  }

  // Enable Assessment History (AH-ON)
  async enableAssessmentHistory() {
    await step("Enable Assessment History", async () => {
      const menuAlreadyOpen =(await this.assessmentHistoryOn.isVisible()) || (await this.assessmentHistoryOff.isVisible());
      if (!menuAlreadyOpen) {
        await this.ellipsis.click();
      }
      if (await this.assessmentHistoryOn.isVisible()) {
        // Already enabled
        await this.ellipsis.click();
        return;
      }
      if (await this.assessmentHistoryOff.isVisible()) {
        await this.assessmentHistoryOff.click();
      }
    });
  }

  // Disable Assessment History (AH-OFF)
  async disableAssessmentHistory() {
    await step("Disable Assessment History", async () => {
      const menuAlreadyOpen =(await this.assessmentHistoryOn.isVisible()) || (await this.assessmentHistoryOff.isVisible());
      if (!menuAlreadyOpen) {
        await this.ellipsis.click();
      }
      if (await this.assessmentHistoryOff.isVisible()) {
        // Already disabled
        await this.ellipsis.click();
        return;
      }
      if (await this.assessmentHistoryOn.isVisible()) {
        await this.assessmentHistoryOn.click();
      }
    });
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

  async clickSaveButton(timeout = 3000): Promise<void> {
  await step("Click Save if visible", async () => {
    const isVisible = await this.saveButton.waitFor({ state: "visible", timeout }).then(() => true).catch(() => false);
      if (isVisible) {
        await this.saveButton.click();
      }
    });
  }

  // Due In Due Out Date Filter Options
  async selectDueInDueOutDateFilter(
    option:
      | "today"
      | "tomorrow"
      | "next7days"
      | "lastweek"
      | "thismonth"
      | "custom",
  ): Promise<void> {
    await step(`Select date filter: ${option}`, async () => {
      await this.page.locator("select.has-text-weight-bold").selectOption(option);
    });
  }

  async isNoRecordsFound(timeout = 3000): Promise<boolean> {
    return await step("Check if records exist in table", async () => {
      const firstDataRow = this.page.getByRole("table").first().getByRole("row").filter({ has: this.page.locator("td") }).first();
      // Wait for either a data row or the empty-state message
      await firstDataRow.or(this.noRecordsMessage).first()
        .waitFor({ state: "visible", timeout });
      const noRecords = await this.noRecordsMessage.isVisible();
      if (noRecords) {
        await step("No Records Found - skipping remaining steps", async () => {});
      }
      return noRecords;
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
    // NEW: always attach the PDF text, whether the later check passes or fails
    await step("PDF content", async () => {
      const pdfBuffer = await response.body();
      let content: string;
      try {
        content = (await pdfParse(pdfBuffer)).text.trim() || "(PDF has no extractable text)";
      } catch (e) {
        content = `Could not read PDF text: ${String(e)}`;
      }
      await attachment(`${reportNames.join("_")} - PDF content`, content, ContentType.TEXT);
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

  // Select First Row from Table
  async openFirstRecordFromTable(route: string, excludeInvPrefix?: string, clickEdit: boolean = false): Promise<void> {
    await step(`Open first record from table on route: ${route}${excludeInvPrefix ? ` (skip Inv No starting with ${excludeInvPrefix})` : ""}${clickEdit ? " (via Edit button)" : ""}`, async () => {
      await this.page.waitForURL(`**${route}**`);
      const table = this.page.getByRole("table").first();
      let rows = table.getByRole("row").filter({ has: this.page.locator("td") });
      if (excludeInvPrefix) {
        rows = rows.filter({
          hasNot: this.page.locator("td:first-child a", {
            hasText: new RegExp(`^\\s*${excludeInvPrefix}`, "i"),
          }),
        });
      }
      const firstDataRow = rows.first();
      await expect(firstDataRow,excludeInvPrefix ? `No row found without Inv No prefix "${excludeInvPrefix}"` : undefined).toBeVisible();
      let link: Locator;
      if (clickEdit) {
        // Edit (pencil) button in the row
        link = firstDataRow.locator("a:has(i.mdi-lead-pencil)").first();
      } else {
        const firstHrefLink = firstDataRow.locator("a[href]").first();
        const hasVisibleHref = await firstHrefLink.isVisible().catch(() => false);
        link = hasVisibleHref ? firstHrefLink : firstDataRow.locator("a").first();
      }
      await expect(link).toBeVisible();
      const urlBeforeClick = this.page.url();
      await link.click();
      await this.page.waitForURL((url) => url.toString() !== urlBeforeClick, {waitUntil: "domcontentloaded"});
      await Promise.race([
        this.page.locator('div[name="headerMoreButtons"]').waitFor({ state: "visible" }),
        this.page.locator("a.button.is-primary.is-outlined.is-inverted").waitFor({ state: "visible" }),
        this.page.locator("button.button.is-primary").first().waitFor({ state: "visible" }),
      ]);
    });
  }

  // Specific Preview OK Modal 
  async clickOkButton(opensNewTab: boolean = false): Promise<Page | undefined> {
    let newTab: Page | undefined;
    await step("Click Ok button", async () => {
      if (opensNewTab) {
        // Case 2: New tab
        const [tab] = await Promise.all([
          this.page.context().waitForEvent("page"),
          this.okButton.click(),
        ]);
        await tab.waitForLoadState("domcontentloaded");
        await expect(tab).toHaveURL(/printpreview/);
        newTab = tab;
      } else {
        // Case 1: Same tab
        await this.okButton.click();
      }
    });
    return newTab;
  }

  // Check First Row Checkbox [Receipt Entry]
  async checkFirstRowCheckbox(printButtonText: string = "Print Statement"): Promise<{ newTab: Page; response: PlaywrightResponse }> {
    let newTab!: Page;
    let response!: PlaywrightResponse;
    await step(`Check checkbox and open ${printButtonText}`, async () => {
      const table = this.page.getByRole("table").first();
      const firstDataRow = table.getByRole("row").filter({ has: this.page.locator("td") }).first();
      await expect(firstDataRow).toBeVisible();
      const checkbox = firstDataRow.locator('input[type="checkbox"]').first();
      // Row may already be checked (and disabled) by default - only tick it if needed
      if (!(await checkbox.isChecked())) {
        await checkbox.check();
      }
      await expect(checkbox).toBeChecked();
      const printButton = this.page.locator("button.button.is-primary", {hasText: printButtonText});
      // Listen on the context BEFORE clicking: the new tab requests the PDF while it loads,
      // so a listener registered after the tab opens can miss the response.
      const pdfResponsePromise = this.page.context().waitForEvent("response", {
        predicate: (res) =>
          /\/reports\/postreport\/[^/]+\/pdf/.test(res.url()) &&
          res.status() === 200 &&
          (res.headers()["content-type"] ?? "").includes("application/pdf"),
      });
      const [tab] = await Promise.all([this.page.context().waitForEvent("page"),printButton.click()]);
      await tab.waitForLoadState("domcontentloaded");
      await expect(tab).toHaveURL(/\/v2\/printpreview\//);
      newTab = tab;
      response = await pdfResponsePromise;
    });
    return { newTab, response };
  }

  // UnCheck First Row Checkbox [Receipt Entry]
  async uncheckFirstRowCheckbox(): Promise<void> {
    await step("Uncheck the first row checkbox", async () => {
      const table = this.page.getByRole("table").first();
      const firstDataRow = table.getByRole("row").filter({ has: this.page.locator("td") }).first();
      await expect(firstDataRow).toBeVisible();
      const checkbox = firstDataRow.locator('input[type="checkbox"]').first();
      await expect(checkbox).toBeVisible();
      // A disabled checkbox can't be unchecked by a user either - skip it instead of hanging
      if (await checkbox.isDisabled()) {
        return;
      }
      await checkbox.uncheck();
      await expect(checkbox).not.toBeChecked();
    });
  }

  // Outstanding Quote Specific Preview Flow
  async captureFirstQuoteNoAfterAction(urlPattern: string,action: () => Promise<void>): Promise<string> {
    return await step("Capture first quoteNo from sorted list response",async () => {
      let firstQuoteNo = "";
      await this.page.route(`**${urlPattern}**`, async (route) => {
        try {
          const apiResponse = await route.fetch();
          const data = (await apiResponse.json()) as Record<
            string,
            unknown
          >[];
          if (data.length > 0) {
            firstQuoteNo = String(data[0].quoteNo ?? "");
          }
          await route.fulfill({ response: apiResponse });
        } catch {
          await route.continue();
        }
      });
      await action();
      await this.page.waitForResponse(
        (res) => res.url().includes(urlPattern) && res.status() === 200,
      );
      await this.page.unroute(`**${urlPattern}**`);
      return firstQuoteNo;
    },
  )}

  async openRecordByQuoteNoFromTable(quoteNo: string): Promise<void> {
    await step(`Open record for quote ${quoteNo}`, async () => {
      const targetRow = this.page.getByRole("table").first().getByRole("row").filter({ has: this.page.locator("td") }).filter({ hasText: quoteNo }).first();
      await expect(targetRow).toBeVisible();
      const hrefLink = targetRow.locator("a[href]").first();
      const hasHref = await hrefLink.isVisible().catch(() => false);
      const link = hasHref ? hrefLink : targetRow.locator("a").first();
      await expect(link).toBeVisible();
      const urlBefore = this.page.url();
      await link.click();
      await this.page.waitForURL((url) => url.toString() !== urlBefore, {
        waitUntil: "domcontentloaded",
      });
      await Promise.race([
        this.page.locator('div[name="headerMoreButtons"]').waitFor({ state: "visible" }),
        this.page.locator("a.button.is-primary.is-outlined.is-inverted").waitFor({ state: "visible" }),
        this.page.locator("button.button.is-primary").first().waitFor({ state: "visible" }),
      ]);
    });
  }
}
