import * as fs from "fs";
import * as path from "path";
import { Page, expect, type Locator, type Response } from "@playwright/test";
import { BasePage } from "../Base/BasePage.js";
import { step } from "allure-js-commons";
import {generateInsuranceClaimNo,generateRegistrationNo} from "../../helpers/dataGenerators.js"

export class OrmTab extends BasePage {
  page: Page;

  // Stored XML State
  modifiedXml: string;
  extractedMessageNo: string;
  incrementedMessageNo: string;
  transactionUuid: string;
  capturedXmlContent: string;
  changedPartValues: number[];
  changedGrandTotalExTax: number;
  changedTaxAmount: number;
  changedGrandTotalIncTax: number;

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
  messageTypeOption: Locator;
  // Orm Tab
  ormTab: Locator;
  quoteStatusSelect: Locator;
  ormDropdown: Locator;
  submitQuote: Locator;
  angleNextButton: Locator;
  submitORMButton: Locator;
  viewMsgs: Locator;
  viewMsgsFirstRow: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;

    // Stored XML State
    this.modifiedXml = "";
    this.extractedMessageNo = "";
    this.incrementedMessageNo = "";
    this.transactionUuid = "";
    this.capturedXmlContent = "";
    this.changedPartValues = [];
    this.changedGrandTotalExTax = 0;
    this.changedTaxAmount = 0;
    this.changedGrandTotalIncTax = 0;

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
    this.messageTypeOption = this.page.getByRole("combobox").first();
    // ORM Tab
    this.ormTab = this.page.getByRole("link", { name: "message ORM" });
    this.quoteStatusSelect = this.page.locator("tr", { hasText: "Quote Status" }).locator("select");
    this.ormDropdown = this.page.getByRole("button", { name: /^ORM$/ });
    this.submitQuote = this.page.locator("a.dropdown-item", {hasText: "Submit Quote"});
    this.angleNextButton = this.page.locator('button[data-tooltip="Next"]:has(i.mdi-chevron-right)');
    this.submitORMButton = this.page.locator('button[data-tooltip="Submit"]');
    this.viewMsgs = this.page.locator("a.dropdown-item", {hasText: "View Messages"});
    this.viewMsgsFirstRow = this.page.locator(".button.is-primary.is-small").first();
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

  async clickLoadMessageButton(expectedH1?: string,expectedQuoteStatus?: string,): Promise<Page | undefined> {
    if (expectedH1) {
      return await step("Click Load Message, verify preview tab, close it, click Yes, switch to new tab, and verify quote status",async () => {
          const oldPage = this.page;
          const [previewTab] = await Promise.all([oldPage.context().waitForEvent("page"),this.loadMessageButton.click()]);
          await previewTab.waitForLoadState("domcontentloaded");
          await expect(previewTab.getByRole("heading", { name: expectedH1 }),).toBeVisible();
          await previewTab.close();
          const [newTab] = await Promise.all([oldPage.context().waitForEvent("page"),this.yesButton.click()]);
          await newTab.waitForLoadState("domcontentloaded");
          this.page = newTab;
          this.rebindLocators();
          if (expectedQuoteStatus) {
            await this.openORMTab();
            await this.validateQuoteStatus(expectedQuoteStatus);
          }
          return newTab;
        },
      );
    }
    await step("Click Load Message button", async () => {
      await this.loadMessageButton.click();
    });
    return undefined;
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

  async openORMDropdown(): Promise<void> {
    await step("Click ORM dropdown", async () => {
      await this.ormDropdown.click();
    });
  }

  async clickSubmitQuote(): Promise<void> {
    await step("Click Submit Quote from dropdown", async () => {
      await this.submitQuote.click();
    });
  }

  async clickAngleNextButton(): Promise<void> {
    await step("Click ORM Next button with angle icon", async () => {
      await this.angleNextButton.click();
    });
  }

  async fillAllCommentInputsWithSpecialChars(): Promise<void> {
    await step("Fill all comment inputs with special characters", async () => {
      const inputs = this.page.locator("td.is-comment-input input.input");
      const count = await inputs.count();
      for (let i = 0; i < count; i++) {
        await inputs.nth(i).fill("!@#$%^&*()");
      }
    });
  }

  async clickORMSubmitButton(): Promise<void> {
    await step("Click ORM Submit button", async () => {
      await this.submitORMButton.click();
    });
  }

  async clickViewMessages(): Promise<void> {
    await step("Click View Messages from dropdown", async () => {
      await this.viewMsgs.click();
    });
  }

  async selectViewMsgFirstRow(): Promise<void> {
    await step("Select First Row from the View Messages", async () => {
      // Register listener BEFORE click; remove itself after first match to avoid duplicates
      const responsePromise = new Promise<{uuid: string;messageData: string}>((resolve, reject) => {
        const handler = async (response: Response) => {
          const url = response.url();
          const match = url.match(/webservicetransactions\/([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})$/);
          if (match) {
            this.page.off("response", handler);
            const uuid = match[1];
            try {
              const data = await response.json();
              resolve({ uuid, messageData: data.messageData as string });
            } catch (e) {
              reject(new Error(`Failed to parse API response as JSON: ${e}`));
            }
          }
        };
        this.page.on("response", handler);
      });
      await this.viewMsgsFirstRow.click();
      const { uuid, messageData } = await Promise.race([
        responsePromise,
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Response capture timed out after 10s")),10000),
        ),
      ]);
      this.transactionUuid = uuid;
      this.capturedXmlContent = messageData;
      await this.page.locator(".CodeMirror").waitFor({ state: "visible", timeout: 10000 });
    });
    await this.closeViewMessagesModal();
  }

