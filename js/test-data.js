'use strict';

(function () {
  var FILE_PATH = 'img/avatars/user0';
  var FILE_FORMAT = '.png';
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];

  var generatePins = function (count) {
    var avatarNumbers = [];
    for (var i = 0; i < count; i++) {
      avatarNumbers[i] = FILE_PATH + (i + 1) + FILE_FORMAT;
    }
    return avatarNumbers;
  };

  var avatarNumbers = window.utils.getShuffleArray(generatePins(8));

  var getPins = function (count) {
    var similarAds = [];
    for (var i = 0; i < count; i++) {
      similarAds[i] =
      {
        'author': {
          'avatar': avatarNumbers[i]
        },
        'offer': {
          'type': TYPES[window.utils.getRandomInt(0, TYPES.length)]
        },
        'location': {
          'x': window.utils.getRandomInt(0 + window.map.PIN.WIDTH / 2, 1200 - window.map.PIN.WIDTH / 2),
          'y': window.utils.getRandomInt(130 + window.map.PIN.HEIGHT / 2, 630 - window.map.PIN.HEIGHT / 2)
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

  window.testData = {
    similarListAds: document.querySelector('.map__pins'),
    fragment: makeFiledFragment(getPins(8))
  };
})();
