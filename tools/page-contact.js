'use strict';

const { CFG, breadcrumb, faqBlock } = require('./partials');
const S = require('./schema');
const { SERVICES, PAYMENTS } = require('./data');

const TRAIL = [
  { label: 'Home', href: '/' },
  { label: 'Contact' }
];

const FAQS = [
  {
    q: 'How do I make a booking?',
    a: ['Call <a href="tel:' + CFG.PHONE_HREF + '" data-site="phone-link"><span data-site="phone">' +
        CFG.PHONE_DISPLAY + '</span></a> — it is the fastest route and you will get a confirmed slot on the spot. ' +
        'You can also email us or use the enquiry form on this page and we will respond directly.']
  },
  {
    q: 'What are your opening hours?',
    a: ['We are open twenty-four hours a day, seven days a week, every day of the year, public holidays included.']
  },
  {
    q: 'Do I need an appointment?',
    a: ['Not for most treatments — walk-ins are welcome at any hour. The banya and the couples suite should be ' +
        'booked ahead, because each needs a room held for a fixed slot.']
  },
  {
    q: 'Where exactly is the spa?',
    a: ['We are in Mahipalpur, New Delhi 110037, on the airport corridor. Call us when you are close and we will ' +
        'direct you or your driver in from the main road.']
  },
  {
    q: 'How can I pay?',
    a: [PAYMENTS]
  }
];

const serviceOptions = SERVICES
  .map((s) => `              <option value="${s.name}">${s.name} (${s.duration})</option>`)
  .join('\n');

