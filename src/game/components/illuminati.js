class Illuminati extends Phaser.Sprite {
  constructor(game, x = 0, y = 0) {
    const ratioSize = 0.4;

    super(game, x, y, 'illuminati', 0);

    this.create3DAnimation();
    this.createActionTimer();

    this.width *= ratioSize;
    this.height *= ratioSize;

    this.lastTweens = {};
  }

  create3DAnimation() {
    this.sprite3DLeft = this.game.make.sprite(0, 0, 'illuminati3d-1');
    this.sprite3DLeft.alpha = 0;

    this.sprite3DRight = this.game.make.sprite(0, 0, 'illuminati3d-2');
    this.sprite3DRight.alpha = 0;

    this.addChild(this.sprite3DLeft);
    this.addChild(this.sprite3DRight);
  }

  createActionTimer() {
    const actionDelay = 10000;

    this.actionTimer = this.game.time.create();
    this.actionTimer.loop(actionDelay, this.action, this);
    this.actionTimer.start();
  }

  action() {
    const actions = [
      this.animate3D,
    ];

    let callbackAction = this.game.rnd.pick(actions);

    callbackAction.bind(this)();
  }

  animate3D() {
    const maxOffsetX = 45;
    const maxOffsetY = 5;
    const animationTime = 1000;
    const targetAlpha = 0.5;
    const animationFunc = Illuminati.animation3DEasing

    if (this.tweensIsStarted()) {
      return;
    }

    let tweenLeft = this.game.add.tween(this.sprite3DLeft)
      .to({
        x: this.sprite3DLeft.x - maxOffsetX,
        y: this.sprite3DLeft.y - maxOffsetY,
        alpha: targetAlpha
      }, animationTime, animationFunc)
      .to({
        x: this.sprite3DLeft.x,
        y: this.sprite3DLeft.y,
        alpha: 0
      }, animationTime, animationFunc)
      .start();

    let tweenRight = this.game.add.tween(this.sprite3DRight)
      .to({
        x: this.sprite3DRight.x + maxOffsetX,
        y: this.sprite3DRight.y + maxOffsetY,
        alpha: targetAlpha
      }, animationTime, animationFunc)
      .to({
        x: this.sprite3DRight.x,
        y: this.sprite3DRight.y,
        alpha: 0
      }, animationTime, animationFunc)
      .start();

    this.lastTweens.tween3DLeft = tweenLeft;
    this.lastTweens.tween3DRight = tweenRight;
  }

  tweensIsStarted() {
    return this.lastTweens.tween3DLeft &&
      (
        this.lastTweens.tween3DLeft.isRunning ||
        this.lastTweens.tween3DRight.isRunning
      );
  }

  static animation3DEasing(time) {
      let result = 0;
      let min = 0;
      let max = 0;

      if (time < 0.1) {
        min = 0; max = 0.1;
      } else if (time < 0.2) {
        min = 0.1; max = 0.2;
      } else if (time < 0.3) {
        min = 0.1; max = 0.7;
      } else if (time < 0.4) {
        min = 0.1; max = 0.35;
      } else if (time < 0.5) {
        min = 0.3; max = 0.67;
      } else if (time < 0.6) {
        min = 0.4; max = 0.8;
      } else if (time < 0.7) {
        min = 0.5; max = 1;
      } else if (time < 0.8) {
        min = 0.65; max = 1;
      } else if (time < 0.9) {
        min = 0.7; max = 1.5;
      } else if (time < 0.99) {
        min = 0.95; max = 1;
      } else {
        min = 1; max = 1;
      }

      result = min + Math.random() * (max - min);

      return result;
  }
}

Engine.Illuminati = Illuminati;
