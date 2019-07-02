'use strict';

(function () {
  var TITLE_MIN_LENGTH = 30;
  var TITLE_MAX_LENGTH = 100;
  var MAX_PRICE_PER_NIGHT = 1000000;

  var houseTypeByPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
  var AppartmentType = {
    BUNGALO: 'bungalo',
    FLAT: 'flat',
    HOUSE: 'house',
    PALACE: 'palace'
  };

  window.form = {
    form: document.querySelector('.ad-form'),
    formFields: document.querySelectorAll('input'),
    formSelects: document.querySelectorAll('select'),
    adFormFieldsets: document.querySelectorAll('fieldset'),

    getFormElements: function (formElements, state, pointer) {
      formElements.forEach(function (element) {
        element.disabled = state;
        element.style = pointer;
      });
    }
  };

  var headlineField = window.form.form.querySelector('#title');
  var perNightField = window.form.form.querySelector('#price');
  var choiceOfHousingType = window.form.form.querySelector('#type');
  var arriveTimeField = window.form.form.querySelector('#timein');
  var departureTimeField = window.form.form.querySelector('#timeout');

  window.form.getFormElements(window.form.formFields, true, 'pointer-events: none');
  window.form.getFormElements(window.form.formSelects, true, 'pointer-events: none');
  window.form.getFormElements(window.form.adFormFieldsets, true, 'pointer-events: none');

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
})();
