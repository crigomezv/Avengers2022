class Sprite {
  constructor(name, cloneNumber, className
    , x, y, width, height, rotateX, rotateY, rotateZ, flip
    , onEdgeBounce, bounceAngleZ, gameScreen, lifeCycleFunction)
  {
    this.clones = [];
    this.costumes = new GameImageMap();
    this.sounds = new SoundMap();

    if (!ValidationTools.isAnyUndef(
          name, cloneNumber, className
        , x, y, width, height
        , rotateX, rotateY, rotateZ, flip
        , onEdgeBounce, bounceAngleZ, gameScreen, lifeCycleFunction))
      this.init(
          name, cloneNumber, className
        , x, y, width, height, rotateX, rotateY, rotateZ, flip
        , onEdgeBounce, bounceAngleZ, gameScreen, lifeCycleFunction
      );
  }

  ckeckProp(propName, propValue) {
    if (propName === 'name') ValidationTools.checkEmpty('name', propValue);
    if (propName === 'cloneNumber') ValidationTools.checkZeroOrPositive('cloneNumber', propValue);
    if (propName === 'className') ValidationTools.checkEmpty('className', propValue);
    if (propName === 'x') ValidationTools.checkNumber('x', propValue);
    if (propName === 'y') ValidationTools.checkNumber('y', propValue);
    if (propName === 'width') ValidationTools.checkZeroOrPositive('width', propValue);
    if (propName === 'height') ValidationTools.checkZeroOrPositive('height', propValue);
    if (propName === 'rotateX') ValidationTools.checkDegree360('rotateX', propValue);
    if (propName === 'rotateY') ValidationTools.checkDegree360('rotateY', propValue);
    if (propName === 'rotateZ') ValidationTools.checkDegree360('rotateZ', propValue);
    if (propName === 'flip') ValidationTools.checkFlip('flip', propValue);
    if (propName === 'onEdgeBounce') ValidationTools.checkBoolean('onEdgeBounce', propValue);
    if (propName === 'bounceAngleZ') ValidationTools.checkDegree360('bounceAngleZ', propValue);
    if (propName === 'gameScreen') ValidationTools.ckechIsInstanceOfGameScreen('gameScreen', propValue);
    if (propName === 'lifeCycleFunction') ValidationTools.checkFunction('lifeCycleFunction', propValue);
    return true;
  }

  ckeckProperties(name, cloneNumber, className
    , x, y, width, height, rotateX, rotateY, rotateZ, flip
    , onEdgeBounce, bounceAngleZ, gameScreen, lifeCycleFunction) 
  {
    this.ckeckProp('name', name);
    this.ckeckProp('cloneNumber', cloneNumber);
    this.ckeckProp('className', className);
    this.ckeckProp('x', x);
    this.ckeckProp('y', y);
    this.ckeckProp('width', width);
    this.ckeckProp('height', height);
    this.ckeckProp('rotateX', rotateX);
    this.ckeckProp('rotateY', rotateY);
    this.ckeckProp('rotateZ', rotateZ);
    this.ckeckProp('flip', flip);
    this.ckeckProp('onEdgeBounce', onEdgeBounce);
    this.ckeckProp('bounceAngleZ', bounceAngleZ);
    this.ckeckProp('gameScreen', gameScreen);
    this.ckeckProp('lifeCycleFunction', lifeCycleFunction);
  }

  init(name, cloneNumber, className
    , x, y, width, height, rotateX, rotateY, rotateZ, flip
    , onEdgeBounce, bounceAngleZ, gameScreen, lifeCycleFunction) 
  {
    this.ckeckProperties(name, cloneNumber, className
      , x, y, width, height, rotateX, rotateY, rotateZ, flip
      , onEdgeBounce, bounceAngleZ, gameScreen, lifeCycleFunction) 

    this.clones = [];
    this.costumes = new GameImageMap();
    this.sounds = new SoundMap();

    this.name = name;

    this.cloneName = name + cloneNumber;
    this.cloneNumber = cloneNumber;
    
    this.className = className;

    this.id = '#' + name + cloneNumber;
    $('body').append(`<div id="${this.cloneName}" class="${this.className}"></div>`); 
    this.HTMLElement = $(this.id);

    this.gameScreen = gameScreen;
    this.lifeCycleFunction = lifeCycleFunction;
    this.lifeCycleClock = null;

    this.hide();
    this.isVisible = false;

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.onEdgeBounce = onEdgeBounce;
    this.directionOfLastBounce = 'no-bounce';
    this.rotateX = rotateX;
    this.rotateY = rotateY;
    this.rotateZ = rotateZ;
    this.bounceAngleZ = bounceAngleZ;
    this.flip = flip;
    this.flipCostume(this.flip);

    this.lifes = 3;
    this.score = 3;

    this.goTo(x, y);
  }

  initFromJson(jsonObject, gameScreen, lifeCycleFunction)  {
    let json = JsonTools.parse(jsonObject);
    this.init(json.name, json.cloneNumber, json.className
      , json.x, json.y, json.width, json.height, json.rotateX, json.rotateY, json.rotateZ, json.flip
      , json.onEdgeBounce, json.bounceAngleZ, gameScreen, lifeCycleFunction);
    this.costumes.loadGameImagesFromJson(json.costumes);
    this.sounds.loadSoundsFromJson(json.sounds);
  }

  createClones(numberOfClones, jsonObject, gameScreen, chiLifeCycle) {
    let clones = []
    for (let cloneNumber = 1; cloneNumber <= numberOfClones; cloneNumber++) {
      let jsonobj = JsonTools.parse(jsonObject);
      let bakCloneNumber = jsonobj.cloneNumber;
      jsonobj.cloneNumber = cloneNumber;
      let clone = new Sprite();
      clone.initFromJson(jsonobj, gameScreen, chiLifeCycle)
      clones.push(clone);
      jsonobj.cloneNumber = bakCloneNumber;
    }
    for (let clone of clones) {
      clone.clones = clones;
    }
    this.clones = clones;
  }

  calculateCorners() {
    this.leftTop = new Point(this.x, this.y);
    this.rightTop = new Point(this.x + this.width, this.y);
    this.leftBottom = new Point(this.x, this.y + this.height);
    this.rightBottom = new Point(this.x + this.width, this.y + this.height);
  }

  startLifeCycle() {
    this.lifeCycleClock = setInterval(() => {
      this.x = parseInt($(this.id).css('left').replace('px', ''));
      this.y = parseInt($(this.id).css('top').replace('px', ''));
      this.width = parseInt($(this.id).css('width').replace('px', ''));
      this.height = parseInt($(this.id).css('height').replace('px', ''));
      this.calculateCorners();
      this.lifeCycleFunction(this);
    }, 0);
  }

  writeOnTheBoard(html) {
    $(`#${this.name}_board`).html(html);
  }

  writeCoordinatesOnTheBoard() {
    $(`#${this.name}_board`).html(`x: ${this.x} y: ${this.y} w: ${this.width} h: ${this.height}`);
  }

  stopLifeCycle() {
    clearInterval(this.lifeCycleClock);
    for (let clone of this.clones) {
      clearInterval(clone.lifeCycleClock);
      clone.hide();
    }
  }

  getCss(propertyName) {
    return this.HTMLElement.css(propertyName);
  }

  setCss(propertyName, value) {
    this.HTMLElement.css(propertyName, value);
  }

  goTo(x, y) {
    this.x = x;
    this.y = y;
    this.calculateCorners();
    this.setCss('left', x + 'px');
    this.setCss('top',  y + 'px');
  }

  rectifyAngle(angle) {
    if (angle > 360) {
      angle = angle - 360;
    }
    if (angle < 0) {
      angle = 360 + angle;
    }
    return angle;
  }

  moveBouncing(steps) {
    this.bounceAngleZ = this.rectifyAngle(this.bounceAngleZ);
    let radians = this.bounceAngleZ * (Math.PI / 180);
    this.x += Math.round(steps * Math.cos(radians));
    this.y -= Math.round(steps * Math.sin(radians));
    this.goTo(this.x, this.y);
    this.calculateCorners();
  }

  move(steps) {
    if (this.onEdgeBounce) {

      if (this.leftTop.x < 0) {
        this.x = 0;
        let a = this.bounceAngleZ;
        let u = this.directionOfLastBounce;
        if (a >= 90 && a <= 180 && u != 'up-right') {
          this.bounceAngleZ = RandomTools.getRandomInt(30, 60);
          this.directionOfLastBounce = 'up-right';
          this.flipCostume('right');
        } else {
          this.bounceAngleZ = RandomTools.getRandomInt(300, 330);
          this.directionOfLastBounce = 'down-right';
          this.flipCostume('right');
        }
      }
      else if (this.leftTop.y < 0) {
        this.y = 0;
        let a = this.bounceAngleZ;
        let u = this.directionOfLastBounce;
        if (a >= 0 && a <= 90 && u != 'down-right') {
          this.bounceAngleZ = RandomTools.getRandomInt(300, 330);
          this.directionOfLastBounce = 'down-right';
          this.flipCostume('right');
        }
        else {
          this.bounceAngleZ = RandomTools.getRandomInt(210, 240);
          this.directionOfLastBounce = 'down-left';
          this.flipCostume('left');
        }
      }
      else if (this.rightTop.x > this.gameScreen.getWidth()) {
        this.x = this.gameScreen.getWidth() - this.width;
        let a = this.bounceAngleZ;
        let u = this.directionOfLastBounce;
        if (a >= 0 && a <= 90 && u != 'up-left') {
          this.bounceAngleZ = RandomTools.getRandomInt(120, 150);
          this.directionOfLastBounce = 'up-left';
          this.flipCostume('left');
        }
        else {
          this.bounceAngleZ = RandomTools.getRandomInt(210, 240);
          this.directionOfLastBounce = 'down-left';
          this.flipCostume('left');
        }
      }
      else if (this.leftBottom.y > this.gameScreen.getHeight()) {
        this.y = this.gameScreen.getHeight() - this.height;
        let a = this.bounceAngleZ;
        let u = this.directionOfLastBounce;
        if (a >= 270 && a <= 360 && u != 'up-right') {
          this.bounceAngleZ = RandomTools.getRandomInt(30, 60);
          this.directionOfLastBounce = 'up-right';
        }
        else {
          this.bounceAngleZ = RandomTools.getRandomInt(120, 150);
          this.directionOfLastBounce = 'up-left';
        }
      }
    }
    this.moveBouncing(steps);
  }

  rotationTransform() {
    return `rotateX(${this.rotateY}deg) rotateY(${this.rotateY}deg) rotateZ(${-1 * this.rotateZ}deg)`;
  }

  rotate(rotateZ) {
    return;
    this.rotateZ += rotateZ;
    if (this.rotateZ >= 360) this.rotateZ = this.rotateZ - 360;
    if (this.rotateZ <= 0 ) this.rotateZ = 360 + this.rotateZ;
    this.setCss('transform', this.rotationTransform());
  }

  pointTowardsMousePointer() {
    this.HTMLElement.css('left', (mouseX + 1) + 'px');
    this.HTMLElement.css('top', (mouseY + 1) + 'px');
  }

  addCostume(gameImage) {
    this.costumes.addGameImage(gameImage);
  }

  getCurrentCostume() {
    this.costumes.getCurrentGameImage();
  }

  getCurrentCostumeName() {
    return this.costumes.getCurrentGameImageName();
  }

  getCostumeCount() {
    return this.costumes.size;
  }

  getCostumeIndexByName(gameImageName) {
    return Array.from(this.costumes.keys()).indexOf(gameImageName);
  }

  getCostumeValue(gameImageName) {
    return this.costumes.get(gameImageName);
  }

  switchCostumeTo(gameImageName) {
    this.costumes.setCurrentGameImageByName(gameImageName);
    this.width = this.costumes.getCurrentGameImage().width;
    this.height = this.costumes.getCurrentGameImage().height;
    this.calculateCorners();
    this.setCss('width', this.width);
    this.setCss('height', this.height);
    this.flipCostume(this.flip);
    this.setCss('background-image', 'url(' + this.costumes.getCurrentGameImage().gameImageSrc + ')');
  }

  nextCostume() {
    this.costumes.nextGameImage();
  }

  flipCostume(flip) {
    for (let index = 0; index < this.costumes.getCount(); index++) {
      this.costumes.getGameImageByIndex(index).setFlip(flip);
    }
  }
 
  switchCostumeToWithSound(customName, soundName) {
    this.switchCostumeTo(customName);
    this.sounds.getSoundByName(soundName).playSound();
  }

  touchingTo(sprite, showCollisionPoints) {
    let thisLT = this.pointIsInside(this.leftTop, sprite.leftTop, sprite.rightTop, sprite.leftBottom);
    let thisRT = this.pointIsInside(this.rightTop, sprite.leftTop, sprite.rightTop, sprite.leftBottom);
    let thisRB = this.pointIsInside(this.rightBottom, sprite.leftTop, sprite.rightTop, sprite.leftBottom);
    let thisLB = this.pointIsInside(this.leftBottom, sprite.leftTop, sprite.rightTop, sprite.leftBottom);

    let spriteLT = this.pointIsInside(sprite.leftTop, this.leftTop, this.rightTop, this.leftBottom);
    let spriteRT = this.pointIsInside(sprite.rightTop, this.leftTop, this.rightTop, this.leftBottom);
    let spriteRB = this.pointIsInside(sprite.rightBottom, this.leftTop, this.rightTop, this.leftBottom);
    let spriteLB = this.pointIsInside(sprite.leftBottom, this.leftTop, this.rightTop, this.leftBottom);

    if (!ValidationTools.isUndef(showCollisionPoints)) {
      if (ValidationTools.isBoolean(showCollisionPoints)) {
        if (showCollisionPoints) {
          let html = '';
          html += `${this.name} LT(${thisLT}) RT(${thisRT}) RB(${thisRB}) LB(${thisLB})<br>`;
          html += `${sprite.name} LT(${spriteLT}) RT(${spriteRT}) RB(${spriteRB}) LB(${spriteLB})<br>`;
          bb.writeOnlyOneLine(html);
        }
      }
    }

    return (thisLT || thisRT || thisRB || thisLB || spriteLT || spriteRT || spriteRB || spriteLB);
  }

  pointIsInside(point, leftTop, rightTop, leftBottom) {
    let checkX = point.x >= leftTop.x && point.x <= rightTop.x;
    let checkY = point.y >= leftTop.y && point.y <= leftBottom.y;
    return checkX && checkY;
  }

  show() {
    this.HTMLElement.show();
    this.isVisible = true;
  }

  showClones() {
    for (let clone of this.clones) {
      clone.HTMLElement.show();
      clone.isVisible = true;
    }
  }

  hide() {
    this.HTMLElement.hide();
    this.isVisible = false;
  }

  hideClones() {
    for (let clone of this.clones) {
      clone.HTMLElement.hide();
      clone.isVisible = false;
    }
  }

  addLifes(count) {
    this.lifes += count;
  }

  removeLifes(count) {
    this.lifes -= count;
  }

  addScore(count) {
    this.score += count;
  }

  removeScore(count) {
    this.score -= count;
  }

  showBoard() {
    this.writeOnTheBoard(`Lifes: ${this.lifes} &nbsp;&nbsp;&nbsp; Score: ${this.score}`);
  }
}