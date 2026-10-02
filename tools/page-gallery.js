/* ==========================================================================
   page-gallery.js — photo gallery
   --------------------------------------------------------------------------
   56 photographs in four filterable categories, with a keyboard-navigable
   lightbox.

   HOW THE IMAGES ARE SERVED
     assets/gallery/t/NN.jpg   560px wide, ~27 KB — the grid thumbnail
     assets/gallery/f/NN.jpg  1200px wide, ~87 KB — fetched only when an
                              image is actually opened in the lightbox
   Loading full-size files into the grid would mean ~5 MB on first paint for
   a page nobody has clicked yet. Every thumbnail past the first eight is
   lazy-loaded, so a visitor who does not scroll downloads almost nothing.

   PROGRESSIVE ENHANCEMENT
   Each tile is a real <a> pointing at the full-size file. With JavaScript off
   the filter buttons are hidden, every photograph is shown, and clicking one
   opens the image directly instead of hitting a dead button.

   NOTE ON THE PHOTOGRAPHS
   These are openly licensed (CC0 / public domain) photographs of spa and
   banya environments, used while the owner's own photography is produced.
   They are NOT presented as pictures of these premises, and the disclosure
   box on the page says so plainly. Replacing them later means swapping the
   files and the alt text in tools/gallery-data.json; no markup changes.
   ========================================================================== */

'use strict';

const T = require('./theme');
const { CFG, esc, ico, breadcrumb, faqBlock, ctaBand, pageHero, shell } = T;
const IMAGES = require('./gallery-data.json');

const TRAIL = [{ label: 'Home', href: '/' }, { label: 'Gallery' }];

const CATS = [
  { id: 'all',      label: 'All photographs' },
  { id: 'banya',    label: 'Banya & sauna' },
  { id: 'massage',  label: 'Massage & therapy' },
  { id: 'rooms',    label: 'Rooms & water' },
  { id: 'details',  label: 'Details' }
];

const COUNT = IMAGES.length;
const byCat = (c) => IMAGES.filter((i) => i.cat === c).length;

const TITLE = `Spa Photo Gallery | ${COUNT} Photos of Our Mahipalpur Spa`;
const DESCRIPTION =
  `${COUNT} photos of the banya, treatment rooms, massage therapy and spa details at our ` +
  'Mahipalpur spa near Delhi Airport and Aerocity.';

const HERO = 'assets/gallery/f/03.jpg';

const FAQS = [
  { q: 'Are these photographs of your actual spa?',
    a: ['Not yet. The images on this page are openly licensed photographs of spa and banya environments, shown ' +
        'while our own photography is being produced. They illustrate the treatments and the kind of space — they ' +
        'are not presented as pictures of these premises. To see the actual rooms, walk in at any hour or ' +
        '<a href="/contact.html">arrange a visit</a>.'] },
  { q: 'Can I see the banya room before I book?',
    a: ['Yes. Come to reception and ask — we will show you the heat room, the plunge and a treatment suite before ' +
        'you commit to anything. It takes five minutes and it is the only way to judge a banya, because the thing ' +
        'that matters about the room is its temperature and humidity, which no photograph conveys.'] },
  { q: 'Which treatment do the massage photographs show?',
    a: ['The massage category covers the techniques on our menu — deep tissue work through the back and shoulders, ' +
        'hot stone, head and scalp work, and reflexology through the foot. Each is described in full on the ' +
        '<a href="/services.html">services page</a> along with its duration and rate.'] },
  { q: 'May I take photographs during my visit?',
    a: ['Not in the treatment areas or the banya, because other guests are using them and there is no way to ' +
        'photograph those spaces without photographing people who did not agree to it. Reception and the ' +
        'relaxation lounge are fine when they are quiet — just ask the desk first.'] }
];

/* --------------------------------------------------------------------------
   MARKUP
   -------------------------------------------------------------------------- */
const filters = CATS.map((c, i) => {
  const n = c.id === 'all' ? COUNT : byCat(c.id);
  return `            <li><button type="button" data-filter="${c.id}" aria-pressed="${i === 0}">${esc(c.label)} <span aria-hidden="true">(${n})</span></button></li>`;
}).join('\n');

/* The first eight tiles are above or near the fold on a laptop, so they load
   eagerly; everything after that is lazy. */
const tiles = IMAGES.map((im, i) => `          <a class="gallery__item" data-cat="${im.cat}"
             href="/assets/gallery/f/${im.n}"
             data-full="/assets/gallery/f/${im.n}" data-w="${im.fw}" data-h="${im.fh}"
             data-cap="${esc(im.cap)}" data-alt="${esc(im.alt)}"
             aria-label="View photograph ${i + 1} of ${COUNT}: ${esc(im.cap)}">
            <img src="/assets/gallery/t/${im.n}" alt="${esc(im.alt)}"
                 width="${im.tw}" height="${im.th}"
                 loading="${i < 8 ? 'eager' : 'lazy'}" decoding="async"
                 sizes="(min-width:1300px) 20vw, (min-width:980px) 25vw, (min-width:620px) 33vw, 50vw">
            <span class="gcap">${esc(im.cap)}</span>
          </a>`).join('\n');

/* ImageGallery schema. Each photograph is listed with its caption so the set
   is machine-readable; no licence or author is claimed for the business. */
