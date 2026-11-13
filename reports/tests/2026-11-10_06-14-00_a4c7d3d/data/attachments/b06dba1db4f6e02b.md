# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/regression/listingPreview.csr.spec.ts >> Listing Preview >> Payment List Listing Preview
- Location: tests/regression/listingPreview.csr.spec.ts:243:7

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: page.waitForResponse: Test timeout of 60000ms exceeded.
```

# Page snapshot

```yaml
- generic [ref=e4]:
  - banner [ref=e5]:
    - navigation [ref=e6]:
      - generic [ref=e7]:
        - link "Home" [ref=e8] [cursor=pointer]:
          - /url: /v2/
          - img "Home" [ref=e9]
        - text: 󰈙 󰀦 󰍃
      - generic [ref=e10]:
        - generic [ref=e11]:
          - generic [ref=e12]:
            - generic [ref=e13] [cursor=pointer]: Quote
            - generic:
              - generic:
                - link "Repairer Quote":
                  - /url: /v2/quotes
              - generic:
                - link "Misc Quote":
                  - /url: /v2/miscquotes
              - generic:
                - link "Quote Template":
                  - /url: /v2/quotetemplates
              - generic:
                - link "Bookings":
                  - /url: /v2/booking
              - generic:
                - link "AudaNet Tasks":
                  - /url: /v2/audanettasks
              - generic:
                - link "PNET Messages":
                  - /url: /v2/pnetmessages
              - generic:
                - link "Estimage Messages":
                  - /url: /v2/estimagemessages
              - generic:
                - link "ORM Messages":
                  - /url: /v2/ormmessages
              - generic:
                - link "ORM Batching":
                  - /url: /v2/ormbatching
              - generic:
                - link "Image Uploader":
                  - /url: /v2/imageuploader
          - generic [ref=e14]:
            - generic [ref=e15] [cursor=pointer]: Debtor
            - generic:
              - generic:
                - link "Quick Invoice":
                  - /url: /v2/quickinvoices
              - generic:
                - link "Debtor Adjustment":
                  - /url: /v2/debtoradjustments
              - generic:
                - link "Receipt Entry":
                  - /url: /v2/receiptentry
          - generic [ref=e16]:
            - generic [ref=e17] [cursor=pointer]: Creditor
            - generic:
              - generic:
                - link "Sundry Creditor":
                  - /url: /v2/sundrycreditors
              - generic:
                - link "Payment Entry":
                  - /url: /v2/paymententry
              - generic:
                - link "Purchase Order":
                  - /url: /v2/purchaseorders
              - generic:
                - link "Return Parts":
                  - /url: /v2/returnparts
              - generic:
                - link "Dealer Credit Entry":
                  - /url: /v2/dealercreditentry
              - generic:
                - link "Parts Check":
                  - /url: /Modules/CreditorView/PartsCheck.aspx
          - generic [ref=e18]:
            - generic [ref=e19] [cursor=pointer]: Reports
            - generic:
              - generic:
                - link "JCNI":
                  - /url: /v2/jcni
              - generic:
                - link "Due In & Due Out":
                  - /url: /v2/productioninout
              - generic:
                - link "Capacity Calendar":
                  - /url: /v2/capacity
              - generic:
                - link "Job Invoiced":
                  - /url: /v2/jobinvoiced
              - generic:
                - link "Outstanding Parts":
                  - /url: /v2/outstandingparts
              - generic:
                - link "Outstanding Credits":
                  - /url: /v2/outstandingcredit
              - generic:
                - link "Sales Analysis":
                  - /url: /v2/salesanalysis
              - generic:
                - separator
                - generic: Debtors
                - link "Debtor List":
                  - /url: /v2/debtorlists
                - link "Receipts":
                  - /url: /v2/debtorsreceipts
                - separator
              - generic:
                - generic: Creditors
                - link "Creditor List":
                  - /url: /v2/creditorlist
                - link "Payment List":
                  - /url: /v2/paymentlist
                - separator
          - generic [ref=e20]:
            - generic [ref=e21] [cursor=pointer]: Tables
            - generic:
              - generic:
                - link "Insurer":
                  - /url: /v2/insurers
              - generic:
                - link "Customer":
                  - /url: /v2/customers
              - generic:
                - link "Vendor":
                  - /url: /v2/vendors
              - generic:
                - link "Contact Profile":
                  - /url: /v2/contacts
              - generic:
                - link "Recurring Remarks":
                  - /url: /v2/recurringremarks
              - generic:
                - link "Quick Item":
                  - /url: /v2/quickitems
              - generic:
                - link "Item":
                  - /url: /v2/items
              - generic:
                - link "Other labour":
                  - /url: /v2/otherlabours
              - generic:
                - link "Vehicle":
                  - /url: /v2/vehicles
              - generic:
                - link "Unscheduled Model":
                  - /url: /v2/unscheduledmodels
          - generic [ref=e22]:
            - generic [ref=e23] [cursor=pointer]: Admin
            - generic:
              - generic:
                - link "Company Setting":
                  - /url: /v2/companysetting
              - generic:
                - link "Users":
                  - /url: /v2/users
              - generic:
                - link "G/L Mapping":
                  - /url: /v2/glmapping
              - generic:
                - link "Book-In":
                  - /url: /Modules/QuotesView/VehicleBookIn.aspx
              - generic:
                - link "Audit Trail":
                  - /url: /v2/audittrail
              - generic:
                - link "Forgot Password Log":
                  - /url: /v2/forgotpasswordlog
              - generic:
                - link "Email/SMS Log":
                  - /url: /v2/emailsmslogs
              - generic:
                - link "Vehicle Lookup":
                  - /url: /v2/vehiclelookup
              - generic:
                - link "RepX Log":
                  - /url: /v2/repx
        - generic [ref=e26]:
          - generic: search
          - textbox "Search the system..." [ref=e28]
        - generic [ref=e29]:
          - button "routine" [ref=e33] [cursor=pointer]:
            - generic [ref=e34]: routine
          - generic [ref=e36]:
            - generic [ref=e37]: 4:58
            - generic [ref=e38]: PM
          - button "notifications" [ref=e41] [cursor=pointer]:
            - generic [ref=e42]: notifications
          - generic [ref=e45]:
            - generic [ref=e47] [cursor=pointer]:
              - generic [ref=e48]: PartsCheck
              - generic [ref=e50]: 󰅀
            - text: 󰀄 󰈙 󱥉 󰀦 󰍃 󰙎
  - navigation [ref=e54]:
    - generic: 󰍜 󰈝 󰇮
    - heading "Print Preview" [level=1] [ref=e57]:
      - generic [ref=e58]: Print Preview
    - generic [ref=e61]:
      - paragraph [ref=e62]:
        - generic [ref=e63] [cursor=pointer]:
          - generic [ref=e65]: 󰈝
          - generic [ref=e66]: Export
      - paragraph [ref=e67]:
        - generic [ref=e68] [cursor=pointer]:
          - generic [ref=e70]: 󰇮
          - generic [ref=e71]: Email
      - paragraph [ref=e72]:
        - generic [ref=e73] [cursor=pointer]:
          - generic [ref=e75]: 󰜱
          - generic [ref=e76]: Back
