/*
 * Injects the shared hand-drawn "sketchy-edge" SVG filter used by
 * .placeholder-img, .brand-mark, and .age-gate-card (see style.css).
 * Defined once here instead of pasted into every page, so the wobble
 * recipe (seed/baseFrequency/scale) only needs editing in one place.
 *
 * Runs immediately (not on DOMContentLoaded) and is placed at the top
 * of <body> in each page so the filter exists before first paint.
 */
(function () {
  if (document.getElementById('sketchy-edge')) return;

  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '0');
  svg.setAttribute('height', '0');
  svg.setAttribute('style', 'position:absolute;overflow:hidden');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  svg.innerHTML =
    '<filter id="sketchy-edge" x="-15%" y="-15%" width="130%" height="130%">' +
      '<feTurbulence type="fractalNoise" baseFrequency="0.012 0.018" numOctaves="2" seed="7" result="noise"></feTurbulence>' +
      '<feDisplacementMap in="SourceGraphic" in2="noise" scale="7" xChannelSelector="R" yChannelSelector="G"></feDisplacementMap>' +
    '</filter>';

  document.body.insertBefore(svg, document.body.firstChild);
})();
