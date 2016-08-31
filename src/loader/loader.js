class Loader extends Phaser.State {
  constructor() {
    super();
  }

  preload() {
    this.addProgressLable();

    this.load.onFileComplete.add(this.refreshProgress, this);

    // this.load.image('test', 'assets/img/test.jpg');
  }

  create() {
    this.state.start('Game');
  }

  addProgressLable() {
    var style = {
      font: '41px Open Sans',
      fill: '#00E676'
    }

    this.progressLable = this.add.text(this.game.world.centerX, this.game.world.centerY, 'Loading: 0% (0/0)', style);
    this.progressLable.anchor.setTo(0.5);
  }

  refreshProgress(progress, cacheKey, success, totalLoaded, totalFiles) {
    this.progressLable.text = `Loading ${progress}% (${totalLoaded}/${totalFiles})`;
  }
}

Engine.Loader = Loader;
