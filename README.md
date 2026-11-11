# John Doe Retail pilot

Android-friendly pilot of sales quotes, supplier specifications, existing PO receiving and customer care. Published privately through the John Doe Retail Site. The GitHub repository is public; do not commit customer data, supplier cost lists or credentials.

## Implemented
- Searchable selection of the six original verified showroom ranges plus twelve ranges from ten new user-uploaded John Doe retail boards: Dunstan, Rede, Pentney, Reedham, Ottley, Methwold, Lingwood, Ickworth, Chilton, Charsfield, Appleton and Arizona. The manual-price fallback remains.
- Every uploaded board's listed item, grade SE/A–I and pricing column is represented, including standard versus pillow-back sofas, sofa-bed Comfort/Premium/Deluxe choices, Methwold corner layouts and separately priced accessories. The 1,440 underlying source price cells have been checked against the Word tables; three ranges share the Pentney/Reedham/Ottley source.
- Back-style and sofa-bed-mechanism choices appear only when the board supports them. For Charsfield, the board illustrates both back styles but supplies a single price grid; both choices use its one listed price, not an invented surcharge.
- Existing Marlesford catalogue retains 13 core configurations and supplier wording for Matteo.
- Each listed item/grade must have a retail board price; other products can only be added using the manual-price fallback after staff confirmation. Supplier costs and historic stock counts are not published.
- Quotation totals, £69 delivery and variable Staingard Protect 6 totals based only on furniture price; selectable ranges include searchable upholstery and cabinet-furniture collections. Unknown protection stays unpriced.
- Multi-item quotation basket: add different ranges, products, grades, finishes and quantities to one quote; remove any line before saving; draft lines survive a refresh on the same browser.
- Order-wide £69 delivery is charged once and Staingard is calculated on the combined furniture subtotal, excluding loose accessories and explicitly priced add-ons.
- Itemised quote review, print/PDF and conversion to a single customer order, with each original item specification retained and reviewable on the order.
- Record existing PO lines, expected dates, partial unit receipts, duplicate delivery-note reference and excess quantity rejection, bay and condition.
- Management routing for safety, staff, refund and repeat-repair concerns.
- JSON export, responsive layout and installable web-app manifest.

## Limitations
This is a browser-local pilot, not the complete retailer management system. Use fictional customer details. There is no shared database, authenticated staff role model, automatic backup, email sending, live lead-time checking, website/accounts integration, stocktake reconciliation or multi-package QR receiving yet. Qty means whole furniture units. Records in the earlier furniture-demo-v1 browser key are retained but not automatically migrated into this revision. Export working data before clearing browser storage.

## Run
Serve this directory with a static HTTP server. Production hosting requires HTTPS for installation. No build dependencies.

## Validation
Original pilot browser-checked: £1545 furniture / £1614 delivered / £1773 delivered with a manually entered £159 protection charge; saving, quote conversion, and duplicate receiving rejection. The catalogue expansion has been statically checked and JavaScript syntax-validated, but the updated live Android site has not yet been independently tested.

## Source-bound pricing notes (11 November 2026)
These ranges use the uploaded showroom price boards, not supplier cost lists. The range selectors do not invent a foot finish where none was specified. Pillow-back, sofa-bed mechanism and corner configuration prices come directly from the supplied tables. Some extra charges (e.g. pillow filling, scatter cushions and arm caps) are shown as separate fixed-price accessory lines; staff should confirm applicability and quantity. Existing saved quotations are not recalculated when prices change.
