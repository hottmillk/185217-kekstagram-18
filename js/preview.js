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
  var loaderComment = bigPictureEl.querySelector('.comments-loader');

  var COMMENT_STEP = 5;
  var iterationOfComment;


  // Создания элемента для отображения комментария
  var createCommentEl = function (options) {
    var item = document.createElement('li');
    item.classList.add('social__comment');
    item.innerHTML = '<img class="social__picture" ' +
      'src="' + options.avatar + '" ' +
      'alt="' + options.name + '" ' +
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

  // видимость загрузчика коментов
  var setVisibilityCommentLoader = function (isVisible) {
    if (isVisible) {
      loaderComment.classList.remove('visually-hidden');
    } else {
      loaderComment.classList.add('visually-hidden');
    }
  };

  // Наполнение контейнера комментов
  var fillComments = function (container, comments) {
    container.innerHTML = '';
    container.appendChild(createCommentEls(comments));
  };

  var createCommentIterator = function (comments) {
    var fisrtCommentIndex = 0;
    var getMoreComment = function () {
      var isEnd = fisrtCommentIndex + COMMENT_STEP > comments.length;
      var total;
      if (isEnd) {
        total = comments.slice(fisrtCommentIndex, comments.length);
      } else {
        total = comments.slice(fisrtCommentIndex, fisrtCommentIndex + COMMENT_STEP);
        fisrtCommentIndex += COMMENT_STEP;
      }
      setVisibilityCommentLoader(!isEnd);
      return total;
    };
    return function () {
      return getMoreComment(comments);
    };
  };

  // Покажем большую фотку
  var showBigPicture = function (photo) {
    bigPicture.src = photo.url;
    likesCount.textContent = photo.likes;
    socialCaption.textContent = photo.description;
    commentsCount.textContent = photo.comments.length;
    iterationOfComment = createCommentIterator(photo.comments);
    fillComments(socialComments, iterationOfComment());
    socialCommentCount.classList.add('visually-hidden');
    bigPictureEl.classList.remove('hidden');
    pictureCancel.addEventListener('click', pictureCloseClickHandler);
    loaderComment.addEventListener('click', commentsLoaderClickHandler);
    document.body.classList.add('modal-open');
  };

  var commentsLoaderClickHandler = function () {
    fillComments(socialComments, iterationOfComment());
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
    commentsLoader.removeEventListener('click', commentsLoaderClickHandler);
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
