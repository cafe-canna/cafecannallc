/* Cafe Canna — shared site behavior: nav toggle, countdown, form handling. */
(function () {
  'use strict';

  /* ---------------- Mobile nav toggle ---------------- */
  var navToggle = document.getElementById('nav-toggle');
  var mainNav = document.getElementById('main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------------- Launch countdown ---------------- */
  var countdownEl = document.getElementById('countdown');
  if (countdownEl) {
    var launchDate = new Date('2027-07-01T00:00:00-04:00').getTime();
    var daysEl = document.getElementById('cd-days');
    var hoursEl = document.getElementById('cd-hours');
    var minsEl = document.getElementById('cd-mins');
    var secsEl = document.getElementById('cd-secs');

    function tick() {
      var now = new Date().getTime();
      var diff = launchDate - now;

      if (diff <= 0) {
        daysEl.textContent = '0';
        hoursEl.textContent = '0';
        minsEl.textContent = '0';
        secsEl.textContent = '0';
        clearInterval(timer);
        return;
      }

      var days = Math.floor(diff / (1000 * 60 * 60 * 24));
      var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      var secs = Math.floor((diff % (1000 * 60)) / 1000);

      daysEl.textContent = String(days);
      hoursEl.textContent = String(hours);
      minsEl.textContent = String(mins);
      secsEl.textContent = String(secs);
    }

    tick();
    var timer = setInterval(tick, 1000);
  }

  /* ---------------- Waitlist / contact forms ----------------
   * Waitlist posts to a Google Apps Script Web App that appends a row to
   * a Google Sheet. Contact form posts to a Formspree endpoint that
   * forwards to nnonnenmacher@cafecannaco.com. Both endpoint URLs live in
   * assets/js/forms-config.js — see README.md for how to obtain them.
   * Until those are configured, submissions still show a success message
   * (so the site doesn't look broken to visitors) but aren't sent
   * anywhere — a console warning flags that during development.
   */
  var formEndpoints = (typeof CAFE_CANNA_FORMS !== 'undefined') ? CAFE_CANNA_FORMS : {};

  function isConfigured(url) {
    return !!url && url.indexOf('PASTE_YOUR_') !== 0;
  }

  function setSubmitting(form, submitting) {
    var btn = form.querySelector('button[type="submit"]');
    if (btn) btn.disabled = submitting;
  }

  function showStatus(status, message) {
    status.textContent = message;
    status.classList.add('is-visible');
  }

  // Apps Script Web Apps don't reliably send CORS headers back to read the
  // response, so this is a fire-and-forget POST: if the request itself
  // doesn't throw, we treat it as sent.
  (function wireWaitlistForm() {
    var form = document.getElementById('waitlist-form');
    var status = document.getElementById('waitlist-status');
    if (!form || !status) return;
    var successMessage = 'Thanks for joining the list — this only saves your email for future launch updates. It does not place an order or reserve any product.';

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      if (!isConfigured(formEndpoints.waitlistSheetUrl)) {
        console.warn('Waitlist form: CAFE_CANNA_FORMS.waitlistSheetUrl is not configured yet (see assets/js/forms-config.js) — this submission was not saved anywhere.');
        showStatus(status, successMessage);
        form.reset();
        return;
      }

      setSubmitting(form, true);
      fetch(formEndpoints.waitlistSheetUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: new FormData(form)
      })
        .then(function () {
          showStatus(status, successMessage);
          form.reset();
        })
        .catch(function () {
          showStatus(status, 'Something went wrong sending that — please try again in a moment.');
        })
        .finally(function () {
          setSubmitting(form, false);
        });
    });
  })();

  (function wireContactForm() {
    var form = document.getElementById('contact-form');
    var status = document.getElementById('contact-status');
    if (!form || !status) return;
    var unconfiguredMessage = 'Thanks for reaching out. This form is not yet connected to our team—once we’re closer to opening, messages sent here will reach us directly.';
    var sentMessage = "Thanks for reaching out — we'll get back to you soon.";

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      if (!isConfigured(formEndpoints.contactFormEndpoint)) {
        console.warn('Contact form: CAFE_CANNA_FORMS.contactFormEndpoint is not configured yet (see assets/js/forms-config.js) — this message was not sent anywhere.');
        showStatus(status, unconfiguredMessage);
        form.reset();
        return;
      }

      setSubmitting(form, true);
      fetch(formEndpoints.contactFormEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form)
      })
        .then(function (res) {
          if (!res.ok) throw new Error('Form submission failed');
          showStatus(status, sentMessage);
          form.reset();
        })
        .catch(function () {
          showStatus(status, 'Something went wrong sending that — please try again in a moment.');
        })
        .finally(function () {
          setSubmitting(form, false);
        });
    });
  })();
})();
