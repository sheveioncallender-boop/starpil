const icons = {
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.8-3.8"></path></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><circle cx="12" cy="8" r="4"></circle><path d="M4.8 21c.8-4 3.2-6 7.2-6s6.4 2 7.2 6"></path></svg>',
  bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M5 8h14l-1 13H6L5 8Z"></path><path d="M9 9V6a3 3 0 0 1 6 0v3"></path></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"></path></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"></path></svg>',
  lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><rect x="5" y="10" width="14" height="11" rx="1"></rect><path d="M8 10V7a4 4 0 0 1 8 0v3"></path></svg>',
  whatsapp: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16.04 3C8.86 3 3.02 8.78 3.02 15.89c0 2.27.6 4.48 1.74 6.42L3 28.73l6.62-1.72a13.1 13.1 0 0 0 6.42 1.65h.01c7.17 0 13.01-5.78 13.01-12.89A12.8 12.8 0 0 0 16.04 3Zm7.65 18.21c-.32.88-1.88 1.68-2.6 1.79-.66.1-1.5.15-2.42-.15-.56-.18-1.28-.41-2.2-.8-3.88-1.66-6.41-5.52-6.6-5.77-.2-.26-1.58-2.08-1.58-3.97 0-1.89 1-2.82 1.35-3.21.35-.39.77-.49 1.03-.49.25 0 .51 0 .73.01.24.01.55-.09.87.66.32.76 1.09 2.65 1.19 2.85.1.19.16.42.03.68-.13.26-.2.42-.39.65-.19.23-.41.51-.58.68-.19.19-.39.4-.17.79.22.39.98 1.6 2.11 2.59 1.45 1.28 2.67 1.68 3.06 1.87.39.19.61.16.84-.1.22-.26.96-1.11 1.22-1.5.25-.39.51-.32.87-.19.35.13 2.22 1.04 2.6 1.23.38.2.64.29.73.45.1.16.1.94-.22 1.82Z"></path></svg>'
};

const products = [
  {
    id: 'black-film-600g', name: 'Black Film Wax Pearls (600g)', category: 'film-wax', categoryLabel: 'Stripless Film Wax', image: 'assets/images/black-film-wax.jpg', badge: 'Featured', sku: 'FW2019008', size: '600g', bestFor: 'Short, stubborn and coarse hair',
    description: 'A hybrid crystalline and creamy hard-wax formula engineered to hug tiny hairs and remove thick, coarse hair from the root.',
    features: ['Premium polymer blend', 'Quick dry time', 'Easy to measure and fast melting', 'Contains charcoal with purifying properties']
  },
  {
    id: 'esthie-bestie-warmer', name: 'Esthie Bestie 5lb Hard Wax Warmer', category: 'warmers', categoryLabel: 'Professional Warmers', image: 'assets/images/esthie-warmer.png', badge: 'Pro favourite', sku: 'WW2019003', size: '5lb capacity', bestFor: 'Busy treatment rooms and back-to-back services',
    description: 'A high-capacity professional wax warmer designed to keep up to five pounds of wax ready for a full day of services.',
    features: ['360° even heat distribution', 'Professional aluminium construction', 'Built for high-volume service', 'Rapid and thorough warming']
  },
  {
    id: 'gold-rollon-10', name: 'Gold Roll-On Cartridges — 10 Pack', category: 'roll-on', categoryLabel: 'Roll-On Wax', image: 'assets/images/gold-rollon.png', badge: 'Fast service', sku: 'CA2019005-1', size: '10 cartridges', bestFor: 'Legs, arms and high-efficiency services',
    description: 'A clean, controlled roll-on system that helps professionals spread wax quickly and consistently across larger service areas.',
    features: ['Fast, even application', 'Single-client cartridge system', 'Ideal for large areas', 'Professional roll-on format']
  },
  {
    id: 'natural-soft-800', name: 'Natural Can Wax (Soft Wax) 800ml', category: 'soft-wax', categoryLabel: 'Soft Strip Wax', image: 'assets/images/natural-soft-wax.jpg', badge: 'Best seller', sku: 'SW2019004-1', size: '800ml', bestFor: 'All-over use and low-temperature application',
    description: 'A lightweight, pliable soft wax that stays active for dependable adhesion and long-lasting, smooth results.',
    features: ['Low-temperature application', 'Lightweight crystalline consistency', 'Suitable for full-body waxing', 'Easy clean-up']
  },
  {
    id: 'blue-soft-500', name: 'Blue Can Wax (Soft Wax) 500ml', category: 'soft-wax', categoryLabel: 'Soft Strip Wax', image: 'assets/images/blue-soft-wax.jpg', badge: 'Everyday pro', sku: 'SW2019001', size: '500ml', bestFor: 'Normal skin and full-body services',
    description: 'A versatile blue soft-wax formula made for efficient professional services and consistent hair removal.',
    features: ['Professional soft-wax formula', 'Smooth, even spreading', 'Reliable everyday performance', 'Suitable for a wide range of services']
  },
  {
    id: 'starsoft-can-500', name: 'Starsoft Hypoallergenic Can Wax (500ml)', category: 'starsoft', categoryLabel: 'Starsoft Luxury Collection', image: 'assets/images/starsoft-can.jpg', badge: 'Sensitive skin', sku: 'SS2019001', size: '500ml', bestFor: 'Extra-sensitive skin and full-body waxing',
    description: 'A gentle hypoallergenic formula with Tamanu oil and neurosensory active ingredients developed for sensitive clients.',
    features: ['Rosin, paraben and fragrance free', 'Helps soothe and moisturize', 'Made for extra-sensitive skin', 'Removes short hair at the root']
  },
  {
    id: 'starsoft-film-1kg', name: 'Starsoft Luxury Film Wax Pearls (1kg)', category: 'starsoft', categoryLabel: 'Starsoft Luxury Collection', image: 'assets/images/starsoft-film.jpg', badge: 'Luxury blend', sku: 'FW2019007-2', size: '1kg', bestFor: 'Sensitive areas and gentle full-body services',
    description: 'A flexible luxury film wax designed for gentle, effective removal on sensitive skin and challenging treatment areas.',
    features: ['Premium flexible polymer blend', 'Gentle removal', 'Fast melting microbeads', 'Suitable for sensitive treatment areas']
  },
  {
    id: 'post-epil-oil-200', name: 'Starsoft Post-Epil Oil (200ml)', category: 'treatments', categoryLabel: 'Treatment Products', image: 'assets/images/post-epil-oil.png', badge: 'Aftercare', sku: 'TR2019011', size: '200ml', bestFor: 'Post-wax comfort and finishing care',
    description: 'A professional post-wax treatment oil that helps remove residue and leave freshly waxed skin feeling conditioned.',
    features: ['Professional finishing care', 'Helps remove wax residue', 'Conditions freshly waxed skin', 'Complements the Starsoft system']
  },
  {
    id: 'brazilian-mask', name: 'Brazilian Mask', category: 'treatments', categoryLabel: 'Treatment Products', image: 'assets/images/brazilian-mask.jpg', badge: 'Post-wax care', sku: 'TR2019020', size: 'Professional treatment', bestFor: 'Bikini and intimate-area aftercare',
    description: 'A restoring tissue mask with chamomile, aloe vera, lavender water, witch hazel and hyaluronic acid for freshly waxed skin.',
    features: ['Cooling post-wax comfort', 'Hydrating ingredients', 'Designed for intimate aftercare', 'Helps soothe temporary redness']
  },
  {
    id: 'coral-tablets', name: 'Coral Film Hard Wax Tablets (2.2lb)', category: 'film-wax', categoryLabel: 'Stripless Film Wax', image: 'assets/images/coral-tablets.jpg', badge: 'Coral collection', sku: 'FW2021035', size: '2.2lb', bestFor: 'Premium full-body services',
    description: 'A signature coral hard-wax formula in easy-to-portion tablets, created for professional melting and effective removal.',
    features: ['Easy-to-portion tablets', 'Professional polymer formula', 'Efficient melting', 'Signature Coral collection']
  },
  {
    id: 'calendula-mousse-200', name: 'Calendula Post-Epil Mousse (200ml)', category: 'calendula', categoryLabel: 'Calendula Collection', image: 'assets/images/calendula-mousse.jpg', badge: 'Calm & restore', sku: 'CA2019004', size: '200ml', bestFor: 'Post-wax hydration and all-over body care',
    description: 'A feather-light post-wax mousse with calendula and tea tree extracts that helps replenish, refresh and soothe the skin.',
    features: ['Lightweight mousse texture', 'Hydrates and refreshes', 'Suitable for all-over body use', 'Designed for professional post-wax care']
  },
  {
    id: 'blue-rollon-10', name: 'Blue Roll-On Cartridges — 10 Pack', category: 'roll-on', categoryLabel: 'Roll-On Wax', image: 'assets/images/blue-rollon.jpg', badge: 'Efficient', sku: 'R02019005', size: '10 × 110g', bestFor: 'Normal skin, legs and underarms',
    description: 'A crystalline roll-on formula designed for consistent coverage, efficient services and minimal product mess.',
    features: ['Cordless roll-on compatibility', 'Single-client cartridges', 'Covers large areas efficiently', 'Designed for normal skin types']
  }
];

const approvedCartSeed = [
  { id: 'black-film-600g', quantity: 1, unitPrice: 58.68 },
  { id: 'coral-tablets', quantity: 1, unitPrice: 71.32 }
];
let approvedCart = approvedCartSeed.map((item) => ({ ...item }));
const usdMoney = (value) => `US$${Number(value).toFixed(2)}`;
const approvedPrices = {
  'black-film-600g': 58.68,
  'esthie-bestie-warmer': 242.65,
  'gold-rollon-10': 105.88,
  'natural-soft-800': 50.00,
  'blue-soft-500': 45.59,
  'starsoft-can-500': 61.76,
  'starsoft-film-1kg': 95.59,
  'post-epil-oil-200': 44.56,
  'brazilian-mask': 18.38,
  'coral-tablets': 71.32,
  'calendula-mousse-200': 40.44,
  'blue-rollon-10': 100.00
};

