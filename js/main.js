'use strict';

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var NAMES = ['Иван', 'Антон', 'Саша', 'Дима', 'Петя'];
var PHOTO_QUANTITY = 25;
var MIN_LIKES_QUANTITY = 15;
var MAX_LIKES_QUANTITY = 200;
var AVATAR_QUANTITY = 6;
var ESC_KEYCODE = 27;
var MAX_VALUE_SCALE = 100;
var MIN_VALUE_SCALE = 25;
var STEP_SCALE = 25;
var MAX_BRIGHTNESS = 3;
var MIN_BRIGHTNESS = 1;
var MIN_VALUE_BLUR = 0;
var MAX_VALUE_BLUR = 3;

// функция-генератор URL-photo
var getUrlPhoto = function (maxNumber) {
  var index = 0;
  return function () {
    if (index >= maxNumber) {
      index = 0;
    }
    index++;
    return 'photos/' + index + '.jpg';
  };
};

// Функция возвращает случайный элемент массива
var getRandomEl = function (array) {
  var index = Math.round(Math.random() * (array.length - 1));
  return array[index];
};

// Функция возвращает случайный URL-avatar
var getRandomAvatar = function (maxNumber) {
  var avatarIndex = Math.ceil(Math.random() * maxNumber);
  return 'img/avatar-' + avatarIndex + '.svg';
};

// Функция генерирует массив случайных коментов
var generateRandomComments = function () {
  var commentsCount = Math.ceil(Math.random() * AVATAR_QUANTITY);
  var comments = [];
  for (var i = 0; i < commentsCount; i++) {
    comments.push({
      avatar: getRandomAvatar(AVATAR_QUANTITY),
      message: getRandomEl(COMMENTS),
      name: getRandomEl(NAMES)
    });
  }
  return comments;
};

// Функция генерирует массив фото
var genetarePhotos = function (count) {
  var photos = [];
  var createUrl = getUrlPhoto(count);
  for (var i = 0; i < count; i++) {
    photos.push({
      url: createUrl(),
      description: 'Описание фотографии',
      likes: MIN_LIKES_QUANTITY + Math.round(Math.random() * (MAX_LIKES_QUANTITY - MIN_LIKES_QUANTITY)),
      comments: generateRandomComments()
    });
  }
  return photos;
};

// Создадим обработчик для открытия большой фотографии
var createPhotoElementHandler = function (photo) {
  return function () {
    showBigPicture(photo);
  };
};

// Заполняет фото данными
var fillPhotoEl = function (element, data) {
  element.querySelector('.picture__img').src = data.url;
  element.querySelector('.picture__comments').textContent = data.comments.length;
  element.querySelector('.picture__likes').textContent = data.likes;
  element.addEventListener('click', createPhotoElementHandler(data));
  return element;
};

// Функция создает и заполняет DocumentFragment
var createDocumentFragment = function (template, photos) {
  var documentFragment = document.createDocumentFragment();
  photos.forEach(function (value) {
    var clone = template.cloneNode(true);
    documentFragment.appendChild(fillPhotoEl(clone, value));
  });
  return documentFragment;
};

// отрисовка сгенерированных элементов в блок .picture
var photos = genetarePhotos(PHOTO_QUANTITY);
var photoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
document.querySelector('.pictures')
  .appendChild(createDocumentFragment(photoTemplate, photos));

// Создания элемента для отображения комментария
var createCommentEl = function (options) {
  var item = document.createElement('li');
  item.classList.add('social__comment');
  item.innerHTML = '<img class="social__picture" ' +
    'src="' + options.avatar + '" ' +
    'alt="' + options.name + '" ' +
    'src="' + options.avatar + '" ' +
    'width="35" height="35">' +
    '<p class="social__text">' + options.message + '</p>';
  return item;
};

// Создание списка элементов отображения комментария
var createCommentEls = function (comments) {
  var documentFragment = document.createDocumentFragment();
  comments.forEach(function (value) {
    documentFragment.appendChild(createCommentEl(value));
  });
  return documentFragment;
};

// Наполнение контейнера комментов
var fillComments = function (container, comments) {
  container.innerHTML = '';
  container.appendChild(createCommentEls(comments));
};

// Покажем большую фотку
var showBigPicture = function (photo) {
  var bigPicture = document.querySelector('.big-picture');
  bigPicture.querySelector('.big-picture__img img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.social__caption').textContent = photo.description;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  fillComments(bigPicture.querySelector('.social__comments'), photo.comments);
  bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('#picture-cancel').addEventListener('click', pictureCloseClickHandler);
};

// Функция закрывает болшую фотографию
var closeBigPicture = function () {
  document.querySelector('.big-picture').classList.add('hidden');
  document.querySelector('#picture-cancel').removeEventListener('click', pictureCloseClickHandler);
};

// обработчик для закрытия окна с большой фотографией
var pictureCloseClickHandler = function () {
  closeBigPicture();
};

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
  if (evt.keyCode === ESC_KEYCODE) {
    hiddenUploadWindow();
    closeBigPicture();
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

// добаление обработчиков событий
document.querySelector('#upload-file').addEventListener('change', uploadChangeHandler);
document.addEventListener('keydown', documentKeydownHendler);
document.querySelector('.scale__control--bigger').addEventListener('click', scaleBigHandler);
document.querySelector('.scale__control--smaller').addEventListener('click', scaleSmallHandler);
var effectLevel = document.querySelector('.effect-level');
effectLevel.addEventListener('mouseup', effectMouseHandler);
initialAllRadio();

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

document.querySelector('.img-upload__submit').addEventListener('click', uploadSubmitClickHandler);
