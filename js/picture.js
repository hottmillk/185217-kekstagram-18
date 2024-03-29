'use strict';

(function () {

  // Заполняет фото данными
  var fillPhotoEl = function (element, data) {
    element.querySelector('.picture__img').src = data.url;
    element.querySelector('.picture__comments').textContent = data.comments.length;
    element.querySelector('.picture__likes').textContent = data.likes;
    element.addEventListener('click', window.preview.createPhotoElementHandler(data));
    return element;
  };

  // Функция создает и заполняет DocumentFragment
  var createDocumentFragment = function (template, photos, fragment) {
    photos.forEach(function (value) {
      var clone = template.cloneNode(true);
      fragment.appendChild(fillPhotoEl(clone, value));
    });
    return fragment;
  };

  window.picture = {
    createDocumentFragment: createDocumentFragment
  };
})();
