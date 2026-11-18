import { test, expect } from "@playwright/test";
import { NavBarPage } from "../../pages/NavBarPage";
import { SubNavBarPage } from "../../pages/SubNavBarPage";
import { HeaderTab } from "../../pages/RepairerQuote/HeaderTab";
import { QuotingTab } from "../../pages/RepairerQuote/QuotingTab";
import { OrmTab } from "../../pages/RepairerQuote/OrmTab";
import { epic, step } from "allure-js-commons";
import { saveState, loadState, clearState } from "../../helpers/sharedState";

const QUOTE_KEY = "ormAHON.quoteNumber";
let quoteNumber: string;
let addedParts: string[] = [];

test.describe("ORM Integration AHON", () => {
  let navBarPage: NavBarPage;
  let subNavBarPage: SubNavBarPage;
  let headerTab: HeaderTab;
  let quotingTab: QuotingTab;
  let ormTab: OrmTab;

  let changedPartValues: number[] = [];
  let changedGrandTotalExTax: number = 0;
  let changedTaxAmount: number = 0;
  let changedGrandTotalIncTax: number = 0;

  test.beforeEach(async ({ page }) => {
    await epic("ORM Integration AHON");

    navBarPage = new NavBarPage(page);
    subNavBarPage = new SubNavBarPage(page);
    headerTab = new HeaderTab(page);
    quotingTab = new QuotingTab(page);
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
    await subNavBarPage.enableAssessmentHistory();
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

});
