class Screen {

  constructor(imageName) {
    this.imageName = imageName;
    if (imageName) {
      this.setBackGroundImage(imageName);
    }
  }

  setBackGroundImage(imageName) {
    this.imageName = imageName;
    let url = `url(../images/${imageName}) no-repeat center center fixed`;
    $('body').css('background', url);
    $('body').css('-webkit-background-size', 'cover');
    $('body').css('-moz-background-size', 'cover');
    $('body').css('-o-background-size', 'cover');
    $('body').css('background-size', 'cover');
  }
}