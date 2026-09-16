'use strict';

/* ==========================================================================
   Location landing pages
   --------------------------------------------------------------------------
   These are four genuinely different pages, not one template with the city
   name substituted. Each has its own angle, its own sections, its own FAQs,
   its own images and its own internal links:

     Mahipalpur — the home neighbourhood; the banya room itself, in depth
     Aerocity   — hotel guests, flight crews and planning a layover
     Gurgaon    — the NH-48 commute, desk posture and late-night sessions
     New Delhi  — a city-wide orientation and what a banya actually is

   Travel times, distances and fares below are the ones stated on the source
   material. Nothing has been estimated or rounded in our favour, and no
   landmark relationship is claimed that the source did not state.
   ========================================================================== */

const { CFG, breadcrumb, ctaBand, faqBlock, contactStrip } = require('./partials');
const S = require('./schema');
const { SERVICES } = require('./data');

const svc = (slug) => SERVICES.find((s) => s.slug === slug);

/* Small helper for the service cards each page picks from the menu */
const cardsFor = (slugs) => slugs.map((slug, i) => {
  const s = svc(slug);
  return `          <article class="card spotlight" data-reveal data-reveal-delay="${i * 70}">
            <div class="card__media">
              <img src="/${s.img}" alt="${s.alt}" width="${s.w}" height="${s.h}" loading="lazy" decoding="async">
            </div>
            <div class="card__body">
              <p class="card__meta"><span>${s.duration}</span><span class="card__price">₹${s.price.toLocaleString('en-IN')}${s.priceNote ? ' ' + s.priceNote : ''}</span></p>
              <h3>${s.name}</h3>
              <p>${s.short}</p>
              <p class="card__foot"><a class="link-arrow" href="/services.html#${s.slug}">Full description</a></p>
            </div>
          </article>`;
}).join('\n');

const directionsList = (rows) => rows.map((r) => `          <li data-reveal>
            <strong>${r.from}</strong>
            <span class="time">${r.time}</span>
          </li>`).join('\n');

const relatedList = (links) => `        <ul class="related" data-reveal>
${links.map((l) => `          <li><a href="${l.href}">${l.label}</a></li>`).join('\n')}
        </ul>`;

/* ==========================================================================
   1. MAHIPALPUR — the home neighbourhood
   ========================================================================== */
const MAHIPALPUR_FAQS = [
  {
    q: 'What actually happens during a banya session here?',
    a: ['A full cycle runs about sixty minutes in three phases. You start in the steam room, held at roughly 70–90°C ' +
        'with the humidity controlled, where a therapist works over you with a soaked birch venik. Then the cold ' +
        'plunge, which is immediate and brief. Then the rest phase in the lounge with herbal tea. If you want a ' +
        'second round of heat and cold, there is time for it within the session.']
  },
  {
    q: 'I have never done a heat treatment. Will it be too much?',
    a: ['First-time guests are taken into the heat gradually rather than dropped into a full round. Tell your therapist ' +
        'it is your first banya and they will adjust the length of the heat phase and the intensity of the venik work. ' +
        'You can leave the steam room at any point — stepping out early is completely normal and nobody will ' +
        'discourage you.']
  },
  {
    q: 'Can I book a treatment at 3am in Mahipalpur?',
    a: ['Yes. We are open twenty-four hours, every day of the year. Late-night and early-morning bookings are routine ' +
        'here rather than an exception — the airport corridor runs on its own clock.']
  },
  {
    q: 'Is there parking, and how do I find the entrance?',
    a: ['Parking is available on site. The Mahipalpur service lanes are genuinely confusing on a first visit, so the ' +
        'reliable method is to call <a href="tel:' + CFG.PHONE_HREF + '" data-site="phone-link">' +
        '<span data-site="phone">' + CFG.PHONE_DISPLAY + '</span></a> when you are a couple of minutes out and let ' +
        'us talk you or your driver in from the main road.']
  },
  {
    q: 'What is the difference between the banya and the deep tissue massage?',
    a: ['The banya works through heat and contrast — it loosens the whole body at once and the effect is systemic. ' +
        'Deep tissue works through direct pressure on one area and is the better choice when a specific muscle has ' +
        'seized up. Guests who have both time and a stubborn problem area often take the banya first and the massage ' +
        'afterwards, since warm muscle responds better to pressure.']
  }
];

const mahipalpur = {
  file: 'russian-spa-in-mahipalpur.html',
  title: 'Russian Spa in Mahipalpur | Banya & Massage, Open 24 Hours',
  description:
    'Russian spa in Mahipalpur, New Delhi. Traditional birch-venik banya, cold plunge ' +
    'and a full massage menu in private rooms. Open 24 hours.',
  ogTitle: 'Russian Spa in Mahipalpur — Traditional Banya & Massage',
  ogImage: 'assets/mahipalpur-assets/mahipalpur-russian-banya-room.jpg',
  ogImageAlt: 'Banya heat room with timber benches at the Mahipalpur spa',
  heroImage: 'assets/mahipalpur-assets/mahipalpur-russian-banya-room.jpg',
  trail: [
    { label: 'Home', href: '/' },
    { label: 'Locations', href: '/#locations' },
    { label: 'Russian Spa in Mahipalpur' }
  ]
};

mahipalpur.schema = [
  S.webPage(mahipalpur),
  S.breadcrumbList(mahipalpur.trail),
  S.locationService({
    name: 'Russian banya and massage therapy in Mahipalpur',
    areaName: 'Mahipalpur, New Delhi',
    description: 'Traditional Russian banya with birch venik, cold plunge and a full massage menu, ' +
                 'delivered in private rooms in Mahipalpur, New Delhi, twenty-four hours a day.'
  }),
  S.faqPage(MAHIPALPUR_FAQS)
];

