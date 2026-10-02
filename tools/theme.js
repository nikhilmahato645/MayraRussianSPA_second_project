/* ==========================================================================
   theme.js — shared chrome for the blush/square theme
   --------------------------------------------------------------------------
   The home, about, services, gallery and contact pages are all rendered
   through shell() below, so the header, drawer, footer, icons and booking
   links exist in exactly ONE place. The four location pages and 404 still go
   through partials.js and css/style.css.

   IDENTITY: no brand name is used anywhere. SPA_NAME is purely descriptive
   and exists only because schema.org, Open Graph and the browser tab each
   need *a* name — Google will not attach a LocalBusiness entity to a blank
   one.

   CONTENT RULE: every figure traces back to data.js or js/site-config.js.
   Not published anywhere on these pages, because none of it is verified for
   this business: years in business, branch counts, "happy clients" counters,
   named therapist profiles, star ratings, review counts, testimonials and
   discount banners.
   ========================================================================== */

'use strict';

const { CFG, esc } = require('./partials');

const SPA_NAME = 'Russian Spa Mahipalpur';

/* --------------------------------------------------------------------------
   BOOKING LINKS
   -------------------------------------------------------------------------- */
const WA = CFG.WHATSAPP;
const wa = (msg) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
const WA_GENERAL = wa('Hello, I would like to book a session at your Mahipalpur spa.');

/* --------------------------------------------------------------------------
   ICONS
   --------------------------------------------------------------------------
   Defined ONCE in a hidden sprite at the top of <body> and referenced with
   <use>. The WhatsApp mark alone appears a dozen-plus times per page; inlining
   each copy cost ~16 KB of duplicate path data on the home page alone.
   -------------------------------------------------------------------------- */
const SPRITE = `  <svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>
    <symbol id="i-wa" viewBox="0 0 24 24"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.87.85-.87 2.07s.89 2.4 1.02 2.56c.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.29Z"/></symbol>
    <symbol id="i-tel" viewBox="0 0 24 24"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z"/></symbol>
    <symbol id="i-mail" viewBox="0 0 24 24"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5-8-5V6l8 5 8-5Z"/></symbol>
    <symbol id="i-clock" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 10.6V6h-2v7.4l5.2 3.1 1-1.7-4.2-2.2Z"/></symbol>
    <symbol id="i-close" viewBox="0 0 24 24"><path d="M6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12 19 6.4 17.6 5 12 10.6Z"/></symbol>
    <symbol id="i-pin" viewBox="0 0 24 24"><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 14.5 9 2.5 2.5 0 0 1 12 11.5Z"/></symbol>
  </defs></svg>`;

const ico = (n) => `<svg class="ico" aria-hidden="true" focusable="false"><use href="#i-${n}"/></svg>`;
const waIcon = ico('wa');
const telIcon = ico('tel');
const mailIcon = ico('mail');
const clockIcon = ico('clock');

/* --------------------------------------------------------------------------
   WORDMARK — inline SVG: ~700 bytes, no request, sharp at any size, and it
   recolours with currentColor for the dark footer. `sub` overrides the
   subline colour, which needs to be lighter on the plum footer.
   -------------------------------------------------------------------------- */
const wordmark = (id, sub) => `<svg viewBox="0 0 230 50" width="230" height="50" role="img" aria-label="Russian spa in Mahipalpur and Aerocity, New Delhi" focusable="false">
          <defs>
            <linearGradient id="wm-${id}" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stop-color="#E8A6BC"/><stop offset="1" stop-color="#B85574"/>
            </linearGradient>
          </defs>
          <path fill="url(#wm-${id})" d="M18 5c0 5.2-2.8 8.3-6 10.4 3.2 2.1 6 5.2 6 10.4-5.2 0-8.3-2.8-10.4-6-2.1 3.2-5.2 6-10.4 6 0-5.2 2.8-8.3 6-10.4-3.2-2.1-6-5.2-6-10.4 5.2 0 8.3 2.8 10.4 6C9.7 7.8 12.8 5 18 5Z" transform="translate(6,9) scale(.82)"/>
          <text x="42" y="24" font-family="Georgia, serif" font-size="18" letter-spacing=".4" fill="currentColor">Russian Spa</text>
          <text x="42" y="39" font-family="Helvetica, Arial, sans-serif" font-size="8.5" letter-spacing="2.4" fill="${sub || '#B85574'}">MAHIPALPUR &#183; AEROCITY</text>
        </svg>`;

