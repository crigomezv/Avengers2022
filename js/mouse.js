var mouseX = 0;
var mouseY = 0;

this.mousemoveListener = window.addEventListener('mousemove', function(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
}, false);