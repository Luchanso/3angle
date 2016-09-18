class Settings extends Phaser.State {
  constructor() {
    super();
  }

  init(bgColor) {
    this.backgroundColor = bgColor;
  }

  create() {
    this.createBackground();

    let test = this.add.text(
      this.game.world.centerX,
      this.game.world.centerY,
      'Settings page', {
        fill: 'White',
        font: '41px Open Sans'
      });

    test.alpha = 0;

    this.add.tween(test)
    .to({
      alpha: 1
    })
    .start();
  }

  createBackground() {
    this.background = this.add.graphics(0, 0);
    this.background.beginFill(this.backgroundColor);
    this.background.drawRect(0, 0, this.game.width, this.game.height);
    this.background.endFill();
  }
}

Engine.Settings = Settings;
