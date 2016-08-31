class Triange extends Phaser.Sprite {
  constructor(x, y) {
    super(x, y, Engine.game.cache.getBitmapData(Triangle.key));

    this.anchor.setTo(0.5);
  }
}


Triangle.key = 'traingle';
