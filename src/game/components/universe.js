class Universe extends Phaser.Sprite {
  constructor(game, rotationSpeed = 2.5) {
    super(game, game.width / 2, game.height / 2, new Phaser.BitmapData(game.width, game.height));
    this.anchor.setTo(0.5);

    /**
     * Deegre/Sec
     * @type {[type]}
     */
    this.rotationSpeed = rotationSpeed
  }

  create() {
    const maxSize = 4;

    for (let i = 0; i < 500; i++) {
      let size = this.game.rnd.between(maxSize / 2, maxSize);
      let bitmap = new Phaser.BitmapData(size, size);

      bitmap.ctx.beginPath();
      bitmap.ctx.fillStyle = 'white';
      bitmap.ctx.rect(0, 0, size, size);
      bitmap.ctx.fill();

      let maxSizeSide = this.game.width > this.game.height ? this.game.width : this.game.height;

      let sprite = new Phaser.Sprite(
        this.game,
        this.game.rnd.between(-maxSizeSide, maxSizeSide),
        this.game.rnd.between(-maxSizeSide, maxSizeSide),
        bitmap
      );

      this.addChild(sprite);
    }
  }

  update() {
    this.rotation += Math.PI / 1800 / 60 * this.rotationSpeed;
  }

  resize() {
    this.x = this.game.width / 2;
    this.y = this.game.height / 2;
  }
}

Engine.Universe = Universe;
