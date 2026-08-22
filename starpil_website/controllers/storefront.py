from markupsafe import Markup, escape

from odoo import _, http
from odoo.exceptions import UserError
from odoo.http import request
from odoo.addons.website_sale.controllers.cart import Cart
from odoo.addons.website_sale.controllers.combo_configurator import WebsiteSaleComboConfiguratorController
from odoo.addons.website_sale.controllers.main import WebsiteSale
from odoo.addons.website_sale.controllers.payment import PaymentPortal as WebsiteSalePaymentPortal
from odoo.addons.website_sale.controllers.product_configurator import WebsiteSaleProductConfiguratorController
from odoo.addons.website_sale.controllers.variant import WebsiteSaleVariantController


def _starpil_slug(record):
    """Use Odoo 19's model-level website slug helper."""
    return request.env["ir.http"]._slug(record)


def _starpil_is_approved_request():
    """Return whether the current request may see prices and place orders."""
    user = request.env.user
    return not user._is_public() and (
        user._is_internal() or user.partner_id._starpil_can_see_prices()
    )


def _starpil_require_approved_request():
    if not _starpil_is_approved_request():
        raise UserError(_("An approved Starpil Pro account is required to view prices or place orders."))


def _starpil_force_approved_pricelist():
    """Keep every approved native cart request on its assigned Pro pricelist."""
    _starpil_require_approved_request()
    partner = request.env.user.partner_id
    pricelist = (
        partner.property_product_pricelist
        if partner._starpil_can_see_prices()
        else request.website._starpil_primary_pricelist()
    )
    if pricelist:
        request.pricelist = pricelist.sudo()
        order = request.cart
        if order and order.pricelist_id != pricelist:
            order.pricelist_id = pricelist
            order._recompute_prices()
    return pricelist


