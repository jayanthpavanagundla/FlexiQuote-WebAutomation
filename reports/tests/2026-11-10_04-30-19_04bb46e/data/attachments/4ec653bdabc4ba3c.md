# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/regression/specificRecordPreview.csr.spec.ts >> Listing Preview >> Specific Items Listing Preview
- Location: tests/regression/specificRecordPreview.csr.spec.ts:343:7

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: page.waitForURL: Test timeout of 60000ms exceeded.
=========================== logs ===========================
waiting for navigation to "**/v2/items**" until "load"
============================================================
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - article [ref=e6]:
    - generic [ref=e7]:
      - generic [ref=e8]:
        - generic [ref=e9]: error
        - generic [ref=e10]: Unable to Complete Request
      - generic [ref=e12] [cursor=pointer]: close
    - generic [ref=e13]:
      - paragraph
      - generic [ref=e15] [cursor=pointer]:
        - generic [ref=e16]: Technical Details
        - generic [ref=e17]: keyboard_arrow_down
      - button "Dismiss" [ref=e21] [cursor=pointer]
  - generic [ref=e22]:
    - banner [ref=e23]:
      - navigation [ref=e24]:
        - generic [ref=e25]:
          - link "Home" [ref=e26] [cursor=pointer]:
            - /url: /v2/
            - img "Home" [ref=e27]
          - text: 󰈙 󰀦 󰍃
        - generic [ref=e28]:
          - generic [ref=e29]:
            - generic [ref=e30]:
              - generic [ref=e31] [cursor=pointer]: Quote
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
            - generic [ref=e32]:
              - generic [ref=e33] [cursor=pointer]: Debtor
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
            - generic [ref=e34]:
              - generic [ref=e35] [cursor=pointer]: Creditor
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
            - generic [ref=e36]:
              - generic [ref=e37] [cursor=pointer]: Reports
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
            - generic [ref=e38]:
              - generic [ref=e39] [cursor=pointer]: Tables
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
            - generic [ref=e40]:
              - generic [ref=e41] [cursor=pointer]: Admin
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
          - generic [ref=e44]:
            - generic: search
            - textbox "Search the system..." [ref=e46]
          - generic [ref=e47]:
            - button "routine" [ref=e51] [cursor=pointer]:
              - generic [ref=e52]: routine
            - generic [ref=e54]:
              - generic [ref=e55]: 3:20
              - generic [ref=e56]: PM
            - button "notifications" [ref=e59] [cursor=pointer]:
              - generic [ref=e60]: notifications
            - generic [ref=e63]:
              - generic [ref=e65] [cursor=pointer]:
                - generic [ref=e66]: PartsCheck
                - generic [ref=e68]: 󰅀
              - text: 󰀄 󰈙 󱥉 󰀦 󰍃 󰙎
    - generic [ref=e69]:
      - generic [ref=e71]:
        - generic [ref=e73]:
          - navigation [ref=e75]:
            - generic [ref=e76]:
              - paragraph [ref=e77]: QUOTE STATUS
              - button "󰐕 New" [ref=e78] [cursor=pointer]:
                - generic [ref=e79]: 󰐕
                - text: New
            - generic [ref=e81]:
              - generic [ref=e82] [cursor=pointer]:
                - paragraph [ref=e83]: To Be Written
                - generic [ref=e84]: "3446"
              - generic [ref=e85] [cursor=pointer]:
                - paragraph [ref=e86]: Pending Authority
                - generic [ref=e87]: "68"
              - generic [ref=e88] [cursor=pointer]:
                - paragraph [ref=e89]: Follow Up Required
                - generic [ref=e90]: "34"
              - generic [ref=e91] [cursor=pointer]:
                - paragraph [ref=e92]: Authorised
                - generic [ref=e93]: "62"
          - navigation [ref=e95]:
            - generic [ref=e96]: JOB STATUS
            - generic [ref=e98]:
              - generic [ref=e99] [cursor=pointer]:
                - paragraph [ref=e100]: Booked In
                - generic [ref=e101]: "139"
              - generic [ref=e102] [cursor=pointer]:
                - paragraph [ref=e103]: Waiting On Parts
                - generic [ref=e104]: "8"
              - generic [ref=e105] [cursor=pointer]:
                - paragraph [ref=e106]: Vehicle Arrived
                - generic [ref=e107]: "70"
              - generic [ref=e108] [cursor=pointer]:
                - paragraph [ref=e109]: Work In Progress
                - generic [ref=e110]: "36"
              - generic [ref=e111] [cursor=pointer]:
                - paragraph [ref=e112]: Vehicle Ready
                - generic [ref=e113]: "76"
              - generic [ref=e114] [cursor=pointer]:
                - paragraph [ref=e115]: Invoice Pending
                - generic [ref=e116]: "21"
        - navigation [ref=e119]:
          - generic [ref=e120]: INSURER MESSAGES
          - generic [ref=e122]:
            - generic [ref=e123]:
              - paragraph [ref=e125]: PNET
              - generic [ref=e126]:
                - generic [ref=e127] [cursor=pointer]:
                  - generic [ref=e128]: Inbox
                  - generic [ref=e130]: "0"
                - generic [ref=e131] [cursor=pointer]:
                  - generic [ref=e132]: Failed
                  - generic [ref=e134]: "0"
                - generic [ref=e135] [cursor=pointer]:
                  - generic [ref=e136]: Outbox
                  - generic [ref=e138]: "85"
            - generic [ref=e140]:
              - paragraph [ref=e142]: ORM
              - generic [ref=e143]:
                - generic [ref=e144] [cursor=pointer]:
                  - generic [ref=e145]: Inbox
                  - generic [ref=e147]: "0"
                - generic [ref=e148] [cursor=pointer]:
                  - generic [ref=e149]: Failed
                  - generic [ref=e151]: "221"
                - generic [ref=e152] [cursor=pointer]:
                  - generic [ref=e153]: Outbox
                  - generic [ref=e155]: "582"
                - generic [ref=e156] [cursor=pointer]:
                  - generic [ref=e157]: Sync Fail
                  - generic [ref=e159]: "0"
            - generic [ref=e160]:
              - paragraph [ref=e162]: EstImage
              - generic [ref=e163]:
                - generic [ref=e164] [cursor=pointer]:
                  - generic [ref=e165]: Inbox
                  - generic [ref=e167]: "32"
                - generic [ref=e168] [cursor=pointer]:
                  - generic [ref=e169]: Failed
                  - generic [ref=e171]: "0"
                - generic [ref=e172] [cursor=pointer]:
                  - generic [ref=e173]: Outbox
                  - generic [ref=e175]: "0"
                - generic [ref=e176] [cursor=pointer]:
                  - generic [ref=e177]: Sync Fail
                  - generic [ref=e179]: "0"
        - navigation [ref=e182]:
          - generic [ref=e183]: MESSAGE INBOX
          - list [ref=e186]:
            - listitem [ref=e187]:
              - generic [ref=e188] [cursor=pointer]: Today
            - listitem [ref=e189]:
              - generic [ref=e190] [cursor=pointer]: Yesterday
            - listitem [ref=e191]:
              - generic [ref=e192] [cursor=pointer]: This Week
          - generic [ref=e194]: No Messages
      - generic [ref=e196]:
        - generic [ref=e198]:
          - navigation [ref=e201]:
            - paragraph [ref=e202]: JOBS COMPLETED NOT INVOICED
            - generic [ref=e204]:
              - generic [ref=e206] [cursor=pointer]:
                - generic [ref=e207]:
                  - generic [ref=e208]: "62"
                  - generic [ref=e209]: Jobs To Be Invoiced
                - generic [ref=e211]: Total Amount Not Invoiced
                - generic [ref=e214]: $56,511.59
              - generic [ref=e216] [cursor=pointer]:
                - generic [ref=e217]:
                  - generic [ref=e218]: "171"
                  - generic [ref=e219]: Jobs Past Due Date
                - generic [ref=e221]: Yet To Be Invoiced
                - generic [ref=e224]: $110,592,962.45
          - paragraph [ref=e227]: TOTAL JOBS COMPLETED
        - generic [ref=e235]:
          - paragraph [ref=e236]: LATEST RELEASES
          - generic [ref=e238]:
            - generic [ref=e239]:
              - generic [ref=e240]: 05/11/2026
              - generic [ref=e242]:
                - text: Release 2026.11.1.0
                - generic [ref=e243]: New
              - list [ref=e244]:
                - listitem [ref=e245]:
                  - generic [ref=e246]: "Repairer Quote: Copy Quote no longer overwrites the destination quote's excess"
                - listitem [ref=e247]:
                  - generic [ref=e248]: "Repairer Quote: Copy Quote no longer copies the source quote's item comments"
                - listitem [ref=e249]:
                  - generic [ref=e250]: "Repairer Quote: Fixed an error when retrying a new quote after the customer saved but the quote did not"
                - listitem [ref=e251]:
                  - generic [ref=e252]: "Quote Items: Fixed auto items missing when creating a quote from a PNET, AudaNet, AudaBridge or EstImage RFQ"
                - listitem [ref=e253]:
                  - generic [ref=e254]: "Global Search: Results now only show the latest search, instead of occasionally showing an earlier one"
                - listitem [ref=e255]:
                  - generic [ref=e256]: "EstImage Integration: Fixed Load Authority failing when a part number is long or contains free text"
                - listitem [ref=e257]:
                  - generic [ref=e258]: "EstImage Integration: Fixed creating a supplementary quote incorrectly changing the job status"
                - listitem [ref=e259]:
                  - generic [ref=e260]: "EstImage Integration: Fixed not being able to raise invoices for manual quotes for insurers with the EstImage flag on"
                - listitem [ref=e261]:
                  - generic [ref=e262]: "ORM Integration: Fixed NOCODE item codes being trimmed after loading an authority"
            - generic [ref=e263]:
              - generic [ref=e264]: 30/10/2026
              - generic [ref=e266]: Hotfix 2026.10.2.5
              - list [ref=e267]:
                - listitem [ref=e268]:
                  - generic [ref=e269]: "Repairer Quote: Fixed changes made to a quote being reverted when a photo was added, edited or deleted from the images pop-out window"
            - generic [ref=e270]:
              - generic [ref=e271]: 29/10/2026
              - generic [ref=e273]: Hotfix 2026.10.2.4
              - list [ref=e274]:
                - listitem [ref=e275]:
                  - generic [ref=e276]: "Repairer Quote: Fixed assessment history being turned off when the quote was saved from another open window or tab; it now only changes when Enable Assessment History is ticked or unticked"
            - generic [ref=e277]:
              - generic [ref=e278]: 28/10/2026
              - generic [ref=e280]: Hotfix 2026.10.2.3
              - list [ref=e281]:
                - listitem [ref=e282]:
                  - generic [ref=e283]: "ARNIE Integration: Fixed sending a quote to ARNIE intermittently failing"
            - generic [ref=e284]:
              - generic [ref=e285]: 27/10/2026
              - generic [ref=e287]: Hotfix 2026.10.2.2
              - list [ref=e288]:
                - listitem [ref=e289]:
                  - generic [ref=e290]: "Email: Block email modal to prevent multiple emails to be sent"
            - link "View All" [ref=e292] [cursor=pointer]:
              - /url: "#"
