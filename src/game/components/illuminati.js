class Illuminati extends Phaser.Graphics {
  constructor(game, x = 0, y = 0) {
    super(game, x, y);

    this.reDraw();
  }

  reDraw() {
    const size = 100;

    this.lineStyle(5, 0x00E676, 1);
    this.moveTo(0, size);
    this.lineTo(size, size);
    this.lineTo(size / 2, 0);
    this.lineTo(0, size);

    // this.lineStyle(5, 0x00E676, 1);
    this.drawEllipse(50, 60, 22, 10);
    this.drawEllipse(50, 54, 6, 4);
    // this.endFill();
  }
}

Engine.Illuminati = Illuminati;
