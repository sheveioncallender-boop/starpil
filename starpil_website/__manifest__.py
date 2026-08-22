{
    "name": "Starpil Caribbean Website",
    "version": "19.0.2.0.0",
    "category": "Website/eCommerce",
    "summary": "Approved Starpil Caribbean storefront powered live by Odoo products",
    "license": "LGPL-3",
    "author": "Starpil Caribbean",
    "depends": ["starpil_pro_core", "website_sale", "stock", "delivery"],
    "data": [
        "security/ir.model.access.csv",
        "data/pricelist_data.xml",
        "views/product_template_views.xml",
        "views/product_public_category_views.xml",
        "views/res_config_settings_views.xml",
        "views/website_templates.xml",
        "views/portal_templates.xml",
    ],
    "assets": {
        "web.assets_frontend": [
            "starpil_website/static/src/css/starpil_frontend.css",
            "starpil_website/static/src/css/starpil_odoo_live.css",
            "starpil_website/static/src/js/starpil_frontend.js",
        ],
    },
    "installable": True,
    "application": True,
    "post_init_hook": "post_init_hook",
}
