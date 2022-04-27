class Sprite {
  constructor(name, className, lifeCycleFunction, x, y, w, h, flip, rotateZ, ifOnEdgeBounce, bounceAngleZ) {
    
    this.id = '#' + name;
    this.name = name;
    this.className = className;
    $('body').append(`<div id="${name}" class="${className}"></div>`); 
    this.HTMLElement = $(this.id);
    this.lifeCycleFunction = lifeCycleFunction;

    this.hide();
    this.isVisible = false;
    
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    
    this.ifOnEdgeBounce = ifOnEdgeBounce;
    this.directionOfLastBounce = 'no-bounce';
    this.rotateY = 0;
    this.rotateZ = rotateZ;
    this.bounceAngleZ = bounceAngleZ;
    this.flip = flip;
    this.flipCostume(this.flip);

    this.goTo(x, y);

    this.costumes = new Map();
    this.currentConstume = '';
    this.currentCostumeValue = ''
    this.currentCostumeIndex = -1;

    this.sounds = new SoundMap();

    this.lifeCycleClock = null;
  }

  calculateCorners() {
    this.leftTop = new Point(this.x, this.y);
    this.rightTop = new Point(this.x + this.w, this.y);
    this.leftBottom = new Point(this.x, this.y + this.h);
    this.rightBottom = new Point(this.x + this.w, this.y + this.h);
  }

  startLifeCycle() {
    this.lifeCycleClock = setInterval(() => {
      this.x = parseInt($(this.id).css('left').replace('px', ''));
      this.y = parseInt($(this.id).css('top').replace('px', ''));
      this.w = parseInt($(this.id).css('width').replace('px', ''));
      this.h = parseInt($(this.id).css('height').replace('px', ''));
      this.calculateCorners();
      this.lifeCycleFunction(this);
    }, 0);
  }

  writeOnTheBoard(html) {
    $(`#${this.name}_board`).html(html);
  }

  writeCoordinatesOnTheBoard() {
    $(`#${this.name}_board`).html(`x: ${this.x} y: ${this.y} w: ${this.w} h: ${this.h}`);
  }

  stopLifeCycle() {
    clearInterval(this.lifeCycleClock);
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

  // moverRotando(nuevosGrados, pasos) {
  //   this.rotar(nuevosGrados);
  //   let radianes = this.rotacionZ * (Math.PI / 180);
  //   this.x += Math.round(pasos * Math.cos(radianes));
  //   this.y -= Math.round(pasos * Math.sin(radianes));
  //   this.irA(this.x, this.y);
  //   this.calcularEsquinas();
  // }

  getRandomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  moveBouncing(steps) {
    if (this.bounceAngleZ > 360) {
      this.bounceAngleZ -= 360;
    }
    if (this.bounceAngleZ < 0) {
      this.bounceAngleZ += 360;
    }
    let radians = this.bounceAngleZ * (Math.PI / 180);
    this.x += Math.round(steps * Math.cos(radians));
    this.y -= Math.round(steps * Math.sin(radians));
    this.goTo(this.x, this.y);
    this.calculateCorners();
  }

  move(steps) {
    if (this.ifOnEdgeBounce) {

      if (this.leftTop.x < 0) {
        this.x = 0;
        let a = this.bounceAngleZ;
        let u = this.directionOfLastBounce;
        if (a >= 90 && a <= 180 && u != 'up-right') {
          //this.bounceAngleZ -= 90;
          //this.bounceAngleZ = this.getRandomIntFromInterval(0, 90);
          this.bounceAngleZ = this.getRandomIntFromInterval(30, 60);
          this.directionOfLastBounce = 'up-right';
          this.flipCostume('right');
        } else {
          //this.bounceAngleZ += 90;
          // this.bounceAngleZ = this.getRandomIntFromInterval(270, 360);
          this.bounceAngleZ = this.getRandomIntFromInterval(300, 330);
          this.directionOfLastBounce = 'down-right';
          this.flipCostume('right');
        }
      }
      else if (this.leftTop.y < 0) {
        this.y = 0;
        let a = this.bounceAngleZ;
        let u = this.directionOfLastBounce;
        if (a >= 0 && a <= 90 && u != 'down-right') {
          //this.bounceAngleZ -= 90;
          // this.bounceAngleZ = this.getRandomIntFromInterval(270, 360);
          this.bounceAngleZ = this.getRandomIntFromInterval(300, 330);
          this.directionOfLastBounce = 'down-right';
          this.flipCostume('right');
        }
        else {
          //this.bounceAngleZ += 90;
          // this.bounceAngleZ = this.getRandomIntFromInterval(180, 270);
          this.bounceAngleZ = this.getRandomIntFromInterval(210, 240);
          this.directionOfLastBounce = 'down-left';
          this.flipCostume('left');
        }
      }
      else if (this.rightTop.x > gameScreen.getWidth()) {
        this.x = gameScreen.getWidth() - this.w;
        let a = this.bounceAngleZ;
        let u = this.directionOfLastBounce;
        if (a >= 0 && a <= 90 && u != 'up-left') {
          //this.bounceAngleZ += 90;
          // this.bounceAngleZ = this.getRandomIntFromInterval(90, 180);
          this.bounceAngleZ = this.getRandomIntFromInterval(120, 150);
          this.directionOfLastBounce = 'up-left';
          this.flipCostume('left');
        }
        else {
          //this.bounceAngleZ -= 90;
          // this.bounceAngleZ = this.getRandomIntFromInterval(180, 270);
          this.bounceAngleZ = this.getRandomIntFromInterval(210, 240);
          this.directionOfLastBounce = 'down-left';
          this.flipCostume('left');
        }
      }
      else if (this.leftBottom.y > gameScreen.getHeight()) {
        this.y = gameScreen.getHeight() - this.h;
        let a = this.bounceAngleZ;
        let u = this.directionOfLastBounce;
        if (a >= 270 && a <= 360 && u != 'up-right') {
          //this.bounceAngleZ += 90;
          // this.bounceAngleZ = this.getRandomIntFromInterval(0, 90);
          this.bounceAngleZ = this.getRandomIntFromInterval(30, 60);
          this.directionOfLastBounce = 'up-right';
        }
        else {
          //this.bounceAngleZ -= 90;
          // this.bounceAngleZ = this.getRandomIntFromInterval(90, 180);
          this.bounceAngleZ = this.getRandomIntFromInterval(120, 150);
          this.directionOfLastBounce = 'up-left';
        }
      }
    }
    this.moveBouncing(steps);
    // bb.writeOnlyOneLine(`lastBounce: ${this.directionOfLastBounce} `
    //   + `angle: ${this.bounceAngleZ}° `
    //   + `x: ${parseInt(this.x)} `
    //   + `y: ${parseInt(this.y)} `
    //   + `screenWidth: ${gameScreen.getWidth()} `
    //   + `screenHeight: ${gameScreen.getHeight()}`);
  }

  rotationTransform() {
    return `rotateY(${this.rotateY}deg) rotateZ(${-1 * this.rotateZ}deg)`;
  }

  rotate(rotateZ) {
    return;
    this.rotateZ += rotateZ;
    if (this.rotateZ >= 360) this.rotateZ = this.rotateZ - 360;
    if (this.rotateZ <= 0 ) this.rotateZ = 360 + this.rotateZ;

    // let a = this.rotateZ;
    // let f = this.flip;
    // if (a > 90 && a <= 270 && f == 'right') {
    //   this.flipCostume('left');
    // } else if ((a > 270 && a <= 360 || a >= 0 && a <= 90) && f == 'left') {
    //   this.flipCostume('right');
    // }

    this.setCss('transform', this.rotationTransform());
    //bb.writeOnlyOneLine(`rotateZ: ${this.rotateZ} x: ${this.x} y: ${this.y} screenWidth: ${gameScreen.getWidth()} screenHeight: ${gameScreen.getHeight()}`);
  }

  pointTowardsMousePointer() {
    this.HTMLElement.css('left', (mouseX + 1) + 'px');
    this.HTMLElement.css('top', (mouseY + 1) + 'px');
  }

  addCostume(costumeName, image, width, height) {
    this.costumes.set(costumeName, {url: 'disfraces/' + image, width: width, height: height});
  }

  getCostumeCount() {
    return this.costumes.size;
  }

  getCostumeIndexByName(costumeName) {
    return Array.from(this.costumes.keys()).indexOf(costumeName);
  }

  getCostumeValue(costumeName) {
    return this.costumes.get(costumeName);
  }

  switchCostumeTo(costumeName) {
    this.currentConstume = costumeName;
    this.currentCostumeValue = this.getCostumeValue(costumeName);
    this.currentCostumeIndex = this.getCostumeIndexByName(costumeName);
    this.w = this.costumes.get(costumeName).width;
    this.h = this.costumes.get(costumeName).height; 
    this.calculateCorners();
    this.setCss('width', this.w);
    this.setCss('height', this.h);
    this.setCss('height', this.h);
    this.flipCostume(this.flip);
    this.setCss('background-image', 'url(' + this.costumes.get(costumeName).url + ')');
  }

  nextCostume() {
    if (this.costumes.size > 0) {
      if (this.currentConstume == '') {
        this.currentConstume = Array.from(this.costumes)[0][0];
        this.currentCostumeValue = this.getCostumeValue(this.currentConstume);
        this.currentCostumeIndex = this.getCostumeIndexByName(this.currentConstume);
      }
      else {
        ++this.currentCostumeIndex;
        if (this.currentCostumeIndex >= this.costumes.size) {
          this.currentCostumeIndex = 0;
        }
        this.currentConstume = Array.from(this.costumes)[this.currentCostumeIndex][0];
        this.currentCostumeValue = this.getCostumeValue(this.currentConstume);
      }
    }
  }

  flipCostume(flip) {
    this.flip = flip;
    if (flip == 'right') {
      this.rotateY = 0;
    }
    if (flip == 'left') {
      this.rotateY = 180;
    }
    this.setCss('transform', this.rotationTransform());
  }
 
  switchCostumeToWithSound(customName, soundName) {
    this.switchCostumeTo(customName);
    this.sounds.getSoundByName(soundName).playSound();
  }

  touchingTo(sprite) {
    let thisLT = this.pointIsInside(this.leftTop, sprite.leftTop, sprite.rightTop, sprite.leftBottom);
    let thisRT = this.pointIsInside(this.rightTop, sprite.leftTop, sprite.rightTop, sprite.leftBottom);
    let thisRB = this.pointIsInside(this.rightBottom, sprite.leftTop, sprite.rightTop, sprite.leftBottom);
    let thisLB = this.pointIsInside(this.leftBottom, sprite.leftTop, sprite.rightTop, sprite.leftBottom);

    let spriteLT = this.pointIsInside(sprite.leftTop, this.leftTop, this.rightTop, this.leftBottom);
    let spriteRT = this.pointIsInside(sprite.rightTop, this.leftTop, this.rightTop, this.leftBottom);
    let spriteRB = this.pointIsInside(sprite.rightBottom, this.leftTop, this.rightTop, this.leftBottom);
    let spriteLB = this.pointIsInside(sprite.leftBottom, this.leftTop, this.rightTop, this.leftBottom);

    // let html = '';
    // html += `${this.name} LT(${thisLT}) RT(${thisRT}) RB(${thisRB}) LB(${thisLB})<br>`;
    // html += `${sprite.name} LT(${spriteLT}) RT(${spriteRT}) RB(${spriteRB}) LB(${spriteLB})<br>`;
    // bb.writeOnlyOneLine((html);

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

  hide() {
    this.HTMLElement.hide();
    this.isVisible = false;
  }
}