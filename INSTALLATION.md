# Installation and deployment

## 1. Put the modules on the Odoo server

Copy these folders directly into a custom add-ons directory:

```text
starpil_pro_core/
starpil_website/
starpil_loyalty/
```

Example add-ons path entry:

```ini
addons_path = /opt/odoo/odoo/addons,/opt/odoo/custom-addons
```

Restart Odoo, enable developer mode, open **Apps → Update Apps List**, then install **Starpil Pro Loyalty**. Odoo will resolve the other two Starpil dependencies.

Command-line alternative:

```bash
./odoo-bin -d YOUR_DATABASE -i starpil_pro_core,starpil_website,starpil_loyalty --stop-after-init
```

## 2. Configure staff permissions

Under **Settings → Users & Companies → Users**, assign:

- **Pro Application Manager** to staff who review professional credentials.
- **Loyalty Manager** to staff who configure points and scan digital cards.

## 3. Configure email and URL

Set a working outgoing mail server and the correct `web.base.url`. Verification, reviewed, approved, more-information and rejection emails use Odoo mail templates.

## 4. Configure products

On each product:

1. Maintain normal Odoo fields: name, variants, sales price/pricelist, tax, stock, SKU and images.
2. Open the **Starpil Website** tab.
3. Enable **Publish on Starpil Website**.
4. Set collections, sequence, badge, website copy and stock visibility. Manage the collection/header presentation under **Starpil → Website Collections**.
5. Set **Earns Loyalty Points** and the product multiplier.

The website reads these records on every request. Do not create a duplicate website catalogue.

## 5. Configure Pro pricing

Confirm the packaged **Starpil Pro USD** pricelist under **Website → Configuration → Settings → Starpil Pro Website Currency**. Approval assigns this pricelist to the customer's contact automatically. The storefront uses `partner.property_product_pricelist`; it does not keep a second price table.

## 6. Configure loyalty

Open **Starpil → Loyalty → Configuration → Programs & Tiers**. Review:

- USD spend required per base point
- expiry period (0 means no expiry)
- tier spend thresholds and multipliers
- reward point costs, values, validity and minimum order
- reward discount service product

Redeemable points and tier-qualifying spend are separate. Redeeming points therefore does not reduce a customer's tier status.

## 7. Website URLs

- `/` — homepage
- `/starpil/shop` — catalogue
- `/pro-account` — professional application
- `/starpil/cart` — approved cart
- `/starpil/checkout` — approved checkout review
- `/my/starpil` — customer dashboard
- `/my/starpil/loyalty` — points wallet and digital card

## 8. Before production

- Run the checks in [ACCEPTANCE_TESTS.md](ACCEPTANCE_TESTS.md).
- Configure backup, HTTPS, email SPF/DKIM, taxes, inventory warehouses and delivery carriers.
- Configure an Odoo payment provider. WiPay and Scotia eCom+ require separate provider modules once merchant API details and signature rules are confirmed.
- Test on a staging database with real product variants and pricelists before upgrading production.
