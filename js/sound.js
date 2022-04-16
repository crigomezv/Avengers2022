class sound {
  constructor(soundName, volume, loop) {
    this.soundName = soundName;
    this.soundPath = 'sounds/' + soundName;
    this.initSound(volume, loop);
  }

  initSound(volume, loop) {
    this.audio = new Audio(this.soundPath);
    this.setVolume(volume);
    this.setLoop(loop);
  }

  playSound() {
    this.audio.play();
  }

  stopSound() {
    this.audio.load();
  }

  pauseSound() {
    this.audio.pause();
  }

  setVolume(volume) {
    this.volume = volume > 1? 1 : volume;
    this.volume = volume < 0? 0 : volume;
    this.audio.volume = this.volume;
  }

  setLoop(loop) {
    this.loop = loop;
    this.audio.loop = this.loop;
  }

  increaseVolume() {
    this.volume = this.volume + 0.01 > 1? 1 : this.volume + 0.01;
    this.setVolume(this.volume);
  }

  decreaseVolume() {
    this.volume = this.volume - 0.01 < 0? 0 : this.volume - 0.01;
    this.setVolume(this.volume);
  }
}

class SoundButtons {
  constructor(name, soundObject) {
    $('body').append(`<div id="${name}" 
      title="Ajustes de sonido">
      Volumen: <span id="${name}-volume">${soundObject.volume * 100}%</span>
      <div id="${name}-slider" style="margin-top: 20px"></div></div>`);

    $('#' + name).dialog({
      autoOpen: false,
      height: 'auto',
      width: 'auto',
      modal: true,
      title: 'Ajustes de sonido',
      show: {
        effect: 'explode',
        duration: 1000
      },
      hide: {
        effect: 'explode',
        duration: 1000
      },
      buttons: [
        {
          icons: { 'primary': 'ui-icon-play' },
          click: function() { soundObject.playSound(); },
        },
        {
          icons : { 'primary': 'ui-icon-pause' },
          click: function() { soundObject.pauseSound(); },
        },
        {
          icons: { 'primary': 'ui-icon-stop' },
          click: function() { soundObject.stopSound(); },
        },
        {
          icons: { 'primary': 'ui-icon-caret-1-n' },
          click: function() { 
            soundObject.increaseVolume();
            let volume = parseInt(soundObject.volume * 100);
            $('#' + name + '-volume').html(volume + '%');
            $('#' + name + '-slider').slider('value', soundObject.volume);
          },
        },
        {
          icons: { 'primary': 'ui-icon-caret-1-s' },
          click: function() { soundObject.decreaseVolume(); 
            let volume = parseInt(soundObject.volume * 100);
            $('#' + name + '-volume').html(volume + '%');
            $('#' + name + '-slider').slider('value', soundObject.volume);
          },
        }
      ]
    });

    $('#' + name + '-slider').slider({
      min: 0,
      max: 1,
      step: 0.01,
      value: soundObject.volume,
      slide: function(event, ui) {
        soundObject.setVolume(ui.value);
        $('#' + name + '-volume').text(parseInt(ui.value * 100) + '%');
      }
    });

    $('#' + name).dialog('open');
  }
}