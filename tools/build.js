/* ==========================================================================
   build.js — emits the static site
   --------------------------------------------------------------------------
   Run:  node tools/build.js

   Writes the nine indexable pages, 404.html, sitemap.xml, robots.txt and
   site.webmanifest into the project root. The output is plain static HTML
   with no runtime dependency on Node — this script exists only so the
   header, footer, meta tags and internal links stay identical across every
   page, which is what keeps the technical SEO audit clean.
   ========================================================================== */

'use strict';

const fs = require('fs');
const path = require('path');

const { CFG, head, header, footer } = require('./partials');

const ROOT = path.join(__dirname, '..');

/* ------------------------------------------------------------------------
   Page set
   ------------------------------------------------------------------------ */
const PAGES = [
  require('./page-home'),
  require('./page-about'),
  require('./page-services'),
  require('./page-gallery'),
  require('./page-contact'),
  ...require('./page-locations'),
  require('./page-404')
];

/* Indexable pages only — 404 is excluded from the sitemap by design. */
const INDEXABLE = PAGES.filter((p) => !p.noindex);

/* ------------------------------------------------------------------------
   Render
   ------------------------------------------------------------------------ */

/* Templates are authored with root-relative paths ("/css/style.css") because
   that reads clearly. Here they are rewritten to document-relative paths
   ("css/style.css") before the file is written.

   Why: root-relative paths only resolve when the site is served FROM the
   domain root. Open the folder with Live Server pointed a level too high, or
   from a project subfolder on a shared host, and every stylesheet, image and
   link 404s. Document-relative paths work in both cases.

   This is safe because every page in this site is flat — index.html,
   about.html, services.html and the four location pages all sit at the same
   depth — so "css/style.css" resolves identically from every one of them.

   Absolute URLs (canonical, og:url, JSON-LD) are untouched: the pattern only
   matches a slash immediately after the opening quote, so "https://…" and
   "#anchor", "tel:", "mailto:" are all left alone. */
function toRelativePaths(html) {
  return html
    /* href="/" is the homepage link — becomes an explicit filename */
    .replace(/\b(href)="\/"/g, '$1="index.html"')
    /* "/css/style.css" -> "css/style.css", but never "//cdn…" */
    .replace(/\b(href|src)="\/(?!\/)/g, '$1="');
}

function render(page) {
  return toRelativePaths(head(page) + header(page) + page.body + footer());
}

function writeFile(name, contents) {
  fs.writeFileSync(path.join(ROOT, name), contents, 'utf8');
  const kb = (Buffer.byteLength(contents, 'utf8') / 1024).toFixed(1);
  console.log(`  ✓ ${name.padEnd(34)} ${kb.padStart(7)} KB`);
}

/* ------------------------------------------------------------------------
   sitemap.xml
   Only canonical, indexable, existing URLs. No parameters, no anchors,
   no 404, no duplicates. lastmod is the real build date.
   ------------------------------------------------------------------------ */
function buildSitemap() {
  const today = new Date().toISOString().slice(0, 10);

  const urls = INDEXABLE.map((p) => {
    const loc = `${CFG.SITE_URL}/${p.file === 'index.html' ? '' : p.file}`;
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<!-- Canonical, indexable URLs only. priority and changefreq are deliberately
     omitted: Google ignores them, and setting them is cargo cult. -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

/* ------------------------------------------------------------------------
   robots.txt
   ------------------------------------------------------------------------ */
function buildRobots() {
  return `# robots.txt — ${CFG.BUSINESS_NAME}
# Everything is crawlable. CSS, JS and images are deliberately NOT blocked:
# Google needs them to render and assess the page for mobile usability.

User-agent: *
Allow: /

Sitemap: ${CFG.SITE_URL}/sitemap.xml
`;
}

/* ------------------------------------------------------------------------
   site.webmanifest
   ------------------------------------------------------------------------ */
function buildManifest() {
  return JSON.stringify({
    name: `${CFG.BUSINESS_NAME} — ${CFG.TAGLINE}`,
    short_name: CFG.BUSINESS_NAME,
    description:
      'Russian banya and massage therapy in Mahipalpur, New Delhi. Traditional birch-venik banya, ' +
      'deep tissue, couples and Ayurvedic treatments in private rooms, open 24 hours.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#F7F3EA',
    theme_color: '#0B201C',
    lang: 'en-IN',
    dir: 'ltr',
    categories: ['health', 'lifestyle'],
    icons: [
      { src: '/assets/brand-assets/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/assets/brand-assets/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/assets/brand-assets/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
    ]
  }, null, 2) + '\n';
}

/* ------------------------------------------------------------------------
   Go
   ------------------------------------------------------------------------ */
console.log('\nBuilding static site…\n');

PAGES.forEach((page) => writeFile(page.file, render(page)));

console.log('');
writeFile('sitemap.xml', buildSitemap());
writeFile('robots.txt', buildRobots());
writeFile('site.webmanifest', buildManifest());

console.log(`\nDone — ${PAGES.length} pages (${INDEXABLE.length} indexable) + 3 SEO files.\n`);
