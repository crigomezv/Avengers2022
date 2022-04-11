var mouseX = 0;
var mouseY = 0;
var puntaje = 0;
var vidas = 0;
var fechaDeMuerte = null;
var sonidoShield = 0;
var audio = null;
var audioSonido = null;
var audioCancion = null;

function iniciarSonido(sonido) {
  if (audioSonido) {
    audioSonido.pause();
    audioSonido = null;
  }
  audioSonido = new Audio();
  audioSonido.src = 'sonidos/' + sonido;
  audioSonido.play();
}

function detenerSonido() {
  if (audioSonido) {
    audioSonido.pause();
    audioSonido = null;
  }
}

function iniciarCancion(cancion) {
  if (audioCancion) {
    audioCancion.pause();
    audioCancion = null;
  }
  audioCancion = new Audio();
  audioCancion.src = 'sonidos/' + cancion;
  audioCancion.play();
}

function detenerCancion() {
  if (audioCancion) {
    audioCancion.pause();
    audioCancion = null;
  }
}

this.mousemoveListener = window.addEventListener('mousemove', function(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
}, false);

function escribirEnPizarraComun(texto) {
  $('#pizarra_comun').html(texto);
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Sprite {
  constructor(nombre, clase, cicloDeVida, x, y, w, h) {
    
    this.id = '#' + nombre;
    this.nombre = nombre;
    this.clase = clase;
    $('#game_screen').append(`<div id="${nombre}" class="${clase}"></div>`); 
    this.objeto = $(this.id);
    this.cicloDeVida = cicloDeVida;

    this.esconder();
    this.estaVisible = false;
    
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.irA(x, y);

    this.disfraces = new Map();
    this.disfrazActual = '';
    this.disfrazActualValor = ''
    this.disfrazActualIndice = -1;

    this.anguloRotacion = 0;

    this.sonidos = new Map();
    this.sonidoActual = '';
    this.sonidoActualValor = ''
    this.sonidoActualIndice = -1;

    this.audioSonido = null;

    this.relojCicloDeVida = null;
    this.mousemoveListener = null;
  }

  calcularEsquinas() {
    this.leftTop = new Point(this.x, this.y);
    this.rightTop = new Point(this.x + this.w, this.y);
    this.leftBottom = new Point(this.x, this.y + this.h);
    this.rightBottom = new Point(this.x + this.w, this.y + this.h);
  }

  comenzarCicloDeVida() {
    this.relojCicloDeVida = setInterval(() => {
      this.x = parseInt($(this.id).css('left').replace('px', ''));
      this.y = parseInt($(this.id).css('top').replace('px', ''));
      this.w = parseInt($(this.id).css('width').replace('px', ''));
      this.h = parseInt($(this.id).css('height').replace('px', ''));
      this.calcularEsquinas();
      
      // if ($(this.cicloDeVida)) {
      //   $(this.cicloDeVida).click();
      // }
      this.cicloDeVida();
    });
  }

  escribirEnPizarra(texto) {
    $('#pizarra_' + this.nombre).html(texto);
  }

  escribirCoordenadasEnPizarra() {
    $('#pizarra_' + this.nombre).html(`x: ${this.x} y: ${this.y} w: ${this.w} h: ${this.h}`);
  }

  detenerCicloDeVida() {
    clearInterval(this.relojCicloDeVida);
  }

  getCss(propiedad) {
    return this.objeto.css(propiedad);
  }

  setCss(propiedad, valor) {
    this.objeto.css(propiedad, valor);
  }

  irA(x, y) {
    this.x = x;
    this.y = y;
    this.calcularEsquinas();
    this.setCss('left', x + 'px');
    this.setCss('top',  y + 'px');
  }

  mover(pasos) {
    this.irA(this.x + pasos, this.y);
    if (this.rightTop.x < 0) {
      this.irA($(window).width(), this.y);
      this.mostrar();
    }
  }

  apuntarHaciaPunteroDelRaton() {
    this.objeto.css('left', mouseX + 'px');
    this.objeto.css('top', mouseY + 'px');
  }

  agregarDisfraz(nombre, imagen, width, height) {
    this.disfraces.set(nombre, {url: 'disfraces/' + imagen, width: width, height: height});
  }

  cantidadDisfraces() {
    return this.disfraces.size;
  }

  indiceDisfraz(disfraz) {
    return Array.from(this.disfraces.keys()).indexOf(disfraz);
  }

  valorDisfraz(disfraz) {
    return this.disfraces.get(disfraz);
  }

  cambiarDisfrazA(disfraz) {
    this.disfrazActual = disfraz;
    this.disfrazActualValor = this.valorDisfraz(disfraz);
    this.disfrazActualIndice = this.indiceDisfraz(disfraz);
    this.w = this.disfraces.get(disfraz).width;
    this.h = this.disfraces.get(disfraz).height; 
    this.calcularEsquinas();
    this.setCss('width', this.w);
    this.setCss('height', this.h);
    this.setCss('height', this.h);
    this.setCss('transform', `rotateY(${this.anguloRotacion}deg)`);
    this.setCss('background-image', 'url(' + this.disfraces.get(disfraz).url + ')');
  }

  siguienteDisfraz() {
    if (this.disfraces.size > 0) {
      if (this.disfrazActual == '') {
        this.disfrazActual = Array.from(this.disfraces)[0][0];
        this.disfrazActualValor = this.valorDisfraz(this.disfrazActual);
        this.disfrazActualIndice = this.indiceDisfraz(this.disfrazActual);
      }
      else {
        ++this.disfrazActualIndice;
        if (this.disfrazActualIndice >= this.disfraces.size) {
          this.disfrazActualIndice = 0;
        }
        this.disfrazActual = Array.from(this.disfraces)[this.disfrazActualIndice][0];
        this.disfrazActualValor = this.valorDisfraz(this.disfrazActual);
      }
    }
  }

  rotar(angulo) {
    this.anguloRotacion += angulo;
    this.setCss('transform', `rotateY(${this.anguloRotacion}deg)`);
  }

  establecerAngulo(angulo) {
    this.anguloRotacion = angulo;
    this.setCss('transform', `rotateY(${this.anguloRotacion}deg)`);
  }

  agregarSonido(nombre, sonido) {
    this.sonidos.set(nombre, sonido);
  }

  cantidadSonidos() {
    return this.sonidos.size;
  }

  indiceSonido(sonido) {
    return Array.from(this.sonidos.keys()).indexOf(sonido);
  }

  valorSonido(sonido) {
    return this.sonidos.get(sonido);
  }

  iniciarSonido(sonido) {
    if (this.audioSonido) {
      this.detenerSonido();
    }
    this.audioSonido = new Audio();
    this.audioSonido.src = this.sonidos.get(sonido);
    this.audioSonido.play();
    // audioSonido.src = this.sonidos.get(sonido);
    // audioSonido.play();
    // $('audio').src = this.sonidos.get(sonido);
    // $('audio').play();
  }

  detenerSonido() {
    this.audioSonido.pause();
    this.audioSonido.currentTime = 0;
    this.audioSonido = null;
  }

  siguienteSonido() {
    if (this.sonidos.size > 0) {
      if (this.sonidoActual == '') {
        this.sonidoActual = Array.from(this.sonidos)[0][0];
        this.sonidoActualValor = this.valorSonido(this.sonidoActual);
        this.sonidoActualIndice = this.indiceSonido(this.sonidoActual);
      }
      else {
        ++this.sonidoActualIndice;
        if (this.sonidoActualIndice >= this.sonidos.size) {
          this.sonidoActualIndice = 0;
        }
        this.sonidoActual = Array.from(this.sonidos)[this.sonidoActualIndice][0];
        this.sonidoActualValor = this.valorSonido(this.sonidoActual);
      }
    }
  }

  cambiarDisfrazConSonido(disfraz, sonido) {
    this.cambiarDisfrazA(disfraz);
    this.iniciarSonido(sonido);
  }

  tocando(sprite) {
    let thisLT = this.puntoEstaDentro(this.leftTop, sprite.leftTop, sprite.rightTop, sprite.leftBottom);
    let thisRT = this.puntoEstaDentro(this.rightTop, sprite.leftTop, sprite.rightTop, sprite.leftBottom);
    let thisRB = this.puntoEstaDentro(this.rightBottom, sprite.leftTop, sprite.rightTop, sprite.leftBottom);
    let thisLB = this.puntoEstaDentro(this.leftBottom, sprite.leftTop, sprite.rightTop, sprite.leftBottom);

    let spriteLT = this.puntoEstaDentro(sprite.leftTop, this.leftTop, this.rightTop, this.leftBottom);
    let spriteRT = this.puntoEstaDentro(sprite.rightTop, this.leftTop, this.rightTop, this.leftBottom);
    let spriteRB = this.puntoEstaDentro(sprite.rightBottom, this.leftTop, this.rightTop, this.leftBottom);
    let spriteLB = this.puntoEstaDentro(sprite.leftBottom, this.leftTop, this.rightTop, this.leftBottom);

    // let texto = '';
    // texto += `${this.nombre} LT(${thisLT}) RT(${thisRT}) RB(${thisRB}) LB(${thisLB})<br>`;
    // texto += `${sprite.nombre} LT(${spriteLT}) RT(${spriteRT}) RB(${spriteRB}) LB(${spriteLB})<br>`;
    // escribirEnPizarraComun(texto);

    return (thisLT || thisRT || thisRB || thisLB || spriteLT || spriteRT || spriteRB || spriteLB);
  }

  puntoEstaDentro(punto, leftTop, rightTop, leftBottom) {
    let checkX = punto.x >= leftTop.x && punto.x <= rightTop.x;
    let checkY = punto.y >= leftTop.y && punto.y <= leftBottom.y;
    return checkX && checkY;
  }

  mostrar() {
    this.objeto.show();
    this.estaVisible = true;
  }

  esconder() {
    this.objeto.hide();
    this.estaVisible = false;
  }
}

$(document).ready(function(){

  var relojCicloDeVida = null;

  let cap = new Sprite('cap', 'cap', cicloDeVidaCap, 0, 0, 250, 150);
  cap.agregarDisfraz('capwalk', 'capwalk.gif', 103, 126);
  cap.agregarDisfraz('capshield', 'capshield.gif', 200, 150);
  cap.agregarDisfraz('caphand', 'caphand.gif', 237, 122);
  cap.agregarDisfraz('capdeath', 'capdeath.gif', 103, 126);
  cap.cambiarDisfrazA('capwalk');
  cap.agregarSonido('capshield0', 'sonidos/capshield0.mp3');
  cap.agregarSonido('capshield1', 'sonidos/capshield1.mp3');
  cap.agregarSonido('capshield2', 'sonidos/capshield2.mp3');
  cap.agregarSonido('capshield3', 'sonidos/capshield3.mp3');
  cap.agregarSonido('capshield4', 'sonidos/capshield4.mp3');
  cap.agregarSonido('capshield5', 'sonidos/capshield5.mp3');
  cap.agregarSonido('capshield6', 'sonidos/capshield6.mp3');
  cap.agregarSonido('capshield7', 'sonidos/capshield7.mp3');
  debugger
  let chi = new Sprite('chi', 'chi', cicloDeVidaChi, 500, 200, 115, 183);
  chi.agregarDisfraz('chitauri', 'chitauri.png', 115, 183);
  chi.cambiarDisfrazA('chitauri');
  chi.agregarSonido('gritoshi1', 'sonidos/tackle.mp3');
  
  let chi2 = new Sprite('chi2', 'chi', 500, 600, 115, 183);
  chi2.agregarDisfraz('chitauri', 'chitauri.png', 115, 183);
  chi2.cambiarDisfrazA('chitauri');
  chi2.agregarSonido('gritoshi1', 'sonidos/tackle.mp3');

  $('#comenzar').click(function(){ 
    
    $(document).keydown(function(e) {
      var key = e.keyCode || e.which;
      if (key == 49) {
        cap.siguienteSonido();
        cap.cambiarDisfrazConSonido('capshield', cap.sonidoActual);
      }
      if (key == 50) cap.cambiarDisfrazA('caphand');
      if (key == 48) {
        //cap.iniciarSonido('capshield0');
        tocarSonido('sonidos/ave.mp3');
      }
      setTimeout(function() { cap.cambiarDisfrazA('capwalk'); }, 500);
    });
    
    puntaje = 0;
    vidas = 3;
    tocado = false;

    iniciarCancion('capsong1.mp3');
    
    chi.escribirEnPizarra(`vidas: ${vidas}`);
    cap.escribirEnPizarra(`puntaje: ${puntaje}`);
    
    cap.irA(0, 60);
    cap.mostrar();
    cap.comenzarCicloDeVida();
    
    chi.mostrar();
    chi.comenzarCicloDeVida();
    chi2.mostrar();
    chi2.comenzarCicloDeVida();

    relojCicloDeVida = setInterval(cicloDeVidaDelJuego);
  });

  $('#detener').click(function(){
    detenerCancion();
    clearInterval(relojCicloDeVida);
    cap.detenerCicloDeVida();
    chi.detenerCicloDeVida();
    cap.esconder();
    chi.esconder();
  });

  function cicloDeVidaDelJuego() {
    if (mouseX >= cap.x + 3) {
      cap.establecerAngulo(0);
      escribirEnPizarraComun('derecha');
    }
    if (mouseX <= cap.x - 3) {
      cap.establecerAngulo(180);
      escribirEnPizarraComun('izquierda');
    }
    cap.apuntarHaciaPunteroDelRaton();
    
  }

  function cicloDeVidaCap() {
    if (cap.tocando(chi)) {
      if (!tocado) {
        if (cap.disfrazActual == 'capshield' || cap.disfrazActual == 'caphand') {
          chi.iniciarSonido('gritoshi1');
          puntaje += 1;
          chi.esconder();
        } 
        else if (chi.estaVisible) {
          iniciarSonido('cappain.mp3');
          fechaDeMuerte = new Date();
          vidas -= 1;
        }
        cap.escribirEnPizarra(`vidas: ${vidas}`);
        chi.escribirEnPizarra(`puntaje=${puntaje}`);
        tocado = true;
        if (vidas <= 0) {
          cap.escribirEnPizarra('GAME OVER');
          // clearInterval(relojCicloDeVida);
          // cap.detenerCicloDeVida();
          // chi.detenerCicloDeVida();
          setTimeout(function() { 
            // cap.esconder();
            // chi.esconder();
            $('#detener').click();
          }, 2000);
        }
      }
    } 
    else {
      tocado = false;
    }

    if (fechaDeMuerte == null) {
      escribirEnPizarraComun('VIVO');
    } else {
      cap.cambiarDisfrazA('capdeath');
      var endDate   = new Date();
      var seconds = (endDate.getTime() - fechaDeMuerte.getTime()) / 1000;
      escribirEnPizarraComun('MUERTE EN ' + seconds + ' SEGUNDOS');
      if (seconds > 0.5) {
        fechaDeMuerte = null;
        cap.cambiarDisfrazA('capwalk');
      }
    }
  }

  function cicloDeVidaChi() {
    chi.mover(-5);
  }

});