let Engine = {
  minWidth: 640,
  minHeight: 320,
  maxWidth: 1000,
  maxHeight: 640
};

Engine.game = new Phaser.Game(Engine.maxWidth, Engine.maxHeight, Phaser.WEBGL);

Engine.game.state.add('Boot', Engine.Boot);
// Engine.game.state.add('Loader', Engine.Loader);
// Engine.game.state.add('Menu', Engine.Menu);
// Engine.game.state.add('Game', Engine.Game);
// Engine.game.state.add('ScoreBoard', Engine.ScoreBoard);

Engine.game.state.start('Boot');
