'use strict';

(function () {
  var PIN = {
    WIDTH: 62,
    HEIGHT: 84,
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
  var initiallyCoordinate = new window.movePin.Coordinate(mainPin.offsetLeft, mainPin.offsetTop);
  var map = document.querySelector('.map');
  var addressField = window.form.adForm.querySelector('#address');
  addressField.readOnly = true;
  addressField.value = mainPin.offsetLeft + ', ' + mainPin.offsetTop;

  var onPinClick = function () {
    map.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');
    window.form.setDeactivatedForm(false, window.form.adFormFieldsets);
    window.back.loadAds(window.renderPins.setRenderAllPins);
  };

  mainPin.addEventListener('click', onPinClick);
  mainPin.addEventListener('mousedown', window.movePin.draggedPin);

  window.mapContainer = {
    PIN: PIN,
    APPLICATION_WIDTH: APPLICATION_WIDTH,
    APPLICATION_HEIGHT: APPLICATION_HEIGHT,
    map: map,
    mainPin: mainPin,
    onPinClick: onPinClick,
    addressField: addressField,
    initiallyCoordinate: initiallyCoordinate,
  };
})();
