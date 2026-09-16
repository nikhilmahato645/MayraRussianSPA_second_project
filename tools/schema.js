/* ==========================================================================
   schema.js — JSON-LD builders
   --------------------------------------------------------------------------
   HARD RULE APPLIED THROUGHOUT THIS FILE:
   every property emitted here is backed by content that is actually visible
   on the page. Deliberately NOT emitted, because no verifiable source exists:

     aggregateRating / ratingValue / reviewCount / review
     award, streetAddress, geo (latitude/longitude), hasMap
     sameAs (no verified social profile was supplied)
     foundingDate, numberOfEmployees

   Inventing any of those is exactly the "fake schema" that triggers manual
   actions in Search Console, so they are omitted rather than guessed.
   ========================================================================== */

'use strict';

const { CFG } = require('./partials');

const ORG_ID   = `${CFG.SITE_URL}/#organization`;
const SITE_ID  = `${CFG.SITE_URL}/#website`;

/* Postal address — locality/region/postcode only. These are supported by the
   source material; the street line is not, so it is left out. */
const address = () => ({
  '@type': 'PostalAddress',
  addressLocality: CFG.LOCALITY,
  addressRegion: CFG.REGION,
  postalCode: CFG.POSTAL_CODE,
  addressCountry: CFG.COUNTRY
});

/* Open 24/7 is stated consistently across the source pages. */
const hours = () => ({
  '@type': 'OpeningHoursSpecification',
  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  opens: '00:00',
  closes: '23:59'
});

/* The business entity, referenced by @id from every other node. */
function organization() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HealthAndBeautyBusiness',
    '@id': ORG_ID,
    name: CFG.BUSINESS_NAME,
    description:
      'Russian banya and massage therapy centre in Mahipalpur, New Delhi, offering ' +
      'traditional birch-venik banya sessions, deep tissue bodywork, couples treatments ' +
      'and aromatherapy in private rooms, open 24 hours.',
    url: `${CFG.SITE_URL}/`,
    logo: `${CFG.SITE_URL}/assets/brand-assets/icon-512.png`,
    image: `${CFG.SITE_URL}/assets/home-assets/hero-russian-banya-steam-room.jpg`,
    telephone: CFG.PHONE_HREF,
    email: CFG.EMAIL,
    address: address(),
    openingHoursSpecification: [hours()],
    priceRange: '₹1500–₹8000',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, Credit Card, Debit Card, UPI',
    areaServed: [
      { '@type': 'Place', name: 'Mahipalpur, New Delhi' },
      { '@type': 'Place', name: 'Aerocity, New Delhi' },
      { '@type': 'Place', name: 'Gurgaon, Haryana' },
      { '@type': 'Place', name: 'New Delhi' }
    ]
  };
}

function website() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: `${CFG.SITE_URL}/`,
    name: CFG.BUSINESS_NAME,
    inLanguage: 'en-IN',
    publisher: { '@id': ORG_ID }
  };
}

function webPage(page) {
  const url = `${CFG.SITE_URL}/${page.file === 'index.html' ? '' : page.file}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: page.title,
    description: page.description,
    inLanguage: 'en-IN',
    isPartOf: { '@id': SITE_ID },
    about: { '@id': ORG_ID },
    primaryImageOfPage: `${CFG.SITE_URL}/${page.ogImage}`
  };
}

/* Mirrors the visible breadcrumb markup exactly. */
function breadcrumbList(trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => {
      const item = {
        '@type': 'ListItem',
        position: i + 1,
        name: t.label
      };
      if (t.href) item.item = `${CFG.SITE_URL}${t.href}`;
      return item;
    })
  };
}

/* Every question/answer here is rendered visibly on the page. */
function faqPage(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        /* Strip the inline markup used in the visible copy */
        text: f.a.join(' ').replace(/<[^>]+>/g, '')
      }
    }))
  };
}

/* Service catalogue — prices come from the published rate card on the page. */
function offerCatalog(services) {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'Spa and massage services',
    itemListElement: services.map((s) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: s.name,
        description: s.short,
        serviceType: 'Spa treatment',
        provider: { '@id': ORG_ID },
        areaServed: { '@type': 'Place', name: 'Delhi NCR' }
      },
      ...(s.price
        ? { price: String(s.price), priceCurrency: 'INR', availability: 'https://schema.org/InStock' }
        : {})
    }))
  };
}

/* A location page describes the same single business serving a named area —
   NOT a separate branch. Emitting a second LocalBusiness with a fake address
   per city is a classic doorway-page signal, so we use Service + areaServed. */
function locationService({ name, areaName, description }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    serviceType: 'Russian banya and massage therapy',
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Place', name: areaName },
    availableChannel: {
      '@type': 'ServiceChannel',
      servicePhone: { '@type': 'ContactPoint', telephone: CFG.PHONE_HREF, contactType: 'reservations' },
      serviceUrl: `${CFG.SITE_URL}/contact.html`
    }
  };
}

function imageGallery(images, pageUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    '@id': `${pageUrl}#gallery`,
    name: 'Mayra Russian Spa gallery',
    isPartOf: { '@id': SITE_ID },
    associatedMedia: images.map((img) => ({
      '@type': 'ImageObject',
      contentUrl: `${CFG.SITE_URL}/${img.src}`,
      caption: img.caption
    }))
  };
}

function contactPage(page) {
  const url = `${CFG.SITE_URL}/${page.file}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${url}#webpage`,
    url,
    name: page.title,
    description: page.description,
    inLanguage: 'en-IN',
    isPartOf: { '@id': SITE_ID },
    mainEntity: { '@id': ORG_ID }
  };
}

module.exports = {
  ORG_ID, SITE_ID,
  organization, website, webPage, breadcrumbList, faqPage,
  offerCatalog, locationService, imageGallery, contactPage
};
