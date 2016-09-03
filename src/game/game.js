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
    this.selectedTriangles = [];
  }

  create() {
    this.game.stage.backgroundColor = '#000';

    this.createGradations();

    this.sketch();
  }

  render() {
    // this.game.debug.inputInfo(50, 50, 'rgb(255, 255, 255)');
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
          this.game.rnd.pick(this.colorSets),
          { x, y }
        );

        triangle.events.onInputOver.add(this.selectTriangle, this);
        triangle.events.onInputDown.add(this.selectTriangle, this);
        triangle.events.deleteComplete.add(this.recoverTriangle, this);

        this.trianglesMatrix[x][y] = triangle;
      }
    }
  }

  recoverTriangle(triangle) {
    triangle.recover(this.game.rnd.pick(this.colorSets));
  }

  selectTriangle(triangle, point) {
    if (!this.game.input.activePointer.isDown) {
      return;
    }

    if (this.selectedTriangles.length === 0) {
      triangle.select();
      this.selectedTriangles.push(triangle);
    } else {
      let lastSelectedTriangle = this.selectedTriangles[this.selectedTriangles.length - 1];

      if (this.checkTriangleLink(lastSelectedTriangle, triangle)) {
        triangle.select();
        this.selectedTriangles.push(triangle);
      }
    }
  }

  /**
   * Check triangles link
   */
  checkTriangleLink(tr1, tr2) {
    if (tr1.matrixPos.y === tr2.matrixPos.y ) {
      if (tr1.matrixPos.x + 1 === tr2.matrixPos.x ||
          tr1.matrixPos.x - 1 === tr2.matrixPos.x) {
            return true;
      }
    } else if (tr1.matrixPos.x === tr2.matrixPos.x) {
      if (tr1.matrixPos.x % 2 === 0) {
        if (tr1.isRotated && tr2.matrixPos.y === tr1.matrixPos.y  - 1) {
          return true;
        } else if (!tr1.isRotated && tr2.matrixPos.y === tr1.matrixPos.y + 1) {
          return true;
        }
      } else {
        if (!tr1.isRotated && tr2.matrixPos.y === tr1.matrixPos.y  + 1) {
          return true;
        } else if (tr1.isRotated && tr2.matrixPos.y === tr1.matrixPos.y - 1) {
          return true;
        }
      }
    }

    return false;
  }
}

Engine.Game = Game;