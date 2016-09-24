class Lvlpick extends Phaser.State {
  constructor() {
    super();
  }

  init(bgColor) {
    this.stage.backgroundColor = bgColor;
  }

  create() {
    this.animateBackground();

    this.createLable();
    this.createBtns();
  }

  render() {
    let line1 = new Phaser.Line(this.game.world.centerX, 0, this.game.world.centerX, this.game.height);
    let line2 = new Phaser.Line(0, this.game.world.centerY, this.game.width, this.game.world.centerY);

    this.game.debug.geom(line1, 'rgb(0, 70, 255)');
    this.game.debug.geom(line2, 'rgb(0, 70, 255)');
  }

  animateBackground() {
    const targetColor = 0x0;
    const targetRadius = Math.sqrt(Math.pow(this.game.width, 2) + Math.pow(this.game.height, 2));
    const animationTime = 350;

    let animation = {
      graphics: this.add.graphics(0, 0),
      _radius: 0,
      game: this.game,
    };

    Object.defineProperty(animation, 'radius', {
      get: function() { return this._radius; },
      set: function(value) {
        this._radius = value;

        this.graphics.beginFill(targetColor);
        this.graphics.drawCircle(this.game.world.centerX, this.game.world.centerY, this._radius);
        this.graphics.endFill();
      }
    });

    let tween = this.add.tween(animation)
      .to({
        radius: targetRadius
      }, animationTime)
      .start();

    tween.onComplete
      .add(() => {
        this.stage.backgroundColor = targetColor;
        animation.graphics.kill();
      }, this);
  }

  createLable() {
    const style = {
      font: '51px Open Sans',
      fill: 'white'
    };
    const animationTime = 1000;
    const animationDelay = 350;
    const marginTop = 100;

    this.lable = this.add.text(
      this.game.world.centerX,
      marginTop,
      'Select level',
      style
    );

    this.lable.anchor.setTo(0.5, 0);

    this.lable.alpha = 0;

    this.add.tween(this.lable)
      .to({
        alpha: 1
      }, animationTime)
      .delay(animationDelay)
      .start();
  }

  createBtns() {
    let testBtn = new Engine.LvlpickBtn(
      this.game,
      0,
      this.lable.y + this.lable.height + 15,
      0x00E5FF,
      1,
      2,
    );

    let testBtn2 = new Engine.LvlpickBtn(
      this.game,
      0,
      testBtn.y + testBtn.height + 15,
      0x00E5FF,
      2,
      2,
      true
    );

    let testBtn3 = new Engine.LvlpickBtn(
      this.game,
      0,
      testBtn2.y + testBtn2.height + 15,
      0x00E5FF,
      3,
      3
    );

    this.add.existing(testBtn);
    this.add.existing(testBtn2);
    this.add.existing(testBtn3);
  }
}

Engine.Lvlpick = Lvlpick;
