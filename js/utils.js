'use strict';

(function () {
  var ESC = 27;

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var getShuffleArray = function (values) {
    for (var i = values.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = values[i];
      values[i] = values[j];
      values[j] = temp;
    }
    return values;
  };

  window.utils = {
    getRandomInt: getRandomInt,
    getShuffleArray: getShuffleArray,
    ESC: ESC,
  };
})();
