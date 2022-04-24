class Sound {
  constructor(soundName, soundPath, soundFile, volume, loop) {
    if (!soundName) throw new Error('Sound name is required');
    if (!soundPath) throw new Error('Sound path is required');
    if (!soundFile) throw new Error('Sound file is required');

    this.soundName = soundName;
    this.soundPath = soundPath;
    this.soundFile = soundFile;

    this.audio = new Audio();
    this.setSoundPath(soundPath);
    this.initSound(volume, loop);
  }

  initSound(volume, loop) {
    this.setVolume(volume);
    this.setLoop(loop);
    this.audio.load();
  }

  setSoundName(soundName) {
    this.soundName = soundName;
  }

  getSoundName() {
    return this.soundName;
  }

  setSoundPath(soundPath) {
    this.soundPath = soundPath;
    this.audio.src = this.soundPath + this.soundFile;
  }

  getSoundPath() {
    return this.soundPath;
  }

  setSoundFile(soundFile) {
    this.soundFile = soundFile;
    this.audio.src = this.soundPath + this.soundFile;
  }

  getSoundFile() {
    return this.soundFile;
  }

  validateVolumeOrError(volume) {
    if (volume < 0 || volume > 100) throw new Error('The volume percent of the sound must be between 0 and 100');
    return true;
  }

  setVolume(volume) {
    this.validateVolumeOrError(volume);
    this.audio.volume = volume / 100;
  }
  
  getVolume() {
    return Math.round(this.audio.volume * 100);
  }

  getVolumePercent() {
    return 'Volume: ' + this.getVolume() + '%';
  }

  setLoop(loop) {
    this.audio.loop = loop;
  }

  getLoop() {
    return this.audio.loop;
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

  increaseVolume() {
    this.setVolume(this.getVolume() + 1);
  }

  decreaseVolume() {
    this.setVolume(this.getVolume() - 1);
  }
}