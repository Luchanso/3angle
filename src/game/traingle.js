class Triangle extends Phaser.Sprite {
  constructor(game, x, y, isRotated) {
    super(game, x, y, Engine.game.cache.getBitmapData(Engine.keys.triangle));

    this.width = Triangle.size;
    this.height = Triangle.size;
    this.anchor.setTo(0.5);

    if (isRotated) {
      this.rotation = Math.PI;
    }
  }
}

Triangle.size = 65;
Engine.Triangle = Triangle;
