/* ==========================================================================
   home.js — the only script the home page loads
   --------------------------------------------------------------------------
   Rules this file follows, because the brief was "loading time first":

   - No library, no polyfill, no external request. ~2 KB.
   - Loaded with `defer`, so it never blocks the first paint.
   - It only ADDS behaviour. Every piece of content is already in the HTML:
     with JS disabled or still downloading, the nav links work, the FAQ
     answers are readable and nothing is hidden behind a script.
   - No scroll-triggered animation and no layout reads in a scroll handler,
     so there is nothing here that can cause jank or shift the layout.
   ========================================================================== */

(function () {
  'use strict';

  var $  = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* ------------------------------------------------------------------------
     1. Header gets a border + shadow once the page has scrolled.
     IntersectionObserver on a sentinel, not a scroll listener — the browser
     does the work off the main thread.
     ---------------------------------------------------------------------- */
  var header = $('.header');
  var sentinel = $('#top-sentinel');

  if (header && sentinel && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      header.classList.toggle('is-stuck', !entries[0].isIntersecting);
    }).observe(sentinel);
  }

  /* ------------------------------------------------------------------------
     2. Mobile drawer
     ---------------------------------------------------------------------- */
  var trigger = $('.nav-trigger');
  var drawer  = $('#mobile-drawer');

  /* The page's scroll offset while the drawer is open. Locking the page with
     overflow:hidden can drop the scroll position (notably on iOS), so it is
     saved and restored explicitly rather than trusted to survive. */
  var savedScroll = 0;

  function setDrawer(open) {
    if (!trigger || !drawer) return;

    /* The drawer covers the whole viewport and sits above the header, so
       there is no header position to measure and nothing to keep in sync
       while the page scrolls. It carries its own close button instead. */
    if (open) savedScroll = window.scrollY || document.documentElement.scrollTop || 0;

    trigger.setAttribute('aria-expanded', String(open));
    trigger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    drawer.classList.toggle('is-open', open);
    document.documentElement.style.overflow = open ? 'hidden' : '';

    if (open) {
      var close = drawer.querySelector('[data-close-drawer]');
      if (close) close.focus();          /* keyboard order follows the screen */
    } else {
      window.scrollTo(0, savedScroll);
    }
  }

  if (trigger && drawer) {
    trigger.addEventListener('click', function () {
      setDrawer(trigger.getAttribute('aria-expanded') !== 'true');
    });

    drawer.addEventListener('click', function (e) {
      /* The close button just closes. Any real link closes the drawer and
         then lets the browser follow it normally. */
      if (e.target.closest('[data-close-drawer]')) {
        setDrawer(false);
        trigger.focus();
        return;
      }
      if (e.target.closest('a[href]')) setDrawer(false);
    });
  }

  /* ------------------------------------------------------------------------
     3. Expand/collapse groups — drawer sub-menus and FAQ items share one
     handler, because both are a button that owns the element after it.
     ---------------------------------------------------------------------- */
  $$('.drawer__link[aria-controls], .faq__q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));

      /* A FAQ button lives inside its <h3>, so it is not a sibling of the
         answer panel and CSS cannot reach the panel from the button. The
         open state therefore goes on the .faq__item wrapper. */
      var item = btn.closest('.faq__item');
      if (item) item.classList.toggle('is-open', !open);
    });
  });

  /* ------------------------------------------------------------------------
     4. Desktop "Locations" menu
     CSS already opens it on hover and on focus-within, so this exists only
     for keyboard and touch users who activate the button directly.
     ---------------------------------------------------------------------- */
  var navToggle = $('.nav__toggle');
  var navMenu   = navToggle && document.getElementById(navToggle.getAttribute('aria-controls'));

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var open = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!open));
      navMenu.classList.toggle('is-open', !open);
    });
  }

  /* ------------------------------------------------------------------------
     5. Escape closes whatever is open
     ---------------------------------------------------------------------- */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;

    if (drawer && drawer.classList.contains('is-open')) {
      setDrawer(false);
      trigger.focus();
    }
    if (navMenu && navMenu.classList.contains('is-open')) {
      navToggle.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('is-open');
      navToggle.focus();
    }
  });

  /* Clicking outside the desktop menu closes it. */
  document.addEventListener('click', function (e) {
    if (!navMenu || !navMenu.classList.contains('is-open')) return;
    if (e.target.closest('.nav__item')) return;
    navToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('is-open');
  });

  /* ------------------------------------------------------------------------
     6. Footer year. The HTML ships the build year, so this only corrects it
     after a year rolls over without a rebuild.
     ---------------------------------------------------------------------- */
  $$('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
}());

