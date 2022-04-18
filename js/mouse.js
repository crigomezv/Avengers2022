var mouseX = 0;
var mouseY = 0;

class Mouse {
  constructor() {
    this.mousemoveListener = window.addEventListener('mousemove', function(event) {
      mouseX = event.clientX;
      mouseY = event.clientY;
    }, false);
  }
}