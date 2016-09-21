class Lvlpick extends Phaser.State {
  constructor() {
    super();
  }

  init(bgColor) {
    this.stage.backgroundColor = bgColor;
  }

  create() {
    this.createLable();
    this.createBtns();
  }

  render() {
    // this.game.debug.geom(
    //   new Phaser.Rectangle(
    //     this.btnGroup.x,
    //     this.btnGroup.y,
    //     this.btnGroup.width,
    //     this.btnGroup.height
    //   ),
    //   'rgba(53, 204, 61, 0.4)'
    // );
  }

  createLable() {
    const style = {
      font: '51px Open Sans',
      fill: 'white'
    };
    const animationTime = 1000;

    this.lable = this.add.text(
      this.game.world.centerX,
      this.game.height / 8,
      'Select level',
      style
    );

    this.lable.anchor.setTo(0.5);

    this.lable.alpha = 0;

    this.add.tween(this.lable)
      .to({
        alpha: 1
      }, animationTime)
      .start();
  }

  createBtns() {
    const marginLeft = 64;
    const marginTop = 64;
    const size = Engine.LvlpickBtn.size;

    this.btnGroup = this.add.group();

    for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 3; y++) {
        let btn = new Engine.LvlpickBtn(
          this.game,
          x * (size + marginLeft),
          y * (size + marginTop),
          0xFFFFFF,
          3,
          false
        );

        this.btnGroup.add(btn);
      }
    }

    this.btnGroup.x = this.game.width / 2 - this.btnGroup.width / 2;
    this.btnGroup.y = this.game.height / 2 - this.btnGroup.height / 2;
  }
}

Engine.Lvlpick = Lvlpick;
