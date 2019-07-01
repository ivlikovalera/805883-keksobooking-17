'use strict';

(function () {
  window.map = {
    PIN: {
      WIDTH: 62,
      HEIGHT: 84
    }
  };

  var APPLICATION_WIDTH = {
    MIN: 1,
    MAX: 1200
  };
  var APPLICATION_HEIGHT = {
    MIN: 130,
    MAX: 630
  };

  var mainPin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var addressField = window.form.form.querySelector('#address');
  addressField.readOnly = true;
  addressField.value = mainPin.offsetLeft + ', ' + mainPin.offsetTop;

  var onPinClick = function () {
    window.pin.similarListAds.appendChild(window.pin.fragment);
    map.classList.remove('map--faded');
    window.form.form.classList.remove('ad-form--disabled');
    window.form.getFormElements(window.form.formFields, false, false);
    window.form.getFormElements(window.form.formSelects, false, false);
    window.form.getFormElements(window.form.adFormFieldsets, false, false);
  };

  mainPin.addEventListener('click', onPinClick);
  mainPin.addEventListener('mousedown', function (evt) {

    evt.preventDefault();

    if (map.classList.contains('map--faded')) {
      onPinClick();
      mainPin.removeEventListener('click', onPinClick);
    }

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var currentCoordY = mainPin.offsetTop - shift.y;
      var currentCoordX = mainPin.offsetLeft - shift.x;

      if ((currentCoordY >= APPLICATION_HEIGHT.MIN) && (currentCoordY <= APPLICATION_HEIGHT.MAX)) {
        mainPin.style.top = currentCoordY + 'px';
      }
      if ((currentCoordX >= APPLICATION_WIDTH.MIN) && (currentCoordX <= APPLICATION_WIDTH.MAX - window.map.PIN.WIDTH)) {
        mainPin.style.left = currentCoordX + 'px';
      }
      addressField.value = mainPin.offsetLeft + window.map.PIN.WIDTH / 2 + ', ' + mainPin.offsetTop;
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });
})();
