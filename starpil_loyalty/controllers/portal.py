from odoo import _, fields, http
from odoo.exceptions import UserError
from odoo.http import request


class StarpilLoyaltyPortal(http.Controller):
    @http.route("/my/starpil/loyalty", type="http", auth="user", website=True, sitemap=False)
    def loyalty_wallet(self, **kwargs):
        partner = request.env.user.partner_id
        if not partner._starpil_can_see_prices():
            return request.redirect("/pro-account")
        account = partner._starpil_loyalty_account(create=True)
        rewards = account.program_id.reward_ids.filtered("active") if account else request.env["starpil.loyalty.reward"]
        coupons = request.env["starpil.loyalty.coupon"].sudo().search([("partner_id", "=", partner.id)], order="create_date desc")
        tiers = account.program_id.tier_ids.sorted("min_qualifying_spend") if account else request.env["starpil.loyalty.tier"]
        next_tier = tiers.filtered(lambda tier: tier.min_qualifying_spend > account.qualifying_spend)[:1] if account else False
        current_floor = account.tier_id.min_qualifying_spend if account and account.tier_id else 0.0
        if next_tier:
            tier_span = max(next_tier.min_qualifying_spend - current_floor, 1.0)
            progress_percent = min(100.0, max(0.0, (account.qualifying_spend - current_floor) * 100.0 / tier_span))
            spend_to_next = max(0.0, next_tier.min_qualifying_spend - account.qualifying_spend)
        else:
            progress_percent = 100.0
            spend_to_next = 0.0
        expiring = account.transaction_ids.filtered(
            lambda row: row.state == "posted" and row.remaining_points > 0 and row.expiry_date
        ).sorted(lambda row: (row.expiry_date, row.id))[:1] if account else False
        latest_earn = account.transaction_ids.filtered(
            lambda row: row.state == "posted" and row.points > 0
        ).sorted(lambda row: (row.date, row.id), reverse=True)[:1] if account else False
        return request.render("starpil_loyalty.portal_loyalty_wallet", {
            "partner": partner,
            "account": account,
            "rewards": rewards,
            "coupons": coupons,
            "tiers": tiers,
            "next_tier": next_tier,
            "progress_percent": progress_percent,
            "spend_to_next": spend_to_next,
            "expiring": expiring,
            "latest_earn": latest_earn,
        })

    @http.route("/my/starpil/loyalty/redeem/<int:reward_id>", type="http", auth="user", website=True, methods=["POST"], csrf=True, sitemap=False)
    def redeem_reward(self, reward_id, **post):
        partner = request.env.user.partner_id
        if not partner._starpil_can_see_prices():
            return request.redirect("/pro-account")
        account = partner._starpil_loyalty_account(create=True)
        reward = request.env["starpil.loyalty.reward"].sudo().browse(reward_id).exists()
        if account and reward:
            account.sudo().action_redeem_reward(reward)
        return request.redirect("/my/starpil/loyalty")

    @http.route("/starpil/loyalty/coupon/apply", type="http", auth="user", website=True, methods=["POST"], csrf=True, sitemap=False)
    def apply_coupon(self, code=None, **post):
        partner = request.env.user.partner_id
        if not partner._starpil_can_see_prices():
            return request.redirect("/pro-account")
        order = request.cart
        coupon = request.env["starpil.loyalty.coupon"].sudo().search([
            ("code", "=", (code or "").strip().upper()),
            ("partner_id", "=", partner.id),
            ("state", "=", "active"),
        ], limit=1)
        if not order or not coupon or coupon.expiry_date < fields.Date.today():
            return request.redirect("/starpil/checkout?coupon_error=invalid")
        reward = coupon.reward_id
        if order.amount_untaxed < reward.minimum_order:
            return request.redirect("/starpil/checkout?coupon_error=minimum")
        product_template = reward.program_id.discount_product_id
        if not product_template:
            raise UserError(_("Configure a reward discount product on the Starpil loyalty program."))
        product = product_template.product_variant_id
        discount = reward.discount_value if reward.reward_type == "fixed" else order.amount_untaxed * reward.discount_value / 100.0
        reward_name = "Starpil reward %s" % coupon.code
        discount_line = order.order_line.filtered(lambda line: line.product_id == product and line.name == reward_name)
        if not discount_line:
            request.env["sale.order.line"].sudo().create({
                "order_id": order.id,
                "product_id": product.id,
                "name": reward_name,
                "product_uom_qty": 1,
                "price_unit": -min(discount, order.amount_untaxed),
            })
        coupon.write({"state": "used", "sale_order_id": order.id})
        return request.redirect("/starpil/checkout?coupon_applied=1")
