$(document).ready(function(){
  var snd = new sound('ave.mp3', 0.5, true);
  // var bb = new Blackboard('blackboard', 10);
  // bb.create();

  $("#test").click(function(){
    new Screen('fondo.jpg');
    snd.playSound();
    // setTimeout(function() { snd.stopSound(); }, 6000);
  });

  $("#ver-botones").click(function(){
    new SoundButtons('sound-buttons', snd);
  });

  return;

  var relojCicloDeVida = null;

  let cap = new Sprite('cap', 'cap', cicloDeVidaCap, 0, 0, 250, 150);
  cap.agregarDisfraz('capwalk', 'capwalk.gif', 103, 126);
  cap.agregarDisfraz('capshield', 'capshield.gif', 200, 150);
  cap.agregarDisfraz('caphand', 'caphand.gif', 237, 122);
  cap.agregarDisfraz('capdeath', 'capdeath.gif', 103, 126);
  cap.cambiarDisfrazA('capwalk');
  cap.agregarSonido('capshield0', 'sonidos/capshield0.mp3');
  cap.agregarSonido('capshield1', 'sonidos/capshield1.mp3');
  cap.agregarSonido('capshield2', 'sonidos/capshield2.mp3');
  cap.agregarSonido('capshield3', 'sonidos/capshield3.mp3');
  cap.agregarSonido('capshield4', 'sonidos/capshield4.mp3');
  cap.agregarSonido('capshield5', 'sonidos/capshield5.mp3');
  cap.agregarSonido('capshield6', 'sonidos/capshield6.mp3');
  cap.agregarSonido('capshield7', 'sonidos/capshield7.mp3');
  
  let chi = new Sprite('chi', 'chi', cicloDeVidaChi, 500, 200, 115, 183);
  chi.agregarDisfraz('chitauri', 'chinave.png', 115, 183);
  chi.cambiarDisfrazA('chitauri');
  chi.agregarSonido('gritoshi1', 'sonidos/tackle.mp3');
  
  let chi2 = new Sprite('chi2', 'chi', 500, 600, 115, 183);
  chi2.agregarDisfraz('chitauri', 'chinave.png', 115, 183);
  chi2.cambiarDisfrazA('chitauri');
  chi2.agregarSonido('gritoshi1', 'sonidos/tackle.mp3');

  $('#comenzar').click(function(){ 
    
    $(document).keydown(function(e) {
      var key = e.keyCode || e.which;
      if (key == 49) {
        cap.siguienteSonido();
        cap.cambiarDisfrazConSonido('capshield', cap.sonidoActual);
      }
      if (key == 50) cap.cambiarDisfrazA('caphand');
      if (key == 48) {
        //cap.iniciarSonido('capshield0');
        tocarSonido('sonidos/ave.mp3');
      }
      setTimeout(function() { cap.cambiarDisfrazA('capwalk'); }, 500);
    });
    
    puntaje = 0;
    vidas = 3;
    tocado = false;

    iniciarCancion('capsong1.mp3');
    
    chi.escribirEnPizarra(`vidas: ${vidas}`);
    cap.escribirEnPizarra(`puntaje: ${puntaje}`);
    
    cap.irA(0, 60);
    cap.mostrar();
    cap.comenzarCicloDeVida();
    
    chi.mostrar();
    chi.comenzarCicloDeVida();

    relojCicloDeVida = setInterval(cicloDeVidaDelJuego);
  });

  $('#detener').click(function(){
    detenerCancion();
    clearInterval(relojCicloDeVida);
    cap.detenerCicloDeVida();
    chi.detenerCicloDeVida();
    cap.esconder();
    chi.esconder();
  });

  function cicloDeVidaDelJuego() {
    if (mouseX >= cap.x + 3) {
      cap.establecerAngulo(0);
      escribirEnPizarraComun('derecha');
    }
    if (mouseX <= cap.x - 3) {
      cap.establecerAngulo(180);
      escribirEnPizarraComun('izquierda');
    }
    cap.apuntarHaciaPunteroDelRaton();
  }

  function cicloDeVidaCap() {
    if (cap.tocando(chi)) {
      if (!tocado) {
        if (cap.disfrazActual == 'capshield' || cap.disfrazActual == 'caphand') {
          chi.iniciarSonido('gritoshi1');
          puntaje += 1;
          chi.esconder();
        } 
        else if (chi.estaVisible) {
          iniciarSonido('cappain.mp3');
          fechaDeMuerte = new Date();
          vidas -= 1;
        }
        cap.escribirEnPizarra(`vidas: ${vidas}`);
        chi.escribirEnPizarra(`puntaje=${puntaje}`);
        tocado = true;
        if (vidas <= 0) {
          cap.escribirEnPizarra('GAME OVER');
          // clearInterval(relojCicloDeVida);
          // cap.detenerCicloDeVida();
          // chi.detenerCicloDeVida();
          setTimeout(function() { 
            // cap.esconder();
            // chi.esconder();
            $('#detener').click();
          }, 2000);
        }
      }
    } 
    else {
      tocado = false;
    }

    if (fechaDeMuerte == null) {
      escribirEnPizarraComun('VIVO');
    } else {
      cap.cambiarDisfrazA('capdeath');
      var endDate   = new Date();
      var seconds = (endDate.getTime() - fechaDeMuerte.getTime()) / 1000;
      escribirEnPizarraComun('MUERTE EN ' + seconds + ' SEGUNDOS');
      if (seconds > 0.5) {
        fechaDeMuerte = null;
        cap.cambiarDisfrazA('capwalk');
      }
    }
  }

  function cicloDeVidaChi() {
    chi.mover(-5);
  }

});