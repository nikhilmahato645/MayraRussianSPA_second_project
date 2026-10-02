/* ==========================================================================
   page-contact.js — contact, directions and enquiry form
   --------------------------------------------------------------------------
   Chrome comes from theme.js.

   SEO angle unique to this page: navigational and local intent — "spa near
   delhi airport", "spa mahipalpur contact number", "spa open now near me".
   The directions block is the substantive content; the form is secondary.

   THE FORM HAS NO BACKEND. CFG.FORM_ENDPOINT is null, so the script validates
   the input and then tells the visitor to message or call instead. It never
   claims a message was sent. Point FORM_ENDPOINT at a real endpoint
   (Formspree, Netlify Forms, your own API) to enable real submission.
   ========================================================================== */

'use strict';

const T = require('./theme');
const { CFG, esc, WA_GENERAL, waIcon, telIcon, mailIcon, ico, faqBlock, pageHero, shell } = T;
const { SERVICES, PAYMENTS } = require('./data');
const GAL = require('./gallery-data.json');

const byName = (n) => GAL.find((g) => g.n === n);
const TRAIL = [{ label: 'Home', href: '/' }, { label: 'Contact Us' }];
const HERO = 'assets/gallery/f/32.jpg';

const TITLE = 'Contact & Directions | Spa Near Delhi Airport, Mahipalpur';
const DESCRIPTION =
  'Call or WhatsApp +91 7492993476 to book. Mahipalpur, New Delhi 110037 — 10 minutes from ' +
  'Terminal 3, 5 from Aerocity. Open 24 hours, walk-ins welcome.';

const FAQS = [
  { q: 'How do I make a booking?',
    a: ['WhatsApp or call <a href="tel:' + CFG.PHONE_HREF + '">' + CFG.PHONE_DISPLAY + '</a> — that is the fastest ' +
        'route and you will get a confirmed slot on the spot. You can also email us or use the enquiry form on ' +
        'this page and we will respond directly.'] },
  { q: 'What are your opening hours?',
    a: ['Twenty-four hours a day, seven days a week, every day of the year, public holidays included.'] },
  { q: 'Do I need an appointment?',
    a: ['Not for most treatments — walk-ins are welcome at any hour. The banya and the couples suite should be ' +
        'booked ahead, because each needs a room held for a fixed slot.'] },
  { q: 'How do I get there from the airport?',
    a: ['From IGI Airport Terminal 3 it is roughly ten minutes by road via NH-48. From the Aerocity hotel cluster ' +
        'it is five to seven minutes by cab. Message us when you are close and we will direct you, or your ' +
        'driver, in from the main road — the Mahipalpur service lanes are confusing the first time.'] },
  { q: 'Is there parking?',
    a: ['Yes, parking is available on site.'] },
  { q: 'How can I pay?', a: [PAYMENTS] }
];

const serviceOptions = SERVICES
  .map((s) => `                <option value="${esc(s.name)}">${esc(s.name)} (${esc(s.duration)})</option>`)
  .join('\n');