const productCard = (product) => `
  <article class="product-card" data-category="${product.category}">
    <div class="product-image">
      ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
      <a class="product-image-link" href="product.html?id=${product.id}" aria-label="View ${product.name}"><img src="${product.image}" alt="${product.name}" loading="lazy"></a>
      <button class="product-quick" type="button" data-open-login>Login to purchase</button>
    </div>
    <div class="product-meta">${product.categoryLabel}</div>
    <h3><a href="product.html?id=${product.id}">${product.name}</a></h3>
    <button class="locked-price" type="button" data-open-login>${icons.lock} Login to see price</button>
  </article>`;

const approvedProductCard = (product) => `
  <article class="product-card approved-product-card" data-category="${product.category}">
    <div class="product-image">
      ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
      <a class="product-image-link" href="product-unlocked.html?id=${product.id}" aria-label="View ${product.name}"><img src="${product.image}" alt="${product.name}" loading="lazy"></a>
      <a class="product-quick" href="product-unlocked.html?id=${product.id}">View & purchase</a>
    </div>
    <div class="product-meta">${product.categoryLabel}</div>
    <h3><a href="product-unlocked.html?id=${product.id}">${product.name}</a></h3>
    <div class="approved-card-price"><strong>${usdMoney(approvedPrices[product.id] || 58.68)}</strong><span>In stock</span></div>
  </article>`;

function headerMarkup() {
  const approved = document.body.classList.contains('approved-preview');
  return `
    ${approved
      ? '<div class="announcement announcement-approved"><div class="announcement-inner"><p>Approved Pro Account · USD professional pricing active</p><p class="announcement-location">Trinidad & Tobago · Caribbean shipping available</p></div></div>'
      : '<div class="announcement"><div class="announcement-inner"><p>Professional-only pricing · <a href="pro-account.html">Apply with your certification</a></p><p class="announcement-location">Trinidad & Tobago · Caribbean shipping available</p></div></div>'}
    <header class="site-header" id="site-header">
      <div class="header-inner">
        <button class="icon-button mobile-toggle" type="button" aria-label="Open navigation">${icons.menu}</button>
        <a class="brand" href="index.html" aria-label="Starpil Caribbean home"><img src="assets/images/starpil-wordmark.png" alt="Starpil Living Waxing"></a>
        <nav class="main-nav" aria-label="Main navigation">
          <div class="nav-item">
            <a class="nav-link" href="shop.html">Shop <span class="nav-chevron">⌄</span></a>
            <div class="mega-menu"><div class="mega-inner">
              <div class="mega-col"><span>Wax collections</span><a href="shop.html?category=film-wax">Stripless Film Wax</a><a href="shop.html?category=starsoft">Starsoft Luxury</a><a href="shop.html?category=calendula">Calendula Collection</a><a href="shop.html?category=soft-wax">Soft Strip Wax</a><a href="shop.html?category=roll-on">Roll-On Cartridges</a></div>
              <div class="mega-col"><span>Equipment & care</span><a href="shop.html?category=warmers">Professional Warmers</a><a href="shop.html?category=treatments">Treatment Products</a><a href="shop.html?category=tools">Tools & Accessories</a><a href="shop.html">View All Products</a></div>
              <div class="mega-col"><span>Shop by need</span><a href="shop.html?need=sensitive">Sensitive Skin</a><a href="shop.html?need=full-body">Full-Body Services</a><a href="shop.html?need=speed">Speed Waxing</a><a href="pro-account.html">New Professionals</a></div>
              <a class="mega-feature" href="shop.html?category=film-wax"><img src="assets/images/coral-collection.webp" alt="Coral wax collection"><div><small>THE SIGNATURE COLLECTION</small><strong>Meet Coral Film Wax →</strong></div></a>
            </div></div>
          </div>
          <a class="nav-link" href="shop.html?category=film-wax">Film Wax</a>
          <a class="nav-link" href="shop.html?category=soft-wax">Soft Wax</a>
          <a class="nav-link" href="shop.html?category=roll-on">Roll-On</a>
          <a class="nav-link" href="shop.html?category=warmers">Warmers</a>
          <a class="nav-link" href="about.html">About</a>
        </nav>
        <div class="header-actions">
          <button class="icon-button search-trigger" type="button" aria-label="Search">${icons.search}</button>
          ${approved
            ? `<a class="icon-button approved-account-trigger" href="customer-dashboard.html" aria-label="My professional account">${icons.user}</a><a class="icon-button bag-trigger" href="cart-approved.html" aria-label="Shopping bag">${icons.bag}<span class="bag-count" data-approved-bag-count>2</span></a><a class="header-pro" href="customer-dashboard.html">My Account</a>`
            : `<button class="icon-button" type="button" data-open-login aria-label="Professional account">${icons.user}</button><button class="icon-button bag-trigger" type="button" data-open-login aria-label="Shopping bag">${icons.bag}<span class="bag-count">0</span></button><a class="header-pro" href="pro-account.html">Get Pro Access</a>`}
        </div>
      </div>
    </header><div class="header-spacer"></div>
    <aside class="mobile-panel" aria-hidden="true">
      <div class="mobile-panel-top"><a href="index.html"><img src="assets/images/starpil-wordmark.png" alt="Starpil"></a><button class="icon-button mobile-close" type="button" aria-label="Close navigation">${icons.close}</button></div>
      <div class="mobile-panel-body">
        <a class="mobile-main-link" href="shop.html">Shop all <span>→</span></a>
        <div class="mobile-categories"><a href="shop.html?category=film-wax">Stripless Film Wax</a><a href="shop.html?category=starsoft">Starsoft Luxury</a><a href="shop.html?category=calendula">Calendula Collection</a><a href="shop.html?category=soft-wax">Soft Strip Wax</a><a href="shop.html?category=roll-on">Roll-On Cartridges</a><a href="shop.html?category=warmers">Professional Warmers</a><a href="shop.html?category=treatments">Treatment Products</a></div>
        <a class="mobile-main-link" href="pro-account.html">Pro Account <span>→</span></a><a class="mobile-main-link" href="about.html">About Starpil <span>→</span></a><a class="mobile-main-link" href="contact.html">Contact <span>→</span></a>
        ${approved
          ? '<div class="mobile-actions"><a class="button button-dark" href="customer-dashboard.html">My Dashboard</a><a class="button button-outline" href="product-unlocked.html">Continue shopping</a></div>'
          : '<div class="mobile-actions"><button class="button button-dark" type="button" data-open-login>Sign in to Pro Portal</button><a class="button button-outline" href="pro-account.html">Apply for Pro Access</a></div>'}
      </div>
    </aside>
    <div class="search-overlay" role="dialog" aria-modal="true" aria-label="Search products"><button class="overlay-close search-close" type="button" aria-label="Close search">${icons.close}</button><div class="search-inner"><span>Search the professional catalogue</span><form class="search-field" data-search-form><label class="sr-only" for="global-search">Search products</label><input id="global-search" type="search" placeholder="What are you looking for?" autocomplete="off"><button type="submit" aria-label="Search">${icons.search}</button></form><div class="search-suggestions"><a class="suggestion" href="product.html?id=black-film-600g"><img src="assets/images/black-film-wax.jpg" alt=""><div><small>Popular search</small><strong>Black Film Wax</strong></div></a><a class="suggestion" href="product.html?id=starsoft-film-1kg"><img src="assets/images/starsoft-film.jpg" alt=""><div><small>Sensitive skin</small><strong>Starsoft Luxury</strong></div></a><a class="suggestion" href="product.html?id=esthie-bestie-warmer"><img src="assets/images/esthie-warmer.png" alt=""><div><small>Equipment</small><strong>5lb Wax Warmer</strong></div></a></div></div></div>
    <div class="modal" id="login-modal" role="dialog" aria-modal="true" aria-labelledby="login-title"><div class="modal-dialog"><div class="modal-brand"><img src="assets/images/starpil-wordmark.png" alt="Starpil"><h2>Professional access.<br>Protected pricing.</h2><p>Only approved, certified professionals can view pricing and purchase Starpil products.</p></div><div class="modal-content"><button class="overlay-close modal-close" type="button" aria-label="Close">${icons.close}</button><span>Starpil Pro Portal</span><h2 id="login-title">Welcome back, Esthie.</h2><p>Sign in with your approved professional account to unlock pricing and ordering.</p><div class="lock-message">${icons.lock}<span>Prices remain hidden until your professional certification has been reviewed and your account is approved.</span></div><form data-login-form><div class="field"><label for="login-email">Email address</label><input id="login-email" type="email" autocomplete="email" required></div><div class="field"><label for="login-password">Password</label><input id="login-password" type="password" autocomplete="current-password" required></div><button class="button button-dark" type="submit">Sign in to Pro Portal</button></form><p class="modal-switch">Not approved yet? <a href="pro-account.html">Apply for a professional account</a></p></div></div></div>
    <div class="toast" role="status" aria-live="polite"></div>
  `;
}