mahipalpur.body = `
  <main id="main-content">

    <section class="hero hero--compact">
      <div class="aurora" aria-hidden="true"><span></span><span></span><span></span></div>
      <div class="container hero__inner">
${breadcrumb(mahipalpur.trail)}
        <div class="hero__grid">
          <div>
            <p class="hero__badge"><span class="dot" aria-hidden="true"></span> This is where we are</p>
            <h1 class="split-text">Russian Spa in Mahipalpur</h1>
            <p class="lead">
              The banya room, the cold plunge, the treatment suites and the lounge are all here in Mahipalpur,
              New Delhi 110037. Not a branch, not a partner venue — this is the spa itself.
            </p>
            <div class="btn-row">
              <a class="btn btn--primary magnetic" data-spark href="tel:${CFG.PHONE_HREF}" data-site="phone-link">
                Call <span data-site="phone">${CFG.PHONE_DISPLAY}</span>
              </a>
              <a class="btn btn--ghost" href="/services.html">Treatments &amp; rates</a>
            </div>
          </div>
          <div class="hero__media" data-reveal="scale">
            <img src="/assets/mahipalpur-assets/mahipalpur-russian-banya-room.jpg"
                 alt="Timber-lined banya heat room with tiered benches, prepared for a session"
                 width="1400" height="933" fetchpriority="high" decoding="async">
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container container--narrow">
        <p class="eyebrow">The short version</p>
        <h2 class="blur-text">A banya is a room, not a machine</h2>
        <p class="lead">
          Plenty of places in Delhi will sell you a steam session. What distinguishes a Russian spa is a room built to
          hold moist heat in a specific band, a cold plunge placed within a few steps of its door, and a therapist who
          knows what to do with a bundle of birch.
        </p>
        <p>
          Mahipalpur is where we put all three, and the reason is straightforward. The banya cycle only works if the
          contrast between heat and cold is immediate — walk thirty metres down a corridor to reach the cold water and
          you have lost the effect. So the floor plan was built around the sequence rather than the sequence being
          fitted into an existing floor plan. That is the kind of decision that is impossible to retrofit, and it is
          why this page is about one location rather than a network of them.
        </p>
      </div>
    </section>

    <section class="section section--cream">
      <div class="container">
        <div class="split">
          <div class="split__media" data-reveal="left">
            <img src="/assets/mahipalpur-assets/mahipalpur-venik-birch-massage.jpg"
                 alt="Soaked birch venik bundle resting on a bench beside a water bucket"
                 width="900" height="614" loading="lazy" decoding="async">
          </div>
          <div data-reveal="right">
            <h2>Inside the banya room</h2>
            <p>
              The steam room runs at roughly 70–90°C with the humidity held deliberately high — that combination is
              what makes it a banya rather than a sauna, where the air is dry and the temperature usually higher.
              Moist heat at this range carries into the body faster and feels heavier, which is why sessions are
              structured in rounds rather than one long sit.
            </p>
            <p>
              During the heat phase the therapist works with the venik. The bundle is soaked first, then used to fan
              hot air down onto the skin in waves, press heat into the back and legs, and finish with lighter strokes
              that leave the leaf oils behind. It looks unusual the first time you see it. It is also the part guests
              come back for.
            </p>
            <p>
              Then the plunge — brief, cold, and over quickly — followed by the rest phase in the lounge with herbal
              tea. That third phase is not padding. It is where the body settles and where most of the effect of the
              cycle actually lands, so we build the time into the session rather than hurrying you back out.
            </p>
            <p style="margin-top:var(--sp-5)">
              <a class="link-arrow" href="/services.html#russian-banya">Banya session details and rate</a>
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head" data-reveal>
          <p class="eyebrow">The neighbourhood</p>
          <h2>Why a spa like this ends up in Mahipalpur</h2>
        </div>
        <div class="grid grid--2">
          <div data-reveal>
            <p>
              Mahipalpur sits on the airport corridor in south-west Delhi, immediately off NH-48 and a short run from
              IGI Airport Terminal 3. That geography has made it a hotel district, and a hotel district generates a
              very particular kind of demand: people who have just got off a long flight, people with several hours to
              fill before a departure, and crew finishing shifts at hours when the rest of the city is asleep.
            </p>
            <p>
              It also sits between places. Aerocity is a few minutes north, Vasant Kunj a quarter of an hour east,
              Dwarka twenty minutes west, and the Gurgaon corporate belt a straight run down the highway. None of those
              areas has a traditional banya, so guests travel in from all of them.
            </p>
          </div>
          <div data-reveal data-reveal-delay="90">
            <p>
              The practical consequence is our opening hours. A spa serving an office district can close at nine. A spa
              on the airport corridor cannot, because its guests arrive on flight schedules rather than working ones.
              We are open twenty-four hours a day, every day of the year.
            </p>
            <p>
              The less convenient consequence is the service lanes. Mahipalpur's roads are not intuitive on a first
              visit, and map pins in the area are unreliable. Call us when you are close and we will direct you in.
              It takes thirty seconds and saves considerably more.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--dark">
      <div class="container">
        <div class="section-head" data-reveal>
          <p class="eyebrow">Travel times</p>
          <h2>Reaching us from nearby</h2>
          <p class="lead">Approximate journey times by road, as quoted for our location.</p>
        </div>
        <ul class="directions">
${directionsList([
  { from: 'Aerocity hotel cluster', time: '5–7 min by cab' },
  { from: 'IGI Airport Terminal 3, via NH-48', time: '≈10 min' },
  { from: 'Aerocity Metro Station', time: '5 min by auto' },
  { from: 'Vasant Kunj', time: '≈15 min' },
  { from: 'Dwarka', time: '≈20 min' },
  { from: 'Gurgaon Cyber City, via NH-48', time: '18–22 min' }
])}
        </ul>
        <p class="notice" style="margin-top:var(--sp-6)">
          <strong>Traffic, obviously.</strong> These are ordinary-conditions estimates on the routes our guests
          actually use. The NH-48 stretch varies a lot at peak hours. If your timing is tight, call before you set out.
        </p>
      </div>
    </section>

    <section class="section section--cream">
      <div class="container">
        <div class="section-head is-centered" data-reveal>
          <p class="eyebrow">Most booked here</p>
          <h2>Popular treatments in Mahipalpur</h2>
        </div>
        <div class="grid grid--3">
${cardsFor(['russian-banya', 'deep-tissue', 'couples-retreat'])}
        </div>
        <p style="text-align:center;margin-top:var(--sp-7)">
          <a class="btn btn--dark" href="/services.html">See all nine treatments</a>
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container container--narrow">
        <div class="section-head is-centered" data-reveal>
          <p class="eyebrow">Questions</p>
          <h2>Russian spa in Mahipalpur — FAQs</h2>
        </div>
        <div class="faq">
${faqBlock(MAHIPALPUR_FAQS, 'mahipalpur')}
        </div>
      </div>
    </section>

    <section class="section section--tight">
      <div class="container">
${contactStrip()}
        <h2 style="font-size:var(--fs-lg);margin-top:var(--sp-7)">Coming from somewhere else?</h2>
${relatedList([
  { href: '/russian-spa-in-aerocity.html', label: 'Travelling from Aerocity' },
  { href: '/russian-spa-in-gurgaon.html', label: 'Travelling from Gurgaon' },
  { href: '/russian-spa-in-new-delhi.html', label: 'Travelling across New Delhi' },
  { href: '/about.html', label: 'How we work' },
  { href: '/gallery.html', label: 'See the rooms' }
])}
      </div>
    </section>

${ctaBand({
  heading: 'Book a banya in Mahipalpur',
  body: 'Walk in at any hour, or call ahead so the heat room is ready when you arrive. The banya and the couples ' +
        'suite are the two worth reserving.',
  note: null
})}

  </main>
`;

