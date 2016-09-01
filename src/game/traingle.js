class Triangle extends Phaser.Sprite {

  /**
   * It's a triangle, yash it's not a joke
   * @param  {Phaser.Game}  game      [description]
   * @param  {[type]}  x         [description]
   * @param  {[type]}  y         [description]
   * @param  {Boolean} isRotated [description]
   * @param  {Number}  color     [description]
   */
  constructor(game, x, y, isRotated, gradation) {
    super(game, x, y, Engine.game.cache.getBitmapData(Engine.keys.triangle));

    this.width = Triangle.size;
    this.height = Triangle.size;
    this.anchor.setTo(0.5);
    this.gradition = gradation;
    this.tint = this.gradition.getRandomColor();

    if (isRotated) {
      this.rotation = Math.PI;
    }

    this.inputEnabled = true;
    this.events.onInputOver.add(this.delete, this);
  }

  delete() {

  }

  recovery(color) {

  }
}

Triangle.size = 65;
Engine.Triangle = Triangle;