function footerMarkup() {
  const approved = document.body.classList.contains('approved-preview');
  return `
    <footer class="site-footer"><div class="footer-main"><div class="footer-brand"><img src="assets/images/starpil-logo.png" alt="Starpil Living Waxing"><p>Premium professional waxing products, equipment and treatment essentials for certified beauty professionals across Trinidad & Tobago and the Caribbean.</p><div class="footer-contact"><a href="tel:+18683022382">+1 (868) 302-2382</a><br><a href="mailto:info@starpilwaxtt.com">info@starpilwaxtt.com</a></div></div><div class="footer-col"><h3>Shop</h3><a href="shop.html?category=film-wax">Stripless Film Wax</a><a href="shop.html?category=starsoft">Starsoft Luxury</a><a href="shop.html?category=calendula">Calendula Collection</a><a href="shop.html?category=soft-wax">Soft Strip Wax</a><a href="shop.html?category=roll-on">Roll-On Cartridges</a><a href="shop.html?category=warmers">Professional Warmers</a><a href="shop.html?category=treatments">Treatment Products</a></div><div class="footer-col"><h3>Professional account</h3>${approved ? '<a href="customer-dashboard.html">My Dashboard</a><a href="customer-orders.html">My Orders</a><a href="customer-invoices.html">Invoices & Receipts</a><a href="customer-loyalty.html">Pro Rewards</a><a href="customer-profile.html">Business Profile</a>' : '<a href="pro-account.html">Apply for Pro Access</a><a href="#" data-open-login>Sign In</a><a href="#" data-open-login>My Account</a><a href="shop.html">Professional Catalogue</a><a href="contact.html">Account Support</a>'}</div><div class="footer-col"><h3>Customer care</h3><a href="about.html">About Starpil Caribbean</a><a href="contact.html">Contact Us</a><a href="contact.html#faq">Frequently Asked Questions</a><a href="contact.html#shipping">Shipping & Delivery</a><a href="contact.html#returns">Exchange & Return Policy</a><a href="https://www.instagram.com/starpilwaxtt/" target="_blank" rel="noopener">Instagram ↗</a></div></div><div class="footer-bottom"><span>© 2026 Starpil Caribbean. All rights reserved.</span><div><a href="#">Privacy Policy</a><a href="#">Terms & Conditions</a><span>Trinidad & Tobago</span></div></div></footer>
    <a class="whatsapp" href="https://wa.me/18683022382" target="_blank" rel="noopener" aria-label="Chat with Starpil Caribbean on WhatsApp">${icons.whatsapp}</a>
  `;
}

function injectChrome() {
  document.querySelectorAll('[data-site-header]').forEach((node) => node.innerHTML = headerMarkup());
  document.querySelectorAll('[data-site-footer]').forEach((node) => node.innerHTML = footerMarkup());
  if (document.body.classList.contains('approved-preview')) {
    document.querySelectorAll('[data-site-header] a[href^="shop.html"], [data-site-footer] a[href^="shop.html"]').forEach((link) => { link.href = link.getAttribute('href').replace('shop.html', 'shop-approved.html'); });
    document.querySelectorAll('[data-site-header] a[href^="product.html"], [data-site-footer] a[href^="product.html"]').forEach((link) => { link.href = link.getAttribute('href').replace('product.html', 'product-unlocked.html'); });
  }
}

function renderHomeProducts(filter = 'all') {
  const grid = document.getElementById('home-products');
  if (!grid) return;
  const selected = filter === 'all' ? products.slice(0, 8) : products.filter((p) => p.category === filter).slice(0, 8);
  grid.innerHTML = selected.map(productCard).join('');
  bindLockedActions(grid);
}

function renderShop() {
  const grid = document.getElementById('shop-products');
  if (!grid) return;
  const params = new URLSearchParams(window.location.search);
  let activeCategory = params.get('category') || 'all';
  let query = params.get('q') || '';
  const searchInput = document.getElementById('shop-search-input');
  if (searchInput) searchInput.value = query;

  const filterButtons = [...document.querySelectorAll('[data-shop-filter]')];
  const draw = () => {
    const normalized = query.trim().toLowerCase();
    const list = products.filter((product) => (activeCategory === 'all' || product.category === activeCategory) && (!normalized || `${product.name} ${product.categoryLabel} ${product.description}`.toLowerCase().includes(normalized)));
    grid.innerHTML = list.length ? list.map(productCard).join('') : '<div class="empty-state"><h3>No products found.</h3><p>Try another collection or search term.</p></div>';
    const count = document.getElementById('shop-count');
    if (count) count.textContent = `${list.length} professional product${list.length === 1 ? '' : 's'}`;
    filterButtons.forEach((button) => button.classList.toggle('is-active', button.dataset.shopFilter === activeCategory));
    bindLockedActions(grid);
  };
  filterButtons.forEach((button) => button.addEventListener('click', () => { activeCategory = button.dataset.shopFilter; draw(); }));
  document.querySelector('[data-shop-search-form]')?.addEventListener('submit', (event) => { event.preventDefault(); query = searchInput.value; draw(); });
  searchInput?.addEventListener('input', () => { query = searchInput.value; draw(); });
  draw();
}

function renderApprovedShop() {
  const grid = document.getElementById('approved-shop-products');
  if (!grid) return;
  const params = new URLSearchParams(window.location.search);
  let activeCategory = params.get('category') || 'all';
  let query = params.get('q') || '';
  const searchInput = document.getElementById('approved-shop-search-input');
  if (searchInput) searchInput.value = query;
  const filterButtons = [...document.querySelectorAll('[data-approved-shop-filter]')];
  const draw = () => {
    const normalized = query.trim().toLowerCase();
    const list = products.filter((product) => (activeCategory === 'all' || product.category === activeCategory) && (!normalized || `${product.name} ${product.categoryLabel} ${product.description}`.toLowerCase().includes(normalized)));
    grid.innerHTML = list.length ? list.map(approvedProductCard).join('') : '<div class="empty-state"><h3>No products found.</h3><p>Try another collection or search term.</p></div>';
    const count = document.getElementById('approved-shop-count');
    if (count) count.textContent = `${list.length} professional product${list.length === 1 ? '' : 's'} · Approved account pricing`;
    filterButtons.forEach((button) => button.classList.toggle('is-active', button.dataset.approvedShopFilter === activeCategory));
  };
  filterButtons.forEach((button) => button.addEventListener('click', () => { activeCategory = button.dataset.approvedShopFilter; draw(); }));
  document.querySelector('[data-approved-shop-search-form]')?.addEventListener('submit', (event) => { event.preventDefault(); query = searchInput.value; draw(); });
  searchInput?.addEventListener('input', () => { query = searchInput.value; draw(); });
  draw();
}

function renderProductDetail() {
  const target = document.getElementById('product-detail-content');
  if (!target) return;
  const params = new URLSearchParams(window.location.search);
  const product = products.find((item) => item.id === params.get('id')) || products[0];
  document.title = `${product.name} | Starpil Caribbean`;
  target.innerHTML = `
    <div class="product-layout"><div class="product-gallery"><div class="product-main-image"><img src="${product.image}" alt="${product.name}"></div></div><div class="product-info"><div class="breadcrumbs"><a href="index.html">Home</a> / <a href="shop.html">Shop</a> / ${product.categoryLabel}</div><div class="product-meta">${product.categoryLabel}</div><h1>${product.name}</h1><div class="product-status"><button class="locked-price" type="button" data-open-login>${icons.lock} Login to see price</button><span>Professional account required</span></div><p>${product.description}</p><div class="product-purchase"><strong>Professional pricing is protected.</strong><p>Sign in with an approved account to view your price, stock availability and ordering options.</p><button class="button button-dark" type="button" data-open-login>Login to purchase</button></div><h3>Professional benefits</h3><ul class="product-features">${product.features.map((feature) => `<li>${feature}</li>`).join('')}</ul><div class="product-spec"><div><span>SKU</span><strong>${product.sku}</strong></div><div><span>Size</span><strong>${product.size}</strong></div><div><span>Best for</span><strong>${product.bestFor}</strong></div><div><span>Collection</span><strong>${product.categoryLabel}</strong></div></div></div></div>`;
  bindLockedActions(target);
  const related = document.getElementById('related-products');
  if (related) {
    related.innerHTML = products.filter((item) => item.id !== product.id && (item.category === product.category || item.categoryLabel === product.categoryLabel)).slice(0, 4).concat(products.filter((item) => item.id !== product.id && item.category !== product.category).slice(0, 4)).slice(0, 4).map(productCard).join('');
    bindLockedActions(related);
  }
}

function renderUnlockedProductDetail() {
  const target = document.getElementById('unlocked-product-detail-content');
  if (!target) return;
  const params = new URLSearchParams(window.location.search);
  const product = products.find((item) => item.id === params.get('id')) || products[0];
  const unitPrice = approvedPrices[product.id] || 58.68;
  const unitPoints = Math.floor((unitPrice / 1.5) * 1.25);
  document.title = `${product.name} — Approved Account Preview | Starpil Caribbean`;
  target.innerHTML = `
    <div class="product-layout"><div class="product-gallery"><div class="product-main-image"><img src="${product.image}" alt="${product.name}"></div></div><div class="product-info"><div class="breadcrumbs"><a href="index.html">Home</a> / <a href="shop-approved.html">Pro Catalogue</a> / ${product.categoryLabel}</div><div class="product-meta">${product.categoryLabel}</div><h1>${product.name}</h1><div class="product-status product-status-unlocked"><div class="visible-price"><small>Professional price · USD</small><strong>${usdMoney(unitPrice)}</strong></div><span class="stock-status">In stock</span></div><div class="product-points-preview"><span>★</span><p><strong>Earn approximately <b data-product-points>${unitPoints}</b> points</strong><small>Pro tier rate · Quantity <span data-product-points-qty>1</span> · Posted after payment</small></p></div><p>${product.description}</p><div class="product-purchase product-purchase-unlocked"><div class="purchase-summary"><strong>Ready for your treatment room.</strong><p>Price, stock and purchase controls appear after an approved professional signs in.</p></div><div class="purchase-controls"><div class="quantity-control" aria-label="Quantity selector"><button type="button" data-quantity-change="-1" aria-label="Decrease quantity">−</button><input type="number" min="1" max="99" value="1" aria-label="Quantity" data-product-quantity><button type="button" data-quantity-change="1" aria-label="Increase quantity">+</button></div><button class="button button-dark" type="button" data-demo-add-cart>Add to cart</button></div><small class="preview-price-note">Example USD price and points for design review only.</small></div><h3>Professional benefits</h3><ul class="product-features">${product.features.map((feature) => `<li>${feature}</li>`).join('')}</ul><div class="product-spec"><div><span>SKU</span><strong>${product.sku}</strong></div><div><span>Size</span><strong>${product.size}</strong></div><div><span>Best for</span><strong>${product.bestFor}</strong></div><div><span>Collection</span><strong>${product.categoryLabel}</strong></div></div></div></div>`;

  const quantity = target.querySelector('[data-product-quantity]');
  const updateProductPoints = () => {
    const currentQuantity = Math.min(99, Math.max(1, Number(quantity.value || 1)));
    target.querySelector('[data-product-points]').textContent = unitPoints * currentQuantity;
    target.querySelector('[data-product-points-qty]').textContent = currentQuantity;
  };
  target.querySelectorAll('[data-quantity-change]').forEach((button) => button.addEventListener('click', () => {
    const next = Math.min(99, Math.max(1, Number(quantity.value || 1) + Number(button.dataset.quantityChange)));
    quantity.value = next;
    updateProductPoints();
  }));
  quantity.addEventListener('input', updateProductPoints);
  target.querySelector('[data-demo-add-cart]')?.addEventListener('click', () => {
    showToast(`${quantity.value} × ${product.name} added to your Pro cart.`);
    window.setTimeout(() => { window.location.href = 'cart-approved.html'; }, 650);
  });

  const related = document.getElementById('related-products');
  if (related) {
    related.innerHTML = products.filter((item) => item.id !== product.id).slice(0, 4).map(approvedProductCard).join('');
  }
}

