$(document).ready(function(){

  var windowH =  $(window).height();
  $('#main_container, #overlay').height(windowH);
  $(window).resize(function () {
      var windowH =  $(window).height();
      $('#main_container, #overlay').height(windowH);
  });

  $("#settings").on('click', () => new SoundButtons(backgroudMusic));
  $('#startGame').on('click', () => startGame());
  $('#stopGame').on('click', () => stopGame());

  var gameScreen = new GameScreen(stageProperties.stages, stageProperties.musics);
  var mouse = new Mouse();
  var keyboard = new Keyboard(startKeyboard);
  var lifeCycleClock = null;
  var musicCycleClock = null;
  
  let cap = new Sprite();
  cap.initFromJson(capProperties, gameScreen, null);

  let chi = new Sprite();
  chi.createClones(5, chiProperties, gameScreen, chiLifeCycle);

  function startKeyboard(e) {
    key = e.keyCode || e.which;
    if (key == 49) {
      if (cap.sounds.getCurrentSoundName() == 'cappain') cap.sounds.nextSound();
      cap.switchCostumeToWithSound('capshield-attack', cap.sounds.getCurrentSoundName());
      cap.sounds.nextSound();
    }
    if (key == 50) {
      cap.switchCostumeTo('capkick-attack');
    }
    setTimeout(() => cap.switchCostumeTo('cap-walking'), 500);
  }

  function startGame() {
    //gameScreen.musics.getSoundByName('capsong01').playSound();
    keyboard.start();
    cap.switchCostumeTo('cap-walking');
    cap.bounceAngleZ = 0;
    cap.flipCostume('right');
    cap.goTo(0, 60);
    cap.show();
    cap.startLifeCycle();
    cap.lifes = 3;
    cap.score = 0;
    cap.showBoard();
    chi.clones.forEach((chi) => startChitauriClone(chi));
    lifeCycleClock = setInterval(gameLifeCycle);
    musicCycleClock = setInterval(() => {
      //gameScreen.musics.playNextSound();
      gameScreen.showNextStage();
    }, 3000);
  }
    
  function stopGame() {
    cap.writeOnTheBoard('GAME OVER');
    gameScreen.musics.getCurrentSound().killSound();
    clearInterval(clearInterval(lifeCycleClock));
    clearInterval(clearInterval(musicCycleClock));
    cap.stopLifeCycle()
    cap.hide();
    chi.stopLifeCycle();
    chi.hideClones();
    keyboard.stop();
  }

  function startChitauriClone(chi) {
    chi.bounceAngleZ = 315;
    chi.flipCostume('right');
    let coord = gameScreen.getRandomEdgeCoordinates('bottom');
    chi.goTo(coord.x, coord.y);
    chi.switchCostumeTo('chitauri');
    chi.show();
    chi.startLifeCycle();
  }

  function gameLifeCycle() {
    if (mouseX >= cap.x + 3) cap.flipCostume('right');
    if (mouseX <= cap.x - 3) cap.flipCostume('left');
    cap.pointTowardsMousePointer();
  }

  function checkCaptainDead(chi) {
    if (!cap.costumeType('attack') && !cap.costumeType('dying')) {
      cap.switchCostumeTo('cap-dying');
      cap.removeLifes(1);
      if (cap.lifes <= 0) stopGame();
      cap.sounds.getSoundByName('cappain').playSound();
      let coord = gameScreen.getRandomEdgeCoordinates();
      chi.goTo(coord.x, coord.y);
      setTimeout(() => cap.switchCostumeTo('cap-walking'), 2000);
    }
  }

  function checkChitauriDead(chi) {
    if (cap.costumeType('attack')) {
      chi.sounds.getSoundByName('gritoshi1').playSound();
      cap.addScore(1);
      let coord = gameScreen.getRandomEdgeCoordinates();
      chi.goTo(coord.x, coord.y);
    } 
  }

  function chiLifeCycle(chi) {
    if (chi.touchingTo(cap, true)) {
      checkCaptainDead(chi);
      checkChitauriDead(chi);
      cap.showBoard();
    }
    chi.move(1);
  }

});