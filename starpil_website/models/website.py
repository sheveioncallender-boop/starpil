from odoo import fields, models


class Website(models.Model):
    _inherit = "website"

    starpil_primary_pricelist_id = fields.Many2one(
        "product.pricelist",
        string="Starpil Primary Website Pricelist",
        domain="[('currency_id.name', '=', 'USD')]",
        help="The USD professional pricelist assigned automatically when a Pro application is approved.",
    )
    starpil_secondary_pricelist_id = fields.Many2one(
        "product.pricelist",
        string="Optional Secondary Pricelist",
        help="Optional administrator-controlled secondary currency, such as TTD.",
    )

    def _starpil_primary_pricelist(self):
        self.ensure_one()
        return (
            self.starpil_primary_pricelist_id
            or self.env.ref("starpil_website.starpil_professional_usd_pricelist", raise_if_not_found=False)
        )
