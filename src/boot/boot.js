class Boot extends Phaser.State {
  constructor() {
    super();
  }

  preload() {
    Log.write('boot', 'Preloading');
  }

  create() {
    Log.write('boot', 'Creating');

    this.game.stage.disableVisibilityChange = true;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    Log.write('boot', 'Finish creating');

    this.state.start('Loader');
  }
}

Engine.Boot = Boot;