function cartItemDetails(item) {
  const product = products.find((entry) => entry.id === item.id);
  return { ...item, product, lineTotal: item.quantity * item.unitPrice };
}

function updateApprovedBagCount() {
  const count = approvedCart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll('[data-approved-bag-count]').forEach((node) => { node.textContent = count; });
}

function renderApprovedCart() {
  const target = document.getElementById('approved-cart-content');
  if (!target) return;
  const details = approvedCart.map(cartItemDetails);
  const subtotal = details.reduce((sum, item) => sum + item.lineTotal, 0);
  const delivery = details.length ? 7 : 0;
  const estimatedPoints = Math.floor((subtotal / 1.5) * 1.25);

  if (!details.length) {
    target.innerHTML = `<div class="empty-cart"><span class="kicker">Your cart is ready</span><h2>Nothing here yet.</h2><p>Explore the approved Pro catalogue and add an item to begin a professional order.</p><a class="button button-dark" href="shop-approved.html">Shop professional products</a></div>`;
    updateApprovedBagCount();
    return;
  }

  target.innerHTML = `
    <div class="cart-layout">
      <div class="cart-items-panel">
        <div class="cart-table-heading"><span>Product</span><span>Quantity</span><span>Total</span></div>
        ${details.map(({ product, quantity, unitPrice, lineTotal }) => `
          <article class="cart-line-item">
            <a class="cart-line-image" href="product-unlocked.html?id=${product.id}"><img src="${product.image}" alt="${product.name}"></a>
            <div class="cart-line-copy"><span>${product.categoryLabel}</span><h2><a href="product-unlocked.html?id=${product.id}">${product.name}</a></h2><small>${product.size} · ${product.sku}</small><strong>${usdMoney(unitPrice)}</strong><button type="button" data-cart-remove="${product.id}">Remove</button></div>
            <div class="quantity-control cart-quantity" aria-label="Quantity for ${product.name}"><button type="button" data-cart-change="-1" data-cart-product="${product.id}" aria-label="Decrease quantity">−</button><input value="${quantity}" aria-label="Quantity" readonly><button type="button" data-cart-change="1" data-cart-product="${product.id}" aria-label="Increase quantity">+</button></div>
            <strong class="cart-line-total">${usdMoney(lineTotal)}</strong>
          </article>`).join('')}
        <div class="cart-footer-actions"><a class="text-link" href="shop-approved.html">← Continue shopping</a><span>Professional prices are active for this account.</span></div>
      </div>
      <aside class="cart-summary-card">
        <span class="kicker">Order summary</span><h2>Pro Cart</h2>
        <div class="summary-row"><span>Subtotal</span><strong>${usdMoney(subtotal)}</strong></div>
        <div class="summary-row"><span>Estimated local delivery</span><strong>${usdMoney(delivery)}</strong></div>
        <div class="summary-row summary-total"><span>Estimated total · USD</span><strong>${usdMoney(subtotal + delivery)}</strong></div>
        <div class="cart-points-preview"><span>★</span><p><strong>Earn approximately ${estimatedPoints} points</strong><small>Pro tier rate · Posted after payment</small></p><a href="customer-loyalty.html">Rewards →</a></div>
        <p>Final delivery and applicable taxes are confirmed at checkout.</p>
        <a class="button button-dark" href="checkout-approved.html">Proceed to secure checkout</a>
        <div class="checkout-confidence"><span>✓ Secure WiPay checkout</span><span>✓ Approved professional pricing</span><span>✓ Local account support</span></div>
      </aside>
    </div>`;

  target.querySelectorAll('[data-cart-change]').forEach((button) => button.addEventListener('click', () => {
    const item = approvedCart.find((entry) => entry.id === button.dataset.cartProduct);
    if (!item) return;
    item.quantity = Math.max(1, Math.min(99, item.quantity + Number(button.dataset.cartChange)));
    renderApprovedCart();
  }));
  target.querySelectorAll('[data-cart-remove]').forEach((button) => button.addEventListener('click', () => {
    approvedCart = approvedCart.filter((entry) => entry.id !== button.dataset.cartRemove);
    renderApprovedCart();
  }));
  updateApprovedBagCount();
}

function renderApprovedCheckoutSummary(deliveryMethod = 'courier') {
  const target = document.getElementById('approved-checkout-summary');
  if (!target) return;
  const details = approvedCartSeed.map(cartItemDetails);
  const subtotal = details.reduce((sum, item) => sum + item.lineTotal, 0);
  const delivery = deliveryMethod === 'pickup' ? 0 : 7;
  const estimatedPoints = Math.floor((subtotal / 1.5) * 1.25);
  target.innerHTML = `
    <div class="checkout-summary-inner"><span class="kicker">Your order</span><h2>Order summary</h2>
      <div class="checkout-summary-items">${details.map(({ product, quantity, lineTotal }) => `<div class="checkout-summary-item"><div><img src="${product.image}" alt=""><span>${quantity}</span></div><p><strong>${product.name}</strong><small>${product.size}</small></p><em>${usdMoney(lineTotal)}</em></div>`).join('')}</div>
      <div class="checkout-rewards"><div><span>Starpil Pro Rewards</span><strong>1,240 points available</strong></div><a href="customer-loyalty.html">Choose a reward →</a></div>
      <div class="checkout-points-preview"><span>★</span><p><strong>This order will earn approximately ${estimatedPoints} points</strong><small>Pro tier rate · Points post after successful payment</small></p></div>
      <div class="checkout-promo"><input placeholder="Reward or promotion code" aria-label="Reward or promotion code"><button type="button" data-apply-demo-code>Apply</button></div>
      <div class="summary-row"><span>Subtotal</span><strong>${usdMoney(subtotal)}</strong></div>
      <div class="summary-row"><span>${deliveryMethod === 'pickup' ? 'Pickup' : 'Local delivery'}</span><strong>${delivery ? usdMoney(delivery) : 'Free'}</strong></div>
      <div class="summary-row summary-total"><span>Total · USD</span><strong>${usdMoney(subtotal + delivery)}</strong></div>
      <p class="summary-note">Example pricing for design review only. Final account pricing comes from the approved commerce system.</p>
      <a class="text-link" href="cart-approved.html">← Return to cart</a>
    </div>`;
  target.querySelector('[data-apply-demo-code]')?.addEventListener('click', () => showToast('In production, Odoo will validate this customer-bound reward or promotion code.'));
}

function bindApprovedCheckout() {
  const form = document.querySelector('[data-approved-checkout-form]');
  if (!form) return;
  const syncOptions = (name) => {
    form.querySelectorAll(`input[name="${name}"]`).forEach((input) => input.closest('.checkout-option')?.classList.toggle('is-selected', input.checked));
  };
  form.querySelectorAll('input[type="radio"]').forEach((input) => input.addEventListener('change', () => {
    syncOptions(input.name);
    if (input.name === 'delivery') {
      const pickup = input.value === 'pickup';
      const address = form.querySelector('[data-delivery-address]');
      address?.classList.toggle('is-hidden', pickup);
      address?.querySelectorAll('[required]').forEach((field) => { field.required = !pickup; });
      renderApprovedCheckoutSummary(input.value);
    }
  }));
  syncOptions('delivery'); syncOptions('payment');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    button.textContent = 'Prototype order reviewed ✓';
    showToast('Prototype order created. No payment was processed.');
    window.setTimeout(() => { window.location.href = 'order-confirmation.html'; }, 850);
  });
}

function openLogin() {
  const modal = document.getElementById('login-modal');
  if (!modal) return;
  modal.classList.add('is-open');
  document.body.classList.add('modal-open');
  window.setTimeout(() => document.getElementById('login-email')?.focus(), 200);
}

function closeLogin() {
  document.getElementById('login-modal')?.classList.remove('is-open');
  document.body.classList.remove('modal-open');
}

function bindLockedActions(scope = document) {
  scope.querySelectorAll('[data-open-login]').forEach((button) => {
    if (button.dataset.bound) return;
    button.dataset.bound = 'true';
    button.addEventListener('click', (event) => { event.preventDefault(); event.stopPropagation(); openLogin(); });
  });
}

