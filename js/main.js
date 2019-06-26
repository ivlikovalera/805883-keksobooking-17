'use strict';

var PIN = {
  WIDTH: 50,
  HEIGHT: 70
};
var FILE_PATH = 'img/avatars/user0';
var FILE_FORMAT = '.png';
var TITLE_MIN_LENGTH = 30;
var TITLE_MAX_LENGTH = 100;
var MAX_PRICE_PER_NIGHT = 1000000;

var mainPin = document.querySelector('.map__pin--main');
var map = document.querySelector('.map');
var form = document.querySelector('.notice');
var adForm = form.querySelector('.ad-form');
var adFormFields = form.querySelectorAll('input');
var adFormSelects = form.querySelectorAll('select');
var adFormFieldsets = form.querySelectorAll('fieldset');
var filterForm = form.querySelector('.map__filters');
var headlineField = form.querySelector('#title');
var perNightField = form.querySelector('#price');
var choiceOfHousingType = form.querySelector('#type');
var addressField = form.querySelector('#address');
var houseTypeByPrice = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};
var appartmentType = {
  BUNGALO: 'bungalo',
  FLAT: 'flat',
  HOUSE: 'house',
  PALACE: 'palace'
};
var arriveTimeField = form.querySelector('#timein');
var departureTimeField = form.querySelector('#timeout');
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};
addressField.value = mainPin.offsetLeft + ', ' + mainPin.offsetTop;
var getShuffleArray = function (values) {
  for (var i = values.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = values[i];
    values[i] = values[j];
    values[j] = temp;
  }
  return values;
};

var generatePins = function (count) {
  var avatarNumbers = [];
  for (var i = 0; i < count; i++) {
    avatarNumbers[i] = FILE_PATH + (i + 1) + FILE_FORMAT;
  }
  return avatarNumbers;
};

var avatarNumbers = getShuffleArray(generatePins(8));
var similarListAds = document.querySelector('.map__pins');
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var getPins = function (count) {
  var similarAds = [];
  for (var i = 0; i < count; i++) {
    similarAds[i] =
      {
        'author': {
          'avatar': avatarNumbers[i]
        },
        'offer': {
          'type': TYPES[getRandomInt(0, TYPES.length)]
        },
        'location': {
          'x': getRandomInt(0 + PIN.WIDTH / 2, 1200 - PIN.WIDTH / 2),
          'y': getRandomInt(130 + PIN.HEIGHT / 2, 630 - PIN.HEIGHT / 2)
        }
      };
  }
  return similarAds;
};

var similarAdTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderAd = function (ad) {
  var pinElement = similarAdTemplate.cloneNode(true);
  pinElement.style = 'left: ' + ad.location.x + 'px; ' + 'top: ' + ad.location.y + 'px;';
  pinElement.querySelector('img').src = ad.author.avatar;
  pinElement.querySelector('img').alt = ad.offer.type;
  return pinElement;
};

var makeFiledFragment = function (pins) {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < pins.length; j++) {
    fragment.appendChild(renderAd(pins[j]));
  }
  return fragment;
};

var fragment = makeFiledFragment(getPins(8));
var getFormElements = function (formElements, state) {
  formElements.forEach(function (element) {
    element.disabled = state;
  });
};
getFormElements(adFormFieldsets, true);
var onPinClick = function () {
  similarListAds.appendChild(fragment);
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  getFormElements(adFormFields, false);
  getFormElements(adFormSelects, false);
  getFormElements(adFormFieldsets, false);
  filterForm.classList.remove('map__filters-container');
};

mainPin.addEventListener('click', onPinClick);

headlineField.minLength = TITLE_MIN_LENGTH;
headlineField.maxLength = TITLE_MAX_LENGTH;
headlineField.required = true;

perNightField.max = MAX_PRICE_PER_NIGHT;
perNightField.required = true;

var changeMinPrice = function () {
  switch (choiceOfHousingType.value) {
    case appartmentType.BUNGALO:
      perNightField.min = houseTypeByPrice.bungalo;
      perNightField.placeholder = houseTypeByPrice.bungalo;
      break;
    case appartmentType.FLAT:
      perNightField.min = houseTypeByPrice.flat;
      perNightField.placeholder = houseTypeByPrice.flat;
      break;
    case appartmentType.HOUSE:
      perNightField.min = houseTypeByPrice.house;
      perNightField.placeholder = houseTypeByPrice.house;
      break;
    case appartmentType.PALACE:
      perNightField.min = houseTypeByPrice.palace;
      perNightField.placeholder = houseTypeByPrice.palace;
      break;
    default:
      break;
  }
};
choiceOfHousingType.addEventListener('change', changeMinPrice);
changeMinPrice();
addressField.readOnly = true;

var changeTimeFieldValue = function (modifiedTimeField, relatedTimeField) {
  relatedTimeField.selectedIndex = modifiedTimeField.selectedIndex;
};

arriveTimeField.addEventListener('change', function () {
  changeTimeFieldValue(arriveTimeField, departureTimeField);
});

departureTimeField.addEventListener('change', function () {
  changeTimeFieldValue(departureTimeField, arriveTimeField);
});
