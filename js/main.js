'use strict';

var PIN = {
  WIDTH: 50,
  HEIGHT: 70
};
var mainPin = document.querySelector('.map__pin--main');
var FILE_PATH = 'img/avatars/user0';
var FILE_FORMAT = '.png';
var map = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var adFormInputs = adForm.querySelectorAll('input');
var adFormSelects = adForm.querySelectorAll('select');
var adFormFieldsets = adForm.querySelectorAll('fieldset');
var filterForm = document.querySelector('.map__filters');
var headlineInput = document.querySelector('#title');
var perNightInput = document.querySelector('#price');
var choiceOfHousingType = document.querySelector('#type');
var addressInput = document.querySelector('#address');
var housingTypes = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};
var arriveTime = document.querySelector('#timein');
var departureTime = document.querySelector('#timeout');
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};
addressInput.value = mainPin.offsetLeft + ', ' + mainPin.offsetTop;
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
  formElements.forEach(function (element) {
    element.disabled = false;
  });
};

var onPinClick = function () {
  similarListAds.appendChild(fragment);
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  getFormElements(adFormInputs);
  getFormElements(adFormSelects);
  getFormElements(adFormFieldsets);
  filterForm.classList.remove('map__filters-container');
};

mainPin.addEventListener('click', onPinClick);

headlineInput.min = 30;
headlineInput.max = 100;
headlineInput.required = true;

perNightInput.max = 1000000;
perNightInput.required = true;

var changeMinPrice = function () {
  if (choiceOfHousingType.value === 'bungalo') {
    perNightInput.min = housingTypes.bungalo;
    perNightInput.placeholder = housingTypes.bungalo;
  }
  if (choiceOfHousingType.value === 'flat') {
    perNightInput.min = housingTypes.flat;
    perNightInput.placeholder = housingTypes.flat;
  }
  if (choiceOfHousingType.value === 'house') {
    perNightInput.min = housingTypes.house;
    perNightInput.placeholder = housingTypes.house;
  }
  if (choiceOfHousingType.value === 'palace') {
    perNightInput.min = housingTypes.palace;
    perNightInput.placeholder = housingTypes.palace;
  }
};

choiceOfHousingType.addEventListener('change', changeMinPrice);
changeMinPrice();
addressInput.readOnly = true;

arriveTime.addEventListener('change', function () {
  departureTime.selectedIndex = arriveTime.selectedIndex;
});

departureTime.addEventListener('change', function () {
  arriveTime.selectedIndex = departureTime.selectedIndex;
});
