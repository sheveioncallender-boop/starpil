from odoo import fields, models


class ResConfigSettings(models.TransientModel):
    _inherit = "res.config.settings"

    starpil_primary_pricelist_id = fields.Many2one(
        related="website_id.starpil_primary_pricelist_id",
        readonly=False,
    )
    starpil_secondary_pricelist_id = fields.Many2one(
        related="website_id.starpil_secondary_pricelist_id",
        readonly=False,
    )
