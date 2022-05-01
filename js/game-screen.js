class GameScreen {

  constructor() {
    this.stages = new GameImageMap();
    this.musics = new SoundMap();
  }

  setCurrentStageByName(gameImageName) {
    this.stages.setCurrentGameImageByName(gameImageName);
    this.setStageImage(this.stages.getCurrentGameImage().getGameImageSrc());
  }

  setCurrentSoundByName(soundName) {
    this.musics.setCurrentSoundByName(soundName);
  }

  getWidth() {
    return $(window).width();
  }

  getHeight() {
      return $(window).height();
  }

  setStageImage(imageUrl) {
    let url = `url(${imageUrl}) no-repeat center center fixed`;
    $('body').css('background', url);
    $('body').css('-webkit-background-size', 'cover');
    $('body').css('-moz-background-size', 'cover');
    $('body').css('-o-background-size', 'cover');
    $('body').css('background-size', 'cover');
  }

  getRnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  getRandomPositionY() {
    return this.getRnd(0, this.getHeight());
  }

  getRandomPositionX() {
    return this.getRnd(0, this.getWidth());
  }

  getRandomEdge() {
    let num = this.getRnd(1, 4);
    if (num == 1) return 'left';
    if (num == 2) return 'top';
    if (num == 3) return 'right';
    if (num == 4) return 'bottom';
  }

  getRandomEdgeCoordinates(edge) {
    if (edge == undefined || edge == null || edge == '') {
      edge = this.getRandomEdge();
    }
    if (edge == 'left') return {"x": 0, "y": this.getRandomPositionY()};
    if (edge == 'top') return {"x": this.getRandomPositionX(), "y": 0};
    if (edge == 'right') return {"x": this.getWidth(), "y": this.getRandomPositionY()};
    if (edge == 'bottom') return {"x": this.getRandomPositionX(), "y": this.getHeight()};
  }
}