/* ==========================================================================
   2. AEROCITY — hotel guests, crews and layovers
   ========================================================================== */
const AEROCITY_FAQS = [
  {
    q: 'How far is the spa from the Aerocity hotels?',
    a: ['Five to seven minutes by cab from the Aerocity hotel cluster, with a typical fare in the ₹80–150 range. ' +
        'From Aerocity Metro Station it is about five minutes by auto. We are in Mahipalpur, just along the airport ' +
        'corridor rather than inside the Aerocity complex itself.']
  },
  {
    q: 'I have a long layover at Delhi airport. Is there time for a treatment?',
    a: ['It depends how long the gap is and whether you can leave the terminal. Terminal 3 is around ten minutes away ' +
        'via NH-48. As a rough guide, budget the treatment length plus about an hour of travel and changing on top, ' +
        'and keep a comfortable margin for airport formalities. For a short gap the 30-minute head, neck and shoulder ' +
        'express is the sensible choice; for a long one there is time for a full banya cycle.']
  },
  {
    q: 'Are you open when my flight lands at 2am?',
    a: ['Yes. Twenty-four hours a day, seven days a week, three hundred and sixty-five days a year. Overnight ' +
        'bookings from arriving passengers and finishing crew are a normal part of the week here.']
  },
  {
    q: 'Why not just use my hotel spa in Aerocity?',
    a: ['If your hotel spa suits you, use it — the honest difference is the banya. A hotel spa will generally offer ' +
        'massage and a steam cabinet; a traditional banya needs a purpose-built heat room, an adjacent cold plunge ' +
        'and venik work, which is a different proposition from a steam room. On the massage menu itself there is far ' +
        'more overlap.']
  },
  {
    q: 'Do you arrange transport from Aerocity hotels?',
    a: ['We can help arrange transport for guests booking premium packages. For a standard treatment a cab or auto ' +
        'from the hotel rank is quick and inexpensive. Call us and we will tell you which makes more sense for the ' +
        'time of day.']
  },
  {
    q: 'Can I request a female therapist?',
    a: ['Yes. Both male and female therapists are on shift and you can state a preference when you book or when you ' +
        'arrive. Every treatment takes place in a private room.']
  }
];

const aerocity = {
  file: 'russian-spa-in-aerocity.html',
  title: 'Russian Spa Near Aerocity | 5 Minutes From the Hotel Cluster',
  description:
    'Russian spa near Aerocity, Delhi. Traditional banya and massage 5-7 minutes from the ' +
    'Aerocity hotels, 10 from IGI Terminal 3. Open 24 hours.',
  ogTitle: 'Russian Spa Near Aerocity — Banya & Massage, Open 24 Hours',
  ogImage: 'assets/aerocity-assets/aerocity-spa-treatment-suite.jpg',
  ogImageAlt: 'Private treatment suite prepared for a guest arriving from Aerocity',
  heroImage: 'assets/aerocity-assets/aerocity-spa-treatment-suite.jpg',
  trail: [
    { label: 'Home', href: '/' },
    { label: 'Locations', href: '/#locations' },
    { label: 'Russian Spa in Aerocity' }
  ]
};

aerocity.schema = [
  S.webPage(aerocity),
  S.breadcrumbList(aerocity.trail),
  S.locationService({
    name: 'Russian banya and massage therapy for Aerocity guests',
    areaName: 'Aerocity, New Delhi',
    description: 'Traditional Russian banya and massage treatments in Mahipalpur, five to seven minutes by road ' +
                 'from the Aerocity hotel cluster, available twenty-four hours a day.'
  }),
  S.faqPage(AEROCITY_FAQS)
];

