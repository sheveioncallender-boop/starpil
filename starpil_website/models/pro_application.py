from odoo import models


class StarpilProApplication(models.Model):
    _inherit = "starpil.pro.application"

    def _starpil_finalize_approval(self):
        result = super()._starpil_finalize_approval()
        for application in self:
            website = application.website_id or self.env["website"].search([], limit=1)
            pricelist = website._starpil_primary_pricelist() if website else False
            if pricelist and application.partner_id:
                application.partner_id.property_product_pricelist = pricelist
        return result
