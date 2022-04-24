class SoundMap {

  constructor() {
    this.currentSoundIndex = -1;
    this.sounds = new Map();
  }

  addSound(sound) {
    if (!sound) throw new Error('The sound is required');
    this.sounds.set(sound.getSoundName(), sound);
    this.currentSoundIndex = this.sounds.size - 1;
  }

  existSoundName(soundName) {
    if (!soundName) throw new Error('The sound name is required');
    return this.sounds.has(soundName);
  }

  existSoundNameOrError(soundName) {
    if (!soundName) throw new Error('The sound name is required');
    if (!this.sounds.has(soundName)) throw new Error('Sound name not found');
    return true;
  }

  validateIndexOrError(soundIndex) {
    if (soundIndex < 0 || soundIndex > this.sounds.size - 1) throw new Error('The index of the sound must be between 0 and ' + (this.sounds.size - 1));
    return true;
  }

  getSoundByName(soundName) {
    this.existSoundNameOrError(soundName);
    return this.sounds.get(soundName);
  }

  getSoundByIndex(soundIndex) {
    this.validateIndexOrError(soundIndex);
    // this.sounds.Map((currElement, index) => {
    //   if (index == soundIndex) return currElement;
    // });
    return Array.from(this.sounds.values())[soundIndex];
  }

  getSoundNameByIndex(soundIndex) {
    this.validateIndexOrError();
    // this.sounds.map((currElement, index) => {
    //   if (index == soundIndex) return currElement.getSoundName();
    // });
    return Array.from(this.sounds.values())[soundIndex].getSoundName();
  }

  getSoundIndexByName(soundName) {
    this.existSoundNameOrError(soundName);
    return Array.from(this.sounds.keys()).indexOf(soundName);
  }

  getCurrentSound() {
    return this.getSoundByIndex(this.currentSoundIndex);
  }

  getCurrentSoundIndex() {
    return this.currentSoundIndex;
  }

  getCurrentSoundName() {
    return this.getCurrentSound().getSoundName();
  }

  setCurrentSoundByName(soundName) {
    this.existSoundNameOrError(soundName);
    this.currentSoundIndex = this.getSoundIndexByName(soundName);
  }

  setCurrentSoundByIndex(soundIndex) {
    this.validateIndexOrError();
    this.currentSoundIndex = soundIndex;
  }

  getCount() {
    return this.sounds.size;
  }

  nextSound() {
    this.currentSoundIndex++;
    if (this.currentSoundIndex >= this.sounds.size) {
      this.currentSoundIndex = 0;
    }
  }

  previousSound() {
    this.currentSoundIndex--;
    if (this.currentSoundIndex < 0) {
      this.currentSoundIndex = this.sounds.size - 1;
    }
  }
}