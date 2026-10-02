/* ==========================================================================
   audit.js — technical SEO / accessibility / link check
   --------------------------------------------------------------------------
   Run:  node tools/audit.js

   Checks the BUILT html in the project root, not the templates. Exits with
   code 1 if anything fails, so it can gate a deploy.
   ========================================================================== */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
/* Read the domain from the single source of truth rather than repeating it.
   Hard-coding it here meant the audit failed every page the moment the real
   domain was set — reporting the config change as 28 broken canonicals. */
const { CFG } = require('./partials');
const SITE_URL = CFG.SITE_URL;

const HTML = fs.readdirSync(ROOT).filter((f) => f.endsWith('.html')).sort();

let pass = 0;
const fails = [];
const warns = [];

const ok   = (msg) => { pass++; };
const fail = (file, msg) => fails.push(`${file}: ${msg}`);
const warn = (file, msg) => warns.push(`${file}: ${msg}`);

const all = (re, s) => Array.from(s.matchAll(re));

/* Titles and descriptions are stored escaped; measure what a SERP would show. */
const decode = (s) => String(s)
  .replace(/&amp;/g, "&").replace(/&lt;/g, "<")
  .replace(/&gt;/g, ">").replace(/&quot;/g, '"');
const one = (re, s) => { const m = s.match(re); return m ? m[1] : null; };

const titles = new Map();
const descs = new Map();

/* ------------------------------------------------------------------------
   Per-page checks
   ------------------------------------------------------------------------ */
