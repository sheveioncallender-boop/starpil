import base64
import mimetypes

from odoo import _, http
from odoo.exceptions import UserError, ValidationError
from odoo.http import request


class StarpilProAccountController(http.Controller):
    @http.route("/pro-account", type="http", auth="public", website=True, sitemap=True)
    def pro_account(self, **kwargs):
        return request.render("starpil_pro_core.pro_account_page", {"form": kwargs})

    @http.route("/pro-account/apply", type="http", auth="public", website=True, methods=["POST"], csrf=True)
    def pro_account_apply(self, **post):
        required = ["name", "email", "phone", "business_name", "professional_role", "password"]
        missing = [field for field in required if not post.get(field)]
        upload = request.httprequest.files.get("certificate")
        if missing or not upload:
            return request.render("starpil_pro_core.pro_account_page", {
                "form": post,
                "error": _("Complete every required field and attach your certificate."),
            })
        if len(post["password"]) < 8:
            return request.render("starpil_pro_core.pro_account_page", {
                "form": post,
                "error": _("Use a password with at least 8 characters."),
            })
        content = upload.read()
        mime = upload.mimetype or mimetypes.guess_type(upload.filename)[0]
        if len(content) > 8 * 1024 * 1024 or mime not in ("application/pdf", "image/jpeg", "image/png"):
            return request.render("starpil_pro_core.pro_account_page", {
                "form": post,
                "error": _("Certificate must be a PDF, JPG or PNG no larger than 8 MB."),
            })

        email = post["email"].strip().lower()
        try:
            existing_user = request.env["res.users"].sudo().with_context(active_test=False).search([("login", "=", email)], limit=1)
            if existing_user:
                raise ValidationError(_("An account already exists for this email address."))
            portal_group = request.env.ref("base.group_portal")
            user = request.env["res.users"].sudo().with_context(no_reset_password=True).create({
                "name": post["name"].strip(),
                "login": email,
                "email": email,
                "password": post["password"],
                "active": False,
                "group_ids": [(6, 0, [portal_group.id])],
            })
            application = request.env["starpil.pro.application"].sudo().create({
                "name": post["name"].strip(),
                "email": email,
                "phone": post["phone"].strip(),
                "business_name": post["business_name"].strip(),
                "professional_role": post["professional_role"],
                "certificate": base64.b64encode(content),
                "certificate_filename": upload.filename,
                "notes": post.get("notes"),
                "user_id": user.id,
                "partner_id": user.partner_id.id,
                "website_id": request.website.id,
            })
            user.partner_id.write({
                "phone": application.phone,
                "starpil_pro_role": application.professional_role,
                "starpil_business_name": application.business_name,
                "starpil_pro_application_id": application.id,
            })
            application.send_verification_email()
        except (ValidationError, UserError) as error:
            return request.render("starpil_pro_core.pro_account_page", {"form": post, "error": error.args[0]})
        return request.redirect("/pro-account/check-email")

    @http.route("/pro-account/check-email", type="http", auth="public", website=True, sitemap=False)
    def check_email(self, **kwargs):
        return request.render("starpil_pro_core.pro_account_check_email")

    @http.route("/pro-account/verify/<string:token>", type="http", auth="public", website=True, sitemap=False)
    def verify(self, token, **kwargs):
        application = request.env["starpil.pro.application"].sudo().search([("verification_token", "=", token)], limit=1)
        if not application:
            return request.render("starpil_pro_core.pro_account_verification_result", {"verified": False})
        try:
            application.verify_email(token)
            return request.render("starpil_pro_core.pro_account_verification_result", {"verified": True})
        except UserError:
            return request.render("starpil_pro_core.pro_account_verification_result", {"verified": False})
