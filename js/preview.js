'use strict';

(function () {
  var COMMENT_STEP = 5;

  var bigPictureEl = document.querySelector('.big-picture');
  var bigPictureElement = bigPictureEl.querySelector('.big-picture__img img');
  var likesCountEl = bigPictureEl.querySelector('.likes-count');
  var socialCaptionEl = bigPictureEl.querySelector('.social__caption');
  var commentsCountEl = bigPictureEl.querySelector('.comments-count');
  var socialCommentsEl = bigPictureEl.querySelector('.social__comments');
  var socialCommentCountEl = bigPictureEl.querySelector('.social__comment-count');
  var commentsLoaderEl = bigPictureEl.querySelector('.comments-loader');
  var pictureCancelEl = bigPictureEl.querySelector('#picture-cancel');
  var loaderCommentEl = bigPictureEl.querySelector('.comments-loader');
  var socialFooterTextEl = bigPictureEl.querySelector('.social__footer-text');
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
      loaderCommentEl.classList.remove('visually-hidden');
    } else {
      loaderCommentEl.classList.add('visually-hidden');
    }
  };

  var clearCommentsContiner = function (container) {
    container.innerHTML = '';
  };

  // Наполнение контейнера комментов
  var fillComments = function (container, comments) {
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
    return getMoreComment;

  };

  // Покажем большую фотку
  var showBigPicture = function (photo) {
    bigPictureElement.src = photo.url;
    likesCountEl.textContent = photo.likes;
    socialCaptionEl.textContent = photo.description;
    commentsCountEl.textContent = photo.comments.length;
    iterationOfComment = createCommentIterator(photo.comments);
    clearCommentsContiner(socialCommentsEl);
    fillComments(socialCommentsEl, iterationOfComment());
    socialCommentCountEl.classList.add('visually-hidden');
    bigPictureEl.classList.remove('hidden');
    pictureCancelEl.addEventListener('click', pictureCloseClickHandler);
    loaderCommentEl.addEventListener('click', commentsLoaderClickHandler);
    socialFooterTextEl.focus();
    document.body.classList.add('modal-open');
  };

  var commentsLoaderClickHandler = function () {
    fillComments(socialCommentsEl, iterationOfComment());
  };

  // Создадим обработчик для открытия большой фотографии
  var createPhotoElementHandler = function (photo) {
    return function () {
      showBigPicture(photo);
    };
  };

  // Функция закрывает болшую фотографию
  var closeBigPicture = function () {
    clearSocialFooterText();
    bigPictureEl.classList.add('hidden');
    pictureCancelEl.removeEventListener('click', pictureCloseClickHandler);
    commentsLoaderEl.removeEventListener('click', commentsLoaderClickHandler);
    document.body.classList.remove('modal-open');
  };

  var clearSocialFooterText = function () {
    socialFooterTextEl.value = '';
  };


  // обработчик для закрытия окна с большой фотографией
  var pictureCloseClickHandler = function () {
    closeBigPicture();
  };

  // onKeydown для документа
  var documentKeydownHendler = function (evt) {
    if (window.keyCodes.pressEsc(evt)) {
      closeBigPicture();
    }
  };

  document.addEventListener('keydown', documentKeydownHendler);

  window.preview = {
    createPhotoElementHandler: createPhotoElementHandler
  };
})();