aerocity.body = `
  <main id="main-content">

    <section class="hero hero--compact">
      <div class="aurora" aria-hidden="true"><span></span><span></span><span></span></div>
      <div class="container hero__inner">
${breadcrumb(aerocity.trail)}
        <div class="hero__grid">
          <div>
            <p class="hero__badge"><span class="dot" aria-hidden="true"></span> 5–7 minutes from the hotels</p>
            <h1 class="split-text">Russian Spa near Aerocity</h1>
            <p class="lead">
              A traditional banya and a full massage menu, a few minutes down the corridor from the Aerocity hotel
              cluster — and open at whatever hour your flight, your shift or your layover happens to end.
            </p>
            <div class="btn-row">
              <a class="btn btn--primary magnetic" data-spark href="tel:${CFG.PHONE_HREF}" data-site="phone-link">
                Call <span data-site="phone">${CFG.PHONE_DISPLAY}</span>
              </a>
              <a class="btn btn--ghost" href="#layover">Planning a layover?</a>
            </div>
          </div>
          <div class="hero__media" data-reveal="scale">
            <img src="/assets/aerocity-assets/aerocity-spa-treatment-suite.jpg"
                 alt="Private treatment suite with fresh linen, prepared for an arriving guest"
                 width="1400" height="934" fetchpriority="high" decoding="async">
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container container--narrow">
        <p class="eyebrow">Orientation</p>
        <h2 class="blur-text">Close to Aerocity, but not inside it</h2>
        <p class="lead">
          We are in Mahipalpur, on the same airport corridor, five to seven minutes by cab from the Aerocity hotel
          cluster and about ten minutes from Terminal 3 via NH-48.
        </p>
        <p>
          That distinction is worth stating plainly, because a lot of listings blur it. Aerocity is a planned
          hospitality district beside the airport; Mahipalpur is the older neighbourhood next to it. We are in the
          second one. The practical effect for you is a short cab ride — typically ₹80–150 from the hotel rank, or
          about five minutes by auto from Aerocity Metro Station on the Airport Express and Yellow Line corridor.
        </p>
        <p>
          The reason guests make that short trip is specific: the banya. Hotel spas in Aerocity are generally good at
          massage and will often have a steam cabinet. A traditional Russian banya is a different piece of
          infrastructure — a purpose-built heat room held at moist 70–90°C, a cold plunge a few steps from its door,
          and venik work with imported birch. That is not something a hotel treatment floor can improvise.
        </p>
      </div>
    </section>

    <section class="section section--dark" id="layover">
      <div class="container">
        <div class="split">
          <div class="split__media" data-reveal="left">
            <img src="/assets/aerocity-assets/aerocity-late-night-relaxation.jpg"
                 alt="Dimly lit relaxation area used by guests arriving late at night"
                 width="900" height="1350" loading="lazy" decoding="async">
          </div>
          <div data-reveal="right">
            <h2>Working out whether a layover fits</h2>
            <p>
              This is the question we are asked most often, so here is the arithmetic rather than a sales answer.
              Terminal 3 is roughly ten minutes away by road. Add changing, a short consultation and the trip back,
              and the round trip outside the treatment itself comes to about an hour — more if you are checking
              luggage or clearing immigration on the way out and back in.
            </p>
            <p>
              So: work from your gap, subtract a comfortable airport margin, subtract that hour, and book whatever
              fits the remainder.
            </p>
            <ul class="checklist">
              <li><strong>A short gap</strong> — the 30-minute head, neck and shoulder express. No full change of
                  clothes, no recovery time, straight back out.</li>
              <li><strong>A medium gap</strong> — a 60-minute Swedish, aromatherapy or deep tissue session on a table.</li>
              <li><strong>A long gap</strong> — a full banya cycle, with the heat, the plunge and an unhurried rest
                  phase afterwards.</li>
            </ul>
            <p style="margin-top:var(--sp-5)">
              If you are unsure, call and tell us your landing and departure times. We will tell you honestly whether
              it works, including when the answer is that it does not.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head" data-reveal>
          <p class="eyebrow">Getting here</p>
          <h2>Routes from the Aerocity area</h2>
        </div>
        <ul class="directions">
${directionsList([
  { from: 'Aerocity hotel cluster, by cab', time: '5–7 min · ₹80–150' },
  { from: 'Aerocity Metro Station, by auto', time: '≈5 min' },
  { from: 'IGI Airport Terminal 3, via NH-48', time: '≈10 min' },
  { from: 'Vasant Kunj', time: '≈15 min' },
  { from: 'Dwarka', time: '≈20 min' }
])}
        </ul>
      </div>
    </section>

    <section class="section section--cream">
      <div class="container">
        <div class="section-head is-centered" data-reveal>
          <p class="eyebrow">Suited to travel</p>
          <h2>What arriving guests usually book</h2>
          <p class="lead">
            Long flights compress the spine, stiffen the neck and leave the legs heavy. These three are the ones
            that address it.
          </p>
        </div>
        <div class="grid grid--3">
${cardsFor(['express', 'aromatherapy', 'russian-banya'])}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="split split--media-right">
          <div class="split__media" data-reveal="right">
            <img src="/assets/aerocity-assets/aerocity-couples-therapy-room.jpg"
                 alt="Couples suite with two treatment beds prepared side by side"
                 width="900" height="601" loading="lazy" decoding="async">
          </div>
          <div data-reveal="left">
            <h2>Travelling as a pair</h2>
            <p>
              The couples retreat runs two hours in a private suite, with a therapist for each guest working in
              parallel and aromatherapy oils through the massage. It is a common booking from the Aerocity hotels,
              particularly from guests stopping in Delhi for a night between longer legs of a trip.
            </p>
            <p>
              Because the suite has to be held for the full two hours, this is the one treatment we genuinely need you
              to book ahead. Walking in and hoping is the one approach that will not work.
            </p>
            <p style="margin-top:var(--sp-5)">
              <a class="link-arrow" href="/services.html#couples-retreat">Couples retreat details</a>
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--cream">
      <div class="container container--narrow">
        <div class="section-head is-centered" data-reveal>
          <p class="eyebrow">Questions</p>
          <h2>Aerocity visitors — FAQs</h2>
        </div>
        <div class="faq">
${faqBlock(AEROCITY_FAQS, 'aerocity')}
        </div>
      </div>
    </section>

    <section class="section section--tight">
      <div class="container">
${contactStrip()}
        <h2 style="font-size:var(--fs-lg);margin-top:var(--sp-7)">Related pages</h2>
${relatedList([
  { href: '/russian-spa-in-mahipalpur.html', label: 'The spa itself, in Mahipalpur' },
  { href: '/services.html', label: 'All treatments and rates' },
  { href: '/russian-spa-in-new-delhi.html', label: 'Coming from elsewhere in Delhi' },
  { href: '/contact.html', label: 'Contact and directions' }
])}
      </div>
    </section>

${ctaBand({
  heading: 'A few minutes from your hotel',
  body: 'Call before you set off and we will have the room ready. Tell us your flight times and we will tell you ' +
        'straight whether a session fits.',
  note: null
})}

  </main>
`;

