//<script>
class Blackboard {
  constructor(name, border) {
    this.name = name;
    this.id = '#' + name;
    this.text = '';
    this.border = `${border}px solid blue`;
  }

  create() {
    if ($(this.id)) {
      $('body').append(`<div id="${this.name}"></div>`);
      $(this.id).css('border', this.border);
      $(this.name).show()
    }
  }

  reset() {
    if ($(this.id)) {
      $(this.id).html('');
    }
  }

  write(text) {
    if ($(this.id)) {
      this.text += text;
      $(this.id).html(this.text);
    }
  }

  writeln(text) {
    if ($(this.id)) {
      this.text += '<br>' + text;
      $(this.id).html(this.text);
    }
  }
}
//</script>