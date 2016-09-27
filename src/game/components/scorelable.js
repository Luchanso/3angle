class ScoreLabel extends Phaser.Text {
  constructor(game, x, y, score, style) {
    super(game, x, y, `Score: ${Math.round(score)}`, style);

    this.score = score;

    this.game.add.existing(this);
  }

  /**
   * Update score label value
   * @param  {Number} score New score
   */
  changeValue(score) {
    this.game.tweens.remove(this);

    let tween = this.game.add.tween(this)
      .to({
        score
      }, ScoreLabel.animationChangeVal)
      .onUpdateCallback(() => {
        this.text = `Score: ${Math.round(this.score)}`;
      }, this);

    tween.onComplete
      .add(() => {
        this.text = `Score: ${Math.round(this.score)}`;
      });

    tween.start();
  }
}

ScoreLabel.animationChangeVal = 500;
Engine.ScoreLabel = ScoreLabel;
