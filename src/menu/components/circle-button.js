class CircleButton extends Phaser.Graphics {

  get radius() { return this.data.radius }
  set radius(val) {
    this.data.radius = val;
    this.reDraw();
  }

  constructor(game, x, y, radius, color) {
    super(game, 0, 0);

    this.data.x = x;
    this.data.y = y;
    this.data.color = color;

    this.inputEnabled = true;

    this.radius = radius;
  }

  reDraw() {
    this.clear();
    this.beginFill(this.data.color);
    this.drawCircle(
      this.data.x,
      this.data.y,
      this.data.radius
    );
    this.endFill();
  }
}

Engine.CircleButton = CircleButton;
