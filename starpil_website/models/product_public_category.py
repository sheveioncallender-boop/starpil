from odoo import fields, models


class ProductPublicCategory(models.Model):
    _inherit = "product.public.category"

    starpil_show_in_header = fields.Boolean(
        string="Show in Starpil Header",
        help="Displays this collection as a live navigation tab on the Starpil website.",
    )
    starpil_header_sequence = fields.Integer(
        string="Header Sequence",
        default=10,
        help="Lower numbers appear first in the website header.",
    )
    starpil_show_on_home = fields.Boolean(
        string="Show on Starpil Homepage",
        help="Displays this collection in the homepage collection grid.",
    )
    starpil_card_kicker = fields.Char(
        string="Homepage Kicker",
        help="Short supporting text such as 'For sensitive skin'.",
    )
    starpil_card_style = fields.Selection(
        [
            ("large", "Large Image"),
            ("dark", "Dark"),
            ("blue", "Blue"),
            ("gold", "Gold"),
            ("plain", "Light"),
            ("pink", "Pink"),
        ],
        string="Homepage Card Style",
        default="plain",
        required=True,
    )

    def _starpil_card_class(self):
        self.ensure_one()
        return "category-card-%s" % (self.starpil_card_style or "plain")
