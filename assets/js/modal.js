/*
 * Generic modal controller shared by the legal quick-view modal
 * (age-gate.js) and the product detail modal (products.js), so
 * open/close/backdrop-click/Escape-key behavior lives in one place
 * instead of being re-implemented per modal.
 */
var CafeCannaModal = (function () {
  var openModals = [];

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    openModals.slice().forEach(function (m) { m.close(); });
  });

  function init(modalEl, closeAttr) {
    if (!modalEl) return null;

    var instance = {
      el: modalEl,
      open: function () {
        modalEl.classList.add('is-open');
        modalEl.setAttribute('aria-hidden', 'false');
        if (openModals.indexOf(instance) === -1) openModals.push(instance);
      },
      close: function () {
        modalEl.classList.remove('is-open');
        modalEl.setAttribute('aria-hidden', 'true');
        var i = openModals.indexOf(instance);
        if (i !== -1) openModals.splice(i, 1);
      }
    };

    modalEl.querySelectorAll('[' + closeAttr + ']').forEach(function (el) {
      el.addEventListener('click', instance.close);
    });

    return instance;
  }

  return { init: init };
})();
