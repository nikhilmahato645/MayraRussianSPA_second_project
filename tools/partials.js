/* ==========================================================================
   partials.js — shared markup for the static build
   --------------------------------------------------------------------------
   These templates run ONLY at build time (node tools/build.js).
   The deployed site is plain static HTML with no dependency on this file.
   Keeping the header/footer/meta in one place is what guarantees the
   consistency the SEO audit requires: one canonical format, no broken
   internal links, correct aria-current on every page.
   ========================================================================== */

'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

/* --------------------------------------------------------------------------
   CONFIG — loaded straight from js/site-config.js
   --------------------------------------------------------------------------
   That file is the single source of truth for contact details, the domain
   and social links. It is a browser script (it assigns window.SITE_CONFIG),
   so we evaluate it here in a sandbox with a fake `window` rather than
   duplicating the values. Edit js/site-config.js, re-run `node tools/build.js`,
   and every page picks the change up.
   -------------------------------------------------------------------------- */
function loadSiteConfig() {
  const file = path.join(__dirname, '..', 'js', 'site-config.js');
  const sandbox = { window: {} };

  vm.runInNewContext(fs.readFileSync(file, 'utf8'), sandbox, { filename: file });

  const cfg = sandbox.window.SITE_CONFIG;
  if (!cfg) throw new Error('js/site-config.js did not set window.SITE_CONFIG');

  /* Fail loudly at build time rather than shipping a page with "undefined"
     where a phone number should be. */
  ['SITE_URL', 'BUSINESS_NAME', 'TAGLINE', 'PHONE_DISPLAY', 'PHONE_HREF', 'EMAIL',
   'LOCALITY', 'REGION', 'POSTAL_CODE', 'COUNTRY', 'ADDRESS_SHORT', 'HOURS_DISPLAY']
    .forEach((key) => {
      if (!cfg[key]) throw new Error(`js/site-config.js is missing a value for ${key}`);
    });

  if (cfg.SITE_URL.endsWith('/')) throw new Error('SITE_URL must not end with a trailing slash');
  if (!cfg.SITE_URL.startsWith('https://')) throw new Error('SITE_URL must use https');

  return cfg;
}

const CFG = loadSiteConfig();

/* Escape anything that lands inside an HTML attribute or text node. */
const esc = (s) => String(s)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

/* --------------------------------------------------------------------------
   NAVIGATION MODEL — single source for header, drawer, footer and sitemap
   -------------------------------------------------------------------------- */
const LOCATIONS = [
  { file: 'russian-spa-in-mahipalpur.html', label: 'Russian Spa in Mahipalpur', short: 'Mahipalpur' },
  { file: 'russian-spa-in-aerocity.html',   label: 'Russian Spa in Aerocity',   short: 'Aerocity' },
  { file: 'russian-spa-in-gurgaon.html',    label: 'Russian Spa in Gurgaon',    short: 'Gurgaon' },
  { file: 'russian-spa-in-new-delhi.html',  label: 'Russian Spa in New Delhi',  short: 'New Delhi' }
];

const MAIN_NAV = [
  { file: 'index.html',    label: 'Home' },
  { file: 'about.html',    label: 'About' },
  { file: 'services.html', label: 'Services' },
  { file: 'gallery.html',  label: 'Gallery' }
];

/* --------------------------------------------------------------------------
   LOGO
   -------------------------------------------------------------------------- */
const logoSVG = (idSuffix) => `<svg viewBox="0 0 260 56" width="260" height="56" role="img" aria-label="${esc(CFG.BUSINESS_NAME)}" focusable="false">
        <defs>
          <linearGradient id="lg-${idSuffix}" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#E7CB8F"/><stop offset="1" stop-color="#C8A560"/>
          </linearGradient>
        </defs>
        <g transform="translate(2,4)">
          <rect width="48" height="48" rx="12" fill="#0B201C"/>
          <path d="M24 9c8.3 0 15 6.7 15 15-8.3 0-15-6.7-15-15Z" fill="url(#lg-${idSuffix})"/>
          <path d="M24 39c-8.3 0-15-6.7-15-15 8.3 0 15 6.7 15 15Z" fill="url(#lg-${idSuffix})"/>
          <path d="M13.5 34.5 34.5 13.5" stroke="#0B201C" stroke-width="2" stroke-linecap="round"/>
        </g>
        <text x="62" y="26" font-family="Georgia, serif" font-size="21" letter-spacing="0.5" fill="currentColor">Mayra</text>
        <text x="62" y="43" font-family="Helvetica, Arial, sans-serif" font-size="10.5" letter-spacing="3.2" fill="#C8A560">RUSSIAN SPA</text>
      </svg>`;

