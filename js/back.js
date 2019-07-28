'use strict';

(function () {
  var Url = {
    LOAD: 'https://js.dump.academy/keksobooking/data',
    SEND: 'https://js.dump.academy/keksobooking'
  };
  var Code = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    NOT_FOUND_ERROR: 404,
    BAD_GATEWAY: 502
  };
  var DescriptionText = {
    BAD_REQUEST: 'Некорректный запрос',
    NOT_FOUND_ERROR: 'Ничего не найдено',
    BAD_GATEWAY: 'Проблемы на стороне сервера',
    ANOTHER_ERROR: 'Сервер ответил кодом '
  };
  var HTTPMethod = {
    GET: 'GET',
    POST: 'POST'
  };
  var createXHR = function (methodRequest, urlRequest, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.open(methodRequest, urlRequest);
    xhr.addEventListener('load', function (evt) {
      switch (evt.target.status) {
        case Code.SUCCESS:
          onSuccess(evt.target.response);
          break;
        case Code.BAD_REQUEST:
          window.showErrorModal(DescriptionText.BAD_REQUEST);
          break;
        case Code.NOT_FOUND_ERROR:
          window.showErrorModal(DescriptionText.NOT_FOUND_ERROR);
          break;
        case Code.BAD_GATEWAY:
          window.showErrorModal(DescriptionText.BAD_GATEWAY);
          break;
        default:
          window.showErrorModal((DescriptionText.ANOTHER_ERROR + evt.target.status));
      }
    });
    xhr.addEventListener('error', window.modal.showErrorModal);
    return xhr;
  };

  var loadAds = function (onSuccess) {
    var xhr = createXHR(HTTPMethod.GET, Url.LOAD, onSuccess);
    xhr.responseType = 'json';
    xhr.send();
  };

  var sendForm = function (data, onSuccess) {
    var xhr = createXHR(HTTPMethod.POST, Url.SEND, onSuccess);
    xhr.send(data);
  };

  window.back = {
    loadAds: loadAds,
    sendForm: sendForm
  };
})();
