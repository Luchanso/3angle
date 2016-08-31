class Game extends Phaser.State {
  constructor() {
    super()
  }

  create() {
    
  }

  render() {
    this.game.debug.geom(new Phaser.Line(this.game.world.centerX, 0, this.game.world.centerX, this.game.height), '#90CAF9');
    this.game.debug.geom(new Phaser.Line(0, this.game.world.centerY, this.game.width, this.game.world.centerY), '#90CAF9');
  }
}

Engine.Game = Game;