/* ==========================================================================
   3. GURGAON — the commute, desk posture, late sessions
   ========================================================================== */
const GURGAON_FAQS = [
  {
    q: 'How long does it take to get there from Cyber City?',
    a: ['Eighteen to twenty-two minutes via NH-48 towards Delhi, leaving the highway at the Mahipalpur exit, under ' +
        'ordinary traffic conditions. From Golf Course Road and Sector 54 it is nearer twenty-five to thirty minutes, ' +
        'and from Sohna Road and Sectors 47–49 around thirty to thirty-five.']
  },
  {
    q: 'What does a cab cost from Gurgaon?',
    a: ['Typically ₹250–400 one way from most Gurgaon locations. The alternative is the Rapid Metro across to the ' +
        'Yellow Line, out to Aerocity, then about five minutes by auto from Aerocity Metro Station.']
  },
  {
    q: 'I finish work at 11pm. Are you still open?',
    a: ['Yes, and this is a large part of why our hours are what they are. We are open twenty-four hours a day, every ' +
        'day of the year. A session after a late finish is one of the most common bookings we take from Gurgaon.']
  },
  {
    q: 'I sit at a desk all day. Which treatment is right?',
    a: ['Desk work concentrates tension in the neck, shoulders and lower back, and shortens the hip flexors. Deep ' +
        'tissue therapy targets those areas directly. If you also train, the sports and recovery massage weights the ' +
        'session towards legs and hips as well. If your whole week has been heavy rather than one specific area, the ' +
        'banya loosens everything at once.']
  },
  {
    q: 'Is it worth the drive when there are spas in Gurgaon?',
    a: ['For a standard massage, probably not — Gurgaon has plenty of good options closer to you, and we would rather ' +
        'say so than pretend otherwise. The reason people make the trip is the banya, which needs a purpose-built ' +
        'heat room, an adjacent cold plunge and venik work. If that is what you are after, the drive is the cost of ' +
        'getting it.']
  }
];

const gurgaon = {
  file: 'russian-spa-in-gurgaon.html',
  title: 'Russian Spa Near Gurgaon | 20 Minutes From Cyber City, NH-48',
  description:
    'Russian spa near Gurgaon: authentic banya and deep tissue therapy in Mahipalpur, ' +
    '18-22 minutes from Cyber City via NH-48. Open 24 hours.',
  ogTitle: 'Russian Spa Near Gurgaon — Banya & Recovery Massage',
  ogImage: 'assets/gurgaon-assets/gurgaon-sports-recovery-massage.jpg',
  ogImageAlt: 'Recovery massage being applied during a session booked after work',
  heroImage: 'assets/gurgaon-assets/gurgaon-sports-recovery-massage.jpg',
  trail: [
    { label: 'Home', href: '/' },
    { label: 'Locations', href: '/#locations' },
    { label: 'Russian Spa in Gurgaon' }
  ]
};

gurgaon.schema = [
  S.webPage(gurgaon),
  S.breadcrumbList(gurgaon.trail),
  S.locationService({
    name: 'Russian banya and recovery massage for guests from Gurgaon',
    areaName: 'Gurgaon, Haryana',
    description: 'Traditional Russian banya and deep tissue recovery therapy in Mahipalpur, New Delhi, ' +
                 'eighteen to twenty-two minutes from Gurgaon Cyber City via NH-48, open twenty-four hours.'
  }),
  S.faqPage(GURGAON_FAQS)
];

