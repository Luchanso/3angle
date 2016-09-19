class Loader extends Phaser.State {
  constructor() {
    super();
  }

  preload() {
    this.game.stage.backgroundColor = '#000';
    this.addProgressLable();

    this.load.onFileComplete.add(this.refreshProgress, this);

    // this.load.audio('music1', 'assets/music/Yal!X - Forgiven.mp3');
    this.load.image('icon-play', 'assets/img/icon-play.png');
    this.load.image('icon-list', 'assets/img/icon-list.png');
    this.load.image('icon-share', 'assets/img/icon-share.png');
    this.load.image('icon-settings', 'assets/img/icon-settings.png');

    this.game.cache.addBitmapData(Engine.Triangle.bitmapKey, Engine.Triangle.generateSprite(this.game));
    this.game.cache.addBitmapData(Engine.Meteor.bitmapKey, Engine.Meteor.generateSprite(this.game));

    this.generateWaveTexture();
  }

  create() {
    // let numberOfGradation = 3;
    // this.state.start('Game', true, false, numberOfGradation);
    this.state.start('Menu');
  }

  generateWaveTexture() {
    let data = Engine.Wave.generateAtlasData();
    this.game.cache.addTextureAtlas(Wave.bitmapKey, '', data.bitmap.canvas, data.atlasData, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
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
