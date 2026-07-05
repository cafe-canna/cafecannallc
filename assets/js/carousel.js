/*
 * Generic scroll-snap carousel controller. Works on any
 * <div class="carousel"> containing a .carousel-track of .carousel-slide
 * children, with optional .carousel-arrow-prev/-next buttons and
 * .carousel-dot indicators. The track does the actual scrolling (native
 * touch swipe, momentum, and snapping) — this just wires the arrow
 * buttons and keeps the dots in sync with the currently visible slide.
 */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.carousel').forEach(function (carousel) {
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

      if (prevBtn) {
        prevBtn.addEventListener('click', function () {
          track.scrollBy({ left: -slideStep(), behavior: 'smooth' });
        });
      }
      if (nextBtn) {
        nextBtn.addEventListener('click', function () {
          track.scrollBy({ left: slideStep(), behavior: 'smooth' });
        });
      }

      if (dots.length) {
        // Picks whichever slide's leading edge is closest to the track's
        // own leading edge — i.e. the "first" slide currently in view.
        // Simpler and more predictable than IntersectionObserver here: on
        // wide viewports several slides are visible at once, so
        // "isIntersecting" fires for more than one of them at once and
        // leaves an arbitrary dot active instead of the leading slide.
        function syncActiveDot() {
          var trackLeft = track.getBoundingClientRect().left;
          var closestIndex = 0;
          var closestDistance = Infinity;

          slides.forEach(function (slide, i) {
            var distance = Math.abs(slide.getBoundingClientRect().left - trackLeft);
            if (distance < closestDistance) {
              closestDistance = distance;
              closestIndex = i;
            }
          });

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
    });
  });
})();
