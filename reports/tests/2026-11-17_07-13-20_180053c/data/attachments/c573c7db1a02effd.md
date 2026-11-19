# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/smoke/copyQuote.csr.spec.ts >> Copy Quote >> Copy Quote from AH-ON to AH-OFF
- Location: tests/smoke/copyQuote.csr.spec.ts:208:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "42016"
Received: "42013"
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
            - generic [ref=e37]: 5:55
            - generic [ref=e38]: PM
          - button "notifications" [ref=e41] [cursor=pointer]:
            - generic [ref=e42]: notifications
          - generic [ref=e45]:
            - generic [ref=e47] [cursor=pointer]:
              - generic [ref=e48]: PartsCheck
              - generic [ref=e50]: 󰅀
            - text: 󰀄 󰈙 󱥉 󰀦 󰍃 󰙎
  - generic [ref=e51]:
    - navigation [ref=e54]:
      - article [ref=e57]:
        - generic [ref=e59]: 󰧞
        - generic [ref=e60]:
          - generic [ref=e63]: "42013"
          - combobox [ref=e68] [cursor=pointer]:
            - option
            - option "Quote To Be Written"
            - option "Pending Authority"
            - option "Follow-up Required"
            - option "Authorised"
            - option "Booked In" [selected]
            - option "Waiting For Parts"
            - option "Vehicle Arrived"
            - option "Paint"
            - option "Final Inspection"
            - option "Wash & Vacuum"
            - option "Panel Fit Up"
            - option "Paint Preparation"
            - option "Panel Repair"
            - option "Vehicle Ready"
            - option "Invoice Pending"
            - option "Cash Settled"
            - option "Job Cancelled"
            - option "Job Declined"
            - option "Completed"
            - option "Total Loss"
          - generic [ref=e69]:
            - generic [ref=e70]:
              - generic [ref=e72]: person
              - generic [ref=e74]: directions_car
            - generic [ref=e75]:
              - generic [ref=e76]:
                - generic [ref=e77]: Total (Ex GST)
                - text: $626.24
              - generic [ref=e78]:
                - generic [ref=e79]: Total (Inc GST)
                - text: $688.86
            - generic "Sergio Ramos (viewing Header)" [ref=e82] [cursor=pointer]: SR
      - generic [ref=e85]:
        - generic [ref=e87]: cloud_done
        - paragraph [ref=e88]:
          - generic [ref=e89] [cursor=pointer]:
            - generic [ref=e91]: arrow_back
            - generic [ref=e92]: Back
        - generic [ref=e95] [cursor=pointer]: more_vert
    - list [ref=e100]:
      - listitem [ref=e101]:
        - link "account_circle Header" [ref=e102] [cursor=pointer]:
          - /url: /v2/quotes/877f71fa-cf1e-4574-8729-0cf06ccb4de1/
          - generic [ref=e104]:
            - generic [ref=e106]: account_circle
            - generic [ref=e107]: Header
      - listitem [ref=e108]:
        - link "edit_document Quoting" [ref=e109] [cursor=pointer]:
          - /url: /v2/quotes/877f71fa-cf1e-4574-8729-0cf06ccb4de1/builder
          - generic [ref=e111]:
            - generic [ref=e113]: edit_document
            - generic [ref=e114]: Quoting
      - listitem [ref=e115]:
        - link "car_tag Parts" [ref=e116] [cursor=pointer]:
          - /url: /v2/quotes/877f71fa-cf1e-4574-8729-0cf06ccb4de1/partscontrol
          - generic [ref=e118]:
            - generic [ref=e120]: car_tag
            - generic [ref=e121]: Parts
      - listitem [ref=e122]:
        - link "imagesmode Images" [ref=e123] [cursor=pointer]:
          - /url: /v2/quotes/877f71fa-cf1e-4574-8729-0cf06ccb4de1/images
          - generic [ref=e125]:
            - generic [ref=e127]: imagesmode
            - generic [ref=e128]: Images
      - listitem [ref=e129]:
        - link "verified_user Assessments" [ref=e130] [cursor=pointer]:
          - /url: /v2/quotes/877f71fa-cf1e-4574-8729-0cf06ccb4de1/assessments
          - generic [ref=e132]:
            - generic [ref=e134]: verified_user
            - generic [ref=e135]: Assessments
      - listitem [ref=e136]:
        - link "summarize Summary" [ref=e137] [cursor=pointer]:
          - /url: /v2/quotes/877f71fa-cf1e-4574-8729-0cf06ccb4de1/summary
          - generic [ref=e139]:
            - generic [ref=e141]: summarize
            - generic [ref=e142]: Summary
      - listitem [ref=e143]:
        - link "receipt_long Invoice" [ref=e144] [cursor=pointer]:
          - /url: /v2/quotes/877f71fa-cf1e-4574-8729-0cf06ccb4de1/assessmentinvoice
          - generic [ref=e146]:
            - generic [ref=e148]: receipt_long
            - generic [ref=e149]: Invoice
      - listitem [ref=e150]:
        - link "receipt Excess" [ref=e151] [cursor=pointer]:
          - /url: /v2/quotes/877f71fa-cf1e-4574-8729-0cf06ccb4de1/excessinvoice
          - generic [ref=e153]:
            - generic [ref=e155]: receipt
            - generic [ref=e156]: Excess
      - listitem [ref=e157]:
        - link "docs Docs" [ref=e158] [cursor=pointer]:
          - /url: /v2/quotes/877f71fa-cf1e-4574-8729-0cf06ccb4de1/documents
          - generic [ref=e160]:
            - generic [ref=e162]: docs
            - generic [ref=e163]: Docs
      - listitem [ref=e164]:
        - link "mark_as_unread Comms" [ref=e165] [cursor=pointer]:
          - /url: /v2/quotes/877f71fa-cf1e-4574-8729-0cf06ccb4de1/communications
          - generic [ref=e167]:
            - generic [ref=e169]: mark_as_unread
            - generic [ref=e170]: Comms
      - listitem [ref=e171]:
        - link "sticky_note_2 Remarks" [ref=e172] [cursor=pointer]:
          - /url: /v2/quotes/877f71fa-cf1e-4574-8729-0cf06ccb4de1/remarks
          - generic [ref=e174]:
            - generic [ref=e176]: sticky_note_2
            - generic [ref=e177]: Remarks
      - listitem [ref=e178]:
        - link "percent Rates & Markups" [ref=e179] [cursor=pointer]:
          - /url: /v2/quotes/877f71fa-cf1e-4574-8729-0cf06ccb4de1/rates
          - generic [ref=e181]:
            - generic [ref=e183]: percent
            - generic [ref=e184]: Rates & Markups
      - listitem [ref=e185]:
        - link "edit Annotations" [ref=e186] [cursor=pointer]:
          - /url: /v2/quotes/877f71fa-cf1e-4574-8729-0cf06ccb4de1/annotations
          - generic [ref=e188]:
            - generic [ref=e190]: edit
            - generic [ref=e191]: Annotations
    - group [ref=e194]:
      - generic [ref=e196]:
        - article [ref=e198]:
          - generic [ref=e199]:
            - generic [ref=e200]:
              - generic [ref=e201]: 󰄋
              - paragraph [ref=e202]: Vehicle
            - generic [ref=e203]:
              - paragraph [ref=e204]: Key No.
              - textbox "0000" [ref=e206]
          - generic [ref=e209]:
            - generic [ref=e210]:
              - generic [ref=e211]: Registration No. *
              - textbox [ref=e215]: RQDQ7HFVT
            - generic [ref=e216]:
              - generic [ref=e217]: State
              - combobox [ref=e220] [cursor=pointer]:
                - option "Select" [disabled]
                - option "ACT"
                - option "NSW"
                - option "NT"
                - option "QLD"
                - option "SA" [selected]
                - option "TAS"
                - option "VIC"
                - option "WA"
            - button "󰍉 Rego Lookup" [ref=e222] [cursor=pointer]:
              - generic [ref=e224]: 󰍉
              - generic [ref=e225]: Rego Lookup
          - generic [ref=e227]:
            - generic [ref=e228]:
              - generic [ref=e229]: Make / Model *
              - generic [ref=e230]:
                - textbox [ref=e233]: FORD LASER KJ LIATA GHIA
                - button "󰐕" [ref=e235] [cursor=pointer]:
                  - generic [ref=e237]: 󰐕
            - button "󰍉 Schedules" [ref=e240] [cursor=pointer]:
              - generic [ref=e242]: 󰍉
              - generic [ref=e243]: Schedules
          - generic [ref=e244]:
            - generic [ref=e246]:
              - generic [ref=e247]: Body Style *
              - combobox [ref=e250] [cursor=pointer]:
                - option "Select" [disabled]
                - option "2 DOORS"
                - option "3 DOORS"
                - option "4 DOOR"
                - option "5 DOORS" [selected]
                - option "Bus"
                - option "Motorbike"
                - option "Others"
                - option "Truck"
                - option "UTE"
                - option "VAN"
                - option "WAGON"
            - generic [ref=e252]:
              - generic [ref=e253]: Body Style 2
              - combobox [ref=e256] [cursor=pointer]:
                - option "Select" [disabled]
                - option "Hatch5Door" [selected]
          - generic [ref=e257]:
            - generic [ref=e259]:
              - generic [ref=e260]: Paint Group *
              - combobox [ref=e264] [cursor=pointer]:
                - option "Select" [disabled]
                - option "Metallic 1"
                - option "Metallic 2"
                - option "Metallic 3"
                - option "Solid 1"
                - option "Solid 2" [selected]
                - option "Solid 3"
            - generic [ref=e266]:
              - generic [ref=e267]: Build Date
              - generic [ref=e268]:
                - combobox [ref=e271] [cursor=pointer]:
                  - option "MM" [disabled]
                  - option "01" [selected]
                  - option "02"
                  - option "03"
                  - option "04"
                  - option "05"
                  - option "06"
                  - option "07"
                  - option "08"
                  - option "09"
                  - option "10"
                  - option "11"
                  - option "12"
                - paragraph [ref=e272]:
                  - textbox "Year" [ref=e273]: "1994"
          - generic [ref=e274]:
            - generic [ref=e276]:
              - generic [ref=e277]: Transmission
              - combobox [ref=e280] [cursor=pointer]:
                - option "Select" [disabled]
                - option "Automatic"
                - option "Manual" [selected]
                - option "Tiptronics"
                - option "CVT"
                - option "DSG"
            - generic [ref=e282]:
              - generic [ref=e283]: Colour
              - paragraph [ref=e284]:
                - textbox [ref=e286]: SILVER
          - generic [ref=e288]:
            - generic [ref=e289]:
              - generic [ref=e290]: VIN
              - paragraph [ref=e291]:
                - textbox [ref=e292]: VINUW860UDW55
            - generic [ref=e293]:
              - generic [ref=e294]: Engine No.
              - textbox [ref=e296]: "2506534742"
          - generic [ref=e299]:
            - generic [ref=e300]: Odometer
            - textbox "e.g. 6" [ref=e302]: "199743"
          - generic [ref=e304]:
            - generic [ref=e305]:
              - generic [ref=e306]: Cylinders
              - textbox "e.g. 6" [ref=e308]: "91"
            - generic [ref=e309]:
              - generic [ref=e310]: Engine Size
              - textbox "e.g. 1300" [ref=e312]: "3700"
          - generic [ref=e314]:
            - generic [ref=e315]:
              - generic [ref=e316]: Trim Code
              - textbox [ref=e318]: "8458153794"
            - generic [ref=e319]:
              - generic [ref=e320]: Paint Code
              - textbox [ref=e322]: "57949831"
        - article [ref=e324]:
          - generic [ref=e325]:
            - generic [ref=e326]:
              - text: 󰧞
              - generic [ref=e327]: 󰀓
              - paragraph [ref=e328]: Customer
            - generic [ref=e330]:
              - generic [ref=e331]:
                - radio [ref=e332] [cursor=pointer]
                - generic [ref=e334]: Company
              - generic [ref=e335]:
                - radio [checked] [ref=e336] [cursor=pointer]
                - generic [ref=e338]: Person
          - generic [ref=e341]:
            - generic [ref=e342]:
              - generic [ref=e343]: First Name *
              - generic [ref=e345]:
                - textbox "First Name" [ref=e346]: Automation2232
                - text: 󰏲
            - generic [ref=e347]:
              - generic [ref=e348]: Last Name *
              - generic [ref=e350]:
                - textbox "Last Name" [ref=e351]: Test5016
                - text: 󰏲
          - generic [ref=e352]:
            - generic [ref=e354]:
              - generic [ref=e355]: Emails
              - button "add" [ref=e357] [cursor=pointer]:
                - generic [ref=e358]: add
            - generic [ref=e360]:
              - generic [ref=e361]: Phones
              - button "add" [ref=e363] [cursor=pointer]:
                - generic [ref=e364]: add
            - generic [ref=e366]:
              - generic [ref=e367]: Alternative Customer Contact
              - button "add" [ref=e368] [cursor=pointer]:
                - generic [ref=e369]: add
            - generic [ref=e370]:
              - generic [ref=e371]:
                - generic [ref=e372]: Address
                - generic [ref=e373]:
                  - combobox [ref=e376] [cursor=pointer]:
                    - option "H" [selected]
                    - option "W"
                    - option "M"
                  - textbox "Start typing address" [ref=e379]
              - generic [ref=e380]:
                - generic [ref=e381]: Suburb
                - textbox "Suburb" [ref=e383]
              - generic [ref=e384]:
                - generic [ref=e385]: State
                - textbox "State" [ref=e387]
              - generic [ref=e389]:
                - generic [ref=e391]:
                  - generic [ref=e392]: Postal code
                  - textbox "Postal code" [ref=e393]
                - generic [ref=e395]:
                  - generic [ref=e396]: Country
                  - textbox "Country" [ref=e397]
        - article [ref=e399]:
          - generic [ref=e401]:
            - generic [ref=e402]: 󰒙
            - paragraph [ref=e403]: Insurer/Debtor
          - generic [ref=e405]:
            - generic [ref=e406]: Insurer *
            - combobox [ref=e408]:
              - generic [ref=e410]:
                - textbox "Search By Name..."
                - generic [ref=e411]: A.I.B. Pty Ltd
          - generic [ref=e412]:
            - generic [ref=e413]: ABN
            - textbox "ABN" [disabled] [ref=e415]
          - generic [ref=e417]:
            - generic [ref=e418]:
              - generic [ref=e419]: Claim Number
              - textbox "Claim Number" [ref=e421]: CLP1XQ5OYO
            - generic [ref=e422]:
              - generic [ref=e423]: Policy Number
              - textbox "Policy No." [ref=e425]
          - generic [ref=e427]:
            - generic [ref=e428]:
              - generic [ref=e429]: Labour Times
              - combobox [ref=e432] [cursor=pointer]:
                - option "NRMA"
                - option "FQT"
                - option "NTAR"
                - option "LTAR"
                - option "VERO-NZ"
                - option "eMTA"
                - option "WESF"
                - option "RACQ"
            - generic [ref=e433]:
              - generic [ref=e434]: Method
              - generic [ref=e436]:
                - button "󰅐 Hours" [ref=e437] [cursor=pointer]:
                  - generic [ref=e439]: 󰅐
                  - generic [ref=e440]: Hours
                - button "󰄖 Dollars" [ref=e441] [cursor=pointer]:
                  - generic [ref=e443]: 󰄖
                  - generic [ref=e444]: Dollars
          - generic [ref=e446]:
            - generic [ref=e447]:
              - generic [ref=e448]:
                - generic [ref=e449]: Excess
                - generic [ref=e450]:
                  - generic [ref=e451] [cursor=pointer]: Includes GST
                  - generic [ref=e452]:
                    - checkbox [ref=e453] [cursor=pointer]
                    - generic [ref=e455]: 󰄬
              - textbox "Excess" [ref=e457]: "0.00"
            - generic [ref=e458]:
              - generic [ref=e459]: Owners Contribution
              - textbox "Owner's Contribution" [ref=e461]: "0.00"
          - generic [ref=e464]:
            - generic [ref=e465]: Discount On Invoice
            - textbox "Discount applied on invoice" [ref=e467]: $ 0.00
          - generic [ref=e468]:
            - generic [ref=e470]:
              - generic [ref=e471]: Assessor
              - textbox "Assessor" [ref=e474]
            - generic [ref=e476]:
              - generic [ref=e477]: Phone Number
              - textbox "xxxxxxxxx" [ref=e479]
          - generic [ref=e480]:
            - generic [ref=e481]: Estimator
            - textbox "Quoter" [ref=e484]: Ramos
          - generic [ref=e486]:
            - generic [ref=e487]:
              - generic [ref=e488]: Is Towed
              - generic [ref=e490]:
                - checkbox [ref=e491] [cursor=pointer]
                - generic [ref=e493]: "No"
            - generic [ref=e494]:
              - generic [ref=e495]: Driveable
              - generic [ref=e497]:
                - checkbox [checked] [ref=e498] [cursor=pointer]
                - generic [ref=e500]: "Yes"
        - article [ref=e502]:
          - generic [ref=e504]:
            - generic [ref=e505]: calendar_clock
            - paragraph [ref=e506]: Key Dates
          - generic [ref=e508]:
            - generic [ref=e509]: Request for Quote Date
            - generic [ref=e513]:
              - textbox "Quote Date" [ref=e514]: 17/11/2026
              - generic:
                - generic: 󰃭
          - generic [ref=e516]:
            - generic [ref=e518]:
              - generic [ref=e519]: Inspection Booking
              - generic [ref=e522]:
                - textbox "Inspection Start Date" [ref=e523]
                - generic:
                  - generic: 󰃭
            - generic [ref=e524]:
              - generic [ref=e525]: Booking Attended
              - generic [ref=e526]: "No"
          - generic [ref=e528]:
            - generic [ref=e529]:
              - generic [ref=e530]: Sent for Authority
              - generic [ref=e534]:
                - textbox "Sent for Assessment" [ref=e535]
                - generic:
                  - generic: 󰃭
            - generic [ref=e536]:
              - generic [ref=e537]: Authority Date
              - generic [ref=e541]:
                - textbox "Authority Date" [ref=e542]
                - generic:
                  - generic: 󰃭
          - generic [ref=e544]:
            - generic [ref=e546]:
              - generic [ref=e547]: Refuse Book Repair Reason
              - textbox [ref=e549]
            - generic [ref=e550]:
              - generic [ref=e551]: Is Repair Booked
              - generic [ref=e552]:
                - generic [ref=e553]:
                  - radio [ref=e554] [cursor=pointer]
                  - generic [ref=e556]: "Yes"
                - generic [ref=e557]:
                  - radio [checked] [ref=e558] [cursor=pointer]
                  - generic [ref=e560]: "No"
          - generic [ref=e562]:
            - generic [ref=e564]:
              - generic [ref=e565]: Estimated Start Date
              - generic [ref=e568]:
                - textbox "Job Start Date" [ref=e569]: 18/11/2026 8:00 AM
                - generic:
                  - generic: 󰃭
            - generic [ref=e571]:
              - generic [ref=e572]: Estimated End Date
              - generic [ref=e574]:
                - generic [ref=e575]:
                  - textbox "Job End Date" [ref=e576]: 20/11/2026 8:00 AM
                  - generic:
                    - generic: 󰃭
                - generic [ref=e580] [cursor=pointer]: 󰅖
          - generic [ref=e582]:
            - generic [ref=e583]:
              - generic [ref=e584]: Vehicle Arrived
              - generic [ref=e586]:
                - generic [ref=e587]:
                  - textbox "Arrive for Repair Date" [ref=e588]
                  - generic:
                    - generic: 󰃭
                - generic [ref=e592] [cursor=pointer]: 󰅖
            - generic [ref=e593]:
              - generic [ref=e594]: Vehicle On Site
              - generic [ref=e596]:
                - checkbox [ref=e597] [cursor=pointer]
                - generic [ref=e599]: "No"
          - generic [ref=e601]:
            - generic [ref=e602]:
              - generic [ref=e603]: Job Start Date
              - generic [ref=e606]:
                - textbox "Job Start" [ref=e607]
                - generic:
                  - generic: 󰃭
            - generic [ref=e608]:
              - generic [ref=e609]: Job Completed Date
              - generic [ref=e611]:
                - generic [ref=e612]:
                  - textbox "Job Completion" [ref=e613]
                  - generic:
                    - generic: 󰃭
                - generic [ref=e617] [cursor=pointer]: 󰅖
          - generic [ref=e619]:
            - generic [ref=e620]:
              - generic [ref=e621]: Vehicle Picked Up
              - generic [ref=e623]:
                - generic [ref=e624]:
                  - textbox "Vehicle Departed Date" [ref=e625]
                  - generic:
                    - generic: 󰃭
                - generic [ref=e629] [cursor=pointer]: 󰅖
            - generic [ref=e630]:
              - generic [ref=e631]: Vehicle Departed
              - generic [ref=e633]:
                - checkbox [ref=e634] [cursor=pointer]
                - generic [ref=e636]: "No"