class StarpilStorefrontController(WebsiteSale):
    def _is_approved(self):
        return _starpil_is_approved_request()

    def _website_domain(self):
        return ["|", ("website_id", "=", False), ("website_id", "=", request.website.id)]

    def _published_product_domain(self):
        return [
            ("active", "=", True),
            ("sale_ok", "=", True),
            ("is_published", "=", True),
            *self._website_domain(),
        ]

    def _active_pricelist(self):
        partner = request.env.user.partner_id
        if partner._starpil_can_see_prices():
            return partner.property_product_pricelist
        return request.website._starpil_primary_pricelist() or partner.property_product_pricelist

    def _navigation_values(self):
        category_domain = [("starpil_show_in_header", "=", True), *self._website_domain()]
        return {
            "header_categories": request.env["product.public.category"].sudo().search(
                category_domain,
                order="starpil_header_sequence, sequence, name",
            ),
        }

    def _published_products(self, limit=None):
        return request.env["product.template"].sudo().search(
            self._published_product_domain(),
            order="starpil_website_featured desc, starpil_website_sequence, name",
            limit=limit,
        )

    def _product_values(self, product):
        approved = self._is_approved()
        partner = request.env.user.partner_id if approved else None
        pricelist = self._active_pricelist() if approved else None
        values = {
            "product": product,
            "approved": approved,
            "price": product._starpil_website_price(partner, pricelist=pricelist) if approved else 0.0,
            "price_currency": pricelist.currency_id if pricelist else False,
            "estimated_points": product._starpil_estimated_points(partner, 1.0, pricelist=pricelist) if approved else 0,
            "slug": _starpil_slug,
        }
        values.update(self._navigation_values())
        return values

    def _approved_partner_domain(self):
        commercial_partner = request.env.user.partner_id.commercial_partner_id
        return [("partner_id", "child_of", commercial_partner.id)]

    def _portal_status(self, record):
        if record._name == "account.move":
            if record.payment_state in ("paid", "in_payment"):
                return ("Paid", "status-complete")
            if record.state == "cancel":
                return ("Cancelled", "status-cancelled")
            return ("Payment due", "status-processing")
        if record.state == "cancel":
            return ("Cancelled", "status-cancelled")
        if record.state == "done":
            return ("Complete", "status-complete")
        if record.state in ("sale",):
            return ("Processing", "status-processing")
        return ("Quotation", "status-shipped")

    @http.route("/", type="http", auth="public", website=True, sitemap=True)
    def homepage(self, **kwargs):
        products = self._published_products(limit=8)
        category_domain = [("starpil_show_on_home", "=", True), *self._website_domain()]
        values = {
            "products": products,
            "home_categories": request.env["product.public.category"].sudo().search(
                category_domain,
                order="sequence, name",
                limit=6,
            ),
            "approved": self._is_approved(),
            "pricelist": self._active_pricelist() if self._is_approved() else False,
            "slug": _starpil_slug,
        }
        values.update(self._navigation_values())
        return request.render("starpil_website.starpil_homepage", values)

    @http.route("/about", type="http", auth="public", website=True, sitemap=True)
    def about(self, **kwargs):
        values = self._navigation_values()
        return request.render("starpil_website.starpil_about", values)

    @http.route(["/contact", "/contactus"], type="http", auth="public", website=True, sitemap=True)
    def contact(self, **kwargs):
        values = {
            "sent": kwargs.get("sent"),
            "form": kwargs,
        }
        values.update(self._navigation_values())
        return request.render("starpil_website.starpil_contact", values)

    @http.route("/starpil/contact/submit", type="http", auth="public", website=True, methods=["POST"], csrf=True)
    def contact_submit(self, **post):
        required = ("name", "email", "phone", "subject", "message")
        if any(not (post.get(field) or "").strip() for field in required):
            values = {
                "error": _("Complete every required field before sending your message."),
                "form": post,
            }
            values.update(self._navigation_values())
            return request.render("starpil_website.starpil_contact", values)

        company = request.website.company_id.sudo()
        recipient = company.email or "info@starpilwaxtt.com"
        body_html = Markup(
            "<p><strong>New Starpil website inquiry</strong></p>"
            "<p><strong>Name:</strong> {}<br/>"
            "<strong>Email:</strong> {}<br/>"
            "<strong>Phone:</strong> {}<br/>"
            "<strong>Subject:</strong> {}</p>"
            "<p>{}</p>"
        ).format(
            escape(post["name"].strip()),
            escape(post["email"].strip()),
            escape(post["phone"].strip()),
            escape(post["subject"].strip()),
            escape(post["message"].strip()).replace("\n", Markup("<br/>")),
        )
        request.env["mail.mail"].sudo().create({
            "subject": _("Starpil website inquiry: %s") % post["subject"].strip(),
            "email_from": company.email_formatted or recipient,
            "email_to": recipient,
            "reply_to": post["email"].strip(),
            "body_html": body_html,
        }).send()
        return request.redirect("/contact?sent=1")

    @http.route(["/starpil/shop", "/starpil/shop/page/<int:page>"], type="http", auth="public", website=True, sitemap=True)
    def shop(self, page=0, search=None, category=None, **kwargs):
        domain = self._published_product_domain()
        selected_category = False
        if search:
            domain += [("name", "ilike", search)]
        if category:
            try:
                category_id = int(category)
            except (TypeError, ValueError):
                category_id = 0
            selected_category = request.env["product.public.category"].sudo().browse(category_id).exists()
            if selected_category:
                domain += [("public_categ_ids", "child_of", selected_category.id)]
        products = request.env["product.template"].sudo().search(domain, order="starpil_website_sequence, name")
        categories = request.env["product.public.category"].sudo().search(self._website_domain(), order="sequence, name")
        values = {
            "products": products,
            "categories": categories,
            "selected_category": selected_category,
            "approved": self._is_approved(),
            "pricelist": self._active_pricelist() if self._is_approved() else False,
            "slug": _starpil_slug,
            "search": search or "",
        }
        values.update(self._navigation_values())
        return request.render("starpil_website.starpil_shop", values)

    @http.route("/starpil/product/<model('product.template'):product>", type="http", auth="public", website=True, sitemap=True)
    def product(self, product, **kwargs):
        if not product.sudo().is_published:
            return request.not_found()
        return request.render("starpil_website.starpil_product", self._product_values(product.sudo()))

    @http.route("/starpil/cart/add", type="http", auth="user", website=True, methods=["POST"], csrf=True)
    def add_to_cart(self, product_tmpl_id, quantity=1, **post):
        if not self._is_approved():
            return request.redirect("/pro-account")
        template = request.env["product.template"].sudo().browse(int(product_tmpl_id)).exists()
        if not template or not template.is_published:
            return request.not_found()
        product = template.product_variant_id
        pricelist = _starpil_force_approved_pricelist()
        order = request.cart or request.website._create_cart()
        if pricelist and order.pricelist_id != pricelist:
            order.pricelist_id = pricelist
            order._recompute_prices()
        order.with_context(skip_cart_verification=True)._cart_add(
            product_id=product.id,
            quantity=max(1, int(quantity)),
        )
        order._verify_cart_after_update()
        return request.redirect("/starpil/cart")

    @http.route("/starpil/cart", type="http", auth="user", website=True, sitemap=False)
    def cart(self, **kwargs):
        if not self._is_approved():
            return request.redirect("/pro-account")
        _starpil_force_approved_pricelist()
        order = request.cart
        values = {
            "order": order,
            "slug": _starpil_slug,
            "approved": True,
            "pricelist": order.pricelist_id if order else self._active_pricelist(),
        }
        values.update(self._navigation_values())
        return request.render("starpil_website.starpil_cart", values)

    @http.route("/starpil/cart/update", type="http", auth="user", website=True, methods=["POST"], csrf=True)
    def cart_update(self, line_id, quantity=1, **post):
        if not self._is_approved():
            return request.redirect("/pro-account")
        _starpil_force_approved_pricelist()
        order = request.cart
        line = order.order_line.filtered(lambda row: row.id == int(line_id)) if order else request.env["sale.order.line"]
        if line:
            order._cart_update_line_quantity(line.id, max(0, int(quantity)))
            order._verify_cart_after_update()
        return request.redirect("/starpil/cart")

    @http.route("/starpil/checkout", type="http", auth="user", website=True, sitemap=False)
    def checkout(self, **kwargs):
        if not self._is_approved():
            return request.redirect("/pro-account")
        _starpil_force_approved_pricelist()
        order = request.cart
        if not order or not order.order_line:
            return request.redirect("/starpil/cart")

        request.session["sale_last_order_id"] = order.id
        order._recompute_cart()

        delivery_ready = order.only_services or self._check_delivery_address(order.partner_shipping_id)
        billing_ready = self._check_billing_address(order.partner_invoice_id)
        address_ready = bool(delivery_ready and billing_ready)
        delivery_quotes = []
        if address_ready and order._has_deliverable_products():
            delivery_methods = order._get_delivery_methods()
            preferred = order._get_preferred_delivery_method(delivery_methods)
            if preferred and (not order.carrier_id or order.carrier_id not in delivery_methods):
                preferred_rate = preferred.rate_shipment(order)
                if preferred_rate.get("success"):
                    order._set_delivery_method(preferred, rate=preferred_rate)
            for carrier in delivery_methods:
                rate = carrier.rate_shipment(order)
                delivery_quotes.append({
                    "carrier": carrier,
                    "success": bool(rate.get("success")),
                    "price": rate.get("price", 0.0),
                    "error": rate.get("error_message") or rate.get("warning_message"),
                })

        payment_ready = bool(
            address_ready
            and (not order._has_deliverable_products() or order.carrier_id)
        )
        payment_values = {}
        if payment_ready:
            payment_values = self._get_shop_payment_values(order, **kwargs)
            payment_values["display_submit_button"] = True
            if payment_values.get("errors"):
                payment_values.pop("payment_methods_sudo", None)
                payment_values.pop("tokens_sudo", None)

        values = {
            "order": order,
            "approved": True,
            "pricelist": order.pricelist_id,
            "coupon_error": kwargs.get("coupon_error"),
            "coupon_applied": kwargs.get("coupon_applied"),
            "address_ready": address_ready,
            "delivery_ready": delivery_ready,
            "billing_ready": billing_ready,
            "delivery_quotes": delivery_quotes,
            "payment_ready": payment_ready,
            "countries": request.env["res.country"].sudo().search([], order="name"),
            "shipping_partner": order.partner_shipping_id,
            "billing_partner": order.partner_invoice_id,
            "use_delivery_as_billing": order.partner_shipping_id == order.partner_invoice_id,
        }
        values.update(payment_values)
        values.update(self._navigation_values())
        return request.render("starpil_website.starpil_checkout", values)

    @http.route("/starpil/checkout/delivery", type="http", auth="user", website=True, methods=["POST"], csrf=True)
    def checkout_delivery(self, carrier_id=None, **post):
        if not self._is_approved():
            return request.redirect("/pro-account")
        _starpil_force_approved_pricelist()
        order = request.cart
        if not order or not carrier_id:
            return request.redirect("/starpil/checkout")
        try:
            carrier_id = int(carrier_id)
        except (TypeError, ValueError):
            return request.redirect("/starpil/checkout")
        carrier = order._get_delivery_methods().filtered(lambda method: method.id == carrier_id)
        if carrier:
            rate = carrier.rate_shipment(order)
            if rate.get("success"):
                order._set_delivery_method(carrier, rate=rate)
        return request.redirect("/starpil/checkout")

    @http.route("/my/starpil", type="http", auth="user", website=True, sitemap=False)
    def customer_dashboard(self, **kwargs):
        if not self._is_approved():
            return request.redirect("/pro-account")
        partner = request.env.user.partner_id
        orders = request.env["sale.order"].search([("partner_id", "child_of", partner.commercial_partner_id.id)], order="date_order desc", limit=5)
        invoices = request.env["account.move"].search([("partner_id", "child_of", partner.commercial_partner_id.id), ("move_type", "=", "out_invoice")], order="invoice_date desc", limit=5)
        loyalty_account = False
        if "starpil.loyalty.account" in request.env.registry.models:
            loyalty_account = request.env["starpil.loyalty.account"].sudo().search(
                [("partner_id", "=", partner.id), ("active", "=", True)], limit=1
            )
        values = {
            "orders": orders,
            "invoices": invoices,
            "partner": partner,
            "loyalty_account": loyalty_account,
            "open_order_count": request.env["sale.order"].sudo().search_count([
                *self._approved_partner_domain(),
                ("state", "in", ("draft", "sent", "sale")),
            ]),
            "status_for": self._portal_status,
        }
        values.update(self._navigation_values())
        return request.render("starpil_website.starpil_customer_dashboard", values)

    @http.route("/my/starpil/orders", type="http", auth="user", website=True, sitemap=False)
    def customer_orders(self, **kwargs):
        if not self._is_approved():
            return request.redirect("/pro-account")
        orders = request.env["sale.order"].sudo().search(
            self._approved_partner_domain(), order="date_order desc", limit=100
        )
        values = {
            "orders": orders,
            "partner": request.env.user.partner_id,
            "status_for": self._portal_status,
        }
        values.update(self._navigation_values())
        return request.render("starpil_website.starpil_customer_orders", values)

    @http.route("/my/starpil/orders/<int:order_id>", type="http", auth="user", website=True, sitemap=False)
    def customer_order_detail(self, order_id, **kwargs):
        if not self._is_approved():
            return request.redirect("/pro-account")
        order = request.env["sale.order"].sudo().search(
            [("id", "=", order_id), *self._approved_partner_domain()], limit=1
        )
        if not order:
            return request.not_found()
        values = {
            "order": order,
            "partner": request.env.user.partner_id,
            "status_for": self._portal_status,
        }
        values.update(self._navigation_values())
        return request.render("starpil_website.starpil_customer_order_detail", values)

    @http.route("/my/starpil/invoices", type="http", auth="user", website=True, sitemap=False)
    def customer_invoices(self, **kwargs):
        if not self._is_approved():
            return request.redirect("/pro-account")
        invoices = request.env["account.move"].sudo().search(
            [
                *self._approved_partner_domain(),
                ("move_type", "in", ("out_invoice", "out_refund")),
                ("state", "!=", "draft"),
            ],
            order="invoice_date desc, id desc",
            limit=100,
        )
        values = {
            "invoices": invoices,
            "partner": request.env.user.partner_id,
            "status_for": self._portal_status,
        }
        values.update(self._navigation_values())
        return request.render("starpil_website.starpil_customer_invoices", values)

    @http.route("/my/starpil/profile", type="http", auth="user", website=True, sitemap=False, methods=["GET", "POST"], csrf=True)
    def customer_profile(self, **post):
        if not self._is_approved():
            return request.redirect("/pro-account")
        partner = request.env.user.partner_id
        saved = False
        if request.httprequest.method == "POST":
            partner.sudo().write({
                "name": (post.get("name") or partner.name).strip(),
                "phone": (post.get("phone") or "").strip(),
                "email": (post.get("email") or partner.email or "").strip(),
                "starpil_business_name": (post.get("business_name") or "").strip(),
            })
            saved = True
        application = partner.starpil_pro_application_id
        address_ids = partner.sudo().address_get(["delivery", "invoice"])
        values = {
            "partner": partner,
            "application": application,
            "saved": saved,
            "shipping_address": request.env["res.partner"].sudo().browse(address_ids.get("delivery")),
            "invoice_address": request.env["res.partner"].sudo().browse(address_ids.get("invoice")),
        }
        values.update(self._navigation_values())
        return request.render("starpil_website.starpil_customer_profile", values)


