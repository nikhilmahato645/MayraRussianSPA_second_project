/* ==========================================================================
   data.js — verified business facts
   --------------------------------------------------------------------------
   PROVENANCE: every value below was taken from the source website supplied
   for research (mahipalpurspacentre.com and its location pages) and then
   rewritten in original wording. Nothing here is invented.

   DELIBERATELY EXCLUDED after research, because it could not be verified
   independently and republishing it would amount to fabricated trust signals:
     - the star rating and review count shown on the source site
     - the named customer testimonials
     - "#1" / "only" / "best-rated" superlatives
     - the numbered health-benefit statistics (they are medical claims)
     - staff training provenance and named product brands
     - licensing and certification claims
     - the 90-minute banya+massage price, which the source states
       inconsistently on two different pages (₹4,000 vs ₹6,500). Rather than
       guess, that package is published as "on enquiry".
   ========================================================================== */

'use strict';

const SERVICES = [
  {
    slug: 'russian-banya',
    name: 'Traditional Russian Banya',
    duration: '60 min',
    price: 4000,
    img: 'assets/services-assets/service-russian-banya.jpg',
    w: 900, h: 600,
    alt: 'Wood-lined Russian banya steam room prepared for a session',
    short: 'Moist heat, birch venik work and a cold plunge, in the classic Eastern European sequence.',
    long: 'The banya is the centrepiece of Russian bathing culture and the treatment our room was built around. ' +
          'You move between a wood-lined steam room held at roughly 70–90°C with controlled humidity, a cold plunge, ' +
          'and a rest period with herbal tea. During the heat phase a therapist works over you with a venik — a bundle ' +
          'of birch leaves — using light rhythmic strokes that bring the heat to the skin and loosen the muscles beneath it. ' +
          'A full cycle runs about 60 minutes, and first-time guests are taken into the heat gradually.'
  },
  {
    slug: 'deep-tissue',
    name: 'Russian Deep Tissue Therapy',
    duration: '60 min',
    price: 3000,
    img: 'assets/services-assets/service-deep-tissue-massage.jpg',
    w: 900, h: 600,
    alt: 'Therapist applying firm forearm pressure along a guest’s back',
    short: 'Firm, sustained pressure with friction and percussion for muscle that has stopped letting go.',
    long: 'This is the treatment to book when a knot has outlasted a few nights of sleep. The Russian approach uses ' +
          'firm sustained pressure combined with friction and percussive movement, worked slowly through the muscle and ' +
          'the connective tissue around it. Your therapist will ask where the tension sits before starting and adjust ' +
          'pressure as they go — it should feel like deliberate, tolerable work, never like being endured.'
  },
  {
    slug: 'couples-retreat',
    name: 'Luxury Couples Retreat',
    duration: '120 min',
    price: 6000,
    priceNote: 'per couple',
    img: 'assets/services-assets/service-couples-retreat.jpg',
    w: 900, h: 600,
    alt: 'Private couples treatment suite with two massage beds side by side',
    short: 'Two therapists, two tables, one private suite — synchronised massage with aromatherapy.',
    long: 'A two-hour session for two people in a private suite, with a therapist for each guest working in parallel ' +
          'and aromatherapy oils through the massage. Because the suite has to be held for the full slot, this is the ' +
          'one treatment we ask you to book ahead rather than walk in for.'
  },
  {
    slug: 'aromatherapy',
    name: 'Signature Aromatherapy Massage',
    duration: '60 min',
    price: 2500,
    img: 'assets/services-assets/service-signature-aromatherapy.jpg',
    w: 900, h: 1350,
    alt: 'Essential oil bottles and a warmed towel set out beside a massage bed',
    short: 'Slow, flowing strokes carried on warmed essential oils, chosen with you at the start.',
    long: 'A gentler, slower treatment built around scent and long flowing strokes rather than deep pressure. ' +
          'You choose the oil blend with your therapist before the session begins. It is the most common first booking ' +
          'for guests who have never had a professional massage, and the usual choice at the end of a long travel day.'
  },
  {
    slug: 'swedish',
    name: 'Swedish Full Body Massage',
    duration: '60 min',
    price: 2500,
    img: 'assets/services-assets/service-swedish-massage.jpg',
    w: 900, h: 1350,
    alt: 'Guest receiving a full body Swedish massage on a draped treatment bed',
    short: 'The classic full-body sequence at medium pressure — the reliable, unfussy option.',
    long: 'A full-body treatment using the classic Swedish sequence of long gliding strokes, kneading and light ' +
          'percussion at medium pressure. It covers back, legs, arms, neck and shoulders in an hour and suits guests ' +
          'who want general relief rather than work on one specific problem area.'
  },
  {
    slug: 'thai-yoga',
    name: 'Thai Yoga Massage',
    duration: '90 min',
    price: 3500,
    img: 'assets/services-assets/service-thai-yoga-massage.jpg',
    w: 900, h: 1350,
    alt: 'Assisted stretch being applied during a Thai yoga massage on a floor mat',
    short: 'Acupressure and assisted stretching, on a mat, fully clothed. No oil.',
    long: 'Thai massage is done on a mat rather than a table, with you fully clothed in loose garments we provide. ' +
          'The therapist uses acupressure along the body’s lines and guides you through assisted stretches — closer ' +
          'to being moved through a yoga sequence than to a conventional massage. Ninety minutes is the standard length ' +
          'because the sequence needs the time to work through the whole body.'
  },
  {
    slug: 'abhyanga',
    name: 'Ayurvedic Abhyanga Massage',
    duration: '60 min',
    price: 2800,
    img: 'assets/services-assets/service-ayurvedic-abhyanga.jpg',
    w: 900, h: 1350,
    alt: 'Warm herbal oil being poured for an Ayurvedic Abhyanga treatment',
    short: 'Warm herbal oil worked in by two therapists moving in time with each other.',
    long: 'Abhyanga is the traditional Indian oil massage, delivered here by two therapists working in synchrony with ' +
          'warm herbal oil. The strokes follow the length of the limbs and the direction of the joints. Guests generally ' +
          'describe it as the most warming and the least clinical of the treatments on the menu.'
  },
  {
    slug: 'sports-recovery',
    name: 'Sports & Recovery Massage',
    duration: '60 min',
    price: 3000,
    img: 'assets/services-assets/service-sports-recovery.jpg',
    w: 900, h: 600,
    alt: 'Focused recovery massage being applied to a guest’s calf muscle',
    short: 'Recovery-focused deep work for training loads, long flights and heavy weeks.',
    long: 'A recovery-oriented deep tissue session aimed at the muscle groups that take the load — legs, hips, back ' +
          'and shoulders. It is the session most often booked after a heavy training block, a long-haul flight, or a ' +
          'week of too many hours at a desk. Tell your therapist what you have been doing and they will weight the ' +
          'session accordingly.'
  },
  {
    slug: 'express',
    name: 'Head, Neck & Shoulder Express',
    duration: '30 min',
    price: 1500,
    img: 'assets/services-assets/service-head-neck-shoulder.jpg',
    w: 900, h: 600,
    alt: 'Seated neck and shoulder massage during a thirty minute express session',
    short: 'Thirty focused minutes on the three places desk work and travel collect tension.',
    long: 'Half an hour concentrated entirely on the head, neck and shoulders. It is the session for a layover, a gap ' +
          'between meetings, or a stiff neck that needs attention now rather than at the weekend. No full undressing ' +
          'and no long recovery afterwards — you can go straight back out.'
  }
];

