$("#settings").on('click', function(){
  new SoundButtons(backgroudMusic);
});

$(document).ready(function(){

  bb.create();
  bb.show();

  var gameScreen = new GameScreen();
  gameScreen.stages.loadGameImagesFromJson(stageProperties.stages);
  gameScreen.musics.loadSoundsFromJson(stageProperties.musics);
  gameScreen.setCurrentStageByName('newyork01');

  var mouse = new Mouse();
  var keyboard = new Keyboard(startKeyboard);

  var score = 0;
  var lifes = 3;
  var touched = false;
  var deathDate = null;

  var lifeCycleClock = null;
  
  let cap = new Sprite();
  cap.initFromJson(capProperties, gameScreen, capLifeCycle);
  cap.switchCostumeTo('capwalk');

  let chi = new Sprite();
  chi.createClones(5, chiProperties, gameScreen, chiLifeCycle);

  function startKeyboard(e) {
    key = e.keyCode || e.which;
    if (key == 49) {
      if (cap.sounds.getCurrentSoundName() == 'cappain') cap.sounds.nextSound();
      cap.switchCostumeToWithSound('capshield', cap.sounds.getCurrentSoundName());
      cap.sounds.nextSound();
    }
    if (key == 50) {
      cap.switchCostumeTo('caphand');
    }
    setTimeout(() => cap.switchCostumeTo('capwalk'), 500);
  }
    
  $('#startGame').on('click', function(){ 
    gameScreen.musics.getSoundByName('capsong01').playSound();
    keyboard.start();

    cap.switchCostumeTo('capwalk');
    cap.bounceAngleZ = 0;
    cap.flipCostume('right');
    cap.goTo(0, 60);
    cap.show();
    cap.startLifeCycle();
    cap.lifes = 3;
    cap.score = 0;
    cap.showBoard();
    touched = false;
    deathDate = null;
    
    chi.clones.forEach((chi) => {
        chi.bounceAngleZ = 315;
        chi.flipCostume('right');
        let coord = gameScreen.getRandomEdgeCoordinates('bottom');
        chi.goTo(coord.x, coord.y);
        chi.switchCostumeTo('chitauri');
        chi.show();
        chi.startLifeCycle();
      });

    lifeCycleClock = setInterval(gameLifeCycle);
  });

  $('#stopGame').on('click', function(){
    gameScreen.musics.getSoundByName('capsong01').stopSound();
    clearInterval(lifeCycleClock);
    cap.stopLifeCycle()
    cap.hide();
    chi.stopLifeCycle();
    chi.hideClones();
    keyboard.stop();
  });

  function gameLifeCycle() {
    if (mouseX >= cap.x + 3) cap.flipCostume('right');
    if (mouseX <= cap.x - 3) cap.flipCostume('left');
    cap.pointTowardsMousePointer();
    gameScreen.setCurrentStageByName('newyork01');
  }

  function capLifeCycle() {
    chi.clones.forEach(function(chi) {
      if (cap.touchingTo(chi, true)) {
        if (!touched) {
          let costume = cap.getCurrentCostumeName();
          if (costume === 'capshield' || costume === 'caphand') {
            chi.sounds.getSoundByName('gritoshi1').playSound();
            cap.addScore(1);
            let coord = gameScreen.getRandomEdgeCoordinates();
            chi.goTo(coord.x, coord.y);
          } 
          else if (chi.isVisible) {
            cap.sounds.getSoundByName('cappain').playSound();
            deathDate = new Date();
            cap.removeLifes(1);
            let coord = gameScreen.getRandomEdgeCoordinates();
            chi.goTo(coord.x, coord.y);

          }
          cap.showBoard();
          touched = true;
          if (cap.lifes <= 0) {
            cap.writeOnTheBoard('GAME OVER');
            clearInterval(lifeCycleClock);
            cap.stopLifeCycle();
            chi.stopLifeCycle();
            setTimeout(() => $('#stopGame').click(), 2000);
          }
        }
      } 
      else {
        touched = false;
      }

      if (deathDate == null) {
        bb.writeOnlyOneLine('ALIVE');
      } else {
        cap.switchCostumeTo('capdeath');
        var endDate   = new Date();
        var seconds = (endDate.getTime() - deathDate.getTime()) / 1000;
        bb.writeOnlyOneLine('Died ' + seconds + ' seconds');
        if (seconds > 0.5) {
          deathDate = null;
          cap.switchCostumeTo('capwalk');
        }
      }
    });
  }

  function chiLifeCycle(chi) {
    chi.move(1);
  }

});