gurgaon.body = `
  <main id="main-content">

    <section class="hero hero--compact">
      <div class="aurora" aria-hidden="true"><span></span><span></span><span></span></div>
      <div class="container hero__inner">
${breadcrumb(gurgaon.trail)}
        <div class="hero__grid">
          <div>
            <p class="hero__badge"><span class="dot" aria-hidden="true"></span> 18–22 min from Cyber City</p>
            <h1 class="split-text">Russian Spa near Gurgaon</h1>
            <p class="lead">
              A straight run up NH-48 from the Gurgaon corporate belt to a genuine banya and a deep tissue table —
              still open long after the Gurgaon working day has finished.
            </p>
            <div class="btn-row">
              <a class="btn btn--primary magnetic" data-spark href="tel:${CFG.PHONE_HREF}" data-site="phone-link">
                Call <span data-site="phone">${CFG.PHONE_DISPLAY}</span>
              </a>
              <a class="btn btn--ghost" href="#routes">Routes &amp; timings</a>
            </div>
          </div>
          <div class="hero__media" data-reveal="scale">
            <img src="/assets/gurgaon-assets/gurgaon-sports-recovery-massage.jpg"
                 alt="Therapist working through a guest's leg during a recovery massage"
                 width="1400" height="2100" fetchpriority="high" decoding="async">
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container container--narrow">
        <p class="eyebrow">Straight answer first</p>
        <h2 class="blur-text">Why anyone drives out of Gurgaon for this</h2>
        <p class="lead">
          Gurgaon is not short of spas. If what you want is a competent hour-long massage, book one near your office
          and save yourself the highway.
        </p>
        <p>
          The reason people make the trip anyway is the banya, and the banya is genuinely hard to find on this side of
          Delhi. It is not a steam cabinet with a Russian name on the door. It is a room built to hold moist heat at
          roughly 70–90°C, a cold plunge placed a few steps from that room, and a therapist working over you with a
          soaked bundle of birch during the heat phase. The three parts only work together, which is why they are rare
          separately and rarer combined.
        </p>
        <p>
          The second reason is the clock. Gurgaon's working day routinely ends after most spas have shut their doors,
          and a treatment you cannot actually get to is not a treatment. We are open twenty-four hours, every day of
          the year.
        </p>
      </div>
    </section>

    <section class="section section--dark" id="routes">
      <div class="container">
        <div class="section-head" data-reveal>
          <p class="eyebrow">Getting here</p>
          <h2>Routes and timings from Gurgaon</h2>
          <p class="lead">
            NH-48 towards Delhi, leaving at the Mahipalpur exit. Times are for ordinary conditions.
          </p>
        </div>
        <ul class="directions">
${directionsList([
  { from: 'Cyber City / DLF, via NH-48', time: '18–22 min' },
  { from: 'Golf Course Road / Sector 54', time: '25–30 min' },
  { from: 'Sohna Road / Sectors 47–49', time: '30–35 min' },
  { from: 'Typical cab fare, one way', time: '₹250–400' },
  { from: 'By metro: Rapid Metro → Yellow Line → Aerocity, then auto', time: '≈5 min from Aerocity station' }
])}
        </ul>
        <p class="notice" style="margin-top:var(--sp-6)">
          <strong>On timing.</strong> The NH-48 stretch is the variable. Late evening it runs quickly, which is part
          of why the after-work slot suits this trip better than the rush-hour one.
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="split">
          <div class="split__media" data-reveal="left">
            <img src="/assets/gurgaon-assets/gurgaon-deep-tissue-session.jpg"
                 alt="Firm pressure applied across the shoulders during a deep tissue session"
                 width="900" height="600" loading="lazy" decoding="async">
          </div>
          <div data-reveal="right">
            <h2>What a Gurgaon working week does to a body</h2>
            <p>
              The pattern is consistent enough to be predictable. Long hours seated pull the shoulders forward and
              load the neck and upper back. The lower back takes the rest. Hip flexors shorten from sitting, then
              complain the moment you train. A long commute on top adds another hour in the same position.
            </p>
            <p>
              Deep tissue therapy addresses that directly, with firm sustained pressure worked through the specific
              muscles that have stopped releasing. If you also train, the sports and recovery session shifts the
              weight of the hour towards legs and hips. And when the problem is not one area but a whole compressed
              week, the banya is the better answer — heat and contrast loosen everything at once rather than
              negotiating with it muscle by muscle.
            </p>
            <p style="margin-top:var(--sp-5)">
              <a class="link-arrow" href="/services.html#deep-tissue">Deep tissue session details</a>
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--cream">
      <div class="container">
        <div class="section-head is-centered" data-reveal>
          <p class="eyebrow">Best for this trip</p>
          <h2>What Gurgaon guests book</h2>
        </div>
        <div class="grid grid--3">
${cardsFor(['deep-tissue', 'sports-recovery', 'russian-banya'])}
        </div>
        <p style="text-align:center;margin-top:var(--sp-7)">
          <a class="btn btn--dark" href="/services.html">Compare all treatments</a>
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="split split--media-right">
          <div class="split__media" data-reveal="right">
            <img src="/assets/gurgaon-assets/gurgaon-banya-heat-therapy.jpg"
                 alt="Steam rising inside the banya heat room before a session"
                 width="900" height="600" loading="lazy" decoding="async">
          </div>
          <div data-reveal="left">
            <h2>Making the trip worth the drive</h2>
            <p>
              If you are driving twenty minutes each way, it is worth planning the visit rather than squeezing it.
              Two suggestions from guests who do this regularly.
            </p>
            <ul class="checklist">
              <li><strong>Take the banya first, then the table.</strong> Warm muscle takes pressure far better than
                  cold muscle, so the massage does more if it follows the heat.</li>
              <li><strong>Come late rather than at six.</strong> NH-48 runs clear later in the evening, and we are
                  open regardless of the hour — so the drive is shorter and the spa is quieter.</li>
            </ul>
            <p style="margin-top:var(--sp-5)">
              If you expect to come regularly, ask about the monthly plans when you call — they work out cheaper
              than paying per session from the second visit onwards.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--cream">
      <div class="container container--narrow">
        <div class="section-head is-centered" data-reveal>
          <p class="eyebrow">Questions</p>
          <h2>Travelling from Gurgaon — FAQs</h2>
        </div>
        <div class="faq">
${faqBlock(GURGAON_FAQS, 'gurgaon')}
        </div>
      </div>
    </section>

    <section class="section section--tight">
      <div class="container">
${contactStrip()}
        <h2 style="font-size:var(--fs-lg);margin-top:var(--sp-7)">Related pages</h2>
${relatedList([
  { href: '/services.html#sports-recovery', label: 'Sports & recovery massage' },
  { href: '/russian-spa-in-mahipalpur.html', label: 'Where the spa actually is' },
  { href: '/russian-spa-in-aerocity.html', label: 'Via Aerocity metro' },
  { href: '/contact.html', label: 'Call or send an enquiry' }
])}
      </div>
    </section>

${ctaBand({
  heading: 'Book before you leave the office',
  body: 'Call on the way out and the room will be ready when you arrive. Late sessions are the norm here, not a ' +
        'favour.',
  note: null
})}

  </main>
`;