class StarpilNativeShopGuard(WebsiteSale):
    """Prevent native website_sale URLs from bypassing protected Pro pricing."""

    @http.route()
    def shop(self, page=0, category=None, search="", min_price=0.0, max_price=0.0, ppg=False, **post):
        return request.redirect("/starpil/shop")

    @http.route()
    def product(self, product, category="", search="", **kwargs):
        if not product.sudo().is_published:
            return request.not_found()
        return request.redirect("/starpil/product/%s" % _starpil_slug(product))

    @http.route()
    def shop_checkout(self, try_skip_step=None, **query_params):
        if not _starpil_is_approved_request():
            return request.redirect("/pro-account")
        return request.redirect("/starpil/checkout")

    @http.route()
    def shop_address(self, partner_id=None, address_type="billing", use_delivery_as_billing=None, **query_params):
        if not _starpil_is_approved_request():
            return request.redirect("/pro-account")
        return request.redirect("/starpil/checkout")

    @http.route()
    def shop_payment(self, **post):
        if not _starpil_is_approved_request():
            return request.redirect("/pro-account")
        return request.redirect("/starpil/checkout")

    def _check_cart(self, order_sudo):
        if not _starpil_is_approved_request():
            return request.redirect("/pro-account")
        return super()._check_cart(order_sudo)

    @http.route()
    def is_add_to_cart_allowed(self, product_id, **kwargs):
        if not _starpil_is_approved_request():
            return False
        return super().is_add_to_cart_allowed(product_id, **kwargs)

    @http.route()
    def shop_payment_validate(self, sale_order_id=None, **post):
        if not _starpil_is_approved_request():
            return request.redirect("/pro-account")
        return super().shop_payment_validate(sale_order_id=sale_order_id, **post)

    @http.route()
    def shop_payment_confirmation(self, **post):
        if not _starpil_is_approved_request():
            return request.redirect("/pro-account")
        sale_order_id = request.session.get("sale_last_order_id")
        if not sale_order_id:
            return request.redirect("/starpil/shop")
        order = request.env["sale.order"].sudo().browse(sale_order_id).exists()
        if not order:
            return request.redirect("/starpil/shop")
        commercial_partner = request.env.user.partner_id.commercial_partner_id
        if not request.env.user._is_internal() and order.partner_id.commercial_partner_id != commercial_partner:
            return request.not_found()
        values = self._prepare_shop_payment_confirmation_values(order)
        payment_confirmed = bool(
            not order.amount_total
            or order.transaction_ids.filtered(
                lambda transaction: transaction.state in ("done", "authorized")
            )
        )
        points_posted = bool(
            "starpil_points_posted" in order._fields and order.starpil_points_posted
        )
        values.update({
            "payment_confirmed": payment_confirmed,
            "points_posted": points_posted,
            "points_display": (
                order.starpil_points_posted_count
                if points_posted and "starpil_points_posted_count" in order._fields
                else order.starpil_points_estimate
            ),
        })
        values["header_categories"] = request.env["product.public.category"].sudo().search(
            [("starpil_show_in_header", "=", True), "|", ("website_id", "=", False), ("website_id", "=", request.website.id)],
            order="starpil_header_sequence, sequence, name",
        )
        return request.render("starpil_website.starpil_order_confirmation", values)

    @http.route()
    def print_saleorder(self, **kwargs):
        if not _starpil_is_approved_request():
            return request.redirect("/pro-account")
        return super().print_saleorder(**kwargs)


