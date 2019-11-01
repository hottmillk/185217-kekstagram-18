'use strict';

(function () {

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');
  var element;

  var errorWindow = function (message) {
    element = errorTemplate.cloneNode(true);
    element.style.zIndex = 10;
    element.querySelector('.error__title').textContent = message;
    var buttons = element.querySelectorAll('.error__button');

    buttons.forEach(function (item) {
      item.addEventListener('click', function (evt) {
        closeWindowError();
        evt.preventDefault();
      });
    });
    element.querySelector('.error__inner').addEventListener('click', function (evt) {
      evt.stopPropagation();
    });

    main.insertBefore(element, main.children[0]);
    document.addEventListener('keydown', keydownHendler);
    document.addEventListener('click', clickHandler);
  };

  var closeWindowError = function () {
    element.remove();
    document.removeEventListener('keydown', keydownHendler);
    document.removeEventListener('click', clickHandler);
  };

  var keydownHendler = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      closeWindowError();
    }
  };

  var clickHandler = function () {
    closeWindowError();
  };

  window.windowError = {
    errorWindow: errorWindow
  };
})();
