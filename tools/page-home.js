'use strict';

const { CFG, ctaBand, faqBlock } = require('./partials');
const S = require('./schema');
const { SERVICES, FACILITIES } = require('./data');

const FAQS = [
  {
    q: 'What is a Russian banya, and how is it different from a sauna?',
    a: ['A banya uses moist heat rather than the dry heat of a Finnish sauna, held at roughly 70–90°C with the humidity ' +
        'controlled. The part that makes it distinctly Russian is the venik — a bundle of birch leaves a therapist uses ' +
        'to work over the body during the heat phase. A full cycle alternates steam, a cold plunge and a rest period ' +
        'with herbal tea.']
  },
  {
    q: 'Do I need to book, or can I walk in?',
    a: ['Walk-ins are welcome and we are open around the clock. We do recommend calling ahead for the banya and for the ' +
        'couples suite, because both need a room held for a fixed slot.']
  },
  {
    q: 'Which treatments do you offer?',
    a: ['Nine treatments: the traditional Russian banya, Russian deep tissue therapy, a couples retreat, signature ' +
        'aromatherapy, Swedish full body massage, Thai yoga massage, Ayurvedic Abhyanga, sports and recovery massage, ' +
        'and a 30-minute head, neck and shoulder express. The <a href="/services.html">services page</a> lists what each ' +
        'one involves along with current rates.']
  },
  {
    q: 'Where exactly are you, and which areas do you serve?',
    a: ['We are in Mahipalpur, New Delhi 110037, close to the airport corridor. Guests travel to us regularly from ' +
        '<a href="/russian-spa-in-aerocity.html">Aerocity</a>, <a href="/russian-spa-in-gurgaon.html">Gurgaon</a> and ' +
        'across <a href="/russian-spa-in-new-delhi.html">New Delhi</a>. Call us for door-to-door directions from where ' +
        'you are starting.']
  },
  {
    q: 'What should I bring to my first visit?',
    a: ['Nothing. Fresh towels, a robe, slippers, shower amenities and a locker are provided. Arrive a few minutes ' +
        'early so there is time for a short conversation with your therapist about pressure, problem areas and anything ' +
        'they should know before starting.']
  },
  {
    q: 'Is the banya suitable for everyone?',
    a: ['The banya is a heat-based treatment. If you have a heart condition, high or low blood pressure, are pregnant, ' +
        'or are unsure for any other reason, speak to our staff before booking and to your doctor if you have any doubt. ' +
        'Our treatments are wellness services rather than medical treatment, and we will happily suggest a gentler ' +
        'alternative from the menu.']
  }
];

/* Six featured treatments on the homepage; the full nine live on /services.html */
const FEATURED = ['russian-banya', 'deep-tissue', 'couples-retreat', 'aromatherapy', 'sports-recovery', 'express']
  .map((slug) => SERVICES.find((s) => s.slug === slug));

const LOCATION_CARDS = [
  {
    href: '/russian-spa-in-mahipalpur.html',
    title: 'Mahipalpur',
    tag: 'Where we are',
    body: 'Our own neighbourhood — the banya room, the cold plunge and the treatment suites are all here.',
    img: 'assets/mahipalpur-assets/mahipalpur-venik-birch-massage.jpg', w: 900, h: 614,
    alt: 'Birch venik bundle resting on a bench in the Mahipalpur banya room'
  },
  {
    href: '/russian-spa-in-aerocity.html',
    title: 'Aerocity',
    tag: '5–7 minutes by cab',
    body: 'The nearest full banya to the Aerocity hotel cluster, open at whatever hour your schedule lands on.',
    img: 'assets/aerocity-assets/aerocity-couples-therapy-room.jpg', w: 900, h: 601,
    alt: 'Treatment room prepared for guests visiting from Aerocity hotels'
  },
  {
    href: '/russian-spa-in-gurgaon.html',
    title: 'Gurgaon',
    tag: '18–22 min from Cyber City',
    body: 'A straight run up NH-48 from the Gurgaon corporate belt, with late sessions for long working days.',
    img: 'assets/gurgaon-assets/gurgaon-deep-tissue-session.jpg', w: 900, h: 600,
    alt: 'Deep tissue recovery session of the kind booked by guests from Gurgaon'
  },
  {
    href: '/russian-spa-in-new-delhi.html',
    title: 'New Delhi',
    tag: 'Across the city',
    body: 'Reachable from south, central and west Delhi, and directly on the Airport Express metro corridor.',
    img: 'assets/new-delhi-assets/new-delhi-wellness-lounge.jpg', w: 900, h: 1350,
    alt: 'Relaxation lounge used by guests travelling in from across New Delhi'
  }
];

