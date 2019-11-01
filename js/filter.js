'use strict';

(function () {

  var MAX_BRIGHTNESS = 3;
  var MIN_BRIGHTNESS = 1;
  var MIN_VALUE_BLUR = 0;
  var MAX_VALUE_BLUR = 3;

  var Effect = {
    HEAT: 'heat',
    CHROME: 'chrome',
    SEPIA: 'sepia',
    MARVIN: 'marvin',
    PHOBOS: 'phobos',
    ORIGINAL: 'none'
  };

  var effectClass = {
    'heat': 'effects__preview--heat',
    'chrome': 'effects__preview--chrome',
    'sepia': 'effects__preview--sepia',
    'marvin': 'effects__preview--marvin',
    'phobos': 'effects__preview--phobos',
    'none': ''
  };

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
    previewElement.classList.add(effectClass[Effect.CHROME]);
    setEffectValue(ratio);
    previewElement.style.filter = 'grayscale(' + ratio + ')';
    currentEffect = Effect.CHROME;
  };

  // Установка "СЕПИЯ"
  var setSepia = function (ratio) {
    previewElement.classList.add(effectClass[Effect.SEPIA]);
    setEffectValue(ratio);
    previewElement.style.filter = 'sepia(' + ratio + ')';
    currentEffect = Effect.SEPIA;
  };

  // Установка "ФОБОС"
  var setPhobos = function (ratio) {
    previewElement.classList.add(effectClass[Effect.PHOBOS]);
    var value = (MIN_VALUE_BLUR + ratio * (MAX_VALUE_BLUR - MIN_VALUE_BLUR)).toFixed(2);
    setEffectValue(value);
    previewElement.style.filter = 'blur(' + value + 'px)';
    currentEffect = Effect.PHOBOS;
  };

  // Установка "МАРВИН"
  var setMarvin = function (ratio) {
    previewElement.classList.add(effectClass[Effect.MARVIN]);
    setEffectValue(ratio);
    previewElement.style.filter = 'invert(' + ratio + ')';
    currentEffect = Effect.MARVIN;
  };

  // Установка "ЗНОЙ"
  var setBrightness = function (ratio) {
    previewElement.classList.add(effectClass[Effect.HEAT]);
    var value = (MIN_BRIGHTNESS + ratio * (MAX_BRIGHTNESS - MIN_BRIGHTNESS)).toFixed(2);
    setEffectValue(value);
    previewElement.style.filter = 'brightness(' + value + ')';
    currentEffect = Effect.HEAT;
  };

  // Cброс фильтра
  var resetFilter = function () {
    setEffectValue('');
    previewElement.style.filter = '';
    currentEffect = Effect.ORIGINAL;
  };

  var clearClass = function () {
    if (currentEffect !== Effect.ORIGINAL) {
      previewElement.classList.remove(effectClass[currentEffect]);
    }
  };

  // onChange для radio
  var effectChangeHandler = function (evt) {
    var target = evt.target;
    if (!target.checked) {
      return;
    }
    var visibilitySlider = target.value !== Effect.ORIGINAL;
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
      case Effect.CHROME: {
        setChrome(ratio);
        return;
      }
      case Effect.PHOBOS: {
        setPhobos(ratio);
        return;
      }
      case Effect.MARVIN: {
        setMarvin(ratio);
        return;
      }
      case Effect.HEAT: {
        setBrightness(ratio);
        return;
      }
      case Effect.SEPIA: {
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
