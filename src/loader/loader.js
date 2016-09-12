class Loader extends Phaser.State {
  constructor() {
    super();
  }

  preload() {
    this.game.stage.backgroundColor = '#000';
    this.addProgressLable();

    this.load.onFileComplete.add(this.refreshProgress, this);

    // this.load.audio('music1', 'assets/music/Yal!X - Forgiven.mp3');

    this.game.cache.addBitmapData(Triangle.bitmapKey, Engine.Triangle.generateSprite(this.game));
    this.game.cache.addBitmapData(Meteor.bitmapKey, Engine.Meteor.generateSprite(this.game));
    this.game.cache.addBitmapData(Universe.bitmapKey, Engine.Universe.generateSprite(this.game));
  }

  create() {
    let numberOfGradation = 3;
    this.state.start('Game', true, false, numberOfGradation);
  }

  addProgressLable() {
    let style = {
      font: '41px Open Sans',
      fill: '#00E676',
    }

    this.progressLable = this.add.text(this.game.world.centerX, this.game.world.centerY, 'Loading: 0% (0/0)', style);
    this.progressLable.anchor.setTo(0.5);
  }

  refreshProgress(progress, cacheKey, success, totalLoaded, totalFiles) {
    this.progressLable.text = `Loading ${progress}% (${totalLoaded}/${totalFiles})`;
  }
}

Engine.Loader = Loader;