function showToast(message) {
  const toast = document.querySelector('.toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(window.starpilToast);
  window.starpilToast = setTimeout(() => toast.classList.remove('is-visible'), 3500);
}

function bindGlobalInteractions() {
  bindLockedActions();
  const mobilePanel = document.querySelector('.mobile-panel');
  const setMobile = (open) => {
    mobilePanel?.classList.toggle('is-open', open);
    mobilePanel?.setAttribute('aria-hidden', open ? 'false' : 'true');
    document.body.classList.toggle('menu-open', open);
  };
  document.querySelector('.mobile-toggle')?.addEventListener('click', () => setMobile(true));
  document.querySelector('.mobile-close')?.addEventListener('click', () => setMobile(false));
  document.querySelector('.approved-account-trigger')?.addEventListener('click', () => showToast('Approved professional account preview is active.'));

  const search = document.querySelector('.search-overlay');
  const setSearch = (open) => {
    search?.classList.toggle('is-open', open);
    document.body.classList.toggle('modal-open', open);
    if (open) setTimeout(() => document.getElementById('global-search')?.focus(), 180);
  };
  document.querySelector('.search-trigger')?.addEventListener('click', () => setSearch(true));
  document.querySelector('.search-close')?.addEventListener('click', () => setSearch(false));
  document.querySelector('[data-search-form]')?.addEventListener('submit', (event) => { event.preventDefault(); const query = document.getElementById('global-search')?.value.trim(); if (query) window.location.href = `${document.body.classList.contains('approved-preview') ? 'shop-approved.html' : 'shop.html'}?q=${encodeURIComponent(query)}`; });

  document.querySelector('.modal-close')?.addEventListener('click', closeLogin);
  document.getElementById('login-modal')?.addEventListener('click', (event) => { if (event.target.id === 'login-modal') closeLogin(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') { closeLogin(); setSearch(false); setMobile(false); } });
  document.querySelector('[data-login-form]')?.addEventListener('submit', (event) => { event.preventDefault(); closeLogin(); showToast('Approved Pro sign-in successful. Opening your dashboard.'); window.setTimeout(() => { window.location.href = 'customer-dashboard.html'; }, 700); });

  const header = document.getElementById('site-header');
  const onScroll = () => header?.classList.toggle('is-sticky', window.scrollY > 180 && window.innerWidth > 930);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  document.querySelectorAll('[data-newsletter]').forEach((form) => form.addEventListener('submit', (event) => { event.preventDefault(); form.reset(); showToast('You are on the Starpil Pro list.'); }));
  document.querySelectorAll('[data-contact-form], [data-pro-form]').forEach((form) => form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (form.hasAttribute('data-pro-form')) {
      const password = form.querySelector('#pro-password');
      const confirmation = form.querySelector('#pro-password-confirm');
      if (password && confirmation && password.value !== confirmation.value) {
        confirmation.setCustomValidity('The passwords must match.');
        confirmation.reportValidity();
        confirmation.addEventListener('input', () => confirmation.setCustomValidity(''), { once: true });
        return;
      }
      showToast('Account created. Check your email to verify your address and send the application for review.');
    } else {
      showToast('Thank you. The Starpil team will be in touch.');
    }
    form.reset();
  }));

  document.querySelectorAll('[data-home-filter]').forEach((button) => button.addEventListener('click', () => {
    document.querySelectorAll('[data-home-filter]').forEach((item) => item.classList.remove('is-active'));
    button.classList.add('is-active');
    renderHomeProducts(button.dataset.homeFilter);
  }));
}

function initHeroCarousel() {
  const rotator = document.querySelector('[data-hero-image-rotator]');
  if (!rotator) return;

  const slides = [...rotator.querySelectorAll('[data-hero-image-slide]')];
  const dots = [...rotator.querySelectorAll('[data-hero-image-dot]')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let activeIndex = 0;
  let timer;

  const showSlide = (requestedIndex) => {
    activeIndex = (requestedIndex + slides.length) % slides.length;
    slides.forEach((slide, index) => {
      const isActive = index === activeIndex;
      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
    });
    dots.forEach((dot, index) => {
      const isActive = index === activeIndex;
      dot.classList.toggle('is-active', isActive);
      if (isActive) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
  };

  const stopRotation = () => window.clearInterval(timer);
  const startRotation = () => {
    stopRotation();
    if (!reduceMotion) timer = window.setInterval(() => showSlide(activeIndex + 1), 6500);
  };

  rotator.querySelector('[data-hero-image-prev]')?.addEventListener('click', () => { showSlide(activeIndex - 1); startRotation(); });
  rotator.querySelector('[data-hero-image-next]')?.addEventListener('click', () => { showSlide(activeIndex + 1); startRotation(); });
  dots.forEach((dot) => dot.addEventListener('click', () => { showSlide(Number(dot.dataset.heroImageDot)); startRotation(); }));
  rotator.addEventListener('mouseenter', stopRotation);
  rotator.addEventListener('mouseleave', startRotation);
  rotator.addEventListener('focusin', stopRotation);
  rotator.addEventListener('focusout', startRotation);
  document.addEventListener('visibilitychange', () => document.hidden ? stopRotation() : startRotation());

  showSlide(0);
  startRotation();
}

const formulaData = {
  blue: { image: 'assets/images/blue-soft-wax.jpg', label: 'THE ALL-ROUNDER', title: 'Blue', description: 'A dependable professional formula for efficient full-body services and a wide range of hair types.', use: 'Full body · Normal skin · Everyday services', link: 'shop.html?category=soft-wax', cta: 'Shop Blue formulas →' },
  starsoft: { image: 'assets/images/starsoft-film.jpg', label: 'THE GENTLE SPECIALIST', title: 'Starsoft', description: 'A luxury hypoallergenic system developed to improve comfort for sensitive clients without compromising results.', use: 'Sensitive skin · Intimate areas · Luxury services', link: 'shop.html?category=starsoft', cta: 'Shop Starsoft →' },
  coral: { image: 'assets/images/coral-tablets.jpg', label: 'THE SIGNATURE EXPERIENCE', title: 'Coral', description: 'A premium film-wax collection with confident performance and a distinctive treatment-room presentation.', use: 'Full body · Premium services · Flexible technique', link: 'shop.html?category=film-wax', cta: 'Shop Coral wax →' },
  black: { image: 'assets/images/black-film-wax.jpg', label: 'THE POWER GRIP', title: 'Black', description: 'A quick-drying hybrid formula that grips tiny, stubborn and coarse hair—including challenging facial hair.', use: 'Coarse hair · Short regrowth · High-performance removal', link: 'product.html?id=black-film-600g', cta: 'Shop Black Film Wax →' }
};

function bindFormulaFinder() {
  const buttons = document.querySelectorAll('[data-formula]');
  if (!buttons.length) return;
  buttons.forEach((button) => button.addEventListener('click', () => {
    const data = formulaData[button.dataset.formula];
    const image = document.getElementById('formula-image');
    buttons.forEach((item) => item.classList.remove('is-active'));
    button.classList.add('is-active');
    image.classList.add('is-changing');
    setTimeout(() => {
      image.src = data.image;
      image.alt = `Starpil ${data.title} wax`;
      document.getElementById('formula-label').textContent = data.label;
      document.getElementById('formula-title').textContent = data.title;
      document.getElementById('formula-description').textContent = data.description;
      document.getElementById('formula-use').textContent = data.use;
      const link = document.getElementById('formula-link');
      link.href = data.link; link.textContent = data.cta;
      image.classList.remove('is-changing');
    }, 220);
  }));
}

function injectCustomerPortalNav() {
  document.querySelectorAll('[data-customer-nav]').forEach((target) => {
    const active = target.dataset.active;
    const link = (key, href, icon, label) => `<a class="${active === key ? 'is-active' : ''}" href="${href}"><i>${icon}</i><span>${label}</span></a>`;
    target.innerHTML = `
      <nav class="customer-nav" aria-label="My Starpil Pro account">
        <div class="customer-nav-profile"><span class="customer-nav-avatar">AJ</span><div><strong>Alana James</strong><small>Approved Pro · Pro tier</small></div></div>
        <div class="customer-nav-links">
          ${link('dashboard', 'customer-dashboard.html', '⌂', 'Dashboard')}
          ${link('shop', 'shop-approved.html', '◇', 'Pro Catalogue')}
          ${link('orders', 'customer-orders.html', '▤', 'My Orders')}
          ${link('invoices', 'customer-invoices.html', '▧', 'Invoices & Receipts')}
          <small>Membership</small>
          ${link('loyalty', 'customer-loyalty.html', '★', 'Points & Rewards')}
          ${link('profile', 'customer-profile.html', '○', 'Business Profile')}
          ${link('support', 'contact.html', '?', 'Account Support')}
        </div>
        <div class="customer-nav-signout"><a href="index.html">Sign out</a></div>
      </nav>`;
  });
}

function renderMemberBarcodes() {
  const leftPatterns = ['0001101','0011001','0010011','0111101','0100011','0110001','0101111','0111011','0110111','0001011'];
  const gPatterns = ['0100111','0110011','0011011','0100001','0011101','0111001','0000101','0010001','0001001','0010111'];
  const rightPatterns = ['1110010','1100110','1101100','1000010','1011100','1001110','1010000','1000100','1001000','1110100'];
  const parity = ['LLLLLL','LLGLGG','LLGGLG','LLGGGL','LGLLGG','LGGLLG','LGGGLL','LGLGLG','LGLGGL','LGGLGL'];
  document.querySelectorAll('[data-member-barcode]').forEach((svg) => {
    const code = (svg.dataset.code || '').replace(/\D/g, '');
    if (code.length !== 13) return;
    let bits = '101';
    const leftParity = parity[Number(code[0])];
    for (let index = 1; index <= 6; index += 1) bits += leftParity[index - 1] === 'L' ? leftPatterns[Number(code[index])] : gPatterns[Number(code[index])];
    bits += '01010';
    for (let index = 7; index <= 12; index += 1) bits += rightPatterns[Number(code[index])];
    bits += '101';
    svg.setAttribute('viewBox', `0 0 ${bits.length + 16} 48`);
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.innerHTML = `<rect width="${bits.length + 16}" height="48" fill="#fff"/>${[...bits].map((bit, index) => bit === '1' ? `<rect x="${index + 8}" y="4" width="1" height="38" fill="#171315"/>` : '').join('')}`;
  });
}

function bindCustomerPortal() {
  const orderRows = [...document.querySelectorAll('[data-portal-order]')];
  if (orderRows.length) {
    const filters = [...document.querySelectorAll('[data-portal-order-filter]')];
    const search = document.querySelector('[data-portal-order-search]');
    const empty = document.querySelector('[data-portal-orders-empty]');
    let active = 'all';
    const applyOrders = () => {
      const query = search?.value.trim().toLowerCase() || '';
      let shown = 0;
      orderRows.forEach((row) => {
        const visible = (active === 'all' || row.dataset.orderStatus === active) && (!query || row.textContent.toLowerCase().includes(query));
        row.hidden = !visible;
        if (visible) shown += 1;
      });
      if (empty) empty.hidden = shown !== 0;
    };
    filters.forEach((button) => button.addEventListener('click', () => {
      active = button.dataset.portalOrderFilter;
      filters.forEach((item) => item.classList.toggle('is-active', item === button));
      applyOrders();
    }));
    search?.addEventListener('input', applyOrders);
  }

  document.querySelectorAll('[data-demo-invoice]').forEach((button) => button.addEventListener('click', () => showToast('The PDF invoice will download from the Odoo customer portal.')));
  document.querySelector('[data-demo-download-all]')?.addEventListener('click', () => showToast('The customer statement will be generated by Odoo Accounting.'));
  document.querySelector('[data-demo-pay-invoice]')?.addEventListener('click', () => showToast('Odoo will open the secure online payment page for this invoice.'));
  document.querySelector('[data-demo-reorder]')?.addEventListener('click', () => {
    showToast('The items were added to your Pro cart for review.');
    window.setTimeout(() => { window.location.href = 'cart-approved.html'; }, 700);
  });
  document.querySelector('[data-portal-profile-form]')?.addEventListener('submit', (event) => { event.preventDefault(); showToast('Business profile changes saved in this prototype.'); });
  document.querySelector('[data-portal-password-form]')?.addEventListener('submit', (event) => { event.preventDefault(); event.currentTarget.reset(); showToast('Password updated in this prototype.'); });
  document.querySelectorAll('[data-demo-edit-address]').forEach((button) => button.addEventListener('click', () => showToast('The address editor will update the Odoo customer address.')));
  document.querySelector('[data-demo-add-address]')?.addEventListener('click', () => showToast('A new saved-address form will open here.'));
  document.querySelector('[data-demo-certificate]')?.addEventListener('click', () => showToast('The approved certificate will open in the secure document viewer.'));
  document.querySelector('[data-resend-status-email]')?.addEventListener('click', () => showToast('Application status email resent.'));

  const cardModal = document.querySelector('[data-digital-card-modal]');
  const setCardOpen = (open) => {
    if (!cardModal) return;
    cardModal.classList.toggle('is-open', open);
    cardModal.setAttribute('aria-hidden', open ? 'false' : 'true');
    document.body.style.overflow = open ? 'hidden' : '';
  };
  document.querySelector('[data-open-digital-card]')?.addEventListener('click', () => setCardOpen(true));
  document.querySelector('[data-close-digital-card]')?.addEventListener('click', () => setCardOpen(false));
  cardModal?.addEventListener('click', (event) => { if (event.target === cardModal) setCardOpen(false); });
  document.querySelector('[data-add-wallet]')?.addEventListener('click', () => showToast('The production card can be added to the supported mobile wallet.'));
  document.querySelectorAll('[data-redeem-reward]').forEach((button) => button.addEventListener('click', () => {
    const reward = button.dataset.redeemReward;
    button.textContent = 'Coupon ready ✓';
    button.disabled = true;
    showToast(`${reward} selected. Odoo will create a customer-bound coupon after confirmation.`);
  }));
  document.querySelector('[data-points-history]')?.addEventListener('click', () => showToast('The complete auditable points ledger will open here.'));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setCardOpen(false); });
}

function bindLoyaltyAdmin() {
  const tabs = [...document.querySelectorAll('[data-loyalty-admin-tab]')];
  if (!tabs.length) return;
  const panes = [...document.querySelectorAll('[data-loyalty-admin-pane]')];
  tabs.forEach((button) => button.addEventListener('click', () => {
    tabs.forEach((item) => item.classList.toggle('is-active', item === button));
    panes.forEach((pane) => pane.classList.toggle('is-active', pane.dataset.loyaltyAdminPane === button.dataset.loyaltyAdminTab));
  }));
  document.querySelector('[data-save-loyalty]')?.addEventListener('click', () => showToast('Loyalty program settings saved in this prototype.'));
  document.querySelector('[data-demo-add-rule]')?.addEventListener('click', () => showToast('A new bonus earning rule can be configured here.'));
  document.querySelector('[data-demo-add-reward]')?.addEventListener('click', () => showToast('A new reward and redemption condition can be configured here.'));
}

function initReveals() {
  document.body.classList.add('is-loaded');
  const elements = [...document.querySelectorAll('.reveal')];
  if (!('IntersectionObserver' in window)) { elements.forEach((el) => el.classList.add('is-visible')); return; }
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: .08, rootMargin: '0px 0px -40px' });
  elements.forEach((el) => observer.observe(el));
}

function bindAdminShell() {
  const sidebar = document.querySelector('[data-admin-sidebar]');
  const overlay = document.querySelector('[data-admin-sidebar-overlay]');
  const menu = document.querySelector('[data-admin-menu]');
  if (!sidebar || !overlay || !menu) return;

  const setOpen = (open) => {
    sidebar.classList.toggle('is-open', open);
    overlay.classList.toggle('is-open', open);
    menu.setAttribute('aria-expanded', open ? 'true' : 'false');
  };

  menu.addEventListener('click', () => setOpen(!sidebar.classList.contains('is-open')));
  overlay.addEventListener('click', () => setOpen(false));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setOpen(false); });
}

