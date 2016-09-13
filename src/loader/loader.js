class Loader extends Phaser.State {
  constructor() {
    super();
  }

  preload() {
    Log.write('loader', 'Preloading');

    this.game.stage.backgroundColor = '#000';
    this.addProgressLable();

    this.load.onFileComplete.add(this.refreshProgress, this);

    // this.load.audio('music1', 'assets/music/Yal!X - Forgiven.mp3');

    Log.write('loader', 'Generate triangle');
    this.game.cache.addBitmapData(Engine.Triangle.bitmapKey, Engine.Triangle.generateSprite(this.game));
    Log.write('loader', 'Finish generate triangle');

    Log.write('loader', 'Generate meteor');
    this.game.cache.addBitmapData(Engine.Meteor.bitmapKey, Engine.Meteor.generateSprite(this.game));
    Log.write('loader', 'Finish generate meteor');

    Log.write('loader', 'Generate universe');
    this.game.cache.addBitmapData(Engine.Universe.bitmapKey, Engine.Universe.generateSprite(this.game));
    Log.write('loader', 'Finish generate universe');

    Log.write('loader', 'Generate WaveTexture');
    this.generateWaveTexture();
    Log.write('loader', 'Finish generate WaveTexture');

    Log.write('loader', 'Finish preloading...');
  }

  create() {
    let numberOfGradation = 3;
    this.state.start('Game', true, false, numberOfGradation);
  }

  generateWaveTexture() {
    let data = Engine.Wave.generateAtlasData();
    this.game.cache.addTextureAtlas('circle', '', data.bitmap.canvas, data.atlasData, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
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
