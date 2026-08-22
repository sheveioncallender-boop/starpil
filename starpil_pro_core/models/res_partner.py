from odoo import fields, models


class ResPartner(models.Model):
    _inherit = "res.partner"

    starpil_pro_approved = fields.Boolean(
        string="Approved Starpil Professional",
        copy=False,
        index=True,
        tracking=True,
    )
    starpil_pro_role = fields.Selection(
        [
            ("esthetician", "Esthetician"),
            ("salon_owner", "Salon / Spa Owner"),
            ("educator", "Educator"),
            ("student", "Student"),
            ("other", "Other Professional"),
        ],
        string="Professional Role",
        tracking=True,
    )
    starpil_business_name = fields.Char(string="Business / School")
    starpil_pro_application_id = fields.Many2one(
        "starpil.pro.application",
        string="Latest Pro Application",
        copy=False,
    )

    def _starpil_can_see_prices(self):
        self.ensure_one()
        return bool(self.starpil_pro_approved and self.user_ids.filtered("active"))

    def _starpil_estimated_points(self, amount, product=None, quantity=1.0):
        """Extension hook overridden by starpil_loyalty."""
        self.ensure_one()
        return 0