function bindAdminApplicationList() {
  const rows = [...document.querySelectorAll('[data-app-row]')];
  if (!rows.length) return;

  const filters = [...document.querySelectorAll('[data-admin-filter]')];
  const search = document.querySelector('[data-admin-search]');
  const empty = document.querySelector('[data-admin-empty]');
  const body = rows[0].parentElement;
  const sortButton = document.querySelector('[data-admin-sort]');
  let activeFilter = 'all';
  let newestFirst = true;

  const applyView = () => {
    const query = search?.value.trim().toLowerCase() || '';
    let shown = 0;
    rows.forEach((row) => {
      const matchesStatus = activeFilter === 'all' || row.dataset.appStatus === activeFilter;
      const matchesSearch = !query || row.textContent.toLowerCase().includes(query);
      const visible = matchesStatus && matchesSearch;
      row.hidden = !visible;
      if (visible) shown += 1;
    });
    if (empty) empty.hidden = shown !== 0;
  };

  filters.forEach((button) => button.addEventListener('click', () => {
    activeFilter = button.dataset.adminFilter;
    filters.forEach((item) => item.classList.toggle('is-active', item === button));
    applyView();
  }));
  search?.addEventListener('input', applyView);

  sortButton?.addEventListener('click', () => {
    newestFirst = !newestFirst;
    [...rows].reverse().forEach((row) => body.appendChild(row));
    sortButton.textContent = newestFirst ? 'Newest first ↓' : 'Oldest first ↑';
    applyView();
  });

  document.querySelector('[data-admin-export]')?.addEventListener('click', () => showToast('In production, this export will be generated from the Odoo application records.'));
}

function bindAdminApplicationDetail() {
  const decisionModal = document.querySelector('[data-admin-decision-modal]');
  if (!decisionModal) return;

  const certificateModal = document.querySelector('[data-admin-certificate-modal]');
  const title = decisionModal.querySelector('[data-admin-modal-title]');
  const description = decisionModal.querySelector('[data-admin-modal-description]');
  const confirm = decisionModal.querySelector('[data-admin-confirm-decision]');
  const note = decisionModal.querySelector('[data-admin-decision-note]');
  const status = document.querySelector('[data-application-status]');
  const timeline = document.querySelector('[data-admin-timeline]');
  let pendingDecision = 'approve';

  const decisions = {
    approve: {
      title: 'Approve Pro Access',
      description: 'Professional pricing and ordering will become available immediately.',
      confirm: 'Confirm approval',
      status: 'Approved',
      className: 'status-approved',
      event: 'Pro access approved',
      toast: 'Application approved. The approval email is ready to send.'
    },
    reject: {
      title: 'Reject application',
      description: 'The registration will remain on record, but sign-in, professional prices and ordering will stay locked.',
      confirm: 'Confirm rejection',
      status: 'Rejected',
      className: 'status-rejected',
      event: 'Application rejected',
      toast: 'Application rejected. The decision email is ready to send.'
    },
    'more-info': {
      title: 'Request more information',
      description: 'Ask the applicant for a clearer certificate or additional professional details before making a decision.',
      confirm: 'Send request',
      status: 'More information',
      className: 'status-more-info',
      event: 'Additional information requested',
      toast: 'Information request prepared for the applicant.'
    }
  };

  const setModal = (modal, open) => {
    if (!modal) return;
    modal.classList.toggle('is-open', open);
    modal.setAttribute('aria-hidden', open ? 'false' : 'true');
    document.body.style.overflow = open ? 'hidden' : '';
  };

  document.querySelectorAll('[data-admin-decision]').forEach((button) => button.addEventListener('click', () => {
    pendingDecision = button.dataset.adminDecision;
    const copy = decisions[pendingDecision];
    title.textContent = copy.title;
    description.textContent = copy.description;
    confirm.textContent = copy.confirm;
    confirm.className = `admin-button ${pendingDecision === 'reject' ? 'admin-button-danger' : 'admin-button-primary'}`;
    setModal(decisionModal, true);
    setTimeout(() => note?.focus(), 180);
  }));

  const closeDecision = () => setModal(decisionModal, false);
  decisionModal.querySelector('[data-admin-modal-close]')?.addEventListener('click', closeDecision);
  decisionModal.addEventListener('click', (event) => { if (event.target === decisionModal) closeDecision(); });

  confirm?.addEventListener('click', () => {
    const copy = decisions[pendingDecision];
    if (status) {
      status.classList.remove('status-pending', 'status-approved', 'status-rejected', 'status-more-info', 'status-unverified');
      status.classList.add(copy.className);
      status.textContent = copy.status;
    }
    if (timeline) {
      timeline.querySelector('.is-current')?.classList.remove('is-current');
      const item = document.createElement('div');
      item.className = 'is-current';
      item.innerHTML = `<span></span><div><strong>${copy.event}</strong><small>Just now · Starpil Administrator</small></div>`;
      timeline.prepend(item);
    }
    const loyaltyEnrollment = document.querySelector('[data-loyalty-enrollment]');
    if (loyaltyEnrollment && pendingDecision === 'approve') {
      loyaltyEnrollment.classList.remove('is-locked');
      const icon = loyaltyEnrollment.querySelector(':scope > span');
      const detail = loyaltyEnrollment.querySelector('small');
      if (icon) icon.textContent = '✓';
      if (detail) detail.textContent = 'Member account and digital card created';
    }
    closeDecision();
    showToast(copy.toast);
  });

  document.querySelector('[data-view-certificate]')?.addEventListener('click', () => setModal(certificateModal, true));
  certificateModal?.querySelector('[data-certificate-close]')?.addEventListener('click', () => setModal(certificateModal, false));
  certificateModal?.addEventListener('click', (event) => { if (event.target === certificateModal) setModal(certificateModal, false); });
  document.querySelector('[data-download-demo]')?.addEventListener('click', () => showToast('The secure certificate download will be served by Odoo in production.'));
  document.querySelector('[data-save-admin-note]')?.addEventListener('click', () => showToast('Internal review note saved in this prototype.'));
  document.querySelector('[data-admin-edit-note]')?.addEventListener('click', () => showToast('Applicant detail editing will use the Odoo customer record.'));

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    closeDecision();
    setModal(certificateModal, false);
  });
}

