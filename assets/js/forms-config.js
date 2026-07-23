/*
 * Cafe Canna form endpoints — the single place to update once each
 * account-side integration is set up. Both forms work fine locally
 * even with the placeholder values below; they just won't actually
 * submit anywhere until you paste in real URLs.
 *
 *   waitlistSheetUrl    Google Apps Script Web App URL that appends a
 *                       row to the waitlist Google Sheet. See the
 *                       "Google Sheet setup" section in README.md for
 *                       how to create this — it ends in /exec.
 *
 *   contactFormEndpoint Formspree (or similar) form endpoint that
 *                       forwards the Location page contact form to
 *                       nnonnenmacher@cafecannaco.com. See the
 *                       "Contact form setup" section in README.md —
 *                       it looks like https://formspree.io/f/xxxxxxxx.
 */
var CAFE_CANNA_FORMS = {
  waitlistSheetUrl: 'https://script.google.com/macros/s/AKfycbzXv1aWxxmGBGILVR3tV64At9n8Auj1c9gtgQ2acLWwJgosLVrNaKZSs3BmcTpYQucT/exec',
  contactFormEndpoint: 'https://formspree.io/f/mykrnyza'
};
