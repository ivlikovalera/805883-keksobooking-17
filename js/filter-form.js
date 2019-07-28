'use strict';

(function () {
  var ANY_FILTER = 'any';
  var Feature = {
    wifi: 'wifi',
    dishwasher: 'dishwasher',
    parking: 'parking',
    washer: 'washer',
    elevator: 'elevator',
    conditioner: 'conditioner',
  };
  var PriceName = {
    low: 'low',
    middle: 'middle',
    high: 'high',
  };
  var PriceValue = {
    firstLimit: 10000,
    secondLimit: 50000,
  };
  var adFilter = window.form.mapForm;
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

  var removePins = function () {
    var currentPins = window.renderPins.similarListAds.querySelectorAll('.map__pin');
    currentPins.forEach(function (element) {
      if (!element.classList.contains('map__pin--main')) {
        window.renderPins.similarListAds.removeChild(element);
      }
    });
  };

  var changeRenderPins = function () {
    window.renderCards.removeCard();
    resultFilterPins = window.renderPins.getAllPins();
    removePins();
    window.stopBounce(window.renderPins.renderPinsToMap(filterPins()));
  };

  adFilterTypeSelect.addEventListener('change', changeRenderPins);
  adFilterPriceSelect.addEventListener('change', changeRenderPins);
  adFilterRoomsSelect.addEventListener('change', changeRenderPins);
  adFilterGuestsSelect.addEventListener('change', changeRenderPins);
  adFilterWifiCheckbox.addEventListener('click', changeRenderPins);
  adFilterDishwasherCheckbox.addEventListener('click', changeRenderPins);
  adFilterParkingCheckbox.addEventListener('click', changeRenderPins);
  adFilterWasherCheckbox.addEventListener('click', changeRenderPins);
  adFilterElevatorCheckbox.addEventListener('click', changeRenderPins);
  adFilterConditionerCheckbox.addEventListener('click', changeRenderPins);

  var filterFeatures = function (pinObject, adFilterCheckbox, featureName) {
    if (adFilterCheckbox.checked && !pinObject.offer.features.includes(featureName)) {
      return true;
    }
    return false;
  };

  var filterSelects = function (offerData, selectedFilterValue, selectedFilter) {
    if (offerData !== selectedFilterValue && selectedFilter !== ANY_FILTER) {
      return true;
    }
    return false;
  };

  var filterByPrice = function (offerData, selectedFilter) {
    switch (selectedFilter) {
      case ANY_FILTER:
        return false;
      case PriceName.low:
        if (offerData <= PriceValue.firstLimit) {
          return false;
        }
        break;
      case PriceName.middle:
        if (offerData >= PriceValue.firstLimit && offerData <= PriceValue.secondLimit) {
          return false;
        }
        break;
      case PriceName.high:
        if (offerData >= PriceValue.secondLimit) {
          return false;
        }
        break;
    }
    return true;
  };

  var filterPins = function () {
    return resultFilterPins.filter(function (pinObject) {
      if (filterSelects(pinObject.offer.type, adFilterTypeSelect.value, adFilterTypeSelect.value)) {
        return false;
      }
      if (filterByPrice(pinObject.offer.price, adFilterPriceSelect.value)) {
        return false;
      }
      if (filterSelects(pinObject.offer.rooms, parseInt(adFilterRoomsSelect.value, 10), adFilterRoomsSelect.value)) {
        return false;
      }
      if (filterSelects(pinObject.offer.guests, parseInt(adFilterGuestsSelect.value, 10), adFilterGuestsSelect.value)) {
        return false;
      }
      if (filterFeatures(pinObject, adFilterWifiCheckbox, Feature.wifi)) {
        return false;
      }
      if (filterFeatures(pinObject, adFilterDishwasherCheckbox, Feature.dishwasher)) {
        return false;
      }
      if (filterFeatures(pinObject, adFilterParkingCheckbox, Feature.parking)) {
        return false;
      }
      if (filterFeatures(pinObject, adFilterWasherCheckbox, Feature.washer)) {
        return false;
      }
      if (filterFeatures(pinObject, adFilterElevatorCheckbox, Feature.elevator)) {
        return false;
      }
      if (filterFeatures(pinObject, adFilterConditionerCheckbox, Feature.conditioner)) {
        return false;
      }
      return true;
    });
  };
  window.filterForm = {
    Feature: Feature,
    removePins: removePins,
  };
})();
