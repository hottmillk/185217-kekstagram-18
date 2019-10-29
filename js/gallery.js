'use strict';

(function () {
// отрисовка сгенерированных элементов в блок .picture
  var photos = window.data.genetarePhotos(window.data.PHOTO_QUANTITY);
  var photoTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  document.querySelector('.pictures')
    .appendChild(window.picture.createDocumentFragment(photoTemplate, photos));
})();
