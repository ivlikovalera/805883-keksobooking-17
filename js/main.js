'use strict';
var pin = {
  width: 50,
  height: 70
};

function getShuffleArray(values) {
  var currentIndex = values.length;
  var temporaryValue;
  var randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = values[currentIndex];
    values[currentIndex] = values[randomIndex];
    values[randomIndex] = temporaryValue;
  }
  return values;
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
var map = document.querySelector('.map');
map.classList.remove('map--faded');
var similarAds = [];
var types = ['palace', 'flat', 'house', 'bungalo', 'palace', 'flat', 'house', 'bungalo'];
types = getShuffleArray(types);
var avatarNumbers = ['1', '2', '3', '4', '5', '6', '7', '8'];
avatarNumbers = getShuffleArray(avatarNumbers);
var mapPinField = document.querySelector('.map__pins');
var xCoordinate = mapPinField.clientWidth;

for (var i = 0; i <= 7; i++) {
  similarAds[i] =
    {
      'author': {
        'avatar': 'img/avatars/user0' + avatarNumbers[i] + '.png'
      },
      'offer': {
        'type': types[i]
      },
      'location': {
        'x': getRandomInt(0, xCoordinate),
        'y': getRandomInt(130, 630)
      }
    };
}
function createStyle(ad) {
  return 'left: ' + (ad.x - pin.width / 2) + 'px; top: ' + (ad.y - pin.height) + 'px;';
}

var similarListAds = document.querySelector('.map__pins');

var similarAdTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
function renderAd(ad) {
  var pinElement = similarAdTemplate.cloneNode(true);
  pinElement.setAttribute('style', createStyle(ad.location));
  pinElement.children[0].setAttribute('src', ad.author.avatar);
  pinElement.setAttribute('alt', ad.offer.type);
  return pinElement;
}

var fragment = document.createDocumentFragment();
for (var j = 0; j < similarAds.length; j++) {
  fragment.appendChild(renderAd(similarAds[j]));
}
similarListAds.appendChild(fragment);
