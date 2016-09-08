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

  function Meteor(game, x, y, rotation) {
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

      this.meteor = new Engine.Meteor(this.game, 50, 50, Math.PI / 4);
      this.game.add.existing(this.meteor);
      this.meteor.sendToBack();

      //TODO: HERE
      setInterval(function () {
        _this2.meteor.reset(_this2.game.rnd.between(100, _this2.game.width), _this2.game.rnd.between(100, _this2.game.height), _this2.game.rnd.realInRange(-Math.PI, Math.PI));
      }, 1000);
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
      if (colorSet != this.trianglesMatrix[x][y].colorSet || usedCell[x][y]) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS5qcyIsImJvb3QuanMiLCJsb2FkZXIuanMiLCJtZW51LmpzIiwiY29sb3JzZXQuanMiLCJtZXRlb3IuanMiLCJzY29yZWxhYmxlLmpzIiwidHJpYW5nbGUuanMiLCJ1bml2ZXJzZS5qcyIsImdhbWUuanMiLCJzY29yZWJvYXJkLmpzIiwiYXBwLmpzIl0sIm5hbWVzIjpbIkVuZ2luZSIsIm1pbldpZHRoIiwibWluSGVpZ2h0IiwibWF4V2lkdGgiLCJtYXhIZWlnaHQiLCJrZXlzIiwidHJpYW5nbGUiLCJtZXRlb3IiLCJCb290IiwiZ2FtZSIsInN0YWdlIiwiZGlzYWJsZVZpc2liaWxpdHlDaGFuZ2UiLCJzY2FsZSIsInBhZ2VBbGlnbkhvcml6b250YWxseSIsInBhZ2VBbGlnblZlcnRpY2FsbHkiLCJzdGF0ZSIsInN0YXJ0IiwiUGhhc2VyIiwiU3RhdGUiLCJMb2FkZXIiLCJiYWNrZ3JvdW5kQ29sb3IiLCJhZGRQcm9ncmVzc0xhYmxlIiwibG9hZCIsIm9uRmlsZUNvbXBsZXRlIiwiYWRkIiwicmVmcmVzaFByb2dyZXNzIiwiY2FjaGUiLCJhZGRCaXRtYXBEYXRhIiwiVHJpYW5nbGUiLCJnZW5lcmF0ZVNwcml0ZSIsIk1ldGVvciIsIm51bWJlck9mR3JhZGF0aW9uIiwic3R5bGUiLCJmb250IiwiZmlsbCIsInByb2dyZXNzTGFibGUiLCJ0ZXh0Iiwid29ybGQiLCJjZW50ZXJYIiwiY2VudGVyWSIsImFuY2hvciIsInNldFRvIiwicHJvZ3Jlc3MiLCJjYWNoZUtleSIsInN1Y2Nlc3MiLCJ0b3RhbExvYWRlZCIsInRvdGFsRmlsZXMiLCJDb2xvclNldCIsImdyYWRpdGlvbiIsInJuZCIsInBpY2siLCJudW1iZXIiLCJsZW5ndGgiLCJHUkFEQVRJT05TIiwieCIsInkiLCJyb3RhdGlvbiIsInNwZWVkIiwiZ2V0Qml0bWFwRGF0YSIsInJlZnJlc2hSb3RhdGlvbiIsInZlbG9jaXR5WCIsIk1hdGgiLCJjb3MiLCJ2ZWxvY2l0eVkiLCJzaW4iLCJhbGl2ZSIsIndpZHRoIiwiaGVpZ2h0IiwiYml0bWFwIiwiYml0bWFwRGF0YSIsImdyYWRpZW50IiwiY3R4IiwiY3JlYXRlTGluZWFyR3JhZGllbnQiLCJhZGRDb2xvclN0b3AiLCJiZWdpblBhdGgiLCJmaWxsU3R5bGUiLCJyZWN0IiwiU3ByaXRlIiwiU2NvcmVMYWJsZSIsInNjb3JlIiwicm91bmQiLCJleGlzdGluZyIsInR3ZWVucyIsInJlbW92ZSIsInR3ZWVuIiwidG8iLCJhbmltYXRpb25DaGFuZ2VWYWwiLCJvblVwZGF0ZUNhbGxiYWNrIiwib25Db21wbGV0ZSIsIlRleHQiLCJpc1JvdGF0ZWQiLCJjb2xvclNldCIsIm1hdHJpeFBvc2l0aW9uIiwic2l6ZSIsInRpbnQiLCJnZXRSYW5kb21Db2xvciIsIm1hdHJpeFBvcyIsImlucHV0RW5hYmxlZCIsImlucHV0IiwicGl4ZWxQZXJmZWN0T3ZlciIsInBpeGVsUGVyZmVjdENsaWNrIiwiZXZlbnRzIiwiZGVsZXRlQ29tcGxldGUiLCJTaWduYWwiLCJzZWxlY3RlZCIsIlBJIiwiYWRkQ2hpbGQiLCJhbmltYXRpb25UaW1lU2VsZWN0IiwiYWN0aXZlUG9pbnRlciIsImlzRG93biIsImFscGhhIiwiYW5pbWF0aW9uVGltZURlbGV0ZSIsImRpc3BhdGNoIiwiYW5pbWF0aW9uVGltZVJlY292ZXIiLCJFYXNpbmciLCJCb3VuY2UiLCJPdXQiLCJkZWxheSIsImFuaW1hdGlvblRpbWUiLCJoaWRlVHdlZW4iLCJzaG93VHdlZW4iLCJjaGFpbiIsImxhc3RDb2xvciIsImJsaW5rcyIsIm9uU3RhcnQiLCJwdXNoIiwibGFzdEJsaW5rIiwibW92ZVRvIiwibGluZVRvIiwiVW5pdmVyc2UiLCJCaXRtYXBEYXRhIiwibWF4U2l6ZSIsImkiLCJiZXR3ZWVuIiwic3ByaXRlIiwiR2FtZSIsIndpbmRvdyIsImdnIiwiY29sb3JTZXRzIiwibWFyZ2luVG9wIiwibWFyZ2luTGVmdCIsIm1pblRyaWFuZ2xlc0Rlc3Ryb3kiLCJ0cmlhbmdsZXNNYXRyaXgiLCJzZWxlY3RlZFRyaWFuZ2xlcyIsInRyaWFuZ2xlTWF0cml4V2lkdGgiLCJ0cmlhbmdsZU1hdHJpeEhlaWdodCIsImNyZWF0ZVVuaXZlcnNlIiwiY3JlYXRlR3JhZGF0aW9ucyIsInRyaWFuZ2xlR3JvdXAiLCJncm91cCIsInNrZXRjaCIsImluaXRFdmVudHMiLCJjcmVhdGVTY29yZUxhYmxlIiwiaW5pdGlhbGl6YXRpb25GdWxsU2NyZWVuIiwiY3JlYXRlSGludFRpbWVyIiwiY3JlYXRlTWV0ZW9yIiwiZm9yY2VQb3J0cmFpdCIsInRpbWUiLCJhZHZhbmNlZFRpbWluZyIsInVuaXZlcnNlIiwiZGVidWciLCJmcHMiLCJhbGxHcmFkYXRpb24iLCJBcnJheVV0aWxzIiwic2h1ZmZsZSIsImNyZWF0ZSIsImhpbnRUaW1lb3V0IiwiaGludFRpbWVyIiwibG9vcCIsInZpc3VhbGlzYXRpb25IaW50Iiwic2VuZFRvQmFjayIsInNldEludGVydmFsIiwicmVzZXQiLCJyZWFsSW5SYW5nZSIsImdldEhpbnRUcmlhbmdsZSIsInVuZGVmaW5lZCIsImhpbnRNZSIsIm9uVXAiLCJkZXN0cm95VHJpYW5nbGUiLCJwb3NYIiwicG9zWSIsIm9uSW5wdXRPdmVyIiwic2VsZWN0VHJpYW5nbGUiLCJvbklucHV0RG93biIsInJlY292ZXJUcmlhbmdsZSIsImNlbnRlcmluZ01hdHJpeCIsImlzVW5zZWxlY3QiLCJ1cGRhdGVTY29yZSIsInBvdyIsInN0b3AiLCJwb3AiLCJ1bnNlbGVjdCIsImRlbGV0ZSIsInRpbWVyRXhpc3RNb3ZlIiwicHJvY2Vzc1Bvc2l0aW9uIiwicmVjb3ZlciIsInBvaW50Iiwic2VsZWN0IiwibGFzdFNlbGVjdGVkVHJpYW5nbGUiLCJwcmVMYXN0U2VsZWN0ZWRUcmlhbmdsZSIsImNhblRyaWFuZ2xlTGluayIsInRyMSIsInRyMiIsInJhbmRvbUNvbG9yU2V0IiwiY29sb3IiLCJtYXJnaW5SaWdodCIsImZvbnRTdHlsZSIsInNjb3JlTGFibGUiLCJ0b2dnbGVGdWxsU2NyZWVuIiwiZnVsbFNjcmVlblNjYWxlTW9kZSIsIlNjYWxlTWFuYWdlciIsIlJFU0laRSIsIm9uRnVsbFNjcmVlbkNoYW5nZSIsInJlc2l6ZVNjcmVlbiIsImlzRnVsbFNjcmVlbiIsInN0b3BGdWxsU2NyZWVuIiwic3RhcnRGdWxsU2NyZWVuIiwidmFsIiwiY2hhbmdlVmFsdWUiLCJoYWxmVHJpYW5nbGVTaXplIiwidGltZURlbGF5IiwidXBkYXRlQ29sb3IiLCJnZXRTb21lQ29tYmluYXRpb24iLCJkZWxheURlc3Ryb3kiLCJ0aW1lciIsInJlYnVpbGRNYXAiLCJ1c2VkQ2VsbCIsInRyaWFuZ2xlcyIsImhhc0NvbWJpbmF0aW9uIiwiY250IiwiQVVUTyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxTQUFTO0FBQ1hDLFlBQVUsR0FEQztBQUVYQyxhQUFXLEdBRkE7QUFHWEMsWUFBVSxJQUhDO0FBSVhDLGFBQVc7QUFKQSxDQUFiOztBQU9BOzs7O0FBSUFKLE9BQU9LLElBQVAsR0FBYztBQUNaQyxZQUFVLFVBREU7QUFFWkMsVUFBUTtBQUZJLENBQWQ7Ozs7Ozs7Ozs7O0lDWE1DOzs7QUFDSixrQkFBYztBQUFBOztBQUFBO0FBRWI7Ozs7OEJBRVMsQ0FFVDs7OzZCQUVRO0FBQ1AsV0FBS0MsSUFBTCxDQUFVQyxLQUFWLENBQWdCQyx1QkFBaEIsR0FBMEMsSUFBMUM7QUFDQSxXQUFLQyxLQUFMLENBQVdDLHFCQUFYLEdBQW1DLElBQW5DO0FBQ0EsV0FBS0QsS0FBTCxDQUFXRSxtQkFBWCxHQUFpQyxJQUFqQztBQUNBLFdBQUtDLEtBQUwsQ0FBV0MsS0FBWCxDQUFpQixRQUFqQjtBQUNEOzs7O0VBZGdCQyxPQUFPQzs7QUFpQjFCbEIsT0FBT1EsSUFBUCxHQUFjQSxJQUFkOzs7Ozs7Ozs7OztJQ2pCTVc7OztBQUNKLG9CQUFjO0FBQUE7O0FBQUE7QUFFYjs7Ozs4QkFFUztBQUNSLFdBQUtWLElBQUwsQ0FBVUMsS0FBVixDQUFnQlUsZUFBaEIsR0FBa0MsTUFBbEM7QUFDQSxXQUFLQyxnQkFBTDs7QUFFQSxXQUFLQyxJQUFMLENBQVVDLGNBQVYsQ0FB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UyxJQUFQLENBQVlNLEtBQVosQ0FBa0JDLEtBQWxCLENBQXdCLE1BQXhCIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImxldCBFbmdpbmUgPSB7XHJcbiAgbWluV2lkdGg6IDY0MCxcclxuICBtaW5IZWlnaHQ6IDMyMCxcclxuICBtYXhXaWR0aDogMTM2NixcclxuICBtYXhIZWlnaHQ6IDc2OCxcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTcHJpdGUsIEJpdG1hcCwgZXRjLi4uIGNoYWNoZSBrZXlzXHJcbiAqIEB0eXBlIHtPYmplY3R9XHJcbiAqL1xyXG5FbmdpbmUua2V5cyA9IHtcclxuICB0cmlhbmdsZTogJ3RyaWFuZ2xlJyxcclxuICBtZXRlb3I6ICdtZXRlb3InXHJcbn1cclxuIiwiY2xhc3MgQm9vdCBleHRlbmRzIFBoYXNlci5TdGF0ZSB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgcHJlbG9hZCgpIHtcclxuXHJcbiAgfVxyXG5cclxuICBjcmVhdGUoKSB7XHJcbiAgICB0aGlzLmdhbWUuc3RhZ2UuZGlzYWJsZVZpc2liaWxpdHlDaGFuZ2UgPSB0cnVlO1xyXG4gICAgdGhpcy5zY2FsZS5wYWdlQWxpZ25Ib3Jpem9udGFsbHkgPSB0cnVlO1xyXG4gICAgdGhpcy5zY2FsZS5wYWdlQWxpZ25WZXJ0aWNhbGx5ID0gdHJ1ZTtcclxuICAgIHRoaXMuc3RhdGUuc3RhcnQoJ0xvYWRlcicpO1xyXG4gIH1cclxufVxyXG5cclxuRW5naW5lLkJvb3QgPSBCb290O1xyXG4iLCJjbGFzcyBMb2FkZXIgZXh0ZW5kcyBQaGFzZXIuU3RhdGUge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIHByZWxvYWQoKSB7XHJcbiAgICB0aGlzLmdhbWUuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gJyMwMDAnO1xyXG4gICAgdGhpcy5hZGRQcm9ncmVzc0xhYmxlKCk7XHJcblxyXG4gICAgdGhpcy5sb2FkLm9uRmlsZUNvbXBsZXRlLmFkZCh0aGlzLnJlZnJlc2hQcm9ncmVzcywgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5nYW1lLmNhY2hlLmFkZEJpdG1hcERhdGEoRW5naW5lLmtleXMudHJpYW5nbGUsIEVuZ2luZS5UcmlhbmdsZS5nZW5lcmF0ZVNwcml0ZSh0aGlzLmdhbWUpKTtcclxuICAgIHRoaXMuZ2FtZS5jYWNoZS5hZGRCaXRtYXBEYXRhKEVuZ2luZS5rZXlzLm1ldGVvciwgRW5naW5lLk1ldGVvci5nZW5lcmF0ZVNwcml0ZSh0aGlzLmdhbWUpKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZSgpIHtcclxuICAgIGxldCBudW1iZXJPZkdyYWRhdGlvbiA9IDM7XHJcbiAgICB0aGlzLnN0YXRlLnN0YXJ0KCdHYW1lJywgdHJ1ZSwgZmFsc2UsIG51bWJlck9mR3JhZGF0aW9uKTtcclxuICB9XHJcblxyXG4gIGFkZFByb2dyZXNzTGFibGUoKSB7XHJcbiAgICBsZXQgc3R5bGUgPSB7XHJcbiAgICAgIGZvbnQ6ICc0MXB4IE9wZW4gU2FucycsXHJcbiAgICAgIGZpbGw6ICcjMDBFNjc2J1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucHJvZ3Jlc3NMYWJsZSA9IHRoaXMuYWRkLnRleHQodGhpcy5nYW1lLndvcmxkLmNlbnRlclgsIHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJZLCAnTG9hZGluZzogMCUgKDAvMCknLCBzdHlsZSk7XHJcbiAgICB0aGlzLnByb2dyZXNzTGFibGUuYW5jaG9yLnNldFRvKDAuNSk7XHJcbiAgfVxyXG5cclxuICByZWZyZXNoUHJvZ3Jlc3MocHJvZ3Jlc3MsIGNhY2hlS2V5LCBzdWNjZXNzLCB0b3RhbExvYWRlZCwgdG90YWxGaWxlcykge1xyXG4gICAgdGhpcy5wcm9ncmVzc0xhYmxlLnRleHQgPSBgTG9hZGluZyAke3Byb2dyZXNzfSUgKCR7dG90YWxMb2FkZWR9LyR7dG90YWxGaWxlc30pYDtcclxuICB9XHJcbn1cclxuXHJcbkVuZ2luZS5Mb2FkZXIgPSBMb2FkZXI7XHJcbiIsbnVsbCwiY2xhc3MgQ29sb3JTZXQge1xyXG4gIC8qKlxyXG4gICAqIENvbG9yIFNldFxyXG4gICAqIEBwYXJhbSAge0FycmF5fSBncmFkaXRpb24gQXJyYXkgb2YgY29sb3JzXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoZ3JhZGl0aW9uKSB7XHJcbiAgICB0aGlzLmdyYWRpdGlvbiA9IGdyYWRpdGlvbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCByYW5kb20gY29sb3IgZnJvbSBzZXRcclxuICAgKiBAcmV0dXJuIHtbdHlwZV19IFtkZXNjcmlwdGlvbl1cclxuICAgKi9cclxuICBnZXRSYW5kb21Db2xvcigpIHtcclxuICAgIHJldHVybiBFbmdpbmUuZ2FtZS5ybmQucGljayh0aGlzLmdyYWRpdGlvbik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgY29sb3IgYnkgbnVtYmVyXHJcbiAgICovXHJcbiAgZ2V0QnlOdW1iZXIobnVtYmVyKSB7XHJcbiAgICByZXR1cm4gdGhpcy5ncmFkaXRpb25bbnVtYmVyXTtcclxuICB9XHJcblxyXG4gIGdldExhc3RDb2xvcigpIHtcclxuICAgIHJldHVybiB0aGlzLmdyYWRpdGlvblt0aGlzLmdyYWRpdGlvbi5sZW5ndGggLSAxXTtcclxuICB9XHJcbn1cclxuXHJcbkNvbG9yU2V0LkdSQURBVElPTlMgPSBbXHJcbiAgLy8gaW5kaWdvXHJcbiAgW1xyXG4gICAgMHgzRjUxQjUsXHJcbiAgICAweDM5NDlBQixcclxuICAgIDB4MzAzRjlGLFxyXG4gICAgMHgyODM1OTMsXHJcbiAgXSxcclxuICAvLyBibHVlXHJcbiAgW1xyXG4gICAgMHgyMTk2RjMsXHJcbiAgICAweDFFODhFNSxcclxuICAgIDB4MTk3NkQyLFxyXG4gICAgMHgxNTY1QzAsXHJcbiAgXSxcclxuICAvLyB5ZWxsb3dcclxuICBbXHJcbiAgICAweEZGRjE3NixcclxuICAgIDB4RkZFRTU4LFxyXG4gICAgMHhGRkVCM0IsXHJcbiAgICAweEZERDgzNSxcclxuICBdLFxyXG4gIC8vIHBpbmtcclxuICBbXHJcbiAgICAweEU5MUU2MyxcclxuICAgIDB4RDgxQjYwLFxyXG4gICAgMHhDMjE4NUIsXHJcbiAgICAweEFEMTQ1NyxcclxuICBdLFxyXG4gIC8vIGJyb3duXHJcbiAgW1xyXG4gICAgMHg3OTU1NDgsXHJcbiAgICAweDZENEM0MSxcclxuICAgIDB4NUQ0MDM3LFxyXG4gICAgMHg0RTM0MkUsXHJcbiAgXSxcclxuICAvLyAvLyBkZWVwb3JhbmdlXHJcbiAgLy8gW1xyXG4gIC8vICAgMHhGRjU3MjIsXHJcbiAgLy8gICAweEY0NTExRSxcclxuICAvLyAgIDB4RTY0QTE5LFxyXG4gIC8vICAgMHhEODQzMTUsXHJcbiAgLy8gXSxcclxuICAvLyBncmV5XHJcbiAgW1xyXG4gICAgMHg5RTlFOUUsXHJcbiAgICAweDc1NzU3NSxcclxuICAgIDB4NjE2MTYxLFxyXG4gICAgMHg0MjQyNDIsXHJcbiAgXSxcclxuICAvLyAvLyByZWRcclxuICAvLyBbXHJcbiAgLy8gICAweEY0NDMzNixcclxuICAvLyAgIDB4RTUzOTM1LFxyXG4gIC8vICAgMHhEMzJGMkYsXHJcbiAgLy8gICAweEM2MjgyOCxcclxuICAvLyBdLFxyXG5dO1xyXG5cclxuRW5naW5lLkNvbG9yU2V0ID0gQ29sb3JTZXQ7XHJcbiIsImNsYXNzIE1ldGVvciBleHRlbmRzIFBoYXNlci5TcHJpdGUge1xyXG4gIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHJvdGF0aW9uLCBzcGVlZCA9IDEwMCkge1xyXG4gICAgc3VwZXIoZ2FtZSwgeCwgeSwgZ2FtZS5jYWNoZS5nZXRCaXRtYXBEYXRhKEVuZ2luZS5rZXlzLm1ldGVvcikpO1xyXG5cclxuICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcclxuICAgIHRoaXMuYW5jaG9yLnNldFRvKDEpO1xyXG4gICAgdGhpcy5yZWZyZXNoUm90YXRpb24ocm90YXRpb24pO1xyXG4gIH1cclxuXHJcbiAgcmVzZXQoeCwgeSwgcm90YXRpb24pIHtcclxuICAgIHRoaXMucmVmcmVzaFJvdGF0aW9uKHJvdGF0aW9uKTtcclxuXHJcbiAgICBzdXBlci5yZXNldCh4LCB5KTtcclxuICB9XHJcblxyXG4gIHJlZnJlc2hSb3RhdGlvbihyb3RhdGlvbikge1xyXG4gICAgdGhpcy5yb3RhdGlvbiA9IHJvdGF0aW9uO1xyXG4gICAgdGhpcy52ZWxvY2l0eVggPSBNYXRoLmNvcyhyb3RhdGlvbikgKiB0aGlzLnNwZWVkO1xyXG4gICAgdGhpcy52ZWxvY2l0eVkgPSBNYXRoLnNpbihyb3RhdGlvbikgKiB0aGlzLnNwZWVkO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCkge1xyXG4gICAgaWYgKHRoaXMuYWxpdmUpIHtcclxuICAgICAgdGhpcy54ICs9IHRoaXMudmVsb2NpdHlYO1xyXG4gICAgICB0aGlzLnkgKz0gdGhpcy52ZWxvY2l0eVk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgbmV3IG1ldGVvciBzcHJpdGVcclxuICAgKi9cclxuICBzdGF0aWMgZ2VuZXJhdGVTcHJpdGUoZ2FtZSkge1xyXG4gICAgY29uc3Qgd2lkdGggPSAxMDI0O1xyXG4gICAgY29uc3QgaGVpZ2h0ID0gMjtcclxuXHJcbiAgICBsZXQgYml0bWFwID0gZ2FtZS5hZGQuYml0bWFwRGF0YSh3aWR0aCwgaGVpZ2h0KTtcclxuICAgIGxldCBncmFkaWVudCA9IGJpdG1hcC5jdHguY3JlYXRlTGluZWFyR3JhZGllbnQoMCwgMCwgd2lkdGgsIDApO1xyXG5cclxuICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgxLjAsICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDEpJyk7XHJcbiAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMC44LCAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjQpJyk7XHJcbiAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMC42LCAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjMpJyk7XHJcbiAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMC40LCAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpJyk7XHJcbiAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMC4yLCAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpJyk7XHJcbiAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMC4wLCAncmdiYSgyNTUsIDI1NSwgMjU1LCAwKScpO1xyXG5cclxuICAgIGJpdG1hcC5jdHguYmVnaW5QYXRoKCk7XHJcbiAgICBiaXRtYXAuY3R4LmZpbGxTdHlsZSA9IGdyYWRpZW50O1xyXG4gICAgYml0bWFwLmN0eC5yZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgYml0bWFwLmN0eC5maWxsKCk7XHJcblxyXG4gICAgcmV0dXJuIGJpdG1hcDtcclxuICB9XHJcbn1cclxuXHJcbkVuZ2luZS5NZXRlb3IgPSBNZXRlb3JcclxuIiwiY2xhc3MgU2NvcmVMYWJsZSBleHRlbmRzIFBoYXNlci5UZXh0IHtcclxuICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzY29yZSwgc3R5bGUpIHtcclxuICAgIHN1cGVyKGdhbWUsIHgsIHksIGBTY29yZTogJHtNYXRoLnJvdW5kKHNjb3JlKX1gLCBzdHlsZSk7XHJcblxyXG4gICAgdGhpcy5zY29yZSA9IHNjb3JlO1xyXG5cclxuICAgIHRoaXMuZ2FtZS5hZGQuZXhpc3RpbmcodGhpcyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgc2NvcmUgbGFibGUgdmFsdWVcclxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHNjb3JlIE5ldyBzY29yZVxyXG4gICAqL1xyXG4gIGNoYW5nZVZhbHVlKHNjb3JlKSB7XHJcbiAgICB0aGlzLmdhbWUudHdlZW5zLnJlbW92ZSh0aGlzKTtcclxuXHJcbiAgICBsZXQgdHdlZW4gPSB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMpXHJcbiAgICAgIC50byh7XHJcbiAgICAgICAgc2NvcmVcclxuICAgICAgfSwgU2NvcmVMYWJsZS5hbmltYXRpb25DaGFuZ2VWYWwpXHJcbiAgICAgIC5vblVwZGF0ZUNhbGxiYWNrKCgpID0+IHtcclxuICAgICAgICB0aGlzLnRleHQgPSBgU2NvcmU6ICR7TWF0aC5yb3VuZCh0aGlzLnNjb3JlKX1gO1xyXG4gICAgICB9LCB0aGlzKTtcclxuXHJcbiAgICB0d2Vlbi5vbkNvbXBsZXRlXHJcbiAgICAgIC5hZGQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMudGV4dCA9IGBTY29yZTogJHtNYXRoLnJvdW5kKHRoaXMuc2NvcmUpfWA7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIHR3ZWVuLnN0YXJ0KCk7XHJcbiAgfVxyXG59XHJcblxyXG5TY29yZUxhYmxlLmFuaW1hdGlvbkNoYW5nZVZhbCA9IDUwMDtcclxuRW5naW5lLlNjb3JlTGFibGUgPSBTY29yZUxhYmxlO1xyXG4iLCJjbGFzcyBUcmlhbmdsZSBleHRlbmRzIFBoYXNlci5TcHJpdGUge1xyXG5cclxuICAvKipcclxuICAgKiBJdCdzIGEgdHJpYW5nbGUsIHlhc2ggaXQncyBub3QgYSBqb2tlXHJcbiAgICogQHBhcmFtICB7UGhhc2VyLkdhbWV9ICBnYW1lICAgICAgW2Rlc2NyaXB0aW9uXVxyXG4gICAqIEBwYXJhbSAge1t0eXBlXX0gIHggICAgICAgICBbZGVzY3JpcHRpb25dXHJcbiAgICogQHBhcmFtICB7W3R5cGVdfSAgeSAgICAgICAgIFtkZXNjcmlwdGlvbl1cclxuICAgKiBAcGFyYW0gIHtCb29sZWFufSBpc1JvdGF0ZWQgW2Rlc2NyaXB0aW9uXVxyXG4gICAqIEBwYXJhbSAge051bWJlcn0gIGNvbG9yICAgICBbZGVzY3JpcHRpb25dXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgaXNSb3RhdGVkLCBjb2xvclNldCwgbWF0cml4UG9zaXRpb24pIHtcclxuICAgIHN1cGVyKGdhbWUsIHgsIHksIEVuZ2luZS5nYW1lLmNhY2hlLmdldEJpdG1hcERhdGEoRW5naW5lLmtleXMudHJpYW5nbGUpKTtcclxuXHJcbiAgICB0aGlzLndpZHRoID0gVHJpYW5nbGUuc2l6ZTtcclxuICAgIHRoaXMuaGVpZ2h0ID0gVHJpYW5nbGUuc2l6ZTtcclxuICAgIHRoaXMuYW5jaG9yLnNldFRvKDAuNSk7XHJcbiAgICB0aGlzLmNvbG9yU2V0ID0gY29sb3JTZXQ7XHJcbiAgICB0aGlzLnRpbnQgPSB0aGlzLmNvbG9yU2V0LmdldFJhbmRvbUNvbG9yKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQb2l0aW9uIGluIHRoZSBtYXRyaXggb2YgdHJpYW5nbGVzXHJcbiAgICAgKiBAdHlwZSB7W3R5cGVdfVxyXG4gICAgICovXHJcbiAgICB0aGlzLm1hdHJpeFBvcyA9IG1hdHJpeFBvc2l0aW9uO1xyXG5cclxuICAgIHRoaXMuaW5wdXRFbmFibGVkID0gdHJ1ZTtcclxuICAgIHRoaXMuaW5wdXQucGl4ZWxQZXJmZWN0T3ZlciA9IHRydWU7XHJcbiAgICB0aGlzLmlucHV0LnBpeGVsUGVyZmVjdENsaWNrID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLmV2ZW50cy5kZWxldGVDb21wbGV0ZSA9IG5ldyBQaGFzZXIuU2lnbmFsKCk7XHJcblxyXG4gICAgdGhpcy5zZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5pc1JvdGF0ZWQgPSBpc1JvdGF0ZWQ7XHJcblxyXG4gICAgaWYgKGlzUm90YXRlZCkge1xyXG4gICAgICB0aGlzLnJvdGF0aW9uID0gTWF0aC5QSTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB0aGlzLmFkZFRleHRQb3NpdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgYWRkVGV4dFBvc2l0aW9uKCkge1xyXG4gICAgbGV0IHRleHQgPSBuZXcgUGhhc2VyLlRleHQoXHJcbiAgICAgIHRoaXMuZ2FtZSxcclxuICAgICAgVHJpYW5nbGUuc2l6ZSAvIDIsXHJcbiAgICAgIFRyaWFuZ2xlLnNpemUgLyAyLFxyXG4gICAgICBgJHt0aGlzLm1hdHJpeFBvcy54fToke3RoaXMubWF0cml4UG9zLnl9YCxcclxuICAgICAge1xyXG4gICAgICAgIGZvbnQ6ICc2NHB4IE9wZW4gU2FucycsXHJcbiAgICAgICAgZmlsbDogJ2JsYWNrJ1xyXG4gICAgICB9XHJcbiAgICApXHJcblxyXG4gICAgaWYgKHRoaXMuaXNSb3RhdGVkKSB7XHJcbiAgICAgIHRleHQucm90YXRpb24gKz0gTWF0aC5QSTtcclxuICAgICAgdGV4dC55ID0gK3RleHQuaGVpZ2h0O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGV4dC54ID0gLXRleHQud2lkdGggLyAyO1xyXG4gICAgICB0ZXh0LnkgPSAtdGV4dC5oZWlnaHQgLyA0O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYWRkQ2hpbGQodGV4dCk7XHJcbiAgfVxyXG5cclxuICBzZWxlY3QoKSB7XHJcbiAgICBpZiAoIXRoaXMuc2VsZWN0ZWQpIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZCA9IHRydWU7XHJcblxyXG4gICAgICB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMpXHJcbiAgICAgICAgLnRvKHtcclxuICAgICAgICAgIHdpZHRoOiBUcmlhbmdsZS5zaXplIC8gMS41LFxyXG4gICAgICAgICAgaGVpZ2h0OiBUcmlhbmdsZS5zaXplIC8gMS41XHJcbiAgICAgICAgfSwgVHJpYW5nbGUuYW5pbWF0aW9uVGltZVNlbGVjdClcclxuICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgfVxyXG4gIH1cclxuXHJcbiAgdW5zZWxlY3QoKSB7XHJcbiAgICBpZiAodGhpcy5zZWxlY3RlZCkge1xyXG5cclxuICAgICAgdGhpcy5nYW1lLnR3ZWVucy5yZW1vdmUodGhpcyk7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgIHRoaXMuZ2FtZS5hZGQudHdlZW4odGhpcylcclxuICAgICAgICAudG8oe1xyXG4gICAgICAgICAgd2lkdGg6IFRyaWFuZ2xlLnNpemUsXHJcbiAgICAgICAgICBoZWlnaHQ6IFRyaWFuZ2xlLnNpemVcclxuICAgICAgICB9LCBUcmlhbmdsZS5hbmltYXRpb25UaW1lU2VsZWN0KVxyXG4gICAgICAgIC5zdGFydCgpO1xyXG4gICAgICB9XHJcbiAgfVxyXG5cclxuICBkZWxldGUoKSB7XHJcbiAgICBpZiAodGhpcy5nYW1lLmlucHV0LmFjdGl2ZVBvaW50ZXIuaXNEb3duKSB7XHJcbiAgICAgIHRoaXMuZ2FtZS5hZGQudHdlZW4odGhpcylcclxuICAgICAgICAudG8oe1xyXG4gICAgICAgICAgd2lkdGg6IDAsXHJcbiAgICAgICAgICBoZWlnaHQ6IDAsXHJcbiAgICAgICAgICBhbHBoYTogMFxyXG4gICAgICAgIH0sIFRyaWFuZ2xlLmFuaW1hdGlvblRpbWVEZWxldGUpXHJcbiAgICAgICAgLnN0YXJ0KClcclxuICAgICAgICAub25Db21wbGV0ZVxyXG4gICAgICAgIC5hZGQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5ldmVudHMuZGVsZXRlQ29tcGxldGUuZGlzcGF0Y2godGhpcyk7XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZWNvdmVyKGNvbG9yU2V0KSB7XHJcbiAgICB0aGlzLmNvbG9yU2V0ID0gY29sb3JTZXQ7XHJcbiAgICB0aGlzLnRpbnQgPSB0aGlzLmNvbG9yU2V0LmdldFJhbmRvbUNvbG9yKCk7XHJcbiAgICB0aGlzLndpZHRoID0gVHJpYW5nbGUuc2l6ZTtcclxuICAgIHRoaXMuaGVpZ2h0ID0gVHJpYW5nbGUuc2l6ZTtcclxuICAgIHRoaXMuc2VsZWN0ZWQgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMpXHJcbiAgICAgIC50byh7XHJcbiAgICAgICAgYWxwaGE6IDFcclxuICAgICAgfSwgVHJpYW5nbGUuYW5pbWF0aW9uVGltZVJlY292ZXIsIFBoYXNlci5FYXNpbmcuQm91bmNlLk91dClcclxuICAgICAgLnN0YXJ0KCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVDb2xvcihjb2xvclNldCwgZGVsYXkgPSAwKSB7XHJcbiAgICBjb25zdCBhbmltYXRpb25UaW1lID0gMTAwMDtcclxuICAgIHRoaXMuY29sb3JTZXQgPSBjb2xvclNldDtcclxuXHJcbiAgICBsZXQgaGlkZVR3ZWVuID0gdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzKVxyXG4gICAgICAudG8oe1xyXG4gICAgICAgIGFscGhhOiAwXHJcbiAgICAgIH0sIGFuaW1hdGlvblRpbWUpO1xyXG5cclxuICAgIGxldCBzaG93VHdlZW4gPSB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMpXHJcbiAgICAgIC50byh7XHJcbiAgICAgICAgYWxwaGE6IDFcclxuICAgICAgfSwgYW5pbWF0aW9uVGltZSk7XHJcblxyXG4gICAgaGlkZVR3ZWVuXHJcbiAgICAgIC5vbkNvbXBsZXRlXHJcbiAgICAgIC5hZGQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMudGludCA9IHRoaXMuY29sb3JTZXQuZ2V0UmFuZG9tQ29sb3IoKTtcclxuICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgaGlkZVR3ZWVuLmRlbGF5KGRlbGF5KTtcclxuXHJcbiAgICBoaWRlVHdlZW4uY2hhaW4oc2hvd1R3ZWVuKTtcclxuICAgIGhpZGVUd2Vlbi5zdGFydCgpO1xyXG4gIH1cclxuXHJcbiAgYmxpbmsoKSB7XHJcbiAgICBjb25zdCBsYXN0Q29sb3IgPSB0aGlzLnRpbnQ7XHJcbiAgICBsZXQgdHdlZW4gPSB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMpO1xyXG5cclxuICAgIHR3ZWVuLnRvKHtcclxuICAgICAgICBhbHBoYTogMlxyXG4gICAgICB9LCAxMDApXHJcbiAgICAgIC5vbkNvbXBsZXRlXHJcbiAgICAgIC5hZGQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMudGludCA9IGxhc3RDb2xvcjtcclxuICAgICAgICBUcmlhbmdsZS5ibGlua3MgPSBbXTtcclxuICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgdHdlZW4ub25TdGFydFxyXG4gICAgICAuYWRkKCgpID0+IHtcclxuICAgICAgICB0aGlzLmFscGhhID0gMDtcclxuICAgICAgICB0aGlzLnRpbnQgPSAweDAwRkYwMDtcclxuICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgaWYgKFRyaWFuZ2xlLmJsaW5rcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgVHJpYW5nbGUuYmxpbmtzLnB1c2godHdlZW4pO1xyXG4gICAgICB0d2Vlbi5zdGFydCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IGxhc3RCbGluayA9IFRyaWFuZ2xlLmJsaW5rc1tUcmlhbmdsZS5ibGlua3MubGVuZ3RoIC0gMV07XHJcbiAgICAgIGxhc3RCbGluay5jaGFpbih0d2Vlbik7XHJcbiAgICAgIFRyaWFuZ2xlLmJsaW5rcy5wdXNoKHR3ZWVuKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGhpbnRNZSgpIHtcclxuICAgIGxldCB0d2VlbiA9IHRoaXMuZ2FtZS5hZGQudHdlZW4odGhpcylcclxuICAgICAgLnRvKHtcclxuICAgICAgICB3aWR0aDogdGhpcy53aWR0aCAqIDAuNzUsXHJcbiAgICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCAqIDAuNzVcclxuICAgICAgfSwgMjAwKVxyXG4gICAgICAudG8oe1xyXG4gICAgICAgIHJvdGF0aW9uOiB0aGlzLnJvdGF0aW9uICsgTWF0aC5QSSAvIDMyXHJcbiAgICAgIH0sIDEwMClcclxuICAgICAgLnRvKHtcclxuICAgICAgICByb3RhdGlvbjogdGhpcy5yb3RhdGlvbiAtIE1hdGguUEkgKiAyIC8gMzJcclxuICAgICAgfSwgMTAwKVxyXG4gICAgICAudG8oe1xyXG4gICAgICAgIHJvdGF0aW9uOiBNYXRoLlBJICogdGhpcy5pc1JvdGF0ZWRcclxuICAgICAgfSwgMTAwKVxyXG4gICAgICAudG8oe1xyXG4gICAgICAgIHdpZHRoOiBUcmlhbmdsZS5zaXplLFxyXG4gICAgICAgIGhlaWdodDogVHJpYW5nbGUuc2l6ZVxyXG4gICAgICB9LCAyMDApO1xyXG5cclxuICAgIHR3ZWVuLnN0YXJ0KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgbmV3IHRyaWFuZ2xlIHNwcml0ZVxyXG4gICAqL1xyXG4gIHN0YXRpYyBnZW5lcmF0ZVNwcml0ZShnYW1lKSB7XHJcbiAgICBjb25zdCBzaXplID0gMjU1O1xyXG5cclxuICAgIGxldCBiaXRtYXAgPSBnYW1lLmFkZC5iaXRtYXBEYXRhKHNpemUsIHNpemUpO1xyXG5cclxuICAgIGJpdG1hcC5jdHguYmVnaW5QYXRoKCk7XHJcbiAgICBiaXRtYXAuY3R4LmZpbGxTdHlsZSA9ICd3aGl0ZSc7XHJcbiAgICBiaXRtYXAuY3R4Lm1vdmVUbygwLCBzaXplKTtcclxuICAgIGJpdG1hcC5jdHgubGluZVRvKHNpemUgLyAyLCAwKTtcclxuICAgIGJpdG1hcC5jdHgubGluZVRvKHNpemUsIHNpemUpO1xyXG4gICAgYml0bWFwLmN0eC5saW5lVG8oMCwgc2l6ZSk7XHJcbiAgICBiaXRtYXAuY3R4LmZpbGwoKTtcclxuXHJcbiAgICByZXR1cm4gYml0bWFwO1xyXG4gIH1cclxufVxyXG5cclxuVHJpYW5nbGUuc2l6ZSA9IDcxO1xyXG5UcmlhbmdsZS5ibGlua3MgPSBbXTtcclxuVHJpYW5nbGUuYW5pbWF0aW9uVGltZVNlbGVjdCA9IDIwMDtcclxuVHJpYW5nbGUuYW5pbWF0aW9uVGltZURlbGV0ZSA9IDIwMDtcclxuVHJpYW5nbGUuYW5pbWF0aW9uVGltZVJlY292ZXIgPSAxMDAwO1xyXG5FbmdpbmUuVHJpYW5nbGUgPSBUcmlhbmdsZTtcclxuIiwiY2xhc3MgVW5pdmVyc2UgZXh0ZW5kcyBQaGFzZXIuU3ByaXRlIHtcclxuICBjb25zdHJ1Y3RvcihnYW1lKSB7XHJcbiAgICBzdXBlcihnYW1lLCBnYW1lLndpZHRoIC8gMiwgZ2FtZS5oZWlnaHQgLyAyLCBuZXcgUGhhc2VyLkJpdG1hcERhdGEoZ2FtZS53aWR0aCwgZ2FtZS5oZWlnaHQpKTtcclxuICAgIHRoaXMuYW5jaG9yLnNldFRvKDAuNSk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGUoKSB7XHJcbiAgICBjb25zdCBtYXhTaXplID0gNDtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQwMDsgaSsrKSB7XHJcbiAgICAgIGxldCBzaXplID0gdGhpcy5nYW1lLnJuZC5iZXR3ZWVuKG1heFNpemUgLyAyLCBtYXhTaXplKTtcclxuICAgICAgbGV0IGJpdG1hcCA9IG5ldyBQaGFzZXIuQml0bWFwRGF0YShzaXplLCBzaXplKTtcclxuXHJcbiAgICAgIGJpdG1hcC5jdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgIGJpdG1hcC5jdHguZmlsbFN0eWxlID0gJ3doaXRlJztcclxuICAgICAgYml0bWFwLmN0eC5yZWN0KDAsIDAsIHNpemUsIHNpemUpO1xyXG4gICAgICBiaXRtYXAuY3R4LmZpbGwoKTtcclxuXHJcbiAgICAgIGxldCBzcHJpdGUgPSBuZXcgUGhhc2VyLlNwcml0ZShcclxuICAgICAgICB0aGlzLmdhbWUsXHJcbiAgICAgICAgdGhpcy5nYW1lLnJuZC5iZXR3ZWVuKC10aGlzLmdhbWUud2lkdGgsIHRoaXMuZ2FtZS53aWR0aCksXHJcbiAgICAgICAgdGhpcy5nYW1lLnJuZC5iZXR3ZWVuKC10aGlzLmdhbWUuaGVpZ2h0LCB0aGlzLmdhbWUuaGVpZ2h0KSxcclxuICAgICAgICBiaXRtYXBcclxuICAgICAgKTtcclxuXHJcbiAgICAgIHRoaXMuYWRkQ2hpbGQoc3ByaXRlKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbkVuZ2luZS5Vbml2ZXJzZSA9IFVuaXZlcnNlO1xyXG4iLCJjbGFzcyBHYW1lIGV4dGVuZHMgUGhhc2VyLlN0YXRlIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcblxyXG4gICAgd2luZG93LmdnID0gdGhpcztcclxuICB9XHJcblxyXG4gIGluaXQobnVtYmVyT2ZHcmFkYXRpb24pIHtcclxuICAgIHRoaXMuY29sb3JTZXRzID0gW107XHJcbiAgICAvKipcclxuICAgICAqIE51bWJlciBvZiBjb2xvclNldHMgd2lsbCB1c2UgaW4gdGhpcyBnYW1lIGxldmVsXHJcbiAgICAgKiBAdHlwZSB7W3R5cGVdfVxyXG4gICAgICovXHJcbiAgICB0aGlzLm51bWJlck9mR3JhZGF0aW9uID0gbnVtYmVyT2ZHcmFkYXRpb247XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYXJnaW5Ub3Agb2YgdHJpYW5nbGVzIG1hdHJpeFxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5tYXJnaW5Ub3AgPSAxMDA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYXJnaW5MZWZ0IG9mIHRyaWFuZ2xlcyBtYXRyaXhcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIHRoaXMubWFyZ2luTGVmdCA9IDY0O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWluaW1hbCB0cmlhbmdsZXMgZGVzdHJveSBsZW5ndGhcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIHRoaXMubWluVHJpYW5nbGVzRGVzdHJveSA9IDM7XHJcblxyXG4gICAgdGhpcy50cmlhbmdsZXNNYXRyaXggPSBbXTtcclxuICAgIHRoaXMuc2VsZWN0ZWRUcmlhbmdsZXMgPSBbXTtcclxuXHJcbiAgICB0aGlzLnNjb3JlID0gMDtcclxuXHJcbiAgICB0aGlzLnRyaWFuZ2xlTWF0cml4V2lkdGggPSAyNTtcclxuICAgIHRoaXMudHJpYW5nbGVNYXRyaXhIZWlnaHQgPSA5O1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlKCkge1xyXG4gICAgdGhpcy5nYW1lLnN0YWdlLmJhY2tncm91bmRDb2xvciA9ICcjMDAwJztcclxuXHJcbiAgICB0aGlzLmNyZWF0ZVVuaXZlcnNlKCk7XHJcbiAgICB0aGlzLmNyZWF0ZUdyYWRhdGlvbnMoKTtcclxuXHJcbiAgICB0aGlzLnRyaWFuZ2xlR3JvdXAgPSB0aGlzLmdhbWUuYWRkLmdyb3VwKCk7XHJcblxyXG4gICAgdGhpcy5za2V0Y2goKTtcclxuICAgIHRoaXMuaW5pdEV2ZW50cygpO1xyXG4gICAgdGhpcy5jcmVhdGVTY29yZUxhYmxlKCk7XHJcbiAgICB0aGlzLmluaXRpYWxpemF0aW9uRnVsbFNjcmVlbigpO1xyXG4gICAgdGhpcy5jcmVhdGVIaW50VGltZXIoKTtcclxuXHJcbiAgICB0aGlzLmNyZWF0ZU1ldGVvcigpO1xyXG5cclxuICAgIHRoaXMuZm9yY2VQb3J0cmFpdCA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5nYW1lLnRpbWUuYWR2YW5jZWRUaW1pbmcgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgLy8gdGhpcy5nYW1lLmRlYnVnLmdlb20obmV3IFBoYXNlci5MaW5lKHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYLCAwLCB0aGlzLmdhbWUud29ybGQuY2VudGVyWCwgdGhpcy5nYW1lLmhlaWdodCksICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMiknKTtcclxuICAgIC8vIHRoaXMuZ2FtZS5kZWJ1Zy5nZW9tKG5ldyBQaGFzZXIuTGluZSgwLCB0aGlzLmdhbWUud29ybGQuY2VudGVyWSwgdGhpcy5nYW1lLndpZHRoLCB0aGlzLmdhbWUud29ybGQuY2VudGVyWSksICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMiknKTtcclxuICAgIC8vIHRoaXMuZ2FtZS5kZWJ1Zy5pbnB1dEluZm8oNTAsIDUwLCAncmdiKDI1NSwgMjU1LCAyNTUpJyk7XHJcbiAgICAvLyB0aGlzLmdhbWUuZGVidWcuZ2VvbSh0aGlzLnRyaWFuZ2xlR3JvdXAuZ2V0Qm91bmRzKCksICdyZ2JhKDM3LCA0MywgMTg5LCAwLjUpJyk7XHJcbiAgICB0aGlzLnVuaXZlcnNlLnJvdGF0aW9uICs9IE1hdGguUEkgLyAxODAwIC8gMzAgKiAyLjU7XHJcbiAgICB0aGlzLmdhbWUuZGVidWcudGV4dCh0aGlzLmdhbWUudGltZS5mcHMsIDUwLCA1MCwgJ3doaXRlJyk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVHcmFkYXRpb25zKCkge1xyXG4gICAgbGV0IGFsbEdyYWRhdGlvbiA9IFBoYXNlci5BcnJheVV0aWxzLnNodWZmbGUoQ29sb3JTZXQuR1JBREFUSU9OUyk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm51bWJlck9mR3JhZGF0aW9uOyBpKyspIHtcclxuICAgICAgbGV0IGNvbG9yU2V0ID0gbmV3IENvbG9yU2V0KGFsbEdyYWRhdGlvbltpXSk7XHJcbiAgICAgIHRoaXMuY29sb3JTZXRzLnB1c2goY29sb3JTZXQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY3JlYXRlVW5pdmVyc2UoKSB7XHJcbiAgICB0aGlzLnVuaXZlcnNlID0gbmV3IEVuZ2luZS5Vbml2ZXJzZSh0aGlzLmdhbWUpO1xyXG5cclxuICAgIHRoaXMudW5pdmVyc2UuY3JlYXRlKCk7XHJcblxyXG4gICAgdGhpcy5nYW1lLmFkZC5leGlzdGluZyh0aGlzLnVuaXZlcnNlKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZUhpbnRUaW1lcigpIHtcclxuICAgIGNvbnN0IGhpbnRUaW1lb3V0ID0gMjAwMDA7XHJcbiAgICB0aGlzLmhpbnRUaW1lciA9IHRoaXMuZ2FtZS50aW1lLmNyZWF0ZSgpO1xyXG5cclxuICAgIHRoaXMuaGludFRpbWVyLmxvb3AoaGludFRpbWVvdXQsIHRoaXMudmlzdWFsaXNhdGlvbkhpbnQsIHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlTWV0ZW9yKCkge1xyXG4gICAgdGhpcy5tZXRlb3IgPSBuZXcgRW5naW5lLk1ldGVvcih0aGlzLmdhbWUsIDUwLCA1MCwgTWF0aC5QSSAvIDQpO1xyXG4gICAgdGhpcy5nYW1lLmFkZC5leGlzdGluZyh0aGlzLm1ldGVvcik7XHJcbiAgICB0aGlzLm1ldGVvci5zZW5kVG9CYWNrKCk7XHJcblxyXG4gICAgLy9UT0RPOiBIRVJFXHJcbiAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgIHRoaXMubWV0ZW9yLnJlc2V0KFxyXG4gICAgICAgIHRoaXMuZ2FtZS5ybmQuYmV0d2VlbigxMDAsIHRoaXMuZ2FtZS53aWR0aCksXHJcbiAgICAgICAgdGhpcy5nYW1lLnJuZC5iZXR3ZWVuKDEwMCwgdGhpcy5nYW1lLmhlaWdodCksXHJcbiAgICAgICAgdGhpcy5nYW1lLnJuZC5yZWFsSW5SYW5nZSgtTWF0aC5QSSwgTWF0aC5QSSkpXHJcbiAgICB9LCAxMDAwKTtcclxuICB9XHJcblxyXG4gIHZpc3VhbGlzYXRpb25IaW50KCkge1xyXG4gICAgbGV0IHRyaWFuZ2xlID0gdGhpcy5nZXRIaW50VHJpYW5nbGUoKTtcclxuXHJcbiAgICBpZiAodHJpYW5nbGUgIT09IHVuZGVmaW5lZClcclxuICAgICAgdHJpYW5nbGUuaGludE1lKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbml0aWFsaXphdGlvbiBldmVudCBpbiB0aGUgZ2FtZVxyXG4gICAqL1xyXG4gIGluaXRFdmVudHMoKSB7XHJcbiAgICB0aGlzLmdhbWUuaW5wdXQub25VcC5hZGQodGhpcy5kZXN0cm95VHJpYW5nbGUsIHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIHRyaWFuZ2xlcyBvbiBjYW52YXNcclxuICAgKi9cclxuICBza2V0Y2goKSB7XHJcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMudHJpYW5nbGVNYXRyaXhXaWR0aDsgeCsrKSB7XHJcbiAgICAgIHRoaXMudHJpYW5nbGVzTWF0cml4W3hdID0gW107XHJcbiAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy50cmlhbmdsZU1hdHJpeEhlaWdodDsgeSsrKSB7XHJcbiAgICAgICAgbGV0IHBvc1ggPSB4ICogKEVuZ2luZS5UcmlhbmdsZS5zaXplIC8gMiAtIDEpO1xyXG4gICAgICAgIGxldCBwb3NZID0geSAqIChFbmdpbmUuVHJpYW5nbGUuc2l6ZSAtIDEpO1xyXG4gICAgICAgIGxldCBpc1JvdGF0ZWQgPSB4ICUgMiA9PT0gMTtcclxuICAgICAgICBsZXQgY29sb3JTZXQgPSB0aGlzLmdhbWUucm5kLnBpY2sodGhpcy5jb2xvclNldHMpO1xyXG5cclxuICAgICAgICBpZiAoeSAlIDIgPT09IDEpIHtcclxuICAgICAgICAgIGlzUm90YXRlZCA9ICFpc1JvdGF0ZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdHJpYW5nbGUgPSBuZXcgRW5naW5lLlRyaWFuZ2xlKFxyXG4gICAgICAgICAgdGhpcy5nYW1lLFxyXG4gICAgICAgICAgcG9zWCxcclxuICAgICAgICAgIHBvc1ksXHJcbiAgICAgICAgICBpc1JvdGF0ZWQsXHJcbiAgICAgICAgICBjb2xvclNldCwge1xyXG4gICAgICAgICAgICB4LFxyXG4gICAgICAgICAgICB5XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgdHJpYW5nbGUuZXZlbnRzLm9uSW5wdXRPdmVyLmFkZCh0aGlzLnNlbGVjdFRyaWFuZ2xlLCB0aGlzKTtcclxuICAgICAgICB0cmlhbmdsZS5ldmVudHMub25JbnB1dERvd24uYWRkKHRoaXMuc2VsZWN0VHJpYW5nbGUsIHRoaXMpO1xyXG4gICAgICAgIHRyaWFuZ2xlLmV2ZW50cy5kZWxldGVDb21wbGV0ZS5hZGQodGhpcy5yZWNvdmVyVHJpYW5nbGUsIHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLnRyaWFuZ2xlc01hdHJpeFt4XVt5XSA9IHRyaWFuZ2xlO1xyXG4gICAgICAgIHRoaXMudHJpYW5nbGVHcm91cC5hZGQodHJpYW5nbGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jZW50ZXJpbmdNYXRyaXgoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlc3Ryb3kgb3IgdW5zZWxlY3QgdHJpYW5nbGVzXHJcbiAgICovXHJcbiAgZGVzdHJveVRyaWFuZ2xlKCkge1xyXG4gICAgbGV0IGlzVW5zZWxlY3QgPSB0aGlzLnNlbGVjdGVkVHJpYW5nbGVzLmxlbmd0aCA8IHRoaXMubWluVHJpYW5nbGVzRGVzdHJveTtcclxuXHJcbiAgICBpZiAoIWlzVW5zZWxlY3QpIHtcclxuICAgICAgdGhpcy51cGRhdGVTY29yZShNYXRoLnBvdyh0aGlzLnNlbGVjdGVkVHJpYW5nbGVzLmxlbmd0aCwgMi4xNSkgKiAxMCk7XHJcbiAgICAgIHRoaXMuaGludFRpbWVyLnN0b3AoZmFsc2UpO1xyXG4gICAgICB0aGlzLmhpbnRUaW1lci5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHdoaWxlICh0aGlzLnNlbGVjdGVkVHJpYW5nbGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgbGV0IHRyaWFuZ2xlID0gdGhpcy5zZWxlY3RlZFRyaWFuZ2xlcy5wb3AoKTtcclxuICAgICAgaWYgKGlzVW5zZWxlY3QpIHtcclxuICAgICAgICB0cmlhbmdsZS51bnNlbGVjdCgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRyaWFuZ2xlLmRlbGV0ZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFpc1Vuc2VsZWN0KSB7XHJcbiAgICAgIGxldCB0aW1lckV4aXN0TW92ZSA9IHRoaXMuZ2FtZS50aW1lLmNyZWF0ZSgpO1xyXG5cclxuICAgICAgdGltZXJFeGlzdE1vdmUuYWRkKFxyXG4gICAgICAgIFRyaWFuZ2xlLmFuaW1hdGlvblRpbWVEZWxldGUgK1xyXG4gICAgICAgIFRyaWFuZ2xlLmFuaW1hdGlvblRpbWVSZWNvdmVyLFxyXG4gICAgICAgIHRoaXMucHJvY2Vzc1Bvc2l0aW9uLFxyXG4gICAgICAgIHRoaXNcclxuICAgICAgKTtcclxuXHJcbiAgICAgIHRpbWVyRXhpc3RNb3ZlLnN0YXJ0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZWNvdmVyVHJpYW5nbGUodHJpYW5nbGUpIHtcclxuICAgIHRyaWFuZ2xlLnJlY292ZXIodGhpcy5nYW1lLnJuZC5waWNrKHRoaXMuY29sb3JTZXRzKSk7XHJcbiAgfVxyXG5cclxuICBzZWxlY3RUcmlhbmdsZSh0cmlhbmdsZSwgcG9pbnQpIHtcclxuICAgIGlmICghdGhpcy5nYW1lLmlucHV0LmFjdGl2ZVBvaW50ZXIuaXNEb3duKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5zZWxlY3RlZFRyaWFuZ2xlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgdHJpYW5nbGUuc2VsZWN0KCk7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRUcmlhbmdsZXMucHVzaCh0cmlhbmdsZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsZXQgbGFzdFNlbGVjdGVkVHJpYW5nbGUgPSB0aGlzLnNlbGVjdGVkVHJpYW5nbGVzW3RoaXMuc2VsZWN0ZWRUcmlhbmdsZXMubGVuZ3RoIC0gMV07XHJcbiAgICAgIGxldCBwcmVMYXN0U2VsZWN0ZWRUcmlhbmdsZSA9IHRoaXMuc2VsZWN0ZWRUcmlhbmdsZXNbdGhpcy5zZWxlY3RlZFRyaWFuZ2xlcy5sZW5ndGggLSAyXTtcclxuXHJcbiAgICAgIGlmICh0cmlhbmdsZS5zZWxlY3RlZCAmJiB0cmlhbmdsZSA9PT0gcHJlTGFzdFNlbGVjdGVkVHJpYW5nbGUpIHtcclxuICAgICAgICBsYXN0U2VsZWN0ZWRUcmlhbmdsZS51bnNlbGVjdCgpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUcmlhbmdsZXMucG9wKCk7XHJcbiAgICAgIH0gZWxzZSBpZiAoIXRyaWFuZ2xlLnNlbGVjdGVkICYmXHJcbiAgICAgICAgdGhpcy5jYW5UcmlhbmdsZUxpbmsobGFzdFNlbGVjdGVkVHJpYW5nbGUsIHRyaWFuZ2xlKSAmJlxyXG4gICAgICAgIGxhc3RTZWxlY3RlZFRyaWFuZ2xlLmNvbG9yU2V0ID09PSB0cmlhbmdsZS5jb2xvclNldFxyXG4gICAgICApIHtcclxuICAgICAgICB0cmlhbmdsZS5zZWxlY3QoKTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkVHJpYW5nbGVzLnB1c2godHJpYW5nbGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVjayB0cmlhbmdsZXMgbGlua1xyXG4gICAqL1xyXG4gIGNhblRyaWFuZ2xlTGluayh0cjEsIHRyMikge1xyXG4gICAgaWYgKHRyMS5tYXRyaXhQb3MueSA9PT0gdHIyLm1hdHJpeFBvcy55KSB7XHJcbiAgICAgIGlmICh0cjEubWF0cml4UG9zLnggKyAxID09PSB0cjIubWF0cml4UG9zLnggfHxcclxuICAgICAgICB0cjEubWF0cml4UG9zLnggLSAxID09PSB0cjIubWF0cml4UG9zLngpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0cjEubWF0cml4UG9zLnggPT09IHRyMi5tYXRyaXhQb3MueCkge1xyXG4gICAgICBpZiAodHIxLm1hdHJpeFBvcy54ICUgMiA9PT0gMCkge1xyXG4gICAgICAgIGlmICh0cjEuaXNSb3RhdGVkICYmIHRyMi5tYXRyaXhQb3MueSA9PT0gdHIxLm1hdHJpeFBvcy55IC0gMSkge1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIGlmICghdHIxLmlzUm90YXRlZCAmJiB0cjIubWF0cml4UG9zLnkgPT09IHRyMS5tYXRyaXhQb3MueSArIDEpIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoIXRyMS5pc1JvdGF0ZWQgJiYgdHIyLm1hdHJpeFBvcy55ID09PSB0cjEubWF0cml4UG9zLnkgKyAxKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRyMS5pc1JvdGF0ZWQgJiYgdHIyLm1hdHJpeFBvcy55ID09PSB0cjEubWF0cml4UG9zLnkgLSAxKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgc2NvcmUgb24gc3RhZ2VcclxuICAgKi9cclxuICBjcmVhdGVTY29yZUxhYmxlKCkge1xyXG4gICAgY29uc3QgcmFuZG9tQ29sb3JTZXQgPSB0aGlzLmdhbWUucm5kLnBpY2sodGhpcy5jb2xvclNldHMpO1xyXG4gICAgY29uc3QgY29sb3IgPSAnI2ZmZic7IC8vICsgUGhhc2VyLkNvbG9yLmNvbXBvbmVudFRvSGV4KHJhbmRvbUNvbG9yU2V0LmdldExhc3RDb2xvcigpKTtcclxuICAgIGNvbnN0IG1hcmdpblJpZ2h0ID0gMTU7XHJcbiAgICBjb25zdCBtYXJnaW5Ub3AgPSAxNTtcclxuXHJcbiAgICBjb25zdCBzdHlsZSA9IHtcclxuICAgICAgZm9udDogJzQycHggT3BlbiBTYW5zJyxcclxuICAgICAgZm9udFN0eWxlOiAnaXRhbGljJyxcclxuICAgICAgZmlsbDogY29sb3JcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNjb3JlTGFibGUgPSBuZXcgRW5naW5lLlNjb3JlTGFibGUoXHJcbiAgICAgIHRoaXMuZ2FtZSxcclxuICAgICAgdGhpcy5nYW1lLndpZHRoIC0gbWFyZ2luUmlnaHQsXHJcbiAgICAgIG1hcmdpblRvcCxcclxuICAgICAgMCxcclxuICAgICAgc3R5bGVcclxuICAgICk7XHJcbiAgICB0aGlzLnNjb3JlTGFibGUuYW5jaG9yLnNldFRvKDEsIDApO1xyXG5cclxuICAgIC8vIFRPRE86IFRFTVBcclxuICAgIHRoaXMuc2NvcmVMYWJsZS5pbnB1dEVuYWJsZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5zY29yZUxhYmxlLmV2ZW50cy5vbklucHV0RG93bi5hZGQodGhpcy50b2dnbGVGdWxsU2NyZWVuLCB0aGlzKTtcclxuICB9XHJcblxyXG4gIGluaXRpYWxpemF0aW9uRnVsbFNjcmVlbigpIHtcclxuICAgIHRoaXMuZ2FtZS5zY2FsZS5mdWxsU2NyZWVuU2NhbGVNb2RlID0gUGhhc2VyLlNjYWxlTWFuYWdlci5SRVNJWkU7XHJcbiAgICB0aGlzLmdhbWUuc2NhbGUub25GdWxsU2NyZWVuQ2hhbmdlXHJcbiAgICAgIC5hZGQodGhpcy5yZXNpemVTY3JlZW4sIHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlRnVsbFNjcmVlbigpIHtcclxuICAgIGlmICh0aGlzLmdhbWUuc2NhbGUuaXNGdWxsU2NyZWVuKSB7XHJcbiAgICAgIHRoaXMuZ2FtZS5zY2FsZS5zdG9wRnVsbFNjcmVlbigpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5nYW1lLnNjYWxlLnN0YXJ0RnVsbFNjcmVlbigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlU2NvcmUodmFsKSB7XHJcbiAgICB2YWwgPSBNYXRoLnJvdW5kKHZhbCk7XHJcblxyXG4gICAgdGhpcy5zY29yZSArPSB2YWw7XHJcbiAgICB0aGlzLnNjb3JlTGFibGUuY2hhbmdlVmFsdWUodGhpcy5zY29yZSk7XHJcbiAgfVxyXG5cclxuICByZXNpemVTY3JlZW4oKSB7XHJcbiAgICB0aGlzLnNjb3JlTGFibGUueCA9IHRoaXMuZ2FtZS53aWR0aCAtIDE1O1xyXG4gICAgdGhpcy5zY29yZUxhYmxlLnkgPSAxNTtcclxuXHJcbiAgICB0aGlzLnVuaXZlcnNlLnggPSB0aGlzLmdhbWUud2lkdGggLyAyO1xyXG4gICAgdGhpcy51bml2ZXJzZS55ID0gdGhpcy5nYW1lLmhlaWdodCAvIDI7XHJcblxyXG4gICAgdGhpcy5jZW50ZXJpbmdNYXRyaXgoKTtcclxuICB9XHJcblxyXG4gIGNlbnRlcmluZ01hdHJpeCgpIHtcclxuICAgIGNvbnN0IGhhbGZUcmlhbmdsZVNpemUgPSBFbmdpbmUuVHJpYW5nbGUuc2l6ZSAvIDI7XHJcblxyXG4gICAgdGhpcy50cmlhbmdsZUdyb3VwLnggPSB0aGlzLmdhbWUud2lkdGggLyAyIC0gdGhpcy50cmlhbmdsZUdyb3VwLndpZHRoIC8gMiArIGhhbGZUcmlhbmdsZVNpemU7XHJcbiAgICB0aGlzLnRyaWFuZ2xlR3JvdXAueSA9IHRoaXMuZ2FtZS5oZWlnaHQgLyAyIC0gdGhpcy50cmlhbmdsZUdyb3VwLmhlaWdodCAvIDIgKyBoYWxmVHJpYW5nbGVTaXplO1xyXG4gIH1cclxuXHJcbiAgcmVidWlsZE1hcCgpIHtcclxuICAgIGNvbnN0IHRpbWVEZWxheSA9IDUwO1xyXG5cclxuICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy50cmlhbmdsZU1hdHJpeFdpZHRoOyB4KyspIHtcclxuICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLnRyaWFuZ2xlTWF0cml4SGVpZ2h0OyB5KyspIHtcclxuICAgICAgICBsZXQgdHJpYW5nbGUgPSB0aGlzLnRyaWFuZ2xlc01hdHJpeFt4XVt5XTtcclxuICAgICAgICBsZXQgcmFuZG9tQ29sb3JTZXQgPSB0aGlzLmdhbWUucm5kLnBpY2sodGhpcy5jb2xvclNldHMpO1xyXG5cclxuICAgICAgICB0cmlhbmdsZS51cGRhdGVDb2xvcihyYW5kb21Db2xvclNldCwgeCAqIHRpbWVEZWxheSArIHkgKiB0aW1lRGVsYXkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcm9jZXNzUG9zaXRpb24oKSB7XHJcbiAgICBpZiAoIXRoaXMuZ2V0U29tZUNvbWJpbmF0aW9uKCkubGVuZ3RoKSB7XHJcbiAgICAgIGNvbnN0IGRlbGF5RGVzdHJveSA9IDUwMDA7XHJcbiAgICAgIGxldCB0aW1lciA9IHRoaXMuZ2FtZS50aW1lLmNyZWF0ZSgpO1xyXG5cclxuICAgICAgdGltZXIuYWRkKGRlbGF5RGVzdHJveSwgdGhpcy5yZWJ1aWxkTWFwLCB0aGlzKTtcclxuICAgICAgdGltZXIuc3RhcnQoMCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRIaW50VHJpYW5nbGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5nYW1lLnJuZC5waWNrKHRoaXMuZ2V0U29tZUNvbWJpbmF0aW9uKCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGV4aXN0aW5nIGNvbWJpbmF0aW9uLCBpZiB3ZSBoYXZlbid0IGV4aXN0IG1vdmUsIHRoZW4gcmV0dXJuIGVtcHR5IGFycmF5XHJcbiAgICovXHJcbiAgZ2V0U29tZUNvbWJpbmF0aW9uKCkge1xyXG4gICAgbGV0IHVzZWRDZWxsID0gW107XHJcbiAgICBsZXQgdHJpYW5nbGVzID0gW107XHJcblxyXG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLnRyaWFuZ2xlTWF0cml4V2lkdGg7IHgrKykge1xyXG4gICAgICB1c2VkQ2VsbFt4XSA9IFtdO1xyXG4gICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMudHJpYW5nbGVNYXRyaXhIZWlnaHQ7IHkrKykge1xyXG4gICAgICAgIHVzZWRDZWxsW3hdW3ldID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMudHJpYW5nbGVNYXRyaXhXaWR0aDsgeCsrKSB7XHJcbiAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy50cmlhbmdsZU1hdHJpeEhlaWdodDsgeSsrKSB7XHJcbiAgICAgICAgaWYgKCF1c2VkQ2VsbFt4XVt5XSAmJiB0aGlzLmhhc0NvbWJpbmF0aW9uKHVzZWRDZWxsLCB0aGlzLnRyaWFuZ2xlc01hdHJpeFt4XVt5XS5jb2xvclNldCwgeCwgeSwgMSkpIHtcclxuICAgICAgICAgIHRyaWFuZ2xlcy5wdXNoKHRoaXMudHJpYW5nbGVzTWF0cml4W3hdW3ldKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJpYW5nbGVzO1xyXG4gIH1cclxuXHJcbiAgaGFzQ29tYmluYXRpb24odXNlZENlbGwsIGNvbG9yU2V0LCB4LCB5LCBjbnQpIHtcclxuICAgIGlmIChjb2xvclNldCAhPSB0aGlzLnRyaWFuZ2xlc01hdHJpeFt4XVt5XS5jb2xvclNldCB8fCB1c2VkQ2VsbFt4XVt5XSkge1xyXG4gICAgICByZXR1cm4gKGNudCA+IHRoaXMubWluVHJpYW5nbGVzRGVzdHJveSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXNlZENlbGxbeF1beV0gPSB0cnVlO1xyXG4gICAgaWYgKHggKyAxIDwgdGhpcy50cmlhbmdsZU1hdHJpeFdpZHRoKSB7XHJcbiAgICAgIGlmICh0aGlzLmhhc0NvbWJpbmF0aW9uKHVzZWRDZWxsLCBjb2xvclNldCwgeCArIDEsIHksIGNudCArIDEpKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoeCAtIDEgPj0gMCkge1xyXG4gICAgICBpZiAodGhpcy5oYXNDb21iaW5hdGlvbih1c2VkQ2VsbCwgY29sb3JTZXQsIHggLSAxLCB5LCBjbnQgKyAxKSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMudHJpYW5nbGVzTWF0cml4W3hdW3ldLmlzUm90YXRlZCkge1xyXG4gICAgICBpZiAoeSAtIDEgPj0gMCkge1xyXG4gICAgICAgIGlmICh0aGlzLmhhc0NvbWJpbmF0aW9uKHVzZWRDZWxsLCBjb2xvclNldCwgeCwgeSAtIDEsIGNudCArIDEpKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh5ICsgMSA8IHRoaXMudHJpYW5nbGVNYXRyaXhIZWlnaHQpIHtcclxuICAgICAgICBpZiAodGhpcy5oYXNDb21iaW5hdGlvbih1c2VkQ2VsbCwgY29sb3JTZXQsIHgsIHkgKyAxLCBjbnQgKyAxKSkge1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufVxyXG5cclxuRW5naW5lLkdhbWUgPSBHYW1lO1xyXG4iLG51bGwsIkVuZ2luZS5nYW1lID0gbmV3IFBoYXNlci5HYW1lKEVuZ2luZS5tYXhXaWR0aCwgRW5naW5lLm1heEhlaWdodCwgUGhhc2VyLkFVVE8pO1xyXG5cclxuRW5naW5lLmdhbWUuc3RhdGUuYWRkKCdCb290JywgRW5naW5lLkJvb3QpO1xyXG5FbmdpbmUuZ2FtZS5zdGF0ZS5hZGQoJ0xvYWRlcicsIEVuZ2luZS5Mb2FkZXIpO1xyXG4vLyBFbmdpbmUuZ2FtZS5zdGF0ZS5hZGQoJ01lbnUnLCBFbmdpbmUuTWVudSk7XHJcbkVuZ2luZS5nYW1lLnN0YXRlLmFkZCgnR2FtZScsIEVuZ2luZS5HYW1lKTtcclxuLy8gRW5naW5lLmdhbWUuc3RhdGUuYWRkKCdTY29yZUJvYXJkJywgRW5naW5lLlNjb3JlQm9hcmQpO1xyXG5cclxuRW5naW5lLmdhbWUuc3RhdGUuc3RhcnQoJ0Jvb3QnKTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
