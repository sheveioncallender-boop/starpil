from odoo import api, fields, models


class SaleOrder(models.Model):
    _inherit = "sale.order"

    starpil_points_estimate = fields.Integer(
        string="Estimated Starpil Points",
        compute="_compute_starpil_points_estimate",
    )

    @api.depends(
        "order_line.price_subtotal",
        "order_line.product_uom_qty",
        "order_line.product_id",
        "order_line.is_delivery",
        "partner_id",
    )
    def _compute_starpil_points_estimate(self):
        for order in self:
            points = 0
            for line in order.order_line.filtered(lambda row: not row.display_type and not row.is_delivery):
                product = line.product_id.product_tmpl_id
                amount = line.price_subtotal
                points += order.partner_id._starpil_estimated_points(amount, product=product, quantity=line.product_uom_qty)
            order.starpil_points_estimate = points
