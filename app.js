"use strict";

var Engine = {
  minWidth: 640,
  minHeight: 320,
  maxWidth: 1366,
  maxHeight: 768
};
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Boot = function (_Phaser$State) {
  _inherits(Boot, _Phaser$State);

  function Boot() {
    _classCallCheck(this, Boot);

    return _possibleConstructorReturn(this, (Boot.__proto__ || Object.getPrototypeOf(Boot)).call(this));
  }

  _createClass(Boot, [{
    key: 'preload',
    value: function preload() {
      Log.write('boot', 'Preloading');
    }
  }, {
    key: 'create',
    value: function create() {
      Log.write('boot', 'Creating');

      this.game.stage.disableVisibilityChange = true;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;

      Log.write('boot', 'Finish creating');

      this.state.start('Loader');
    }
  }]);

  return Boot;
}(Phaser.State);

Engine.Boot = Boot;
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Loader = function (_Phaser$State) {
  _inherits(Loader, _Phaser$State);

  function Loader() {
    _classCallCheck(this, Loader);

    return _possibleConstructorReturn(this, (Loader.__proto__ || Object.getPrototypeOf(Loader)).call(this));
  }

  _createClass(Loader, [{
    key: 'preload',
    value: function preload() {
      this.game.stage.backgroundColor = '#000';
      this.addProgressLable();

      this.load.onFileComplete.add(this.refreshProgress, this);

      // this.load.audio('music1', 'assets/music/Yal!X - Forgiven.mp3');

      this.game.cache.addBitmapData(Engine.Triangle.bitmapKey, Engine.Triangle.generateSprite(this.game));
      this.game.cache.addBitmapData(Engine.Meteor.bitmapKey, Engine.Meteor.generateSprite(this.game));
      this.game.cache.addBitmapData(Engine.Universe.bitmapKey, Engine.Universe.generateSprite(this.game));
      // this.game.cache.addBitmapData(Engine.Sparkle.bitmapKey, Engine.Sparkle.generateSprite(this.game));

      this.generateWaveTexture();
    }
  }, {
    key: 'create',
    value: function create() {
      var numberOfGradation = 3;
      this.state.start('Game', true, false, numberOfGradation);
    }
  }, {
    key: 'generateWaveTexture',
    value: function generateWaveTexture() {
      var data = Engine.Wave.generateAtlasData();
      this.game.cache.addTextureAtlas(Wave.bitmapKey, '', data.bitmap.canvas, data.atlasData, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    }
  }, {
    key: 'addProgressLable',
    value: function addProgressLable() {
      var style = {
        font: '41px Open Sans',
        fill: '#00E676'
      };

      this.progressLable = this.add.text(this.game.world.centerX, this.game.world.centerY, 'Loading: 0% (0/0)', style);
      this.progressLable.anchor.setTo(0.5);
    }
  }, {
    key: 'refreshProgress',
    value: function refreshProgress(progress, cacheKey, success, totalLoaded, totalFiles) {
      this.progressLable.text = 'Loading ' + progress + '% (' + totalLoaded + '/' + totalFiles + ')';
    }
  }]);

  return Loader;
}(Phaser.State);

Engine.Loader = Loader;
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Menu = function (_Phaser$State) {
  _inherits(Menu, _Phaser$State);

  function Menu() {
    _classCallCheck(this, Menu);

    return _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this));
  }

  _createClass(Menu, [{
    key: "create",
    value: function create() {}
  }]);

  return Menu;
}(Phaser.State);
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ColorSet = function () {
  /**
   * Color Set
   * @param  {Array} gradition Array of colors
   */
  function ColorSet(gradition) {
    _classCallCheck(this, ColorSet);

    this.gradition = gradition;
  }

  /**
   * Get random color from set
   * @return {[type]} [description]
   */


  _createClass(ColorSet, [{
    key: "getRandomColor",
    value: function getRandomColor() {
      return Engine.game.rnd.pick(this.gradition);
    }

    /**
     * Get color by number
     */

  }, {
    key: "getByNumber",
    value: function getByNumber(number) {
      return this.gradition[number];
    }
  }, {
    key: "getLastColor",
    value: function getLastColor() {
      return this.gradition[this.gradition.length - 1];
    }
  }]);

  return ColorSet;
}();

ColorSet.GRADATIONS = [
// indigo
[0x3F51B5, 0x3949AB, 0x303F9F, 0x283593],
// blue
[0x2196F3, 0x1E88E5, 0x1976D2, 0x1565C0],
// yellow
[0xFFF176, 0xFFEE58, 0xFFEB3B, 0xFDD835],
// pink
[0xE91E63, 0xD81B60, 0xC2185B, 0xAD1457],
// brown
[0x795548, 0x6D4C41, 0x5D4037, 0x4E342E],
// // deeporange
// [
//   0xFF5722,
//   0xF4511E,
//   0xE64A19,
//   0xD84315,
// ],
// grey
[0x9E9E9E, 0x757575, 0x616161, 0x424242]];

