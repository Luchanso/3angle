class LvlpickBtn extends Phaser.Graphics {
  constructor(game, x, y, number, isLock) {
    super(game, x, y);

    this.data.isLock = isLock;
    this.data.numberPosition = number;

    this.drawBtn();
    this.addText();
  }

  drawBtn() {
    const size = LvlpickBtn.size;
    const activeColor = 0xCFD8DC;// 0x9d9d9d;
    const lockedColor = 0x546E7A;

    let color;

    if (this.data.isLock) {
      color = lockedColor;
    } else {
      color = activeColor;
    }

    this.beginFill(color);
    this.drawRect(0, 0, size, size);
    this.endFill();
  }

  addText() {
    const size = LvlpickBtn.size;
    const style = {
      font: '23px Open Sans',
      fill: 'black'
    };

    this.lable = this.game.make.text(size / 2, size / 2, this.data.numberPosition, style);
    this.lable.anchor.setTo(0.5);

    this.addChild(this.lable);
  }
}

LvlpickBtn.size = 75;

Engine.LvlpickBtn = LvlpickBtn;
