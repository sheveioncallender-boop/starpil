from odoo import fields, models


class ProductTemplate(models.Model):
    _inherit = "product.template"

    starpil_website_featured = fields.Boolean(string="Featured Product", default=False)
    starpil_website_sequence = fields.Integer(string="Website Sequence", default=10)
    starpil_website_badge = fields.Char(string="Product Badge", help="Example: Best Seller or New")
    starpil_website_key = fields.Char(string="Website Key", copy=False, index=True)
    starpil_website_description = fields.Html(string="Starpil Website Description", sanitize=True)
    starpil_website_hero = fields.Image(string="Website Hero Image", max_width=2400, max_height=2400)
    starpil_show_stock = fields.Boolean(string="Show Stock Status", default=True)
    starpil_pro_only = fields.Boolean(string="Approved Professionals Only", default=True)
    starpil_seo_title = fields.Char(string="SEO Title")
    starpil_seo_description = fields.Text(string="SEO Description")

    _starpil_website_key_unique = models.Constraint(
        "UNIQUE(starpil_website_key)",
        "The Starpil website key must be unique.",
    )

    def _starpil_website_pricelist(self, partner=None, pricelist=None):
        self.ensure_one()
        if pricelist:
            return pricelist
        partner = partner or self.env.user.partner_id
        return partner.property_product_pricelist

    def _starpil_website_price(self, partner=None, quantity=1.0, pricelist=None):
        self.ensure_one()
        pricelist = self._starpil_website_pricelist(partner=partner, pricelist=pricelist)
        return pricelist._get_product_price(self, quantity=quantity)

    def _starpil_website_currency(self, partner=None, pricelist=None):
        self.ensure_one()
        return self._starpil_website_pricelist(partner=partner, pricelist=pricelist).currency_id

    def _starpil_estimated_points(self, partner=None, quantity=1.0, pricelist=None):
        self.ensure_one()
        partner = partner or self.env.user.partner_id
        amount = self._starpil_website_price(
            partner=partner,
            quantity=quantity,
            pricelist=pricelist,
        ) * quantity
        return partner._starpil_estimated_points(amount, product=self, quantity=quantity)
