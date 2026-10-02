/* ==========================================================================
   page-locations.js — the four location landing pages
   --------------------------------------------------------------------------
   These are four genuinely different pages, not one template with the place
   name swapped. Each has its own angle, its own section order, its own
   component mix, its own photographs and its own FAQs. Only the palette and
   the chrome (from theme.js) are shared.

     Mahipalpur — the home neighbourhood; the banya room itself, in depth
     Aerocity   — hotel guests, flight crews, and whether a layover fits
     Gurgaon    — the NH-48 drive, desk posture and late finishes
     New Delhi  — a city-wide orientation and what a banya actually is

   Travel times, distances and fares are the ones stated in the source
   material. Nothing is estimated or rounded in our favour, and no landmark
   relationship is claimed that the source did not state.

   See theme.js for the identity and content rules (no brand name, no
   invented ratings, review counts, testimonials or client statistics).
   ========================================================================== */

'use strict';

const T = require('./theme');
const { CFG, esc, wa, waIcon, telIcon, faqBlock, ctaBand, napBlock, pageHero, shell } = T;
const { SERVICES } = require('./data');
const GAL = require('./gallery-data.json');

const rupees = (n) => '₹' + n.toLocaleString('en-IN');
const svc = (slug) => SERVICES.find((s) => s.slug === slug);
const g = (n) => GAL.find((x) => x.n === n) || GAL[0];

/* Gallery photographs are reused rather than shipping a fifth set of files:
   they are already optimised and their dimensions are known, which is what
   keeps Cumulative Layout Shift at zero. The small copy feeds the bands, the
   large one feeds the splits and heroes. */
const galT = (n, alt) => {
  const x = g(n);
  return `<img src="/assets/gallery/t/${x.n}" alt="${esc(alt || x.alt)}" width="${x.tw}" height="${x.th}" loading="lazy" decoding="async">`;
};
const galF = (n, alt) => {
  const x = g(n);
  return `<img src="/assets/gallery/f/${x.n}" alt="${esc(alt || x.alt)}" width="${x.fw}" height="${x.fh}" loading="lazy" decoding="async">`;
};

/* A band of square photographs, each linking through to the gallery, so the
   band earns its place as internal linking rather than pure decoration. */
const band = (names, wide) => `        <div class="band${wide ? ' band--4' : ''} stagger">
${names.map((n) => `          <a href="/gallery.html" aria-label="See this and ${GAL.length - 1} more photographs in the gallery" data-reveal>${galT(n)}</a>`).join('\n')}
        </div>`;

const pair = (a, b) => `          <div class="pair">
            ${galF(a)}
            ${galF(b)}
          </div>`;

const svcCards = (slugs, msgSuffix) => slugs.map((slug) => {
  const s = svc(slug);
  return `          <article class="card" data-reveal>
            <div class="card__media">
              <img src="/assets/spa/svc-${s.slug}.jpg" alt="${esc(s.alt)}" width="800" height="500" loading="lazy" decoding="async">
            </div>
            <div class="card__body">
              <h3>${esc(s.name)}</h3>
              <p>${s.short}</p>
              <p class="card__meta">
                <span class="card__price">${rupees(s.price)}${s.priceNote ? ` <small>${esc(s.priceNote)}</small>` : ''}</span>
                <span class="card__dur">${esc(s.duration)}</span>
              </p>
              <a class="btn btn--wa btn--sm btn--block" href="${wa('Hello, I would like to book the ' + s.name + ' (' + s.duration + ')' + (msgSuffix ? ' — ' + msgSuffix : '') + '.')}" rel="noopener" target="_blank">${waIcon} Book on WhatsApp</a>
            </div>
          </article>`;
}).join('\n');

const dirs = (rows) => `        <ul class="dirs" data-reveal>
${rows.map((r) => `          <li><strong>${r.from}</strong> <span class="time">${r.time}</span></li>`).join('\n')}
        </ul>`;

const related = (links) => `        <ul class="related" data-reveal>
${links.map((l) => `          <li><a href="${l.href}">${esc(l.label)}</a></li>`).join('\n')}
        </ul>`;

const trailFor = (label) => [{ label: 'Home', href: '/' }, { label }];

/* ==========================================================================
   1. MAHIPALPUR — the home neighbourhood, the banya room in depth
   ========================================================================== */
const MAHIPALPUR_FAQS = [
  { q: 'What actually happens during a banya session here?',
    a: ['A full cycle runs about sixty minutes in three phases. You start in the steam room, held at roughly ' +
        '70–90°C with the humidity controlled, where a therapist works over you with a soaked birch venik. Then ' +
        'the cold plunge, which is immediate and brief. Then the rest phase in the lounge with herbal tea. If you ' +
        'want a second round of heat and cold, there is time for it within the session.'] },
  { q: 'I have never done a heat treatment. Will it be too much?',
    a: ['First-time guests are taken into the heat gradually rather than dropped into a full round. Tell your ' +
        'therapist it is your first banya and they will adjust the length of the heat phase and the intensity of ' +
        'the venik work. You can leave the steam room at any point — stepping out early is completely normal and ' +
        'nobody will discourage you.'] },
  { q: 'Can I book a treatment at 3am in Mahipalpur?',
    a: ['Yes. We are open twenty-four hours, every day of the year. Late-night and early-morning bookings are ' +
        'routine here rather than an exception — the airport corridor runs on its own clock.'] },
  { q: 'Is there parking, and how do I find the entrance?',
    a: ['Parking is available on site. The Mahipalpur service lanes are genuinely confusing on a first visit, so ' +
        'the reliable method is to call <a href="tel:' + CFG.PHONE_HREF + '">' + CFG.PHONE_DISPLAY + '</a> when ' +
        'you are a couple of minutes out and let us talk you or your driver in from the main road.'] },
  { q: 'What is the difference between the banya and the deep tissue massage?',
    a: ['The banya works through heat and contrast — it loosens the whole body at once and the effect is systemic. ' +
        'Deep tissue works through direct pressure on one area and is the better choice when a specific muscle has ' +
        'seized up. Guests who have both time and a stubborn problem area often take the banya first and the ' +
        'massage afterwards, since warm muscle responds better to pressure.'] }
];

