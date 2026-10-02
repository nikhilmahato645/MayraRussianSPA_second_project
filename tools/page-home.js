/* ==========================================================================
   page-home.js — the home page
   --------------------------------------------------------------------------
   Chrome (head, header, drawer, footer, icons) comes from theme.js; this file
   is only the body. See theme.js for the identity and content rules that
   apply across the five themed pages.

   SEO targets for THIS page, in priority order:
     1. spa in Mahipalpur      (primary — this is where the spa is)
     2. spa in Aerocity        (secondary — nearest hotel cluster)
     3. body massage in Mahipalpur / Delhi
   ========================================================================== */

'use strict';

const T = require('./theme');
const { CFG, esc, wa, WA_GENERAL, waIcon, telIcon, faqBlock, ctaBand, napBlock, shell } = T;
const { SERVICES, EXTRA_RATES, MEMBERSHIPS, FACILITIES, PAYMENTS } = require('./data');

const TITLE = 'Russian Spa in Mahipalpur & Aerocity | Body Massage, Delhi';
const DESCRIPTION =
  'Russian banya and body massage spa in Mahipalpur, New Delhi, minutes from Aerocity. ' +
  'Private rooms, male and female therapists, rates from ₹1,500. Open 24 hours.';

const IMG = 'assets/spa';
const HERO = `${IMG}/hero-spa-massage-mahipalpur.jpg`;

/* Dimensions are fixed by the image export step, so they derive from the slot
   prefix rather than being repeated on every tag. Declaring them is what keeps
   Cumulative Layout Shift at zero. */
const DIMS = { hero: [960, 640], room: [913, 685], tile: [520, 390], svc: [800, 500], loc: [700, 438] };

const img = (slot, alt, kind, extra) => {
  const [w, h] = DIMS[kind];
  return `<img src="/${IMG}/${slot}.jpg" alt="${esc(alt)}" width="${w}" height="${h}" ${extra || 'loading="lazy" decoding="async"'}>`;
};

const rupees = (n) => '₹' + n.toLocaleString('en-IN');

/* --------------------------------------------------------------------------
   CONTENT
   -------------------------------------------------------------------------- */
const TILES = [
  { slug: 'russian-banya',   img: 'tile-russian-banya', label: 'Russian Banya',      alt: 'Wood-lined banya steam room with tiered benches' },
  { slug: 'swedish',         img: 'tile-body-massage',  label: 'Full Body Massage',  alt: 'Guest receiving a full body massage on a treatment bed' },
  { slug: 'aromatherapy',    img: 'tile-aromatherapy',  label: 'Aromatherapy',       alt: 'Aromatherapy oil bottles arranged beside fresh pink blossom' },
  { slug: 'couples-retreat', img: 'tile-couples-spa',   label: 'Couples Spa',        alt: 'Dimly lit private spa treatment room prepared for a session' },
  { slug: 'russian-banya',   img: 'tile-steam-sauna',   label: 'Steam & Sauna',      alt: 'Warmly lit sauna cabin used for the heat phase of a banya cycle' },
  { slug: 'express',         img: 'tile-reflexology',   label: 'Foot & Reflexology', alt: 'Reflexology pressure-point work being applied to a guest&rsquo;s foot' }
];

/* Photographs are described honestly: they illustrate the treatment, and no
   alt text claims to show this particular spa's rooms or staff. */
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

