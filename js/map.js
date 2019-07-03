'use strict';

(function () {
  var PIN = {
    WIDTH: 62,
    HEIGHT: 84
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
    window.testData.similarListAds.appendChild(window.testData.fragment);
    map.classList.remove('map--faded');
    window.form.form.classList.remove('ad-form--disabled');
    window.form.setDeactivatedForm(false);
  };

  mainPin.addEventListener('click', onPinClick);
  mainPin.addEventListener('mousedown', window.movePin.draggedPin);
  window.map = {
    map: map,
    PIN: PIN,
    mainPin: mainPin,
    onPinClick: onPinClick,
    APPLICATION_WIDTH: APPLICATION_WIDTH,
    APPLICATION_HEIGHT: APPLICATION_HEIGHT,
    addressField: addressField
  };
})();
