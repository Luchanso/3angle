class Menu extends Phaser.State {
  constructor() {
    super();
  }

  init() {
    this.playBtnColor = 0x2196F3;
    this.playBtnRadius = 50;

    this.backgroundColor = 0x4A148C;
  }

  create() {
    this.createBackground();
    this.createButtons();
  }

  createLogo() {
    // let
    // this.
  }

  createBackground() {
    this.background = this.add.graphics(0, 0);
    this.background.beginFill(this.backgroundColor);
    this.background.drawRect(0, 0, this.game.width, this.game.height);
    this.background.endFill();
  }

  createButtons() {
    this.createPlayButton();
  }

  createPlayButton() {
    this.playBtn = new Engine.CircleButton(
      this.game,
      this.game.world.centerX,
      this.game.world.centerY,
      this.playBtnRadius,
      this.playBtnColor
    );

    this.playBtn.events.onInputDown.add(this.animatePlayBtn, this);

    this.add.existing(this.playBtn);
  }

  createStartGameText() {
    const style = {
      font: '41px Open Sans',
      fill: '#FFFFFF',
    };

    this.startText = this.add.text(
      this.game.world.centerX,
      this.game.world.centerY,
      'Starting new game...',
      style
    );

    this.startText.alpha = 0;
    this.startText.anchor.setTo(0.5);

    this.add.tween(this.startText)
      .to({
        alpha: 1
      }, 1000)
      .start();
  }

  animatePlayBtn() {
    this.playBtn.events.onInputDown.remove(this.animatePlayBtn, this);

    const animationTime = 350;
    const newPlayBtnRadius = Math.sqrt(
      this.game.width**2 +
      this.game.height**2
    );

    let tween = this.add.tween(this.playBtn)
      .to({
        radius: newPlayBtnRadius
      }, animationTime, Phaser.Easing.Sinusoidal.InOut);

    tween.onComplete.add(this.finishAnimatePlayBtn, this);

    tween.start();
  }

  finishAnimatePlayBtn() {
    this.createStartGameText();
    this.createBlackoutAnimation()
      .onComplete
      .add(() => {
        let numberOfGradation = 3;
        this.state.start('Game', true, false, numberOfGradation);
      }, this);
  }

  createBlackoutAnimation() {
    const delay = 2000;

    let blackoutLayout = this.add.graphics(0, 0);
    blackoutLayout.alpha = 0;
    blackoutLayout.beginFill(0);
    blackoutLayout.drawRect(0, 0, this.game.width, this.game.height);
    blackoutLayout.endFill();

    let tween = this.add.tween(blackoutLayout)
      .to({
        alpha: 1
      }, 400)
      .delay(delay)
      .start();

    return tween;
  }

  render() {
    const color = 'rgba(65, 194, 242, 0)';

    this.game.debug.geom(new Phaser.Line(0, this.game.world.centerY, this.game.width, this.game.world.centerY), color);
    this.game.debug.geom(new Phaser.Line(this.game.world.centerX, 0, this.game.world.centerX, this.game.height), color);
  }
}

Engine.Menu = Menu;
