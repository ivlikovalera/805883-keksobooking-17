'use strict';

(function () {
  var ESC = 27;
  var SUCCESS = 'success';

  var transformNodeToArray = function (list) {
    return Array.from(list);
  };

  window.utils = {
    ESC: ESC,
    transformNodeToArray: transformNodeToArray,
    SUCCESS: SUCCESS,
  };
})();
