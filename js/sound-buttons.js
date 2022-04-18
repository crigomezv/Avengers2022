class SoundButtons {
  constructor(soundObject) {
    let uniqueId = new Date().valueOf();
    let dialog = '#snd-dialog-' + uniqueId;
    let volume = '#snd-volume-' + uniqueId;
    let slider = '#snd-slider-' + uniqueId;

    if (document.getElementById('snd-dialog-' + uniqueId) !== null) {
      $(dialog).remove();
    }

    let dialogHTML =
      `<div id="${'snd-dialog-' + uniqueId}" 
          title="Ajustes de sonido">
        <span id="${'snd-volume-' + uniqueId }">
          Volumen: ${soundObject.getVolumePercent()}
        </span>
        <div id="${'snd-slider-' + uniqueId}" 
          style="margin-top: 20px">
        </div>
      </div>`

    $('body').append(dialogHTML);

    $(slider).slider({
      min: 0, 
      max: 100, 
      step: 1, 
      value: soundObject.getVolume(),
      slide: function(event, ui) {
        soundObject.setVolume(ui.value);
        $(volume).text('Volumen: ' + soundObject.getVolumePercent());
      }
    });
    
    $(dialog).dialog({
      autoOpen: false, 
      height: 'auto', 
      width: 'auto', 
      modal: true, 
      title: 'Ajustes de sonido',
      show: {
        effect: 'explode', 
        duration: 1000,
      },
      hide: {
        effect: 'explode', 
        duration: 1000,
      },
      buttons: [
        { 
          icons: {'primary':'ui-icon-play' }, 
          click: () => soundObject.playSound() 
        },
        { 
          icons: {'primary':'ui-icon-pause' }, 
          click: () => soundObject.pauseSound() 
        },
        { 
          icons: {'primary':'ui-icon-stop' }, 
          click: () => soundObject.stopSound() 
        },
        { 
          icons: {'primary':'ui-icon-caret-1-n'}, 
          click: () => { 
            soundObject.increaseVolume();
            $(volume).html('Volumen: ' + soundObject.getVolumePercent());
            $(slider).slider('value', soundObject.volume);
          },
        },
        { 
          icons: { 'primary': 'ui-icon-caret-1-s' }, 
          click: () => { 
            soundObject.decreaseVolume(); 
            $(volume).html('Volumen: ' + soundObject.getVolumePercent());
            $(slider).slider('value', soundObject.volume);
          }, 
        },
      ]
    });

    $(dialog).on('dialogclose', () => $(dialog).remove());

    $(dialog).dialog('open');
  }
}