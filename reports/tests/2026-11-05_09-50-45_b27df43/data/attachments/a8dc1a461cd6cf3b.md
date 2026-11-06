# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/regression/specificRecordPreview.csr.spec.ts >> Listing Preview >> Specific Outstanding Parts Listing Preview
- Location: tests/regression/specificRecordPreview.csr.spec.ts:191:7

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
- generic [ref=e4]:
  - banner
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