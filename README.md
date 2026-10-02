# Mayra Russian Spa — static website

A nine-page SEO-first website built with plain HTML5, CSS3 and vanilla JavaScript.
No React, no Next.js, no Bootstrap, no Tailwind, no jQuery. No package manager and no
dependencies of any kind — not at runtime, not at build time.

---

## Quick start

```bash
node tools/serve.js
```

Then open **<http://localhost:8080>**. Pass a port to change it: `node tools/serve.js 3000`.

> **Do not open `index.html` by double-clicking it.** The site uses root-relative
> paths (`/css/style.css`), which do not resolve over `file://` — you would get an
> unstyled page with broken images and dead links. Always use a server.

Any static server works if you prefer one (the VS Code **Live Server** extension, for
instance). `tools/serve.js` is included so nothing has to be installed, and because it
returns a real **404 status** for unknown URLs, matching how production should behave.

### All commands

```bash
node tools/serve.js   # preview at localhost:8080
node tools/build.js   # regenerate all HTML + sitemap.xml + robots.txt + site.webmanifest
node tools/audit.js   # technical SEO / a11y / broken-link check (exits 1 on failure)
```

Node is used **only** as a build-time tool, and only ever with its own standard library.
There is no `package.json`, no lockfile and nothing to install — clone the folder and the
three commands above work. Nothing in `tools/` ships to production; the deployed site is
just the HTML, CSS, JS and assets in the project root.

---

## Where to change things

| You want to change… | Edit this |
| --- | --- |
| Phone, email, domain, social links, hours | `js/site-config.js` — **the single source of truth** |
| Colours, spacing, typography, animation | `css/style.css` (design tokens at the top) |
| Interaction behaviour | `js/main.js` |
| Services, prices, facilities | `tools/data.js` |
| Page copy | `tools/page-*.js` |
| Header, footer, nav, `<head>` meta | `tools/partials.js` |
| JSON-LD structured data | `tools/schema.js` |

After editing anything under `tools/` or `js/site-config.js`, run `node tools/build.js`.

### The config file

`js/site-config.js` is read in two places:

1. **At build time** — `tools/partials.js` evaluates it in a sandbox and writes the
   values directly into the HTML, so crawlers and no-JS visitors see real content.
2. **At runtime** — `main.js` syncs any element with a `data-site="..."` attribute.

That means the contact details can never drift between the config and the pages.
Change the number in one place, rebuild, done.

---

## Structure

```
/
├── index.html  about.html  services.html  contact.html  gallery.html
├── russian-spa-in-mahipalpur.html   russian-spa-in-aerocity.html
├── russian-spa-in-gurgaon.html      russian-spa-in-new-delhi.html
├── 404.html    sitemap.xml    robots.txt    site.webmanifest
│
├── css/style.css
├── js/site-config.js        ← edit contact details here
├── js/main.js
│
├── assets/
│   ├── brand-assets/        logo, favicons, PWA icons
│   ├── home-assets/         about-assets/    services-assets/
│   ├── gallery-assets/      contact-assets/
│   ├── mahipalpur-assets/   aerocity-assets/
│   └── gurgaon-assets/      new-delhi-assets/
│
└── tools/                   build-time only — not deployed
```

---

## Animation components

The React Bits effects were requested, but React Bits ships React components and
this is a no-framework build. Each effect was therefore re-implemented in vanilla
JS + CSS, driven by `IntersectionObserver` and pointer events:

| React Bits | Here | Used on |
| --- | --- | --- |
| Split Text | `.split-text` | every `<h1>` |
| Blur Text | `.blur-text` | section headings |
| Animated Content | `[data-reveal]` (+ `data-reveal-delay`) | site-wide |
| Count Up | `.count-up` (`data-count`) | homepage stats |
| Spotlight Card | `.spotlight` | service cards |
| Tilted Card | `.tilt` (`data-tilt`) | location cards |
| Magnet | `.magnetic` (`data-magnet`) | primary buttons |
| Click Spark | `[data-spark]` | call buttons |
| Shiny Text | `.shiny-text` | accents |
| Gradient Text | `.text-gradient` | hero, 404 |
| Aurora | `.aurora` | hero and CTA backgrounds |
| Marquee | `.marquee` | homepage ticker |