/* --------------------------------------------------------------------------
   HEAD
   -------------------------------------------------------------------------- */
function head(page) {
  const url = `${CFG.SITE_URL}/${page.file === 'index.html' ? '' : page.file}`;
  const ogImage = `${CFG.SITE_URL}/${page.ogImage}`;

  /* 404 is the only page that must stay out of the index. */
  const robots = page.noindex
    ? '\n  <meta name="robots" content="noindex, follow">'
    : '\n  <meta name="robots" content="index, follow, max-image-preview:large">';

  const jsonLd = (page.schema || [])
    .map((s) => `  <script type="application/ld+json">\n${JSON.stringify(s, null, 2)
      .split('\n').map((l) => '  ' + l).join('\n')}\n  </script>`)
    .join('\n');

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>${esc(page.title)}</title>
  <meta name="description" content="${esc(page.description)}">${robots}
  ${page.noindex ? '' : `<link rel="canonical" href="${url}">`}

  <!-- Open Graph -->
  <meta property="og:type" content="${page.ogType || 'website'}">
  <meta property="og:site_name" content="${esc(CFG.BUSINESS_NAME)}">
  <meta property="og:locale" content="en_IN">
  <meta property="og:title" content="${esc(page.ogTitle || page.title)}">
  <meta property="og:description" content="${esc(page.ogDescription || page.description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:image:alt" content="${esc(page.ogImageAlt)}">

  <!-- Twitter / X (no account is claimed — card metadata only) -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(page.ogTitle || page.title)}">
  <meta name="twitter:description" content="${esc(page.ogDescription || page.description)}">
  <meta name="twitter:image" content="${ogImage}">
  <meta name="twitter:image:alt" content="${esc(page.ogImageAlt)}">

  <!-- Icons & manifest -->
  <link rel="icon" href="/assets/brand-assets/favicon.ico" sizes="any">
  <link rel="icon" href="/assets/brand-assets/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/assets/brand-assets/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  <meta name="theme-color" content="#0B201C">

  <!-- Styles: one small stylesheet, no external fonts, nothing render-blocking beyond this -->
  <link rel="stylesheet" href="/css/style.css">
${page.heroImage ? `  <link rel="preload" as="image" href="/${page.heroImage}" fetchpriority="high">` : ''}

  <!-- Scripts are deferred; no page content depends on them -->
  <script src="/js/site-config.js" defer></script>
  <script src="/js/main.js" defer></script>

${jsonLd}
</head>
<body>`;
}

/* --------------------------------------------------------------------------
   HEADER + DRAWER
   -------------------------------------------------------------------------- */
function header(page) {
  const cur = (file) => (page.file === file ? ' aria-current="page"' : '');
  const inLocations = LOCATIONS.some((l) => l.file === page.file);

  const navItems = MAIN_NAV
    .map((i) => `          <li><a class="nav__link" href="/${i.file === 'index.html' ? '' : i.file}"${cur(i.file)}>${i.label}</a></li>`)
    .join('\n');

  const locItems = LOCATIONS
    .map((l) => `              <li><a href="/${l.file}"${cur(l.file)}>${l.label}</a></li>`)
    .join('\n');

  const drawerMain = MAIN_NAV
    .map((i) => `          <li><a class="drawer__link" href="/${i.file === 'index.html' ? '' : i.file}"${cur(i.file)}>${i.label}</a></li>`)
    .join('\n');

  const drawerLocs = LOCATIONS
    .map((l) => `              <li><a href="/${l.file}"${cur(l.file)}>${l.label}</a></li>`)
    .join('\n');

  return `
  <a class="skip-link" href="#main-content">Skip to content</a>

  <header class="header">
    <div class="container header__inner">
      <a class="brand" href="/" aria-label="${esc(CFG.BUSINESS_NAME)} — home">
        ${logoSVG('hdr')}
      </a>

      <nav class="nav" aria-label="Primary">
        <ul class="nav__list">
${navItems}
          <li class="nav__item--has-menu">
            <button class="nav__link nav__toggle" type="button"
                    aria-expanded="false" aria-controls="locations-menu"${inLocations ? ' aria-current="page"' : ''}>
              Locations <span class="chev" aria-hidden="true"></span>
            </button>
            <ul class="nav__menu" id="locations-menu">
${locItems}
            </ul>
          </li>
          <li><a class="nav__link" href="/contact.html"${cur('contact.html')}>Contact</a></li>
        </ul>
      </nav>

      <a class="btn btn--primary header__cta magnetic" data-spark href="tel:${CFG.PHONE_HREF}" data-site="phone-link">
        Call <span data-site="phone">${CFG.PHONE_DISPLAY}</span>
      </a>

      <button class="nav-trigger" type="button" aria-expanded="false"
              aria-controls="mobile-drawer" aria-label="Open menu">
        <span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span>
      </button>
    </div>
  </header>

  <div class="drawer" id="mobile-drawer">
    <nav aria-label="Mobile">
      <ul class="drawer__list">