const page = {
  file: 'contact.html',
  title: 'Contact & Directions | Mayra Russian Spa, Mahipalpur',
  description:
    'Contact Mayra Russian Spa, Mahipalpur, New Delhi. Call or email to book a Russian ' +
    'banya or massage session. Open 24 hours, walk-ins welcome.',
  ogTitle: 'Contact Mayra Russian Spa — Mahipalpur, New Delhi',
  ogImage: 'assets/contact-assets/contact-spa-entrance.jpg',
  ogImageAlt: 'Softly lit spa entrance and walkway',

  schema: [
    S.contactPage({
      file: 'contact.html',
      title: 'Contact & Directions | Mayra Russian Spa, Mahipalpur',
      description: 'Contact details, opening hours and directions for Mayra Russian Spa.'
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
        <h1 class="split-text">Contact us</h1>
        <p class="lead">
          Calling is the quickest way to get a confirmed slot — we answer at any hour. Email and the enquiry form
          below both reach us too.
        </p>
        <div class="btn-row">
          <a class="btn btn--primary magnetic" data-spark href="tel:${CFG.PHONE_HREF}" data-site="phone-link">
            Call <span data-site="phone">${CFG.PHONE_DISPLAY}</span>
          </a>
          <a class="btn btn--ghost" href="mailto:${CFG.EMAIL}" data-site="email-link">
            Email <span data-site="email">${CFG.EMAIL}</span>
          </a>
        </div>
      </div>
    </section>

    <!-- ==================== DETAILS + FORM ========================= -->
    <section class="section">
      <div class="container">
        <div class="split">

          <!-- Contact details -->
          <div data-reveal="left">
            <p class="eyebrow">Details</p>
            <h2>How to reach us</h2>

            <ul class="checklist" style="margin-bottom:var(--sp-6)">
              <li><strong>Phone:</strong>
                <a href="tel:${CFG.PHONE_HREF}" data-site="phone-link"><span data-site="phone">${CFG.PHONE_DISPLAY}</span></a>
                — answered around the clock</li>
              <li><strong>Email:</strong>
                <a href="mailto:${CFG.EMAIL}" data-site="email-link"><span data-site="email">${CFG.EMAIL}</span></a></li>
              <li><strong>Area:</strong> <span data-site="address">${CFG.ADDRESS_SHORT}</span></li>
              <li><strong>Hours:</strong> <span data-site="hours">${CFG.HOURS_DISPLAY}</span>, including public holidays</li>
              <li><strong>Walk-ins:</strong> welcome at any hour; book ahead for the banya and the couples suite</li>
              <li><strong>Parking:</strong> available on site</li>
            </ul>

            <h3>Finding us</h3>
            <p>
              We are on the airport corridor in Mahipalpur, a short run from Aerocity and IGI Airport Terminal 3.
              The service lanes here can be confusing on a first visit, so the reliable approach is to call when you
              are a few minutes away and let us direct you — or your driver — in from the main road.
            </p>
            <p>
              If you are coming from further out, the location pages set out the route and the timing from each area:
              <a href="/russian-spa-in-aerocity.html">Aerocity</a>,
              <a href="/russian-spa-in-gurgaon.html">Gurgaon</a>,
              <a href="/russian-spa-in-new-delhi.html">across New Delhi</a>, or
              <a href="/russian-spa-in-mahipalpur.html">within Mahipalpur itself</a>.
            </p>

            <div class="notice" style="margin-top:var(--sp-5)">
              <strong>Street address and map.</strong> A precise street line and an embedded map will be published
              here once the verified address and Google Business Profile listing are confirmed. Until then, please
              call for door-to-door directions rather than relying on a pinned guess.
            </div>
          </div>

          <!-- Enquiry form -->
          <div data-reveal="right">
            <p class="eyebrow">Enquiry</p>
            <h2>Send us a message</h2>

            <form class="form" id="enquiry-form" novalidate>

              <!-- Honeypot: hidden from people, tempting to naive bots -->
              <div class="field field--trap" aria-hidden="true">
                <label for="company">Company (leave this field empty)</label>
                <input type="text" id="company" name="company" tabindex="-1" autocomplete="off">
              </div>

              <div class="form__row">
                <div class="field">
                  <label for="name">Your name <span class="req" aria-hidden="true">*</span></label>
                  <input type="text" id="name" name="name" autocomplete="name" required
                         aria-describedby="name-error">
                  <p class="field__error" id="name-error" role="alert"></p>
                </div>

                <div class="field">
                  <label for="phone">Phone <span class="req" aria-hidden="true">*</span></label>
                  <input type="tel" id="phone" name="phone" autocomplete="tel" required
                         aria-describedby="phone-error">
                  <p class="field__error" id="phone-error" role="alert"></p>
                </div>
              </div>

              <div class="field">
                <label for="email">Email <span class="hint">(optional)</span></label>
                <input type="email" id="email" name="email" autocomplete="email"
                       aria-describedby="email-error">
                <p class="field__error" id="email-error" role="alert"></p>
              </div>

              <div class="field">
                <label for="service">Treatment you are interested in <span class="hint">(optional)</span></label>
                <select id="service" name="service">
                  <option value="">Not sure yet — please advise</option>
${serviceOptions}
                </select>
              </div>

              <div class="field">
                <label for="message">Your message <span class="req" aria-hidden="true">*</span></label>
                <textarea id="message" name="message" required aria-describedby="message-error"
                          placeholder="Let us know roughly when you would like to come in, and anything we should know beforehand."></textarea>
                <p class="field__error" id="message-error" role="alert"></p>
              </div>

              <p class="form__status" id="form-status" role="status" aria-live="polite" tabindex="-1"></p>

              <button class="btn btn--primary btn--block magnetic" type="submit">Send enquiry</button>

              <p class="notice">
                <strong>Please note.</strong> This form is not yet connected to a mail service, so submitting it does
                not deliver a message to us. We would rather tell you that than show a false confirmation. Until the
                backend is connected, please call
                <a href="tel:${CFG.PHONE_HREF}" data-site="phone-link"><span data-site="phone">${CFG.PHONE_DISPLAY}</span></a>
                or email <a href="mailto:${CFG.EMAIL}" data-site="email-link"><span data-site="email">${CFG.EMAIL}</span></a>.
              </p>
            </form>
          </div>

        </div>
      </div>
    </section>

    <!-- ========================= IMAGE ============================= -->
    <section class="section section--tight">
      <div class="container">
        <img src="/assets/contact-assets/contact-reception-desk.jpg"
             alt="Reception desk with folded towels and a small lamp"
             width="900" height="600" loading="lazy" decoding="async"
             style="width:100%;border-radius:var(--radius-lg);box-shadow:var(--shadow)" data-reveal="scale">
      </div>
    </section>

    <!-- ========================== FAQ ============================== -->
    <section class="section section--cream">
      <div class="container container--narrow">
        <div class="section-head is-centered" data-reveal>
          <p class="eyebrow">Questions</p>
          <h2>Before you get in touch</h2>
        </div>
        <div class="faq">
${faqBlock(FAQS, 'contact')}
        </div>
      </div>
    </section>

  </main>
`
};

module.exports = page;
