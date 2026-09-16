'use strict';

const { CFG, breadcrumb, ctaBand, faqBlock } = require('./partials');
const S = require('./schema');
const { SERVICES, EXTRA_RATES, MEMBERSHIPS, PAYMENTS } = require('./data');

const TRAIL = [
  { label: 'Home', href: '/' },
  { label: 'Services' }
];

const FAQS = [
  {
    q: 'Which treatment should I book if it is my first visit?',
    a: ['If you want the thing that makes this a Russian spa, book the banya. If you have a specific ache, book deep ' +
        'tissue and tell the therapist where it is. If you are not sure and simply want an hour of quiet, the signature ' +
        'aromatherapy or the Swedish massage are the easiest places to start.']
  },
  {
    q: 'Are the published rates final, or are there extra charges?',
    a: ['The rates on this page are the published price for a single session. Call to confirm the current rate and ' +
        'anything applicable on the day before you book — we would rather you heard the number from us than ' +
        'assumed it from a web page.']
  },
  {
    q: 'How long before my appointment should I arrive?',
    a: ['Ten minutes is comfortable. That covers changing, locking up your belongings, and a short conversation with ' +
        'your therapist about pressure and problem areas before the clock starts on your session.']
  },
  {
    q: 'Can I combine a banya session with a massage?',
    a: ['Yes — it is the most common combination, and the banya is usually taken first so the massage lands on warm ' +
        'muscle. The ninety-minute combined package is priced on enquiry; please call for the current rate.']
  },
  {
    q: 'Do you offer treatments for two people at the same time?',
    a: ['Yes. The couples retreat is a two-hour session in a private suite with a therapist for each guest working in ' +
        'parallel. Because the suite is held for the full slot, this one should be booked in advance rather than ' +
        'walked in for.']
  },
  {
    q: 'What should I tell my therapist before we start?',
    a: ['Anything relevant: injuries, recent surgery, pregnancy, skin conditions, heart or blood pressure conditions, ' +
        'and how much pressure you actually want. Our treatments are wellness services rather than medical treatment, ' +
        'so if you have a health condition, check with your doctor first and tell us what they advised.']
  }
];

/* Full service detail sections — id anchors are linked from the home page */
const detailSections = SERVICES.map((s, i) => `      <article class="split${i % 2 ? ' split--media-right' : ''}" id="${s.slug}" style="margin-bottom:var(--sp-9)">
        <div class="split__media" data-reveal="${i % 2 ? 'right' : 'left'}">
          <img src="/${s.img}" alt="${s.alt}" width="${s.w}" height="${s.h}" ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">
        </div>
        <div data-reveal="${i % 2 ? 'left' : 'right'}">
          <p class="eyebrow">${s.duration} · ₹${s.price.toLocaleString('en-IN')}${s.priceNote ? ' ' + s.priceNote : ''}</p>
          <h3>${s.name}</h3>
          <p>${s.long}</p>
          <div class="btn-row">
            <a class="btn btn--primary magnetic" data-spark href="tel:${CFG.PHONE_HREF}" data-site="phone-link">Call to book</a>
            <a class="btn btn--ghost" href="/contact.html">Ask a question</a>
          </div>
        </div>
      </article>`).join('\n');

const rateRows = SERVICES.map((s) => `            <tr>
              <th scope="row">${s.name}</th>
              <td>${s.duration}</td>
              <td class="amount">₹${s.price.toLocaleString('en-IN')}${s.priceNote ? `<span style="font-size:var(--fs-xs);color:var(--text-muted)"> ${s.priceNote}</span>` : ''}</td>
            </tr>`).join('\n');

const extraRows = EXTRA_RATES.map((r) => `            <tr>
              <th scope="row">${r.name}<span style="display:block;font-weight:400;font-size:var(--fs-xs);color:var(--text-muted)">${r.note}</span></th>
              <td>${r.duration}</td>
              <td class="amount">${r.price ? '₹' + r.price.toLocaleString('en-IN') : 'On enquiry'}</td>
            </tr>`).join('\n');

const memberCards = MEMBERSHIPS.map((m, i) => `          <div class="feature spotlight" data-reveal data-reveal-delay="${i * 80}">
            <p class="eyebrow">${m.name}</p>
            <p class="count-up" style="font-size:var(--fs-xl);margin-bottom:var(--sp-3)">₹${m.price.toLocaleString('en-IN')}<span style="font-size:var(--fs-sm);color:var(--text-muted);font-family:var(--font-body)"> / month</span></p>
            <ul class="checklist">
${m.includes.map((inc) => `              <li>${inc}</li>`).join('\n')}
            </ul>
          </div>`).join('\n');

