'use strict';

var Engine = {
  minWidth: 640,
  minHeight: 320,
  maxWidth: 1366,
  maxHeight: 768
};

/**
 * Sprite, Bitmap, etc... chache keys
 * @type {Object}
 */
Engine.keys = {
  triangle: 'triangle',
  meteor: 'meteor'
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
    value: function preload() {}
  }, {
    key: 'create',
    value: function create() {
      this.game.stage.disableVisibilityChange = true;
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
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

      this.game.cache.addBitmapData(Engine.keys.triangle, Engine.Triangle.generateSprite(this.game));
      this.game.cache.addBitmapData(Engine.keys.meteor, Engine.Meteor.generateSprite(this.game));
    }
  }, {
    key: 'create',
    value: function create() {
      var numberOfGradation = 3;
      this.state.start('Game', true, false, numberOfGradation);
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

    var _this = _possibleConstructorReturn(this, (Meteor.__proto__ || Object.getPrototypeOf(Meteor)).call(this, game, x, y, game.cache.getBitmapData(Engine.keys.meteor)));

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

    var _this = _possibleConstructorReturn(this, (Triangle.__proto__ || Object.getPrototypeOf(Triangle)).call(this, game, x, y, Engine.game.cache.getBitmapData(Engine.keys.triangle)));

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

      if (this.game.input.activePointer.isDown) {
        this.game.add.tween(this).to({
          width: 0,
          height: 0,
          alpha: 0
        }, Triangle.animationTimeDelete).start().onComplete.add(function () {
          _this2.events.deleteComplete.dispatch(_this2);
        }, this);
      }
    }
  }, {
    key: 'recover',
    value: function recover(colorSet) {
      this.colorSet = colorSet;
      this.tint = this.colorSet.getRandomColor();
      this.width = Triangle.size;
      this.height = Triangle.size;
      this.selected = false;

      this.game.add.tween(this).to({
        alpha: 1
      }, Triangle.animationTimeRecover, Phaser.Easing.Bounce.Out).start();
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
Triangle.animationTimeDelete = 200;
Triangle.animationTimeRecover = 1000;
Engine.Triangle = Triangle;
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Universe = function (_Phaser$Sprite) {
  _inherits(Universe, _Phaser$Sprite);

  function Universe(game) {
    _classCallCheck(this, Universe);

    var _this = _possibleConstructorReturn(this, (Universe.__proto__ || Object.getPrototypeOf(Universe)).call(this, game, game.width / 2, game.height / 2, new Phaser.BitmapData(game.width, game.height)));

    _this.anchor.setTo(0.5);
    return _this;
  }

  _createClass(Universe, [{
    key: 'create',
    value: function create() {
      var maxSize = 4;

      for (var i = 0; i < 400; i++) {
        var size = this.game.rnd.between(maxSize / 2, maxSize);
        var bitmap = new Phaser.BitmapData(size, size);

        bitmap.ctx.beginPath();
        bitmap.ctx.fillStyle = 'white';
        bitmap.ctx.rect(0, 0, size, size);
        bitmap.ctx.fill();

        var sprite = new Phaser.Sprite(this.game, this.game.rnd.between(-this.game.width, this.game.width), this.game.rnd.between(-this.game.height, this.game.height), bitmap);

        this.addChild(sprite);
      }
    }
  }]);

  return Universe;
}(Phaser.Sprite);

Engine.Universe = Universe;
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

      this.sketch();
      this.initEvents();
      this.createScoreLable();
      this.initializationFullScreen();
      this.createHintTimer();

      this.createMeteor();

      this.forcePortrait = true;

      this.game.time.advancedTiming = true;
    }
  }, {
    key: 'render',
    value: function render() {
      // this.game.debug.geom(new Phaser.Line(this.game.world.centerX, 0, this.game.world.centerX, this.game.height), 'rgba(255, 255, 255, 0.2)');
      // this.game.debug.geom(new Phaser.Line(0, this.game.world.centerY, this.game.width, this.game.world.centerY), 'rgba(255, 255, 255, 0.2)');
      // this.game.debug.inputInfo(50, 50, 'rgb(255, 255, 255)');
      // this.game.debug.geom(this.triangleGroup.getBounds(), 'rgba(37, 43, 189, 0.5)');
      this.universe.rotation += Math.PI / 1800 / 30 * 2.5;
      this.game.debug.text(this.game.time.fps, 50, 50, 'white');
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
      this.universe = new Engine.Universe(this.game);

      this.universe.create();

      this.game.add.existing(this.universe);
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

          triangle.events.onInputOver.add(this.selectTriangle, this);
          triangle.events.onInputDown.add(this.selectTriangle, this);
          triangle.events.deleteComplete.add(this.recoverTriangle, this);

          this.trianglesMatrix[x][y] = triangle;
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
      var isUnselect = this.selectedTriangles.length < this.minTrianglesDestroy;

      if (!isUnselect) {
        this.updateScore(Math.pow(this.selectedTriangles.length, 2.15) * 10);
        this.hintTimer.stop(false);
        this.hintTimer.start();
      }

      while (this.selectedTriangles.length > 0) {
        var triangle = this.selectedTriangles.pop();
        if (isUnselect) {
          triangle.unselect();
        } else {
          triangle.delete();
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
        this.selectedTriangles.push(triangle);
      } else {
        var lastSelectedTriangle = this.selectedTriangles[this.selectedTriangles.length - 1];
        var preLastSelectedTriangle = this.selectedTriangles[this.selectedTriangles.length - 2];

        if (triangle.selected && triangle === preLastSelectedTriangle) {
          lastSelectedTriangle.unselect();
          this.selectedTriangles.pop();
        } else if (!triangle.selected && this.canTriangleLink(lastSelectedTriangle, triangle) && lastSelectedTriangle.colorSet === triangle.colorSet) {
          triangle.select();
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
      if (tr1.matrixPos.y === tr2.matrixPos.y) {
        if (tr1.matrixPos.x + 1 === tr2.matrixPos.x || tr1.matrixPos.x - 1 === tr2.matrixPos.x) {
          return true;
        }
      } else if (tr1.matrixPos.x === tr2.matrixPos.x) {
        if (tr1.matrixPos.x % 2 === 0) {
          if (tr1.isRotated && tr2.matrixPos.y === tr1.matrixPos.y - 1) {
            return true;
          } else if (!tr1.isRotated && tr2.matrixPos.y === tr1.matrixPos.y + 1) {
            return true;
          }
        } else {
          if (!tr1.isRotated && tr2.matrixPos.y === tr1.matrixPos.y + 1) {
            return true;
          } else if (tr1.isRotated && tr2.matrixPos.y === tr1.matrixPos.y - 1) {
            return true;
          }
        }
      }

      return false;
    }

    /**
     * Add score on stage
     */

  }, {
    key: 'createScoreLable',
    value: function createScoreLable() {
      var randomColorSet = this.game.rnd.pick(this.colorSets);
      var color = '#fff'; // + Phaser.Color.componentToHex(randomColorSet.getLastColor());
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

      this.universe.x = this.game.width / 2;
      this.universe.y = this.game.height / 2;

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
      if (!this.getSomeCombination().length) {
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
  }]);

  return Game;
}(Phaser.State);

Engine.Game = Game;
"use strict";
'use strict';

Engine.game = new Phaser.Game(Engine.maxWidth, Engine.maxHeight, Phaser.AUTO);

Engine.game.state.add('Boot', Engine.Boot);
Engine.game.state.add('Loader', Engine.Loader);
// Engine.game.state.add('Menu', Engine.Menu);
Engine.game.state.add('Game', Engine.Game);
// Engine.game.state.add('ScoreBoard', Engine.ScoreBoard);

Engine.game.state.start('Boot');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS5qcyIsImJvb3QuanMiLCJsb2FkZXIuanMiLCJtZW51LmpzIiwiY29sb3JzZXQuanMiLCJtZXRlb3IuanMiLCJzY29yZWxhYmxlLmpzIiwidHJpYW5nbGUuanMiLCJ1bml2ZXJzZS5qcyIsImdhbWUuanMiLCJzY29yZWJvYXJkLmpzIiwiYXBwLmpzIl0sIm5hbWVzIjpbIkVuZ2luZSIsIm1pbldpZHRoIiwibWluSGVpZ2h0IiwibWF4V2lkdGgiLCJtYXhIZWlnaHQiLCJrZXlzIiwidHJpYW5nbGUiLCJtZXRlb3IiLCJCb290IiwiZ2FtZSIsInN0YWdlIiwiZGlzYWJsZVZpc2liaWxpdHlDaGFuZ2UiLCJzY2FsZSIsInBhZ2VBbGlnbkhvcml6b250YWxseSIsInBhZ2VBbGlnblZlcnRpY2FsbHkiLCJzdGF0ZSIsInN0YXJ0IiwiUGhhc2VyIiwiU3RhdGUiLCJMb2FkZXIiLCJiYWNrZ3JvdW5kQ29sb3IiLCJhZGRQcm9ncmVzc0xhYmxlIiwibG9hZCIsIm9uRmlsZUNvbXBsZXRlIiwiYWRkIiwicmVmcmVzaFByb2dyZXNzIiwiY2FjaGUiLCJhZGRCaXRtYXBEYXRhIiwiVHJpYW5nbGUiLCJnZW5lcmF0ZVNwcml0ZSIsIk1ldGVvciIsIm51bWJlck9mR3JhZGF0aW9uIiwic3R5bGUiLCJmb250IiwiZmlsbCIsInByb2dyZXNzTGFibGUiLCJ0ZXh0Iiwid29ybGQiLCJjZW50ZXJYIiwiY2VudGVyWSIsImFuY2hvciIsInNldFRvIiwicHJvZ3Jlc3MiLCJjYWNoZUtleSIsInN1Y2Nlc3MiLCJ0b3RhbExvYWRlZCIsInRvdGFsRmlsZXMiLCJDb2xvclNldCIsImdyYWRpdGlvbiIsInJuZCIsInBpY2siLCJudW1iZXIiLCJsZW5ndGgiLCJHUkFEQVRJT05TIiwieCIsInkiLCJyb3RhdGlvbiIsInNwZWVkIiwiZ2V0Qml0bWFwRGF0YSIsInJlZnJlc2hSb3RhdGlvbiIsInZlbG9jaXR5WCIsIk1hdGgiLCJjb3MiLCJ2ZWxvY2l0eVkiLCJzaW4iLCJhbGl2ZSIsIndpZHRoIiwiaGVpZ2h0IiwiYml0bWFwIiwiYml0bWFwRGF0YSIsImdyYWRpZW50IiwiY3R4IiwiY3JlYXRlTGluZWFyR3JhZGllbnQiLCJhZGRDb2xvclN0b3AiLCJiZWdpblBhdGgiLCJmaWxsU3R5bGUiLCJyZWN0IiwiU3ByaXRlIiwiU2NvcmVMYWJsZSIsInNjb3JlIiwicm91bmQiLCJleGlzdGluZyIsInR3ZWVucyIsInJlbW92ZSIsInR3ZWVuIiwidG8iLCJhbmltYXRpb25DaGFuZ2VWYWwiLCJvblVwZGF0ZUNhbGxiYWNrIiwib25Db21wbGV0ZSIsIlRleHQiLCJpc1JvdGF0ZWQiLCJjb2xvclNldCIsIm1hdHJpeFBvc2l0aW9uIiwic2l6ZSIsInRpbnQiLCJnZXRSYW5kb21Db2xvciIsIm1hdHJpeFBvcyIsImlucHV0RW5hYmxlZCIsImlucHV0IiwicGl4ZWxQZXJmZWN0T3ZlciIsInBpeGVsUGVyZmVjdENsaWNrIiwiZXZlbnRzIiwiZGVsZXRlQ29tcGxldGUiLCJTaWduYWwiLCJzZWxlY3RlZCIsIlBJIiwiYWRkQ2hpbGQiLCJhbmltYXRpb25UaW1lU2VsZWN0IiwiYWN0aXZlUG9pbnRlciIsImlzRG93biIsImFscGhhIiwiYW5pbWF0aW9uVGltZURlbGV0ZSIsImRpc3BhdGNoIiwiYW5pbWF0aW9uVGltZVJlY292ZXIiLCJFYXNpbmciLCJCb3VuY2UiLCJPdXQiLCJkZWxheSIsImFuaW1hdGlvblRpbWUiLCJoaWRlVHdlZW4iLCJzaG93VHdlZW4iLCJjaGFpbiIsImxhc3RDb2xvciIsImJsaW5rcyIsIm9uU3RhcnQiLCJwdXNoIiwibGFzdEJsaW5rIiwibW92ZVRvIiwibGluZVRvIiwiVW5pdmVyc2UiLCJCaXRtYXBEYXRhIiwibWF4U2l6ZSIsImkiLCJiZXR3ZWVuIiwic3ByaXRlIiwiR2FtZSIsIndpbmRvdyIsImdnIiwiY29sb3JTZXRzIiwibWFyZ2luVG9wIiwibWFyZ2luTGVmdCIsIm1pblRyaWFuZ2xlc0Rlc3Ryb3kiLCJ0cmlhbmdsZXNNYXRyaXgiLCJzZWxlY3RlZFRyaWFuZ2xlcyIsInRyaWFuZ2xlTWF0cml4V2lkdGgiLCJ0cmlhbmdsZU1hdHJpeEhlaWdodCIsImNyZWF0ZVVuaXZlcnNlIiwiY3JlYXRlR3JhZGF0aW9ucyIsInRyaWFuZ2xlR3JvdXAiLCJncm91cCIsInNrZXRjaCIsImluaXRFdmVudHMiLCJjcmVhdGVTY29yZUxhYmxlIiwiaW5pdGlhbGl6YXRpb25GdWxsU2NyZWVuIiwiY3JlYXRlSGludFRpbWVyIiwiY3JlYXRlTWV0ZW9yIiwiZm9yY2VQb3J0cmFpdCIsInRpbWUiLCJhZHZhbmNlZFRpbWluZyIsInVuaXZlcnNlIiwiZGVidWciLCJmcHMiLCJhbGxHcmFkYXRpb24iLCJBcnJheVV0aWxzIiwic2h1ZmZsZSIsImNyZWF0ZSIsImhpbnRUaW1lb3V0IiwiaGludFRpbWVyIiwibG9vcCIsInZpc3VhbGlzYXRpb25IaW50IiwibWV0ZW9yVGltZXJEZWxheSIsInNlbmRUb0JhY2siLCJvdXRPZkNhbWVyYUJvdW5kc0tpbGwiLCJraWxsIiwibWV0ZW9yVGltZXIiLCJydW5NZXRlb3IiLCJtYXJnaW5YIiwibWFyZ2luWSIsIm1hcmdpblJvdGF0aW9uIiwic2lkZSIsInJlYWxJblJhbmdlIiwicmVzZXQiLCJnZXRIaW50VHJpYW5nbGUiLCJ1bmRlZmluZWQiLCJoaW50TWUiLCJvblVwIiwiZGVzdHJveVRyaWFuZ2xlIiwicG9zWCIsInBvc1kiLCJvbklucHV0T3ZlciIsInNlbGVjdFRyaWFuZ2xlIiwib25JbnB1dERvd24iLCJyZWNvdmVyVHJpYW5nbGUiLCJjZW50ZXJpbmdNYXRyaXgiLCJpc1Vuc2VsZWN0IiwidXBkYXRlU2NvcmUiLCJwb3ciLCJzdG9wIiwicG9wIiwidW5zZWxlY3QiLCJkZWxldGUiLCJ0aW1lckV4aXN0TW92ZSIsInByb2Nlc3NQb3NpdGlvbiIsInJlY292ZXIiLCJwb2ludCIsInNlbGVjdCIsImxhc3RTZWxlY3RlZFRyaWFuZ2xlIiwicHJlTGFzdFNlbGVjdGVkVHJpYW5nbGUiLCJjYW5UcmlhbmdsZUxpbmsiLCJ0cjEiLCJ0cjIiLCJyYW5kb21Db2xvclNldCIsImNvbG9yIiwibWFyZ2luUmlnaHQiLCJmb250U3R5bGUiLCJzY29yZUxhYmxlIiwidG9nZ2xlRnVsbFNjcmVlbiIsImZ1bGxTY3JlZW5TY2FsZU1vZGUiLCJTY2FsZU1hbmFnZXIiLCJSRVNJWkUiLCJvbkZ1bGxTY3JlZW5DaGFuZ2UiLCJyZXNpemVTY3JlZW4iLCJpc0Z1bGxTY3JlZW4iLCJzdG9wRnVsbFNjcmVlbiIsInN0YXJ0RnVsbFNjcmVlbiIsInZhbCIsImNoYW5nZVZhbHVlIiwiaGFsZlRyaWFuZ2xlU2l6ZSIsInRpbWVEZWxheSIsInVwZGF0ZUNvbG9yIiwiZ2V0U29tZUNvbWJpbmF0aW9uIiwiZGVsYXlEZXN0cm95IiwidGltZXIiLCJyZWJ1aWxkTWFwIiwidXNlZENlbGwiLCJ0cmlhbmdsZXMiLCJoYXNDb21iaW5hdGlvbiIsImNudCIsIkFVVE8iXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsU0FBUztBQUNYQyxZQUFVLEdBREM7QUFFWEMsYUFBVyxHQUZBO0FBR1hDLFlBQVUsSUFIQztBQUlYQyxhQUFXO0FBSkEsQ0FBYjs7QUFPQTs7OztBQUlBSixPQUFPSyxJQUFQLEdBQWM7QUFDWkMsWUFBVSxVQURFO0FBRVpDLFVBQVE7QUFGSSxDQUFkOzs7Ozs7Ozs7OztJQ1hNQzs7O0FBQ0osa0JBQWM7QUFBQTs7QUFBQTtBQUViOzs7OzhCQUVTLENBRVQ7Ozs2QkFFUTtBQUNQLFdBQUtDLElBQUwsQ0FBVUMsS0FBVixDQUFnQkMsdUJBQWhCLEdBQTBDLElBQTFDO0FBQ0EsV0FBS0MsS0FBTCxDQUFXQyxxQkFBWCxHQUFtQyxJQUFuQztBQUNBLFdBQUtELEtBQUwsQ0FBV0UsbUJBQVgsR0FBaUMsSUFBakM7QUFDQSxXQUFLQyxLQUFMLENBQVdDLEtBQVgsQ0FBaUIsUUFBakI7QUFDRDs7OztFQWRnQkMsT0FBT0M7O0FBaUIxQmxCLE9BQU9RLElBQVAsR0FBY0EsSUFBZDs7Ozs7Ozs7Ozs7SUNqQk1XOzs7QUFDSixvQkFBYztBQUFBOztBQUFBO0FBRWI7Ozs7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NDAsXHJcbiAgbWluSGVpZ2h0OiAzMjAsXHJcbiAgbWF4V2lkdGg6IDEzNjYsXHJcbiAgbWF4SGVpZ2h0OiA3NjgsXHJcbn07XHJcblxyXG4vKipcclxuICogU3ByaXRlLCBCaXRtYXAsIGV0Yy4uLiBjaGFjaGUga2V5c1xyXG4gKiBAdHlwZSB7T2JqZWN0fVxyXG4gKi9cclxuRW5naW5lLmtleXMgPSB7XHJcbiAgdHJpYW5nbGU6ICd0cmlhbmdsZScsXHJcbiAgbWV0ZW9yOiAnbWV0ZW9yJ1xyXG59XHJcbiIsImNsYXNzIEJvb3QgZXh0ZW5kcyBQaGFzZXIuU3RhdGUge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIHByZWxvYWQoKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgY3JlYXRlKCkge1xyXG4gICAgdGhpcy5nYW1lLnN0YWdlLmRpc2FibGVWaXNpYmlsaXR5Q2hhbmdlID0gdHJ1ZTtcclxuICAgIHRoaXMuc2NhbGUucGFnZUFsaWduSG9yaXpvbnRhbGx5ID0gdHJ1ZTtcclxuICAgIHRoaXMuc2NhbGUucGFnZUFsaWduVmVydGljYWxseSA9IHRydWU7XHJcbiAgICB0aGlzLnN0YXRlLnN0YXJ0KCdMb2FkZXInKTtcclxuICB9XHJcbn1cclxuXHJcbkVuZ2luZS5Cb290ID0gQm9vdDtcclxuIiwiY2xhc3MgTG9hZGVyIGV4dGVuZHMgUGhhc2VyLlN0YXRlIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICBwcmVsb2FkKCkge1xyXG4gICAgdGhpcy5nYW1lLnN0YWdlLmJhY2tncm91bmRDb2xvciA9ICcjMDAwJztcclxuICAgIHRoaXMuYWRkUHJvZ3Jlc3NMYWJsZSgpO1xyXG5cclxuICAgIHRoaXMubG9hZC5vbkZpbGVDb21wbGV0ZS5hZGQodGhpcy5yZWZyZXNoUHJvZ3Jlc3MsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMuZ2FtZS5jYWNoZS5hZGRCaXRtYXBEYXRhKEVuZ2luZS5rZXlzLnRyaWFuZ2xlLCBFbmdpbmUuVHJpYW5nbGUuZ2VuZXJhdGVTcHJpdGUodGhpcy5nYW1lKSk7XHJcbiAgICB0aGlzLmdhbWUuY2FjaGUuYWRkQml0bWFwRGF0YShFbmdpbmUua2V5cy5tZXRlb3IsIEVuZ2luZS5NZXRlb3IuZ2VuZXJhdGVTcHJpdGUodGhpcy5nYW1lKSk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGUoKSB7XHJcbiAgICBsZXQgbnVtYmVyT2ZHcmFkYXRpb24gPSAzO1xyXG4gICAgdGhpcy5zdGF0ZS5zdGFydCgnR2FtZScsIHRydWUsIGZhbHNlLCBudW1iZXJPZkdyYWRhdGlvbik7XHJcbiAgfVxyXG5cclxuICBhZGRQcm9ncmVzc0xhYmxlKCkge1xyXG4gICAgbGV0IHN0eWxlID0ge1xyXG4gICAgICBmb250OiAnNDFweCBPcGVuIFNhbnMnLFxyXG4gICAgICBmaWxsOiAnIzAwRTY3NidcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnByb2dyZXNzTGFibGUgPSB0aGlzLmFkZC50ZXh0KHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYLCB0aGlzLmdhbWUud29ybGQuY2VudGVyWSwgJ0xvYWRpbmc6IDAlICgwLzApJywgc3R5bGUpO1xyXG4gICAgdGhpcy5wcm9ncmVzc0xhYmxlLmFuY2hvci5zZXRUbygwLjUpO1xyXG4gIH1cclxuXHJcbiAgcmVmcmVzaFByb2dyZXNzKHByb2dyZXNzLCBjYWNoZUtleSwgc3VjY2VzcywgdG90YWxMb2FkZWQsIHRvdGFsRmlsZXMpIHtcclxuICAgIHRoaXMucHJvZ3Jlc3NMYWJsZS50ZXh0ID0gYExvYWRpbmcgJHtwcm9ncmVzc30lICgke3RvdGFsTG9hZGVkfS8ke3RvdGFsRmlsZXN9KWA7XHJcbiAgfVxyXG59XHJcblxyXG5FbmdpbmUuTG9hZGVyID0gTG9hZGVyO1xyXG4iLG51bGwsImNsYXNzIENvbG9yU2V0IHtcclxuICAvKipcclxuICAgKiBDb2xvciBTZXRcclxuICAgKiBAcGFyYW0gIHtBcnJheX0gZ3JhZGl0aW9uIEFycmF5IG9mIGNvbG9yc1xyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGdyYWRpdGlvbikge1xyXG4gICAgdGhpcy5ncmFkaXRpb24gPSBncmFkaXRpb247XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgcmFuZG9tIGNvbG9yIGZyb20gc2V0XHJcbiAgICogQHJldHVybiB7W3R5cGVdfSBbZGVzY3JpcHRpb25dXHJcbiAgICovXHJcbiAgZ2V0UmFuZG9tQ29sb3IoKSB7XHJcbiAgICByZXR1cm4gRW5naW5lLmdhbWUucm5kLnBpY2sodGhpcy5ncmFkaXRpb24pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGNvbG9yIGJ5IG51bWJlclxyXG4gICAqL1xyXG4gIGdldEJ5TnVtYmVyKG51bWJlcikge1xyXG4gICAgcmV0dXJuIHRoaXMuZ3JhZGl0aW9uW251bWJlcl07XHJcbiAgfVxyXG5cclxuICBnZXRMYXN0Q29sb3IoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5ncmFkaXRpb25bdGhpcy5ncmFkaXRpb24ubGVuZ3RoIC0gMV07XHJcbiAgfVxyXG59XHJcblxyXG5Db2xvclNldC5HUkFEQVRJT05TID0gW1xyXG4gIC8vIGluZGlnb1xyXG4gIFtcclxuICAgIDB4M0Y1MUI1LFxyXG4gICAgMHgzOTQ5QUIsXHJcbiAgICAweDMwM0Y5RixcclxuICAgIDB4MjgzNTkzLFxyXG4gIF0sXHJcbiAgLy8gYmx1ZVxyXG4gIFtcclxuICAgIDB4MjE5NkYzLFxyXG4gICAgMHgxRTg4RTUsXHJcbiAgICAweDE5NzZEMixcclxuICAgIDB4MTU2NUMwLFxyXG4gIF0sXHJcbiAgLy8geWVsbG93XHJcbiAgW1xyXG4gICAgMHhGRkYxNzYsXHJcbiAgICAweEZGRUU1OCxcclxuICAgIDB4RkZFQjNCLFxyXG4gICAgMHhGREQ4MzUsXHJcbiAgXSxcclxuICAvLyBwaW5rXHJcbiAgW1xyXG4gICAgMHhFOTFFNjMsXHJcbiAgICAweEQ4MUI2MCxcclxuICAgIDB4QzIxODVCLFxyXG4gICAgMHhBRDE0NTcsXHJcbiAgXSxcclxuICAvLyBicm93blxyXG4gIFtcclxuICAgIDB4Nzk1NTQ4LFxyXG4gICAgMHg2RDRDNDEsXHJcbiAgICAweDVENDAzNyxcclxuICAgIDB4NEUzNDJFLFxyXG4gIF0sXHJcbiAgLy8gLy8gZGVlcG9yYW5nZVxyXG4gIC8vIFtcclxuICAvLyAgIDB4RkY1NzIyLFxyXG4gIC8vICAgMHhGNDUxMUUsXHJcbiAgLy8gICAweEU2NEExOSxcclxuICAvLyAgIDB4RDg0MzE1LFxyXG4gIC8vIF0sXHJcbiAgLy8gZ3JleVxyXG4gIFtcclxuICAgIDB4OUU5RTlFLFxyXG4gICAgMHg3NTc1NzUsXHJcbiAgICAweDYxNjE2MSxcclxuICAgIDB4NDI0MjQyLFxyXG4gIF0sXHJcbiAgLy8gLy8gcmVkXHJcbiAgLy8gW1xyXG4gIC8vICAgMHhGNDQzMzYsXHJcbiAgLy8gICAweEU1MzkzNSxcclxuICAvLyAgIDB4RDMyRjJGLFxyXG4gIC8vICAgMHhDNjI4MjgsXHJcbiAgLy8gXSxcclxuXTtcclxuXHJcbkVuZ2luZS5Db2xvclNldCA9IENvbG9yU2V0O1xyXG4iLCJjbGFzcyBNZXRlb3IgZXh0ZW5kcyBQaGFzZXIuU3ByaXRlIHtcclxuICBjb25zdHJ1Y3RvcihnYW1lLCB4ID0gMCwgeSA9IDAsIHJvdGF0aW9uID0gMCwgc3BlZWQgPSAxMDApIHtcclxuICAgIHN1cGVyKGdhbWUsIHgsIHksIGdhbWUuY2FjaGUuZ2V0Qml0bWFwRGF0YShFbmdpbmUua2V5cy5tZXRlb3IpKTtcclxuXHJcbiAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XHJcbiAgICB0aGlzLmFuY2hvci5zZXRUbygxKTtcclxuICAgIHRoaXMucmVmcmVzaFJvdGF0aW9uKHJvdGF0aW9uKTtcclxuICB9XHJcblxyXG4gIHJlc2V0KHgsIHksIHJvdGF0aW9uKSB7XHJcbiAgICB0aGlzLnJlZnJlc2hSb3RhdGlvbihyb3RhdGlvbik7XHJcblxyXG4gICAgc3VwZXIucmVzZXQoeCwgeSk7XHJcbiAgfVxyXG5cclxuICByZWZyZXNoUm90YXRpb24ocm90YXRpb24pIHtcclxuICAgIHRoaXMucm90YXRpb24gPSByb3RhdGlvbjtcclxuICAgIHRoaXMudmVsb2NpdHlYID0gTWF0aC5jb3Mocm90YXRpb24pICogdGhpcy5zcGVlZDtcclxuICAgIHRoaXMudmVsb2NpdHlZID0gTWF0aC5zaW4ocm90YXRpb24pICogdGhpcy5zcGVlZDtcclxuICB9XHJcblxyXG4gIHVwZGF0ZSgpIHtcclxuICAgIGlmICh0aGlzLmFsaXZlKSB7XHJcbiAgICAgIHRoaXMueCArPSB0aGlzLnZlbG9jaXR5WDtcclxuICAgICAgdGhpcy55ICs9IHRoaXMudmVsb2NpdHlZO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIG5ldyBtZXRlb3Igc3ByaXRlXHJcbiAgICovXHJcbiAgc3RhdGljIGdlbmVyYXRlU3ByaXRlKGdhbWUpIHtcclxuICAgIGNvbnN0IHdpZHRoID0gMTAyNDtcclxuICAgIGNvbnN0IGhlaWdodCA9IDI7XHJcblxyXG4gICAgbGV0IGJpdG1hcCA9IGdhbWUuYWRkLmJpdG1hcERhdGEod2lkdGgsIGhlaWdodCk7XHJcbiAgICBsZXQgZ3JhZGllbnQgPSBiaXRtYXAuY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KDAsIDAsIHdpZHRoLCAwKTtcclxuXHJcbiAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMS4wLCAncmdiYSgyNTUsIDI1NSwgMjU1LCAxKScpO1xyXG4gICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuOCwgJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC40KScpO1xyXG4gICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuNiwgJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC4zKScpO1xyXG4gICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuNCwgJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKScpO1xyXG4gICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuMiwgJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKScpO1xyXG4gICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuMCwgJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMCknKTtcclxuXHJcbiAgICBiaXRtYXAuY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgYml0bWFwLmN0eC5maWxsU3R5bGUgPSBncmFkaWVudDtcclxuICAgIGJpdG1hcC5jdHgucmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgIGJpdG1hcC5jdHguZmlsbCgpO1xyXG5cclxuICAgIHJldHVybiBiaXRtYXA7XHJcbiAgfVxyXG59XHJcblxyXG5FbmdpbmUuTWV0ZW9yID0gTWV0ZW9yXHJcbiIsImNsYXNzIFNjb3JlTGFibGUgZXh0ZW5kcyBQaGFzZXIuVGV4dCB7XHJcbiAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc2NvcmUsIHN0eWxlKSB7XHJcbiAgICBzdXBlcihnYW1lLCB4LCB5LCBgU2NvcmU6ICR7TWF0aC5yb3VuZChzY29yZSl9YCwgc3R5bGUpO1xyXG5cclxuICAgIHRoaXMuc2NvcmUgPSBzY29yZTtcclxuXHJcbiAgICB0aGlzLmdhbWUuYWRkLmV4aXN0aW5nKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIHNjb3JlIGxhYmxlIHZhbHVlXHJcbiAgICogQHBhcmFtICB7TnVtYmVyfSBzY29yZSBOZXcgc2NvcmVcclxuICAgKi9cclxuICBjaGFuZ2VWYWx1ZShzY29yZSkge1xyXG4gICAgdGhpcy5nYW1lLnR3ZWVucy5yZW1vdmUodGhpcyk7XHJcblxyXG4gICAgbGV0IHR3ZWVuID0gdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzKVxyXG4gICAgICAudG8oe1xyXG4gICAgICAgIHNjb3JlXHJcbiAgICAgIH0sIFNjb3JlTGFibGUuYW5pbWF0aW9uQ2hhbmdlVmFsKVxyXG4gICAgICAub25VcGRhdGVDYWxsYmFjaygoKSA9PiB7XHJcbiAgICAgICAgdGhpcy50ZXh0ID0gYFNjb3JlOiAke01hdGgucm91bmQodGhpcy5zY29yZSl9YDtcclxuICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgdHdlZW4ub25Db21wbGV0ZVxyXG4gICAgICAuYWRkKCgpID0+IHtcclxuICAgICAgICB0aGlzLnRleHQgPSBgU2NvcmU6ICR7TWF0aC5yb3VuZCh0aGlzLnNjb3JlKX1gO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB0d2Vlbi5zdGFydCgpO1xyXG4gIH1cclxufVxyXG5cclxuU2NvcmVMYWJsZS5hbmltYXRpb25DaGFuZ2VWYWwgPSA1MDA7XHJcbkVuZ2luZS5TY29yZUxhYmxlID0gU2NvcmVMYWJsZTtcclxuIiwiY2xhc3MgVHJpYW5nbGUgZXh0ZW5kcyBQaGFzZXIuU3ByaXRlIHtcclxuXHJcbiAgLyoqXHJcbiAgICogSXQncyBhIHRyaWFuZ2xlLCB5YXNoIGl0J3Mgbm90IGEgam9rZVxyXG4gICAqIEBwYXJhbSAge1BoYXNlci5HYW1lfSAgZ2FtZSAgICAgIFtkZXNjcmlwdGlvbl1cclxuICAgKiBAcGFyYW0gIHtbdHlwZV19ICB4ICAgICAgICAgW2Rlc2NyaXB0aW9uXVxyXG4gICAqIEBwYXJhbSAge1t0eXBlXX0gIHkgICAgICAgICBbZGVzY3JpcHRpb25dXHJcbiAgICogQHBhcmFtICB7Qm9vbGVhbn0gaXNSb3RhdGVkIFtkZXNjcmlwdGlvbl1cclxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9ICBjb2xvciAgICAgW2Rlc2NyaXB0aW9uXVxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIGlzUm90YXRlZCwgY29sb3JTZXQsIG1hdHJpeFBvc2l0aW9uKSB7XHJcbiAgICBzdXBlcihnYW1lLCB4LCB5LCBFbmdpbmUuZ2FtZS5jYWNoZS5nZXRCaXRtYXBEYXRhKEVuZ2luZS5rZXlzLnRyaWFuZ2xlKSk7XHJcblxyXG4gICAgdGhpcy53aWR0aCA9IFRyaWFuZ2xlLnNpemU7XHJcbiAgICB0aGlzLmhlaWdodCA9IFRyaWFuZ2xlLnNpemU7XHJcbiAgICB0aGlzLmFuY2hvci5zZXRUbygwLjUpO1xyXG4gICAgdGhpcy5jb2xvclNldCA9IGNvbG9yU2V0O1xyXG4gICAgdGhpcy50aW50ID0gdGhpcy5jb2xvclNldC5nZXRSYW5kb21Db2xvcigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUG9pdGlvbiBpbiB0aGUgbWF0cml4IG9mIHRyaWFuZ2xlc1xyXG4gICAgICogQHR5cGUge1t0eXBlXX1cclxuICAgICAqL1xyXG4gICAgdGhpcy5tYXRyaXhQb3MgPSBtYXRyaXhQb3NpdGlvbjtcclxuXHJcbiAgICB0aGlzLmlucHV0RW5hYmxlZCA9IHRydWU7XHJcbiAgICB0aGlzLmlucHV0LnBpeGVsUGVyZmVjdE92ZXIgPSB0cnVlO1xyXG4gICAgdGhpcy5pbnB1dC5waXhlbFBlcmZlY3RDbGljayA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5ldmVudHMuZGVsZXRlQ29tcGxldGUgPSBuZXcgUGhhc2VyLlNpZ25hbCgpO1xyXG5cclxuICAgIHRoaXMuc2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuaXNSb3RhdGVkID0gaXNSb3RhdGVkO1xyXG5cclxuICAgIGlmIChpc1JvdGF0ZWQpIHtcclxuICAgICAgdGhpcy5yb3RhdGlvbiA9IE1hdGguUEk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdGhpcy5hZGRUZXh0UG9zaXRpb24oKTtcclxuICB9XHJcblxyXG4gIGFkZFRleHRQb3NpdGlvbigpIHtcclxuICAgIGxldCB0ZXh0ID0gbmV3IFBoYXNlci5UZXh0KFxyXG4gICAgICB0aGlzLmdhbWUsXHJcbiAgICAgIFRyaWFuZ2xlLnNpemUgLyAyLFxyXG4gICAgICBUcmlhbmdsZS5zaXplIC8gMixcclxuICAgICAgYCR7dGhpcy5tYXRyaXhQb3MueH06JHt0aGlzLm1hdHJpeFBvcy55fWAsXHJcbiAgICAgIHtcclxuICAgICAgICBmb250OiAnNjRweCBPcGVuIFNhbnMnLFxyXG4gICAgICAgIGZpbGw6ICdibGFjaydcclxuICAgICAgfVxyXG4gICAgKVxyXG5cclxuICAgIGlmICh0aGlzLmlzUm90YXRlZCkge1xyXG4gICAgICB0ZXh0LnJvdGF0aW9uICs9IE1hdGguUEk7XHJcbiAgICAgIHRleHQueSA9ICt0ZXh0LmhlaWdodDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRleHQueCA9IC10ZXh0LndpZHRoIC8gMjtcclxuICAgICAgdGV4dC55ID0gLXRleHQuaGVpZ2h0IC8gNDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmFkZENoaWxkKHRleHQpO1xyXG4gIH1cclxuXHJcbiAgc2VsZWN0KCkge1xyXG4gICAgaWYgKCF0aGlzLnNlbGVjdGVkKSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0cnVlO1xyXG5cclxuICAgICAgdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzKVxyXG4gICAgICAgIC50byh7XHJcbiAgICAgICAgICB3aWR0aDogVHJpYW5nbGUuc2l6ZSAvIDEuNSxcclxuICAgICAgICAgIGhlaWdodDogVHJpYW5nbGUuc2l6ZSAvIDEuNVxyXG4gICAgICAgIH0sIFRyaWFuZ2xlLmFuaW1hdGlvblRpbWVTZWxlY3QpXHJcbiAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICAgIH1cclxuICB9XHJcblxyXG4gIHVuc2VsZWN0KCkge1xyXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWQpIHtcclxuXHJcbiAgICAgIHRoaXMuZ2FtZS50d2VlbnMucmVtb3ZlKHRoaXMpO1xyXG4gICAgICB0aGlzLnNlbGVjdGVkID0gZmFsc2U7XHJcblxyXG4gICAgICB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMpXHJcbiAgICAgICAgLnRvKHtcclxuICAgICAgICAgIHdpZHRoOiBUcmlhbmdsZS5zaXplLFxyXG4gICAgICAgICAgaGVpZ2h0OiBUcmlhbmdsZS5zaXplXHJcbiAgICAgICAgfSwgVHJpYW5nbGUuYW5pbWF0aW9uVGltZVNlbGVjdClcclxuICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgfVxyXG4gIH1cclxuXHJcbiAgZGVsZXRlKCkge1xyXG4gICAgaWYgKHRoaXMuZ2FtZS5pbnB1dC5hY3RpdmVQb2ludGVyLmlzRG93bikge1xyXG4gICAgICB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMpXHJcbiAgICAgICAgLnRvKHtcclxuICAgICAgICAgIHdpZHRoOiAwLFxyXG4gICAgICAgICAgaGVpZ2h0OiAwLFxyXG4gICAgICAgICAgYWxwaGE6IDBcclxuICAgICAgICB9LCBUcmlhbmdsZS5hbmltYXRpb25UaW1lRGVsZXRlKVxyXG4gICAgICAgIC5zdGFydCgpXHJcbiAgICAgICAgLm9uQ29tcGxldGVcclxuICAgICAgICAuYWRkKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuZXZlbnRzLmRlbGV0ZUNvbXBsZXRlLmRpc3BhdGNoKHRoaXMpO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVjb3Zlcihjb2xvclNldCkge1xyXG4gICAgdGhpcy5jb2xvclNldCA9IGNvbG9yU2V0O1xyXG4gICAgdGhpcy50aW50ID0gdGhpcy5jb2xvclNldC5nZXRSYW5kb21Db2xvcigpO1xyXG4gICAgdGhpcy53aWR0aCA9IFRyaWFuZ2xlLnNpemU7XHJcbiAgICB0aGlzLmhlaWdodCA9IFRyaWFuZ2xlLnNpemU7XHJcbiAgICB0aGlzLnNlbGVjdGVkID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzKVxyXG4gICAgICAudG8oe1xyXG4gICAgICAgIGFscGhhOiAxXHJcbiAgICAgIH0sIFRyaWFuZ2xlLmFuaW1hdGlvblRpbWVSZWNvdmVyLCBQaGFzZXIuRWFzaW5nLkJvdW5jZS5PdXQpXHJcbiAgICAgIC5zdGFydCgpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlQ29sb3IoY29sb3JTZXQsIGRlbGF5ID0gMCkge1xyXG4gICAgY29uc3QgYW5pbWF0aW9uVGltZSA9IDEwMDA7XHJcbiAgICB0aGlzLmNvbG9yU2V0ID0gY29sb3JTZXQ7XHJcblxyXG4gICAgbGV0IGhpZGVUd2VlbiA9IHRoaXMuZ2FtZS5hZGQudHdlZW4odGhpcylcclxuICAgICAgLnRvKHtcclxuICAgICAgICBhbHBoYTogMFxyXG4gICAgICB9LCBhbmltYXRpb25UaW1lKTtcclxuXHJcbiAgICBsZXQgc2hvd1R3ZWVuID0gdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzKVxyXG4gICAgICAudG8oe1xyXG4gICAgICAgIGFscGhhOiAxXHJcbiAgICAgIH0sIGFuaW1hdGlvblRpbWUpO1xyXG5cclxuICAgIGhpZGVUd2VlblxyXG4gICAgICAub25Db21wbGV0ZVxyXG4gICAgICAuYWRkKCgpID0+IHtcclxuICAgICAgICB0aGlzLnRpbnQgPSB0aGlzLmNvbG9yU2V0LmdldFJhbmRvbUNvbG9yKCk7XHJcbiAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgIGhpZGVUd2Vlbi5kZWxheShkZWxheSk7XHJcblxyXG4gICAgaGlkZVR3ZWVuLmNoYWluKHNob3dUd2Vlbik7XHJcbiAgICBoaWRlVHdlZW4uc3RhcnQoKTtcclxuICB9XHJcblxyXG4gIGJsaW5rKCkge1xyXG4gICAgY29uc3QgbGFzdENvbG9yID0gdGhpcy50aW50O1xyXG4gICAgbGV0IHR3ZWVuID0gdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzKTtcclxuXHJcbiAgICB0d2Vlbi50byh7XHJcbiAgICAgICAgYWxwaGE6IDJcclxuICAgICAgfSwgMTAwKVxyXG4gICAgICAub25Db21wbGV0ZVxyXG4gICAgICAuYWRkKCgpID0+IHtcclxuICAgICAgICB0aGlzLnRpbnQgPSBsYXN0Q29sb3I7XHJcbiAgICAgICAgVHJpYW5nbGUuYmxpbmtzID0gW107XHJcbiAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgIHR3ZWVuLm9uU3RhcnRcclxuICAgICAgLmFkZCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5hbHBoYSA9IDA7XHJcbiAgICAgICAgdGhpcy50aW50ID0gMHgwMEZGMDA7XHJcbiAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgIGlmIChUcmlhbmdsZS5ibGlua3MubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIFRyaWFuZ2xlLmJsaW5rcy5wdXNoKHR3ZWVuKTtcclxuICAgICAgdHdlZW4uc3RhcnQoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxldCBsYXN0QmxpbmsgPSBUcmlhbmdsZS5ibGlua3NbVHJpYW5nbGUuYmxpbmtzLmxlbmd0aCAtIDFdO1xyXG4gICAgICBsYXN0QmxpbmsuY2hhaW4odHdlZW4pO1xyXG4gICAgICBUcmlhbmdsZS5ibGlua3MucHVzaCh0d2Vlbik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBoaW50TWUoKSB7XHJcbiAgICBsZXQgdHdlZW4gPSB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMpXHJcbiAgICAgIC50byh7XHJcbiAgICAgICAgd2lkdGg6IHRoaXMud2lkdGggKiAwLjc1LFxyXG4gICAgICAgIGhlaWdodDogdGhpcy5oZWlnaHQgKiAwLjc1XHJcbiAgICAgIH0sIDIwMClcclxuICAgICAgLnRvKHtcclxuICAgICAgICByb3RhdGlvbjogdGhpcy5yb3RhdGlvbiArIE1hdGguUEkgLyAzMlxyXG4gICAgICB9LCAxMDApXHJcbiAgICAgIC50byh7XHJcbiAgICAgICAgcm90YXRpb246IHRoaXMucm90YXRpb24gLSBNYXRoLlBJICogMiAvIDMyXHJcbiAgICAgIH0sIDEwMClcclxuICAgICAgLnRvKHtcclxuICAgICAgICByb3RhdGlvbjogTWF0aC5QSSAqIHRoaXMuaXNSb3RhdGVkXHJcbiAgICAgIH0sIDEwMClcclxuICAgICAgLnRvKHtcclxuICAgICAgICB3aWR0aDogVHJpYW5nbGUuc2l6ZSxcclxuICAgICAgICBoZWlnaHQ6IFRyaWFuZ2xlLnNpemVcclxuICAgICAgfSwgMjAwKTtcclxuXHJcbiAgICB0d2Vlbi5zdGFydCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIG5ldyB0cmlhbmdsZSBzcHJpdGVcclxuICAgKi9cclxuICBzdGF0aWMgZ2VuZXJhdGVTcHJpdGUoZ2FtZSkge1xyXG4gICAgY29uc3Qgc2l6ZSA9IDI1NTtcclxuXHJcbiAgICBsZXQgYml0bWFwID0gZ2FtZS5hZGQuYml0bWFwRGF0YShzaXplLCBzaXplKTtcclxuXHJcbiAgICBiaXRtYXAuY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgYml0bWFwLmN0eC5maWxsU3R5bGUgPSAnd2hpdGUnO1xyXG4gICAgYml0bWFwLmN0eC5tb3ZlVG8oMCwgc2l6ZSk7XHJcbiAgICBiaXRtYXAuY3R4LmxpbmVUbyhzaXplIC8gMiwgMCk7XHJcbiAgICBiaXRtYXAuY3R4LmxpbmVUbyhzaXplLCBzaXplKTtcclxuICAgIGJpdG1hcC5jdHgubGluZVRvKDAsIHNpemUpO1xyXG4gICAgYml0bWFwLmN0eC5maWxsKCk7XHJcblxyXG4gICAgcmV0dXJuIGJpdG1hcDtcclxuICB9XHJcbn1cclxuXHJcblRyaWFuZ2xlLnNpemUgPSA3MTtcclxuVHJpYW5nbGUuYmxpbmtzID0gW107XHJcblRyaWFuZ2xlLmFuaW1hdGlvblRpbWVTZWxlY3QgPSAyMDA7XHJcblRyaWFuZ2xlLmFuaW1hdGlvblRpbWVEZWxldGUgPSAyMDA7XHJcblRyaWFuZ2xlLmFuaW1hdGlvblRpbWVSZWNvdmVyID0gMTAwMDtcclxuRW5naW5lLlRyaWFuZ2xlID0gVHJpYW5nbGU7XHJcbiIsImNsYXNzIFVuaXZlcnNlIGV4dGVuZHMgUGhhc2VyLlNwcml0ZSB7XHJcbiAgY29uc3RydWN0b3IoZ2FtZSkge1xyXG4gICAgc3VwZXIoZ2FtZSwgZ2FtZS53aWR0aCAvIDIsIGdhbWUuaGVpZ2h0IC8gMiwgbmV3IFBoYXNlci5CaXRtYXBEYXRhKGdhbWUud2lkdGgsIGdhbWUuaGVpZ2h0KSk7XHJcbiAgICB0aGlzLmFuY2hvci5zZXRUbygwLjUpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlKCkge1xyXG4gICAgY29uc3QgbWF4U2l6ZSA9IDQ7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0MDA7IGkrKykge1xyXG4gICAgICBsZXQgc2l6ZSA9IHRoaXMuZ2FtZS5ybmQuYmV0d2VlbihtYXhTaXplIC8gMiwgbWF4U2l6ZSk7XHJcbiAgICAgIGxldCBiaXRtYXAgPSBuZXcgUGhhc2VyLkJpdG1hcERhdGEoc2l6ZSwgc2l6ZSk7XHJcblxyXG4gICAgICBiaXRtYXAuY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICBiaXRtYXAuY3R4LmZpbGxTdHlsZSA9ICd3aGl0ZSc7XHJcbiAgICAgIGJpdG1hcC5jdHgucmVjdCgwLCAwLCBzaXplLCBzaXplKTtcclxuICAgICAgYml0bWFwLmN0eC5maWxsKCk7XHJcblxyXG4gICAgICBsZXQgc3ByaXRlID0gbmV3IFBoYXNlci5TcHJpdGUoXHJcbiAgICAgICAgdGhpcy5nYW1lLFxyXG4gICAgICAgIHRoaXMuZ2FtZS5ybmQuYmV0d2VlbigtdGhpcy5nYW1lLndpZHRoLCB0aGlzLmdhbWUud2lkdGgpLFxyXG4gICAgICAgIHRoaXMuZ2FtZS5ybmQuYmV0d2VlbigtdGhpcy5nYW1lLmhlaWdodCwgdGhpcy5nYW1lLmhlaWdodCksXHJcbiAgICAgICAgYml0bWFwXHJcbiAgICAgICk7XHJcblxyXG4gICAgICB0aGlzLmFkZENoaWxkKHNwcml0ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5FbmdpbmUuVW5pdmVyc2UgPSBVbml2ZXJzZTtcclxuIiwiY2xhc3MgR2FtZSBleHRlbmRzIFBoYXNlci5TdGF0ZSB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG5cclxuICAgIHdpbmRvdy5nZyA9IHRoaXM7XHJcbiAgfVxyXG5cclxuICBpbml0KG51bWJlck9mR3JhZGF0aW9uKSB7XHJcbiAgICB0aGlzLmNvbG9yU2V0cyA9IFtdO1xyXG4gICAgLyoqXHJcbiAgICAgKiBOdW1iZXIgb2YgY29sb3JTZXRzIHdpbGwgdXNlIGluIHRoaXMgZ2FtZSBsZXZlbFxyXG4gICAgICogQHR5cGUge1t0eXBlXX1cclxuICAgICAqL1xyXG4gICAgdGhpcy5udW1iZXJPZkdyYWRhdGlvbiA9IG51bWJlck9mR3JhZGF0aW9uO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFyZ2luVG9wIG9mIHRyaWFuZ2xlcyBtYXRyaXhcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIHRoaXMubWFyZ2luVG9wID0gMTAwO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFyZ2luTGVmdCBvZiB0cmlhbmdsZXMgbWF0cml4XHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICB0aGlzLm1hcmdpbkxlZnQgPSA2NDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1pbmltYWwgdHJpYW5nbGVzIGRlc3Ryb3kgbGVuZ3RoXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICB0aGlzLm1pblRyaWFuZ2xlc0Rlc3Ryb3kgPSAzO1xyXG5cclxuICAgIHRoaXMudHJpYW5nbGVzTWF0cml4ID0gW107XHJcbiAgICB0aGlzLnNlbGVjdGVkVHJpYW5nbGVzID0gW107XHJcblxyXG4gICAgdGhpcy5zY29yZSA9IDA7XHJcblxyXG4gICAgdGhpcy50cmlhbmdsZU1hdHJpeFdpZHRoID0gMjU7XHJcbiAgICB0aGlzLnRyaWFuZ2xlTWF0cml4SGVpZ2h0ID0gOTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZSgpIHtcclxuICAgIHRoaXMuZ2FtZS5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzAwMCc7XHJcblxyXG4gICAgdGhpcy5jcmVhdGVVbml2ZXJzZSgpO1xyXG4gICAgdGhpcy5jcmVhdGVHcmFkYXRpb25zKCk7XHJcblxyXG4gICAgdGhpcy50cmlhbmdsZUdyb3VwID0gdGhpcy5nYW1lLmFkZC5ncm91cCgpO1xyXG5cclxuICAgIHRoaXMuc2tldGNoKCk7XHJcbiAgICB0aGlzLmluaXRFdmVudHMoKTtcclxuICAgIHRoaXMuY3JlYXRlU2NvcmVMYWJsZSgpO1xyXG4gICAgdGhpcy5pbml0aWFsaXphdGlvbkZ1bGxTY3JlZW4oKTtcclxuICAgIHRoaXMuY3JlYXRlSGludFRpbWVyKCk7XHJcblxyXG4gICAgdGhpcy5jcmVhdGVNZXRlb3IoKTtcclxuXHJcbiAgICB0aGlzLmZvcmNlUG9ydHJhaXQgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuZ2FtZS50aW1lLmFkdmFuY2VkVGltaW5nID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIC8vIHRoaXMuZ2FtZS5kZWJ1Zy5nZW9tKG5ldyBQaGFzZXIuTGluZSh0aGlzLmdhbWUud29ybGQuY2VudGVyWCwgMCwgdGhpcy5nYW1lLndvcmxkLmNlbnRlclgsIHRoaXMuZ2FtZS5oZWlnaHQpLCAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpJyk7XHJcbiAgICAvLyB0aGlzLmdhbWUuZGVidWcuZ2VvbShuZXcgUGhhc2VyLkxpbmUoMCwgdGhpcy5nYW1lLndvcmxkLmNlbnRlclksIHRoaXMuZ2FtZS53aWR0aCwgdGhpcy5nYW1lLndvcmxkLmNlbnRlclkpLCAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpJyk7XHJcbiAgICAvLyB0aGlzLmdhbWUuZGVidWcuaW5wdXRJbmZvKDUwLCA1MCwgJ3JnYigyNTUsIDI1NSwgMjU1KScpO1xyXG4gICAgLy8gdGhpcy5nYW1lLmRlYnVnLmdlb20odGhpcy50cmlhbmdsZUdyb3VwLmdldEJvdW5kcygpLCAncmdiYSgzNywgNDMsIDE4OSwgMC41KScpO1xyXG4gICAgdGhpcy51bml2ZXJzZS5yb3RhdGlvbiArPSBNYXRoLlBJIC8gMTgwMCAvIDMwICogMi41O1xyXG4gICAgdGhpcy5nYW1lLmRlYnVnLnRleHQodGhpcy5nYW1lLnRpbWUuZnBzLCA1MCwgNTAsICd3aGl0ZScpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlR3JhZGF0aW9ucygpIHtcclxuICAgIGxldCBhbGxHcmFkYXRpb24gPSBQaGFzZXIuQXJyYXlVdGlscy5zaHVmZmxlKENvbG9yU2V0LkdSQURBVElPTlMpO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5udW1iZXJPZkdyYWRhdGlvbjsgaSsrKSB7XHJcbiAgICAgIGxldCBjb2xvclNldCA9IG5ldyBDb2xvclNldChhbGxHcmFkYXRpb25baV0pO1xyXG4gICAgICB0aGlzLmNvbG9yU2V0cy5wdXNoKGNvbG9yU2V0KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNyZWF0ZVVuaXZlcnNlKCkge1xyXG4gICAgdGhpcy51bml2ZXJzZSA9IG5ldyBFbmdpbmUuVW5pdmVyc2UodGhpcy5nYW1lKTtcclxuXHJcbiAgICB0aGlzLnVuaXZlcnNlLmNyZWF0ZSgpO1xyXG5cclxuICAgIHRoaXMuZ2FtZS5hZGQuZXhpc3RpbmcodGhpcy51bml2ZXJzZSk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVIaW50VGltZXIoKSB7XHJcbiAgICBjb25zdCBoaW50VGltZW91dCA9IDIwMDAwO1xyXG4gICAgdGhpcy5oaW50VGltZXIgPSB0aGlzLmdhbWUudGltZS5jcmVhdGUoKTtcclxuXHJcbiAgICB0aGlzLmhpbnRUaW1lci5sb29wKGhpbnRUaW1lb3V0LCB0aGlzLnZpc3VhbGlzYXRpb25IaW50LCB0aGlzKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZU1ldGVvcigpIHtcclxuICAgIGNvbnN0IG1ldGVvclRpbWVyRGVsYXkgPSAyMCAqIDEwMDA7XHJcblxyXG4gICAgdGhpcy5tZXRlb3IgPSBuZXcgRW5naW5lLk1ldGVvcih0aGlzLmdhbWUpO1xyXG4gICAgdGhpcy5nYW1lLmFkZC5leGlzdGluZyh0aGlzLm1ldGVvcik7XHJcbiAgICB0aGlzLm1ldGVvci5zZW5kVG9CYWNrKCk7XHJcbiAgICB0aGlzLm1ldGVvci5vdXRPZkNhbWVyYUJvdW5kc0tpbGwgPSB0cnVlO1xyXG4gICAgdGhpcy5tZXRlb3Iua2lsbCgpO1xyXG5cclxuICAgIHRoaXMubWV0ZW9yVGltZXIgPSB0aGlzLmdhbWUudGltZS5jcmVhdGUoKTtcclxuICAgIHRoaXMubWV0ZW9yVGltZXIubG9vcChtZXRlb3JUaW1lckRlbGF5LCAoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLmdhbWUucm5kLnBpY2soW3RydWUsIGZhbHNlXSkpIHtcclxuICAgICAgICB0aGlzLnJ1bk1ldGVvcigpO1xyXG4gICAgICB9XHJcbiAgICB9LCB0aGlzKTtcclxuICAgIHRoaXMubWV0ZW9yVGltZXIuc3RhcnQoKTtcclxuICB9XHJcblxyXG4gIHJ1bk1ldGVvcigpIHtcclxuICAgIGNvbnN0IG1hcmdpblggPSB0aGlzLmdhbWUud2lkdGggLyAxMDtcclxuICAgIGNvbnN0IG1hcmdpblkgPSB0aGlzLmdhbWUuaGVpZ2h0IC8gMTA7XHJcbiAgICBjb25zdCBtYXJnaW5Sb3RhdGlvbiA9IE1hdGguUEkgLyAxMDtcclxuICAgIGxldCB4LCB5LCByb3RhdGlvbjtcclxuICAgIGxldCBzaWRlID0gdGhpcy5nYW1lLnJuZC5waWNrKFsndG9wJywgJ2xlZnQnLCAncmlnaHQnLCAnYm90dG9tJ10pO1xyXG5cclxuICAgIHN3aXRjaCAoc2lkZSkge1xyXG4gICAgICBjYXNlICd0b3AnOlxyXG4gICAgICAgIHggPSB0aGlzLmdhbWUucm5kLmJldHdlZW4obWFyZ2luWCwgdGhpcy5nYW1lLndpZHRoIC0gbWFyZ2luWCk7XHJcbiAgICAgICAgeSA9IDA7XHJcbiAgICAgICAgcm90YXRpb24gPSB0aGlzLmdhbWUucm5kLnJlYWxJblJhbmdlKG1hcmdpblJvdGF0aW9uLCBNYXRoLlBJIC0gbWFyZ2luUm90YXRpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdsZWZ0JzpcclxuICAgICAgICB4ID0gMDtcclxuICAgICAgICB5ID0gdGhpcy5nYW1lLnJuZC5iZXR3ZWVuKG1hcmdpblksIHRoaXMuZ2FtZS5oZWlnaHQgLSBtYXJnaW5ZKTtcclxuICAgICAgICByb3RhdGlvbiA9IHRoaXMuZ2FtZS5ybmQucmVhbEluUmFuZ2UoLU1hdGguUEkgLyAyICsgbWFyZ2luUm90YXRpb24sIE1hdGguUEkgLyAyIC0gbWFyZ2luUm90YXRpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdyaWdodCc6XHJcbiAgICAgICAgeCA9IHRoaXMuZ2FtZS53aWR0aDtcclxuICAgICAgICB5ID0gdGhpcy5nYW1lLnJuZC5iZXR3ZWVuKG1hcmdpblksIHRoaXMuZ2FtZS5oZWlnaHQgLSBtYXJnaW5ZKTtcclxuICAgICAgICByb3RhdGlvbiA9IHRoaXMuZ2FtZS5ybmQucmVhbEluUmFuZ2UoTWF0aC5QSSAvIDIgKyBtYXJnaW5Sb3RhdGlvbiwgTWF0aC5QSSAqIDMgLyAyIC0gbWFyZ2luUm90YXRpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdib3R0b20nOlxyXG4gICAgICAgIHggPSB0aGlzLmdhbWUucm5kLmJldHdlZW4obWFyZ2luWCwgdGhpcy5nYW1lLndpZHRoIC0gbWFyZ2luWCk7XHJcbiAgICAgICAgeSA9IHRoaXMuZ2FtZS5oZWlnaHQ7XHJcbiAgICAgICAgcm90YXRpb24gPSB0aGlzLmdhbWUucm5kLnJlYWxJblJhbmdlKG1hcmdpblJvdGF0aW9uLCAtTWF0aC5QSSArIG1hcmdpblJvdGF0aW9uKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm1ldGVvci5yZXNldCh4LCB5LCByb3RhdGlvbik7XHJcbiAgfVxyXG5cclxuICB2aXN1YWxpc2F0aW9uSGludCgpIHtcclxuICAgIGxldCB0cmlhbmdsZSA9IHRoaXMuZ2V0SGludFRyaWFuZ2xlKCk7XHJcblxyXG4gICAgaWYgKHRyaWFuZ2xlICE9PSB1bmRlZmluZWQpXHJcbiAgICAgIHRyaWFuZ2xlLmhpbnRNZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdGlhbGl6YXRpb24gZXZlbnQgaW4gdGhlIGdhbWVcclxuICAgKi9cclxuICBpbml0RXZlbnRzKCkge1xyXG4gICAgdGhpcy5nYW1lLmlucHV0Lm9uVXAuYWRkKHRoaXMuZGVzdHJveVRyaWFuZ2xlLCB0aGlzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSB0cmlhbmdsZXMgb24gY2FudmFzXHJcbiAgICovXHJcbiAgc2tldGNoKCkge1xyXG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLnRyaWFuZ2xlTWF0cml4V2lkdGg7IHgrKykge1xyXG4gICAgICB0aGlzLnRyaWFuZ2xlc01hdHJpeFt4XSA9IFtdO1xyXG4gICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMudHJpYW5nbGVNYXRyaXhIZWlnaHQ7IHkrKykge1xyXG4gICAgICAgIGxldCBwb3NYID0geCAqIChFbmdpbmUuVHJpYW5nbGUuc2l6ZSAvIDIgLSAxKTtcclxuICAgICAgICBsZXQgcG9zWSA9IHkgKiAoRW5naW5lLlRyaWFuZ2xlLnNpemUgLSAxKTtcclxuICAgICAgICBsZXQgaXNSb3RhdGVkID0geCAlIDIgPT09IDE7XHJcbiAgICAgICAgbGV0IGNvbG9yU2V0ID0gdGhpcy5nYW1lLnJuZC5waWNrKHRoaXMuY29sb3JTZXRzKTtcclxuXHJcbiAgICAgICAgaWYgKHkgJSAyID09PSAxKSB7XHJcbiAgICAgICAgICBpc1JvdGF0ZWQgPSAhaXNSb3RhdGVkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHRyaWFuZ2xlID0gbmV3IEVuZ2luZS5UcmlhbmdsZShcclxuICAgICAgICAgIHRoaXMuZ2FtZSxcclxuICAgICAgICAgIHBvc1gsXHJcbiAgICAgICAgICBwb3NZLFxyXG4gICAgICAgICAgaXNSb3RhdGVkLFxyXG4gICAgICAgICAgY29sb3JTZXQsIHtcclxuICAgICAgICAgICAgeCxcclxuICAgICAgICAgICAgeVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHRyaWFuZ2xlLmV2ZW50cy5vbklucHV0T3Zlci5hZGQodGhpcy5zZWxlY3RUcmlhbmdsZSwgdGhpcyk7XHJcbiAgICAgICAgdHJpYW5nbGUuZXZlbnRzLm9uSW5wdXREb3duLmFkZCh0aGlzLnNlbGVjdFRyaWFuZ2xlLCB0aGlzKTtcclxuICAgICAgICB0cmlhbmdsZS5ldmVudHMuZGVsZXRlQ29tcGxldGUuYWRkKHRoaXMucmVjb3ZlclRyaWFuZ2xlLCB0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy50cmlhbmdsZXNNYXRyaXhbeF1beV0gPSB0cmlhbmdsZTtcclxuICAgICAgICB0aGlzLnRyaWFuZ2xlR3JvdXAuYWRkKHRyaWFuZ2xlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY2VudGVyaW5nTWF0cml4KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZXN0cm95IG9yIHVuc2VsZWN0IHRyaWFuZ2xlc1xyXG4gICAqL1xyXG4gIGRlc3Ryb3lUcmlhbmdsZSgpIHtcclxuICAgIGxldCBpc1Vuc2VsZWN0ID0gdGhpcy5zZWxlY3RlZFRyaWFuZ2xlcy5sZW5ndGggPCB0aGlzLm1pblRyaWFuZ2xlc0Rlc3Ryb3k7XHJcblxyXG4gICAgaWYgKCFpc1Vuc2VsZWN0KSB7XHJcbiAgICAgIHRoaXMudXBkYXRlU2NvcmUoTWF0aC5wb3codGhpcy5zZWxlY3RlZFRyaWFuZ2xlcy5sZW5ndGgsIDIuMTUpICogMTApO1xyXG4gICAgICB0aGlzLmhpbnRUaW1lci5zdG9wKGZhbHNlKTtcclxuICAgICAgdGhpcy5oaW50VGltZXIuc3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICB3aGlsZSAodGhpcy5zZWxlY3RlZFRyaWFuZ2xlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGxldCB0cmlhbmdsZSA9IHRoaXMuc2VsZWN0ZWRUcmlhbmdsZXMucG9wKCk7XHJcbiAgICAgIGlmIChpc1Vuc2VsZWN0KSB7XHJcbiAgICAgICAgdHJpYW5nbGUudW5zZWxlY3QoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0cmlhbmdsZS5kZWxldGUoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICghaXNVbnNlbGVjdCkge1xyXG4gICAgICBsZXQgdGltZXJFeGlzdE1vdmUgPSB0aGlzLmdhbWUudGltZS5jcmVhdGUoKTtcclxuXHJcbiAgICAgIHRpbWVyRXhpc3RNb3ZlLmFkZChcclxuICAgICAgICBUcmlhbmdsZS5hbmltYXRpb25UaW1lRGVsZXRlICtcclxuICAgICAgICBUcmlhbmdsZS5hbmltYXRpb25UaW1lUmVjb3ZlcixcclxuICAgICAgICB0aGlzLnByb2Nlc3NQb3NpdGlvbixcclxuICAgICAgICB0aGlzXHJcbiAgICAgICk7XHJcblxyXG4gICAgICB0aW1lckV4aXN0TW92ZS5zdGFydCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVjb3ZlclRyaWFuZ2xlKHRyaWFuZ2xlKSB7XHJcbiAgICB0cmlhbmdsZS5yZWNvdmVyKHRoaXMuZ2FtZS5ybmQucGljayh0aGlzLmNvbG9yU2V0cykpO1xyXG4gIH1cclxuXHJcbiAgc2VsZWN0VHJpYW5nbGUodHJpYW5nbGUsIHBvaW50KSB7XHJcbiAgICBpZiAoIXRoaXMuZ2FtZS5pbnB1dC5hY3RpdmVQb2ludGVyLmlzRG93bikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRUcmlhbmdsZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHRyaWFuZ2xlLnNlbGVjdCgpO1xyXG4gICAgICB0aGlzLnNlbGVjdGVkVHJpYW5nbGVzLnB1c2godHJpYW5nbGUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IGxhc3RTZWxlY3RlZFRyaWFuZ2xlID0gdGhpcy5zZWxlY3RlZFRyaWFuZ2xlc1t0aGlzLnNlbGVjdGVkVHJpYW5nbGVzLmxlbmd0aCAtIDFdO1xyXG4gICAgICBsZXQgcHJlTGFzdFNlbGVjdGVkVHJpYW5nbGUgPSB0aGlzLnNlbGVjdGVkVHJpYW5nbGVzW3RoaXMuc2VsZWN0ZWRUcmlhbmdsZXMubGVuZ3RoIC0gMl07XHJcblxyXG4gICAgICBpZiAodHJpYW5nbGUuc2VsZWN0ZWQgJiYgdHJpYW5nbGUgPT09IHByZUxhc3RTZWxlY3RlZFRyaWFuZ2xlKSB7XHJcbiAgICAgICAgbGFzdFNlbGVjdGVkVHJpYW5nbGUudW5zZWxlY3QoKTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkVHJpYW5nbGVzLnBvcCgpO1xyXG4gICAgICB9IGVsc2UgaWYgKCF0cmlhbmdsZS5zZWxlY3RlZCAmJlxyXG4gICAgICAgIHRoaXMuY2FuVHJpYW5nbGVMaW5rKGxhc3RTZWxlY3RlZFRyaWFuZ2xlLCB0cmlhbmdsZSkgJiZcclxuICAgICAgICBsYXN0U2VsZWN0ZWRUcmlhbmdsZS5jb2xvclNldCA9PT0gdHJpYW5nbGUuY29sb3JTZXRcclxuICAgICAgKSB7XHJcbiAgICAgICAgdHJpYW5nbGUuc2VsZWN0KCk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFRyaWFuZ2xlcy5wdXNoKHRyaWFuZ2xlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2sgdHJpYW5nbGVzIGxpbmtcclxuICAgKi9cclxuICBjYW5UcmlhbmdsZUxpbmsodHIxLCB0cjIpIHtcclxuICAgIGlmICh0cjEubWF0cml4UG9zLnkgPT09IHRyMi5tYXRyaXhQb3MueSkge1xyXG4gICAgICBpZiAodHIxLm1hdHJpeFBvcy54ICsgMSA9PT0gdHIyLm1hdHJpeFBvcy54IHx8XHJcbiAgICAgICAgdHIxLm1hdHJpeFBvcy54IC0gMSA9PT0gdHIyLm1hdHJpeFBvcy54KSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodHIxLm1hdHJpeFBvcy54ID09PSB0cjIubWF0cml4UG9zLngpIHtcclxuICAgICAgaWYgKHRyMS5tYXRyaXhQb3MueCAlIDIgPT09IDApIHtcclxuICAgICAgICBpZiAodHIxLmlzUm90YXRlZCAmJiB0cjIubWF0cml4UG9zLnkgPT09IHRyMS5tYXRyaXhQb3MueSAtIDEpIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIXRyMS5pc1JvdGF0ZWQgJiYgdHIyLm1hdHJpeFBvcy55ID09PSB0cjEubWF0cml4UG9zLnkgKyAxKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKCF0cjEuaXNSb3RhdGVkICYmIHRyMi5tYXRyaXhQb3MueSA9PT0gdHIxLm1hdHJpeFBvcy55ICsgMSkge1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0cjEuaXNSb3RhdGVkICYmIHRyMi5tYXRyaXhQb3MueSA9PT0gdHIxLm1hdHJpeFBvcy55IC0gMSkge1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIHNjb3JlIG9uIHN0YWdlXHJcbiAgICovXHJcbiAgY3JlYXRlU2NvcmVMYWJsZSgpIHtcclxuICAgIGNvbnN0IHJhbmRvbUNvbG9yU2V0ID0gdGhpcy5nYW1lLnJuZC5waWNrKHRoaXMuY29sb3JTZXRzKTtcclxuICAgIGNvbnN0IGNvbG9yID0gJyNmZmYnOyAvLyArIFBoYXNlci5Db2xvci5jb21wb25lbnRUb0hleChyYW5kb21Db2xvclNldC5nZXRMYXN0Q29sb3IoKSk7XHJcbiAgICBjb25zdCBtYXJnaW5SaWdodCA9IDE1O1xyXG4gICAgY29uc3QgbWFyZ2luVG9wID0gMTU7XHJcblxyXG4gICAgY29uc3Qgc3R5bGUgPSB7XHJcbiAgICAgIGZvbnQ6ICc0MnB4IE9wZW4gU2FucycsXHJcbiAgICAgIGZvbnRTdHlsZTogJ2l0YWxpYycsXHJcbiAgICAgIGZpbGw6IGNvbG9yXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zY29yZUxhYmxlID0gbmV3IEVuZ2luZS5TY29yZUxhYmxlKFxyXG4gICAgICB0aGlzLmdhbWUsXHJcbiAgICAgIHRoaXMuZ2FtZS53aWR0aCAtIG1hcmdpblJpZ2h0LFxyXG4gICAgICBtYXJnaW5Ub3AsXHJcbiAgICAgIDAsXHJcbiAgICAgIHN0eWxlXHJcbiAgICApO1xyXG4gICAgdGhpcy5zY29yZUxhYmxlLmFuY2hvci5zZXRUbygxLCAwKTtcclxuXHJcbiAgICAvLyBUT0RPOiBURU1QXHJcbiAgICB0aGlzLnNjb3JlTGFibGUuaW5wdXRFbmFibGVkID0gdHJ1ZTtcclxuICAgIHRoaXMuc2NvcmVMYWJsZS5ldmVudHMub25JbnB1dERvd24uYWRkKHRoaXMudG9nZ2xlRnVsbFNjcmVlbiwgdGhpcyk7XHJcbiAgfVxyXG5cclxuICBpbml0aWFsaXphdGlvbkZ1bGxTY3JlZW4oKSB7XHJcbiAgICB0aGlzLmdhbWUuc2NhbGUuZnVsbFNjcmVlblNjYWxlTW9kZSA9IFBoYXNlci5TY2FsZU1hbmFnZXIuUkVTSVpFO1xyXG4gICAgdGhpcy5nYW1lLnNjYWxlLm9uRnVsbFNjcmVlbkNoYW5nZVxyXG4gICAgICAuYWRkKHRoaXMucmVzaXplU2NyZWVuLCB0aGlzKTtcclxuICB9XHJcblxyXG4gIHRvZ2dsZUZ1bGxTY3JlZW4oKSB7XHJcbiAgICBpZiAodGhpcy5nYW1lLnNjYWxlLmlzRnVsbFNjcmVlbikge1xyXG4gICAgICB0aGlzLmdhbWUuc2NhbGUuc3RvcEZ1bGxTY3JlZW4oKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZ2FtZS5zY2FsZS5zdGFydEZ1bGxTY3JlZW4oKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZVNjb3JlKHZhbCkge1xyXG4gICAgdmFsID0gTWF0aC5yb3VuZCh2YWwpO1xyXG5cclxuICAgIHRoaXMuc2NvcmUgKz0gdmFsO1xyXG4gICAgdGhpcy5zY29yZUxhYmxlLmNoYW5nZVZhbHVlKHRoaXMuc2NvcmUpO1xyXG4gIH1cclxuXHJcbiAgcmVzaXplU2NyZWVuKCkge1xyXG4gICAgdGhpcy5zY29yZUxhYmxlLnggPSB0aGlzLmdhbWUud2lkdGggLSAxNTtcclxuICAgIHRoaXMuc2NvcmVMYWJsZS55ID0gMTU7XHJcblxyXG4gICAgdGhpcy51bml2ZXJzZS54ID0gdGhpcy5nYW1lLndpZHRoIC8gMjtcclxuICAgIHRoaXMudW5pdmVyc2UueSA9IHRoaXMuZ2FtZS5oZWlnaHQgLyAyO1xyXG5cclxuICAgIHRoaXMuY2VudGVyaW5nTWF0cml4KCk7XHJcbiAgfVxyXG5cclxuICBjZW50ZXJpbmdNYXRyaXgoKSB7XHJcbiAgICBjb25zdCBoYWxmVHJpYW5nbGVTaXplID0gRW5naW5lLlRyaWFuZ2xlLnNpemUgLyAyO1xyXG5cclxuICAgIHRoaXMudHJpYW5nbGVHcm91cC54ID0gdGhpcy5nYW1lLndpZHRoIC8gMiAtIHRoaXMudHJpYW5nbGVHcm91cC53aWR0aCAvIDIgKyBoYWxmVHJpYW5nbGVTaXplO1xyXG4gICAgdGhpcy50cmlhbmdsZUdyb3VwLnkgPSB0aGlzLmdhbWUuaGVpZ2h0IC8gMiAtIHRoaXMudHJpYW5nbGVHcm91cC5oZWlnaHQgLyAyICsgaGFsZlRyaWFuZ2xlU2l6ZTtcclxuICB9XHJcblxyXG4gIHJlYnVpbGRNYXAoKSB7XHJcbiAgICBjb25zdCB0aW1lRGVsYXkgPSA1MDtcclxuXHJcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMudHJpYW5nbGVNYXRyaXhXaWR0aDsgeCsrKSB7XHJcbiAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy50cmlhbmdsZU1hdHJpeEhlaWdodDsgeSsrKSB7XHJcbiAgICAgICAgbGV0IHRyaWFuZ2xlID0gdGhpcy50cmlhbmdsZXNNYXRyaXhbeF1beV07XHJcbiAgICAgICAgbGV0IHJhbmRvbUNvbG9yU2V0ID0gdGhpcy5nYW1lLnJuZC5waWNrKHRoaXMuY29sb3JTZXRzKTtcclxuXHJcbiAgICAgICAgdHJpYW5nbGUudXBkYXRlQ29sb3IocmFuZG9tQ29sb3JTZXQsIHggKiB0aW1lRGVsYXkgKyB5ICogdGltZURlbGF5KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJvY2Vzc1Bvc2l0aW9uKCkge1xyXG4gICAgaWYgKCF0aGlzLmdldFNvbWVDb21iaW5hdGlvbigpLmxlbmd0aCkge1xyXG4gICAgICBjb25zdCBkZWxheURlc3Ryb3kgPSA1MDAwO1xyXG4gICAgICBsZXQgdGltZXIgPSB0aGlzLmdhbWUudGltZS5jcmVhdGUoKTtcclxuXHJcbiAgICAgIHRpbWVyLmFkZChkZWxheURlc3Ryb3ksIHRoaXMucmVidWlsZE1hcCwgdGhpcyk7XHJcbiAgICAgIHRpbWVyLnN0YXJ0KDApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0SGludFRyaWFuZ2xlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZ2FtZS5ybmQucGljayh0aGlzLmdldFNvbWVDb21iaW5hdGlvbigpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBleGlzdGluZyBjb21iaW5hdGlvbiwgaWYgd2UgaGF2ZW4ndCBleGlzdCBtb3ZlLCB0aGVuIHJldHVybiBlbXB0eSBhcnJheVxyXG4gICAqL1xyXG4gIGdldFNvbWVDb21iaW5hdGlvbigpIHtcclxuICAgIGxldCB1c2VkQ2VsbCA9IFtdO1xyXG4gICAgbGV0IHRyaWFuZ2xlcyA9IFtdO1xyXG5cclxuICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy50cmlhbmdsZU1hdHJpeFdpZHRoOyB4KyspIHtcclxuICAgICAgdXNlZENlbGxbeF0gPSBbXTtcclxuICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLnRyaWFuZ2xlTWF0cml4SGVpZ2h0OyB5KyspIHtcclxuICAgICAgICB1c2VkQ2VsbFt4XVt5XSA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLnRyaWFuZ2xlTWF0cml4V2lkdGg7IHgrKykge1xyXG4gICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMudHJpYW5nbGVNYXRyaXhIZWlnaHQ7IHkrKykge1xyXG4gICAgICAgIGlmICghdXNlZENlbGxbeF1beV0gJiYgdGhpcy5oYXNDb21iaW5hdGlvbih1c2VkQ2VsbCwgdGhpcy50cmlhbmdsZXNNYXRyaXhbeF1beV0uY29sb3JTZXQsIHgsIHksIDEpKSB7XHJcbiAgICAgICAgICB0cmlhbmdsZXMucHVzaCh0aGlzLnRyaWFuZ2xlc01hdHJpeFt4XVt5XSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRyaWFuZ2xlcztcclxuICB9XHJcblxyXG4gIGhhc0NvbWJpbmF0aW9uKHVzZWRDZWxsLCBjb2xvclNldCwgeCwgeSwgY250KSB7XHJcbiAgICBpZiAoY29sb3JTZXQgIT09IHRoaXMudHJpYW5nbGVzTWF0cml4W3hdW3ldLmNvbG9yU2V0IHx8IHVzZWRDZWxsW3hdW3ldKSB7XHJcbiAgICAgIHJldHVybiAoY250ID4gdGhpcy5taW5UcmlhbmdsZXNEZXN0cm95KTtcclxuICAgIH1cclxuXHJcbiAgICB1c2VkQ2VsbFt4XVt5XSA9IHRydWU7XHJcbiAgICBpZiAoeCArIDEgPCB0aGlzLnRyaWFuZ2xlTWF0cml4V2lkdGgpIHtcclxuICAgICAgaWYgKHRoaXMuaGFzQ29tYmluYXRpb24odXNlZENlbGwsIGNvbG9yU2V0LCB4ICsgMSwgeSwgY250ICsgMSkpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh4IC0gMSA+PSAwKSB7XHJcbiAgICAgIGlmICh0aGlzLmhhc0NvbWJpbmF0aW9uKHVzZWRDZWxsLCBjb2xvclNldCwgeCAtIDEsIHksIGNudCArIDEpKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy50cmlhbmdsZXNNYXRyaXhbeF1beV0uaXNSb3RhdGVkKSB7XHJcbiAgICAgIGlmICh5IC0gMSA+PSAwKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzQ29tYmluYXRpb24odXNlZENlbGwsIGNvbG9yU2V0LCB4LCB5IC0gMSwgY250ICsgMSkpIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHkgKyAxIDwgdGhpcy50cmlhbmdsZU1hdHJpeEhlaWdodCkge1xyXG4gICAgICAgIGlmICh0aGlzLmhhc0NvbWJpbmF0aW9uKHVzZWRDZWxsLCBjb2xvclNldCwgeCwgeSArIDEsIGNudCArIDEpKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59XHJcblxyXG5FbmdpbmUuR2FtZSA9IEdhbWU7XHJcbiIsbnVsbCwiRW5naW5lLmdhbWUgPSBuZXcgUGhhc2VyLkdhbWUoRW5naW5lLm1heFdpZHRoLCBFbmdpbmUubWF4SGVpZ2h0LCBQaGFzZXIuQVVUTyk7XHJcblxyXG5FbmdpbmUuZ2FtZS5zdGF0ZS5hZGQoJ0Jvb3QnLCBFbmdpbmUuQm9vdCk7XHJcbkVuZ2luZS5nYW1lLnN0YXRlLmFkZCgnTG9hZGVyJywgRW5naW5lLkxvYWRlcik7XHJcbi8vIEVuZ2luZS5nYW1lLnN0YXRlLmFkZCgnTWVudScsIEVuZ2luZS5NZW51KTtcclxuRW5naW5lLmdhbWUuc3RhdGUuYWRkKCdHYW1lJywgRW5naW5lLkdhbWUpO1xyXG4vLyBFbmdpbmUuZ2FtZS5zdGF0ZS5hZGQoJ1Njb3JlQm9hcmQnLCBFbmdpbmUuU2NvcmVCb2FyZCk7XHJcblxyXG5FbmdpbmUuZ2FtZS5zdGF0ZS5zdGFydCgnQm9vdCcpO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