const mahipalpur = {
  file: 'russian-spa-in-mahipalpur.html',
  title: 'Russian Spa in Mahipalpur | Banya & Massage, Open 24 Hours',
  description:
    'Russian spa in Mahipalpur, New Delhi. Birch-venik banya, cold plunge and a full ' +
    'massage menu in private rooms. Open 24 hours, walk-ins welcome.',
  ogTitle: 'Russian Spa in Mahipalpur — Banya & Massage, Open 24 Hours',
  ogImage: 'assets/gallery/f/10.jpg',
  ogImageAlt: 'Round thermal pool set into a timber-lined wet room',
  heroImage: 'assets/gallery/f/10.jpg',
  trail: trailFor('Spa in Mahipalpur'),
  faqs: MAHIPALPUR_FAQS,

  body: `
  <main id="main-content">

${pageHero({
  eyebrow: 'Mahipalpur, New Delhi 110037',
  h1: 'Russian spa in <em>Mahipalpur</em>',
  lead: 'This is the neighbourhood the spa is actually in. The banya room, the cold plunge, the treatment ' +
        'suites and the lounge are all here, a few minutes off NH-48 on the airport corridor.',
  trail: trailFor('Spa in Mahipalpur'),
  image: 'assets/gallery/f/10.jpg', alt: '', w: g('10.jpg').fw, h: g('10.jpg').fh
})}

    <!-- ===================== THE ROOM, IN DEPTH ===================== -->
    <section class="section section--white">
      <div class="wrap">
        <div class="split">
          <div class="split__media" data-reveal>${galF('02.jpg')}</div>
          <div data-reveal>
            <span class="eyebrow">The room</span>
            <h2>A banya is a room, not a machine</h2>
            <p>
              You cannot retrofit a banya. It is a timber room built to hold moist heat in a specific band, with
              tiered benches because the air at head height is a different temperature from the air near the floor,
              and a cold plunge placed within a few steps of the door.
            </p>
            <p>
              The venik — a bound bundle of birch branches, soaked before use — is the part that makes it Russian.
              The therapist uses it to move hot air onto the skin in waves and to press heat into the large muscle
              groups. We import the bundles rather than substituting a local leaf, because the leaf is the point.
            </p>
            <p>
              The cycle runs heat, cold, rest, and repeats if you want it to. Most of the effect settles in during
              the rest phase, which is why the lounge is quiet and why we do not hurry you out of it.
            </p>
            <div class="btn-row" style="margin-top:var(--sp-4)">
              <a class="btn btn--wa btn--sm" href="${wa('Hello, I would like to book a banya session at Mahipalpur.')}" rel="noopener" target="_blank">${waIcon} Book the banya</a>
              <a class="btn btn--outline btn--sm" href="/services.html#russian-banya">What a session involves</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ========================= PHOTO BAND ========================= -->
    <section class="section section--blush">
      <div class="wrap">
        <div class="section-head" data-reveal>
          <span class="eyebrow">Inside</span>
          <h2>The heat rooms and what sits around them</h2>
          <p>Benches, the stove, the bucket and ladle, and the quiet corners between rounds.</p>
        </div>
${band(['01.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '45.jpg', '46.jpg', '51.jpg'])}
        <p style="text-align:center;margin-top:var(--sp-5)">
          <a class="btn btn--outline btn--sm" href="/gallery.html">See all ${GAL.length} photographs</a>
        </p>
      </div>
    </section>

    <!-- ========================= GETTING HERE ======================= -->
    <section class="section section--white">
      <div class="wrap">
        <div class="split split--flip">
          <div data-reveal>
            <span class="eyebrow">Getting here</span>
            <h2>Reaching us from nearby</h2>
            <p>
              Mahipalpur sits on the service lanes beside NH-48, which makes it quick to reach and genuinely
              confusing to find the first time. Message us when you are a couple of minutes out and we will talk
              you, or your driver, in from the main road.
            </p>
${dirs([
  { from: 'Aerocity hotel cluster', time: '5–7 min by cab' },
  { from: 'IGI Airport Terminal 3, via NH-48', time: '≈10 min' },
  { from: 'Aerocity Metro Station', time: '5 min by auto' },
  { from: 'Vasant Kunj', time: '≈15 min' },
  { from: 'Dwarka', time: '≈20 min' },
  { from: 'Gurgaon Cyber City, via NH-48', time: '18–22 min' }
])}
            <div class="btn-row" style="margin-top:var(--sp-4)">
              <a class="btn btn--wa btn--sm" href="${wa('Hello, I am on my way to Mahipalpur — could you send directions?')}" rel="noopener" target="_blank">${waIcon} Ask for directions</a>
              <a class="btn btn--outline btn--sm" href="tel:${CFG.PHONE_HREF}">${telIcon} ${CFG.PHONE_DISPLAY}</a>
            </div>
          </div>
          <div data-reveal>
${pair('44.jpg', '50.jpg')}
${band(['22.jpg', '23.jpg', '24.jpg', '34.jpg'], true)}
          </div>
        </div>
      </div>
    </section>

    <!-- ========================= TREATMENTS ========================= -->
    <section class="section section--blush">
      <div class="wrap">
        <div class="section-head" data-reveal>
          <span class="eyebrow">Treatments</span>
          <h2>Popular treatments in Mahipalpur</h2>
          <p>Six of the nine on the menu. Published rates, single session.</p>
        </div>
        <div class="grid grid--3">
${svcCards(['russian-banya', 'deep-tissue', 'swedish', 'aromatherapy', 'abhyanga', 'express'], 'I am in Mahipalpur')}
        </div>
        <p style="text-align:center;margin-top:var(--sp-5)">
          <a class="btn btn--rose" href="/services.html">All nine treatments and rates</a>
        </p>
      </div>
    </section>

    <!-- ============================ FAQ ============================= -->
    <section class="section section--white">
      <div class="wrap wrap--narrow">
        <div class="section-head" data-reveal>
          <span class="eyebrow">Questions</span>
          <h2>Russian spa in Mahipalpur — FAQs</h2>
        </div>
        <div class="faq">
${faqBlock(MAHIPALPUR_FAQS, 'mahipalpur')}
        </div>
      </div>
    </section>

    <!-- ====================== RELATED + NAP ========================= -->
    <section class="section section--blush">
      <div class="wrap">
        <h2 style="font-size:1.1rem;text-align:center" data-reveal>Coming from somewhere else?</h2>
        <div style="display:flex;justify-content:center;margin-bottom:var(--section-y)">
${related([
  { href: '/russian-spa-in-aerocity.html', label: 'Spa near Aerocity' },
  { href: '/russian-spa-in-gurgaon.html', label: 'Spa near Gurgaon' },
  { href: '/russian-spa-in-new-delhi.html', label: 'Spa in New Delhi' },
  { href: '/gallery.html', label: 'Photo gallery' }
])}
        </div>
${napBlock()}
      </div>
    </section>

${ctaBand({
  heading: 'Walk in, or message first',
  body: 'Walk-ins are welcome at any hour. The banya and the couples suite are worth booking ahead, because ' +
        'both need a room held for a fixed slot.'
})}

  </main>
`
};

