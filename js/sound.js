class Sound {
  constructor(soundName, volume, loop) {
    this.isPaused = true;
    this.audio = new Audio();
    if (soundName && volume && loop) this.initSound(soundName, volume, loop);
  }

  initSound(soundName, volume, loop) {
    this.volume = volume;
    this.audio.src = '../sounds/' + soundName;
    this.setVolume(volume);

    //INI CGV
    this.setVolume(0);
    //FIN CGV

    this.setLoop(loop);
  }

  getVolume() {
    return this.volume;
  }

  getVolumePercent() {
    return this.getVolume() + '%';
  }

  playSound() { 
    this.audio.play().then(() => { }, (err) => { });
  }

  stopSound() {
    this.audio.currentTime = 0;
    this.audio.pause();
  }

  pauseSound() {
    this.audio.pause();
  }

  setVolume(volume) {
    this.volume = volume > 100? 100 : volume;
    this.volume = volume < 0? 0 : volume;
    this.audio.volume = this.volume / 100;
  }

  setLoop(loop) {
    this.audio.loop = this.loop;
  }

  increaseVolume() {
    this.volume = this.volume + 1 > 100? 100 : this.volume + 1;
    this.setVolume(this.volume);
  }

  decreaseVolume() {
    this.volume = this.volume - 1 < 0? 0 : this.volume - 1;
    this.setVolume(this.volume);
  }
}


// this.sonidos = new Map();
// this.sonidoActual = '';
// this.sonidoActualValor = ''
// this.sonidoActualIndice = -1;
// this.audioSonido = new Sound();




// agregarSonido(nombre, sonido) {
//   this.sonidos.set(nombre, sonido);
// }

// cantidadSonidos() {
//   return this.sonidos.size;
// }

// indiceSonido(sonido) {
//   return Array.from(this.sonidos.keys()).indexOf(sonido);
// }

// valorSonido(sonido) {
//   return this.sonidos.get(sonido);
// }

// iniciarSonido(sonido) {
//   this.audioSonido.initSound(this.valorSonido(sonido), 100, false);
//   this.audioSonido.playSound();
// }

// detenerSonido() {
//   this.audioSonido.stopSound();
// }

// siguienteSonido() {
//   if (this.sonidos.size > 0) {
//     if (this.sonidoActual == '') {
//       this.sonidoActual = Array.from(this.sonidos)[0][0];
//       this.sonidoActualValor = this.valorSonido(this.sonidoActual);
//       this.sonidoActualIndice = this.indiceSonido(this.sonidoActual);
//     }
//     else {
//       ++this.sonidoActualIndice;
//       if (this.sonidoActualIndice >= this.sonidos.size) {
//         this.sonidoActualIndice = 0;
//       }
//       this.sonidoActual = Array.from(this.sonidos)[this.sonidoActualIndice][0];
//       this.sonidoActualValor = this.valorSonido(this.sonidoActual);
//     }
//   }
// }