# Starpil Caribbean — Odoo 19 Community

Production-oriented Odoo add-ons plus the approved V11 HTML design reference for Starpil Caribbean.

This repository is intentionally flat. Upload its contents directly to the root of a GitHub repository, or place the three `starpil_*` module folders directly in an Odoo custom add-ons path. There is no extra wrapper directory inside the release ZIP.

## Modules

| Module | Purpose |
|---|---|
| `starpil_pro_core` | One-time Pro signup, email verification, certificate upload, admin review, approval/rejection and protected account status |
| `starpil_website` | Approved V11 white/deep-pink storefront, live Odoo catalogue and collection controls, USD Pro pricing, protected prices, cart/checkout estimates and customer dashboard |
| `starpil_loyalty` | Configurable points, expiry, tiers, rewards, coupons, ledger, digital member card and staff scan workflow |
| `design-preview` | Approved standalone HTML design reference; useful for visual QA and implementation comparison |

## Operating model

Odoo is the engine and source of truth:

- A product is created and maintained once in Odoo.
- The product's **Starpil Website** tab controls native Odoo publication, sequencing, badge, website copy, access, stock display, loyalty eligibility/multiplier and SEO copy.
- **Starpil → Website Collections** controls collection membership, homepage cards, header tabs and their sequence.
- Name, variants, professional price, taxes, stock and order data are read live from Odoo.
- Public visitors may browse published products, but prices and purchasing remain locked.
- A new professional creates one inactive portal account, verifies their email, and waits for admin approval.
- Approval activates the user, adds the **Approved Pro Customer** group and automatically assigns the configured **Starpil Pro USD** pricelist.
- Product, cart and checkout show estimated points from the current customer's tier, eligible spend, product multiplier and quantity.
- Points post only after Odoo sees the related invoices as paid/in payment. Delivery lines and non-eligible products do not earn points.

## Install

See [INSTALLATION.md](INSTALLATION.md). Install in this order:

1. `starpil_pro_core`
2. `starpil_website`
3. `starpil_loyalty`

Installing `starpil_loyalty` from Apps installs its dependencies automatically when all three folders are on the add-ons path.

## Initial configuration

1. Assign the **Pro Application Manager** and **Loyalty Manager** access groups to the correct internal users.
2. Configure outgoing email and the website base URL.
3. Open **Website → Configuration → Settings** and confirm **Starpil Pro USD** as the primary Starpil website pricelist. USD is the default; TTD can remain an optional secondary pricelist.
4. Open **Starpil → Website Collections** and choose which Odoo categories appear in the header and homepage.
5. Open **Starpil → Loyalty → Configuration → Programs & Tiers** to review the USD 1.50/base-point rule, 12-month expiry, tier thresholds and reward catalogue.
6. On each product, open **Starpil Website**, enable publication and confirm its collections, stock display and loyalty multiplier.
7. Configure Odoo taxes, delivery carriers and payment providers before accepting live orders.

## Important production note

The approved HTML mentions WiPay, but a live WiPay payment provider is not included in this release because its API mode, credentials, webhook signature rules and production URLs must be confirmed from the merchant account. Odoo's checkout and installed payment providers remain the active payment engine. Add `starpil_wipay` only after those details are available.

## Release

Version: `19.0.2.0.0`  
Design reference: V11 — includes the approved homepage, customer pages and administrator experience screens.

## Current implementation milestone

This V2 package completes the Phase 1 foundation: Odoo 19 Community compatibility corrections, V11 design parity, live native product publication, Odoo-managed header/homepage collections, inventory visibility, primary USD Pro pricelist assignment and the verified/admin-approved Pro account workflow. Payment-provider modules and the streamlined shipping/email administration screens remain later implementation milestones; their approved HTML screens are preserved in `design-preview`.