const LOC_CARDS = [
  { href: '/russian-spa-in-mahipalpur.html', title: 'Mahipalpur', tag: 'Where the spa is',
    img: 'loc-mahipalpur', alt: 'Private spa treatment room of the kind found at the Mahipalpur location',
    body: 'The banya room, the cold plunge and every treatment suite are here, on the NH-48 airport corridor.' },
  { href: '/russian-spa-in-aerocity.html', title: 'Aerocity', tag: '5&ndash;7 min by cab',
    img: 'loc-aerocity', alt: 'Luxury spa bath and lounge of the kind Aerocity hotel guests book',
    body: 'The nearest full banya to the Aerocity hotel cluster, open at whatever hour your flight lands.' },
  { href: '/russian-spa-in-gurgaon.html', title: 'Gurgaon', tag: '18&ndash;22 min from Cyber City',
    img: 'loc-gurgaon', alt: 'Hot stone being worked across a guest&rsquo;s back during a recovery session',
    body: 'A straight run up NH-48 from the corporate belt, with late sessions for long working days.' },
  { href: '/russian-spa-in-new-delhi.html', title: 'New Delhi', tag: 'Across the city',
    img: 'loc-new-delhi', alt: 'Rolled spa towels set out in a relaxation lounge',
    body: 'Reachable from south, central and west Delhi, and on the Airport Express metro corridor.' }
];

const STEPS = [
  { h: 'Message or call', p: 'Send a WhatsApp message or call. Tell us the treatment and roughly when you want to come in.' },
  { h: 'We confirm', p: 'We check the room and the therapist are free and confirm the slot back to you.' },
  { h: 'Arrive', p: 'Walk in at your time. You get a changing room, a robe, slippers and a locker.' },
  { h: 'Treatment & rest', p: 'Your session in a private room, then time in the relaxation lounge with herbal tea.' }
];

const FAQS = [
  { q: 'Where is the spa in Mahipalpur, and how do I reach it?',
    a: ['We are in Mahipalpur, New Delhi 110037, on the airport corridor just off NH-48. From IGI Airport ' +
        'Terminal 3 it is about a 10-minute drive, and from the Aerocity hotel cluster 5 to 7 minutes by cab. ' +
        'Message us on WhatsApp and we will send door-to-door directions from wherever you are starting.'] },
  { q: 'Do you serve guests coming from Aerocity?',
    a: ['Yes. Aerocity guests are a large share of our bookings, because we are the nearest full Russian banya ' +
        'to that hotel cluster and we are open at any hour. The <a href="/russian-spa-in-aerocity.html">Aerocity ' +
        'page</a> covers the route, the timing and what to book if you only have an hour between flights.'] },
  { q: 'What does a full body massage cost?',
    a: ['A 60-minute Swedish full body massage is ₹2,500, and signature aromatherapy is also ₹2,500. Deep tissue ' +
        'and sports recovery are ₹3,000 for 60 minutes. The shortest session — 30 minutes on head, neck and ' +
        'shoulders — is ₹1,500. Every rate is on this page and on the <a href="/services.html">services page</a>, ' +
        'and the price you are quoted is the price you pay.'] },
  { q: 'What is a Russian banya, and how is it different from a sauna?',
    a: ['A banya uses moist heat rather than the dry heat of a Finnish sauna, held at roughly 70–90°C with the ' +
        'humidity controlled. What makes it distinctly Russian is the venik — a bundle of birch leaves a therapist ' +
        'uses to work over the body during the heat phase. A full cycle alternates steam, a cold plunge and a rest ' +
        'period with herbal tea.'] },
  { q: 'Do I need to book, or can I walk in?',
    a: ['Walk-ins are welcome and we are open around the clock. We do recommend messaging ahead for the banya and ' +
        'the couples suite, because both need a room held for a fixed slot.'] },
  { q: 'Can I ask for a male or a female therapist?',
    a: ['Yes. We have both male and female therapists on shift, and you can state a preference when you book or ' +
        'when you arrive. Every treatment takes place in a private, temperature-controlled room with proper ' +
        'draping, and there are no cameras in treatment areas.'] },
  { q: 'What should I bring to my first visit?',
    a: ['Nothing. Fresh towels, a robe, slippers, shower amenities and a locker are provided. Arrive a few minutes ' +
        'early so there is time for a short conversation with your therapist about pressure, problem areas and ' +
        'anything they should know before starting.'] },
  { q: 'Is the banya suitable for everyone?',
    a: ['The banya is a heat-based treatment. If you have a heart condition, high or low blood pressure, are ' +
        'pregnant, or are unsure for any other reason, speak to our staff before booking and to your doctor if you ' +
        'have any doubt. Our treatments are wellness services rather than medical treatment, and we will happily ' +
        'suggest a gentler alternative from the menu.'] },
  { q: 'How do I pay?', a: [PAYMENTS] }
];

