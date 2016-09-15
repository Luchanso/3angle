class Snake extends Phaser.Graphics {
  constructor(game) {
    super(game, 0, 0);

    this.head = {
      x: 0,
      y: 0,
    };
    this.velocityX = 0;
    this.velocityY = 0;
    this.segments = [];
  }

  run(x, y, targetX, targetY, impulseX, impulseY, color) {
    const speed = 50;

    let angle = this.game.math.angleBetween(x, y, targetX, targetY);
    let velocityX = Math.cos(angle) * speed;
    let velocityY = Math.sin(angle) * speed;

    this.targetX = targetX;
    this.targetY = targetY;
    this.velocityX = impulseX;
    this.velocityY = impulseY;
    this.color = color;
    this.segments = [];
    this.head = {
      x,
      y,
    };

    // BUG: Fix it
    // When snake have big impulse and big speed, then trajectory not correctly
    let tween = this.game.add.tween(this)
      .to({
        velocityX,
        velocityY,
      }, 200)
      .start();

    this.isRun = true;
    this.finishPhase = false;
  }

  update() {
    if (this.isRun) {
      this.head.x += this.velocityX;
      this.head.y += this.velocityY;
      this.makeSnapshot();
    }

    if (this.finishPhase) {
      this.makeSnapshot();
    }

    if (this.isFinish()) {
      this.stop();
    }
    this.drawAllSegments();
  }

  stop() {
    const finishPhaseTime = 2000;
    let timer = this.game.time.create();

    this.isRun = false;
    this.finishPhase = true;

    timer.add(finishPhaseTime, () => {
      this.finishPhase = false;
      this.segments = [];
    }, this);
    // timer.start();
  }

  isFinish() {
    // BUG: bad way
    const minFinishDistance = 15;

    return this.game.math.distance(
      this.head.x,
      this.head.y,
      this.targetX,
      this.targetY
    ) < minFinishDistance;
  }

  makeSnapshot() {
    let segment;
    let angle = this.game.math.angleBetween(
      this.head.x,
      this.head.y,
      this.targetX,
      this.targetY
    );

    while (this.segments.length > Snake.maxSegments) segment = this.segments.shift();

    segment = {
      x: this.head.x,
      y: this.head.y,
      angle: angle
    }

    this.segments.push(segment);
  }

  drawAllSegments() {
    this.clear();
    this.lineStyle(10, this.color, 1);

    for (let i = 0; i < this.segments.length; i++) {
      let segment = this.segments[i];
      let nextSegment = this.segments[i + 1] || {
        x: segment.x,
        y: segment.Y
      };

      this.moveTo(
        segment.x,
        segment.y
      );

      this.lineTo(
        nextSegment.x,
        nextSegment.y
      );
    }
  }
}

Snake.maxSegments = 10;
Snake.widthSegment = 10;

Engine.Snake = Snake;