/* ==========================================================================
   4. NEW DELHI — city-wide orientation
   ========================================================================== */
const DELHI_FAQS = [
  {
    q: 'What makes a Russian spa different from other spas in Delhi?',
    a: ['One thing, really: the banya. Delhi has many capable massage spas, and our massage menu is not unusual for ' +
        'the city. What is unusual is a purpose-built moist heat room at roughly 70–90°C with a cold plunge a few ' +
        'steps away, and venik work with imported birch during the heat phase. That combination is the Russian ' +
        'tradition and it is what people travel across the city for.']
  },
  {
    q: 'Where in Delhi are you, and how do I get there by metro?',
    a: ['We are in Mahipalpur, New Delhi 110037, on the airport corridor. By metro, the Airport Express or Yellow ' +
        'Line to Aerocity station puts you about five minutes away by auto.']
  },
  {
    q: 'How long does it take to reach you from other parts of Delhi?',
    a: ['Roughly twenty to thirty minutes from south Delhi, thirty to forty from central Delhi and twenty-five to ' +
        'thirty-five from west Delhi under ordinary conditions. Vasant Kunj is about fifteen minutes and Dwarka ' +
        'about twenty.']
  },
  {
    q: 'Do I need to book in advance?',
    a: ['Not for most treatments — walk-ins are welcome at any hour of any day. The banya and the couples suite ' +
        'should be reserved, because each requires a room to be held for a fixed slot.']
  },
  {
    q: 'Is the banya safe if I have a health condition?',
    a: ['The banya is a heat-based treatment, so if you have a heart condition, high or low blood pressure, are ' +
        'pregnant, or have any other health concern, speak to your doctor first and tell our staff what they advised. ' +
        'Our treatments are wellness services rather than medical treatment. There are gentler options on the menu ' +
        'and we will happily recommend one.']
  },
  {
    q: 'What does it cost?',
    a: ['Published single-session rates run from ₹1,500 for the 30-minute express to ₹6,000 for the two-hour couples ' +
        'retreat, with the banya at ₹4,000 for sixty minutes. The full rate card is on the ' +
        '<a href="/services.html#rates">services page</a>; please confirm the current price when you call.']
  }
];

const delhi = {
  file: 'russian-spa-in-new-delhi.html',
  title: 'Russian Spa in New Delhi | Traditional Banya & Massage',
  description:
    'Russian spa in New Delhi: traditional birch-venik banya, cold plunge and a full ' +
    'massage menu in Mahipalpur. Open 24 hours, metro accessible.',
  ogTitle: 'Russian Spa in New Delhi — Traditional Banya & Massage',
  ogImage: 'assets/new-delhi-assets/new-delhi-russian-spa-interior.jpg',
  ogImageAlt: 'Interior of the Russian spa with warm lighting and timber finishes',
  heroImage: 'assets/new-delhi-assets/new-delhi-russian-spa-interior.jpg',
  trail: [
    { label: 'Home', href: '/' },
    { label: 'Locations', href: '/#locations' },
    { label: 'Russian Spa in New Delhi' }
  ]
};

delhi.schema = [
  S.webPage(delhi),
  S.breadcrumbList(delhi.trail),
  S.locationService({
    name: 'Russian banya and massage therapy in New Delhi',
    areaName: 'New Delhi',
    description: 'Traditional Russian banya with imported birch venik, cold plunge and a full massage menu, ' +
                 'located in Mahipalpur and serving guests from across New Delhi, open twenty-four hours.'
  }),
  S.faqPage(DELHI_FAQS)
];

