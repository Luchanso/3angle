class LvlpickBtn extends Phaser.Graphics {
  constructor(game, x, y, color, numberPositon, countStars, isLock = false) {
    super(game, x, y);

    this.data.color = color;
    this.data.countStars = countStars;
    this.data.isLock = isLock;
    this.data.numberPositon = numberPositon;
    this.data.defaultColor = 0xE0E0E0;
    this.data.lockColor = 0x9E9E9E;

    this.triangleSize = 47;

    this.drawTriangles();
  }

  drawTriangles() {
    const maxTriangles = 3;
    const margin = 15;
    const size = this.triangleSize;
    const summSize = size + (margin + size / 2) * (maxTriangles - 1);

    for (let i = 0; i < maxTriangles; i++) {
      let color = this.data.defaultColor;
      let x = this.game.world.centerX - summSize / 2 + (size / 2 + margin) * i;
      let y = 0;
      let isOdd = i % 2 !== 0;

      if (this.data.isLock) {
        color = this.data.lockColor;
      }
      else if (i < this.data.countStars) {
        color = this.data.color;
      }

      this.drawTriangle(x, y, color, isOdd);
    }
  }

  drawTriangle(x, y, color, isRotated = false) {
    const size = this.triangleSize;

    this.beginFill(color);

    if (isRotated) {
      this.moveTo(x, y);
      this.lineTo(x + size / 2, y + size);
      this.lineTo(x + size, y);
      this.lineTo(x, y);
    } else {
      this.moveTo(x, y + size);
      this.lineTo(x + size, y + size);
      this.lineTo(x + size / 2, y);
      this.lineTo(x, y + size);
    }

    this.endFill();
  }
}

Engine.LvlpickBtn = LvlpickBtn;
