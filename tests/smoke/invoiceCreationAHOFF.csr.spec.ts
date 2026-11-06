import {test,expect,type Response as PlaywrightResponse} from "@playwright/test";
import { NavBarPage } from "../../pages/NavBarPage";
import { SubNavBarPage } from "../../pages/SubNavBarPage";
import { HeaderTab } from "../../pages/RepairerQuote/HeaderTab";
import { epic, feature } from "allure-js-commons";

let quoteNumber: string;
let addedParts: string[] = [];
let headerTab: HeaderTab;

test.describe("Invoice for AH-OFF Quotes", () => {
  let navBarPage: NavBarPage;
  let subNavBarPage: SubNavBarPage;

  test.beforeEach(async ({ page }) => {
    await epic("Auto Save");
    await feature("AHOFF Quotes Invoice Creation");

    navBarPage = new NavBarPage(page);
    subNavBarPage = new SubNavBarPage(page);
    headerTab = new HeaderTab(page);

    await page.goto("v2/");
    await expect(page).toHaveURL(/\/v2\/$/);
  });

  test("Quote Creation", async ({ page }) => {
    await navBarPage.openQuoteDropdown();
    await navBarPage.selectRepairerQuote();
    await subNavBarPage.clickPlusNewButton();
    quoteNumber = await subNavBarPage.extractAndStoreQuoteNumber();
    await headerTab.fillHeaderWithInsurer("Insurance Australia Limited");
    await subNavBarPage.clickCreateButton();
    await subNavBarPage.expectToast(`New quote ${quoteNumber} added`);
    // Making Quote AH-OFF
    await subNavBarPage.disableAssessmentHistory();
    await headerTab.goToHeaderTab();
    await subNavBarPage.waitForAutoSaveCloudDone();
  });

});