/* ==========================================================================
   2. AEROCITY — hotel guests, crews, and whether a layover fits
   ========================================================================== */
const AEROCITY_FAQS = [
  { q: 'How far is the spa from the Aerocity hotels?',
    a: ['Five to seven minutes by cab from the Aerocity hotel cluster, with a typical fare in the ₹80–150 range. ' +
        'From Aerocity Metro Station it is about five minutes by auto. We are in Mahipalpur, just along the ' +
        'airport corridor rather than inside the Aerocity complex itself.'] },
  { q: 'I have a long layover at Delhi airport. Is there time for a treatment?',
    a: ['It depends how long the gap is and whether you can leave the terminal. Terminal 3 is around ten minutes ' +
        'away via NH-48. As a rough guide, budget the treatment length plus about an hour of travel and changing ' +
        'on top, and keep a comfortable margin for airport formalities. For a short gap the 30-minute head, neck ' +
        'and shoulder express is the sensible choice; for a long one there is time for a full banya cycle.'] },
  { q: 'Are you open when my flight lands at 2am?',
    a: ['Yes. Twenty-four hours a day, seven days a week, three hundred and sixty-five days a year. Overnight ' +
        'bookings from arriving passengers and finishing crew are a normal part of the week here.'] },
  { q: 'Why not just use my hotel spa in Aerocity?',
    a: ['If your hotel spa suits you, use it — the honest difference is the banya. A hotel spa will generally ' +
        'offer massage and a steam cabinet; a traditional banya needs a purpose-built heat room, an adjacent cold ' +
        'plunge and venik work, which is a different proposition from a steam room. On the massage menu itself ' +
        'there is far more overlap.'] },
  { q: 'Do you arrange transport from Aerocity hotels?',
    a: ['We can help arrange transport for guests booking premium packages. For a standard treatment a cab or ' +
        'auto from the hotel rank is quick and inexpensive. Message us and we will tell you which makes more ' +
        'sense for the time of day.'] },
  { q: 'Can I request a female therapist?',
    a: ['Yes. Both male and female therapists are on shift and you can state a preference when you book or when ' +
        'you arrive. Every treatment takes place in a private room.'] }
];

