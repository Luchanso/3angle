Log.init();

Log.write('app', 'Init game');

Engine.game = new Phaser.Game(Engine.maxWidth, Engine.maxHeight, Phaser.AUTO);

Log.write('app', 'Finish create game');

Engine.game.state.add('Boot', Engine.Boot);
Engine.game.state.add('Loader', Engine.Loader);
// Engine.game.state.add('Menu', Engine.Menu);
Engine.game.state.add('Game', Engine.Game);
// Engine.game.state.add('ScoreBoard', Engine.ScoreBoard);

Log.write('app', 'Finish adding state');

Engine.game.state.start('Boot');

Log.write('app', 'Run boot');
