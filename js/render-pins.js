'use strict';

(function () {
  var MAX_PIN_COUNT = 5;
  var similarListAds = document.querySelector('.map__pins');
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
    for (var j = 0; j < MAX_PIN_COUNT; j++) {
      fragment.appendChild(renderAd(pins[j]));
    }
    return fragment;
  };

  window.renderPins = {
    similarListAds: similarListAds,
    makeFiledFragment: makeFiledFragment
  };
})();
