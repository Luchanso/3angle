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
      var traingleStack = [];
      var baseScore = 1;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS5qcyIsImJvb3QuanMiLCJsb2FkZXIuanMiLCJtZW51LmpzIiwiY29sb3JzZXQuanMiLCJzY29yZWxhYmxlLmpzIiwidHJpYW5nbGUuanMiLCJ1bml2ZXJzZS5qcyIsImdhbWUuanMiLCJzY29yZWJvYXJkLmpzIiwiYXBwLmpzIl0sIm5hbWVzIjpbIkVuZ2luZSIsIm1pbldpZHRoIiwibWluSGVpZ2h0IiwibWF4V2lkdGgiLCJtYXhIZWlnaHQiLCJrZXlzIiwidHJpYW5nbGUiLCJCb290Iiwic2NhbGUiLCJwYWdlQWxpZ25Ib3Jpem9udGFsbHkiLCJwYWdlQWxpZ25WZXJ0aWNhbGx5Iiwic3RhdGUiLCJzdGFydCIsIlBoYXNlciIsIlN0YXRlIiwiTG9hZGVyIiwiZ2FtZSIsInN0YWdlIiwiYmFja2dyb3VuZENvbG9yIiwiYWRkUHJvZ3Jlc3NMYWJsZSIsImxvYWQiLCJvbkZpbGVDb21wbGV0ZSIsImFkZCIsInJlZnJlc2hQcm9ncmVzcyIsImdlbmVyYXRlVHJpYW5nbGUiLCJudW1iZXJPZkdyYWRhdGlvbiIsInN0eWxlIiwiZm9udCIsImZpbGwiLCJwcm9ncmVzc0xhYmxlIiwidGV4dCIsIndvcmxkIiwiY2VudGVyWCIsImNlbnRlclkiLCJhbmNob3IiLCJzZXRUbyIsInByb2dyZXNzIiwiY2FjaGVLZXkiLCJzdWNjZXNzIiwidG90YWxMb2FkZWQiLCJ0b3RhbEZpbGVzIiwic2l6ZSIsImJpdG1hcCIsIkJpdG1hcERhdGEiLCJjdHgiLCJiZWdpblBhdGgiLCJmaWxsU3R5bGUiLCJtb3ZlVG8iLCJsaW5lVG8iLCJjYWNoZSIsImFkZEJpdG1hcERhdGEiLCJDb2xvclNldCIsImdyYWRpdGlvbiIsInJuZCIsInBpY2siLCJudW1iZXIiLCJsZW5ndGgiLCJHUkFEQVRJT05TIiwiU2NvcmVMYWJsZSIsIngiLCJ5Iiwic2NvcmUiLCJNYXRoIiwicm91bmQiLCJleGlzdGluZyIsInR3ZWVucyIsInJlbW92ZSIsInR3ZWVuIiwidG8iLCJhbmltYXRpb25DaGFuZ2VWYWwiLCJvblVwZGF0ZUNhbGxiYWNrIiwib25Db21wbGV0ZSIsIlRleHQiLCJUcmlhbmdsZSIsImlzUm90YXRlZCIsImNvbG9yU2V0IiwibWF0cml4UG9zaXRpb24iLCJnZXRCaXRtYXBEYXRhIiwid2lkdGgiLCJoZWlnaHQiLCJ0aW50IiwiZ2V0UmFuZG9tQ29sb3IiLCJtYXRyaXhQb3MiLCJpbnB1dEVuYWJsZWQiLCJpbnB1dCIsInBpeGVsUGVyZmVjdE92ZXIiLCJwaXhlbFBlcmZlY3RDbGljayIsImV2ZW50cyIsImRlbGV0ZUNvbXBsZXRlIiwiU2lnbmFsIiwic2VsZWN0ZWQiLCJyb3RhdGlvbiIsIlBJIiwiYWRkQ2hpbGQiLCJhbmltYXRpb25UaW1lU2VsZWN0IiwiYWN0aXZlUG9pbnRlciIsImlzRG93biIsImFscGhhIiwiYW5pbWF0aW9uVGltZURlbGV0ZSIsImRpc3BhdGNoIiwiYW5pbWF0aW9uVGltZVJlY292ZXIiLCJFYXNpbmciLCJCb3VuY2UiLCJPdXQiLCJkZWxheSIsImFuaW1hdGlvblRpbWUiLCJoaWRlVHdlZW4iLCJzaG93VHdlZW4iLCJjaGFpbiIsImxhc3RDb2xvciIsImJsaW5rcyIsIm9uU3RhcnQiLCJwdXNoIiwibGFzdEJsaW5rIiwiU3ByaXRlIiwiVW5pdmVyc2UiLCJtYXhTaXplIiwiaSIsImJldHdlZW4iLCJyZWN0Iiwic3ByaXRlIiwiR2FtZSIsIndpbmRvdyIsImdnIiwiY29sb3JTZXRzIiwibWFyZ2luVG9wIiwibWFyZ2luTGVmdCIsIm1pblRyaWFuZ2xlc0Rlc3Ryb3kiLCJ0cmlhbmdsZXNNYXRyaXgiLCJzZWxlY3RlZFRyaWFuZ2xlcyIsInRyaWFuZ2xlTWF0cml4V2lkdGgiLCJ0cmlhbmdsZU1hdHJpeEhlaWdodCIsImNyZWF0ZVVuaXZlcnNlIiwiY3JlYXRlR3JhZGF0aW9ucyIsInRyaWFuZ2xlR3JvdXAiLCJncm91cCIsInNrZXRjaCIsImluaXRFdmVudHMiLCJjcmVhdGVTY29yZUxhYmxlIiwiaW5pdGlhbGl6YXRpb25GdWxsU2NyZWVuIiwiZm9yY2VQb3J0cmFpdCIsInRlc3QiLCJleGlzdE1vdmUiLCJiaW5kIiwidGltZSIsImFkdmFuY2VkVGltaW5nIiwidW5pdmVyc2UiLCJkZWJ1ZyIsImZwcyIsImFsbEdyYWRhdGlvbiIsIkFycmF5VXRpbHMiLCJzaHVmZmxlIiwiY3JlYXRlIiwib25VcCIsImRlc3Ryb3lUcmlhbmdsZSIsInBvc1giLCJwb3NZIiwib25JbnB1dE92ZXIiLCJzZWxlY3RUcmlhbmdsZSIsIm9uSW5wdXREb3duIiwicmVjb3ZlclRyaWFuZ2xlIiwiY2VudGVyaW5nTWF0cml4IiwiaXNVbnNlbGVjdCIsInVwZGF0ZVNjb3JlIiwicG93IiwicG9wIiwidW5zZWxlY3QiLCJkZWxldGUiLCJ0aW1lckV4aXN0TW92ZSIsInByb2Nlc3NQb3NpdGlvbiIsInJlY292ZXIiLCJwb2ludCIsInNlbGVjdCIsImxhc3RTZWxlY3RlZFRyaWFuZ2xlIiwicHJlTGFzdFNlbGVjdGVkVHJpYW5nbGUiLCJjYW5UcmlhbmdsZUxpbmsiLCJ0cjEiLCJ0cjIiLCJyYW5kb21Db2xvclNldCIsImNvbG9yIiwibWFyZ2luUmlnaHQiLCJmb250U3R5bGUiLCJzY29yZUxhYmxlIiwidG9nZ2xlRnVsbFNjcmVlbiIsImZ1bGxTY3JlZW5TY2FsZU1vZGUiLCJTY2FsZU1hbmFnZXIiLCJSRVNJWkUiLCJvbkZ1bGxTY3JlZW5DaGFuZ2UiLCJyZXNpemVTY3JlZW4iLCJpc0Z1bGxTY3JlZW4iLCJzdG9wRnVsbFNjcmVlbiIsInN0YXJ0RnVsbFNjcmVlbiIsInZhbCIsImNoYW5nZVZhbHVlIiwiaGFsZlRyaWFuZ2xlU2l6ZSIsInRyYWluZ2xlU3RhY2siLCJiYXNlU2NvcmUiLCJyZXN1bHQiLCJjb21wYXJlQ29tYmluYXRpb25zIiwic3VtbSIsInRyMyIsInRyNCIsInRyNSIsInRpbWVEZWxheSIsInVwZGF0ZUNvbG9yIiwiZGVsYXlEZXN0cm95IiwidGltZXIiLCJyZWJ1aWxkTWFwIiwiQVVUTyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxTQUFTO0FBQ1hDLFlB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QixFQUE4QnRCLE9BQU9PLElBQXJDO0FBQ0FQLE9BQU9nQixJQUFQLENBQVlMLEtBQVosQ0FBa0JXLEdBQWxCLENBQXNCLFFBQXRCLEVBQWdDdEIsT0FBT2UsTUFBdkM7QUFDQTtBQUNBZixPQUFPZ0IsSUFBUCxDQUFZTCxLQUFaLENBQWtCVyxHQUFsQixDQUFzQixNQUF0QixFQUE4QnRCLE9BQU95SCxJQUFyQztBQUNBOztBQUVBekgsT0FBT2dCLElBQVAsQ0FBWUwsS0FBWixDQUFrQkMsS0FBbEIsQ0FBd0IsTUFBeEIiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsibGV0IEVuZ2luZSA9IHtcclxuICBtaW5XaWR0aDogNjQwLFxyXG4gIG1pbkhlaWdodDogMzIwLFxyXG4gIG1heFdpZHRoOiAxMzY2LFxyXG4gIG1heEhlaWdodDogNzY4LFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNwcml0ZSwgQml0bWFwLCBldGMuLi4gY2hhY2hlIGtleXNcclxuICogQHR5cGUge09iamVjdH1cclxuICovXHJcbkVuZ2luZS5rZXlzID0ge1xyXG4gIHRyaWFuZ2xlOiAndHJpYW5nbGUnLFxyXG59XHJcbiIsImNsYXNzIEJvb3QgZXh0ZW5kcyBQaGFzZXIuU3RhdGUge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIHByZWxvYWQoKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgY3JlYXRlKCkge1xyXG4gICAgdGhpcy5zY2FsZS5wYWdlQWxpZ25Ib3Jpem9udGFsbHkgPSB0cnVlO1xyXG4gICAgdGhpcy5zY2FsZS5wYWdlQWxpZ25WZXJ0aWNhbGx5ID0gdHJ1ZTtcclxuICAgIHRoaXMuc3RhdGUuc3RhcnQoJ0xvYWRlcicpO1xyXG4gIH1cclxufVxyXG5cclxuRW5naW5lLkJvb3QgPSBCb290O1xyXG4iLCJjbGFzcyBMb2FkZXIgZXh0ZW5kcyBQaGFzZXIuU3RhdGUge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIHByZWxvYWQoKSB7XHJcbiAgICB0aGlzLmdhbWUuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gJyMwMDAnO1xyXG4gICAgdGhpcy5hZGRQcm9ncmVzc0xhYmxlKCk7XHJcblxyXG4gICAgdGhpcy5sb2FkLm9uRmlsZUNvbXBsZXRlLmFkZCh0aGlzLnJlZnJlc2hQcm9ncmVzcywgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5nZW5lcmF0ZVRyaWFuZ2xlKCk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGUoKSB7XHJcbiAgICBsZXQgbnVtYmVyT2ZHcmFkYXRpb24gPSAzO1xyXG4gICAgdGhpcy5zdGF0ZS5zdGFydCgnR2FtZScsIHRydWUsIGZhbHNlLCBudW1iZXJPZkdyYWRhdGlvbik7XHJcbiAgfVxyXG5cclxuICBhZGRQcm9ncmVzc0xhYmxlKCkge1xyXG4gICAgbGV0IHN0eWxlID0ge1xyXG4gICAgICBmb250OiAnNDFweCBPcGVuIFNhbnMnLFxyXG4gICAgICBmaWxsOiAnIzAwRTY3NidcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnByb2dyZXNzTGFibGUgPSB0aGlzLmFkZC50ZXh0KHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYLCB0aGlzLmdhbWUud29ybGQuY2VudGVyWSwgJ0xvYWRpbmc6IDAlICgwLzApJywgc3R5bGUpO1xyXG4gICAgdGhpcy5wcm9ncmVzc0xhYmxlLmFuY2hvci5zZXRUbygwLjUpO1xyXG4gIH1cclxuXHJcbiAgcmVmcmVzaFByb2dyZXNzKHByb2dyZXNzLCBjYWNoZUtleSwgc3VjY2VzcywgdG90YWxMb2FkZWQsIHRvdGFsRmlsZXMpIHtcclxuICAgIHRoaXMucHJvZ3Jlc3NMYWJsZS50ZXh0ID0gYExvYWRpbmcgJHtwcm9ncmVzc30lICgke3RvdGFsTG9hZGVkfS8ke3RvdGFsRmlsZXN9KWA7XHJcbiAgfVxyXG5cclxuICBnZW5lcmF0ZVRyaWFuZ2xlKCkge1xyXG4gICAgY29uc3Qgc2l6ZSA9IDI1NTtcclxuXHJcbiAgICBsZXQgYml0bWFwID0gbmV3IFBoYXNlci5CaXRtYXBEYXRhKHNpemUsIHNpemUpO1xyXG5cclxuICAgIGJpdG1hcC5jdHguYmVnaW5QYXRoKCk7XHJcbiAgICBiaXRtYXAuY3R4LmZpbGxTdHlsZSA9ICd3aGl0ZSc7XHJcbiAgICBiaXRtYXAuY3R4Lm1vdmVUbygwLCBzaXplKTtcclxuICAgIGJpdG1hcC5jdHgubGluZVRvKHNpemUgLyAyLCAwKTtcclxuICAgIGJpdG1hcC5jdHgubGluZVRvKHNpemUsIHNpemUpO1xyXG4gICAgYml0bWFwLmN0eC5saW5lVG8oMCwgc2l6ZSk7XHJcbiAgICBiaXRtYXAuY3R4LmZpbGwoKTtcclxuXHJcbiAgICB0aGlzLmdhbWUuY2FjaGUuYWRkQml0bWFwRGF0YShFbmdpbmUua2V5cy50cmlhbmdsZSwgYml0bWFwKTtcclxuICB9XHJcbn1cclxuXHJcbkVuZ2luZS5Mb2FkZXIgPSBMb2FkZXI7XHJcbiIsbnVsbCwiY2xhc3MgQ29sb3JTZXQge1xyXG4gIC8qKlxyXG4gICAqIENvbG9yIFNldFxyXG4gICAqIEBwYXJhbSAge0FycmF5fSBncmFkaXRpb24gQXJyYXkgb2YgY29sb3JzXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoZ3JhZGl0aW9uKSB7XHJcbiAgICB0aGlzLmdyYWRpdGlvbiA9IGdyYWRpdGlvbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCByYW5kb20gY29sb3IgZnJvbSBzZXRcclxuICAgKiBAcmV0dXJuIHtbdHlwZV19IFtkZXNjcmlwdGlvbl1cclxuICAgKi9cclxuICBnZXRSYW5kb21Db2xvcigpIHtcclxuICAgIHJldHVybiBFbmdpbmUuZ2FtZS5ybmQucGljayh0aGlzLmdyYWRpdGlvbik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgY29sb3IgYnkgbnVtYmVyXHJcbiAgICovXHJcbiAgZ2V0QnlOdW1iZXIobnVtYmVyKSB7XHJcbiAgICByZXR1cm4gdGhpcy5ncmFkaXRpb25bbnVtYmVyXTtcclxuICB9XHJcblxyXG4gIGdldExhc3RDb2xvcigpIHtcclxuICAgIHJldHVybiB0aGlzLmdyYWRpdGlvblt0aGlzLmdyYWRpdGlvbi5sZW5ndGggLSAxXTtcclxuICB9XHJcbn1cclxuXHJcbkNvbG9yU2V0LkdSQURBVElPTlMgPSBbXHJcbiAgLy8gaW5kaWdvXHJcbiAgW1xyXG4gICAgMHgzRjUxQjUsXHJcbiAgICAweDM5NDlBQixcclxuICAgIDB4MzAzRjlGLFxyXG4gICAgMHgyODM1OTMsXHJcbiAgXSxcclxuICAvLyBibHVlXHJcbiAgW1xyXG4gICAgMHgyMTk2RjMsXHJcbiAgICAweDFFODhFNSxcclxuICAgIDB4MTk3NkQyLFxyXG4gICAgMHgxNTY1QzAsXHJcbiAgXSxcclxuICAvLyB5ZWxsb3dcclxuICBbXHJcbiAgICAweEZGRjE3NixcclxuICAgIDB4RkZFRTU4LFxyXG4gICAgMHhGRkVCM0IsXHJcbiAgICAweEZERDgzNSxcclxuICBdLFxyXG4gIC8vIHBpbmtcclxuICBbXHJcbiAgICAweEU5MUU2MyxcclxuICAgIDB4RDgxQjYwLFxyXG4gICAgMHhDMjE4NUIsXHJcbiAgICAweEFEMTQ1NyxcclxuICBdLFxyXG4gIC8vIGJyb3duXHJcbiAgW1xyXG4gICAgMHg3OTU1NDgsXHJcbiAgICAweDZENEM0MSxcclxuICAgIDB4NUQ0MDM3LFxyXG4gICAgMHg0RTM0MkUsXHJcbiAgXSxcclxuICAvLyAvLyBkZWVwb3JhbmdlXHJcbiAgLy8gW1xyXG4gIC8vICAgMHhGRjU3MjIsXHJcbiAgLy8gICAweEY0NTExRSxcclxuICAvLyAgIDB4RTY0QTE5LFxyXG4gIC8vICAgMHhEODQzMTUsXHJcbiAgLy8gXSxcclxuICAvLyBncmV5XHJcbiAgW1xyXG4gICAgMHg5RTlFOUUsXHJcbiAgICAweDc1NzU3NSxcclxuICAgIDB4NjE2MTYxLFxyXG4gICAgMHg0MjQyNDIsXHJcbiAgXSxcclxuICAvLyAvLyByZWRcclxuICAvLyBbXHJcbiAgLy8gICAweEY0NDMzNixcclxuICAvLyAgIDB4RTUzOTM1LFxyXG4gIC8vICAgMHhEMzJGMkYsXHJcbiAgLy8gICAweEM2MjgyOCxcclxuICAvLyBdLFxyXG5dO1xyXG5cclxuRW5naW5lLkNvbG9yU2V0ID0gQ29sb3JTZXQ7XHJcbiIsImNsYXNzIFNjb3JlTGFibGUgZXh0ZW5kcyBQaGFzZXIuVGV4dCB7XHJcbiAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc2NvcmUsIHN0eWxlKSB7XHJcbiAgICBzdXBlcihnYW1lLCB4LCB5LCBgU2NvcmU6ICR7TWF0aC5yb3VuZChzY29yZSl9YCwgc3R5bGUpO1xyXG5cclxuICAgIHRoaXMuc2NvcmUgPSBzY29yZTtcclxuXHJcbiAgICB0aGlzLmdhbWUuYWRkLmV4aXN0aW5nKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIHNjb3JlIGxhYmxlIHZhbHVlXHJcbiAgICogQHBhcmFtICB7TnVtYmVyfSBzY29yZSBOZXcgc2NvcmVcclxuICAgKi9cclxuICBjaGFuZ2VWYWx1ZShzY29yZSkge1xyXG4gICAgdGhpcy5nYW1lLnR3ZWVucy5yZW1vdmUodGhpcyk7XHJcblxyXG4gICAgbGV0IHR3ZWVuID0gdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzKVxyXG4gICAgICAudG8oe1xyXG4gICAgICAgIHNjb3JlXHJcbiAgICAgIH0sIFNjb3JlTGFibGUuYW5pbWF0aW9uQ2hhbmdlVmFsKVxyXG4gICAgICAub25VcGRhdGVDYWxsYmFjaygoKSA9PiB7XHJcbiAgICAgICAgdGhpcy50ZXh0ID0gYFNjb3JlOiAke01hdGgucm91bmQodGhpcy5zY29yZSl9YDtcclxuICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgdHdlZW4ub25Db21wbGV0ZVxyXG4gICAgICAuYWRkKCgpID0+IHtcclxuICAgICAgICB0aGlzLnRleHQgPSBgU2NvcmU6ICR7TWF0aC5yb3VuZCh0aGlzLnNjb3JlKX1gO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB0d2Vlbi5zdGFydCgpO1xyXG4gIH1cclxufVxyXG5cclxuU2NvcmVMYWJsZS5hbmltYXRpb25DaGFuZ2VWYWwgPSA1MDA7XHJcbkVuZ2luZS5TY29yZUxhYmxlID0gU2NvcmVMYWJsZTtcclxuIiwiY2xhc3MgVHJpYW5nbGUgZXh0ZW5kcyBQaGFzZXIuU3ByaXRlIHtcclxuXHJcbiAgLyoqXHJcbiAgICogSXQncyBhIHRyaWFuZ2xlLCB5YXNoIGl0J3Mgbm90IGEgam9rZVxyXG4gICAqIEBwYXJhbSAge1BoYXNlci5HYW1lfSAgZ2FtZSAgICAgIFtkZXNjcmlwdGlvbl1cclxuICAgKiBAcGFyYW0gIHtbdHlwZV19ICB4ICAgICAgICAgW2Rlc2NyaXB0aW9uXVxyXG4gICAqIEBwYXJhbSAge1t0eXBlXX0gIHkgICAgICAgICBbZGVzY3JpcHRpb25dXHJcbiAgICogQHBhcmFtICB7Qm9vbGVhbn0gaXNSb3RhdGVkIFtkZXNjcmlwdGlvbl1cclxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9ICBjb2xvciAgICAgW2Rlc2NyaXB0aW9uXVxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIGlzUm90YXRlZCwgY29sb3JTZXQsIG1hdHJpeFBvc2l0aW9uKSB7XHJcbiAgICBzdXBlcihnYW1lLCB4LCB5LCBFbmdpbmUuZ2FtZS5jYWNoZS5nZXRCaXRtYXBEYXRhKEVuZ2luZS5rZXlzLnRyaWFuZ2xlKSk7XHJcblxyXG4gICAgdGhpcy53aWR0aCA9IFRyaWFuZ2xlLnNpemU7XHJcbiAgICB0aGlzLmhlaWdodCA9IFRyaWFuZ2xlLnNpemU7XHJcbiAgICB0aGlzLmFuY2hvci5zZXRUbygwLjUpO1xyXG4gICAgdGhpcy5jb2xvclNldCA9IGNvbG9yU2V0O1xyXG4gICAgdGhpcy50aW50ID0gdGhpcy5jb2xvclNldC5nZXRSYW5kb21Db2xvcigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUG9pdGlvbiBpbiB0aGUgbWF0cml4IG9mIHRyaWFuZ2xlc1xyXG4gICAgICogQHR5cGUge1t0eXBlXX1cclxuICAgICAqL1xyXG4gICAgdGhpcy5tYXRyaXhQb3MgPSBtYXRyaXhQb3NpdGlvbjtcclxuXHJcbiAgICB0aGlzLmlucHV0RW5hYmxlZCA9IHRydWU7XHJcbiAgICB0aGlzLmlucHV0LnBpeGVsUGVyZmVjdE92ZXIgPSB0cnVlO1xyXG4gICAgdGhpcy5pbnB1dC5waXhlbFBlcmZlY3RDbGljayA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5ldmVudHMuZGVsZXRlQ29tcGxldGUgPSBuZXcgUGhhc2VyLlNpZ25hbCgpO1xyXG5cclxuICAgIHRoaXMuc2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuaXNSb3RhdGVkID0gaXNSb3RhdGVkO1xyXG5cclxuICAgIGlmIChpc1JvdGF0ZWQpIHtcclxuICAgICAgdGhpcy5yb3RhdGlvbiA9IE1hdGguUEk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdGhpcy5hZGRUZXh0UG9zaXRpb24oKTtcclxuICB9XHJcblxyXG4gIGFkZFRleHRQb3NpdGlvbigpIHtcclxuICAgIGxldCB0ZXh0ID0gbmV3IFBoYXNlci5UZXh0KFxyXG4gICAgICB0aGlzLmdhbWUsXHJcbiAgICAgIFRyaWFuZ2xlLnNpemUgLyAyLFxyXG4gICAgICBUcmlhbmdsZS5zaXplIC8gMixcclxuICAgICAgYCR7dGhpcy5tYXRyaXhQb3MueH06JHt0aGlzLm1hdHJpeFBvcy55fWAsXHJcbiAgICAgIHtcclxuICAgICAgICBmb250OiAnNjRweCBPcGVuIFNhbnMnLFxyXG4gICAgICAgIGZpbGw6ICdibGFjaydcclxuICAgICAgfVxyXG4gICAgKVxyXG5cclxuICAgIGlmICh0aGlzLmlzUm90YXRlZCkge1xyXG4gICAgICB0ZXh0LnJvdGF0aW9uICs9IE1hdGguUEk7XHJcbiAgICAgIHRleHQueSA9ICt0ZXh0LmhlaWdodDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRleHQueCA9IC10ZXh0LndpZHRoIC8gMjtcclxuICAgICAgdGV4dC55ID0gLXRleHQuaGVpZ2h0IC8gNDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmFkZENoaWxkKHRleHQpO1xyXG4gIH1cclxuXHJcbiAgc2VsZWN0KCkge1xyXG4gICAgaWYgKCF0aGlzLnNlbGVjdGVkKSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0cnVlO1xyXG5cclxuICAgICAgdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzKVxyXG4gICAgICAgIC50byh7XHJcbiAgICAgICAgICB3aWR0aDogVHJpYW5nbGUuc2l6ZSAvIDEuNSxcclxuICAgICAgICAgIGhlaWdodDogVHJpYW5nbGUuc2l6ZSAvIDEuNVxyXG4gICAgICAgIH0sIFRyaWFuZ2xlLmFuaW1hdGlvblRpbWVTZWxlY3QpXHJcbiAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICAgIH1cclxuICB9XHJcblxyXG4gIHVuc2VsZWN0KCkge1xyXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWQpIHtcclxuXHJcbiAgICAgIHRoaXMuZ2FtZS50d2VlbnMucmVtb3ZlKHRoaXMpO1xyXG4gICAgICB0aGlzLnNlbGVjdGVkID0gZmFsc2U7XHJcblxyXG4gICAgICB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMpXHJcbiAgICAgICAgLnRvKHtcclxuICAgICAgICAgIHdpZHRoOiBUcmlhbmdsZS5zaXplLFxyXG4gICAgICAgICAgaGVpZ2h0OiBUcmlhbmdsZS5zaXplXHJcbiAgICAgICAgfSwgVHJpYW5nbGUuYW5pbWF0aW9uVGltZVNlbGVjdClcclxuICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgfVxyXG4gIH1cclxuXHJcbiAgZGVsZXRlKCkge1xyXG4gICAgaWYgKHRoaXMuZ2FtZS5pbnB1dC5hY3RpdmVQb2ludGVyLmlzRG93bikge1xyXG4gICAgICB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMpXHJcbiAgICAgICAgLnRvKHtcclxuICAgICAgICAgIHdpZHRoOiAwLFxyXG4gICAgICAgICAgaGVpZ2h0OiAwLFxyXG4gICAgICAgICAgYWxwaGE6IDBcclxuICAgICAgICB9LCBUcmlhbmdsZS5hbmltYXRpb25UaW1lRGVsZXRlKVxyXG4gICAgICAgIC5zdGFydCgpXHJcbiAgICAgICAgLm9uQ29tcGxldGVcclxuICAgICAgICAuYWRkKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuZXZlbnRzLmRlbGV0ZUNvbXBsZXRlLmRpc3BhdGNoKHRoaXMpO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVjb3Zlcihjb2xvclNldCkge1xyXG4gICAgdGhpcy5jb2xvclNldCA9IGNvbG9yU2V0O1xyXG4gICAgdGhpcy50aW50ID0gdGhpcy5jb2xvclNldC5nZXRSYW5kb21Db2xvcigpO1xyXG4gICAgdGhpcy53aWR0aCA9IFRyaWFuZ2xlLnNpemU7XHJcbiAgICB0aGlzLmhlaWdodCA9IFRyaWFuZ2xlLnNpemU7XHJcbiAgICB0aGlzLnNlbGVjdGVkID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzKVxyXG4gICAgICAudG8oe1xyXG4gICAgICAgIGFscGhhOiAxXHJcbiAgICAgIH0sIFRyaWFuZ2xlLmFuaW1hdGlvblRpbWVSZWNvdmVyLCBQaGFzZXIuRWFzaW5nLkJvdW5jZS5PdXQpXHJcbiAgICAgIC5zdGFydCgpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlQ29sb3IoY29sb3JTZXQsIGRlbGF5ID0gMCkge1xyXG4gICAgY29uc3QgYW5pbWF0aW9uVGltZSA9IDEwMDA7XHJcbiAgICB0aGlzLmNvbG9yU2V0ID0gY29sb3JTZXQ7XHJcblxyXG4gICAgbGV0IGhpZGVUd2VlbiA9IHRoaXMuZ2FtZS5hZGQudHdlZW4odGhpcylcclxuICAgICAgLnRvKHtcclxuICAgICAgICBhbHBoYTogMFxyXG4gICAgICB9LCBhbmltYXRpb25UaW1lKTtcclxuXHJcbiAgICBsZXQgc2hvd1R3ZWVuID0gdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzKVxyXG4gICAgICAudG8oe1xyXG4gICAgICAgIGFscGhhOiAxXHJcbiAgICAgIH0sIGFuaW1hdGlvblRpbWUpO1xyXG5cclxuICAgIGhpZGVUd2VlblxyXG4gICAgICAub25Db21wbGV0ZVxyXG4gICAgICAuYWRkKCgpID0+IHtcclxuICAgICAgICB0aGlzLnRpbnQgPSB0aGlzLmNvbG9yU2V0LmdldFJhbmRvbUNvbG9yKCk7XHJcbiAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgIGhpZGVUd2Vlbi5kZWxheShkZWxheSk7XHJcblxyXG4gICAgaGlkZVR3ZWVuLmNoYWluKHNob3dUd2Vlbik7XHJcbiAgICBoaWRlVHdlZW4uc3RhcnQoKTtcclxuICB9XHJcblxyXG4gIGJsaW5rKCkge1xyXG4gICAgY29uc3QgbGFzdENvbG9yID0gdGhpcy50aW50O1xyXG4gICAgbGV0IHR3ZWVuID0gdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzKTtcclxuXHJcbiAgICB0d2Vlbi50byh7XHJcbiAgICAgICAgYWxwaGE6IDJcclxuICAgICAgfSwgMTAwKVxyXG4gICAgICAub25Db21wbGV0ZVxyXG4gICAgICAuYWRkKCgpID0+IHtcclxuICAgICAgICB0aGlzLnRpbnQgPSBsYXN0Q29sb3I7XHJcbiAgICAgICAgVHJpYW5nbGUuYmxpbmtzID0gW107XHJcbiAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgIHR3ZWVuLm9uU3RhcnRcclxuICAgICAgLmFkZCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5hbHBoYSA9IDA7XHJcbiAgICAgICAgdGhpcy50aW50ID0gMHgwMEZGMDA7XHJcbiAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgIGlmIChUcmlhbmdsZS5ibGlua3MubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIFRyaWFuZ2xlLmJsaW5rcy5wdXNoKHR3ZWVuKTtcclxuICAgICAgdHdlZW4uc3RhcnQoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxldCBsYXN0QmxpbmsgPSBUcmlhbmdsZS5ibGlua3NbVHJpYW5nbGUuYmxpbmtzLmxlbmd0aCAtIDFdO1xyXG4gICAgICBsYXN0QmxpbmsuY2hhaW4odHdlZW4pO1xyXG4gICAgICBUcmlhbmdsZS5ibGlua3MucHVzaCh0d2Vlbik7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5UcmlhbmdsZS5zaXplID0gNzE7XHJcblRyaWFuZ2xlLmJsaW5rcyA9IFtdO1xyXG5UcmlhbmdsZS5hbmltYXRpb25UaW1lU2VsZWN0ID0gMjAwO1xyXG5UcmlhbmdsZS5hbmltYXRpb25UaW1lRGVsZXRlID0gMjAwO1xyXG5UcmlhbmdsZS5hbmltYXRpb25UaW1lUmVjb3ZlciA9IDEwMDA7XHJcbkVuZ2luZS5UcmlhbmdsZSA9IFRyaWFuZ2xlO1xyXG4iLCJjbGFzcyBVbml2ZXJzZSBleHRlbmRzIFBoYXNlci5TcHJpdGUge1xyXG4gIGNvbnN0cnVjdG9yKGdhbWUpIHtcclxuICAgIHN1cGVyKGdhbWUsIGdhbWUud2lkdGggLyAyLCBnYW1lLmhlaWdodCAvIDIsIG5ldyBQaGFzZXIuQml0bWFwRGF0YShnYW1lLndpZHRoLCBnYW1lLmhlaWdodCkpO1xyXG4gICAgdGhpcy5hbmNob3Iuc2V0VG8oMC41KTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZSgpIHtcclxuICAgIGNvbnN0IG1heFNpemUgPSA0O1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDAwOyBpKyspIHtcclxuICAgICAgbGV0IHNpemUgPSB0aGlzLmdhbWUucm5kLmJldHdlZW4obWF4U2l6ZSAvIDIsIG1heFNpemUpO1xyXG4gICAgICBsZXQgYml0bWFwID0gbmV3IFBoYXNlci5CaXRtYXBEYXRhKHNpemUsIHNpemUpO1xyXG5cclxuICAgICAgYml0bWFwLmN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgYml0bWFwLmN0eC5maWxsU3R5bGUgPSAnd2hpdGUnO1xyXG4gICAgICBiaXRtYXAuY3R4LnJlY3QoMCwgMCwgc2l6ZSwgc2l6ZSk7XHJcbiAgICAgIGJpdG1hcC5jdHguZmlsbCgpO1xyXG5cclxuICAgICAgbGV0IHNwcml0ZSA9IG5ldyBQaGFzZXIuU3ByaXRlKFxyXG4gICAgICAgIHRoaXMuZ2FtZSxcclxuICAgICAgICB0aGlzLmdhbWUucm5kLmJldHdlZW4oLXRoaXMuZ2FtZS53aWR0aCwgdGhpcy5nYW1lLndpZHRoKSxcclxuICAgICAgICB0aGlzLmdhbWUucm5kLmJldHdlZW4oLXRoaXMuZ2FtZS5oZWlnaHQsIHRoaXMuZ2FtZS5oZWlnaHQpLFxyXG4gICAgICAgIGJpdG1hcFxyXG4gICAgICApO1xyXG5cclxuICAgICAgdGhpcy5hZGRDaGlsZChzcHJpdGUpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuRW5naW5lLlVuaXZlcnNlID0gVW5pdmVyc2U7XHJcbiIsImNsYXNzIEdhbWUgZXh0ZW5kcyBQaGFzZXIuU3RhdGUge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuXHJcbiAgICB3aW5kb3cuZ2cgPSB0aGlzO1xyXG4gIH1cclxuXHJcbiAgaW5pdChudW1iZXJPZkdyYWRhdGlvbikge1xyXG4gICAgdGhpcy5jb2xvclNldHMgPSBbXTtcclxuICAgIC8qKlxyXG4gICAgICogTnVtYmVyIG9mIGNvbG9yU2V0cyB3aWxsIHVzZSBpbiB0aGlzIGdhbWUgbGV2ZWxcclxuICAgICAqIEB0eXBlIHtbdHlwZV19XHJcbiAgICAgKi9cclxuICAgIHRoaXMubnVtYmVyT2ZHcmFkYXRpb24gPSBudW1iZXJPZkdyYWRhdGlvbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1hcmdpblRvcCBvZiB0cmlhbmdsZXMgbWF0cml4XHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICB0aGlzLm1hcmdpblRvcCA9IDEwMDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1hcmdpbkxlZnQgb2YgdHJpYW5nbGVzIG1hdHJpeFxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5tYXJnaW5MZWZ0ID0gNjQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNaW5pbWFsIHRyaWFuZ2xlcyBkZXN0cm95IGxlbmd0aFxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5taW5UcmlhbmdsZXNEZXN0cm95ID0gMztcclxuXHJcbiAgICB0aGlzLnRyaWFuZ2xlc01hdHJpeCA9IFtdO1xyXG4gICAgdGhpcy5zZWxlY3RlZFRyaWFuZ2xlcyA9IFtdO1xyXG5cclxuICAgIHRoaXMuc2NvcmUgPSAwO1xyXG5cclxuICAgIHRoaXMudHJpYW5nbGVNYXRyaXhXaWR0aCA9IDI1O1xyXG4gICAgdGhpcy50cmlhbmdsZU1hdHJpeEhlaWdodCA9IDk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGUoKSB7XHJcbiAgICB0aGlzLmdhbWUuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gJyMwMDAnO1xyXG5cclxuICAgIHRoaXMuY3JlYXRlVW5pdmVyc2UoKTtcclxuICAgIHRoaXMuY3JlYXRlR3JhZGF0aW9ucygpO1xyXG5cclxuICAgIHRoaXMudHJpYW5nbGVHcm91cCA9IHRoaXMuZ2FtZS5hZGQuZ3JvdXAoKTtcclxuXHJcbiAgICB0aGlzLnNrZXRjaCgpO1xyXG4gICAgdGhpcy5pbml0RXZlbnRzKCk7XHJcbiAgICB0aGlzLmNyZWF0ZVNjb3JlTGFibGUoKTtcclxuICAgIHRoaXMuaW5pdGlhbGl6YXRpb25GdWxsU2NyZWVuKCk7XHJcblxyXG4gICAgdGhpcy5mb3JjZVBvcnRyYWl0ID0gdHJ1ZTtcclxuXHJcbiAgICB3aW5kb3cudGVzdCA9IHRoaXMuZXhpc3RNb3ZlLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLmdhbWUudGltZS5hZHZhbmNlZFRpbWluZyA9IHRydWU7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICAvLyB0aGlzLmdhbWUuZGVidWcuZ2VvbShuZXcgUGhhc2VyLkxpbmUodGhpcy5nYW1lLndvcmxkLmNlbnRlclgsIDAsIHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYLCB0aGlzLmdhbWUuaGVpZ2h0KSwgJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKScpO1xyXG4gICAgLy8gdGhpcy5nYW1lLmRlYnVnLmdlb20obmV3IFBoYXNlci5MaW5lKDAsIHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJZLCB0aGlzLmdhbWUud2lkdGgsIHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJZKSwgJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKScpO1xyXG4gICAgLy8gdGhpcy5nYW1lLmRlYnVnLmlucHV0SW5mbyg1MCwgNTAsICdyZ2IoMjU1LCAyNTUsIDI1NSknKTtcclxuICAgIC8vIHRoaXMuZ2FtZS5kZWJ1Zy5nZW9tKHRoaXMudHJpYW5nbGVHcm91cC5nZXRCb3VuZHMoKSwgJ3JnYmEoMzcsIDQzLCAxODksIDAuNSknKTtcclxuICAgIHRoaXMudW5pdmVyc2Uucm90YXRpb24gKz0gTWF0aC5QSSAvIDE4MDAgLyAzMCAqIDIuNTtcclxuICAgIHRoaXMuZ2FtZS5kZWJ1Zy50ZXh0KHRoaXMuZ2FtZS50aW1lLmZwcywgNTAsIDUwLCAnd2hpdGUnKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZUdyYWRhdGlvbnMoKSB7XHJcbiAgICBsZXQgYWxsR3JhZGF0aW9uID0gUGhhc2VyLkFycmF5VXRpbHMuc2h1ZmZsZShDb2xvclNldC5HUkFEQVRJT05TKTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubnVtYmVyT2ZHcmFkYXRpb247IGkrKykge1xyXG4gICAgICBsZXQgY29sb3JTZXQgPSBuZXcgQ29sb3JTZXQoYWxsR3JhZGF0aW9uW2ldKTtcclxuICAgICAgdGhpcy5jb2xvclNldHMucHVzaChjb2xvclNldCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjcmVhdGVVbml2ZXJzZSgpIHtcclxuICAgIHRoaXMudW5pdmVyc2UgPSBuZXcgRW5naW5lLlVuaXZlcnNlKHRoaXMuZ2FtZSk7XHJcblxyXG4gICAgdGhpcy51bml2ZXJzZS5jcmVhdGUoKTtcclxuXHJcbiAgICB0aGlzLmdhbWUuYWRkLmV4aXN0aW5nKHRoaXMudW5pdmVyc2UpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdGlhbGl6YXRpb24gZXZlbnQgaW4gdGhlIGdhbWVcclxuICAgKi9cclxuICBpbml0RXZlbnRzKCkge1xyXG4gICAgdGhpcy5nYW1lLmlucHV0Lm9uVXAuYWRkKHRoaXMuZGVzdHJveVRyaWFuZ2xlLCB0aGlzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSB0cmlhbmdsZXMgb24gY2FudmFzXHJcbiAgICovXHJcbiAgc2tldGNoKCkge1xyXG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLnRyaWFuZ2xlTWF0cml4V2lkdGg7IHgrKykge1xyXG4gICAgICB0aGlzLnRyaWFuZ2xlc01hdHJpeFt4XSA9IFtdO1xyXG4gICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMudHJpYW5nbGVNYXRyaXhIZWlnaHQ7IHkrKykge1xyXG4gICAgICAgIGxldCBwb3NYID0geCAqIChFbmdpbmUuVHJpYW5nbGUuc2l6ZSAvIDIgLSAxKTtcclxuICAgICAgICBsZXQgcG9zWSA9IHkgKiAoRW5naW5lLlRyaWFuZ2xlLnNpemUgLSAxKTtcclxuICAgICAgICBsZXQgaXNSb3RhdGVkID0geCAlIDIgPT09IDE7XHJcbiAgICAgICAgbGV0IGNvbG9yU2V0ID0gdGhpcy5nYW1lLnJuZC5waWNrKHRoaXMuY29sb3JTZXRzKTtcclxuXHJcbiAgICAgICAgaWYgKHkgJSAyID09PSAxKSB7XHJcbiAgICAgICAgICBpc1JvdGF0ZWQgPSAhaXNSb3RhdGVkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHRyaWFuZ2xlID0gbmV3IEVuZ2luZS5UcmlhbmdsZShcclxuICAgICAgICAgIHRoaXMuZ2FtZSxcclxuICAgICAgICAgIHBvc1gsXHJcbiAgICAgICAgICBwb3NZLFxyXG4gICAgICAgICAgaXNSb3RhdGVkLFxyXG4gICAgICAgICAgY29sb3JTZXQsIHtcclxuICAgICAgICAgICAgeCxcclxuICAgICAgICAgICAgeVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHRyaWFuZ2xlLmV2ZW50cy5vbklucHV0T3Zlci5hZGQodGhpcy5zZWxlY3RUcmlhbmdsZSwgdGhpcyk7XHJcbiAgICAgICAgdHJpYW5nbGUuZXZlbnRzLm9uSW5wdXREb3duLmFkZCh0aGlzLnNlbGVjdFRyaWFuZ2xlLCB0aGlzKTtcclxuICAgICAgICB0cmlhbmdsZS5ldmVudHMuZGVsZXRlQ29tcGxldGUuYWRkKHRoaXMucmVjb3ZlclRyaWFuZ2xlLCB0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy50cmlhbmdsZXNNYXRyaXhbeF1beV0gPSB0cmlhbmdsZTtcclxuICAgICAgICB0aGlzLnRyaWFuZ2xlR3JvdXAuYWRkKHRyaWFuZ2xlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY2VudGVyaW5nTWF0cml4KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZXN0cm95IG9yIHVuc2VsZWN0IHRyaWFuZ2xlc1xyXG4gICAqL1xyXG4gIGRlc3Ryb3lUcmlhbmdsZSgpIHtcclxuICAgIGxldCBpc1Vuc2VsZWN0ID0gdGhpcy5zZWxlY3RlZFRyaWFuZ2xlcy5sZW5ndGggPCB0aGlzLm1pblRyaWFuZ2xlc0Rlc3Ryb3k7XHJcblxyXG4gICAgaWYgKCFpc1Vuc2VsZWN0KSB7XHJcbiAgICAgIHRoaXMudXBkYXRlU2NvcmUoTWF0aC5wb3codGhpcy5zZWxlY3RlZFRyaWFuZ2xlcy5sZW5ndGgsIDIuMTUpICogMTApO1xyXG4gICAgfVxyXG5cclxuICAgIHdoaWxlICh0aGlzLnNlbGVjdGVkVHJpYW5nbGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgbGV0IHRyaWFuZ2xlID0gdGhpcy5zZWxlY3RlZFRyaWFuZ2xlcy5wb3AoKTtcclxuICAgICAgaWYgKGlzVW5zZWxlY3QpIHtcclxuICAgICAgICB0cmlhbmdsZS51bnNlbGVjdCgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRyaWFuZ2xlLmRlbGV0ZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFpc1Vuc2VsZWN0KSB7XHJcbiAgICAgIGxldCB0aW1lckV4aXN0TW92ZSA9IHRoaXMuZ2FtZS50aW1lLmNyZWF0ZSgpO1xyXG5cclxuICAgICAgdGltZXJFeGlzdE1vdmUuYWRkKFxyXG4gICAgICAgIFRyaWFuZ2xlLmFuaW1hdGlvblRpbWVEZWxldGUgK1xyXG4gICAgICAgIFRyaWFuZ2xlLmFuaW1hdGlvblRpbWVSZWNvdmVyLFxyXG4gICAgICAgIHRoaXMucHJvY2Vzc1Bvc2l0aW9uLFxyXG4gICAgICAgIHRoaXNcclxuICAgICAgKTtcclxuXHJcbiAgICAgIHRpbWVyRXhpc3RNb3ZlLnN0YXJ0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZWNvdmVyVHJpYW5nbGUodHJpYW5nbGUpIHtcclxuICAgIHRyaWFuZ2xlLnJlY292ZXIodGhpcy5nYW1lLnJuZC5waWNrKHRoaXMuY29sb3JTZXRzKSk7XHJcbiAgfVxyXG5cclxuICBzZWxlY3RUcmlhbmdsZSh0cmlhbmdsZSwgcG9pbnQpIHtcclxuICAgIGlmICghdGhpcy5nYW1lLmlucHV0LmFjdGl2ZVBvaW50ZXIuaXNEb3duKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5zZWxlY3RlZFRyaWFuZ2xlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgdHJpYW5nbGUuc2VsZWN0KCk7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRUcmlhbmdsZXMucHVzaCh0cmlhbmdsZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsZXQgbGFzdFNlbGVjdGVkVHJpYW5nbGUgPSB0aGlzLnNlbGVjdGVkVHJpYW5nbGVzW3RoaXMuc2VsZWN0ZWRUcmlhbmdsZXMubGVuZ3RoIC0gMV07XHJcbiAgICAgIGxldCBwcmVMYXN0U2VsZWN0ZWRUcmlhbmdsZSA9IHRoaXMuc2VsZWN0ZWRUcmlhbmdsZXNbdGhpcy5zZWxlY3RlZFRyaWFuZ2xlcy5sZW5ndGggLSAyXTtcclxuXHJcbiAgICAgIGlmICh0cmlhbmdsZS5zZWxlY3RlZCAmJiB0cmlhbmdsZSA9PT0gcHJlTGFzdFNlbGVjdGVkVHJpYW5nbGUpIHtcclxuICAgICAgICBsYXN0U2VsZWN0ZWRUcmlhbmdsZS51bnNlbGVjdCgpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUcmlhbmdsZXMucG9wKCk7XHJcbiAgICAgIH0gZWxzZSBpZiAoIXRyaWFuZ2xlLnNlbGVjdGVkICYmXHJcbiAgICAgICAgdGhpcy5jYW5UcmlhbmdsZUxpbmsobGFzdFNlbGVjdGVkVHJpYW5nbGUsIHRyaWFuZ2xlKSAmJlxyXG4gICAgICAgIGxhc3RTZWxlY3RlZFRyaWFuZ2xlLmNvbG9yU2V0ID09PSB0cmlhbmdsZS5jb2xvclNldFxyXG4gICAgICApIHtcclxuICAgICAgICB0cmlhbmdsZS5zZWxlY3QoKTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkVHJpYW5nbGVzLnB1c2godHJpYW5nbGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVjayB0cmlhbmdsZXMgbGlua1xyXG4gICAqL1xyXG4gIGNhblRyaWFuZ2xlTGluayh0cjEsIHRyMikge1xyXG4gICAgaWYgKHRyMS5tYXRyaXhQb3MueSA9PT0gdHIyLm1hdHJpeFBvcy55KSB7XHJcbiAgICAgIGlmICh0cjEubWF0cml4UG9zLnggKyAxID09PSB0cjIubWF0cml4UG9zLnggfHxcclxuICAgICAgICB0cjEubWF0cml4UG9zLnggLSAxID09PSB0cjIubWF0cml4UG9zLngpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0cjEubWF0cml4UG9zLnggPT09IHRyMi5tYXRyaXhQb3MueCkge1xyXG4gICAgICBpZiAodHIxLm1hdHJpeFBvcy54ICUgMiA9PT0gMCkge1xyXG4gICAgICAgIGlmICh0cjEuaXNSb3RhdGVkICYmIHRyMi5tYXRyaXhQb3MueSA9PT0gdHIxLm1hdHJpeFBvcy55IC0gMSkge1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIGlmICghdHIxLmlzUm90YXRlZCAmJiB0cjIubWF0cml4UG9zLnkgPT09IHRyMS5tYXRyaXhQb3MueSArIDEpIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoIXRyMS5pc1JvdGF0ZWQgJiYgdHIyLm1hdHJpeFBvcy55ID09PSB0cjEubWF0cml4UG9zLnkgKyAxKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRyMS5pc1JvdGF0ZWQgJiYgdHIyLm1hdHJpeFBvcy55ID09PSB0cjEubWF0cml4UG9zLnkgLSAxKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgc2NvcmUgb24gc3RhZ2VcclxuICAgKi9cclxuICBjcmVhdGVTY29yZUxhYmxlKCkge1xyXG4gICAgY29uc3QgcmFuZG9tQ29sb3JTZXQgPSB0aGlzLmdhbWUucm5kLnBpY2sodGhpcy5jb2xvclNldHMpO1xyXG4gICAgY29uc3QgY29sb3IgPSAnI2ZmZic7IC8vICsgUGhhc2VyLkNvbG9yLmNvbXBvbmVudFRvSGV4KHJhbmRvbUNvbG9yU2V0LmdldExhc3RDb2xvcigpKTtcclxuICAgIGNvbnN0IG1hcmdpblJpZ2h0ID0gMTU7XHJcbiAgICBjb25zdCBtYXJnaW5Ub3AgPSAxNTtcclxuXHJcbiAgICBjb25zdCBzdHlsZSA9IHtcclxuICAgICAgZm9udDogJzQycHggT3BlbiBTYW5zJyxcclxuICAgICAgZm9udFN0eWxlOiAnaXRhbGljJyxcclxuICAgICAgZmlsbDogY29sb3JcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNjb3JlTGFibGUgPSBuZXcgRW5naW5lLlNjb3JlTGFibGUoXHJcbiAgICAgIHRoaXMuZ2FtZSxcclxuICAgICAgdGhpcy5nYW1lLndpZHRoIC0gbWFyZ2luUmlnaHQsXHJcbiAgICAgIG1hcmdpblRvcCxcclxuICAgICAgMCxcclxuICAgICAgc3R5bGVcclxuICAgICk7XHJcbiAgICB0aGlzLnNjb3JlTGFibGUuYW5jaG9yLnNldFRvKDEsIDApO1xyXG5cclxuICAgIC8vIFRPRE86IFRFTVBcclxuICAgIHRoaXMuc2NvcmVMYWJsZS5pbnB1dEVuYWJsZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5zY29yZUxhYmxlLmV2ZW50cy5vbklucHV0RG93bi5hZGQodGhpcy50b2dnbGVGdWxsU2NyZWVuLCB0aGlzKTtcclxuICB9XHJcblxyXG4gIGluaXRpYWxpemF0aW9uRnVsbFNjcmVlbigpIHtcclxuICAgIHRoaXMuZ2FtZS5zY2FsZS5mdWxsU2NyZWVuU2NhbGVNb2RlID0gUGhhc2VyLlNjYWxlTWFuYWdlci5SRVNJWkU7XHJcbiAgICB0aGlzLmdhbWUuc2NhbGUub25GdWxsU2NyZWVuQ2hhbmdlXHJcbiAgICAgIC5hZGQodGhpcy5yZXNpemVTY3JlZW4sIHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlRnVsbFNjcmVlbigpIHtcclxuICAgIGlmICh0aGlzLmdhbWUuc2NhbGUuaXNGdWxsU2NyZWVuKSB7XHJcbiAgICAgIHRoaXMuZ2FtZS5zY2FsZS5zdG9wRnVsbFNjcmVlbigpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5nYW1lLnNjYWxlLnN0YXJ0RnVsbFNjcmVlbigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlU2NvcmUodmFsKSB7XHJcbiAgICB2YWwgPSBNYXRoLnJvdW5kKHZhbCk7XHJcblxyXG4gICAgdGhpcy5zY29yZSArPSB2YWw7XHJcbiAgICB0aGlzLnNjb3JlTGFibGUuY2hhbmdlVmFsdWUodGhpcy5zY29yZSk7XHJcbiAgfVxyXG5cclxuICByZXNpemVTY3JlZW4oKSB7XHJcbiAgICB0aGlzLnNjb3JlTGFibGUueCA9IHRoaXMuZ2FtZS53aWR0aCAtIDE1O1xyXG4gICAgdGhpcy5zY29yZUxhYmxlLnkgPSAxNTtcclxuXHJcbiAgICB0aGlzLnVuaXZlcnNlLnggPSB0aGlzLmdhbWUud2lkdGggLyAyO1xyXG4gICAgdGhpcy51bml2ZXJzZS55ID0gdGhpcy5nYW1lLmhlaWdodCAvIDI7XHJcblxyXG4gICAgdGhpcy5jZW50ZXJpbmdNYXRyaXgoKTtcclxuICB9XHJcblxyXG4gIGNlbnRlcmluZ01hdHJpeCgpIHtcclxuICAgIGNvbnN0IGhhbGZUcmlhbmdsZVNpemUgPSBFbmdpbmUuVHJpYW5nbGUuc2l6ZSAvIDI7XHJcblxyXG4gICAgdGhpcy50cmlhbmdsZUdyb3VwLnggPSB0aGlzLmdhbWUud2lkdGggLyAyIC0gdGhpcy50cmlhbmdsZUdyb3VwLndpZHRoIC8gMiArIGhhbGZUcmlhbmdsZVNpemU7XHJcbiAgICB0aGlzLnRyaWFuZ2xlR3JvdXAueSA9IHRoaXMuZ2FtZS5oZWlnaHQgLyAyIC0gdGhpcy50cmlhbmdsZUdyb3VwLmhlaWdodCAvIDIgKyBoYWxmVHJpYW5nbGVTaXplO1xyXG4gIH1cclxuXHJcbiAgZXhpc3RNb3ZlKCkge1xyXG4gICAgbGV0IHRyYWluZ2xlU3RhY2sgPSBbXTtcclxuICAgIGNvbnN0IGJhc2VTY29yZSA9IDE7XHJcblxyXG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLnRyaWFuZ2xlTWF0cml4SGVpZ2h0OyB5KyspIHtcclxuICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLnRyaWFuZ2xlTWF0cml4V2lkdGg7IHgrKykge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSB0aGlzLmNvbXBhcmVDb21iaW5hdGlvbnMoeCwgeSk7XHJcblxyXG4gICAgICAgIGlmIChyZXN1bHQpIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGNvbXBhcmVDb21iaW5hdGlvbnMoeCwgeSkge1xyXG4gICAgbGV0IHRyaWFuZ2xlID0gdGhpcy50cmlhbmdsZXNNYXRyaXhbeF1beV07XHJcbiAgICBsZXQgc3VtbSA9IDE7XHJcblxyXG4gICAgaWYgKHRyaWFuZ2xlLmlzUm90YXRlZCkge1xyXG4gICAgICBsZXQgdHIxID0geCAtIDEgPCAwID8ge2NvbG9yU2V0OiBudWxsfSA6IHRoaXMudHJpYW5nbGVzTWF0cml4W3ggLSAxXVt5XTtcclxuICAgICAgbGV0IHRyMiA9IHggKyAxID4gdGhpcy50cmlhbmdsZU1hdHJpeFdpZHRoIC0gMSA/IHtjb2xvclNldDogbnVsbH0gOiB0aGlzLnRyaWFuZ2xlc01hdHJpeFt4ICsgMV1beV07XHJcblxyXG4gICAgICBzdW1tICs9IHRyaWFuZ2xlLmNvbG9yU2V0ID09PSB0cjEuY29sb3JTZXQgPyAxIDogMDtcclxuICAgICAgc3VtbSArPSB0cmlhbmdsZS5jb2xvclNldCA9PT0gdHIyLmNvbG9yU2V0ID8gMSA6IDA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsZXQgdHIxID0geCAtIDEgPCAwID8ge2NvbG9yU2V0OiBudWxsfSA6IHRoaXMudHJpYW5nbGVzTWF0cml4W3ggLSAxXVt5XTtcclxuICAgICAgbGV0IHRyMiA9IHggKyAxID4gdGhpcy50cmlhbmdsZU1hdHJpeFdpZHRoIC0gMSA/IHtjb2xvclNldDogbnVsbH0gOiB0aGlzLnRyaWFuZ2xlc01hdHJpeFt4ICsgMV1beV07XHJcbiAgICAgIGxldCB0cjMgPSB5ICsgMSA+IHRoaXMudHJpYW5nbGVNYXRyaXhIZWlnaHQgLSAxID8ge2NvbG9yU2V0OiBudWxsfSA6IHRoaXMudHJpYW5nbGVzTWF0cml4W3hdW3kgKyAxXTtcclxuXHJcbiAgICAgIGlmICh0cjMuY29sb3JTZXQgPT09IHRyaWFuZ2xlLmNvbG9yU2V0KSB7XHJcbiAgICAgICAgc3VtbSArPSAxO1xyXG5cclxuICAgICAgICBsZXQgdHI0ID0geCAtIDEgPCAwID8ge2NvbG9yU2V0OiBudWxsfSA6IHRoaXMudHJpYW5nbGVzTWF0cml4W3ggLSAxXVt5ICsgMV07XHJcbiAgICAgICAgbGV0IHRyNSA9IHggKyAxID4gdGhpcy50cmlhbmdsZU1hdHJpeFdpZHRoIC0gMSA/IHtjb2xvclNldDogbnVsbH0gOiB0aGlzLnRyaWFuZ2xlc01hdHJpeFt4ICsgMV1beSArIDFdO1xyXG5cclxuICAgICAgICBzdW1tICs9IHRyaWFuZ2xlLmNvbG9yU2V0ID09PSB0cjQuY29sb3JTZXQgPyAxIDogMDtcclxuICAgICAgICBzdW1tICs9IHRyaWFuZ2xlLmNvbG9yU2V0ID09PSB0cjUuY29sb3JTZXQgPyAxIDogMDtcclxuICAgICAgfVxyXG5cclxuICAgICAgc3VtbSArPSB0cmlhbmdsZS5jb2xvclNldCA9PT0gdHIxLmNvbG9yU2V0ID8gMSA6IDA7XHJcbiAgICAgIHN1bW0gKz0gdHJpYW5nbGUuY29sb3JTZXQgPT09IHRyMi5jb2xvclNldCA/IDEgOiAwO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzdW1tID4gdGhpcy5taW5UcmlhbmdsZXNEZXN0cm95IC0gMTtcclxuICB9XHJcblxyXG4gIHJlYnVpbGRNYXAoKSB7XHJcbiAgICBjb25zdCB0aW1lRGVsYXkgPSA1MDtcclxuXHJcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMudHJpYW5nbGVNYXRyaXhXaWR0aDsgeCsrKSB7XHJcbiAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy50cmlhbmdsZU1hdHJpeEhlaWdodDsgeSsrKSB7XHJcbiAgICAgICAgbGV0IHRyaWFuZ2xlID0gdGhpcy50cmlhbmdsZXNNYXRyaXhbeF1beV07XHJcbiAgICAgICAgbGV0IHJhbmRvbUNvbG9yU2V0ID0gdGhpcy5nYW1lLnJuZC5waWNrKHRoaXMuY29sb3JTZXRzKTtcclxuXHJcbiAgICAgICAgdHJpYW5nbGUudXBkYXRlQ29sb3IocmFuZG9tQ29sb3JTZXQsIHggKiB0aW1lRGVsYXkgKyB5ICogdGltZURlbGF5KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJvY2Vzc1Bvc2l0aW9uKCkge1xyXG4gICAgaWYgKCF0aGlzLmV4aXN0TW92ZSgpKSB7XHJcbiAgICAgIGNvbnN0IGRlbGF5RGVzdHJveSA9IDUwMDA7XHJcbiAgICAgIGxldCB0aW1lciA9IHRoaXMuZ2FtZS50aW1lLmNyZWF0ZSgpO1xyXG5cclxuICAgICAgdGltZXIuYWRkKGRlbGF5RGVzdHJveSwgdGhpcy5yZWJ1aWxkTWFwLCB0aGlzKTtcclxuICAgICAgdGltZXIuc3RhcnQoMCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5FbmdpbmUuR2FtZSA9IEdhbWU7XHJcbiIsbnVsbCwiRW5naW5lLmdhbWUgPSBuZXcgUGhhc2VyLkdhbWUoRW5naW5lLm1heFdpZHRoLCBFbmdpbmUubWF4SGVpZ2h0LCBQaGFzZXIuQVVUTyk7XHJcblxyXG5FbmdpbmUuZ2FtZS5zdGF0ZS5hZGQoJ0Jvb3QnLCBFbmdpbmUuQm9vdCk7XHJcbkVuZ2luZS5nYW1lLnN0YXRlLmFkZCgnTG9hZGVyJywgRW5naW5lLkxvYWRlcik7XHJcbi8vIEVuZ2luZS5nYW1lLnN0YXRlLmFkZCgnTWVudScsIEVuZ2luZS5NZW51KTtcclxuRW5naW5lLmdhbWUuc3RhdGUuYWRkKCdHYW1lJywgRW5naW5lLkdhbWUpO1xyXG4vLyBFbmdpbmUuZ2FtZS5zdGF0ZS5hZGQoJ1Njb3JlQm9hcmQnLCBFbmdpbmUuU2NvcmVCb2FyZCk7XHJcblxyXG5FbmdpbmUuZ2FtZS5zdGF0ZS5zdGFydCgnQm9vdCcpO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
