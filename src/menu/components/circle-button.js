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

      this.addChild(this.icon);
    }

    this.data.x = x;
    this.data.y = y;
    this.data.color = color;

    this.inputEnabled = true;

    this.radius = radius;
    this.onClick = new Phaser.Signal();

    this.events.onInputDown.addOnce(this.animateBtn, this);
  }

  animateBtn() {
    const animationTime = 350;
    const newBtnRadius = Math.sqrt(
      this.game.width**2 +
      this.game.height**2
    );

    this.parent.bringToTop(this);

    this.hideIcon();

    let tween = this.game.add.tween(this)
      .to({
        radius: newBtnRadius
      }, animationTime, Phaser.Easing.Sinusoidal.InOut);

    tween.onComplete.add(() => {
      this.onClick.dispatch();
    }, this);

    tween.start();
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
