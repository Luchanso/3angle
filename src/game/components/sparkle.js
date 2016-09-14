class Sparkle extends Phaser.Graphics {
  constructor(game) {
    super(game, 0, 0);
  }

  animate(x, y, color, count) {
    let sunray = {
      width: 0,
      height: 5,
    };

    this.clear();
    this.lineColor = '#ffffff';
    this.lineWidth = 1;
    this.beginFill(color);

    this.drawRoundedRect(x, y, 50, 5, 5);

    // let tween = this.game.add.tween(sunray)
    //   .to({}, 1000)
    //   .start();
    //
    // tween.onUpdateCallback(() => {
    //
    // }, this);

    this.endFill();
  }
}
