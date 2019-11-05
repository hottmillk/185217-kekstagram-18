'use strict';

(function () {

  var STEP_SLIDER = 3;

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
    return {
      minX: 0,
      maxX: effectLine.offsetWidth
    };
  };

  // Видимость слайдера
  var setVisibilitySlider = function (visible) {
    if (visible) {
      effectLevel.classList.remove('hidden');
    } else {
      effectLevel.classList.add('hidden');
    }
    movePin();
  };

  var initSlider = function (callback) {
    actionCallback = callback;
  };

  var clearSlider = function () {
    movePin();
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

  var effectPinKeydownHandler = function (downEvt) {
    if (window.keyCodes.pressLeftArrow(downEvt)) {
      movePin(STEP_SLIDER);
      return;
    }
    if (window.keyCodes.pressRightArrow(downEvt)) {
      movePin(-STEP_SLIDER);
      return;
    }
  };

  // установка позиции pin
  var movePin = function (shiftX) {
    var movePinRect = getPinMove();
    if (arguments.length > 0) {
      var positionX = effectPin.offsetLeft - shiftX;
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
  effectPin.addEventListener('keydown', effectPinKeydownHandler);

  window.slider = {
    setVisibilitySlider: setVisibilitySlider,
    initSlider: initSlider,
    clearSlider: clearSlider
  };
})();
