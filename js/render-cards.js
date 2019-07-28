'use strict';

(function () {
  var typeToType = {
    'bungalo': 'Бунгало',
    'flat': 'Квартира',
    'house': 'Дом',
    'palace': 'Дворец',
  };
  var featuresToFeatures = {
    'wifi': '.popup__feature--wifi',
    'dishwasher': '.popup__feature--dishwasher',
    'parking': '.popup__feature--parking',
    'washer': '.popup__feature--washer',
    'elevator': '.popup__feature--elevator',
    'conditioner': '.popup__feature--conditioner',
  };
  var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var currentCard;
  var renderCard = function (card) {
    var cardElement = similarCardTemplate.cloneNode(true);
    cardElement.querySelector('h3').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = typeToType[card.offer.type];
    cardElement.querySelector('.popup__text--capacity')
    .textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей.';
    cardElement.querySelector('.popup__text--time')
    .textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    cardElement.querySelector('img').src = card.author.avatar;
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    var cardFeatures = cardElement.querySelector('.popup__features');
    for (var feature in window.filterForm.Feature) {
      if (!card.offer.features.includes(feature)) {
        cardFeatures.removeChild(cardFeatures.querySelector(featuresToFeatures[feature]));
      }
    }
    var cardPhoto = cardElement.querySelector('.popup__photos');
    var cardPhotoItem = cardPhoto.querySelector('img');
    if (card.offer.photos.length === 0) {
      cardPhotoItem.style.display = 'none';
    }
    if (card.offer.photos.length >= 1) {
      card.offer.photos.forEach(function (obj, index) {
        if (index === 0) {
          cardPhotoItem.src = obj;
        } else {
          var cardPhotos = cardPhotoItem.cloneNode(true);
          cardPhotos.src = obj;
          cardPhoto.appendChild(cardPhotos);
        }
      });
    }
    var cardCloseButton = cardElement.querySelector('.popup__close');
    cardCloseButton.addEventListener('click', removeCard);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.ESC) {
        removeCard();
      }
    });
    currentCard = cardElement;
    return cardElement;
  };

  var removeCard = function () {
    if (currentCard) {
      currentCard.remove();
    }
    var currentPin = window.renderPins.similarListAds.querySelector('.map__pin--active');
    if (currentPin) {
      currentPin.classList.remove('map__pin--active');
    }
  };

  var makeFiledPopup = function (card) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(renderCard(card));
    return fragment;
  };

  var renderCardToMap = function (card) {
    removeCard();
    var fragment = makeFiledPopup(card);
    window.renderPins.similarListAds.appendChild(fragment);
  };

  var setListenerToPin = function (currentPins) {
    var pinOnMap = window.utils.transformNodeToArray(document.querySelectorAll('.map__pin'));
    pinOnMap.shift();
    pinOnMap.forEach(function (it, i) {
      it.addEventListener('click', function () {
        renderCardToMap(currentPins[i]);
        it.classList.add('map__pin--active');
      });
    });
  };


  window.renderCards = {
    setListenerToPin: setListenerToPin,
    removeCard: removeCard,
  };
})();
