'use strict';

const { CFG, breadcrumb, ctaBand, faqBlock, contactStrip } = require('./partials');
const S = require('./schema');
const { FACILITIES, PAYMENTS } = require('./data');

const TRAIL = [
  { label: 'Home', href: '/' },
  { label: 'About' }
];

const FAQS = [
  {
    q: 'What makes a Russian spa different from a regular spa or salon?',
    a: ['The banya. A standard spa offers massage and often a steam cabinet; a Russian spa is built around a heat room ' +
        'held at moist 70–90°C, a cold plunge within a few steps of it, and venik work with birch leaves during the ' +
        'heat phase. The massage menu here overlaps with any good spa — it is the banya room that is harder to find.']
  },
  {
    q: 'Can I request a male or female therapist?',
    a: ['Yes. We have both on shift and you can state a preference when you book or when you arrive. If a particular ' +
        'therapist is not available at that hour we will tell you rather than substitute silently.']
  },
  {
    q: 'What are your hygiene arrangements?',
    a: ['Treatment rooms are sanitised between every guest and linen and towels are changed for each session. The banya ' +
        'is cleaned between sessions. Lockers are provided for personal belongings.']
  },
  {
    q: 'What payment methods do you accept?',
    a: [PAYMENTS]
  },
  {
    q: 'Do you have parking?',
    a: ['Yes, parking is available on site. If you are arriving by cab or auto, call us when you are close and we will ' +
        'talk your driver in — the Mahipalpur service lanes can be confusing the first time.']
  }
];

const facilityCards = FACILITIES.map((f, i) => `          <div class="feature" data-reveal data-reveal-delay="${i * 60}">
            <div class="feature__icon" aria-hidden="true">${f.icon}</div>
            <h3>${f.title}</h3>
            <p>${f.body}</p>
          </div>`).join('\n');

