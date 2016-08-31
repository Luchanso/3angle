class Boot extends Phaser.State {
  constructor() {
    super();
  }

  preload() {

  }

  create() {
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.game.stage.backgroundColor = '#006064';
    this.state.start('Loader');
  }
}

Engine.Boot = Boot;
