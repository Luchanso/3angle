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
     * MarginTop of triangles matrix
     * @type {Number}
     */
    this.marginTop = 100;

    /**
     * MarginLeft of triangles matrix
     * @type {Number}
     */
    this.marginLeft = 64;

    /**
     * Minimal triangles destroy length
     * @type {Number}
     */
    this.minTrianglesDestroy = 3;

    this.trianglesMatrix = [];
    this.selectedTriangles = [];

    this.score = 0;
  }

  create() {
    this.game.stage.backgroundColor = '#000';

    this.createGradations();

    this.sketch();
    this.initEvents();
    this.createScoreLable();
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
   * Initialization event in the game
   */
  initEvents() {
    this.game.input.onUp.add(this.destroyTriangle, this);
  }

  /**
   * Create triangles on canvas
   */
  sketch() {
    for (let x = 0; x < 27; x++) {
      this.trianglesMatrix[x] = [];
      for (let y = 0; y < 9; y++) {
        let posX = this.marginLeft + x * (Engine.Triangle.size / 2 - 1);
        let posY = this.marginTop + y * (Engine.Triangle.size - 1);
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
        // triangle.events.onInputOut.add(this.selectTriangle, this);
        triangle.events.deleteComplete.add(this.recoverTriangle, this);

        this.trianglesMatrix[x][y] = triangle;
      }
    }
  }

  /**
   * Destroy or unselect triangles
   */
  destroyTriangle() {
    if (this.selectedTriangles.length < this.minTrianglesDestroy) {
      while (this.selectedTriangles.length > 0) {
        let triangle = this.selectedTriangles.pop();
        triangle.unselect();
      }
    } else {
      this.updateScore(Math.pow(this.selectedTriangles.length, 2.15) * 10);

      while (this.selectedTriangles.length > 0) {
        let triangle = this.selectedTriangles.pop();
        triangle.delete();
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
      let preLastSelectedTriangle = this.selectedTriangles[this.selectedTriangles.length - 2];

      if (triangle.selected && triangle === preLastSelectedTriangle) {
        lastSelectedTriangle.unselect();
        this.selectedTriangles.pop();
      } else if (
        !triangle.selected &&
        this.checkTriangleLink(lastSelectedTriangle, triangle) &&
        lastSelectedTriangle.colorSet === triangle.colorSet
      ) {
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

  /**
   * Add score on stage
   */
  createScoreLable() {
    const randomColorSet = this.game.rnd.pick(this.colorSets);
    const color = '#fff'; // + Phaser.Color.componentToHex(randomColorSet.getLastColor());
    const marginRight = 25;
    const marginTop = 15;

    const style = {
      font: '42px Open Sans',
      fontStyle: 'italic',
      fill: color
    }

    this.scoreLable = new Engine.ScoreLable(
      this.game,
      this.game.width - marginRight,
      marginTop,
      0,
      style
    );
    this.scoreLable.anchor.setTo(1, 0);
  }

  updateScore(val) {
    val = Math.round(val);

    this.score += val;
    this.scoreLable.changeValue(this.score);

    console.log(this.score);
  }
}

Engine.Game = Game;
