# John Doe Retail pilot

Android-friendly pilot of sales quotes, supplier specifications, existing PO receiving and customer care. Published privately through the John Doe Retail Site. The GitHub repository is public; do not commit customer data, supplier cost lists or credentials.

## Implemented
- Marlesford catalogue with 13 configurations and supplier wording for Matteo.
- Furniture-only, plus £69 delivery, plus delivery and variable Staingard Protect 6 totals. Unknown protection stays unpriced.
- Quote review, print/PDF and conversion to customer order.
- Record existing PO lines, expected dates, partial unit receipts, duplicate delivery-note reference and excess quantity rejection, bay and condition.
- Management routing for safety, staff, refund and repeat-repair concerns.
- JSON export, responsive layout and installable web-app manifest.

## Limitations
This is a browser-local pilot, not the complete retailer management system. Use fictional customer details. There is no shared database, authenticated staff role model, automatic backup, email sending, live lead-time checking, website/accounts integration, stocktake reconciliation or multi-package QR receiving yet. Qty means whole furniture units. Records in the earlier furniture-demo-v1 browser key are retained but not automatically migrated into this revision. Export working data before clearing browser storage.

## Run
Serve this directory with a static HTTP server. Production hosting requires HTTPS for installation. No build dependencies.

## Validation
Browser checked: £1545 furniture / £1614 delivered / £1773 delivered with a manually entered £159 protection charge; saving, quote conversion, and duplicate receiving rejection. JavaScript syntax checked. Physical Android installation has not been tested.
