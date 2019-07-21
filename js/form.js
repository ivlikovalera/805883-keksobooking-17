'use strict';

(function () {
  var TITLE_MIN_LENGTH = 30;
  var TITLE_MAX_LENGTH = 100;
  var MAX_PRICE_PER_NIGHT = 1000000;
  var AppartmentType = {
    BUNGALO: 'bungalo',
    FLAT: 'flat',
    HOUSE: 'house',
    PALACE: 'palace',
  };
  var houseTypeByPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
  var adForm = document.querySelector('.ad-form');
  var mapForm = document.querySelector('.map__filters');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var mapFormSelects = mapForm.querySelectorAll('select');
  var mapFormCheckboxes = mapForm.querySelectorAll('label');
  var headlineField = adForm.querySelector('#title');
  var perNightField = adForm.querySelector('#price');
  var choiceOfHousingType = adForm.querySelector('#type');
  var arriveTimeField = adForm.querySelector('#timein');
  var departureTimeField = adForm.querySelector('#timeout');
  var adFormReset = adForm.querySelector('.ad-form__reset');
  var changeFormElements = function (formElements, state, pointer) {
    formElements.forEach(function (element) {
      element.disabled = state;
      element.style = pointer;
    });
  };
  var setDeactivatedForm = function (state) {
    var pointer = false;
    if (state === true) {
      pointer = 'pointer-events: none';
    }
    changeFormElements(adFormFieldsets, state, pointer);
    changeFormElements(mapFormSelects, state, pointer);
    changeFormElements(mapFormCheckboxes, state, pointer);
  };

  setDeactivatedForm(true);
  headlineField.minLength = TITLE_MIN_LENGTH;
  headlineField.maxLength = TITLE_MAX_LENGTH;
  headlineField.required = true;

  perNightField.max = MAX_PRICE_PER_NIGHT;
  perNightField.required = true;

  var changeMinPrice = function () {
    switch (choiceOfHousingType.value) {
      case AppartmentType.BUNGALO:
        perNightField.min = houseTypeByPrice.bungalo;
        perNightField.placeholder = houseTypeByPrice.bungalo;
        break;
      case AppartmentType.FLAT:
        perNightField.min = houseTypeByPrice.flat;
        perNightField.placeholder = houseTypeByPrice.flat;
        break;
      case AppartmentType.HOUSE:
        perNightField.min = houseTypeByPrice.house;
        perNightField.placeholder = houseTypeByPrice.house;
        break;
      case AppartmentType.PALACE:
        perNightField.min = houseTypeByPrice.palace;
        perNightField.placeholder = houseTypeByPrice.palace;
        break;
      default:
        break;
    }
  };
  choiceOfHousingType.addEventListener('change', changeMinPrice);
  changeMinPrice();

  var changeTimeFieldValue = function (modifiedTimeField, relatedTimeField) {
    relatedTimeField.selectedIndex = modifiedTimeField.selectedIndex;
  };

  arriveTimeField.addEventListener('change', function () {
    changeTimeFieldValue(arriveTimeField, departureTimeField);
  });

  departureTimeField.addEventListener('change', function () {
    changeTimeFieldValue(departureTimeField, arriveTimeField);
  });

  document.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.back.sendForm(new FormData(adForm));
  });

  var deactivatedApplication = function (evt) {
    evt.preventDefault();
    adForm.reset();
    window.mapContainer.map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    setDeactivatedForm(true);
    window.filterForm.removePins();
    window.renderCards.removeCard();
    window.mapContainer.mainPin.style.left = window.mapContainer.initiallyCoordinate.x + 'px';
    window.mapContainer.mainPin.style.top = window.mapContainer.initiallyCoordinate.y + 'px';
    window.mapContainer.addressField.value = window.mapContainer.mainPin.offsetLeft + ', ' + window.mapContainer.mainPin.offsetTop;
  };

  adFormReset.addEventListener('click', deactivatedApplication);
  window.form = {
    adForm: adForm,
    mapForm: mapForm,
    setDeactivatedForm: setDeactivatedForm,
  };
})();
