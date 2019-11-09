'use strict';

(function () {

  var trackFocus = function (elem) {
    elem.addEventListener('focus', function (evt) {
      evt.target.hasFocus = true;
    });
    elem.addEventListener('blur', function (evt) {
      evt.target.hasFocus = false;
    });
  };

  var showError = function (message) {
    var removeListener = function () {
      document.removeEventListener('mousedown', docMousedownHandler);
      document.removeEventListener('keydown', docKeydownHandler);
    };

    var removeErrorEl = function () {
      removeListener();
      errorEl.remove();
      errorEl = null;
    };

    var docKeydownHandler = function () {
      removeErrorEl();
    };

    var docMousedownHandler = function () {
      removeErrorEl();
    };

    var errorEl = document.createElement('p');
    errorEl.style.position = 'fixed';
    errorEl.style.zIndex = '25';
    errorEl.style.backgroundColor = 'red';
    errorEl.style.textAlign = 'center';
    errorEl.style.width = '100%';
    errorEl.style.top = '0';
    errorEl.textContent = message;

    document.addEventListener('mousedown', docMousedownHandler);
    document.addEventListener('keydown', docKeydownHandler);
    document.body.insertBefore(errorEl, document.body.childNodes[0]);
  };

  window.utils = {
    showError: showError,
    trackFocus: trackFocus
  };
})();
