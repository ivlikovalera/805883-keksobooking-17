'use strict';

(function () {
  var stopBounce = function (param) {
    setTimeout(param, 500);
  };

  window.stopBounce = stopBounce;
})();
