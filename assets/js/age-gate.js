/*
 * Age verification gate.
 * A blocking overlay is present in the HTML of every page. An inline script
 * in <head> already hides it instantly for returning verified visitors by
 * checking the cookie before render. This file only wires up the "Yes" action;
 * the "No" action is a plain link to the restricted page, so it needs no JS.
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

  document.addEventListener('DOMContentLoaded', function () {
    var yesBtn = document.getElementById(YES_BUTTON_ID);
    if (yesBtn) {
      yesBtn.addEventListener('click', markVerified);
    }
  });
})();
