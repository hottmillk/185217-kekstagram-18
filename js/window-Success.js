'use strict';

(function () {

  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var main = document.querySelector('main');
  var element;
  var actionCallback;

  var windowSuccess = function (callback) {
    element = successTemplate.cloneNode(true);
    element.style.zIndex = 10;
    actionCallback = callback;
    var successButton = element.querySelector('.success__button');
    successButton.addEventListener('click', function (evt) {
      closeWindowSuccess();
      evt.stopPropagation();
    });
    element.querySelector('.success__inner').addEventListener('click', function (evt) {
      evt.stopPropagation();
    });

    main.insertBefore(element, main.children[0]);
    document.addEventListener('keydown', keydownHandler);
    document.addEventListener('click', clickHandler);
  };

  var closeWindowSuccess = function () {
    element.remove();
    document.removeEventListener('keydown', keydownHandler);
    document.removeEventListener('click', clickHandler);
    if (actionCallback && (typeof actionCallback) === 'function') {
      actionCallback();
    }
  };

  var clickHandler = function () {
    closeWindowSuccess();
  };

  var keydownHandler = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      closeWindowSuccess();
    }
  };


  window.windowSuccess = {
    windowSuccess: windowSuccess
  };
})();