const aerocity = {
  file: 'russian-spa-in-aerocity.html',
  title: 'Russian Spa Near Aerocity | 5 Minutes From the Hotel Cluster',
  description:
    'Russian banya and massage five to seven minutes from the Aerocity hotels and ten ' +
    'from Terminal 3. Open 24 hours — layover and late-arrival sessions.',
  ogTitle: 'Russian Spa Near Aerocity — 5 Minutes From the Hotels',
  ogImage: 'assets/gallery/f/31.jpg',
  ogImageAlt: 'Outdoor spa bath lit by lanterns in the evening',
  heroImage: 'assets/gallery/f/31.jpg',
  trail: trailFor('Spa in Aerocity'),
  faqs: AEROCITY_FAQS,

  body: `
  <main id="main-content">

${pageHero({
  eyebrow: '5–7 minutes from the hotel cluster',
  h1: 'Russian spa near <em>Aerocity</em>',
  lead: 'A cab ride from the Aerocity hotels and about ten minutes from Terminal 3 — open at whatever hour ' +
        'your flight or your shift happens to end.',
  trail: trailFor('Spa in Aerocity'),
  image: 'assets/gallery/f/31.jpg', alt: '', w: g('31.jpg').fw, h: g('31.jpg').fh
})}

    <!-- ===================== CLOSE, NOT INSIDE ====================== -->
    <section class="section section--white">
      <div class="wrap">
        <div class="split split--flip">
          <div data-reveal>
            <span class="eyebrow">Where we are</span>
            <h2>Close to Aerocity, but not inside it</h2>
            <p>
              We are in Mahipalpur, along the airport corridor rather than within the Aerocity complex. In
              practice that is five to seven minutes by cab from the hotel cluster, typically ₹80–150, or about
              five minutes by auto from Aerocity Metro Station.
            </p>
            <p>
              The honest reason to make that short trip is the banya. A hotel spa will generally offer massage and
              a steam cabinet, both of which are good. A traditional Russian banya needs a purpose-built moist heat
              room, a cold plunge within a few steps of it, and venik work with birch — which is a different
              proposition from a steam room, and harder to find on the corridor.
            </p>
            <p>
              On the massage menu itself there is far more overlap, and we would rather say that than pretend
              otherwise.
            </p>
          </div>
          <div class="split__media" data-reveal>${galF('25.jpg')}</div>
        </div>
      </div>
    </section>

    <!-- ====================== DOES A LAYOVER FIT ==================== -->
    <section class="section section--blush">
      <div class="wrap">
        <div class="section-head" data-reveal>
          <span class="eyebrow">Planning</span>
          <h2>Working out whether a layover fits</h2>
          <p>Four things to check before you leave the terminal. Message us and we will do the arithmetic with you.</p>
        </div>

        <div class="split">
          <div data-reveal>
            <ol class="plan-rows">
              <li>
                <h3>Can you leave the terminal?</h3>
                <p>Visa and transit rules decide this before anything else does. If you cannot clear immigration,
                   nothing below applies.</p>
              </li>
              <li>
                <h3>Count the travel, not just the treatment</h3>
                <p>Terminal 3 is around ten minutes away via NH-48. Budget the session length plus about an hour
                   for travel and changing at both ends.</p>
              </li>
              <li>
                <h3>Leave an airport margin</h3>
                <p>Keep a comfortable cushion for check-in, security and the walk to the gate. We would rather you
                   took the 30-minute session and made your flight.</p>
              </li>
              <li>
                <h3>Pick the session to the gap</h3>
                <p>A short gap suits the 30-minute head, neck and shoulder express. A long one leaves room for a
                   full banya cycle and a rest afterwards.</p>
              </li>
            </ol>
          </div>
          <div data-reveal>
${band(['26.jpg', '27.jpg', '28.jpg', '29.jpg'], true)}
${pair('41.jpg', '42.jpg')}
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== ROUTES + WHAT TO BOOK =================== -->
    <section class="section section--white">
      <div class="wrap">
        <div class="section-head" data-reveal>
          <span class="eyebrow">Routes</span>
          <h2>Getting here from the Aerocity area</h2>
        </div>
        <div class="wrap--narrow" style="padding:0">
${dirs([
  { from: 'Aerocity hotel cluster, by cab', time: '5–7 min · ₹80–150' },
  { from: 'Aerocity Metro Station, by auto', time: '≈5 min' },
  { from: 'IGI Airport Terminal 3, via NH-48', time: '≈10 min' },
  { from: 'Vasant Kunj', time: '≈15 min' },
  { from: 'Dwarka', time: '≈20 min' }
])}
        </div>

        <div class="section-head" style="margin-top:var(--section-y)" data-reveal>
          <span class="eyebrow">What arriving guests book</span>
          <h2>Sessions that suit a traveller</h2>
          <p>Short enough for a gap between flights, or long enough to reset after one.</p>
        </div>
        <div class="grid grid--3">
${svcCards(['express', 'swedish', 'aromatherapy', 'couples-retreat'], 'I am staying in Aerocity')}
        </div>
      </div>
    </section>

    <!-- ========================= PHOTO BAND ========================= -->
    <section class="section section--blush">
      <div class="wrap">
        <div class="section-head" data-reveal>
          <span class="eyebrow">The rooms</span>
          <h2>What you walk into</h2>
        </div>
${band(['30.jpg', '32.jpg', '33.jpg', '56.jpg', '43.jpg', '47.jpg', '48.jpg', '52.jpg', '53.jpg', '54.jpg'])}
        <p style="text-align:center;margin-top:var(--sp-5)">
          <a class="btn btn--outline btn--sm" href="/gallery.html">See all ${GAL.length} photographs</a>
        </p>
      </div>
    </section>

    <!-- ============================ FAQ ============================= -->
    <section class="section section--white">
      <div class="wrap wrap--narrow">
        <div class="section-head" data-reveal>
          <span class="eyebrow">Questions</span>
          <h2>Aerocity visitors — FAQs</h2>
        </div>
        <div class="faq">
${faqBlock(AEROCITY_FAQS, 'aerocity')}
        </div>
      </div>
    </section>

    <!-- ========================== RELATED =========================== -->
    <section class="section section--blush">
      <div class="wrap">
        <h2 style="font-size:1.1rem;text-align:center" data-reveal>Related pages</h2>
        <div style="display:flex;justify-content:center;margin-bottom:var(--section-y)">
${related([
  { href: '/russian-spa-in-mahipalpur.html', label: 'Spa in Mahipalpur' },
  { href: '/russian-spa-in-gurgaon.html', label: 'Spa near Gurgaon' },
  { href: '/russian-spa-in-new-delhi.html', label: 'Spa in New Delhi' },
  { href: '/services.html', label: 'Treatments & rates' }
])}
        </div>
${napBlock()}
      </div>
    </section>

${ctaBand({
  heading: 'Landing late? Message ahead',
  body: 'Send us your landing time and we will tell you honestly whether the gap works, and which session fits ' +
        'inside it.'
})}

  </main>
`
};

