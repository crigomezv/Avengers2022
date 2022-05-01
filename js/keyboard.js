class Keyboard {
  constructor(keyFunction) {
    this.keyFunction = keyFunction;
  }

  start() {
    document.addEventListener('keydown', this.keyFunction, true);
  } 

  stop() {
    document.removeEventListener('keydown', this.keyFunction, true);
  }
}