${drawerMain}
        <li class="drawer__group">
          <button class="drawer__link" type="button" aria-expanded="${inLocations ? 'true' : 'false'}" aria-controls="drawer-locations">
            Locations <span class="chev" aria-hidden="true"></span>
          </button>
          <div class="drawer__sub" id="drawer-locations">
            <div>
              <ul>
${drawerLocs}
              </ul>
            </div>
          </div>
        </li>
        <li><a class="drawer__link" href="/contact.html"${cur('contact.html')}>Contact</a></li>
      </ul>
    </nav>

    <div class="drawer__contact">
      <a class="btn btn--primary btn--block" href="tel:${CFG.PHONE_HREF}" data-site="phone-link">
        Call <span data-site="phone">${CFG.PHONE_DISPLAY}</span>
      </a>
      <a class="btn btn--ghost btn--block" href="mailto:${CFG.EMAIL}" data-site="email-link">Email us</a>
      <p class="lead" style="font-size:var(--fs-sm)"><span data-site="hours">${CFG.HOURS_DISPLAY}</span> · <span data-site="address">${CFG.ADDRESS_SHORT}</span></p>
    </div>
  </div>
`;
}

/* --------------------------------------------------------------------------
   BREADCRUMB (visible + matching JSON-LD is added per page)
   -------------------------------------------------------------------------- */
function breadcrumb(trail) {
  const items = trail.map((t, i) => {
    const last = i === trail.length - 1;
    return last
      ? `        <li><span aria-current="page">${esc(t.label)}</span></li>`
      : `        <li><a href="${t.href}">${esc(t.label)}</a></li>`;
  }).join('\n');

  return `    <nav class="breadcrumb" aria-label="Breadcrumb">
      <ol>
${items}
      </ol>
    </nav>`;
}

/* --------------------------------------------------------------------------
   REUSABLE BLOCKS
   -------------------------------------------------------------------------- */
function ctaBand({ heading, body, note }) {
  return `  <section class="section">
    <div class="container">
      <div class="cta-band" data-reveal="scale">
        <div class="aurora" aria-hidden="true"><span></span><span></span><span></span></div>
        <div class="cta-band__inner">
          <p class="eyebrow" style="justify-content:center">Book your session</p>
          <h2>${heading}</h2>
          <p class="lead">${body}</p>
          <div class="btn-row">
            <a class="btn btn--primary magnetic" data-spark href="tel:${CFG.PHONE_HREF}" data-site="phone-link">
              Call <span data-site="phone">${CFG.PHONE_DISPLAY}</span>
            </a>
            <a class="btn btn--ghost" href="mailto:${CFG.EMAIL}" data-site="email-link">Email us</a>
            <a class="btn btn--ghost" href="/contact.html">Send an enquiry</a>
          </div>
          ${note ? `<p class="lead" style="font-size:var(--fs-sm);margin-top:var(--sp-5)">${note}</p>` : ''}
        </div>
      </div>
    </div>
  </section>`;
}

function contactStrip() {
  return `      <div class="contact-strip" data-reveal>
        <div class="contact-strip__item">
          <h3>Phone</h3>
          <a href="tel:${CFG.PHONE_HREF}" data-site="phone-link"><span data-site="phone">${CFG.PHONE_DISPLAY}</span></a>
        </div>
        <div class="contact-strip__item">
          <h3>Email</h3>
          <a href="mailto:${CFG.EMAIL}" data-site="email-link"><span data-site="email">${CFG.EMAIL}</span></a>
        </div>
        <div class="contact-strip__item">
          <h3>Hours</h3>
          <p data-site="hours">${CFG.HOURS_DISPLAY}</p>
        </div>
      </div>`;
}

/* FAQ block — answers stay in the DOM when collapsed so they remain
   crawlable and consistent with the FAQPage structured data. */
function faqBlock(items, idPrefix) {
  return items.map((f, i) => {
    const id = `${idPrefix}-faq-${i + 1}`;
    const answers = f.a.map((p) => `            <p>${p}</p>`).join('\n');
    return `        <div class="faq__item" data-reveal data-reveal-delay="${i * 60}">
          <h3 style="margin:0">
            <button class="faq__q" type="button" aria-expanded="false" aria-controls="${id}">
              ${esc(f.q)}
              <span class="plus" aria-hidden="true"></span>
            </button>
          </h3>
          <div class="faq__a" id="${id}">
            <div>
