class Game extends Phaser.State {
  constructor() {
    super();
  }

  init(numberOfGradation) {
    this.colorSets = [];
    /**
     * Number of colorSets will use in this game level
     * @type {[type]}
     */
    this.numberOfGradation = numberOfGradation;

    /**
     * Margin of triangles matrix
     * @type {Number}
     */
    this.margin = 32;

    this.trianglesMatrix = [];
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
    let allGradation = Phaser.ArrayUtils.shuffle(ColorSet.GRADATIONS);

    for (let i = 0; i < this.numberOfGradation; i++) {
      let colorSet = new ColorSet(allGradation[i]);
      this.colorSets.push(colorSet);
    }
  }

  /**
   * Create triangles on canvas
   */
  sketch() {
    for (let x = 0; x < 25; x++) {
      this.trianglesMatrix[x] = [];
      for (let y = 0; y < 9; y++) {
        let posX = this.margin + x * (Engine.Triangle.size / 2 - 1);
        let posY = this.margin + y * (Engine.Triangle.size - 1);
        let isRotated = x % 2 === 1;

        if (y % 2 === 1) {
          isRotated = !isRotated;
        }

        let triangle = new Engine.Triangle(
          this.game,
          posX,
          posY,
          isRotated,
          this.game.rnd.pick(this.colorSets)
        );

        triangle.events.triangleDelete.add(this.recoverTriangle, this);

        this.trianglesMatrix[x][y] = triangle;
      }
    }
  }

  recoverTriangle(triangle) {
    triangle.recover(this.game.rnd.pick(this.colorSets));
  }
}

Engine.Game = Game;
