class Settings extends Phaser.State {
  constructor() {
    super();
  }

  init(bgColor) {
    this.stage.backgroundColor = bgColor;
  }

  create() {
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
}

Engine.Settings = Settings;
