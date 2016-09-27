class Lvlpick extends Phaser.State {
  constructor() {
    super();
  }

  init(bgColor) {
    this.stage.backgroundColor = bgColor;

    this.btnGridWidth = 5;
    this.btnGridHeight = 3;
  }

  create() {
    this.animateBackground();

    this.createLabel();
    this.createBtns();
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

  createLabel() {
    const style = {
      font: '51px Open Sans',
      fill: 'white'
    };
    const animationTime = 1000;
    const animationDelay = 350;
    const marginTop = 100;

    this.label = this.add.text(
      this.game.world.centerX,
      marginTop,
      'Select level',
      style
    );

    this.label.anchor.setTo(0.5, 0);

    this.label.alpha = 0;

    this.add.tween(this.label)
      .to({
        alpha: 1
      }, animationTime)
      .delay(animationDelay)
      .start();
  }

  createBtns() {
    const lvl = Engine.Lvl.instance;
    const margin = 50;
    const btnSize = Engine.LvlpickBtn.size;
    const animationDelay = 350;
    const animationTime = 250;

    let number = 1;

    this.btnGroup = this.add.group();

    for (let y = 0; y < this.btnGridHeight; y++) {
      for (let x = 0; x < this.btnGridWidth; x++, number++) {
        let posX = x * (btnSize + margin);
        let posY = y * (btnSize + margin);
        let status;

        if (lvl.opend.includes(number)) {
          status = LvlpickBtn.STATUS_ACTIVE;
        } else if (lvl.done.includes(number)) {
          status = LvlpickBtn.STATUS_DONE;
        } else {
          status = LvlpickBtn.STATUS_LOCKED;
        }

        let btn = new Engine.LvlpickBtn(
          this.game,
          posX,
          posY,
          number,
          status
        );

        btn.alpha = 0;

        if (status !== LvlpickBtn.STATUS_LOCKED) {
          btn.inputEnabled = true;
          btn.events.onInputDown.add(this.btnClick, this);
        }

        this.add.tween(btn)
          .to({
            alpha: 1
          }, animationTime)
          .delay(animationDelay)
          .start();

        this.btnGroup.add(btn);
      }
    }

    this.btnGroup.x = this.game.width / 2 - this.btnGroup.width / 2;
    this.btnGroup.y = this.game.height / 2 - this.btnGroup.height / 2;
  }

  btnClick(btn) {
    // console.log(this.world.children);
    this.fadeAnimation()
      .onComplete
      .add(() => {
        this.state.start('Game', true, false, 3);
      }, this);
  }

  fadeAnimation() {
    const animationTime = 250;
    let lastTween = {}

    for (let displayObj of this.world.children) {
      lastTween = this.add.tween(displayObj)
        .to({
          alpha: 0
        }, animationTime)
        .start();
    }

    return lastTween;
  }
}

Engine.Lvlpick = Lvlpick;
