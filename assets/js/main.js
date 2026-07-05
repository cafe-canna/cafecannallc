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

  /* ---------------- Waitlist / contact forms ---------------- */
  // Client-side only for now — no backend is wired up yet. On launch, point
  // these forms at a real email service or form endpoint (see README).
  function wireForm(formId, statusId, message) {
    var form = document.getElementById(formId);
    var status = document.getElementById(statusId);
    if (!form || !status) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      status.textContent = message;
      status.classList.add('is-visible');
      form.reset();
    });
  }

  wireForm(
    'waitlist-form',
    'waitlist-status',
    'Thanks for joining the list — this only saves your email for future launch updates. It does not place an order or reserve any product.'
  );

  wireForm(
    'contact-form',
    'contact-status',
    'Thanks for reaching out. This form is not yet connected to our team—once we’re closer to opening, messages sent here will reach us directly.'
  );
})();
