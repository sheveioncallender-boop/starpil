from odoo import api, fields, models
from odoo.exceptions import ValidationError


class ProductTemplate(models.Model):
    _inherit = "product.template"

    starpil_loyalty_eligible = fields.Boolean(string="Earns Loyalty Points", default=True)
    starpil_loyalty_multiplier = fields.Float(string="Product Points Multiplier", default=1.0, digits=(12, 2))

    @api.constrains("starpil_loyalty_multiplier")
    def _check_starpil_loyalty_multiplier(self):
        if any(product.starpil_loyalty_multiplier < 0 for product in self):
            raise ValidationError("The product points multiplier cannot be negative.")