function bindRealtimeAdmin() {
  const clocks = document.querySelectorAll('[data-live-clock]');
  if (!clocks.length) return;

  const updateClock = () => {
    const current = new Date().toLocaleTimeString('en-TT', {
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
    });
    clocks.forEach((clock) => { clock.textContent = current; });
  };

  updateClock();
  window.setInterval(updateClock, 1000);

  document.querySelector('[data-admin-refresh]')?.addEventListener('click', (event) => {
    const button = event.currentTarget;
    const original = button.textContent;
    button.textContent = 'Refreshing…';
    button.disabled = true;
    window.setTimeout(() => {
      button.textContent = original;
      button.disabled = false;
      document.querySelectorAll('[data-last-sync]').forEach((node) => { node.textContent = 'just now'; });
      showToast('Live Odoo data refreshed. Everything is up to date.');
    }, 650);
  });
}

function bindSecretToggles(scope = document) {
  scope.querySelectorAll('[data-secret-toggle]').forEach((button) => button.addEventListener('click', () => {
    const input = button.closest('.secret-field')?.querySelector('input');
    if (!input) return;
    const showing = input.type === 'text';
    input.type = showing ? 'password' : 'text';
    button.textContent = showing ? 'Show' : 'Hide';
  }));
}

function copySettingValue(input) {
  if (!input) return;
  const fallback = () => {
    input.focus();
    input.select();
    try { document.execCommand('copy'); } catch (error) { /* Preview fallback only. */ }
    input.setSelectionRange(0, 0);
  };
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(input.value).catch(fallback);
  } else {
    fallback();
  }
}

function bindPaymentAdmin() {
  const providers = [...document.querySelectorAll('[data-payment-provider]')];
  const panes = [...document.querySelectorAll('[data-payment-pane]')];
  if (!providers.length) return;

  const selectProvider = (provider) => {
    providers.forEach((button) => button.classList.toggle('is-active', button.dataset.paymentProvider === provider));
    panes.forEach((pane) => pane.classList.toggle('is-active', pane.dataset.paymentPane === provider));
  };

  providers.forEach((button) => button.addEventListener('click', () => selectProvider(button.dataset.paymentProvider)));
  document.querySelector('[data-payment-save]')?.addEventListener('click', () => showToast('Payment settings saved to the live Odoo provider configuration.'));
  document.querySelector('[data-currency-save]')?.addEventListener('click', (event) => {
    const button = event.currentTarget;
    const primary = document.querySelector('[data-primary-currency]')?.value.split('—')[0].trim() || 'USD';
    const original = button.textContent;
    button.textContent = 'Publishing…';
    button.disabled = true;
    window.setTimeout(() => {
      button.textContent = original;
      button.disabled = false;
      showToast(`${primary} saved as the primary currency. Odoo website prices and checkout rules updated.`);
    }, 750);
  });
  document.querySelectorAll('[data-copy-setting]').forEach((button) => button.addEventListener('click', () => {
    copySettingValue(button.closest('.readonly-copy')?.querySelector('input'));
    const original = button.textContent;
    button.textContent = 'Copied';
    window.setTimeout(() => { button.textContent = original; }, 1200);
    showToast('Secure callback address copied.');
  }));
  document.querySelectorAll('[data-test-provider]').forEach((button) => button.addEventListener('click', () => {
    const provider = button.dataset.testProvider;
    const original = button.textContent;
    button.textContent = 'Testing…';
    button.disabled = true;
    window.setTimeout(() => {
      button.textContent = original;
      button.disabled = false;
      showToast(`${provider} connection verified successfully.`);
    }, 850);
  }));
}

function bindBankTransferAdmin() {
  const rows = [...document.querySelectorAll('[data-bank-row]')];
  if (!rows.length) return;

  const filters = [...document.querySelectorAll('[data-bank-filter]')];
  const search = document.querySelector('[data-bank-search]');
  const empty = document.querySelector('[data-bank-empty]');
  const checks = [...document.querySelectorAll('[data-bank-check]')];
  const approve = document.querySelector('[data-bank-decision="approve"]');
  const reject = document.querySelector('[data-bank-decision="reject"]');
  const detailStatus = document.querySelector('[data-bank-detail-status]');
  const detail = document.querySelector('[data-bank-review-detail]');
  let activeFilter = 'pending';
  let selected = rows.find((row) => row.classList.contains('is-selected')) || rows[0];

  const updateCounts = () => {
    const pending = rows.filter((row) => row.dataset.bankStatus === 'pending').length;
    const approvedCount = rows.filter((row) => row.dataset.bankStatus === 'approved').length;
    document.querySelectorAll('[data-bank-pending-count]').forEach((node) => { node.textContent = pending; });
    const pendingStat = document.querySelector('[data-bank-stat-pending]');
    const approvedStat = document.querySelector('[data-bank-stat-approved]');
    if (pendingStat) pendingStat.textContent = pending;
    if (approvedStat) approvedStat.textContent = 6 + approvedCount - 1;
  };

  const updateApproveState = () => {
    if (!approve) return;
    approve.disabled = selected?.dataset.bankStatus !== 'pending' || !checks.every((check) => check.checked);
  };

  const showSelected = (row) => {
    selected = row;
    rows.forEach((item) => item.classList.toggle('is-selected', item === row));
    const title = row.querySelector('strong')?.textContent || row.dataset.bankId;
    const customer = row.querySelector('p small')?.textContent || '';
    const amount = row.querySelector(':scope > b')?.textContent || '';
    const heading = detail?.querySelector('.bank-review-heading');
    if (heading) {
      const order = heading.querySelector('h2');
      const customerNode = heading.querySelector('p');
      const amountNode = heading.querySelector(':scope > strong');
      if (order) order.textContent = row.dataset.bankId;
      if (customerNode) customerNode.textContent = title.split('·').slice(1).join('·').trim() || customer;
      if (amountNode) amountNode.textContent = amount;
    }
    if (detailStatus) {
      const status = row.dataset.bankStatus;
      detailStatus.className = `admin-status status-${status === 'pending' ? 'pending' : status === 'approved' ? 'approved' : 'rejected'}`;
      detailStatus.textContent = status === 'pending' ? 'Pending review' : status[0].toUpperCase() + status.slice(1);
    }
    checks.forEach((check) => {
      check.checked = row.dataset.bankStatus === 'approved';
      check.disabled = row.dataset.bankStatus !== 'pending';
    });
    if (reject) reject.disabled = row.dataset.bankStatus !== 'pending';
    updateApproveState();
  };

  const applyFilter = () => {
    const term = (search?.value || '').trim().toLowerCase();
    let visible = 0;
    rows.forEach((row) => {
      const matchesStatus = row.dataset.bankStatus === activeFilter;
      const matchesSearch = !term || row.textContent.toLowerCase().includes(term) || row.dataset.bankId.toLowerCase().includes(term);
      const show = matchesStatus && matchesSearch;
      row.hidden = !show;
      if (show) visible += 1;
    });
    if (empty) empty.hidden = visible !== 0;
    if (selected?.hidden) {
      const next = rows.find((row) => !row.hidden);
      if (next) showSelected(next);
    }
  };

  filters.forEach((button) => button.addEventListener('click', () => {
    activeFilter = button.dataset.bankFilter;
    filters.forEach((item) => item.classList.toggle('is-active', item === button));
    applyFilter();
  }));
  search?.addEventListener('input', applyFilter);
  rows.forEach((row) => row.addEventListener('click', () => showSelected(row)));
  checks.forEach((check) => check.addEventListener('change', updateApproveState));

  document.querySelectorAll('[data-bank-decision]').forEach((button) => button.addEventListener('click', () => {
    if (!selected || button.disabled) return;
    const status = button.dataset.bankDecision === 'approve' ? 'approved' : 'rejected';
    selected.dataset.bankStatus = status;
    const rowStatus = selected.querySelector('em > span');
    if (rowStatus) rowStatus.textContent = status === 'approved' ? 'Approved' : 'Rejected';
    showSelected(selected);
    updateCounts();
    showToast(status === 'approved'
      ? `${selected.dataset.bankId} payment registered in Odoo and the order updated.`
      : `${selected.dataset.bankId} receipt rejected. The customer notification is queued.`);
    window.setTimeout(applyFilter, 350);
  }));
  document.querySelector('[data-bank-open-receipt]')?.addEventListener('click', () => showToast('The secure full receipt would open from the Odoo attachment record.'));

  updateCounts();
  showSelected(selected);
  applyFilter();
}

