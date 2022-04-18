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