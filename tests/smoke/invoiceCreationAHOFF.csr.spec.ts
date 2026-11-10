import {test,expect,type Response as PlaywrightResponse} from "@playwright/test";
import { NavBarPage } from "../../pages/NavBarPage";
import { SubNavBarPage } from "../../pages/SubNavBarPage";
import { HeaderTab } from "../../pages/RepairerQuote/HeaderTab";
import { QuotingTab } from "../../pages/RepairerQuote/QuotingTab";
import { InvoiceTab } from "../../pages/RepairerQuote/InvoiceTab";
import { epic, feature, step } from "allure-js-commons";
import { saveState, loadState, clearState } from "../../helpers/sharedState";

const QUOTE_KEY = "invoiceCreationAHOFF.quoteNumber";
let quoteNumber: string;
let addedParts: string[] = [];

test.describe("Invoice for AH-OFF Quotes", () => {
  let navBarPage: NavBarPage;
  let subNavBarPage: SubNavBarPage;
  let headerTab: HeaderTab;
  let quotingTab: QuotingTab;
  let invoiceTab: InvoiceTab;

  test.beforeEach(async ({ page }) => {
    await epic("Auto Save");
    await feature("AHOFF Quotes Invoice Creation");

    navBarPage = new NavBarPage(page);
    subNavBarPage = new SubNavBarPage(page);
    headerTab = new HeaderTab(page);
    quotingTab = new QuotingTab(page);
    invoiceTab = new InvoiceTab(page);

    // A retry runs in a fresh worker (module variables reset), so reload from disk
    quoteNumber ??= loadState<string>(QUOTE_KEY)!;

    await page.goto("v2/");
    await expect(page).toHaveURL(/\/v2\/$/);
  });

  test("Quote Creation", async ({ page }) => {
    clearState(QUOTE_KEY);
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await subNavBarPage.clickPlusNewButton();
    quoteNumber = await subNavBarPage.extractAndStoreQuoteNumber();
    saveState(QUOTE_KEY, quoteNumber);
    await headerTab.fillHeaderWithInsurer("Insurance Australia Limited");
    await subNavBarPage.clickCreateButton();
    await subNavBarPage.expectToast(`New quote ${quoteNumber} added`);
    // Making Quote AH-OFF
    await subNavBarPage.disableAssessmentHistory();
    await headerTab.goToHeaderTab();
    await subNavBarPage.waitForAutoSaveCloudDone();
  });

  test("Add Quoting Items", async ({ page }) => {
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await headerTab.searchAndOpenQuoteByNumber(quoteNumber);
    await quotingTab.goToQuotingTab();
    await quotingTab.openVehicleSectionsTab();
    addedParts = await quotingTab.addQuotingItemsByIndex(2);
    await quotingTab.goToQuotingTab();
    await subNavBarPage.waitForAutoSaveCloudDone();
  });

  test("Invoice Creation", async ({ page }) => {
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await headerTab.searchAndOpenQuoteByNumber(quoteNumber);
    await invoiceTab.goToInvoiceTab();
    await invoiceTab.clickInvoicePlusButton();
    await invoiceTab.clickRaiseInvoiceButton();
    await subNavBarPage.expectToast(`Quote ${quoteNumber} saved`);

    // Capture Invoice summary totals from the UI before opening the preview
    const invoiceTotals = await subNavBarPage.fetchHeaderTotals();

    // Ok opens the Print Preview in a new tab
    await subNavBarPage.openPreview();
    const previewTab = await subNavBarPage.clickOkButton(true);
    if (previewTab) {
      subNavBarPage = new SubNavBarPage(previewTab);
    }
    await subNavBarPage.verifyPrintPreviewTitle();

    // Compare each UI total against its corresponding label in the PDF
    const extractAmount = (text: string): string => {
      const match = text.match(/\$[\d,]+\.\d{2}/);
      if (!match) {throw new Error(`Unable to extract amount from UI text: "${text}"`)}
      return match[0];
    };

    const totalExGst = extractAmount(invoiceTotals.totalExGst);
    const totalPayable = extractAmount(invoiceTotals.totalIncGst);

    let pdfResponse: PlaywrightResponse;
    await step(`Verify Total (Ex GST) ${totalExGst} == Sub Total excl. GST ${totalExGst}`, async () => {
        pdfResponse = await subNavBarPage.verifyTextInPdf(`Sub Total excl. GST ${totalExGst}`);
    });
    await step(`Verify Total (Inc GST) ${totalPayable} == Total Payable incl. GST ${totalPayable}`, async () => {
        await subNavBarPage.verifyTextInPdf(`Total Payable incl. GST ${totalPayable}`,undefined,pdfResponse);
    });
  });

});
