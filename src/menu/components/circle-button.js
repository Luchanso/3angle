class CircleButton extends Phaser.Graphics {

  get radius() { return this.data.radius }
  set radius(val) {
    this.data.radius = val;
    this.reDraw();
  }

  constructor(game, x, y, radius, color, iconName = null) {
    super(game, 0, 0);

    this.game.add.existing(this);

    if (iconName !== null) {
      this.icon = this.game.add.sprite(x, y, iconName);
      this.icon.anchor.setTo(0.5);
      this.icon.width = radius * 1.5;
      this.icon.height = radius * 1.5;
    }

    this.data.x = x;
    this.data.y = y;
    this.data.color = color;

    this.inputEnabled = true;

    this.radius = radius;
  }

  hideIcon() {
    const animationTime = 325;

    this.game.add.tween(this.icon)
      .to({
        alpha: 0
      }, animationTime)
      .start();
  }

  reDraw() {
    this.clear();
    this.beginFill(this.data.color);
    this.drawCircle(
      this.data.x,
      this.data.y,
      this.data.radius * 2
    );
    this.endFill();
  }
}

Engine.CircleButton = CircleButton;
