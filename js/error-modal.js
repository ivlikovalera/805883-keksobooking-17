'use strict';

(function () {
  var ESC = 27;
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var applicationLayout = document.querySelector('main');
  var errorMessage = errorTemplate.querySelector('.error__message');
  var errorButton = errorTemplate.querySelector('.error__button');
  var errorModal = errorTemplate;

  var showErrorModal = function (errorText) {
    if (errorText !== null) {
      errorMessage.textContent = errorText;
    }
    applicationLayout.appendChild(errorTemplate);
  };
  errorButton.addEventListener('click', function () {
    applicationLayout.removeChild(errorModal);
  });
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC) {
      applicationLayout.removeChild(errorModal);
    }
  });
  window.showErrorModal = showErrorModal;
})();
