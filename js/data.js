'use strict';

(function () {
  if (!window.data) {
    window.data = {};
  }

  window.data.PHOTO_QUANTITY = 25;

  var COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var NAMES = ['Иван', 'Антон', 'Саша', 'Дима', 'Петя'];
  var MIN_LIKES_QUANTITY = 15;
  var MAX_LIKES_QUANTITY = 200;
  var AVATAR_QUANTITY = 6;

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
  window.data.genetarePhotos = function (count) {
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
})();
