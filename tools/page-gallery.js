'use strict';

const { CFG, breadcrumb, ctaBand } = require('./partials');
const S = require('./schema');

const TRAIL = [
  { label: 'Home', href: '/' },
  { label: 'Gallery' }
];

/* NOTE ON THE IMAGES
   These are licensed stock photographs of spa and banya environments, used as
   placeholders while the real photography is produced. They are NOT presented
   as photographs of this business — the disclosure box below states that
   plainly on the page. Swap each file for a real photo of the premises and
   update the alt text; the markup needs no other change. */
const IMAGES = [
  { src: 'assets/gallery-assets/gallery-banya-steam-room.jpg', w: 900, h: 1350, tall: true,
    alt: 'Wood-lined banya steam room with tiered benches and a low bucket',
    caption: 'The banya room, set up before a session' },
  { src: 'assets/gallery-assets/gallery-treatment-suite.jpg', w: 900, h: 601,
    alt: 'Private treatment suite with a single massage bed and folded towels',
    caption: 'A private treatment suite' },
  { src: 'assets/gallery-assets/gallery-massage-session.jpg', w: 900, h: 600,
    alt: 'Therapist working along a guest’s upper back during a massage',
    caption: 'Deep tissue work through the upper back' },
  { src: 'assets/gallery-assets/gallery-relaxation-lounge.jpg', w: 900, h: 1600, tall: true,
    alt: 'Quiet relaxation lounge with low seating and soft lighting',
    caption: 'The relaxation lounge, for the rest phase' },
  { src: 'assets/gallery-assets/gallery-aromatherapy-oils.jpg', w: 900, h: 600,
    alt: 'Row of essential oil bottles arranged beside a rolled towel',
    caption: 'Oils laid out for an aromatherapy session' },
  { src: 'assets/gallery-assets/gallery-hot-stone-setup.jpg', w: 900, h: 1350, tall: true,
    alt: 'Smooth warmed stones and towels arranged on a treatment table',
    caption: 'Warm stones and fresh linen' },
  { src: 'assets/gallery-assets/gallery-sauna-interior.jpg', w: 900, h: 601,
    alt: 'Interior of a timber heat room with bench seating along the walls',
    caption: 'Timber heat room interior' },
  { src: 'assets/gallery-assets/gallery-couples-room.jpg', w: 900, h: 601,
    alt: 'Couples suite arranged with two massage beds side by side',
    caption: 'The couples suite, two beds to a room' },
  { src: 'assets/gallery-assets/gallery-reception-area.jpg', w: 900, h: 1350, tall: true,
    alt: 'Reception corner with seating, plants and warm lamp light',
    caption: 'Reception, where a visit begins' },
  { src: 'assets/gallery-assets/gallery-herbal-tea-service.jpg', w: 900, h: 1350, tall: true,
    alt: 'Herbal tea poured into a glass cup after a banya session',
    caption: 'Herbal tea, served after the cold plunge' },
  { src: 'assets/gallery-assets/gallery-cold-plunge-area.jpg', w: 900, h: 600,
    alt: 'Cold plunge pool with still water beside a tiled step',
    caption: 'The cold plunge, a few steps from the steam' },
  { src: 'assets/gallery-assets/gallery-quiet-corner.jpg', w: 900, h: 675,
    alt: 'Quiet corner with a candle, folded towels and a timber stool',
    caption: 'A quiet corner of the spa' }
];

const tiles = IMAGES.map((img, i) => `          <button class="gallery__item${img.tall ? ' gallery__item--tall' : ''}" type="button"
                  aria-label="Open image ${i + 1} of ${IMAGES.length}: ${img.caption}">
            <img src="/${img.src}" alt="${img.alt}" width="${img.w}" height="${img.h}"
                 ${i === 0 ? 'fetchpriority="high"' : `loading="${i < 4 ? 'eager' : 'lazy'}"`} decoding="async">
            <figcaption>${img.caption}</figcaption>
          </button>`).join('\n');

const page = {
  file: 'gallery.html',
  title: 'Gallery | Inside Mayra Russian Spa, Mahipalpur',
  description:
    'A look inside Mayra Russian Spa, Mahipalpur: the banya steam room, cold plunge, ' +
    'private treatment suites, couples room and relaxation lounge.',
  ogTitle: 'Gallery — Inside Mayra Russian Spa',
  ogImage: 'assets/gallery-assets/gallery-banya-steam-room.jpg',
  ogImageAlt: 'Wood-lined banya steam room with tiered bench seating',

  schema: [
    S.webPage({
      file: 'gallery.html',
      title: 'Gallery | Inside Mayra Russian Spa, Mahipalpur',
      description: 'Photographs of the banya room, treatment suites and lounge at Mayra Russian Spa.',
      ogImage: 'assets/gallery-assets/gallery-banya-steam-room.jpg'
    }),
    S.breadcrumbList(TRAIL),
    S.imageGallery(IMAGES.map((i) => ({ src: i.src, caption: i.caption })), `${CFG.SITE_URL}/gallery.html`)
  ],

  body: `
  <main id="main-content">

    <section class="hero hero--compact">
      <div class="aurora" aria-hidden="true"><span></span><span></span><span></span></div>
      <div class="container hero__inner">
${breadcrumb(TRAIL)}
        <h1 class="split-text">Inside the spa</h1>
        <p class="lead">
          The banya room, the plunge, the treatment suites and the lounge. Select any image to view it larger —
          arrow keys move between them, Escape closes.
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="notice" style="margin-bottom:var(--sp-6)" data-reveal>
          <strong>About these photographs.</strong> The images on this page are licensed stock photography of spa and
          banya environments, shown while our own photography is being produced. They illustrate the treatments and
          the type of space — they are not presented as photographs of these premises. To see the actual rooms,
          <a href="/contact.html">arrange a visit</a> or call
          <a href="tel:${CFG.PHONE_HREF}" data-site="phone-link"><span data-site="phone">${CFG.PHONE_DISPLAY}</span></a>.
        </div>

        <div class="gallery" data-reveal>
${tiles}
        </div>
      </div>
    </section>

${ctaBand({
  heading: 'See it for yourself',
  body: 'Photographs only go so far with a room whose whole point is temperature. Call and come in — walk-ins are ' +
        'welcome at any hour.',
  note: null
})}

  </main>

  <!-- ====================== LIGHTBOX DIALOG ======================= -->
  <div class="lightbox" id="lightbox" role="dialog" aria-modal="true"
       aria-label="Image viewer" aria-hidden="true">
    <button class="lightbox__btn lightbox__close" type="button" aria-label="Close image viewer">&times;</button>
    <button class="lightbox__btn lightbox__prev" type="button" aria-label="Previous image">&#8249;</button>
    <button class="lightbox__btn lightbox__next" type="button" aria-label="Next image">&#8250;</button>

    <figure class="lightbox__figure">
      <img class="lightbox__img" src="" alt="" width="900" height="600" decoding="async">
      <figcaption class="lightbox__caption"></figcaption>
    </figure>

    <p class="lightbox__count" aria-live="polite"></p>
  </div>
`
};

module.exports = page;
