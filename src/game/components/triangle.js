class Triangle extends Phaser.Sprite {

  /**
   * It's a triangle, yash it's not a joke
   * @param  {Phaser.Game}  game      [description]
   * @param  {[type]}  x         [description]
   * @param  {[type]}  y         [description]
   * @param  {Boolean} isRotated [description]
   * @param  {Number}  color     [description]
   */
  constructor(game, x, y, isRotated, colorSet) {
    super(game, x, y, Engine.game.cache.getBitmapData(Engine.keys.triangle));

    this.width = Triangle.size;
    this.height = Triangle.size;
    this.anchor.setTo(0.5);
    this.colorSet = colorSet;
    this.tint = this.colorSet.getRandomColor();

    this.inputEnabled = true;
    this.input.pixelPerfectOver = true;
    this.events.onInputOver.add(this.delete, this);

    if (isRotated) {
      this.rotation = Math.PI;
    }
  }

  delete() {
    this.game.add.tween(this)
      .to({
        alpha: 0
      })
      .start();
  }

  recovery(color) {

  }
}

Triangle.size = 65;
Engine.Triangle = Triangle;
