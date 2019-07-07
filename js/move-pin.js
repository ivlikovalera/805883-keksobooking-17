'use strict';

(function () {
  var draggedPin = function (evt) {

    evt.preventDefault();
    if (window.map.map.classList.contains('map--faded')) {
      window.map.onPinClick();
      window.map.mainPin.removeEventListener('click', window.map.onPinClick);
    }
    var Coordinate = function (x, y) {
      this.x = x;
      this.y = y;
    };
    var startCoords = new Coordinate(evt.clientX, evt.clientY);

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = new Coordinate(startCoords.x - moveEvt.clientX, startCoords.y - moveEvt.clientY);
      startCoords.x = moveEvt.clientX;
      startCoords.y = moveEvt.clientY;
      var currentCoordY = window.map.mainPin.offsetTop - shift.y;
      var currentCoordX = window.map.mainPin.offsetLeft - shift.x;

      if ((currentCoordY >= window.map.APPLICATION_HEIGHT.MIN) &&
      (currentCoordY <= window.map.APPLICATION_HEIGHT.MAX)) {
        window.map.mainPin.style.top = currentCoordY + 'px';
      }
      if ((currentCoordX >= window.map.APPLICATION_WIDTH.MIN) &&
      (currentCoordX <= window.map.APPLICATION_WIDTH.MAX - window.map.PIN.WIDTH)) {
        window.map.mainPin.style.left = currentCoordX + 'px';
      }
      window.map.addressField.value =
      window.map.mainPin.offsetLeft + window.map.PIN.WIDTH / 2 + ', ' + window.map.mainPin.offsetTop;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
  window.movePin = {
    draggedPin: draggedPin
  };
})();
