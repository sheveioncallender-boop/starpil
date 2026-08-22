# Starpil acceptance tests

## Professional account

- Submit every required field and a PDF/JPG/PNG credential up to 8 MB.
- Confirm the created portal user is inactive and cannot sign in.
- Confirm the verification message arrives and its link moves the application to **Pending Review**.
- Confirm designated staff receive the review notification.
- Approve the application and confirm the user can sign in and see their assigned Odoo pricelist.
- Reject and request-more-information paths send the correct email and do not unlock access.

## Product publishing and prices

- Create a product in Odoo, enable **Publish on Starpil Website**, and confirm it appears without duplicate entry.
- Create or edit a **Website Collection**, enable **Show in Starpil Header**, and confirm the header tab updates without a deployment or sync button.
- Enable **Show on Starpil Homepage**, set its card style/image, and confirm the homepage collection card updates in real time.
- Disable publication and confirm it disappears.
- Change name, image, website copy, stock or pricelist price and confirm the site reflects the change.
- Confirm public visitors never see price, stock quantity or add-to-cart controls.
- Confirm only an active, approved Pro customer can add products or reach custom cart/checkout pages.
- Confirm direct native Odoo routes (`/shop/cart`, `/shop/checkout`, `/shop/payment`) redirect unapproved visitors to the Pro Account flow.
- Confirm native cart, variant, product-configurator and combo-configurator JSON endpoints reject unapproved visitors without returning price data.
- Confirm approval assigns **Starpil Pro USD** and product, cart and checkout totals all use USD.

## Points estimates

- On a product page, change quantity and confirm the estimate changes immediately.
- Confirm the product estimate uses the customer's tier multiplier and product multiplier.
- Confirm the cart estimate recalculates after quantity changes/removals.
- Confirm checkout shows the current estimate and states that points post after successful payment.
- Confirm delivery, taxes, reward discount lines and non-eligible products do not earn points.

## Points posting and expiry

- Confirm an unpaid order creates no posted points.
- Mark the invoice paid and confirm exactly one earn transaction is created.
- Run the paid-order cron twice and confirm the order is not awarded twice.
- Confirm qualifying spend increases independently from redeemable balance.
- Expire an earning transaction in staging, run the expiry cron and confirm only its unspent remainder expires.

## Rewards and card

- Redeem a reward and confirm FIFO consumption, a customer-bound coupon and an immutable negative ledger entry.
- Enter the coupon on the same approved customer's checkout and confirm the discount line and coupon state.
- Confirm a different customer cannot use the coupon.
- Open `/my/starpil/loyalty`, scan the Code128 card in the Odoo scan wizard and confirm the correct customer opens.

## Orders and portal

- Place an order through Odoo checkout and confirm quotation, sales order, invoice and stock workflow use native Odoo records.
- Confirm the customer dashboard links to native Odoo orders, invoices and account details.
- Test desktop, tablet and mobile; mobile menu is on the left, cart is on the right, and menu links show a pink hover/focus highlight.
