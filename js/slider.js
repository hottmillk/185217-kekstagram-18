'use strict';

(function () {

  var INIT_SPOT = true;

  var actionCallback;
  var effectLevel = document.querySelector('.effect-level');
  var effectPin = effectLevel.querySelector('.effect-level__pin');
  var effectLine = effectLevel.querySelector('.effect-level__line');
  var effectDepth = effectLevel.querySelector('.effect-level__depth');

  // вычисление положения ПИН к слайдеру
  var getRatio = function () {
    var effectLineRect = effectLine.getBoundingClientRect();
    var effectPinRect = effectPin.getBoundingClientRect();
    return ((effectPinRect.left - effectLineRect.left + effectPinRect.width / 2) / effectLineRect.width).toFixed(2);
  };

  // значение для перемещения pin
  var getPinMove = function () {
    var rect = {};
    rect.minX = 0;
    rect.maxX = effectLine.offsetWidth;
    return rect;
  };

  // Видимость слайдера
  var setVisibilitySlider = function (visible) {
    if (visible) {
      effectLevel.classList.remove('hidden');
    } else {
      effectLevel.classList.add('hidden');
    }
    movePin(INIT_SPOT);
  };

  var init = function (callback) {
    actionCallback = callback;
  };

  var clear = function () {
    movePin(INIT_SPOT);
  };

  // onMouse для слайдера
  var effectPinMouseHandler = function (evt) {
    var positionStart = {
      x: evt.clientX
    };

    var moveMouseHandler = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: positionStart.x - moveEvt.x
      };

      positionStart.x = moveEvt.x;
      movePin(shift.x);
    };

    var mouseUpHandler = function (mouseupEvt) {
      mouseupEvt.preventDefault();
      document.removeEventListener('mousemove', moveMouseHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };
    document.addEventListener('mousemove', moveMouseHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  // установка позиции pin
  var movePin = function (shiftX) {
    var movePinRect = getPinMove();
    var positionX = effectPin.offsetLeft - shiftX;
    if (typeof (shiftX) !== 'boolean') {
      if (positionX >= movePinRect.minX && positionX <= movePinRect.maxX) {
        effectPin.style.left = (effectPin.offsetLeft - shiftX) + 'px';
        effectDepth.style.width = effectPin.offsetLeft + 'px';
      }
    } else {
      effectPin.style.left = movePinRect.maxX + 'px';
      effectDepth.style.width = effectPin.offsetLeft + 'px';
    }
    if (typeof (actionCallback) === 'function') {
      actionCallback(getRatio());
    }
  };

  effectPin.addEventListener('mousedown', effectPinMouseHandler);

  window.slider = {
    setVisibilitySlider: setVisibilitySlider,
    init: init,
    clear: clear
  };
})();