function bindShippingAdmin() {
  const methods = [...document.querySelectorAll('[data-shipping-method]')];
  const panes = [...document.querySelectorAll('[data-shipping-pane]')];
  methods.forEach((method) => method.addEventListener('click', () => {
    methods.forEach((item) => item.classList.toggle('is-active', item === method));
    panes.forEach((pane) => pane.classList.toggle('is-active', pane.dataset.shippingPane === method.dataset.shippingMethod));
  }));
  document.querySelector('[data-shipping-save]')?.addEventListener('click', () => showToast('Delivery methods and checkout rules saved to Odoo in real time.'));
  document.querySelector('[data-shipping-add]')?.addEventListener('click', () => showToast('A new delivery method would create an Odoo delivery carrier.'));
  document.querySelector('[data-shipping-zone-add]')?.addEventListener('click', () => showToast('New delivery zone editor opened in the production workflow.'));

  const editor = document.querySelector('[data-delivery-editor]');
  if (!editor) return;

  const title = editor.querySelector('[data-delivery-editor-title]');
  const inputs = {
    name: editor.querySelector('[data-fee-input="name"]'),
    areas: editor.querySelector('[data-fee-input="areas"]'),
    amount: editor.querySelector('[data-fee-input="amount"]'),
    estimate: editor.querySelector('[data-fee-input="estimate"]'),
    free: editor.querySelector('[data-fee-input="free"]'),
    active: editor.querySelector('[data-fee-input="active"]')
  };
  let editingRow = null;

  const money = (value) => `US$${Number(value || 0).toFixed(2)}`;
  const updateSummary = () => {
    const activeRows = [...document.querySelectorAll('[data-delivery-fee-row]')]
      .filter((row) => row.querySelector('[data-fee-active]')?.checked);
    const counter = document.querySelector('[data-delivery-active-count]');
    if (counter) counter.textContent = activeRows.length;
    const previewPrice = document.querySelector('[data-delivery-preview-list] article:first-child > b');
    const fees = activeRows.map((row) => Number(row.dataset.feeAmount)).filter((amount) => Number.isFinite(amount));
    if (previewPrice) previewPrice.textContent = fees.length ? `From ${money(Math.min(...fees))}` : 'Unavailable';
  };

  const clearEditor = () => {
    editingRow = null;
    if (title) title.textContent = 'Add a delivery fee';
    if (inputs.name) inputs.name.value = '';
    if (inputs.areas) inputs.areas.value = '';
    if (inputs.amount) inputs.amount.value = '';
    if (inputs.estimate) inputs.estimate.value = '1–2 business days';
    if (inputs.free) inputs.free.value = '';
    if (inputs.active) inputs.active.checked = true;
  };

  const fillEditor = (row) => {
    editingRow = row;
    if (title) title.textContent = 'Edit custom delivery fee';
    if (inputs.name) inputs.name.value = row.dataset.feeName || '';
    if (inputs.areas) inputs.areas.value = row.dataset.feeAreas || '';
    if (inputs.amount) inputs.amount.value = row.dataset.feeAmount || '';
    if (inputs.estimate) inputs.estimate.value = row.dataset.feeEstimate || '';
    if (inputs.free) inputs.free.value = row.dataset.feeFree || '';
    if (inputs.active) inputs.active.checked = row.querySelector('[data-fee-active]')?.checked !== false;
    editor.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const renderRow = (row, values) => {
    row.dataset.feeName = values.name;
    row.dataset.feeAreas = values.areas;
    row.dataset.feeAmount = values.amount;
    row.dataset.feeEstimate = values.estimate;
    row.dataset.feeFree = values.free;
    row.innerHTML = '';

    const copy = document.createElement('div');
    const name = document.createElement('strong');
    const areas = document.createElement('small');
    name.textContent = values.name;
    areas.textContent = values.areas;
    copy.append(name, areas);

    const amount = document.createElement('b');
    amount.textContent = money(values.amount);
    const estimate = document.createElement('span');
    estimate.textContent = values.estimate.replace(' business days', ' days');
    const free = document.createElement('span');
    free.textContent = Number(values.free) > 0 ? `US$${Number(values.free).toLocaleString('en-US')}` : '—';

    const toggle = document.createElement('label');
    toggle.className = 'delivery-fee-toggle';
    toggle.setAttribute('aria-label', `${values.name} active`);
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = values.active;
    checkbox.setAttribute('data-fee-active', '');
    const switchVisual = document.createElement('i');
    toggle.append(checkbox, switchVisual);

    const edit = document.createElement('button');
    edit.type = 'button';
    edit.textContent = 'Edit';
    edit.setAttribute('data-delivery-edit', '');
    row.append(copy, amount, estimate, free, toggle, edit);
    edit.addEventListener('click', () => fillEditor(row));
    checkbox.addEventListener('change', () => {
      updateSummary();
      showToast(`${values.name} ${checkbox.checked ? 'published' : 'hidden'} at checkout.`);
    });
  };

  document.querySelectorAll('[data-delivery-fee-row]').forEach((row) => {
    row.querySelector('[data-delivery-edit]')?.addEventListener('click', () => fillEditor(row));
    row.querySelector('[data-fee-active]')?.addEventListener('change', updateSummary);
  });

  document.querySelector('[data-delivery-add]')?.addEventListener('click', () => {
    clearEditor();
    editor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    window.setTimeout(() => inputs.name?.focus(), 350);
  });
  document.querySelector('[data-delivery-cancel]')?.addEventListener('click', clearEditor);
  document.querySelector('[data-delivery-save]')?.addEventListener('click', () => {
    const values = {
      name: inputs.name?.value.trim() || '',
      areas: inputs.areas?.value.trim() || '',
      amount: inputs.amount?.value || '0',
      estimate: inputs.estimate?.value.trim() || '1–2 business days',
      free: inputs.free?.value || '0',
      active: inputs.active?.checked !== false
    };
    if (!values.name || !values.areas || Number(values.amount) < 0 || inputs.amount?.value === '') {
      showToast('Add a fee name, covered areas and delivery amount before saving.');
      return;
    }
    const isNew = !editingRow;
    const row = editingRow || document.createElement('article');
    row.setAttribute('data-delivery-fee-row', '');
    renderRow(row, values);
    if (isNew) document.querySelector('.custom-delivery-list')?.append(row);
    updateSummary();
    showToast(`${values.name} ${isNew ? 'created' : 'updated'} in Odoo and published to checkout.`);
    clearEditor();
  });

  updateSummary();
}

function bindEmailAdmin() {
  const rows = [...document.querySelectorAll('[data-email-row]')];
  if (!rows.length) return;
  const filters = [...document.querySelectorAll('[data-email-filter]')];

  filters.forEach((button) => button.addEventListener('click', () => {
    const filter = button.dataset.emailFilter;
    filters.forEach((item) => item.classList.toggle('is-active', item === button));
    rows.forEach((row) => { row.hidden = filter !== 'all' && row.dataset.emailStatus !== filter; });
  }));
  document.querySelector('[data-email-save]')?.addEventListener('click', () => showToast('SMTP and notification settings saved to Odoo.'));
  document.querySelector('[data-email-test]')?.addEventListener('click', () => showToast('Test email queued through the configured Odoo mail server.'));
  document.querySelector('[data-email-connection]')?.addEventListener('click', (event) => {
    const button = event.currentTarget;
    const original = button.textContent;
    button.textContent = 'Testing…';
    button.disabled = true;
    window.setTimeout(() => {
      button.textContent = original;
      button.disabled = false;
      showToast('SMTP connection successful. Authentication and encryption verified.');
    }, 850);
  });
  document.querySelector('[data-email-template-add]')?.addEventListener('click', () => showToast('New Odoo email template editor opened in the production workflow.'));
  document.querySelectorAll('.email-template-grid article > button').forEach((button) => button.addEventListener('click', () => showToast('Template group opened for editing.')));
  document.querySelectorAll('[data-email-retry]').forEach((button) => button.addEventListener('click', () => {
    const row = button.closest('[data-email-row]');
    if (!row) return;
    row.dataset.emailStatus = 'queued';
    const state = row.querySelector('.email-state');
    if (state) { state.className = 'email-state queued'; state.textContent = '…'; }
    const status = row.querySelector(':scope > b');
    if (status) status.textContent = 'Queued';
    button.textContent = 'Open';
    button.removeAttribute('data-email-retry');
    showToast('Email returned to the live Odoo queue for immediate retry.');
  }));
}

injectChrome();
injectCustomerPortalNav();
renderHomeProducts();
renderShop();
renderApprovedShop();
renderProductDetail();
renderUnlockedProductDetail();
renderApprovedCart();
renderApprovedCheckoutSummary();
bindApprovedCheckout();
bindGlobalInteractions();
initHeroCarousel();
bindFormulaFinder();
renderMemberBarcodes();
bindCustomerPortal();
bindLoyaltyAdmin();
initReveals();
bindAdminShell();
bindAdminApplicationList();
bindAdminApplicationDetail();
bindRealtimeAdmin();
bindSecretToggles();
bindPaymentAdmin();
bindBankTransferAdmin();
bindShippingAdmin();
bindEmailAdmin();
