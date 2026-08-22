from odoo import _, fields, models
from odoo.exceptions import UserError


class StarpilLoyaltyMemberScan(models.TransientModel):
    _name = "starpil.loyalty.member.scan"
    _description = "Scan Starpil Digital Member Card"

    member_code = fields.Char(required=True, help="Scan the barcode or enter the member code.")

    def action_find_member(self):
        self.ensure_one()
        code = (self.member_code or "").strip().upper()
        account = self.env["starpil.loyalty.account"].search([("member_code", "=", code), ("active", "=", True)], limit=1)
        if not account:
            raise UserError(_("No active Starpil loyalty account matches this card."))
        return {
            "type": "ir.actions.act_window",
            "name": _("Loyalty Account"),
            "res_model": "starpil.loyalty.account",
            "res_id": account.id,
            "view_mode": "form",
            "target": "current",
        }
