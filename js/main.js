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
var NUM_PHOTOS = 25;
var ESC_KEYCODE = 27;
var MAX_HASHTAGS = 5;

var photos = [];

var picturesBlock = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var fragment = document.createDocumentFragment();

var getLimitedRandom = function (bottom, top) {
  return Math.floor(Math.random() * (top + 1 - bottom)) + bottom;
};

var getRandomEl = function (arr) {
  var rndEl = Math.floor(Math.random() * arr.length);
  return arr[rndEl];
};

var createComment = function () {
  var comment = {};
  comment.avatar = 'img/avatar-' + getLimitedRandom(1, 6) + '.svg';
  comment.message = getRandomEl(COMMENTS);
  comment.name = getRandomEl(NAMES);
  return comment;
};

var createSeveralComments = function (numComments) {
  var arr = [];
  for (var i = 0; i < numComments; i++) {
    arr.push(createComment());
  }
  return arr;
};

var createImg = function (nameImg) {
  var imgObj = {};
  imgObj.url = 'photos/' + nameImg + '.jpg';
  imgObj.description = 'TEST_DESCRIPTION';
  imgObj.likes = getLimitedRandom(15, 200);
  imgObj.comments = createSeveralComments(getLimitedRandom(1, 4));
  return imgObj;
};

var createMorePhotos = function (arr, numPhotos) {
  for (var i = 0; i < numPhotos; i++) {
    arr.push(createImg(i + 1));
  }
};

createMorePhotos(photos, NUM_PHOTOS);

var renderPhoto = function (photo) {
  var photoEl = pictureTemplate.cloneNode(true);
  photoEl.querySelector('.picture__img').src = photo.url;
  photoEl.querySelector('.picture__likes').textContent = photo.likes;
  photoEl.querySelector('.picture__comments').textContent = photo.comments.length;
  return photoEl;
};

for (var i = 0; i < photos.length; i++) {
  fragment.appendChild(renderPhoto(photos[i]));
}
picturesBlock.appendChild(fragment);

// Личный проект: больше деталей
var bigPicture = document.querySelector('.big-picture');

// временно скрыть bigPicture.classList.remove('hidden');

bigPicture.querySelector('.big-picture__img > img').src = photos[0].url;
bigPicture.querySelector('.likes-count').textContent = photos[0].likes;
bigPicture.querySelector('.comments-count').textContent = photos[0].comments.length;
bigPicture.querySelector('.social__caption').textContent = photos[0].description;

var socialComments = bigPicture.querySelector('.social__comments');

for (i = 0; i < photos[0].comments.length; i++) {
  socialComments.querySelectorAll('.social__picture')[i].src = 'img/avatar-' + getLimitedRandom(1, 6) + '.svg';
  socialComments.querySelectorAll('.social__text')[i].textContent = getRandomEl(COMMENTS);
}

var visuallyHidden = function (classString) {
  document.querySelector(classString).classList.add('visually-hidden');
  return 'hidden';
};

visuallyHidden('.social__comment-count');
visuallyHidden('.social__comments-loader');


// личный проект: Подробности
// форма загрузки фото
var uploadFileForm = document.querySelector('#upload-file');
var editFileForm = document.querySelector('.img-upload__overlay');
var cancelButton = editFileForm.querySelector('#upload-cancel');
var photoHashtags = editFileForm.querySelector('.text__hashtags');
var photoDescription = editFileForm.querySelector('.text__description');

var openEditForm = function () {
  editFileForm.classList.remove('hidden');
  document.addEventListener('keydown', editFileFormEscHandler);
};

var closeEditForm = function () {
  editFileForm.classList.add('hidden');
  document.removeEventListener('keydown', editFileFormEscHandler);
};

var inputTagsDescriptionHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.stopPropagation();
  }
};

var editFileFormEscHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    editFileForm.classList.add('hidden');
  }
};

uploadFileForm.addEventListener('change', openEditForm);
cancelButton.addEventListener('click', closeEditForm);
photoHashtags.addEventListener('keydown', inputTagsDescriptionHandler);
photoDescription.addEventListener('keydown', inputTagsDescriptionHandler);

// валидация
photoHashtags.addEventListener('invalid', function () {
  if (photoHashtags.validity.tooShort) {
    photoHashtags.setCustomValidity('Слишком короткий хэш-тег');
  }
});

var hashtagHandler = function () {
  var hashtags = photoHashtags.value;

  if (!hashtags.includes(' ')) {
    return photoHashtags.setCustomValidity('Хэш-теги должны разделяться пробелами');
  }

  hashtags = hashtags.replace(/\s\s+/g, ' ').trim().toLowerCase().split(' ');

  if (hashtags.length > MAX_HASHTAGS) {
    return photoHashtags.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
  }

  // eslint-disable-next-line no-shadow
  for (var i = 0; i < hashtags.length; i++) {
    if (hashtags[i][0] !== '#') {
      return photoHashtags.setCustomValidity('Хэш-тег должен начинатся с символа #(решётка)');
    } else if (hashtags[i].length > 20) {
      return photoHashtags.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
    } else if (hashtags.findIndex(function (tag, currentIndex) {
      return tag === hashtags[i] && currentIndex !== i;
    }) !== -1) {
      return photoHashtags.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
    }
  }
  return hashtags;
};

photoHashtags.addEventListener('change', hashtagHandler);

photoHashtags.addEventListener('input', function () {
  photoHashtags.setCustomValidity('');
});

// ГЛУБИНА ФИЛЬТРА

var EFFECT_LEVEL_LINE = 455;
var effectLevelPin = editFileForm.querySelector('.effect-level__pin');
var effectLevelValue = editFileForm.querySelector('.effect-level__value');
var effectLevelDepth = editFileForm.querySelector('.effect-level__depth');

var effectLevelPinHandler = function () {
  var currentEffectValue = Math.round(effectLevelDepth / (EFFECT_LEVEL_LINE / 100));
  effectLevelValue.setAttribute('value', currentEffectValue);
};

effectLevelPin.addEventListener('mouseup', effectLevelPinHandler);
