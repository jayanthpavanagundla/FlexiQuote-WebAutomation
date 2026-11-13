import { test, expect } from "@playwright/test";
import { NavBarPage } from "../../pages/NavBarPage";
import { SubNavBarPage } from "../../pages/SubNavBarPage";
import { HeaderTab } from "../../pages/RepairerQuote/HeaderTab";
import { QuotingTab } from "../../pages/RepairerQuote/QuotingTab";
import { epic, feature, step } from "allure-js-commons";
import { saveState, loadState, clearState } from "../../helpers/sharedState";

const QUOTE_KEY = "copyQuote.quoteNumber";
let quoteNumber: string;
let newquoteNumber: string;
let existingQuoteNumber: string;

test.describe("Copy Quote", () => {
  let navBarPage: NavBarPage;
  let subNavBarPage: SubNavBarPage;
  let headerTab: HeaderTab;
  let quotingTab: QuotingTab;

    test.describe.configure({ timeout: 120_000 });

    test.beforeEach(async ({ page }) => {
        await epic("Smoke");
        await feature("Copy Quote");

        navBarPage = new NavBarPage(page);
        subNavBarPage = new SubNavBarPage(page);
        headerTab = new HeaderTab(page);
        quotingTab = new QuotingTab(page);

        // A failed test restarts the worker (module variables reset), so reload from disk
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

    test("Copy Quote to New Quote", async ({}) => {
        await navBarPage.openQuoteDropdown();
        await navBarPage.selectRepairerQuote();
        await headerTab.searchAndOpenQuoteByNumber(quoteNumber);
        const originalQuoteData = await headerTab.captureQuoteFieldValues();
        await subNavBarPage.clickEllipisBtn();
        await subNavBarPage.selectCopyQuote();
        await subNavBarPage.copyToNewQuote();
        await subNavBarPage.expectToast("Copy quote successful. Please remember to save quote.",);
        await subNavBarPage.clickCreateButton();
        newquoteNumber = await subNavBarPage.extractAndStoreQuoteNumber();
        await subNavBarPage.expectToast(`New quote ${newquoteNumber} added`);
        const copiedQuoteData = await headerTab.captureQuoteFieldValues();
        await headerTab.verifyCopiedQuoteValuesMatch(originalQuoteData,copiedQuoteData,newquoteNumber);
    });

    test("Copy Quote from AH-OFF to AH-ON", async ({ page }, testInfo) => {
        const TARGET_KEY = "copyQuote.target.AHOFF-AHON";
        let targetQuoteNo: string;

        // Target Quote: first attempt creates a new one, retry reuses the same one
        const savedTargetQuoteNo = testInfo.retry > 0 ? loadState<string>(TARGET_KEY) : undefined;
        await navBarPage.openQuoteDropdown();
        await navBarPage.selectRepairerQuote();
        if (savedTargetQuoteNo) {
            targetQuoteNo = savedTargetQuoteNo;
            await headerTab.searchAndOpenQuoteByNumber(targetQuoteNo);
        } else {
            clearState(TARGET_KEY);
            await subNavBarPage.clickPlusNewButton();
            targetQuoteNo = await subNavBarPage.extractAndStoreQuoteNumber();
            await headerTab.fillHeaderWithRandomInsurer();
            await subNavBarPage.clickCreateButton();
            await subNavBarPage.expectToast(`New quote ${targetQuoteNo} added`);
            saveState(TARGET_KEY, targetQuoteNo);
        }
        await step(`Target Quote No: ${targetQuoteNo} (retry #${testInfo.retry})`, async () => {});

        // Target quote must be AH-ON with 3 parts
        await subNavBarPage.enableAssessmentHistory();
        await headerTab.goToHeaderTab();
        await subNavBarPage.waitForAutoSaveCloudDone();
        await quotingTab.goToQuotingTab();
        await quotingTab.deleteAllPartsIfAny();
        await subNavBarPage.waitForAutoSaveCloudDone();
        await quotingTab.openVehicleSectionsTab();
        await quotingTab.addQuotingItemsByIndex(3);
        await quotingTab.goToQuotingTab();
        await subNavBarPage.waitForAutoSaveCloudDone();

        // Source quote must be AH-OFF
        await navBarPage.openQuoteDropdown();
        await navBarPage.selectRepairerQuote();
        await headerTab.clickResetButton();
        await headerTab.searchAndOpenQuoteByNumber(quoteNumber);
        await subNavBarPage.disableAssessmentHistory();
        await headerTab.goToHeaderTab();
        await subNavBarPage.waitForAutoSaveCloudDone();

        // Remove leftover parts, then add 5 parts in Source
        await quotingTab.goToQuotingTab();
        await quotingTab.deleteAllPartsIfAny();
        await subNavBarPage.waitForAutoSaveCloudDone();
        await quotingTab.openVehicleSectionsTab();
        await quotingTab.addQuotingItemsByIndex(5);
        await quotingTab.goToQuotingTab();
        await subNavBarPage.waitForAutoSaveCloudDone();
        const newQuoteItemsSequence = await quotingTab.captureQuotingItemsSequence();

        // Copy Source -> Target
        await subNavBarPage.clickEllipisBtn();
        await subNavBarPage.selectCopyQuote();
        await subNavBarPage.copyToExistingQuote(targetQuoteNo);
        await subNavBarPage.expectToast("Copy quote successful.");
        await page.waitForTimeout(10_000);

        // Verify Quote Number
        existingQuoteNumber = await subNavBarPage.extractAndStoreQuoteNumber();
        await step(`"${existingQuoteNumber}" === "${targetQuoteNo}"`, async () => {
            expect(existingQuoteNumber).toBe(targetQuoteNo);
        });

        // Verify Quoting Items and Sequence
        await quotingTab.goToQuotingTab();
        await quotingTab.verifyCopytoExistingItemsSequence(newQuoteItemsSequence);
    });

    test("Copy Quote from AH-OFF to AH-OFF", async ({ page }, testInfo) => {
        const TARGET_KEY = "copyQuote.target.AHOFF-AHOFF";
        let targetQuoteNo: string;

        // Target Quote: first attempt creates a new one, retry reuses the same one
        const savedTargetQuoteNo = testInfo.retry > 0 ? loadState<string>(TARGET_KEY) : undefined;
        await navBarPage.openQuoteDropdown();
        await navBarPage.selectRepairerQuote();
        if (savedTargetQuoteNo) {
            targetQuoteNo = savedTargetQuoteNo;
            await headerTab.searchAndOpenQuoteByNumber(targetQuoteNo);
        } else {
            clearState(TARGET_KEY);
            await subNavBarPage.clickPlusNewButton();
            targetQuoteNo = await subNavBarPage.extractAndStoreQuoteNumber();
            await headerTab.fillHeaderWithRandomInsurer();
            await subNavBarPage.clickCreateButton();
            await subNavBarPage.expectToast(`New quote ${targetQuoteNo} added`);
            saveState(TARGET_KEY, targetQuoteNo);
        }
        await step(`Target Quote No: ${targetQuoteNo} (retry #${testInfo.retry})`, async () => {});

        // Target quote must be AH-OFF with 3 parts
        await subNavBarPage.disableAssessmentHistory();
        await headerTab.goToHeaderTab();
        await subNavBarPage.waitForAutoSaveCloudDone();
        await quotingTab.goToQuotingTab();
        await quotingTab.deleteAllPartsIfAny();
        await subNavBarPage.waitForAutoSaveCloudDone();
        await quotingTab.openVehicleSectionsTab();
        await quotingTab.addQuotingItemsByIndex(3);
        await quotingTab.goToQuotingTab();
        await subNavBarPage.waitForAutoSaveCloudDone();

        // Source quote must be AH-OFF
        await navBarPage.openQuoteDropdown();
        await navBarPage.selectRepairerQuote();
        await headerTab.clickResetButton();
        await headerTab.searchAndOpenQuoteByNumber(quoteNumber);
        await subNavBarPage.disableAssessmentHistory();
        await headerTab.goToHeaderTab();
        await subNavBarPage.waitForAutoSaveCloudDone();

        // Remove leftover parts, then add 5 parts in Source
        await quotingTab.goToQuotingTab();
        await quotingTab.deleteAllPartsIfAny();
        await subNavBarPage.waitForAutoSaveCloudDone();
        await quotingTab.openVehicleSectionsTab();
        await quotingTab.addQuotingItemsByIndex(5);
        await quotingTab.goToQuotingTab();
        await subNavBarPage.waitForAutoSaveCloudDone();
        const newQuoteItemsSequence = await quotingTab.captureQuotingItemsSequence();

        // Copy Source -> Target
        await subNavBarPage.clickEllipisBtn();
        await subNavBarPage.selectCopyQuote();
        await subNavBarPage.copyToExistingQuote(targetQuoteNo);
        await subNavBarPage.expectToast("Copy quote successful.");
        await page.waitForTimeout(10_000);

        // Verify Quote Number
        existingQuoteNumber = await subNavBarPage.extractAndStoreQuoteNumber();
        await step(`"${existingQuoteNumber}" === "${targetQuoteNo}"`, async () => {
            expect(existingQuoteNumber).toBe(targetQuoteNo);
        });

        // Verify Quoting Items and Sequence
        await quotingTab.goToQuotingTab();
        await quotingTab.verifyCopytoExistingItemsSequence(newQuoteItemsSequence);
    });

    test("Copy Quote from AH-ON to AH-OFF", async ({ page }, testInfo) => {
        const TARGET_KEY = "copyQuote.target.AHON-AHOFF";
        let targetQuoteNo: string;

        // Target Quote: first attempt creates a new one, retry reuses the same one
        const savedTargetQuoteNo = testInfo.retry > 0 ? loadState<string>(TARGET_KEY) : undefined;
        await navBarPage.openQuoteDropdown();
        await navBarPage.selectRepairerQuote();
        if (savedTargetQuoteNo) {
            targetQuoteNo = savedTargetQuoteNo;
            await headerTab.searchAndOpenQuoteByNumber(targetQuoteNo);
        } else {
            clearState(TARGET_KEY);
            await subNavBarPage.clickPlusNewButton();
            targetQuoteNo = await subNavBarPage.extractAndStoreQuoteNumber();
            await headerTab.fillHeaderWithRandomInsurer();
            await subNavBarPage.clickCreateButton();
            await subNavBarPage.expectToast(`New quote ${targetQuoteNo} added`);
            saveState(TARGET_KEY, targetQuoteNo);
        }
        await step(`Target Quote No: ${targetQuoteNo} (retry #${testInfo.retry})`, async () => {});

        // Target quote must be AH-OFF with 3 parts
        await subNavBarPage.disableAssessmentHistory();
        await headerTab.goToHeaderTab();
        await subNavBarPage.waitForAutoSaveCloudDone();
        await quotingTab.goToQuotingTab();
        await quotingTab.deleteAllPartsIfAny();
        await subNavBarPage.waitForAutoSaveCloudDone();
        await quotingTab.openVehicleSectionsTab();
        await quotingTab.addQuotingItemsByIndex(3);
        await quotingTab.goToQuotingTab();
        await subNavBarPage.waitForAutoSaveCloudDone();

        // Source quote must be AH-ON
        await navBarPage.openQuoteDropdown();
        await navBarPage.selectRepairerQuote();
        await headerTab.clickResetButton();
        await headerTab.searchAndOpenQuoteByNumber(quoteNumber);
        await subNavBarPage.enableAssessmentHistory();
        await headerTab.goToHeaderTab();
        await subNavBarPage.waitForAutoSaveCloudDone();

        // Remove leftover parts, then add 5 parts in Source
        await quotingTab.goToQuotingTab();
        await quotingTab.deleteAllPartsIfAny();
        await subNavBarPage.waitForAutoSaveCloudDone();
        await quotingTab.openVehicleSectionsTab();
        await quotingTab.addQuotingItemsByIndex(5);
        await quotingTab.goToQuotingTab();
        await subNavBarPage.waitForAutoSaveCloudDone();
        const newQuoteItemsSequence = await quotingTab.captureQuotingItemsSequence();

        // Copy Source -> Target
        await subNavBarPage.clickEllipisBtn();
        await subNavBarPage.selectCopyQuote();
        await subNavBarPage.copyToExistingQuote(targetQuoteNo);
        await subNavBarPage.expectToast("Copy quote successful.");
        await page.waitForTimeout(10_000);

        // Verify Quote Number
        existingQuoteNumber = await subNavBarPage.extractAndStoreQuoteNumber();
        await step(`"${existingQuoteNumber}" === "${targetQuoteNo}"`, async () => {
            expect(existingQuoteNumber).toBe(targetQuoteNo);
        });

        // Verify Quoting Items and Sequence
        await quotingTab.goToQuotingTab();
        await quotingTab.verifyCopytoExistingItemsSequence(newQuoteItemsSequence);
    });

    test("Copy Quote from AH-ON to AH-ON", async ({ page }, testInfo) => {
        const TARGET_KEY = "copyQuote.target.AHON-AHON";
        let targetQuoteNo: string;

        // Target Quote: first attempt creates a new one, retry reuses the same one
        const savedTargetQuoteNo = testInfo.retry > 0 ? loadState<string>(TARGET_KEY) : undefined;
        await navBarPage.openQuoteDropdown();
        await navBarPage.selectRepairerQuote();
        if (savedTargetQuoteNo) {
            targetQuoteNo = savedTargetQuoteNo;
            await headerTab.searchAndOpenQuoteByNumber(targetQuoteNo);
        } else {
            clearState(TARGET_KEY);
            await subNavBarPage.clickPlusNewButton();
            targetQuoteNo = await subNavBarPage.extractAndStoreQuoteNumber();
            await headerTab.fillHeaderWithRandomInsurer();
            await subNavBarPage.clickCreateButton();
            await subNavBarPage.expectToast(`New quote ${targetQuoteNo} added`);
            saveState(TARGET_KEY, targetQuoteNo);
        }
        await step(`Target Quote No: ${targetQuoteNo} (retry #${testInfo.retry})`, async () => {});

        // Target quote must be AH-ON with 3 parts
        await subNavBarPage.enableAssessmentHistory();
        await headerTab.goToHeaderTab();
        await subNavBarPage.waitForAutoSaveCloudDone();
        await quotingTab.goToQuotingTab();
        await quotingTab.deleteAllPartsIfAny();
        await subNavBarPage.waitForAutoSaveCloudDone();
        await quotingTab.openVehicleSectionsTab();
        await quotingTab.addQuotingItemsByIndex(3);
        await quotingTab.goToQuotingTab();
        await subNavBarPage.waitForAutoSaveCloudDone();

        // Source quote must be AH-ON
        await navBarPage.openQuoteDropdown();
        await navBarPage.selectRepairerQuote();
        await headerTab.clickResetButton();
        await headerTab.searchAndOpenQuoteByNumber(quoteNumber);
        await subNavBarPage.enableAssessmentHistory();
        await headerTab.goToHeaderTab();
        await subNavBarPage.waitForAutoSaveCloudDone();

        // Remove leftover parts, then add 5 parts in Source
        await quotingTab.goToQuotingTab();
        await quotingTab.deleteAllPartsIfAny();
        await subNavBarPage.waitForAutoSaveCloudDone();
        await quotingTab.openVehicleSectionsTab();
        await quotingTab.addQuotingItemsByIndex(5);
        await quotingTab.goToQuotingTab();
        await subNavBarPage.waitForAutoSaveCloudDone();
        const newQuoteItemsSequence = await quotingTab.captureQuotingItemsSequence();

        // Copy Source -> Target
        await subNavBarPage.clickEllipisBtn();
        await subNavBarPage.selectCopyQuote();
        await subNavBarPage.copyToExistingQuote(targetQuoteNo);
        await subNavBarPage.expectToast("Copy quote successful.");
        await page.waitForTimeout(10_000);

        // Verify Quote Number
        existingQuoteNumber = await subNavBarPage.extractAndStoreQuoteNumber();
        await step(`"${existingQuoteNumber}" === "${targetQuoteNo}"`, async () => {
            expect(existingQuoteNumber).toBe(targetQuoteNo);
        });

        // Verify Quoting Items and Sequence
        await quotingTab.goToQuotingTab();
        await quotingTab.verifyCopytoExistingItemsSequence(newQuoteItemsSequence);
    });
});
