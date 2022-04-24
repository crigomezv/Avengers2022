$(document).ready(function(){

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

  let cap = new Sprite('cap', 'cap', capLifeCycle, 0, 0, 250, 90, 'right', 0, false);
  cap.addCostume('capwalk', 'capwalk.gif', 103, 126);
  cap.addCostume('capshield', 'capshield.gif', 200, 150);
  cap.addCostume('caphand', 'caphand.gif', 237, 122);
  cap.addCostume('capdeath', 'capdeath.gif', 103, 126);
  cap.switchCostumeTo('capwalk');
  cap.sounds.addSound(new Sound('capshield0', 'sounds/', 'capshield0.mp3', 50, false));
  cap.sounds.addSound(new Sound('capshield1', 'sounds/', 'capshield1.mp3', 50, false));
  cap.sounds.addSound(new Sound('capshield2', 'sounds/', 'capshield2.mp3', 50, false));
  cap.sounds.addSound(new Sound('capshield3', 'sounds/', 'capshield3.mp3', 50, false));
  cap.sounds.addSound(new Sound('capshield4', 'sounds/', 'capshield4.mp3', 50, false));
  cap.sounds.addSound(new Sound('capshield5', 'sounds/', 'capshield5.mp3', 50, false));
  cap.sounds.addSound(new Sound('capshield6', 'sounds/', 'capshield6.mp3', 50, false));
  cap.sounds.addSound(new Sound('capshield7', 'sounds/', 'capshield7.mp3', 50, false));
  cap.sounds.addSound(new Sound('cappain', 'sounds/', 'cappain.mp3', 50, false));

  let chi = new Sprite('chi', 'chi', chiLifeCycle, 200, 200, 200, 144, 'right', 0, true, 135);
  chi.addCostume('chitauri', 'navechit4.png', 200, 144);
  chi.switchCostumeTo('chitauri');
  chi.sounds.addSound(new Sound('gritoshi1', 'sounds/', 'tackle.mp3', 50, false));
  
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
    
    backgroudMusic.playSound();
    showLifes();

    score = 0;
    lifes = 3;
    touched = false;
    deathDate = null;

    cap.bounceAngleZ = 0;
    cap.flipCostume('right');
    cap.goTo(0, 60);
    cap.show();
    cap.startLifeCycle();
    
    chi.bounceAngleZ = 315;
    chi.flipCostume('right');
    chi.goTo(500, 700);
    chi.show();
    chi.startLifeCycle();

    lifeCycleClock = setInterval(gameLifeCycle);
  });

  $('#stopGame').click(function(){
    backgroudMusic.stopSound();
    clearInterval(lifeCycleClock);
    cap.stopLifeCycle()
    chi.stopLifeCycle();
    cap.hide();
    chi.hide();
  });

  function gameLifeCycle() {
    if (mouseX >= cap.x + 3) cap.flipCostume('right');
    if (mouseX <= cap.x - 3) cap.flipCostume('left');
    cap.pointTowardsMousePointer();
  }

  function capLifeCycle() {
    if (cap.touchingTo(chi)) {
      if (!touched) {
        if (cap.currentConstume == 'capshield' || cap.currentConstume == 'caphand') {
          chi.sounds.getSoundByName('gritoshi1').playSound();
          score += 1;
          chi.hide();
          chi.goTo(400, 400)
          chi.show();
        } 
        else if (chi.isVisible) {
          cap.sounds.getSoundByName('cappain').playSound();
          deathDate = new Date();
          lifes -= 1;
        }
        showLifes();
        touched = true;
        if (lifes <= 0) {
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
      //bb.writeOnlyOneLine('ALIVE');
    } else {
      cap.switchCostumeTo('capdeath');
      var endDate   = new Date();
      var seconds = (endDate.getTime() - deathDate.getTime()) / 1000;
      //bb.writeOnlyOneLine('Died ' + seconds + ' seconds');
      if (seconds > 0.5) {
        deathDate = null;
        cap.switchCostumeTo('capwalk');
      }
    }
  }

  function chiLifeCycle() {
    chi.move(1);
  }

  function showLifes() {
    chi.writeOnTheBoard(`Lifes: ${lifes}`);
    cap.writeOnTheBoard(`Score: ${score}`);
  }

});