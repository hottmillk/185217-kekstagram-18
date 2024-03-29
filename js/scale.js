'use strict';

(function () {

  var MAX_VALUE_SCALE = 100;
  var MIN_VALUE_SCALE = 25;
  var STEP_SCALE = 25;

  var scaleEl;
  var previewElement;
  var scaleInput;

  // функия возвращает установленое значени масштаба для передачи
  var getScaleValue = function () {
    var scaleValue = Number(scaleInput.value.replace('%', ''));
    if (!scaleValue) {
      scaleValue = MAX_VALUE_SCALE;
      scaleInput.value = MAX_VALUE_SCALE + '%';
    }
    return scaleValue;
  };

  // Функция устанавливает масштаб для передачи
  var setScaleValue = function (value) {
    scaleInput.value = value + '%';
  };

  // Функция устанавливает маштабирование
  var setScale = function (value) {
    if (value < MIN_VALUE_SCALE || value > MAX_VALUE_SCALE) {
      return;
    }
    setScaleValue(value);
    previewElement.style.transform = 'scale(' + getScaleValue() / 100 + ')';
  };

  // функия обработчик для увелечиния
  var scaleBigHandler = function () {
    setScale(getScaleValue() + STEP_SCALE);
  };

  // функия обработчик для уменьшения
  var scaleSmallHandler = function () {
    setScale(getScaleValue() - STEP_SCALE);
  };

  // дефолт value
  var scaleDefault = function (value) {
    scaleInput.defaultValue = value + '%';
  };

  var initScale = function (element, preview) {
    scaleEl = element;
    previewElement = preview;
    scaleInput = scaleEl.querySelector('.scale__control--value');
    scaleEl.querySelector('.scale__control--bigger').addEventListener('click', scaleBigHandler);
    scaleEl.querySelector('.scale__control--smaller').addEventListener('click', scaleSmallHandler);
    scaleDefault(MAX_VALUE_SCALE);
    setScale(MAX_VALUE_SCALE);
  };

  var clearScale = function () {
    setScale(MAX_VALUE_SCALE);
  };


  window.scale = {
    initScale: initScale,
    clearScale: clearScale
  };
})();
