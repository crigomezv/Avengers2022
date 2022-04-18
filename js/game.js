$(document).ready(function(){
  gameScreen.setBackGroundImage('fondo.jpg');
  var mouse = new Mouse();
  var musica = new Sound('capsong2.mp3', 50, true);
  var puntaje = 0;
  var vidas = 3;
  var tocado = false;
  var fechaDeMuerte = null;

  $("#ajustes").click(function(){
    new SoundButtons(musica);
  });

  var relojCicloDeVida = null;

  let cap = new Sprite('cap', 'cap', cicloDeVidaCap, 0, 0, 250, 90, '', 0, false);
  cap.agregarDisfraz('capwalk', 'capwalk.gif', 103, 126);
  cap.agregarDisfraz('capshield', 'capshield.gif', 200, 150);
  cap.agregarDisfraz('caphand', 'caphand.gif', 237, 122);
  cap.agregarDisfraz('capdeath', 'capdeath.gif', 103, 126);
  cap.cambiarDisfrazA('capwalk');
  cap.agregarSonido('capshield0', 'capshield0.mp3');
  cap.agregarSonido('capshield1', 'capshield1.mp3');
  cap.agregarSonido('capshield2', 'capshield2.mp3');
  cap.agregarSonido('capshield3', 'capshield3.mp3');
  cap.agregarSonido('capshield4', 'capshield4.mp3');
  cap.agregarSonido('capshield5', 'capshield5.mp3');
  cap.agregarSonido('capshield6', 'capshield6.mp3');
  cap.agregarSonido('capshield7', 'capshield7.mp3');
  cap.agregarSonido('cappain', 'cappain.mp3');
  
  let chi = new Sprite('chi', 'chi', cicloDeVidaChi, 200, 200, 110, 106, '', 45, true);
  chi.agregarDisfraz('chitauri', 'chinave4.png', 110, 106);
  chi.cambiarDisfrazA('chitauri');
  chi.agregarSonido('gritoshi1', 'tackle.mp3');
  
  $('#comenzar').click(function(){ 
    
    $(document).keydown(function(e) {
      var key = e.keyCode || e.which;
      if (key == 49) {
        cap.cambiarDisfrazConSonido('capshield', cap.sonidoActual);
        cap.siguienteSonido();
        if (cap.sonidoActual == 'cappain') cap.siguienteSonido();
      }
      if (key == 50) cap.cambiarDisfrazA('caphand');
      if (key == 51) chi.rotar(10);
      if (key == 52) chi.rotar(-10);
      if (key == 53) chi.irA(400, 400);
      setTimeout(function() { cap.cambiarDisfrazA('capwalk'); }, 500);
    });
    
    musica.playSound();
    mostrarVidas()

    puntaje = 0;
    vidas = 3;
    tocado = false;
    fechaDeMuerte = null;

    //musica.playSound();
    
    cap.establecerAngulo(0);
    cap.voltearDisfraz('right');
    cap.irA(0, 60);
    cap.mostrar();
    cap.comenzarCicloDeVida();
    
    chi.establecerAngulo(135);
    chi.voltearDisfraz('right');
    chi.irA(400, 800);
    chi.mostrar();
    chi.comenzarCicloDeVida();

    relojCicloDeVida = setInterval(cicloDeVidaDelJuego);
  });

  $('#detener').click(function(){
    musica.stopSound();
    clearInterval(relojCicloDeVida);
    cap.detenerCicloDeVida();
    chi.detenerCicloDeVida();
    cap.esconder();
    chi.esconder();
  });

  function cicloDeVidaDelJuego() {
    if (mouseX >= cap.x + 3) cap.voltearDisfraz('right');
    if (mouseX <= cap.x - 3) cap.voltearDisfraz('left');
    cap.apuntarHaciaPunteroDelRaton();
  }

  function cicloDeVidaCap() {
    // if (cap.tocando(chi)) {
    //   if (!tocado) {
    //     if (cap.disfrazActual == 'capshield' || cap.disfrazActual == 'caphand') {
    //       chi.iniciarSonido('gritoshi1');
    //       puntaje += 1;
    //       chi.esconder();
    //     } 
    //     else if (chi.estaVisible) {
    //       cap.iniciarSonido('cappain');
    //       fechaDeMuerte = new Date();
    //       vidas -= 1;
    //     }
    //     mostrarVidas();
    //     tocado = true;
    //     if (vidas <= 0) {
    //       cap.escribirEnPizarra('GAME OVER');
    //       clearInterval(relojCicloDeVida);
    //       cap.detenerCicloDeVida();
    //       chi.detenerCicloDeVida();
    //       setTimeout(() => $('#detener').click(), 2000);
    //     }
    //   }
    // } 
    // else {
    //   tocado = false;
    // }

    // if (fechaDeMuerte == null) {
    //   //bb.writeOnlyOneLine('VIVO');
    // } else {
    //   cap.cambiarDisfrazA('capdeath');
    //   var endDate   = new Date();
    //   var seconds = (endDate.getTime() - fechaDeMuerte.getTime()) / 1000;
    //   //bb.writeOnlyOneLine('MUERTE EN ' + seconds + ' SEGUNDOS');
    //   if (seconds > 0.5) {
    //     fechaDeMuerte = null;
    //     cap.cambiarDisfrazA('capwalk');
    //   }
    // }
  }

  function cicloDeVidaChi() {
    chi.mover(1);
  }

  function mostrarVidas() {
    chi.escribirEnPizarra(`vidas: ${vidas}`);
    cap.escribirEnPizarra(`puntaje: ${puntaje}`);
  }

});