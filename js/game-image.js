class GameImage {
  constructor(
      gameImageParentName, gameImageName, gameImagePath, gameImageFile
    , width, height, rotateX, rotateY, rotateZ, flip) 
  {
    if (!ValidationTools.isAnyUndef(
          gameImageParentName, gameImageName, gameImagePath, gameImageFile
          , width, height, rotateX, rotateY, rotateZ, flip))
      this.init(gameImageParentName, gameImageName, gameImagePath, gameImageFile
        , width, height, rotateX, rotateY, rotateZ, flip);
  }
  
  ckeckProp(propName, propValue) {
    if (propName === 'gameImageParentName') ValidationTools.checkEmpty('gameImageParentName', propValue);
    if (propName === 'gameImageName') ValidationTools.checkEmpty('gameImageName', propValue);
    if (propName === 'gameImagePath') ValidationTools.checkEmpty('gameImagePath', propValue);
    if (propName === 'gameImageFile') ValidationTools.checkEmpty('gameImageFile', propValue);
    if (propName === 'gameImageSrc') ValidationTools.checkUrl('gameImageSrc', propValue);
    if (propName === 'width') ValidationTools.checkZeroOrPositive('width', propValue);
    if (propName === 'height') ValidationTools.checkZeroOrPositive('height', propValue);
    if (propName === 'rotateX') ValidationTools.checkDegree360('rotateX', propValue);
    if (propName === 'rotateY') ValidationTools.checkDegree360('rotateY', propValue);
    if (propName === 'rotateZ') ValidationTools.checkDegree360('rotateZ', propValue);
    if (propName === 'flip') ValidationTools.checkFlip('flip', propValue);
    return true;
  }

  init(gameImageParentName, gameImageName, gameImagePath, gameImageFile
      , width, height, rotateX, rotateY, rotateZ, flip) {
    this.ckeckProp('gameImageParentName', gameImageParentName);
    this.ckeckProp('gameImageName', gameImageName);
    this.ckeckProp('gameImagePath', gameImagePath);
    this.ckeckProp('gameImageFile', gameImageFile);
    this.ckeckProp('width', width);
    this.ckeckProp('height', height);
    this.ckeckProp('rotateX', rotateX);
    this.ckeckProp('rotateY', rotateY);
    this.ckeckProp('rotateZ', rotateZ);
    this.ckeckProp('flip', flip);

    this.image = new Image(width, height);

    this.ready = false;
    this.setGameImageName(gameImageParentName, gameImageName);
    this.setGameImageSrc(gameImagePath, gameImageFile);
    this.setWidth(width);
    this.setHeight(height);
    this.rotateX = rotateX;
    this.rotateY = rotateY;
    this.rotateZ = rotateZ;
    this.flip = flip;
    this.setRotate(rotateX, rotateY, rotateZ);
  }

  setGameImageName(gameImageParentName, gameImageName) {
    this.ckeckProp('gameImageParentName', gameImageParentName);
    this.ckeckProp('gameImageName', gameImageName);
    this.gameImageParentName = gameImageParentName;
    this.gameImageName = gameImageName;
    this.id = `${this.gameImageParentName}-${this.gameImageName}`;
    this.image.id = this.id;
  }

  getGameImageObjectName() {
    return this.gameImageParentName;
  }

  getGameImageName() {
    return this.gameImageName;
  }

  getGameImageId() {
    return this.id;
  }
  
  setGameImageSrc(gameImagePath, gameImageFile) {
    this.ckeckProp('gameImagePath', gameImagePath);
    this.ckeckProp('gameImageFile', gameImageFile);
    this.ckeckProp('gameImageSrc', gameImagePath + gameImageFile);
    this.gameImagePath = gameImagePath;
    this.gameImageFile = gameImageFile;
    if (this.gameImageSrc !== this.gameImagePath + this.gameImageFile) {
      this.gameImageSrc = this.gameImagePath + this.gameImageFile;
      this.ready = false;
      this.image.src = this.gameImageSrc;
      this.image.onload = function() {
        this.ready = true;
      }
    }
  }

  getGameImageSrc() {
    return this.gameImageSrc;
  }

  setWidth(width) {
    this.ckeckProp('width', width);
    this.width = width;
    this.image.width = this.width + 'px';
  }

  getWidth() {
    return this.width;
  }

  setHeight(height) {
    this.ckeckProp('height', height);
    this.height = height;
    this.image.height = this.height + 'px';
  }

  getHeight() {
    return this.height;
  }

  setRotate(rotateX, rotateY, rotateZ) {
    this.ckeckProp('rotateX', rotateX);
    this.ckeckProp('rotateY', rotateY);
    this.ckeckProp('rotateZ', rotateZ);
    this.rotateX = rotateX;

    if (this.flip == 'right')
      this.rotateY = 0;
    else if (this.flip == 'left')
      this.rotateY = 180;
    else if (this.flip == 'none')
      this.rotateY = rotateY;
    else
      throw new Error('The value of flip must be: left, right or none');

    this.rotateZ = rotateZ;
    this.image.style.transform 
      = `rotateX(${this.rotateX}deg) `
      + `rotateY(${this.rotateY}deg) `
      + `rotateZ(${this.rotateZ}deg)`;
  }

  setRotateX(rotateX) {
    this.ckeckProp('rotateX', rotateX);
    this.rotateX = rotateX;
    if (this.rotateY === undefined) this.rotateY = 0;
    if (this.rotateZ === undefined) this.rotateZ = 0;
    this.setRotate(this.rotateX, this.rotateY, this.rotateZ);
  }

  getRotatetX() {
    return this.rotateX;
  }

  setRotateY(rotateY) {
    this.ckeckProp('rotateY', rotateY);
    this.rotateY = rotateY;
    if (this.rotateX === undefined) this.rotateX = 0;
    if (this.rotateZ === undefined) this.rotateZ = 0;
    this.setRotate(this.rotateX, this.rotateY, this.rotateZ);
  }

  getRotateY() {
    return this.rotateY;
  }

  setRotateZ(rotateZ) {
    this.ckeckProp('rotateZ', rotateZ);
    this.rotateZ = rotateZ;
    if (this.rotateX === undefined) this.rotateX = 0;
    if (this.rotateY === undefined) this.rotateY = 0;
    this.setRotate(this.rotateX, this.rotateY, this.rotateZ);
  }

  getRotateZ() {
    return this.rotateZ;
  }

  setFlip(flip) {
    this.ckeckProp('flip', flip);
    this.flip = flip; 
    if (this.rotateX === undefined) this.rotateX = 0;
    if (this.rotateZ === undefined) this.rotateZ = 0;
    this.setRotate(this.rotateX, this.rotateY, this.rotateZ);
  }

  initGameImageFromJson(jsonObject) {
    let json = JsonTools.parse(jsonObject);
    this.init(json.gameImageParentName, json.gameImageName, json.gameImagePath, json.gameImageFile
      , json.width, json.height, json.rotateX, json.rotateY, json.rotateZ, json.flip);
  }

  static createFromJson(jsonObject) {
    let json = JsonTools.parse(jsonObject);
    return new GameImage(json.gameImageParentName, json.gameImageName, json.gameImagePath, json.gameImageFile
      , json.width, json.height, json.rotateX, json.rotateY, json.rotateZ, json.flip);
  }
}