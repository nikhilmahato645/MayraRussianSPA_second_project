/* ==========================================================================
   MAYRA RUSSIAN SPA — main.js
   Vanilla JS only. Loaded with `defer`, so it never blocks rendering.

   Design rules followed here:
   - No page CONTENT is created by JS. Everything a crawler needs is already
     in the HTML; this file only enhances presentation and interaction.
   - No innerHTML with dynamic values (textContent / createElement only).
   - Every animation degrades to "visible, no motion" when the visitor has
     prefers-reduced-motion set, or when IntersectionObserver is missing.

   CONTENTS
   01. Helpers
   02. Config sync
   03. Header state
   04. Mobile drawer
   05. Desktop dropdown
   06. Scroll reveal
   07. Split text / blur text
   08. Count up
   09. Pointer effects (magnetic, spotlight, tilt, spark)
   10. FAQ accordion
   11. Gallery lightbox
   12. Contact form
   13. Sticky call bar
   14. Footer year
   ========================================================================== */

(function () {
  'use strict';

  /* ======================================================================
     01. HELPERS
     ====================================================================== */
  var $  = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  };

  var reduceMotion = window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  var supportsIO = 'IntersectionObserver' in window;

  /* Elements that can hold focus inside a trapped region */
  var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]),' +
                  'select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  function trapFocus(container, event) {
    var items = $$(FOCUSABLE, container).filter(function (el) {
      return el.offsetParent !== null;
    });
    if (!items.length) return;

    var first = items[0];
    var last  = items[items.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  /* rAF-throttled listener, so scroll/pointer handlers stay off the main
     thread's critical path (protects INP). */
  function throttled(fn) {
    var ticking = false;
    return function () {
      var args = arguments, self = this;
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        fn.apply(self, args);
        ticking = false;
      });
    };
  }

  /* ======================================================================
     02. CONFIG SYNC
     Keeps the HTML (which crawlers read) in step with js/site-config.js
     (which humans edit). The HTML already contains the correct values, so
     this is a safety net, not the source of the content.
     ====================================================================== */
  function applyConfig() {
    var cfg = window.SITE_CONFIG;
    if (!cfg) return;

    $$('[data-site]').forEach(function (el) {
      var key = el.getAttribute('data-site');

      switch (key) {
        case 'phone':
          el.textContent = cfg.PHONE_DISPLAY;
          break;
        case 'phone-link':
          el.setAttribute('href', 'tel:' + cfg.PHONE_HREF);
          break;
        case 'email':
          el.textContent = cfg.EMAIL;
          break;
        case 'email-link':
          el.setAttribute('href', 'mailto:' + cfg.EMAIL);
          break;
        case 'address':
          el.textContent = cfg.ADDRESS_SHORT;
          break;
        case 'hours':
          el.textContent = cfg.HOURS_DISPLAY;
          break;
        case 'business':
          el.textContent = cfg.BUSINESS_NAME;
          break;
        default:
          break;
      }
    });

    /* Social links are hidden unless a verified URL has been supplied —
       never publish a link to a profile the business does not own. */
    $$('[data-social]').forEach(function (el) {
      var url = cfg[el.getAttribute('data-social').toUpperCase()];
      if (url) {
        el.setAttribute('href', url);
        el.hidden = false;
      } else {
        el.hidden = true;
      }
    });
  }

  /* ======================================================================
     03. HEADER STATE
     ====================================================================== */
  function initHeader() {
    var header = $('.header');
    if (!header) return;

    var onScroll = throttled(function () {
      header.classList.toggle('is-stuck', window.scrollY > 8);
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ======================================================================
     04. MOBILE DRAWER
     ====================================================================== */
  function initDrawer() {
    var trigger = $('.nav-trigger');
    var drawer  = $('#mobile-drawer');
    if (!trigger || !drawer) return;

    function setOpen(open) {
      trigger.setAttribute('aria-expanded', String(open));
      drawer.classList.toggle('is-open', open);
      document.body.classList.toggle('is-nav-open', open);
      trigger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');

      if (open) {
        var firstLink = $(FOCUSABLE, drawer);
        if (firstLink) firstLink.focus();
      }
    }

    trigger.addEventListener('click', function () {
      setOpen(trigger.getAttribute('aria-expanded') !== 'true');
    });

    /* Collapsible "Locations" group inside the drawer */
    $$('.drawer__group > [aria-expanded]', drawer).forEach(function (btn) {
      btn.addEventListener('click', function () {
        btn.setAttribute('aria-expanded',
          btn.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
      });
    });

    /* Close on navigation */
    $$('a', drawer).forEach(function (link) {
      link.addEventListener('click', function () { setOpen(false); });
    });

    document.addEventListener('keydown', function (e) {
      if (!drawer.classList.contains('is-open')) return;

      if (e.key === 'Escape') {
        setOpen(false);
        trigger.focus();
      } else if (e.key === 'Tab') {
        trapFocus(drawer, e);
      }
    });

    /* A resize into desktop layout must not leave the drawer stuck open */
    window.addEventListener('resize', throttled(function () {
      if (window.innerWidth >= 1024 && drawer.classList.contains('is-open')) {
        setOpen(false);
      }
    }), { passive: true });
  }

  /* ======================================================================
     05. DESKTOP DROPDOWN
     ====================================================================== */
  function initDropdown() {
    var wrappers = $$('.nav__item--has-menu');
    if (!wrappers.length) return;

    wrappers.forEach(function (wrap) {
      var toggle = $('.nav__toggle', wrap);
      var menu   = $('.nav__menu', wrap);
      if (!toggle || !menu) return;

      var closeTimer;

      function setOpen(open) {
        toggle.setAttribute('aria-expanded', String(open));
      }

      toggle.addEventListener('click', function (e) {
        e.preventDefault();
        setOpen(toggle.getAttribute('aria-expanded') !== 'true');
      });

      /* Hover opens it, with a small grace period so the pointer can travel
         from the trigger down to the menu without it snapping shut. */
      wrap.addEventListener('mouseenter', function () {
        window.clearTimeout(closeTimer);
        setOpen(true);
      });
      wrap.addEventListener('mouseleave', function () {
        closeTimer = window.setTimeout(function () { setOpen(false); }, 180);
      });

      /* Keyboard: Down opens and moves into the list */
      toggle.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setOpen(true);
          var first = $('a', menu);
          if (first) first.focus();
        }
      });

      menu.addEventListener('keydown', function (e) {
        var links = $$('a', menu);
        var i = links.indexOf(document.activeElement);

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          links[(i + 1) % links.length].focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          links[(i - 1 + links.length) % links.length].focus();
        } else if (e.key === 'Escape') {
          setOpen(false);
          toggle.focus();
        }
      });

      /* Close when focus or a click leaves the component */
      document.addEventListener('click', function (e) {
        if (!wrap.contains(e.target)) setOpen(false);
      });
      wrap.addEventListener('focusout', function () {
        window.setTimeout(function () {
          if (!wrap.contains(document.activeElement)) setOpen(false);
        }, 0);
      });
    });
  }

  /* ======================================================================
     06. SCROLL REVEAL  (React Bits "Animated Content")
     ====================================================================== */
  function initReveal() {
    var items = $$('[data-reveal]');
    if (!items.length) return;

    if (reduceMotion || !supportsIO) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    items.forEach(function (el) {
      /* data-reveal-delay="120" staggers siblings */
      var delay = el.getAttribute('data-reveal-delay');
      if (delay) el.style.setProperty('--reveal-delay', delay + 'ms');
      io.observe(el);
    });
  }

  /* ======================================================================
     07. SPLIT TEXT / BLUR TEXT  (React Bits "Split Text" & "Blur Text")
     The source text stays in the HTML; we only wrap it for animation and
     hand screen readers the intact string via aria-label.
     ====================================================================== */
  function splitInto(el, mode) {
    var text = el.textContent;
    var frag = document.createDocumentFragment();
    var units = mode === 'word' ? text.split(/(\s+)/) : text.split('');
    var step = mode === 'word' ? 70 : 22;
    var index = 0;

    units.forEach(function (unit) {
      if (/^\s+$/.test(unit)) {
        /* Keep real whitespace as text so words never run together */
        frag.appendChild(document.createTextNode(unit));
        return;
      }

      var span = document.createElement('span');
      span.className = mode === 'word' ? 'word' : 'char';
      span.textContent = unit;
      span.style.setProperty(
        mode === 'word' ? '--word-delay' : '--char-delay',
        (index * step) + 'ms'
      );
      index++;
      frag.appendChild(span);
    });

    /* Screen readers read the label, not the pile of spans */
    el.setAttribute('aria-label', text.trim());
    el.textContent = '';
    el.appendChild(frag);

    $$('.char, .word', el).forEach(function (s) {
      s.setAttribute('aria-hidden', 'true');
    });
  }

  function initTextEffects() {
    var nodes = $$('.split-text, .blur-text');
    if (!nodes.length) return;

    if (reduceMotion || !supportsIO) {
      nodes.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    nodes.forEach(function (el) {
      splitInto(el, el.classList.contains('blur-text') ? 'word' : 'char');
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.25 });

    nodes.forEach(function (el) { io.observe(el); });
  }

  /* ======================================================================
     08. COUNT UP  (React Bits "Count Up")
     ====================================================================== */
  function initCountUp() {
    var counters = $$('.count-up');
    if (!counters.length) return;

    function run(el) {
      var target = parseFloat(el.getAttribute('data-count'));
      if (isNaN(target)) return;

      var suffix = el.getAttribute('data-suffix') || '';
      var prefix = el.getAttribute('data-prefix') || '';
      var dur = 1500;
      var start = null;

      function frame(ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);          /* easeOutCubic */
        el.textContent = prefix + Math.round(target * eased) + suffix;
        if (p < 1) window.requestAnimationFrame(frame);
      }

      window.requestAnimationFrame(frame);
    }

    if (reduceMotion || !supportsIO) {
      counters.forEach(function (el) {
        el.textContent = (el.getAttribute('data-prefix') || '') +
                         el.getAttribute('data-count') +
                         (el.getAttribute('data-suffix') || '');
      });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        run(entry.target);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) { io.observe(el); });
  }

  /* ======================================================================
     09. POINTER EFFECTS
     All of these are decorative and are skipped entirely on touch devices
     and under reduced-motion.
     ====================================================================== */
  function initPointerEffects() {
    var fine = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    /* -- Spotlight: track the cursor inside a card ---------------------- */
    $$('.spotlight').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        el.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });

    if (!fine || reduceMotion) return;

    /* -- Magnetic buttons ------------------------------------------------ */
    $$('.magnetic').forEach(function (el) {
      var strength = parseFloat(el.getAttribute('data-magnet')) || 0.28;

      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var x = e.clientX - (r.left + r.width / 2);
        var y = e.clientY - (r.top + r.height / 2);
        el.style.setProperty('--tx', (x * strength).toFixed(2) + 'px');
        el.style.setProperty('--ty', (y * strength).toFixed(2) + 'px');
      });

      el.addEventListener('pointerleave', function () {
        el.style.setProperty('--tx', '0px');
        el.style.setProperty('--ty', '0px');
      });
    });

    /* -- Tilted cards ---------------------------------------------------- */
    $$('.tilt').forEach(function (el) {
      var max = parseFloat(el.getAttribute('data-tilt')) || 6;

      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty('--ry', (px * max).toFixed(2) + 'deg');
        el.style.setProperty('--rx', (-py * max).toFixed(2) + 'deg');
      });

      el.addEventListener('pointerleave', function () {
        el.style.setProperty('--rx', '0deg');
        el.style.setProperty('--ry', '0deg');
      });
    });

    /* -- Click spark ----------------------------------------------------- */
    $$('[data-spark]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        for (var i = 0; i < 8; i++) {
          var s = document.createElement('span');
          var angle = (Math.PI * 2 * i) / 8;
          var dist = 26 + Math.random() * 22;

          s.className = 'spark';
          s.style.left = e.clientX + 'px';
          s.style.top = e.clientY + 'px';
          s.style.setProperty('--sx', Math.cos(angle) * dist + 'px');
          s.style.setProperty('--sy', Math.sin(angle) * dist + 'px');

          document.body.appendChild(s);
          window.setTimeout(function (node) {
            return function () { node.remove(); };
          }(s), 560);
        }
      });
    });
  }

  /* ======================================================================
     10. FAQ ACCORDION
     Answers live in the HTML and stay in the DOM when collapsed, so FAQ
     content remains crawlable and matches the FAQPage structured data.
     ====================================================================== */
  function initFaq() {
    $$('.faq__q').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var open = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!open));
      });
    });
  }

  /* ======================================================================
     11. GALLERY LIGHTBOX
     ====================================================================== */
  function initLightbox() {
    var box = $('#lightbox');
    var triggers = $$('.gallery__item');
    if (!box || !triggers.length) return;

    var imgEl   = $('.lightbox__img', box);
    var capEl   = $('.lightbox__caption', box);
    var countEl = $('.lightbox__count', box);
    var closeBtn = $('.lightbox__close', box);
    var prevBtn  = $('.lightbox__prev', box);
    var nextBtn  = $('.lightbox__next', box);

    var current = 0;
    var lastFocused = null;

    function show(i) {
      current = (i + triggers.length) % triggers.length;

      var source = $('img', triggers[current]);
      var caption = $('figcaption', triggers[current]);
      if (!source) return;

      /* Full-size file lives on data-full; fall back to the grid image */
      imgEl.setAttribute('src', source.getAttribute('data-full') || source.src);
      imgEl.setAttribute('alt', source.alt);
      imgEl.setAttribute('width', source.getAttribute('width') || '');
      imgEl.setAttribute('height', source.getAttribute('height') || '');

      capEl.textContent = caption ? caption.textContent : source.alt;
      countEl.textContent = (current + 1) + ' of ' + triggers.length;
    }

    function open(i) {
      lastFocused = document.activeElement;
      show(i);
      box.classList.add('is-open');
      box.removeAttribute('aria-hidden');
      document.body.classList.add('is-nav-open');
      closeBtn.focus();
    }

    function close() {
      box.classList.remove('is-open');
      box.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('is-nav-open');
      /* Return focus to the thumbnail the visitor came from */
      if (lastFocused) lastFocused.focus();
    }

    triggers.forEach(function (btn, i) {
      btn.addEventListener('click', function () { open(i); });
    });

    closeBtn.addEventListener('click', close);
    prevBtn.addEventListener('click', function () { show(current - 1); });
    nextBtn.addEventListener('click', function () { show(current + 1); });

    /* Click the backdrop (but not the figure) to dismiss */
    box.addEventListener('click', function (e) {
      if (e.target === box) close();
    });

    document.addEventListener('keydown', function (e) {
      if (!box.classList.contains('is-open')) return;

      if (e.key === 'Escape') {
        close();
      } else if (e.key === 'ArrowRight') {
        show(current + 1);
      } else if (e.key === 'ArrowLeft') {
        show(current - 1);
      } else if (e.key === 'Tab') {
        trapFocus(box, e);
      }
    });
  }

  /* ======================================================================
     12. CONTACT FORM
     There is no backend wired up yet, so the form NEVER claims a message was
     sent. It validates, then directs the visitor to phone or email. Set
     SITE_CONFIG.FORM_ENDPOINT to enable real submission.
     ====================================================================== */
  function initForm() {
    var form = $('#enquiry-form');
    if (!form) return;

    var status = $('#form-status', form);

    var RULES = {
      name:    { test: function (v) { return v.trim().length >= 2; },
                 msg: 'Please enter your name.' },
      phone:   { test: function (v) { return /^[+\d][\d\s\-()]{7,19}$/.test(v.trim()); },
                 msg: 'Please enter a valid phone number.' },
      email:   { test: function (v) { return v.trim() === '' || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); },
                 msg: 'Please enter a valid email address, or leave this blank.' },
      message: { test: function (v) { return v.trim().length >= 10; },
                 msg: 'Please tell us a little more (at least 10 characters).' }
    };

    function validateField(field) {
      var rule = RULES[field.name];
      if (!rule) return true;

      var errorEl = $('#' + field.id + '-error');
      var ok = rule.test(field.value);

      field.setAttribute('aria-invalid', String(!ok));
      if (errorEl) errorEl.textContent = ok ? '' : rule.msg;
      return ok;
    }

    /* Validate on blur, then live-correct once the field has been touched */
    $$('input, textarea, select', form).forEach(function (field) {
      if (!RULES[field.name]) return;

      field.addEventListener('blur', function () { validateField(field); });
      field.addEventListener('input', function () {
        if (field.getAttribute('aria-invalid') === 'true') validateField(field);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      /* Honeypot: a real person never fills this hidden field */
      var trap = form.elements.company;
      if (trap && trap.value) return;

      var firstBad = null;
      $$('input, textarea, select', form).forEach(function (field) {
        if (!RULES[field.name]) return;
        if (!validateField(field) && !firstBad) firstBad = field;
      });

      if (firstBad) {
        status.className = 'form__status is-shown is-error';
        status.textContent = 'Please correct the highlighted fields and try again.';
        firstBad.focus();
        return;
      }

      var endpoint = window.SITE_CONFIG && window.SITE_CONFIG.FORM_ENDPOINT;

      if (!endpoint) {
        /* Honest fallback — we do not pretend the enquiry was delivered. */
        var cfg = window.SITE_CONFIG || {};
        status.className = 'form__status is-shown is-info';
        status.textContent =
          'This form is not connected to a mail service yet, so your message ' +
          'has not been sent. Please call ' + (cfg.PHONE_DISPLAY || '') +
          ' or email ' + (cfg.EMAIL || '') + ' and we will respond directly.';
        status.focus();
        return;
      }

      var btn = $('button[type="submit"]', form);
      btn.disabled = true;
      btn.textContent = 'Sending…';

      fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form)
      }).then(function (res) {
        if (!res.ok) throw new Error('Request failed');
        status.className = 'form__status is-shown is-info';
        status.textContent = 'Thank you — your enquiry has been received. We will be in touch shortly.';
        form.reset();
      }).catch(function () {
        var cfg = window.SITE_CONFIG || {};
        status.className = 'form__status is-shown is-error';
        status.textContent =
          'Sorry, your enquiry could not be sent. Please call ' +
          (cfg.PHONE_DISPLAY || '') + ' instead.';
      }).finally(function () {
        btn.disabled = false;
        btn.textContent = 'Send enquiry';
      });
    });
  }

  /* ======================================================================
     13. STICKY CALL BAR  (mobile only)
     ====================================================================== */
  function initCallBar() {
    var bar = $('.call-bar');
    if (!bar) return;

    var onScroll = throttled(function () {
      bar.classList.toggle('is-shown', window.scrollY > 420);
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ======================================================================
     14. FOOTER YEAR
     ====================================================================== */
  function initYear() {
    $$('[data-year]').forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });
  }

  /* ======================================================================
     BOOT
     ====================================================================== */
  function boot() {
    applyConfig();
    initHeader();
    initDrawer();
    initDropdown();
    initReveal();
    initTextEffects();
    initCountUp();
    initPointerEffects();
    initFaq();
    initLightbox();
    initForm();
    initCallBar();
    initYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
