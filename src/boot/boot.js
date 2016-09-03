class Boot extends Phaser.State {
  constructor() {
    super();
  }

  preload() {

  }

  create() {
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.state.start('Loader');
  }
}

Engine.Boot = Boot;
