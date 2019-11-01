'use strict';

(function () {

  var RANDOM_QUANTITY = 10;
  var TIMEOUT = 500;
  var idFilter = {
    RANDOM: 'filter-random',
    DISCUSSED: 'filter-discussed',
    POPULAR: 'filter-popular'
  };

  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var pictures = document.querySelector('.pictures');
  var imgFilters = document.querySelector('.img-filters');
  var imgFiltersButton = imgFilters.querySelectorAll('.img-filters__button');
  var objectPhoto;
  var idTimeout;

  var filterActive = Array.prototype.find.call(imgFiltersButton, function (item) {
    return item.classList.contains('img-filters__button');
  });
  var backup = document.querySelectorAll('.pictures > *');

  var loadPhoto = function (photos) {
    objectPhoto = photos;
    imgFiltersButton.forEach(function (item) {
      item.addEventListener('click', function (evt) {
        filterInactive();
        filterActive = evt.target;
        filterActive.classList.add('img-filters__button--active');
        if (idTimeout) {
          clearTimeout(idTimeout);
        }
        idTimeout = setTimeout(setFilter, TIMEOUT);
      });
    });
    imgFilters.classList.remove('img-filters--inactive');
    setFilter();
  };

  var filterInactive = function () {
    if (filterActive) {
      filterActive.classList.remove('img-filters__button--active');
    }
  };

  var setFilter = function () {
    photosClear();
    var backupFrag = restoreBackup();
    switch (filterActive.id) {
      case idFilter.POPULAR:
        popularPhotos(backupFrag);
        break;
      case idFilter.RANDOM:
        randomPhotos(backupFrag);
        break;
      case idFilter.DISCUSSED:
        discussedPhotos(backupFrag);
        break;
    }
  };

  var photosClear = function () {
    pictures.innerHTML = '';
  };

  var restoreBackup = function () {
    var fragment = document.createDocumentFragment();
    backup.forEach(function (item) {
      fragment.appendChild(item);
    });
    return fragment;
  };

  var popularPhotos = function (fragment) {
    pictures.appendChild(window.picture.createDocumentFragment(photoTemplate, objectPhoto, fragment));
  };

  var randomPhotos = function (fragment) {
    var selection = getRandomPic(objectPhoto, RANDOM_QUANTITY);
    pictures.appendChild(window.picture.createDocumentFragment(photoTemplate, selection, fragment));
  };

  var discussedPhotos = function (fragment) {
    var photoSort = objectPhoto.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    pictures.appendChild(window.picture.createDocumentFragment(photoTemplate, photoSort, fragment));
  };

  var getRandomPic = function (photos, count) {
    var copy = photos.slice();
    var total = [];
    var indexRandom = -1;
    for (var i = 0; i < count; i++) {
      indexRandom = Math.round(Math.random() * (copy.length - 1));
      total.push(copy[indexRandom]);
      copy.slice(indexRandom, 1);
    }
    return total;
  };
  window.interaction.load(loadPhoto, window.windowError.errorWindow);
})();