/* ==========================================================================
   3. GURGAON — the NH-48 drive, desk posture, late finishes
   ========================================================================== */
const GURGAON_FAQS = [
  { q: 'How long does it take to get there from Cyber City?',
    a: ['Eighteen to twenty-two minutes via NH-48 towards Delhi, leaving the highway at the Mahipalpur exit, under ' +
        'ordinary traffic conditions. From Golf Course Road and Sector 54 it is nearer twenty-five to thirty ' +
        'minutes, and from Sohna Road and Sectors 47–49 around thirty to thirty-five.'] },
  { q: 'What does a cab cost from Gurgaon?',
    a: ['Typically ₹250–400 one way from most Gurgaon locations. The alternative is the Rapid Metro across to the ' +
        'Yellow Line, out to Aerocity, then about five minutes by auto from Aerocity Metro Station.'] },
  { q: 'I finish work at 11pm. Are you still open?',
    a: ['Yes, and this is a large part of why our hours are what they are. We are open twenty-four hours a day, ' +
        'every day of the year. A session after a late finish is one of the most common bookings we take from ' +
        'Gurgaon.'] },
  { q: 'I sit at a desk all day. Which treatment is right?',
    a: ['Desk work concentrates tension in the neck, shoulders and lower back, and shortens the hip flexors. Deep ' +
        'tissue therapy targets those areas directly. If you also train, the sports and recovery massage weights ' +
        'the session towards legs and hips as well. If your whole week has been heavy rather than one specific ' +
        'area, the banya loosens everything at once.'] },
  { q: 'Is it worth the drive when there are spas in Gurgaon?',
    a: ['For a standard massage, probably not — Gurgaon has plenty of good options closer to you, and we would ' +
        'rather say so than pretend otherwise. The reason people make the trip is the banya, which needs a ' +
        'purpose-built heat room, an adjacent cold plunge and venik work. If that is what you are after, the ' +
        'drive is the cost of getting it.'] }
];

