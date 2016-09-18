Engine.game = new Phaser.Game(Engine.maxWidth, Engine.maxHeight, Phaser.AUTO);

Engine.game.state.add('Boot', Engine.Boot);
Engine.game.state.add('Loader', Engine.Loader);
Engine.game.state.add('Menu', Engine.Menu);
Engine.game.state.add('Game', Engine.Game);
Engine.game.state.add('Settings', Engine.Settings);
// Engine.game.state.add('Leaderboard', Engine.Leaderboard);

Engine.game.state.start('Boot');