const page = {
  file: 'services.html',
  title: 'Spa Services & Rates | Banya, Deep Tissue & Massage',
  description:
    'Nine treatments at Mayra Russian Spa, Mahipalpur: Russian banya, deep tissue, couples ' +
    'retreat, Swedish, Thai and Ayurvedic massage. Rates included.',
  ogTitle: 'Spa Services & Rates — Mayra Russian Spa, Mahipalpur',
  ogImage: 'assets/services-assets/services-overview-hero.jpg',
  ogImageAlt: 'Massage bed prepared with fresh linen, towels and oils',

  schema: [
    S.webPage({
      file: 'services.html',
      title: 'Spa Services & Rates | Banya, Deep Tissue & Massage',
      description: 'Treatments and published rates at Mayra Russian Spa, Mahipalpur, New Delhi.',
      ogImage: 'assets/services-assets/services-overview-hero.jpg'
    }),
    S.breadcrumbList(TRAIL),
    S.offerCatalog(SERVICES),
    S.faqPage(FAQS)
  ],

  body: `
  <main id="main-content">

    <section class="hero hero--compact">
      <div class="aurora" aria-hidden="true"><span></span><span></span><span></span></div>
      <div class="container hero__inner">
${breadcrumb(TRAIL)}
        <h1 class="split-text">Treatments &amp; rates</h1>
        <p class="lead">
          Nine treatments, from a thirty-minute neck session to a two-hour retreat for two. Every one of them runs in
          a private room, and every one of them is available at any hour.
        </p>
        <div class="btn-row">
          <a class="btn btn--primary magnetic" data-spark href="tel:${CFG.PHONE_HREF}" data-site="phone-link">
            Call <span data-site="phone">${CFG.PHONE_DISPLAY}</span>
          </a>
          <a class="btn btn--ghost" href="#rates">Jump to the rate card</a>
        </div>
      </div>
    </section>

    <!-- ===================== SERVICE DETAIL ======================== -->
    <section class="section">
      <div class="container">
        <div class="section-head" data-reveal>
          <p class="eyebrow">The menu</p>
          <h2>What each treatment involves</h2>
          <p class="lead">
            Plain descriptions of what happens in the room, so you can pick the right one before you arrive rather
            than at the desk.
          </p>
        </div>

${detailSections}
      </div>
    </section>

    <!-- ========================= RATES ============================= -->
    <section class="section section--cream" id="rates">
      <div class="container container--narrow">
        <div class="section-head" data-reveal>
          <p class="eyebrow">Rate card</p>
          <h2>Published rates</h2>
        </div>

        <div class="table-scroll" data-reveal>
          <table class="price-table">
            <caption>Single-session rates. Please confirm the current price when you call to book.</caption>
            <thead>
              <tr><th scope="col">Treatment</th><th scope="col">Duration</th><th scope="col">Rate</th></tr>
            </thead>
            <tbody>
${rateRows}
${extraRows}
            </tbody>
          </table>
        </div>

        <p class="notice" style="margin-top:var(--sp-6)" data-reveal>
          <strong>Payment.</strong> ${PAYMENTS}
        </p>
      </div>
    </section>

    <!-- ====================== MEMBERSHIPS ========================== -->
    <section class="section">
      <div class="container">
        <div class="section-head is-centered" data-reveal>
          <p class="eyebrow">Regular visits</p>
          <h2>Monthly membership plans</h2>
          <p class="lead">
            If you are coming more than once a month, a plan works out cheaper than paying per session. Call for
            current terms before signing up.
          </p>
        </div>
        <div class="grid grid--3">
${memberCards}
        </div>
      </div>
    </section>

    <!-- ========================== FAQ ============================== -->
    <section class="section section--cream">
      <div class="container container--narrow">
        <div class="section-head is-centered" data-reveal>
          <p class="eyebrow">Questions</p>
          <h2>Booking and treatment questions</h2>
        </div>
        <div class="faq">
${faqBlock(FAQS, 'services')}
        </div>
      </div>
    </section>

    <section class="section section--tight">
      <div class="container">
        <div class="section-head" data-reveal>
          <p class="eyebrow">Also worth reading</p>
          <h2 style="font-size:var(--fs-lg)">Related pages</h2>
        </div>
        <ul class="related" data-reveal>
          <li><a href="/about.html">How the banya room works</a></li>
          <li><a href="/gallery.html">See the rooms</a></li>
          <li><a href="/russian-spa-in-mahipalpur.html">Visiting from Mahipalpur</a></li>
          <li><a href="/russian-spa-in-aerocity.html">Visiting from Aerocity</a></li>
          <li><a href="/russian-spa-in-gurgaon.html">Travelling in from Gurgaon</a></li>
          <li><a href="/contact.html">Contact and directions</a></li>
        </ul>
      </div>
    </section>

${ctaBand({
  heading: 'Not sure which one to book?',
  body: 'Tell us what is bothering you and how long you have. We will point you at the right treatment rather than ' +
        'the most expensive one.',
  note: 'Massage and heat therapy are wellness services, not medical treatment. Please consult a doctor about any ' +
        'health condition.'
})}

  </main>
`
};

module.exports = page;