class StarpilNativeCartGuard(Cart):
    """Guard Odoo 19's separate native cart controller and its JSON routes."""

    @http.route()
    def cart(self, id=None, access_token=None, revive_method="", **post):
        if not _starpil_is_approved_request():
            return request.redirect("/pro-account")
        _starpil_force_approved_pricelist()
        return request.redirect("/starpil/cart")

    @http.route()
    def add_to_cart(
        self,
        product_template_id,
        product_id,
        quantity=1.0,
        uom_id=None,
        product_custom_attribute_values=None,
        no_variant_attribute_value_ids=None,
        linked_products=None,
        **kwargs,
    ):
        _starpil_force_approved_pricelist()
        return super().add_to_cart(
            product_template_id,
            product_id,
            quantity=quantity,
            uom_id=uom_id,
            product_custom_attribute_values=product_custom_attribute_values,
            no_variant_attribute_value_ids=no_variant_attribute_value_ids,
            linked_products=linked_products,
            **kwargs,
        )

    @http.route()
    def update_cart(self, line_id, quantity, product_id=None, **kwargs):
        _starpil_force_approved_pricelist()
        return super().update_cart(line_id, quantity, product_id=product_id, **kwargs)

    @http.route()
    def cart_quantity(self):
        if not _starpil_is_approved_request():
            return 0
        return super().cart_quantity()

    @http.route()
    def clear_cart(self):
        _starpil_require_approved_request()
        return super().clear_cart()