delhi.body = `
  <main id="main-content">

    <section class="hero hero--compact">
      <div class="aurora" aria-hidden="true"><span></span><span></span><span></span></div>
      <div class="container hero__inner">
${breadcrumb(delhi.trail)}
        <div class="hero__grid">
          <div>
            <p class="hero__badge"><span class="dot" aria-hidden="true"></span> Mahipalpur · Open 24 hours</p>
            <h1 class="split-text">Russian Spa in New Delhi</h1>
            <p class="lead">
              Delhi has no shortage of spas. It has very few banyas. This page explains the difference, where to find
              one, and how to reach us from wherever in the city you are starting.
            </p>
            <div class="btn-row">
              <a class="btn btn--primary magnetic" data-spark href="tel:${CFG.PHONE_HREF}" data-site="phone-link">
                Call <span data-site="phone">${CFG.PHONE_DISPLAY}</span>
              </a>
              <a class="btn btn--ghost" href="#what-is-a-banya">What is a banya?</a>
            </div>
          </div>
          <div class="hero__media" data-reveal="scale">
            <img src="/assets/new-delhi-assets/new-delhi-russian-spa-interior.jpg"
                 alt="Warmly lit spa interior with timber finishes and soft seating"
                 width="1400" height="1000" fetchpriority="high" decoding="async">
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="what-is-a-banya">
      <div class="container container--narrow">
        <p class="eyebrow">Start here</p>
        <h2 class="blur-text">What a Russian banya actually is</h2>
        <p class="lead">
          If you have only ever seen the phrase on a signboard, it is worth knowing what it describes — because the
          term gets attached to a lot of rooms that are not one.
        </p>
        <p>
          A banya is the Russian bathing tradition, and it has three parts that only work in sequence. First, moist
          heat: a room held at roughly 70–90°C with humidity kept deliberately high, which is the opposite of a
          Finnish sauna's dry, hotter air. Second, the venik — a bundle of birch branches, soaked and then used by a
          therapist to fan hot air onto the skin, press heat into the large muscles and finish with lighter strokes.
          Third, cold: an immediate plunge, then a rest phase with herbal tea.
        </p>
        <p>
          Remove any one of the three and you have something else. A steam cabinet is not a banya. A heat room with
          the plunge pool down a corridor loses the contrast that makes the cycle work. And birch is not
          interchangeable with whatever leaf is locally available, which is why ours is imported.
        </p>
        <p>
          That is the whole proposition. Everything else on our menu — Swedish, Thai, Ayurvedic, deep tissue,
          aromatherapy — is good massage of the kind you can find elsewhere in Delhi. The banya is the part you
          cannot.
        </p>
      </div>
    </section>

    <section class="section section--dark">
      <div class="container">
        <div class="section-head" data-reveal>
          <p class="eyebrow">City-wide</p>
          <h2>Reaching Mahipalpur from across Delhi</h2>
          <p class="lead">
            We are on the airport corridor in the city's south-west. Approximate road times under ordinary conditions.
          </p>
        </div>
        <ul class="directions">
${directionsList([
  { from: 'South Delhi', time: '20–30 min' },
  { from: 'Central Delhi', time: '30–40 min' },
  { from: 'West Delhi', time: '25–35 min' },
  { from: 'Vasant Kunj', time: '≈15 min' },
  { from: 'Dwarka', time: '≈20 min' },
  { from: 'By metro: Airport Express or Yellow Line to Aerocity, then auto', time: '≈5 min from the station' }
])}
        </ul>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="split">
          <div class="split__media" data-reveal="left">
            <img src="/assets/new-delhi-assets/new-delhi-swedish-massage.jpg"
                 alt="Full body Swedish massage in progress in a private room"
                 width="900" height="1350" loading="lazy" decoding="async">
          </div>
          <div data-reveal="right">
            <h2>Choosing between the treatments</h2>
            <p>
              A quick guide, since nine options is more than most people want to weigh up at a reception desk.
            </p>
            <ul class="checklist">
              <li><strong>Never had a professional massage?</strong> Signature aromatherapy or Swedish. Medium
                  pressure, sixty minutes, nothing surprising.</li>
              <li><strong>One specific ache?</strong> Deep tissue, and tell the therapist exactly where.</li>
              <li><strong>Whole body feels compressed?</strong> The banya. Heat and contrast work on everything at
                  once.</li>
              <li><strong>Want stretching rather than pressure?</strong> Thai yoga massage — on a mat, fully clothed,
                  ninety minutes.</li>
              <li><strong>Want warmth above all?</strong> Ayurvedic Abhyanga, with warm herbal oil and two therapists.</li>
              <li><strong>Only half an hour?</strong> The head, neck and shoulder express.</li>
            </ul>
            <p style="margin-top:var(--sp-5)">
              <a class="link-arrow" href="/services.html">Full descriptions and rates</a>
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--cream">
      <div class="container">
        <div class="section-head is-centered" data-reveal>
          <p class="eyebrow">Popular across the city</p>
          <h2>Most-booked treatments</h2>
        </div>
        <div class="grid grid--3">
${cardsFor(['russian-banya', 'swedish', 'abhyanga'])}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="split split--media-right">
          <div class="split__media" data-reveal="right">
            <img src="/assets/new-delhi-assets/new-delhi-wellness-lounge.jpg"
                 alt="Quiet lounge where guests rest after a treatment"
                 width="900" height="1350" loading="lazy" decoding="async">
          </div>
          <div data-reveal="left">
            <h2>Planning a visit from across town</h2>
            <p>
              If you are travelling twenty-five minutes or more, a few practical notes. Walk-ins are genuinely
              welcome at any hour, but the banya and the couples suite need a room held for a fixed slot, so those two
              should be called ahead — it would be a poor use of a cross-city trip to arrive and find the heat room
              occupied.
            </p>
            <p>
              Allow time for the rest phase. It is part of the treatment rather than an optional extra, and rushing
              straight from the plunge back into Delhi traffic undoes a good deal of the point.
            </p>
            <p>
              And if the timing is awkward, remember the hours are not a constraint here. Three in the morning is a
              normal appointment, the roads are empty, and the spa is quiet.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--cream">
      <div class="container container--narrow">
        <div class="section-head is-centered" data-reveal>
          <p class="eyebrow">Questions</p>
          <h2>Russian spa in New Delhi — FAQs</h2>
        </div>
        <div class="faq">
${faqBlock(DELHI_FAQS, 'delhi')}
        </div>
      </div>
    </section>

    <section class="section section--tight">
      <div class="container">
${contactStrip()}
        <h2 style="font-size:var(--fs-lg);margin-top:var(--sp-7)">Related pages</h2>
${relatedList([
  { href: '/about.html', label: 'How the banya room is built' },
  { href: '/russian-spa-in-mahipalpur.html', label: 'The Mahipalpur neighbourhood' },
  { href: '/russian-spa-in-aerocity.html', label: 'Arriving via Aerocity' },
  { href: '/russian-spa-in-gurgaon.html', label: 'Driving in from Gurgaon' },
  { href: '/gallery.html', label: 'See the rooms' }
])}
      </div>
    </section>

${ctaBand({
  heading: 'Find the banya in Delhi',
  body: 'Call for availability and directions, whatever the hour. Walk-ins welcome; the banya and couples suite ' +
        'are worth reserving.',
  note: 'Massage and heat therapy are wellness services, not medical treatment.'
})}

  </main>
`;

module.exports = [mahipalpur, aerocity, gurgaon, delhi];