const serviceCards = FEATURED.map((s, i) => `          <article class="card spotlight" data-reveal data-reveal-delay="${i * 70}">
            <div class="card__media">
              <img src="/${s.img}" alt="${s.alt}" width="${s.w}" height="${s.h}" loading="lazy" decoding="async">
            </div>
            <div class="card__body">
              <p class="card__meta"><span>${s.duration}</span><span class="card__price">₹${s.price.toLocaleString('en-IN')}${s.priceNote ? ' ' + s.priceNote : ''}</span></p>
              <h3>${s.name}</h3>
              <p>${s.short}</p>
              <p class="card__foot"><a class="link-arrow" href="/services.html#${s.slug}">What this involves</a></p>
            </div>
          </article>`).join('\n');

const facilityCards = FACILITIES.map((f, i) => `          <div class="feature" data-reveal data-reveal-delay="${i * 60}">
            <div class="feature__icon" aria-hidden="true">${f.icon}</div>
            <h3>${f.title}</h3>
            <p>${f.body}</p>
          </div>`).join('\n');

const locationCards = LOCATION_CARDS.map((l, i) => `          <article class="card loc-card tilt" data-tilt="5" data-reveal data-reveal-delay="${i * 70}">
            <div class="card__media">
              <img src="/${l.img}" alt="${l.alt}" width="${l.w}" height="${l.h}" loading="lazy" decoding="async">
            </div>
            <div class="loc-card__body">
              <p class="loc-card__distance">${l.tag}</p>
              <h3><a href="${l.href}" style="text-decoration:none;color:inherit">${l.title}</a></h3>
              <p>${l.body}</p>
              <p class="card__foot"><a class="link-arrow" href="${l.href}">Read the ${l.title} guide</a></p>
            </div>
          </article>`).join('\n');

const marqueeItems = [
  'Traditional Russian Banya', 'Birch Venik Ritual', 'Deep Tissue Therapy',
  'Couples Retreat', 'Ayurvedic Abhyanga', 'Thai Yoga Massage',
  'Open 24 Hours', 'Private Rooms'
];
const marquee = marqueeItems.concat(marqueeItems)
  .map((t) => `        <span class="marquee__item">${t}</span>`).join('\n');

