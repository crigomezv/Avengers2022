class Sprite {
  constructor(nombre, clase, cicloDeVida, x, y, w, h, voltear, rotacionZ, rebotar) {
    
    this.id = '#' + nombre;
    this.nombre = nombre;
    this.clase = clase;
    $('body').append(`<div id="${nombre}" class="${clase}"></div>`); 
    this.objeto = $(this.id);
    this.cicloDeVida = cicloDeVida;

    this.esconder();
    this.estaVisible = false;
    
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    
    this.rebotar = rebotar;
    this.rotacionY = 0;
    this.rotacionZ = rotacionZ;
    this.voltear = voltear;
    this.voltearDisfraz(this.voltear);

    this.irA(x, y);

    this.disfraces = new Map();
    this.disfrazActual = '';
    this.disfrazActualValor = ''
    this.disfrazActualIndice = -1;

    this.sonidos = new Map();
    this.sonidoActual = '';
    this.sonidoActualValor = ''
    this.sonidoActualIndice = -1;
    this.audioSonido = new Sound();

    this.relojCicloDeVida = null;
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
      this.cicloDeVida();
    }, 1);
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
    let radianes = this.rotacionZ * (Math.PI / 180);
    this.x += pasos * Math.cos(radianes);
    this.y -= pasos * Math.sin(radianes);
    this.calcularEsquinas();
    this.irA(this.x, this.y);

    if (this.rebotar) {

      if (this.leftTop.x < 0) {
        this.x = 0;
        this.rotar(this.rotacionZ >= 90 && this.rotacionZ <= 180? -90: 90);
        let radianes = this.rotacionZ * (Math.PI / 180);
        this.x += pasos * Math.cos(radianes);
        this.y -= pasos * Math.sin(radianes);
      }

      if (this.rightTop.x > gameScreen.getWidth()) {
        this.x = gameScreen.getWidth() - this.w;
        this.rotar(this.rotacionZ >= 0 && this.rotacionZ < 90? 90: -90);
        let radianes = this.rotacionZ * (Math.PI / 180);
        this.x += pasos * Math.cos(radianes);
        this.y -= pasos * Math.sin(radianes);
      }

      if (this.leftTop.y < 0) {
        this.y = 0;
        this.rotar(this.rotacionZ >= 0 && this.rotacionZ <= 90? -90: 90);
        let radianes = this.rotacionZ * (Math.PI / 180);
        this.x += pasos * Math.cos(radianes);
        this.y -= pasos * Math.sin(radianes);
      }

      if (this.leftBottom.y > gameScreen.getHeight()) {
        this.y = gameScreen.getHeight() - this.h;
        this.rotar(this.rotacionZ >= 270 && this.rotacionZ < 360? +90: 90);
        let radianes = this.rotacionZ * (Math.PI / 180);
        this.x += pasos * Math.cos(radianes);
        this.y -= pasos * Math.sin(radianes);
      }

      //this.irA(this.x, this.y);
    }
    
    bb.writeOnlyOneLine(`rotacionZ: ${this.rotacionZ} x: ${this.x} y: ${this.y} ancho: ${gameScreen.getWidth()} altura: ${gameScreen.getHeight()}`);
  }

  transformacionRotacion() {
    return `rotateY(${this.rotacionY}deg) rotateZ(${-1 * this.rotacionZ}deg)`;
  }

  rotar(rotacionZ) {
    this.rotacionZ += rotacionZ;
    if (this.rotacionZ >= 360) this.rotacionZ = this.rotacionZ - 360;
    if (this.rotacionZ <= 0 ) this.rotacionZ = 360 + this.rotacionZ;

    // let a = this.rotacionZ;
    // let v = this.voltear;
    // if (a > 90 && a <= 270 && v == 'right') {
    //   this.voltearDisfraz('left');
    // } else if ((a > 270 && a <= 360 || a >= 0 && a <= 90) && v == 'left') {
    //   this.voltearDisfraz('right');
    // }

    this.setCss('transform', this.transformacionRotacion());
    bb.writeOnlyOneLine(`rotacionZ: ${this.rotacionZ} x: ${this.x} y: ${this.y} ancho: ${gameScreen.getWidth()} altura: ${gameScreen.getHeight()}`);
  }

  establecerAngulo(rotacionZ) {
    this.rotacionZ = rotacionZ;
    this.setCss('transform', this.transformacionRotacion());
  }

  apuntarHaciaPunteroDelRaton() {
    this.objeto.css('left', (mouseX + 1) + 'px');
    this.objeto.css('top', (mouseY + 1) + 'px');
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
    this.voltearDisfraz(this.voltear);
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

  voltearDisfraz(voltear) {
    this.voltear = voltear;
    if (voltear == 'right') {
      this.rotacionY = 0;
    }
    if (voltear == 'left') {
      this.rotacionY = 180;
    }
    this.setCss('transform', this.transformacionRotacion());
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
    this.audioSonido.initSound(this.valorSonido(sonido), 100, false);
    this.audioSonido.playSound();
  }

  detenerSonido() {
    this.audioSonido.stopSound();
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