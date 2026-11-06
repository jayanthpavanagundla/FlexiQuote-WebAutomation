# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/regression/listingPreview.csr.spec.ts >> Listing Preview >> Debtor List Listing Preview
- Location: tests/regression/listingPreview.csr.spec.ts:207:7

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
            - generic [ref=e37]: 7:22
            - generic [ref=e38]: AM
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
  1   | ﻿import pdfParse from "pdf-parse";
  2   | import { Page, Response as PlaywrightResponse } from "@playwright/test";
  3   | import { expect, type Locator } from "@playwright/test";
  4   | import { step } from "allure-js-commons";
  5   | import { BasePage } from "./Base/BasePage.js";
  6   | import { LoadFnOutput } from "node:module";
  7   | 
  8   | export class SubNavBarPage extends BasePage {
  9   |   ellipsis: Locator;
  10  |   previewButton: Locator;
  11  |   quoteAnalysis: Locator;
  12  |   salesAnalysis: Locator;
  13  |   printButton: Locator;
  14  | 
  15  |   constructor(page: Page) {
  16  |     super(page);
  17  |     
  18  |     this.ellipsis = page.getByText("more_vert");
  19  |     this.previewButton = page.locator("#preview");
  20  |     this.quoteAnalysis = page.locator('label[for="quoteAnalysis"]').filter({ hasText: /^\s*Quote Analysis\s*$/i });
  21  |     this.salesAnalysis = page.locator('label[for="salesAnalysis"]:has-text("Sales Analysis")');
  22  |     this.printButton = page.locator('button[data-tooltip="Print report"]').filter({ hasText: /^\s*Print\s*$/i });
  23  |   }
  24  |   
  25  |   // Wait for table rows to fully load before opening preview
  26  |   async waitForTableToLoad(): Promise<void> {
  27  |     await step("Wait for table to load", async () => {
  28  |       await this.page.getByRole("table").first().getByRole("row").filter({ has: this.page.locator("td") }).first().waitFor({ state: "visible" });
  29  |     });
  30  |   }
  31  | 
  32  |   // Method to open the preview
  33  |   async openPreview() {
  34  |     await step("Click more options menu", async () => {
  35  |       await this.ellipsis.click();
  36  |     });
  37  |     await step("Click Preview", async () => {
  38  |       await this.previewButton.click();
  39  |     });
  40  |   }
  41  | 
  42  |   //------------------------- Print Preview Methods -------------------------//
  43  |   // Repairer Quote Option Model Flow
  44  |   async openQuoteAnalysis() {
  45  |     await step("Click Quote Analysis", async () => {
  46  |       await expect(this.quoteAnalysis).toBeVisible();
  47  |       await this.quoteAnalysis.click();
  48  |     });
  49  | 
  50  |     await step("Clicking Print Button", async () => {
  51  |       await expect(this.printButton).toBeVisible();
  52  |       await this.printButton.click();
  53  |     });
  54  |   }
  55  |   // Sales Analysis Option Model Flow
  56  |   async openSalesAnalysis() {
  57  |     await step("Click Sales Analysis", async () => {
  58  |       await expect(this.salesAnalysis).toBeVisible();
  59  |       await this.salesAnalysis.click();
  60  |     });
  61  | 
  62  |     await step("Clicking Print Button", async () => {
  63  |       await expect(this.printButton).toBeVisible();
  64  |       await this.printButton.click();
  65  |     });
  66  |   }
  67  |   // Method to Verify Print Preview H1 Title
  68  |   async verifyPrintPreviewTitle(page: Page = this.page): Promise<void> {
  69  |     await step("Verify Print Preview title", async () => {
  70  |       await expect(page).toHaveURL(/printpreview/);
  71  |       await expect(page).toHaveTitle(/Print Preview/i);
  72  |     });
  73  |   }
  74  |   // PDF Verification Method
  75  |   async verifyPdfLoadedAndNoError(reportName: string | string[], errorText?: string, page: Page = this.page, preCapturedResponse?: PlaywrightResponse) {
  76  |     await expect(page).toHaveURL(/printpreview/);
  77  |     const reportNames = Array.isArray(reportName) ? reportName : [reportName];
  78  |     const response = preCapturedResponse
  79  |       ? preCapturedResponse
> 80  |       : await page.waitForResponse(
      |                    ^ Error: page.waitForResponse: Test timeout of 60000ms exceeded.
  81  |           (res) =>
  82  |             reportNames.some((name) =>
  83  |               res.url().includes(`/reports/postreport/${name}/pdf`),
  84  |             ) &&
  85  |             res.status() === 200 &&
  86  |             res.headers()["content-type"]?.includes("application/pdf"),
  87  |         );
  88  |     await step(`Verify PDF "${reportNames.join(" or ")}" loaded successfully`, async () => {
  89  |         expect(response.ok()).toBeTruthy();
  90  |     });
  91  |     if (errorText) {
  92  |       await step(`Verify "${errorText}" is not in PDF`, async () => {
  93  |         const pdfBuffer = await response.body();
  94  |         const isPdfValid =
  95  |           pdfBuffer[0] === 0x25 &&
  96  |           pdfBuffer[1] === 0x50 &&
  97  |           pdfBuffer[2] === 0x44 &&
  98  |           pdfBuffer[3] === 0x46;
  99  |         expect(isPdfValid, "Response is not a valid PDF").toBeTruthy();
  100 |         const pdfData = await pdfParse(pdfBuffer);
  101 |         const normalizedPdfText = pdfData.text.replace(/\s+/g, " ");
  102 |         const normalizedErrorText = errorText.replace(/\s+/g, " ");
  103 |         expect.soft(normalizedPdfText,`Error found in PDF: "${errorText}" should NOT be present`).not.toContain(normalizedErrorText);
  104 |       });
  105 |     }
  106 |     return response;
  107 |   }
  108 | 
  109 | }
  110 | 
```