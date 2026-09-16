'use strict';

const { CFG } = require('./partials');

/* The 404 page is the only page marked noindex. It is intentionally kept out
   of sitemap.xml, carries no canonical tag, and does not redirect anywhere —
   it tells the visitor what happened and offers real routes onward. */
module.exports = {
  file: '404.html',
  noindex: true,
  title: 'Page Not Found | Mayra Russian Spa',
  description: 'The page you were looking for could not be found. Browse our treatments, gallery or contact details.',
  ogImage: 'assets/home-assets/hero-russian-banya-steam-room.jpg',
  ogImageAlt: 'Wood-panelled Russian banya steam room',
  schema: [],

  body: `
  <main id="main-content">
    <section class="error-page">
      <div class="aurora" aria-hidden="true"><span></span><span></span><span></span></div>
      <div class="container error-page__inner">
        <p class="error-page__code text-gradient" aria-hidden="true">404</p>
        <h1>Page not found</h1>
        <p class="lead">
          The page you were looking for does not exist, or has moved. Nothing is wrong on your end — here is the
          way back in.
        </p>

        <div class="btn-row" style="justify-content:center">
          <a class="btn btn--primary magnetic" data-spark href="/">Back to the homepage</a>
          <a class="btn btn--ghost" href="/services.html">View treatments</a>
          <a class="btn btn--ghost" href="/contact.html">Contact us</a>
        </div>

        <nav aria-label="Popular pages" style="margin-top:var(--sp-8)">
          <h2 style="font-size:var(--fs-md);color:var(--cream)">Popular pages</h2>
          <ul class="related" style="justify-content:center">
            <li><a href="/about.html">About us</a></li>
            <li><a href="/gallery.html">Gallery</a></li>
            <li><a href="/russian-spa-in-mahipalpur.html">Russian Spa in Mahipalpur</a></li>
            <li><a href="/russian-spa-in-aerocity.html">Russian Spa in Aerocity</a></li>
            <li><a href="/russian-spa-in-gurgaon.html">Russian Spa in Gurgaon</a></li>
            <li><a href="/russian-spa-in-new-delhi.html">Russian Spa in New Delhi</a></li>
          </ul>
        </nav>

        <p class="lead" style="margin-top:var(--sp-7);font-size:var(--fs-sm)">
          Need us directly? Call
          <a href="tel:${CFG.PHONE_HREF}" data-site="phone-link"><span data-site="phone">${CFG.PHONE_DISPLAY}</span></a>
          — we answer around the clock.
        </p>
      </div>
    </section>
  </main>
`
};
