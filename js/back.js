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
  var onLoad = function (evt) {
    switch (evt.target.status) {
      case Code.SUCCESS:
        window.renderPins.setAllPins(evt.target.response);
        window.renderPins.renderPinsToMap(evt.target.response);
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
  };
  var createXHR = function (methodRequest, urlRequest) {
    var xhr = new XMLHttpRequest();
    xhr.open(methodRequest, urlRequest);
    xhr.addEventListener('load', onLoad);
    xhr.addEventListener('error', window.showErrorModal);
    return xhr;
  };

  var loadPins = function () {
    var xhr = createXHR(HTTPMethod.GET, Url.LOAD);
    xhr.responseType = 'json';
    xhr.send();
  };

  var sendForm = function (data) {
    var onSuccess = function () {

    };
    var xhr = createXHR(HTTPMethod.POST, Url.SEND, onSuccess);
    xhr.send(data);
  };

  window.back = {
    loadPins: loadPins,
    sendForm: sendForm
  };
})();
