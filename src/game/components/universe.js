class Universe extends Phaser.Sprite {
  constructor(game, rotationSpeed = 2.5) {
    const bitmap = Universe.createBitmap();

    super(game, game.width / 2, game.height / 2, bitmap);
    this.anchor.setTo(0.5);

    /**
     * Deegre/Sec
     * @type {[type]}
     */
    this.rotationSpeed = rotationSpeed
  }

  static createBitmap() {
    const maxStarSize = 4;
    const minStarSize = 2;
    const bitmapSize = Math.max(Engine.game.width, Engine.game.height);
    const stars = 300;

    let bitmap = Engine.game.make.bitmap(bitmapSize, bitmapSize);
    bitmap.ctx.fillStyle = 'white';

    for (let i = 0; i < stars; i++) {
      let starSize = this.game.rnd.between(minStarSize, maxStarSize);
      let x = this.game.rnd.between(-bitmapSize / 2, bitmapSize / 2);
      let y = this.game.rnd.between(-bitmapSize / 2, bitmapSize / 2);

      bitmap.ctx.rect(x, y, starSize, starSize);
      bitmap.ctx.fill();
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
