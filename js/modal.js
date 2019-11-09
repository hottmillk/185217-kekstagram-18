'use strict';

(function () {

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var main = document.querySelector('main');
  var element;
  var actionCallback;


  var showWindowSuccess = function (callback) {
    createElement(successTemplate);
    actionCallback = callback;
    var buttons = initButtons('.success__button');
    initRectInactive('.success__inner');
    initWindow(buttons[0]);
  };

  var showWindowError = function (message) {
    createElement(errorTemplate);
    element.querySelector('.error__title').textContent = message;
    var buttons = initButtons('.error__button');
    initRectInactive('.error__inner');
    initWindow(buttons[0]);
  };

  var createElement = function (template) {
    element = template.cloneNode(true);
    element.style.zIndex = 5;
  };

  var initButtons = function (selector) {
    var elementButtons = element.querySelectorAll(selector);
    elementButtons.forEach(function (item) {
      item.addEventListener('click', function (evt) {
        closeWindow();
        evt.stopPropagation();
      });
    });
    return elementButtons;
  };

  var initRectInactive = function (selector) {
    element.querySelector(selector).addEventListener('click', function (evt) {
      evt.stopPropagation();
    });
  };

  var initWindow = function (elementInFocus) {
    main.insertBefore(element, main.children[0]);
    elementInFocus.focus();
    document.addEventListener('keydown', docKeydownHandler);
    document.addEventListener('click', docClickHandler);
  };

  var closeWindow = function () {
    element.remove();
    document.removeEventListener('keydown', docKeydownHandler);
    document.removeEventListener('click', docClickHandler);
    if (actionCallback && (typeof actionCallback) === 'function') {
      actionCallback();
      actionCallback = null;
    }
    element = null;
  };

  var docKeydownHandler = function (evt) {
    if (window.keyCodes.pressEsc(evt)) {
      closeWindow();
    }
  };

  var docClickHandler = function () {
    closeWindow();
  };


  window.modal = {
    windowError: showWindowError,
    windowSuccess: showWindowSuccess
  };
})();
