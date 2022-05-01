class GameImageMap {

  constructor() {
    this.currentGameImageIndex = -1;
    this.gameImages = new Map();
    this.ready = false;
    //bb.writeOnlyOneLine('Loading gameImages...');
  }

  loadGameImagesFromJson(gameImagesJson) {
    for (let gameImage of gameImagesJson) {
      this.addGameImage(gameImage);
    }
  }

  addGameImage(gameImage) {
    if (gameImage === undefined) throw new Error('The gameImage is required');
    if (gameImage instanceof GameImage) {
      this.gameImages.set(gameImage.getGameImageName(), gameImage);
      this.currentGameImageIndex = this.gameImages.size - 1;
    }
    else {
      let jsonGameImage = GameImage.createFromJson(gameImage);
      this.gameImages.set(jsonGameImage.getGameImageName(), jsonGameImage);
      this.currentGameImageIndex = this.gameImages.size - 1;
    }
  }

  existGameImageName(gameImageName) {
    if (gameImageName === undefined) throw new Error('The gameImage name is required');
    return this.gameImages.has(gameImageName);
  }

  existGameImageNameOrError(gameImageName) {
    if (gameImageName === undefined) throw new Error('The gameImage name is required');
    if (!this.gameImages.has(gameImageName)) throw new Error('GameImage name not found');
    return true;
  }

  validateIndexOrError(gameImageIndex) {
    if (gameImageIndex < 0 || gameImageIndex > this.gameImages.size - 1) throw new Error('The index of the gameImage must be between 0 and ' + (this.gameImages.size - 1));
    return true;
  }

  getGameImageByName(gameImageName) {
    this.existGameImageNameOrError(gameImageName);
    return this.gameImages.get(gameImageName);
  }

  getGameImageByIndex(gameImageIndex) {
    this.validateIndexOrError(gameImageIndex);
    return Array.from(this.gameImages.values())[gameImageIndex];
  }

  getGameImageNameByIndex(gameImageIndex) {
    this.validateIndexOrError();
    return Array.from(this.gameImages.values())[gameImageIndex].getGameImageName();
  }

  getGameImageIndexByName(gameImageName) {
    this.existGameImageNameOrError(gameImageName);
    return Array.from(this.gameImages.keys()).indexOf(gameImageName);
  }

  getCurrentGameImage() {
    return this.getGameImageByIndex(this.currentGameImageIndex);
  }

  getCurrentGameImageIndex() {
    return this.currentGameImageIndex;
  }

  getCurrentGameImageName() {
    let currentGameImageName = this.getGameImageByIndex(this.currentGameImageIndex).gameImageName;
    return currentGameImageName;
  }

  setCurrentGameImageByName(gameImageName) {
    this.existGameImageNameOrError(gameImageName);
    this.currentGameImageIndex = this.getGameImageIndexByName(gameImageName);
  }

  setCurrentGameImageByIndex(gameImageIndex) {
    this.validateIndexOrError();
    this.currentGameImageIndex = gameImageIndex;
  }

  getCount() {
    return this.gameImages.size;
  }

  nextGameImage() {
    this.currentGameImageIndex++;
    if (this.currentGameImageIndex >= this.gameImages.size) {
      this.currentGameImageIndex = 0;
    }
  }

  previousGameImage() {
    this.currentGameImageIndex--;
    if (this.currentGameImageIndex < 0) {
      this.currentGameImageIndex = this.gameImages.size - 1;
    }
  }
}