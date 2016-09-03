class ScoreLable extends Phaser.Text {
  constructor(game, x, y, score, style) {
    super(game, x, y, `Score: ${Math.round(score)}`, style);

    this.score = score;

    this.game.add.existing(this);
  }

  /**
   * Update score lable value
   * @param  {Number} score New score
   */
  changeValue(score) {
    this.game.tweens.remove(this);

    let tween = this.game.add.tween(this)
      .to({
        score
      }, ScoreLable.animationChangeVal)
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

ScoreLable.animationChangeVal = 500;
Engine.ScoreLable = ScoreLable;
