'use strict';

(function () {

  // отрисовка сгенерированных элементов в блок .picture
  var loadPhoto = function (photos) {
    var photoTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');
    document.querySelector('.pictures')
      .appendChild(window.picture.createDocumentFragment(photoTemplate, photos));
  };

  window.interaction.load(loadPhoto, window.windowError.errorWindow);
})();

