class Universe extends Phaser.Sprite {
  constructor(game, rotationSpeed = 2.5) {
    super(game, game.width / 2, game.height / 2, game.cache.getBitmapData(Engine.keys.universe));
    this.anchor.setTo(0.5);

    /**
     * Deegre/Sec
     * @type {[type]}
     */
    this.rotationSpeed = rotationSpeed;
    this.rotation = this.game.rnd.realInRange(0, Math.PI * 2);
  }

  static generateSprite() {
    const maxStarSize = 4;
    const minStarSize = 1;
    const bitmapSize = Math.sqrt(Math.pow(window.screen.availWidth, 2) + Math.pow(window.screen.availHeight, 2));
    const stars = 300;

    let bitmap = Engine.game.make.bitmapData(bitmapSize, bitmapSize);
    bitmap.ctx.fillStyle = 'white';

    for (let i = 0; i < stars; i++) {
      let starSize = Engine.game.rnd.between(minStarSize, maxStarSize);
      let x = Engine.game.rnd.between(0, bitmapSize);
      let y = Engine.game.rnd.between(0, bitmapSize);

      bitmap.ctx.rect(x, y, starSize, starSize);
      bitmap.ctx.fill();
    }

    return bitmap;
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