HTML.forEach((file) => {
  const src = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const noindex = /<meta name="robots" content="noindex/.test(src);

  /* --- Document basics ------------------------------------------------- */
  /^<!doctype html>/i.test(src) ? ok() : fail(file, 'missing <!doctype html>');
  /* "en" or a region subtag such as "en-IN" — both are valid, and en-IN is
     the better signal for a Delhi business. */
  /<html lang="en(-[A-Za-z]{2})?"/.test(src) ? ok() : fail(file, 'missing <html lang="en">');
  /<meta charset="UTF-8">/i.test(src) ? ok() : fail(file, 'missing charset');
  /<meta name="viewport"[^>]*width=device-width/.test(src) ? ok() : fail(file, 'missing viewport meta');

  /* --- Exactly one H1 --------------------------------------------------- */
  const h1s = all(/<h1[\s>]/g, src).length;
  h1s === 1 ? ok() : fail(file, `expected exactly 1 <h1>, found ${h1s}`);

  /* --- Heading order (no skipped levels) -------------------------------- */
  const levels = all(/<h([1-4])[\s>]/g, src).map((m) => Number(m[1]));
  let prev = 0, skipped = null;
  levels.forEach((l) => {
    if (prev && l > prev + 1) skipped = `h${prev} -> h${l}`;
    prev = l;
  });
  skipped ? warn(file, `heading level skipped (${skipped})`) : ok();

  /* --- Title ------------------------------------------------------------ */
  const title = one(/<title>([^<]+)<\/title>/, src);
  if (!title) fail(file, 'missing <title>');
  else {
    if (titles.has(title)) fail(file, `duplicate <title> (also in ${titles.get(title)})`);
    else { titles.set(title, file); ok(); }
    if (decode(title).length > 60) warn(file, `title is ${decode(title).length} chars (may truncate in SERPs)`);
  }

  /* --- Meta description -------------------------------------------------- */
  const desc = one(/<meta name="description" content="([^"]+)">/, src);
  if (!desc) fail(file, 'missing meta description');
  else {
    if (descs.has(desc)) fail(file, `duplicate meta description (also in ${descs.get(desc)})`);
    else { descs.set(desc, file); ok(); }
    if (decode(desc).length > 160) warn(file, `meta description is ${decode(desc).length} chars (over 160)`);
    if (decode(desc).length < 70) warn(file, `meta description is only ${decode(desc).length} chars`);
  }

  /* --- Canonical --------------------------------------------------------- */
  const canonical = one(/<link rel="canonical" href="([^"]+)">/, src);
  if (noindex) {
    canonical ? warn(file, 'noindex page carries a canonical') : ok();
  } else if (!canonical) {
    fail(file, 'missing canonical');
  } else {
    const expected = `${SITE_URL}/${file === 'index.html' ? '' : file}`;
    canonical === expected ? ok() : fail(file, `canonical mismatch: ${canonical} !== ${expected}`);
    canonical.startsWith('https://') ? ok() : fail(file, 'canonical is not https');
  }

  /* --- Robots meta ------------------------------------------------------- */
  /<meta name="robots"/.test(src) ? ok() : fail(file, 'missing robots meta');
  if (!noindex && /noindex/.test(src)) fail(file, 'unexpected noindex on an indexable page');

  /* --- Open Graph & Twitter ---------------------------------------------- */
  ['og:type', 'og:title', 'og:description', 'og:url', 'og:image', 'og:site_name']
    .forEach((p) => {
      new RegExp(`<meta property="${p}" content="[^"]+">`).test(src)
        ? ok() : fail(file, `missing ${p}`);
    });
  ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image']
    .forEach((p) => {
      new RegExp(`<meta name="${p}" content="[^"]+">`).test(src)
        ? ok() : fail(file, `missing ${p}`);
    });

  /* --- JSON-LD validity --------------------------------------------------- */
  all(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g, src).forEach((m, i) => {
    try {
      const parsed = JSON.parse(m[1]);
      /* A block may declare one @type, or several entities under @graph. */
      const typed = parsed['@type'] || Array.isArray(parsed['@graph']);
      if (!parsed['@context'] || !typed) fail(file, `JSON-LD #${i + 1} missing @context/@type`);
      else ok();
      /* Guard against the fabricated-trust properties we agreed to omit */
      const flat = JSON.stringify(parsed);
      ['aggregateRating', 'ratingValue', 'reviewCount', '"review"', 'award']
        .forEach((bad) => {
          if (flat.includes(bad)) fail(file, `JSON-LD contains unverifiable property ${bad}`);
        });
    } catch (e) {
      fail(file, `JSON-LD #${i + 1} is not valid JSON: ${e.message}`);
    }
  });

  /* --- Images ------------------------------------------------------------- */
  all(/<img\b[^>]*>/g, src).forEach((m) => {
    const tag = m[0];
    const srcAttr = one(/src="([^"]*)"/, tag);

    if (!/alt="/.test(tag)) fail(file, `img without alt: ${tag.slice(0, 80)}`);
    else ok();

    /* The lightbox <img> is populated at runtime, so an empty src is expected */
    if (tag.includes('lightbox__img')) return;

    if (!/width="\d+"/.test(tag) || !/height="\d+"/.test(tag)) {
      fail(file, `img missing width/height (CLS risk): ${srcAttr}`);
    } else ok();

    if (srcAttr && !/^(https?:|data:)/.test(srcAttr)) {
      if (srcAttr.startsWith("/")) fail(file, `image uses a root-relative path: ${srcAttr}`);
      else fs.existsSync(path.join(ROOT, srcAttr))
        ? ok() : fail(file, `broken image path: ${srcAttr}`);
    }
  });

  /* --- Internal links ----------------------------------------------------- */
  all(/<a\b[^>]*href="([^"]+)"/g, src).forEach((m) => {
    const href = m[1];

    if (href === '#') { fail(file, 'placeholder href="#" found'); return; }
    if (/localhost|127\.0\.0\.1|file:\/\//.test(href)) { fail(file, `local link leaked: ${href}`); return; }
    if (/^(mailto:|tel:|https?:)/.test(href)) { ok(); return; }
    if (href.startsWith('#')) { /* same-page anchor */ ok(); return; }

    const [p, hash] = href.split('#');
    const target = p === '/' ? 'index.html' : p.replace(/^\//, '');

    if (!fs.existsSync(path.join(ROOT, target))) {
      fail(file, `broken internal link: ${href}`);
      return;
    }
    ok();

    /* Verify the fragment exists on the target page */
    if (hash) {
      const targetSrc = fs.readFileSync(path.join(ROOT, target), 'utf8');
      if (!targetSrc.includes(`id="${hash}"`)) warn(file, `link to missing anchor: ${href}`);
    }
  });

  /* --- Accessibility spot-checks ------------------------------------------ */
  /class="skip-link"/.test(src) ? ok() : fail(file, 'missing skip-to-content link');
  /id="main-content"/.test(src) ? ok() : fail(file, 'missing #main-content target');
  /<main\b/.test(src) ? ok() : fail(file, 'missing <main>');
  /<footer\b/.test(src) ? ok() : fail(file, 'missing <footer>');

  all(/<button\b[^>]*>/g, src).forEach((m) => {
    const tag = m[0];
    if (/aria-expanded/.test(tag) && !/aria-controls/.test(tag)) {
      warn(file, 'button has aria-expanded without aria-controls');
    }
  });

  /* --- Performance hygiene -------------------------------------------------- */
  /* What actually costs the visitor is an EXTERNAL script without defer or
     async: it blocks the parser on a network round trip. A very small inline
     script is a legitimate tool — setting html.js before the stylesheet is
     applied, so the FAQ does not flash open — and costs microseconds. So
     inline is allowed up to 300 bytes and flagged above that. */
  const blockingExternal = all(/<script\b[^>]*\bsrc=[^>]*>/g, src)
    .filter((m) => !/\bdefer\b|\basync\b/.test(m[0]));
  const bigInline = all(/<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g, src)
    .filter((m) => !/application\/ld\+json/.test(m[0]))
    .filter((m) => m[1].trim().length > 300);

  if (blockingExternal.length || bigInline.length) {
    fail(file, 'found a render-blocking script');
  } else ok();

  const eagerHero = all(/<img\b[^>]*fetchpriority="high"[^>]*>/g, src).length;
  if (!noindex && eagerHero === 0) warn(file, 'no LCP image marked fetchpriority="high"');
  if (eagerHero > 1) warn(file, `${eagerHero} images marked fetchpriority="high" (should be 1)`);
});

