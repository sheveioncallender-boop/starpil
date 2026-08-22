from dateutil.relativedelta import relativedelta

from odoo import _, api, fields, models


class SaleOrder(models.Model):
    _inherit = "sale.order"

    starpil_points_posted = fields.Boolean(copy=False, readonly=True)
    starpil_points_posted_count = fields.Integer(copy=False, readonly=True)
    starpil_loyalty_transaction_id = fields.Many2one("starpil.loyalty.transaction", copy=False, readonly=True)

    def _starpil_paid_for_loyalty(self):
        self.ensure_one()
        invoices = self.invoice_ids.filtered(lambda move: move.move_type == "out_invoice" and move.state == "posted")
        return bool(invoices and all(move.payment_state in ("paid", "in_payment") for move in invoices))

    def _starpil_post_loyalty_points(self):
        for order in self:
            if order.starpil_points_posted or not order.partner_id.starpil_pro_approved or not order._starpil_paid_for_loyalty():
                continue
            account = order.partner_id._starpil_loyalty_account(create=True)
            if not account:
                continue
            points = order.starpil_points_estimate
            eligible_spend = sum(order.order_line.filtered(lambda line: not line.display_type and not line.is_delivery and line.product_id.product_tmpl_id.starpil_loyalty_eligible).mapped("price_subtotal"))
            expiry_date = False
            if account.program_id.expiry_months:
                expiry_date = fields.Date.today() + relativedelta(months=account.program_id.expiry_months)
            transaction = self.env["starpil.loyalty.transaction"].create({
                "account_id": account.id,
                "transaction_type": "earn",
                "points": points,
                "expiry_date": expiry_date,
                "sale_order_id": order.id,
                "description": _("Order %s") % order.name,
            }) if points else self.env["starpil.loyalty.transaction"]
            account.qualifying_spend += eligible_spend
            order.write({
                "starpil_points_posted": True,
                "starpil_points_posted_count": points,
                "starpil_loyalty_transaction_id": transaction.id if transaction else False,
            })

    @api.model
    def _cron_post_paid_order_points(self):
        orders = self.search([("state", "in", ("sale", "done")), ("starpil_points_posted", "=", False), ("partner_id.starpil_pro_approved", "=", True)])
        orders._starpil_post_loyalty_points()


class AccountMove(models.Model):
    _inherit = "account.move"

    def write(self, vals):
        result = super().write(vals)
        if set(vals).intersection({"payment_state", "state"}):
            self.mapped("line_ids.sale_line_ids.order_id")._starpil_post_loyalty_points()
        return result