/* ==========================================================================
   theme.js — part 2: reveal, gallery filter, lightbox
   --------------------------------------------------------------------------
   All of this is additive. With JavaScript off: every section is visible,
   every gallery thumbnail is shown, and each thumbnail is a link to the full
   image rather than a dead button.
   ========================================================================== */
(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ------------------------------------------------------------------------
     7. Scroll reveal
     IntersectionObserver, not a scroll handler: the browser does the work off
     the main thread. Each element is unobserved once shown, so the observer
     empties itself instead of running for the life of the page.
     ---------------------------------------------------------------------- */
  var reveals = $$('[data-reveal]');
  if (reveals.length) {
    var reveal = function (el) { el.classList.add('is-in'); };

    /* CSS hides these once html.js is set, so anything that fails to be
       revealed is invisible to the visitor, not merely un-animated. Three
       layers guard against that:
         1. anything already on screen is shown immediately, so above-the-fold
            content never depends on the observer at all,
         2. the observer handles the rest as they scroll into view,
         3. a failsafe shows whatever is left after 4 seconds, so a blocked or
            misbehaving observer can never leave content permanently hidden. */
    var pending = reveals.filter(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < (window.innerHeight || 0) && r.bottom > 0) { reveal(el); return false; }
      return true;
    });

    if (!('IntersectionObserver' in window)) {
      pending.forEach(reveal);
    } else {
      var io = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          reveal(e.target);
          obs.unobserve(e.target);
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
      pending.forEach(function (el) { io.observe(el); });

      setTimeout(function () {
        reveals.forEach(function (el) {
          if (!el.classList.contains('is-in')) reveal(el);
        });
      }, 4000);
    }
  }

  /* ------------------------------------------------------------------------
     8. Gallery filter + lightbox
     ---------------------------------------------------------------------- */
  var gallery = $('#gallery');
  if (!gallery) return;

  var items = $$('.gallery__item', gallery);
  var countEl = $('#gallery-count');
  var filters = $$('.gfilter button');

  /* The set the lightbox arrows walk through — only what is on screen, so
     filtering to one category does not step through hidden images. */
  var visible = items.slice();

  function recount() {
    visible = items.filter(function (el) { return !el.hidden; });
    if (countEl) {
      countEl.textContent = visible.length === items.length
        ? 'Showing all ' + items.length + ' photographs'
        : 'Showing ' + visible.length + ' of ' + items.length + ' photographs';
    }
  }

  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var cat = btn.getAttribute('data-filter');
      filters.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
      items.forEach(function (el) {
        el.hidden = !(cat === 'all' || el.getAttribute('data-cat') === cat);
      });
      recount();
    });
  });
  recount();

  /* ---- lightbox ---------------------------------------------------------- */
  var box = $('#lightbox');
  if (!box) return;

  var boxImg = $('.lightbox__img', box);
  var boxCap = $('.lightbox__caption', box);
  var boxNum = $('.lightbox__count', box);
  var lastFocus = null;
  var index = 0;

  function show(i) {
    if (!visible.length) return;
    index = (i + visible.length) % visible.length;
    var el = visible[index];
    boxImg.src = el.getAttribute('data-full');
    boxImg.alt = el.getAttribute('data-alt') || '';
    boxImg.width = el.getAttribute('data-w') || '';
    boxImg.height = el.getAttribute('data-h') || '';
    boxCap.textContent = el.getAttribute('data-cap') || '';
    boxNum.textContent = (index + 1) + ' of ' + visible.length;
  }

  function open(el) {
    lastFocus = document.activeElement;
    show(visible.indexOf(el));
    box.classList.add('is-open');
    box.setAttribute('aria-hidden', 'false');
    document.documentElement.style.overflow = 'hidden';
    $('.lightbox__close', box).focus();
  }

  function close() {
    box.classList.remove('is-open');
    box.setAttribute('aria-hidden', 'true');
    document.documentElement.style.overflow = '';
    /* Release the image so a 56-photo browse does not hold every full-size
       file in memory. */
    boxImg.removeAttribute('src');
    if (lastFocus) lastFocus.focus();
  }

  gallery.addEventListener('click', function (e) {
    var el = e.target.closest('.gallery__item');
    if (!el) return;
    e.preventDefault();          /* each item is a real link without JS */
    open(el);
  });

  box.addEventListener('click', function (e) {
    if (e.target.closest('.lightbox__close')) return close();
    if (e.target.closest('.lightbox__prev')) return show(index - 1);
    if (e.target.closest('.lightbox__next')) return show(index + 1);
    /* Clicking the backdrop closes; clicking the photo itself does not. */
    if (!e.target.closest('.lightbox__figure')) close();
  });

  document.addEventListener('keydown', function (e) {
    if (!box.classList.contains('is-open')) return;
    if (e.key === 'Escape') { close(); }
    else if (e.key === 'ArrowLeft') { show(index - 1); }
    else if (e.key === 'ArrowRight') { show(index + 1); }
    else return;
    e.preventDefault();
  });
}());