/* --------------------------------------------------------------------------
   MARKUP
   -------------------------------------------------------------------------- */
const tiles = TILES.map((t) => `            <a class="tile" href="/services.html#${t.slug}" data-reveal>
              ${img(t.img, t.alt, 'tile')}
              <span>${esc(t.label)}</span>
            </a>`).join('\n');

const serviceCards = SERVICES.map((s) => `            <article class="card" data-reveal>
              <div class="card__media">${img('svc-' + s.slug, SVC_ALT[s.slug], 'svc')}</div>
              <div class="card__body">
                <h3>${esc(s.name)}</h3>
                <p>${s.short}</p>
                <p class="card__meta">
                  <span class="card__price">${rupees(s.price)}${s.priceNote ? ` <small>${esc(s.priceNote)}</small>` : ''}</span>
                  <span class="card__dur">${esc(s.duration)}</span>
                </p>
                <a class="btn btn--wa btn--sm btn--block" href="${wa('Hello, I would like to book the ' + s.name + ' (' + s.duration + ') at your Mahipalpur spa.')}" rel="noopener" target="_blank">
                  ${waIcon} Book on WhatsApp
                </a>
              </div>
            </article>`).join('\n');

const facilityCards = FACILITIES.map((f) => `            <div class="feature" data-reveal>
              <div class="feature__icon" aria-hidden="true">${f.icon}</div>
              <h3>${esc(f.title)}</h3>
              <p>${f.body}</p>
            </div>`).join('\n');

const planCards = MEMBERSHIPS.map((m, i) => `            <div class="plan${i === 1 ? ' plan--featured' : ''}" data-reveal>
              <p class="plan__name">${esc(m.name)} membership</p>
              <p class="plan__price">${rupees(m.price)} <small>/ month</small></p>
              <ul>
${m.includes.map((x) => `                <li>${esc(x)}</li>`).join('\n')}
              </ul>
              <a class="btn btn--outline btn--sm" href="${wa('Hello, I would like details of the ' + m.name + ' membership.')}" rel="noopener" target="_blank">Ask about ${esc(m.name)}</a>
            </div>`).join('\n');

const rateRows = EXTRA_RATES.map((r) => `                <tr>
                  <th scope="row">${esc(r.name)}${r.note ? ` <span style="font-weight:400;color:var(--muted)">— ${esc(r.note)}</span>` : ''}</th>
                  <td>${esc(r.duration)}</td>
                  <td>${r.price === null ? 'On enquiry' : rupees(r.price)}</td>
                </tr>`).join('\n');

const locationCards = LOC_CARDS.map((l) => `            <article class="card" data-reveal>
              <div class="card__media">${img(l.img, l.alt, 'loc')}</div>
              <div class="card__body">
                <p class="tag">${l.tag}</p>
                <h3><a href="${l.href}">${esc(l.title)}</a></h3>
                <p>${l.body}</p>
                <p style="margin-top:var(--sp-3)"><a class="arrow" href="${l.href}">Read the ${esc(l.title)} guide</a></p>
              </div>
            </article>`).join('\n');

const stepItems = STEPS.map((s) => `            <li data-reveal>
              <h3>${esc(s.h)}</h3>
              <p>${s.p}</p>
            </li>`).join('\n');

/* ==========================================================================
   PAGE
   ========================================================================== */
