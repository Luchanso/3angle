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
        }, Triangle.animationTime).start();
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
        }, Triangle.animationTime).start();
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
        }, Triangle.animationTime).start().onComplete.add(function () {
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
      }, 1000, Phaser.Easing.Bounce.Out).start();
    }
  }]);

  return Triangle;
}(Phaser.Sprite);

Triangle.size = 71;
Triangle.animationTime = 200;
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

      this.triangleMatrixWidth = 27;
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
    }
  }, {
    key: 'render',
    value: function render() {
      // this.game.debug.geom(new Phaser.Line(this.game.world.centerX, 0, this.game.world.centerX, this.game.height), 'rgba(255, 255, 255, 0.2)');
      // this.game.debug.geom(new Phaser.Line(0, this.game.world.centerY, this.game.width, this.game.world.centerY), 'rgba(255, 255, 255, 0.2)');
      // this.game.debug.inputInfo(50, 50, 'rgb(255, 255, 255)');
      // this.game.debug.geom(this.triangleGroup.getBounds(), 'rgba(37, 43, 189, 0.5)');
      this.universe.rotation += Math.PI / 1800 / 30;
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

          if (y % 2 === 1) {
            isRotated = !isRotated;
          }

          var triangle = new Engine.Triangle(this.game, posX, posY, isRotated, this.game.rnd.pick(this.colorSets), {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS5qcyIsImJvb3QuanMiLCJsb2FkZXIuanMiLCJtZW51LmpzIiwiY29sb3JzZXQuanMiLCJzY29yZWxhYmxlLmpzIiwidHJpYW5nbGUuanMiLCJ1bml2ZXJzZS5qcyIsImdhbWUuanMiLCJzY29yZWJvYXJkLmpzIiwiYXBwLmpzIl0sIm5hbWVzIjpbIkVuZ2luZSIsIm1pbldpZHRoIiwibWluSGVpZ2h0IiwibWF4V2lkdGgiLCJtYXhIZWlnaHQiLCJrZXlzIiwidHJpYW5nbGUiLCJCb290Iiwic2NhbGUiLCJwYWdlQWxpZ25Ib3Jpem9udGFsbHkiLCJwYWdlQWxpZ25WZXJ0aWNhbGx5Iiwic3RhdGUiLCJzdGFydCIsIlBoYXNlciIsIlN0YXRlIiwiTG9hZGVyIiwiZ2FtZSIsInN0YWdlIiwiYmFja2dyb3VuZENvbG9yIiwiYWRkUHJvZ3Jlc3NMYWJsZSIsImxvYWQiLCJvbkZpbGVDb21wbGV0ZSIsImFkZCIsInJlZnJlc2hQcm9ncmVzcyIsImdlbmVyYXRlVHJpYW5nbGUiLCJudW1iZXJPZkdyYWRhdGlvbiIsInN0eWxlIiwiZm9udCIsImZpbGwiLCJwcm9ncmVzc0xhYmxlIiwidGV4dCIsIndvcmxkIiwiY2VudGVyWCIsImNlbnRlclkiLCJhbmNob3IiLCJzZXRUbyIsInByb2dyZXNzIiwiY2FjaGVLZXkiLCJzdWNjZXNzIiwidG90YWxMb2FkZWQiLCJ0b3RhbEZpbGVzIiwic2l6ZSIsImJpdG1hcCIsIkJpdG1hcERhdGEiLCJjdHgiLCJiZWdpblBhdGgiLCJmaWxsU3R5bGUiLCJtb3ZlVG8iLCJsaW5lVG8iLCJjYWNoZSIsImFkZEJpdG1hcERhdGEiLCJDb2xvclNldCIsImdyYWRpdGlvbiIsInJuZCIsInBpY2siLCJudW1iZXIiLCJsZW5ndGgiLCJHUkFEQVRJT05TIiwiU2NvcmVMYWJsZSIsIngiLCJ5Iiwic2NvcmUiLCJNYXRoIiwicm91bmQiLCJleGlzdGluZyIsInR3ZWVucyIsInJlbW92ZSIsInR3ZWVuIiwidG8iLCJhbmltYXRpb25DaGFuZ2VWYWwiLCJvblVwZGF0ZUNhbGxiYWNrIiwib25Db21wbGV0ZSIsIlRleHQiLCJUcmlhbmdsZSIsImlzUm90YXRlZCIsImNvbG9yU2V0IiwibWF0cml4UG9zaXRpb24iLCJnZXRCaXRtYXBEYXRhIiwid2lkdGgiLCJoZWlnaHQiLCJ0aW50IiwiZ2V0UmFuZG9tQ29sb3IiLCJtYXRyaXhQb3MiLCJpbnB1dEVuYWJsZWQiLCJpbnB1dCIsInBpeGVsUGVyZmVjdE92ZXIiLCJwaXhlbFBlcmZlY3RDbGljayIsImV2ZW50cyIsImRlbGV0ZUNvbXBsZXRlIiwiU2lnbmFsIiwic2VsZWN0ZWQiLCJyb3RhdGlvbiIsIlBJIiwiYWRkQ2hpbGQiLCJhbmltYXRpb25UaW1lIiwiYWN0aXZlUG9pbnRlciIsImlzRG93biIsImFscGhhIiwiZGlzcGF0Y2giLCJFYXNpbmciLCJCb3VuY2UiLCJPdXQiLCJTcHJpdGUiLCJVbml2ZXJzZSIsIm1heFNpemUiLCJpIiwiYmV0d2VlbiIsInJlY3QiLCJzcHJpdGUiLCJHYW1lIiwid2luZG93IiwiZ2ciLCJjb2xvclNldHMiLCJtYXJnaW5Ub3AiLCJtYXJnaW5MZWZ0IiwibWluVHJpYW5nbGVzRGVzdHJveSIsInRyaWFuZ2xlc01hdHJpeCIsInNlbGVjdGVkVHJpYW5nbGVzIiwidHJpYW5nbGVNYXRyaXhXaWR0aCIsInRyaWFuZ2xlTWF0cml4SGVpZ2h0IiwiY3JlYXRlVW5pdmVyc2UiLCJjcmVhdGVHcmFkYXRpb25zIiwidHJpYW5nbGVHcm91cCIsImdyb3VwIiwic2tldGNoIiwiaW5pdEV2ZW50cyIsImNyZWF0ZVNjb3JlTGFibGUiLCJpbml0aWFsaXphdGlvbkZ1bGxTY3JlZW4iLCJmb3JjZVBvcnRyYWl0IiwidW5pdmVyc2UiLCJhbGxHcmFkYXRpb24iLCJBcnJheVV0aWxzIiwic2h1ZmZsZSIsInB1c2giLCJjcmVhdGUiLCJvblVwIiwiZGVzdHJveVRyaWFuZ2xlIiwicG9zWCIsInBvc1kiLCJvbklucHV0T3ZlciIsInNlbGVjdFRyaWFuZ2xlIiwib25JbnB1dERvd24iLCJyZWNvdmVyVHJpYW5nbGUiLCJjZW50ZXJpbmdNYXRyaXgiLCJpc1Vuc2VsZWN0IiwidXBkYXRlU2NvcmUiLCJwb3ciLCJwb3AiLCJ1bnNlbGVjdCIsImRlbGV0ZSIsInJlY292ZXIiLCJwb2ludCIsInNlbGVjdCIsImxhc3RTZWxlY3RlZFRyaWFuZ2xlIiwicHJlTGFzdFNlbGVjdGVkVHJpYW5nbGUiLCJjYW5UcmlhbmdsZUxpbmsiLCJ0cjEiLCJ0cjIiLCJyYW5kb21Db2xvclNldCIsImNvbG9yIiwibWFyZ2luUmlnaHQiLCJmb250U3R5bGUiLCJzY29yZUxhYmxlIiwidG9nZ2xlRnVsbFNjcmVlbiIsImZ1bGxTY3JlZW5TY2FsZU1vZGUiLCJTY2FsZU1hbmFnZXIiLCJSRVNJWkUiLCJvbkZ1bGxTY3JlZW5DaGFuZ2UiLCJyZXNpemVTY3JlZW4iLCJpc0Z1bGxTY3JlZW4iLCJzdG9wRnVsbFNjcmVlbiIsInN0YXJ0RnVsbFNjcmVlbiIsInZhbCIsImNoYW5nZVZhbHVlIiwiaGFsZlRyaWFuZ2xlU2l6ZSIsIkFVVE8iXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsU0FBUztBQUNYQyxZQUFVLEdBREM7QUFFWEMsYUFBVyxHQUZBO0FBR1hDLFlBQVUsSUFIQztBQUlYQyxhQUFXO0FBSkEsQ0FBYjs7QUFPQTs7OztBQUlBSixPQUFPSyxJQUFQLEdBQWM7QUFDWkMsWUFBVTtBQURFLENBQWQ7Ozs7Ozs7Ozs7O0lDWE1DOzs7QUFDSixrQkFBYztBQUFBOztBQUFBO0FBRWI7Ozs7OEJBRVMsQ0FFVDs7OzZCQUVRO0FBQ1AsV0FBS0MsS0FBTCxDQUFXQyxxQkFBWCxHQUFtQyxJQUFuQztBQUNBLFdBQUtELEtBQUwsQ0FBV0UsbUJBQVgsR0FBaUMsSUFBakM7QUFDQSxXQUFLQyxLQUFMLENBQVdDLEtBQVgsQ0FBaUIsUUFBakI7QUFDRDs7OztFQWJnQkMsT0FBT0M7O0FBZ0IxQmQsT0FBT08sSUFBUCxHQUFjQSxJQUFkOzs7Ozs7Ozs7OztJQ2hCTVE7OztBQUNKLG9CQUFjO0FBQUE7O0FBQUE7QUFF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QkFBbUI5SyxPQUFPeUUsUUFBUCxDQUFnQmhDLElBQWhCLEdBQXVCLENBQWhEOztBQUVBLFdBQUtpRixhQUFMLENBQW1CL0QsQ0FBbkIsR0FBdUIsS0FBSzNDLElBQUwsQ0FBVThELEtBQVYsR0FBa0IsQ0FBbEIsR0FBc0IsS0FBSzRDLGFBQUwsQ0FBbUI1QyxLQUFuQixHQUEyQixDQUFqRCxHQUFxRGdHLGdCQUE1RTtBQUNBLFdBQUtwRCxhQUFMLENBQW1COUQsQ0FBbkIsR0FBdUIsS0FBSzVDLElBQUwsQ0FBVStELE1BQVYsR0FBbUIsQ0FBbkIsR0FBdUIsS0FBSzJDLGFBQUwsQ0FBbUIzQyxNQUFuQixHQUE0QixDQUFuRCxHQUF1RCtGLGdCQUE5RTtBQUNEOzs7O0VBOVFnQmpLLE9BQU9DOztBQWlSMUJkLE9BQU82RyxJQUFQLEdBQWNBLElBQWQ7QUNqUkE7OztBQ0FBN0csT0FBT2dCLElBQVAsR0FBYyxJQUFJSCxPQUFPZ0csSUFBWCxDQUFnQjdHLE9BQU9HLFFBQXZCLEVBQWlDSCxPQUFPSSxTQUF4QyxFQUFtRFMsT0FBT2tLLElBQTFELENBQWQ7O0FBRUEvSyxPQUFPZ0IsSUFBUCxDQUFZTCxLQUFaLENBQWtCVyxHQUFsQixDQUFzQixNQUF0QixFQUE4QnRCLE9BQU9PLElBQXJDO0FBQ0FQLE9BQU9nQixJQUFQLENBQVlMLEtBQVosQ0FBa0JXLEdBQWxCLENBQXNCLFFBQXRCLEVBQWdDdEIsT0FBT2UsTUFBdkM7QUFDQTtBQUNBZixPQUFPZ0IsSUFBUCxDQUFZTCxLQUFaLENBQWtCVyxHQUFsQixDQUFzQixNQUF0QixFQUE4QnRCLE9BQU82RyxJQUFyQztBQUNBOztBQUVBN0csT0FBT2dCLElBQVAsQ0FBWUwsS0FBWixDQUFrQkMsS0FBbEIsQ0FBd0IsTUFBeEIiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsibGV0IEVuZ2luZSA9IHtcclxuICBtaW5XaWR0aDogNjQwLFxyXG4gIG1pbkhlaWdodDogMzIwLFxyXG4gIG1heFdpZHRoOiAxMzY2LFxyXG4gIG1heEhlaWdodDogNzY4LFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNwcml0ZSwgQml0bWFwLCBldGMuLi4gY2hhY2hlIGtleXNcclxuICogQHR5cGUge09iamVjdH1cclxuICovXHJcbkVuZ2luZS5rZXlzID0ge1xyXG4gIHRyaWFuZ2xlOiAndHJpYW5nbGUnLFxyXG59XHJcbiIsImNsYXNzIEJvb3QgZXh0ZW5kcyBQaGFzZXIuU3RhdGUge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIHByZWxvYWQoKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgY3JlYXRlKCkge1xyXG4gICAgdGhpcy5zY2FsZS5wYWdlQWxpZ25Ib3Jpem9udGFsbHkgPSB0cnVlO1xyXG4gICAgdGhpcy5zY2FsZS5wYWdlQWxpZ25WZXJ0aWNhbGx5ID0gdHJ1ZTtcclxuICAgIHRoaXMuc3RhdGUuc3RhcnQoJ0xvYWRlcicpO1xyXG4gIH1cclxufVxyXG5cclxuRW5naW5lLkJvb3QgPSBCb290O1xyXG4iLCJjbGFzcyBMb2FkZXIgZXh0ZW5kcyBQaGFzZXIuU3RhdGUge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIHByZWxvYWQoKSB7XHJcbiAgICB0aGlzLmdhbWUuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gJyMwMDAnO1xyXG4gICAgdGhpcy5hZGRQcm9ncmVzc0xhYmxlKCk7XHJcblxyXG4gICAgdGhpcy5sb2FkLm9uRmlsZUNvbXBsZXRlLmFkZCh0aGlzLnJlZnJlc2hQcm9ncmVzcywgdGhpcyk7ICAgIFxyXG5cclxuICAgIHRoaXMuZ2VuZXJhdGVUcmlhbmdsZSgpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlKCkge1xyXG4gICAgbGV0IG51bWJlck9mR3JhZGF0aW9uID0gMztcclxuICAgIHRoaXMuc3RhdGUuc3RhcnQoJ0dhbWUnLCB0cnVlLCBmYWxzZSwgbnVtYmVyT2ZHcmFkYXRpb24pO1xyXG4gIH1cclxuXHJcbiAgYWRkUHJvZ3Jlc3NMYWJsZSgpIHtcclxuICAgIGxldCBzdHlsZSA9IHtcclxuICAgICAgZm9udDogJzQxcHggT3BlbiBTYW5zJyxcclxuICAgICAgZmlsbDogJyMwMEU2NzYnXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5wcm9ncmVzc0xhYmxlID0gdGhpcy5hZGQudGV4dCh0aGlzLmdhbWUud29ybGQuY2VudGVyWCwgdGhpcy5nYW1lLndvcmxkLmNlbnRlclksICdMb2FkaW5nOiAwJSAoMC8wKScsIHN0eWxlKTtcclxuICAgIHRoaXMucHJvZ3Jlc3NMYWJsZS5hbmNob3Iuc2V0VG8oMC41KTtcclxuICB9XHJcblxyXG4gIHJlZnJlc2hQcm9ncmVzcyhwcm9ncmVzcywgY2FjaGVLZXksIHN1Y2Nlc3MsIHRvdGFsTG9hZGVkLCB0b3RhbEZpbGVzKSB7XHJcbiAgICB0aGlzLnByb2dyZXNzTGFibGUudGV4dCA9IGBMb2FkaW5nICR7cHJvZ3Jlc3N9JSAoJHt0b3RhbExvYWRlZH0vJHt0b3RhbEZpbGVzfSlgO1xyXG4gIH1cclxuXHJcbiAgZ2VuZXJhdGVUcmlhbmdsZSgpIHtcclxuICAgIGNvbnN0IHNpemUgPSAyNTU7XHJcblxyXG4gICAgbGV0IGJpdG1hcCA9IG5ldyBQaGFzZXIuQml0bWFwRGF0YShzaXplLCBzaXplKTtcclxuXHJcbiAgICBiaXRtYXAuY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgYml0bWFwLmN0eC5maWxsU3R5bGUgPSAnd2hpdGUnO1xyXG4gICAgYml0bWFwLmN0eC5tb3ZlVG8oMCwgc2l6ZSk7XHJcbiAgICBiaXRtYXAuY3R4LmxpbmVUbyhzaXplIC8gMiwgMCk7XHJcbiAgICBiaXRtYXAuY3R4LmxpbmVUbyhzaXplLCBzaXplKTtcclxuICAgIGJpdG1hcC5jdHgubGluZVRvKDAsIHNpemUpO1xyXG4gICAgYml0bWFwLmN0eC5maWxsKCk7XHJcblxyXG4gICAgdGhpcy5nYW1lLmNhY2hlLmFkZEJpdG1hcERhdGEoRW5naW5lLmtleXMudHJpYW5nbGUsIGJpdG1hcCk7XHJcbiAgfVxyXG59XHJcblxyXG5FbmdpbmUuTG9hZGVyID0gTG9hZGVyO1xyXG4iLG51bGwsImNsYXNzIENvbG9yU2V0IHtcclxuICAvKipcclxuICAgKiBDb2xvciBTZXRcclxuICAgKiBAcGFyYW0gIHtBcnJheX0gZ3JhZGl0aW9uIEFycmF5IG9mIGNvbG9yc1xyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGdyYWRpdGlvbikge1xyXG4gICAgdGhpcy5ncmFkaXRpb24gPSBncmFkaXRpb247XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgcmFuZG9tIGNvbG9yIGZyb20gc2V0XHJcbiAgICogQHJldHVybiB7W3R5cGVdfSBbZGVzY3JpcHRpb25dXHJcbiAgICovXHJcbiAgZ2V0UmFuZG9tQ29sb3IoKSB7XHJcbiAgICByZXR1cm4gRW5naW5lLmdhbWUucm5kLnBpY2sodGhpcy5ncmFkaXRpb24pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGNvbG9yIGJ5IG51bWJlclxyXG4gICAqL1xyXG4gIGdldEJ5TnVtYmVyKG51bWJlcikge1xyXG4gICAgcmV0dXJuIHRoaXMuZ3JhZGl0aW9uW251bWJlcl07XHJcbiAgfVxyXG5cclxuICBnZXRMYXN0Q29sb3IoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5ncmFkaXRpb25bdGhpcy5ncmFkaXRpb24ubGVuZ3RoIC0gMV07XHJcbiAgfVxyXG59XHJcblxyXG5Db2xvclNldC5HUkFEQVRJT05TID0gW1xyXG4gIC8vIGluZGlnb1xyXG4gIFtcclxuICAgIDB4M0Y1MUI1LFxyXG4gICAgMHgzOTQ5QUIsXHJcbiAgICAweDMwM0Y5RixcclxuICAgIDB4MjgzNTkzLFxyXG4gIF0sXHJcbiAgLy8gYmx1ZVxyXG4gIFtcclxuICAgIDB4MjE5NkYzLFxyXG4gICAgMHgxRTg4RTUsXHJcbiAgICAweDE5NzZEMixcclxuICAgIDB4MTU2NUMwLFxyXG4gIF0sXHJcbiAgLy8geWVsbG93XHJcbiAgW1xyXG4gICAgMHhGRkYxNzYsXHJcbiAgICAweEZGRUU1OCxcclxuICAgIDB4RkZFQjNCLFxyXG4gICAgMHhGREQ4MzUsXHJcbiAgXSxcclxuICAvLyBwaW5rXHJcbiAgW1xyXG4gICAgMHhFOTFFNjMsXHJcbiAgICAweEQ4MUI2MCxcclxuICAgIDB4QzIxODVCLFxyXG4gICAgMHhBRDE0NTcsXHJcbiAgXSxcclxuICAvLyBicm93blxyXG4gIFtcclxuICAgIDB4Nzk1NTQ4LFxyXG4gICAgMHg2RDRDNDEsXHJcbiAgICAweDVENDAzNyxcclxuICAgIDB4NEUzNDJFLFxyXG4gIF0sXHJcbiAgLy8gLy8gZGVlcG9yYW5nZVxyXG4gIC8vIFtcclxuICAvLyAgIDB4RkY1NzIyLFxyXG4gIC8vICAgMHhGNDUxMUUsXHJcbiAgLy8gICAweEU2NEExOSxcclxuICAvLyAgIDB4RDg0MzE1LFxyXG4gIC8vIF0sXHJcbiAgLy8gZ3JleVxyXG4gIFtcclxuICAgIDB4OUU5RTlFLFxyXG4gICAgMHg3NTc1NzUsXHJcbiAgICAweDYxNjE2MSxcclxuICAgIDB4NDI0MjQyLFxyXG4gIF0sXHJcbiAgLy8gLy8gcmVkXHJcbiAgLy8gW1xyXG4gIC8vICAgMHhGNDQzMzYsXHJcbiAgLy8gICAweEU1MzkzNSxcclxuICAvLyAgIDB4RDMyRjJGLFxyXG4gIC8vICAgMHhDNjI4MjgsXHJcbiAgLy8gXSxcclxuXTtcclxuXHJcbkVuZ2luZS5Db2xvclNldCA9IENvbG9yU2V0O1xyXG4iLCJjbGFzcyBTY29yZUxhYmxlIGV4dGVuZHMgUGhhc2VyLlRleHQge1xyXG4gIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNjb3JlLCBzdHlsZSkge1xyXG4gICAgc3VwZXIoZ2FtZSwgeCwgeSwgYFNjb3JlOiAke01hdGgucm91bmQoc2NvcmUpfWAsIHN0eWxlKTtcclxuXHJcbiAgICB0aGlzLnNjb3JlID0gc2NvcmU7XHJcblxyXG4gICAgdGhpcy5nYW1lLmFkZC5leGlzdGluZyh0aGlzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSBzY29yZSBsYWJsZSB2YWx1ZVxyXG4gICAqIEBwYXJhbSAge051bWJlcn0gc2NvcmUgTmV3IHNjb3JlXHJcbiAgICovXHJcbiAgY2hhbmdlVmFsdWUoc2NvcmUpIHtcclxuICAgIHRoaXMuZ2FtZS50d2VlbnMucmVtb3ZlKHRoaXMpO1xyXG5cclxuICAgIGxldCB0d2VlbiA9IHRoaXMuZ2FtZS5hZGQudHdlZW4odGhpcylcclxuICAgICAgLnRvKHtcclxuICAgICAgICBzY29yZVxyXG4gICAgICB9LCBTY29yZUxhYmxlLmFuaW1hdGlvbkNoYW5nZVZhbClcclxuICAgICAgLm9uVXBkYXRlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgICAgIHRoaXMudGV4dCA9IGBTY29yZTogJHtNYXRoLnJvdW5kKHRoaXMuc2NvcmUpfWA7XHJcbiAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgIHR3ZWVuLm9uQ29tcGxldGVcclxuICAgICAgLmFkZCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy50ZXh0ID0gYFNjb3JlOiAke01hdGgucm91bmQodGhpcy5zY29yZSl9YDtcclxuICAgICAgfSk7XHJcblxyXG4gICAgdHdlZW4uc3RhcnQoKTtcclxuICB9XHJcbn1cclxuXHJcblNjb3JlTGFibGUuYW5pbWF0aW9uQ2hhbmdlVmFsID0gNTAwO1xyXG5FbmdpbmUuU2NvcmVMYWJsZSA9IFNjb3JlTGFibGU7XHJcbiIsImNsYXNzIFRyaWFuZ2xlIGV4dGVuZHMgUGhhc2VyLlNwcml0ZSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEl0J3MgYSB0cmlhbmdsZSwgeWFzaCBpdCdzIG5vdCBhIGpva2VcclxuICAgKiBAcGFyYW0gIHtQaGFzZXIuR2FtZX0gIGdhbWUgICAgICBbZGVzY3JpcHRpb25dXHJcbiAgICogQHBhcmFtICB7W3R5cGVdfSAgeCAgICAgICAgIFtkZXNjcmlwdGlvbl1cclxuICAgKiBAcGFyYW0gIHtbdHlwZV19ICB5ICAgICAgICAgW2Rlc2NyaXB0aW9uXVxyXG4gICAqIEBwYXJhbSAge0Jvb2xlYW59IGlzUm90YXRlZCBbZGVzY3JpcHRpb25dXHJcbiAgICogQHBhcmFtICB7TnVtYmVyfSAgY29sb3IgICAgIFtkZXNjcmlwdGlvbl1cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBpc1JvdGF0ZWQsIGNvbG9yU2V0LCBtYXRyaXhQb3NpdGlvbikge1xyXG4gICAgc3VwZXIoZ2FtZSwgeCwgeSwgRW5naW5lLmdhbWUuY2FjaGUuZ2V0Qml0bWFwRGF0YShFbmdpbmUua2V5cy50cmlhbmdsZSkpO1xyXG5cclxuICAgIHRoaXMud2lkdGggPSBUcmlhbmdsZS5zaXplO1xyXG4gICAgdGhpcy5oZWlnaHQgPSBUcmlhbmdsZS5zaXplO1xyXG4gICAgdGhpcy5hbmNob3Iuc2V0VG8oMC41KTtcclxuICAgIHRoaXMuY29sb3JTZXQgPSBjb2xvclNldDtcclxuICAgIHRoaXMudGludCA9IHRoaXMuY29sb3JTZXQuZ2V0UmFuZG9tQ29sb3IoKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFBvaXRpb24gaW4gdGhlIG1hdHJpeCBvZiB0cmlhbmdsZXNcclxuICAgICAqIEB0eXBlIHtbdHlwZV19XHJcbiAgICAgKi9cclxuICAgIHRoaXMubWF0cml4UG9zID0gbWF0cml4UG9zaXRpb247XHJcblxyXG4gICAgdGhpcy5pbnB1dEVuYWJsZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5pbnB1dC5waXhlbFBlcmZlY3RPdmVyID0gdHJ1ZTtcclxuICAgIHRoaXMuaW5wdXQucGl4ZWxQZXJmZWN0Q2xpY2sgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuZXZlbnRzLmRlbGV0ZUNvbXBsZXRlID0gbmV3IFBoYXNlci5TaWduYWwoKTtcclxuXHJcbiAgICB0aGlzLnNlbGVjdGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLmlzUm90YXRlZCA9IGlzUm90YXRlZDtcclxuXHJcbiAgICBpZiAoaXNSb3RhdGVkKSB7XHJcbiAgICAgIHRoaXMucm90YXRpb24gPSBNYXRoLlBJO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHRoaXMuYWRkVGV4dFBvc2l0aW9uKCk7XHJcbiAgfVxyXG5cclxuICBhZGRUZXh0UG9zaXRpb24oKSB7XHJcbiAgICBsZXQgdGV4dCA9IG5ldyBQaGFzZXIuVGV4dChcclxuICAgICAgdGhpcy5nYW1lLFxyXG4gICAgICBUcmlhbmdsZS5zaXplIC8gMixcclxuICAgICAgVHJpYW5nbGUuc2l6ZSAvIDIsXHJcbiAgICAgIGAke3RoaXMubWF0cml4UG9zLnh9OiR7dGhpcy5tYXRyaXhQb3MueX1gLFxyXG4gICAgICB7XHJcbiAgICAgICAgZm9udDogJzY0cHggT3BlbiBTYW5zJyxcclxuICAgICAgICBmaWxsOiAnYmxhY2snXHJcbiAgICAgIH1cclxuICAgIClcclxuXHJcbiAgICBpZiAodGhpcy5pc1JvdGF0ZWQpIHtcclxuICAgICAgdGV4dC5yb3RhdGlvbiArPSBNYXRoLlBJO1xyXG4gICAgICB0ZXh0LnkgPSArdGV4dC5oZWlnaHQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0ZXh0LnggPSAtdGV4dC53aWR0aCAvIDI7XHJcbiAgICAgIHRleHQueSA9IC10ZXh0LmhlaWdodCAvIDQ7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hZGRDaGlsZCh0ZXh0KTtcclxuICB9XHJcblxyXG4gIHNlbGVjdCgpIHtcclxuICAgIGlmICghdGhpcy5zZWxlY3RlZCkge1xyXG4gICAgICB0aGlzLnNlbGVjdGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgIHRoaXMuZ2FtZS5hZGQudHdlZW4odGhpcylcclxuICAgICAgICAudG8oe1xyXG4gICAgICAgICAgd2lkdGg6IFRyaWFuZ2xlLnNpemUgLyAxLjUsXHJcbiAgICAgICAgICBoZWlnaHQ6IFRyaWFuZ2xlLnNpemUgLyAxLjVcclxuICAgICAgICB9LCBUcmlhbmdsZS5hbmltYXRpb25UaW1lKVxyXG4gICAgICAgIC5zdGFydCgpO1xyXG4gICAgICB9XHJcbiAgfVxyXG5cclxuICB1bnNlbGVjdCgpIHtcclxuICAgIGlmICh0aGlzLnNlbGVjdGVkKSB7XHJcblxyXG4gICAgICB0aGlzLmdhbWUudHdlZW5zLnJlbW92ZSh0aGlzKTtcclxuICAgICAgdGhpcy5zZWxlY3RlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzKVxyXG4gICAgICAgIC50byh7XHJcbiAgICAgICAgICB3aWR0aDogVHJpYW5nbGUuc2l6ZSxcclxuICAgICAgICAgIGhlaWdodDogVHJpYW5nbGUuc2l6ZVxyXG4gICAgICAgIH0sIFRyaWFuZ2xlLmFuaW1hdGlvblRpbWUpXHJcbiAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICAgIH1cclxuICB9XHJcblxyXG4gIGRlbGV0ZSgpIHtcclxuICAgIGlmICh0aGlzLmdhbWUuaW5wdXQuYWN0aXZlUG9pbnRlci5pc0Rvd24pIHtcclxuICAgICAgdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzKVxyXG4gICAgICAgIC50byh7XHJcbiAgICAgICAgICB3aWR0aDogMCxcclxuICAgICAgICAgIGhlaWdodDogMCxcclxuICAgICAgICAgIGFscGhhOiAwXHJcbiAgICAgICAgfSwgVHJpYW5nbGUuYW5pbWF0aW9uVGltZSlcclxuICAgICAgICAuc3RhcnQoKVxyXG4gICAgICAgIC5vbkNvbXBsZXRlXHJcbiAgICAgICAgLmFkZCgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmV2ZW50cy5kZWxldGVDb21wbGV0ZS5kaXNwYXRjaCh0aGlzKTtcclxuICAgICAgICB9LCB0aGlzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlY292ZXIoY29sb3JTZXQpIHtcclxuICAgIHRoaXMuY29sb3JTZXQgPSBjb2xvclNldDtcclxuICAgIHRoaXMudGludCA9IHRoaXMuY29sb3JTZXQuZ2V0UmFuZG9tQ29sb3IoKTtcclxuICAgIHRoaXMud2lkdGggPSBUcmlhbmdsZS5zaXplO1xyXG4gICAgdGhpcy5oZWlnaHQgPSBUcmlhbmdsZS5zaXplO1xyXG4gICAgdGhpcy5zZWxlY3RlZCA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuZ2FtZS5hZGQudHdlZW4odGhpcylcclxuICAgICAgLnRvKHtcclxuICAgICAgICBhbHBoYTogMVxyXG4gICAgICB9LCAxMDAwLCBQaGFzZXIuRWFzaW5nLkJvdW5jZS5PdXQpXHJcbiAgICAgIC5zdGFydCgpO1xyXG4gIH1cclxufVxyXG5cclxuVHJpYW5nbGUuc2l6ZSA9IDcxO1xyXG5UcmlhbmdsZS5hbmltYXRpb25UaW1lID0gMjAwO1xyXG5FbmdpbmUuVHJpYW5nbGUgPSBUcmlhbmdsZTtcclxuIiwiY2xhc3MgVW5pdmVyc2UgZXh0ZW5kcyBQaGFzZXIuU3ByaXRlIHtcclxuICBjb25zdHJ1Y3RvcihnYW1lKSB7XHJcbiAgICBzdXBlcihnYW1lLCBnYW1lLndpZHRoIC8gMiwgZ2FtZS5oZWlnaHQgLyAyLCBuZXcgUGhhc2VyLkJpdG1hcERhdGEoZ2FtZS53aWR0aCwgZ2FtZS5oZWlnaHQpKTtcclxuICAgIHRoaXMuYW5jaG9yLnNldFRvKDAuNSk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGUoKSB7XHJcbiAgICBjb25zdCBtYXhTaXplID0gNDtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQwMDsgaSsrKSB7XHJcbiAgICAgIGxldCBzaXplID0gdGhpcy5nYW1lLnJuZC5iZXR3ZWVuKG1heFNpemUgLyAyLCBtYXhTaXplKTtcclxuICAgICAgbGV0IGJpdG1hcCA9IG5ldyBQaGFzZXIuQml0bWFwRGF0YShzaXplLCBzaXplKTtcclxuXHJcbiAgICAgIGJpdG1hcC5jdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgIGJpdG1hcC5jdHguZmlsbFN0eWxlID0gJ3doaXRlJztcclxuICAgICAgYml0bWFwLmN0eC5yZWN0KDAsIDAsIHNpemUsIHNpemUpO1xyXG4gICAgICBiaXRtYXAuY3R4LmZpbGwoKTtcclxuXHJcbiAgICAgIGxldCBzcHJpdGUgPSBuZXcgUGhhc2VyLlNwcml0ZShcclxuICAgICAgICB0aGlzLmdhbWUsXHJcbiAgICAgICAgdGhpcy5nYW1lLnJuZC5iZXR3ZWVuKC10aGlzLmdhbWUud2lkdGgsIHRoaXMuZ2FtZS53aWR0aCksXHJcbiAgICAgICAgdGhpcy5nYW1lLnJuZC5iZXR3ZWVuKC10aGlzLmdhbWUuaGVpZ2h0LCB0aGlzLmdhbWUuaGVpZ2h0KSxcclxuICAgICAgICBiaXRtYXBcclxuICAgICAgKTtcclxuXHJcbiAgICAgIHRoaXMuYWRkQ2hpbGQoc3ByaXRlKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbkVuZ2luZS5Vbml2ZXJzZSA9IFVuaXZlcnNlO1xyXG4iLCJjbGFzcyBHYW1lIGV4dGVuZHMgUGhhc2VyLlN0YXRlIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcblxyXG4gICAgd2luZG93LmdnID0gdGhpcztcclxuICB9XHJcblxyXG4gIGluaXQobnVtYmVyT2ZHcmFkYXRpb24pIHtcclxuICAgIHRoaXMuY29sb3JTZXRzID0gW107XHJcbiAgICAvKipcclxuICAgICAqIE51bWJlciBvZiBjb2xvclNldHMgd2lsbCB1c2UgaW4gdGhpcyBnYW1lIGxldmVsXHJcbiAgICAgKiBAdHlwZSB7W3R5cGVdfVxyXG4gICAgICovXHJcbiAgICB0aGlzLm51bWJlck9mR3JhZGF0aW9uID0gbnVtYmVyT2ZHcmFkYXRpb247XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYXJnaW5Ub3Agb2YgdHJpYW5nbGVzIG1hdHJpeFxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5tYXJnaW5Ub3AgPSAxMDA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYXJnaW5MZWZ0IG9mIHRyaWFuZ2xlcyBtYXRyaXhcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIHRoaXMubWFyZ2luTGVmdCA9IDY0O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWluaW1hbCB0cmlhbmdsZXMgZGVzdHJveSBsZW5ndGhcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIHRoaXMubWluVHJpYW5nbGVzRGVzdHJveSA9IDM7XHJcblxyXG4gICAgdGhpcy50cmlhbmdsZXNNYXRyaXggPSBbXTtcclxuICAgIHRoaXMuc2VsZWN0ZWRUcmlhbmdsZXMgPSBbXTtcclxuXHJcbiAgICB0aGlzLnNjb3JlID0gMDtcclxuXHJcbiAgICB0aGlzLnRyaWFuZ2xlTWF0cml4V2lkdGggPSAyNztcclxuICAgIHRoaXMudHJpYW5nbGVNYXRyaXhIZWlnaHQgPSA5O1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlKCkge1xyXG4gICAgdGhpcy5nYW1lLnN0YWdlLmJhY2tncm91bmRDb2xvciA9ICcjMDAwJztcclxuXHJcbiAgICB0aGlzLmNyZWF0ZVVuaXZlcnNlKCk7XHJcbiAgICB0aGlzLmNyZWF0ZUdyYWRhdGlvbnMoKTtcclxuXHJcbiAgICB0aGlzLnRyaWFuZ2xlR3JvdXAgPSB0aGlzLmdhbWUuYWRkLmdyb3VwKCk7XHJcblxyXG4gICAgdGhpcy5za2V0Y2goKTtcclxuICAgIHRoaXMuaW5pdEV2ZW50cygpO1xyXG4gICAgdGhpcy5jcmVhdGVTY29yZUxhYmxlKCk7XHJcbiAgICB0aGlzLmluaXRpYWxpemF0aW9uRnVsbFNjcmVlbigpO1xyXG5cclxuICAgIHRoaXMuZm9yY2VQb3J0cmFpdCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICAvLyB0aGlzLmdhbWUuZGVidWcuZ2VvbShuZXcgUGhhc2VyLkxpbmUodGhpcy5nYW1lLndvcmxkLmNlbnRlclgsIDAsIHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYLCB0aGlzLmdhbWUuaGVpZ2h0KSwgJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKScpO1xyXG4gICAgLy8gdGhpcy5nYW1lLmRlYnVnLmdlb20obmV3IFBoYXNlci5MaW5lKDAsIHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJZLCB0aGlzLmdhbWUud2lkdGgsIHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJZKSwgJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKScpO1xyXG4gICAgLy8gdGhpcy5nYW1lLmRlYnVnLmlucHV0SW5mbyg1MCwgNTAsICdyZ2IoMjU1LCAyNTUsIDI1NSknKTtcclxuICAgIC8vIHRoaXMuZ2FtZS5kZWJ1Zy5nZW9tKHRoaXMudHJpYW5nbGVHcm91cC5nZXRCb3VuZHMoKSwgJ3JnYmEoMzcsIDQzLCAxODksIDAuNSknKTtcclxuICAgIHRoaXMudW5pdmVyc2Uucm90YXRpb24gKz0gTWF0aC5QSSAvIDE4MDAgLyAzMDtcclxuICB9XHJcblxyXG4gIGNyZWF0ZUdyYWRhdGlvbnMoKSB7XHJcbiAgICBsZXQgYWxsR3JhZGF0aW9uID0gUGhhc2VyLkFycmF5VXRpbHMuc2h1ZmZsZShDb2xvclNldC5HUkFEQVRJT05TKTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubnVtYmVyT2ZHcmFkYXRpb247IGkrKykge1xyXG4gICAgICBsZXQgY29sb3JTZXQgPSBuZXcgQ29sb3JTZXQoYWxsR3JhZGF0aW9uW2ldKTtcclxuICAgICAgdGhpcy5jb2xvclNldHMucHVzaChjb2xvclNldCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjcmVhdGVVbml2ZXJzZSgpIHtcclxuICAgIHRoaXMudW5pdmVyc2UgPSBuZXcgRW5naW5lLlVuaXZlcnNlKHRoaXMuZ2FtZSk7XHJcblxyXG4gICAgdGhpcy51bml2ZXJzZS5jcmVhdGUoKTtcclxuXHJcbiAgICB0aGlzLmdhbWUuYWRkLmV4aXN0aW5nKHRoaXMudW5pdmVyc2UpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdGlhbGl6YXRpb24gZXZlbnQgaW4gdGhlIGdhbWVcclxuICAgKi9cclxuICBpbml0RXZlbnRzKCkge1xyXG4gICAgdGhpcy5nYW1lLmlucHV0Lm9uVXAuYWRkKHRoaXMuZGVzdHJveVRyaWFuZ2xlLCB0aGlzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSB0cmlhbmdsZXMgb24gY2FudmFzXHJcbiAgICovXHJcbiAgc2tldGNoKCkge1xyXG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLnRyaWFuZ2xlTWF0cml4V2lkdGg7IHgrKykge1xyXG4gICAgICB0aGlzLnRyaWFuZ2xlc01hdHJpeFt4XSA9IFtdO1xyXG4gICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMudHJpYW5nbGVNYXRyaXhIZWlnaHQ7IHkrKykge1xyXG4gICAgICAgIGxldCBwb3NYID0geCAqIChFbmdpbmUuVHJpYW5nbGUuc2l6ZSAvIDIgLSAxKTtcclxuICAgICAgICBsZXQgcG9zWSA9IHkgKiAoRW5naW5lLlRyaWFuZ2xlLnNpemUgLSAxKTtcclxuICAgICAgICBsZXQgaXNSb3RhdGVkID0geCAlIDIgPT09IDE7XHJcblxyXG4gICAgICAgIGlmICh5ICUgMiA9PT0gMSkge1xyXG4gICAgICAgICAgaXNSb3RhdGVkID0gIWlzUm90YXRlZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0cmlhbmdsZSA9IG5ldyBFbmdpbmUuVHJpYW5nbGUoXHJcbiAgICAgICAgICB0aGlzLmdhbWUsXHJcbiAgICAgICAgICBwb3NYLFxyXG4gICAgICAgICAgcG9zWSxcclxuICAgICAgICAgIGlzUm90YXRlZCxcclxuICAgICAgICAgIHRoaXMuZ2FtZS5ybmQucGljayh0aGlzLmNvbG9yU2V0cyksIHtcclxuICAgICAgICAgICAgeCxcclxuICAgICAgICAgICAgeVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHRyaWFuZ2xlLmV2ZW50cy5vbklucHV0T3Zlci5hZGQodGhpcy5zZWxlY3RUcmlhbmdsZSwgdGhpcyk7XHJcbiAgICAgICAgdHJpYW5nbGUuZXZlbnRzLm9uSW5wdXREb3duLmFkZCh0aGlzLnNlbGVjdFRyaWFuZ2xlLCB0aGlzKTtcclxuICAgICAgICB0cmlhbmdsZS5ldmVudHMuZGVsZXRlQ29tcGxldGUuYWRkKHRoaXMucmVjb3ZlclRyaWFuZ2xlLCB0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy50cmlhbmdsZXNNYXRyaXhbeF1beV0gPSB0cmlhbmdsZTtcclxuICAgICAgICB0aGlzLnRyaWFuZ2xlR3JvdXAuYWRkKHRyaWFuZ2xlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY2VudGVyaW5nTWF0cml4KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZXN0cm95IG9yIHVuc2VsZWN0IHRyaWFuZ2xlc1xyXG4gICAqL1xyXG4gIGRlc3Ryb3lUcmlhbmdsZSgpIHtcclxuICAgIGxldCBpc1Vuc2VsZWN0ID0gdGhpcy5zZWxlY3RlZFRyaWFuZ2xlcy5sZW5ndGggPCB0aGlzLm1pblRyaWFuZ2xlc0Rlc3Ryb3k7XHJcblxyXG4gICAgaWYgKCFpc1Vuc2VsZWN0KSB7XHJcbiAgICAgIHRoaXMudXBkYXRlU2NvcmUoTWF0aC5wb3codGhpcy5zZWxlY3RlZFRyaWFuZ2xlcy5sZW5ndGgsIDIuMTUpICogMTApO1xyXG4gICAgfVxyXG5cclxuICAgIHdoaWxlICh0aGlzLnNlbGVjdGVkVHJpYW5nbGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgbGV0IHRyaWFuZ2xlID0gdGhpcy5zZWxlY3RlZFRyaWFuZ2xlcy5wb3AoKTtcclxuICAgICAgaWYgKGlzVW5zZWxlY3QpIHtcclxuICAgICAgICB0cmlhbmdsZS51bnNlbGVjdCgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRyaWFuZ2xlLmRlbGV0ZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZWNvdmVyVHJpYW5nbGUodHJpYW5nbGUpIHtcclxuICAgIHRyaWFuZ2xlLnJlY292ZXIodGhpcy5nYW1lLnJuZC5waWNrKHRoaXMuY29sb3JTZXRzKSk7XHJcbiAgfVxyXG5cclxuICBzZWxlY3RUcmlhbmdsZSh0cmlhbmdsZSwgcG9pbnQpIHtcclxuICAgIGlmICghdGhpcy5nYW1lLmlucHV0LmFjdGl2ZVBvaW50ZXIuaXNEb3duKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5zZWxlY3RlZFRyaWFuZ2xlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgdHJpYW5nbGUuc2VsZWN0KCk7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRUcmlhbmdsZXMucHVzaCh0cmlhbmdsZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsZXQgbGFzdFNlbGVjdGVkVHJpYW5nbGUgPSB0aGlzLnNlbGVjdGVkVHJpYW5nbGVzW3RoaXMuc2VsZWN0ZWRUcmlhbmdsZXMubGVuZ3RoIC0gMV07XHJcbiAgICAgIGxldCBwcmVMYXN0U2VsZWN0ZWRUcmlhbmdsZSA9IHRoaXMuc2VsZWN0ZWRUcmlhbmdsZXNbdGhpcy5zZWxlY3RlZFRyaWFuZ2xlcy5sZW5ndGggLSAyXTtcclxuXHJcbiAgICAgIGlmICh0cmlhbmdsZS5zZWxlY3RlZCAmJiB0cmlhbmdsZSA9PT0gcHJlTGFzdFNlbGVjdGVkVHJpYW5nbGUpIHtcclxuICAgICAgICBsYXN0U2VsZWN0ZWRUcmlhbmdsZS51bnNlbGVjdCgpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUcmlhbmdsZXMucG9wKCk7XHJcbiAgICAgIH0gZWxzZSBpZiAoIXRyaWFuZ2xlLnNlbGVjdGVkICYmXHJcbiAgICAgICAgdGhpcy5jYW5UcmlhbmdsZUxpbmsobGFzdFNlbGVjdGVkVHJpYW5nbGUsIHRyaWFuZ2xlKSAmJlxyXG4gICAgICAgIGxhc3RTZWxlY3RlZFRyaWFuZ2xlLmNvbG9yU2V0ID09PSB0cmlhbmdsZS5jb2xvclNldFxyXG4gICAgICApIHtcclxuICAgICAgICB0cmlhbmdsZS5zZWxlY3QoKTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkVHJpYW5nbGVzLnB1c2godHJpYW5nbGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVjayB0cmlhbmdsZXMgbGlua1xyXG4gICAqL1xyXG4gIGNhblRyaWFuZ2xlTGluayh0cjEsIHRyMikge1xyXG4gICAgaWYgKHRyMS5tYXRyaXhQb3MueSA9PT0gdHIyLm1hdHJpeFBvcy55KSB7XHJcbiAgICAgIGlmICh0cjEubWF0cml4UG9zLnggKyAxID09PSB0cjIubWF0cml4UG9zLnggfHxcclxuICAgICAgICB0cjEubWF0cml4UG9zLnggLSAxID09PSB0cjIubWF0cml4UG9zLngpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0cjEubWF0cml4UG9zLnggPT09IHRyMi5tYXRyaXhQb3MueCkge1xyXG4gICAgICBpZiAodHIxLm1hdHJpeFBvcy54ICUgMiA9PT0gMCkge1xyXG4gICAgICAgIGlmICh0cjEuaXNSb3RhdGVkICYmIHRyMi5tYXRyaXhQb3MueSA9PT0gdHIxLm1hdHJpeFBvcy55IC0gMSkge1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIGlmICghdHIxLmlzUm90YXRlZCAmJiB0cjIubWF0cml4UG9zLnkgPT09IHRyMS5tYXRyaXhQb3MueSArIDEpIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoIXRyMS5pc1JvdGF0ZWQgJiYgdHIyLm1hdHJpeFBvcy55ID09PSB0cjEubWF0cml4UG9zLnkgKyAxKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRyMS5pc1JvdGF0ZWQgJiYgdHIyLm1hdHJpeFBvcy55ID09PSB0cjEubWF0cml4UG9zLnkgLSAxKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgc2NvcmUgb24gc3RhZ2VcclxuICAgKi9cclxuICBjcmVhdGVTY29yZUxhYmxlKCkge1xyXG4gICAgY29uc3QgcmFuZG9tQ29sb3JTZXQgPSB0aGlzLmdhbWUucm5kLnBpY2sodGhpcy5jb2xvclNldHMpO1xyXG4gICAgY29uc3QgY29sb3IgPSAnI2ZmZic7IC8vICsgUGhhc2VyLkNvbG9yLmNvbXBvbmVudFRvSGV4KHJhbmRvbUNvbG9yU2V0LmdldExhc3RDb2xvcigpKTtcclxuICAgIGNvbnN0IG1hcmdpblJpZ2h0ID0gMTU7XHJcbiAgICBjb25zdCBtYXJnaW5Ub3AgPSAxNTtcclxuXHJcbiAgICBjb25zdCBzdHlsZSA9IHtcclxuICAgICAgZm9udDogJzQycHggT3BlbiBTYW5zJyxcclxuICAgICAgZm9udFN0eWxlOiAnaXRhbGljJyxcclxuICAgICAgZmlsbDogY29sb3JcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNjb3JlTGFibGUgPSBuZXcgRW5naW5lLlNjb3JlTGFibGUoXHJcbiAgICAgIHRoaXMuZ2FtZSxcclxuICAgICAgdGhpcy5nYW1lLndpZHRoIC0gbWFyZ2luUmlnaHQsXHJcbiAgICAgIG1hcmdpblRvcCxcclxuICAgICAgMCxcclxuICAgICAgc3R5bGVcclxuICAgICk7XHJcbiAgICB0aGlzLnNjb3JlTGFibGUuYW5jaG9yLnNldFRvKDEsIDApO1xyXG5cclxuICAgIC8vIFRPRE86IFRFTVBcclxuICAgIHRoaXMuc2NvcmVMYWJsZS5pbnB1dEVuYWJsZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5zY29yZUxhYmxlLmV2ZW50cy5vbklucHV0RG93bi5hZGQodGhpcy50b2dnbGVGdWxsU2NyZWVuLCB0aGlzKTtcclxuICB9XHJcblxyXG4gIGluaXRpYWxpemF0aW9uRnVsbFNjcmVlbigpIHtcclxuICAgIHRoaXMuZ2FtZS5zY2FsZS5mdWxsU2NyZWVuU2NhbGVNb2RlID0gUGhhc2VyLlNjYWxlTWFuYWdlci5SRVNJWkU7XHJcbiAgICB0aGlzLmdhbWUuc2NhbGUub25GdWxsU2NyZWVuQ2hhbmdlXHJcbiAgICAgIC5hZGQodGhpcy5yZXNpemVTY3JlZW4sIHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlRnVsbFNjcmVlbigpIHtcclxuICAgIGlmICh0aGlzLmdhbWUuc2NhbGUuaXNGdWxsU2NyZWVuKSB7XHJcbiAgICAgIHRoaXMuZ2FtZS5zY2FsZS5zdG9wRnVsbFNjcmVlbigpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5nYW1lLnNjYWxlLnN0YXJ0RnVsbFNjcmVlbigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlU2NvcmUodmFsKSB7XHJcbiAgICB2YWwgPSBNYXRoLnJvdW5kKHZhbCk7XHJcblxyXG4gICAgdGhpcy5zY29yZSArPSB2YWw7XHJcbiAgICB0aGlzLnNjb3JlTGFibGUuY2hhbmdlVmFsdWUodGhpcy5zY29yZSk7XHJcbiAgfVxyXG5cclxuICByZXNpemVTY3JlZW4oKSB7XHJcbiAgICB0aGlzLnNjb3JlTGFibGUueCA9IHRoaXMuZ2FtZS53aWR0aCAtIDE1O1xyXG4gICAgdGhpcy5zY29yZUxhYmxlLnkgPSAxNTtcclxuXHJcbiAgICB0aGlzLnVuaXZlcnNlLnggPSB0aGlzLmdhbWUud2lkdGggLyAyO1xyXG4gICAgdGhpcy51bml2ZXJzZS55ID0gdGhpcy5nYW1lLmhlaWdodCAvIDI7XHJcblxyXG4gICAgdGhpcy5jZW50ZXJpbmdNYXRyaXgoKTtcclxuICB9XHJcblxyXG4gIGNlbnRlcmluZ01hdHJpeCgpIHtcclxuICAgIGNvbnN0IGhhbGZUcmlhbmdsZVNpemUgPSBFbmdpbmUuVHJpYW5nbGUuc2l6ZSAvIDI7XHJcblxyXG4gICAgdGhpcy50cmlhbmdsZUdyb3VwLnggPSB0aGlzLmdhbWUud2lkdGggLyAyIC0gdGhpcy50cmlhbmdsZUdyb3VwLndpZHRoIC8gMiArIGhhbGZUcmlhbmdsZVNpemU7XHJcbiAgICB0aGlzLnRyaWFuZ2xlR3JvdXAueSA9IHRoaXMuZ2FtZS5oZWlnaHQgLyAyIC0gdGhpcy50cmlhbmdsZUdyb3VwLmhlaWdodCAvIDIgKyBoYWxmVHJpYW5nbGVTaXplO1xyXG4gIH1cclxufVxyXG5cclxuRW5naW5lLkdhbWUgPSBHYW1lO1xyXG4iLG51bGwsIkVuZ2luZS5nYW1lID0gbmV3IFBoYXNlci5HYW1lKEVuZ2luZS5tYXhXaWR0aCwgRW5naW5lLm1heEhlaWdodCwgUGhhc2VyLkFVVE8pO1xyXG5cclxuRW5naW5lLmdhbWUuc3RhdGUuYWRkKCdCb290JywgRW5naW5lLkJvb3QpO1xyXG5FbmdpbmUuZ2FtZS5zdGF0ZS5hZGQoJ0xvYWRlcicsIEVuZ2luZS5Mb2FkZXIpO1xyXG4vLyBFbmdpbmUuZ2FtZS5zdGF0ZS5hZGQoJ01lbnUnLCBFbmdpbmUuTWVudSk7XHJcbkVuZ2luZS5nYW1lLnN0YXRlLmFkZCgnR2FtZScsIEVuZ2luZS5HYW1lKTtcclxuLy8gRW5naW5lLmdhbWUuc3RhdGUuYWRkKCdTY29yZUJvYXJkJywgRW5naW5lLlNjb3JlQm9hcmQpO1xyXG5cclxuRW5naW5lLmdhbWUuc3RhdGUuc3RhcnQoJ0Jvb3QnKTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
