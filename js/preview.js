'use strict';

(function () {

  var bigPictureEl = document.querySelector('.big-picture');
  var bigPicture = bigPictureEl.querySelector('.big-picture__img img');
  var likesCount = bigPictureEl.querySelector('.likes-count');
  var socialCaption = bigPictureEl.querySelector('.social__caption');
  var commentsCount = bigPictureEl.querySelector('.comments-count');
  var socialComments = bigPictureEl.querySelector('.social__comments');
  var socialCommentCount = bigPictureEl.querySelector('.social__comment-count');
  var commentsLoader = bigPictureEl.querySelector('.comments-loader');
  var pictureCancel = bigPictureEl.querySelector('#picture-cancel');


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
    bigPicture.src = photo.url;
    likesCount.textContent = photo.likes;
    socialCaption.textContent = photo.description;
    commentsCount.textContent = photo.comments.length;
    fillComments(socialComments, photo.comments);
    socialCommentCount.classList.add('visually-hidden');
    commentsLoader.classList.add('visually-hidden');
    bigPictureEl.classList.remove('hidden');
    pictureCancel.addEventListener('click', pictureCloseClickHandler);
    document.body.classList.add('modal-open');
  };

  // Создадим обработчик для открытия большой фотографии
  var createPhotoElementHandler = function (photo) {
    return function () {
      showBigPicture(photo);
    };
  };

  // Функция закрывает болшую фотографию
  var closeBigPicture = function () {
    bigPictureEl.classList.add('hidden');
    pictureCancel.removeEventListener('click', pictureCloseClickHandler);
    document.body.classList.remove('modal-open');
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