class StarpilNativePaymentGuard(WebsiteSalePaymentPortal):
    @http.route()
    def shop_payment_transaction(self, order_id, access_token, **kwargs):
        _starpil_require_approved_request()
        return super().shop_payment_transaction(order_id, access_token, **kwargs)


class StarpilNativeVariantGuard(WebsiteSaleVariantController):
    @http.route()
    def get_combination_info_website(
        self, product_template_id, product_id, combination, add_qty, uom_id=None, **kwargs
    ):
        _starpil_require_approved_request()
        return super().get_combination_info_website(
            product_template_id,
            product_id,
            combination,
            add_qty,
            uom_id=uom_id,
            **kwargs,
        )

    @http.route()
    def create_product_variant(self, product_template_id, product_template_attribute_value_ids, **kwargs):
        _starpil_require_approved_request()
        return super().create_product_variant(
            product_template_id,
            product_template_attribute_value_ids,
            **kwargs,
        )


class StarpilNativeProductConfiguratorGuard(WebsiteSaleProductConfiguratorController):
    @http.route()
    def website_sale_should_show_product_configurator(self, *args, **kwargs):
        _starpil_require_approved_request()
        return super().website_sale_should_show_product_configurator(*args, **kwargs)

    @http.route()
    def website_sale_product_configurator_get_values(self, *args, **kwargs):
        _starpil_require_approved_request()
        return super().website_sale_product_configurator_get_values(*args, **kwargs)

    @http.route()
    def website_sale_product_configurator_create_product(self, *args, **kwargs):
        _starpil_require_approved_request()
        return super().website_sale_product_configurator_create_product(*args, **kwargs)

    @http.route()
    def website_sale_product_configurator_update_combination(self, *args, **kwargs):
        _starpil_require_approved_request()
        return super().website_sale_product_configurator_update_combination(*args, **kwargs)

    @http.route()
    def website_sale_product_configurator_get_optional_products(self, *args, **kwargs):
        _starpil_require_approved_request()
        return super().website_sale_product_configurator_get_optional_products(*args, **kwargs)


class StarpilNativeComboConfiguratorGuard(WebsiteSaleComboConfiguratorController):
    @http.route()
    def website_sale_combo_configurator_get_data(self, *args, **kwargs):
        _starpil_require_approved_request()
        return super().website_sale_combo_configurator_get_data(*args, **kwargs)

    @http.route()
    def website_sale_combo_configurator_get_price(self, *args, **kwargs):
        _starpil_require_approved_request()
        return super().website_sale_combo_configurator_get_price(*args, **kwargs)
