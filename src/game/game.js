class Game extends Phaser.State {
  constructor() {
    super();

    window.gg = this;
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

    this.triangleMatrixWidth = 27;
    this.triangleMatrixHeight = 9;
  }

  create() {
    this.game.stage.backgroundColor = '#000';

    this.triangleGroup = this.game.add.group();

    this.createGradations();

    this.sketch();
    this.initEvents();
    this.createScoreLable();
    this.initializationFullScreen();

    this.forcePortrait = true;
  }

  render() {
    // this.game.debug.geom(new Phaser.Line(this.game.world.centerX, 0, this.game.world.centerX, this.game.height), 'rgba(255, 255, 255, 0.2)');
    // this.game.debug.geom(new Phaser.Line(0, this.game.world.centerY, this.game.width, this.game.world.centerY), 'rgba(255, 255, 255, 0.2)');
    // this.game.debug.inputInfo(50, 50, 'rgb(255, 255, 255)');
    // this.game.debug.geom(this.triangleGroup.getBounds(), 'rgba(37, 43, 189, 0.5)');
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
    for (let x = 0; x < this.triangleMatrixWidth; x++) {
      this.trianglesMatrix[x] = [];
      for (let y = 0; y < this.triangleMatrixHeight; y++) {
        let posX = x * (Engine.Triangle.size / 2 - 1);
        let posY = y * (Engine.Triangle.size - 1);
        let isRotated = x % 2 === 1;

        if (y % 2 === 1) {
          isRotated = !isRotated;
        }

        let triangle = new Engine.Triangle(
          this.game,
          posX,
          posY,
          isRotated,
          this.game.rnd.pick(this.colorSets), {
            x,
            y
          }
        );

        triangle.events.onInputOver.add(this.selectTriangle, this);
        triangle.events.onInputDown.add(this.selectTriangle, this);
        triangle.events.deleteComplete.add(this.recoverTriangle, this);

        this.trianglesMatrix[x][y] = triangle;
        this.triangleGroup.add(triangle);
      }
    }

    this.centeringMatrix();
  }

  /**
   * Destroy or unselect triangles
   */
  destroyTriangle() {
    let isUnselect = this.selectedTriangles.length < this.minTrianglesDestroy;

    if (!isUnselect) {
      this.updateScore(Math.pow(this.selectedTriangles.length, 2.15) * 10);
    }

    while (this.selectedTriangles.length > 0) {
      let triangle = this.selectedTriangles.pop();
      if (isUnselect) {
        triangle.unselect();
      } else {
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
      } else if (!triangle.selected &&
        this.canTriangleLink(lastSelectedTriangle, triangle) &&
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
  canTriangleLink(tr1, tr2) {
    if (tr1.matrixPos.y === tr2.matrixPos.y) {
      if (tr1.matrixPos.x + 1 === tr2.matrixPos.x ||
        tr1.matrixPos.x - 1 === tr2.matrixPos.x) {
        return true;
      }
    } else if (tr1.matrixPos.x === tr2.matrixPos.x) {
      if (tr1.matrixPos.x % 2 === 0) {
        if (tr1.isRotated && tr2.matrixPos.y === tr1.matrixPos.y - 1) {
          return true;
        } else if (!tr1.isRotated && tr2.matrixPos.y === tr1.matrixPos.y + 1) {
          return true;
        }
      } else {
        if (!tr1.isRotated && tr2.matrixPos.y === tr1.matrixPos.y + 1) {
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
    const marginRight = 15;
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

    // TODO: TEMP
    this.scoreLable.inputEnabled = true;
    this.scoreLable.events.onInputDown.add(this.toggleFullScreen, this);
  }

  initializationFullScreen() {
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.RESIZE;
    this.game.scale.onFullScreenChange
      .add(this.resizeScreen, this);
  }

  toggleFullScreen() {
    if (this.game.scale.isFullScreen) {
      this.game.scale.stopFullScreen();
    } else {
      this.game.scale.startFullScreen();
    }
  }

  updateScore(val) {
    val = Math.round(val);

    this.score += val;
    this.scoreLable.changeValue(this.score);
  }

  resizeScreen() {
    this.scoreLable.x = this.game.width - 15;
    this.scoreLable.y = 15;

    this.centeringMatrix();
  }

  centeringMatrix() {
    const halfTriangleSize = Engine.Triangle.size / 2;

    this.triangleGroup.x = this.game.width / 2 - this.triangleGroup.width / 2 + halfTriangleSize;
    this.triangleGroup.y = this.game.height / 2 - this.triangleGroup.height / 2 + halfTriangleSize;
  }
}

Engine.Game = Game;
