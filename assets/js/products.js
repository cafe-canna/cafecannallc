/*
 * Renders the Products page strain grid and its detail modal from
 * assets/js/products-data.js. Only runs on pages with #strain-grid.
 */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var grid = document.getElementById('strain-grid');
    if (!grid || typeof CAFE_CANNA_PRODUCTS === 'undefined') return;

    function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

    function badgeList(items) {
      return items.map(function (t) { return `<span class="badge">${t}</span>`; }).join('');
    }

    function cardHTML(product) {
      var media = product.image
        ? `<img src="${product.image}" alt="${product.name}">`
        : '<span>Strain Photo — Placeholder</span>';

      return `
        <div class="strain-card" tabindex="0" role="button" aria-label="View full profile for ${product.name}">
          <div class="placeholder-img wide">${media}</div>
          <div class="strain-card-body">
            <span class="strain-type ${product.type}">${capitalize(product.type)}</span>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="strain-card-footer">
              <span class="coming-soon-tag">Coming July 2027</span>
              <span class="strain-card-cta">View Full Profile →</span>
            </div>
          </div>
        </div>
      `;
    }

    grid.innerHTML = CAFE_CANNA_PRODUCTS.map(cardHTML).join('');

    var modalEl = document.createElement('div');
    modalEl.id = 'product-modal';
    modalEl.className = 'legal-modal';
    modalEl.setAttribute('aria-hidden', 'true');
    modalEl.innerHTML = `
      <div class="legal-modal-backdrop" data-product-close></div>
      <div class="legal-modal-panel" role="dialog" aria-modal="true" aria-label="Product details">
        <div class="legal-modal-header">
          <button type="button" class="legal-modal-close" data-product-close aria-label="Close">&times;</button>
        </div>
        <div id="product-modal-body" class="legal-modal-body"></div>
      </div>
    `;
    document.body.appendChild(modalEl);

    var modalBody = document.getElementById('product-modal-body');
    var modal = CafeCannaModal.init(modalEl, 'data-product-close');

    function openProduct(product) {
      modalBody.innerHTML = `
        <span class="strain-type ${product.type}">${capitalize(product.type)}</span>
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <div class="product-modal-stats">
          <div><span class="product-modal-stat-label">THC</span><span class="product-modal-stat-value">${product.thc}</span></div>
          <div><span class="product-modal-stat-label">CBD</span><span class="product-modal-stat-value">${product.cbd}</span></div>
        </div>
        <p class="form-note mt-0">Estimated ranges shown for preview purposes only — final potency will be confirmed by independent lab testing before any product is offered for sale.</p>
        <h4>Dominant Terpenes</h4>
        <div class="badge-row">${badgeList(product.terpenes)}</div>
        <h4>Experience</h4>
        <div class="badge-row">${badgeList(product.effects)}</div>
        <div class="callout warning" style="margin-top:1.5rem;">
          <p class="mt-0"><strong>Coming July 2027.</strong> This product is not currently available for purchase. Details shown are a placeholder preview and subject to change ahead of Virginia Cannabis Control Authority licensing.</p>
        </div>
      `;
      modal.open();
    }

    Array.prototype.forEach.call(grid.children, function (card, i) {
      var product = CAFE_CANNA_PRODUCTS[i];
      card.addEventListener('click', function () { openProduct(product); });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openProduct(product);
        }
      });
    });
  });
})();
