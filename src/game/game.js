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
     * Tone system manager
     * @type {Engine}
     */
    this.tone = new Engine.Tone(this.game);

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

    this.triangleMatrixWidth = 25;
    this.triangleMatrixHeight = 9;
  }

  create() {
    this.game.stage.backgroundColor = '#000';

    this.createUniverse();
    this.createGradations();

    this.triangleGroup = this.game.add.group();

    this.tone.create();

    this.sketch();
    this.initEvents();
    this.createWave();
    this.createSounds();
    this.createSnakes();
    this.createHintTimer();
    this.createScoreLable();
    this.initializationFullScreen();

    this.createMeteor();

    this.forcePortrait = true;
  }

  render() {
  }

  update() {
  }

  createSnakes() {
    const snakesPullSize = 30;
    this.snakes = this.game.add.group();

    for (let i = 0; i < snakesPullSize; i++) {
      let snake = new Engine.Snake(this.game);
      snake.kill();

      this.snakes.add(snake);
    }
  }

  createSounds() {
    // this.music1 = this.game.sound.add('music1', 1, true);
    // this.music1.play();
  }

  createGradations() {
    let allGradation = Phaser.ArrayUtils.shuffle(ColorSet.GRADATIONS);

    for (let i = 0; i < this.numberOfGradation; i++) {
      let colorSet = new ColorSet(allGradation[i]);
      this.colorSets.push(colorSet);
    }
  }

  createUniverse() {
    /**
     * Rotation speed for second universe
     * @type {Number}
     */
    const secondRotationSpeed = 5;

    this.universeFirst = new Engine.Universe(this.game);
    this.universeSecond = new Engine.Universe(this.game, secondRotationSpeed);

    this.game.add.existing(this.universeFirst);
    this.game.add.existing(this.universeSecond);
  }

  createHintTimer() {
    const hintTimeout = 20000;
    this.hintTimer = this.game.time.create();

    this.hintTimer.loop(hintTimeout, this.visualisationHint, this);
  }

  createMeteor() {
    const meteorTimerDelay = 20 * 1000;

    this.meteor = new Engine.Meteor(this.game);
    this.game.add.existing(this.meteor);
    this.meteor.sendToBack();
    this.meteor.outOfCameraBoundsKill = true;
    this.meteor.kill();

    this.meteorTimer = this.game.time.create();
    this.meteorTimer.loop(meteorTimerDelay, () => {
      if (this.game.rnd.pick([true, false])) {
        this.runMeteor();
      }
    }, this);
    this.meteorTimer.start();
  }

  createWave() {
    this.wave = new Engine.Wave(this.game, 0, 0);

    this.game.add.existing(this.wave);
  }

  runMeteor() {
    const marginX = this.game.width / 10;
    const marginY = this.game.height / 10;
    const marginRotation = Math.PI / 10;
    let x, y, rotation;
    let side = this.game.rnd.pick(['top', 'left', 'right', 'bottom']);

    switch (side) {
      case 'top':
        x = this.game.rnd.between(marginX, this.game.width - marginX);
        y = 0;
        rotation = this.game.rnd.realInRange(marginRotation, Math.PI - marginRotation);
        break;
      case 'left':
        x = 0;
        y = this.game.rnd.between(marginY, this.game.height - marginY);
        rotation = this.game.rnd.realInRange(-Math.PI / 2 + marginRotation, Math.PI / 2 - marginRotation);
        break;
      case 'right':
        x = this.game.width;
        y = this.game.rnd.between(marginY, this.game.height - marginY);
        rotation = this.game.rnd.realInRange(Math.PI / 2 + marginRotation, Math.PI * 3 / 2 - marginRotation);
        break;
      case 'bottom':
        x = this.game.rnd.between(marginX, this.game.width - marginX);
        y = this.game.height;
        rotation = this.game.rnd.realInRange(marginRotation, -Math.PI + marginRotation);
        break;
    }

    this.meteor.reset(x, y, rotation);
  }

  visualisationHint() {
    let triangle = this.getHintTriangle();

    if (triangle !== undefined)
      triangle.hintMe();
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
    const delayForDisplay = 500;

    for (let x = 0; x < this.triangleMatrixWidth; x++) {
      this.trianglesMatrix[x] = [];
      for (let y = 0; y < this.triangleMatrixHeight; y++) {
        let posX = x * (Engine.Triangle.size / 2 - 1);
        let posY = y * (Engine.Triangle.size - 1);
        let isRotated = x % 2 === 1;
        let colorSet = this.game.rnd.pick(this.colorSets);

        if (y % 2 === 1) {
          isRotated = !isRotated;
        }

        let triangle = new Engine.Triangle(
          this.game,
          posX,
          posY,
          isRotated,
          colorSet, {
            x,
            y
          }
        );

        triangle.growUp(delayForDisplay + (x + y) * 25);

        triangle.events.onInputOver.add(this.selectTriangle, this);
        triangle.events.onInputDown.add(this.selectTriangle, this);
        triangle.events.deleteComplete.add(this.recoverTriangle, this);

        this.trianglesMatrix[x][y] = triangle;
        // this.add.existing(triangle);
        this.triangleGroup.add(triangle);
      }
    }

    this.centeringMatrix();
  }

  /**
   * Destroy or unselect triangles
   */
  destroyTriangle() {
    this.tone.reset();

    let isUnselect = this.selectedTriangles.length < this.minTrianglesDestroy;

    if (!isUnselect) {
      this.updateScore(Math.pow(this.selectedTriangles.length, 2.15) * 10);
      this.shakeItShakeIt();
      this.hintTimer.stop(false);
      this.hintTimer.start();
    }

    const betweenAnimationDalay = 25;
    const snakeForTriangle = 2;

    for (let i = 0; this.selectedTriangles.length > 0; i++) {
      let triangle = this.selectedTriangles.shift();

      if (isUnselect) {
        triangle.unselect();
      } else {
        triangle.delete(i * betweenAnimationDalay);
        if (this.selectedTriangles.length === 0) {
          this.snakesAnimationRun(triangle.world.x, triangle.world.y, triangle.colorSet, Math.floor((i + 1) / snakeForTriangle));
          this.wave.playAnimation(triangle.world.x, triangle.world.y, triangle.isRotated);
        }
      }
    }

    if (!isUnselect) {
      let timerExistMove = this.game.time.create();

      timerExistMove.add(
        Triangle.animationTimeDelete +
        Triangle.animationTimeRecover,
        this.processPosition,
        this
      );

      timerExistMove.start();
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
      // this.tone.up();
      this.selectedTriangles.push(triangle);
    } else {
      let lastSelectedTriangle = this.selectedTriangles[this.selectedTriangles.length - 1];
      let preLastSelectedTriangle = this.selectedTriangles[this.selectedTriangles.length - 2];

      if (triangle.selected && triangle === preLastSelectedTriangle) {
        lastSelectedTriangle.unselect();
        // this.tone.low()
        this.selectedTriangles.pop();
      } else if (!triangle.selected &&
        this.canTriangleLink(lastSelectedTriangle, triangle) &&
        lastSelectedTriangle.colorSet === triangle.colorSet
      ) {
        triangle.select();
        // this.tone.up();
        this.selectedTriangles.push(triangle);
      }
    }
  }

  /**
   * Check triangles link
   */
  canTriangleLink(tr1, tr2) {
    let result = false;
    if (tr1.matrixPos.y === tr2.matrixPos.y) {
      if (tr1.matrixPos.x + 1 === tr2.matrixPos.x ||
        tr1.matrixPos.x - 1 === tr2.matrixPos.x) {
        result = true;
      }
    } else if (tr1.matrixPos.x === tr2.matrixPos.x) {
      if (tr1.matrixPos.x % 2 === 0) {
        if (tr1.isRotated && tr2.matrixPos.y === tr1.matrixPos.y - 1) {
          result = true;
        } else if (!tr1.isRotated && tr2.matrixPos.y === tr1.matrixPos.y + 1) {
          result = true;
        }
      } else {
        if (!tr1.isRotated && tr2.matrixPos.y === tr1.matrixPos.y + 1) {
          result = true;
        } else if (tr1.isRotated && tr2.matrixPos.y === tr1.matrixPos.y - 1) {
          result = true;
        }
      }
    }

    return result;
  }

  /**
   * Add score on stage
   */
  createScoreLable() {
    const randomColorSet = this.game.rnd.pick(this.colorSets);
    const color = '#00E676'; // + Phaser.Color.componentToHex(randomColorSet.getLastColor());
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

    this.universeFirst.resize();
    this.universeSecond.resize();

    this.centeringMatrix();
  }

  centeringMatrix() {
    const halfTriangleSize = Engine.Triangle.size / 2;

    this.triangleGroup.x = this.game.width / 2 - this.triangleGroup.width / 2 + halfTriangleSize;
    this.triangleGroup.y = this.game.height / 2 - this.triangleGroup.height / 2 + halfTriangleSize;
  }

  rebuildMap() {
    const timeDelay = 50;

    for (let x = 0; x < this.triangleMatrixWidth; x++) {
      for (let y = 0; y < this.triangleMatrixHeight; y++) {
        let triangle = this.trianglesMatrix[x][y];
        let randomColorSet = this.game.rnd.pick(this.colorSets);

        triangle.updateColor(randomColorSet, x * timeDelay + y * timeDelay);
      }
    }
  }

  processPosition() {
    if (this.getSomeCombination().length === 0) {
      const delayDestroy = 5000;
      let timer = this.game.time.create();

      timer.add(delayDestroy, this.rebuildMap, this);
      timer.start(0);
    }
  }

  getHintTriangle() {
    return this.game.rnd.pick(this.getSomeCombination());
  }

  /**
   * Get existing combination, if we haven't exist move, then return empty array
   */
  getSomeCombination() {
    let usedCell = [];
    let triangles = [];

    for (let x = 0; x < this.triangleMatrixWidth; x++) {
      usedCell[x] = [];
      for (let y = 0; y < this.triangleMatrixHeight; y++) {
        usedCell[x][y] = false;
      }
    }

    for (let x = 0; x < this.triangleMatrixWidth; x++) {
      for (let y = 0; y < this.triangleMatrixHeight; y++) {
        if (!usedCell[x][y] && this.hasCombination(usedCell, this.trianglesMatrix[x][y].colorSet, x, y, 1)) {
          triangles.push(this.trianglesMatrix[x][y]);
        }
      }
    }

    return triangles;
  }

  hasCombination(usedCell, colorSet, x, y, cnt) {
    if (colorSet !== this.trianglesMatrix[x][y].colorSet || usedCell[x][y]) {
      return (cnt > this.minTrianglesDestroy);
    }

    usedCell[x][y] = true;
    if (x + 1 < this.triangleMatrixWidth) {
      if (this.hasCombination(usedCell, colorSet, x + 1, y, cnt + 1)) {
        return true;
      }
    }

    if (x - 1 >= 0) {
      if (this.hasCombination(usedCell, colorSet, x - 1, y, cnt + 1)) {
        return true;
      }
    }

    if (this.trianglesMatrix[x][y].isRotated) {
      if (y - 1 >= 0) {
        if (this.hasCombination(usedCell, colorSet, x, y - 1, cnt + 1)) {
          return true;
        }
      }
    } else {
      if (y + 1 < this.triangleMatrixHeight) {
        if (this.hasCombination(usedCell, colorSet, x, y + 1, cnt + 1)) {
          return true;
        }
      }
    }

    return false;
  }

  shakeItShakeIt() {
    let x = this.triangleGroup.x;
    let y = this.triangleGroup.y;
    let amplitudeY = 0.75;
    let amplitudeX = 2;
    let timeAnimation = 20;

    this.add.tween(this.triangleGroup)
      .to({
        x: x + amplitudeX, y: y + amplitudeY
      }, timeAnimation, Phaser.Easing.Linear.None)
      .to({
        x: x - amplitudeX, y: y - amplitudeY
      }, timeAnimation, Phaser.Easing.Linear.None)
      .to({
        x, y
      }, timeAnimation, Phaser.Easing.Linear.None)
      .start();

  }

  snakesAnimationRun(x, y, colorGradation, count) {
    const force = 25;

    for (let i = 0; i < count; i++) {
      let snake = this.snakes.getFirstDead();

      let angle = (Math.PI * 2) / count * i;
      let impulseX = Math.cos(angle) * force;
      let impulseY = Math.sin(angle) * force;
      snake.run(x,
        y,
        this.scoreLable.world.x,
        this.scoreLable.world.y,
        impulseX,
        impulseY,
        colorGradation.getRandomColor()
      );
    }
  }
}

Engine.Game = Game;