  async closeViewMessagesModal(): Promise<void> {
    await step("Close View ORM Messages modal", async () => {
      const viewMsgsModal = this.page.locator(".modal.is-active", { hasText: "View ORM Messages" });
      await viewMsgsModal.locator(".modal-card-foot").getByRole("button", { name: "Close", exact: true }).click();
      // Wait until the modal (and its backdrop) is gone so it can't block later navbar clicks
      await expect(viewMsgsModal).toBeHidden();
    });
  }

  async getXmlContent(): Promise<string> {
    return await step("Get XML content from API", async () => {
      if (!this.capturedXmlContent) {
        throw new Error(
          "No XML content captured. Ensure selectViewMsgFirstRow() was called first.",
        );
      }
      return this.capturedXmlContent;
    });
  }

  // Replaces QR with A in Status
  replaceQRWithA(xml: string): string {
    return xml.replace(/<Status>QR<\/Status>/, "<Status>A</Status>");
  }

  // Replaces CP with A in QuoteType
  replaceCPWithA(xml: string): string {
    return xml.replace(
      /<QuoteType>CP<\/QuoteType>/,
      "<QuoteType>A</QuoteType>",
    );
  }

  // Extracts the current MessageNo from XML
  extractMessageNo(xml: string): string {
    const match = xml.match(/<MessageNo>(\d+)<\/MessageNo>/);
    return match ? match[1] : "0";
  }

  // Increments MessageNo by 1
  incrementMessageNo(xml: string): string {
    return xml.replace(
      /<MessageNo>(\d+)<\/MessageNo>/,
      (_, messageNo) => `<MessageNo>${Number(messageNo) + 1}</MessageNo>`,
    );
  }

  // Replaces all occurrences of ADDED with ACCEPTED in the XML
  replaceAddedWithAccepted(xml: string): string {
    return xml.replace(/ADDED/g, "ACCEPTED");
  }

  // Adds an Assessment block between </Totals> and <Customer>
  addAssessmentBlock(xml: string): string {
    const assessmentBlock = `</Totals>
        <Assessment>
            <AssessmentDate>2024-12-21+11:00</AssessmentDate>
            <AssessorName>Virat Kohli</AssessorName>
            <AssessorPhone>0487654332</AssessorPhone>
        </Assessment>
        <Customer>`;
    return xml.replace(/<\/Totals>\s*<Customer>/, assessmentBlock);
  }

  // Applies all XML modifications
  modifyQMLQuote(xml: string): string {
    let updatedXml = xml;
    updatedXml = this.incrementMessageNo(updatedXml); // MessageNo 1 → 2
    updatedXml = this.replaceQRWithA(updatedXml); // Status QR → A
    updatedXml = this.replaceCPWithA(updatedXml); // QuoteType CP → A
    updatedXml = this.replaceAddedWithAccepted(updatedXml); // ADDED → ACCEPTED
    updatedXml = this.addAssessmentBlock(updatedXml); // Add Assessment block
    return updatedXml;
  }

  async getAndModifyQMLQuote(): Promise<string> {
    return await step(
      "Read, modify, and store updated XML (without pasting)",
      async () => {
        const xmlContent = await this.getXmlContent();
        this.extractedMessageNo = this.extractMessageNo(xmlContent);
        this.incrementedMessageNo = String(Number(this.extractedMessageNo) + 1);
        this.modifiedXml = this.modifyQMLQuote(xmlContent);
        return this.modifiedXml;
      },
    );
  }

  async pasteModifiedQMLQuote(): Promise<void> {
    await step("Paste stored modified XML into CodeMirror editor", async () => {
      if (!this.modifiedXml) {
        throw new Error("No modified XML found. Ensure getAndModifyQMLQuote() was called before pasteModifiedQMLQuote().");
      }
      // Wait for CodeMirror element and instance to be ready
      await this.page.locator(".CodeMirror").waitFor({ state: "visible", timeout: 10000 });
      await this.page.waitForFunction(() => {
          const cm = (document.querySelector(".CodeMirror") as any)?.CodeMirror;
          return !!cm;
        },
        { timeout: 15000 },
      );
      // Set the modified XML (new message editor starts empty — no prior content check needed)
      await this.page.evaluate((xmlText: string) => {
        const cmInstance = (document.querySelector(".CodeMirror") as any).CodeMirror;
        cmInstance.setValue(xmlText);
        cmInstance.refresh();
      }, this.modifiedXml);

      // Verify the content was set correctly
      await this.page.waitForFunction(
        (xmlText: string) => {
          const cm = (document.querySelector(".CodeMirror") as any)?.CodeMirror;
          return cm && cm.getValue().trim() === xmlText.trim();
        },
        this.modifiedXml,
        { timeout: 10000 },
      );
    });
  }

  async clickQMLQuote(): Promise<void> {
    await step("Select QML Quote from dropdown", async () => {
      await this.messageTypeOption.selectOption({ label: "QML Quote" });
    });
  }
}