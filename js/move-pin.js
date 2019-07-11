'use strict';

(function () {
  var draggedPin = function (evt) {

    evt.preventDefault();
    if (window.mapContainer.map.classList.contains('map--faded')) {
      window.mapContainer.onPinClick();
      window.mapContainer.mainPin.removeEventListener('click', window.mapContainer.onPinClick);
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
      var currentCoordY = window.mapContainer.mainPin.offsetTop - shift.y;
      var currentCoordX = window.mapContainer.mainPin.offsetLeft - shift.x;

      if ((currentCoordY >= window.mapContainer.APPLICATION_HEIGHT.MIN) &&
      (currentCoordY <= window.mapContainer.APPLICATION_HEIGHT.MAX)) {
        window.mapContainer.mainPin.style.top = currentCoordY + 'px';
      }
      if ((currentCoordX >= window.mapContainer.APPLICATION_WIDTH.MIN) &&
      (currentCoordX <= window.mapContainer.APPLICATION_WIDTH.MAX - window.mapContainer.PIN.WIDTH)) {
        window.mapContainer.mainPin.style.left = currentCoordX + 'px';
      }
      window.mapContainer.addressField.value =
      window.mapContainer.mainPin.offsetLeft + window.mapContainer.PIN.WIDTH / 2 + ', ' + window.mapContainer.mainPin.offsetTop;
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
