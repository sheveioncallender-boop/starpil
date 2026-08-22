STARPIL CARIBBEAN — HTML REDESIGN PROTOTYPE

Preview
Open index.html in a modern browser.

Included pages
- index.html — homepage
- shop.html — professional catalogue and category filters
- shop-approved.html — approved catalogue with visible account pricing
- product.html — dynamic product detail template
- product-unlocked.html — approved-account product layout with visible demo pricing
- cart-approved.html — approved-account cart with editable quantities and totals
- checkout-approved.html — customer, delivery, payment and order-review checkout
- order-confirmation.html — post-checkout confirmation and points-pending state
- product-unlocked.html, cart-approved.html and checkout-approved.html — live estimated-points messaging for approved customers; points remain pending until successful payment
- pro-account.html — professional application workflow
- approval-pending.html — verified application status before approval
- customer-dashboard.html — approved customer account overview
- customer-orders.html — order history and filtering
- customer-order-detail.html — order details, documents and delivery tracking
- customer-invoices.html — invoice, receipt and online-payment records
- customer-loyalty.html — points wallet, tiers, rewards and digital member card
- customer-profile.html — business details, addresses and account security
- about.html — brand and distributor story
- contact.html — support, contact and policy overview
- admin-overview.html — real-time Odoo operations, action queue and system health
- admin-payments.html — WiPay, Scotia eCom+ and bank-transfer settings
- admin-bank-transfers.html — receipt review, approval and Odoo payment registration
- admin-shipping.html — custom delivery fees, free pickup and live fulfilment workflow
- admin-email.html — SMTP, notification templates and the live Odoo email queue
- admin-pro-applications.html — administrator queue, filtering and search
- admin-pro-application-detail.html — certificate review and approval decisions
- admin-loyalty.html — earning, expiry, tier, reward and digital-card rules

SiteGround upload
Upload all files and the assets folder together into public_html. The package
is intentionally flat, with all HTML, CSS and JavaScript files at the top level.

Prototype note
This version demonstrates the approved customer and administrator experience.
It follows the same implementation boundary established for Fuze: HTML defines
the experience and workflow; Odoo remains the engine and source of truth.

In production, Odoo will manage user accounts, email verification, application
records, certificate storage, administrator activities, approval groups,
protected price lists, inventory, orders, fulfilment and email templates. Until
approval, all prices and purchase actions are intentionally hidden.

The administration screens are interactive design prototypes. Their filters,
provider switches, review decisions, fulfilment controls, queue states and live
status feedback show the intended behaviour but do not yet write Odoo records,
contact payment services or send messages.

Real-time implementation rule
Odoo is the single live engine and source of truth. The website and streamlined
administrator interface will read and write the same Odoo products, price lists,
stock, sales orders, payment transactions, accounting records, delivery orders,
mail queue, professional approvals and loyalty records. There is no duplicate
website or admin database and no manual synchronization button. External payment
callbacks and SMTP delivery events update the related Odoo documents immediately;
scheduled recovery jobs are only a safety net for missed external events.

Delivery fee controls
Administrators add and edit simple customer-facing delivery fees by name,
coverage area, USD charge, estimated delivery time, optional free-delivery
threshold and active status. The experience layer automatically maps each fee
to a native Odoo delivery carrier/product so the selected charge appears on the
same live sale order and invoice without exposing technical setup to staff.

Loyalty implementation boundary
The Starpil Pro loyalty program is designed as a custom Odoo module linked to
native Contacts, portal users, Sales, eCommerce, POS, Accounting and Inventory.
The custom module owns the points ledger, transaction-level expiry, tier
qualification, reward catalogue, customer-bound coupons, digital member card
and audit log. Redeemable points and tier qualification are tracked separately,
so spending points never reduces a customer's tier.

The barcode shown in the digital card prototype is a valid EAN-13 visual for
experience testing. Production will generate a unique code for each member and
the custom POS extension will resolve it to the Odoo customer and loyalty
account before awarding points or accepting a reward.

The unlocked product page is a design-review example only. Its sample USD price
is not live inventory or selling data and should be replaced by the approved
commerce account feed in production.

Currency implementation boundary
USD is the primary website, professional pricelist, delivery, cart, checkout,
order, invoice, loyalty and payment currency. TTD remains an optional secondary
currency controlled by the administrator. Odoo currency and pricelist records
are the live source; payment providers appear only when their merchant account
supports the order currency. Currency is locked once checkout begins so an
order, payment transaction and accounting journal always remain aligned.
