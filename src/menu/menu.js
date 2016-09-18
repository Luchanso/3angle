class Menu extends Phaser.State {
  constructor() {
    super();
  }

  init() {
    this.playBtnColor = 0x2196F3;
    this.playBtnRadius = 50;
    this.orbitsRadius = this.playBtnRadius + 100;

      this.stage.backgroundColor = 0x4A148C;
  }

  create() {
    this.createLogo();
    this.createBtns();
  }

  createLogo() {
    return;
    const style = {
      font: '52px Open Sans',
      fill: 'white'
    };

    this.logoLable = this.add.text(
      this.game.world.centerX,
      this.game.world.centerY / 2,
      'Three Angle',
      style
    );
    this.logoLable.anchor.setTo(0.5);
  }

  createBtns() {
    this.createLeaderboardBtn();
    this.createSettingsBtn();
    this.createShareBtn();

    this.createPlayBtn();

    this.animateAdditionalBtns();
  }

  createPlayBtn() {
    this.playBtn = new Engine.CircleButton(
      this.game,
      this.game.world.centerX,
      this.game.world.centerY,
      this.playBtnRadius,
      this.playBtnColor,
      'icon-play'
    );

    this.playBtn.onClick.add(this.clickPlayBtn, this);
  }

  createSettingsBtn() {
    const btnColor = 0x009688;

    this.settingsBtn = new Engine.CircleButton(
      this.game,
      this.game.world.centerX,
      this.game.world.centerY,
      this.playBtnRadius / 2,
      btnColor,
      'icon-settings'
    );

    this.settingsBtn.onClick.add(this.clickSettingsBtn, this);
  }

  createShareBtn() {
    const btnColor = 0xE91E63;

    this.shareBtn = new Engine.CircleButton(
      this.game,
      this.game.world.centerX,
      this.game.world.centerY,
      this.playBtnRadius / 2,
      btnColor,
      'icon-share'
    );

    this.shareBtn.onClick.add(this.clickShareBtn, this);
  }

  createLeaderboardBtn() {
    const btnColor = 0xFF5722;

    this.leaderboardBtn = new Engine.CircleButton(
      this.game,
      this.game.world.centerX,
      this.game.world.centerY,
      this.playBtnRadius / 2,
      btnColor,
      'icon-list'
    );

    this.leaderboardBtn.onClick.add(this.clickLeaderboardBtn, this);
  }

  animateAdditionalBtns() {
    const animationTime = 1000;
    const maxDelay = 500;

    let anglePart = (Math.PI * 2) / 3;

    this.add.tween(this.shareBtn)
      .to({
        x: this.playBtn.x + Math.cos(anglePart) * this.orbitsRadius,
        y: this.playBtn.y + Math.sin(anglePart) * this.orbitsRadius
      }, animationTime + this.rnd.between(0, maxDelay), Phaser.Easing.Elastic.Out)
      .start();

    this.add.tween(this.settingsBtn)
      .to({
        x: this.playBtn.x + Math.cos(anglePart * 2) * this.orbitsRadius,
        y: this.playBtn.y + Math.sin(anglePart * 2) * this.orbitsRadius
      }, animationTime + this.rnd.between(0, maxDelay), Phaser.Easing.Elastic.Out)
      .start();

    this.add.tween(this.leaderboardBtn)
      .to({
        x: this.playBtn.x + Math.cos(anglePart * 3) * this.orbitsRadius,
        y: this.playBtn.y + Math.sin(anglePart * 3) * this.orbitsRadius
      }, animationTime + this.rnd.between(0, maxDelay), Phaser.Easing.Elastic.Out)
      .start();

  }

  createStartGameText() {
    const style = {
      font: '41px Open Sans',
      fill: '#FFFFFF',
    };

    this.startText = this.add.text(
      this.game.world.centerX,
      this.game.world.centerY,
      'Starting game...',
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

  clickPlayBtn() {
    const delay = 2000;

    this.createStartGameText();
    this.createBlackoutAnimation(delay)
      .onComplete
      .add(() => {
        this.state.restart();
        // let numberOfGradation = 3;
        // this.state.start('Game', true, false, numberOfGradation);
      }, this);
  }

  clickSettingsBtn() {
    this.state.start(
      'Settings',
      true,
      false,
      this.settingsBtn.data.color
    );
  }

  clickLeaderboardBtn() {
    this.createBlackoutAnimation()
      .onComplete
      .add(() => {
        this.state.restart();
      }, this);
  }

  clickShareBtn() {
    this.createBlackoutAnimation()
      .onComplete
      .add(() => {
        this.state.restart();
      }, this);
  }

  createBlackoutAnimation(delay = 0) {
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

    // this.game.debug.inputInfo(25, 25);
  }
}

Engine.Menu = Menu;