${answers}
            </div>
          </div>
        </div>`;
  }).join('\n');
}

/* --------------------------------------------------------------------------
   SOCIAL LINKS
   Rendered only when a verified profile URL exists in CFG. An empty value
   emits nothing at all — we never ship an href="#" placeholder, and we never
   link to a profile the business has not confirmed it owns.
   -------------------------------------------------------------------------- */
const SOCIAL_ICONS = {
  FACEBOOK: '<path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.25-1.5 1.55-1.5H16.7V4.6A22 22 0 0 0 14.3 4.5c-2.4 0-4 1.45-4 4.12V10.9H7.6V14h2.7v8Z"/>',
  INSTAGRAM: '<path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.25.07 1.62.07 4.81s0 3.56-.07 4.81c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.25.06-1.62.07-4.85.07s-3.6 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.8 3.8 0 0 1-1.38-.9 3.8 3.8 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.56 2.2 15.19 2.2 12s0-3.56.07-4.81c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.44 2.21 8.8 2.2 12 2.2Zm0 4.86A4.94 4.94 0 1 0 16.94 12 4.94 4.94 0 0 0 12 7.06Zm0 8.15A3.21 3.21 0 1 1 15.21 12 3.21 3.21 0 0 1 12 15.21Zm6.29-8.35a1.15 1.15 0 1 1-1.15-1.15 1.15 1.15 0 0 1 1.15 1.15Z"/>'
};

function socialLinks() {
  const links = Object.keys(SOCIAL_ICONS)
    .filter((key) => CFG[key])
    .map((key) => {
      const label = key.charAt(0) + key.slice(1).toLowerCase();
      return `            <a href="${esc(CFG[key])}" data-social="${key.toLowerCase()}" aria-label="${label}" rel="noopener" target="_blank">
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${SOCIAL_ICONS[key]}</svg>
            </a>`;
    });

  if (!links.length) return '';
  return `          <div class="social">\n${links.join('\n')}\n          </div>`;
}

/* --------------------------------------------------------------------------
   FOOTER
   -------------------------------------------------------------------------- */
function footer() {
  const locLinks = LOCATIONS
    .map((l) => `            <li><a href="/${l.file}">${l.label}</a></li>`)
    .join('\n');

  return `
  <footer class="footer">
    <div class="container">
      <div class="footer__grid">
        <div class="footer__brand">
          ${logoSVG('ftr')}
          <p>${esc(CFG.TAGLINE)} in ${esc(CFG.LOCALITY)}, New Delhi — traditional banya heat therapy, deep tissue bodywork and couples treatments in private rooms, available around the clock.</p>
${socialLinks()}
        </div>

        <nav aria-labelledby="footer-explore">
          <h2 id="footer-explore">Explore</h2>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about.html">About us</a></li>
            <li><a href="/services.html">Spa services</a></li>
            <li><a href="/gallery.html">Gallery</a></li>
            <li><a href="/contact.html">Contact</a></li>
          </ul>
        </nav>

        <nav aria-labelledby="footer-locations">
          <h2 id="footer-locations">Locations</h2>
          <ul>
${locLinks}
          </ul>
        </nav>

        <div>
          <h2>Get in touch</h2>
          <ul class="footer__contact">
            <li><span class="label">Phone</span>
              <a href="tel:${CFG.PHONE_HREF}" data-site="phone-link"><span data-site="phone">${CFG.PHONE_DISPLAY}</span></a></li>
            <li><span class="label">Email</span>
              <a href="mailto:${CFG.EMAIL}" data-site="email-link"><span data-site="email">${CFG.EMAIL}</span></a></li>
            <li><span class="label">Area</span>
              <span data-site="address">${CFG.ADDRESS_SHORT}</span></li>
            <li><span class="label">Hours</span>
              <span data-site="hours">${CFG.HOURS_DISPLAY}</span></li>
          </ul>
        </div>
      </div>

      <div class="footer__bottom">
        <p>&copy; <span data-year>2026</span> <span data-site="business">${esc(CFG.BUSINESS_NAME)}</span>. All rights reserved.</p>
        <p>Massage and heat therapy are wellness services, not medical treatment.</p>
      </div>
    </div>
  </footer>

  <div class="call-bar">
    <a href="tel:${CFG.PHONE_HREF}" data-site="phone-link">Call now</a>
    <a href="/contact.html">Enquire</a>
  </div>

</body>
</html>
`;
}

module.exports = {
  CFG, esc, LOCATIONS, MAIN_NAV,
  head, header, footer, breadcrumb, ctaBand, contactStrip, faqBlock, logoSVG
};