/* Published rate card. The all-day pass is listed separately because it is a
   package rather than a single treatment. */
const EXTRA_RATES = [
  {
    name: 'All-Day Wellness Pass',
    duration: 'Full day',
    price: 8000,
    note: 'Banya access, two massages and meals'
  },
  {
    name: 'Banya & Massage Package',
    duration: '90 min',
    price: null,
    note: 'Price on enquiry — please call to confirm'
  }
];

const MEMBERSHIPS = [
  { name: 'Silver',   price: 5000, includes: ['Two signature sessions each month', '10% off additional treatments'] },
  { name: 'Gold',     price: 9000, includes: ['Four signature sessions each month', 'One complimentary banya session', '20% off additional treatments'] },
  { name: 'Platinum', price: 15000, includes: ['Unlimited signature sessions', 'Two complimentary banya sessions', 'Priority booking'] }
];

/* Facilities and policies stated on the source site. */
const FACILITIES = [
  { icon: '✦', title: 'Private treatment rooms', body: 'Every treatment takes place in a private, temperature-controlled room. No shared floors and no cameras in treatment areas.' },
  { icon: '○', title: 'Cooling pool & lounge', body: 'The cold plunge that completes a banya cycle, plus a quiet relaxation lounge for the rest period afterwards.' },
  { icon: '✣', title: 'Imported birch venik', body: 'The birch-leaf bundles used in the banya are imported rather than substituted, because the leaf is what makes the ritual work.' },
  { icon: '◔', title: 'Open around the clock', body: 'Twenty-four hours a day, every day of the year — including public holidays, for guests on flight schedules and late shifts.' },
  { icon: '⚑', title: 'Everything provided', body: 'Fresh towels, robes and slippers, shower amenities and a locker for your belongings. Bring yourself and nothing else.' },
  { icon: '⚖', title: 'Your choice of therapist', body: 'We have both male and female therapists on shift, and you can state a preference when you book or when you arrive.' }
];

const PAYMENTS = 'Cash, debit and credit cards, UPI (Google Pay, PhonePe, Paytm) and international cards.';

module.exports = { SERVICES, EXTRA_RATES, MEMBERSHIPS, FACILITIES, PAYMENTS };
