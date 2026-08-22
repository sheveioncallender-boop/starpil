from odoo import _, http
from odoo.exceptions import UserError
from odoo.http import request
from odoo.addons.http_routing.models.ir_http import slug
from odoo.addons.website_sale.controllers.cart import Cart
from odoo.addons.website_sale.controllers.combo_configurator import WebsiteSaleComboConfiguratorController
from odoo.addons.website_sale.controllers.main import WebsiteSale
from odoo.addons.website_sale.controllers.payment import PaymentPortal as WebsiteSalePaymentPortal
from odoo.addons.website_sale.controllers.product_configurator import WebsiteSaleProductConfiguratorController
from odoo.addons.website_sale.controllers.variant import WebsiteSaleVariantController


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


class StarpilStorefrontController(http.Controller):
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
            "slug": slug,
        }
        values.update(self._navigation_values())
        return values

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
            "slug": slug,
        }
        values.update(self._navigation_values())
        return request.render("starpil_website.starpil_homepage", values)

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
            "slug": slug,
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
            "slug": slug,
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
        values = {
            "order": order,
            "approved": True,
            "pricelist": order.pricelist_id,
            "coupon_error": kwargs.get("coupon_error"),
            "coupon_applied": kwargs.get("coupon_applied"),
        }
        values.update(self._navigation_values())
        return request.render("starpil_website.starpil_checkout", values)

    @http.route("/my/starpil", type="http", auth="user", website=True, sitemap=False)
    def customer_dashboard(self, **kwargs):
        if not self._is_approved():
            return request.redirect("/pro-account")
        partner = request.env.user.partner_id
        orders = request.env["sale.order"].search([("partner_id", "child_of", partner.commercial_partner_id.id)], order="date_order desc", limit=5)
        invoices = request.env["account.move"].search([("partner_id", "child_of", partner.commercial_partner_id.id), ("move_type", "=", "out_invoice")], order="invoice_date desc", limit=5)
        values = {"orders": orders, "invoices": invoices, "partner": partner}
        values.update(self._navigation_values())
        return request.render("starpil_website.starpil_customer_dashboard", values)


class StarpilNativeShopGuard(WebsiteSale):
    """Prevent native website_sale URLs from bypassing protected Pro pricing."""

    @http.route()
    def shop(self, page=0, category=None, search="", min_price=0.0, max_price=0.0, ppg=False, **post):
        return request.redirect("/starpil/shop")

    @http.route()
    def product(self, product, category="", search="", **kwargs):
        if not product.sudo().is_published:
            return request.not_found()
        return request.redirect("/starpil/product/%s" % slug(product))

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
        return super().shop_payment_confirmation(**post)

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
        return super().cart(
            id=id,
            access_token=access_token,
            revive_method=revive_method,
            **post,
        )

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
