class Game extends Phaser.State {
  constructor(game, numberOfGradation) {
    super();
    /**
     * Number of gradations will use in this game level
     * @type {[type]}
     */
    this.numberOfGradation = numberOfGradation;
  }

  create() {
    this.game.stage.backgroundColor = '#000';

    this.createGradations();

    this.sketch();
  }

  render() {
    // this.game.debug.inputInfo(50, 50, 'rgb(255, 255, 255)');
    // this.game.debug.geom(new Phaser.Line(this.game.world.centerX, 0, this.game.world.centerX, this.game.height), '#90CAF9');
    // this.game.debug.geom(new Phaser.Line(0, this.game.world.centerY, this.game.width, this.game.world.centerY), '#90CAF9');
  }

  createGradations() {
    this.gradations = [];

    let allGradation = Phaser.ArrayUtils.shuffle(Color.GRADATIONS);

    for (let i = 0; i < this.numberOfGradation; i++) {
      this.gradations.push(new Color(allGradation[i]));
    }
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

        let triangle = new Engine.Triangle(
          this.game,
          posX,
          posY,
          isRotated,
          this.game.rnd.pick(this.gradations)
        );

        this.game.add.existing(triangle);
      }
    }
  }
}

Engine.Game = Game;
