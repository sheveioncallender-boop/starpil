import secrets
from datetime import date
from dateutil.relativedelta import relativedelta

from odoo import _, api, fields, models
from odoo.exceptions import UserError, ValidationError


class StarpilLoyaltyProgram(models.Model):
    _name = "starpil.loyalty.program"
    _description = "Starpil Loyalty Program"
    _order = "company_id, id"

    name = fields.Char(required=True, default="Starpil Pro Rewards")
    active = fields.Boolean(default=True)
    company_id = fields.Many2one("res.company", required=True, default=lambda self: self.env.company)
    currency_id = fields.Many2one(
        "res.currency",
        required=True,
        default=lambda self: self.env.ref("base.USD"),
        help="Currency used for qualifying spend, tier thresholds and fixed-value rewards.",
    )
    spend_per_point = fields.Monetary(
        string="Spend per Base Point",
        currency_field="currency_id",
        required=True,
        default=1.5,
        help="One base point is awarded for each complete multiple of this eligible untaxed spend.",
    )
    expiry_months = fields.Integer(string="Points Expire After (Months)", default=12, help="Set to 0 for no expiry.")
    tier_ids = fields.One2many("starpil.loyalty.tier", "program_id", string="Tiers")
    reward_ids = fields.One2many("starpil.loyalty.reward", "program_id", string="Rewards")
    discount_product_id = fields.Many2one(
        "product.template",
        string="Reward Discount Product",
        domain="[('type','=','service')]",
        help="Negative order lines created from redeemed customer coupons use this service product.",
    )

    @api.constrains("spend_per_point", "expiry_months")
    def _check_rules(self):
        for program in self:
            if program.spend_per_point <= 0:
                raise ValidationError(_("Spend per point must be greater than zero."))
            if program.expiry_months < 0:
                raise ValidationError(_("Expiry months cannot be negative."))

    def _tier_for_spend(self, spend):
        self.ensure_one()
        return self.tier_ids.filtered(lambda tier: tier.min_qualifying_spend <= spend).sorted("min_qualifying_spend")[-1:] or self.tier_ids[:1]


class StarpilLoyaltyTier(models.Model):
    _name = "starpil.loyalty.tier"
    _description = "Starpil Loyalty Tier"
    _order = "min_qualifying_spend, sequence, id"

    name = fields.Char(required=True)
    program_id = fields.Many2one("starpil.loyalty.program", required=True, ondelete="cascade")
    sequence = fields.Integer(default=10)
    min_qualifying_spend = fields.Monetary(required=True, default=0.0, currency_field="currency_id")
    multiplier = fields.Float(string="Points Multiplier", required=True, default=1.0, digits=(12, 2))
    color = fields.Char(default="#FF9EBE")
    currency_id = fields.Many2one(related="program_id.currency_id", store=True)

    @api.constrains("min_qualifying_spend", "multiplier")
    def _check_values(self):
        for tier in self:
            if tier.min_qualifying_spend < 0 or tier.multiplier <= 0:
                raise ValidationError(_("Tier spend cannot be negative and its multiplier must be greater than zero."))


class StarpilLoyaltyReward(models.Model):
    _name = "starpil.loyalty.reward"
    _description = "Starpil Loyalty Reward"
    _order = "points_cost, name"

    name = fields.Char(required=True)
    active = fields.Boolean(default=True)
    program_id = fields.Many2one("starpil.loyalty.program", required=True, ondelete="cascade")
    points_cost = fields.Integer(required=True)
    reward_type = fields.Selection([("fixed", "Fixed Discount"), ("percent", "Percentage Discount")], default="fixed", required=True)
    discount_value = fields.Float(required=True, default=10.0)
    coupon_valid_days = fields.Integer(default=30)
    minimum_order = fields.Monetary(default=0.0, currency_field="currency_id")
    currency_id = fields.Many2one(related="program_id.currency_id", store=True)

    @api.constrains("points_cost", "discount_value", "coupon_valid_days")
    def _check_reward(self):
        for reward in self:
            if reward.points_cost <= 0 or reward.discount_value <= 0 or reward.coupon_valid_days <= 0:
                raise ValidationError(_("Reward cost, value and validity must be greater than zero."))