const gallerySchema = {
  '@type': 'ImageGallery',
  '@id': `${CFG.SITE_URL}/gallery.html#gallery`,
  name: `Spa photo gallery — ${COUNT} photographs`,
  description: 'Photographs of the banya, treatment rooms, massage therapy and spa details.',
  numberOfItems: COUNT,
  associatedMedia: IMAGES.map((im) => ({
    '@type': 'ImageObject',
    contentUrl: `${CFG.SITE_URL}/assets/gallery/f/${im.n}`,
    thumbnailUrl: `${CFG.SITE_URL}/assets/gallery/t/${im.n}`,
    caption: im.cap,
    width: im.fw,
    height: im.fh
  }))
};

const page = {
  file: 'gallery.html',
  title: TITLE,
  description: DESCRIPTION,
  ogTitle: `Spa Photo Gallery — ${COUNT} Photographs, Mahipalpur`,
  ogImage: HERO,
  ogImageAlt: 'Therapist working along a guest’s back during a massage',
  heroImage: HERO,
  pageType: 'CollectionPage',
  trail: TRAIL,
  faqs: FAQS,
  extraSchema: [gallerySchema],

  body: `
  <main id="main-content">

${pageHero({
  eyebrow: 'Gallery',
  h1: `Inside a <em>Russian spa</em> in Mahipalpur`,
  lead: `${COUNT} photographs across four categories — the banya and heat rooms, massage and therapy, ` +
        'the treatment rooms and water, and the small details. Filter below, or open any photograph full size.',
  trail: TRAIL,
  image: HERO, alt: '', w: 1200, h: 800
})}

    <!-- ========================= THE GALLERY ========================= -->
    <section class="section section--white">
      <div class="wrap">

        <div class="notice" style="margin-bottom:var(--sp-5)">
          <strong>About these photographs.</strong> These are openly licensed photographs of spa and banya
          environments, shown while our own photography is produced. They illustrate the treatments and the type
          of space — they are not presented as photographs of these premises. To see the actual rooms, walk in at
          any hour or call <a href="tel:${CFG.PHONE_HREF}">${CFG.PHONE_DISPLAY}</a>.
        </div>

        <!-- Hidden without JS, because the buttons do nothing until the
             filter script runs. Every photograph is visible in that case. -->
        <ul class="gfilter js-only">
${filters}
        </ul>

        <div class="gallery" id="gallery">
${tiles}
        </div>

        <p class="gcount" id="gallery-count">Showing all ${COUNT} photographs</p>
      </div>
    </section>

    <!-- ====================== WHAT YOU ARE SEEING =================== -->
    <section class="section section--blush">
      <div class="wrap wrap--narrow prose">
        <div data-reveal>
          <span class="eyebrow">What you are looking at</span>
          <h2>Four things worth noticing</h2>
          <p>
            <strong>The heat room.</strong> A banya is not a steam cabinet. It is a timber room built to hold
            moist heat at roughly 70–90°C, with tiered benches because the temperature at head height is very
            different from the temperature near the floor. The bucket and ladle in several of these photographs
            are how water reaches the stones — that is what makes the steam.
          </p>
          <p>
            <strong>The plunge.</strong> Cold water is the half of the cycle people forget. It belongs within a
            few steps of the heat room door, because the contrast only does anything if it is immediate.
          </p>
          <p>
            <strong>Private rooms.</strong> Every massage photograph here shows one guest, one therapist and a
            closed door. That is the arrangement at our spa in Mahipalpur too — no shared treatment floors and no
            cameras in treatment areas.
          </p>
          <p>
            <strong>The small things.</strong> Fresh linen, warmed oil, a locker and a quiet place to sit
            afterwards. The rest phase is the third part of the banya cycle and it is not optional.
          </p>
          <p style="margin-top:var(--sp-5)">
            <a class="arrow" href="/services.html">See what each treatment involves</a>
          </p>
        </div>
      </div>
    </section>

    <!-- ============================ FAQ ============================= -->
    <section class="section section--white">
      <div class="wrap wrap--narrow">
        <div class="section-head" data-reveal>
          <span class="eyebrow">Questions</span>
          <h2>About the gallery</h2>
        </div>
        <div class="faq">
${faqBlock(FAQS, 'gallery')}
        </div>
      </div>
    </section>

${ctaBand({
  heading: 'See the room for yourself',
  body: 'Photographs only go so far with a room whose entire point is temperature. Walk in at any hour and ask ' +
        'to see the banya before you book — it takes five minutes.'
})}

  </main>

  <!-- ========================== LIGHTBOX =========================== -->
  <div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Photograph viewer" aria-hidden="true">
    <button class="lightbox__btn lightbox__close" type="button" aria-label="Close viewer">${ico('close')}</button>
    <button class="lightbox__btn lightbox__prev" type="button" aria-label="Previous photograph">&#8249;</button>
    <button class="lightbox__btn lightbox__next" type="button" aria-label="Next photograph">&#8250;</button>

    <figure class="lightbox__figure">
      <img class="lightbox__img" src="" alt="" width="1200" height="800" decoding="async">
      <figcaption class="lightbox__caption"></figcaption>
    </figure>

    <p class="lightbox__count" aria-live="polite"></p>
  </div>
`
};

module.exports = { file: page.file, title: page.title, description: page.description, render: () => shell(page) };