const gurgaon = {
  file: 'russian-spa-in-gurgaon.html',
  title: 'Russian Spa Near Gurgaon | 20 Minutes From Cyber City, NH-48',
  description:
    'Russian banya and deep tissue recovery 18–22 minutes from Cyber City up NH-48. ' +
    'Open 24 hours for late finishes. Mahipalpur, New Delhi.',
  ogTitle: 'Russian Spa Near Gurgaon — 20 Minutes Up NH-48',
  ogImage: 'assets/gallery/f/21.jpg',
  ogImageAlt: 'Close work through the neck and upper back during a massage',
  heroImage: 'assets/gallery/f/21.jpg',
  trail: trailFor('Spa in Gurgaon'),
  faqs: GURGAON_FAQS,

  body: `
  <main id="main-content">

${pageHero({
  eyebrow: '18–22 minutes from Cyber City',
  h1: 'Russian spa near <em>Gurgaon</em>',
  lead: 'A straight run up NH-48 from the corporate belt, open long after the working day has finished — and ' +
        'built around deep work on the parts of you that a desk ruins.',
  trail: trailFor('Spa in Gurgaon'),
  image: 'assets/gallery/f/21.jpg', alt: '', w: g('21.jpg').fw, h: g('21.jpg').fh
})}

    <!-- ===================== WHY MAKE THE DRIVE ===================== -->
    <section class="section section--white">
      <div class="wrap">
        <div class="split">
          <div class="split__media" data-reveal>${galF('12.jpg')}</div>
          <div data-reveal>
            <span class="eyebrow">Straight talk</span>
            <h2>Why anyone drives out of Gurgaon for this</h2>
            <p>
              For a standard massage, honestly, you probably should not. Gurgaon has plenty of capable spas much
              closer to you, and recommending a twenty-minute drive for something you can get on Golf Course Road
              would be a waste of your evening.
            </p>
            <p>
              The reason people make the trip is the banya — a purpose-built moist heat room at roughly 70–90°C, a
              cold plunge a few steps away, and venik work with imported birch. That is not something a steam
              cabinet approximates, and it is the one thing on our menu you cannot easily get closer to home.
            </p>
            <p>
              The second reason is the clock. We are open twenty-four hours, so an eleven p.m. finish is a normal
              booking rather than a problem.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ================== WHAT A DESK WEEK DOES ===================== -->
    <section class="section section--dark">
      <div class="wrap">
        <div class="split split--flip">
          <div data-reveal>
            <span class="eyebrow">The problem</span>
            <h2>What a Gurgaon working week does to a body</h2>
            <p>
              Nine hours at a screen, an hour each way in traffic, and the same posture throughout. The pattern is
              consistent enough that therapists can usually guess the job from the shoulders.
            </p>
            <ul class="checklist">
              <li>Neck and upper trapezius, held tight from screen height</li>
              <li>Lower back, loaded by sitting rather than by movement</li>
              <li>Hip flexors shortened from hours at ninety degrees</li>
              <li>Forearms and wrists, from keyboard and mouse</li>
              <li>Calves and hamstrings, if you train on top of all that</li>
            </ul>
            <p style="margin-top:var(--sp-4)">
              Tell your therapist which of those actually hurts. The session is weighted to what you say, not to a
              fixed routine.
            </p>
          </div>
          <div class="split__media" data-reveal>${galF('20.jpg')}</div>
        </div>
      </div>
    </section>

    <!-- ========================= ROUTES ============================= -->
    <section class="section section--white">
      <div class="wrap">
        <div class="section-head" data-reveal>
          <span class="eyebrow">The drive</span>
          <h2>Routes and timings from Gurgaon</h2>
          <p>Ordinary traffic conditions. NH-48 towards Delhi, off at the Mahipalpur exit.</p>
        </div>
        <div class="wrap--narrow" style="padding:0">
${dirs([
  { from: 'Cyber City / DLF, via NH-48', time: '18–22 min' },
  { from: 'Golf Course Road / Sector 54', time: '25–30 min' },
  { from: 'Sohna Road / Sectors 47–49', time: '30–35 min' },
  { from: 'Typical cab fare, one way', time: '₹250–400' },
  { from: 'Rapid Metro → Yellow Line → Aerocity, then auto', time: '≈5 min from Aerocity' }
])}
        </div>
      </div>
    </section>

    <!-- ========================= PHOTO BAND ========================= -->
    <section class="section section--blush">
      <div class="wrap">
        <div class="section-head" data-reveal>
          <span class="eyebrow">The work</span>
          <h2>Deep tissue, recovery and heat</h2>
        </div>
${band(['11.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '38.jpg', '35.jpg'])}
      </div>
    </section>

    <!-- ======================== TREATMENTS ========================== -->
    <section class="section section--white">
      <div class="wrap">
        <div class="section-head" data-reveal>
          <span class="eyebrow">Treatments</span>
          <h2>What Gurgaon guests book</h2>
          <p>Weighted towards recovery rather than relaxation, though both are on the menu.</p>
        </div>
        <div class="grid grid--3">
${svcCards(['deep-tissue', 'sports-recovery', 'russian-banya', 'thai-yoga'], 'I am driving in from Gurgaon')}
        </div>
      </div>
    </section>

    <!-- ================== MAKING THE TRIP WORTH IT =================== -->
    <section class="section section--blush">
      <div class="wrap">
        <div class="split split--flip">
          <div data-reveal>
            <span class="eyebrow">If you are driving anyway</span>
            <h2>Making the trip worth the drive</h2>
            <p>
              If you have come twenty minutes up the highway, it is worth building the visit so the drive earns
              itself. The usual order is banya first, massage second: heat loosens the tissue, and warm muscle
              takes pressure far better than cold muscle does.
            </p>
            <p>
              Allow for the rest phase as well. It is a third of the banya cycle and the part most people are
              tempted to skip because they are thinking about the drive home. Do not skip it.
            </p>
            <div class="btn-row" style="margin-top:var(--sp-4)">
              <a class="btn btn--wa btn--sm" href="${wa('Hello, I am coming from Gurgaon — could I combine the banya with a deep tissue massage?')}" rel="noopener" target="_blank">${waIcon} Ask about combining</a>
              <a class="btn btn--outline btn--sm" href="/services.html#rates">See the rate card</a>
            </div>
          </div>
          <div data-reveal>
${pair('05.jpg', '06.jpg')}
${band(['39.jpg', '40.jpg', '49.jpg', '55.jpg'], true)}
          </div>
        </div>
      </div>
    </section>

    <!-- ============================ FAQ ============================= -->
    <section class="section section--white">
      <div class="wrap wrap--narrow">
        <div class="section-head" data-reveal>
          <span class="eyebrow">Questions</span>
          <h2>Travelling from Gurgaon — FAQs</h2>
        </div>
        <div class="faq">
${faqBlock(GURGAON_FAQS, 'gurgaon')}
        </div>
      </div>
    </section>

    <!-- ========================== RELATED =========================== -->
    <section class="section section--blush">
      <div class="wrap">
        <h2 style="font-size:1.1rem;text-align:center" data-reveal>Related pages</h2>
        <div style="display:flex;justify-content:center;margin-bottom:var(--section-y)">
${related([
  { href: '/russian-spa-in-mahipalpur.html', label: 'Spa in Mahipalpur' },
  { href: '/russian-spa-in-aerocity.html', label: 'Spa near Aerocity' },
  { href: '/russian-spa-in-new-delhi.html', label: 'Spa in New Delhi' },
  { href: '/about.html', label: 'About the spa' }
])}
        </div>
${napBlock()}
      </div>
    </section>

${ctaBand({
  heading: 'Book after work',
  body: 'Message us on the way out of the office and we will hold the room. A late finish is a normal booking ' +
        'here, not a favour.'
})}

  </main>
`
};

