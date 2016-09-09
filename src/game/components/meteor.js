class Meteor extends Phaser.Sprite {
  constructor(game, x = 0, y = 0, rotation = 0, speed = 100) {
    super(game, x, y, game.cache.getBitmapData(Engine.keys.meteor));

    this.speed = speed;
    this.anchor.setTo(1);
    this.refreshRotation(rotation);
  }

  reset(x, y, rotation) {
    this.refreshRotation(rotation);

    super.reset(x, y);
  }

  refreshRotation(rotation) {
    this.rotation = rotation;
    this.velocityX = Math.cos(rotation) * this.speed;
    this.velocityY = Math.sin(rotation) * this.speed;
  }

  update() {
    if (this.alive) {
      this.x += this.velocityX;
      this.y += this.velocityY;
    }
  }

  /**
   * Create new meteor sprite
   */
  static generateSprite(game) {
    const width = 1024;
    const height = 2;

    let bitmap = game.add.bitmapData(width, height);
    let gradient = bitmap.ctx.createLinearGradient(0, 0, width, 0);

    gradient.addColorStop(1.0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.8, 'rgba(255, 255, 255, 0.4)');
    gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.3)');
    gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.2)');
    gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.1)');
    gradient.addColorStop(0.0, 'rgba(255, 255, 255, 0)');

    bitmap.ctx.beginPath();
    bitmap.ctx.fillStyle = gradient;
    bitmap.ctx.rect(0, 0, width, height);
    bitmap.ctx.fill();

    return bitmap;
  }
}

Engine.Meteor = Meteor