```

# Test source

```ts
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
  265 |       : await page.waitForResponse(
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
> 308 |       await this.page.waitForURL(`**${route}**`);
      |                       ^ Error: page.waitForURL: Test timeout of 60000ms exceeded.
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
  366 |     await step(`Check checkbox and open ${printButtonText}`, async () => {
  367 |       const table = this.page.getByRole("table").first();
  368 |       const firstDataRow = table.getByRole("row").filter({ has: this.page.locator("td") }).first();
  369 |       await expect(firstDataRow).toBeVisible();
  370 |       const checkbox = firstDataRow.locator('input[type="checkbox"]').first();
  371 |       // Row may already be checked (and disabled) by default - only tick it if needed
  372 |       if (!(await checkbox.isChecked())) {
  373 |         await checkbox.check();
  374 |       }
  375 |       await expect(checkbox).toBeChecked();
  376 |       const printButton = this.page.locator("button.button.is-primary", {hasText: printButtonText});
  377 |       // Listen on the context BEFORE clicking: the new tab requests the PDF while it loads,
  378 |       // so a listener registered after the tab opens can miss the response.
  379 |       const pdfResponsePromise = this.page.context().waitForEvent("response", {
  380 |         predicate: (res) =>
  381 |           /\/reports\/postreport\/[^/]+\/pdf/.test(res.url()) &&
  382 |           res.status() === 200 &&
  383 |           (res.headers()["content-type"] ?? "").includes("application/pdf"),
  384 |       });
  385 |       const [tab] = await Promise.all([this.page.context().waitForEvent("page"),printButton.click()]);
  386 |       await tab.waitForLoadState("domcontentloaded");
  387 |       await expect(tab).toHaveURL(/\/v2\/printpreview\//);
  388 |       newTab = tab;
  389 |       response = await pdfResponsePromise;
  390 |     });
  391 |     return { newTab, response };
  392 |   }
  393 | 
  394 |   // UnCheck First Row Checkbox [Receipt Entry]
  395 |   async uncheckFirstRowCheckbox(): Promise<void> {
  396 |     await step("Uncheck the first row checkbox", async () => {
  397 |       const table = this.page.getByRole("table").first();
  398 |       const firstDataRow = table.getByRole("row").filter({ has: this.page.locator("td") }).first();
  399 |       await expect(firstDataRow).toBeVisible();
  400 |       const checkbox = firstDataRow.locator('input[type="checkbox"]').first();
  401 |       await expect(checkbox).toBeVisible();
  402 |       // A disabled checkbox can't be unchecked by a user either - skip it instead of hanging
  403 |       if (await checkbox.isDisabled()) {
  404 |         return;
  405 |       }
  406 |       await checkbox.uncheck();
  407 |       await expect(checkbox).not.toBeChecked();
  408 |     });
```