/* ==========================================================================
   4. NEW DELHI — city-wide orientation, and what a banya actually is
   ========================================================================== */
const DELHI_FAQS = [
  { q: 'What makes a Russian spa different from other spas in Delhi?',
    a: ['One thing, really: the banya. Delhi has many capable massage spas, and our massage menu is not unusual ' +
        'for the city. What is unusual is a purpose-built moist heat room at roughly 70–90°C with a cold plunge a ' +
        'few steps away, and venik work with imported birch during the heat phase. That combination is the Russian ' +
        'tradition and it is what people travel across the city for.'] },
  { q: 'Where in Delhi are you, and how do I get there by metro?',
    a: ['We are in Mahipalpur, New Delhi 110037, on the airport corridor. By metro, the Airport Express or Yellow ' +
        'Line to Aerocity station puts you about five minutes away by auto.'] },
  { q: 'How long does it take to reach you from other parts of Delhi?',
    a: ['Roughly twenty to thirty minutes from south Delhi, thirty to forty from central Delhi and twenty-five to ' +
        'thirty-five from west Delhi under ordinary conditions. Vasant Kunj is about fifteen minutes and Dwarka ' +
        'about twenty.'] },
  { q: 'Do I need to book in advance?',
    a: ['Not for most treatments — walk-ins are welcome at any hour of any day. The banya and the couples suite ' +
        'should be reserved, because each requires a room to be held for a fixed slot.'] },
  { q: 'Is the banya safe if I have a health condition?',
    a: ['The banya is a heat-based treatment, so if you have a heart condition, high or low blood pressure, are ' +
        'pregnant, or have any other health concern, speak to your doctor first and tell our staff what they ' +
        'advised. Our treatments are wellness services rather than medical treatment. There are gentler options ' +
        'on the menu and we will happily recommend one.'] },
  { q: 'What does it cost?',
    a: ['Published single-session rates run from ₹1,500 for the 30-minute express to ₹6,000 for the two-hour ' +
        'couples retreat, with the banya at ₹4,000 for sixty minutes. The full rate card is on the ' +
        '<a href="/services.html">services page</a>; please confirm the current price when you message us.'] }
];

const DELHI_AREAS = [
  { name: 'South Delhi', time: '20–30 min', note: 'Saket, Hauz Khas, Malviya Nagar and the colonies around them.' },
  { name: 'Central Delhi', time: '30–40 min', note: 'Connaught Place and the areas off the inner ring road.' },
  { name: 'West Delhi', time: '25–35 min', note: 'Janakpuri, Rajouri Garden and the western corridor.' },
  { name: 'Vasant Kunj', time: '≈15 min', note: 'The closest residential cluster of any size.' },
  { name: 'Dwarka', time: '≈20 min', note: 'Straight across on the airport side of the city.' },
  { name: 'By metro', time: '≈5 min from Aerocity', note: 'Airport Express or Yellow Line to Aerocity, then an auto.' }
];

