import secrets
from datetime import timedelta

from odoo import _, api, fields, models
from odoo.exceptions import UserError, ValidationError


class StarpilProApplication(models.Model):
    _name = "starpil.pro.application"
    _description = "Starpil Professional Account Application"
    _inherit = ["mail.thread", "mail.activity.mixin"]
    _order = "create_date desc"

    name = fields.Char(string="Applicant", required=True, tracking=True)
    email = fields.Char(required=True, index=True, tracking=True)
    phone = fields.Char(required=True)
    business_name = fields.Char(string="Business / School", required=True)
    professional_role = fields.Selection(
        [
            ("esthetician", "Esthetician"),
            ("salon_owner", "Salon / Spa Owner"),
            ("educator", "Educator"),
            ("student", "Student"),
            ("other", "Other Professional"),
        ],
        required=True,
        tracking=True,
    )
    certificate = fields.Binary(required=True, attachment=True)
    certificate_filename = fields.Char()
    notes = fields.Text(string="Applicant Notes")
    admin_notes = fields.Text(tracking=True)
    state = fields.Selection(
        [
            ("unverified", "Awaiting Email Verification"),
            ("pending", "Pending Review"),
            ("more_info", "More Information Requested"),
            ("approved", "Approved"),
            ("rejected", "Rejected"),
        ],
        default="unverified",
        required=True,
        index=True,
        tracking=True,
    )
    verification_token = fields.Char(copy=False, index=True, groups="starpil_pro_core.group_starpil_pro_manager")
    verification_deadline = fields.Datetime(copy=False)
    email_verified_at = fields.Datetime(readonly=True, copy=False)
    reviewed_at = fields.Datetime(readonly=True, copy=False)
    reviewed_by = fields.Many2one("res.users", readonly=True, copy=False)
    user_id = fields.Many2one("res.users", readonly=True, copy=False)
    partner_id = fields.Many2one("res.partner", readonly=True, copy=False)
    website_id = fields.Many2one(
        "website",
        string="Website",
        default=lambda self: self.env["website"].search([], limit=1),
        readonly=True,
        copy=False,
    )

    _email_unique = models.Constraint(
        "UNIQUE(email)",
        "An application already exists for this email address.",
    )

    @api.constrains("email")
    def _check_email(self):
        for record in self:
            if not record.email or "@" not in record.email:
                raise ValidationError(_("Enter a valid email address."))

    @api.model_create_multi
    def create(self, vals_list):
        for vals in vals_list:
            vals["email"] = (vals.get("email") or "").strip().lower()
            vals.setdefault("verification_token", secrets.token_urlsafe(32))
            vals.setdefault("verification_deadline", fields.Datetime.now() + timedelta(hours=48))
        return super().create(vals_list)

    def _send_template(self, xmlid, email_values=None):
        template = self.env.ref(xmlid, raise_if_not_found=False)
        if template:
            template.send_mail(self.id, force_send=True, email_values=email_values or {})

    def send_verification_email(self):
        for application in self:
            application._send_template("starpil_pro_core.mail_template_pro_verify_email")

    def verify_email(self, token):
        self.ensure_one()
        if self.state != "unverified" or not secrets.compare_digest(self.verification_token or "", token or ""):
            raise UserError(_("This verification link is invalid or has already been used."))
        if self.verification_deadline and self.verification_deadline < fields.Datetime.now():
            raise UserError(_("This verification link has expired. Please contact Starpil Caribbean."))
        self.write({
            "state": "pending",
            "email_verified_at": fields.Datetime.now(),
            "verification_token": False,
        })
        self._send_template("starpil_pro_core.mail_template_pro_verified")
        manager_group = self.env.ref("starpil_pro_core.group_starpil_pro_manager")
        manager_emails = manager_group.all_user_ids.filtered(
            lambda user: user.active and user.email
        ).mapped("email")
        if manager_emails:
            self._send_template(
                "starpil_pro_core.mail_template_pro_admin_review",
                {"email_to": ",".join(manager_emails)},
            )
        return True

    def action_approve(self):
        for application in self:
            if application.state not in ("pending", "more_info"):
                raise UserError(_("Only verified applications can be approved."))
            if not application.user_id or not application.partner_id:
                raise UserError(_("The applicant account is missing. Review the application before approving it."))
            application.partner_id.write({
                "starpil_pro_approved": True,
                "starpil_pro_role": application.professional_role,
                "starpil_business_name": application.business_name,
                "starpil_pro_application_id": application.id,
            })
            pro_group = self.env.ref("starpil_pro_core.group_starpil_pro_customer")
            application.user_id.write({
                "active": True,
                "group_ids": [(4, pro_group.id)],
            })
            application._starpil_finalize_approval()
            application.write({
                "state": "approved",
                "reviewed_at": fields.Datetime.now(),
                "reviewed_by": self.env.user.id,
            })
            application._send_template("starpil_pro_core.mail_template_pro_approved")
        return True

    def _starpil_finalize_approval(self):
        """Extension hook for the website/pricelist and other live modules."""
        return True

    def action_request_more_info(self):
        self.write({"state": "more_info", "reviewed_by": self.env.user.id})
        for application in self:
            application._send_template("starpil_pro_core.mail_template_pro_more_info")
        return True

    def action_reject(self):
        for application in self:
            if application.user_id:
                pro_group = self.env.ref("starpil_pro_core.group_starpil_pro_customer")
                application.user_id.write({
                    "active": False,
                    "group_ids": [(3, pro_group.id)],
                })
            application.partner_id.starpil_pro_approved = False
            application.write({
                "state": "rejected",
                "reviewed_at": fields.Datetime.now(),
                "reviewed_by": self.env.user.id,
            })
            application._send_template("starpil_pro_core.mail_template_pro_rejected")
        return True
