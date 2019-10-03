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
  imgObj.description = '';
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