Engine.ColorSet = ColorSet;
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Linker = function () {
  function Linker() {
    _classCallCheck(this, Linker);
  }

  _createClass(Linker, null, [{
    key: "canTriangleLink",
    value: function canTriangleLink(tr1, tr2) {}
  }]);

  return Linker;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Meteor = function (_Phaser$Sprite) {
  _inherits(Meteor, _Phaser$Sprite);

  function Meteor(game) {
    var x = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
    var y = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
    var rotation = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
    var speed = arguments.length <= 4 || arguments[4] === undefined ? 100 : arguments[4];

    _classCallCheck(this, Meteor);

    var _this = _possibleConstructorReturn(this, (Meteor.__proto__ || Object.getPrototypeOf(Meteor)).call(this, game, x, y, game.cache.getBitmapData(Meteor.bitmapKey)));

    _this.speed = speed;
    _this.anchor.setTo(1);
    _this.refreshRotation(rotation);
    return _this;
  }

  _createClass(Meteor, [{
    key: 'reset',
    value: function reset(x, y, rotation) {
      this.refreshRotation(rotation);

      _get(Meteor.prototype.__proto__ || Object.getPrototypeOf(Meteor.prototype), 'reset', this).call(this, x, y);
    }
  }, {
    key: 'refreshRotation',
    value: function refreshRotation(rotation) {
      this.rotation = rotation;
      this.velocityX = Math.cos(rotation) * this.speed;
      this.velocityY = Math.sin(rotation) * this.speed;
    }
  }, {
    key: 'update',
    value: function update() {
      if (this.alive) {
        this.x += this.velocityX;
        this.y += this.velocityY;
      }
    }

    /**
     * Create new meteor sprite
     */

  }], [{
    key: 'generateSprite',
    value: function generateSprite(game) {
      var width = 1024;
      var height = 2;

      var bitmap = game.add.bitmapData(width, height);
      var gradient = bitmap.ctx.createLinearGradient(0, 0, width, 0);

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
  }]);

  return Meteor;
}(Phaser.Sprite);

Meteor.bitmapKey = 'meteor';

Engine.Meteor = Meteor;
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScoreLable = function (_Phaser$Text) {
  _inherits(ScoreLable, _Phaser$Text);

  function ScoreLable(game, x, y, score, style) {
    _classCallCheck(this, ScoreLable);

    var _this = _possibleConstructorReturn(this, (ScoreLable.__proto__ || Object.getPrototypeOf(ScoreLable)).call(this, game, x, y, "Score: " + Math.round(score), style));

    _this.score = score;

    _this.game.add.existing(_this);
    return _this;
  }

  /**
   * Update score lable value
   * @param  {Number} score New score
   */


  _createClass(ScoreLable, [{
    key: "changeValue",
    value: function changeValue(score) {
      var _this2 = this;

      this.game.tweens.remove(this);

      var tween = this.game.add.tween(this).to({
        score: score
      }, ScoreLable.animationChangeVal).onUpdateCallback(function () {
        _this2.text = "Score: " + Math.round(_this2.score);
      }, this);

      tween.onComplete.add(function () {
        _this2.text = "Score: " + Math.round(_this2.score);
      });

      tween.start();
    }
  }]);

  return ScoreLable;
}(Phaser.Text);

ScoreLable.animationChangeVal = 500;
Engine.ScoreLable = ScoreLable;
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Snake = function (_Phaser$Graphics) {
  _inherits(Snake, _Phaser$Graphics);

  function Snake(game) {
    _classCallCheck(this, Snake);

    var _this = _possibleConstructorReturn(this, (Snake.__proto__ || Object.getPrototypeOf(Snake)).call(this, game, 0, 0));

    _this.head = {
      x: 0,
      y: 0
    };
    _this.velocityX = 0;
    _this.velocityY = 0;
    _this.segments = [];
    return _this;
  }

  _createClass(Snake, [{
    key: "run",
    value: function run(x, y, targetX, targetY, impulseX, impulseY, color) {
      this.reset(0, 0);
      this.firstImpulse = Math.sqrt(Math.pow(impulseX, 2) + Math.pow(impulseX, 2));
      this.targetX = targetX;
      this.targetY = targetY;
      this.velocityX = impulseX;
      this.velocityY = impulseY;
      this.color = color;
      this.segments = [];
      this.head = {
        x: x,
        y: y
      };

      this.isRun = true;
      this.finishPhase = false;
    }
  }, {
    key: "update",
    value: function update() {
      if (this.isRun) {
        this.updateVelocity();
        this.head.x += this.velocityX;
        this.head.y += this.velocityY;
        this.makeSnapshot();

        if (this.isFinish()) {
          this.stop();
        }
      }

      if (this.finishPhase) {
        this.makeSnapshot();

        if (this.segments[0].x === this.head.x && this.segments[0].y === this.head.y) {
          this.finishPhase = false;
          this.kill();
        }
      }

      this.drawAllSegments();
    }
  }, {
    key: "updateVelocity",
    value: function updateVelocity() {
      var stepsUpdate = 60 * 0.1;

      var angle = this.game.math.angleBetween(this.head.x, this.head.y, this.targetX, this.targetY);
      var velocityX = Math.cos(angle) * Snake.speed;
      var velocityY = Math.sin(angle) * Snake.speed;

      this.velocityX += (velocityX - this.velocityX) / stepsUpdate;
      this.velocityY += (velocityY - this.velocityY) / stepsUpdate;
    }
  }, {
    key: "stop",
    value: function stop() {
      this.isRun = false;
      this.finishPhase = true;
    }
  }, {
    key: "isFinish",
    value: function isFinish() {
      this.distance = this.game.math.distance(this.head.x, this.head.y, this.targetX, this.targetY);

      return this.distance < this.firstImpulse + Snake.speed;
    }
  }, {
    key: "makeSnapshot",
    value: function makeSnapshot() {
      var segment = void 0;

      while (this.segments.length > Snake.maxSegments) {
        segment = this.segments.shift();
      }segment = {
        x: this.head.x,
        y: this.head.y
      };

      this.segments.push(segment);
    }
  }, {
    key: "drawAllSegments",
    value: function drawAllSegments() {
      this.clear();

      for (var i = 0; i < this.segments.length; i++) {
        var segment = this.segments[i];
        var nextSegment = this.segments[i + 1] || segment;

        this.moveTo(segment.x, segment.y);

        this.lineStyle(Snake.size, this.color, 1);

        this.lineTo(nextSegment.x, nextSegment.y);

        if (this.isRun) {
          this.lineStyle(0, 0, 0);

          this.beginFill(this.color);
          this.drawCircle(segment.x, segment.y, Snake.size);
          this.endFill();
        }
      }
    }
  }]);

  return Snake;
}(Phaser.Graphics);

Snake.maxSegments = 10;
Snake.size = 10;
Snake.speed = 50;

Engine.Snake = Snake;
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
"use strict";
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sparkle = function (_Phaser$Graphics) {
  _inherits(Sparkle, _Phaser$Graphics);

  function Sparkle(game) {
    _classCallCheck(this, Sparkle);

    return _possibleConstructorReturn(this, (Sparkle.__proto__ || Object.getPrototypeOf(Sparkle)).call(this, game, 0, 0));
  }

  _createClass(Sparkle, [{
    key: 'animate',
    value: function animate(x, y, color, count) {
      var sunray = {
        width: 0,
        height: 5
      };

      this.clear();
      this.lineColor = '#ffffff';
      this.lineWidth = 1;
      this.beginFill(color);

      this.drawRoundedRect(x, y, 50, 5, 5);

      // let tween = this.game.add.tween(sunray)
      //   .to({}, 1000)
      //   .start();
      //
      // tween.onUpdateCallback(() => {
      //
      // }, this);

      this.endFill();
    }
  }]);

  return Sparkle;
}(Phaser.Graphics);
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tone = function () {
  function Tone(game) {
    _classCallCheck(this, Tone);

    this.game = game;
    this.current = 0;
  }

  _createClass(Tone, [{
    key: "create",
    value: function create() {}

    /**
     * Up and play next tone
     */

  }, {
    key: "up",
    value: function up() {
      if (this.current > Tone.count) {
        this.current = Tone.count - 1;
      }

      this.tones[this.current].play();
      this.current++;
    }
  }, {
    key: "low",
    value: function low() {
      if (this.current < 0) {
        this.current = 0;
      }

      this.tones[this.current].play();
      this.current--;
    }

    /**
     * Reset tone
     */

  }, {
    key: "reset",
    value: function reset() {
      this.current = 0;
    }
  }]);

  return Tone;
}();

Tone.count = 10;
Engine.Tone = Tone;
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Triangle = function (_Phaser$Sprite) {
  _inherits(Triangle, _Phaser$Sprite);

  /**
   * It's a triangle, yash it's not a joke
   * @param  {Phaser.Game}  game      [description]
   * @param  {[type]}  x         [description]
   * @param  {[type]}  y         [description]
   * @param  {Boolean} isRotated [description]
   * @param  {Number}  color     [description]
   */
  function Triangle(game, x, y, isRotated, colorSet, matrixPosition) {
    _classCallCheck(this, Triangle);

    var _this = _possibleConstructorReturn(this, (Triangle.__proto__ || Object.getPrototypeOf(Triangle)).call(this, game, x, y, Engine.game.cache.getBitmapData(Triangle.bitmapKey)));

    _this.width = Triangle.size;
    _this.height = Triangle.size;
    _this.anchor.setTo(0.5);
    _this.colorSet = colorSet;
    _this.tint = _this.colorSet.getRandomColor();

    /**
     * Poition in the matrix of triangles
     * @type {[type]}
     */
    _this.matrixPos = matrixPosition;

    _this.inputEnabled = true;
    _this.input.pixelPerfectOver = true;
    _this.input.pixelPerfectClick = true;

    _this.events.deleteComplete = new Phaser.Signal();

    _this.selected = false;
    _this.isRotated = isRotated;

    if (isRotated) {
      _this.rotation = Math.PI;
    }

    // this.addTextPosition();
    return _this;
  }

  _createClass(Triangle, [{
    key: 'addTextPosition',
    value: function addTextPosition() {
      var text = new Phaser.Text(this.game, Triangle.size / 2, Triangle.size / 2, this.matrixPos.x + ':' + this.matrixPos.y, {
        font: '64px Open Sans',
        fill: 'black'
      });

      if (this.isRotated) {
        text.rotation += Math.PI;
        text.y = +text.height;
      } else {
        text.x = -text.width / 2;
        text.y = -text.height / 4;
      }

      this.addChild(text);
    }
  }, {
    key: 'select',
    value: function select() {
      if (!this.selected) {
        this.selected = true;

        this.game.add.tween(this).to({
          width: Triangle.size / 1.5,
          height: Triangle.size / 1.5
        }, Triangle.animationTimeSelect).start();
      }
    }
  }, {
    key: 'unselect',
    value: function unselect() {
      if (this.selected) {

        this.game.tweens.remove(this);
        this.selected = false;

        this.game.add.tween(this).to({
          width: Triangle.size,
          height: Triangle.size
        }, Triangle.animationTimeSelect).start();
      }
    }
  }, {
    key: 'delete',
    value: function _delete() {
      var _this2 = this;

      var dalay = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

      if (this.game.input.activePointer.isDown) {
        this.game.add.tween(this).to({
          width: 0,
          height: 0,
          alpha: 0
        }, Triangle.animationTimeDelete).delay(dalay).start().onComplete.add(function () {
          _this2.events.deleteComplete.dispatch(_this2);
        }, this);
      }
    }
  }, {
    key: 'recover',
    value: function recover(colorSet) {
      var animationTime = this.game.rnd.between(250, 300);

      this.colorSet = colorSet;
      this.tint = this.colorSet.getRandomColor();
      this.width = Triangle.size;
      this.height = Triangle.size;
      this.selected = false;

      this.game.add.tween(this).to({
        alpha: 1
      }, animationTime, Phaser.Easing.Linear.None).start();
    }
  }, {
    key: 'updateColor',
    value: function updateColor(colorSet) {
      var _this3 = this;

      var delay = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

      var animationTime = 1000;
      this.colorSet = colorSet;

      var hideTween = this.game.add.tween(this).to({
        alpha: 0
      }, animationTime);

      var showTween = this.game.add.tween(this).to({
        alpha: 1
      }, animationTime);

      hideTween.onComplete.add(function () {
        _this3.tint = _this3.colorSet.getRandomColor();
      }, this);

      hideTween.delay(delay);

      hideTween.chain(showTween);
      hideTween.start();
    }
  }, {
    key: 'blink',
    value: function blink() {
      var _this4 = this;

      var lastColor = this.tint;
      var tween = this.game.add.tween(this);

      tween.to({
        alpha: 2
      }, 100).onComplete.add(function () {
        _this4.tint = lastColor;
        Triangle.blinks = [];
      }, this);

      tween.onStart.add(function () {
        _this4.alpha = 0;
        _this4.tint = 0x00FF00;
      }, this);

      if (Triangle.blinks.length === 0) {
        Triangle.blinks.push(tween);
        tween.start();
      } else {
        var lastBlink = Triangle.blinks[Triangle.blinks.length - 1];
        lastBlink.chain(tween);
        Triangle.blinks.push(tween);
      }
    }
  }, {
    key: 'hintMe',
    value: function hintMe() {
      var tween = this.game.add.tween(this).to({
        width: this.width * 0.75,
        height: this.height * 0.75
      }, 200).to({
        rotation: this.rotation + Math.PI / 32
      }, 100).to({
        rotation: this.rotation - Math.PI * 2 / 32
      }, 100).to({
        rotation: Math.PI * this.isRotated
      }, 100).to({
        width: Triangle.size,
        height: Triangle.size
      }, 200);

      tween.start();
    }
  }, {
    key: 'growUp',
    value: function growUp() {
      var delay = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

      var time = 300 + this.game.rnd.between(-50, 50);

      this.width = 0;
      this.height = 0;
      this.alpha = 0;

      this.game.add.tween(this).to({
        width: Triangle.size,
        height: Triangle.size,
        alpha: 1
      }, time).delay(delay).start();
    }

    /**
     * Create new triangle sprite
     */

  }], [{
    key: 'generateSprite',
    value: function generateSprite(game) {
      var size = 255;

      var bitmap = game.add.bitmapData(size, size);

      bitmap.ctx.beginPath();
      bitmap.ctx.fillStyle = 'white';
      bitmap.ctx.moveTo(0, size);
      bitmap.ctx.lineTo(size / 2, 0);
      bitmap.ctx.lineTo(size, size);
      bitmap.ctx.lineTo(0, size);
      bitmap.ctx.fill();

      return bitmap;
    }
  }]);

  return Triangle;
}(Phaser.Sprite);

Triangle.size = 71;
Triangle.blinks = [];
Triangle.animationTimeSelect = 200;
Triangle.animationTimeDelete = 150;
Triangle.animationTimeRecover = 300;
Triangle.bitmapKey = 'triangle';

Engine.Triangle = Triangle;
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Universe = function (_Phaser$Sprite) {
  _inherits(Universe, _Phaser$Sprite);

  function Universe(game) {
    var rotationSpeed = arguments.length <= 1 || arguments[1] === undefined ? 2.5 : arguments[1];

    _classCallCheck(this, Universe);

    var _this = _possibleConstructorReturn(this, (Universe.__proto__ || Object.getPrototypeOf(Universe)).call(this, game, game.width / 2, game.height / 2, game.cache.getBitmapData(Universe.bitmapKey)));

    _this.anchor.setTo(0.5);

    /**
     * Deegre/Sec
     * @type {[type]}
     */
    _this.rotationSpeed = rotationSpeed;
    _this.rotation = _this.game.rnd.realInRange(0, Math.PI * 2);
    return _this;
  }

  _createClass(Universe, [{
    key: 'update',
    value: function update() {
      this.rotation += Math.PI / 1800 / 60 * this.rotationSpeed;
    }
  }, {
    key: 'resize',
    value: function resize() {
      this.x = this.game.width / 2;
      this.y = this.game.height / 2;
    }
  }], [{
    key: 'generateSprite',
    value: function generateSprite() {
      var maxStarSize = 4;
      var minStarSize = 1;
      var bitmapSize = Math.sqrt(Math.pow(window.screen.availWidth, 2) + Math.pow(window.screen.availHeight, 2));
      var stars = 100;

      var bitmap = Engine.game.make.bitmapData(bitmapSize, bitmapSize);
      bitmap.ctx.fillStyle = 'white';

      for (var i = 0; i < stars; i++) {
        var starSize = Engine.game.rnd.between(minStarSize, maxStarSize);
        var x = Engine.game.rnd.between(0, bitmapSize);
        var y = Engine.game.rnd.between(0, bitmapSize);

        bitmap.ctx.rect(x, y, starSize, starSize);
        bitmap.ctx.fill();
      }

      return bitmap;
    }
  }]);

  return Universe;
}(Phaser.Sprite);

Universe.bitmapKey = 'universe';

Engine.Universe = Universe;
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Wave = function (_Phaser$Sprite) {
  _inherits(Wave, _Phaser$Sprite);

  function Wave(game, x, y) {
    _classCallCheck(this, Wave);

    var _this = _possibleConstructorReturn(this, (Wave.__proto__ || Object.getPrototypeOf(Wave)).call(this, game, x, y, Wave.bitmapKey, 0));

    _this.anchor.setTo(0.5);

    _this.alpha = 0;
    _this.width = Engine.Triangle.size / 2;
    _this.height = Engine.Triangle.size / 2;
    return _this;
  }

  _createClass(Wave, [{
    key: 'playAnimation',
    value: function playAnimation(x, y) {
      var _this2 = this;

      var animationTime = 200;
      this.alpha = 1;
      this.x = x;
      this.y = y;
      this.frame = 0;
      this.width = Engine.Triangle.size / 2;
      this.height = Engine.Triangle.size / 2;

      var tweenSize = this.game.add.tween(this).to({
        width: Engine.Triangle.size * Wave.sizeRatio,
        height: Engine.Triangle.size * Wave.sizeRatio
      }, animationTime);

      var tweenDestroy = this.game.add.tween(this).to({ alpha: 0 }, animationTime).onUpdateCallback(function () {
        if (_this2.frame === Wave.countFrameAnimation - 1) {
          _this2.alpha = 0;
        }
        _this2.frame++;
      }, this);

      tweenSize.chain(tweenDestroy);
      tweenSize.start();
    }
  }], [{
    key: 'generateAtlasData',
    value: function generateAtlasData() {
      var atlasData = {
        frames: []
      };

      var size = Engine.Triangle.size * Wave.sizeRatio;
      var lineSize = 15;
      var spriteSheetWidth = Wave.countFrameAnimation;

      var bitmap = Engine.game.make.bitmapData(size * spriteSheetWidth, size);
      bitmap.ctx.strokeStyle = '#e9e9e9';

      for (var x = 0; x < spriteSheetWidth; x++) {
        atlasData.frames[x] = {
          frame: {
            x: x * size,
            y: 0,
            w: size,
            h: size
          }
        };

        bitmap.ctx.lineWidth = lineSize / (1 + x);
        bitmap.ctx.moveTo(size + x * size - lineSize / 2, size / 2);

        var radius = size / 2 - lineSize / 2;

        bitmap.ctx.ellipse(size / 2 + x * size, size / 2, radius, radius, 0, 0, Math.PI * 2);
        bitmap.ctx.stroke();
      }

      return {
        bitmap: bitmap,
        atlasData: atlasData
      };
    }
  }]);

  return Wave;
}(Phaser.Sprite);

Wave.sizeRatio = 3.5;
Wave.bitmapKey = 'wave';
Wave.countFrameAnimation = 12;

Engine.Wave = Wave;
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Game = function (_Phaser$State) {
  _inherits(Game, _Phaser$State);

  function Game() {
    _classCallCheck(this, Game);

    var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this));

    window.gg = _this;
    return _this;
  }

  _createClass(Game, [{
    key: 'init',
    value: function init(numberOfGradation) {
      this.colorSets = [];
      /**
       * Number of colorSets will use in this game level
       * @type {[type]}
       */
      this.numberOfGradation = numberOfGradation;

      /**
       * Tone system manager
       * @type {Engine}
       */
      this.tone = new Engine.Tone(this.game);

      /**
       * MarginTop of triangles matrix
       * @type {Number}
       */
      this.marginTop = 100;

      /**
       * MarginLeft of triangles matrix
       * @type {Number}
       */
      this.marginLeft = 64;

      /**
       * Minimal triangles destroy length
       * @type {Number}
       */
      this.minTrianglesDestroy = 3;

      this.trianglesMatrix = [];
      this.selectedTriangles = [];

      this.score = 0;

      this.triangleMatrixWidth = 25;
      this.triangleMatrixHeight = 9;
    }
  }, {
    key: 'create',
    value: function create() {
      this.game.stage.backgroundColor = '#000';

      this.createUniverse();
      this.createGradations();

      this.triangleGroup = this.game.add.group();

      this.tone.create();

      this.sketch();
      this.initEvents();
      this.createWave();
      this.createSounds();
      this.createSnakes();
      this.createHintTimer();
      this.createScoreLable();
      this.initializationFullScreen();

      this.createMeteor();

      this.forcePortrait = true;
    }
  }, {
    key: 'render',
    value: function render() {}
  }, {
    key: 'update',
    value: function update() {}
  }, {
    key: 'createSnakes',
    value: function createSnakes() {
      var snakesPullSize = 30;
      this.snakes = this.game.add.group();

      for (var i = 0; i < snakesPullSize; i++) {
        var snake = new Engine.Snake(this.game);
        snake.kill();

        this.snakes.add(snake);
      }
    }
  }, {
    key: 'createSounds',
    value: function createSounds() {
      // this.music1 = this.game.sound.add('music1', 1, true);
      // this.music1.play();
    }
  }, {
    key: 'createGradations',
    value: function createGradations() {
      var allGradation = Phaser.ArrayUtils.shuffle(ColorSet.GRADATIONS);

      for (var i = 0; i < this.numberOfGradation; i++) {
        var colorSet = new ColorSet(allGradation[i]);
        this.colorSets.push(colorSet);
      }
    }
  }, {
    key: 'createUniverse',
    value: function createUniverse() {
      /**
       * Rotation speed for second universe
       * @type {Number}
       */
      var secondRotationSpeed = 5;

      this.universeFirst = new Engine.Universe(this.game);
      this.universeSecond = new Engine.Universe(this.game, secondRotationSpeed);

      this.game.add.existing(this.universeFirst);
      this.game.add.existing(this.universeSecond);
    }
  }, {
    key: 'createHintTimer',
    value: function createHintTimer() {
      var hintTimeout = 20000;
      this.hintTimer = this.game.time.create();

      this.hintTimer.loop(hintTimeout, this.visualisationHint, this);
    }
  }, {
    key: 'createMeteor',
    value: function createMeteor() {
      var _this2 = this;

      var meteorTimerDelay = 20 * 1000;

      this.meteor = new Engine.Meteor(this.game);
      this.game.add.existing(this.meteor);
      this.meteor.sendToBack();
      this.meteor.outOfCameraBoundsKill = true;
      this.meteor.kill();

      this.meteorTimer = this.game.time.create();
      this.meteorTimer.loop(meteorTimerDelay, function () {
        if (_this2.game.rnd.pick([true, false])) {
          _this2.runMeteor();
        }
      }, this);
      this.meteorTimer.start();
    }
  }, {
    key: 'createWave',
    value: function createWave() {
      this.wave = new Engine.Wave(this.game, 0, 0);

      this.game.add.existing(this.wave);
    }
  }, {
    key: 'runMeteor',
    value: function runMeteor() {
      var marginX = this.game.width / 10;
      var marginY = this.game.height / 10;
      var marginRotation = Math.PI / 10;
      var x = void 0,
          y = void 0,
          rotation = void 0;
      var side = this.game.rnd.pick(['top', 'left', 'right', 'bottom']);

      switch (side) {
        case 'top':
          x = this.game.rnd.between(marginX, this.game.width - marginX);
          y = 0;
          rotation = this.game.rnd.realInRange(marginRotation, Math.PI - marginRotation);
          break;
        case 'left':
          x = 0;
          y = this.game.rnd.between(marginY, this.game.height - marginY);
          rotation = this.game.rnd.realInRange(-Math.PI / 2 + marginRotation, Math.PI / 2 - marginRotation);
          break;
        case 'right':
          x = this.game.width;
          y = this.game.rnd.between(marginY, this.game.height - marginY);
          rotation = this.game.rnd.realInRange(Math.PI / 2 + marginRotation, Math.PI * 3 / 2 - marginRotation);
          break;
        case 'bottom':
          x = this.game.rnd.between(marginX, this.game.width - marginX);
          y = this.game.height;
          rotation = this.game.rnd.realInRange(marginRotation, -Math.PI + marginRotation);
          break;
      }

      this.meteor.reset(x, y, rotation);
    }
  }, {
    key: 'visualisationHint',
    value: function visualisationHint() {
      var triangle = this.getHintTriangle();

      if (triangle !== undefined) triangle.hintMe();
    }

    /**
     * Initialization event in the game
     */

  }, {
    key: 'initEvents',
    value: function initEvents() {
      this.game.input.onUp.add(this.destroyTriangle, this);
    }

    /**
     * Create triangles on canvas
     */

  }, {
    key: 'sketch',
    value: function sketch() {
      var delayForDisplay = 500;

      for (var x = 0; x < this.triangleMatrixWidth; x++) {
        this.trianglesMatrix[x] = [];
        for (var y = 0; y < this.triangleMatrixHeight; y++) {
          var posX = x * (Engine.Triangle.size / 2 - 1);
          var posY = y * (Engine.Triangle.size - 1);
          var isRotated = x % 2 === 1;
          var colorSet = this.game.rnd.pick(this.colorSets);

          if (y % 2 === 1) {
            isRotated = !isRotated;
          }

          var triangle = new Engine.Triangle(this.game, posX, posY, isRotated, colorSet, {
            x: x,
            y: y
          });

          triangle.growUp(delayForDisplay + (x + y) * 25);

          triangle.events.onInputOver.add(this.selectTriangle, this);
          triangle.events.onInputDown.add(this.selectTriangle, this);
          triangle.events.deleteComplete.add(this.recoverTriangle, this);

          this.trianglesMatrix[x][y] = triangle;
          // this.add.existing(triangle);
          this.triangleGroup.add(triangle);
        }
      }

      this.centeringMatrix();
    }

    /**
     * Destroy or unselect triangles
     */

  }, {
    key: 'destroyTriangle',
    value: function destroyTriangle() {
      this.tone.reset();

      var isUnselect = this.selectedTriangles.length < this.minTrianglesDestroy;

      if (!isUnselect) {
        this.updateScore(Math.pow(this.selectedTriangles.length, 2.15) * 10);
        this.shakeItShakeIt();
        this.hintTimer.stop(false);
        this.hintTimer.start();
      }

      var betweenAnimationDalay = 25;
      var snakeForTriangle = 2;

      for (var i = 0; this.selectedTriangles.length > 0; i++) {
        var triangle = this.selectedTriangles.shift();

        if (isUnselect) {
          triangle.unselect();
        } else {
          triangle.delete(i * betweenAnimationDalay);
          if (this.selectedTriangles.length === 0) {
            this.snakesAnimationRun(triangle.world.x, triangle.world.y, triangle.colorSet, Math.floor((i + 1) / snakeForTriangle));
            this.wave.playAnimation(triangle.world.x, triangle.world.y, triangle.isRotated);
          }
        }
      }

      if (!isUnselect) {
        var timerExistMove = this.game.time.create();

        timerExistMove.add(Triangle.animationTimeDelete + Triangle.animationTimeRecover, this.processPosition, this);

        timerExistMove.start();
      }
    }
  }, {
    key: 'recoverTriangle',
    value: function recoverTriangle(triangle) {
      triangle.recover(this.game.rnd.pick(this.colorSets));
    }
  }, {
    key: 'selectTriangle',
    value: function selectTriangle(triangle, point) {
      if (!this.game.input.activePointer.isDown) {
        return;
      }

      if (this.selectedTriangles.length === 0) {
        triangle.select();
        // this.tone.up();
        this.selectedTriangles.push(triangle);
      } else {
        var lastSelectedTriangle = this.selectedTriangles[this.selectedTriangles.length - 1];
        var preLastSelectedTriangle = this.selectedTriangles[this.selectedTriangles.length - 2];

        if (triangle.selected && triangle === preLastSelectedTriangle) {
          lastSelectedTriangle.unselect();
          // this.tone.low()
          this.selectedTriangles.pop();
        } else if (!triangle.selected && this.canTriangleLink(lastSelectedTriangle, triangle) && lastSelectedTriangle.colorSet === triangle.colorSet) {
          triangle.select();
          // this.tone.up();
          this.selectedTriangles.push(triangle);
        }
      }
    }

    /**
     * Check triangles link
     */

  }, {
    key: 'canTriangleLink',
    value: function canTriangleLink(tr1, tr2) {
      var result = false;
      if (tr1.matrixPos.y === tr2.matrixPos.y) {
        if (tr1.matrixPos.x + 1 === tr2.matrixPos.x || tr1.matrixPos.x - 1 === tr2.matrixPos.x) {
          result = true;
        }
      } else if (tr1.matrixPos.x === tr2.matrixPos.x) {
        if (tr1.matrixPos.x % 2 === 0) {
          if (tr1.isRotated && tr2.matrixPos.y === tr1.matrixPos.y - 1) {
            result = true;
          } else if (!tr1.isRotated && tr2.matrixPos.y === tr1.matrixPos.y + 1) {
            result = true;
          }
        } else {
          if (!tr1.isRotated && tr2.matrixPos.y === tr1.matrixPos.y + 1) {
            result = true;
          } else if (tr1.isRotated && tr2.matrixPos.y === tr1.matrixPos.y - 1) {
            result = true;
          }
        }
      }

      return result;
    }

    /**
     * Add score on stage
     */

  }, {
    key: 'createScoreLable',
    value: function createScoreLable() {
      var randomColorSet = this.game.rnd.pick(this.colorSets);
      var color = '#00E676'; // + Phaser.Color.componentToHex(randomColorSet.getLastColor());
      var marginRight = 15;
      var marginTop = 15;

      var style = {
        font: '42px Open Sans',
        fontStyle: 'italic',
        fill: color
      };

      this.scoreLable = new Engine.ScoreLable(this.game, this.game.width - marginRight, marginTop, 0, style);
      this.scoreLable.anchor.setTo(1, 0);

      // TODO: TEMP
      this.scoreLable.inputEnabled = true;
      this.scoreLable.events.onInputDown.add(this.toggleFullScreen, this);
    }
  }, {
    key: 'initializationFullScreen',
    value: function initializationFullScreen() {
      this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.RESIZE;
      this.game.scale.onFullScreenChange.add(this.resizeScreen, this);
    }
  }, {
    key: 'toggleFullScreen',
    value: function toggleFullScreen() {
      if (this.game.scale.isFullScreen) {
        this.game.scale.stopFullScreen();
      } else {
        this.game.scale.startFullScreen();
      }
    }
  }, {
    key: 'updateScore',
    value: function updateScore(val) {
      val = Math.round(val);

      this.score += val;
      this.scoreLable.changeValue(this.score);
    }
  }, {
    key: 'resizeScreen',
    value: function resizeScreen() {
      this.scoreLable.x = this.game.width - 15;
      this.scoreLable.y = 15;

      this.universeFirst.resize();
      this.universeSecond.resize();

      this.centeringMatrix();
    }
  }, {
    key: 'centeringMatrix',
    value: function centeringMatrix() {
      var halfTriangleSize = Engine.Triangle.size / 2;

      this.triangleGroup.x = this.game.width / 2 - this.triangleGroup.width / 2 + halfTriangleSize;
      this.triangleGroup.y = this.game.height / 2 - this.triangleGroup.height / 2 + halfTriangleSize;
    }
  }, {
    key: 'rebuildMap',
    value: function rebuildMap() {
      var timeDelay = 50;

      for (var x = 0; x < this.triangleMatrixWidth; x++) {
        for (var y = 0; y < this.triangleMatrixHeight; y++) {
          var triangle = this.trianglesMatrix[x][y];
          var randomColorSet = this.game.rnd.pick(this.colorSets);

          triangle.updateColor(randomColorSet, x * timeDelay + y * timeDelay);
        }
      }
    }
  }, {
    key: 'processPosition',
    value: function processPosition() {
      if (this.getSomeCombination().length === 0) {
        var delayDestroy = 5000;
        var timer = this.game.time.create();

        timer.add(delayDestroy, this.rebuildMap, this);
        timer.start(0);
      }
    }
  }, {
    key: 'getHintTriangle',
    value: function getHintTriangle() {
      return this.game.rnd.pick(this.getSomeCombination());
    }

    /**
     * Get existing combination, if we haven't exist move, then return empty array
     */

  }, {
    key: 'getSomeCombination',
    value: function getSomeCombination() {
      var usedCell = [];
      var triangles = [];

      for (var x = 0; x < this.triangleMatrixWidth; x++) {
        usedCell[x] = [];
        for (var y = 0; y < this.triangleMatrixHeight; y++) {
          usedCell[x][y] = false;
        }
      }

      for (var _x = 0; _x < this.triangleMatrixWidth; _x++) {
        for (var _y = 0; _y < this.triangleMatrixHeight; _y++) {
          if (!usedCell[_x][_y] && this.hasCombination(usedCell, this.trianglesMatrix[_x][_y].colorSet, _x, _y, 1)) {
            triangles.push(this.trianglesMatrix[_x][_y]);
          }
        }
      }

      return triangles;
    }
  }, {
    key: 'hasCombination',
    value: function hasCombination(usedCell, colorSet, x, y, cnt) {
      if (colorSet !== this.trianglesMatrix[x][y].colorSet || usedCell[x][y]) {
        return cnt > this.minTrianglesDestroy;
      }

      usedCell[x][y] = true;
      if (x + 1 < this.triangleMatrixWidth) {
        if (this.hasCombination(usedCell, colorSet, x + 1, y, cnt + 1)) {
          return true;
        }
      }

      if (x - 1 >= 0) {
        if (this.hasCombination(usedCell, colorSet, x - 1, y, cnt + 1)) {
          return true;
        }
      }

      if (this.trianglesMatrix[x][y].isRotated) {
        if (y - 1 >= 0) {
          if (this.hasCombination(usedCell, colorSet, x, y - 1, cnt + 1)) {
            return true;
          }
        }
      } else {
        if (y + 1 < this.triangleMatrixHeight) {
          if (this.hasCombination(usedCell, colorSet, x, y + 1, cnt + 1)) {
            return true;
          }
        }
      }

      return false;
    }
  }, {
    key: 'shakeItShakeIt',
    value: function shakeItShakeIt() {
      var x = this.triangleGroup.x;
      var y = this.triangleGroup.y;
      var amplitudeY = 0.75;
      var amplitudeX = 2;
      var timeAnimation = 20;

      this.add.tween(this.triangleGroup).to({
        x: x + amplitudeX, y: y + amplitudeY
      }, timeAnimation, Phaser.Easing.Linear.None).to({
        x: x - amplitudeX, y: y - amplitudeY
      }, timeAnimation, Phaser.Easing.Linear.None).to({
        x: x, y: y
      }, timeAnimation, Phaser.Easing.Linear.None).start();
    }
  }, {
    key: 'snakesAnimationRun',
    value: function snakesAnimationRun(x, y, colorGradation, count) {
      var force = 25;

      for (var i = 0; i < count; i++) {
        var snake = this.snakes.getFirstDead();

        var angle = Math.PI * 2 / count * i;
        var impulseX = Math.cos(angle) * force;
        var impulseY = Math.sin(angle) * force;
        snake.run(x, y, this.scoreLable.world.x, this.scoreLable.world.y, impulseX, impulseY, colorGradation.getRandomColor());
      }
    }
  }]);

  return Game;
}(Phaser.State);

