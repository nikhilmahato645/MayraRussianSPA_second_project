/* ==========================================================================
   page-about.js — about the spa
   --------------------------------------------------------------------------
   Chrome comes from theme.js. Content and copy carried over from the original
   build; see theme.js for the identity and content rules.

   SEO angle unique to this page: what a Russian banya actually is and how
   this one is built — "russian banya in delhi", "about ... spa mahipalpur".
   The home page sells; this page explains, so the two do not compete for the
   same query.
   ========================================================================== */

'use strict';

const T = require('./theme');
const { CFG, esc, faqBlock, ctaBand, napBlock, pageHero, shell } = T;
const { FACILITIES, PAYMENTS } = require('./data');
const GAL = require('./gallery-data.json');

/* Reuse the gallery photographs rather than shipping a second set of files:
   they are already optimised and the dimensions are known, which keeps
   Cumulative Layout Shift at zero. */
const byName = (n) => GAL.find((g) => g.n === n);
const pic = (n, alt, eager) => {
  const g = byName(n);
  return `<img src="/assets/gallery/f/${g.n}" alt="${esc(alt)}" width="${g.fw}" height="${g.fh}" ` +
         (eager ? 'fetchpriority="high"' : 'loading="lazy"') + ' decoding="async">';
};

const TRAIL = [{ label: 'Home', href: '/' }, { label: 'About Us' }];
const HERO = 'assets/gallery/f/05.jpg';

const TITLE = 'About Our Russian Spa in Mahipalpur | Banya & Massage, Delhi';
const DESCRIPTION =
  'How our Russian banya in Mahipalpur is built: the heat room, the cold plunge, imported birch ' +
  'venik and private rooms, open 24 hours near Delhi Airport.';

const FAQS = [
  { q: 'What makes a Russian spa different from a regular spa or salon?',
    a: ['The banya. A standard spa offers massage and often a steam cabinet; a Russian spa is built around a heat ' +
        'room held at moist 70–90°C, a cold plunge within a few steps of it, and venik work with birch leaves ' +
        'during the heat phase. The massage menu here overlaps with any good spa — it is the banya room that is ' +
        'harder to find in Delhi.'] },
  { q: 'Can I request a male or female therapist?',
    a: ['Yes. We have both on shift and you can state a preference when you book or when you arrive. If a ' +
        'particular therapist is not available at that hour we will tell you rather than substitute silently.'] },
  { q: 'What are your hygiene arrangements?',
    a: ['Treatment rooms are sanitised between every guest, and linen and towels are changed for each session. ' +
        'The banya is cleaned between sessions. Lockers are provided for personal belongings.'] },
  { q: 'Do you have parking?',
    a: ['Yes, parking is available on site. If you are arriving by cab or auto, call us when you are close and we ' +
        'will talk your driver in — the Mahipalpur service lanes can be confusing the first time.'] },
  { q: 'How far is the spa from the airport and Aerocity?',
    a: ['About ten minutes by road from IGI Airport Terminal 3, and five to seven minutes from the Aerocity hotel ' +
        'cluster. We are in Mahipalpur, New Delhi 110037, just off NH-48 on the airport corridor.'] },
  { q: 'What payment methods do you accept?', a: [PAYMENTS] }
];

const facilityCards = FACILITIES.map((f) => `            <div class="feature" data-reveal>
              <div class="feature__icon" aria-hidden="true">${f.icon}</div>
              <h3>${esc(f.title)}</h3>
              <p>${f.body}</p>
            </div>`).join('\n');

