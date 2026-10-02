/* ==========================================================================
   page-services.js — treatments and rates
   --------------------------------------------------------------------------
   Chrome comes from theme.js. This is the page that carries the full
   hasOfferCatalog structured data (the home page links to it but does not
   repeat the catalogue).

   SEO angle unique to this page: transactional intent — "spa rates
   mahipalpur", "body massage price delhi", "<treatment> near aerocity". Each
   of the nine treatments gets its own anchored section with a heading, a
   price and a description, so a deep link from a search result lands on the
   right block.
   ========================================================================== */

'use strict';

const T = require('./theme');
const { CFG, esc, wa, waIcon, faqBlock, ctaBand, pageHero, shell } = T;
const { SERVICES, EXTRA_RATES, MEMBERSHIPS, PAYMENTS } = require('./data');

const TRAIL = [{ label: 'Home', href: '/' }, { label: 'Our Services' }];
const IMG = 'assets/spa';
const HERO = `${IMG}/svc-swedish.jpg`;

const TITLE = 'Spa Services & Rates, Mahipalpur | Massage from ₹1,500';
const DESCRIPTION =
  'Nine treatments with published rates: Russian banya ₹4,000, deep tissue ₹3,000, full ' +
  'body massage ₹2,500. Mahipalpur, New Delhi. Open 24 hours.';

const rupees = (n) => '₹' + n.toLocaleString('en-IN');

/* Alt text describes what each photograph shows. Nothing claims to picture
   these particular premises or staff. */
const SVC_ALT = {
  'russian-banya':   'Warmly lit wooden sauna cabin of the kind used for a Russian banya session',
  'deep-tissue':     'Therapist applying firm pressure across a guest&rsquo;s upper back and shoulders',
  'couples-retreat': 'Private treatment suite set with two massage tables, towels and candles',
  'aromatherapy':    'Rolled towel beside an aromatherapy oil bottle on a treatment bed',
  'swedish':         'Guest receiving a full body Swedish massage in a candlelit room',
  'thai-yoga':       'Assisted stretch applied to a clothed guest resting on a floor mat',
  'abhyanga':        'Therapist working warm oil along a guest&rsquo;s back with both hands',
  'sports-recovery': 'Focused recovery massage being applied to a guest&rsquo;s arm and hand',
  'express':         'Seated neck and shoulder massage during a short express session'
};

const FAQS = [
  { q: 'Which treatment should I book if it is my first visit?',
    a: ['If you want the thing that makes this a Russian spa, book the banya. If you have a specific ache, book ' +
        'deep tissue and tell the therapist where it is. If you are not sure and simply want an hour of quiet, the ' +
        'signature aromatherapy or the Swedish full body massage are the easiest places to start.'] },
  { q: 'Are the published rates final, or are there extra charges?',
    a: ['The rates on this page are the published price for a single session. Message or call to confirm the ' +
        'current rate before you book — we would rather you heard the number from us than assumed it from a web ' +
        'page. The price you are quoted is the price you pay.'] },
  { q: 'How long before my appointment should I arrive?',
    a: ['Ten minutes is comfortable. That covers changing, locking up your belongings, and a short conversation ' +
        'with your therapist about pressure and problem areas before the clock starts on your session.'] },
  { q: 'Can I combine a banya session with a massage?',
    a: ['Yes — it is the most common combination, and the banya is usually taken first so the massage lands on ' +
        'warm muscle. The ninety-minute combined package is priced on enquiry; please message us for the current ' +
        'rate.'] },
  { q: 'Do you offer treatments for two people at the same time?',
    a: ['Yes. The couples retreat is a two-hour session in a private suite with a therapist for each guest working ' +
        'in parallel. Because the suite is held for the full slot, this one should be booked in advance rather ' +
        'than walked in for.'] },
  { q: 'What should I tell my therapist before we start?',
    a: ['Anything relevant: injuries, recent surgery, pregnancy, skin conditions, heart or blood pressure ' +
        'conditions, and how much pressure you actually want. Our treatments are wellness services rather than ' +
        'medical treatment, so if you have a health condition, check with your doctor first and tell us what they ' +
        'advised.'] },
  { q: 'How do I pay?', a: [PAYMENTS] }
];

/* Nine anchored detail blocks — /services.html#deep-tissue and friends are
   linked from the home page tiles and cards. */
const details = SERVICES.map((s, i) => `      <article class="svc${i % 2 ? ' svc--flip' : ''}" id="${s.slug}">
        <div class="svc__media" data-reveal>
          <img src="/${IMG}/svc-${s.slug}.jpg" alt="${SVC_ALT[s.slug]}" width="800" height="500"
               loading="lazy" decoding="async">
        </div>
        <div data-reveal>
          <p class="svc__price">${rupees(s.price)}${s.priceNote ? ` <span>${esc(s.priceNote)}</span>` : ''} <span>${esc(s.duration)}</span></p>
          <h3>${esc(s.name)}</h3>
          <p>${s.long}</p>
          <div class="btn-row" style="margin-top:var(--sp-4)">
            <a class="btn btn--wa btn--sm" href="${wa('Hello, I would like to book the ' + s.name + ' (' + s.duration + ', ' + rupees(s.price) + ').')}" rel="noopener" target="_blank">${waIcon} Book this</a>
            <a class="btn btn--outline btn--sm" href="/contact.html">Ask a question</a>
          </div>
        </div>
      </article>`).join('\n');