const page = {
  file: 'about.html',
  title: 'About Us | Mayra Russian Spa, Mahipalpur',
  description:
    'Inside Mayra Russian Spa, Mahipalpur: how the banya room is built, what we provide, ' +
    'and our approach to privacy, hygiene and 24-hour opening.',
  ogTitle: 'About Mayra Russian Spa — Mahipalpur, New Delhi',
  ogImage: 'assets/about-assets/about-spa-reception-area.jpg',
  ogImageAlt: 'Calm reception and waiting area at Mayra Russian Spa',

  schema: [
    S.webPage({
      file: 'about.html',
      title: 'About Us | Mayra Russian Spa, Mahipalpur',
      description: 'About Mayra Russian Spa, a Russian banya and massage centre in Mahipalpur, New Delhi.',
      ogImage: 'assets/about-assets/about-spa-reception-area.jpg'
    }),
    S.breadcrumbList(TRAIL),
    S.faqPage(FAQS)
  ],

  body: `
  <main id="main-content">

    <section class="hero hero--compact">
      <div class="aurora" aria-hidden="true"><span></span><span></span><span></span></div>
      <div class="container hero__inner">
${breadcrumb(TRAIL)}
        <h1 class="split-text">About Mayra Russian Spa</h1>
        <p class="lead">
          A banya room, a cold plunge, six private treatment suites and a quiet lounge — in Mahipalpur, New Delhi,
          open every hour of every day.
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="split">
          <div class="split__media" data-reveal="left">
            <img src="/assets/about-assets/about-spa-reception-area.jpg"
                 alt="Reception and waiting area with low seating and warm lighting"
                 width="1600" height="1068" fetchpriority="high" decoding="async">
          </div>
          <div data-reveal="right">
            <p class="eyebrow">Who we are</p>
            <h2 class="blur-text">One spa, built around one idea</h2>
            <p class="lead">
              Mayra Russian Spa exists because the banya is difficult to do halfway. You either build the room for it
              or you do not have it.
            </p>
            <p>
              We are a single location in Mahipalpur — not a chain, not a franchise, and not a hotel concession. That
              matters more than it sounds. It means the banya cycle was designed into the floor plan rather than fitted
              around an existing layout, and it means the people who run the room are the people who are here every day.
            </p>
            <p>
              Around the banya we run a full massage menu, because most visits combine the two and because not everyone
              wants heat. A guest who comes off a fourteen-hour flight at four in the morning usually wants sixty
              quiet minutes on a table, not a steam room. Both are available at that hour.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--cream">
      <div class="container">
        <div class="split split--media-right">
          <div class="split__media" data-reveal="right">
            <img src="/assets/about-assets/about-birch-venik-bundles.jpg"
                 alt="Dried birch venik bundles hanging ready for use in the banya"
                 width="1000" height="667" loading="lazy" decoding="async">
          </div>
          <div data-reveal="left">
            <p class="eyebrow">The banya</p>
            <h2>Why the birch actually matters</h2>
            <p>
              A venik is a bound bundle of birch branches, soaked before use and worked over the body during the heat
              phase of a banya. It is not a scrubbing tool and it is not decorative. The therapist uses it to move hot
              air onto the skin in waves, to press heat into the large muscle groups, and to finish with light strokes
              that leave the leaf oils on the skin.
            </p>
            <p>
              Substituting a local leaf changes what the ritual does, so we import the birch bundles instead. It is a
              small, unglamorous supply-chain decision that most guests never think about, and it is the difference
              between a banya and a steam room with a story attached.
            </p>
            <p>
              The cycle itself runs heat, cold, rest — and repeats if you want it to. The cold plunge sits a few steps
              from the steam room door, because the contrast is the mechanism. The rest phase, in the lounge with
              herbal tea, is where most of the effect settles in.
            </p>
            <p style="margin-top:var(--sp-5)"><a class="link-arrow" href="/services.html#russian-banya">See the banya session details</a></p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head" data-reveal>
          <p class="eyebrow">Standards</p>
          <h2>What we provide, every visit</h2>
        </div>
        <div class="grid grid--3">
${facilityCards}
        </div>
      </div>
    </section>

    <section class="section section--dark">
      <div class="container">
        <div class="split">
          <div class="split__media" data-reveal="left">
            <img src="/assets/about-assets/about-private-therapy-room.jpg"
                 alt="Private treatment room with a single draped massage bed"
                 width="1000" height="667" loading="lazy" decoding="async">
          </div>
          <div data-reveal="right">
            <p class="eyebrow">Privacy</p>
            <h2>How we handle privacy and comfort</h2>
            <p>
              Every treatment happens behind a closed door in a private, temperature-controlled room. There are no
              cameras in treatment areas and no shared treatment floors. Lockers are provided for anything you would
              rather not leave in a changing room.
            </p>
            <p>
              Before any session your therapist will ask about pressure, problem areas, injuries and anything they
              should avoid. You can change that instruction at any point during the treatment — saying "lighter" or
              "stop" is expected, not awkward.
            </p>
            <ul class="checklist" style="margin-top:var(--sp-5)">
              <li>Private room for every treatment, with temperature control</li>
              <li>Fresh linen and towels changed between every guest</li>
              <li>Male and female therapists on shift; state your preference</li>
              <li>Lockers for personal belongings, and parking on site</li>
              <li>Consultation before the session, adjustable during it</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--cream">
      <div class="container">
        <div class="split split--media-right">
          <div class="split__media" data-reveal="right">
            <img src="/assets/about-assets/about-therapist-at-work.jpg"
                 alt="Therapist working along a guest's shoulder during a treatment"
                 width="1000" height="1500" loading="lazy" decoding="async">
          </div>
          <div data-reveal="left">
            <p class="eyebrow">Hours</p>
            <h2>Open at hours that suit the neighbourhood</h2>
            <p>
              Mahipalpur sits on the airport corridor, and the corridor does not keep office hours. Flight crews finish
              shifts at odd times, transit passengers have six-hour gaps in the middle of the night, and the Gurgaon
              working day frequently ends after most spas have closed.
            </p>
            <p>
              So we are open twenty-four hours a day, seven days a week, three hundred and sixty-five days a year,
              public holidays included. A three a.m. booking is a normal booking here, not an exception we grudgingly
              accommodate.
            </p>
            <p>
              Walk-ins are welcome at any hour. For the banya and the couples suite we ask you to call ahead, since
              both require a room to be held for a fixed slot.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container container--narrow">
        <div class="section-head is-centered" data-reveal>
          <p class="eyebrow">Questions</p>
          <h2>About us — common questions</h2>
        </div>
        <div class="faq">
${faqBlock(FAQS, 'about')}
        </div>
      </div>
    </section>

    <section class="section section--tight">
      <div class="container">
${contactStrip()}
        <p class="notice" style="margin-top:var(--sp-5)" data-reveal>
          <strong>A note on claims.</strong> We have deliberately not published star ratings, review counts or
          testimonials on this site. Anything you read here about the facility, the treatments or the rates is
          something you can verify by calling <a href="tel:${CFG.PHONE_HREF}" data-site="phone-link">
          <span data-site="phone">${CFG.PHONE_DISPLAY}</span></a> before you book.
        </p>
      </div>
    </section>

${ctaBand({
  heading: 'Come and see the room',
  body: 'The fastest way to find out whether a banya is for you is to call and ask. We will talk you through the ' +
        'cycle, the timing and what to expect on a first visit.',
  note: null
})}

  </main>
`
};

module.exports = page;