/* --------------------------------------------------------------------------
   NAVIGATION MODEL — one source for header, drawer and footer
   -------------------------------------------------------------------------- */
const LOCATIONS = [
  { file: 'russian-spa-in-mahipalpur.html', label: 'Spa in Mahipalpur', short: 'Mahipalpur' },
  { file: 'russian-spa-in-aerocity.html',   label: 'Spa in Aerocity',   short: 'Aerocity' },
  { file: 'russian-spa-in-gurgaon.html',    label: 'Spa in Gurgaon',    short: 'Gurgaon' },
  { file: 'russian-spa-in-new-delhi.html',  label: 'Spa in New Delhi',  short: 'New Delhi' }
];

const MAIN_NAV = [
  { file: 'index.html',    label: 'Home' },
  { file: 'about.html',    label: 'About Us' },
  { file: 'services.html', label: 'Our Services' },
  { file: 'gallery.html',  label: 'Gallery' }
];

const href = (file) => (file === 'index.html' ? '/' : '/' + file);

/* --------------------------------------------------------------------------
   REUSABLE BLOCKS
   -------------------------------------------------------------------------- */
function breadcrumb(trail) {
  const items = trail.map((t, i) => (i === trail.length - 1
    ? `          <li><span aria-current="page">${esc(t.label)}</span></li>`
    : `          <li><a href="${t.href}">${esc(t.label)}</a></li>`)).join('\n');
  return `        <nav class="crumb" aria-label="Breadcrumb">
          <ol>
${items}
          </ol>
        </nav>`;
}

/* FAQ answers stay in the DOM when collapsed, so crawlers read them and they
   match the FAQPage structured data. A mismatch there is a manual-action risk.
   The open state lives on .faq__item, not the button: the button sits inside
   its <h3>, so no `+` selector can reach the answer from it. */
function faqBlock(items, prefix) {
  return items.map((f, i) => {
    const id = `${prefix}-faq-${i + 1}`;
    return `          <div class="faq__item">
            <h3 style="margin:0">
              <button class="faq__q" type="button" aria-expanded="false" aria-controls="${id}">
                ${esc(f.q)}<span class="plus" aria-hidden="true"></span>
              </button>
            </h3>
            <div class="faq__a" id="${id}">
              <div>
${f.a.map((p) => `                <p>${p}</p>`).join('\n')}
              </div>
            </div>
          </div>`;
  }).join('\n');
}

function ctaBand({ heading, body, note }) {
  return `    <section class="section section--blush">
      <div class="wrap">
        <div class="cta" data-reveal>
          <h2>${heading}</h2>
          <p>${body}</p>
          <div class="btn-row">
            <a class="btn btn--wa" href="${WA_GENERAL}" rel="noopener" target="_blank">${waIcon} Chat on WhatsApp</a>
            <a class="btn btn--outline" href="/contact.html">Send an enquiry</a>
          </div>
          <p class="note">${note || 'Massage and heat therapy are wellness services, not medical treatment.'}</p>
        </div>
      </div>
    </section>`;
}

function napBlock() {
  return `        <div class="nap" data-reveal>
          <div><h3>Phone</h3><p><a href="tel:${CFG.PHONE_HREF}">${CFG.PHONE_DISPLAY}</a></p></div>
          <div><h3>Where we are</h3><p>${CFG.ADDRESS_SHORT}</p></div>
          <div><h3>Hours</h3><p>${CFG.HOURS_DISPLAY}</p></div>
        </div>`;
}

/* Page banner used by every page except the home page. */
function pageHero({ eyebrow, h1, lead, trail, image, alt, w, h }) {
  return `    <section class="phero">
      <div class="phero__bg" aria-hidden="true">
        <img src="/${image}" alt="" width="${w}" height="${h}" fetchpriority="high" decoding="async">
      </div>
      <div class="wrap">
${breadcrumb(trail)}
        <div class="phero__inner">
          <span class="eyebrow">${esc(eyebrow)}</span>
          <h1>${h1}</h1>
          <p class="phero__lead">${lead}</p>
        </div>
      </div>
    </section>`;
}

