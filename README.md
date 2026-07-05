# Cafe Canna — Website

A static, pre-launch marketing website for Cafe Canna, a cannabis retail brand and paired cafe opening in Virginia. Built with plain HTML, CSS, and vanilla JavaScript — no frameworks, no build step. Deployable directly to GitHub Pages.

Retail sales are anticipated to begin **July 1, 2027**, pending licensing by the Virginia Cannabis Control Authority. This site is currently informational only: no e-commerce, ordering, or payment processing is implemented.

## Site structure

```
/index.html            Home
/about/                About (story, mission, team)
/products/              Product catalog preview ("Coming July 2027")
/cafe/                  Cafe atmosphere, hours, gallery
/education/             Blog-style educational articles
/location/              Address, hours, map placeholder, contact form
/coming-soon/           Email waitlist + launch countdown
/privacy/               Privacy Policy
/terms/                 Terms of Use
/restricted/            Age-gate denial page (shown when a visitor says "No")
/assets/css/style.css   Shared stylesheet
/assets/js/age-gate.js  Age verification logic
/assets/js/main.js      Nav toggle, countdown, form handling
```

Pages use folder + `index.html` so GitHub Pages serves clean URLs (e.g. `/privacy/`, `/coming-soon/`). All internal links are relative, so the site works whether it's hosted at the domain root or under a project subpath (`username.github.io/reponame/`).

## Legal/compliance elements implemented

- **Age verification gate** — Full-screen overlay on every page (`#age-gate-overlay` in each HTML file + `assets/js/age-gate.js`), styled to match site branding. Confirms the visitor is 21+.
  - "Yes" sets a **session-only** cookie (`age_verified=true`, no `max-age`) so the gate doesn't reappear on later pages during the same browser session, but does reappear on the next visit/new session.
  - "No" links to `/restricted/`, a neutral page explaining the 21+ restriction.
  - An inline script in `<head>` checks the cookie before render to avoid a flash of the overlay for already-verified visitors.
- **Privacy Policy** (`/privacy/`) — Covers the age-gate cookie, current lack of analytics/tracking, waitlist and contact-form data collection, and placeholder language for future email marketing.
- **Terms of Use** (`/terms/`) — Covers no medical claims, informational-only purpose, no current sale of products, Virginia governing law, and 21+ restriction.
- **Footer disclaimer** — Present on every page: age restriction, "not available for purchase," anticipated July 1, 2027 launch date pending VCCA licensing, and a no-medical-claims statement.
- **No medical claims** — All product, strain, and article copy uses sensory/cultural language (aroma, flavor, mood) and explicitly avoids therapeutic or health claims. The Education and Terms pages both state outright that nothing on the site is medical advice.
- **Coming Soon compliance note** (`/coming-soon/`) — States that submitting the waitlist form is not a purchase, order, or reservation, and restates the 21+ requirement.
- **`noindex`** on the restricted page so it isn't indexed as a landing page by search engines.

## Design

- Mobile-first responsive layout (single-column base styles, grid layouts from `640px`/`900px` breakpoints up).
- Shared header/nav and footer markup repeated across every page (no templating layer, since this is a build-tool-free static site).
- Dark theme with green accents plus a warm gold secondary accent; typography via Google Fonts (`Fraunces` for headings, `Inter` for body) — the only external dependency.
- Age gate, forms, countdown, and gallery/product placeholders are all built with plain CSS/JS, no external libraries.

## Before the July 2027 retail launch, revisit

- [ ] **Footer disclaimer wording** — update once retail sales actually begin (remove "not available for purchase" language, add ordering/payment terms as applicable).
- [ ] **Enable ordering/e-commerce** — this site intentionally has no cart, checkout, or payment integration. That will need its own build (and almost certainly a framework/platform decision) before launch.
- [ ] **Privacy Policy** — revisit if/when:
  - An email marketing platform is chosen for the waitlist (name the provider, add unsubscribe details).
  - Analytics is added (name the tool, describe data collected, add opt-out instructions, add a cookie-consent banner if the tool sets non-essential cookies).
  - Online ordering is introduced (payment data, account data, order history, etc.).
- [ ] **Terms of Use** — add e-commerce terms (returns/refunds where applicable, purchase limits, delivery/pickup policy) once retail launches.
- [ ] **Age gate** — confirm the session-cookie approach still satisfies legal review; consider whether a persistent (multi-day) cookie or ID-verification step is required once real transactions are involved.
- [ ] **Google Maps** — the Location page currently has a placeholder map block; swap in a real embed (with an API key managed outside source control) once the storefront address is final.
- [ ] **Real photography** — all gallery, product, and team images are CSS placeholder blocks; replace with licensed/owned photography.
- [ ] **Placeholder content** — team bios, address, phone/email, hours, strain names/descriptions, and mission statement are all placeholders and need real copy before launch.
- [ ] **Contact/waitlist forms** — currently client-side only with no backend; wire up to a real form/email service before relying on them operationally.
- [ ] **Effective dates** — Privacy Policy and Terms of Use both use a placeholder effective date; set real dates when publishing and again whenever the documents materially change.
- [ ] **Legal review** — this content was drafted to be thorough and cautious, but a licensed Virginia cannabis attorney should review all compliance copy before public launch.
