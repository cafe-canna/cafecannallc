/*
 * Generic scroll-snap carousel controller. Works on any
 * <div class="carousel"> containing a .carousel-track of .carousel-slide
 * children, with optional .carousel-arrow-prev/-next buttons and
 * .carousel-dot indicators. The track does the actual scrolling (native
 * touch swipe, momentum, and snapping) — this just wires the arrow
 * buttons and keeps the dots in sync with the currently visible slide.
 *
 * Call CafeCannaCarousel.init(carouselEl) once the carousel's slides
 * exist in the DOM — for a carousel whose slides are rendered from data
 * (like the Cafe page gallery), that's after the data-driven script
 * builds them, not on page load.
 */
var CafeCannaCarousel = (function () {
  function init(carousel) {
    var track = carousel.querySelector('.carousel-track');
    var slides = Array.prototype.slice.call(carousel.querySelectorAll('.carousel-slide'));
    var dots = Array.prototype.slice.call(carousel.querySelectorAll('.carousel-dot'));
    var prevBtn = carousel.querySelector('.carousel-arrow-prev');
    var nextBtn = carousel.querySelector('.carousel-arrow-next');
    if (!track || !slides.length) return;

    function slideStep() {
      var trackStyle = getComputedStyle(track);
      var gap = parseFloat(trackStyle.columnGap || trackStyle.gap || '0') || 0;
      return slides[0].getBoundingClientRect().width + gap;
    }

    function atStart() { return track.scrollLeft <= 2; }
    function atEnd() { return track.scrollLeft + track.clientWidth >= track.scrollWidth - 2; }

    // When several slides are visible at once (wide viewports), there's
    // not always enough remaining content to scroll the last slide all
    // the way to the leading edge, so arrow-clicking can appear "stuck"
    // near the end. Loop back around instead of stopping.
    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        if (atStart()) {
          track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
        } else {
          track.scrollBy({ left: -slideStep(), behavior: 'smooth' });
        }
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        if (atEnd()) {
          track.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          track.scrollBy({ left: slideStep(), behavior: 'smooth' });
        }
      });
    }

    if (dots.length) {
      // Picks whichever slide's leading edge is closest to the track's
      // own leading edge — i.e. the "first" slide currently in view.
      // Simpler and more predictable than IntersectionObserver here: on
      // wide viewports several slides are visible at once, so
      // "isIntersecting" fires for more than one of them at once and
      // leaves an arbitrary dot active instead of the leading slide.
      //
      // At the very end of the track, clamp to the last dot explicitly:
      // with multiple slides visible at once there isn't always enough
      // remaining content for the last slide's leading edge to ever
      // reach the track's leading edge, so the leading-edge math alone
      // would leave an earlier dot active forever even once fully
      // scrolled to the end.
      function syncActiveDot() {
        var closestIndex;

        if (atEnd()) {
          closestIndex = slides.length - 1;
        } else {
          var trackLeft = track.getBoundingClientRect().left;
          var closestDistance = Infinity;
          closestIndex = 0;
          slides.forEach(function (slide, i) {
            var distance = Math.abs(slide.getBoundingClientRect().left - trackLeft);
            if (distance < closestDistance) {
              closestDistance = distance;
              closestIndex = i;
            }
          });
        }

        dots.forEach(function (dot, i) {
          dot.classList.toggle('is-active', i === closestIndex);
        });
      }

      var scrollTimer;
      track.addEventListener('scroll', function () {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(syncActiveDot, 100);
      });
      syncActiveDot();

      dots.forEach(function (dot, i) {
        dot.addEventListener('click', function () {
          slides[i].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
        });
      });
    }
  }

  return { init: init };
})();
