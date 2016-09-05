class Universe extends Phaser.Sprite {
  constructor(game) {
    super(game, game.width / 2, game.height / 2, new Phaser.BitmapData(game.width, game.height));
    this.anchor.setTo(0.5);
  }

  create() {
    const maxSize = 4;

    for (let i = 0; i < 400; i++) {
      let size = this.game.rnd.between(maxSize / 2, maxSize);
      let bitmap = new Phaser.BitmapData(size, size);

      bitmap.ctx.beginPath();
      bitmap.ctx.fillStyle = 'white';
      bitmap.ctx.rect(0, 0, size, size);
      bitmap.ctx.fill();

      let sprite = new Phaser.Sprite(
        this.game,
        this.game.rnd.between(-this.game.width, this.game.width),
        this.game.rnd.between(-this.game.height, this.game.height),
        bitmap
      );

      // debugger;

      this.addChild(sprite);
    }
  }
}

Engine.Universe = Universe;
