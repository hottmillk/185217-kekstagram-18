'use strict';

(function () {

  var MAX_VALUE_SCALE = 100;
  var MIN_VALUE_SCALE = 25;
  var STEP_SCALE = 25;
  var MAX_BRIGHTNESS = 3;
  var MIN_BRIGHTNESS = 1;
  var MIN_VALUE_BLUR = 0;
  var MAX_VALUE_BLUR = 3;

  // функия возвращает установленое значени масштаба для передачи
  var getScaleValue = function () {
    var scaleInput = document.querySelector('.scale__control--value');
    var scaleValue = Number(scaleInput.value.replace('%', ''));
    if (!scaleValue) {
      scaleValue = MAX_VALUE_SCALE;
      scaleInput.value = MAX_VALUE_SCALE + '%';
    }
    return scaleValue;
  };

  // Функция устанавливает масштаб для передачи
  var setScaleValue = function (value) {
    document.querySelector('.scale__control--value').value = value + '%';
  };

  // Функция устанавливает маштабирование
  var setScale = function (value) {
    if (value < MIN_VALUE_SCALE || value > MAX_VALUE_SCALE) {
      return;
    }
    setScaleValue(value);
    document.querySelector('.img-upload__preview').style.transform = 'scale(' + getScaleValue() / 100 + ')';
  };

  // Сбрасывание эффектов
  var clearEffects = function () {
    setScale(MAX_VALUE_SCALE);
    setFilter('origin', true);
  };

  // Открывание окна редактирования
  var showUploadWindow = function () {
    document.querySelector('.img-upload__overlay').classList.remove('hidden');
    document.querySelector('#upload-cancel').addEventListener('click', hiddenUploadWindow);
    clearEffects();
  };

  // закрывает окно редактирования
  var hiddenUploadWindow = function () {
    document.querySelector('.img-upload__overlay').classList.add('hidden');
    document.querySelector('#upload-cancel').removeEventListener('click', hiddenUploadWindow);
    document.querySelector('#upload-file').value = '';
  };


  // onChange для поля загрузки
  var uploadChangeHandler = function () {
    showUploadWindow();
  };

  // onKeydown для документа
  var documentKeydownHendler = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      hiddenUploadWindow();
    }
  };

  // функия обработчик для увелечиния
  var scaleBigHandler = function () {
    var value = getScaleValue();
    setScale(value + STEP_SCALE);
  };

  // функия обработчик для уменьшения
  var scaleSmallHandler = function () {
    var value = getScaleValue();
    setScale(value - STEP_SCALE);
  };

  // вычисление положения ПИН к слайдеру
  var getRatio = function (level) {
    var effectLineRect = level.querySelector('.effect-level__line').getBoundingClientRect();
    var effectPinRect = level.querySelector('.effect-level__pin').getBoundingClientRect();
    return ((effectPinRect.x - effectLineRect.x + effectPinRect.width / 2) / effectLineRect.width).toFixed(2);
  };

  // Значение фильтра для передачи
  var setEffectValue = function (level, value) {
    level.querySelector('.effect-level__value').value = value;
  };

  // Установка "ХРОМ"
  var setChrome = function (level, preview, init) {
    var ratio = 1;
    if (!init) {
      ratio = getRatio(level);
    }
    setEffectValue(level, ratio);
    preview.style.filter = 'grayscale(' + ratio + ')';
  };

  // Установка "СЕПИЯ"
  var setSepia = function (level, preview, init) {
    var ratio = 1;
    if (!init) {
      ratio = getRatio(level);
    }
    setEffectValue(level, ratio);
    preview.style.filter = 'sepia(' + ratio + ')';
  };
  // Установка "ФОБОС"
  var setPhobos = function (level, preview, init) {
    var ratio = 1;
    if (!init) {
      ratio = getRatio(level);
    }
    var value = (MIN_VALUE_BLUR + ratio * (MAX_VALUE_BLUR - MIN_VALUE_BLUR)).toFixed(2);
    setEffectValue(level, ratio);
    preview.style.filter = 'blur(' + value + 'px)';
  };
  // Установка "МАРВИН"
  var setMarvin = function (level, preview, init) {
    var ratio = 1;
    if (!init) {
      ratio = getRatio(level);
    }
    setEffectValue(level, ratio);
    preview.style.filter = 'invert(' + ratio + ')';
  };
  // Установка "ЗНОЙ"
  var setBrightness = function (level, preview, init) {
    var ratio = 1;
    if (!init) {
      ratio = getRatio(level);
    }
    var value = (MIN_BRIGHTNESS + ratio * (MAX_BRIGHTNESS - MIN_BRIGHTNESS)).toFixed(2);
    setEffectValue(level, ratio);
    preview.style.filter = 'brightness(' + value + ')';
  };

  // Cброс фильтра
  var resetFilter = function (level, preview) {
    setEffectValue(level, '');
    preview.style.filter = '';
  };

  // Видимость слайдера
  var setVisibilitySlider = function (visible) {
    if (visible) {
      document.querySelector('.effect-level').classList.remove('hidden');
    } else {
      document.querySelector('.effect-level').classList.add('hidden');
    }
  };

  // Установка фильтра
  var setFilter = function (name, init) {
    var effectLevel = document.querySelector('.effect-level');
    var previewEl = document.querySelector('.img-upload__preview');
    switch (name) {
      case 'chrome': {
        setChrome(effectLevel, previewEl, init);
        setVisibilitySlider(true);
        return;
      }
      case 'sepia': {
        setSepia(effectLevel, previewEl, init);
        setVisibilitySlider(true);
        return;
      }
      case 'marvin': {
        setMarvin(effectLevel, previewEl, init);
        setVisibilitySlider(true);
        return;
      }
      case 'phobos': {
        setPhobos(effectLevel, previewEl, init);
        setVisibilitySlider(true);
        return;
      }
      case 'heat': {
        setBrightness(effectLevel, previewEl, init);
        setVisibilitySlider(true);
        return;
      }
      default:
        resetFilter(effectLevel, previewEl, init);
        setVisibilitySlider(false);
    }
  };

  // onMouse для слайдера
  var effectMouseHandler = function () {
    setFilter(document.querySelector('.effects__radio:checked').value, false);
  };

  // onChange для radio
  var effectChangeHandler = function (evt) {
    var target = evt.target;
    if (target.checked) {
      setFilter(target.value, true);
    }
  };

  // onChange для КАЖДОГО radio
  var initialAllRadio = function () {
    document.querySelectorAll('.effects__radio').forEach(function (value) {
      value.addEventListener('change', effectChangeHandler);
    });
  };

  // Валидация
  var hashtagsValidation = function () {
    var element = document.querySelector('.text__hashtags');
    var value = element.value;
    var hashtags = value.replace(/\s{2,}/, ' ').trim().split(' ');
    var errors = [];
    element.setCustomValidity('');
    if (hashtags[0]) {
      hashtags.forEach(function (hash) {
        var req = /(^#+)([\wА-Яа-я-=+*&^%$@!~`/#|(){}№;:?\.,<>_"'\\]+$)/;
        if (!req.test(hash)) {
          errors.push(hash);
        }
      });
    }
    if (errors.length > 0) {
      element.setCustomValidity('Недопустимые значения: ' + errors.join(', '));
    } else {
      var error = lengthHashtags(hashtags, element, false);
      error = countHashtags(hashtags, element, error);
      repeatingHashtags(hashtags, element, error);
    }
  };

  var lengthHashtags = function (hashtags, elem, error) {
    if (error) {
      return error;
    }
    var errors = [];
    hashtags.forEach(function (tag) {
      if (tag.length > 20) {
        errors.push(tag);
      }
    });
    if (errors.length > 0) {
      elem.setCustomValidity('Эти хэш-теги превышают 20 символов: ' + errors.join(', '));
      return true;
    }
    return false;
  };

  var countHashtags = function (hashtags, elem, error) {
    if (error) {
      return error;
    }
    if (hashtags.length > 5) {
      elem.setCustomValidity('Содержится более 5 хэш-тегов');
      return true;
    }
    return false;
  };

  var repeatingHashtags = function (hashtags, elem, error) {
    if (error) {
      return error;
    }
    var errors = [];
    var caseTags = hashtags.map(function (value) {
      return value.toLowerCase();
    });
    caseTags.forEach(function (tag, index, tags) {
      if (index + 1 < tags.length) {
        var checkIndex = tags.indexOf(tag, index + 1);
        if (checkIndex > 0) {
          errors.push(hashtags[index]);
        }
      }
    });
    if (errors.length > 0) {
      elem.setCustomValidity('Эти хэш-теги повторяются: ' + errors.join(', '));
      return true;
    }
    return false;
  };

  var uploadSubmitClickHandler = function () {
    hashtagsValidation();
  };

  // добаление обработчиков событий
  document.querySelector('#upload-file').addEventListener('change', uploadChangeHandler);
  document.addEventListener('keydown', documentKeydownHendler);
  document.querySelector('.scale__control--bigger').addEventListener('click', scaleBigHandler);
  document.querySelector('.scale__control--smaller').addEventListener('click', scaleSmallHandler);
  var effectLevel = document.querySelector('.effect-level');
  effectLevel.addEventListener('mouseup', effectMouseHandler);
  initialAllRadio();
  document.querySelector('.img-upload__submit').addEventListener('click', uploadSubmitClickHandler);

})();
