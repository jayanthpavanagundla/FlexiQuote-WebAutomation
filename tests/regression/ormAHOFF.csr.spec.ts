import { test, expect } from "@playwright/test";
import { NavBarPage } from "../../pages/NavBarPage";
import { SubNavBarPage } from "../../pages/SubNavBarPage";
import { HeaderTab } from "../../pages/RepairerQuote/HeaderTab";
import { QuotingTab } from "../../pages/RepairerQuote/QuotingTab";
import { OrmTab } from "../../pages/RepairerQuote/OrmTab";
import { InvoiceTab } from "../../pages/RepairerQuote/InvoiceTab";
import { epic, step } from "allure-js-commons";
import { saveState, loadState, clearState } from "../../helpers/sharedState";

const QUOTE_KEY = "ormAHOFF.quoteNumber";
let quoteNumber: string;
let addedParts: string[] = [];

test.describe("ORM Integration AHOFF", () => {
  let navBarPage: NavBarPage;
  let subNavBarPage: SubNavBarPage;
  let headerTab: HeaderTab;
  let quotingTab: QuotingTab;
  let ormTab: OrmTab;
  let invoiceTab: InvoiceTab;

  let changedPartValues: number[] = [];
  let changedGrandTotalExTax: number = 0;
  let changedTaxAmount: number = 0;
  let changedGrandTotalIncTax: number = 0;

  test.beforeEach(async ({ page }) => {
    await epic("ORM Integration AHOFF");

    navBarPage = new NavBarPage(page);
    subNavBarPage = new SubNavBarPage(page);
    headerTab = new HeaderTab(page);
    quotingTab = new QuotingTab(page);
    invoiceTab = new InvoiceTab(page);
    ormTab = new OrmTab(page);

    await page.goto("v2/");
    await expect(page).toHaveURL(/\/v2\/$/);
  });

  test("Load RFQ", async ({ page }) => {
    clearState(QUOTE_KEY);
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectORMMessages();
    await subNavBarPage.clickPlusNewButton();
    const { insuranceClaimNo, registrationNo } = await ormTab.pasteRfqXml();
    let editorValue: string = "";
    await step("Read current XML content from CodeMirror editor", async () => {
      editorValue = await page.evaluate(() => {
        const cmInstance = (document.querySelector(".CodeMirror") as any).CodeMirror;
        return cmInstance.getValue();
      });
    });
    await step(`Verify XML editor contains InsuranceClaimNo: ${insuranceClaimNo}`,async () => {
        expect(editorValue).toContain(`<InsuranceClaimNo>${insuranceClaimNo}</InsuranceClaimNo>`);
    });
    await step(`Verify XML editor contains RegistrationNo: ${registrationNo}`,async () => {
        expect(editorValue).toContain(`<RegistrationNo>${registrationNo}</RegistrationNo>`);
    });
    await ormTab.clickUidInput("PJ");
    await ormTab.clickMessageNoInput("0");
    await subNavBarPage.clickSaveButton();
    await subNavBarPage.expectToast("New ORM Messages added");
    await subNavBarPage.clickBackButton();
    await ormTab.clickRegNoInput(registrationNo);
    await ormTab.clickFilterButton();
    await ormTab.clickLoadMessageButton();
    await ormTab.clickNextButton();
    await ormTab.selectInsurer("Insurance Australia Limited");
    await ormTab.clickNextButton();
    await ormTab.clickExistingUserRadioButton();
    await ormTab.clickFirstRow();
    const result = await ormTab.clickContinueAndVerify("Print Preview");
    quoteNumber = result.quoteNumber;
    saveState(QUOTE_KEY, quoteNumber);
    subNavBarPage = new SubNavBarPage(result.quoteTab);
    navBarPage = new NavBarPage(result.quoteTab);
    await ormTab.openORMTab();
    await ormTab.validateQuoteStatus("Assessing Quote Request");
      // Making Quote AH-ON
    await subNavBarPage.disableAssessmentHistory();
    await subNavBarPage.clickSaveButton();
  });

  test("Submit Quote to ORM", async ({ page }) => {
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await headerTab.searchAndOpenQuoteByNumber(quoteNumber);
    // Vehicle Details Section
    await headerTab.selectTransmission();
    await headerTab.selectColor();
    await headerTab.fillOdometer();
    await headerTab.goToHeaderTab();
    await subNavBarPage.waitForAutoSaveCloudDone();
    // Insurer Sections
    await headerTab.enterEstimator("John Doe");
    await headerTab.goToHeaderTab();
    await subNavBarPage.waitForAutoSaveCloudDone();
    // Key Dates Section
    await headerTab.enterEstimateStartDate();
    await headerTab.enterEstimateEndDate();
    await headerTab.goToHeaderTab();
    await subNavBarPage.waitForAutoSaveCloudDone();
    // Quoting Tab
    await quotingTab.goToQuotingTab();
    await quotingTab.openVehicleSectionsTab();
    addedParts = await quotingTab.addQuotingItemsByIndex(2);
    await quotingTab.goToQuotingTab();
    await subNavBarPage.waitForAutoSaveCloudDone();
    await quotingTab.openManualSectionsTab();
    await quotingTab.randomPriceForItems();
    await quotingTab.goToQuotingTab();
    await subNavBarPage.waitForAutoSaveCloudDone();
    // ORM Tab
    await ormTab.openORMTab();
    await ormTab.openORMDropdown();
    await ormTab.clickSubmitQuote();
    await ormTab.clickAngleNextButton();
    await ormTab.fillAllCommentInputsWithSpecialChars();
    await ormTab.clickAngleNextButton();
    await ormTab.clickORMSubmitButton();
    await subNavBarPage.expectToast(`Send Quote submitted`);
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle").catch(() => {});
    await ormTab.validateQuoteStatus("Quote Submitted");
  });

  test("Load Authority", async ({ page }) => {
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await headerTab.searchAndOpenQuoteByNumber(quoteNumber);
    await ormTab.openORMTab();
    await ormTab.openORMDropdown();
    await ormTab.clickViewMessages();
    await ormTab.selectViewMsgFirstRow();
    await ormTab.getAndModifyQMLQuote();
    await subNavBarPage.clickSaveButton();
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectORMMessages();
    await subNavBarPage.clickPlusNewButton();
    await ormTab.clickUidInput("PJ");
    await ormTab.clickMessageNoInput(ormTab.incrementedMessageNo);
    await ormTab.clickQMLQuote();
    await ormTab.pasteModifiedQMLQuote();
    await subNavBarPage.clickSaveButton();
    await subNavBarPage.clickBackButton();
    await ormTab.clickLoadMessageButton("Print Preview","Quote Authorised");
  });

  test("Addition of Extra Quote Items By Insurer", async ({ page }) => {
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await headerTab.searchAndOpenQuoteByNumber(quoteNumber);
    await ormTab.openORMTab();
    await ormTab.openORMDropdown();
    await ormTab.clickViewMessages();
    await ormTab.selectViewMsgFirstRow();
    const totals = await ormTab.getAndModifyQMLQuoteWithExtraItem();
    await step("Verify modified XML contains correct GrandTotalExTax, TaxAmount and ACCEPTED status",async () => {
      expect(ormTab.modifiedXml).toContain(`<GrandTotalExTax>${ormTab.formatXmlAmount(totals.grandTotalExTax)}</GrandTotalExTax>`);
      expect(ormTab.modifiedXml).toContain(`<TaxAmount>${ormTab.formatXmlAmount(totals.taxAmount)}</TaxAmount>`);
      expect(ormTab.modifiedXml).toContain("<UpdateStatus>ACCEPTED</UpdateStatus>");
    });
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectORMMessages();
    await subNavBarPage.clickPlusNewButton();
    await ormTab.clickUidInput("PJ");
    await ormTab.clickMessageNoInput(ormTab.incrementedMessageNo);
    await ormTab.clickQMLQuote();
    await ormTab.pasteModifiedQMLQuote();
    await subNavBarPage.clickSaveButton();
    await subNavBarPage.clickBackButton();
    // Loads authority, switches to the new quote tab and lands on the ORM tab
    const newTab = await ormTab.clickLoadMessageButton("Print Preview","Quote Authorised");
    // Quote opens in a new browser tab, so point the page objects at it
    if (newTab) {
      invoiceTab = new InvoiceTab(newTab);
      subNavBarPage = new SubNavBarPage(newTab);
    }
    // Invoice Creation
    await invoiceTab.goToInvoiceTab();
    await invoiceTab.clickInvoicePlusButton();
    await invoiceTab.clickRaiseInvoiceButton();
    await subNavBarPage.expectToast(`Quote ${quoteNumber} saved`);
    // Authorised Amount Mismatch
    await ormTab.openORMTab();
    await ormTab.openORMDropdown();
    await ormTab.verifySubmitTaxInvoiceDisabled();
    await ormTab.verifyAuthorisedAmountMismatchVisible();
    // Delete Invoice 
    await invoiceTab.goToInvoiceTab();
    await invoiceTab.clickVoidInvoice();
    await subNavBarPage.expectToast(`Quote ${quoteNumber} saved`);
  });

  test("Concurrent Authority Loading with Randomized Part Prices", async ({ page }) => {
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await headerTab.searchAndOpenQuoteByNumber(quoteNumber);
    await ormTab.openORMTab();
    await ormTab.openORMDropdown();
    // Re-submit the quote to ORM before loading the next authority
    await ormTab.clickSubmitQuote();
    await ormTab.clickAngleNextButton();
    await ormTab.fillAllCommentInputsWithSpecialChars();
    await ormTab.clickAngleNextButton();
    await ormTab.clickORMSubmitButton();
    await subNavBarPage.expectToast(`Send Quote submitted`);
    await ormTab.openORMDropdown();
    await ormTab.clickViewMessages();
    await ormTab.selectViewMsgFirstRow();
    const totals = await ormTab.getAndModifyQMLQuoteWithRandomChangedPartValues();
    // Store values for further comparison in next steps/tests
    changedPartValues = totals.partValues;
    changedGrandTotalExTax = totals.grandTotalExTax;
    changedTaxAmount = totals.taxAmount;
    changedGrandTotalIncTax = totals.grandTotalIncTax;
    const expectedGrandTotalExTax = changedPartValues.reduce((sum, value) => sum + value,0);
    const expectedTaxAmount = Math.round((expectedGrandTotalExTax * 0.1 + Number.EPSILON) * 100) / 100;
    const expectedGrandTotalIncTax = Math.round((expectedGrandTotalExTax + expectedTaxAmount + Number.EPSILON) * 100) / 100;
    await step(`Verify XML totals: Ex GST=$${changedGrandTotalExTax} | Tax=$${changedTaxAmount} | Inc GST=$${changedGrandTotalIncTax}`,async () => {
        expect(changedGrandTotalExTax).toBe(expectedGrandTotalExTax);
        expect(changedTaxAmount).toBe(expectedTaxAmount);
        expect(changedGrandTotalIncTax).toBe(expectedGrandTotalIncTax);
      },
    );
    await step("Verify modified XML contains correct GrandTotalExTax, TaxAmount and CHANGED status",async () => {
        expect(ormTab.modifiedXml).toContain(`<GrandTotalExTax>${ormTab.formatXmlAmount(changedGrandTotalExTax)}</GrandTotalExTax>`);
        expect(ormTab.modifiedXml).toContain(`<TaxAmount>${ormTab.formatXmlAmount(changedTaxAmount)}</TaxAmount>`);
        expect(ormTab.modifiedXml).toContain("<UpdateStatus>CHANGED</UpdateStatus>");
      },
    );
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectORMMessages();
    await subNavBarPage.clickPlusNewButton();
    await ormTab.clickUidInput("PJ");
    await ormTab.clickMessageNoInput(ormTab.incrementedMessageNo);
    await ormTab.clickQMLQuote();
    await ormTab.pasteModifiedQMLQuote();
    await subNavBarPage.clickSaveButton();
    await subNavBarPage.clickBackButton();
    const newTab = await ormTab.clickLoadMessageButton("Print Preview","Quote Authorised");
    if (newTab) {subNavBarPage = new SubNavBarPage(newTab);}
    const { totalExGst, totalIncGst } = await subNavBarPage.fetchHeaderTotals();
    const toAmount = (text: string): number => {
      const match = text.match(/-?\$?\s*([\d,]+(?:\.\d+)?)/);
      if (!match) {throw new Error(`Unable to extract amount from header text: "${text}"`)}
      return Number(match[1].replace(/,/g, ""));
    };
    const totalExGstAmount = toAmount(totalExGst);
    const totalIncGstAmount = toAmount(totalIncGst);
    const expectedGrandTotalExTax01 = subNavBarPage.parseXmlAmount(ormTab.modifiedXml,"GrandTotalExTax");
    const expectedTaxAmount01 = subNavBarPage.parseXmlAmount(ormTab.modifiedXml,"TaxAmount");
    const expectedTotalIncGst = Math.round((expectedGrandTotalExTax01 + expectedTaxAmount01 + Number.EPSILON) *100) / 100;
    await step(`Verify Total Ex GST: UI=$${totalExGstAmount} | XML=$${expectedGrandTotalExTax01}`,async () => {expect(totalExGstAmount).toBeCloseTo(expectedGrandTotalExTax01, 2)});
    await step(`Verify Total Inc GST: UI=$${totalIncGstAmount} | XML=$${expectedTotalIncGst}`,async () => {expect(totalIncGstAmount).toBeCloseTo(expectedTotalIncGst, 2);});
  });

  test("Submit Tax Invoice", async ({ page }) => {
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await headerTab.searchAndOpenQuoteByNumber(quoteNumber);
    await invoiceTab.goToInvoiceTab();
    await invoiceTab.clickInvoicePlusButton();
    await invoiceTab.clickRaiseInvoiceButton();
    await subNavBarPage.expectToast(`Quote ${quoteNumber} saved`);
    await ormTab.openORMTab();
    await ormTab.openORMDropdown();
    await ormTab.clickTaxInvoice();
    await ormTab.clickSendTaxInvoice();
    await subNavBarPage.expectToast(`Tax invoice is being submitted`);
    // Validations
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle").catch(() => {});
    await ormTab.openORMTab();
    await ormTab.validateQuoteStatus("Quote Invoice Submitted");
    await ormTab.openORMDropdown();
    await ormTab.verifySubmitTaxInvoiceDisabled();
  });

  test("Load Payment Authorisation", async ({ page }) => {
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await headerTab.searchAndOpenQuoteByNumber(quoteNumber);
    await ormTab.openORMTab();
    await ormTab.openORMDropdown();
    await ormTab.clickViewMessages();
    await ormTab.selectViewMsgFirstRow();
    await ormTab.getAndModifyQMLPaymentAuthorised();
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectORMMessages();
    await subNavBarPage.clickPlusNewButton();
    await ormTab.clickUidInput("PJ");
    await ormTab.clickMessageNoInput(ormTab.incrementedMessageNo);
    await ormTab.clickPaymentAuthorised();
    await ormTab.pasteModifiedQMLPaymentAuthorised();
    await subNavBarPage.clickSaveButton();
    await subNavBarPage.clickBackButton();
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await headerTab.searchAndOpenQuoteByNumber(quoteNumber);
    await ormTab.openORMTab();
    await ormTab.validateQuoteStatus("Payment Authorised");
  });

});