class Game extends Phaser.State {
  constructor() {
    super();
  }

  create() {
    this.game.stage.backgroundColor = '#000';

    this.sketch();
  }

  render() {
    // this.game.debug.inputInfo(50, 50, 'rgb(255, 255, 255)');
    // this.game.debug.geom(new Phaser.Line(this.game.world.centerX, 0, this.game.world.centerX, this.game.height), '#90CAF9');
    // this.game.debug.geom(new Phaser.Line(0, this.game.world.centerY, this.game.width, this.game.world.centerY), '#90CAF9');
  }

  sketch() {
    const margin = 32;
    const padding = 0;

    for (let x = 0; x < 25; x++) {
      for (let y = 0; y < 9; y++) {
        let posX = margin + x * (Engine.Triangle.size / 2 + padding - 1);
        let posY = margin + y * (Engine.Triangle.size + padding - 1);
        let isRotated = x % 2 === 1;

        if (y % 2 === 1) {
          isRotated = !isRotated;
        }

        // if (y % 2 === 0) {
        //   posX += Engine.Triangle.size / 2;
        // }

        let triangle = new Engine.Triangle(
          this.game,
          posX,
          posY,
          isRotated
        );

        this.game.add.existing(triangle);

        triangle.tint = this.game.rnd.pick([
          // indigo
          0x3F51B5,
          0x3949AB,
          0x303F9F,
          0x283593,
          // blue
          0x2196F3,
          0x1E88E5,
          0x1976D2,
          0x1565C0,
          // yellow
          0xFFF176,
          0xFFEE58,
          0xFFEB3B,
          0xFDD835,
          // pink
          0xE91E63,
          0xD81B60,
          0xC2185B,
          0xAD1457,
          // brow
          0x795548,
          0x6D4C41,
          0x5D4037,
          0x4E342E,
          // Deep Orange
          0xFF5722,
          0xF4511E,
          0xE64A19,
          0xD84315,
          // Grey
          0x9E9E9E,
          0x757575,
          0x616161,
          0x424242,
          // Red
          0xF44336,
          0xE53935,
          0xD32F2F,
          0xC62828,
        ]);
      }
    }
  }
}

Engine.Game = Game;