All of them collapse to a static, fully visible state under
`prefers-reduced-motion: reduce` — content is never left hidden by a disabled
animation.

---

## Before you deploy

These items cannot be completed without real business information:

1. **Domain** — replace `SITE_URL` in `js/site-config.js` and rebuild. Every
   canonical, `og:url`, sitemap entry and the `robots.txt` sitemap line updates
   automatically. Pick one format (https + non-www) and keep it.
2. **Phone and email** — `+91 7492993476` and `abc@gamil.com` are the
   placeholders that were supplied. Replace with the verified ones.
3. **Street address** — only the locality is published. Add the verified street
   line to `ADDRESS_SHORT` and to `address()` in `tools/schema.js`. Do not guess.
4. **Photography** — `assets/gallery-assets/` holds licensed stock images, and
   the gallery page discloses this in a visible notice. Replace with real photos
   of the premises, update the alt text, and delete the notice.
5. **Social links** — `FACEBOOK` / `INSTAGRAM` are empty, so the icons do not
   render at all. Fill them in to switch them on.
6. **Contact form backend** — there is none. The form validates, then tells the
   visitor to call or email. It never claims a message was sent. Set
   `FORM_ENDPOINT` to a real endpoint (Formspree, Netlify Forms, your own API) to
   enable submission.
7. **Server config** — 301 redirect http → https and www → non-www, serve
   `404.html` for unknown paths with a real **404 status code** (not 200, and not
   a redirect to the homepage), and enable gzip/brotli plus long `Cache-Control`
   on `/assets/`, `/css/` and `/js/`.

---

## What was deliberately left out

The source site used for research publishes material that could not be verified
independently. Republishing it would have meant shipping fabricated trust
signals, which is exactly what triggers manual actions in Search Console. The
following were therefore **excluded**:

- the star rating and review count
- the named customer testimonials
- "#1", "only", "best-rated" and similar superlatives
- the numbered health-benefit statistics (they are medical claims)
- staff training provenance and named product brands
- licensing and certification claims
- `aggregateRating`, `review`, `award`, `geo` and `streetAddress` in JSON-LD

`tools/audit.js` actively fails the build if any of those schema properties
reappear.

One genuine conflict was found in the source: the 90-minute banya + massage
package is priced at ₹4,000 on one page and ₹6,500 on another. Rather than pick
one, it is published as "on enquiry".

---

## Google Search Console checklist

Run after deployment. Nothing below has been configured — it needs access to the
live domain and the Search Console account.

1. Confirm HTTPS works and http redirects to it permanently (301)
2. Confirm one canonical host (www **or** non-www, not both)
3. Open `https://your-domain.com/sitemap.xml` — should render valid XML
4. Open `https://your-domain.com/robots.txt` — should list the sitemap
5. Verify the Search Console property (DNS TXT is the most durable method)
6. Submit the sitemap under **Indexing → Sitemaps**
7. Inspect the homepage URL; use **Test Live URL** and check the rendered HTML
8. Inspect each of the four location pages individually
9. Confirm the reported canonical matches the one in the page source
10. Check **Experience → Core Web Vitals** once field data accumulates (~28 days)
11. Check **Enhancements** for FAQ, Breadcrumb and Local Business items
12. Validate structured data at <https://search.google.com/test/rich-results>
13. Monitor **Indexing → Pages** for "Discovered – currently not indexed"
14. Fix any 404s reported under **Not found (404)**
15. Re-run `node tools/audit.js` before every subsequent deploy

**No site can guarantee rankings or a zero-issue Search Console report.** This
build follows current technical best practice and avoids the known causes of
indexing problems; it does not promise an outcome.

---

## Accessibility

- Skip-to-content link on every page
- Semantic landmarks (`header`, `nav`, `main`, `section`, `article`, `footer`)
- One `<h1>` per page, no skipped heading levels (enforced by the audit)
- Keyboard-operable nav, dropdown (arrow keys + Escape), accordion and lightbox
- Focus trapping in the mobile drawer and the lightbox, focus restored on close
- Visible 3px focus ring on every interactive element
- 48px minimum tap targets
- Descriptive alt text; decorative images use `alt=""`
- Form labels, `aria-invalid`, `role="alert"` errors, `aria-live` status
- Split-text animation exposes the intact string via `aria-label`
- Full `prefers-reduced-motion` support
