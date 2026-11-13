import { expect, type Page, type Locator } from "@playwright/test";
import { step } from "allure-js-commons";
import { BasePage } from "../Base/BasePage.js";

export class QuotingTab extends BasePage {
  quotingTab: Locator;
  vehicleSectionsTab: Locator;
  partsSection: Locator;
  partsRows: Locator;
  
  constructor(page: Page) {
    super(page);

    // Quoting Navbar
    this.quotingTab = page.getByText("Quoting");
    this.vehicleSectionsTab = this.page.locator("li", {hasText: "Vehicle Sections"});
    this.partsSection = page.locator(".quote-items-section.parts");
    this.partsRows = this.partsSection.locator(".item-row-quote-builder-parts");
  }

  // Navigate to Quoting Tab
  async goToQuotingTab() {
    await step("Click Quoting tab", async () => {
      await this.quotingTab.click();
    });
  }

  // Navigate to Vehicle Sections Tab
  async openVehicleSectionsTab(): Promise<void> {
    await step("Click Vehicle Sections tab", async () => {
      await this.vehicleSectionsTab.click();
    });
  }

  // Add random quoting items from Vehicle Sections
  async addQuotingItemsByIndex(count: number): Promise<string[]> {
    return await step(`Add ${count} random quoting items from Vehicle Sections`,async () => {
        const clickableRows = this.page.locator("table tbody tr:has(td:last-child div.butterfly-item-values)");
        await expect(clickableRows.first()).toBeVisible({ timeout: 10000 });
        const total = await clickableRows.count();
        if (total < count) {
          throw new Error(`Not enough rows to add ${count}; only ${total} available`);
        }
        // Shuffle all indices, take the first `count`
        const indices = Array.from({ length: total }, (_, i) => i);
        for (let i = indices.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [indices[i], indices[j]] = [indices[j], indices[i]];
        }
        const chosen = indices.slice(0, count);

        const addedPartNames: string[] = [];
        for (const idx of chosen) {
          const row = clickableRows.nth(idx);
          const partName = ((await row.locator("td").nth(1).textContent()) ?? "").trim();
          addedPartNames.push(partName);
          const button = row.locator("td:last-child div.butterfly-item-values");
          await button.scrollIntoViewIfNeeded();
          await expect(button).toBeVisible();
          await button.click({ force: true });
          await this.page.waitForTimeout(300);
          await step(`Added item (row ${idx + 1}): "${partName}"`,async () => {},);
        }
        return addedPartNames;
      },
    );
  }

  // Verify Order of Quoting Items
  async verifyPartsOrderAfterReload(addedParts: string[]): Promise<void> {
    await step("Verify quote part rows order matches the sequence",async () => {
        await this.partsSection.scrollIntoViewIfNeeded();
        const visibleRows = this.partsSection.locator(".item-row-quote-builder-parts:not(.is-hidden)");
        await expect(visibleRows.first()).toBeVisible({ timeout: 10000 });
        const partDescriptions: string[] = [];
        const rowCount = await visibleRows.count();
        for (let i = 0; i < rowCount; i++) {
          const descSpan = visibleRows.nth(i).locator('span[id$="-itemDesc"]');
          const text = ((await descSpan.textContent()) ?? "").trim();
          partDescriptions.push(text);
        }
        await step("Verify part sequence matches add order", async () => {
          for (let i = 0; i < addedParts.length; i++) {
            const expected = addedParts[i];
            const actual = partDescriptions[i];
            expect.soft(actual, `Row ${i + 1} should be "${expected}"`).toBe(expected);
            await step(`Row ${i + 1}: expected="${expected}" actual="${actual ?? "NOT FOUND"}"`,async () => {});
          }
        });
      },
    );
  }

