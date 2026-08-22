# Implementation status

## Completed in Phase 1 — release V2

- Odoo 19 Community module structure and compatibility update
- Approved V11 white/deep-pink website styling and responsive header
- Rotating high-quality homepage hero images
- Live Odoo products, publication, images, variants, inventory status and public collections
- Odoo-managed homepage collection cards and header collection tabs
- Primary USD Pro pricelist and automatic assignment on approval
- One-time Pro account signup with certificate upload
- Email verification before administrator review
- Administrator approval, rejection and more-information workflow
- Price, stock, cart and checkout protection for public and unapproved users
- Protection of native Odoo cart and price-returning JSON routes
- Approved customer cart, checkout review, account dashboard and points estimates
- Configurable loyalty programs, tiers, expiry, rewards, coupons and digital member card
- Complete approved standalone HTML preview in `design-preview/`

## Next implementation phases

1. Custom delivery fee configuration and live checkout calculation
2. SMTP settings assistant and email delivery diagnostics
3. Bank-transfer review workflow and notifications
4. WiPay payment provider after merchant API/webhook details are supplied
5. Scotia eCom+ payment provider after merchant API/webhook details are supplied
6. Full staging installation, provider sandbox tests, end-to-end order tests and production rollout

Odoo remains the only operational database. These later modules will extend native Odoo records and events in real time; they will not introduce a second catalogue, order database or synchronization layer.
