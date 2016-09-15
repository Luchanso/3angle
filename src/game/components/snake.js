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
    this.head = {
      x,
      y,
    };

    let tween = this.game.add.tween(this)
      .to({
        velocityX,
        velocityY,
      }, 200)
      .start();

    // tween.onUpdateCallback(() => {
    //
    // }, this);
    this.isRun = true;
  }

  update() {
    if (this.isRun) {
      this.head.x += this.velocityX;
      this.head.y += this.velocityY;
      this.makeSnapshot();
      console.log('tset');
    }

    this.drawAllSegments();
  }

  makeSnapshot() {
    let segment;
    let angle = this.game.math.angleBetween(
      this.head.x,
      this.head.y,
      targetX,
      targetY,
    );

    while (this.segments.length > Snake.maxSegments) segment = this.segments.shift();

    if (!segment) {
      segment = {
        x: this.head.x,
        y: this.head.y,
        angle: angle
      }
    }

    this.segments.push(segment);
  }

  drawAllSegments() {
    this.clear();
    this.lineStyle(10, 0xFFFFFF, 1);

    for (let i = 0; i < this.segments.length; i++) {
      let segment = this.segments[i];

      this.drawRoundedRect(
        segment.x,
        segment.y,
        Snake.widthSegment,
        Snake.widthSegment,
        1
      );
    }
  }
}

Snake.maxSegments = 30;
Snake.widthSegment = 10;

Engine.Snake = Snake;