  // Verify Line Number Sequence
  async verifyLineNumberSequence(): Promise<void> {
    await step("Verify parts line numbers increment by 1 from the first row",async () => {
        await this.partsSection.scrollIntoViewIfNeeded();
        const visibleRows = this.partsSection.locator(".item-row-quote-builder-parts:not(.is-hidden)");
        await expect(visibleRows.first()).toBeVisible({ timeout: 30000 });
        const count = await visibleRows.count();

        const readLineNumber = async (rowIndex: number): Promise<number> => {
          await visibleRows.nth(rowIndex).click();
          const lineNoValue = await this.page.getByRole("textbox").nth(4).inputValue();
          return parseInt(lineNoValue, 10);
        };

        const firstLineNumber = await readLineNumber(0);
        await step(`First row line number = ${firstLineNumber}`,async () => {});

        for (let i = 1; i < count; i++) {
          const expected = firstLineNumber + i;
          const actual = await readLineNumber(i);
          await step(`Row ${i + 1}: expected ${expected}, actual ${actual}`,async () => {
            expect.soft(actual, `Row ${i + 1} should be line ${expected}`).toBe(expected);
          });
        }
      },
    );
  }

  // Delete All Parts
  async deleteAllParts(): Promise<void> {
    await step("Delete all parts rows and verify Parts count shows (0)",async () => {
        await this.partsSection.scrollIntoViewIfNeeded();
        const visibleRows = this.partsSection.locator(".item-row-quote-builder-parts:not(.is-hidden)");
        await expect(visibleRows.first()).toBeVisible({ timeout: 30000 });

        let remaining = await visibleRows.count();
        while (remaining > 0) {
          const firstRow = visibleRows.first();
          await firstRow.scrollIntoViewIfNeeded();
          const deleteBtn = firstRow.locator('button[data-tooltip="Delete"]');
          await deleteBtn.hover({ force: true });
          await deleteBtn.click();

          await this.page.waitForTimeout(300);
          remaining = await visibleRows.count();
        }
        await expect(this.partsSection.locator("span.ml-2:not(.has-text-weight-bold)")).toHaveText("(0)", { timeout: 10000 });
      },
    );
  }

  // Delete leftover parts 
  async deleteAllPartsIfAny(): Promise<void> {
    await step("Ensure quote has no parts before adding new ones", async () => {
      const visibleRows = this.partsSection.locator(".item-row-quote-builder-parts:not(.is-hidden)");
      const zeroCount = this.partsSection.locator("span.ml-2:not(.has-text-weight-bold)", { hasText: "(0)" });
      await visibleRows.first().or(zeroCount).first().waitFor({ state: "visible", timeout: 15000 }).catch(() => {});
      const count = await visibleRows.count();
      if (count === 0) {
        await step("No existing parts found, nothing to delete", async () => {});
        return;
      }
      await step(`Found ${count} leftover part(s), deleting`, async () => {});
      await this.deleteAllParts();
    });
  }

  // Capture and Store Items Sequence
  async captureQuotingItemsSequence(): Promise<string[]> {
    return await step("Capture quoting items sequence", async () => {
      await this.partsSection.scrollIntoViewIfNeeded();
      const visibleRows = this.partsSection.locator(".item-row-quote-builder-parts:not(.is-hidden)");
      await expect(visibleRows.first()).toBeVisible({ timeout: 10000 });
      const rowCount = await visibleRows.count();
      const partDescriptions: string[] = [];
      for (let i = 0; i < rowCount; i++) {
        const descSpan = visibleRows.nth(i).locator('span[id$="-itemDesc"]');
        const text = ((await descSpan.textContent()) ?? "").trim();
        partDescriptions.push(text);
      }
      return partDescriptions;
    });
  }

  // Verify Store Sequemce Matches or Not
  async verifyCopytoExistingItemsSequence(expectedSequence: string[]): Promise<void> {
    await step("Verify existing quote parts sequence matches copied quote", async () => {
        const actualSequence = await this.captureQuotingItemsSequence();
        expect.soft(actualSequence.length, "Total parts count should match").toBe(expectedSequence.length);
        for (let i = 0; i < expectedSequence.length; i++) {
          const expected = expectedSequence[i];
          const actual = actualSequence[i];
          expect.soft(actual, `Row ${i + 1} should be "${expected}"`).toBe(expected);
          await step(`Row ${i + 1}: expected="${expected}" actual="${actual ?? "NOT FOUND"}"`,async () => {});
        }
      },
    );
  }
}
