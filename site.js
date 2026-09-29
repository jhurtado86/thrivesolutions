/* ============================================================
   site.js — Thrive IV Solutions (shared by every page)

   1) PHONE TOKEN — the ONE place the site phone number is defined.
      Markup references it with data-phone (visible text) and
      data-phone-href (tel: links). The same number also appears as a
      static fallback in the HTML and in JSON-LD so crawlers and
      no-JS visitors see it. To move to a dedicated Thrive line:
        a) change the two values below, then
        b) grep the static fallbacks:  grep -rl "322-7662" --include=*.html .
      Do NOT publish an unconfirmed number. No sms: links until the
      client confirms the line receives texts (CLAUDE.md Phone rule).

   2) Tailwind theme.extend — maps class names onto /brand.css tokens.
      Loaded synchronously right after the Tailwind CDN script.

   3) Shared behaviors — header transparent→solid swap (~40px),
      mobile drawer, and ONE IntersectionObserver for every reveal
      (.reveal → .is-in; data-stagger children get ~80ms steps).
      Transform/opacity only; reduced motion respected.
   ============================================================ */
(function () {
  'use strict';

  /* Motion gate: the hidden pre-reveal state exists only under html.js,
     so content is fully visible with JavaScript off. */
  document.documentElement.classList.add('js');

  /* ---- 1) Phone token ---- */
  var PHONE = Object.freeze({
    display: '(956) 322-7662',
    e164: '+19563227662'
  });
  window.THRIVE = Object.freeze({ PHONE: PHONE });

  /* ---- 2) Tailwind theme (Play CDN reads window.tailwind.config) ---- */
  if (window.tailwind) {
    window.tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: { DEFAULT: 'var(--color-primary)', mid: 'var(--color-primary-mid)' },
            dark:    'var(--color-dark)',
            blue:    { DEFAULT: 'var(--color-blue)', bright: 'var(--color-blue-bright)' },
            accent:  { DEFAULT: 'var(--color-accent)', mid: 'var(--color-accent-mid)', deep: 'var(--color-accent-deep)', wash: 'var(--color-accent-wash)' },
            ink:     'var(--color-ink)',
            muted:   'var(--color-muted)',
            bg:      'var(--color-bg)',
            line:    { DEFAULT: 'var(--color-line)', dark: 'var(--color-line-dark)' }
          },
          fontFamily: {
            display: ['Fraunces', 'Iowan Old Style', 'Georgia', 'serif'],
            body:    ['DM Sans', 'system-ui', 'sans-serif']
          },
          fontSize: {
            body: ['1.125rem', { lineHeight: '1.65' }]
          },
          borderRadius: {
            sm: 'var(--radius-sm)', md: 'var(--radius-md)', lg: 'var(--radius-lg)', pill: 'var(--radius-pill)'
          },
          boxShadow: {
            base: 'var(--shadow-base)', elevated: 'var(--shadow-elevated)', floating: 'var(--shadow-floating)',
            cta: 'var(--shadow-cta)', 'on-dark': 'var(--shadow-on-dark)'
          },
          maxWidth: { wrap: 'var(--container)', narrow: 'var(--container-narrow)', measure: 'var(--measure)' },
          transitionTimingFunction: { spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)', out: 'cubic-bezier(0.22, 1, 0.36, 1)' },
          letterSpacing: { tight: '-0.02em', eyebrow: '0.14em' }
        }
      }
    };
  }

  /* ---- 3) Behaviors ---- */
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    /* Hydrate the phone token everywhere it is referenced. */
    document.querySelectorAll('[data-phone]').forEach(function (el) { el.textContent = PHONE.display; });
    document.querySelectorAll('[data-phone-href]').forEach(function (el) { el.setAttribute('href', 'tel:' + PHONE.e164); });

    /* Header: transparent over the hero, solid navy after ~40px of scroll. */
    var header = document.getElementById('site-header');
    if (header) {
      var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 40); };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    /* Mobile drawer. */
    var toggle = document.getElementById('nav-toggle');
    var drawer = document.getElementById('mobile-drawer');
    if (toggle && drawer) {
      var setOpen = function (open) {
        drawer.classList.toggle('is-open', open);
        if (header) header.classList.toggle('is-drawer-open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      };
      toggle.addEventListener('click', function () { setOpen(!drawer.classList.contains('is-open')); });
      drawer.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setOpen(false); }); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
      window.matchMedia('(min-width: 1024px)').addEventListener('change', function (e) { if (e.matches) setOpen(false); });
    }

    /* Reveals: one observer for every .reveal plus the hero background settle. */
    document.querySelectorAll('[data-stagger]').forEach(function (group) {
      group.querySelectorAll('.reveal').forEach(function (el, i) { el.style.setProperty('--delay', (i * 80) + 'ms'); });
    });
    var reveals = document.querySelectorAll('.reveal, .hero__bg');
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!('IntersectionObserver' in window) || reduce) {
      reveals.forEach(function (el) { el.classList.add('is-in'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { entry.target.classList.add('is-in'); io.unobserve(entry.target); }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' });
      reveals.forEach(function (el) { io.observe(el); });
    }
  });
})();
