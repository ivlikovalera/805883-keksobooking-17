'use strict';

(function () {
  var any = 'any';
  var adFilter = window.mapContainer.map.querySelector('.map__filters');
  var adFilterSelects = adFilter.querySelector('#housing-type');
  var resultFilterType = window.renderPins.getAllPins();
  var changeRenderPins = function (type) {
    var currentPins = window.renderPins.similarListAds.querySelectorAll('.map__pin');
    currentPins.forEach(function (element) {
      if (!(element.classList.contains('map__pin--main'))) {
        window.renderPins.similarListAds.removeChild(element);
      }
    });
    if (type !== any) {
      resultFilterType = window.renderPins.getAllPins().filter(function (it) {
        return it.offer.type === type;
      });
    }
    window.renderPins.renderPinsToMap(resultFilterType);
  };
  adFilterSelects.addEventListener('change', function () {
    changeRenderPins(adFilterSelects.value);
  });
})();