const rateRows = SERVICES.map((s) => `              <tr>
                <th scope="row"><a href="#${s.slug}" style="color:inherit">${esc(s.name)}</a></th>
                <td>${esc(s.duration)}</td>
                <td>${rupees(s.price)}${s.priceNote ? ` <span style="font-size:.7rem;color:var(--muted)">${esc(s.priceNote)}</span>` : ''}</td>
              </tr>`).join('\n');

const extraRows = EXTRA_RATES.map((r) => `              <tr>
                <th scope="row">${esc(r.name)}${r.note ? ` <span style="font-weight:400;color:var(--muted)">— ${esc(r.note)}</span>` : ''}</th>
                <td>${esc(r.duration)}</td>
                <td>${r.price === null ? 'On enquiry' : rupees(r.price)}</td>
              </tr>`).join('\n');

const planCards = MEMBERSHIPS.map((m, i) => `            <div class="plan${i === 1 ? ' plan--featured' : ''}" data-reveal>
              <p class="plan__name">${esc(m.name)} membership</p>
              <p class="plan__price">${rupees(m.price)} <small>/ month</small></p>
              <ul>
${m.includes.map((x) => `                <li>${esc(x)}</li>`).join('\n')}
              </ul>
              <a class="btn btn--outline btn--sm" href="${wa('Hello, I would like details of the ' + m.name + ' membership.')}" rel="noopener" target="_blank">Ask about ${esc(m.name)}</a>
            </div>`).join('\n');

const page = {
  file: 'services.html',
  title: TITLE,
  description: DESCRIPTION,
  ogTitle: 'Spa Services & Rates — Mahipalpur, New Delhi',
  ogImage: HERO,
  ogImageAlt: 'Guest receiving a full body massage in a candlelit spa room',
  heroImage: HERO,
  trail: TRAIL,
  faqs: FAQS,
  offerCatalog: SERVICES,

  body: `
  <main id="main-content">

${pageHero({
  eyebrow: 'Our services',
  h1: 'Treatments &amp; rates at our <em>Mahipalpur</em> spa',
  lead: 'Nine treatments, from a thirty-minute neck session at ₹1,500 to a two-hour retreat for two. Every ' +
        'rate below is the published price for a single session.',
  trail: TRAIL,
  image: HERO, alt: '', w: 800, h: 500
})}

    <!-- ========================== RATE CARD =========================== -->
    <section class="section section--white" id="rates">
      <div class="wrap">
        <div class="section-head" data-reveal>
          <span class="eyebrow">At a glance</span>
          <h2>Body massage &amp; spa rates</h2>
          <p>Select any treatment to jump to what it involves.</p>
        </div>

        <div class="rates__scroll" data-reveal>
          <table class="rates">
            <caption class="sr-only">Treatments, durations and rates</caption>
            <thead>
              <tr><th scope="col">Treatment</th><th scope="col">Duration</th><th scope="col">Rate</th></tr>
            </thead>
            <tbody>
${rateRows}
${extraRows}
            </tbody>
          </table>
        </div>

        <p style="text-align:center;margin-top:var(--sp-4);font-size:.82rem;color:var(--muted)">
          ${esc(PAYMENTS)}
        </p>
      </div>
    </section>

    <!-- ======================= TREATMENT DETAIL ====================== -->
    <section class="section section--blush">
      <div class="wrap">
        <div class="section-head" data-reveal>
          <span class="eyebrow">In detail</span>
          <h2>What each treatment involves</h2>
          <p>Written so you can tell before you arrive whether a treatment is the one you actually want.</p>
        </div>
${details}
      </div>
    </section>

    <!-- ========================= MEMBERSHIPS ========================= -->
    <section class="section section--white">
      <div class="wrap">
        <div class="section-head" data-reveal>
          <span class="eyebrow">Memberships</span>
          <h2>For guests who come back</h2>
          <p>Monthly plans, billed monthly. Ask at reception or message us for the current terms.</p>
        </div>
        <div class="grid grid--3">
${planCards}
        </div>
      </div>
    </section>

    <!-- ============================= FAQ ============================= -->
    <section class="section section--blush">
      <div class="wrap wrap--narrow">
        <div class="section-head" data-reveal>
          <span class="eyebrow">Questions</span>
          <h2>Booking &amp; treatment questions</h2>
        </div>
        <div class="faq">
${faqBlock(FAQS, 'services')}
        </div>
        <p class="notice" style="margin-top:var(--sp-5)" data-reveal>
          <strong>Before you book a heat treatment.</strong> The banya is a heat-based therapy. If you have a
          heart condition, high or low blood pressure, are pregnant, or are unsure for any reason, speak to our
          staff and to your doctor first. Massage and heat therapy are wellness services, not medical treatment.
        </p>
      </div>
    </section>

${ctaBand({
  heading: 'Book a treatment',
  body: 'Message us with the treatment and a rough time and we will confirm the slot. Walk-ins are welcome at ' +
        'any hour; the banya and the couples suite are worth booking ahead.'
})}

  </main>
`
};

module.exports = { file: page.file, title: page.title, description: page.description, render: () => shell(page) };
