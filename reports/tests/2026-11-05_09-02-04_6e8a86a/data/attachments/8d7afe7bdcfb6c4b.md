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
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('a.navbar-link').filter({ hasText: 'Reports' })

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - article [ref=e6]:
    - generic [ref=e7]:
      - generic [ref=e8]:
        - generic [ref=e9]: error
        - generic [ref=e10]: Unable to Complete Request (1 of 2)
      - generic [ref=e12] [cursor=pointer]: close
    - generic [ref=e13]:
      - paragraph
      - generic [ref=e15] [cursor=pointer]:
        - generic [ref=e16]: Technical Details
        - generic [ref=e17]: keyboard_arrow_down
      - generic [ref=e19]:
        - generic [ref=e21]: 1 / 2
        - button "Next" [ref=e23] [cursor=pointer]
  - generic [ref=e24]:
    - banner [ref=e25]:
      - navigation [ref=e26]:
        - generic [ref=e27]:
          - link "Home" [ref=e28] [cursor=pointer]:
            - /url: /v2/
            - img "Home" [ref=e29]
          - text: 󰈙 󰀦 󰍃
        - generic [ref=e30]:
          - generic [ref=e33]:
            - generic: search
            - textbox "Search the system..." [ref=e35]
          - generic [ref=e36]:
            - button "routine" [ref=e40] [cursor=pointer]:
              - generic [ref=e41]: routine
            - generic [ref=e43]:
              - generic [ref=e44]: 7:41
              - generic [ref=e45]: PM
            - button "notifications" [ref=e48] [cursor=pointer]:
              - generic [ref=e49]: notifications
            - generic [ref=e52]:
              - generic [ref=e54] [cursor=pointer]:
                - generic [ref=e55]: PartsCheck
                - generic [ref=e57]: 󰅀
              - text: 󰀄 󰈙 󱥉 󰀦 󰍃 󰙎
    - generic [ref=e58]:
      - generic [ref=e60]:
        - generic [ref=e62]:
          - navigation [ref=e64]:
            - generic [ref=e65]:
              - paragraph [ref=e66]: QUOTE STATUS
              - button "󰐕 New" [ref=e67] [cursor=pointer]:
                - generic [ref=e68]: 󰐕
                - text: New
            - generic [ref=e70]:
              - generic [ref=e71] [cursor=pointer]:
                - paragraph [ref=e72]: To Be Written
                - generic [ref=e73]: "3427"
              - generic [ref=e74] [cursor=pointer]:
                - paragraph [ref=e75]: Pending Authority
                - generic [ref=e76]: "68"
              - generic [ref=e77] [cursor=pointer]:
                - paragraph [ref=e78]: Follow Up Required
                - generic [ref=e79]: "34"
              - generic [ref=e80] [cursor=pointer]:
                - paragraph [ref=e81]: Authorised
                - generic [ref=e82]: "62"
          - navigation [ref=e84]:
            - generic [ref=e85]: JOB STATUS
            - generic [ref=e87]:
              - generic [ref=e88] [cursor=pointer]:
                - paragraph [ref=e89]: Booked In
                - generic [ref=e90]: "131"
              - generic [ref=e91] [cursor=pointer]:
                - paragraph [ref=e92]: Waiting On Parts
                - generic [ref=e93]: "8"
              - generic [ref=e94] [cursor=pointer]:
                - paragraph [ref=e95]: Vehicle Arrived
                - generic [ref=e96]: "70"
              - generic [ref=e97] [cursor=pointer]:
                - paragraph [ref=e98]: Work In Progress
                - generic [ref=e99]: "36"
              - generic [ref=e100] [cursor=pointer]:
                - paragraph [ref=e101]: Vehicle Ready
                - generic [ref=e102]: "76"
              - generic [ref=e103] [cursor=pointer]:
                - paragraph [ref=e104]: Invoice Pending
                - generic [ref=e105]: "21"
        - navigation [ref=e108]:
          - generic [ref=e109]: INSURER MESSAGES
        - navigation [ref=e114]:
          - generic [ref=e115]: MESSAGE INBOX
          - list [ref=e118]:
            - listitem [ref=e119]:
              - generic [ref=e120] [cursor=pointer]: Today
            - listitem [ref=e121]:
              - generic [ref=e122] [cursor=pointer]: Yesterday
            - listitem [ref=e123]:
              - generic [ref=e124] [cursor=pointer]: This Week
          - generic [ref=e126]: No Messages
      - generic [ref=e130]:
        - paragraph [ref=e131]: LATEST RELEASES
        - generic [ref=e133]:
          - generic [ref=e134]:
            - generic [ref=e135]: 05/11/2026
            - generic [ref=e137]:
              - text: Release 2026.11.1.0
              - generic [ref=e138]: New
            - list [ref=e139]:
              - listitem [ref=e140]:
                - generic [ref=e141]: "Repairer Quote: Copy Quote no longer overwrites the destination quote's excess"
              - listitem [ref=e142]:
                - generic [ref=e143]: "Repairer Quote: Copy Quote no longer copies the source quote's item comments"
              - listitem [ref=e144]:
                - generic [ref=e145]: "Repairer Quote: Fixed an error when retrying a new quote after the customer saved but the quote did not"
              - listitem [ref=e146]:
                - generic [ref=e147]: "Quote Items: Fixed auto items missing when creating a quote from a PNET, AudaNet, AudaBridge or EstImage RFQ"
              - listitem [ref=e148]:
                - generic [ref=e149]: "Global Search: Results now only show the latest search, instead of occasionally showing an earlier one"
              - listitem [ref=e150]:
                - generic [ref=e151]: "EstImage Integration: Fixed Load Authority failing when a part number is long or contains free text"
              - listitem [ref=e152]:
                - generic [ref=e153]: "EstImage Integration: Fixed creating a supplementary quote incorrectly changing the job status"
              - listitem [ref=e154]:
                - generic [ref=e155]: "EstImage Integration: Fixed not being able to raise invoices for manual quotes for insurers with the EstImage flag on"
              - listitem [ref=e156]:
                - generic [ref=e157]: "ORM Integration: Fixed NOCODE item codes being trimmed after loading an authority"
          - generic [ref=e158]:
            - generic [ref=e159]: 30/10/2026
            - generic [ref=e161]: Hotfix 2026.10.2.5
            - list [ref=e162]:
              - listitem [ref=e163]:
                - generic [ref=e164]: "Repairer Quote: Fixed changes made to a quote being reverted when a photo was added, edited or deleted from the images pop-out window"
          - generic [ref=e165]:
            - generic [ref=e166]: 29/10/2026
            - generic [ref=e168]: Hotfix 2026.10.2.4
            - list [ref=e169]:
              - listitem [ref=e170]:
                - generic [ref=e171]: "Repairer Quote: Fixed assessment history being turned off when the quote was saved from another open window or tab; it now only changes when Enable Assessment History is ticked or unticked"
          - generic [ref=e172]:
            - generic [ref=e173]: 28/10/2026
            - generic [ref=e175]: Hotfix 2026.10.2.3
            - list [ref=e176]:
              - listitem [ref=e177]:
                - generic [ref=e178]: "ARNIE Integration: Fixed sending a quote to ARNIE intermittently failing"
          - generic [ref=e179]:
            - generic [ref=e180]: 27/10/2026
            - generic [ref=e182]: Hotfix 2026.10.2.2
            - list [ref=e183]:
              - listitem [ref=e184]:
                - generic [ref=e185]: "Email: Block email modal to prevent multiple emails to be sent"
          - link "View All" [ref=e187] [cursor=pointer]:
            - /url: "#"