const page = {
  file: 'index.html',
  title: TITLE,
  description: DESCRIPTION,
  ogTitle: 'Russian Spa in Mahipalpur & Aerocity — Banya & Body Massage',
  ogImage: HERO,
  ogImageAlt: 'Guest receiving a relaxing body massage in a candlelit spa room',
  heroImage: HERO,
  faqs: FAQS,
  offerCatalog: SERVICES,

  body: `
  <main id="main-content">

    <!-- ============================ HERO ============================ -->
    <section class="hero">
      <div class="hero__bg">
        <img src="/${HERO}"
             alt="Guest receiving a relaxing full body massage in a candlelit spa room in Mahipalpur, New Delhi"
             width="960" height="640" fetchpriority="high" decoding="async">
      </div>
      <div class="wrap">
        <div class="hero__inner">
          <p class="pill"><span class="dot" aria-hidden="true"></span> Open 24 hours · Mahipalpur, New Delhi</p>
          <h1>Russian Spa in <em>Mahipalpur</em> &amp; Delhi Aerocity</h1>
          <p class="hero__sub">
            Traditional Russian banya and full body massage by trained therapists, in private rooms on the
            airport corridor — five minutes from the Aerocity hotels, ten from Terminal&nbsp;3. Sessions from
            ₹1,500, any hour of the day or night.
          </p>
          <div class="btn-row">
            <a class="btn btn--wa" href="${WA_GENERAL}" rel="noopener" target="_blank">${waIcon} Chat on WhatsApp</a>
            <a class="btn btn--outline" href="tel:${CFG.PHONE_HREF}">${telIcon} Call ${CFG.PHONE_DISPLAY}</a>
          </div>
          <ul class="hero__facts">
            <li><strong>24 hours</strong> Every day of the year</li>
            <li><strong>From ₹1,500</strong> 30-minute session</li>
            <li><strong>9 treatments</strong> Banya, massage, couples</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ========================= CATEGORIES ========================= -->
    <section class="section section--white">
      <div class="wrap">
        <div class="section-head" data-reveal>
          <span class="eyebrow">What we do</span>
          <h2>Massage &amp; Spa Services in Mahipalpur and Aerocity</h2>
          <p>
            Looking for a spa in Mahipalpur or a spa in Aerocity? We offer body massage near Delhi Airport in a
            calm, private setting — Russian banya heat therapy alongside a full oil and dry massage menu,
            with male and female therapists on shift around the clock.
          </p>
        </div>
        <div class="grid grid--6">
${tiles}
        </div>
      </div>
    </section>

    <!-- ========================= TREATMENTS ========================= -->
    <section class="section section--blush" id="treatments">
      <div class="wrap">
        <div class="section-head" data-reveal>
          <span class="eyebrow">Treatments</span>
          <h2>Explore Our Spa Treatments</h2>
          <p>
            Nine treatments, from a thirty-minute neck session to a two-hour retreat for two. Every price is the
            published rate for a single session — there is no package pressure at the desk.
          </p>
        </div>
        <div class="grid grid--3">
${serviceCards}
        </div>
        <p style="text-align:center;margin-top:var(--sp-5)">
          <a class="btn btn--rose" href="/services.html">See full treatment details</a>
        </p>
      </div>
    </section>

    <!-- =========================== ABOUT ============================ -->
    <section class="section section--dark">
      <div class="wrap">
        <div class="split split--flip">
          <div data-reveal>
            <span class="eyebrow">About the spa</span>
            <h2>A banya is a room, not a machine</h2>
            <p>
              Most spas in Delhi can offer you a steam cabinet. Very few can offer a banya, because a banya is not
              equipment — it is a room built to hold moist heat at a specific range, a cold plunge placed within a
              few steps of it, and someone who knows how to use a venik.
            </p>
            <ul class="ticks">
              <li>Birch venik bundles imported rather than substituted, because the leaf is the point.</li>
              <li>The cold plunge sits beside the steam room, so the contrast is immediate.</li>
              <li>A quiet rest lounge, because the third phase of the cycle matters as much as the first two.</li>
              <li>A full massage menu alongside it, so the banya can be the whole visit or half of one.</li>
            </ul>
            <p style="margin-top:var(--sp-4)"><a class="arrow" href="/about.html">More about how we work</a></p>
          </div>
          <div class="split__media" data-reveal>
            ${img('banya-steam-room', 'Tiered wooden benches inside a banya steam room', 'room')}
          </div>
        </div>
      </div>
    </section>

    <!-- ========================= FACILITIES ========================= -->
    <section class="section section--white">
      <div class="wrap">
        <div class="section-head" data-reveal>
          <span class="eyebrow">The facility</span>
          <h2>What is actually here</h2>
          <p>No marketing adjectives — just the things you will find when you walk in.</p>
        </div>
        <div class="grid grid--3">
${facilityCards}
        </div>
      </div>
    </section>

    <!-- ===================== PACKAGES & PRICING ===================== -->
    <section class="section section--blush" id="pricing">
      <div class="wrap">
        <div class="section-head" data-reveal>
          <span class="eyebrow">Pricing</span>
          <h2>Packages &amp; Memberships</h2>
          <p>Monthly memberships for regular guests, plus the two multi-treatment packages on the rate card.</p>
        </div>

        <div class="grid grid--3">
${planCards}
        </div>

        <div class="rates__scroll" style="margin-top:var(--sp-5)" data-reveal>
          <table class="rates">
            <thead>
              <tr><th scope="col">Package</th><th scope="col">Duration</th><th scope="col">Rate</th></tr>
            </thead>
            <tbody>
${rateRows}
            </tbody>
          </table>
        </div>
        <p style="text-align:center;margin-top:var(--sp-4);font-size:.82rem;color:var(--muted)">
          ${esc(PAYMENTS)}
        </p>
      </div>
    </section>

    <!-- ========================= LOCATIONS ========================== -->
    <section class="section section--white" id="locations">
      <div class="wrap">
        <div class="section-head" data-reveal>
          <span class="eyebrow">Getting here</span>
          <h2>One spa in Mahipalpur — and who travels to it</h2>
          <p>
            There is a single location. These pages cover the route, the journey time and what to expect if you
            are coming from Aerocity, Gurgaon or elsewhere in Delhi.
          </p>
        </div>
        <div class="loc">
${locationCards}
        </div>
      </div>
    </section>

    <!-- ========================== BOOKING =========================== -->
    <section class="section section--blush">
      <div class="wrap">
        <div class="section-head" data-reveal>
          <span class="eyebrow">Your visit</span>
          <h2>How to Book an Appointment</h2>
          <p>Booking takes a couple of messages. Walk-ins are welcome too, at any hour.</p>
        </div>
        <ol class="steps">
${stepItems}
        </ol>
      </div>
    </section>

    <!-- ============================ FAQ ============================= -->
    <section class="section section--white">
      <div class="wrap wrap--narrow">
        <div class="section-head" data-reveal>
          <span class="eyebrow">Questions</span>
          <h2>Frequently Asked Questions</h2>
          <p>Location, rates, therapists and what to expect on a first visit.</p>
        </div>
        <div class="faq">
${faqBlock(FAQS, 'home')}
        </div>
      </div>
    </section>

    <!-- ========================= AREAS + NAP ======================== -->
    <section class="section section--blush">
      <div class="wrap">
        <ul class="pills" style="margin-bottom:var(--section-y)">
${T.LOCATIONS.map((l) => `          <li><a href="/${l.file}">${esc(l.short)}</a></li>`).join('\n')}
        </ul>
${napBlock()}
      </div>
    </section>

${ctaBand({
  heading: 'Book your session',
  body: 'Message us on WhatsApp with the treatment and a rough time, and we will confirm the slot. The banya ' +
        'and the couples suite are worth booking ahead, because both need a room held for a fixed slot.'
})}

  </main>
`
};

module.exports = { file: page.file, title: page.title, description: page.description, render: () => shell(page) };
