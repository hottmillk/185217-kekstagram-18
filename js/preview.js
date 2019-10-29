'use strict';

(function () {

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

  // Создадим обработчик для открытия большой фотографии
  var createPhotoElementHandler = function (photo) {
    return function () {
      showBigPicture(photo);
    };
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

  // onKeydown для документа
  var documentKeydownHendler = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      closeBigPicture();
    }
  };

  document.addEventListener('keydown', documentKeydownHendler);

  window.preview = {
    createPhotoElementHandler: createPhotoElementHandler
  };
})();
