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
    this.input.pixelPerfectClick = true;
    this.events.onInputOver.add(this.delete, this);
    this.events.onInputDown.add(this.delete, this);

    this.events.triangleDelete = new Phaser.Signal();

    if (isRotated) {
      this.rotation = Math.PI;
    }

    this.game.add.existing(this);
  }

  delete() {
    if (this.game.input.activePointer.isDown) {
      this.game.add.tween(this)
        .to({
          alpha: 0
        })
        .start()
        .onComplete
        .add(() => {
          this.events.triangleDelete.dispatch(this);
        }, this);
    }
  }

  recover(colorSet) {
    this.colorSet = colorSet;
    this.tint = this.colorSet.getRandomColor();

    this.game.add.tween(this)
      .to({
        alpha: 1
      }, 1000, Phaser.Easing.Bounce.Out)
      .start();
  }
}

Triangle.size = 65;
Engine.Triangle = Triangle;
