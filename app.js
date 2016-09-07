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
  triangle: 'triangle'
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

      this.generateTriangle();
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
  }, {
    key: 'generateTriangle',
    value: function generateTriangle() {
      var size = 255;

      var bitmap = new Phaser.BitmapData(size, size);

      bitmap.ctx.beginPath();
      bitmap.ctx.fillStyle = 'white';
      bitmap.ctx.moveTo(0, size);
      bitmap.ctx.lineTo(size / 2, 0);
      bitmap.ctx.lineTo(size, size);
      bitmap.ctx.lineTo(0, size);
      bitmap.ctx.fill();

      this.game.cache.addBitmapData(Engine.keys.triangle, bitmap);
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

      this.forcePortrait = true;

      window.test = this.existMove.bind(this);
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
    key: 'existMove',
    value: function existMove() {
      for (var y = 0; y < this.triangleMatrixHeight; y++) {
        for (var x = 0; x < this.triangleMatrixWidth; x++) {
          var result = this.compareCombinations(x, y);

          if (result) {
            return true;
          }
        }
      }

      return false;
    }
  }, {
    key: 'compareCombinations',
    value: function compareCombinations(x, y) {
      var triangle = this.trianglesMatrix[x][y];
      var summ = 1;

      if (triangle.isRotated) {
        var tr1 = x - 1 < 0 ? { colorSet: null } : this.trianglesMatrix[x - 1][y];
        var tr2 = x + 1 > this.triangleMatrixWidth - 1 ? { colorSet: null } : this.trianglesMatrix[x + 1][y];

        summ += triangle.colorSet === tr1.colorSet ? 1 : 0;
        summ += triangle.colorSet === tr2.colorSet ? 1 : 0;
      } else {
        var _tr = x - 1 < 0 ? { colorSet: null } : this.trianglesMatrix[x - 1][y];
        var _tr2 = x + 1 > this.triangleMatrixWidth - 1 ? { colorSet: null } : this.trianglesMatrix[x + 1][y];
        var tr3 = y + 1 > this.triangleMatrixHeight - 1 ? { colorSet: null } : this.trianglesMatrix[x][y + 1];

        if (tr3.colorSet === triangle.colorSet) {
          summ += 1;

          var tr4 = x - 1 < 0 ? { colorSet: null } : this.trianglesMatrix[x - 1][y + 1];
          var tr5 = x + 1 > this.triangleMatrixWidth - 1 ? { colorSet: null } : this.trianglesMatrix[x + 1][y + 1];

          summ += triangle.colorSet === tr4.colorSet ? 1 : 0;
          summ += triangle.colorSet === tr5.colorSet ? 1 : 0;
        }

        summ += triangle.colorSet === _tr.colorSet ? 1 : 0;
        summ += triangle.colorSet === _tr2.colorSet ? 1 : 0;
      }

      return summ > this.minTrianglesDestroy - 1;
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
      if (!this.existMove()) {
        var delayDestroy = 5000;
        var timer = this.game.time.create();

        timer.add(delayDestroy, this.rebuildMap, this);
        timer.start(0);
      }
    }
  }, {
    key: 'getHintTriangle',
    value: function getHintTriangle() {
      var allResults = [];
      for (var y = 0; y < this.triangleMatrixHeight; y++) {
        for (var x = 0; x < this.triangleMatrixWidth; x++) {
          var combination = this.compareCombinations(x, y);

          if (combination) {
            allResults.push(this.trianglesMatrix[x][y]);
          }
        }
      }

      return this.game.rnd.pick(allResults);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS5qcyIsImJvb3QuanMiLCJsb2FkZXIuanMiLCJtZW51LmpzIiwiY29sb3JzZXQuanMiLCJzY29yZWxhYmxlLmpzIiwidHJpYW5nbGUuanMiLCJ1bml2ZXJzZS5qcyIsImdhbWUuanMiLCJzY29yZWJvYXJkLmpzIiwiYXBwLmpzIl0sIm5hbWVzIjpbIkVuZ2luZSIsIm1pbldpZHRoIiwibWluSGVpZ2h0IiwibWF4V2lkdGgiLCJtYXhIZWlnaHQiLCJrZXlzIiwidHJpYW5nbGUiLCJCb290IiwiZ2FtZSIsInN0YWdlIiwiZGlzYWJsZVZpc2liaWxpdHlDaGFuZ2UiLCJzY2FsZSIsInBhZ2VBbGlnbkhvcml6b250YWxseSIsInBhZ2VBbGlnblZlcnRpY2FsbHkiLCJzdGF0ZSIsInN0YXJ0IiwiUGhhc2VyIiwiU3RhdGUiLCJMb2FkZXIiLCJiYWNrZ3JvdW5kQ29sb3IiLCJhZGRQcm9ncmVzc0xhYmxlIiwibG9hZCIsIm9uRmlsZUNvbXBsZXRlIiwiYWRkIiwicmVmcmVzaFByb2dyZXNzIiwiZ2VuZXJhdGVUcmlhbmdsZSIsIm51bWJlck9mR3JhZGF0aW9uIiwic3R5bGUiLCJmb250IiwiZmlsbCIsInByb2dyZXNzTGFibGUiLCJ0ZXh0Iiwid29ybGQiLCJjZW50ZXJYIiwiY2VudGVyWSIsImFuY2hvciIsInNldFRvIiwicHJvZ3Jlc3MiLCJjYWNoZUtleSIsInN1Y2Nlc3MiLCJ0b3RhbExvYWRlZCIsInRvdGFsRmlsZXMiLCJzaXplIiwiYml0bWFwIiwiQml0bWFwRGF0YSIsImN0eCIsImJlZ2luUGF0aCIsImZpbGxTdHlsZSIsIm1vdmVUbyIsImxpbmVUbyIsImNhY2hlIiwiYWRkQml0bWFwRGF0YSIsIkNvbG9yU2V0IiwiZ3JhZGl0aW9uIiwicm5kIiwicGljayIsIm51bWJlciIsImxlbmd0aCIsIkdSQURBVElPTlMiLCJTY29yZUxhYmxlIiwieCIsInkiLCJzY29yZSIsIk1hdGgiLCJyb3VuZCIsImV4aXN0aW5nIiwidHdlZW5zIiwicmVtb3ZlIiwidHdlZW4iLCJ0byIsImFuaW1hdGlvbkNoYW5nZVZhbCIsIm9uVXBkYXRlQ2FsbGJhY2siLCJvbkNvbXBsZXRlIiwiVGV4dCIsIlRyaWFuZ2xlIiwiaXNSb3RhdGVkIiwiY29sb3JTZXQiLCJtYXRyaXhQb3NpdGlvbiIsImdldEJpdG1hcERhdGEiLCJ3aWR0aCIsImhlaWdodCIsInRpbnQiLCJnZXRSYW5kb21Db2xvciIsIm1hdHJpeFBvcyIsImlucHV0RW5hYmxlZCIsImlucHV0IiwicGl4ZWxQZXJmZWN0T3ZlciIsInBpeGVsUGVyZmVjdENsaWNrIiwiZXZlbnRzIiwiZGVsZXRlQ29tcGxldGUiLCJTaWduYWwiLCJzZWxlY3RlZCIsInJvdGF0aW9uIiwiUEkiLCJhZGRDaGlsZCIsImFuaW1hdGlvblRpbWVTZWxlY3QiLCJhY3RpdmVQb2ludGVyIiwiaXNEb3duIiwiYWxwaGEiLCJhbmltYXRpb25UaW1lRGVsZXRlIiwiZGlzcGF0Y2giLCJhbmltYXRpb25UaW1lUmVjb3ZlciIsIkVhc2luZyIsIkJvdW5jZSIsIk91dCIsImRlbGF5IiwiYW5pbWF0aW9uVGltZSIsImhpZGVUd2VlbiIsInNob3dUd2VlbiIsImNoYWluIiwibGFzdENvbG9yIiwiYmxpbmtzIiwib25TdGFydCIsInB1c2giLCJsYXN0QmxpbmsiLCJTcHJpdGUiLCJVbml2ZXJzZSIsIm1heFNpemUiLCJpIiwiYmV0d2VlbiIsInJlY3QiLCJzcHJpdGUiLCJHYW1lIiwid2luZG93IiwiZ2ciLCJjb2xvclNldHMiLCJtYXJnaW5Ub3AiLCJtYXJnaW5MZWZ0IiwibWluVHJpYW5nbGVzRGVzdHJveSIsInRyaWFuZ2xlc01hdHJpeCIsInNlbGVjdGVkVHJpYW5nbGVzIiwidHJpYW5nbGVNYXRyaXhXaWR0aCIsInRyaWFuZ2xlTWF0cml4SGVpZ2h0IiwiY3JlYXRlVW5pdmVyc2UiLCJjcmVhdGVHcmFkYXRpb25zIiwidHJpYW5nbGVHcm91cCIsImdyb3VwIiwic2tldGNoIiwiaW5pdEV2ZW50cyIsImNyZWF0ZVNjb3JlTGFibGUiLCJpbml0aWFsaXphdGlvbkZ1bGxTY3JlZW4iLCJjcmVhdGVIaW50VGltZXIiLCJmb3JjZVBvcnRyYWl0IiwidGVzdCIsImV4aXN0TW92ZSIsImJpbmQiLCJ0aW1lIiwiYWR2YW5jZWRUaW1pbmciLCJ1bml2ZXJzZSIsImRlYnVnIiwiZnBzIiwiYWxsR3JhZGF0aW9uIiwiQXJyYXlVdGlscyIsInNodWZmbGUiLCJjcmVhdGUiLCJoaW50VGltZW91dCIsImhpbnRUaW1lciIsImxvb3AiLCJ2aXN1YWxpc2F0aW9uSGludCIsImdldEhpbnRUcmlhbmdsZSIsInVuZGVmaW5lZCIsImhpbnRNZSIsIm9uVXAiLCJkZXN0cm95VHJpYW5nbGUiLCJwb3NYIiwicG9zWSIsIm9uSW5wdXRPdmVyIiwic2VsZWN0VHJpYW5nbGUiLCJvbklucHV0RG93biIsInJlY292ZXJUcmlhbmdsZSIsImNlbnRlcmluZ01hdHJpeCIsImlzVW5zZWxlY3QiLCJ1cGRhdGVTY29yZSIsInBvdyIsInN0b3AiLCJwb3AiLCJ1bnNlbGVjdCIsImRlbGV0ZSIsInRpbWVyRXhpc3RNb3ZlIiwicHJvY2Vzc1Bvc2l0aW9uIiwicmVjb3ZlciIsInBvaW50Iiwic2VsZWN0IiwibGFzdFNlbGVjdGVkVHJpYW5nbGUiLCJwcmVMYXN0U2VsZWN0ZWRUcmlhbmdsZSIsImNhblRyaWFuZ2xlTGluayIsInRyMSIsInRyMiIsInJhbmRvbUNvbG9yU2V0IiwiY29sb3IiLCJtYXJnaW5SaWdodCIsImZvbnRTdHlsZSIsInNjb3JlTGFibGUiLCJ0b2dnbGVGdWxsU2NyZWVuIiwiZnVsbFNjcmVlblNjYWxlTW9kZSIsIlNjYWxlTWFuYWdlciIsIlJFU0laRSIsIm9uRnVsbFNjcmVlbkNoYW5nZSIsInJlc2l6ZVNjcmVlbiIsImlzRnVsbFNjcmVlbiIsInN0b3BGdWxsU2NyZWVuIiwic3RhcnRGdWxsU2NyZWVuIiwidmFsIiwiY2hhbmdlVmFsdWUiLCJoYWxmVHJpYW5nbGVTaXplIiwicmVzdWx0IiwiY29tcGFyZUNvbWJpbmF0aW9ucyIsInN1bW0iLCJ0cjMiLCJ0cjQiLCJ0cjUiLCJ0aW1lRGVsYXkiLCJ1cGRhdGVDb2xvciIsImRlbGF5RGVzdHJveSIsInRpbWVyIiwicmVidWlsZE1hcCIsImFsbFJlc3VsdHMiLCJjb21iaW5hdGlvbiIsIkFVVE8iXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsU0FBUztBQUNYQyxZQUFVLEdBREM7QUFFWEMsYUFBVyxHQUZBO0FBR1hDLFlBQVUsSUFIQztBQUlYQyxhQUFXO0FBSkEsQ0FBYjs7QUFPQTs7OztBQUlBSixPQUFPSyxJQUFQLEdBQWM7QUFDWkMsWUFBVTtBQURFLENBQWQ7Ozs7Ozs7Ozs7O0lDWE1DOzs7QUFDSixrQkFBYztBQUFBOztBQUFBO0FBRWI7Ozs7OEJBRVMsQ0FFVDs7OzZCQUVRO0FBQ1AsV0FBS0MsSUFBTCxDQUFVQyxLQUFWLENBQWdCQyx1QkFBaEIsR0FBMEMsSUFBMUM7QUFDQSxXQUFLQyxLQUFMLENBQVdDLHFCQUFYLEdBQW1DLElBQW5DO0FBQ0EsV0FBS0QsS0FBTCxDQUFXRSxtQkFBWCxHQUFpQyxJQUFqQztBQUNBLFdBQUtDLEtBQUwsQ0FBV0MsS0FBWCxDQUFpQixRQUFqQjtBQUNEOzs7O0VBZGdCQyxPQUFPQzs7QUFpQjFCakIsT0FBT08sSUFBUCxHQUFjQSxJQUFkOzs7Ozs7Ozs7OztJQ2pCTVc7OztBQUNKLG9CQUFjO0FBQUE7O0FBQUE7QUFFYjs7Ozs4QkFFUztBQUNSLFdBQUtWLElBQUwsQ0FBVUMsS0FBVixDQUFnQlUsZUFBaEIsR0FBa0MsTUFBbEM7QUFDQSxXQUFLQyxnQkFBTDs7QUFFQSxXQUFLQyxJQUFMLENBQVVDLGNBQVYsQ0FBeUJDLEdBQXpCLENBQTZCLEtBQUtDLGVBQWxDLEVBQW1ELElBQW5EOztBQUVBLFdBQUtDLGdCQUFMO0FBQ0Q7Ozs2QkFFUTtBQUNQLFVBQUlDLG9CQUFvQixDQUF4QjtBQUNBLFdBQUtaLEtBQUwsQ0FBV0MsS0FBWCxDQUFpQixNQUFqQixFQUF5QixJQUF6QixFQUErQixLQUEvQixFQUFzQ1csaUJBQXRDO0FBQ0Q7Ozt1Q0FFa0I7QUFDakIsVUFBSUMsUUFBUTtBQUNWQyxjQUFNLGdCQURJO0FBRVZDLGNBQU07QUFGSSxPQUFaOztBQUtBLFdBQUtDLGFBQUwsR0FBcUIsS0FBS1AsR0FBTCxDQUFTUSxJQUFULENBQWMsS0FBS3ZCLElBQUwsQ0FBVXdCLEtBQVYsQ0FBZ0JDLE9BQTlCLEVBQXVDLEtBQUt6QixJQUFMLENBQVV3QixLQUFWLENBQWdCRSxPQUF2RCxFQUFnRSxtQkFBaEUsRUFBcUZQLEtBQXJGLENBQXJCO0FBQ0EsV0FBS0csYUFBTCxDQUFtQkssTUFBbkIsQ0FBMEJDLEtBQTFCLENBQWdDLEdBQWhDO0FBQ0Q7OztvQ0FFZUMsVUFBVUMsVUFBVUMsU0FBU0MsYUFBYUMsWUFBWTtBQUNwRSxXQUFLWCxhQUFMLENBQW1CQyxJQUFuQixnQkFBcUNNLFFBQXJDLFdBQW1ERyxXQUFuRCxTQUFrRUMsVUFBbEU7QUFDRDs7O3VDQUVrQjtBQUNqQixVQUFNQyxPQUFPLEdBQWI7O0FBRUEsVUFBSUMsU0FBUyxJQUFJM0IsT0FBTzRCLFVBQVgsQ0FBc0JGLElBQXRCLEVBQTRCQSxJQUE1QixDQUFiOztBQUVBQyxhQUFPRSxHQUFQLENBQVdDLFNBQVg7QUFDQUgsYUFBT0UsR0FBUCxDQUFXRSxTQUFYLEdBQXVCLE9BQXZCO0FBQ0FKLGFBQU9FLEdBQVAsQ0FBV0csTUFBWCxDQUFrQixDQUFsQixFQUFxQk4sSUFBckI7QUFDQUMsYUFBT0UsR0FBUCxDQUFXSSxNQUFYLENBQWtCUCxPQUFPLENBQXpCLEVBQTRCLENBQTVCO0FBQ0FDLGFBQU9FLEdBQVAsQ0FBV0ksTUFBWCxDQUFrQlAsSUFBbEIsRUFBd0JBLElBQXhCO0FBQ0FDLGFBQU9FLEdBQVAsQ0FBV0ksTUFBWCxDQUFrQixDQUFsQixFQUFxQlAsSUFBckI7QUFDQUMsYUFBT0UsR0FBUCxDQUFXaEIsSUFBWDs7QUFFQSxXQUFLckIsSUFBTCxDQUFVMEMsS0FBVixDQUFnQkMsYUFBaEIsQ0FBOEJuRCxPQUFPSyxJQUFQLENBQVlDLFFBQTFDLEVBQW9EcUMsTUFBcEQ7QUFDRDs7OztFQS9Da0IzQixPQUFPQzs7QUFrRDVCakIsT0FBT2tCLE1BQVAsR0FBZ0JBLE1BQWhCO0FDbERBOzs7Ozs7O0lDQU1rQztBQUNKOzs7O0FBSUEsb0JBQVlDLFNBQVosRUFBdUI7QUFBQTs7QUFDckIsU0FBS0EsU0FBTCxHQUFpQkEsU0FBakI7QUFDRDs7QUFFRDs7Ozs7Ozs7cUNBSWlCO0FBQ2YsYUFBT3JELE9BQU9RLElBQVAsQ0FBWThDLEdBQVosQ0FBZ0JDLElBQWhCLENBQXFCLEtBQUtGLFNBQTFCLENBQVA7QUFDRDs7QUFFRDs7Ozs7O2dDQUdZRyxRQUFRO0FBQ2xCLGFBQU8sS0FBS0gsU0FBTCxDQUFlRyxNQUFmLENBQVA7QUFDRDs7O21DQUVjO0FBQ2IsYUFBTyxLQUFLSCxTQUFMLENBQWUsS0FBS0EsU0FBTCxDQUFlSSxNQUFmLEdBQXdCLENBQXZDLENBQVA7QUFDRDs7Ozs7O0FBR0hMLFNBQVNNLFVBQVQsR0FBc0I7QUFDcEI7QUFDQSxDQUNFLFFBREYsRUFFRSxRQUZGLEVBR0UsUUFIRixFQUlFLFFBSkYsQ0FGb0I7QUFRcEI7QUFDQSxDQUNFLFFBREYsRUFFRSxRQUZGLEVBR0UsUUFIRixFQUlFLFFBSkYsQ0FUb0I7QUFlcEI7QUFDQSxDQUNFLFFBREYsRUFFRSxRQUZGLEVBR0UsUUFIRixFQUlFLFFBSkYsQ0FoQm9CO0FBc0JwQjtBQUNBLENBQ0UsUUFERixFQUVFLFFBRkYsRUFHRSxRQUhGLEVBSUUsUUFKRixDQXZCb0I7QUE2QnBCO0FBQ0EsQ0FDRSxRQURGLEVBRUUsUUFGRixFQUdFLFFBSEYsRUFJRSxRQUpGLENBOUJvQjtBQW9DcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQ0UsUUFERixFQUVFLFFBRkYsRUFHRSxRQUhGLEVBSUUsUUFKRixDQTVDb0IsQ0FBdEI7O0FBMkRBMUQsT0FBT29ELFFBQVAsR0FBa0JBLFFBQWxCOzs7Ozs7Ozs7OztJQ3hGTU87OztBQUNKLHNCQUFZbkQsSUFBWixFQUFrQm9ELENBQWxCLEVBQXFCQyxDQUFyQixFQUF3QkMsS0FBeEIsRUFBK0JuQyxLQUEvQixFQUFzQztBQUFBOztBQUFBLHdIQUM5Qm5CLElBRDhCLEVBQ3hCb0QsQ0FEd0IsRUFDckJDLENBRHFCLGNBQ1JFLEtBQUtDLEtBQUwsQ0FBV0YsS0FBWCxDQURRLEVBQ2FuQyxLQURiOztBQUdwQyxVQUFLbUMsS0FBTCxHQUFhQSxLQUFiOztBQUVBLFVBQUt0RCxJQUFMLENBQVVlLEdBQVYsQ0FBYzBDLFFBQWQ7QUFMb0M7QUFNckM7O0FBRUQ7Ozs7Ozs7O2dDQUlZSCxPQUFPO0FBQUE7O0FBQ2pCLFdBQUt0RCxJQUFMLENBQVUwRCxNQUFWLENBQWlCQyxNQUFqQixDQUF3QixJQUF4Qjs7QUFFQSxVQUFJQyxRQUFRLEtBQUs1RCxJQUFMLENBQVVlLEdBQVYsQ0FBYzZDLEtBQWQsQ0FBb0IsSUFBcEIsRUFDVEMsRUFEUyxDQUNOO0FBQ0ZQO0FBREUsT0FETSxFQUdQSCxXQUFXVyxrQkFISixFQUlUQyxnQkFKUyxDQUlRLFlBQU07QUFDdEIsZUFBS3hDLElBQUwsZUFBc0JnQyxLQUFLQyxLQUFMLENBQVcsT0FBS0YsS0FBaEIsQ0FBdEI7QUFDRCxPQU5TLEVBTVAsSUFOTyxDQUFaOztBQVFBTSxZQUFNSSxVQUFOLENBQ0dqRCxHQURILENBQ08sWUFBTTtBQUNULGVBQUtRLElBQUwsZUFBc0JnQyxLQUFLQyxLQUFMLENBQVcsT0FBS0YsS0FBaEIsQ0FBdEI7QUFDRCxPQUhIOztBQUtBTSxZQUFNckQsS0FBTjtBQUNEOzs7O0VBOUJzQkMsT0FBT3lEOztBQWlDaENkLFdBQVdXLGtCQUFYLEdBQWdDLEdBQWhDO0FBQ0F0RSxPQUFPMkQsVUFBUCxHQUFvQkEsVUFBcEI7Ozs7Ozs7Ozs7O0lDbENNZTs7O0FBRUo7Ozs7Ozs7O0FBUUEsb0JBQVlsRSxJQUFaLEVBQWtCb0QsQ0FBbEIsRUFBcUJDLENBQXJCLEVBQXdCYyxTQUF4QixFQUFtQ0MsUUFBbkMsRUFBNkNDLGNBQTdDLEVBQTZEO0FBQUE7O0FBQUEsb0hBQ3JEckUsSUFEcUQsRUFDL0NvRCxDQUQrQyxFQUM1Q0MsQ0FENEMsRUFDekM3RCxPQUFPUSxJQUFQLENBQVkwQyxLQUFaLENBQWtCNEIsYUFBbEIsQ0FBZ0M5RSxPQUFPSyxJQUFQLENBQVlDLFFBQTVDLENBRHlDOztBQUczRCxVQUFLeUUsS0FBTCxHQUFhTCxTQUFTaEMsSUFBdEI7QUFDQSxVQUFLc0MsTUFBTCxHQUFjTixTQUFTaEMsSUFBdkI7QUFDQSxVQUFLUCxNQUFMLENBQVlDLEtBQVosQ0FBa0IsR0FBbEI7QUFDQSxVQUFLd0MsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxVQUFLSyxJQUFMLEdBQVksTUFBS0wsUUFBTCxDQUFjTSxjQUFkLEVBQVo7O0FBRUE7Ozs7QUFJQSxVQUFLQyxTQUFMLEdBQWlCTixjQUFqQjs7QUFFQSxVQUFLTyxZQUFMLEdBQW9CLElBQXBCO0FBQ0EsVUFBS0MsS0FBTCxDQUFXQyxnQkFBWCxHQUE4QixJQUE5QjtBQUNBLFVBQUtELEtBQUwsQ0FBV0UsaUJBQVgsR0FBK0IsSUFBL0I7O0FBRUEsVUFBS0MsTUFBTCxDQUFZQyxjQUFaLEdBQTZCLElBQUl6RSxPQUFPMEUsTUFBWCxFQUE3Qjs7QUFFQSxVQUFLQyxRQUFMLEdBQWdCLEtBQWhCO0FBQ0EsVUFBS2hCLFNBQUwsR0FBaUJBLFNBQWpCOztBQUVBLFFBQUlBLFNBQUosRUFBZTtBQUNiLFlBQUtpQixRQUFMLEdBQWdCN0IsS0FBSzhCLEVBQXJCO0FBQ0Q7O0FBRUQ7QUE1QjJEO0FBNkI1RDs7OztzQ0FFaUI7QUFDaEIsVUFBSTlELE9BQU8sSUFBSWYsT0FBT3lELElBQVgsQ0FDVCxLQUFLakUsSUFESSxFQUVUa0UsU0FBU2hDLElBQVQsR0FBZ0IsQ0FGUCxFQUdUZ0MsU0FBU2hDLElBQVQsR0FBZ0IsQ0FIUCxFQUlOLEtBQUt5QyxTQUFMLENBQWV2QixDQUpULFNBSWMsS0FBS3VCLFNBQUwsQ0FBZXRCLENBSjdCLEVBS1Q7QUFDRWpDLGNBQU0sZ0JBRFI7QUFFRUMsY0FBTTtBQUZSLE9BTFMsQ0FBWDs7QUFXQSxVQUFJLEtBQUs4QyxTQUFULEVBQW9CO0FBQ2xCNUMsYUFBSzZELFFBQUwsSUFBaUI3QixLQUFLOEIsRUFBdEI7QUFDQTlELGFBQUs4QixDQUFMLEdBQVMsQ0FBQzlCLEtBQUtpRCxNQUFmO0FBQ0QsT0FIRCxNQUdPO0FBQ0xqRCxhQUFLNkIsQ0FBTCxHQUFTLENBQUM3QixLQUFLZ0QsS0FBTixHQUFjLENBQXZCO0FBQ0FoRCxhQUFLOEIsQ0FBTCxHQUFTLENBQUM5QixLQUFLaUQsTUFBTixHQUFlLENBQXhCO0FBQ0Q7O0FBRUQsV0FBS2MsUUFBTCxDQUFjL0QsSUFBZDtBQUNEOzs7NkJBRVE7QUFDUCxVQUFJLENBQUMsS0FBSzRELFFBQVYsRUFBb0I7QUFDbEIsYUFBS0EsUUFBTCxHQUFnQixJQUFoQjs7QUFFQSxhQUFLbkYsSUFBTCxDQUFVZSxHQUFWLENBQWM2QyxLQUFkLENBQW9CLElBQXBCLEVBQ0dDLEVBREgsQ0FDTTtBQUNGVSxpQkFBT0wsU0FBU2hDLElBQVQsR0FBZ0IsR0FEckI7QUFFRnNDLGtCQUFRTixTQUFTaEMsSUFBVCxHQUFnQjtBQUZ0QixTQUROLEVBSUtnQyxTQUFTcUIsbUJBSmQsRUFLR2hGLEtBTEg7QUFNQztBQUNKOzs7K0JBRVU7QUFDVCxVQUFJLEtBQUs0RSxRQUFULEVBQW1COztBQUVqQixhQUFLbkYsSUFBTCxDQUFVMEQsTUFBVixDQUFpQkMsTUFBakIsQ0FBd0IsSUFBeEI7QUFDQSxhQUFLd0IsUUFBTCxHQUFnQixLQUFoQjs7QUFFQSxhQUFLbkYsSUFBTCxDQUFVZSxHQUFWLENBQWM2QyxLQUFkLENBQW9CLElBQXBCLEVBQ0dDLEVBREgsQ0FDTTtBQUNGVSxpQkFBT0wsU0FBU2hDLElBRGQ7QUFFRnNDLGtCQUFRTixTQUFTaEM7QUFGZixTQUROLEVBSUtnQyxTQUFTcUIsbUJBSmQsRUFLR2hGLEtBTEg7QUFNQztBQUNKOzs7OEJBRVE7QUFBQTs7QUFDUCxVQUFJLEtBQUtQLElBQUwsQ0FBVTZFLEtBQVYsQ0FBZ0JXLGFBQWhCLENBQThCQyxNQUFsQyxFQUEwQztBQUN4QyxhQUFLekYsSUFBTCxDQUFVZSxHQUFWLENBQWM2QyxLQUFkLENBQW9CLElBQXBCLEVBQ0dDLEVBREgsQ0FDTTtBQUNGVSxpQkFBTyxDQURMO0FBRUZDLGtCQUFRLENBRk47QUFHRmtCLGlCQUFPO0FBSEwsU0FETixFQUtLeEIsU0FBU3lCLG1CQUxkLEVBTUdwRixLQU5ILEdBT0d5RCxVQVBILENBUUdqRCxHQVJILENBUU8sWUFBTTtBQUNULGlCQUFLaUUsTUFBTCxDQUFZQyxjQUFaLENBQTJCVyxRQUEzQjtBQUNELFNBVkgsRUFVSyxJQVZMO0FBV0Q7QUFDRjs7OzRCQUVPeEIsVUFBVTtBQUNoQixXQUFLQSxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLFdBQUtLLElBQUwsR0FBWSxLQUFLTCxRQUFMLENBQWNNLGNBQWQsRUFBWjtBQUNBLFdBQUtILEtBQUwsR0FBYUwsU0FBU2hDLElBQXRCO0FBQ0EsV0FBS3NDLE1BQUwsR0FBY04sU0FBU2hDLElBQXZCO0FBQ0EsV0FBS2lELFFBQUwsR0FBZ0IsS0FBaEI7O0FBRUEsV0FBS25GLElBQUwsQ0FBVWUsR0FBVixDQUFjNkMsS0FBZCxDQUFvQixJQUFwQixFQUNHQyxFQURILENBQ007QUFDRjZCLGVBQU87QUFETCxPQUROLEVBR0t4QixTQUFTMkIsb0JBSGQsRUFHb0NyRixPQUFPc0YsTUFBUCxDQUFjQyxNQUFkLENBQXFCQyxHQUh6RCxFQUlHekYsS0FKSDtBQUtEOzs7Z0NBRVc2RCxVQUFxQjtBQUFBOztBQUFBLFVBQVg2QixLQUFXLHlEQUFILENBQUc7O0FBQy9CLFVBQU1DLGdCQUFnQixJQUF0QjtBQUNBLFdBQUs5QixRQUFMLEdBQWdCQSxRQUFoQjs7QUFFQSxVQUFJK0IsWUFBWSxLQUFLbkcsSUFBTCxDQUFVZSxHQUFWLENBQWM2QyxLQUFkLENBQW9CLElBQXBCLEVBQ2JDLEVBRGEsQ0FDVjtBQUNGNkIsZUFBTztBQURMLE9BRFUsRUFHWFEsYUFIVyxDQUFoQjs7QUFLQSxVQUFJRSxZQUFZLEtBQUtwRyxJQUFMLENBQVVlLEdBQVYsQ0FBYzZDLEtBQWQsQ0FBb0IsSUFBcEIsRUFDYkMsRUFEYSxDQUNWO0FBQ0Y2QixlQUFPO0FBREwsT0FEVSxFQUdYUSxhQUhXLENBQWhCOztBQUtBQyxnQkFDR25DLFVBREgsQ0FFR2pELEdBRkgsQ0FFTyxZQUFNO0FBQ1QsZUFBSzBELElBQUwsR0FBWSxPQUFLTCxRQUFMLENBQWNNLGNBQWQsRUFBWjtBQUNELE9BSkgsRUFJSyxJQUpMOztBQU1BeUIsZ0JBQVVGLEtBQVYsQ0FBZ0JBLEtBQWhCOztBQUVBRSxnQkFBVUUsS0FBVixDQUFnQkQsU0FBaEI7QUFDQUQsZ0JBQVU1RixLQUFWO0FBQ0Q7Ozs0QkFFTztBQUFBOztBQUNOLFVBQU0rRixZQUFZLEtBQUs3QixJQUF2QjtBQUNBLFVBQUliLFFBQVEsS0FBSzVELElBQUwsQ0FBVWUsR0FBVixDQUFjNkMsS0FBZCxDQUFvQixJQUFwQixDQUFaOztBQUVBQSxZQUFNQyxFQUFOLENBQVM7QUFDTDZCLGVBQU87QUFERixPQUFULEVBRUssR0FGTCxFQUdHMUIsVUFISCxDQUlHakQsR0FKSCxDQUlPLFlBQU07QUFDVCxlQUFLMEQsSUFBTCxHQUFZNkIsU0FBWjtBQUNBcEMsaUJBQVNxQyxNQUFULEdBQWtCLEVBQWxCO0FBQ0QsT0FQSCxFQU9LLElBUEw7O0FBU0EzQyxZQUFNNEMsT0FBTixDQUNHekYsR0FESCxDQUNPLFlBQU07QUFDVCxlQUFLMkUsS0FBTCxHQUFhLENBQWI7QUFDQSxlQUFLakIsSUFBTCxHQUFZLFFBQVo7QUFDRCxPQUpILEVBSUssSUFKTDs7QUFNQSxVQUFJUCxTQUFTcUMsTUFBVCxDQUFnQnRELE1BQWhCLEtBQTJCLENBQS9CLEVBQWtDO0FBQ2hDaUIsaUJBQVNxQyxNQUFULENBQWdCRSxJQUFoQixDQUFxQjdDLEtBQXJCO0FBQ0FBLGNBQU1yRCxLQUFOO0FBQ0QsT0FIRCxNQUdPO0FBQ0wsWUFBSW1HLFlBQVl4QyxTQUFTcUMsTUFBVCxDQUFnQnJDLFNBQVNxQyxNQUFULENBQWdCdEQsTUFBaEIsR0FBeUIsQ0FBekMsQ0FBaEI7QUFDQXlELGtCQUFVTCxLQUFWLENBQWdCekMsS0FBaEI7QUFDQU0saUJBQVNxQyxNQUFULENBQWdCRSxJQUFoQixDQUFxQjdDLEtBQXJCO0FBQ0Q7QUFDRjs7OzZCQUVRO0FBQ1AsVUFBSUEsUUFBUSxLQUFLNUQsSUFBTCxDQUFVZSxHQUFWLENBQWM2QyxLQUFkLENBQW9CLElBQXBCLEVBQ1RDLEVBRFMsQ0FDTjtBQUNGVSxlQUFPLEtBQUtBLEtBQUwsR0FBYSxJQURsQjtBQUVGQyxnQkFBUSxLQUFLQSxNQUFMLEdBQWM7QUFGcEIsT0FETSxFQUlQLEdBSk8sRUFLVFgsRUFMUyxDQUtOO0FBQ0Z1QixrQkFBVSxLQUFLQSxRQUFMLEdBQWdCN0IsS0FBSzhCLEVBQUwsR0FBVTtBQURsQyxPQUxNLEVBT1AsR0FQTyxFQVFUeEIsRUFSUyxDQVFOO0FBQ0Z1QixrQkFBVSxLQUFLQSxRQUFMLEdBQWdCN0IsS0FBSzhCLEVBQUwsR0FBVSxDQUFWLEdBQWM7QUFEdEMsT0FSTSxFQVVQLEdBVk8sRUFXVHhCLEVBWFMsQ0FXTjtBQUNGdUIsa0JBQVU3QixLQUFLOEIsRUFBTCxHQUFVLEtBQUtsQjtBQUR2QixPQVhNLEVBYVAsR0FiTyxFQWNUTixFQWRTLENBY047QUFDRlUsZUFBT0wsU0FBU2hDLElBRGQ7QUFFRnNDLGdCQUFRTixTQUFTaEM7QUFGZixPQWRNLEVBaUJQLEdBakJPLENBQVo7O0FBbUJBMEIsWUFBTXJELEtBQU47QUFDRDs7OztFQXRNb0JDLE9BQU9tRzs7QUF5TTlCekMsU0FBU2hDLElBQVQsR0FBZ0IsRUFBaEI7QUFDQWdDLFNBQVNxQyxNQUFULEdBQWtCLEVBQWxCO0FBQ0FyQyxTQUFTcUIsbUJBQVQsR0FBK0IsR0FBL0I7QUFDQXJCLFNBQVN5QixtQkFBVCxHQUErQixHQUEvQjtBQUNBekIsU0FBUzJCLG9CQUFULEdBQWdDLElBQWhDO0FBQ0FyRyxPQUFPMEUsUUFBUCxHQUFrQkEsUUFBbEI7Ozs7Ozs7Ozs7O0lDOU1NMEM7OztBQUNKLG9CQUFZNUcsSUFBWixFQUFrQjtBQUFBOztBQUFBLG9IQUNWQSxJQURVLEVBQ0pBLEtBQUt1RSxLQUFMLEdBQWEsQ0FEVCxFQUNZdkUsS0FBS3dFLE1BQUwsR0FBYyxDQUQxQixFQUM2QixJQUFJaEUsT0FBTzRCLFVBQVgsQ0FBc0JwQyxLQUFLdUUsS0FBM0IsRUFBa0N2RSxLQUFLd0UsTUFBdkMsQ0FEN0I7O0FBRWhCLFVBQUs3QyxNQUFMLENBQVlDLEtBQVosQ0FBa0IsR0FBbEI7QUFGZ0I7QUFHakI7Ozs7NkJBRVE7QUFDUCxVQUFNaUYsVUFBVSxDQUFoQjs7QUFFQSxXQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSSxHQUFwQixFQUF5QkEsR0FBekIsRUFBOEI7QUFDNUIsWUFBSTVFLE9BQU8sS0FBS2xDLElBQUwsQ0FBVThDLEdBQVYsQ0FBY2lFLE9BQWQsQ0FBc0JGLFVBQVUsQ0FBaEMsRUFBbUNBLE9BQW5DLENBQVg7QUFDQSxZQUFJMUUsU0FBUyxJQUFJM0IsT0FBTzRCLFVBQVgsQ0FBc0JGLElBQXRCLEVBQTRCQSxJQUE1QixDQUFiOztBQUVBQyxlQUFPRSxHQUFQLENBQVdDLFNBQVg7QUFDQUgsZUFBT0UsR0FBUCxDQUFXRSxTQUFYLEdBQXVCLE9BQXZCO0FBQ0FKLGVBQU9FLEdBQVAsQ0FBVzJFLElBQVgsQ0FBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0I5RSxJQUF0QixFQUE0QkEsSUFBNUI7QUFDQUMsZUFBT0UsR0FBUCxDQUFXaEIsSUFBWDs7QUFFQSxZQUFJNEYsU0FBUyxJQUFJekcsT0FBT21HLE1BQVgsQ0FDWCxLQUFLM0csSUFETSxFQUVYLEtBQUtBLElBQUwsQ0FBVThDLEdBQVYsQ0FBY2lFLE9BQWQsQ0FBc0IsQ0FBQyxLQUFLL0csSUFBTCxDQUFVdUUsS0FBakMsRUFBd0MsS0FBS3ZFLElBQUwsQ0FBVXVFLEtBQWxELENBRlcsRUFHWCxLQUFLdkUsSUFBTCxDQUFVOEMsR0FBVixDQUFjaUUsT0FBZCxDQUFzQixDQUFDLEtBQUsvRyxJQUFMLENBQVV3RSxNQUFqQyxFQUF5QyxLQUFLeEUsSUFBTCxDQUFVd0UsTUFBbkQsQ0FIVyxFQUlYckMsTUFKVyxDQUFiOztBQU9BLGFBQUttRCxRQUFMLENBQWMyQixNQUFkO0FBQ0Q7QUFDRjs7OztFQTNCb0J6RyxPQUFPbUc7O0FBOEI5Qm5ILE9BQU9vSCxRQUFQLEdBQWtCQSxRQUFsQjs7Ozs7Ozs7Ozs7SUM5Qk1NOzs7QUFDSixrQkFBYztBQUFBOztBQUFBOztBQUdaQyxXQUFPQyxFQUFQO0FBSFk7QUFJYjs7Ozt5QkFFSWxHLG1CQUFtQjtBQUN0QixXQUFLbUcsU0FBTCxHQUFpQixFQUFqQjtBQUNBOzs7O0FBSUEsV0FBS25HLGlCQUFMLEdBQXlCQSxpQkFBekI7O0FBRUE7Ozs7QUFJQSxXQUFLb0csU0FBTCxHQUFpQixHQUFqQjs7QUFFQTs7OztBQUlBLFdBQUtDLFVBQUwsR0FBa0IsRUFBbEI7O0FBRUE7Ozs7QUFJQSxXQUFLQyxtQkFBTCxHQUEyQixDQUEzQjs7QUFFQSxXQUFLQyxlQUFMLEdBQXVCLEVBQXZCO0FBQ0EsV0FBS0MsaUJBQUwsR0FBeUIsRUFBekI7O0FBRUEsV0FBS3BFLEtBQUwsR0FBYSxDQUFiOztBQUVBLFdBQUtxRSxtQkFBTCxHQUEyQixFQUEzQjtBQUNBLFdBQUtDLG9CQUFMLEdBQTRCLENBQTVCO0FBQ0Q7Ozs2QkFFUTtBQUNQLFdBQUs1SCxJQUFMLENBQVVDLEtBQVYsQ0FBZ0JVLGVBQWhCLEdBQWtDLE1BQWxDOztBQUVBLFdBQUtrSCxjQUFMO0FBQ0EsV0FBS0MsZ0JBQUw7O0FBRUEsV0FBS0MsYUFBTCxHQUFxQixLQUFLL0gsSUFBTCxDQUFVZSxHQUFWLENBQWNpSCxLQUFkLEVBQXJCOztBQUVBLFdBQUtDLE1BQUw7QUFDQSxXQUFLQyxVQUFMO0FBQ0EsV0FBS0MsZ0JBQUw7QUFDQSxXQUFLQyx3QkFBTDtBQUNBLFdBQUtDLGVBQUw7O0FBRUEsV0FBS0MsYUFBTCxHQUFxQixJQUFyQjs7QUFFQW5CLGFBQU9vQixJQUFQLEdBQWMsS0FBS0MsU0FBTCxDQUFlQyxJQUFmLENBQW9CLElBQXBCLENBQWQ7QUFDQSxXQUFLekksSUFBTCxDQUFVMEksSUFBVixDQUFlQyxjQUFmLEdBQWdDLElBQWhDO0FBQ0Q7Ozs2QkFFUTtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBS0MsUUFBTCxDQUFjeEQsUUFBZCxJQUEwQjdCLEtBQUs4QixFQUFMLEdBQVUsSUFBVixHQUFpQixFQUFqQixHQUFzQixHQUFoRDtBQUNBLFdBQUtyRixJQUFMLENBQVU2SSxLQUFWLENBQWdCdEgsSUFBaEIsQ0FBcUIsS0FBS3ZCLElBQUwsQ0FBVTBJLElBQVYsQ0FBZUksR0FBcEMsRUFBeUMsRUFBekMsRUFBNkMsRUFBN0MsRUFBaUQsT0FBakQ7QUFDRDs7O3VDQUVrQjtBQUNqQixVQUFJQyxlQUFldkksT0FBT3dJLFVBQVAsQ0FBa0JDLE9BQWxCLENBQTBCckcsU0FBU00sVUFBbkMsQ0FBbkI7O0FBRUEsV0FBSyxJQUFJNEQsSUFBSSxDQUFiLEVBQWdCQSxJQUFJLEtBQUs1RixpQkFBekIsRUFBNEM0RixHQUE1QyxFQUFpRDtBQUMvQyxZQUFJMUMsV0FBVyxJQUFJeEIsUUFBSixDQUFhbUcsYUFBYWpDLENBQWIsQ0FBYixDQUFmO0FBQ0EsYUFBS08sU0FBTCxDQUFlWixJQUFmLENBQW9CckMsUUFBcEI7QUFDRDtBQUNGOzs7cUNBRWdCO0FBQ2YsV0FBS3dFLFFBQUwsR0FBZ0IsSUFBSXBKLE9BQU9vSCxRQUFYLENBQW9CLEtBQUs1RyxJQUF6QixDQUFoQjs7QUFFQSxXQUFLNEksUUFBTCxDQUFjTSxNQUFkOztBQUVBLFdBQUtsSixJQUFMLENBQVVlLEdBQVYsQ0FBYzBDLFFBQWQsQ0FBdUIsS0FBS21GLFFBQTVCO0FBQ0Q7OztzQ0FFaUI7QUFDaEIsVUFBTU8sY0FBYyxLQUFwQjtBQUNBLFdBQUtDLFNBQUwsR0FBaUIsS0FBS3BKLElBQUwsQ0FBVTBJLElBQVYsQ0FBZVEsTUFBZixFQUFqQjs7QUFFQSxXQUFLRSxTQUFMLENBQWVDLElBQWYsQ0FBb0JGLFdBQXBCLEVBQWlDLEtBQUtHLGlCQUF0QyxFQUF5RCxJQUF6RDtBQUNEOzs7d0NBRW1CO0FBQ2xCLFVBQUl4SixXQUFXLEtBQUt5SixlQUFMLEVBQWY7O0FBRUEsVUFBSXpKLGFBQWEwSixTQUFqQixFQUNFMUosU0FBUzJKLE1BQVQ7QUFDSDs7QUFFRDs7Ozs7O2lDQUdhO0FBQ1gsV0FBS3pKLElBQUwsQ0FBVTZFLEtBQVYsQ0FBZ0I2RSxJQUFoQixDQUFxQjNJLEdBQXJCLENBQXlCLEtBQUs0SSxlQUE5QixFQUErQyxJQUEvQztBQUNEOztBQUVEOzs7Ozs7NkJBR1M7QUFDUCxXQUFLLElBQUl2RyxJQUFJLENBQWIsRUFBZ0JBLElBQUksS0FBS3VFLG1CQUF6QixFQUE4Q3ZFLEdBQTlDLEVBQW1EO0FBQ2pELGFBQUtxRSxlQUFMLENBQXFCckUsQ0FBckIsSUFBMEIsRUFBMUI7QUFDQSxhQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSSxLQUFLdUUsb0JBQXpCLEVBQStDdkUsR0FBL0MsRUFBb0Q7QUFDbEQsY0FBSXVHLE9BQU94RyxLQUFLNUQsT0FBTzBFLFFBQVAsQ0FBZ0JoQyxJQUFoQixHQUF1QixDQUF2QixHQUEyQixDQUFoQyxDQUFYO0FBQ0EsY0FBSTJILE9BQU94RyxLQUFLN0QsT0FBTzBFLFFBQVAsQ0FBZ0JoQyxJQUFoQixHQUF1QixDQUE1QixDQUFYO0FBQ0EsY0FBSWlDLFlBQVlmLElBQUksQ0FBSixLQUFVLENBQTFCO0FBQ0EsY0FBSWdCLFdBQVcsS0FBS3BFLElBQUwsQ0FBVThDLEdBQVYsQ0FBY0MsSUFBZCxDQUFtQixLQUFLc0UsU0FBeEIsQ0FBZjs7QUFFQSxjQUFJaEUsSUFBSSxDQUFKLEtBQVUsQ0FBZCxFQUFpQjtBQUNmYyx3QkFBWSxDQUFDQSxTQUFiO0FBQ0Q7O0FBRUQsY0FBSXJFLFdBQVcsSUFBSU4sT0FBTzBFLFFBQVgsQ0FDYixLQUFLbEUsSUFEUSxFQUViNEosSUFGYSxFQUdiQyxJQUhhLEVBSWIxRixTQUphLEVBS2JDLFFBTGEsRUFLSDtBQUNSaEIsZ0JBRFE7QUFFUkM7QUFGUSxXQUxHLENBQWY7O0FBV0F2RCxtQkFBU2tGLE1BQVQsQ0FBZ0I4RSxXQUFoQixDQUE0Qi9JLEdBQTVCLENBQWdDLEtBQUtnSixjQUFyQyxFQUFxRCxJQUFyRDtBQUNBakssbUJBQVNrRixNQUFULENBQWdCZ0YsV0FBaEIsQ0FBNEJqSixHQUE1QixDQUFnQyxLQUFLZ0osY0FBckMsRUFBcUQsSUFBckQ7QUFDQWpLLG1CQUFTa0YsTUFBVCxDQUFnQkMsY0FBaEIsQ0FBK0JsRSxHQUEvQixDQUFtQyxLQUFLa0osZUFBeEMsRUFBeUQsSUFBekQ7O0FBRUEsZUFBS3hDLGVBQUwsQ0FBcUJyRSxDQUFyQixFQUF3QkMsQ0FBeEIsSUFBNkJ2RCxRQUE3QjtBQUNBLGVBQUtpSSxhQUFMLENBQW1CaEgsR0FBbkIsQ0FBdUJqQixRQUF2QjtBQUNEO0FBQ0Y7O0FBRUQsV0FBS29LLGVBQUw7QUFDRDs7QUFFRDs7Ozs7O3NDQUdrQjtBQUNoQixVQUFJQyxhQUFhLEtBQUt6QyxpQkFBTCxDQUF1QnpFLE1BQXZCLEdBQWdDLEtBQUt1RSxtQkFBdEQ7O0FBRUEsVUFBSSxDQUFDMkMsVUFBTCxFQUFpQjtBQUNmLGFBQUtDLFdBQUwsQ0FBaUI3RyxLQUFLOEcsR0FBTCxDQUFTLEtBQUszQyxpQkFBTCxDQUF1QnpFLE1BQWhDLEVBQXdDLElBQXhDLElBQWdELEVBQWpFO0FBQ0EsYUFBS21HLFNBQUwsQ0FBZWtCLElBQWYsQ0FBb0IsS0FBcEI7QUFDQSxhQUFLbEIsU0FBTCxDQUFlN0ksS0FBZjtBQUNEOztBQUVELGFBQU8sS0FBS21ILGlCQUFMLENBQXVCekUsTUFBdkIsR0FBZ0MsQ0FBdkMsRUFBMEM7QUFDeEMsWUFBSW5ELFdBQVcsS0FBSzRILGlCQUFMLENBQXVCNkMsR0FBdkIsRUFBZjtBQUNBLFlBQUlKLFVBQUosRUFBZ0I7QUFDZHJLLG1CQUFTMEssUUFBVDtBQUNELFNBRkQsTUFFTztBQUNMMUssbUJBQVMySyxNQUFUO0FBQ0Q7QUFDRjs7QUFFRCxVQUFJLENBQUNOLFVBQUwsRUFBaUI7QUFDZixZQUFJTyxpQkFBaUIsS0FBSzFLLElBQUwsQ0FBVTBJLElBQVYsQ0FBZVEsTUFBZixFQUFyQjs7QUFFQXdCLHVCQUFlM0osR0FBZixDQUNFbUQsU0FBU3lCLG1CQUFULEdBQ0F6QixTQUFTMkIsb0JBRlgsRUFHRSxLQUFLOEUsZUFIUCxFQUlFLElBSkY7O0FBT0FELHVCQUFlbkssS0FBZjtBQUNEO0FBQ0Y7OztvQ0FFZVQsVUFBVTtBQUN4QkEsZUFBUzhLLE9BQVQsQ0FBaUIsS0FBSzVLLElBQUwsQ0FBVThDLEdBQVYsQ0FBY0MsSUFBZCxDQUFtQixLQUFLc0UsU0FBeEIsQ0FBakI7QUFDRDs7O21DQUVjdkgsVUFBVStLLE9BQU87QUFDOUIsVUFBSSxDQUFDLEtBQUs3SyxJQUFMLENBQVU2RSxLQUFWLENBQWdCVyxhQUFoQixDQUE4QkMsTUFBbkMsRUFBMkM7QUFDekM7QUFDRDs7QUFFRCxVQUFJLEtBQUtpQyxpQkFBTCxDQUF1QnpFLE1BQXZCLEtBQWtDLENBQXRDLEVBQXlDO0FBQ3ZDbkQsaUJBQVNnTCxNQUFUO0FBQ0EsYUFBS3BELGlCQUFMLENBQXVCakIsSUFBdkIsQ0FBNEIzRyxRQUE1QjtBQUNELE9BSEQsTUFHTztBQUNMLFlBQUlpTCx1QkFBdUIsS0FBS3JELGlCQUFMLENBQXVCLEtBQUtBLGlCQUFMLENBQXVCekUsTUFBdkIsR0FBZ0MsQ0FBdkQsQ0FBM0I7QUFDQSxZQUFJK0gsMEJBQTBCLEtBQUt0RCxpQkFBTCxDQUF1QixLQUFLQSxpQkFBTCxDQUF1QnpFLE1BQXZCLEdBQWdDLENBQXZELENBQTlCOztBQUVBLFlBQUluRCxTQUFTcUYsUUFBVCxJQUFxQnJGLGFBQWFrTCx1QkFBdEMsRUFBK0Q7QUFDN0RELCtCQUFxQlAsUUFBckI7QUFDQSxlQUFLOUMsaUJBQUwsQ0FBdUI2QyxHQUF2QjtBQUNELFNBSEQsTUFHTyxJQUFJLENBQUN6SyxTQUFTcUYsUUFBVixJQUNULEtBQUs4RixlQUFMLENBQXFCRixvQkFBckIsRUFBMkNqTCxRQUEzQyxDQURTLElBRVRpTCxxQkFBcUIzRyxRQUFyQixLQUFrQ3RFLFNBQVNzRSxRQUZ0QyxFQUdMO0FBQ0F0RSxtQkFBU2dMLE1BQVQ7QUFDQSxlQUFLcEQsaUJBQUwsQ0FBdUJqQixJQUF2QixDQUE0QjNHLFFBQTVCO0FBQ0Q7QUFDRjtBQUNGOztBQUVEOzs7Ozs7b0NBR2dCb0wsS0FBS0MsS0FBSztBQUN4QixVQUFJRCxJQUFJdkcsU0FBSixDQUFjdEIsQ0FBZCxLQUFvQjhILElBQUl4RyxTQUFKLENBQWN0QixDQUF0QyxFQUF5QztBQUN2QyxZQUFJNkgsSUFBSXZHLFNBQUosQ0FBY3ZCLENBQWQsR0FBa0IsQ0FBbEIsS0FBd0IrSCxJQUFJeEcsU0FBSixDQUFjdkIsQ0FBdEMsSUFDRjhILElBQUl2RyxTQUFKLENBQWN2QixDQUFkLEdBQWtCLENBQWxCLEtBQXdCK0gsSUFBSXhHLFNBQUosQ0FBY3ZCLENBRHhDLEVBQzJDO0FBQ3pDLGlCQUFPLElBQVA7QUFDRDtBQUNGLE9BTEQsTUFLTyxJQUFJOEgsSUFBSXZHLFNBQUosQ0FBY3ZCLENBQWQsS0FBb0IrSCxJQUFJeEcsU0FBSixDQUFjdkIsQ0FBdEMsRUFBeUM7QUFDOUMsWUFBSThILElBQUl2RyxTQUFKLENBQWN2QixDQUFkLEdBQWtCLENBQWxCLEtBQXdCLENBQTVCLEVBQStCO0FBQzdCLGNBQUk4SCxJQUFJL0csU0FBSixJQUFpQmdILElBQUl4RyxTQUFKLENBQWN0QixDQUFkLEtBQW9CNkgsSUFBSXZHLFNBQUosQ0FBY3RCLENBQWQsR0FBa0IsQ0FBM0QsRUFBOEQ7QUFDNUQsbUJBQU8sSUFBUDtBQUNELFdBRkQsTUFFTyxJQUFJLENBQUM2SCxJQUFJL0csU0FBTCxJQUFrQmdILElBQUl4RyxTQUFKLENBQWN0QixDQUFkLEtBQW9CNkgsSUFBSXZHLFNBQUosQ0FBY3RCLENBQWQsR0FBa0IsQ0FBNUQsRUFBK0Q7QUFDcEUsbUJBQU8sSUFBUDtBQUNEO0FBQ0YsU0FORCxNQU1PO0FBQ0wsY0FBSSxDQUFDNkgsSUFBSS9HLFNBQUwsSUFBa0JnSCxJQUFJeEcsU0FBSixDQUFjdEIsQ0FBZCxLQUFvQjZILElBQUl2RyxTQUFKLENBQWN0QixDQUFkLEdBQWtCLENBQTVELEVBQStEO0FBQzdELG1CQUFPLElBQVA7QUFDRCxXQUZELE1BRU8sSUFBSTZILElBQUkvRyxTQUFKLElBQWlCZ0gsSUFBSXhHLFNBQUosQ0FBY3RCLENBQWQsS0FBb0I2SCxJQUFJdkcsU0FBSixDQUFjdEIsQ0FBZCxHQUFrQixDQUEzRCxFQUE4RDtBQUNuRSxtQkFBTyxJQUFQO0FBQ0Q7QUFDRjtBQUNGOztBQUVELGFBQU8sS0FBUDtBQUNEOztBQUVEOzs7Ozs7dUNBR21CO0FBQ2pCLFVBQU0rSCxpQkFBaUIsS0FBS3BMLElBQUwsQ0FBVThDLEdBQVYsQ0FBY0MsSUFBZCxDQUFtQixLQUFLc0UsU0FBeEIsQ0FBdkI7QUFDQSxVQUFNZ0UsUUFBUSxNQUFkLENBRmlCLENBRUs7QUFDdEIsVUFBTUMsY0FBYyxFQUFwQjtBQUNBLFVBQU1oRSxZQUFZLEVBQWxCOztBQUVBLFVBQU1uRyxRQUFRO0FBQ1pDLGNBQU0sZ0JBRE07QUFFWm1LLG1CQUFXLFFBRkM7QUFHWmxLLGNBQU1nSztBQUhNLE9BQWQ7O0FBTUEsV0FBS0csVUFBTCxHQUFrQixJQUFJaE0sT0FBTzJELFVBQVgsQ0FDaEIsS0FBS25ELElBRFcsRUFFaEIsS0FBS0EsSUFBTCxDQUFVdUUsS0FBVixHQUFrQitHLFdBRkYsRUFHaEJoRSxTQUhnQixFQUloQixDQUpnQixFQUtoQm5HLEtBTGdCLENBQWxCO0FBT0EsV0FBS3FLLFVBQUwsQ0FBZ0I3SixNQUFoQixDQUF1QkMsS0FBdkIsQ0FBNkIsQ0FBN0IsRUFBZ0MsQ0FBaEM7O0FBRUE7QUFDQSxXQUFLNEosVUFBTCxDQUFnQjVHLFlBQWhCLEdBQStCLElBQS9CO0FBQ0EsV0FBSzRHLFVBQUwsQ0FBZ0J4RyxNQUFoQixDQUF1QmdGLFdBQXZCLENBQW1DakosR0FBbkMsQ0FBdUMsS0FBSzBLLGdCQUE1QyxFQUE4RCxJQUE5RDtBQUNEOzs7K0NBRTBCO0FBQ3pCLFdBQUt6TCxJQUFMLENBQVVHLEtBQVYsQ0FBZ0J1TCxtQkFBaEIsR0FBc0NsTCxPQUFPbUwsWUFBUCxDQUFvQkMsTUFBMUQ7QUFDQSxXQUFLNUwsSUFBTCxDQUFVRyxLQUFWLENBQWdCMEwsa0JBQWhCLENBQ0c5SyxHQURILENBQ08sS0FBSytLLFlBRFosRUFDMEIsSUFEMUI7QUFFRDs7O3VDQUVrQjtBQUNqQixVQUFJLEtBQUs5TCxJQUFMLENBQVVHLEtBQVYsQ0FBZ0I0TCxZQUFwQixFQUFrQztBQUNoQyxhQUFLL0wsSUFBTCxDQUFVRyxLQUFWLENBQWdCNkwsY0FBaEI7QUFDRCxPQUZELE1BRU87QUFDTCxhQUFLaE0sSUFBTCxDQUFVRyxLQUFWLENBQWdCOEwsZUFBaEI7QUFDRDtBQUNGOzs7Z0NBRVdDLEtBQUs7QUFDZkEsWUFBTTNJLEtBQUtDLEtBQUwsQ0FBVzBJLEdBQVgsQ0FBTjs7QUFFQSxXQUFLNUksS0FBTCxJQUFjNEksR0FBZDtBQUNBLFdBQUtWLFVBQUwsQ0FBZ0JXLFdBQWhCLENBQTRCLEtBQUs3SSxLQUFqQztBQUNEOzs7bUNBRWM7QUFDYixXQUFLa0ksVUFBTCxDQUFnQnBJLENBQWhCLEdBQW9CLEtBQUtwRCxJQUFMLENBQVV1RSxLQUFWLEdBQWtCLEVBQXRDO0FBQ0EsV0FBS2lILFVBQUwsQ0FBZ0JuSSxDQUFoQixHQUFvQixFQUFwQjs7QUFFQSxXQUFLdUYsUUFBTCxDQUFjeEYsQ0FBZCxHQUFrQixLQUFLcEQsSUFBTCxDQUFVdUUsS0FBVixHQUFrQixDQUFwQztBQUNBLFdBQUtxRSxRQUFMLENBQWN2RixDQUFkLEdBQWtCLEtBQUtyRCxJQUFMLENBQVV3RSxNQUFWLEdBQW1CLENBQXJDOztBQUVBLFdBQUswRixlQUFMO0FBQ0Q7OztzQ0FFaUI7QUFDaEIsVUFBTWtDLG1CQUFtQjVNLE9BQU8wRSxRQUFQLENBQWdCaEMsSUFBaEIsR0FBdUIsQ0FBaEQ7O0FBRUEsV0FBSzZGLGFBQUwsQ0FBbUIzRSxDQUFuQixHQUF1QixLQUFLcEQsSUFBTCxDQUFVdUUsS0FBVixHQUFrQixDQUFsQixHQUFzQixLQUFLd0QsYUFBTCxDQUFtQnhELEtBQW5CLEdBQTJCLENBQWpELEdBQXFENkgsZ0JBQTVFO0FBQ0EsV0FBS3JFLGFBQUwsQ0FBbUIxRSxDQUFuQixHQUF1QixLQUFLckQsSUFBTCxDQUFVd0UsTUFBVixHQUFtQixDQUFuQixHQUF1QixLQUFLdUQsYUFBTCxDQUFtQnZELE1BQW5CLEdBQTRCLENBQW5ELEdBQXVENEgsZ0JBQTlFO0FBQ0Q7OztnQ0FFVztBQUNWLFdBQUssSUFBSS9JLElBQUksQ0FBYixFQUFnQkEsSUFBSSxLQUFLdUUsb0JBQXpCLEVBQStDdkUsR0FBL0MsRUFBb0Q7QUFDbEQsYUFBSyxJQUFJRCxJQUFJLENBQWIsRUFBZ0JBLElBQUksS0FBS3VFLG1CQUF6QixFQUE4Q3ZFLEdBQTlDLEVBQW1EO0FBQ2pELGNBQUlpSixTQUFTLEtBQUtDLG1CQUFMLENBQXlCbEosQ0FBekIsRUFBNEJDLENBQTVCLENBQWI7O0FBRUEsY0FBSWdKLE1BQUosRUFBWTtBQUNWLG1CQUFPLElBQVA7QUFDRDtBQUNGO0FBQ0Y7O0FBRUQsYUFBTyxLQUFQO0FBQ0Q7Ozt3Q0FFbUJqSixHQUFHQyxHQUFHO0FBQ3hCLFVBQUl2RCxXQUFXLEtBQUsySCxlQUFMLENBQXFCckUsQ0FBckIsRUFBd0JDLENBQXhCLENBQWY7QUFDQSxVQUFJa0osT0FBTyxDQUFYOztBQUVBLFVBQUl6TSxTQUFTcUUsU0FBYixFQUF3QjtBQUN0QixZQUFJK0csTUFBTTlILElBQUksQ0FBSixHQUFRLENBQVIsR0FBWSxFQUFDZ0IsVUFBVSxJQUFYLEVBQVosR0FBK0IsS0FBS3FELGVBQUwsQ0FBcUJyRSxJQUFJLENBQXpCLEVBQTRCQyxDQUE1QixDQUF6QztBQUNBLFlBQUk4SCxNQUFNL0gsSUFBSSxDQUFKLEdBQVEsS0FBS3VFLG1CQUFMLEdBQTJCLENBQW5DLEdBQXVDLEVBQUN2RCxVQUFVLElBQVgsRUFBdkMsR0FBMEQsS0FBS3FELGVBQUwsQ0FBcUJyRSxJQUFJLENBQXpCLEVBQTRCQyxDQUE1QixDQUFwRTs7QUFFQWtKLGdCQUFRek0sU0FBU3NFLFFBQVQsS0FBc0I4RyxJQUFJOUcsUUFBMUIsR0FBcUMsQ0FBckMsR0FBeUMsQ0FBakQ7QUFDQW1JLGdCQUFRek0sU0FBU3NFLFFBQVQsS0FBc0IrRyxJQUFJL0csUUFBMUIsR0FBcUMsQ0FBckMsR0FBeUMsQ0FBakQ7QUFDRCxPQU5ELE1BTU87QUFDTCxZQUFJOEcsTUFBTTlILElBQUksQ0FBSixHQUFRLENBQVIsR0FBWSxFQUFDZ0IsVUFBVSxJQUFYLEVBQVosR0FBK0IsS0FBS3FELGVBQUwsQ0FBcUJyRSxJQUFJLENBQXpCLEVBQTRCQyxDQUE1QixDQUF6QztBQUNBLFlBQUk4SCxPQUFNL0gsSUFBSSxDQUFKLEdBQVEsS0FBS3VFLG1CQUFMLEdBQTJCLENBQW5DLEdBQXVDLEVBQUN2RCxVQUFVLElBQVgsRUFBdkMsR0FBMEQsS0FBS3FELGVBQUwsQ0FBcUJyRSxJQUFJLENBQXpCLEVBQTRCQyxDQUE1QixDQUFwRTtBQUNBLFlBQUltSixNQUFNbkosSUFBSSxDQUFKLEdBQVEsS0FBS3VFLG9CQUFMLEdBQTRCLENBQXBDLEdBQXdDLEVBQUN4RCxVQUFVLElBQVgsRUFBeEMsR0FBMkQsS0FBS3FELGVBQUwsQ0FBcUJyRSxDQUFyQixFQUF3QkMsSUFBSSxDQUE1QixDQUFyRTs7QUFFQSxZQUFJbUosSUFBSXBJLFFBQUosS0FBaUJ0RSxTQUFTc0UsUUFBOUIsRUFBd0M7QUFDdENtSSxrQkFBUSxDQUFSOztBQUVBLGNBQUlFLE1BQU1ySixJQUFJLENBQUosR0FBUSxDQUFSLEdBQVksRUFBQ2dCLFVBQVUsSUFBWCxFQUFaLEdBQStCLEtBQUtxRCxlQUFMLENBQXFCckUsSUFBSSxDQUF6QixFQUE0QkMsSUFBSSxDQUFoQyxDQUF6QztBQUNBLGNBQUlxSixNQUFNdEosSUFBSSxDQUFKLEdBQVEsS0FBS3VFLG1CQUFMLEdBQTJCLENBQW5DLEdBQXVDLEVBQUN2RCxVQUFVLElBQVgsRUFBdkMsR0FBMEQsS0FBS3FELGVBQUwsQ0FBcUJyRSxJQUFJLENBQXpCLEVBQTRCQyxJQUFJLENBQWhDLENBQXBFOztBQUVBa0osa0JBQVF6TSxTQUFTc0UsUUFBVCxLQUFzQnFJLElBQUlySSxRQUExQixHQUFxQyxDQUFyQyxHQUF5QyxDQUFqRDtBQUNBbUksa0JBQVF6TSxTQUFTc0UsUUFBVCxLQUFzQnNJLElBQUl0SSxRQUExQixHQUFxQyxDQUFyQyxHQUF5QyxDQUFqRDtBQUNEOztBQUVEbUksZ0JBQVF6TSxTQUFTc0UsUUFBVCxLQUFzQjhHLElBQUk5RyxRQUExQixHQUFxQyxDQUFyQyxHQUF5QyxDQUFqRDtBQUNBbUksZ0JBQVF6TSxTQUFTc0UsUUFBVCxLQUFzQitHLEtBQUkvRyxRQUExQixHQUFxQyxDQUFyQyxHQUF5QyxDQUFqRDtBQUNEOztBQUVELGFBQU9tSSxPQUFPLEtBQUsvRSxtQkFBTCxHQUEyQixDQUF6QztBQUNEOzs7aUNBRVk7QUFDWCxVQUFNbUYsWUFBWSxFQUFsQjs7QUFFQSxXQUFLLElBQUl2SixJQUFJLENBQWIsRUFBZ0JBLElBQUksS0FBS3VFLG1CQUF6QixFQUE4Q3ZFLEdBQTlDLEVBQW1EO0FBQ2pELGFBQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJLEtBQUt1RSxvQkFBekIsRUFBK0N2RSxHQUEvQyxFQUFvRDtBQUNsRCxjQUFJdkQsV0FBVyxLQUFLMkgsZUFBTCxDQUFxQnJFLENBQXJCLEVBQXdCQyxDQUF4QixDQUFmO0FBQ0EsY0FBSStILGlCQUFpQixLQUFLcEwsSUFBTCxDQUFVOEMsR0FBVixDQUFjQyxJQUFkLENBQW1CLEtBQUtzRSxTQUF4QixDQUFyQjs7QUFFQXZILG1CQUFTOE0sV0FBVCxDQUFxQnhCLGNBQXJCLEVBQXFDaEksSUFBSXVKLFNBQUosR0FBZ0J0SixJQUFJc0osU0FBekQ7QUFDRDtBQUNGO0FBQ0Y7OztzQ0FFaUI7QUFDaEIsVUFBSSxDQUFDLEtBQUtuRSxTQUFMLEVBQUwsRUFBdUI7QUFDckIsWUFBTXFFLGVBQWUsSUFBckI7QUFDQSxZQUFJQyxRQUFRLEtBQUs5TSxJQUFMLENBQVUwSSxJQUFWLENBQWVRLE1BQWYsRUFBWjs7QUFFQTRELGNBQU0vTCxHQUFOLENBQVU4TCxZQUFWLEVBQXdCLEtBQUtFLFVBQTdCLEVBQXlDLElBQXpDO0FBQ0FELGNBQU12TSxLQUFOLENBQVksQ0FBWjtBQUNEO0FBQ0Y7OztzQ0FFaUI7QUFDaEIsVUFBSXlNLGFBQWEsRUFBakI7QUFDQSxXQUFLLElBQUkzSixJQUFJLENBQWIsRUFBZ0JBLElBQUksS0FBS3VFLG9CQUF6QixFQUErQ3ZFLEdBQS9DLEVBQW9EO0FBQ2xELGFBQUssSUFBSUQsSUFBSSxDQUFiLEVBQWdCQSxJQUFJLEtBQUt1RSxtQkFBekIsRUFBOEN2RSxHQUE5QyxFQUFtRDtBQUNqRCxjQUFJNkosY0FBYyxLQUFLWCxtQkFBTCxDQUF5QmxKLENBQXpCLEVBQTRCQyxDQUE1QixDQUFsQjs7QUFFQSxjQUFJNEosV0FBSixFQUFpQjtBQUNkRCx1QkFBV3ZHLElBQVgsQ0FBZ0IsS0FBS2dCLGVBQUwsQ0FBcUJyRSxDQUFyQixFQUF3QkMsQ0FBeEIsQ0FBaEI7QUFDRjtBQUNGO0FBQ0Y7O0FBRUQsYUFBTyxLQUFLckQsSUFBTCxDQUFVOEMsR0FBVixDQUFjQyxJQUFkLENBQW1CaUssVUFBbkIsQ0FBUDtBQUNEOzs7O0VBcllnQnhNLE9BQU9DOztBQXdZMUJqQixPQUFPMEgsSUFBUCxHQUFjQSxJQUFkO0FDeFlBOzs7QUNBQTFILE9BQU9RLElBQVAsR0FBYyxJQUFJUSxPQUFPMEcsSUFBWCxDQUFnQjFILE9BQU9HLFFBQXZCLEVBQWlDSCxPQUFPSSxTQUF4QyxFQUFtRFksT0FBTzBNLElBQTFELENBQWQ7O0FBRUExTixPQUFPUSxJQUFQLENBQVlNLEtBQVosQ0FBa0JTLEdBQWxCLENBQXNCLE1BQXRCLEVBQThCdkIsT0FBT08sSUFBckM7QUFDQVAsT0FBT1EsSUFBUCxDQUFZTSxLQUFaLENBQWtCUyxHQUFsQixDQUFzQixRQUF0QixFQUFnQ3ZCLE9BQU9rQixNQUF2QztBQUNBO0FBQ0FsQixPQUFPUSxJQUFQLENBQVlNLEtBQVosQ0FBa0JTLEdBQWxCLENBQXNCLE1BQXRCLEVBQThCdkIsT0FBTzBILElBQXJDO0FBQ0E7O0FBRUExSCxPQUFPUSxJQUFQLENBQVlNLEtBQVosQ0FBa0JDLEtBQWxCLENBQXdCLE1BQXhCIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImxldCBFbmdpbmUgPSB7XHJcbiAgbWluV2lkdGg6IDY0MCxcclxuICBtaW5IZWlnaHQ6IDMyMCxcclxuICBtYXhXaWR0aDogMTM2NixcclxuICBtYXhIZWlnaHQ6IDc2OCxcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTcHJpdGUsIEJpdG1hcCwgZXRjLi4uIGNoYWNoZSBrZXlzXHJcbiAqIEB0eXBlIHtPYmplY3R9XHJcbiAqL1xyXG5FbmdpbmUua2V5cyA9IHtcclxuICB0cmlhbmdsZTogJ3RyaWFuZ2xlJyxcclxufVxyXG4iLCJjbGFzcyBCb290IGV4dGVuZHMgUGhhc2VyLlN0YXRlIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICBwcmVsb2FkKCkge1xyXG5cclxuICB9XHJcblxyXG4gIGNyZWF0ZSgpIHtcclxuICAgIHRoaXMuZ2FtZS5zdGFnZS5kaXNhYmxlVmlzaWJpbGl0eUNoYW5nZSA9IHRydWU7XHJcbiAgICB0aGlzLnNjYWxlLnBhZ2VBbGlnbkhvcml6b250YWxseSA9IHRydWU7XHJcbiAgICB0aGlzLnNjYWxlLnBhZ2VBbGlnblZlcnRpY2FsbHkgPSB0cnVlO1xyXG4gICAgdGhpcy5zdGF0ZS5zdGFydCgnTG9hZGVyJyk7XHJcbiAgfVxyXG59XHJcblxyXG5FbmdpbmUuQm9vdCA9IEJvb3Q7XHJcbiIsImNsYXNzIExvYWRlciBleHRlbmRzIFBoYXNlci5TdGF0ZSB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgcHJlbG9hZCgpIHtcclxuICAgIHRoaXMuZ2FtZS5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzAwMCc7XHJcbiAgICB0aGlzLmFkZFByb2dyZXNzTGFibGUoKTtcclxuXHJcbiAgICB0aGlzLmxvYWQub25GaWxlQ29tcGxldGUuYWRkKHRoaXMucmVmcmVzaFByb2dyZXNzLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLmdlbmVyYXRlVHJpYW5nbGUoKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZSgpIHtcclxuICAgIGxldCBudW1iZXJPZkdyYWRhdGlvbiA9IDM7XHJcbiAgICB0aGlzLnN0YXRlLnN0YXJ0KCdHYW1lJywgdHJ1ZSwgZmFsc2UsIG51bWJlck9mR3JhZGF0aW9uKTtcclxuICB9XHJcblxyXG4gIGFkZFByb2dyZXNzTGFibGUoKSB7XHJcbiAgICBsZXQgc3R5bGUgPSB7XHJcbiAgICAgIGZvbnQ6ICc0MXB4IE9wZW4gU2FucycsXHJcbiAgICAgIGZpbGw6ICcjMDBFNjc2J1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucHJvZ3Jlc3NMYWJsZSA9IHRoaXMuYWRkLnRleHQodGhpcy5nYW1lLndvcmxkLmNlbnRlclgsIHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJZLCAnTG9hZGluZzogMCUgKDAvMCknLCBzdHlsZSk7XHJcbiAgICB0aGlzLnByb2dyZXNzTGFibGUuYW5jaG9yLnNldFRvKDAuNSk7XHJcbiAgfVxyXG5cclxuICByZWZyZXNoUHJvZ3Jlc3MocHJvZ3Jlc3MsIGNhY2hlS2V5LCBzdWNjZXNzLCB0b3RhbExvYWRlZCwgdG90YWxGaWxlcykge1xyXG4gICAgdGhpcy5wcm9ncmVzc0xhYmxlLnRleHQgPSBgTG9hZGluZyAke3Byb2dyZXNzfSUgKCR7dG90YWxMb2FkZWR9LyR7dG90YWxGaWxlc30pYDtcclxuICB9XHJcblxyXG4gIGdlbmVyYXRlVHJpYW5nbGUoKSB7XHJcbiAgICBjb25zdCBzaXplID0gMjU1O1xyXG5cclxuICAgIGxldCBiaXRtYXAgPSBuZXcgUGhhc2VyLkJpdG1hcERhdGEoc2l6ZSwgc2l6ZSk7XHJcblxyXG4gICAgYml0bWFwLmN0eC5iZWdpblBhdGgoKTtcclxuICAgIGJpdG1hcC5jdHguZmlsbFN0eWxlID0gJ3doaXRlJztcclxuICAgIGJpdG1hcC5jdHgubW92ZVRvKDAsIHNpemUpO1xyXG4gICAgYml0bWFwLmN0eC5saW5lVG8oc2l6ZSAvIDIsIDApO1xyXG4gICAgYml0bWFwLmN0eC5saW5lVG8oc2l6ZSwgc2l6ZSk7XHJcbiAgICBiaXRtYXAuY3R4LmxpbmVUbygwLCBzaXplKTtcclxuICAgIGJpdG1hcC5jdHguZmlsbCgpO1xyXG5cclxuICAgIHRoaXMuZ2FtZS5jYWNoZS5hZGRCaXRtYXBEYXRhKEVuZ2luZS5rZXlzLnRyaWFuZ2xlLCBiaXRtYXApO1xyXG4gIH1cclxufVxyXG5cclxuRW5naW5lLkxvYWRlciA9IExvYWRlcjtcclxuIixudWxsLCJjbGFzcyBDb2xvclNldCB7XHJcbiAgLyoqXHJcbiAgICogQ29sb3IgU2V0XHJcbiAgICogQHBhcmFtICB7QXJyYXl9IGdyYWRpdGlvbiBBcnJheSBvZiBjb2xvcnNcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihncmFkaXRpb24pIHtcclxuICAgIHRoaXMuZ3JhZGl0aW9uID0gZ3JhZGl0aW9uO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHJhbmRvbSBjb2xvciBmcm9tIHNldFxyXG4gICAqIEByZXR1cm4ge1t0eXBlXX0gW2Rlc2NyaXB0aW9uXVxyXG4gICAqL1xyXG4gIGdldFJhbmRvbUNvbG9yKCkge1xyXG4gICAgcmV0dXJuIEVuZ2luZS5nYW1lLnJuZC5waWNrKHRoaXMuZ3JhZGl0aW9uKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBjb2xvciBieSBudW1iZXJcclxuICAgKi9cclxuICBnZXRCeU51bWJlcihudW1iZXIpIHtcclxuICAgIHJldHVybiB0aGlzLmdyYWRpdGlvbltudW1iZXJdO1xyXG4gIH1cclxuXHJcbiAgZ2V0TGFzdENvbG9yKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZ3JhZGl0aW9uW3RoaXMuZ3JhZGl0aW9uLmxlbmd0aCAtIDFdO1xyXG4gIH1cclxufVxyXG5cclxuQ29sb3JTZXQuR1JBREFUSU9OUyA9IFtcclxuICAvLyBpbmRpZ29cclxuICBbXHJcbiAgICAweDNGNTFCNSxcclxuICAgIDB4Mzk0OUFCLFxyXG4gICAgMHgzMDNGOUYsXHJcbiAgICAweDI4MzU5MyxcclxuICBdLFxyXG4gIC8vIGJsdWVcclxuICBbXHJcbiAgICAweDIxOTZGMyxcclxuICAgIDB4MUU4OEU1LFxyXG4gICAgMHgxOTc2RDIsXHJcbiAgICAweDE1NjVDMCxcclxuICBdLFxyXG4gIC8vIHllbGxvd1xyXG4gIFtcclxuICAgIDB4RkZGMTc2LFxyXG4gICAgMHhGRkVFNTgsXHJcbiAgICAweEZGRUIzQixcclxuICAgIDB4RkREODM1LFxyXG4gIF0sXHJcbiAgLy8gcGlua1xyXG4gIFtcclxuICAgIDB4RTkxRTYzLFxyXG4gICAgMHhEODFCNjAsXHJcbiAgICAweEMyMTg1QixcclxuICAgIDB4QUQxNDU3LFxyXG4gIF0sXHJcbiAgLy8gYnJvd25cclxuICBbXHJcbiAgICAweDc5NTU0OCxcclxuICAgIDB4NkQ0QzQxLFxyXG4gICAgMHg1RDQwMzcsXHJcbiAgICAweDRFMzQyRSxcclxuICBdLFxyXG4gIC8vIC8vIGRlZXBvcmFuZ2VcclxuICAvLyBbXHJcbiAgLy8gICAweEZGNTcyMixcclxuICAvLyAgIDB4RjQ1MTFFLFxyXG4gIC8vICAgMHhFNjRBMTksXHJcbiAgLy8gICAweEQ4NDMxNSxcclxuICAvLyBdLFxyXG4gIC8vIGdyZXlcclxuICBbXHJcbiAgICAweDlFOUU5RSxcclxuICAgIDB4NzU3NTc1LFxyXG4gICAgMHg2MTYxNjEsXHJcbiAgICAweDQyNDI0MixcclxuICBdLFxyXG4gIC8vIC8vIHJlZFxyXG4gIC8vIFtcclxuICAvLyAgIDB4RjQ0MzM2LFxyXG4gIC8vICAgMHhFNTM5MzUsXHJcbiAgLy8gICAweEQzMkYyRixcclxuICAvLyAgIDB4QzYyODI4LFxyXG4gIC8vIF0sXHJcbl07XHJcblxyXG5FbmdpbmUuQ29sb3JTZXQgPSBDb2xvclNldDtcclxuIiwiY2xhc3MgU2NvcmVMYWJsZSBleHRlbmRzIFBoYXNlci5UZXh0IHtcclxuICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBzY29yZSwgc3R5bGUpIHtcclxuICAgIHN1cGVyKGdhbWUsIHgsIHksIGBTY29yZTogJHtNYXRoLnJvdW5kKHNjb3JlKX1gLCBzdHlsZSk7XHJcblxyXG4gICAgdGhpcy5zY29yZSA9IHNjb3JlO1xyXG5cclxuICAgIHRoaXMuZ2FtZS5hZGQuZXhpc3RpbmcodGhpcyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgc2NvcmUgbGFibGUgdmFsdWVcclxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHNjb3JlIE5ldyBzY29yZVxyXG4gICAqL1xyXG4gIGNoYW5nZVZhbHVlKHNjb3JlKSB7XHJcbiAgICB0aGlzLmdhbWUudHdlZW5zLnJlbW92ZSh0aGlzKTtcclxuXHJcbiAgICBsZXQgdHdlZW4gPSB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMpXHJcbiAgICAgIC50byh7XHJcbiAgICAgICAgc2NvcmVcclxuICAgICAgfSwgU2NvcmVMYWJsZS5hbmltYXRpb25DaGFuZ2VWYWwpXHJcbiAgICAgIC5vblVwZGF0ZUNhbGxiYWNrKCgpID0+IHtcclxuICAgICAgICB0aGlzLnRleHQgPSBgU2NvcmU6ICR7TWF0aC5yb3VuZCh0aGlzLnNjb3JlKX1gO1xyXG4gICAgICB9LCB0aGlzKTtcclxuXHJcbiAgICB0d2Vlbi5vbkNvbXBsZXRlXHJcbiAgICAgIC5hZGQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMudGV4dCA9IGBTY29yZTogJHtNYXRoLnJvdW5kKHRoaXMuc2NvcmUpfWA7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgIHR3ZWVuLnN0YXJ0KCk7XHJcbiAgfVxyXG59XHJcblxyXG5TY29yZUxhYmxlLmFuaW1hdGlvbkNoYW5nZVZhbCA9IDUwMDtcclxuRW5naW5lLlNjb3JlTGFibGUgPSBTY29yZUxhYmxlO1xyXG4iLCJjbGFzcyBUcmlhbmdsZSBleHRlbmRzIFBoYXNlci5TcHJpdGUge1xyXG5cclxuICAvKipcclxuICAgKiBJdCdzIGEgdHJpYW5nbGUsIHlhc2ggaXQncyBub3QgYSBqb2tlXHJcbiAgICogQHBhcmFtICB7UGhhc2VyLkdhbWV9ICBnYW1lICAgICAgW2Rlc2NyaXB0aW9uXVxyXG4gICAqIEBwYXJhbSAge1t0eXBlXX0gIHggICAgICAgICBbZGVzY3JpcHRpb25dXHJcbiAgICogQHBhcmFtICB7W3R5cGVdfSAgeSAgICAgICAgIFtkZXNjcmlwdGlvbl1cclxuICAgKiBAcGFyYW0gIHtCb29sZWFufSBpc1JvdGF0ZWQgW2Rlc2NyaXB0aW9uXVxyXG4gICAqIEBwYXJhbSAge051bWJlcn0gIGNvbG9yICAgICBbZGVzY3JpcHRpb25dXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgaXNSb3RhdGVkLCBjb2xvclNldCwgbWF0cml4UG9zaXRpb24pIHtcclxuICAgIHN1cGVyKGdhbWUsIHgsIHksIEVuZ2luZS5nYW1lLmNhY2hlLmdldEJpdG1hcERhdGEoRW5naW5lLmtleXMudHJpYW5nbGUpKTtcclxuXHJcbiAgICB0aGlzLndpZHRoID0gVHJpYW5nbGUuc2l6ZTtcclxuICAgIHRoaXMuaGVpZ2h0ID0gVHJpYW5nbGUuc2l6ZTtcclxuICAgIHRoaXMuYW5jaG9yLnNldFRvKDAuNSk7XHJcbiAgICB0aGlzLmNvbG9yU2V0ID0gY29sb3JTZXQ7XHJcbiAgICB0aGlzLnRpbnQgPSB0aGlzLmNvbG9yU2V0LmdldFJhbmRvbUNvbG9yKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQb2l0aW9uIGluIHRoZSBtYXRyaXggb2YgdHJpYW5nbGVzXHJcbiAgICAgKiBAdHlwZSB7W3R5cGVdfVxyXG4gICAgICovXHJcbiAgICB0aGlzLm1hdHJpeFBvcyA9IG1hdHJpeFBvc2l0aW9uO1xyXG5cclxuICAgIHRoaXMuaW5wdXRFbmFibGVkID0gdHJ1ZTtcclxuICAgIHRoaXMuaW5wdXQucGl4ZWxQZXJmZWN0T3ZlciA9IHRydWU7XHJcbiAgICB0aGlzLmlucHV0LnBpeGVsUGVyZmVjdENsaWNrID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLmV2ZW50cy5kZWxldGVDb21wbGV0ZSA9IG5ldyBQaGFzZXIuU2lnbmFsKCk7XHJcblxyXG4gICAgdGhpcy5zZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5pc1JvdGF0ZWQgPSBpc1JvdGF0ZWQ7XHJcblxyXG4gICAgaWYgKGlzUm90YXRlZCkge1xyXG4gICAgICB0aGlzLnJvdGF0aW9uID0gTWF0aC5QSTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB0aGlzLmFkZFRleHRQb3NpdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgYWRkVGV4dFBvc2l0aW9uKCkge1xyXG4gICAgbGV0IHRleHQgPSBuZXcgUGhhc2VyLlRleHQoXHJcbiAgICAgIHRoaXMuZ2FtZSxcclxuICAgICAgVHJpYW5nbGUuc2l6ZSAvIDIsXHJcbiAgICAgIFRyaWFuZ2xlLnNpemUgLyAyLFxyXG4gICAgICBgJHt0aGlzLm1hdHJpeFBvcy54fToke3RoaXMubWF0cml4UG9zLnl9YCxcclxuICAgICAge1xyXG4gICAgICAgIGZvbnQ6ICc2NHB4IE9wZW4gU2FucycsXHJcbiAgICAgICAgZmlsbDogJ2JsYWNrJ1xyXG4gICAgICB9XHJcbiAgICApXHJcblxyXG4gICAgaWYgKHRoaXMuaXNSb3RhdGVkKSB7XHJcbiAgICAgIHRleHQucm90YXRpb24gKz0gTWF0aC5QSTtcclxuICAgICAgdGV4dC55ID0gK3RleHQuaGVpZ2h0O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGV4dC54ID0gLXRleHQud2lkdGggLyAyO1xyXG4gICAgICB0ZXh0LnkgPSAtdGV4dC5oZWlnaHQgLyA0O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYWRkQ2hpbGQodGV4dCk7XHJcbiAgfVxyXG5cclxuICBzZWxlY3QoKSB7XHJcbiAgICBpZiAoIXRoaXMuc2VsZWN0ZWQpIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZCA9IHRydWU7XHJcblxyXG4gICAgICB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMpXHJcbiAgICAgICAgLnRvKHtcclxuICAgICAgICAgIHdpZHRoOiBUcmlhbmdsZS5zaXplIC8gMS41LFxyXG4gICAgICAgICAgaGVpZ2h0OiBUcmlhbmdsZS5zaXplIC8gMS41XHJcbiAgICAgICAgfSwgVHJpYW5nbGUuYW5pbWF0aW9uVGltZVNlbGVjdClcclxuICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgfVxyXG4gIH1cclxuXHJcbiAgdW5zZWxlY3QoKSB7XHJcbiAgICBpZiAodGhpcy5zZWxlY3RlZCkge1xyXG5cclxuICAgICAgdGhpcy5nYW1lLnR3ZWVucy5yZW1vdmUodGhpcyk7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgIHRoaXMuZ2FtZS5hZGQudHdlZW4odGhpcylcclxuICAgICAgICAudG8oe1xyXG4gICAgICAgICAgd2lkdGg6IFRyaWFuZ2xlLnNpemUsXHJcbiAgICAgICAgICBoZWlnaHQ6IFRyaWFuZ2xlLnNpemVcclxuICAgICAgICB9LCBUcmlhbmdsZS5hbmltYXRpb25UaW1lU2VsZWN0KVxyXG4gICAgICAgIC5zdGFydCgpO1xyXG4gICAgICB9XHJcbiAgfVxyXG5cclxuICBkZWxldGUoKSB7XHJcbiAgICBpZiAodGhpcy5nYW1lLmlucHV0LmFjdGl2ZVBvaW50ZXIuaXNEb3duKSB7XHJcbiAgICAgIHRoaXMuZ2FtZS5hZGQudHdlZW4odGhpcylcclxuICAgICAgICAudG8oe1xyXG4gICAgICAgICAgd2lkdGg6IDAsXHJcbiAgICAgICAgICBoZWlnaHQ6IDAsXHJcbiAgICAgICAgICBhbHBoYTogMFxyXG4gICAgICAgIH0sIFRyaWFuZ2xlLmFuaW1hdGlvblRpbWVEZWxldGUpXHJcbiAgICAgICAgLnN0YXJ0KClcclxuICAgICAgICAub25Db21wbGV0ZVxyXG4gICAgICAgIC5hZGQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5ldmVudHMuZGVsZXRlQ29tcGxldGUuZGlzcGF0Y2godGhpcyk7XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZWNvdmVyKGNvbG9yU2V0KSB7XHJcbiAgICB0aGlzLmNvbG9yU2V0ID0gY29sb3JTZXQ7XHJcbiAgICB0aGlzLnRpbnQgPSB0aGlzLmNvbG9yU2V0LmdldFJhbmRvbUNvbG9yKCk7XHJcbiAgICB0aGlzLndpZHRoID0gVHJpYW5nbGUuc2l6ZTtcclxuICAgIHRoaXMuaGVpZ2h0ID0gVHJpYW5nbGUuc2l6ZTtcclxuICAgIHRoaXMuc2VsZWN0ZWQgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMpXHJcbiAgICAgIC50byh7XHJcbiAgICAgICAgYWxwaGE6IDFcclxuICAgICAgfSwgVHJpYW5nbGUuYW5pbWF0aW9uVGltZVJlY292ZXIsIFBoYXNlci5FYXNpbmcuQm91bmNlLk91dClcclxuICAgICAgLnN0YXJ0KCk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVDb2xvcihjb2xvclNldCwgZGVsYXkgPSAwKSB7XHJcbiAgICBjb25zdCBhbmltYXRpb25UaW1lID0gMTAwMDtcclxuICAgIHRoaXMuY29sb3JTZXQgPSBjb2xvclNldDtcclxuXHJcbiAgICBsZXQgaGlkZVR3ZWVuID0gdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzKVxyXG4gICAgICAudG8oe1xyXG4gICAgICAgIGFscGhhOiAwXHJcbiAgICAgIH0sIGFuaW1hdGlvblRpbWUpO1xyXG5cclxuICAgIGxldCBzaG93VHdlZW4gPSB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMpXHJcbiAgICAgIC50byh7XHJcbiAgICAgICAgYWxwaGE6IDFcclxuICAgICAgfSwgYW5pbWF0aW9uVGltZSk7XHJcblxyXG4gICAgaGlkZVR3ZWVuXHJcbiAgICAgIC5vbkNvbXBsZXRlXHJcbiAgICAgIC5hZGQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMudGludCA9IHRoaXMuY29sb3JTZXQuZ2V0UmFuZG9tQ29sb3IoKTtcclxuICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgaGlkZVR3ZWVuLmRlbGF5KGRlbGF5KTtcclxuXHJcbiAgICBoaWRlVHdlZW4uY2hhaW4oc2hvd1R3ZWVuKTtcclxuICAgIGhpZGVUd2Vlbi5zdGFydCgpO1xyXG4gIH1cclxuXHJcbiAgYmxpbmsoKSB7XHJcbiAgICBjb25zdCBsYXN0Q29sb3IgPSB0aGlzLnRpbnQ7XHJcbiAgICBsZXQgdHdlZW4gPSB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMpO1xyXG5cclxuICAgIHR3ZWVuLnRvKHtcclxuICAgICAgICBhbHBoYTogMlxyXG4gICAgICB9LCAxMDApXHJcbiAgICAgIC5vbkNvbXBsZXRlXHJcbiAgICAgIC5hZGQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMudGludCA9IGxhc3RDb2xvcjtcclxuICAgICAgICBUcmlhbmdsZS5ibGlua3MgPSBbXTtcclxuICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgdHdlZW4ub25TdGFydFxyXG4gICAgICAuYWRkKCgpID0+IHtcclxuICAgICAgICB0aGlzLmFscGhhID0gMDtcclxuICAgICAgICB0aGlzLnRpbnQgPSAweDAwRkYwMDtcclxuICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgaWYgKFRyaWFuZ2xlLmJsaW5rcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgVHJpYW5nbGUuYmxpbmtzLnB1c2godHdlZW4pO1xyXG4gICAgICB0d2Vlbi5zdGFydCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IGxhc3RCbGluayA9IFRyaWFuZ2xlLmJsaW5rc1tUcmlhbmdsZS5ibGlua3MubGVuZ3RoIC0gMV07XHJcbiAgICAgIGxhc3RCbGluay5jaGFpbih0d2Vlbik7XHJcbiAgICAgIFRyaWFuZ2xlLmJsaW5rcy5wdXNoKHR3ZWVuKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGhpbnRNZSgpIHtcclxuICAgIGxldCB0d2VlbiA9IHRoaXMuZ2FtZS5hZGQudHdlZW4odGhpcylcclxuICAgICAgLnRvKHtcclxuICAgICAgICB3aWR0aDogdGhpcy53aWR0aCAqIDAuNzUsXHJcbiAgICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCAqIDAuNzVcclxuICAgICAgfSwgMjAwKVxyXG4gICAgICAudG8oe1xyXG4gICAgICAgIHJvdGF0aW9uOiB0aGlzLnJvdGF0aW9uICsgTWF0aC5QSSAvIDMyXHJcbiAgICAgIH0sIDEwMClcclxuICAgICAgLnRvKHtcclxuICAgICAgICByb3RhdGlvbjogdGhpcy5yb3RhdGlvbiAtIE1hdGguUEkgKiAyIC8gMzJcclxuICAgICAgfSwgMTAwKVxyXG4gICAgICAudG8oe1xyXG4gICAgICAgIHJvdGF0aW9uOiBNYXRoLlBJICogdGhpcy5pc1JvdGF0ZWRcclxuICAgICAgfSwgMTAwKVxyXG4gICAgICAudG8oe1xyXG4gICAgICAgIHdpZHRoOiBUcmlhbmdsZS5zaXplLFxyXG4gICAgICAgIGhlaWdodDogVHJpYW5nbGUuc2l6ZVxyXG4gICAgICB9LCAyMDApO1xyXG5cclxuICAgIHR3ZWVuLnN0YXJ0KCk7XHJcbiAgfVxyXG59XHJcblxyXG5UcmlhbmdsZS5zaXplID0gNzE7XHJcblRyaWFuZ2xlLmJsaW5rcyA9IFtdO1xyXG5UcmlhbmdsZS5hbmltYXRpb25UaW1lU2VsZWN0ID0gMjAwO1xyXG5UcmlhbmdsZS5hbmltYXRpb25UaW1lRGVsZXRlID0gMjAwO1xyXG5UcmlhbmdsZS5hbmltYXRpb25UaW1lUmVjb3ZlciA9IDEwMDA7XHJcbkVuZ2luZS5UcmlhbmdsZSA9IFRyaWFuZ2xlO1xyXG4iLCJjbGFzcyBVbml2ZXJzZSBleHRlbmRzIFBoYXNlci5TcHJpdGUge1xyXG4gIGNvbnN0cnVjdG9yKGdhbWUpIHtcclxuICAgIHN1cGVyKGdhbWUsIGdhbWUud2lkdGggLyAyLCBnYW1lLmhlaWdodCAvIDIsIG5ldyBQaGFzZXIuQml0bWFwRGF0YShnYW1lLndpZHRoLCBnYW1lLmhlaWdodCkpO1xyXG4gICAgdGhpcy5hbmNob3Iuc2V0VG8oMC41KTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZSgpIHtcclxuICAgIGNvbnN0IG1heFNpemUgPSA0O1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDAwOyBpKyspIHtcclxuICAgICAgbGV0IHNpemUgPSB0aGlzLmdhbWUucm5kLmJldHdlZW4obWF4U2l6ZSAvIDIsIG1heFNpemUpO1xyXG4gICAgICBsZXQgYml0bWFwID0gbmV3IFBoYXNlci5CaXRtYXBEYXRhKHNpemUsIHNpemUpO1xyXG5cclxuICAgICAgYml0bWFwLmN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgYml0bWFwLmN0eC5maWxsU3R5bGUgPSAnd2hpdGUnO1xyXG4gICAgICBiaXRtYXAuY3R4LnJlY3QoMCwgMCwgc2l6ZSwgc2l6ZSk7XHJcbiAgICAgIGJpdG1hcC5jdHguZmlsbCgpO1xyXG5cclxuICAgICAgbGV0IHNwcml0ZSA9IG5ldyBQaGFzZXIuU3ByaXRlKFxyXG4gICAgICAgIHRoaXMuZ2FtZSxcclxuICAgICAgICB0aGlzLmdhbWUucm5kLmJldHdlZW4oLXRoaXMuZ2FtZS53aWR0aCwgdGhpcy5nYW1lLndpZHRoKSxcclxuICAgICAgICB0aGlzLmdhbWUucm5kLmJldHdlZW4oLXRoaXMuZ2FtZS5oZWlnaHQsIHRoaXMuZ2FtZS5oZWlnaHQpLFxyXG4gICAgICAgIGJpdG1hcFxyXG4gICAgICApO1xyXG5cclxuICAgICAgdGhpcy5hZGRDaGlsZChzcHJpdGUpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuRW5naW5lLlVuaXZlcnNlID0gVW5pdmVyc2U7XHJcbiIsImNsYXNzIEdhbWUgZXh0ZW5kcyBQaGFzZXIuU3RhdGUge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuXHJcbiAgICB3aW5kb3cuZ2cgPSB0aGlzO1xyXG4gIH1cclxuXHJcbiAgaW5pdChudW1iZXJPZkdyYWRhdGlvbikge1xyXG4gICAgdGhpcy5jb2xvclNldHMgPSBbXTtcclxuICAgIC8qKlxyXG4gICAgICogTnVtYmVyIG9mIGNvbG9yU2V0cyB3aWxsIHVzZSBpbiB0aGlzIGdhbWUgbGV2ZWxcclxuICAgICAqIEB0eXBlIHtbdHlwZV19XHJcbiAgICAgKi9cclxuICAgIHRoaXMubnVtYmVyT2ZHcmFkYXRpb24gPSBudW1iZXJPZkdyYWRhdGlvbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1hcmdpblRvcCBvZiB0cmlhbmdsZXMgbWF0cml4XHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICB0aGlzLm1hcmdpblRvcCA9IDEwMDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1hcmdpbkxlZnQgb2YgdHJpYW5nbGVzIG1hdHJpeFxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5tYXJnaW5MZWZ0ID0gNjQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNaW5pbWFsIHRyaWFuZ2xlcyBkZXN0cm95IGxlbmd0aFxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5taW5UcmlhbmdsZXNEZXN0cm95ID0gMztcclxuXHJcbiAgICB0aGlzLnRyaWFuZ2xlc01hdHJpeCA9IFtdO1xyXG4gICAgdGhpcy5zZWxlY3RlZFRyaWFuZ2xlcyA9IFtdO1xyXG5cclxuICAgIHRoaXMuc2NvcmUgPSAwO1xyXG5cclxuICAgIHRoaXMudHJpYW5nbGVNYXRyaXhXaWR0aCA9IDI1O1xyXG4gICAgdGhpcy50cmlhbmdsZU1hdHJpeEhlaWdodCA9IDk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGUoKSB7XHJcbiAgICB0aGlzLmdhbWUuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gJyMwMDAnO1xyXG5cclxuICAgIHRoaXMuY3JlYXRlVW5pdmVyc2UoKTtcclxuICAgIHRoaXMuY3JlYXRlR3JhZGF0aW9ucygpO1xyXG5cclxuICAgIHRoaXMudHJpYW5nbGVHcm91cCA9IHRoaXMuZ2FtZS5hZGQuZ3JvdXAoKTtcclxuXHJcbiAgICB0aGlzLnNrZXRjaCgpO1xyXG4gICAgdGhpcy5pbml0RXZlbnRzKCk7XHJcbiAgICB0aGlzLmNyZWF0ZVNjb3JlTGFibGUoKTtcclxuICAgIHRoaXMuaW5pdGlhbGl6YXRpb25GdWxsU2NyZWVuKCk7XHJcbiAgICB0aGlzLmNyZWF0ZUhpbnRUaW1lcigpO1xyXG5cclxuICAgIHRoaXMuZm9yY2VQb3J0cmFpdCA9IHRydWU7XHJcblxyXG4gICAgd2luZG93LnRlc3QgPSB0aGlzLmV4aXN0TW92ZS5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5nYW1lLnRpbWUuYWR2YW5jZWRUaW1pbmcgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgLy8gdGhpcy5nYW1lLmRlYnVnLmdlb20obmV3IFBoYXNlci5MaW5lKHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYLCAwLCB0aGlzLmdhbWUud29ybGQuY2VudGVyWCwgdGhpcy5nYW1lLmhlaWdodCksICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMiknKTtcclxuICAgIC8vIHRoaXMuZ2FtZS5kZWJ1Zy5nZW9tKG5ldyBQaGFzZXIuTGluZSgwLCB0aGlzLmdhbWUud29ybGQuY2VudGVyWSwgdGhpcy5nYW1lLndpZHRoLCB0aGlzLmdhbWUud29ybGQuY2VudGVyWSksICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMiknKTtcclxuICAgIC8vIHRoaXMuZ2FtZS5kZWJ1Zy5pbnB1dEluZm8oNTAsIDUwLCAncmdiKDI1NSwgMjU1LCAyNTUpJyk7XHJcbiAgICAvLyB0aGlzLmdhbWUuZGVidWcuZ2VvbSh0aGlzLnRyaWFuZ2xlR3JvdXAuZ2V0Qm91bmRzKCksICdyZ2JhKDM3LCA0MywgMTg5LCAwLjUpJyk7XHJcbiAgICB0aGlzLnVuaXZlcnNlLnJvdGF0aW9uICs9IE1hdGguUEkgLyAxODAwIC8gMzAgKiAyLjU7XHJcbiAgICB0aGlzLmdhbWUuZGVidWcudGV4dCh0aGlzLmdhbWUudGltZS5mcHMsIDUwLCA1MCwgJ3doaXRlJyk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVHcmFkYXRpb25zKCkge1xyXG4gICAgbGV0IGFsbEdyYWRhdGlvbiA9IFBoYXNlci5BcnJheVV0aWxzLnNodWZmbGUoQ29sb3JTZXQuR1JBREFUSU9OUyk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm51bWJlck9mR3JhZGF0aW9uOyBpKyspIHtcclxuICAgICAgbGV0IGNvbG9yU2V0ID0gbmV3IENvbG9yU2V0KGFsbEdyYWRhdGlvbltpXSk7XHJcbiAgICAgIHRoaXMuY29sb3JTZXRzLnB1c2goY29sb3JTZXQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY3JlYXRlVW5pdmVyc2UoKSB7XHJcbiAgICB0aGlzLnVuaXZlcnNlID0gbmV3IEVuZ2luZS5Vbml2ZXJzZSh0aGlzLmdhbWUpO1xyXG5cclxuICAgIHRoaXMudW5pdmVyc2UuY3JlYXRlKCk7XHJcblxyXG4gICAgdGhpcy5nYW1lLmFkZC5leGlzdGluZyh0aGlzLnVuaXZlcnNlKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZUhpbnRUaW1lcigpIHtcclxuICAgIGNvbnN0IGhpbnRUaW1lb3V0ID0gMjAwMDA7XHJcbiAgICB0aGlzLmhpbnRUaW1lciA9IHRoaXMuZ2FtZS50aW1lLmNyZWF0ZSgpO1xyXG5cclxuICAgIHRoaXMuaGludFRpbWVyLmxvb3AoaGludFRpbWVvdXQsIHRoaXMudmlzdWFsaXNhdGlvbkhpbnQsIHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgdmlzdWFsaXNhdGlvbkhpbnQoKSB7XHJcbiAgICBsZXQgdHJpYW5nbGUgPSB0aGlzLmdldEhpbnRUcmlhbmdsZSgpO1xyXG5cclxuICAgIGlmICh0cmlhbmdsZSAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICB0cmlhbmdsZS5oaW50TWUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYWxpemF0aW9uIGV2ZW50IGluIHRoZSBnYW1lXHJcbiAgICovXHJcbiAgaW5pdEV2ZW50cygpIHtcclxuICAgIHRoaXMuZ2FtZS5pbnB1dC5vblVwLmFkZCh0aGlzLmRlc3Ryb3lUcmlhbmdsZSwgdGhpcyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgdHJpYW5nbGVzIG9uIGNhbnZhc1xyXG4gICAqL1xyXG4gIHNrZXRjaCgpIHtcclxuICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy50cmlhbmdsZU1hdHJpeFdpZHRoOyB4KyspIHtcclxuICAgICAgdGhpcy50cmlhbmdsZXNNYXRyaXhbeF0gPSBbXTtcclxuICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLnRyaWFuZ2xlTWF0cml4SGVpZ2h0OyB5KyspIHtcclxuICAgICAgICBsZXQgcG9zWCA9IHggKiAoRW5naW5lLlRyaWFuZ2xlLnNpemUgLyAyIC0gMSk7XHJcbiAgICAgICAgbGV0IHBvc1kgPSB5ICogKEVuZ2luZS5UcmlhbmdsZS5zaXplIC0gMSk7XHJcbiAgICAgICAgbGV0IGlzUm90YXRlZCA9IHggJSAyID09PSAxO1xyXG4gICAgICAgIGxldCBjb2xvclNldCA9IHRoaXMuZ2FtZS5ybmQucGljayh0aGlzLmNvbG9yU2V0cyk7XHJcblxyXG4gICAgICAgIGlmICh5ICUgMiA9PT0gMSkge1xyXG4gICAgICAgICAgaXNSb3RhdGVkID0gIWlzUm90YXRlZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0cmlhbmdsZSA9IG5ldyBFbmdpbmUuVHJpYW5nbGUoXHJcbiAgICAgICAgICB0aGlzLmdhbWUsXHJcbiAgICAgICAgICBwb3NYLFxyXG4gICAgICAgICAgcG9zWSxcclxuICAgICAgICAgIGlzUm90YXRlZCxcclxuICAgICAgICAgIGNvbG9yU2V0LCB7XHJcbiAgICAgICAgICAgIHgsXHJcbiAgICAgICAgICAgIHlcclxuICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICB0cmlhbmdsZS5ldmVudHMub25JbnB1dE92ZXIuYWRkKHRoaXMuc2VsZWN0VHJpYW5nbGUsIHRoaXMpO1xyXG4gICAgICAgIHRyaWFuZ2xlLmV2ZW50cy5vbklucHV0RG93bi5hZGQodGhpcy5zZWxlY3RUcmlhbmdsZSwgdGhpcyk7XHJcbiAgICAgICAgdHJpYW5nbGUuZXZlbnRzLmRlbGV0ZUNvbXBsZXRlLmFkZCh0aGlzLnJlY292ZXJUcmlhbmdsZSwgdGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMudHJpYW5nbGVzTWF0cml4W3hdW3ldID0gdHJpYW5nbGU7XHJcbiAgICAgICAgdGhpcy50cmlhbmdsZUdyb3VwLmFkZCh0cmlhbmdsZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNlbnRlcmluZ01hdHJpeCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVzdHJveSBvciB1bnNlbGVjdCB0cmlhbmdsZXNcclxuICAgKi9cclxuICBkZXN0cm95VHJpYW5nbGUoKSB7XHJcbiAgICBsZXQgaXNVbnNlbGVjdCA9IHRoaXMuc2VsZWN0ZWRUcmlhbmdsZXMubGVuZ3RoIDwgdGhpcy5taW5UcmlhbmdsZXNEZXN0cm95O1xyXG5cclxuICAgIGlmICghaXNVbnNlbGVjdCkge1xyXG4gICAgICB0aGlzLnVwZGF0ZVNjb3JlKE1hdGgucG93KHRoaXMuc2VsZWN0ZWRUcmlhbmdsZXMubGVuZ3RoLCAyLjE1KSAqIDEwKTtcclxuICAgICAgdGhpcy5oaW50VGltZXIuc3RvcChmYWxzZSk7XHJcbiAgICAgIHRoaXMuaGludFRpbWVyLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgd2hpbGUgKHRoaXMuc2VsZWN0ZWRUcmlhbmdsZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICBsZXQgdHJpYW5nbGUgPSB0aGlzLnNlbGVjdGVkVHJpYW5nbGVzLnBvcCgpO1xyXG4gICAgICBpZiAoaXNVbnNlbGVjdCkge1xyXG4gICAgICAgIHRyaWFuZ2xlLnVuc2VsZWN0KCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdHJpYW5nbGUuZGVsZXRlKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWlzVW5zZWxlY3QpIHtcclxuICAgICAgbGV0IHRpbWVyRXhpc3RNb3ZlID0gdGhpcy5nYW1lLnRpbWUuY3JlYXRlKCk7XHJcblxyXG4gICAgICB0aW1lckV4aXN0TW92ZS5hZGQoXHJcbiAgICAgICAgVHJpYW5nbGUuYW5pbWF0aW9uVGltZURlbGV0ZSArXHJcbiAgICAgICAgVHJpYW5nbGUuYW5pbWF0aW9uVGltZVJlY292ZXIsXHJcbiAgICAgICAgdGhpcy5wcm9jZXNzUG9zaXRpb24sXHJcbiAgICAgICAgdGhpc1xyXG4gICAgICApO1xyXG5cclxuICAgICAgdGltZXJFeGlzdE1vdmUuc3RhcnQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlY292ZXJUcmlhbmdsZSh0cmlhbmdsZSkge1xyXG4gICAgdHJpYW5nbGUucmVjb3Zlcih0aGlzLmdhbWUucm5kLnBpY2sodGhpcy5jb2xvclNldHMpKTtcclxuICB9XHJcblxyXG4gIHNlbGVjdFRyaWFuZ2xlKHRyaWFuZ2xlLCBwb2ludCkge1xyXG4gICAgaWYgKCF0aGlzLmdhbWUuaW5wdXQuYWN0aXZlUG9pbnRlci5pc0Rvd24pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnNlbGVjdGVkVHJpYW5nbGVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICB0cmlhbmdsZS5zZWxlY3QoKTtcclxuICAgICAgdGhpcy5zZWxlY3RlZFRyaWFuZ2xlcy5wdXNoKHRyaWFuZ2xlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxldCBsYXN0U2VsZWN0ZWRUcmlhbmdsZSA9IHRoaXMuc2VsZWN0ZWRUcmlhbmdsZXNbdGhpcy5zZWxlY3RlZFRyaWFuZ2xlcy5sZW5ndGggLSAxXTtcclxuICAgICAgbGV0IHByZUxhc3RTZWxlY3RlZFRyaWFuZ2xlID0gdGhpcy5zZWxlY3RlZFRyaWFuZ2xlc1t0aGlzLnNlbGVjdGVkVHJpYW5nbGVzLmxlbmd0aCAtIDJdO1xyXG5cclxuICAgICAgaWYgKHRyaWFuZ2xlLnNlbGVjdGVkICYmIHRyaWFuZ2xlID09PSBwcmVMYXN0U2VsZWN0ZWRUcmlhbmdsZSkge1xyXG4gICAgICAgIGxhc3RTZWxlY3RlZFRyaWFuZ2xlLnVuc2VsZWN0KCk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFRyaWFuZ2xlcy5wb3AoKTtcclxuICAgICAgfSBlbHNlIGlmICghdHJpYW5nbGUuc2VsZWN0ZWQgJiZcclxuICAgICAgICB0aGlzLmNhblRyaWFuZ2xlTGluayhsYXN0U2VsZWN0ZWRUcmlhbmdsZSwgdHJpYW5nbGUpICYmXHJcbiAgICAgICAgbGFzdFNlbGVjdGVkVHJpYW5nbGUuY29sb3JTZXQgPT09IHRyaWFuZ2xlLmNvbG9yU2V0XHJcbiAgICAgICkge1xyXG4gICAgICAgIHRyaWFuZ2xlLnNlbGVjdCgpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUcmlhbmdsZXMucHVzaCh0cmlhbmdsZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrIHRyaWFuZ2xlcyBsaW5rXHJcbiAgICovXHJcbiAgY2FuVHJpYW5nbGVMaW5rKHRyMSwgdHIyKSB7XHJcbiAgICBpZiAodHIxLm1hdHJpeFBvcy55ID09PSB0cjIubWF0cml4UG9zLnkpIHtcclxuICAgICAgaWYgKHRyMS5tYXRyaXhQb3MueCArIDEgPT09IHRyMi5tYXRyaXhQb3MueCB8fFxyXG4gICAgICAgIHRyMS5tYXRyaXhQb3MueCAtIDEgPT09IHRyMi5tYXRyaXhQb3MueCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHRyMS5tYXRyaXhQb3MueCA9PT0gdHIyLm1hdHJpeFBvcy54KSB7XHJcbiAgICAgIGlmICh0cjEubWF0cml4UG9zLnggJSAyID09PSAwKSB7XHJcbiAgICAgICAgaWYgKHRyMS5pc1JvdGF0ZWQgJiYgdHIyLm1hdHJpeFBvcy55ID09PSB0cjEubWF0cml4UG9zLnkgLSAxKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKCF0cjEuaXNSb3RhdGVkICYmIHRyMi5tYXRyaXhQb3MueSA9PT0gdHIxLm1hdHJpeFBvcy55ICsgMSkge1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICghdHIxLmlzUm90YXRlZCAmJiB0cjIubWF0cml4UG9zLnkgPT09IHRyMS5tYXRyaXhQb3MueSArIDEpIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHIxLmlzUm90YXRlZCAmJiB0cjIubWF0cml4UG9zLnkgPT09IHRyMS5tYXRyaXhQb3MueSAtIDEpIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBzY29yZSBvbiBzdGFnZVxyXG4gICAqL1xyXG4gIGNyZWF0ZVNjb3JlTGFibGUoKSB7XHJcbiAgICBjb25zdCByYW5kb21Db2xvclNldCA9IHRoaXMuZ2FtZS5ybmQucGljayh0aGlzLmNvbG9yU2V0cyk7XHJcbiAgICBjb25zdCBjb2xvciA9ICcjZmZmJzsgLy8gKyBQaGFzZXIuQ29sb3IuY29tcG9uZW50VG9IZXgocmFuZG9tQ29sb3JTZXQuZ2V0TGFzdENvbG9yKCkpO1xyXG4gICAgY29uc3QgbWFyZ2luUmlnaHQgPSAxNTtcclxuICAgIGNvbnN0IG1hcmdpblRvcCA9IDE1O1xyXG5cclxuICAgIGNvbnN0IHN0eWxlID0ge1xyXG4gICAgICBmb250OiAnNDJweCBPcGVuIFNhbnMnLFxyXG4gICAgICBmb250U3R5bGU6ICdpdGFsaWMnLFxyXG4gICAgICBmaWxsOiBjb2xvclxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2NvcmVMYWJsZSA9IG5ldyBFbmdpbmUuU2NvcmVMYWJsZShcclxuICAgICAgdGhpcy5nYW1lLFxyXG4gICAgICB0aGlzLmdhbWUud2lkdGggLSBtYXJnaW5SaWdodCxcclxuICAgICAgbWFyZ2luVG9wLFxyXG4gICAgICAwLFxyXG4gICAgICBzdHlsZVxyXG4gICAgKTtcclxuICAgIHRoaXMuc2NvcmVMYWJsZS5hbmNob3Iuc2V0VG8oMSwgMCk7XHJcblxyXG4gICAgLy8gVE9ETzogVEVNUFxyXG4gICAgdGhpcy5zY29yZUxhYmxlLmlucHV0RW5hYmxlZCA9IHRydWU7XHJcbiAgICB0aGlzLnNjb3JlTGFibGUuZXZlbnRzLm9uSW5wdXREb3duLmFkZCh0aGlzLnRvZ2dsZUZ1bGxTY3JlZW4sIHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgaW5pdGlhbGl6YXRpb25GdWxsU2NyZWVuKCkge1xyXG4gICAgdGhpcy5nYW1lLnNjYWxlLmZ1bGxTY3JlZW5TY2FsZU1vZGUgPSBQaGFzZXIuU2NhbGVNYW5hZ2VyLlJFU0laRTtcclxuICAgIHRoaXMuZ2FtZS5zY2FsZS5vbkZ1bGxTY3JlZW5DaGFuZ2VcclxuICAgICAgLmFkZCh0aGlzLnJlc2l6ZVNjcmVlbiwgdGhpcyk7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVGdWxsU2NyZWVuKCkge1xyXG4gICAgaWYgKHRoaXMuZ2FtZS5zY2FsZS5pc0Z1bGxTY3JlZW4pIHtcclxuICAgICAgdGhpcy5nYW1lLnNjYWxlLnN0b3BGdWxsU2NyZWVuKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmdhbWUuc2NhbGUuc3RhcnRGdWxsU2NyZWVuKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB1cGRhdGVTY29yZSh2YWwpIHtcclxuICAgIHZhbCA9IE1hdGgucm91bmQodmFsKTtcclxuXHJcbiAgICB0aGlzLnNjb3JlICs9IHZhbDtcclxuICAgIHRoaXMuc2NvcmVMYWJsZS5jaGFuZ2VWYWx1ZSh0aGlzLnNjb3JlKTtcclxuICB9XHJcblxyXG4gIHJlc2l6ZVNjcmVlbigpIHtcclxuICAgIHRoaXMuc2NvcmVMYWJsZS54ID0gdGhpcy5nYW1lLndpZHRoIC0gMTU7XHJcbiAgICB0aGlzLnNjb3JlTGFibGUueSA9IDE1O1xyXG5cclxuICAgIHRoaXMudW5pdmVyc2UueCA9IHRoaXMuZ2FtZS53aWR0aCAvIDI7XHJcbiAgICB0aGlzLnVuaXZlcnNlLnkgPSB0aGlzLmdhbWUuaGVpZ2h0IC8gMjtcclxuXHJcbiAgICB0aGlzLmNlbnRlcmluZ01hdHJpeCgpO1xyXG4gIH1cclxuXHJcbiAgY2VudGVyaW5nTWF0cml4KCkge1xyXG4gICAgY29uc3QgaGFsZlRyaWFuZ2xlU2l6ZSA9IEVuZ2luZS5UcmlhbmdsZS5zaXplIC8gMjtcclxuXHJcbiAgICB0aGlzLnRyaWFuZ2xlR3JvdXAueCA9IHRoaXMuZ2FtZS53aWR0aCAvIDIgLSB0aGlzLnRyaWFuZ2xlR3JvdXAud2lkdGggLyAyICsgaGFsZlRyaWFuZ2xlU2l6ZTtcclxuICAgIHRoaXMudHJpYW5nbGVHcm91cC55ID0gdGhpcy5nYW1lLmhlaWdodCAvIDIgLSB0aGlzLnRyaWFuZ2xlR3JvdXAuaGVpZ2h0IC8gMiArIGhhbGZUcmlhbmdsZVNpemU7XHJcbiAgfVxyXG5cclxuICBleGlzdE1vdmUoKSB7XHJcbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMudHJpYW5nbGVNYXRyaXhIZWlnaHQ7IHkrKykge1xyXG4gICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMudHJpYW5nbGVNYXRyaXhXaWR0aDsgeCsrKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuY29tcGFyZUNvbWJpbmF0aW9ucyh4LCB5KTtcclxuXHJcbiAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgY29tcGFyZUNvbWJpbmF0aW9ucyh4LCB5KSB7XHJcbiAgICBsZXQgdHJpYW5nbGUgPSB0aGlzLnRyaWFuZ2xlc01hdHJpeFt4XVt5XTtcclxuICAgIGxldCBzdW1tID0gMTtcclxuXHJcbiAgICBpZiAodHJpYW5nbGUuaXNSb3RhdGVkKSB7XHJcbiAgICAgIGxldCB0cjEgPSB4IC0gMSA8IDAgPyB7Y29sb3JTZXQ6IG51bGx9IDogdGhpcy50cmlhbmdsZXNNYXRyaXhbeCAtIDFdW3ldO1xyXG4gICAgICBsZXQgdHIyID0geCArIDEgPiB0aGlzLnRyaWFuZ2xlTWF0cml4V2lkdGggLSAxID8ge2NvbG9yU2V0OiBudWxsfSA6IHRoaXMudHJpYW5nbGVzTWF0cml4W3ggKyAxXVt5XTtcclxuXHJcbiAgICAgIHN1bW0gKz0gdHJpYW5nbGUuY29sb3JTZXQgPT09IHRyMS5jb2xvclNldCA/IDEgOiAwO1xyXG4gICAgICBzdW1tICs9IHRyaWFuZ2xlLmNvbG9yU2V0ID09PSB0cjIuY29sb3JTZXQgPyAxIDogMDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxldCB0cjEgPSB4IC0gMSA8IDAgPyB7Y29sb3JTZXQ6IG51bGx9IDogdGhpcy50cmlhbmdsZXNNYXRyaXhbeCAtIDFdW3ldO1xyXG4gICAgICBsZXQgdHIyID0geCArIDEgPiB0aGlzLnRyaWFuZ2xlTWF0cml4V2lkdGggLSAxID8ge2NvbG9yU2V0OiBudWxsfSA6IHRoaXMudHJpYW5nbGVzTWF0cml4W3ggKyAxXVt5XTtcclxuICAgICAgbGV0IHRyMyA9IHkgKyAxID4gdGhpcy50cmlhbmdsZU1hdHJpeEhlaWdodCAtIDEgPyB7Y29sb3JTZXQ6IG51bGx9IDogdGhpcy50cmlhbmdsZXNNYXRyaXhbeF1beSArIDFdO1xyXG5cclxuICAgICAgaWYgKHRyMy5jb2xvclNldCA9PT0gdHJpYW5nbGUuY29sb3JTZXQpIHtcclxuICAgICAgICBzdW1tICs9IDE7XHJcblxyXG4gICAgICAgIGxldCB0cjQgPSB4IC0gMSA8IDAgPyB7Y29sb3JTZXQ6IG51bGx9IDogdGhpcy50cmlhbmdsZXNNYXRyaXhbeCAtIDFdW3kgKyAxXTtcclxuICAgICAgICBsZXQgdHI1ID0geCArIDEgPiB0aGlzLnRyaWFuZ2xlTWF0cml4V2lkdGggLSAxID8ge2NvbG9yU2V0OiBudWxsfSA6IHRoaXMudHJpYW5nbGVzTWF0cml4W3ggKyAxXVt5ICsgMV07XHJcblxyXG4gICAgICAgIHN1bW0gKz0gdHJpYW5nbGUuY29sb3JTZXQgPT09IHRyNC5jb2xvclNldCA/IDEgOiAwO1xyXG4gICAgICAgIHN1bW0gKz0gdHJpYW5nbGUuY29sb3JTZXQgPT09IHRyNS5jb2xvclNldCA/IDEgOiAwO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzdW1tICs9IHRyaWFuZ2xlLmNvbG9yU2V0ID09PSB0cjEuY29sb3JTZXQgPyAxIDogMDtcclxuICAgICAgc3VtbSArPSB0cmlhbmdsZS5jb2xvclNldCA9PT0gdHIyLmNvbG9yU2V0ID8gMSA6IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHN1bW0gPiB0aGlzLm1pblRyaWFuZ2xlc0Rlc3Ryb3kgLSAxO1xyXG4gIH1cclxuXHJcbiAgcmVidWlsZE1hcCgpIHtcclxuICAgIGNvbnN0IHRpbWVEZWxheSA9IDUwO1xyXG5cclxuICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy50cmlhbmdsZU1hdHJpeFdpZHRoOyB4KyspIHtcclxuICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLnRyaWFuZ2xlTWF0cml4SGVpZ2h0OyB5KyspIHtcclxuICAgICAgICBsZXQgdHJpYW5nbGUgPSB0aGlzLnRyaWFuZ2xlc01hdHJpeFt4XVt5XTtcclxuICAgICAgICBsZXQgcmFuZG9tQ29sb3JTZXQgPSB0aGlzLmdhbWUucm5kLnBpY2sodGhpcy5jb2xvclNldHMpO1xyXG5cclxuICAgICAgICB0cmlhbmdsZS51cGRhdGVDb2xvcihyYW5kb21Db2xvclNldCwgeCAqIHRpbWVEZWxheSArIHkgKiB0aW1lRGVsYXkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcm9jZXNzUG9zaXRpb24oKSB7XHJcbiAgICBpZiAoIXRoaXMuZXhpc3RNb3ZlKCkpIHtcclxuICAgICAgY29uc3QgZGVsYXlEZXN0cm95ID0gNTAwMDtcclxuICAgICAgbGV0IHRpbWVyID0gdGhpcy5nYW1lLnRpbWUuY3JlYXRlKCk7XHJcblxyXG4gICAgICB0aW1lci5hZGQoZGVsYXlEZXN0cm95LCB0aGlzLnJlYnVpbGRNYXAsIHRoaXMpO1xyXG4gICAgICB0aW1lci5zdGFydCgwKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldEhpbnRUcmlhbmdsZSgpIHtcclxuICAgIGxldCBhbGxSZXN1bHRzID0gW107XHJcbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMudHJpYW5nbGVNYXRyaXhIZWlnaHQ7IHkrKykge1xyXG4gICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMudHJpYW5nbGVNYXRyaXhXaWR0aDsgeCsrKSB7XHJcbiAgICAgICAgbGV0IGNvbWJpbmF0aW9uID0gdGhpcy5jb21wYXJlQ29tYmluYXRpb25zKHgsIHkpO1xyXG5cclxuICAgICAgICBpZiAoY29tYmluYXRpb24pIHtcclxuICAgICAgICAgICBhbGxSZXN1bHRzLnB1c2godGhpcy50cmlhbmdsZXNNYXRyaXhbeF1beV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLmdhbWUucm5kLnBpY2soYWxsUmVzdWx0cyk7XHJcbiAgfVxyXG59XHJcblxyXG5FbmdpbmUuR2FtZSA9IEdhbWU7XHJcbiIsbnVsbCwiRW5naW5lLmdhbWUgPSBuZXcgUGhhc2VyLkdhbWUoRW5naW5lLm1heFdpZHRoLCBFbmdpbmUubWF4SGVpZ2h0LCBQaGFzZXIuQVVUTyk7XHJcblxyXG5FbmdpbmUuZ2FtZS5zdGF0ZS5hZGQoJ0Jvb3QnLCBFbmdpbmUuQm9vdCk7XHJcbkVuZ2luZS5nYW1lLnN0YXRlLmFkZCgnTG9hZGVyJywgRW5naW5lLkxvYWRlcik7XHJcbi8vIEVuZ2luZS5nYW1lLnN0YXRlLmFkZCgnTWVudScsIEVuZ2luZS5NZW51KTtcclxuRW5naW5lLmdhbWUuc3RhdGUuYWRkKCdHYW1lJywgRW5naW5lLkdhbWUpO1xyXG4vLyBFbmdpbmUuZ2FtZS5zdGF0ZS5hZGQoJ1Njb3JlQm9hcmQnLCBFbmdpbmUuU2NvcmVCb2FyZCk7XHJcblxyXG5FbmdpbmUuZ2FtZS5zdGF0ZS5zdGFydCgnQm9vdCcpO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