const delhi = {
  file: 'russian-spa-in-new-delhi.html',
  title: 'Russian Spa in New Delhi | Traditional Banya & Body Massage',
  description:
    'Traditional Russian banya in New Delhi: imported birch venik, cold plunge and a full ' +
    'massage menu in Mahipalpur. 20–40 minutes from across the city.',
  ogTitle: 'Russian Spa in New Delhi — Traditional Banya & Massage',
  ogImage: 'assets/gallery/f/55.jpg',
  ogImageAlt: 'Arched courtyard with a still, shallow water basin',
  heroImage: 'assets/gallery/f/55.jpg',
  trail: trailFor('Spa in New Delhi'),
  faqs: DELHI_FAQS,

  body: `
  <main id="main-content">

${pageHero({
  eyebrow: 'Across the city',
  h1: 'Russian spa in <em>New Delhi</em>',
  lead: 'One spa, in Mahipalpur on the airport corridor, reachable in twenty to forty minutes from most of ' +
        'the city — and the reason to cross it is a room most spas do not have.',
  trail: trailFor('Spa in New Delhi'),
  image: 'assets/gallery/f/55.jpg', alt: '', w: g('55.jpg').fw, h: g('55.jpg').fh
})}

    <!-- ===================== WHAT A BANYA IS ======================== -->
    <section class="section section--white">
      <div class="wrap">
        <div class="split">
          <div class="split__media" data-reveal>${galF('47.jpg')}</div>
          <div data-reveal>
            <span class="eyebrow">The difference</span>
            <h2>What a Russian banya actually is</h2>
            <p>
              Delhi is not short of good massage spas, and our massage menu — Swedish, deep tissue, Thai,
              Ayurvedic, aromatherapy — is not unusual for the city. It would be dishonest to pretend otherwise.
            </p>
            <p>
              What is unusual is the banya. A timber room built to hold <strong>moist</strong> heat at roughly
              70–90°C, not the dry heat of a Finnish sauna. A cold plunge within a few steps, because the contrast
              is the mechanism rather than a flourish. And venik work: a bound bundle of imported birch, soaked and
              worked over the body during the heat phase to move hot air onto the skin in waves.
            </p>
            <p>
              Heat, cold, rest — and again if you want it. That combination is the Russian tradition, and it is
              what people cross the city for.
            </p>
            <p style="margin-top:var(--sp-4)"><a class="arrow" href="/about.html">How the room is built</a></p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== REACHING MAHIPALPUR ==================== -->
    <section class="section section--blush">
      <div class="wrap">
        <div class="section-head" data-reveal>
          <span class="eyebrow">Getting here</span>
          <h2>Reaching Mahipalpur from across Delhi</h2>
          <p>Ordinary traffic conditions, door to door.</p>
        </div>
        <div class="grid grid--3">
${DELHI_AREAS.map((a) => `          <div class="feature" data-reveal>
            <p class="plan__name">${esc(a.time)}</p>
            <h3>${esc(a.name)}</h3>
            <p>${esc(a.note)}</p>
          </div>`).join('\n')}
        </div>
      </div>
    </section>

    <!-- ========================= TREATMENTS ========================= -->
    <section class="section section--white">
      <div class="wrap">
        <div class="section-head" data-reveal>
          <span class="eyebrow">Treatments</span>
          <h2>Most-booked treatments</h2>
          <p>Published rates for a single session. Nine in total on the services page.</p>
        </div>
        <div class="grid grid--3">
${svcCards(['russian-banya', 'swedish', 'couples-retreat', 'thai-yoga', 'abhyanga', 'express'], 'I am travelling from Delhi')}
        </div>
      </div>
    </section>

    <!-- ===================== PLANNING A VISIT ======================= -->
    <section class="section section--blush">
      <div class="wrap">
        <div class="split">
          <div data-reveal>
${band(['10.jpg', '25.jpg', '31.jpg', '33.jpg'], true)}
${pair('28.jpg', '29.jpg')}
          </div>
          <div data-reveal>
            <span class="eyebrow">Planning</span>
            <h2>Planning a visit from across town</h2>
            <ol class="plan-rows">
              <li>
                <h3>Pick the hour, not just the day</h3>
                <p>We are open twenty-four hours, so you can aim at the gap in the traffic rather than the gap in
                   our diary.</p>
              </li>
              <li>
                <h3>Reserve the banya and the couples suite</h3>
                <p>Both need a room held for a fixed slot. Everything else takes walk-ins at any hour.</p>
              </li>
              <li>
                <h3>Allow for the rest phase</h3>
                <p>The third part of the banya cycle is where most of the effect settles in. Budget for it rather
                   than driving straight off.</p>
              </li>
              <li>
                <h3>Metro if the roads are bad</h3>
                <p>Airport Express or Yellow Line to Aerocity, then about five minutes by auto.</p>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <!-- ========================= PHOTO BAND ========================= -->
    <section class="section section--white">
      <div class="wrap">
        <div class="section-head" data-reveal>
          <span class="eyebrow">Inside</span>
          <h2>The spa, in photographs</h2>
        </div>
${band(['39.jpg', '40.jpg', '41.jpg', '42.jpg', '43.jpg', '46.jpg', '48.jpg', '52.jpg', '53.jpg', '54.jpg'])}
        <p style="text-align:center;margin-top:var(--sp-5)">
          <a class="btn btn--outline btn--sm" href="/gallery.html">See all ${GAL.length} photographs</a>
        </p>
      </div>
    </section>

    <!-- ============================ FAQ ============================= -->
    <section class="section section--blush">
      <div class="wrap wrap--narrow">
        <div class="section-head" data-reveal>
          <span class="eyebrow">Questions</span>
          <h2>Russian spa in New Delhi — FAQs</h2>
        </div>
        <div class="faq">
${faqBlock(DELHI_FAQS, 'delhi')}
        </div>
      </div>
    </section>

    <!-- ========================== RELATED =========================== -->
    <section class="section section--white">
      <div class="wrap">
        <h2 style="font-size:1.1rem;text-align:center" data-reveal>Related pages</h2>
        <div style="display:flex;justify-content:center;margin-bottom:var(--section-y)">
${related([
  { href: '/russian-spa-in-mahipalpur.html', label: 'Spa in Mahipalpur' },
  { href: '/russian-spa-in-aerocity.html', label: 'Spa near Aerocity' },
  { href: '/russian-spa-in-gurgaon.html', label: 'Spa near Gurgaon' },
  { href: '/gallery.html', label: 'Photo gallery' }
])}
        </div>
${napBlock()}
      </div>
    </section>

${ctaBand({
  heading: 'Come across the city',
  body: 'Message us with a rough time and we will hold the room. Walk-ins are welcome at any hour; the banya ' +
        'and the couples suite are worth reserving.'
})}

  </main>
`
};

module.exports = [mahipalpur, aerocity, gurgaon, delhi].map((p) => ({
  file: p.file,
  title: p.title,
  description: p.description,
  render: () => shell(p)
}));