/* ------------------------------------------------------------------------
   sitemap.xml
   ------------------------------------------------------------------------ */
const sitemap = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
const locs = all(/<loc>([^<]+)<\/loc>/g, sitemap).map((m) => m[1]);

/<\?xml version="1\.0" encoding="UTF-8"\?>/.test(sitemap) ? ok() : fail('sitemap.xml', 'missing XML declaration');
/xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9"/.test(sitemap)
  ? ok() : fail('sitemap.xml', 'wrong or missing sitemap namespace');

new Set(locs).size === locs.length ? ok() : fail('sitemap.xml', 'contains duplicate URLs');

locs.forEach((loc) => {
  if (!loc.startsWith('https://')) fail('sitemap.xml', `non-https URL: ${loc}`);
  if (loc.includes('?') || loc.includes('#')) fail('sitemap.xml', `URL has parameter or anchor: ${loc}`);

  const rel = loc.replace(SITE_URL, '').replace(/^\//, '') || 'index.html';
  if (!fs.existsSync(path.join(ROOT, rel))) fail('sitemap.xml', `URL has no matching file: ${loc}`);
  else ok();
});

if (locs.some((l) => l.endsWith('404.html'))) fail('sitemap.xml', '404.html must not be listed');
else ok();

/* Every indexable page must appear exactly once */
HTML.filter((f) => {
  const s = fs.readFileSync(path.join(ROOT, f), 'utf8');
  return !/content="noindex/.test(s);
}).forEach((f) => {
  const expected = `${SITE_URL}/${f === 'index.html' ? '' : f}`;
  locs.includes(expected) ? ok() : fail('sitemap.xml', `indexable page missing from sitemap: ${f}`);
});

/* ------------------------------------------------------------------------
   robots.txt
   ------------------------------------------------------------------------ */
const robots = fs.readFileSync(path.join(ROOT, 'robots.txt'), 'utf8');
/User-agent: \*/.test(robots) ? ok() : fail('robots.txt', 'missing User-agent');
robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`) ? ok() : fail('robots.txt', 'missing or wrong Sitemap line');
/Disallow:\s*\/\s*$/m.test(robots) ? fail('robots.txt', 'blocks the entire site') : ok();
/Disallow:.*(\.css|\.js|images|assets)/i.test(robots) ? fail('robots.txt', 'blocks CSS/JS/images') : ok();

/* ------------------------------------------------------------------------
   site.webmanifest
   ------------------------------------------------------------------------ */
try {
  const mf = JSON.parse(fs.readFileSync(path.join(ROOT, 'site.webmanifest'), 'utf8'));
  ok();
  ['name', 'short_name', 'start_url', 'display', 'icons'].forEach((k) => {
    mf[k] ? ok() : fail('site.webmanifest', `missing "${k}"`);
  });
  mf.icons.forEach((i) => {
    fs.existsSync(path.join(ROOT, i.src.slice(1)))
      ? ok() : fail('site.webmanifest', `icon file missing: ${i.src}`);
  });
} catch (e) {
  fail('site.webmanifest', `invalid JSON: ${e.message}`);
}

/* ------------------------------------------------------------------------
   Referenced assets that live outside <img> (icons, css, js)
   ------------------------------------------------------------------------ */
['css/style.css', 'js/main.js', 'js/site-config.js',
 'assets/brand-assets/favicon.ico', 'assets/brand-assets/favicon.svg',
 'assets/brand-assets/apple-touch-icon.png'].forEach((f) => {
  fs.existsSync(path.join(ROOT, f)) ? ok() : fail('assets', `missing referenced file: ${f}`);
});

/* ------------------------------------------------------------------------
   Report
   ------------------------------------------------------------------------ */
console.log(`\n${'='.repeat(64)}`);
console.log(`TECHNICAL AUDIT — ${HTML.length} pages`);
console.log('='.repeat(64));
console.log(`\n  Passed:   ${pass}`);
console.log(`  Warnings: ${warns.length}`);
console.log(`  Failures: ${fails.length}\n`);

if (warns.length) {
  console.log('WARNINGS');
  warns.forEach((w) => console.log(`  ! ${w}`));
  console.log('');
}

if (fails.length) {
  console.log('FAILURES');
  fails.forEach((f) => console.log(`  x ${f}`));
  console.log('');
  process.exit(1);
}

console.log('All checks passed.\n');
