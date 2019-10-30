'use strict';

(function () {

  var MAX_BRIGHTNESS = 3;
  var MIN_BRIGHTNESS = 1;
  var MIN_VALUE_BLUR = 0;
  var MAX_VALUE_BLUR = 3;

  var EFFECT_HEAT = 'heat';
  var EFFECT_CHROME = 'chrome';
  var EFFECT_SEPIA = 'sepia';
  var EFFECT_MARVIN = 'marvin';
  var EFFECT_PHOBOS = 'phobos';
  var ORIGINAL_PIC = 'none';

  var effectElement;
  var radioElements;
  var previewElement;
  var currentEffect;


  // Значение фильтра для передачи
  var setEffectValue = function (value) {
    effectElement.querySelector('.effect-level__value').value = value;
  };

  // Установка "ХРОМ"
  var setChrome = function (ratio) {
    previewElement.classList.add('effects__preview--chrome');
    setEffectValue(ratio);
    previewElement.style.filter = 'grayscale(' + ratio + ')';
    currentEffect = EFFECT_CHROME;
  };

  // Установка "СЕПИЯ"
  var setSepia = function (ratio) {
    previewElement.classList.add('effects__preview--sepia');
    setEffectValue(ratio);
    previewElement.style.filter = 'sepia(' + ratio + ')';
    currentEffect = EFFECT_SEPIA;
  };

  // Установка "ФОБОС"
  var setPhobos = function (ratio) {
    previewElement.classList.add('effects__preview--phobos');
    var value = (MIN_VALUE_BLUR + ratio * (MAX_VALUE_BLUR - MIN_VALUE_BLUR)).toFixed(2);
    setEffectValue(value);
    previewElement.style.filter = 'blur(' + value + 'px)';
    currentEffect = EFFECT_PHOBOS;
  };

  // Установка "МАРВИН"
  var setMarvin = function (ratio) {
    previewElement.classList.add('effects__preview--marvin');
    setEffectValue(ratio);
    previewElement.style.filter = 'invert(' + ratio + ')';
    currentEffect = EFFECT_MARVIN;
  };

  // Установка "ЗНОЙ"
  var setBrightness = function (ratio) {
    previewElement.classList.add('effects__preview--heat');
    var value = (MIN_BRIGHTNESS + ratio * (MAX_BRIGHTNESS - MIN_BRIGHTNESS)).toFixed(2);
    setEffectValue(value);
    previewElement.style.filter = 'brightness(' + value + ')';
    currentEffect = EFFECT_HEAT;
  };

  // Cброс фильтра
  var resetFilter = function () {
    setEffectValue('');
    previewElement.style.filter = '';
    currentEffect = ORIGINAL_PIC;
  };

  // удаление класса
  var clearClass = function () {
    switch (currentEffect) {
      case EFFECT_CHROME:
        previewElement.classList.remove('effects__preview--chrome');
        break;
      case EFFECT_SEPIA:
        previewElement.classList.remove('effects__preview--sepia');
        break;
      case EFFECT_PHOBOS:
        previewElement.classList.remove('effects__preview--phobos');
        break;
      case EFFECT_MARVIN:
        previewElement.classList.remove('effects__preview--marvin');
        break;
      case EFFECT_HEAT:
        previewElement.classList.remove('effects__preview--heat');
        break;
      default:
        break;
    }
  };

  // onChange для radio
  var effectChangeHandler = function (evt) {
    var target = evt.target;
    if (!target.checked) {
      return;
    }
    var visibilitySlider = target.value !== ORIGINAL_PIC;
    window.slider.setVisibilitySlider(visibilitySlider);
  };

  // onChange для КАЖДОГО radio
  var initialAllRadio = function () {
    radioElements.forEach(function (value) {
      value.addEventListener('change', effectChangeHandler);
    });
  };

  // Установка фильтра
  var setFilter = function (ratio) {
    var indexCheck = Array.prototype.findIndex.call(radioElements, function (item) {
      return item.checked;
    });
    var filterName = radioElements[indexCheck].value;
    clearClass();
    switch (filterName) {
      case EFFECT_CHROME: {
        setChrome(ratio);
        return;
      }
      case EFFECT_PHOBOS: {
        setPhobos(ratio);
        return;
      }
      case EFFECT_MARVIN: {
        setMarvin(ratio);
        return;
      }
      case EFFECT_HEAT: {
        setBrightness(ratio);
        return;
      }
      case EFFECT_SEPIA: {
        setSepia(ratio);
        return;
      }
      default:
        resetFilter();
        return;
    }
  };

  var init = function (effect, radio, preview) {
    effectElement = effect;
    radioElements = radio;
    previewElement = preview;
    initialAllRadio();
  };


  window.filter = {
    setFilter: setFilter,
    init: init
  };
})();
