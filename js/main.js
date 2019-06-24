'use strict';

var PIN = {
  WIDTH: 50,
  HEIGHT: 70
};
var MAIN_PIN = document.querySelector('.map__pin--main');
var FILE_PATH = 'img/avatars/user0';
var FILE_FORMAT = '.png';
var map = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var adFormInputs = adForm.querySelectorAll('input');
var adFormSelects = adForm.querySelectorAll('select');
var adFormFieldsets = adForm.querySelectorAll('fieldset');
var filterForm = document.querySelector('.map__filters');
var addressInput = document.querySelector('#address');
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};
addressInput.value = MAIN_PIN.offsetLeft + ', ' + MAIN_PIN.offsetTop;
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
var getFormElements = function (formElements) {
  for (var i = 0; i < formElements.length; i++) {
    formElements[i].removeAttribute('disabled');
  }
};

var onPinClick = function () {
  similarListAds.appendChild(fragment);
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  getFormElements(adFormInputs);
  getFormElements(adFormSelects);
  getFormElements(adFormFieldsets);
  filterForm.classList.remove('map__filters');
};

MAIN_PIN.addEventListener('click', function () {
  onPinClick();
});
