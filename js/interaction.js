'use strict';

(function () {

  var postCode = {
    REQUEST_OK: 200,
    REQUSET_BAD: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 400
  };
  var TIMEOUT = 5000;
  var URL_DATA = ' https://js.dump.academy/kekstagram/data';


  var sendReq = function (request) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case postCode.REQUEST_OK:
          request.onSuccess(xhr.response);
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
        request.onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      request.onError('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      request.onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open(request.method, request.url);
    if (request.data) {
      xhr.send(request.data);
    } else {
      xhr.send();
    }
  };

  var load = function (onSuccess, onError) {
    var loadingReq = {
      method: 'GET',
      url: URL_DATA,
      onSuccess: onSuccess,
      onError: onError
    };
    sendReq(loadingReq);
  };

  var upload = function (form, onSuccess, onError) {
    var uploadingReq = {
      method: form.method,
      url: form.action,
      data: new FormData(form),
      onSuccess: onSuccess,
      onError: onError
    };
    sendReq(uploadingReq);
  };

  window.interaction = {
    load: load,
    upload: upload
  };
})();
