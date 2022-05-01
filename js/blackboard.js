class Blackboard {
  constructor(name, border) {
    let uniqueId = new Date().valueOf();
    this.name = name + '-blackboard-' + uniqueId;
    this.id = '#' + name + '-blackboard-' + uniqueId;
    this.text = '';
    this.border = `${border}px solid blue`;
    this.closeButton = `
      <br><button onclick="$('${this.id}').remove()"
          class="btn btn-primary" style="margin-top: 5px">
        Cerrar
      </button>`;
  }

  create() {
    if ($(this.id)) {
      $('body').append(`
        <div id="${this.name}" 
          style="
            padding: 5px;
            position: absolute; 
            bottom: 0px; 
            width: 100%; 
            background-color: white;">
          <div></div>
          <div></div>
        </div>`);
      $(this.id).css('border', this.border);
    }
  }

  show() {
    $(this.name).show();
  }

  hide() {
    $(this.name).hide();
  }

  reset() {
    if ($(this.id)) {
      $(this.id).html('');
    }
  }

  write(text) {
    if ($(this.id)) {
      this.text += text;
      $(this.id).html(this.text + this.closeButton);
    }
  }

  writeln(text) {
    if ($(this.id)) {
      this.text += this.text !== ''? '<br>' + text : text;
      $(this.id).html(this.text + this.closeButton);
    }
  }

  writeOnlyOneLine(text) {
    if ($(this.id)) {
      this.text = text;
      $(this.id).html(this.text + this.closeButton);
    }
  }
}

var bb = new Blackboard('pizarra', 4);