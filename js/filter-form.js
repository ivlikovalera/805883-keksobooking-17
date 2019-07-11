'use strict';

(function () {
  var any = 'any';
  var Features = {
    wifi: 'wifi',
    dishwasher: 'dishwasher',
    parking: 'parking',
    washer: 'washer',
    elevator: 'elevator',
    conditioner: 'conditioner',
  };
  var adFilter = window.mapContainer.map.querySelector('.map__filters');
  var adFilterTypeSelect = adFilter.querySelector('#housing-type');
  var adFilterPriceSelect = adFilter.querySelector('#housing-price');
  var adFilterRoomsSelect = adFilter.querySelector('#housing-rooms');
  var adFilterGuestsSelect = adFilter.querySelector('#housing-guests');
  var adFilterWifiCheckbox = adFilter.querySelector('#filter-wifi');
  var adFilterDishwasherCheckbox = adFilter.querySelector('#filter-dishwasher');
  var adFilterParkingCheckbox = adFilter.querySelector('#filter-parking');
  var adFilterWasherCheckbox = adFilter.querySelector('#filter-washer');
  var adFilterElevatorCheckbox = adFilter.querySelector('#filter-elevator');
  var adFilterConditionerCheckbox = adFilter.querySelector('#filter-conditioner');
  var resultFilterPins;
  var changeRenderPins = function () {
    var currentPins = window.renderPins.similarListAds.querySelectorAll('.map__pin');
    resultFilterPins = window.renderPins.getAllPins();
    currentPins.forEach(function (element) {
      if (!element.classList.contains('map__pin--main')) {
        window.renderPins.similarListAds.removeChild(element);
      }
    });
    window.stopBounce(window.renderPins.renderPinsToMap(filterPins()));
  };

  adFilterTypeSelect.addEventListener('change', function () {
    changeRenderPins(adFilterTypeSelect.value);
  });
  adFilterPriceSelect.addEventListener('change', function () {
    changeRenderPins();
  });
  adFilterRoomsSelect.addEventListener('change', function () {
    changeRenderPins();
  });
  adFilterGuestsSelect.addEventListener('change', function () {
    changeRenderPins();
  });
  adFilterWifiCheckbox.addEventListener('click', function () {
    changeRenderPins();
  });
  adFilterDishwasherCheckbox.addEventListener('click', function () {
    changeRenderPins();
  });
  adFilterParkingCheckbox.addEventListener('click', function () {
    changeRenderPins();
  });
  adFilterWasherCheckbox.addEventListener('click', function () {
    changeRenderPins();
  });
  adFilterElevatorCheckbox.addEventListener('click', function () {
    changeRenderPins();
  });
  adFilterConditionerCheckbox.addEventListener('click', function () {
    changeRenderPins();
  });

  var filterPins = function () {
    return resultFilterPins.filter(function (pinObject) {
      if (pinObject.offer.type !== adFilterTypeSelect.value && adFilterTypeSelect.value !== any) {
        return false;
      }
      if (pinObject.offer.price !== adFilterPriceSelect.value && adFilterPriceSelect.value !== any) {
        return false;
      }
      if (pinObject.offer.rooms !== parseInt(adFilterRoomsSelect.value, 10) && adFilterRoomsSelect.value !== any) {
        return false;
      }
      if (pinObject.offer.guests !== parseInt(adFilterGuestsSelect.value, 10) && adFilterGuestsSelect.value !== any) {
        return false;
      }
      if (adFilterWifiCheckbox.checked && !pinObject.offer.features.includes(Features.wifi)) {
        return false;
      }
      if (adFilterDishwasherCheckbox.checked && !pinObject.offer.features.includes(Features.dishwasher)) {
        return false;
      }
      if (adFilterParkingCheckbox.checked && !pinObject.offer.features.includes(Features.parking)) {
        return false;
      }
      if (adFilterWasherCheckbox.checked && !pinObject.offer.features.includes(Features.washer)) {
        return false;
      }
      if (adFilterElevatorCheckbox.checked && !pinObject.offer.features.includes(Features.elevator)) {
        return false;
      }
      if (adFilterConditionerCheckbox.checked && !pinObject.offer.features.includes(Features.conditioner)) {
        return false;
      }
      return true;
    });
  };
})();
