'use strict';

(function () {

  var STATUS_OK = 200;
  var STATUS_BAD = 400;
  var STATUS_UNAUTHORIZED = 401;
  var STATUS_NOT_FOUND = 404;
  var TIME = 5000;


  var sendReq = function (options) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIME;

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case STATUS_OK:
          options.onSuccess(xhr.response);
          break;
        case STATUS_BAD:
          error = 'Запрос неверный';
          break;
        case STATUS_UNAUTHORIZED:
          error = 'Пользователь не авторизован';
          break;
        case STATUS_NOT_FOUND:
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
