class Triangle extends Phaser.Sprite {
  constructor(game, x, y, isRotated) {
    super(game, x, y, Engine.game.cache.getBitmapData(Engine.keys.triangle));

    this.width = Triangle.size;
    this.height = Triangle.size;
    this.anchor.setTo(0.5);

    if (isRotated) {
      this.rotation = Math.PI;
    }

    this.inputEnabled = true;
    this.events.onInputOver.add(this.destroy, this);
  }

  destroy() {
    this.game.add.tween(this).to({alpha: 0}, 1000).start();
  }
}

Triangle.size = 65;
Engine.Triangle = Triangle;
