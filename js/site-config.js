/* ==========================================================================
   SITE CONFIG — SINGLE SOURCE OF TRUTH
   --------------------------------------------------------------------------
   Edit contact details, domain and social links HERE ONLY.

   How it is applied:
   1. The same values are also written directly into every .html file so that
      search engines and no-JS visitors see real content in the raw HTML
      (critical for SEO — never render primary content with JS).
   2. On load, main.js reads this file and syncs any element carrying a
      data-site="..." attribute, so a change here updates the live pages.
   3. To rewrite the values permanently into the HTML source, run:
         node tools/build.js
      The build reads THIS file directly, so the HTML (which crawlers read)
      and this config can never drift apart.
   ========================================================================== */

window.SITE_CONFIG = {
  /* ---- Deployment ------------------------------------------------------ */
  /* The live domain. ONE canonical format everywhere: https + non-www, no
     trailing slash. Make sure the host actually redirects http -> https and
     www -> non-www, or you will have four crawlable copies of every page. */
  SITE_URL: 'https://russianspamahipalpuraerocity.in',

  /* ---- Identity -------------------------------------------------------- */
  BUSINESS_NAME: 'Mayra Russian Spa',
  LEGAL_NAME: 'Mayra Russian Spa',
  TAGLINE: 'Authentic Russian Banya & Massage Therapy',

  /* ---- Contact --------------------------------------------------------- */
  /* EMAIL was supplied by the owner and is live.
     PHONE is still the number given at the start of the project — confirm it
     is the line that actually answers before launch, because the home page
     uses it for both the call and the WhatsApp buttons.                     */
  PHONE_DISPLAY: '+91 7492993476',
  PHONE_HREF: '+917492993476',
  EMAIL: 'mayrarussianspa@gmail.com',

  /* ---- Location -------------------------------------------------------- */
  /* Only the area/locality is published because no verified street address
     was available. Do NOT invent a street line or geo coordinates.          */
  LOCALITY: 'Mahipalpur',
  REGION: 'Delhi',
  POSTAL_CODE: '110037',
  COUNTRY: 'IN',
  ADDRESS_SHORT: 'Mahipalpur, New Delhi 110037',

  /* ---- Hours ----------------------------------------------------------- */
  HOURS_DISPLAY: 'Open 24 hours, 7 days a week',
  HOURS_SCHEMA: 'Mo-Su 00:00-23:59',

  /* ---- Social ---------------------------------------------------------- */
  /* TODO: no verified profile URL was supplied. Leave empty to hide the link
     site-wide; fill it in to show it. Never point at an account you do not
     own — a wrong link damages both trust and local SEO signals.            */
  FACEBOOK: '',
  INSTAGRAM: '',

  /* ---- Booking --------------------------------------------------------- */
  /* Digits only, with country code and no "+". Enabled on the owner's
     instruction, using the same number as PHONE_HREF.
     VERIFY before launch: send a test message to https://wa.me/917492993476.
     If that number has no WhatsApp account the link opens a dead chat, and
     the home page uses it as its primary call to action.                    */
  WHATSAPP: '917492993476',

  /* ---- Contact form ---------------------------------------------------- */
  /* The contact form has NO backend yet. While this is null the form
     validates input and then tells the visitor to call or email instead —
     it never claims a message was sent. Point it at a real endpoint
     (Formspree, Netlify Forms, your own API) to enable real submission.     */
  FORM_ENDPOINT: null
};
