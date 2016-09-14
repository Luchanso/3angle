// class Sparkle extends Phaser.Sprite {
//   constructor(game) {
//     super(game, 0, 0, game.cache.getBitmapData(Sparkle.bitmapKey));
//
//     this.isRun = false;
//     this.alpha = 0;
//     this.anchor.setTo(0.5);
//     this.speed = 50;
//     this.mass = 12;
//   }
//
//   animateFromTo(startSprite, targetSprite, velocityX = -20, velocityY = 20) {
//     this.alpha = 1;
//     this.isRun = true;
//     this.velocityX = velocityX;
//     this.velocityY = velocityY;
//     this.targetSprite = targetSprite;
//
//     this.tint = startSprite.tint;
//
//     this.x = startSprite.world.x;
//     this.y = startSprite.world.y;
//   }
//
//   update() {
//     this.rotation += Math.PI * 2 * 1 / 60;
//
//     if (this.isRun) {
//       let angle = this.game.math.angleBetween(
//         this.x,
//         this.y,
//         this.targetSprite.world.x,
//         this.targetSprite.world.y
//       );
//
//       let targetVelocityX = Math.cos(angle) * this.speed;
//       let targetVelocityY = Math.sin(angle) * this.speed;
//       let partX = (targetVelocityX - this.velocityX) / this.mass;
//       let partY = (targetVelocityY - this.velocityY) / this.mass;
//
//       this.velocityX += partX;
//       this.velocityY += partY;
//
//       this.x += this.velocityX;
//       this.y += this.velocityY;
//
//       if (this.animationIsFinish()) {
//         this.isRun = false;
//         this.alpha = 0;
//       }
//     }
//   }
//
//   animationIsFinish() {
//     const minimalDistanceFinish = 50;
//
//     return this.game.math.distance(
//       this.x,
//       this.y,
//       this.targetSprite.world.x,
//       this.targetSprite.world.y
//     ) < minimalDistanceFinish;
//   }
//
//   static generateSprite(game) {
//     let bitmap = game.add.bitmapData(Sparkle.size, Sparkle.size);
//
//     bitmap.ctx.beginPath();
//     bitmap.ctx.strokeStyle = 'white';
//     bitmap.ctx.lineWidth = 2;
//     bitmap.ctx.moveTo(0, Sparkle.size - 1);
//     bitmap.ctx.lineTo(Sparkle.size / 2, 0);
//     bitmap.ctx.lineTo(Sparkle.size - 1, Sparkle.size - 1);
//     bitmap.ctx.lineTo(0, Sparkle.size - 1);
//     bitmap.ctx.stroke();
//
//     return bitmap;
//   }
// }
//
// Sparkle.size = 30;
// Sparkle.bitmapKey = 'sparkle';
//
// Engine.Sparkle = Sparkle;
