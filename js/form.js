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
  var form = document.querySelector('.img-upload__form');
  var uploadSubmit = form.querySelector('.img-upload__submit');
  var uploadCancel = document.querySelector('#upload-cancel');
  var EMPTY_STRING = '';

  // сброс эффектов
  var clearEffects = function () {
    window.scale.clearScale();
    window.filter.clearFilter();
    window.slider.setVisibilitySlider(false);
    textHashtags.value = '';
    textDescription.value = '';
  };

  // Открывание окна редактирования
  var showUploadWindow = function () {
    uploadOverlay.classList.remove('hidden');
    uploadCancel.addEventListener('click', uploadCancelClickHandler);
    clearEffects();
    setSubmitActive(true);
    originRadio.focus();
  };

  // закрывает окно редактирования
  var hiddenUploadWindow = function () {
    clearEffects();
    uploadOverlay.classList.add('hidden');
    uploadCancel.removeEventListener('click', uploadCancelClickHandler);
    chooseFile.clear();
  };

  // onChange для поля загрузки
  var uploadChangeHandler = function () {
    showUploadWindow();
  };

  var uploadCancelClickHandler = function () {
    hiddenUploadWindow();
  };

  // onKeydown для документа
  var documentKeydownHendler = function (evt) {
    if (window.keyCodes.pressEsc(evt) && checkClosing()) {
      hiddenUploadWindow();
    }
  };

  // возможность закрытия
  var checkClosing = function () {
    return !textHashtags.hasFocus && !textDescription.hasFocus;
  };

  // Валидация
  var hashtagsValidation = function (element) {
    var hashtags = checkHashtagsAvailability(element);
    if (!hashtags) {
      return false;
    }
    if (lengthHashtags(hashtags, element)) {
      return false;
    }
    if (countHashtags(hashtags, element)) {
      return false;
    }
    if (repeatingHashtags(hashtags, element)) {
      return false;
    }
    return true;
  };

  var checkHashtagsAvailability = function (element) {
    var value = element.value;
    var hashtags = value.replace(/\s{2,}/gi, ' ').trim().split(' ');
    var errors = [];
    element.setCustomValidity('');
    if (hashtags[0] !== EMPTY_STRING) {
      hashtags.forEach(function (hash) {
        var req = /(^#+)([\wА-Яа-я-=+*&^%$@!~`/#|(){}№;:?\.,<>_"'\\]+$)/;
        if (!req.test(hash)) {
          errors.push(hash);
        }
      });
    }
    if (errors.length > 0) {
      element.setCustomValidity('В строке есть навилидные значения: ' + errors.join(', '));
      return null;
    }
    return hashtags;
  };

  // валидация (длина тега)
  var lengthHashtags = function (hashtags, elem) {
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
  var countHashtags = function (hashtags, elem) {
    if (hashtags.length > 5) {
      elem.setCustomValidity('Содержится более 5 хэш-тегов');
      return true;
    }
    return false;
  };

  // валидация (повтор тега)
  var repeatingHashtags = function (hashtags, elem) {
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

  var lightupError = function (element) {
    element.style.outline = '3px solid red';
  };

  var cancelLightupError = function (element) {
    element.style.outline = '';
  };

  var formatDescriprion = function () {
    textDescription.value = textDescription.value.replace(/\n/g, ' ');
  };

  // валидация (событие submit)
  var uploadSubmitClickHandler = function (evt) {
    cancelLightupError(textHashtags);
    formatDescriprion();
    if (hashtagsValidation(textHashtags)) {
      lightupError(textHashtags);
      return;
    }
    if (form.checkValidity()) {
      evt.preventDefault();
      setSubmitActive(false);
      window.interaction.upload(form, successHendler, errorHandler);
    }
  };

  var successHendler = function () {
    window.modal.windowSuccess(hiddenUploadWindow);
  };

  var errorHandler = function () {
    window.modal.errorWindow();
    setSubmitActive(true);
  };

  var setSubmitActive = function (active) {
    uploadSubmit.disabled = !active;
  };


  var chooseFile = new window.FileChooser(uploadChangeHandler);

  window.utils.trackFocus(textDescription);
  window.utils.trackFocus(textHashtags);
  window.scale.initScale(scaleElement, previewElement);
  window.filter.initFilter(effectLevel, radioInputs, previewElement);
  window.slider.initSlider(window.filter.setFilter);

  document.addEventListener('keydown', documentKeydownHendler);
  uploadSubmit.addEventListener('click', uploadSubmitClickHandler);

})();
