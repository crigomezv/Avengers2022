function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// $('#btnComenzar').click(function () {
//   $('#modal').css('display', 'none');
//   tocarSonido('../audio/ave.mp3');
// });

// function tocarSonido(sonido) {
//   audio = new Audio();
//   audio.src = sonido;
//   audio.play();
// }

// function moverHeroe(heroe, x, y, w, h) {
//   if (x) $(heroe).css('left',   x + 'px');
//   if (y) $(heroe).css('top',    y + 'px');
//   if (w) $(heroe).css('width',  w + 'px');
//   if (h) $(heroe).css('height', h + 'px');
// }

// function estaEntre(x, min, max) {
//   return x >= min && x <= max;
// }

// function getL(elemento) {
//   return $(elemento).css('left').replace('px', '');
// }

// function getR(elemento) {
//   return $(elemento).css('left').replace('px', '');
// }

// function obtenerCoordenadas(elemento) {
//   var x = $(elemento).css('left').replace('px', '');
//   var y = $(elemento).css('top').replace('px', '');
//   var w = $(elemento).css('width').replace('px', '');
//   var h = $(elemento).css('height').replace('px', '');
//   return {'x': x, 'y': y, 'w': w, 'h': h};
// }

// function detectarColision(objeto1, objeto2) {
//   var pos = obtenerCoordenadas(objeto1);
//   var pos2 = obtenerCoordenadas(objeto2);
//   var x = parseInt(pos.x);
//   var y = parseInt(pos.y);
//   var w = parseInt(pos.w);
//   var h = parseInt(pos.h);
//   var x2 = parseInt(pos2.x);
//   var y2 = parseInt(pos2.y);
//   var w2 = parseInt(pos2.w);
//   var h2 = parseInt(pos2.h);
  
//   let colisionEnX = (estaEntre(x2, x, x + w) || estaEntre(x2 + w2, x, x + w));
//   let colisionEnY = (estaEntre(y2, y, y + h) || estaEntre(y2 + h2, y, y + h));

//   if (colisionEnX && colisionEnY) {
//     return true;
//   } else {
//     return false;
//   }
//}
