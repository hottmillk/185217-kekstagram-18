'use strict';

(function () {

  var postCode = {
    REQUEST_OK: 200,
    REQUSET_BAD: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 400
  };
  var TIMEOUT = 5000;


  var sendReq = function (options) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case postCode.REQUEST_OK:
          options.onSuccess(xhr.response);
          break;
        case postCode.REQUSET_BAD:
          error = 'Запрос неверный';
          break;
        case postCode.UNAUTHORIZED:
          error = 'Пользователь не авторизован';
          break;
        case postCode.NOT_FOUND:
          error = 'Не найдено';
          break;
        default:
          error = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        options.onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      options.onError('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      options.onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open(options.method, options.url);
    if (options.data) {
      xhr.send(options.data);
    } else {
      xhr.send();
    }
  };

  var load = function (onSuccess, onError) {
    var options = {
      method: 'GET',
      url: window.utils.URL_DATA,
      onSuccess: onSuccess,
      onError: onError
    };
    sendReq(options);
  };

  var upload = function (form, onSuccess, onError) {
    var options = {
      method: form.method,
      url: form.action,
      data: new FormData(form),
      onSuccess: onSuccess,
      onError: onError
    };
    sendReq(options);
  };

  window.interaction = {
    load: load,
    upload: upload
  };
})();
