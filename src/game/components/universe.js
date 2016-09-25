class Universe extends Phaser.Graphics {
  constructor(game, rotationSpeed = 2.5) {
    super(game, game.world.centerX, game.world.centerY);
    this.anchor.setTo(0.5);

    this.rotationSpeed = rotationSpeed;
    this.rotation = this.game.rnd.realInRange(0, Math.PI * 2);

    this.drawUniverse();
  }

  drawUniverse() {
    const maxStarSize = 4;
    const minStarSize = 1;
    const universeSize = Math.sqrt(Math.pow(window.screen.availWidth, 2) + Math.pow(window.screen.availHeight, 2));
    const stars = 500;

    for (var i = 0; i < stars; i++) {
      const whiteGradation = 255 - this.game.rnd.between(0, 32);
      const starColor = Phaser.Color.getColor(whiteGradation, whiteGradation, whiteGradation);
      let x = this.game.rnd.between(-universeSize / 2, universeSize / 2);
      let y = this.game.rnd.between(-universeSize / 2, universeSize / 2);
      let starSize = this.game.rnd.between(minStarSize, maxStarSize);

      this.beginFill(starColor, Math.random());
      this.drawCircle(x, y, starSize);
      this.endFill();
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
