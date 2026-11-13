import {test,expect,type Response as PlaywrightResponse} from "@playwright/test";
import { NavBarPage } from "../../pages/NavBarPage";
import { SubNavBarPage } from "../../pages/SubNavBarPage";
import { HeaderTab } from "../../pages/RepairerQuote/HeaderTab";
import { QuotingTab } from "../../pages/RepairerQuote/QuotingTab";
import { epic, feature } from "allure-js-commons";
import { saveState, loadState, clearState } from "../../helpers/sharedState";

const QUOTE_KEY = "quoteCreation.quoteNumber";
let quoteNumber: string;
let addedParts: string[] = [];


test.describe("Quote Creation Flow and Validation", () => {
  let navBarPage: NavBarPage;
  let subNavBarPage: SubNavBarPage;
  let headerTab: HeaderTab;
  let quotingTab: QuotingTab;

  test.beforeEach(async ({ page }) => {
    await epic("Smoke");
    await feature("Quote Creation");

    navBarPage = new NavBarPage(page);
    subNavBarPage = new SubNavBarPage(page);
    headerTab = new HeaderTab(page);
    quotingTab = new QuotingTab(page);

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
    await headerTab.fillHeaderWithRandomInsurer();
    await subNavBarPage.clickCreateButton();
    await subNavBarPage.expectToast(`New quote ${quoteNumber} added`);
  });

  test("Edit and Verify Quote", async ({ page }) => {
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await headerTab.searchAndOpenQuoteByNumber(quoteNumber);
    // 1. Change values — each method removes old, fills new, returns what was filled
    const transmissionResult = await headerTab.selectTransmission();
    const paintGroupResult = await headerTab.selectPaintGroup();
    const colorResult = await headerTab.selectColor();
    const vin = await headerTab.fillVinNo();
    const engineNo = await headerTab.fillEngineNo();
    const odometer = await headerTab.fillOdometer();
    const cylinders = await headerTab.fillCylinders();
    const engineSize = await headerTab.fillEngineSize();
    const trimCode = await headerTab.fillTrimCode();
    const paintCode = await headerTab.fillPaintCode();
    await headerTab.selectDifferentInsurer();
    await headerTab.selectDifferentFirstName();
    await headerTab.selectDifferentLastName();
    // 2. Blur focus + trigger auto save, handle the (random) Update Customer modal
    await headerTab.goToHeaderTab();
    await headerTab.handleUpdateCustomerModal();
    await headerTab.goToHeaderTab();
    await subNavBarPage.waitForAutoSaveCloudDone();
    // 3. Capture the actual persisted customer + insurer from the UI — the random
    const persisted = await headerTab.captureCustomerAndInsurer();
    await page.reload();
    // 4. Verify all values survived the reload
    await headerTab.verifyEditedQuoteValuesAfterReload({
      transmission: transmissionResult.selectedTransmission,
      paintGroup: paintGroupResult.selectedPaintGroup,
      color: colorResult.selectedColor,
      vin,
      engineNo,
      odometer,
      cylinders,
      engineSize,
      trimCode,
      paintCode,
      insurer: persisted.insurer,
      firstName: persisted.firstName,
      lastName: persisted.lastName,
    });
  });

  test("Add Quoting Items", async ({ page }) => {
    test.setTimeout(120_000);
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await headerTab.searchAndOpenQuoteByNumber(quoteNumber);
    await quotingTab.goToQuotingTab();
    await quotingTab.openVehicleSectionsTab();
    addedParts = await quotingTab.addQuotingItemsByIndex(20);
    await quotingTab.goToQuotingTab();
    await subNavBarPage.waitForAutoSaveCloudDone();
  });

  test("Verify Quoting Item Sequence", async ({ page }) => {
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await headerTab.searchAndOpenQuoteByNumber(quoteNumber);
    await quotingTab.goToQuotingTab();
    await page.reload({ waitUntil: "networkidle" });
    await quotingTab.goToQuotingTab();
    await quotingTab.verifyPartsOrderAfterReload(addedParts);
  });

  test("Verify Line Number Sequence", async ({ page }) => {
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await headerTab.searchAndOpenQuoteByNumber(quoteNumber);
    await quotingTab.goToQuotingTab();
    await page.reload({ waitUntil: "networkidle" });
    await quotingTab.goToQuotingTab();
    await quotingTab.verifyLineNumberSequence();
  });

  test("Delete All Parts", async ({ page }) => {
    test.setTimeout(120_000);
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await headerTab.searchAndOpenQuoteByNumber(quoteNumber);
    await quotingTab.goToQuotingTab();
    await quotingTab.deleteAllParts();
    await subNavBarPage.waitForAutoSaveCloudDone();
  });

});