const page = {
  file: 'contact.html',
  title: TITLE,
  description: DESCRIPTION,
  ogTitle: 'Contact & Directions — Spa in Mahipalpur, New Delhi',
  ogImage: HERO,
  ogImageAlt: 'Spa lounge counter with stools and a tall flower arrangement',
  heroImage: HERO,
  pageType: 'ContactPage',
  trail: TRAIL,
  faqs: FAQS,

  body: `
  <main id="main-content">

${pageHero({
  eyebrow: 'Contact us',
  h1: 'Book a session at our <em>Mahipalpur</em> spa',
  lead: 'WhatsApp or call and you will get a confirmed slot on the spot. We answer at any hour, every day of ' +
        'the year.',
  trail: TRAIL,
  image: HERO, alt: '', w: byName('32.jpg').fw, h: byName('32.jpg').fh
})}

    <!-- ====================== CONTACT METHODS ======================= -->
    <section class="section section--white">
      <div class="wrap">
        <div class="section-head" data-reveal>
          <span class="eyebrow">Three ways to reach us</span>
          <h2>Talk to the spa directly</h2>
          <p>Whichever you pick, a person answers — there is no booking queue and no call centre.</p>
        </div>
        <div class="grid grid--3">
          <div class="feature" data-reveal>
            <div class="feature__icon" aria-hidden="true">${ico('wa')}</div>
            <h3>WhatsApp</h3>
            <p>Fastest for a booking. Send the treatment and a rough time.</p>
            <p style="margin-top:var(--sp-3)">
              <a class="btn btn--wa btn--sm btn--block" href="${WA_GENERAL}" rel="noopener" target="_blank">${waIcon} Message us</a>
            </p>
          </div>
          <div class="feature" data-reveal>
            <div class="feature__icon" aria-hidden="true">${ico('tel')}</div>
            <h3>Phone</h3>
            <p>Answered around the clock, including public holidays.</p>
            <p style="margin-top:var(--sp-3)">
              <a class="btn btn--outline btn--sm btn--block" href="tel:${CFG.PHONE_HREF}">${telIcon} ${CFG.PHONE_DISPLAY}</a>
            </p>
          </div>
          <div class="feature" data-reveal>
            <div class="feature__icon" aria-hidden="true">${ico('mail')}</div>
            <h3>Email</h3>
            <p>For enquiries that are not time-critical.</p>
            <p style="margin-top:var(--sp-3)">
              <a class="btn btn--outline btn--sm btn--block" href="mailto:${CFG.EMAIL}">${mailIcon} Email us</a>
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ========================= DIRECTIONS ========================== -->
    <section class="section section--blush">
      <div class="wrap">
        <div class="split">
          <div data-reveal>
            <span class="eyebrow">Finding us</span>
            <h2>How to reach the spa</h2>
            <p>
              We are in <strong>Mahipalpur, New Delhi 110037</strong>, just off NH-48 on the airport corridor.
              It is a short, predictable run from the airport and from Aerocity, and a straight one up the
              highway from Gurgaon.
            </p>
            <ul class="checklist">
              <li><strong>IGI Airport Terminal 3</strong> — about 10 minutes by road</li>
              <li><strong>Aerocity hotel cluster</strong> — 5 to 7 minutes by cab</li>
              <li><strong>Gurgaon Cyber City</strong> — 18 to 22 minutes up NH-48</li>
              <li><strong>Airport Express metro</strong> — on the corridor, from central Delhi</li>
              <li><strong>Parking</strong> — available on site</li>
            </ul>
            <p style="margin-top:var(--sp-4)">
              The Mahipalpur service lanes are confusing the first time. Message us when you are close and we
              will talk you, or your driver, in from the main road.
            </p>
            <div class="btn-row" style="margin-top:var(--sp-4)">
              <a class="btn btn--wa btn--sm" href="${T.wa('Hello, I am on my way to your Mahipalpur spa — could you send directions?')}" rel="noopener" target="_blank">${waIcon} Ask for directions</a>
            </div>
          </div>

          <div data-reveal>
            <div class="nap" style="grid-template-columns:1fr">
              <div><h3>Address</h3><p>${CFG.ADDRESS_SHORT}</p></div>
              <div><h3>Phone &amp; WhatsApp</h3><p><a href="tel:${CFG.PHONE_HREF}">${CFG.PHONE_DISPLAY}</a></p></div>
              <div><h3>Email</h3><p><a href="mailto:${CFG.EMAIL}">${CFG.EMAIL}</a></p></div>
              <div><h3>Hours</h3><p>${CFG.HOURS_DISPLAY}</p></div>
            </div>
            <p class="notice" style="margin-top:var(--sp-4)">
              <strong>No street line is published.</strong> We publish the locality rather than an invented
              street address, because a wrong address on a map listing costs you a visit. Message or call and we
              will give you the exact door.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================== FORM ============================== -->
    <section class="section section--white">
      <div class="wrap wrap--narrow">
        <div class="section-head" data-reveal>
          <span class="eyebrow">Enquiry</span>
          <h2>Send us a message</h2>
          <p>Fill this in and we will open WhatsApp with your details already written out.</p>
        </div>

        <form class="form" id="enquiry-form" novalidate data-reveal data-wa="${CFG.WHATSAPP}">
          <!-- Honeypot: a real field, visually removed. Bots fill it; people
               never see it. Hidden by position, not display:none, because
               some bots skip fields that are display:none. -->
          <div class="field field--trap" aria-hidden="true">
            <label for="company">Company (leave this field empty)</label>
            <input type="text" id="company" name="company" tabindex="-1" autocomplete="off">
          </div>

          <div class="form__row">
            <div class="field">
              <label for="name">Your name <span class="req" aria-hidden="true">*</span></label>
              <input type="text" id="name" name="name" autocomplete="name" required aria-describedby="name-error">
              <span class="field__error" id="name-error"></span>
            </div>
            <div class="field">
              <label for="phone">Phone <span class="req" aria-hidden="true">*</span></label>
              <input type="tel" id="phone" name="phone" autocomplete="tel" required aria-describedby="phone-error">
              <span class="field__error" id="phone-error"></span>
            </div>
          </div>

          <div class="field">
            <label for="email">Email <span class="hint">(optional)</span></label>
            <input type="email" id="email" name="email" autocomplete="email" aria-describedby="email-error">
            <span class="field__error" id="email-error"></span>
          </div>

          <div class="field">
            <label for="service">Treatment you are interested in <span class="hint">(optional)</span></label>
            <select id="service" name="service">
              <option value="">No preference yet</option>
${serviceOptions}
            </select>
          </div>

          <div class="field">
            <label for="message">Your message <span class="req" aria-hidden="true">*</span></label>
            <textarea id="message" name="message" required aria-describedby="message-error"
                      placeholder="Roughly when you would like to come in, and anything we should know beforehand."></textarea>
            <span class="field__error" id="message-error"></span>
          </div>

          <p class="form__status" id="form-status" role="status" aria-live="polite" tabindex="-1"></p>

          <button class="btn btn--wa" type="submit">${waIcon} Send on WhatsApp</button>

          <p class="notice">
            <strong>How this works.</strong> Pressing the button opens WhatsApp with your name, number and
            message already written out — you just press send there. Nothing is emailed, because WhatsApp is the
            channel we actually watch and you get an answer faster. Prefer to call?
            <a href="tel:${CFG.PHONE_HREF}">${CFG.PHONE_DISPLAY}</a>, any hour.
          </p>
        </form>
      </div>
    </section>

    <!-- ============================= FAQ ============================= -->
    <section class="section section--blush">
      <div class="wrap wrap--narrow">
        <div class="section-head" data-reveal>
          <span class="eyebrow">Questions</span>
          <h2>Contact &amp; directions questions</h2>
        </div>
        <div class="faq">
${faqBlock(FAQS, 'contact')}
        </div>
      </div>
    </section>

  </main>
`
};

module.exports = { file: page.file, title: page.title, description: page.description, render: () => shell(page) };
