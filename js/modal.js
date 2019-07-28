'use strict';

(function () {
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var applicationLayout = document.querySelector('main');
  var errorMessage = errorTemplate.querySelector('.error__message');
  var errorButton = errorTemplate.querySelector('.error__button');
  var errorModal = errorTemplate;
  var successModal = successTemplate;

  var showErrorModal = function (errorText) {
    errorMessage.textContent = errorText;
    applicationLayout.appendChild(errorTemplate);
    errorButton.addEventListener('click', function () {
      applicationLayout.removeChild(errorModal);
    });
    document.addEventListener('click', function () {
      applicationLayout.removeChild(errorModal);
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.ESC) {
        applicationLayout.removeChild(errorModal);
      }
    });
  };

  var showSuccessModal = function () {
    applicationLayout.appendChild(successTemplate);
    document.addEventListener('click', function () {
      applicationLayout.removeChild(successModal);
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.ESC) {
        applicationLayout.removeChild(successModal);
      }
    });
  };
  window.modal = {
    showErrorModal: showErrorModal,
    showSuccessModal: showSuccessModal,
  };
})();
