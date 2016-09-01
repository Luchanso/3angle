class Game extends Phaser.State {
  constructor() {
    super();
  }

  create() {
    this.game.stage.backgroundColor = '#FFF';

    this.sketch();
  }

  render() {
    // this.game.debug.geom(new Phaser.Line(this.game.world.centerX, 0, this.game.world.centerX, this.game.height), '#90CAF9');
    // this.game.debug.geom(new Phaser.Line(0, this.game.world.centerY, this.game.width, this.game.world.centerY), '#90CAF9');
  }

  sketch() {
    const margin = 64;
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
          0x3F51B5,
          0x3949AB,
          0x303F9F,
          0x283593
        ]);
      }
    }
  }
}

Engine.Game = Game;