```

# Test source

```ts
  171 |         // Source quote must be AH-OFF
  172 |         await navBarPage.openQuoteDropdown();
  173 |         await navBarPage.selectRepairerQuote();
  174 |         await headerTab.clickResetButton();
  175 |         await headerTab.searchAndOpenQuoteByNumber(quoteNumber);
  176 |         await subNavBarPage.disableAssessmentHistory();
  177 |         await headerTab.goToHeaderTab();
  178 |         await subNavBarPage.waitForAutoSaveCloudDone();
  179 | 
  180 |         // Remove leftover parts, then add 5 parts in Source
  181 |         await quotingTab.goToQuotingTab();
  182 |         await quotingTab.deleteAllPartsIfAny();
  183 |         await subNavBarPage.waitForAutoSaveCloudDone();
  184 |         await quotingTab.openVehicleSectionsTab();
  185 |         await quotingTab.addQuotingItemsByIndex(5);
  186 |         await quotingTab.goToQuotingTab();
  187 |         await subNavBarPage.waitForAutoSaveCloudDone();
  188 |         const newQuoteItemsSequence = await quotingTab.captureQuotingItemsSequence();
  189 | 
  190 |         // Copy Source -> Target
  191 |         await subNavBarPage.clickEllipisBtn();
  192 |         await subNavBarPage.selectCopyQuote();
  193 |         await subNavBarPage.copyToExistingQuote(targetQuoteNo);
  194 |         await subNavBarPage.expectToast("Copy quote successful.");
  195 |         await page.waitForTimeout(10_000);
  196 | 
  197 |         // Verify Quote Number
  198 |         existingQuoteNumber = await subNavBarPage.extractAndStoreQuoteNumber();
  199 |         await step(`"${existingQuoteNumber}" === "${targetQuoteNo}"`, async () => {
  200 |             expect(existingQuoteNumber).toBe(targetQuoteNo);
  201 |         });
  202 | 
  203 |         // Verify Quoting Items and Sequence
  204 |         await quotingTab.goToQuotingTab();
  205 |         await quotingTab.verifyCopytoExistingItemsSequence(newQuoteItemsSequence);
  206 |     });
  207 | 
  208 |     test("Copy Quote from AH-ON to AH-OFF", async ({ page }, testInfo) => {
  209 |         const TARGET_KEY = "copyQuote.target.AHON-AHOFF";
  210 |         let targetQuoteNo: string;
  211 | 
  212 |         // Target Quote: first attempt creates a new one, retry reuses the same one
  213 |         const savedTargetQuoteNo = testInfo.retry > 0 ? loadState<string>(TARGET_KEY) : undefined;
  214 |         await navBarPage.openQuoteDropdown();
  215 |         await navBarPage.selectRepairerQuote();
  216 |         if (savedTargetQuoteNo) {
  217 |             targetQuoteNo = savedTargetQuoteNo;
  218 |             await headerTab.searchAndOpenQuoteByNumber(targetQuoteNo);
  219 |         } else {
  220 |             clearState(TARGET_KEY);
  221 |             await subNavBarPage.clickPlusNewButton();
  222 |             targetQuoteNo = await subNavBarPage.extractAndStoreQuoteNumber();
  223 |             await headerTab.fillHeaderWithRandomInsurer();
  224 |             await subNavBarPage.clickCreateButton();
  225 |             await subNavBarPage.expectToast(`New quote ${targetQuoteNo} added`);
  226 |             saveState(TARGET_KEY, targetQuoteNo);
  227 |         }
  228 |         await step(`Target Quote No: ${targetQuoteNo} (retry #${testInfo.retry})`, async () => {});
  229 | 
  230 |         // Target quote must be AH-OFF with 3 parts
  231 |         await subNavBarPage.disableAssessmentHistory();
  232 |         await headerTab.goToHeaderTab();
  233 |         await subNavBarPage.waitForAutoSaveCloudDone();
  234 |         await quotingTab.goToQuotingTab();
  235 |         await quotingTab.deleteAllPartsIfAny();
  236 |         await subNavBarPage.waitForAutoSaveCloudDone();
  237 |         await quotingTab.openVehicleSectionsTab();
  238 |         await quotingTab.addQuotingItemsByIndex(3);
  239 |         await quotingTab.goToQuotingTab();
  240 |         await subNavBarPage.waitForAutoSaveCloudDone();
  241 | 
  242 |         // Source quote must be AH-ON
  243 |         await navBarPage.openQuoteDropdown();
  244 |         await navBarPage.selectRepairerQuote();
  245 |         await headerTab.clickResetButton();
  246 |         await headerTab.searchAndOpenQuoteByNumber(quoteNumber);
  247 |         await subNavBarPage.enableAssessmentHistory();
  248 |         await headerTab.goToHeaderTab();
  249 |         await subNavBarPage.waitForAutoSaveCloudDone();
  250 | 
  251 |         // Remove leftover parts, then add 5 parts in Source
  252 |         await quotingTab.goToQuotingTab();
  253 |         await quotingTab.deleteAllPartsIfAny();
  254 |         await subNavBarPage.waitForAutoSaveCloudDone();
  255 |         await quotingTab.openVehicleSectionsTab();
  256 |         await quotingTab.addQuotingItemsByIndex(5);
  257 |         await quotingTab.goToQuotingTab();
  258 |         await subNavBarPage.waitForAutoSaveCloudDone();
  259 |         const newQuoteItemsSequence = await quotingTab.captureQuotingItemsSequence();
  260 | 
  261 |         // Copy Source -> Target
  262 |         await subNavBarPage.clickEllipisBtn();
  263 |         await subNavBarPage.selectCopyQuote();
  264 |         await subNavBarPage.copyToExistingQuote(targetQuoteNo);
  265 |         await subNavBarPage.expectToast("Copy quote successful.");
  266 |         await page.waitForTimeout(10_000);
  267 | 
  268 |         // Verify Quote Number
  269 |         existingQuoteNumber = await subNavBarPage.extractAndStoreQuoteNumber();
  270 |         await step(`"${existingQuoteNumber}" === "${targetQuoteNo}"`, async () => {
> 271 |             expect(existingQuoteNumber).toBe(targetQuoteNo);
      |                                         ^ Error: expect(received).toBe(expected) // Object.is equality
  272 |         });
  273 | 
  274 |         // Verify Quoting Items and Sequence
  275 |         await quotingTab.goToQuotingTab();
  276 |         await quotingTab.verifyCopytoExistingItemsSequence(newQuoteItemsSequence);
  277 |     });
  278 | 
  279 |     test("Copy Quote from AH-ON to AH-ON", async ({ page }, testInfo) => {
  280 |         const TARGET_KEY = "copyQuote.target.AHON-AHON";
  281 |         let targetQuoteNo: string;
  282 | 
  283 |         // Target Quote: first attempt creates a new one, retry reuses the same one
  284 |         const savedTargetQuoteNo = testInfo.retry > 0 ? loadState<string>(TARGET_KEY) : undefined;
  285 |         await navBarPage.openQuoteDropdown();
  286 |         await navBarPage.selectRepairerQuote();
  287 |         if (savedTargetQuoteNo) {
  288 |             targetQuoteNo = savedTargetQuoteNo;
  289 |             await headerTab.searchAndOpenQuoteByNumber(targetQuoteNo);
  290 |         } else {
  291 |             clearState(TARGET_KEY);
  292 |             await subNavBarPage.clickPlusNewButton();
  293 |             targetQuoteNo = await subNavBarPage.extractAndStoreQuoteNumber();
  294 |             await headerTab.fillHeaderWithRandomInsurer();
  295 |             await subNavBarPage.clickCreateButton();
  296 |             await subNavBarPage.expectToast(`New quote ${targetQuoteNo} added`);
  297 |             saveState(TARGET_KEY, targetQuoteNo);
  298 |         }
  299 |         await step(`Target Quote No: ${targetQuoteNo} (retry #${testInfo.retry})`, async () => {});
  300 | 
  301 |         // Target quote must be AH-ON with 3 parts
  302 |         await subNavBarPage.enableAssessmentHistory();
  303 |         await headerTab.goToHeaderTab();
  304 |         await subNavBarPage.waitForAutoSaveCloudDone();
  305 |         await quotingTab.goToQuotingTab();
  306 |         await quotingTab.deleteAllPartsIfAny();
  307 |         await subNavBarPage.waitForAutoSaveCloudDone();
  308 |         await quotingTab.openVehicleSectionsTab();
  309 |         await quotingTab.addQuotingItemsByIndex(3);
  310 |         await quotingTab.goToQuotingTab();
  311 |         await subNavBarPage.waitForAutoSaveCloudDone();
  312 | 
  313 |         // Source quote must be AH-ON
  314 |         await navBarPage.openQuoteDropdown();
  315 |         await navBarPage.selectRepairerQuote();
  316 |         await headerTab.clickResetButton();
  317 |         await headerTab.searchAndOpenQuoteByNumber(quoteNumber);
  318 |         await subNavBarPage.enableAssessmentHistory();
  319 |         await headerTab.goToHeaderTab();
  320 |         await subNavBarPage.waitForAutoSaveCloudDone();
  321 | 
  322 |         // Remove leftover parts, then add 5 parts in Source
  323 |         await quotingTab.goToQuotingTab();
  324 |         await quotingTab.deleteAllPartsIfAny();
  325 |         await subNavBarPage.waitForAutoSaveCloudDone();
  326 |         await quotingTab.openVehicleSectionsTab();
  327 |         await quotingTab.addQuotingItemsByIndex(5);
  328 |         await quotingTab.goToQuotingTab();
  329 |         await subNavBarPage.waitForAutoSaveCloudDone();
  330 |         const newQuoteItemsSequence = await quotingTab.captureQuotingItemsSequence();
  331 | 
  332 |         // Copy Source -> Target
  333 |         await subNavBarPage.clickEllipisBtn();
  334 |         await subNavBarPage.selectCopyQuote();
  335 |         await subNavBarPage.copyToExistingQuote(targetQuoteNo);
  336 |         await subNavBarPage.expectToast("Copy quote successful.");
  337 |         await page.waitForTimeout(10_000);
  338 | 
  339 |         // Verify Quote Number
  340 |         existingQuoteNumber = await subNavBarPage.extractAndStoreQuoteNumber();
  341 |         await step(`"${existingQuoteNumber}" === "${targetQuoteNo}"`, async () => {
  342 |             expect(existingQuoteNumber).toBe(targetQuoteNo);
  343 |         });
  344 | 
  345 |         // Verify Quoting Items and Sequence
  346 |         await quotingTab.goToQuotingTab();
  347 |         await quotingTab.verifyCopytoExistingItemsSequence(newQuoteItemsSequence);
  348 |     });
  349 | });
  350 | 
```