'use strict';

(function () {

  var effectLevel = document.querySelector('.effect-level');
  var originRadio = document.querySelector('input[type=radio][checked]');
  var radioInputs = document.querySelectorAll('.effects__radio');
  var textHashtags = document.querySelector('.text__hashtags');
  var textDescription = document.querySelector('.text__description');
  var previewElement = document.querySelector('.img-upload__preview');
  var scaleElement = document.querySelector('.scale');
  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadFile = document.querySelector('#upload-file');
  var form = document.querySelector('.img-upload__form');
  var uploadSubmit = form.querySelector('.img-upload__submit');
  var uploadCancel = document.querySelector('#upload-cancel');

  // сброс эффектов
  var clearEffects = function () {
    window.scale.clear();
    window.slider.setVisibilitySlider(false);
    textHashtags.value = '';
    textDescription.value = '';
  };

  // Открывание окна редактирования
  var showUploadWindow = function () {
    uploadOverlay.classList.remove('hidden');
    uploadCancel.addEventListener('click', hiddenUploadWindow);
    clearEffects();
    originRadio.focus();
  };

  // закрывает окно редактирования
  var hiddenUploadWindow = function () {
    uploadOverlay.classList.add('hidden');
    uploadCancel.removeEventListener('click', hiddenUploadWindow);
    uploadFile.value = '';
  };

  // onChange для поля загрузки
  var uploadChangeHandler = function () {
    showUploadWindow();
  };

  // onKeydown для документа
  var documentKeydownHendler = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE && checkClosing()) {
      hiddenUploadWindow();
    }
  };

  // возможность закрытия
  var checkClosing = function () {
    return !textHashtags.hasFocus && !textDescription.hasFocus;
  };

  // Валидация
  var hashtagsValidation = function (element) {
    var value = element.value;
    var hashtags = value.replace(/\s{2,}/, ' ').trim().split(' ');
    var errors = [];
    var haveError = false;
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
      haveError = true;
    } else {
      haveError = lengthHashtags(hashtags, element, haveError);
      haveError = countHashtags(hashtags, element, haveError);
      haveError = repeatingHashtags(hashtags, element, haveError);
    }
    return haveError;
  };

  // валидация (длина тега)
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

  // валидация (число тегов)
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

  // валидация (повтор тега)
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

  var formatDescriprion = function () {
    textDescription.value = textDescription.value.replace(/\n/g, ' ');
  };

  // валидация (событие submit)
  var uploadSubmitClickHandler = function (evt) {
    formatDescriprion();
    var invalid = hashtagsValidation(textHashtags);
    if (!invalid && form.checkValidity()) {
      evt.preventDefault();
      window.interaction.upload(form, successHendler, window.windowError.errorWindow);
    }
  };

  var successHendler = function () {
    window.windowSuccess.windowSuccess(hiddenUploadWindow);
  };

  window.utils.trackFocus(textDescription);
  window.utils.trackFocus(textHashtags);
  window.scale.init(scaleElement, previewElement);
  window.filter.init(effectLevel, radioInputs, previewElement);
  window.slider.init(window.filter.setFilter);
  uploadFile.addEventListener('change', uploadChangeHandler);
  document.addEventListener('keydown', documentKeydownHendler);
  uploadSubmit.addEventListener('click', uploadSubmitClickHandler);
  // добаление обработчиков событий
})();
