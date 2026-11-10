import {test,expect,type Response as PlaywrightResponse} from "@playwright/test";
import { NavBarPage } from "../../pages/NavBarPage";
import { SubNavBarPage } from "../../pages/SubNavBarPage";
import { HeaderTab } from "../../pages/RepairerQuote/HeaderTab";
import { QuotingTab } from "../../pages/RepairerQuote/QuotingTab";
import { InvoiceTab } from "../../pages/RepairerQuote/InvoiceTab";
import { AssessmentTab } from "../../pages/RepairerQuote/AssessmentTab";
import { epic, feature, step } from "allure-js-commons";
import { saveState, loadState, clearState } from "../../helpers/sharedState";

const QUOTE_KEY = "invoiceCreationAHON.quoteNumber";
let quoteNumber: string;
let addedParts: string[] = [];

test.describe("Invoice for AH-ON Quotes", () => {
  let navBarPage: NavBarPage;
  let subNavBarPage: SubNavBarPage;
  let headerTab: HeaderTab;
  let quotingTab: QuotingTab;
  let invoiceTab: InvoiceTab;
  let assessmentTab: AssessmentTab;

  test.beforeEach(async ({ page }) => {
    await epic("Auto Save");
    await feature("AH-ON Quotes Invoice Creation");

    navBarPage = new NavBarPage(page);
    subNavBarPage = new SubNavBarPage(page);
    headerTab = new HeaderTab(page);
    quotingTab = new QuotingTab(page);
    invoiceTab = new InvoiceTab(page);
    assessmentTab = new AssessmentTab(page);

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
    // Making Quote AH-ON
    await subNavBarPage.enableAssessmentHistory();
    await headerTab.goToHeaderTab();
    await subNavBarPage.waitForAutoSaveCloudDone();
  });

  test("Add Quoting Items", async ({ page }) => {
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await headerTab.searchAndOpenQuoteByNumber(quoteNumber);
    await quotingTab.goToQuotingTab();
    await quotingTab.openVehicleSectionsTab();
    addedParts = await quotingTab.addQuotingItemsByIndex(5);
    await quotingTab.goToQuotingTab();
    await subNavBarPage.waitForAutoSaveCloudDone();
  });

  test("Quote Authorisation", async () => {
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await headerTab.searchAndOpenQuoteByNumber(quoteNumber);
    await assessmentTab.goToAssessmentsTab();
    await assessmentTab.authoriseAHONQuote();
    await assessmentTab.verifyQuoteStatusAuthorised();
    await assessmentTab.goToAssessmentsTab();
    await subNavBarPage.waitForAutoSaveCloudDone();
  });

  test("Invoice Creation", async ({ page }) => {
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await headerTab.searchAndOpenQuoteByNumber(quoteNumber);
    await invoiceTab.goToInvoiceTab();
    await invoiceTab.clickInvoiceCheckBox();
    await invoiceTab.clickRaiseInvoiceButton();
    await subNavBarPage.expectToast(`Quote ${quoteNumber} saved`);

    // Capture Invoice summary totals from the UI before opening the preview
    const invoiceTotals = await subNavBarPage.fetchHeaderTotals();

    // PDF Opens Same Tab
    await subNavBarPage.openPreview();
    const pdfResponsePromise = page.waitForResponse((res) =>
        res.url().includes("/reports/postreport/") &&
        res.status() === 200 &&
        (res.headers()["content-type"] ?? "").includes("application/pdf"),
    );
    await subNavBarPage.clickOkButton();
    const pdfResponse: PlaywrightResponse = await pdfResponsePromise;
    await subNavBarPage.verifyPrintPreviewTitle();

    // Compare each UI total against its corresponding label in the PDF
    const extractAmount = (text: string): string => {
      const match = text.match(/\$[\d,]+\.\d{2}/);
      if (!match) {throw new Error(`Unable to extract amount from UI text: "${text}"`)}
      return match[0];
    };

    const totalExGstAmount = extractAmount(invoiceTotals.totalExGst);
    const totalPayableAmount = extractAmount(invoiceTotals.totalIncGst);

    // AH-ON PDF labels: Total (Ex GST) == TOTAL PARTS, Total (Inc GST) == GRAND TOTAL
    await step(`Verify Total (Ex GST) ${totalExGstAmount} == TOTAL PARTS ${totalExGstAmount}`,async () => {
        await subNavBarPage.verifyTextInPdf(`TOTAL PARTS = ${totalExGstAmount}`,undefined,pdfResponse);
    });
    await step(`Verify Total (Inc GST) ${totalPayableAmount} == GRAND TOTAL ${totalPayableAmount}`,async () => {
        await subNavBarPage.verifyTextInPdf(`GRAND TOTAL ${totalPayableAmount}`,undefined,pdfResponse);
    });
  });
});
