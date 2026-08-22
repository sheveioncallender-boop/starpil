def post_init_hook(env):
    """Make the packaged USD Pro pricelist the safe default for each website."""
    env["res.config.settings"].create({"group_product_pricelist": True}).execute()
    pricelist = env.ref("starpil_website.starpil_professional_usd_pricelist")
    websites = env["website"].search([("starpil_primary_pricelist_id", "=", False)])
    websites.write({"starpil_primary_pricelist_id": pricelist.id})