/* --------------------------------------------------------------------------
   STRUCTURED DATA
   --------------------------------------------------------------------------
   Deliberately absent, because unverified: aggregateRating, review, geo
   coordinates, a street address line, awards and certifications. Fabricated
   trust signals are the fastest way to lose a rich result permanently.
   -------------------------------------------------------------------------- */
const abs = (p) => `${CFG.SITE_URL}/${p}`;

function localBusiness(services) {
  const node = {
    '@type': ['DaySpa', 'HealthAndBeautyBusiness'],
    '@id': `${CFG.SITE_URL}/#spa`,
    name: SPA_NAME,
    description:
      'Russian banya and body massage spa in Mahipalpur, New Delhi, serving Aerocity, Gurgaon and the ' +
      'wider Delhi NCR. Private treatment rooms, male and female therapists, open 24 hours.',
    url: `${CFG.SITE_URL}/`,
    telephone: CFG.PHONE_DISPLAY,
    email: CFG.EMAIL,
    image: abs('assets/spa/hero-spa-massage-mahipalpur.jpg'),
    priceRange: '₹1,500–₹8,000',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, Credit Card, Debit Card, UPI',
    address: {
      '@type': 'PostalAddress',
      addressLocality: CFG.LOCALITY,
      addressRegion: CFG.REGION,
      postalCode: CFG.POSTAL_CODE,
      addressCountry: CFG.COUNTRY
    },
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59'
    }],
    areaServed: ['Mahipalpur', 'Aerocity', 'Gurgaon', 'New Delhi', 'Delhi NCR']
      .map((name) => ({ '@type': 'Place', name }))
  };

  /* Only the services page carries the full catalogue — repeating it on every
     page adds bytes without adding meaning. */
  if (services) {
    node.hasOfferCatalog = {
      '@type': 'OfferCatalog',
      name: 'Spa and body massage treatments',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.name },
        price: s.price,
        priceCurrency: 'INR',
        url: `${CFG.SITE_URL}/services.html#${s.slug}`
      }))
    };
  }
  return node;
}

function graph(page) {
  const url = `${CFG.SITE_URL}/${page.file === 'index.html' ? '' : page.file}`;
  const nodes = [
    localBusiness(page.offerCatalog),
    {
      '@type': 'WebSite',
      '@id': `${CFG.SITE_URL}/#website`,
      url: `${CFG.SITE_URL}/`,
      name: SPA_NAME,
      inLanguage: 'en-IN',
      publisher: { '@id': `${CFG.SITE_URL}/#spa` }
    },
    {
      '@type': page.pageType || 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: page.title,
      description: page.description,
      isPartOf: { '@id': `${CFG.SITE_URL}/#website` },
      about: { '@id': `${CFG.SITE_URL}/#spa` },
      primaryImageOfPage: abs(page.ogImage)
    }
  ];

  if (page.trail && page.trail.length > 1) {
    nodes.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: page.trail.map((t, i) => {
        const item = { '@type': 'ListItem', position: i + 1, name: t.label };
        if (t.href) item.item = t.href === '/' ? `${CFG.SITE_URL}/` : `${CFG.SITE_URL}${t.href}`;
        return item;
      })
    });
  }

  if (page.faqs && page.faqs.length) {
    nodes.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: page.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a.join(' ').replace(/<[^>]+>/g, '') }
      }))
    });
  }

  (page.extraSchema || []).forEach((n) => nodes.push(n));

  return { '@context': 'https://schema.org', '@graph': nodes };
}

/* ==========================================================================
   DOCUMENT SHELL
   ========================================================================== */
