'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var URL_DATA = 'https://js.dump.academy/kekstagram/data';

  var trackFocus = function (elem) {
    elem.addEventListener('focus', function (evt) {
      evt.target.hasFocus = true;
    });
    elem.addEventListener('blur', function (evt) {
      evt.target.hasFocus = false;
    });
  };

  window.utils = {
    ESC_KEYCODE: ESC_KEYCODE,
    trackFocus: trackFocus,
    URL_DATA: URL_DATA
  };
})();
