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
    this.reset(0, 0);
    this.firstImpulse = Math.sqrt(Math.pow(impulseX, 2) + Math.pow(impulseX, 2));
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

    this.isRun = true;
    this.finishPhase = false;
  }

  update() {
    if (this.isRun) {
      this.updateVelocity();
      this.head.x += this.velocityX;
      this.head.y += this.velocityY;
      this.makeSnapshot();

      if (this.isFinish()) {
        this.stop();
      }
    }

    if (this.finishPhase) {
      this.makeSnapshot();

      if (this.segments.length === 0) {
        this.kill();
      }
    }

    this.drawAllSegments();
  }

  updateVelocity() {
    const stepsUpdate = 60 * 0.2;

    let angle = this.game.math.angleBetween(this.head.x, this.head.y, this.targetX, this.targetY);
    let velocityX = Math.cos(angle) * Snake.speed;
    let velocityY = Math.sin(angle) * Snake.speed;

    this.velocityX += (velocityX - this.velocityX) / stepsUpdate;
    this.velocityY += (velocityY - this.velocityY) / stepsUpdate;
  }

  stop() {
    this.isRun = false;
    this.finishPhase = true;
  }

  isFinish() {
    this.distance = this.game.math.distance(
      this.head.x,
      this.head.y,
      this.targetX,
      this.targetY
    );
    
    return this.distance < this.firstImpulse + Snake.speed;
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

    for (let i = 0; i < this.segments.length; i++) {
      let segment = this.segments[i];
      let nextSegment = this.segments[i + 1] || segment;

      this.moveTo(
        segment.x,
        segment.y
      );

      this.lineStyle(Snake.size, this.color, 1);

      this.lineTo(
        nextSegment.x,
        nextSegment.y
      );

      if (this.isRun) {
        this.lineStyle(0, 0, 0);

        this.beginFill(this.color);
        this.drawCircle(
          segment.x,
          segment.y,
          Snake.size
        )
        this.endFill();
      }
    }
  }
}

Snake.maxSegments = 10;
Snake.size = 10;
Snake.speed = 50;

Engine.Snake = Snake;
