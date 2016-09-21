class LvlpickBtn extends Phaser.Graphics {
  constructor(game, x, y, color, number, stars, isLock) {
    super(game, x, y);

    this.data.color = color;
    this.data.stars = stars;
    this.data.isLock = isLock;
    this.data.number = number;

    this.reDraw();
    // this.add.text = 
  }

  reDraw() {
    const size = LvlpickBtn.size;
    const linewWidth = LvlpickBtn.lineWidth;
    const height = Math.sqrt(Math.pow(size, 2) - Math.pow(size / 2, 2));

    this.clear();

    this.lineStyle(linewWidth, this.data.color);

    this.moveTo(0, height);
    this.lineTo(size, height);
    this.lineTo(size / 2, 0);
    this.lineTo(0, height);
  }
}

LvlpickBtn.size = 128;
LvlpickBtn.lineWidth = 5;

Engine.LvlpickBtn = LvlpickBtn;
