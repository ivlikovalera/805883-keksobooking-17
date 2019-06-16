'use strict';
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
        'avatar': 'img/avatars/user0'+ avatarNumbers[i] +'.png'
      },
      'offer': {
        'type': types[i]
      },
      'location': {
        'x': getRandomInt(0, xCoordinate),
        'y': getRandomInt(130, 630)
      }
    };
};
console.log(similarAds);

/*
var firstName = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var lastName = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColor = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColor = ['black', 'red', 'blue', 'yellow', 'green'];
var listCharacters = [];

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

firstName = getShuffleArray(firstName);
lastName = getShuffleArray(lastName);
coatColor = getShuffleArray(coatColor);
eyesColor = getShuffleArray(eyesColor);

for (var i = 0; i <= 3; i++) {
  listCharacters[i] =
    {
      name: firstName[i] + ' ' + lastName[i],
      coatColor: coatColor[i],
      eyesColor: eyesColor[i]
    };
}
document.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
function renderWizard(wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
}

var fragment = document.createDocumentFragment();
for (var j = 0; j < listCharacters.length; j++) {
  fragment.appendChild(renderWizard(listCharacters[j]));
}
similarListElement.appendChild(fragment);
*/