```

# Test source

```ts
  165 |   async clickSaveButton(timeout = 3000): Promise<void> {
  166 |   await step("Click Save if visible", async () => {
  167 |     const isVisible = await this.saveButton.waitFor({ state: "visible", timeout }).then(() => true).catch(() => false);
  168 |       if (isVisible) {
  169 |         await this.saveButton.click();
  170 |       }
  171 |     });
  172 |   }
  173 | 
  174 |   // Due In Due Out Date Filter Options
  175 |   async selectDueInDueOutDateFilter(
  176 |     option:
  177 |       | "today"
  178 |       | "tomorrow"
  179 |       | "next7days"
  180 |       | "lastweek"
  181 |       | "thismonth"
  182 |       | "custom",
  183 |   ): Promise<void> {
  184 |     await step(`Select date filter: ${option}`, async () => {
  185 |       await this.page.locator("select.has-text-weight-bold").selectOption(option);
  186 |     });
  187 |   }
  188 | 
  189 |   async isNoRecordsFound(timeout = 3000): Promise<boolean> {
  190 |     return await step("Check if records exist in table", async () => {
  191 |       const firstDataRow = this.page.getByRole("table").first().getByRole("row").filter({ has: this.page.locator("td") }).first();
  192 |       // Wait for either a data row or the empty-state message
  193 |       await firstDataRow.or(this.noRecordsMessage).first()
  194 |         .waitFor({ state: "visible", timeout });
  195 |       const noRecords = await this.noRecordsMessage.isVisible();
  196 |       if (noRecords) {
  197 |         await step("No Records Found - skipping remaining steps", async () => {});
  198 |       }
  199 |       return noRecords;
  200 |     });
  201 |   }
  202 | 
  203 |   //------------------------- Print Preview Methods -------------------------//
  204 |   // Repairer Quote Option Model Flow
  205 |   async openQuoteAnalysis() {
  206 |     await step("Click Quote Analysis", async () => {
  207 |       await expect(this.quoteAnalysis).toBeVisible();
  208 |       await this.quoteAnalysis.click();
  209 |     });
  210 | 
  211 |     await step("Clicking Print Button", async () => {
  212 |       await expect(this.printButton).toBeVisible();
  213 |       await this.printButton.click();
  214 |     });
  215 |   }
  216 | 
  217 |   // Sales Analysis Option Model Flow
  218 |   async openSalesAnalysis() {
  219 |     await step("Click Sales Analysis", async () => {
  220 |       await expect(this.salesAnalysis).toBeVisible();
  221 |       await this.salesAnalysis.click();
  222 |     });
  223 | 
  224 |     await step("Clicking Print Button", async () => {
  225 |       await expect(this.printButton).toBeVisible();
  226 |       await this.printButton.click();
  227 |     });
  228 |   }
  229 | 
  230 |   // Method to Verify Print Preview H1 Title
  231 |   async verifyPrintPreviewTitle(page: Page = this.page): Promise<void> {
  232 |     await step("Verify Print Preview title", async () => {
  233 |       await expect(page).toHaveURL(/printpreview/);
  234 |       await expect(page).toHaveTitle(/Print Preview/i);
  235 |     });
  236 |   }
  237 | 
  238 |   // Verify Text PDF
  239 |   async verifyTextInPdf(expectedText: string,page: Page = this.page,preCapturedResponse?: PlaywrightResponse): Promise<PlaywrightResponse> {
  240 |     await expect(page).toHaveURL(/printpreview/);
  241 |     const response = preCapturedResponse
  242 |       ? preCapturedResponse
  243 |       : await page.waitForResponse(
  244 |           (res) =>
  245 |             res.url().includes("/reports/postreport/") &&
  246 |             res.status() === 200 &&
  247 |             res.headers()["content-type"]?.includes("application/pdf"),
  248 |         );
  249 |     await step(`Verify "${expectedText}" is present in PDF`, async () => {
  250 |       const pdfBuffer = await response.body();
  251 |       const pdfData = await pdfParse(pdfBuffer);
  252 |       const normalizedPdfText = pdfData.text.replace(/\s+/g, "");
  253 |       const normalizedExpectedText = expectedText.replace(/\s+/g, "");
  254 |       expect(normalizedPdfText,`Expected "${expectedText}" to be present in PDF`).toContain(normalizedExpectedText);
  255 |     });
  256 |     return response;
  257 |   }
  258 | 
  259 |   // PDF Verification Method
  260 |   async verifyPdfLoadedAndNoError(reportName: string | string[], errorText?: string, page: Page = this.page, preCapturedResponse?: PlaywrightResponse) {
  261 |     await expect(page).toHaveURL(/printpreview/);
  262 |     const reportNames = Array.isArray(reportName) ? reportName : [reportName];
  263 |     const response = preCapturedResponse
  264 |       ? preCapturedResponse
> 265 |       : await page.waitForResponse(
      |                    ^ Error: page.waitForResponse: Test timeout of 60000ms exceeded.
  266 |           (res) =>
  267 |             reportNames.some((name) =>
  268 |               res.url().includes(`/reports/postreport/${name}/pdf`),
  269 |             ) &&
  270 |             res.status() === 200 &&
  271 |             res.headers()["content-type"]?.includes("application/pdf"),
  272 |         );
  273 |     await step(`Verify PDF "${reportNames.join(" or ")}" loaded successfully`, async () => {
  274 |         expect(response.ok()).toBeTruthy();
  275 |     });
  276 |     // NEW: always attach the PDF text, whether the later check passes or fails
  277 |     await step("PDF content", async () => {
  278 |       const pdfBuffer = await response.body();
  279 |       let content: string;
  280 |       try {
  281 |         content = (await pdfParse(pdfBuffer)).text.trim() || "(PDF has no extractable text)";
  282 |       } catch (e) {
  283 |         content = `Could not read PDF text: ${String(e)}`;
  284 |       }
  285 |       await attachment(`${reportNames.join("_")} - PDF content`, content, ContentType.TEXT);
  286 |     });
  287 |     if (errorText) {
  288 |       await step(`Verify "${errorText}" is not in PDF`, async () => {
  289 |         const pdfBuffer = await response.body();
  290 |         const isPdfValid =
  291 |           pdfBuffer[0] === 0x25 &&
  292 |           pdfBuffer[1] === 0x50 &&
  293 |           pdfBuffer[2] === 0x44 &&
  294 |           pdfBuffer[3] === 0x46;
  295 |         expect(isPdfValid, "Response is not a valid PDF").toBeTruthy();
  296 |         const pdfData = await pdfParse(pdfBuffer);
  297 |         const normalizedPdfText = pdfData.text.replace(/\s+/g, " ");
  298 |         const normalizedErrorText = errorText.replace(/\s+/g, " ");
  299 |         expect.soft(normalizedPdfText,`Error found in PDF: "${errorText}" should NOT be present`).not.toContain(normalizedErrorText);
  300 |       });
  301 |     }
  302 |     return response;
  303 |   }
  304 | 
  305 |   // Select First Row from Table
  306 |   async openFirstRecordFromTable(route: string, excludeInvPrefix?: string, clickEdit: boolean = false): Promise<void> {
  307 |     await step(`Open first record from table on route: ${route}${excludeInvPrefix ? ` (skip Inv No starting with ${excludeInvPrefix})` : ""}${clickEdit ? " (via Edit button)" : ""}`, async () => {
  308 |       await this.page.waitForURL(`**${route}**`);
  309 |       const table = this.page.getByRole("table").first();
  310 |       let rows = table.getByRole("row").filter({ has: this.page.locator("td") });
  311 |       if (excludeInvPrefix) {
  312 |         rows = rows.filter({
  313 |           hasNot: this.page.locator("td:first-child a", {
  314 |             hasText: new RegExp(`^\\s*${excludeInvPrefix}`, "i"),
  315 |           }),
  316 |         });
  317 |       }
  318 |       const firstDataRow = rows.first();
  319 |       await expect(firstDataRow,excludeInvPrefix ? `No row found without Inv No prefix "${excludeInvPrefix}"` : undefined).toBeVisible();
  320 |       let link: Locator;
  321 |       if (clickEdit) {
  322 |         // Edit (pencil) button in the row
  323 |         link = firstDataRow.locator("a:has(i.mdi-lead-pencil)").first();
  324 |       } else {
  325 |         const firstHrefLink = firstDataRow.locator("a[href]").first();
  326 |         const hasVisibleHref = await firstHrefLink.isVisible().catch(() => false);
  327 |         link = hasVisibleHref ? firstHrefLink : firstDataRow.locator("a").first();
  328 |       }
  329 |       await expect(link).toBeVisible();
  330 |       const urlBeforeClick = this.page.url();
  331 |       await link.click();
  332 |       await this.page.waitForURL((url) => url.toString() !== urlBeforeClick, {waitUntil: "domcontentloaded"});
  333 |       await Promise.race([
  334 |         this.page.locator('div[name="headerMoreButtons"]').waitFor({ state: "visible" }),
  335 |         this.page.locator("a.button.is-primary.is-outlined.is-inverted").waitFor({ state: "visible" }),
  336 |         this.page.locator("button.button.is-primary").first().waitFor({ state: "visible" }),
  337 |       ]);
  338 |     });
  339 |   }
  340 | 
  341 |   // Specific Preview OK Modal 
  342 |   async clickOkButton(opensNewTab: boolean = false): Promise<Page | undefined> {
  343 |     let newTab: Page | undefined;
  344 |     await step("Click Ok button", async () => {
  345 |       if (opensNewTab) {
  346 |         // Case 2: New tab
  347 |         const [tab] = await Promise.all([
  348 |           this.page.context().waitForEvent("page"),
  349 |           this.okButton.click(),
  350 |         ]);
  351 |         await tab.waitForLoadState("domcontentloaded");
  352 |         await expect(tab).toHaveURL(/printpreview/);
  353 |         newTab = tab;
  354 |       } else {
  355 |         // Case 1: Same tab
  356 |         await this.okButton.click();
  357 |       }
  358 |     });
  359 |     return newTab;
  360 |   }
  361 | 
  362 |   // Check First Row Checkbox [Receipt Entry]
  363 |   async checkFirstRowCheckbox(printButtonText: string = "Print Statement"): Promise<{ newTab: Page; response: PlaywrightResponse }> {
  364 |     let newTab!: Page;
  365 |     let response!: PlaywrightResponse;
```