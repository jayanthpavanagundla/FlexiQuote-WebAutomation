import { test, expect } from "@playwright/test";
import { NavBarPage } from "../../pages/NavBarPage";
import { SubNavBarPage } from "../../pages/SubNavBarPage";
import { OrmTab } from "../../pages/RepairerQuote/OrmTab";
import { epic, step } from "allure-js-commons";
import { saveState, loadState, clearState } from "../../helpers/sharedState";

const QUOTE_KEY = "ormAHON.quoteNumber";
let quoteNumber: string;

test.describe("ORM Integration AHON", () => {
  let navBarPage: NavBarPage;
  let subNavBarPage: SubNavBarPage;
  let ormTab: OrmTab;

  let changedPartValues: number[] = [];
  let changedGrandTotalExTax: number = 0;
  let changedTaxAmount: number = 0;
  let changedGrandTotalIncTax: number = 0;

  test.beforeEach(async ({ page }) => {
    await epic("ORM Integration AHON");

    navBarPage = new NavBarPage(page);
    subNavBarPage = new SubNavBarPage(page);
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

});
