'use strict';

(function () {
  var MAX_PIN_COUNT = 5;
  var allPins = [];
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
    var activePins = pins.slice(0, MAX_PIN_COUNT);
    var fragment = document.createDocumentFragment();
    activePins.forEach(function (it) {
      fragment.appendChild(renderAd(it));
    });
    return fragment;
  };
  var getAllPins = function () {
    return allPins;
  };

  var renderPinsToMap = function (currentPins) {
    var fragment = makeFiledFragment(currentPins);
    similarListAds.appendChild(fragment);
  };
  var setRenderAllPins = function (response) {
    allPins = response;
    renderPinsToMap(allPins);
  };

  window.renderPins = {
    similarListAds: similarListAds,
    makeFiledFragment: makeFiledFragment,
    renderPinsToMap: renderPinsToMap,
    getAllPins: getAllPins,
    setRenderAllPins: setRenderAllPins,
  };
})();
