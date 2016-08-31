class Loader extends Phaser.State {
  constructor() {
    super();
  }

  preload() {
    this.addProgressLable();

    this.load.onFileComplete.add(this.refreshProgress, this);

    this.generateTriangle();

    // this.load.image('test', 'assets/img/test.jpg');
  }

  create() {
    this.state.start('Game');
  }

  addProgressLable() {
    let style = {
      font: '41px Open Sans',
      fill: '#00E676'
    }

    this.progressLable = this.add.text(this.game.world.centerX, this.game.world.centerY, 'Loading: 0% (0/0)', style);
    this.progressLable.anchor.setTo(0.5);
  }

  refreshProgress(progress, cacheKey, success, totalLoaded, totalFiles) {
    this.progressLable.text = `Loading ${progress}% (${totalLoaded}/${totalFiles})`;
  }

  generateTriangle() {
    const size = 255;

    let bitmap = new Phaser.BitmapData(size, size);

    bitmap.ctx.beginPath();
    bitmap.ctx.fillStyle = 'white';
    bitmap.ctx.moveTo(0, size);
    bitmap.ctx.lineTo(size / 2, 0);
    bitmap.ctx.lineTo(size, size);
    bitmap.ctx.lineTo(0, size);
    bitmap.ctx.fill();

    this.game.cache.addBitmapData(Engine.keys.triangle, bitmap);
  }
}

Engine.Loader = Loader;
