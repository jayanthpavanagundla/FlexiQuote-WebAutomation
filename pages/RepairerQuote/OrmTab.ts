import * as fs from "fs";
import * as path from "path";
import { Page, expect, type Response, type Locator } from "@playwright/test";
import { BasePage } from "../Base/BasePage.js";
import { step } from "allure-js-commons";
import {generateInsuranceClaimNo,generateRegistrationNo,getFutureDateTime} from "../../helpers/dataGenerators.js"

export class OrmTab extends BasePage {
  page: Page;
  uidInput: Locator;
  messageNoInput: Locator;
  regNoInput: Locator;
  filterButton: Locator;
  loadMessageButton: Locator;
  nextBtn: Locator;
  existingUserRadioBtn: Locator;
  activeModal: Locator;
  firstVisibleRow: Locator;
  continueButton: Locator;
  yesButton: Locator;
  // Orm Tab
  ormTab: Locator;
  quoteStatusSelect: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;

    this.uidInput = page.getByPlaceholder("UID");
    this.messageNoInput = page.getByPlaceholder("Message No.");
    this.regNoInput = this.page.getByPlaceholder("Rego");
    this.filterButton = this.page.getByRole("button", { name: "Filter" });
    this.loadMessageButton = this.page.locator('a[data-tooltip="Load Message"]').nth(0);
    this.nextBtn = this.page.getByRole("button", { name: "Next" });
    this.existingUserRadioBtn = this.page.locator('label[for="reuse"]');
    this.activeModal = this.page.locator(".modal.is-active");
    this.firstVisibleRow = this.activeModal.locator("table:visible tbody tr").first();
    this.continueButton = this.page.locator('button[data-tooltip="Continue"]');
    this.yesButton = this.page.locator(".modal.is-active button.button.is-primary", {hasText: /^Yes\s*$/}).first();
    // ORM Tab
    this.ormTab = this.page.getByRole("link", { name: "message ORM" });
    this.quoteStatusSelect = this.page.locator("tr", { hasText: "Quote Status" }).locator("select");
  }

  async openORMTab(): Promise<void> {
    await step("Click ORM tab", async () => {
      await this.ormTab.click();
    });
  }

  async validateQuoteStatus(expectedStatus: string): Promise<void> {
    await step(`Validate Quote Status is: ${expectedStatus}`, async () => {
      await expect(this.quoteStatusSelect).toBeVisible();
      const selectedStatus = await this.quoteStatusSelect.locator("option:checked").innerText();
      const actualStatus = selectedStatus.trim();
      expect(actualStatus).toBe(expectedStatus);
    });
  }

  // Load RFQ Methods
  async pasteRfqXml(): Promise<{insuranceClaimNo: string;registrationNo: string}> {
    return await step("Paste RFQ XML into CodeMirror editor", async () => {
      const insuranceClaimNo = generateInsuranceClaimNo();
      const registrationNo = generateRegistrationNo();
      const templatePath = path.resolve(__dirname, "../../helpers/orm/rfq-request.xml");
      let xml = fs.readFileSync(templatePath, "utf-8");
      xml = xml.replace("{{INSURANCE_CLAIM_NO}}", insuranceClaimNo);
      xml = xml.replace("{{REGISTRATION_NO}}", registrationNo);
      await step("Focus CodeMirror editor", async () => {
        await this.page.locator(".CodeMirror").click();
      });
      await step("Inject RFQ XML content into CodeMirror", async () => {
        await this.page.evaluate((xmlContent: string) => {
          const cmInstance = (document.querySelector(".CodeMirror") as any).CodeMirror;
          cmInstance.setValue(xmlContent);
        }, xml);
      });
      return { insuranceClaimNo, registrationNo };
    });
  }

  async clickUidInput(uid: string): Promise<void> {
    await step(`Entered UID: ${uid}`, async () => {
      await this.uidInput.fill(uid);
    });
  }

  async clickMessageNoInput(messageNo: string): Promise<void> {
    await step(`Entered Message No.: ${messageNo}`, async () => {
      await this.messageNoInput.fill(messageNo);
    });
  }

  async clickRegNoInput(regNo: string): Promise<void> {
    await step(`Entered Registration No.: ${regNo}`, async () => {
      await this.regNoInput.fill(regNo);
    });
  }

  async clickFilterButton(): Promise<void> {
    await step("Click Filter button", async () => {
      await this.filterButton.click();
    });
  }

  async clickLoadMessageButton() {
    await step("Click Load Message button", async () => {
      await this.loadMessageButton.click();
    });
  }

  async clickNextButton(): Promise<void> {
    await step("Click Next button", async () => {
      await this.nextBtn.click();
    });
  }

  async selectInsurer(insurerName: string): Promise<void> {
    await step(`Select Insurer: ${insurerName}`, async () => {
      const insurerBox = this.page.locator(".modal-card-body .box").filter({ has: this.page.locator("label.label", { hasText: "Please select an insurer" }) });
      await expect(insurerBox).toBeVisible();
      // Exact match on the Name column, so "NRMA" doesn't also match "NRMA Insurance"
      const escaped = insurerName.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const nameCell = this.page.locator("td:first-child", { hasText: new RegExp(`^\\s*${escaped}\\s*$`) });
      const insurerRow = insurerBox.locator("tbody tr").filter({ has: nameCell });
      await expect(insurerRow, `Insurer "${insurerName}" not found in Select Insurer list`).toHaveCount(1);
      await insurerRow.click();
    });
  }

  async clickFirstRow(): Promise<void> {
    await step("Click the first row of the table", async () => {
      await this.firstVisibleRow.click();
    });
  }

  async clickExistingUserRadioButton(): Promise<void> {
    await step("Select Existing User radio button", async () => {
      await this.existingUserRadioBtn.click();
    });
  }

  private rebindLocators(): void {
    this.ormTab = this.page.getByRole("link", { name: "message ORM" });
    this.quoteStatusSelect = this.page.locator("tr", { hasText: "Quote Status" }).locator("select");
  }

  async clickContinueAndVerify(expectedH1: string,): Promise<{ quoteTab: Page; quoteNumber: string }> {
    return await step("Click Continue, verify new tab, click Yes, and capture quote number",async () => {
        const [previewTab] = await Promise.all([this.page.context().waitForEvent("page"),this.continueButton.click()]);
        await previewTab.waitForLoadState("domcontentloaded");
        await expect(previewTab.getByRole("heading", { name: expectedH1 })).toBeVisible();
        await previewTab.close();
        const [quoteTab] = await Promise.all([this.page.context().waitForEvent("page"),this.yesButton.click()]);
        await quoteTab.waitForLoadState("domcontentloaded");
        const quoteNumberLocator = quoteTab.locator(".quote-info .has-text-weight-bold").first();
        const quoteNumber = (await quoteNumberLocator.innerText()).trim();
        const oldPage = this.page;
        this.page = quoteTab;
        this.rebindLocators();
        await oldPage.close();
        return { quoteTab, quoteNumber };
      },
    );
  }
}