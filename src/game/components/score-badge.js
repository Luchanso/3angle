class ScoreBadge extends Phaser.Graphics {
  constructor(game, x, y) {
    super(game, x, y);

    this.createLable();
    this.reDrawBadge();

    this.isVisible = false;
    this.alpha = 0;
  }

  get score() {
    return this._score
  }
  set score(value) {
    this._score = value;
    this.lable.text = value.toString();
    this.reDrawBadge();
  }

  createLable() {
    const style = {
      font: '26px Open Sans',
      fill: 'white'
    }

    this.lable = this.game.make.text(0, 0, '0', style);
    this.lable.anchor.setTo(0.5);

    this.addChild(this.lable);
  }

  reDrawBadge() {
    const backgroundColor = 0;
    const radius = 5;
    const paddings = 5;

    this.clear();

    this.beginFill(backgroundColor, 0.8);
    this.drawRoundedRect(-(this.lable.width + paddings * 2) / 2, -(this.lable.height + paddings) / 2, this.lable.width + paddings * 2, this.lable.height, radius);
    this.endFill();
  }

  show() {
    if (this.isVisible) {
      return;
    }

    const animationTime = 1000;

    let tween = this.game.add.tween(this)
      .to({
        width: this.width,
        height: this.height,
      }, animationTime, Phaser.Easing.Elastic.Out);

    this.width = 0;
    this.height = 0;
    this.alpha = 1;

    tween.start();

    this.isVisible = true;
  }

  hide() {
    if (!this.isVisible) {
      return;
    }

    const animationTime = 250;
    const width = this.width;
    const height = this.height;

    let tween = this.game.add.tween(this)
      .to({
        width: 0,
        height: 0
      }, animationTime, Phaser.Easing.Back.In);

    tween.onComplete
      .add(() => {
        this.width = width;
        this.height = height;
        this.alpha = 0;
      }, this);

    tween.start();

    this.isVisible = false;
  }
}

Engine.ScoreBadge = ScoreBadge;
