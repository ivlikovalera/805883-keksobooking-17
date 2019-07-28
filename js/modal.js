'use strict';

(function () {
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var applicationLayout = document.querySelector('main');
  var errorMessage = errorTemplate.querySelector('.error__message');
  var currentModal;

  var showModal = function (status) {
    if (status === window.utils.SUCCESS) {
      currentModal = successTemplate;
    } else {
      currentModal = errorTemplate;
      errorMessage.textContent = status;
    }

    applicationLayout.appendChild(currentModal);
    currentModal.addEventListener('click', closeModal);
    document.addEventListener('keydown', closeModal);
  };

  var closeModal = function (evt) {
    if (evt.type === 'click' || (evt.type === 'keydown' && evt.keyCode === window.utils.ESC)) {
      applicationLayout.removeChild(currentModal);
      currentModal.removeEventListener('click', closeModal);
      document.removeEventListener('keydown', closeModal);
    }
  };

  window.modal = {
    showModal: showModal,
  };
})();
