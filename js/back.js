'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_SEND = 'https://js.dump.academy/keksobooking';
  var Code = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    NOT_FOUND_ERROR: 404,
    BAD_GATEWAY: 502
  };

  var onLoad = function (xhr, onSuccess) {
    switch (xhr.status) {
      case Code.SUCCESS:
        onSuccess();
        break;
      case Code.BAD_REQUEST:
        window.showErrorModal('Некорректный запрос');
        break;
      case Code.NOT_FOUND_ERROR:
        window.showErrorModal('Ничего не найдено');
        break;
      case Code.BAD_GATEWAY:
        window.showErrorModal('Проблемы на стороне сервера');
        break;
      default:
        window.showErrorModal(null);
    }
  };

  var loadPins = function () {
    var xhr = new XMLHttpRequest();
    var onSuccess = function () {
      var fragment = window.renderPins.makeFiledFragment(xhr.response);
      window.renderPins.similarListAds.appendChild(fragment);
    };
    xhr.responseType = 'json';
    xhr.open('GET', URL_LOAD);
    xhr.send();
    xhr.addEventListener('load', function () {
      onLoad(xhr, onSuccess);
    });
    xhr.addEventListener('error', window.showErrorModal);
  };

  var sendForm = function (data) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', URL_SEND);
    xhr.send(data);
    var onSuccess = function () {
      console.log('Данные отправлены, ю-ху!');
    };
    xhr.addEventListener('load', function () {
      onLoad(xhr, onSuccess);
    });
    xhr.addEventListener('error', window.showErrorModal);
  };
  window.back = {
    loadPins: loadPins,
    sendForm: sendForm
  };
})();
