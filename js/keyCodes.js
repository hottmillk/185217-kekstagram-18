'use strict';

(function () {

  var keyCodes = {
    ESC: 27,
    LEFT_ARROW: 37,
    RIGHT_ARROW: 39
  };

  var pressEsc = function (evt) {
    return evt.keyCode === keyCodes.ESC;
  };

  var pressLeftArrow = function (evt) {
    return evt.keyCode === keyCodes.LEFT_ARROW;
  };

  var pressRightArrow = function (evt) {
    return evt.keyCode === keyCodes.RIGHT_ARROW;
  };


  window.keyCodes = {
    pressEsc: pressEsc,
    pressLeftArrow: pressLeftArrow,
    pressRightArrow: pressRightArrow
  };
})();
