import math

from odoo import fields, models


class ResPartner(models.Model):
    _inherit = "res.partner"

    starpil_loyalty_account_ids = fields.One2many("starpil.loyalty.account", "partner_id")

    def _starpil_loyalty_account(self, create=False):
        self.ensure_one()
        program = self.env["starpil.loyalty.program"].sudo().search([("active", "=", True), ("company_id", "=", self.env.company.id)], limit=1)
        if not program:
            return self.env["starpil.loyalty.account"]
        account = self.starpil_loyalty_account_ids.filtered(lambda row: row.program_id == program)[:1]
        if not account and create and self.starpil_pro_approved:
            account = self.env["starpil.loyalty.account"].sudo().create({"partner_id": self.id, "program_id": program.id})
        return account

    def _starpil_estimated_points(self, amount, product=None, quantity=1.0):
        self.ensure_one()
        if amount <= 0 or not self.starpil_pro_approved:
            return 0
        if product and (not product.starpil_loyalty_eligible or product.starpil_loyalty_multiplier <= 0):
            return 0
        account = self._starpil_loyalty_account(create=True)
        if not account:
            return 0
        tier_multiplier = account.tier_id.multiplier or 1.0
        product_multiplier = product.starpil_loyalty_multiplier if product else 1.0
        base_points = amount / account.program_id.spend_per_point
        return max(0, math.floor(base_points * tier_multiplier * product_multiplier))
