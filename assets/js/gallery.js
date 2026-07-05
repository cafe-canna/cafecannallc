/*
 * Renders the Cafe page's photo carousel from assets/js/gallery-data.js
 * and wires up an expanded-photo modal, opened by clicking any slide.
 * Only runs on pages with #cafe-gallery.
 */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var carousel = document.getElementById('cafe-gallery');
    if (!carousel || typeof CAFE_CANNA_GALLERY === 'undefined') return;

    var track = carousel.querySelector('.carousel-track');
    var dotsWrap = carousel.querySelector('.carousel-dots');
    if (!track) return;

    function media(photo) {
      return photo.image
        ? `<img src="${photo.image}" alt="${photo.alt || photo.caption}">`
        : `<span>${photo.caption}</span>`;
    }

    track.innerHTML = CAFE_CANNA_GALLERY.map(function (photo) {
      return `
        <div class="carousel-slide">
          <button type="button" class="gallery-trigger" aria-label="View larger photo: ${photo.caption}">
            <div class="placeholder-img square">${media(photo)}</div>
          </button>
        </div>
      `;
    }).join('');

    if (dotsWrap) {
      dotsWrap.innerHTML = CAFE_CANNA_GALLERY.map(function (photo, i) {
        return `<button type="button" class="carousel-dot${i === 0 ? ' is-active' : ''}" aria-label="Go to photo ${i + 1}"></button>`;
      }).join('');
    }

    CafeCannaCarousel.init(carousel);

    var modalEl = document.createElement('div');
    modalEl.id = 'gallery-modal';
    modalEl.className = 'legal-modal';
    modalEl.setAttribute('aria-hidden', 'true');
    modalEl.innerHTML = `
      <div class="legal-modal-backdrop" data-gallery-close></div>
      <div class="legal-modal-panel gallery-modal-panel" role="dialog" aria-modal="true" aria-label="Gallery photo">
        <div class="legal-modal-header">
          <button type="button" class="legal-modal-close" data-gallery-close aria-label="Close">&times;</button>
        </div>
        <div id="gallery-modal-body" class="legal-modal-body"></div>
      </div>
    `;
    document.body.appendChild(modalEl);

    var modalBody = document.getElementById('gallery-modal-body');
    var modal = CafeCannaModal.init(modalEl, 'data-gallery-close');

    function openPhoto(photo) {
      modalBody.innerHTML = `
        <div class="placeholder-img wide gallery-modal-image">${media(photo)}</div>
        <h2>${photo.caption}</h2>
        <p>${photo.description}</p>
      `;
      modal.open();
    }

    Array.prototype.forEach.call(track.querySelectorAll('.gallery-trigger'), function (btn, i) {
      btn.addEventListener('click', function () { openPhoto(CAFE_CANNA_GALLERY[i]); });
    });
  });
})();
