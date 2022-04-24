# Juego de Avengers 2022 inventado por el profesor Cristian Gomez Vega 
Ahora
SI QUE SI
AMIGO

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

jQuery CDN – Latest Stable Versions
Desde:
https://releases.jquery.com/
Copiar jQuery UI 1.13 minified:
<script src="https://code.jquery.com/ui/1.13.1/jquery-ui.min.js" integrity="sha256-eTyxS0rkjpLEo16uXTS0uVCS4815lc40K2iVpWDvdSY=" crossorigin="anonymous"></script>

Quick start Bootstrap 5.0
https://getbootstrap.com/docs/5.0/getting-started/introduction/


jQuery UI 1.13.0 on the Microsoft Ajax CDN
https://docs.microsoft.com/en-us/aspnet/ajax/cdn/jquery-ui/cdnjqueryui1130

Bootstrap Icons
https://icons.getbootstrap.com/

Chitauris
https://www.google.com/imgres?imgurl=https%3A%2F%2Fpm1.narvii.com%2F7239%2F2274a242578fbdc1982b27be13b358eb11b8d2d6r1-470-295v2_hq.jpg&imgrefurl=https%3A%2F%2Faminoapps.com%2Fc%2Fmarvelrole%2Fpage%2Fitem%2Flos-chitauri%2FGDgL_YYfVIVzz0RP111BeM1Pa81BxXgDW2&tbnid=Z5G5k2HovuUADM&vet=10CAUQMyhqahcKEwiQtLq1_6n3AhUAAAAAHQAAAAAQAg..i&docid=eIpxCsUqkStcgM&w=470&h=295&q=chitauri%20leviathan%20png&hl=es-419&ved=0CAUQMyhqahcKEwiQtLq1_6n3AhUAAAAAHQAAAAAQAg#imgrc=HnxSH71o3xovEM&imgdii=tCNQI79cDDZWaM

TESTING SOUND

  var flag = 1;
  var sound = null;

  $("#comenzar").click(function(){
    
    if (flag==1) {
      sound = new Sound('capsong', '../sounds/', 'cappain.mp3', 500, true);
      sound.initSound(50, false);
      sound.playSound();
      sound.setSoundName('cancion-capitan');
      sound.setSoundPath('../sounds/');
      sound.setSoundFile('cap_dialogo_pelea.mp3');
      sound.playSound();
      flag = 2;
    }
    else if (flag==2) {
      sound.pauseSound();
      flag = 3;
    }
    else if (flag==3) {
      sound.playSound();
      flag = 4;
    }
    else if (flag==4) {
      sound.setVolume(100);
      flag = 5;
    }
    else if (flag==5) {
      sound.setSoundFile('cappain.mp3');
      alert(sound.getVolume() + ' ' + sound.getVolumePercent() + ' ' + sound.getLoop());
      sound.setLoop(true);
      sound.playSound();
      flag = 6;
    }
    else if (flag==6) {
      sound.stopSound();
      flag = 7;
    }
    else if (flag==7) {
      for (i = 0; i < 40; i++) {
        sound.decreaseVolume();
      }
      alert(sound.getVolume() + ' ' + sound.getVolumePercent() + ' ' + sound.getLoop());
      sound.playSound();
      flag = 8;
    }
    else if (flag==8) {
      for (i = 0; i < 15; i++) {
        sound.increaseVolume();
      }
      alert(sound.getVolume() + ' ' + sound.getVolumePercent() + ' ' + sound.getLoop());
      sound.playSound();
    }
  });
  return;