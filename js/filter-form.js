'use strict';

(function () {
  var adFilter = window.map.map.querySelector('.map__filters');
  var adFilterSelects = adFilter.querySelector('#housing-type');
  var resultFilterType;
  var changeRenderPins = function (type) {
    var currentPins = window.renderPins.currentPins;
    currentPins.forEach(function (element) {
      if (element.classList.contains('map__pin--main') === false) {
        window.renderPins.similarListAds.removeChild(element);
      }
    });

    resultFilterType = window.renderPins.allPins.filter(function (it) {
      return it.offer.type === type;
    });

    var fragment = window.renderPins.makeFiledFragment(resultFilterType);
    window.renderPins.similarListAds.appendChild(fragment);

    window.renderPins.currentPins = window.renderPins.similarListAds.querySelectorAll('.map__pin');
  };
  adFilterSelects.addEventListener('change', function () {
    changeRenderPins(adFilterSelects.value);
  });
})();