const page = {
  file: 'about.html',
  title: TITLE,
  description: DESCRIPTION,
  ogTitle: 'About Our Russian Spa in Mahipalpur, New Delhi',
  ogImage: HERO,
  ogImageAlt: 'Warmly lit banya heat room at temperature',
  heroImage: HERO,
  pageType: 'AboutPage',
  trail: TRAIL,
  faqs: FAQS,

  body: `
  <main id="main-content">

${pageHero({
  eyebrow: 'About us',
  h1: 'One spa in <em>Mahipalpur</em>, built around one room',
  lead: 'A banya room, a cold plunge, private treatment suites and a quiet lounge — on the Delhi airport ' +
        'corridor, open every hour of every day.',
  trail: TRAIL,
  image: HERO, alt: '', w: byName('05.jpg').fw, h: byName('05.jpg').fh
})}

    <!-- ========================== WHO WE ARE ========================= -->
    <section class="section section--white">
      <div class="wrap">
        <div class="split">
          <div class="split__media" data-reveal>
            ${pic('33.jpg', 'Row of treatment beds made up with fresh white linen')}
          </div>
          <div data-reveal>
            <span class="eyebrow">Who we are</span>
            <h2>Not a chain, not a hotel concession</h2>
            <p>
              This spa exists because the banya is difficult to do halfway. You either build the room for it or
              you do not have it.
            </p>
            <p>
              We are a single location in Mahipalpur — not a chain, not a franchise, and not a counter inside
              someone else's hotel. That matters more than it sounds. It means the banya cycle was designed into
              the floor plan rather than fitted around an existing layout, and it means the people who run the
              room are the people who are here every day.
            </p>
            <p>
              Around the banya we run a full massage menu, because most visits combine the two and because not
              everyone wants heat. A guest who comes off a fourteen-hour flight at four in the morning usually
              wants sixty quiet minutes on a table, not a steam room. Both are available at that hour.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ========================== THE BIRCH ========================== -->
    <section class="section section--blush">
      <div class="wrap">
        <div class="split split--flip">
          <div data-reveal>
            <span class="eyebrow">The banya</span>
            <h2>Why the birch actually matters</h2>
            <p>
              A venik is a bound bundle of birch branches, soaked before use and worked over the body during the
              heat phase of a banya. It is not a scrubbing tool and it is not decorative. The therapist uses it to
              move hot air onto the skin in waves, to press heat into the large muscle groups, and to finish with
              light strokes that leave the leaf oils on the skin.
            </p>
            <p>
              Substituting a local leaf changes what the ritual does, so we import the birch bundles instead. It is
              a small, unglamorous supply-chain decision that most guests never think about, and it is the
              difference between a banya and a steam room with a story attached.
            </p>
            <p>
              The cycle itself runs heat, cold, rest — and repeats if you want it to. The cold plunge sits a few
              steps from the steam room door, because the contrast is the mechanism. The rest phase, in the lounge
              with herbal tea, is where most of the effect settles in.
            </p>
            <p style="margin-top:var(--sp-4)">
              <a class="arrow" href="/services.html#russian-banya">See the banya session details</a>
            </p>
          </div>
          <div class="split__media" data-reveal>
            ${pic('01.jpg', 'Stand of birch trees of the kind a banya venik is cut from')}
          </div>
        </div>
      </div>
    </section>

    <!-- ========================= WHAT WE PROVIDE ===================== -->
    <section class="section section--white">
      <div class="wrap">
        <div class="section-head" data-reveal>
          <span class="eyebrow">Standards</span>
          <h2>What we provide, every visit</h2>
          <p>The same list for a three a.m. walk-in as for a booked couples suite.</p>
        </div>
        <div class="grid grid--3">
${facilityCards}
        </div>
      </div>
    </section>

    <!-- =========================== PRIVACY =========================== -->
    <section class="section section--dark">
      <div class="wrap">
        <div class="split">
          <div class="split__media" data-reveal>
            ${pic('29.jpg', 'Low-lit private room with dark stone and wall sconces')}
          </div>
          <div data-reveal>
            <span class="eyebrow">Privacy</span>
            <h2>How we handle privacy and comfort</h2>
            <p>
              Every treatment happens behind a closed door in a private, temperature-controlled room. There are no
              cameras in treatment areas and no shared treatment floors. Lockers are provided for anything you
              would rather not leave in a changing room.
            </p>
            <p>
              Before any session your therapist will ask about pressure, problem areas, injuries and anything they
              should avoid. You can change that instruction at any point during the treatment — saying "lighter"
              or "stop" is expected, not awkward.
            </p>
            <ul class="checklist">
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

    <!-- ============================ HOURS ============================ -->
    <section class="section section--blush">
      <div class="wrap">
        <div class="split split--flip">
          <div data-reveal>
            <span class="eyebrow">Hours</span>
            <h2>Open at hours that suit the airport corridor</h2>
            <p>
              Mahipalpur sits on the airport corridor, and the corridor does not keep office hours. Flight crews
              finish shifts at odd times, transit passengers have six-hour gaps in the middle of the night, and the
              Gurgaon working day frequently ends after most spas have closed.
            </p>
            <p>
              So we are open twenty-four hours a day, seven days a week, three hundred and sixty-five days a year,
              public holidays included. A three a.m. booking is a normal booking here, not an exception we
              grudgingly accommodate.
            </p>
            <p>
              Walk-ins are welcome at any hour. For the banya and the couples suite we ask you to message ahead,
              since both require a room to be held for a fixed slot.
            </p>
          </div>
          <div class="split__media" data-reveal>
            ${pic('31.jpg', 'Outdoor spa bath lit by lanterns in the evening')}
          </div>
        </div>
      </div>
    </section>

    <!-- ============================= FAQ ============================= -->
    <section class="section section--white">
      <div class="wrap wrap--narrow">
        <div class="section-head" data-reveal>
          <span class="eyebrow">Questions</span>
          <h2>About us — common questions</h2>
        </div>
        <div class="faq">
${faqBlock(FAQS, 'about')}
        </div>
      </div>
    </section>

    <!-- ===================== NAP + A NOTE ON CLAIMS ================== -->
    <section class="section section--blush">
      <div class="wrap">
${napBlock()}
        <p class="notice" style="margin-top:var(--sp-5)" data-reveal>
          <strong>A note on claims.</strong> We have deliberately not published star ratings, review counts,
          testimonials or client-number statistics on this site, because we cannot evidence them. Anything you
          read here about the facility, the treatments or the rates is something you can verify by calling
          <a href="tel:${CFG.PHONE_HREF}">${CFG.PHONE_DISPLAY}</a> before you book.
        </p>
      </div>
    </section>

${ctaBand({
  heading: 'Come and see the room',
  body: 'The fastest way to find out whether a banya is for you is to ask. Message us and we will talk you ' +
        'through the cycle, the timing and what to expect on a first visit.'
})}

  </main>
`
};

module.exports = { file: page.file, title: page.title, description: page.description, render: () => shell(page) };