```

# Test source

```ts
  139 |   // Methods for Quote Dropdown
  140 |   async openQuoteDropdown() {
  141 |     await step("Open Quote Menu", async () => {
  142 |       await this.quoteMenu.click();
  143 |     });
  144 |   }
  145 | 
  146 |   async selectRepairerQuote() {
  147 |     await step("Navigate to Repairer Quotes", async () => {
  148 |       await this.repairerQuote.click();
  149 |     });
  150 |      await this.closeDropdown();
  151 |   }
  152 |   async selectMiscQuote() {
  153 |     await step("Navigate to Misc Quotes", async () => {
  154 |       await this.miscQuote.click();
  155 |     });
  156 |     await this.closeDropdown();
  157 |   }
  158 |   async selectQuoteTemplate() {
  159 |     await step("Navigate to Quote Templates", async () => {
  160 |       await this.quoteTemplate.click();
  161 |     });
  162 |     await this.closeDropdown();
  163 |   }
  164 |   async selectBookings() {
  165 |     await step("Navigate to Bookings", async () => {
  166 |       await this.bookings.click();
  167 |     });
  168 |     await this.closeDropdown();
  169 |   }
  170 |   async selectORMMessages() {
  171 |     await step("Navigate to ORM Messages", async () => {
  172 |       await this.ormMessages.click();
  173 |     });
  174 |     await this.closeDropdown();
  175 |   }
  176 | 
  177 |   // Methods for Debtor Dropdown
  178 |   async openDebtorDropdown() {
  179 |     await step("Open Debtor Menu", async () => {
  180 |       await this.debtorMenu.click();
  181 |     });
  182 |   }
  183 |   
  184 |   async selectQuickInvoice() {
  185 |     await step("Navigate to Quick Invoice", async () => {
  186 |       await this.quickInvoice.click();
  187 |     });
  188 |     await this.closeDropdown();
  189 |   }
  190 |   async selectDebtorAdjustment() {
  191 |     await step("Navigate to Debtor Adjustment", async () => {
  192 |       await this.debtorAdjustment.click();
  193 |     });
  194 |     await this.closeDropdown();
  195 |   }
  196 |   async selectReceiptEntry() {
  197 |     await step("Navigate to Receipt Entry", async () => {
  198 |       await this.receiptEntry.click();
  199 |     });
  200 |     await this.closeDropdown();
  201 |   }
  202 | 
  203 |   // Methods for Creditor Dropdown
  204 |   async openCreditorDropdown() {
  205 |     await step("Open Creditor Menu", async () => {
  206 |       await this.creditorMenu.click();
  207 |     });
  208 |   }
  209 | 
  210 |   async selectSundryCreditor() {
  211 |     await step("Navigate to Sundry Creditor", async () => {
  212 |       await this.sundryCreditor.click();
  213 |     });
  214 |     await this.closeDropdown();
  215 |   }
  216 |   async selectPaymentEntry() {
  217 |     await step("Navigate to Payment Entry", async () => {
  218 |       await this.paymentEntry.click();
  219 |       await this.paymentEntryTitle.click();
  220 |     });
  221 |     await this.closeDropdown();
  222 |   }
  223 |   async selectPurchaseOrder() {
  224 |     await step("Navigate to Purchase Order", async () => {
  225 |       await this.purchaseOrder.click();
  226 |     });
  227 |     await this.closeDropdown();
  228 |   }
  229 |   async selectReturnParts() {
  230 |     await step("Navigate to Return Parts", async () => {
  231 |       await this.returnParts.click();
  232 |     });
  233 |     await this.closeDropdown();
  234 |   }
  235 | 
  236 |   // Methods for Reports Dropdown
  237 |   async openReportDropdown() {
  238 |     await step("Open Reports Menu", async () => {
> 239 |       await this.reportMenu.click();
      |                             ^ Error: locator.click: Test timeout of 60000ms exceeded.
  240 |     });
  241 |   }
  242 | 
  243 |   async selectJCNI() {
  244 |     await step("Navigate to JCNI Report", async () => {
  245 |       await this.jcni.click();
  246 |     });
  247 |     await this.closeDropdown();
  248 |   }
  249 |   async selectDueInDueOut() {
  250 |     await step("Navigate to Due In & Due Out Report", async () => {
  251 |       await this.dueInDueOut.click();
  252 |     });
  253 |     await this.closeDropdown();
  254 |   }
  255 |   async selectJobInvoiced() {
  256 |     await step("Navigate to Job Invoiced Report", async () => {
  257 |       await this.jobInvoiced.click();
  258 |     });
  259 |     await this.closeDropdown();
  260 |   }
  261 |   async selectOutstandingParts() {
  262 |     await step("Navigate to Outstanding Parts Report", async () => {
  263 |       await this.outStandingParts.click();
  264 |     });
  265 |     await this.closeDropdown();
  266 |   }
  267 |   async selectOutstandingCredits() {
  268 |     await step("Navigate to Outstanding Credits Report", async () => {
  269 |       await this.outstandingCredits.click();
  270 |     });
  271 |     await this.closeDropdown();
  272 |   }
  273 |   async selectSalesAnalysis() {
  274 |     await step("Navigate to Sales Analysis Report", async () => {
  275 |       await this.salesAnalysis.click();
  276 |     });
  277 |     await this.closeDropdown();
  278 |   }
  279 |   async selectDebtorList() {
  280 |     await step("Navigate to Debtor List Report", async () => {
  281 |       await this.debtorList.click();
  282 |     });
  283 |     await this.closeDropdown();
  284 |   }
  285 |   async selectReceipts() {
  286 |     await step("Navigate to Receipts Report", async () => {
  287 |       await this.receipts.click();
  288 |     });
  289 |     await this.closeDropdown();
  290 |   }
  291 |   async selectCreditorList() {
  292 |     await step("Navigate to Creditor List Report", async () => {
  293 |       await this.creditorList.click();
  294 |     });
  295 |     await this.closeDropdown();
  296 |   }
  297 |   async selectPaymentList() {
  298 |     await step("Navigate to Payment List Report", async () => {
  299 |       await this.paymentList.click();
  300 |     });
  301 |     await this.closeDropdown();
  302 |   }
  303 | 
  304 |   // Methods for Tables Dropdown
  305 |   async openTablesDropdown() {
  306 |     await step("Open Tables Menu", async () => {
  307 |       await this.tablesMenu.click();
  308 |     });
  309 |   }
  310 | 
  311 |   async selectInsurer() {
  312 |     await step("Navigate to Insurer Table", async () => {
  313 |       await this.insurer.click();
  314 |     });
  315 |     await this.closeDropdown();
  316 |   }
  317 |   async selectCustomer() {
  318 |     await step("Navigate to Customer Table", async () => {
  319 |       await this.customer.click();
  320 |     });
  321 |     await this.closeDropdown();
  322 |   }
  323 |   async selectVendor() {
  324 |     await step("Navigate to Vendor Table", async () => {
  325 |       await this.vendor.click();
  326 |     });
  327 |     await this.closeDropdown();
  328 |   }
  329 |   async selectContactProfile() {
  330 |     await step("Navigate to Contact Profile Table", async () => {
  331 |       await this.contactProfile.click();
  332 |     });
  333 |     await this.closeDropdown();
  334 |   }
  335 |   async selectRecurringRemarks() {
  336 |     await step("Navigate to Recurring Remarks", async () => {
  337 |       await this.recurringRemarks.click();
  338 |     });
  339 |     await this.closeDropdown();
```