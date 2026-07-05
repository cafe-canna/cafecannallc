/*
 * Age verification gate + legal quick-view modal.
 * A blocking overlay is present in the HTML of every page. An inline script
 * in <head> already hides it instantly for returning verified visitors by
 * checking the cookie before render. This file wires up the "Yes" action
 * (the "No" action is a plain link to the restricted page, so it needs no
 * JS) and the Privacy/Terms links in the age-gate fine print.
 *
 * Those links normally navigate to /privacy/ or /terms/ — but those pages
 * have the same age gate, so an unverified visitor would just hit another
 * wall instead of reading anything. Instead, this fetches the real page and
 * shows its <main> content in a modal layered on top of the age gate, using
 * the single source of truth (the actual privacy/terms pages) rather than
 * duplicating copy.
 */
(function () {
  var YES_BUTTON_ID = 'age-confirm-yes';
  var COOKIE_NAME = 'age_verified';

  function setVerifiedCookie() {
    // Session cookie (no max-age/expires): cleared when the browser closes,
    // matching the "don't re-ask during the same session" requirement.
    document.cookie = COOKIE_NAME + '=true; path=/; SameSite=Lax';
  }

  function markVerified() {
    setVerifiedCookie();
    document.documentElement.classList.add('age-verified');
    document.body.style.overflow = '';
  }

  function ensureLegalModal() {
    var existing = document.getElementById('legal-modal');
    if (existing) return existing;

    var wrap = document.createElement('div');
    wrap.id = 'legal-modal';
    wrap.className = 'legal-modal';
    wrap.setAttribute('aria-hidden', 'true');
    wrap.innerHTML = `
      <div class="legal-modal-backdrop" data-legal-close></div>
      <div class="legal-modal-panel" role="dialog" aria-modal="true" aria-label="Legal document">
        <div class="legal-modal-header">
          <button type="button" class="legal-modal-close" data-legal-close aria-label="Close">&times;</button>
        </div>
        <div id="legal-modal-body" class="legal-modal-body"></div>
      </div>
    `;
    document.body.appendChild(wrap);
    return wrap;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var yesBtn = document.getElementById(YES_BUTTON_ID);
    if (yesBtn) yesBtn.addEventListener('click', markVerified);

    var links = document.querySelectorAll('#age-gate-overlay .legal-link');
    if (!links.length) return; // no age gate on this page (e.g. restricted/)

    var modalBody;
    var modal = CafeCannaModal.init(ensureLegalModal(), 'data-legal-close');
    modalBody = document.getElementById('legal-modal-body');

    links.forEach(function (link) {
      link.addEventListener('click', function (e) {
        var url = link.getAttribute('href');
        var label = link.textContent;
        e.preventDefault();
        modalBody.innerHTML = '<p>Loading…</p>';
        modal.open();

        fetch(url)
          .then(function (res) {
            if (!res.ok) throw new Error('Failed to load ' + url);
            return res.text();
          })
          .then(function (html) {
            var doc = new DOMParser().parseFromString(html, 'text/html');
            var main = doc.querySelector('main');
            if (!main) throw new Error('No <main> found in ' + url);
            modalBody.innerHTML = main.innerHTML;
          })
          .catch(function () {
            // fetch() needs http(s) (e.g. GitHub Pages) — it can't read local
            // files over file://, and can also fail on a flaky connection.
            // Show an honest error with a manual link rather than silently
            // bouncing the visitor into another age gate on the target page.
            modalBody.innerHTML = `
              <p>Sorry, we couldn't load this here.</p>
              <p><a class="btn btn-primary" href="${url}">Open ${label} directly</a></p>
            `;
          });
      });
    });
  });
})();
