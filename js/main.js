'use strict';

var PIN = {
  WIDTH: 62,
  HEIGHT: 84
};
var APPLICATION_WIDTH = {
  START: 1,
  MAX: 1200
};
var APPLICATION_HEIGHT = {
  START: 130,
  MAX: 630
};
var FILE_PATH = 'img/avatars/user0';
var FILE_FORMAT = '.png';
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
var mainPin = document.querySelector('.map__pin--main');
var map = document.querySelector('.map');
var form = document.querySelector('.ad-form');
var adFormFields = form.querySelectorAll('input');
var adFormSelects = form.querySelectorAll('select');
var adFormFieldsets = form.querySelectorAll('fieldset');
var headlineField = form.querySelector('#title');
var perNightField = form.querySelector('#price');
var choiceOfHousingType = form.querySelector('#type');
var addressField = form.querySelector('#address');
var arriveTimeField = form.querySelector('#timein');
var departureTimeField = form.querySelector('#timeout');
var activatePin = false;
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
  form.classList.remove('ad-form--disabled');
  getFormElements(adFormFields, false);
  getFormElements(adFormSelects, false);
  getFormElements(adFormFieldsets, false);
  form.classList.remove('map__filters');
  activatePin = true;
};

mainPin.addEventListener('click', onPinClick);
mainPin.addEventListener('mousedown', function (evt) {

  evt.preventDefault();

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

    mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
    mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
    addressField.value = mainPin.offsetLeft + PIN.WIDTH / 2 + ', ' + mainPin.offsetTop;
    if (startCoords.x < (APPLICATION_WIDTH.START + PIN.WIDTH / 2)) {
      mainPin.style.left = APPLICATION_WIDTH.START + 'px';
    }
    if (startCoords.x > (APPLICATION_WIDTH.MAX - PIN.WIDTH)) {
      mainPin.style.left = (APPLICATION_WIDTH.MAX - PIN.WIDTH) + 'px';
    }
    if (startCoords.y < APPLICATION_HEIGHT.START) {
      mainPin.style.top = APPLICATION_HEIGHT.START + 'px';
    }
    if (startCoords.y > APPLICATION_HEIGHT.MAX) {
      mainPin.style.top = APPLICATION_HEIGHT.MAX + 'px';
    }
  };
  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
  if (activatePin === false) {
    onPinClick();
  }
  if (activatePin === true) {
    mainPin.removeEventListener('click', onPinClick);
  }
});

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
