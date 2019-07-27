'use strict';

(function () {
  var TITLE_MIN_LENGTH = 30;
  var TITLE_MAX_LENGTH = 100;
  var MAX_PRICE_PER_NIGHT = 1000000;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var AppartmentType = {
    BUNGALO: 'bungalo',
    FLAT: 'flat',
    HOUSE: 'house',
    PALACE: 'palace',
  };
  var GuestCount = {
    oneGuest: '1',
    twoGuest: '2',
    threeGuest: '3',
    noGuest: '0',
  };
  var RoomCount = {
    oneRoom: '1',
    twoRoom: '2',
    threeRoom: '3',
    oneHundredRoom: '100',
  };

  var roomToError = {
    '1': 'В одну комнату может заселиться только один гость.',
    '2': 'В две комнаты может заселиться один или два гостя.',
    '3': 'Вы должны выбрать хотя бы одного гостя.',
    '100': 'Для 100 комнат вы можете выбрать только опцию "Не для гостей".',
  };

  var houseTypeByPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var endMessage = ' Измените количество комнат или количество гостей';
  var adForm = document.querySelector('.ad-form');
  var mapForm = document.querySelector('.map__filters');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var mapFormSelects = mapForm.querySelectorAll('select');
  var mapFormCheckboxes = mapForm.querySelectorAll('label');
  var headlineField = adForm.querySelector('#title');
  var perNightField = adForm.querySelector('#price');
  var choiceOfHousingType = adForm.querySelector('#type');
  var roomNumberSelect = adForm.querySelector('#room_number');
  var capacitySelect = adForm.querySelector('#capacity');
  var arriveTimeField = adForm.querySelector('#timein');
  var departureTimeField = adForm.querySelector('#timeout');
  var fileChooserMainPhoto = adForm.querySelector('.ad-form__field input[type=file]');
  var fileChooserAllPhoto = adForm.querySelector('.ad-form__upload input[type=file]');
  var previewPicMainPhoto = adForm.querySelector('.ad-form-header__preview').querySelector('img');
  var previewPicAllPhotoBox = adForm.querySelector('.ad-form__photo');
  var previewPicAllPhotoContainer = adForm.querySelector('.ad-form__photo-container');
  var adFormReset = adForm.querySelector('.ad-form__reset');
  var changeFormElements = function (formElements, state, pointer) {
    formElements.forEach(function (element) {
      element.disabled = state;
      element.style = pointer;
    });
  };
  var setDeactivatedForm = function (state) {
    var pointer = false;
    if (state === true) {
      pointer = 'pointer-events: none';
    }
    changeFormElements(adFormFieldsets, state, pointer);
    changeFormElements(mapFormSelects, state, pointer);
    changeFormElements(mapFormCheckboxes, state, pointer);
  };

  setDeactivatedForm(true);
  fileChooserAllPhoto.multiple = true;
  headlineField.minLength = TITLE_MIN_LENGTH;
  headlineField.maxLength = TITLE_MAX_LENGTH;
  headlineField.required = true;

  perNightField.max = MAX_PRICE_PER_NIGHT;
  perNightField.required = true;

  capacitySelect.value = GuestCount.oneGuest;
  var setErrorMessage = function (itIsError, rooms) {
    var errorMessageText;
    errorMessageText = itIsError ? roomToError[rooms] + endMessage : '';
    capacitySelect.setCustomValidity(errorMessageText);
  };

  var validateCapacity = function () {
    switch (roomNumberSelect.value) {
      case RoomCount.oneRoom:
        setErrorMessage(capacitySelect.value !== GuestCount.oneGuest, RoomCount.oneRoom);
        break;
      case RoomCount.twoRoom:
        setErrorMessage(capacitySelect.value !== GuestCount.oneGuest || capacitySelect.value !== GuestCount.twoGuest, RoomCount.twoRoom);
        break;
      case RoomCount.threeRoom:
        setErrorMessage(capacitySelect.value === GuestCount.noGuest, RoomCount.threeRoom);
        break;
      case RoomCount.oneHundredRoom:
        setErrorMessage(capacitySelect.value !== GuestCount.noGuest, RoomCount.oneHundredRoom);
        break;
    }
  };

  var changeMinPrice = function () {
    switch (choiceOfHousingType.value) {
      case AppartmentType.BUNGALO:
        perNightField.min = houseTypeByPrice.bungalo;
        perNightField.placeholder = houseTypeByPrice.bungalo;
        break;
      case AppartmentType.FLAT:
        perNightField.min = houseTypeByPrice.flat;
        perNightField.placeholder = houseTypeByPrice.flat;
        break;
      case AppartmentType.HOUSE:
        perNightField.min = houseTypeByPrice.house;
        perNightField.placeholder = houseTypeByPrice.house;
        break;
      case AppartmentType.PALACE:
        perNightField.min = houseTypeByPrice.palace;
        perNightField.placeholder = houseTypeByPrice.palace;
        break;
      default:
        break;
    }
  };

  var loadMainPhoto = function () {
    var file = fileChooserMainPhoto.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewPicMainPhoto.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };

  var loadAllPhotos = function () {

    var files = fileChooserAllPhoto.files;
    for (var i = 0; i < files.length; i++) {
      var fileName = files[i].name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function (evt) {
          if (previewPicAllPhotoBox.querySelector('img')) {
            previewPicAllPhotoBox = document.createElement('div');
            previewPicAllPhotoBox.classList.add('ad-form__photo');
            previewPicAllPhotoBox = previewPicAllPhotoContainer.appendChild(previewPicAllPhotoBox);
          }
          var img = document.createElement('img');
          img.src = evt.target.result;
          var previewPicAllPhoto = previewPicAllPhotoBox.appendChild(img);
          previewPicAllPhoto.width = '70';
          previewPicAllPhoto.height = '70';
        });
        reader.readAsDataURL(files[i]);
      }
    }
  };

  choiceOfHousingType.addEventListener('change', changeMinPrice);
  changeMinPrice();

  roomNumberSelect.addEventListener('change', validateCapacity);

  fileChooserMainPhoto.addEventListener('change', loadMainPhoto);

  fileChooserAllPhoto.addEventListener('change', loadAllPhotos);

  capacitySelect.addEventListener('change', validateCapacity);

  var changeTimeFieldValue = function (modifiedTimeField, relatedTimeField) {
    relatedTimeField.selectedIndex = modifiedTimeField.selectedIndex;
  };

  arriveTimeField.addEventListener('change', function () {
    changeTimeFieldValue(arriveTimeField, departureTimeField);
  });

  departureTimeField.addEventListener('change', function () {
    changeTimeFieldValue(departureTimeField, arriveTimeField);
  });

  document.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.back.sendForm(new FormData(adForm), function () {});
  });

  var deactivatedApplication = function (evt) {
    evt.preventDefault();
    adForm.reset();
    window.mapContainer.map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    setDeactivatedForm(true);
    window.filterForm.removePins();
    window.renderCards.removeCard();
    capacitySelect.value = GuestCount.oneGuest;
    window.mapContainer.mainPin.style.left = window.mapContainer.initiallyCoordinate.x + 'px';
    window.mapContainer.mainPin.style.top = window.mapContainer.initiallyCoordinate.y + 'px';
    window.mapContainer.addressField.value = window.mapContainer.mainPin.
    offsetLeft + ', ' + window.mapContainer.mainPin.offsetTop;
  };

  adFormReset.addEventListener('click', deactivatedApplication);
  window.form = {
    adForm: adForm,
    mapForm: mapForm,
    setDeactivatedForm: setDeactivatedForm,
  };
})();
