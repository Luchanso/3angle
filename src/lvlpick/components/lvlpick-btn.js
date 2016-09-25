class LvlpickBtn extends Phaser.Graphics {
  constructor(game, x, y, number, status) {
    super(game, x, y);

    this.data.status = status;
    this.data.numberPosition = number;

    this.drawBtn();
    this.addText();
  }

  drawBtn() {
    const size = LvlpickBtn.size;
    const activeColor = 0xCFD8DC;
    const lockedColor = 0x546E7A;
    const doneColor = 0x00E676;

    let color;

    switch (this.data.status) {
      case LvlpickBtn.STATUS_LOCKED:
        color = lockedColor;
        break;

      case LvlpickBtn.STATUS_ACTIVE:
        color = activeColor;
        break;

      case LvlpickBtn.STATUS_DONE:
        color = doneColor;
        break;
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
LvlpickBtn.STATUS_LOCKED = 1;
LvlpickBtn.STATUS_ACTIVE = 2;
LvlpickBtn.STATUS_DONE = 3;
LvlpickBtn.size = 75;

Engine.LvlpickBtn = LvlpickBtn;
