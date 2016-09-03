class Triangle extends Phaser.Sprite {

  /**
   * It's a triangle, yash it's not a joke
   * @param  {Phaser.Game}  game      [description]
   * @param  {[type]}  x         [description]
   * @param  {[type]}  y         [description]
   * @param  {Boolean} isRotated [description]
   * @param  {Number}  color     [description]
   */
  constructor(game, x, y, isRotated, colorSet, matrixPosition) {
    super(game, x, y, Engine.game.cache.getBitmapData(Engine.keys.triangle));

    this.width = Triangle.size;
    this.height = Triangle.size;
    this.anchor.setTo(0.5);
    this.colorSet = colorSet;
    this.tint = this.colorSet.getRandomColor();

    /**
     * Poition in the matrix of triangles
     * @type {[type]}
     */
    this.matrixPos = matrixPosition;

    this.inputEnabled = true;
    this.input.pixelPerfectOver = true;
    this.input.pixelPerfectClick = true;

    this.events.deleteComplete = new Phaser.Signal();

    this.selected = false;
    this.isRotated = isRotated;

    if (isRotated) {
      this.rotation = Math.PI;
    }

    // this.addTextPosition();

    this.game.add.existing(this);
  }

  addTextPosition() {
    let text = new Phaser.Text(
      this.game,
      Triangle.size / 2,
      Triangle.size / 2,
      `${this.matrixPos.x}:${this.matrixPos.y}`,
      {
        font: '64px Open Sans',
        fill: 'black'
      }
    )

    if (this.isRotated) {
      text.rotation += Math.PI;
      text.y = +text.height;
    } else {
      text.x = -text.width / 2;
      text.y = -text.height / 4;
    }

    this.addChild(text);
  }

  select() {
    if (!this.selected) {
      this.selected = true;

      this.game.add.tween(this)
        .to({
          width: Triangle.size / 1.5,
          height: Triangle.size / 1.5
        }, Triangle.animationTime)
        .start();
      }
  }

  unselect() {
    if (this.selected) {

      this.game.tweens.remove(this);
      this.selected = false;

      this.game.add.tween(this)
        .to({
          width: Triangle.size,
          height: Triangle.size
        }, Triangle.animationTime)
        .start();
      }
  }

  delete() {
    if (this.game.input.activePointer.isDown) {
      this.game.add.tween(this)
        .to({
          width: 0,
          height: 0,
          alpha: 0
        }, Triangle.animationTime)
        .start()
        .onComplete
        .add(() => {
          this.events.deleteComplete.dispatch(this);
        }, this);
    }
  }

  recover(colorSet) {
    this.colorSet = colorSet;
    this.tint = this.colorSet.getRandomColor();
    this.width = Triangle.size;
    this.height = Triangle.size;
    this.selected = false;

    this.game.add.tween(this)
      .to({
        alpha: 1
      }, 1000, Phaser.Easing.Bounce.Out)
      .start();
  }
}

Triangle.size = 71;
Triangle.animationTime = 200;
Engine.Triangle = Triangle;