const page = {
  file: 'index.html',
  title: 'Mayra Russian Spa | Banya & Massage, Mahipalpur Delhi',
  description:
    'Russian banya and massage in Mahipalpur, New Delhi. Traditional birch-venik banya, ' +
    'deep tissue, couples and Ayurvedic treatments. Open 24 hours.',
  ogTitle: 'Mayra Russian Spa — Authentic Russian Banya in Mahipalpur, Delhi',
  ogImage: 'assets/home-assets/hero-russian-banya-steam-room.jpg',
  ogImageAlt: 'Wood-panelled Russian banya steam room lit by warm low light',
  heroImage: 'assets/home-assets/hero-russian-banya-steam-room.jpg',

  schema: [
    S.organization(),
    S.website(),
    S.webPage({
      file: 'index.html',
      title: 'Mayra Russian Spa | Banya & Massage, Mahipalpur Delhi',
      description: 'Russian banya and massage therapy in Mahipalpur, New Delhi, open 24 hours.',
      ogImage: 'assets/home-assets/hero-russian-banya-steam-room.jpg'
    }),
    S.faqPage(FAQS)
  ],

  body: `
  <main id="main-content">

    <!-- ============================ HERO ============================ -->
    <section class="hero">
      <div class="aurora" aria-hidden="true"><span></span><span></span><span></span></div>
      <div class="container hero__inner">
        <div class="hero__grid">
          <div>
            <p class="hero__badge"><span class="dot" aria-hidden="true"></span> Open 24 hours · Mahipalpur</p>
            <h1><span class="split-text">Russian banya,</span> <span class="text-gradient split-text">done properly.</span></h1>
            <p class="lead">
              Steam, birch and cold water in the sequence Eastern Europe has used for centuries — plus a full
              massage menu, private rooms and a door that never closes. We are in
              <span data-site="address">${CFG.ADDRESS_SHORT}</span>, minutes from the airport corridor.
            </p>
            <div class="btn-row">
              <a class="btn btn--primary magnetic" data-spark href="tel:${CFG.PHONE_HREF}" data-site="phone-link">
                Call <span data-site="phone">${CFG.PHONE_DISPLAY}</span>
              </a>
              <a class="btn btn--ghost" href="/services.html">See treatments &amp; rates</a>
            </div>
          </div>

          <div class="hero__media" data-reveal="scale">
            <img src="/assets/home-assets/hero-russian-banya-steam-room.jpg"
                 alt="Wood-panelled Russian banya steam room with benches and warm low lighting"
                 width="1600" height="1067" fetchpriority="high" decoding="async">
            <div class="hero__chip">
              <div>
                <strong>The banya cycle</strong>
                Steam at 70–90°C, venik work, cold plunge, herbal tea. About 60 minutes.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========================= TICKER ============================ -->
    <section class="section--dark" style="padding-block:var(--sp-5)" aria-hidden="true">
      <div class="marquee">
        <div class="marquee__track">
${marquee}
        </div>
      </div>
    </section>

    <!-- ========================= INTRO ============================= -->
    <section class="section">
      <div class="container">
        <div class="split split--media-right">
          <div class="split__media" data-reveal="right">
            <img src="/assets/home-assets/home-banya-venik-ritual.jpg"
                 alt="Bundles of dried birch venik leaves prepared for a banya session"
                 width="1000" height="1131" loading="lazy" decoding="async">
          </div>
          <div data-reveal="left">
            <p class="eyebrow">Why we built this room</p>
            <h2 class="blur-text">A treatment that needs the right room to work</h2>
            <p class="lead">
              Most spas in Delhi can offer you a steam cabinet. Very few can offer a banya, because a banya is not
              equipment — it is a room built to hold moist heat at a specific range, a cold plunge placed within a few
              steps of it, and someone who knows how to use a venik.
            </p>
            <p>
              We imported the birch bundles rather than substituting a local leaf, because the leaf is the point. We
              put the cold plunge next to the steam room rather than down a corridor, because the contrast only works
              if it is immediate. And we kept the rest lounge quiet, because the third phase of the cycle matters as
              much as the first two.
            </p>
            <p>
              Alongside it sits a full massage menu — deep tissue, Swedish, Thai, Ayurvedic and aromatherapy — so the
              banya can be the whole visit or the first half of one.
            </p>
            <p style="margin-top:var(--sp-5)"><a class="link-arrow" href="/about.html">More about how we work</a></p>
          </div>
        </div>
      </div>
    </section>

    <!-- ========================= STATS ============================= -->
    <section class="section section--dark section--tight">
      <div class="container">
        <div class="stats">
          <div class="stat" data-reveal>
            <span class="count-up" data-count="24" aria-hidden="true">24</span>
            <span class="sr-only">24</span>
            <span class="stat__label">Hours open, daily</span>
          </div>
          <div class="stat" data-reveal data-reveal-delay="80">
            <span class="count-up" data-count="365" aria-hidden="true">365</span>
            <span class="sr-only">365</span>
            <span class="stat__label">Days a year</span>
          </div>
          <div class="stat" data-reveal data-reveal-delay="160">
            <span class="count-up" data-count="9" aria-hidden="true">9</span>
            <span class="sr-only">9</span>
            <span class="stat__label">Treatments on the menu</span>
          </div>
          <div class="stat" data-reveal data-reveal-delay="240">
            <span class="count-up" data-count="30" data-prefix="" data-suffix=" min" aria-hidden="true">30 min</span>
            <span class="sr-only">30 min</span>
            <span class="stat__label">Shortest session</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ======================== SERVICES =========================== -->
    <section class="section section--cream">
      <div class="container">
        <div class="section-head is-centered" data-reveal>
          <p class="eyebrow">Treatments</p>
          <h2>What you can book</h2>
          <p class="lead">
            Nine treatments, from a thirty-minute neck session to a two-hour retreat for two. Rates below are the
            published price for a single session.
          </p>
        </div>

        <div class="grid grid--3">
${serviceCards}
        </div>

        <p style="text-align:center;margin-top:var(--sp-7)">
          <a class="btn btn--dark" href="/services.html">View all nine treatments and rates</a>
        </p>
      </div>
    </section>

    <!-- ======================= FACILITIES ========================== -->
    <section class="section">
      <div class="container">
        <div class="section-head" data-reveal>
          <p class="eyebrow">The facility</p>
          <h2>What is actually here</h2>
          <p class="lead">No marketing adjectives — just the things you will find when you walk in.</p>
        </div>
        <div class="grid grid--3">
${facilityCards}
        </div>
      </div>
    </section>

    <!-- ======================== JOURNEY ============================ -->
    <section class="section section--dark">
      <div class="container">
        <div class="section-head" data-reveal>
          <p class="eyebrow">Your visit</p>
          <h2>How a session runs</h2>
        </div>
        <ol class="process">
          <li data-reveal>
            <h3>Arrive</h3>
            <p>Walk in or call ahead. You are shown to a changing room and given a robe, slippers and a locker.</p>
          </li>
          <li data-reveal data-reveal-delay="80">
            <h3>Talk it through</h3>
            <p>A short conversation with your therapist about pressure, problem areas and anything they should avoid.</p>
          </li>
          <li data-reveal data-reveal-delay="160">
            <h3>Treatment</h3>
            <p>Your session, in a private room. If it is the banya, you are taken into the heat gradually.</p>
          </li>
          <li data-reveal data-reveal-delay="240">
            <h3>Rest</h3>
            <p>Time in the relaxation lounge with herbal tea before you go back out. Do not skip this part.</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- ======================== LOCATIONS ========================== -->
    <section class="section section--cream" id="locations">
      <div class="container">
        <div class="section-head is-centered" data-reveal>
          <p class="eyebrow">Getting here</p>
          <h2>Where our guests travel from</h2>
          <p class="lead">
            There is one spa, in Mahipalpur. These pages cover the route, the timing and what to expect if you are
            coming from each of these areas.
          </p>
        </div>
        <div class="grid grid--4">
${locationCards}
        </div>
      </div>
    </section>

    <!-- =========================== FAQ ============================= -->
    <section class="section">
      <div class="container container--narrow">
        <div class="section-head is-centered" data-reveal>
          <p class="eyebrow">Questions</p>
          <h2>Frequently asked questions</h2>
        </div>
        <div class="faq">
${faqBlock(FAQS, 'home')}
        </div>
      </div>
    </section>

${ctaBand({
  heading: 'Book a session',
  body: 'Call for availability, or send an enquiry and we will come back to you. Walk-ins are welcome at any hour; ' +
        'the banya and the couples suite are worth booking ahead.',
  note: 'Massage and heat therapy are wellness services, not medical treatment.'
})}

  </main>
`
};

module.exports = page;
