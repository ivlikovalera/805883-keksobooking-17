'use strict';

(function () {
  var DELAY = 500;
  var stopBounce = function (param) {
    setTimeout(param, DELAY);
  };

  window.stopBounce = stopBounce;
})();