function shell(page) {
  const url = `${CFG.SITE_URL}/${page.file === 'index.html' ? '' : page.file}`;
  const cur = (file) => (page.file === file ? ' aria-current="page"' : '');
  const inLocations = LOCATIONS.some((l) => l.file === page.file);

  const navItems = MAIN_NAV
    .map((i) => `          <li><a class="nav__link" href="${href(i.file)}"${cur(i.file)}>${i.label}</a></li>`)
    .join('\n');
  const drawerItems = MAIN_NAV
    .map((i) => `        <li><a class="drawer__link" href="${href(i.file)}"${cur(i.file)}>${i.label}</a></li>`)
    .join('\n');
  const locItems = (pad) => LOCATIONS
    .map((l) => `${pad}<li><a href="/${l.file}"${cur(l.file)}>${l.label}</a></li>`).join('\n');

  /* Minified: indentation in JSON-LD is kilobytes of whitespace no crawler
     reads and every visitor downloads. Inspect with the Rich Results Test. */
  const jsonLd = JSON.stringify(graph(page));

  return `<!doctype html>
<html lang="en-IN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>${esc(page.title)}</title>
  <meta name="description" content="${esc(page.description)}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <link rel="canonical" href="${url}">

  <meta name="geo.region" content="IN-DL">
  <meta name="geo.placename" content="Mahipalpur, New Delhi">

  <!-- Marks that scripting is available BEFORE the stylesheet is applied, so
       collapsible content renders closed with no flash. Without JS the class
       is never added and those sections stay open and readable. -->
  <script>document.documentElement.className = 'js';</script>

  <link rel="preload" as="image" href="/${page.heroImage || page.ogImage}" fetchpriority="high">
  <link rel="stylesheet" href="/css/theme.css">
  <script src="/js/theme.js" defer></script>

  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${esc(SPA_NAME)}">
  <meta property="og:locale" content="en_IN">
  <meta property="og:title" content="${esc(page.ogTitle || page.title)}">
  <meta property="og:description" content="${esc(page.description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${abs(page.ogImage)}">
  <meta property="og:image:alt" content="${esc(page.ogImageAlt)}">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(page.ogTitle || page.title)}">
  <meta name="twitter:description" content="${esc(page.description)}">
  <meta name="twitter:image" content="${abs(page.ogImage)}">

  <link rel="icon" href="/assets/brand-assets/favicon.ico" sizes="any">
  <link rel="icon" href="/assets/brand-assets/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/assets/brand-assets/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  <meta name="theme-color" content="#371E27">

  <script type="application/ld+json">${jsonLd}</script>
</head>
<body>
${SPRITE}

  <a class="skip-link" href="#main-content">Skip to content</a>
  <div id="top-sentinel" aria-hidden="true"></div>

  <div class="topbar">
    <div class="wrap topbar__inner">
      <div class="topbar__links">
        <a href="tel:${CFG.PHONE_HREF}">${telIcon} ${CFG.PHONE_DISPLAY}</a>
        <a href="mailto:${CFG.EMAIL}">${mailIcon} ${CFG.EMAIL}</a>
      </div>
      <span class="topbar__hours">${clockIcon}&nbsp; ${CFG.HOURS_DISPLAY} · ${CFG.ADDRESS_SHORT}</span>
    </div>
  </div>

  <header class="header">
    <div class="wrap header__inner">
      <a class="brand" href="/" aria-label="Russian spa in Mahipalpur and Aerocity — home">
        ${wordmark('hdr')}
      </a>

      <nav class="nav" aria-label="Primary">
        <ul class="nav__list">
${navItems}
          <li class="nav__item">
            <button class="nav__link nav__toggle" type="button" aria-expanded="false" aria-controls="loc-menu"${inLocations ? ' aria-current="page"' : ''}>
              Locations <span class="chev" aria-hidden="true"></span>
            </button>
            <ul class="nav__menu" id="loc-menu">
${locItems('              ')}
            </ul>
          </li>
          <li><a class="nav__link" href="/contact.html"${cur('contact.html')}>Contact Us</a></li>
        </ul>
      </nav>

      <a class="btn btn--wa header__cta" href="${WA_GENERAL}" rel="noopener" target="_blank">${waIcon} Book Now</a>

      <button class="nav-trigger" type="button" aria-expanded="false" aria-controls="mobile-drawer" aria-label="Open menu">
        <span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span>
      </button>
    </div>
  </header>

  <div class="drawer" id="mobile-drawer">
    <div class="drawer__top">
      <a class="brand" href="/" aria-label="Russian spa in Mahipalpur and Aerocity — home">
        ${wordmark('drw')}
      </a>
      <button class="drawer__close" type="button" data-close-drawer aria-label="Close menu">
        ${ico('close')}
      </button>
    </div>

    <nav aria-label="Mobile">
      <ul class="drawer__list">
${drawerItems}
        <li>
          <button class="drawer__link" type="button" aria-expanded="false" aria-controls="drawer-loc">
            Locations <span class="chev" aria-hidden="true"></span>
          </button>
          <div class="drawer__sub" id="drawer-loc">
            <div><ul>
${locItems('              ')}
            </ul></div>
          </div>
        </li>
        <li><a class="drawer__link" href="/contact.html"${cur('contact.html')}>Contact Us</a></li>
      </ul>
    </nav>

    <div class="drawer__foot">
      <a class="btn btn--wa btn--block" href="${WA_GENERAL}" rel="noopener" target="_blank">${waIcon} Book on WhatsApp</a>
      <a class="btn btn--outline btn--block" href="tel:${CFG.PHONE_HREF}">${telIcon} Call ${CFG.PHONE_DISPLAY}</a>
      <p>${CFG.HOURS_DISPLAY} · ${CFG.ADDRESS_SHORT}</p>
    </div>
  </div>

${page.body}

  <footer class="footer">
    <div class="wrap">
      <div class="footer__grid">
        <div class="footer__brand">
          ${wordmark('ftr', '#E8A6BC')}
          <p>
            Traditional Russian banya, deep tissue bodywork and full body massage in private rooms in Mahipalpur,
            New Delhi — on the airport corridor, open around the clock.
          </p>
        </div>

        <nav aria-labelledby="f-explore">
          <h2 id="f-explore">Quick Links</h2>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about.html">About Us</a></li>
            <li><a href="/services.html">Our Services</a></li>
            <li><a href="/gallery.html">Gallery</a></li>
            <li><a href="/contact.html">Contact Us</a></li>
          </ul>
        </nav>

        <nav aria-labelledby="f-loc">
          <h2 id="f-loc">Areas</h2>
          <ul>
${locItems('            ')}
          </ul>
        </nav>

        <div>
          <h2>Get in Touch</h2>
          <ul class="footer__contact">
            <li><span class="label">Phone</span><a href="tel:${CFG.PHONE_HREF}">${CFG.PHONE_DISPLAY}</a></li>
            <li><span class="label">WhatsApp</span><a href="${WA_GENERAL}" rel="noopener" target="_blank">${CFG.PHONE_DISPLAY}</a></li>
            <li><span class="label">Email</span><a href="mailto:${CFG.EMAIL}">${CFG.EMAIL}</a></li>
            <li><span class="label">Area</span>${CFG.ADDRESS_SHORT}</li>
            <li><span class="label">Hours</span>${CFG.HOURS_DISPLAY}</li>
          </ul>
        </div>
      </div>

      <div class="footer__bottom">
        <p>&copy; <span data-year>${new Date().getFullYear()}</span> Russian Spa, Mahipalpur. All rights reserved.</p>
        <p>Massage and heat therapy are wellness services, not medical treatment.</p>
      </div>
    </div>
  </footer>

  <a class="fab" href="${WA_GENERAL}" rel="noopener" target="_blank" aria-label="Chat with us on WhatsApp">${waIcon}</a>

  <div class="call-bar">
    <a class="wa" href="${WA_GENERAL}" rel="noopener" target="_blank">${waIcon} WhatsApp</a>
    <a class="tel" href="tel:${CFG.PHONE_HREF}">${telIcon} Call now</a>
  </div>

</body>
</html>
`;
}

module.exports = {
  CFG, esc, SPA_NAME, abs,
  wa, WA_GENERAL, ico, waIcon, telIcon, mailIcon, clockIcon,
  wordmark, LOCATIONS, MAIN_NAV,
  breadcrumb, faqBlock, ctaBand, napBlock, pageHero, shell
};