class StarpilLoyaltyAccount(models.Model):
    _name = "starpil.loyalty.account"
    _description = "Starpil Loyalty Account"
    _inherit = ["mail.thread", "mail.activity.mixin"]
    _rec_name = "member_code"

    partner_id = fields.Many2one("res.partner", required=True, ondelete="cascade", index=True, tracking=True)
    program_id = fields.Many2one("starpil.loyalty.program", required=True, ondelete="restrict")
    member_code = fields.Char(required=True, default=lambda self: self.env["ir.sequence"].next_by_code("starpil.loyalty.member"), copy=False, index=True)
    transaction_ids = fields.One2many("starpil.loyalty.transaction", "account_id")
    points_balance = fields.Integer(compute="_compute_points_balance", string="Available Points")
    qualifying_spend = fields.Monetary(default=0.0, currency_field="currency_id", tracking=True)
    tier_id = fields.Many2one("starpil.loyalty.tier", compute="_compute_tier", store=True)
    currency_id = fields.Many2one(related="program_id.currency_id", store=True)
    active = fields.Boolean(default=True)

    _partner_program_unique = models.Constraint(
        "UNIQUE(partner_id, program_id)",
        "A customer can have only one account in each loyalty program.",
    )
    _member_code_unique = models.Constraint("UNIQUE(member_code)", "The loyalty member code must be unique.")

    @api.depends("transaction_ids.state", "transaction_ids.points", "transaction_ids.remaining_points")
    def _compute_points_balance(self):
        for account in self:
            account.points_balance = sum(account.transaction_ids.filtered(lambda row: row.state == "posted" and row.points > 0).mapped("remaining_points"))

    @api.depends("qualifying_spend", "program_id", "program_id.tier_ids.min_qualifying_spend")
    def _compute_tier(self):
        for account in self:
            account.tier_id = account.program_id._tier_for_spend(account.qualifying_spend)

    def _consume_points(self, points, reward=None):
        self.ensure_one()
        if points <= 0 or self.points_balance < points:
            raise UserError(_("This account does not have enough available points."))
        remaining = points
        earn_rows = self.transaction_ids.filtered(lambda row: row.state == "posted" and row.remaining_points > 0).sorted(lambda row: (row.expiry_date or date.max, row.id))
        for row in earn_rows:
            used = min(remaining, row.remaining_points)
            row.remaining_points -= used
            remaining -= used
            if not remaining:
                break
        return self.env["starpil.loyalty.transaction"].create({
            "account_id": self.id,
            "transaction_type": "redeem",
            "points": -points,
            "remaining_points": 0,
            "description": _("Redeemed: %s") % (reward.name if reward else _("Manual redemption")),
        })

    def action_redeem_reward(self, reward):
        self.ensure_one()
        if reward.program_id != self.program_id or not reward.active:
            raise UserError(_("This reward is not available for the account."))
        transaction = self._consume_points(reward.points_cost, reward=reward)
        code = "SP-%s" % secrets.token_hex(4).upper()
        return self.env["starpil.loyalty.coupon"].create({
            "code": code,
            "partner_id": self.partner_id.id,
            "reward_id": reward.id,
            "points_transaction_id": transaction.id,
            "expiry_date": fields.Date.today() + relativedelta(days=reward.coupon_valid_days),
        })


class StarpilLoyaltyTransaction(models.Model):
    _name = "starpil.loyalty.transaction"
    _description = "Starpil Loyalty Points Ledger"
    _order = "date desc, id desc"

    account_id = fields.Many2one("starpil.loyalty.account", required=True, ondelete="cascade", index=True)
    partner_id = fields.Many2one(related="account_id.partner_id", store=True, index=True)
    date = fields.Datetime(default=fields.Datetime.now, required=True)
    transaction_type = fields.Selection([("earn", "Earn"), ("redeem", "Redeem"), ("expire", "Expire"), ("adjust", "Adjustment")], required=True, default="earn")
    points = fields.Integer(required=True)
    remaining_points = fields.Integer(help="Unspent portion of a positive points entry.")
    expiry_date = fields.Date(index=True)
    state = fields.Selection([("posted", "Posted"), ("expired", "Expired"), ("cancelled", "Cancelled")], default="posted", required=True, index=True)
    sale_order_id = fields.Many2one("sale.order", ondelete="set null", index=True)
    description = fields.Char(required=True)

    @api.model_create_multi
    def create(self, vals_list):
        for vals in vals_list:
            if vals.get("points", 0) > 0 and "remaining_points" not in vals:
                vals["remaining_points"] = vals["points"]
        return super().create(vals_list)

    @api.model
    def _cron_expire_points(self):
        expired = self.search([("state", "=", "posted"), ("remaining_points", ">", 0), ("expiry_date", "<", fields.Date.today())])
        for row in expired:
            remaining = row.remaining_points
            row.write({"state": "expired", "remaining_points": 0})
            self.create({
                "account_id": row.account_id.id,
                "transaction_type": "expire",
                "points": -remaining,
                "remaining_points": 0,
                "description": _("Expired points from %s") % fields.Date.to_string(row.date.date()),
            })


class StarpilLoyaltyCoupon(models.Model):
    _name = "starpil.loyalty.coupon"
    _description = "Starpil Customer Reward Coupon"
    _order = "create_date desc"

    code = fields.Char(required=True, copy=False, index=True)
    partner_id = fields.Many2one("res.partner", required=True, ondelete="cascade")
    reward_id = fields.Many2one("starpil.loyalty.reward", required=True, ondelete="restrict")
    points_transaction_id = fields.Many2one("starpil.loyalty.transaction", required=True, ondelete="restrict")
    expiry_date = fields.Date(required=True)
    state = fields.Selection([("active", "Active"), ("used", "Used"), ("expired", "Expired"), ("cancelled", "Cancelled")], default="active", required=True)
    sale_order_id = fields.Many2one("sale.order", ondelete="set null")

    _code_unique = models.Constraint("UNIQUE(code)", "The reward coupon code must be unique.")