/* ==========================================================================
   theme.js — part 3: the enquiry form
   --------------------------------------------------------------------------
   There is NO backend. The form validates what was typed and then tells the
   visitor to use WhatsApp or the phone instead. It never claims a message was
   sent, because nothing receives it — a false "thanks, we'll be in touch"
   costs the business the booking and the visitor the wait.

   To enable real submission: set FORM_ENDPOINT on window.SITE_CONFIG (or
   inline below) to a POST endpoint and this posts the form to it.
   ========================================================================== */
(function () {
  'use strict';

  var form = document.getElementById('enquiry-form');
  if (!form) return;

  var status = document.getElementById('form-status');
  var ENDPOINT = (window.SITE_CONFIG && window.SITE_CONFIG.FORM_ENDPOINT) || null;

  function setError(field, msg) {
    var err = document.getElementById(field.id + '-error');
    if (err) err.textContent = msg || '';
    if (msg) field.setAttribute('aria-invalid', 'true');
    else field.removeAttribute('aria-invalid');
    return !msg;
  }

  function validate() {
    var ok = true;
    var name = form.elements.name;
    var phone = form.elements.phone;
    var email = form.elements.email;
    var message = form.elements.message;

    ok = setError(name, name.value.trim() ? '' : 'Please tell us your name.') && ok;

    /* Deliberately loose: Indian mobile, landline with STD code and numbers
       typed with spaces or +91 all have to pass. Anything with at least eight
       digits is plausible enough to call back. */
    var digits = phone.value.replace(/\D/g, '');
    ok = setError(phone, digits.length >= 8 ? '' : 'Please give a phone number we can reach you on.') && ok;

    ok = setError(email,
      !email.value.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())
        ? '' : 'That email address does not look right.') && ok;

    ok = setError(message, message.value.trim().length >= 5 ? '' : 'Please add a short message.') && ok;
    return ok;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.className = 'form__status';

    /* Honeypot: only a bot fills a field no human can see. Fail silently so
       it cannot learn what gave it away. */
    if (form.elements.company && form.elements.company.value) return;

    if (!validate()) {
      status.textContent = 'Please check the highlighted fields.';
      status.classList.add('is-bad');
      status.focus();
      var bad = form.querySelector('[aria-invalid="true"]');
      if (bad) bad.focus();
      return;
    }

    /* No mail endpoint: hand the enquiry off to WhatsApp with everything the
       visitor typed already written into the message, so they only have to
       press send. This is the booking channel the business actually watches,
       and it beats a contact form that silently goes nowhere.

       window.open is called straight out of the submit handler, with no await
       in front of it, so the browser still treats it as a user gesture and
       does not block it. If it is blocked anyway, we navigate this tab
       instead and leave a manual link either way. */
    if (!ENDPOINT) {
      var number = (form.getAttribute('data-wa') || '').replace(/\D/g, '');
      if (!number) {
        status.textContent = 'Please message us on WhatsApp or call instead — this form has no mailbox behind it.';
        status.classList.add('is-bad');
        status.focus();
        return;
      }

      var lines = ['Hello, I would like to book a session.', ''];
      lines.push('Name: ' + form.elements.name.value.trim());
      lines.push('Phone: ' + form.elements.phone.value.trim());
      if (form.elements.email.value.trim()) lines.push('Email: ' + form.elements.email.value.trim());
      if (form.elements.service.value) lines.push('Treatment: ' + form.elements.service.value);
      lines.push('');
      lines.push(form.elements.message.value.trim());

      var url = 'https://wa.me/' + number + '?text=' + encodeURIComponent(lines.join('\n'));
      var win = window.open(url, '_blank', 'noopener');
      if (!win) window.location.href = url;

      status.innerHTML = 'Opening WhatsApp with your details filled in — just press send there. '
        + 'If nothing opened, <a href="' + url + '" rel="noopener" target="_blank">tap here</a>.';
      status.classList.add('is-ok');
      status.focus();
      return;
    }

    status.textContent = 'Sending…';
    fetch(ENDPOINT, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(form)
    }).then(function (r) {
      if (!r.ok) throw new Error('bad status');
      form.reset();
      status.textContent = 'Thank you — your enquiry has been sent. We will come back to you shortly.';
      status.classList.add('is-ok');
    }).catch(function () {
      status.textContent = 'That did not send. Please message us on WhatsApp or call instead.';
      status.classList.add('is-bad');
    }).then(function () { status.focus(); });
  });

  /* Clear a field's error as soon as the visitor starts fixing it. */
  ['name', 'phone', 'email', 'message'].forEach(function (n) {
    var f = form.elements[n];
    if (f) f.addEventListener('input', function () { setError(f, ''); });
  });
}());