Engine.Game = Game;
"use strict";
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Log = function () {
  function Log() {
    _classCallCheck(this, Log);
  }

  _createClass(Log, null, [{
    key: "init",
    value: function init() {
      this.startTime = new Date();
    }
  }, {
    key: "write",
    value: function write(part, msg) {
      var time = (new Date() - this.startTime) / 1000;
      console.log("[" + time + " sec] [" + part + "] " + msg);
    }
  }]);

  return Log;
}();

Engine.Log = Log;
'use strict';

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS5qcyIsImJvb3QuanMiLCJsb2FkZXIuanMiLCJtZW51LmpzIiwiY29sb3JzZXQuanMiLCJsaW5rZXIuanMiLCJtZXRlb3IuanMiLCJzY29yZWxhYmxlLmpzIiwic25ha2UuanMiLCJzcGFya2xlLW9sZC5qcyIsInNwYXJrbGUuanMiLCJ0b25lLmpzIiwidHJpYW5nbGUuanMiLCJ1bml2ZXJzZS5qcyIsIndhdmUuanMiLCJnYW1lLmpzIiwic2NvcmVib2FyZC5qcyIsImxvZ2dlci5qcyIsImFwcC5qcyJdLCJuYW1lcyI6WyJFbmdpbmUiLCJtaW5XaWR0aCIsIm1pbkhlaWdodCIsIm1heFdpZHRoIiwibWF4SGVpZ2h0IiwiQm9vdCIsIkxvZyIsIndyaXRlIiwiZ2FtZSIsInN0YWdlIiwiZGlzYWJsZVZpc2liaWxpdHlDaGFuZ2UiLCJzY2FsZSIsInBhZ2VBbGlnbkhvcml6b250YWxseSIsInBhZ2VBbGlnblZlcnRpY2FsbHkiLCJzdGF0ZSIsInN0YXJ0IiwiUGhhc2VyIiwiU3RhdGUiLCJMb2FkZXIiLCJiYWNrZ3JvdW5kQ29sb3IiLCJhZGRQcm9ncmVzc0xhYmxlIiwibG9hZCIsIm9uRmlsZUNvbXBsZXRlIiwiYWRkIiwicmVmcmVzaFByb2dyZXNzIiwiY2FjaGUiLCJhZGRCaXRtYXBEYXRhIiwiVHJpYW5nbGUiLCJiaXRtYXBLZXkiLCJnZW5lcmF0ZVNwcml0ZSIsIk1ldGVvciIsIlVuaXZlcnNlIiwiZ2VuZXJhdGVXYXZlVGV4dHVyZSIsIm51bWJlck9mR3JhZGF0aW9uIiwiZGF0YSIsIldhdmUiLCJnZW5lcmF0ZUF0bGFzRGF0YSIsImFkZFRleHR1cmVBdGxhcyIsImJpdG1hcCIsImNhbnZhcyIsImF0bGFzRGF0YSIsIlRFWFRVUkVfQVRMQVNfSlNPTl9IQVNIIiwic3R5bGUiLCJmb250IiwiZmlsbCIsInByb2dyZXNzTGFibGUiLCJ0ZXh0Iiwid29ybGQiLCJjZW50ZXJYIiwiY2VudGVyWSIsImFuY2hvciIsInNldFRvIiwicHJvZ3Jlc3MiLCJjYWNoZUtleSIsInN1Y2Nlc3MiLCJ0b3RhbExvYWRlZCIsInRvdGFsRmlsZXMiLCJNZW51IiwiQ29sb3JTZXQiLCJncmFkaXRpb24iLCJybmQiLCJwaWNrIiwibnVtYmVyIiwibGVuZ3RoIiwiR1JBREFUSU9OUyIsIkxpbmtlciIsInRyMSIsInRyMiIsIngiLCJ5Iiwicm90YXRpb24iLCJzcGVlZCIsImdldEJpdG1hcERhdGEiLCJyZWZyZXNoUm90YXRpb24iLCJ2ZWxvY2l0eVgiLCJNYXRoIiwiY29zIiwidmVsb2NpdHlZIiwic2luIiwiYWxpdmUiLCJ3aWR0aCIsImhlaWdodCIsImJpdG1hcERhdGEiLCJncmFkaWVudCIsImN0eCIsImNyZWF0ZUxpbmVhckdyYWRpZW50IiwiYWRkQ29sb3JTdG9wIiwiYmVnaW5QYXRoIiwiZmlsbFN0eWxlIiwicmVjdCIsIlNwcml0ZSIsIlNjb3JlTGFibGUiLCJzY29yZSIsInJvdW5kIiwiZXhpc3RpbmciLCJ0d2VlbnMiLCJyZW1vdmUiLCJ0d2VlbiIsInRvIiwiYW5pbWF0aW9uQ2hhbmdlVmFsIiwib25VcGRhdGVDYWxsYmFjayIsIm9uQ29tcGxldGUiLCJUZXh0IiwiU25ha2UiLCJoZWFkIiwic2VnbWVudHMiLCJ0YXJnZXRYIiwidGFyZ2V0WSIsImltcHVsc2VYIiwiaW1wdWxzZVkiLCJjb2xvciIsInJlc2V0IiwiZmlyc3RJbXB1bHNlIiwic3FydCIsInBvdyIsImlzUnVuIiwiZmluaXNoUGhhc2UiLCJ1cGRhdGVWZWxvY2l0eSIsIm1ha2VTbmFwc2hvdCIsImlzRmluaXNoIiwic3RvcCIsImtpbGwiLCJkcmF3QWxsU2VnbWVudHMiLCJzdGVwc1VwZGF0ZSIsImFuZ2xlIiwibWF0aCIsImFuZ2xlQmV0d2VlbiIsImRpc3RhbmNlIiwic2VnbWVudCIsIm1heFNlZ21lbnRzIiwic2hpZnQiLCJwdXNoIiwiY2xlYXIiLCJpIiwibmV4dFNlZ21lbnQiLCJtb3ZlVG8iLCJsaW5lU3R5bGUiLCJzaXplIiwibGluZVRvIiwiYmVnaW5GaWxsIiwiZHJhd0NpcmNsZSIsImVuZEZpbGwiLCJHcmFwaGljcyIsIlNwYXJrbGUiLCJjb3VudCIsInN1bnJheSIsImxpbmVDb2xvciIsImxpbmVXaWR0aCIsImRyYXdSb3VuZGVkUmVjdCIsIlRvbmUiLCJjdXJyZW50IiwidG9uZXMiLCJwbGF5IiwiaXNSb3RhdGVkIiwiY29sb3JTZXQiLCJtYXRyaXhQb3NpdGlvbiIsInRpbnQiLCJnZXRSYW5kb21Db2xvciIsIm1hdHJpeFBvcyIsImlucHV0RW5hYmxlZCIsImlucHV0IiwicGl4ZWxQZXJmZWN0T3ZlciIsInBpeGVsUGVyZmVjdENsaWNrIiwiZXZlbnRzIiwiZGVsZXRlQ29tcGxldGUiLCJTaWduYWwiLCJzZWxlY3RlZCIsIlBJIiwiYWRkQ2hpbGQiLCJhbmltYXRpb25UaW1lU2VsZWN0IiwiZGFsYXkiLCJhY3RpdmVQb2ludGVyIiwiaXNEb3duIiwiYWxwaGEiLCJhbmltYXRpb25UaW1lRGVsZXRlIiwiZGVsYXkiLCJkaXNwYXRjaCIsImFuaW1hdGlvblRpbWUiLCJiZXR3ZWVuIiwiRWFzaW5nIiwiTGluZWFyIiwiTm9uZSIsImhpZGVUd2VlbiIsInNob3dUd2VlbiIsImNoYWluIiwibGFzdENvbG9yIiwiYmxpbmtzIiwib25TdGFydCIsImxhc3RCbGluayIsInRpbWUiLCJhbmltYXRpb25UaW1lUmVjb3ZlciIsInJvdGF0aW9uU3BlZWQiLCJyZWFsSW5SYW5nZSIsIm1heFN0YXJTaXplIiwibWluU3RhclNpemUiLCJiaXRtYXBTaXplIiwid2luZG93Iiwic2NyZWVuIiwiYXZhaWxXaWR0aCIsImF2YWlsSGVpZ2h0Iiwic3RhcnMiLCJtYWtlIiwic3RhclNpemUiLCJmcmFtZSIsInR3ZWVuU2l6ZSIsInNpemVSYXRpbyIsInR3ZWVuRGVzdHJveSIsImNvdW50RnJhbWVBbmltYXRpb24iLCJmcmFtZXMiLCJsaW5lU2l6ZSIsInNwcml0ZVNoZWV0V2lkdGgiLCJzdHJva2VTdHlsZSIsInciLCJoIiwicmFkaXVzIiwiZWxsaXBzZSIsInN0cm9rZSIsIkdhbWUiLCJnZyIsImNvbG9yU2V0cyIsInRvbmUiLCJtYXJnaW5Ub3AiLCJtYXJnaW5MZWZ0IiwibWluVHJpYW5nbGVzRGVzdHJveSIsInRyaWFuZ2xlc01hdHJpeCIsInNlbGVjdGVkVHJpYW5nbGVzIiwidHJpYW5nbGVNYXRyaXhXaWR0aCIsInRyaWFuZ2xlTWF0cml4SGVpZ2h0IiwiY3JlYXRlVW5pdmVyc2UiLCJjcmVhdGVHcmFkYXRpb25zIiwidHJpYW5nbGVHcm91cCIsImdyb3VwIiwiY3JlYXRlIiwic2tldGNoIiwiaW5pdEV2ZW50cyIsImNyZWF0ZVdhdmUiLCJjcmVhdGVTb3VuZHMiLCJjcmVhdGVTbmFrZXMiLCJjcmVhdGVIaW50VGltZXIiLCJjcmVhdGVTY29yZUxhYmxlIiwiaW5pdGlhbGl6YXRpb25GdWxsU2NyZWVuIiwiY3JlYXRlTWV0ZW9yIiwiZm9yY2VQb3J0cmFpdCIsInNuYWtlc1B1bGxTaXplIiwic25ha2VzIiwic25ha2UiLCJhbGxHcmFkYXRpb24iLCJBcnJheVV0aWxzIiwic2h1ZmZsZSIsInNlY29uZFJvdGF0aW9uU3BlZWQiLCJ1bml2ZXJzZUZpcnN0IiwidW5pdmVyc2VTZWNvbmQiLCJoaW50VGltZW91dCIsImhpbnRUaW1lciIsImxvb3AiLCJ2aXN1YWxpc2F0aW9uSGludCIsIm1ldGVvclRpbWVyRGVsYXkiLCJtZXRlb3IiLCJzZW5kVG9CYWNrIiwib3V0T2ZDYW1lcmFCb3VuZHNLaWxsIiwibWV0ZW9yVGltZXIiLCJydW5NZXRlb3IiLCJ3YXZlIiwibWFyZ2luWCIsIm1hcmdpblkiLCJtYXJnaW5Sb3RhdGlvbiIsInNpZGUiLCJ0cmlhbmdsZSIsImdldEhpbnRUcmlhbmdsZSIsInVuZGVmaW5lZCIsImhpbnRNZSIsIm9uVXAiLCJkZXN0cm95VHJpYW5nbGUiLCJkZWxheUZvckRpc3BsYXkiLCJwb3NYIiwicG9zWSIsImdyb3dVcCIsIm9uSW5wdXRPdmVyIiwic2VsZWN0VHJpYW5nbGUiLCJvbklucHV0RG93biIsInJlY292ZXJUcmlhbmdsZSIsImNlbnRlcmluZ01hdHJpeCIsImlzVW5zZWxlY3QiLCJ1cGRhdGVTY29yZSIsInNoYWtlSXRTaGFrZUl0IiwiYmV0d2VlbkFuaW1hdGlvbkRhbGF5Iiwic25ha2VGb3JUcmlhbmdsZSIsInVuc2VsZWN0IiwiZGVsZXRlIiwic25ha2VzQW5pbWF0aW9uUnVuIiwiZmxvb3IiLCJwbGF5QW5pbWF0aW9uIiwidGltZXJFeGlzdE1vdmUiLCJwcm9jZXNzUG9zaXRpb24iLCJyZWNvdmVyIiwicG9pbnQiLCJzZWxlY3QiLCJsYXN0U2VsZWN0ZWRUcmlhbmdsZSIsInByZUxhc3RTZWxlY3RlZFRyaWFuZ2xlIiwicG9wIiwiY2FuVHJpYW5nbGVMaW5rIiwicmVzdWx0IiwicmFuZG9tQ29sb3JTZXQiLCJtYXJnaW5SaWdodCIsImZvbnRTdHlsZSIsInNjb3JlTGFibGUiLCJ0b2dnbGVGdWxsU2NyZWVuIiwiZnVsbFNjcmVlblNjYWxlTW9kZSIsIlNjYWxlTWFuYWdlciIsIlJFU0laRSIsIm9uRnVsbFNjcmVlbkNoYW5nZSIsInJlc2l6ZVNjcmVlbiIsImlzRnVsbFNjcmVlbiIsInN0b3BGdWxsU2NyZWVuIiwic3RhcnRGdWxsU2NyZWVuIiwidmFsIiwiY2hhbmdlVmFsdWUiLCJyZXNpemUiLCJoYWxmVHJpYW5nbGVTaXplIiwidGltZURlbGF5IiwidXBkYXRlQ29sb3IiLCJnZXRTb21lQ29tYmluYXRpb24iLCJkZWxheURlc3Ryb3kiLCJ0aW1lciIsInJlYnVpbGRNYXAiLCJ1c2VkQ2VsbCIsInRyaWFuZ2xlcyIsImhhc0NvbWJpbmF0aW9uIiwiY250IiwiYW1wbGl0dWRlWSIsImFtcGxpdHVkZVgiLCJ0aW1lQW5pbWF0aW9uIiwiY29sb3JHcmFkYXRpb24iLCJmb3JjZSIsImdldEZpcnN0RGVhZCIsInJ1biIsInN0YXJ0VGltZSIsIkRhdGUiLCJwYXJ0IiwibXNnIiwiY29uc29sZSIsImxvZyIsImluaXQiLCJBVVRPIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFNBQVM7QUFDWEMsWUFBVSxHQURDO0FBRVhDLGFBQVcsR0FGQTtBQUdYQyxZQUFVLElB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QUdIblYsT0FBT00sR0FBUCxHQUFhQSxHQUFiOzs7QUNYQUEsSUFBSWdWLElBQUo7O0FBRUFoVixJQUFJQyxLQUFKLENBQVUsS0FBVixFQUFpQixXQUFqQjs7QUFFQVAsT0FBT1EsSUFBUCxHQUFjLElBQUlRLE9BQU95TSxJQUFYLENBQWdCek4sT0FBT0csUUFBdkIsRUFBaUNILE9BQU9JLFNBQXhDLEVBQW1EWSxPQUFPdVUsSUFBMUQsQ0FBZDs7QUFFQWpWLElBQUlDLEtBQUosQ0FBVSxLQUFWLEVBQWlCLG9CQUFqQjs7QUFFQVAsT0FBT1EsSUFBUCxDQUFZTSxLQUFaLENBQWtCUyxHQUFsQixDQUFzQixNQUF0QixFQUE4QnZCLE9BQU9LLElBQXJDO0FBQ0FMLE9BQU9RLElBQVAsQ0FBWU0sS0FBWixDQUFrQlMsR0FBbEIsQ0FBc0IsUUFBdEIsRUFBZ0N2QixPQUFPa0IsTUFBdkM7QUFDQTtBQUNBbEIsT0FBT1EsSUFBUCxDQUFZTSxLQUFaLENBQWtCUyxHQUFsQixDQUFzQixNQUF0QixFQUE4QnZCLE9BQU95TixJQUFyQztBQUNBOztBQUVBbk4sSUFBSUMsS0FBSixDQUFVLEtBQVYsRUFBaUIscUJBQWpCOztBQUVBUCxPQUFPUSxJQUFQLENBQVlNLEtBQVosQ0FBa0JDLEtBQWxCLENBQXdCLE1BQXhCOztBQUVBVCxJQUFJQyxLQUFKLENBQVUsS0FBVixFQUFpQixVQUFqQiIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgRW5naW5lID0ge1xyXG4gIG1pbldpZHRoOiA2NDAsXHJcbiAgbWluSGVpZ2h0OiAzMjAsXHJcbiAgbWF4V2lkdGg6IDEzNjYsXHJcbiAgbWF4SGVpZ2h0OiA3NjgsXHJcbn07XHJcbiIsImNsYXNzIEJvb3QgZXh0ZW5kcyBQaGFzZXIuU3RhdGUge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIHByZWxvYWQoKSB7XHJcbiAgICBMb2cud3JpdGUoJ2Jvb3QnLCAnUHJlbG9hZGluZycpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlKCkge1xyXG4gICAgTG9nLndyaXRlKCdib290JywgJ0NyZWF0aW5nJyk7XHJcblxyXG4gICAgdGhpcy5nYW1lLnN0YWdlLmRpc2FibGVWaXNpYmlsaXR5Q2hhbmdlID0gdHJ1ZTtcclxuICAgIHRoaXMuc2NhbGUucGFnZUFsaWduSG9yaXpvbnRhbGx5ID0gdHJ1ZTtcclxuICAgIHRoaXMuc2NhbGUucGFnZUFsaWduVmVydGljYWxseSA9IHRydWU7XHJcblxyXG4gICAgTG9nLndyaXRlKCdib290JywgJ0ZpbmlzaCBjcmVhdGluZycpO1xyXG5cclxuICAgIHRoaXMuc3RhdGUuc3RhcnQoJ0xvYWRlcicpO1xyXG4gIH1cclxufVxyXG5cclxuRW5naW5lLkJvb3QgPSBCb290O1xyXG4iLCJjbGFzcyBMb2FkZXIgZXh0ZW5kcyBQaGFzZXIuU3RhdGUge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIHByZWxvYWQoKSB7XHJcbiAgICB0aGlzLmdhbWUuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gJyMwMDAnO1xyXG4gICAgdGhpcy5hZGRQcm9ncmVzc0xhYmxlKCk7XHJcblxyXG4gICAgdGhpcy5sb2FkLm9uRmlsZUNvbXBsZXRlLmFkZCh0aGlzLnJlZnJlc2hQcm9ncmVzcywgdGhpcyk7XHJcblxyXG4gICAgLy8gdGhpcy5sb2FkLmF1ZGlvKCdtdXNpYzEnLCAnYXNzZXRzL211c2ljL1lhbCFYIC0gRm9yZ2l2ZW4ubXAzJyk7XHJcblxyXG4gICAgdGhpcy5nYW1lLmNhY2hlLmFkZEJpdG1hcERhdGEoRW5naW5lLlRyaWFuZ2xlLmJpdG1hcEtleSwgRW5naW5lLlRyaWFuZ2xlLmdlbmVyYXRlU3ByaXRlKHRoaXMuZ2FtZSkpO1xyXG4gICAgdGhpcy5nYW1lLmNhY2hlLmFkZEJpdG1hcERhdGEoRW5naW5lLk1ldGVvci5iaXRtYXBLZXksIEVuZ2luZS5NZXRlb3IuZ2VuZXJhdGVTcHJpdGUodGhpcy5nYW1lKSk7XHJcbiAgICB0aGlzLmdhbWUuY2FjaGUuYWRkQml0bWFwRGF0YShFbmdpbmUuVW5pdmVyc2UuYml0bWFwS2V5LCBFbmdpbmUuVW5pdmVyc2UuZ2VuZXJhdGVTcHJpdGUodGhpcy5nYW1lKSk7XHJcbiAgICAvLyB0aGlzLmdhbWUuY2FjaGUuYWRkQml0bWFwRGF0YShFbmdpbmUuU3BhcmtsZS5iaXRtYXBLZXksIEVuZ2luZS5TcGFya2xlLmdlbmVyYXRlU3ByaXRlKHRoaXMuZ2FtZSkpO1xyXG5cclxuICAgIHRoaXMuZ2VuZXJhdGVXYXZlVGV4dHVyZSgpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlKCkge1xyXG4gICAgbGV0IG51bWJlck9mR3JhZGF0aW9uID0gMztcclxuICAgIHRoaXMuc3RhdGUuc3RhcnQoJ0dhbWUnLCB0cnVlLCBmYWxzZSwgbnVtYmVyT2ZHcmFkYXRpb24pO1xyXG4gIH1cclxuXHJcbiAgZ2VuZXJhdGVXYXZlVGV4dHVyZSgpIHtcclxuICAgIGxldCBkYXRhID0gRW5naW5lLldhdmUuZ2VuZXJhdGVBdGxhc0RhdGEoKTtcclxuICAgIHRoaXMuZ2FtZS5jYWNoZS5hZGRUZXh0dXJlQXRsYXMoV2F2ZS5iaXRtYXBLZXksICcnLCBkYXRhLmJpdG1hcC5jYW52YXMsIGRhdGEuYXRsYXNEYXRhLCBQaGFzZXIuTG9hZGVyLlRFWFRVUkVfQVRMQVNfSlNPTl9IQVNIKTtcclxuICB9XHJcblxyXG4gIGFkZFByb2dyZXNzTGFibGUoKSB7XHJcbiAgICBsZXQgc3R5bGUgPSB7XHJcbiAgICAgIGZvbnQ6ICc0MXB4IE9wZW4gU2FucycsXHJcbiAgICAgIGZpbGw6ICcjMDBFNjc2JyxcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnByb2dyZXNzTGFibGUgPSB0aGlzLmFkZC50ZXh0KHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYLCB0aGlzLmdhbWUud29ybGQuY2VudGVyWSwgJ0xvYWRpbmc6IDAlICgwLzApJywgc3R5bGUpO1xyXG4gICAgdGhpcy5wcm9ncmVzc0xhYmxlLmFuY2hvci5zZXRUbygwLjUpO1xyXG4gIH1cclxuXHJcbiAgcmVmcmVzaFByb2dyZXNzKHByb2dyZXNzLCBjYWNoZUtleSwgc3VjY2VzcywgdG90YWxMb2FkZWQsIHRvdGFsRmlsZXMpIHtcclxuICAgIHRoaXMucHJvZ3Jlc3NMYWJsZS50ZXh0ID0gYExvYWRpbmcgJHtwcm9ncmVzc30lICgke3RvdGFsTG9hZGVkfS8ke3RvdGFsRmlsZXN9KWA7XHJcbiAgfVxyXG59XHJcblxyXG5FbmdpbmUuTG9hZGVyID0gTG9hZGVyO1xyXG4iLCJjbGFzcyBNZW51IGV4dGVuZHMgUGhhc2VyLlN0YXRlIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGUoKSB7XHJcblxyXG4gIH1cclxufVxyXG4iLCJjbGFzcyBDb2xvclNldCB7XHJcbiAgLyoqXHJcbiAgICogQ29sb3IgU2V0XHJcbiAgICogQHBhcmFtICB7QXJyYXl9IGdyYWRpdGlvbiBBcnJheSBvZiBjb2xvcnNcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihncmFkaXRpb24pIHtcclxuICAgIHRoaXMuZ3JhZGl0aW9uID0gZ3JhZGl0aW9uO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHJhbmRvbSBjb2xvciBmcm9tIHNldFxyXG4gICAqIEByZXR1cm4ge1t0eXBlXX0gW2Rlc2NyaXB0aW9uXVxyXG4gICAqL1xyXG4gIGdldFJhbmRvbUNvbG9yKCkge1xyXG4gICAgcmV0dXJuIEVuZ2luZS5nYW1lLnJuZC5waWNrKHRoaXMuZ3JhZGl0aW9uKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBjb2xvciBieSBudW1iZXJcclxuICAgKi9cclxuICBnZXRCeU51bWJlcihudW1iZXIpIHtcclxuICAgIHJldHVybiB0aGlzLmdyYWRpdGlvbltudW1iZXJdO1xyXG4gIH1cclxuXHJcbiAgZ2V0TGFzdENvbG9yKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZ3JhZGl0aW9uW3RoaXMuZ3JhZGl0aW9uLmxlbmd0aCAtIDFdO1xyXG4gIH1cclxufVxyXG5cclxuQ29sb3JTZXQuR1JBREFUSU9OUyA9IFtcclxuICAvLyBpbmRpZ29cclxuICBbXHJcbiAgICAweDNGNTFCNSxcclxuICAgIDB4Mzk0OUFCLFxyXG4gICAgMHgzMDNGOUYsXHJcbiAgICAweDI4MzU5MyxcclxuICBdLFxyXG4gIC8vIGJsdWVcclxuICBbXHJcbiAgICAweDIxOTZGMyxcclxuICAgIDB4MUU4OEU1LFxyXG4gICAgMHgxOTc2RDIsXHJcbiAgICAweDE1NjVDMCxcclxuICBdLFxyXG4gIC8vIHllbGxvd1xyXG4gIFtcclxuICAgIDB4RkZGMTc2LFxyXG4gICAgMHhGRkVFNTgsXHJcbiAgICAweEZGRUIzQixcclxuICAgIDB4RkREODM1LFxyXG4gIF0sXHJcbiAgLy8gcGlua1xyXG4gIFtcclxuICAgIDB4RTkxRTYzLFxyXG4gICAgMHhEODFCNjAsXHJcbiAgICAweEMyMTg1QixcclxuICAgIDB4QUQxNDU3LFxyXG4gIF0sXHJcbiAgLy8gYnJvd25cclxuICBbXHJcbiAgICAweDc5NTU0OCxcclxuICAgIDB4NkQ0QzQxLFxyXG4gICAgMHg1RDQwMzcsXHJcbiAgICAweDRFMzQyRSxcclxuICBdLFxyXG4gIC8vIC8vIGRlZXBvcmFuZ2VcclxuICAvLyBbXHJcbiAgLy8gICAweEZGNTcyMixcclxuICAvLyAgIDB4RjQ1MTFFLFxyXG4gIC8vICAgMHhFNjRBMTksXHJcbiAgLy8gICAweEQ4NDMxNSxcclxuICAvLyBdLFxyXG4gIC8vIGdyZXlcclxuICBbXHJcbiAgICAweDlFOUU5RSxcclxuICAgIDB4NzU3NTc1LFxyXG4gICAgMHg2MTYxNjEsXHJcbiAgICAweDQyNDI0MixcclxuICBdLFxyXG4gIC8vIC8vIHJlZFxyXG4gIC8vIFtcclxuICAvLyAgIDB4RjQ0MzM2LFxyXG4gIC8vICAgMHhFNTM5MzUsXHJcbiAgLy8gICAweEQzMkYyRixcclxuICAvLyAgIDB4QzYyODI4LFxyXG4gIC8vIF0sXHJcbl07XHJcblxyXG5FbmdpbmUuQ29sb3JTZXQgPSBDb2xvclNldDtcclxuIiwiY2xhc3MgTGlua2VyIHtcclxuICBzdGF0aWMgY2FuVHJpYW5nbGVMaW5rKHRyMSwgdHIyKSB7XHJcblxyXG4gIH1cclxufVxyXG4iLCJjbGFzcyBNZXRlb3IgZXh0ZW5kcyBQaGFzZXIuU3ByaXRlIHtcclxuICBjb25zdHJ1Y3RvcihnYW1lLCB4ID0gMCwgeSA9IDAsIHJvdGF0aW9uID0gMCwgc3BlZWQgPSAxMDApIHtcclxuICAgIHN1cGVyKGdhbWUsIHgsIHksIGdhbWUuY2FjaGUuZ2V0Qml0bWFwRGF0YShNZXRlb3IuYml0bWFwS2V5KSk7XHJcblxyXG4gICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xyXG4gICAgdGhpcy5hbmNob3Iuc2V0VG8oMSk7XHJcbiAgICB0aGlzLnJlZnJlc2hSb3RhdGlvbihyb3RhdGlvbik7XHJcbiAgfVxyXG5cclxuICByZXNldCh4LCB5LCByb3RhdGlvbikge1xyXG4gICAgdGhpcy5yZWZyZXNoUm90YXRpb24ocm90YXRpb24pO1xyXG5cclxuICAgIHN1cGVyLnJlc2V0KHgsIHkpO1xyXG4gIH1cclxuXHJcbiAgcmVmcmVzaFJvdGF0aW9uKHJvdGF0aW9uKSB7XHJcbiAgICB0aGlzLnJvdGF0aW9uID0gcm90YXRpb247XHJcbiAgICB0aGlzLnZlbG9jaXR5WCA9IE1hdGguY29zKHJvdGF0aW9uKSAqIHRoaXMuc3BlZWQ7XHJcbiAgICB0aGlzLnZlbG9jaXR5WSA9IE1hdGguc2luKHJvdGF0aW9uKSAqIHRoaXMuc3BlZWQ7XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoKSB7XHJcbiAgICBpZiAodGhpcy5hbGl2ZSkge1xyXG4gICAgICB0aGlzLnggKz0gdGhpcy52ZWxvY2l0eVg7XHJcbiAgICAgIHRoaXMueSArPSB0aGlzLnZlbG9jaXR5WTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBuZXcgbWV0ZW9yIHNwcml0ZVxyXG4gICAqL1xyXG4gIHN0YXRpYyBnZW5lcmF0ZVNwcml0ZShnYW1lKSB7XHJcbiAgICBjb25zdCB3aWR0aCA9IDEwMjQ7XHJcbiAgICBjb25zdCBoZWlnaHQgPSAyO1xyXG5cclxuICAgIGxldCBiaXRtYXAgPSBnYW1lLmFkZC5iaXRtYXBEYXRhKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgbGV0IGdyYWRpZW50ID0gYml0bWFwLmN0eC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCAwLCB3aWR0aCwgMCk7XHJcblxyXG4gICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDEuMCwgJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMSknKTtcclxuICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLjgsICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNCknKTtcclxuICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLjYsICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMyknKTtcclxuICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLjQsICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMiknKTtcclxuICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLjIsICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSknKTtcclxuICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLjAsICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDApJyk7XHJcblxyXG4gICAgYml0bWFwLmN0eC5iZWdpblBhdGgoKTtcclxuICAgIGJpdG1hcC5jdHguZmlsbFN0eWxlID0gZ3JhZGllbnQ7XHJcbiAgICBiaXRtYXAuY3R4LnJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICBiaXRtYXAuY3R4LmZpbGwoKTtcclxuXHJcbiAgICByZXR1cm4gYml0bWFwO1xyXG4gIH1cclxufVxyXG5cclxuTWV0ZW9yLmJpdG1hcEtleSA9ICdtZXRlb3InO1xyXG5cclxuRW5naW5lLk1ldGVvciA9IE1ldGVvcjtcclxuIiwiY2xhc3MgU2NvcmVMYWJsZSBleHRlbmRzIFBoYXNlci5UZXh0IHtcclxuICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzY29yZSwgc3R5bGUpIHtcclxuICAgIHN1cGVyKGdhbWUsIHgsIHksIGBTY29yZTogJHtNYXRoLnJvdW5kKHNjb3JlKX1gLCBzdHlsZSk7XHJcblxyXG4gICAgdGhpcy5zY29yZSA9IHNjb3JlO1xyXG5cclxuICAgIHRoaXMuZ2FtZS5hZGQuZXhpc3RpbmcodGhpcyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgc2NvcmUgbGFibGUgdmFsdWVcclxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHNjb3JlIE5ldyBzY29yZVxyXG4gICAqL1xyXG4gIGNoYW5nZVZhbHVlKHNjb3JlKSB7XHJcbiAgICB0aGlzLmdhbWUudHdlZW5zLnJlbW92ZSh0aGlzKTtcclxuXHJcbiAgICBsZXQgdHdlZW4gPSB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMpXHJcbiAgICAgIC50byh7XHJcbiAgICAgICAgc2NvcmVcclxuICAgICAgfSwgU2NvcmVMYWJsZS5hbmltYXRpb25DaGFuZ2VWYWwpXHJcbiAgICAgIC5vblVwZGF0ZUNhbGxiYWNrKCgpID0+IHtcclxuICAgICAgICB0aGlzLnRleHQgPSBgU2NvcmU6ICR7TWF0aC5yb3VuZCh0aGlzLnNjb3JlKX1gO1xyXG4gICAgICB9LCB0aGlzKTtcclxuXHJcbiAgICB0d2Vlbi5vbkNvbXBsZXRlXHJcbiAgICAgIC5hZGQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMudGV4dCA9IGBTY29yZTogJHtNYXRoLnJvdW5kKHRoaXMuc2NvcmUpfWA7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIHR3ZWVuLnN0YXJ0KCk7XHJcbiAgfVxyXG59XHJcblxyXG5TY29yZUxhYmxlLmFuaW1hdGlvbkNoYW5nZVZhbCA9IDUwMDtcclxuRW5naW5lLlNjb3JlTGFibGUgPSBTY29yZUxhYmxlO1xyXG4iLCJjbGFzcyBTbmFrZSBleHRlbmRzIFBoYXNlci5HcmFwaGljcyB7XHJcbiAgY29uc3RydWN0b3IoZ2FtZSkge1xyXG4gICAgc3VwZXIoZ2FtZSwgMCwgMCk7XHJcblxyXG4gICAgdGhpcy5oZWFkID0ge1xyXG4gICAgICB4OiAwLFxyXG4gICAgICB5OiAwLFxyXG4gICAgfTtcclxuICAgIHRoaXMudmVsb2NpdHlYID0gMDtcclxuICAgIHRoaXMudmVsb2NpdHlZID0gMDtcclxuICAgIHRoaXMuc2VnbWVudHMgPSBbXTtcclxuICB9XHJcblxyXG4gIHJ1bih4LCB5LCB0YXJnZXRYLCB0YXJnZXRZLCBpbXB1bHNlWCwgaW1wdWxzZVksIGNvbG9yKSB7XHJcbiAgICB0aGlzLnJlc2V0KDAsIDApO1xyXG4gICAgdGhpcy5maXJzdEltcHVsc2UgPSBNYXRoLnNxcnQoTWF0aC5wb3coaW1wdWxzZVgsIDIpICsgTWF0aC5wb3coaW1wdWxzZVgsIDIpKTtcclxuICAgIHRoaXMudGFyZ2V0WCA9IHRhcmdldFg7XHJcbiAgICB0aGlzLnRhcmdldFkgPSB0YXJnZXRZO1xyXG4gICAgdGhpcy52ZWxvY2l0eVggPSBpbXB1bHNlWDtcclxuICAgIHRoaXMudmVsb2NpdHlZID0gaW1wdWxzZVk7XHJcbiAgICB0aGlzLmNvbG9yID0gY29sb3I7XHJcbiAgICB0aGlzLnNlZ21lbnRzID0gW107XHJcbiAgICB0aGlzLmhlYWQgPSB7XHJcbiAgICAgIHgsXHJcbiAgICAgIHksXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuaXNSdW4gPSB0cnVlO1xyXG4gICAgdGhpcy5maW5pc2hQaGFzZSA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCkge1xyXG4gICAgaWYgKHRoaXMuaXNSdW4pIHtcclxuICAgICAgdGhpcy51cGRhdGVWZWxvY2l0eSgpO1xyXG4gICAgICB0aGlzLmhlYWQueCArPSB0aGlzLnZlbG9jaXR5WDtcclxuICAgICAgdGhpcy5oZWFkLnkgKz0gdGhpcy52ZWxvY2l0eVk7XHJcbiAgICAgIHRoaXMubWFrZVNuYXBzaG90KCk7XHJcblxyXG4gICAgICBpZiAodGhpcy5pc0ZpbmlzaCgpKSB7XHJcbiAgICAgICAgdGhpcy5zdG9wKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5maW5pc2hQaGFzZSkge1xyXG4gICAgICB0aGlzLm1ha2VTbmFwc2hvdCgpO1xyXG5cclxuICAgICAgaWYgKFxyXG4gICAgICAgIHRoaXMuc2VnbWVudHNbMF0ueCA9PT0gdGhpcy5oZWFkLnggJiZcclxuICAgICAgICB0aGlzLnNlZ21lbnRzWzBdLnkgPT09IHRoaXMuaGVhZC55XHJcbiAgICAgICkge1xyXG4gICAgICAgIHRoaXMuZmluaXNoUGhhc2UgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmtpbGwoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZHJhd0FsbFNlZ21lbnRzKCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVWZWxvY2l0eSgpIHtcclxuICAgIGNvbnN0IHN0ZXBzVXBkYXRlID0gNjAgKiAwLjE7XHJcblxyXG4gICAgbGV0IGFuZ2xlID0gdGhpcy5nYW1lLm1hdGguYW5nbGVCZXR3ZWVuKHRoaXMuaGVhZC54LCB0aGlzLmhlYWQueSwgdGhpcy50YXJnZXRYLCB0aGlzLnRhcmdldFkpO1xyXG4gICAgbGV0IHZlbG9jaXR5WCA9IE1hdGguY29zKGFuZ2xlKSAqIFNuYWtlLnNwZWVkO1xyXG4gICAgbGV0IHZlbG9jaXR5WSA9IE1hdGguc2luKGFuZ2xlKSAqIFNuYWtlLnNwZWVkO1xyXG5cclxuICAgIHRoaXMudmVsb2NpdHlYICs9ICh2ZWxvY2l0eVggLSB0aGlzLnZlbG9jaXR5WCkgLyBzdGVwc1VwZGF0ZTtcclxuICAgIHRoaXMudmVsb2NpdHlZICs9ICh2ZWxvY2l0eVkgLSB0aGlzLnZlbG9jaXR5WSkgLyBzdGVwc1VwZGF0ZTtcclxuICB9XHJcblxyXG4gIHN0b3AoKSB7XHJcbiAgICB0aGlzLmlzUnVuID0gZmFsc2U7XHJcbiAgICB0aGlzLmZpbmlzaFBoYXNlID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGlzRmluaXNoKCkge1xyXG4gICAgdGhpcy5kaXN0YW5jZSA9IHRoaXMuZ2FtZS5tYXRoLmRpc3RhbmNlKFxyXG4gICAgICB0aGlzLmhlYWQueCxcclxuICAgICAgdGhpcy5oZWFkLnksXHJcbiAgICAgIHRoaXMudGFyZ2V0WCxcclxuICAgICAgdGhpcy50YXJnZXRZXHJcbiAgICApO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmRpc3RhbmNlIDwgdGhpcy5maXJzdEltcHVsc2UgKyBTbmFrZS5zcGVlZDtcclxuICB9XHJcblxyXG4gIG1ha2VTbmFwc2hvdCgpIHtcclxuICAgIGxldCBzZWdtZW50O1xyXG5cclxuICAgIHdoaWxlICh0aGlzLnNlZ21lbnRzLmxlbmd0aCA+IFNuYWtlLm1heFNlZ21lbnRzKSBzZWdtZW50ID0gdGhpcy5zZWdtZW50cy5zaGlmdCgpO1xyXG5cclxuICAgIHNlZ21lbnQgPSB7XHJcbiAgICAgIHg6IHRoaXMuaGVhZC54LFxyXG4gICAgICB5OiB0aGlzLmhlYWQueSxcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5zZWdtZW50cy5wdXNoKHNlZ21lbnQpO1xyXG4gIH1cclxuXHJcbiAgZHJhd0FsbFNlZ21lbnRzKCkge1xyXG4gICAgdGhpcy5jbGVhcigpO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zZWdtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBsZXQgc2VnbWVudCA9IHRoaXMuc2VnbWVudHNbaV07XHJcbiAgICAgIGxldCBuZXh0U2VnbWVudCA9IHRoaXMuc2VnbWVudHNbaSArIDFdIHx8IHNlZ21lbnQ7XHJcblxyXG4gICAgICB0aGlzLm1vdmVUbyhcclxuICAgICAgICBzZWdtZW50LngsXHJcbiAgICAgICAgc2VnbWVudC55XHJcbiAgICAgICk7XHJcblxyXG4gICAgICB0aGlzLmxpbmVTdHlsZShTbmFrZS5zaXplLCB0aGlzLmNvbG9yLCAxKTtcclxuXHJcbiAgICAgIHRoaXMubGluZVRvKFxyXG4gICAgICAgIG5leHRTZWdtZW50LngsXHJcbiAgICAgICAgbmV4dFNlZ21lbnQueVxyXG4gICAgICApO1xyXG5cclxuICAgICAgaWYgKHRoaXMuaXNSdW4pIHtcclxuICAgICAgICB0aGlzLmxpbmVTdHlsZSgwLCAwLCAwKTtcclxuXHJcbiAgICAgICAgdGhpcy5iZWdpbkZpbGwodGhpcy5jb2xvcik7XHJcbiAgICAgICAgdGhpcy5kcmF3Q2lyY2xlKFxyXG4gICAgICAgICAgc2VnbWVudC54LFxyXG4gICAgICAgICAgc2VnbWVudC55LFxyXG4gICAgICAgICAgU25ha2Uuc2l6ZVxyXG4gICAgICAgIClcclxuICAgICAgICB0aGlzLmVuZEZpbGwoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuU25ha2UubWF4U2VnbWVudHMgPSAxMDtcclxuU25ha2Uuc2l6ZSA9IDEwO1xyXG5TbmFrZS5zcGVlZCA9IDUwO1xyXG5cclxuRW5naW5lLlNuYWtlID0gU25ha2U7XHJcbiIsIi8vIGNsYXNzIFNwYXJrbGUgZXh0ZW5kcyBQaGFzZXIuU3ByaXRlIHtcclxuLy8gICBjb25zdHJ1Y3RvcihnYW1lKSB7XHJcbi8vICAgICBzdXBlcihnYW1lLCAwLCAwLCBnYW1lLmNhY2hlLmdldEJpdG1hcERhdGEoU3BhcmtsZS5iaXRtYXBLZXkpKTtcclxuLy9cclxuLy8gICAgIHRoaXMuaXNSdW4gPSBmYWxzZTtcclxuLy8gICAgIHRoaXMuYWxwaGEgPSAwO1xyXG4vLyAgICAgdGhpcy5hbmNob3Iuc2V0VG8oMC41KTtcclxuLy8gICAgIHRoaXMuc3BlZWQgPSA1MDtcclxuLy8gICAgIHRoaXMubWFzcyA9IDEyO1xyXG4vLyAgIH1cclxuLy9cclxuLy8gICBhbmltYXRlRnJvbVRvKHN0YXJ0U3ByaXRlLCB0YXJnZXRTcHJpdGUsIHZlbG9jaXR5WCA9IC0yMCwgdmVsb2NpdHlZID0gMjApIHtcclxuLy8gICAgIHRoaXMuYWxwaGEgPSAxO1xyXG4vLyAgICAgdGhpcy5pc1J1biA9IHRydWU7XHJcbi8vICAgICB0aGlzLnZlbG9jaXR5WCA9IHZlbG9jaXR5WDtcclxuLy8gICAgIHRoaXMudmVsb2NpdHlZID0gdmVsb2NpdHlZO1xyXG4vLyAgICAgdGhpcy50YXJnZXRTcHJpdGUgPSB0YXJnZXRTcHJpdGU7XHJcbi8vXHJcbi8vICAgICB0aGlzLnRpbnQgPSBzdGFydFNwcml0ZS50aW50O1xyXG4vL1xyXG4vLyAgICAgdGhpcy54ID0gc3RhcnRTcHJpdGUud29ybGQueDtcclxuLy8gICAgIHRoaXMueSA9IHN0YXJ0U3ByaXRlLndvcmxkLnk7XHJcbi8vICAgfVxyXG4vL1xyXG4vLyAgIHVwZGF0ZSgpIHtcclxuLy8gICAgIHRoaXMucm90YXRpb24gKz0gTWF0aC5QSSAqIDIgKiAxIC8gNjA7XHJcbi8vXHJcbi8vICAgICBpZiAodGhpcy5pc1J1bikge1xyXG4vLyAgICAgICBsZXQgYW5nbGUgPSB0aGlzLmdhbWUubWF0aC5hbmdsZUJldHdlZW4oXHJcbi8vICAgICAgICAgdGhpcy54LFxyXG4vLyAgICAgICAgIHRoaXMueSxcclxuLy8gICAgICAgICB0aGlzLnRhcmdldFNwcml0ZS53b3JsZC54LFxyXG4vLyAgICAgICAgIHRoaXMudGFyZ2V0U3ByaXRlLndvcmxkLnlcclxuLy8gICAgICAgKTtcclxuLy9cclxuLy8gICAgICAgbGV0IHRhcmdldFZlbG9jaXR5WCA9IE1hdGguY29zKGFuZ2xlKSAqIHRoaXMuc3BlZWQ7XHJcbi8vICAgICAgIGxldCB0YXJnZXRWZWxvY2l0eVkgPSBNYXRoLnNpbihhbmdsZSkgKiB0aGlzLnNwZWVkO1xyXG4vLyAgICAgICBsZXQgcGFydFggPSAodGFyZ2V0VmVsb2NpdHlYIC0gdGhpcy52ZWxvY2l0eVgpIC8gdGhpcy5tYXNzO1xyXG4vLyAgICAgICBsZXQgcGFydFkgPSAodGFyZ2V0VmVsb2NpdHlZIC0gdGhpcy52ZWxvY2l0eVkpIC8gdGhpcy5tYXNzO1xyXG4vL1xyXG4vLyAgICAgICB0aGlzLnZlbG9jaXR5WCArPSBwYXJ0WDtcclxuLy8gICAgICAgdGhpcy52ZWxvY2l0eVkgKz0gcGFydFk7XHJcbi8vXHJcbi8vICAgICAgIHRoaXMueCArPSB0aGlzLnZlbG9jaXR5WDtcclxuLy8gICAgICAgdGhpcy55ICs9IHRoaXMudmVsb2NpdHlZO1xyXG4vL1xyXG4vLyAgICAgICBpZiAodGhpcy5hbmltYXRpb25Jc0ZpbmlzaCgpKSB7XHJcbi8vICAgICAgICAgdGhpcy5pc1J1biA9IGZhbHNlO1xyXG4vLyAgICAgICAgIHRoaXMuYWxwaGEgPSAwO1xyXG4vLyAgICAgICB9XHJcbi8vICAgICB9XHJcbi8vICAgfVxyXG4vL1xyXG4vLyAgIGFuaW1hdGlvbklzRmluaXNoKCkge1xyXG4vLyAgICAgY29uc3QgbWluaW1hbERpc3RhbmNlRmluaXNoID0gNTA7XHJcbi8vXHJcbi8vICAgICByZXR1cm4gdGhpcy5nYW1lLm1hdGguZGlzdGFuY2UoXHJcbi8vICAgICAgIHRoaXMueCxcclxuLy8gICAgICAgdGhpcy55LFxyXG4vLyAgICAgICB0aGlzLnRhcmdldFNwcml0ZS53b3JsZC54LFxyXG4vLyAgICAgICB0aGlzLnRhcmdldFNwcml0ZS53b3JsZC55XHJcbi8vICAgICApIDwgbWluaW1hbERpc3RhbmNlRmluaXNoO1xyXG4vLyAgIH1cclxuLy9cclxuLy8gICBzdGF0aWMgZ2VuZXJhdGVTcHJpdGUoZ2FtZSkge1xyXG4vLyAgICAgbGV0IGJpdG1hcCA9IGdhbWUuYWRkLmJpdG1hcERhdGEoU3BhcmtsZS5zaXplLCBTcGFya2xlLnNpemUpO1xyXG4vL1xyXG4vLyAgICAgYml0bWFwLmN0eC5iZWdpblBhdGgoKTtcclxuLy8gICAgIGJpdG1hcC5jdHguc3Ryb2tlU3R5bGUgPSAnd2hpdGUnO1xyXG4vLyAgICAgYml0bWFwLmN0eC5saW5lV2lkdGggPSAyO1xyXG4vLyAgICAgYml0bWFwLmN0eC5tb3ZlVG8oMCwgU3BhcmtsZS5zaXplIC0gMSk7XHJcbi8vICAgICBiaXRtYXAuY3R4LmxpbmVUbyhTcGFya2xlLnNpemUgLyAyLCAwKTtcclxuLy8gICAgIGJpdG1hcC5jdHgubGluZVRvKFNwYXJrbGUuc2l6ZSAtIDEsIFNwYXJrbGUuc2l6ZSAtIDEpO1xyXG4vLyAgICAgYml0bWFwLmN0eC5saW5lVG8oMCwgU3BhcmtsZS5zaXplIC0gMSk7XHJcbi8vICAgICBiaXRtYXAuY3R4LnN0cm9rZSgpO1xyXG4vL1xyXG4vLyAgICAgcmV0dXJuIGJpdG1hcDtcclxuLy8gICB9XHJcbi8vIH1cclxuLy9cclxuLy8gU3BhcmtsZS5zaXplID0gMzA7XHJcbi8vIFNwYXJrbGUuYml0bWFwS2V5ID0gJ3NwYXJrbGUnO1xyXG4vL1xyXG4vLyBFbmdpbmUuU3BhcmtsZSA9IFNwYXJrbGU7XHJcbiIsImNsYXNzIFNwYXJrbGUgZXh0ZW5kcyBQaGFzZXIuR3JhcGhpY3Mge1xyXG4gIGNvbnN0cnVjdG9yKGdhbWUpIHtcclxuICAgIHN1cGVyKGdhbWUsIDAsIDApO1xyXG4gIH1cclxuXHJcbiAgYW5pbWF0ZSh4LCB5LCBjb2xvciwgY291bnQpIHtcclxuICAgIGxldCBzdW5yYXkgPSB7XHJcbiAgICAgIHdpZHRoOiAwLFxyXG4gICAgICBoZWlnaHQ6IDUsXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuY2xlYXIoKTtcclxuICAgIHRoaXMubGluZUNvbG9yID0gJyNmZmZmZmYnO1xyXG4gICAgdGhpcy5saW5lV2lkdGggPSAxO1xyXG4gICAgdGhpcy5iZWdpbkZpbGwoY29sb3IpO1xyXG5cclxuICAgIHRoaXMuZHJhd1JvdW5kZWRSZWN0KHgsIHksIDUwLCA1LCA1KTtcclxuXHJcbiAgICAvLyBsZXQgdHdlZW4gPSB0aGlzLmdhbWUuYWRkLnR3ZWVuKHN1bnJheSlcclxuICAgIC8vICAgLnRvKHt9LCAxMDAwKVxyXG4gICAgLy8gICAuc3RhcnQoKTtcclxuICAgIC8vXHJcbiAgICAvLyB0d2Vlbi5vblVwZGF0ZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIC8vXHJcbiAgICAvLyB9LCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLmVuZEZpbGwoKTtcclxuICB9XHJcbn1cclxuIiwiY2xhc3MgVG9uZSB7XHJcbiAgY29uc3RydWN0b3IoZ2FtZSkge1xyXG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcclxuICAgIHRoaXMuY3VycmVudCA9IDA7XHJcbiAgfVxyXG5cclxuICBjcmVhdGUoKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXAgYW5kIHBsYXkgbmV4dCB0b25lXHJcbiAgICovXHJcbiAgdXAoKSB7XHJcbiAgICBpZiAodGhpcy5jdXJyZW50ID4gVG9uZS5jb3VudCkge1xyXG4gICAgICB0aGlzLmN1cnJlbnQgPSBUb25lLmNvdW50IC0gMTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnRvbmVzW3RoaXMuY3VycmVudF0ucGxheSgpO1xyXG4gICAgdGhpcy5jdXJyZW50Kys7XHJcbiAgfVxyXG5cclxuICBsb3coKSB7XHJcbiAgICBpZiAodGhpcy5jdXJyZW50IDwgMCkge1xyXG4gICAgICB0aGlzLmN1cnJlbnQgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudG9uZXNbdGhpcy5jdXJyZW50XS5wbGF5KCk7XHJcbiAgICB0aGlzLmN1cnJlbnQtLTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlc2V0IHRvbmVcclxuICAgKi9cclxuICByZXNldCgpIHtcclxuICAgIHRoaXMuY3VycmVudCA9IDA7XHJcbiAgfVxyXG59XHJcblxyXG5Ub25lLmNvdW50ID0gMTA7XHJcbkVuZ2luZS5Ub25lID0gVG9uZTtcclxuIiwiY2xhc3MgVHJpYW5nbGUgZXh0ZW5kcyBQaGFzZXIuU3ByaXRlIHtcclxuXHJcbiAgLyoqXHJcbiAgICogSXQncyBhIHRyaWFuZ2xlLCB5YXNoIGl0J3Mgbm90IGEgam9rZVxyXG4gICAqIEBwYXJhbSAge1BoYXNlci5HYW1lfSAgZ2FtZSAgICAgIFtkZXNjcmlwdGlvbl1cclxuICAgKiBAcGFyYW0gIHtbdHlwZV19ICB4ICAgICAgICAgW2Rlc2NyaXB0aW9uXVxyXG4gICAqIEBwYXJhbSAge1t0eXBlXX0gIHkgICAgICAgICBbZGVzY3JpcHRpb25dXHJcbiAgICogQHBhcmFtICB7Qm9vbGVhbn0gaXNSb3RhdGVkIFtkZXNjcmlwdGlvbl1cclxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9ICBjb2xvciAgICAgW2Rlc2NyaXB0aW9uXVxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIGlzUm90YXRlZCwgY29sb3JTZXQsIG1hdHJpeFBvc2l0aW9uKSB7XHJcbiAgICBzdXBlcihnYW1lLCB4LCB5LCBFbmdpbmUuZ2FtZS5jYWNoZS5nZXRCaXRtYXBEYXRhKFRyaWFuZ2xlLmJpdG1hcEtleSkpO1xyXG5cclxuICAgIHRoaXMud2lkdGggPSBUcmlhbmdsZS5zaXplO1xyXG4gICAgdGhpcy5oZWlnaHQgPSBUcmlhbmdsZS5zaXplO1xyXG4gICAgdGhpcy5hbmNob3Iuc2V0VG8oMC41KTtcclxuICAgIHRoaXMuY29sb3JTZXQgPSBjb2xvclNldDtcclxuICAgIHRoaXMudGludCA9IHRoaXMuY29sb3JTZXQuZ2V0UmFuZG9tQ29sb3IoKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFBvaXRpb24gaW4gdGhlIG1hdHJpeCBvZiB0cmlhbmdsZXNcclxuICAgICAqIEB0eXBlIHtbdHlwZV19XHJcbiAgICAgKi9cclxuICAgIHRoaXMubWF0cml4UG9zID0gbWF0cml4UG9zaXRpb247XHJcblxyXG4gICAgdGhpcy5pbnB1dEVuYWJsZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5pbnB1dC5waXhlbFBlcmZlY3RPdmVyID0gdHJ1ZTtcclxuICAgIHRoaXMuaW5wdXQucGl4ZWxQZXJmZWN0Q2xpY2sgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuZXZlbnRzLmRlbGV0ZUNvbXBsZXRlID0gbmV3IFBoYXNlci5TaWduYWwoKTtcclxuXHJcbiAgICB0aGlzLnNlbGVjdGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLmlzUm90YXRlZCA9IGlzUm90YXRlZDtcclxuXHJcbiAgICBpZiAoaXNSb3RhdGVkKSB7XHJcbiAgICAgIHRoaXMucm90YXRpb24gPSBNYXRoLlBJO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHRoaXMuYWRkVGV4dFBvc2l0aW9uKCk7XHJcbiAgfVxyXG5cclxuICBhZGRUZXh0UG9zaXRpb24oKSB7XHJcbiAgICBsZXQgdGV4dCA9IG5ldyBQaGFzZXIuVGV4dChcclxuICAgICAgdGhpcy5nYW1lLFxyXG4gICAgICBUcmlhbmdsZS5zaXplIC8gMixcclxuICAgICAgVHJpYW5nbGUuc2l6ZSAvIDIsXHJcbiAgICAgIGAke3RoaXMubWF0cml4UG9zLnh9OiR7dGhpcy5tYXRyaXhQb3MueX1gLFxyXG4gICAgICB7XHJcbiAgICAgICAgZm9udDogJzY0cHggT3BlbiBTYW5zJyxcclxuICAgICAgICBmaWxsOiAnYmxhY2snXHJcbiAgICAgIH1cclxuICAgIClcclxuXHJcbiAgICBpZiAodGhpcy5pc1JvdGF0ZWQpIHtcclxuICAgICAgdGV4dC5yb3RhdGlvbiArPSBNYXRoLlBJO1xyXG4gICAgICB0ZXh0LnkgPSArdGV4dC5oZWlnaHQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0ZXh0LnggPSAtdGV4dC53aWR0aCAvIDI7XHJcbiAgICAgIHRleHQueSA9IC10ZXh0LmhlaWdodCAvIDQ7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hZGRDaGlsZCh0ZXh0KTtcclxuICB9XHJcblxyXG4gIHNlbGVjdCgpIHtcclxuICAgIGlmICghdGhpcy5zZWxlY3RlZCkge1xyXG4gICAgICB0aGlzLnNlbGVjdGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgIHRoaXMuZ2FtZS5hZGQudHdlZW4odGhpcylcclxuICAgICAgICAudG8oe1xyXG4gICAgICAgICAgd2lkdGg6IFRyaWFuZ2xlLnNpemUgLyAxLjUsXHJcbiAgICAgICAgICBoZWlnaHQ6IFRyaWFuZ2xlLnNpemUgLyAxLjVcclxuICAgICAgICB9LCBUcmlhbmdsZS5hbmltYXRpb25UaW1lU2VsZWN0KVxyXG4gICAgICAgIC5zdGFydCgpO1xyXG4gICAgICB9XHJcbiAgfVxyXG5cclxuICB1bnNlbGVjdCgpIHtcclxuICAgIGlmICh0aGlzLnNlbGVjdGVkKSB7XHJcblxyXG4gICAgICB0aGlzLmdhbWUudHdlZW5zLnJlbW92ZSh0aGlzKTtcclxuICAgICAgdGhpcy5zZWxlY3RlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzKVxyXG4gICAgICAgIC50byh7XHJcbiAgICAgICAgICB3aWR0aDogVHJpYW5nbGUuc2l6ZSxcclxuICAgICAgICAgIGhlaWdodDogVHJpYW5nbGUuc2l6ZVxyXG4gICAgICAgIH0sIFRyaWFuZ2xlLmFuaW1hdGlvblRpbWVTZWxlY3QpXHJcbiAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICAgIH1cclxuICB9XHJcblxyXG4gIGRlbGV0ZShkYWxheSA9IDApIHtcclxuICAgIGlmICh0aGlzLmdhbWUuaW5wdXQuYWN0aXZlUG9pbnRlci5pc0Rvd24pIHtcclxuICAgICAgdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzKVxyXG4gICAgICAgIC50byh7XHJcbiAgICAgICAgICB3aWR0aDogMCxcclxuICAgICAgICAgIGhlaWdodDogMCxcclxuICAgICAgICAgIGFscGhhOiAwXHJcbiAgICAgICAgfSwgVHJpYW5nbGUuYW5pbWF0aW9uVGltZURlbGV0ZSlcclxuICAgICAgICAuZGVsYXkoZGFsYXkpXHJcbiAgICAgICAgLnN0YXJ0KClcclxuICAgICAgICAub25Db21wbGV0ZVxyXG4gICAgICAgIC5hZGQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5ldmVudHMuZGVsZXRlQ29tcGxldGUuZGlzcGF0Y2godGhpcyk7XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZWNvdmVyKGNvbG9yU2V0KSB7XHJcbiAgICBjb25zdCBhbmltYXRpb25UaW1lID0gdGhpcy5nYW1lLnJuZC5iZXR3ZWVuKDI1MCwgMzAwKTtcclxuXHJcbiAgICB0aGlzLmNvbG9yU2V0ID0gY29sb3JTZXQ7XHJcbiAgICB0aGlzLnRpbnQgPSB0aGlzLmNvbG9yU2V0LmdldFJhbmRvbUNvbG9yKCk7XHJcbiAgICB0aGlzLndpZHRoID0gVHJpYW5nbGUuc2l6ZTtcclxuICAgIHRoaXMuaGVpZ2h0ID0gVHJpYW5nbGUuc2l6ZTtcclxuICAgIHRoaXMuc2VsZWN0ZWQgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMpXHJcbiAgICAgIC50byh7XHJcbiAgICAgICAgYWxwaGE6IDFcclxuICAgICAgfSwgYW5pbWF0aW9uVGltZSwgUGhhc2VyLkVhc2luZy5MaW5lYXIuTm9uZSlcclxuICAgICAgLnN0YXJ0KCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVDb2xvcihjb2xvclNldCwgZGVsYXkgPSAwKSB7XHJcbiAgICBjb25zdCBhbmltYXRpb25UaW1lID0gMTAwMDtcclxuICAgIHRoaXMuY29sb3JTZXQgPSBjb2xvclNldDtcclxuXHJcbiAgICBsZXQgaGlkZVR3ZWVuID0gdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzKVxyXG4gICAgICAudG8oe1xyXG4gICAgICAgIGFscGhhOiAwXHJcbiAgICAgIH0sIGFuaW1hdGlvblRpbWUpO1xyXG5cclxuICAgIGxldCBzaG93VHdlZW4gPSB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMpXHJcbiAgICAgIC50byh7XHJcbiAgICAgICAgYWxwaGE6IDFcclxuICAgICAgfSwgYW5pbWF0aW9uVGltZSk7XHJcblxyXG4gICAgaGlkZVR3ZWVuXHJcbiAgICAgIC5vbkNvbXBsZXRlXHJcbiAgICAgIC5hZGQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMudGludCA9IHRoaXMuY29sb3JTZXQuZ2V0UmFuZG9tQ29sb3IoKTtcclxuICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgaGlkZVR3ZWVuLmRlbGF5KGRlbGF5KTtcclxuXHJcbiAgICBoaWRlVHdlZW4uY2hhaW4oc2hvd1R3ZWVuKTtcclxuICAgIGhpZGVUd2Vlbi5zdGFydCgpO1xyXG4gIH1cclxuXHJcbiAgYmxpbmsoKSB7XHJcbiAgICBjb25zdCBsYXN0Q29sb3IgPSB0aGlzLnRpbnQ7XHJcbiAgICBsZXQgdHdlZW4gPSB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMpO1xyXG5cclxuICAgIHR3ZWVuLnRvKHtcclxuICAgICAgICBhbHBoYTogMlxyXG4gICAgICB9LCAxMDApXHJcbiAgICAgIC5vbkNvbXBsZXRlXHJcbiAgICAgIC5hZGQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMudGludCA9IGxhc3RDb2xvcjtcclxuICAgICAgICBUcmlhbmdsZS5ibGlua3MgPSBbXTtcclxuICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgdHdlZW4ub25TdGFydFxyXG4gICAgICAuYWRkKCgpID0+IHtcclxuICAgICAgICB0aGlzLmFscGhhID0gMDtcclxuICAgICAgICB0aGlzLnRpbnQgPSAweDAwRkYwMDtcclxuICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgaWYgKFRyaWFuZ2xlLmJsaW5rcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgVHJpYW5nbGUuYmxpbmtzLnB1c2godHdlZW4pO1xyXG4gICAgICB0d2Vlbi5zdGFydCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IGxhc3RCbGluayA9IFRyaWFuZ2xlLmJsaW5rc1tUcmlhbmdsZS5ibGlua3MubGVuZ3RoIC0gMV07XHJcbiAgICAgIGxhc3RCbGluay5jaGFpbih0d2Vlbik7XHJcbiAgICAgIFRyaWFuZ2xlLmJsaW5rcy5wdXNoKHR3ZWVuKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGhpbnRNZSgpIHtcclxuICAgIGxldCB0d2VlbiA9IHRoaXMuZ2FtZS5hZGQudHdlZW4odGhpcylcclxuICAgICAgLnRvKHtcclxuICAgICAgICB3aWR0aDogdGhpcy53aWR0aCAqIDAuNzUsXHJcbiAgICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCAqIDAuNzVcclxuICAgICAgfSwgMjAwKVxyXG4gICAgICAudG8oe1xyXG4gICAgICAgIHJvdGF0aW9uOiB0aGlzLnJvdGF0aW9uICsgTWF0aC5QSSAvIDMyXHJcbiAgICAgIH0sIDEwMClcclxuICAgICAgLnRvKHtcclxuICAgICAgICByb3RhdGlvbjogdGhpcy5yb3RhdGlvbiAtIE1hdGguUEkgKiAyIC8gMzJcclxuICAgICAgfSwgMTAwKVxyXG4gICAgICAudG8oe1xyXG4gICAgICAgIHJvdGF0aW9uOiBNYXRoLlBJICogdGhpcy5pc1JvdGF0ZWRcclxuICAgICAgfSwgMTAwKVxyXG4gICAgICAudG8oe1xyXG4gICAgICAgIHdpZHRoOiBUcmlhbmdsZS5zaXplLFxyXG4gICAgICAgIGhlaWdodDogVHJpYW5nbGUuc2l6ZVxyXG4gICAgICB9LCAyMDApO1xyXG5cclxuICAgIHR3ZWVuLnN0YXJ0KCk7XHJcbiAgfVxyXG5cclxuICBncm93VXAoZGVsYXkgPSAwKSB7XHJcbiAgICBjb25zdCB0aW1lID0gMzAwICsgdGhpcy5nYW1lLnJuZC5iZXR3ZWVuKC01MCwgNTApO1xyXG5cclxuICAgIHRoaXMud2lkdGggPSAwO1xyXG4gICAgdGhpcy5oZWlnaHQgPSAwO1xyXG4gICAgdGhpcy5hbHBoYSA9IDA7XHJcblxyXG4gICAgdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzKVxyXG4gICAgICAudG8oe1xyXG4gICAgICAgIHdpZHRoOiBUcmlhbmdsZS5zaXplLFxyXG4gICAgICAgIGhlaWdodDogVHJpYW5nbGUuc2l6ZSxcclxuICAgICAgICBhbHBoYTogMVxyXG4gICAgICB9LCB0aW1lKVxyXG4gICAgICAuZGVsYXkoZGVsYXkpXHJcbiAgICAgIC5zdGFydCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIG5ldyB0cmlhbmdsZSBzcHJpdGVcclxuICAgKi9cclxuICBzdGF0aWMgZ2VuZXJhdGVTcHJpdGUoZ2FtZSkge1xyXG4gICAgY29uc3Qgc2l6ZSA9IDI1NTtcclxuXHJcbiAgICBsZXQgYml0bWFwID0gZ2FtZS5hZGQuYml0bWFwRGF0YShzaXplLCBzaXplKTtcclxuXHJcbiAgICBiaXRtYXAuY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgYml0bWFwLmN0eC5maWxsU3R5bGUgPSAnd2hpdGUnO1xyXG4gICAgYml0bWFwLmN0eC5tb3ZlVG8oMCwgc2l6ZSk7XHJcbiAgICBiaXRtYXAuY3R4LmxpbmVUbyhzaXplIC8gMiwgMCk7XHJcbiAgICBiaXRtYXAuY3R4LmxpbmVUbyhzaXplLCBzaXplKTtcclxuICAgIGJpdG1hcC5jdHgubGluZVRvKDAsIHNpemUpO1xyXG4gICAgYml0bWFwLmN0eC5maWxsKCk7XHJcblxyXG4gICAgcmV0dXJuIGJpdG1hcDtcclxuICB9XHJcbn1cclxuXHJcblRyaWFuZ2xlLnNpemUgPSA3MTtcclxuVHJpYW5nbGUuYmxpbmtzID0gW107XHJcblRyaWFuZ2xlLmFuaW1hdGlvblRpbWVTZWxlY3QgPSAyMDA7XHJcblRyaWFuZ2xlLmFuaW1hdGlvblRpbWVEZWxldGUgPSAxNTA7XHJcblRyaWFuZ2xlLmFuaW1hdGlvblRpbWVSZWNvdmVyID0gMzAwO1xyXG5UcmlhbmdsZS5iaXRtYXBLZXkgPSAndHJpYW5nbGUnO1xyXG5cclxuRW5naW5lLlRyaWFuZ2xlID0gVHJpYW5nbGU7XHJcbiIsImNsYXNzIFVuaXZlcnNlIGV4dGVuZHMgUGhhc2VyLlNwcml0ZSB7XHJcbiAgY29uc3RydWN0b3IoZ2FtZSwgcm90YXRpb25TcGVlZCA9IDIuNSkge1xyXG4gICAgc3VwZXIoZ2FtZSwgZ2FtZS53aWR0aCAvIDIsIGdhbWUuaGVpZ2h0IC8gMiwgZ2FtZS5jYWNoZS5nZXRCaXRtYXBEYXRhKFVuaXZlcnNlLmJpdG1hcEtleSkpO1xyXG4gICAgdGhpcy5hbmNob3Iuc2V0VG8oMC41KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZWdyZS9TZWNcclxuICAgICAqIEB0eXBlIHtbdHlwZV19XHJcbiAgICAgKi9cclxuICAgIHRoaXMucm90YXRpb25TcGVlZCA9IHJvdGF0aW9uU3BlZWQ7XHJcbiAgICB0aGlzLnJvdGF0aW9uID0gdGhpcy5nYW1lLnJuZC5yZWFsSW5SYW5nZSgwLCBNYXRoLlBJICogMik7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2VuZXJhdGVTcHJpdGUoKSB7XHJcbiAgICBjb25zdCBtYXhTdGFyU2l6ZSA9IDQ7XHJcbiAgICBjb25zdCBtaW5TdGFyU2l6ZSA9IDE7XHJcbiAgICBjb25zdCBiaXRtYXBTaXplID0gTWF0aC5zcXJ0KE1hdGgucG93KHdpbmRvdy5zY3JlZW4uYXZhaWxXaWR0aCwgMikgKyBNYXRoLnBvdyh3aW5kb3cuc2NyZWVuLmF2YWlsSGVpZ2h0LCAyKSk7XHJcbiAgICBjb25zdCBzdGFycyA9IDEwMDtcclxuXHJcbiAgICBsZXQgYml0bWFwID0gRW5naW5lLmdhbWUubWFrZS5iaXRtYXBEYXRhKGJpdG1hcFNpemUsIGJpdG1hcFNpemUpO1xyXG4gICAgYml0bWFwLmN0eC5maWxsU3R5bGUgPSAnd2hpdGUnO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RhcnM7IGkrKykge1xyXG4gICAgICBsZXQgc3RhclNpemUgPSBFbmdpbmUuZ2FtZS5ybmQuYmV0d2VlbihtaW5TdGFyU2l6ZSwgbWF4U3RhclNpemUpO1xyXG4gICAgICBsZXQgeCA9IEVuZ2luZS5nYW1lLnJuZC5iZXR3ZWVuKDAsIGJpdG1hcFNpemUpO1xyXG4gICAgICBsZXQgeSA9IEVuZ2luZS5nYW1lLnJuZC5iZXR3ZWVuKDAsIGJpdG1hcFNpemUpO1xyXG5cclxuICAgICAgYml0bWFwLmN0eC5yZWN0KHgsIHksIHN0YXJTaXplLCBzdGFyU2l6ZSk7XHJcbiAgICAgIGJpdG1hcC5jdHguZmlsbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBiaXRtYXA7XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoKSB7XHJcbiAgICB0aGlzLnJvdGF0aW9uICs9IE1hdGguUEkgLyAxODAwIC8gNjAgKiB0aGlzLnJvdGF0aW9uU3BlZWQ7XHJcbiAgfVxyXG5cclxuICByZXNpemUoKSB7XHJcbiAgICB0aGlzLnggPSB0aGlzLmdhbWUud2lkdGggLyAyO1xyXG4gICAgdGhpcy55ID0gdGhpcy5nYW1lLmhlaWdodCAvIDI7XHJcbiAgfVxyXG59XHJcblxyXG5Vbml2ZXJzZS5iaXRtYXBLZXkgPSAndW5pdmVyc2UnO1xyXG5cclxuRW5naW5lLlVuaXZlcnNlID0gVW5pdmVyc2U7XHJcbiIsImNsYXNzIFdhdmUgZXh0ZW5kcyBQaGFzZXIuU3ByaXRlIHtcclxuICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5KSB7XHJcbiAgICBzdXBlcihnYW1lLCB4LCB5LCBXYXZlLmJpdG1hcEtleSwgMCk7XHJcblxyXG4gICAgdGhpcy5hbmNob3Iuc2V0VG8oMC41KTtcclxuXHJcbiAgICB0aGlzLmFscGhhID0gMDtcclxuICAgIHRoaXMud2lkdGggPSBFbmdpbmUuVHJpYW5nbGUuc2l6ZSAvIDI7XHJcbiAgICB0aGlzLmhlaWdodCA9IEVuZ2luZS5UcmlhbmdsZS5zaXplIC8gMjtcclxuICB9XHJcblxyXG4gIHBsYXlBbmltYXRpb24oeCwgeSkge1xyXG4gICAgY29uc3QgYW5pbWF0aW9uVGltZSA9IDIwMDtcclxuICAgIHRoaXMuYWxwaGEgPSAxO1xyXG4gICAgdGhpcy54ID0geDtcclxuICAgIHRoaXMueSA9IHk7XHJcbiAgICB0aGlzLmZyYW1lID0gMDtcclxuICAgIHRoaXMud2lkdGggPSBFbmdpbmUuVHJpYW5nbGUuc2l6ZSAvIDI7XHJcbiAgICB0aGlzLmhlaWdodCA9IEVuZ2luZS5UcmlhbmdsZS5zaXplIC8gMjtcclxuXHJcbiAgICBsZXQgdHdlZW5TaXplID0gdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzKVxyXG4gICAgICAudG8oe1xyXG4gICAgICAgIHdpZHRoOiBFbmdpbmUuVHJpYW5nbGUuc2l6ZSAqIFdhdmUuc2l6ZVJhdGlvLFxyXG4gICAgICAgIGhlaWdodDogRW5naW5lLlRyaWFuZ2xlLnNpemUgKiBXYXZlLnNpemVSYXRpbyxcclxuICAgICAgfSwgYW5pbWF0aW9uVGltZSk7XHJcblxyXG4gICAgbGV0IHR3ZWVuRGVzdHJveSA9IHRoaXMuZ2FtZS5hZGQudHdlZW4odGhpcylcclxuICAgICAgLnRvKHthbHBoYTogMH0sIGFuaW1hdGlvblRpbWUpXHJcbiAgICAgIC5vblVwZGF0ZUNhbGxiYWNrKCgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5mcmFtZSA9PT0gV2F2ZS5jb3VudEZyYW1lQW5pbWF0aW9uIC0gMSkge1xyXG4gICAgICAgICAgdGhpcy5hbHBoYSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZnJhbWUrKztcclxuICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgdHdlZW5TaXplLmNoYWluKHR3ZWVuRGVzdHJveSk7XHJcbiAgICB0d2VlblNpemUuc3RhcnQoKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZW5lcmF0ZUF0bGFzRGF0YSgpIHtcclxuICAgIGxldCBhdGxhc0RhdGEgPSB7XHJcbiAgICAgIGZyYW1lczogW11cclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qgc2l6ZSA9IEVuZ2luZS5UcmlhbmdsZS5zaXplICogV2F2ZS5zaXplUmF0aW87XHJcbiAgICBjb25zdCBsaW5lU2l6ZSA9IDE1O1xyXG4gICAgY29uc3Qgc3ByaXRlU2hlZXRXaWR0aCA9IFdhdmUuY291bnRGcmFtZUFuaW1hdGlvbjtcclxuXHJcbiAgICBsZXQgYml0bWFwID0gRW5naW5lLmdhbWUubWFrZS5iaXRtYXBEYXRhKHNpemUgKiBzcHJpdGVTaGVldFdpZHRoLCBzaXplKTtcclxuICAgIGJpdG1hcC5jdHguc3Ryb2tlU3R5bGUgPSAnI2U5ZTllOSc7XHJcblxyXG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCBzcHJpdGVTaGVldFdpZHRoOyB4KyspIHtcclxuICAgICAgYXRsYXNEYXRhLmZyYW1lc1t4XSA9IHtcclxuICAgICAgICBmcmFtZToge1xyXG4gICAgICAgICAgeDogeCAqIHNpemUsXHJcbiAgICAgICAgICB5OiAwLFxyXG4gICAgICAgICAgdzogc2l6ZSxcclxuICAgICAgICAgIGg6IHNpemUsXHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgYml0bWFwLmN0eC5saW5lV2lkdGggPSBsaW5lU2l6ZSAvICgxICsgeCk7XHJcbiAgICAgIGJpdG1hcC5jdHgubW92ZVRvKHNpemUgKyB4ICogc2l6ZSAtIGxpbmVTaXplIC8gMiwgc2l6ZSAvIDIpO1xyXG5cclxuICAgICAgbGV0IHJhZGl1cyA9IHNpemUgLyAyIC0gbGluZVNpemUgLyAyO1xyXG5cclxuICAgICAgYml0bWFwLmN0eC5lbGxpcHNlKFxyXG4gICAgICAgIHNpemUgLyAyICsgeCAqIHNpemUsXHJcbiAgICAgICAgc2l6ZSAvIDIsXHJcbiAgICAgICAgcmFkaXVzLFxyXG4gICAgICAgIHJhZGl1cyxcclxuICAgICAgICAwLFxyXG4gICAgICAgIDAsXHJcbiAgICAgICAgTWF0aC5QSSAqIDJcclxuICAgICAgKTtcclxuICAgICAgYml0bWFwLmN0eC5zdHJva2UoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBiaXRtYXAsXHJcbiAgICAgIGF0bGFzRGF0YSxcclxuICAgIH07XHJcbiAgfVxyXG59XHJcblxyXG5XYXZlLnNpemVSYXRpbyA9IDMuNTtcclxuV2F2ZS5iaXRtYXBLZXkgPSAnd2F2ZSc7XHJcbldhdmUuY291bnRGcmFtZUFuaW1hdGlvbiA9IDEyO1xyXG5cclxuRW5naW5lLldhdmUgPSBXYXZlO1xyXG4iLCJjbGFzcyBHYW1lIGV4dGVuZHMgUGhhc2VyLlN0YXRlIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcblxyXG4gICAgd2luZG93LmdnID0gdGhpcztcclxuICB9XHJcblxyXG4gIGluaXQobnVtYmVyT2ZHcmFkYXRpb24pIHtcclxuICAgIHRoaXMuY29sb3JTZXRzID0gW107XHJcbiAgICAvKipcclxuICAgICAqIE51bWJlciBvZiBjb2xvclNldHMgd2lsbCB1c2UgaW4gdGhpcyBnYW1lIGxldmVsXHJcbiAgICAgKiBAdHlwZSB7W3R5cGVdfVxyXG4gICAgICovXHJcbiAgICB0aGlzLm51bWJlck9mR3JhZGF0aW9uID0gbnVtYmVyT2ZHcmFkYXRpb247XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUb25lIHN5c3RlbSBtYW5hZ2VyXHJcbiAgICAgKiBAdHlwZSB7RW5naW5lfVxyXG4gICAgICovXHJcbiAgICB0aGlzLnRvbmUgPSBuZXcgRW5naW5lLlRvbmUodGhpcy5nYW1lKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1hcmdpblRvcCBvZiB0cmlhbmdsZXMgbWF0cml4XHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICB0aGlzLm1hcmdpblRvcCA9IDEwMDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1hcmdpbkxlZnQgb2YgdHJpYW5nbGVzIG1hdHJpeFxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5tYXJnaW5MZWZ0ID0gNjQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNaW5pbWFsIHRyaWFuZ2xlcyBkZXN0cm95IGxlbmd0aFxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5taW5UcmlhbmdsZXNEZXN0cm95ID0gMztcclxuXHJcbiAgICB0aGlzLnRyaWFuZ2xlc01hdHJpeCA9IFtdO1xyXG4gICAgdGhpcy5zZWxlY3RlZFRyaWFuZ2xlcyA9IFtdO1xyXG5cclxuICAgIHRoaXMuc2NvcmUgPSAwO1xyXG5cclxuICAgIHRoaXMudHJpYW5nbGVNYXRyaXhXaWR0aCA9IDI1O1xyXG4gICAgdGhpcy50cmlhbmdsZU1hdHJpeEhlaWdodCA9IDk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGUoKSB7XHJcbiAgICB0aGlzLmdhbWUuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gJyMwMDAnO1xyXG5cclxuICAgIHRoaXMuY3JlYXRlVW5pdmVyc2UoKTtcclxuICAgIHRoaXMuY3JlYXRlR3JhZGF0aW9ucygpO1xyXG5cclxuICAgIHRoaXMudHJpYW5nbGVHcm91cCA9IHRoaXMuZ2FtZS5hZGQuZ3JvdXAoKTtcclxuXHJcbiAgICB0aGlzLnRvbmUuY3JlYXRlKCk7XHJcblxyXG4gICAgdGhpcy5za2V0Y2goKTtcclxuICAgIHRoaXMuaW5pdEV2ZW50cygpO1xyXG4gICAgdGhpcy5jcmVhdGVXYXZlKCk7XHJcbiAgICB0aGlzLmNyZWF0ZVNvdW5kcygpO1xyXG4gICAgdGhpcy5jcmVhdGVTbmFrZXMoKTtcclxuICAgIHRoaXMuY3JlYXRlSGludFRpbWVyKCk7XHJcbiAgICB0aGlzLmNyZWF0ZVNjb3JlTGFibGUoKTtcclxuICAgIHRoaXMuaW5pdGlhbGl6YXRpb25GdWxsU2NyZWVuKCk7XHJcblxyXG4gICAgdGhpcy5jcmVhdGVNZXRlb3IoKTtcclxuXHJcbiAgICB0aGlzLmZvcmNlUG9ydHJhaXQgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCkge1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlU25ha2VzKCkge1xyXG4gICAgY29uc3Qgc25ha2VzUHVsbFNpemUgPSAzMDtcclxuICAgIHRoaXMuc25ha2VzID0gdGhpcy5nYW1lLmFkZC5ncm91cCgpO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc25ha2VzUHVsbFNpemU7IGkrKykge1xyXG4gICAgICBsZXQgc25ha2UgPSBuZXcgRW5naW5lLlNuYWtlKHRoaXMuZ2FtZSk7XHJcbiAgICAgIHNuYWtlLmtpbGwoKTtcclxuXHJcbiAgICAgIHRoaXMuc25ha2VzLmFkZChzbmFrZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjcmVhdGVTb3VuZHMoKSB7XHJcbiAgICAvLyB0aGlzLm11c2ljMSA9IHRoaXMuZ2FtZS5zb3VuZC5hZGQoJ211c2ljMScsIDEsIHRydWUpO1xyXG4gICAgLy8gdGhpcy5tdXNpYzEucGxheSgpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlR3JhZGF0aW9ucygpIHtcclxuICAgIGxldCBhbGxHcmFkYXRpb24gPSBQaGFzZXIuQXJyYXlVdGlscy5zaHVmZmxlKENvbG9yU2V0LkdSQURBVElPTlMpO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5udW1iZXJPZkdyYWRhdGlvbjsgaSsrKSB7XHJcbiAgICAgIGxldCBjb2xvclNldCA9IG5ldyBDb2xvclNldChhbGxHcmFkYXRpb25baV0pO1xyXG4gICAgICB0aGlzLmNvbG9yU2V0cy5wdXNoKGNvbG9yU2V0KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNyZWF0ZVVuaXZlcnNlKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBSb3RhdGlvbiBzcGVlZCBmb3Igc2Vjb25kIHVuaXZlcnNlXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBjb25zdCBzZWNvbmRSb3RhdGlvblNwZWVkID0gNTtcclxuXHJcbiAgICB0aGlzLnVuaXZlcnNlRmlyc3QgPSBuZXcgRW5naW5lLlVuaXZlcnNlKHRoaXMuZ2FtZSk7XHJcbiAgICB0aGlzLnVuaXZlcnNlU2Vjb25kID0gbmV3IEVuZ2luZS5Vbml2ZXJzZSh0aGlzLmdhbWUsIHNlY29uZFJvdGF0aW9uU3BlZWQpO1xyXG5cclxuICAgIHRoaXMuZ2FtZS5hZGQuZXhpc3RpbmcodGhpcy51bml2ZXJzZUZpcnN0KTtcclxuICAgIHRoaXMuZ2FtZS5hZGQuZXhpc3RpbmcodGhpcy51bml2ZXJzZVNlY29uZCk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVIaW50VGltZXIoKSB7XHJcbiAgICBjb25zdCBoaW50VGltZW91dCA9IDIwMDAwO1xyXG4gICAgdGhpcy5oaW50VGltZXIgPSB0aGlzLmdhbWUudGltZS5jcmVhdGUoKTtcclxuXHJcbiAgICB0aGlzLmhpbnRUaW1lci5sb29wKGhpbnRUaW1lb3V0LCB0aGlzLnZpc3VhbGlzYXRpb25IaW50LCB0aGlzKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZU1ldGVvcigpIHtcclxuICAgIGNvbnN0IG1ldGVvclRpbWVyRGVsYXkgPSAyMCAqIDEwMDA7XHJcblxyXG4gICAgdGhpcy5tZXRlb3IgPSBuZXcgRW5naW5lLk1ldGVvcih0aGlzLmdhbWUpO1xyXG4gICAgdGhpcy5nYW1lLmFkZC5leGlzdGluZyh0aGlzLm1ldGVvcik7XHJcbiAgICB0aGlzLm1ldGVvci5zZW5kVG9CYWNrKCk7XHJcbiAgICB0aGlzLm1ldGVvci5vdXRPZkNhbWVyYUJvdW5kc0tpbGwgPSB0cnVlO1xyXG4gICAgdGhpcy5tZXRlb3Iua2lsbCgpO1xyXG5cclxuICAgIHRoaXMubWV0ZW9yVGltZXIgPSB0aGlzLmdhbWUudGltZS5jcmVhdGUoKTtcclxuICAgIHRoaXMubWV0ZW9yVGltZXIubG9vcChtZXRlb3JUaW1lckRlbGF5LCAoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLmdhbWUucm5kLnBpY2soW3RydWUsIGZhbHNlXSkpIHtcclxuICAgICAgICB0aGlzLnJ1bk1ldGVvcigpO1xyXG4gICAgICB9XHJcbiAgICB9LCB0aGlzKTtcclxuICAgIHRoaXMubWV0ZW9yVGltZXIuc3RhcnQoKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZVdhdmUoKSB7XHJcbiAgICB0aGlzLndhdmUgPSBuZXcgRW5naW5lLldhdmUodGhpcy5nYW1lLCAwLCAwKTtcclxuXHJcbiAgICB0aGlzLmdhbWUuYWRkLmV4aXN0aW5nKHRoaXMud2F2ZSk7XHJcbiAgfVxyXG5cclxuICBydW5NZXRlb3IoKSB7XHJcbiAgICBjb25zdCBtYXJnaW5YID0gdGhpcy5nYW1lLndpZHRoIC8gMTA7XHJcbiAgICBjb25zdCBtYXJnaW5ZID0gdGhpcy5nYW1lLmhlaWdodCAvIDEwO1xyXG4gICAgY29uc3QgbWFyZ2luUm90YXRpb24gPSBNYXRoLlBJIC8gMTA7XHJcbiAgICBsZXQgeCwgeSwgcm90YXRpb247XHJcbiAgICBsZXQgc2lkZSA9IHRoaXMuZ2FtZS5ybmQucGljayhbJ3RvcCcsICdsZWZ0JywgJ3JpZ2h0JywgJ2JvdHRvbSddKTtcclxuXHJcbiAgICBzd2l0Y2ggKHNpZGUpIHtcclxuICAgICAgY2FzZSAndG9wJzpcclxuICAgICAgICB4ID0gdGhpcy5nYW1lLnJuZC5iZXR3ZWVuKG1hcmdpblgsIHRoaXMuZ2FtZS53aWR0aCAtIG1hcmdpblgpO1xyXG4gICAgICAgIHkgPSAwO1xyXG4gICAgICAgIHJvdGF0aW9uID0gdGhpcy5nYW1lLnJuZC5yZWFsSW5SYW5nZShtYXJnaW5Sb3RhdGlvbiwgTWF0aC5QSSAtIG1hcmdpblJvdGF0aW9uKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnbGVmdCc6XHJcbiAgICAgICAgeCA9IDA7XHJcbiAgICAgICAgeSA9IHRoaXMuZ2FtZS5ybmQuYmV0d2VlbihtYXJnaW5ZLCB0aGlzLmdhbWUuaGVpZ2h0IC0gbWFyZ2luWSk7XHJcbiAgICAgICAgcm90YXRpb24gPSB0aGlzLmdhbWUucm5kLnJlYWxJblJhbmdlKC1NYXRoLlBJIC8gMiArIG1hcmdpblJvdGF0aW9uLCBNYXRoLlBJIC8gMiAtIG1hcmdpblJvdGF0aW9uKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAncmlnaHQnOlxyXG4gICAgICAgIHggPSB0aGlzLmdhbWUud2lkdGg7XHJcbiAgICAgICAgeSA9IHRoaXMuZ2FtZS5ybmQuYmV0d2VlbihtYXJnaW5ZLCB0aGlzLmdhbWUuaGVpZ2h0IC0gbWFyZ2luWSk7XHJcbiAgICAgICAgcm90YXRpb24gPSB0aGlzLmdhbWUucm5kLnJlYWxJblJhbmdlKE1hdGguUEkgLyAyICsgbWFyZ2luUm90YXRpb24sIE1hdGguUEkgKiAzIC8gMiAtIG1hcmdpblJvdGF0aW9uKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnYm90dG9tJzpcclxuICAgICAgICB4ID0gdGhpcy5nYW1lLnJuZC5iZXR3ZWVuKG1hcmdpblgsIHRoaXMuZ2FtZS53aWR0aCAtIG1hcmdpblgpO1xyXG4gICAgICAgIHkgPSB0aGlzLmdhbWUuaGVpZ2h0O1xyXG4gICAgICAgIHJvdGF0aW9uID0gdGhpcy5nYW1lLnJuZC5yZWFsSW5SYW5nZShtYXJnaW5Sb3RhdGlvbiwgLU1hdGguUEkgKyBtYXJnaW5Sb3RhdGlvbik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5tZXRlb3IucmVzZXQoeCwgeSwgcm90YXRpb24pO1xyXG4gIH1cclxuXHJcbiAgdmlzdWFsaXNhdGlvbkhpbnQoKSB7XHJcbiAgICBsZXQgdHJpYW5nbGUgPSB0aGlzLmdldEhpbnRUcmlhbmdsZSgpO1xyXG5cclxuICAgIGlmICh0cmlhbmdsZSAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICB0cmlhbmdsZS5oaW50TWUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYWxpemF0aW9uIGV2ZW50IGluIHRoZSBnYW1lXHJcbiAgICovXHJcbiAgaW5pdEV2ZW50cygpIHtcclxuICAgIHRoaXMuZ2FtZS5pbnB1dC5vblVwLmFkZCh0aGlzLmRlc3Ryb3lUcmlhbmdsZSwgdGhpcyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgdHJpYW5nbGVzIG9uIGNhbnZhc1xyXG4gICAqL1xyXG4gIHNrZXRjaCgpIHtcclxuICAgIGNvbnN0IGRlbGF5Rm9yRGlzcGxheSA9IDUwMDtcclxuXHJcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMudHJpYW5nbGVNYXRyaXhXaWR0aDsgeCsrKSB7XHJcbiAgICAgIHRoaXMudHJpYW5nbGVzTWF0cml4W3hdID0gW107XHJcbiAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy50cmlhbmdsZU1hdHJpeEhlaWdodDsgeSsrKSB7XHJcbiAgICAgICAgbGV0IHBvc1ggPSB4ICogKEVuZ2luZS5UcmlhbmdsZS5zaXplIC8gMiAtIDEpO1xyXG4gICAgICAgIGxldCBwb3NZID0geSAqIChFbmdpbmUuVHJpYW5nbGUuc2l6ZSAtIDEpO1xyXG4gICAgICAgIGxldCBpc1JvdGF0ZWQgPSB4ICUgMiA9PT0gMTtcclxuICAgICAgICBsZXQgY29sb3JTZXQgPSB0aGlzLmdhbWUucm5kLnBpY2sodGhpcy5jb2xvclNldHMpO1xyXG5cclxuICAgICAgICBpZiAoeSAlIDIgPT09IDEpIHtcclxuICAgICAgICAgIGlzUm90YXRlZCA9ICFpc1JvdGF0ZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdHJpYW5nbGUgPSBuZXcgRW5naW5lLlRyaWFuZ2xlKFxyXG4gICAgICAgICAgdGhpcy5nYW1lLFxyXG4gICAgICAgICAgcG9zWCxcclxuICAgICAgICAgIHBvc1ksXHJcbiAgICAgICAgICBpc1JvdGF0ZWQsXHJcbiAgICAgICAgICBjb2xvclNldCwge1xyXG4gICAgICAgICAgICB4LFxyXG4gICAgICAgICAgICB5XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgdHJpYW5nbGUuZ3Jvd1VwKGRlbGF5Rm9yRGlzcGxheSArICh4ICsgeSkgKiAyNSk7XHJcblxyXG4gICAgICAgIHRyaWFuZ2xlLmV2ZW50cy5vbklucHV0T3Zlci5hZGQodGhpcy5zZWxlY3RUcmlhbmdsZSwgdGhpcyk7XHJcbiAgICAgICAgdHJpYW5nbGUuZXZlbnRzLm9uSW5wdXREb3duLmFkZCh0aGlzLnNlbGVjdFRyaWFuZ2xlLCB0aGlzKTtcclxuICAgICAgICB0cmlhbmdsZS5ldmVudHMuZGVsZXRlQ29tcGxldGUuYWRkKHRoaXMucmVjb3ZlclRyaWFuZ2xlLCB0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy50cmlhbmdsZXNNYXRyaXhbeF1beV0gPSB0cmlhbmdsZTtcclxuICAgICAgICAvLyB0aGlzLmFkZC5leGlzdGluZyh0cmlhbmdsZSk7XHJcbiAgICAgICAgdGhpcy50cmlhbmdsZUdyb3VwLmFkZCh0cmlhbmdsZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNlbnRlcmluZ01hdHJpeCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVzdHJveSBvciB1bnNlbGVjdCB0cmlhbmdsZXNcclxuICAgKi9cclxuICBkZXN0cm95VHJpYW5nbGUoKSB7XHJcbiAgICB0aGlzLnRvbmUucmVzZXQoKTtcclxuXHJcbiAgICBsZXQgaXNVbnNlbGVjdCA9IHRoaXMuc2VsZWN0ZWRUcmlhbmdsZXMubGVuZ3RoIDwgdGhpcy5taW5UcmlhbmdsZXNEZXN0cm95O1xyXG5cclxuICAgIGlmICghaXNVbnNlbGVjdCkge1xyXG4gICAgICB0aGlzLnVwZGF0ZVNjb3JlKE1hdGgucG93KHRoaXMuc2VsZWN0ZWRUcmlhbmdsZXMubGVuZ3RoLCAyLjE1KSAqIDEwKTtcclxuICAgICAgdGhpcy5zaGFrZUl0U2hha2VJdCgpO1xyXG4gICAgICB0aGlzLmhpbnRUaW1lci5zdG9wKGZhbHNlKTtcclxuICAgICAgdGhpcy5oaW50VGltZXIuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBiZXR3ZWVuQW5pbWF0aW9uRGFsYXkgPSAyNTtcclxuICAgIGNvbnN0IHNuYWtlRm9yVHJpYW5nbGUgPSAyO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyB0aGlzLnNlbGVjdGVkVHJpYW5nbGVzLmxlbmd0aCA+IDA7IGkrKykge1xyXG4gICAgICBsZXQgdHJpYW5nbGUgPSB0aGlzLnNlbGVjdGVkVHJpYW5nbGVzLnNoaWZ0KCk7XHJcblxyXG4gICAgICBpZiAoaXNVbnNlbGVjdCkge1xyXG4gICAgICAgIHRyaWFuZ2xlLnVuc2VsZWN0KCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdHJpYW5nbGUuZGVsZXRlKGkgKiBiZXR3ZWVuQW5pbWF0aW9uRGFsYXkpO1xyXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkVHJpYW5nbGVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgdGhpcy5zbmFrZXNBbmltYXRpb25SdW4odHJpYW5nbGUud29ybGQueCwgdHJpYW5nbGUud29ybGQueSwgdHJpYW5nbGUuY29sb3JTZXQsIE1hdGguZmxvb3IoKGkgKyAxKSAvIHNuYWtlRm9yVHJpYW5nbGUpKTtcclxuICAgICAgICAgIHRoaXMud2F2ZS5wbGF5QW5pbWF0aW9uKHRyaWFuZ2xlLndvcmxkLngsIHRyaWFuZ2xlLndvcmxkLnksIHRyaWFuZ2xlLmlzUm90YXRlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFpc1Vuc2VsZWN0KSB7XHJcbiAgICAgIGxldCB0aW1lckV4aXN0TW92ZSA9IHRoaXMuZ2FtZS50aW1lLmNyZWF0ZSgpO1xyXG5cclxuICAgICAgdGltZXJFeGlzdE1vdmUuYWRkKFxyXG4gICAgICAgIFRyaWFuZ2xlLmFuaW1hdGlvblRpbWVEZWxldGUgK1xyXG4gICAgICAgIFRyaWFuZ2xlLmFuaW1hdGlvblRpbWVSZWNvdmVyLFxyXG4gICAgICAgIHRoaXMucHJvY2Vzc1Bvc2l0aW9uLFxyXG4gICAgICAgIHRoaXNcclxuICAgICAgKTtcclxuXHJcbiAgICAgIHRpbWVyRXhpc3RNb3ZlLnN0YXJ0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZWNvdmVyVHJpYW5nbGUodHJpYW5nbGUpIHtcclxuICAgIHRyaWFuZ2xlLnJlY292ZXIodGhpcy5nYW1lLnJuZC5waWNrKHRoaXMuY29sb3JTZXRzKSk7XHJcbiAgfVxyXG5cclxuICBzZWxlY3RUcmlhbmdsZSh0cmlhbmdsZSwgcG9pbnQpIHtcclxuICAgIGlmICghdGhpcy5nYW1lLmlucHV0LmFjdGl2ZVBvaW50ZXIuaXNEb3duKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5zZWxlY3RlZFRyaWFuZ2xlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgdHJpYW5nbGUuc2VsZWN0KCk7XHJcbiAgICAgIC8vIHRoaXMudG9uZS51cCgpO1xyXG4gICAgICB0aGlzLnNlbGVjdGVkVHJpYW5nbGVzLnB1c2godHJpYW5nbGUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IGxhc3RTZWxlY3RlZFRyaWFuZ2xlID0gdGhpcy5zZWxlY3RlZFRyaWFuZ2xlc1t0aGlzLnNlbGVjdGVkVHJpYW5nbGVzLmxlbmd0aCAtIDFdO1xyXG4gICAgICBsZXQgcHJlTGFzdFNlbGVjdGVkVHJpYW5nbGUgPSB0aGlzLnNlbGVjdGVkVHJpYW5nbGVzW3RoaXMuc2VsZWN0ZWRUcmlhbmdsZXMubGVuZ3RoIC0gMl07XHJcblxyXG4gICAgICBpZiAodHJpYW5nbGUuc2VsZWN0ZWQgJiYgdHJpYW5nbGUgPT09IHByZUxhc3RTZWxlY3RlZFRyaWFuZ2xlKSB7XHJcbiAgICAgICAgbGFzdFNlbGVjdGVkVHJpYW5nbGUudW5zZWxlY3QoKTtcclxuICAgICAgICAvLyB0aGlzLnRvbmUubG93KClcclxuICAgICAgICB0aGlzLnNlbGVjdGVkVHJpYW5nbGVzLnBvcCgpO1xyXG4gICAgICB9IGVsc2UgaWYgKCF0cmlhbmdsZS5zZWxlY3RlZCAmJlxyXG4gICAgICAgIHRoaXMuY2FuVHJpYW5nbGVMaW5rKGxhc3RTZWxlY3RlZFRyaWFuZ2xlLCB0cmlhbmdsZSkgJiZcclxuICAgICAgICBsYXN0U2VsZWN0ZWRUcmlhbmdsZS5jb2xvclNldCA9PT0gdHJpYW5nbGUuY29sb3JTZXRcclxuICAgICAgKSB7XHJcbiAgICAgICAgdHJpYW5nbGUuc2VsZWN0KCk7XHJcbiAgICAgICAgLy8gdGhpcy50b25lLnVwKCk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFRyaWFuZ2xlcy5wdXNoKHRyaWFuZ2xlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2sgdHJpYW5nbGVzIGxpbmtcclxuICAgKi9cclxuICBjYW5UcmlhbmdsZUxpbmsodHIxLCB0cjIpIHtcclxuICAgIGxldCByZXN1bHQgPSBmYWxzZTtcclxuICAgIGlmICh0cjEubWF0cml4UG9zLnkgPT09IHRyMi5tYXRyaXhQb3MueSkge1xyXG4gICAgICBpZiAodHIxLm1hdHJpeFBvcy54ICsgMSA9PT0gdHIyLm1hdHJpeFBvcy54IHx8XHJcbiAgICAgICAgdHIxLm1hdHJpeFBvcy54IC0gMSA9PT0gdHIyLm1hdHJpeFBvcy54KSB7XHJcbiAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0cjEubWF0cml4UG9zLnggPT09IHRyMi5tYXRyaXhQb3MueCkge1xyXG4gICAgICBpZiAodHIxLm1hdHJpeFBvcy54ICUgMiA9PT0gMCkge1xyXG4gICAgICAgIGlmICh0cjEuaXNSb3RhdGVkICYmIHRyMi5tYXRyaXhQb3MueSA9PT0gdHIxLm1hdHJpeFBvcy55IC0gMSkge1xyXG4gICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKCF0cjEuaXNSb3RhdGVkICYmIHRyMi5tYXRyaXhQb3MueSA9PT0gdHIxLm1hdHJpeFBvcy55ICsgMSkge1xyXG4gICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKCF0cjEuaXNSb3RhdGVkICYmIHRyMi5tYXRyaXhQb3MueSA9PT0gdHIxLm1hdHJpeFBvcy55ICsgMSkge1xyXG4gICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRyMS5pc1JvdGF0ZWQgJiYgdHIyLm1hdHJpeFBvcy55ID09PSB0cjEubWF0cml4UG9zLnkgLSAxKSB7XHJcbiAgICAgICAgICByZXN1bHQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgc2NvcmUgb24gc3RhZ2VcclxuICAgKi9cclxuICBjcmVhdGVTY29yZUxhYmxlKCkge1xyXG4gICAgY29uc3QgcmFuZG9tQ29sb3JTZXQgPSB0aGlzLmdhbWUucm5kLnBpY2sodGhpcy5jb2xvclNldHMpO1xyXG4gICAgY29uc3QgY29sb3IgPSAnIzAwRTY3Nic7IC8vICsgUGhhc2VyLkNvbG9yLmNvbXBvbmVudFRvSGV4KHJhbmRvbUNvbG9yU2V0LmdldExhc3RDb2xvcigpKTtcclxuICAgIGNvbnN0IG1hcmdpblJpZ2h0ID0gMTU7XHJcbiAgICBjb25zdCBtYXJnaW5Ub3AgPSAxNTtcclxuXHJcbiAgICBjb25zdCBzdHlsZSA9IHtcclxuICAgICAgZm9udDogJzQycHggT3BlbiBTYW5zJyxcclxuICAgICAgZm9udFN0eWxlOiAnaXRhbGljJyxcclxuICAgICAgZmlsbDogY29sb3JcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNjb3JlTGFibGUgPSBuZXcgRW5naW5lLlNjb3JlTGFibGUoXHJcbiAgICAgIHRoaXMuZ2FtZSxcclxuICAgICAgdGhpcy5nYW1lLndpZHRoIC0gbWFyZ2luUmlnaHQsXHJcbiAgICAgIG1hcmdpblRvcCxcclxuICAgICAgMCxcclxuICAgICAgc3R5bGVcclxuICAgICk7XHJcbiAgICB0aGlzLnNjb3JlTGFibGUuYW5jaG9yLnNldFRvKDEsIDApO1xyXG5cclxuICAgIC8vIFRPRE86IFRFTVBcclxuICAgIHRoaXMuc2NvcmVMYWJsZS5pbnB1dEVuYWJsZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5zY29yZUxhYmxlLmV2ZW50cy5vbklucHV0RG93bi5hZGQodGhpcy50b2dnbGVGdWxsU2NyZWVuLCB0aGlzKTtcclxuICB9XHJcblxyXG4gIGluaXRpYWxpemF0aW9uRnVsbFNjcmVlbigpIHtcclxuICAgIHRoaXMuZ2FtZS5zY2FsZS5mdWxsU2NyZWVuU2NhbGVNb2RlID0gUGhhc2VyLlNjYWxlTWFuYWdlci5SRVNJWkU7XHJcbiAgICB0aGlzLmdhbWUuc2NhbGUub25GdWxsU2NyZWVuQ2hhbmdlXHJcbiAgICAgIC5hZGQodGhpcy5yZXNpemVTY3JlZW4sIHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlRnVsbFNjcmVlbigpIHtcclxuICAgIGlmICh0aGlzLmdhbWUuc2NhbGUuaXNGdWxsU2NyZWVuKSB7XHJcbiAgICAgIHRoaXMuZ2FtZS5zY2FsZS5zdG9wRnVsbFNjcmVlbigpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5nYW1lLnNjYWxlLnN0YXJ0RnVsbFNjcmVlbigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlU2NvcmUodmFsKSB7XHJcbiAgICB2YWwgPSBNYXRoLnJvdW5kKHZhbCk7XHJcblxyXG4gICAgdGhpcy5zY29yZSArPSB2YWw7XHJcbiAgICB0aGlzLnNjb3JlTGFibGUuY2hhbmdlVmFsdWUodGhpcy5zY29yZSk7XHJcbiAgfVxyXG5cclxuICByZXNpemVTY3JlZW4oKSB7XHJcbiAgICB0aGlzLnNjb3JlTGFibGUueCA9IHRoaXMuZ2FtZS53aWR0aCAtIDE1O1xyXG4gICAgdGhpcy5zY29yZUxhYmxlLnkgPSAxNTtcclxuXHJcbiAgICB0aGlzLnVuaXZlcnNlRmlyc3QucmVzaXplKCk7XHJcbiAgICB0aGlzLnVuaXZlcnNlU2Vjb25kLnJlc2l6ZSgpO1xyXG5cclxuICAgIHRoaXMuY2VudGVyaW5nTWF0cml4KCk7XHJcbiAgfVxyXG5cclxuICBjZW50ZXJpbmdNYXRyaXgoKSB7XHJcbiAgICBjb25zdCBoYWxmVHJpYW5nbGVTaXplID0gRW5naW5lLlRyaWFuZ2xlLnNpemUgLyAyO1xyXG5cclxuICAgIHRoaXMudHJpYW5nbGVHcm91cC54ID0gdGhpcy5nYW1lLndpZHRoIC8gMiAtIHRoaXMudHJpYW5nbGVHcm91cC53aWR0aCAvIDIgKyBoYWxmVHJpYW5nbGVTaXplO1xyXG4gICAgdGhpcy50cmlhbmdsZUdyb3VwLnkgPSB0aGlzLmdhbWUuaGVpZ2h0IC8gMiAtIHRoaXMudHJpYW5nbGVHcm91cC5oZWlnaHQgLyAyICsgaGFsZlRyaWFuZ2xlU2l6ZTtcclxuICB9XHJcblxyXG4gIHJlYnVpbGRNYXAoKSB7XHJcbiAgICBjb25zdCB0aW1lRGVsYXkgPSA1MDtcclxuXHJcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMudHJpYW5nbGVNYXRyaXhXaWR0aDsgeCsrKSB7XHJcbiAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy50cmlhbmdsZU1hdHJpeEhlaWdodDsgeSsrKSB7XHJcbiAgICAgICAgbGV0IHRyaWFuZ2xlID0gdGhpcy50cmlhbmdsZXNNYXRyaXhbeF1beV07XHJcbiAgICAgICAgbGV0IHJhbmRvbUNvbG9yU2V0ID0gdGhpcy5nYW1lLnJuZC5waWNrKHRoaXMuY29sb3JTZXRzKTtcclxuXHJcbiAgICAgICAgdHJpYW5nbGUudXBkYXRlQ29sb3IocmFuZG9tQ29sb3JTZXQsIHggKiB0aW1lRGVsYXkgKyB5ICogdGltZURlbGF5KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJvY2Vzc1Bvc2l0aW9uKCkge1xyXG4gICAgaWYgKHRoaXMuZ2V0U29tZUNvbWJpbmF0aW9uKCkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIGNvbnN0IGRlbGF5RGVzdHJveSA9IDUwMDA7XHJcbiAgICAgIGxldCB0aW1lciA9IHRoaXMuZ2FtZS50aW1lLmNyZWF0ZSgpO1xyXG5cclxuICAgICAgdGltZXIuYWRkKGRlbGF5RGVzdHJveSwgdGhpcy5yZWJ1aWxkTWFwLCB0aGlzKTtcclxuICAgICAgdGltZXIuc3RhcnQoMCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRIaW50VHJpYW5nbGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5nYW1lLnJuZC5waWNrKHRoaXMuZ2V0U29tZUNvbWJpbmF0aW9uKCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGV4aXN0aW5nIGNvbWJpbmF0aW9uLCBpZiB3ZSBoYXZlbid0IGV4aXN0IG1vdmUsIHRoZW4gcmV0dXJuIGVtcHR5IGFycmF5XHJcbiAgICovXHJcbiAgZ2V0U29tZUNvbWJpbmF0aW9uKCkge1xyXG4gICAgbGV0IHVzZWRDZWxsID0gW107XHJcbiAgICBsZXQgdHJpYW5nbGVzID0gW107XHJcblxyXG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLnRyaWFuZ2xlTWF0cml4V2lkdGg7IHgrKykge1xyXG4gICAgICB1c2VkQ2VsbFt4XSA9IFtdO1xyXG4gICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMudHJpYW5nbGVNYXRyaXhIZWlnaHQ7IHkrKykge1xyXG4gICAgICAgIHVzZWRDZWxsW3hdW3ldID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMudHJpYW5nbGVNYXRyaXhXaWR0aDsgeCsrKSB7XHJcbiAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy50cmlhbmdsZU1hdHJpeEhlaWdodDsgeSsrKSB7XHJcbiAgICAgICAgaWYgKCF1c2VkQ2VsbFt4XVt5XSAmJiB0aGlzLmhhc0NvbWJpbmF0aW9uKHVzZWRDZWxsLCB0aGlzLnRyaWFuZ2xlc01hdHJpeFt4XVt5XS5jb2xvclNldCwgeCwgeSwgMSkpIHtcclxuICAgICAgICAgIHRyaWFuZ2xlcy5wdXNoKHRoaXMudHJpYW5nbGVzTWF0cml4W3hdW3ldKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJpYW5nbGVzO1xyXG4gIH1cclxuXHJcbiAgaGFzQ29tYmluYXRpb24odXNlZENlbGwsIGNvbG9yU2V0LCB4LCB5LCBjbnQpIHtcclxuICAgIGlmIChjb2xvclNldCAhPT0gdGhpcy50cmlhbmdsZXNNYXRyaXhbeF1beV0uY29sb3JTZXQgfHwgdXNlZENlbGxbeF1beV0pIHtcclxuICAgICAgcmV0dXJuIChjbnQgPiB0aGlzLm1pblRyaWFuZ2xlc0Rlc3Ryb3kpO1xyXG4gICAgfVxyXG5cclxuICAgIHVzZWRDZWxsW3hdW3ldID0gdHJ1ZTtcclxuICAgIGlmICh4ICsgMSA8IHRoaXMudHJpYW5nbGVNYXRyaXhXaWR0aCkge1xyXG4gICAgICBpZiAodGhpcy5oYXNDb21iaW5hdGlvbih1c2VkQ2VsbCwgY29sb3JTZXQsIHggKyAxLCB5LCBjbnQgKyAxKSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHggLSAxID49IDApIHtcclxuICAgICAgaWYgKHRoaXMuaGFzQ29tYmluYXRpb24odXNlZENlbGwsIGNvbG9yU2V0LCB4IC0gMSwgeSwgY250ICsgMSkpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnRyaWFuZ2xlc01hdHJpeFt4XVt5XS5pc1JvdGF0ZWQpIHtcclxuICAgICAgaWYgKHkgLSAxID49IDApIHtcclxuICAgICAgICBpZiAodGhpcy5oYXNDb21iaW5hdGlvbih1c2VkQ2VsbCwgY29sb3JTZXQsIHgsIHkgLSAxLCBjbnQgKyAxKSkge1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoeSArIDEgPCB0aGlzLnRyaWFuZ2xlTWF0cml4SGVpZ2h0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzQ29tYmluYXRpb24odXNlZENlbGwsIGNvbG9yU2V0LCB4LCB5ICsgMSwgY250ICsgMSkpIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHNoYWtlSXRTaGFrZUl0KCkge1xyXG4gICAgbGV0IHggPSB0aGlzLnRyaWFuZ2xlR3JvdXAueDtcclxuICAgIGxldCB5ID0gdGhpcy50cmlhbmdsZUdyb3VwLnk7XHJcbiAgICBsZXQgYW1wbGl0dWRlWSA9IDAuNzU7XHJcbiAgICBsZXQgYW1wbGl0dWRlWCA9IDI7XHJcbiAgICBsZXQgdGltZUFuaW1hdGlvbiA9IDIwO1xyXG5cclxuICAgIHRoaXMuYWRkLnR3ZWVuKHRoaXMudHJpYW5nbGVHcm91cClcclxuICAgICAgLnRvKHtcclxuICAgICAgICB4OiB4ICsgYW1wbGl0dWRlWCwgeTogeSArIGFtcGxpdHVkZVlcclxuICAgICAgfSwgdGltZUFuaW1hdGlvbiwgUGhhc2VyLkVhc2luZy5MaW5lYXIuTm9uZSlcclxuICAgICAgLnRvKHtcclxuICAgICAgICB4OiB4IC0gYW1wbGl0dWRlWCwgeTogeSAtIGFtcGxpdHVkZVlcclxuICAgICAgfSwgdGltZUFuaW1hdGlvbiwgUGhhc2VyLkVhc2luZy5MaW5lYXIuTm9uZSlcclxuICAgICAgLnRvKHtcclxuICAgICAgICB4LCB5XHJcbiAgICAgIH0sIHRpbWVBbmltYXRpb24sIFBoYXNlci5FYXNpbmcuTGluZWFyLk5vbmUpXHJcbiAgICAgIC5zdGFydCgpO1xyXG5cclxuICB9XHJcblxyXG4gIHNuYWtlc0FuaW1hdGlvblJ1bih4LCB5LCBjb2xvckdyYWRhdGlvbiwgY291bnQpIHtcclxuICAgIGNvbnN0IGZvcmNlID0gMjU7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICAgIGxldCBzbmFrZSA9IHRoaXMuc25ha2VzLmdldEZpcnN0RGVhZCgpO1xyXG5cclxuICAgICAgbGV0IGFuZ2xlID0gKE1hdGguUEkgKiAyKSAvIGNvdW50ICogaTtcclxuICAgICAgbGV0IGltcHVsc2VYID0gTWF0aC5jb3MoYW5nbGUpICogZm9yY2U7XHJcbiAgICAgIGxldCBpbXB1bHNlWSA9IE1hdGguc2luKGFuZ2xlKSAqIGZvcmNlO1xyXG4gICAgICBzbmFrZS5ydW4oeCxcclxuICAgICAgICB5LFxyXG4gICAgICAgIHRoaXMuc2NvcmVMYWJsZS53b3JsZC54LFxyXG4gICAgICAgIHRoaXMuc2NvcmVMYWJsZS53b3JsZC55LFxyXG4gICAgICAgIGltcHVsc2VYLFxyXG4gICAgICAgIGltcHVsc2VZLFxyXG4gICAgICAgIGNvbG9yR3JhZGF0aW9uLmdldFJhbmRvbUNvbG9yKClcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbkVuZ2luZS5HYW1lID0gR2FtZTtcclxuIixudWxsLCJjbGFzcyBMb2cge1xyXG4gIHN0YXRpYyBpbml0KCkge1xyXG4gICAgdGhpcy5zdGFydFRpbWUgPSBuZXcgRGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHdyaXRlKHBhcnQsIG1zZykge1xyXG4gICAgbGV0IHRpbWUgPSAobmV3IERhdGUoKSAtIHRoaXMuc3RhcnRUaW1lKSAvIDEwMDA7XHJcbiAgICBjb25zb2xlLmxvZyhgWyR7dGltZX0gc2VjXSBbJHtwYXJ0fV0gJHttc2d9YCk7XHJcbiAgfVxyXG59XHJcblxyXG5FbmdpbmUuTG9nID0gTG9nO1xyXG4iLCJMb2cuaW5pdCgpO1xyXG5cclxuTG9nLndyaXRlKCdhcHAnLCAnSW5pdCBnYW1lJyk7XHJcblxyXG5FbmdpbmUuZ2FtZSA9IG5ldyBQaGFzZXIuR2FtZShFbmdpbmUubWF4V2lkdGgsIEVuZ2luZS5tYXhIZWlnaHQsIFBoYXNlci5BVVRPKTtcclxuXHJcbkxvZy53cml0ZSgnYXBwJywgJ0ZpbmlzaCBjcmVhdGUgZ2FtZScpO1xyXG5cclxuRW5naW5lLmdhbWUuc3RhdGUuYWRkKCdCb290JywgRW5naW5lLkJvb3QpO1xyXG5FbmdpbmUuZ2FtZS5zdGF0ZS5hZGQoJ0xvYWRlcicsIEVuZ2luZS5Mb2FkZXIpO1xyXG4vLyBFbmdpbmUuZ2FtZS5zdGF0ZS5hZGQoJ01lbnUnLCBFbmdpbmUuTWVudSk7XHJcbkVuZ2luZS5nYW1lLnN0YXRlLmFkZCgnR2FtZScsIEVuZ2luZS5HYW1lKTtcclxuLy8gRW5naW5lLmdhbWUuc3RhdGUuYWRkKCdTY29yZUJvYXJkJywgRW5naW5lLlNjb3JlQm9hcmQpO1xyXG5cclxuTG9nLndyaXRlKCdhcHAnLCAnRmluaXNoIGFkZGluZyBzdGF0ZScpO1xyXG5cclxuRW5naW5lLmdhbWUuc3RhdGUuc3RhcnQoJ0Jvb3QnKTtcclxuXHJcbkxvZy53cml0ZSgnYXBwJywgJ1J1biBib290Jyk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
