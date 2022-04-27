$(document).ready(function(){

  bb.hide();
  gameScreen.setBackGroundImage('fondo.jpg');
  var mouse = new Mouse();
  var backgroudMusic = new Sound('capsong', 'sounds/', 'capsong2.mp3', 50, true);
  var score = 0;
  var lifes = 3;
  var touched = false;
  var deathDate = null;

  $("#settings").click(function(){
    new SoundButtons(backgroudMusic);
  });

  var lifeCycleClock = null;

  let cap = new Sprite('cap', 'cap', capLifeCycle, gameScreen.getWidth() / 2, gameScreen.getHeight() / 2, 250, 90, 'right', 0, false);
  cap.addCostume('capwalk', 'capwalk.gif', 103, 126);
  cap.addCostume('capshield', 'capshield.gif', 200, 150);
  cap.addCostume('caphand', 'caphand.gif', 237, 122);
  cap.addCostume('capdeath', 'capdeath.gif', 103, 126);
  cap.switchCostumeTo('capwalk');
  cap.sounds.loadSoundsFromJsonFile('../json/cap.json');
  let chiList = [];
  for (i = 0; i < 5; i++) {
    let chi = new Sprite('chi'+i, 'chi', chiLifeCycle, 200, 200, 200, 144, 'right', 0, true, 135);
    chi.addCostume('chitauri', 'navechit4.png', 200, 144);
    chi.switchCostumeTo('chitauri');
    chi.sounds.loadSoundsFromJsonFile('../json/chi.json');
    chiList.push(chi);
  }
  
  $('#startGame').click(function(){ 
    
    $(document).keydown(function(e) {
      var key = e.keyCode || e.which;
      if (key == 49) {
        cap.switchCostumeToWithSound('capshield', cap.sounds.getCurrentSoundName());
        cap.sounds.nextSound();
        if (cap.sounds.getCurrentSoundName() == 'cappain') cap.sounds.nextSound();
      }
      if (key == 50) cap.switchCostumeTo('caphand');
      if (key == 51) chi.bounceAngleZ += 10;
      if (key == 52) chi.bounceAngleZ -= 10;
      if (key == 53) chi.goTo(400, 400);
      setTimeout(function() { 
        cap.switchCostumeTo('capwalk');
       }, 500);
    });
    
    score = 0;
    lifes = 3;
    touched = false;
    deathDate = null;
    showLifes();
    backgroudMusic.playSound();

    cap.switchCostumeTo('capwalk');
    cap.bounceAngleZ = 0;
    cap.flipCostume('right');
    cap.goTo(0, 60);
    cap.show();
    cap.startLifeCycle();
    
    chiList.forEach(function(chi) {
      chi.bounceAngleZ = 315;
      chi.flipCostume('right');
      let coord = gameScreen.getRandomEdgeCoordinates('bottom');
      chi.goTo(coord.x, coord.y);
      chi.show();
      chi.startLifeCycle();
    });

    lifeCycleClock = setInterval(gameLifeCycle);
  });

  $('#stopGame').click(function(){
    backgroudMusic.stopSound();
    clearInterval(lifeCycleClock);
    cap.stopLifeCycle()
    chiList.forEach(function(chi) {
      chi.stopLifeCycle();
    });
    cap.hide();
    chiList.forEach(function(chi) {
      chi.hide();
    });
  });

  function gameLifeCycle() {
    if (mouseX >= cap.x + 3) cap.flipCostume('right');
    if (mouseX <= cap.x - 3) cap.flipCostume('left');
    cap.pointTowardsMousePointer();
  }

  function capLifeCycle() {
    chiList.forEach(function(chi) {
      if (cap.touchingTo(chi)) {
        if (!touched) {
          if (cap.currentConstume == 'capshield' || cap.currentConstume == 'caphand') {
            chi.sounds.getSoundByName('gritoshi1').playSound();
            score += 1;
            chi.hide();
            let coord = gameScreen.getRandomEdgeCoordinates();
            chi.goTo(coord.x, coord.y);
            chi.show();
          } 
          else if (chi.isVisible) {
            cap.sounds.getSoundByName('cappain').playSound();
            deathDate = new Date();
            lifes -= 1;


            chi.hide();
            let coord = gameScreen.getRandomEdgeCoordinates();
            chi.goTo(coord.x, coord.y);
            chi.show();



          }
          showLifes();
          touched = true;
          if (lifes <= 0) {
            //cap.writeOnTheBoard('GAME OVER');
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

  function showLifes() {
    cap.writeOnTheBoard(`Lifes: ${lifes} &nbsp;&nbsp;&nbsp; Score: ${score}`);
  }

});