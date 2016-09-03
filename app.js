'use strict';

var Engine = {
  minWidth: 640,
  minHeight: 320,
  maxWidth: 1024,
  maxHeight: 720
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

    _this.game.add.existing(_this);
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

var Game = function (_Phaser$State) {
  _inherits(Game, _Phaser$State);

  function Game() {
    _classCallCheck(this, Game);

    return _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this));
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
    }
  }, {
    key: 'create',
    value: function create() {
      this.game.stage.backgroundColor = '#000';

      this.createGradations();

      this.sketch();
      this.initEvents();
      this.createScoreLable();
    }
  }, {
    key: 'render',
    value: function render() {
      // this.game.debug.inputInfo(50, 50, 'rgb(255, 255, 255)');
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
      for (var x = 0; x < 27; x++) {
        this.trianglesMatrix[x] = [];
        for (var y = 0; y < 9; y++) {
          var posX = this.marginLeft + x * (Engine.Triangle.size / 2 - 1);
          var posY = this.marginTop + y * (Engine.Triangle.size - 1);
          var isRotated = x % 2 === 1;

          if (y % 2 === 1) {
            isRotated = !isRotated;
          }

          var triangle = new Engine.Triangle(this.game, posX, posY, isRotated, this.game.rnd.pick(this.colorSets), { x: x, y: y });

          triangle.events.onInputOver.add(this.selectTriangle, this);
          triangle.events.onInputDown.add(this.selectTriangle, this);
          // triangle.events.onInputOut.add(this.selectTriangle, this);
          triangle.events.deleteComplete.add(this.recoverTriangle, this);

          this.trianglesMatrix[x][y] = triangle;
        }
      }
    }

    /**
     * Destroy or unselect triangles
     */

  }, {
    key: 'destroyTriangle',
    value: function destroyTriangle() {
      if (this.selectedTriangles.length < this.minTrianglesDestroy) {
        while (this.selectedTriangles.length > 0) {
          var triangle = this.selectedTriangles.pop();
          triangle.unselect();
        }
      } else {
        this.updateScore(Math.pow(this.selectedTriangles.length, 2.15) * 10);

        while (this.selectedTriangles.length > 0) {
          var _triangle = this.selectedTriangles.pop();
          _triangle.delete();
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
        } else if (!triangle.selected && this.checkTriangleLink(lastSelectedTriangle, triangle) && lastSelectedTriangle.colorSet === triangle.colorSet) {
          triangle.select();
          this.selectedTriangles.push(triangle);
        }
      }
    }

    /**
     * Check triangles link
     */

  }, {
    key: 'checkTriangleLink',
    value: function checkTriangleLink(tr1, tr2) {
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
      var marginRight = 25;
      var marginTop = 15;

      var style = {
        font: '42px Open Sans',
        fontStyle: 'italic',
        fill: color
      };

      this.scoreLable = new Engine.ScoreLable(this.game, this.game.width - marginRight, marginTop, 0, style);
      this.scoreLable.anchor.setTo(1, 0);
    }
  }, {
    key: 'updateScore',
    value: function updateScore(val) {
      val = Math.round(val);

      this.score += val;
      this.scoreLable.changeValue(this.score);

      console.log(this.score);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS5qcyIsImJvb3QuanMiLCJsb2FkZXIuanMiLCJtZW51LmpzIiwiY29sb3JzZXQuanMiLCJzY29yZWxhYmxlLmpzIiwidHJpYW5nbGUuanMiLCJnYW1lLmpzIiwic2NvcmVib2FyZC5qcyIsImFwcC5qcyJdLCJuYW1lcyI6WyJFbmdpbmUiLCJtaW5XaWR0aCIsIm1pbkhlaWdodCIsIm1heFdpZHRoIiwibWF4SGVpZ2h0Iiwia2V5cyIsInRyaWFuZ2xlIiwiQm9vdCIsInNjYWxlIiwicGFnZUFsaWduSG9yaXpvbnRhbGx5IiwicGFnZUFsaWduVmVydGljYWxseSIsInN0YXRlIiwic3RhcnQiLCJQaGFzZXIiLCJTdGF0ZSIsIkxvYWRlciIsImdhbWUiLCJzdGFnZSIsImJhY2tncm91bmRDb2xvciIsImFkZFByb2dyZXNzTGFibGUiLCJsb2FkIiwib25GaWxlQ29tcGxldGUiLCJhZGQiLCJyZWZyZXNoUHJvZ3Jlc3MiLCJnZW5lcmF0ZVRyaWFuZ2xlIiwibnVtYmVyT2ZHcmFkYXRpb24iLCJzdHlsZSIsImZvbnQiLCJmaWxsIiwicHJvZ3Jlc3NMYWJsZSIsInRleHQiLCJ3b3JsZCIsImNlbnRlclgiLCJjZW50ZXJZIiwiYW5jaG9yIiwic2V0VG8iLCJwcm9ncmVzcyIsImNhY2hlS2V5Iiwic3VjY2VzcyIsInRvdGFsTG9hZGVkIiwidG90YWxGaWxlcyIsInNpemUiLCJiaXRtYXAiLCJCaXRtYXBEYXRhIiwiY3R4IiwiYmVnaW5QYXRoIiwiZmlsbFN0eWxlIiwibW92ZVRvIiwibGluZVRvIiwiY2FjaGUiLCJhZGRCaXRtYXBEYXRhIiwiQ29sb3JTZXQiLCJncmFkaXRpb24iLCJybmQiLCJwaWNrIiwibnVtYmVyIiwibGVuZ3RoIiwiR1JBREFUSU9OUyIsIlNjb3JlTGFibGUiLCJ4IiwieSIsInNjb3JlIiwiTWF0aCIsInJvdW5kIiwiZXhpc3RpbmciLCJ0d2VlbnMiLCJyZW1vdmUiLCJ0d2VlbiIsInRvIiwiYW5pbWF0aW9uQ2hhbmdlVmFsIiwib25VcGRhdGVDYWxsYmFjayIsIm9uQ29tcGxldGUiLCJUZXh0IiwiVHJpYW5nbGUiLCJpc1JvdGF0ZWQiLCJjb2xvclNldCIsIm1hdHJpeFBvc2l0aW9uIiwiZ2V0Qml0bWFwRGF0YSIsIndpZHRoIiwiaGVpZ2h0IiwidGludCIsImdldFJhbmRvbUNvbG9yIiwibWF0cml4UG9zIiwiaW5wdXRFbmFibGVkIiwiaW5wdXQiLCJwaXhlbFBlcmZlY3RPdmVyIiwicGl4ZWxQZXJmZWN0Q2xpY2siLCJldmVudHMiLCJkZWxldGVDb21wbGV0ZSIsIlNpZ25hbCIsInNlbGVjdGVkIiwicm90YXRpb24iLCJQSSIsImFkZENoaWxkIiwiYW5pbWF0aW9uVGltZSIsImFjdGl2ZVBvaW50ZXIiLCJpc0Rvd24iLCJhbHBoYSIsImRpc3BhdGNoIiwiRWFzaW5nIiwiQm91bmNlIiwiT3V0IiwiU3ByaXRlIiwiR2FtZSIsImNvbG9yU2V0cyIsIm1hcmdpblRvcCIsIm1hcmdpbkxlZnQiLCJtaW5UcmlhbmdsZXNEZXN0cm95IiwidHJpYW5nbGVzTWF0cml4Iiwic2VsZWN0ZWRUcmlhbmdsZXMiLCJjcmVhdGVHcmFkYXRpb25zIiwic2tldGNoIiwiaW5pdEV2ZW50cyIsImNyZWF0ZVNjb3JlTGFibGUiLCJhbGxHcmFkYXRpb24iLCJBcnJheVV0aWxzIiwic2h1ZmZsZSIsImkiLCJwdXNoIiwib25VcCIsImRlc3Ryb3lUcmlhbmdsZSIsInBvc1giLCJwb3NZIiwib25JbnB1dE92ZXIiLCJzZWxlY3RUcmlhbmdsZSIsIm9uSW5wdXREb3duIiwicmVjb3ZlclRyaWFuZ2xlIiwicG9wIiwidW5zZWxlY3QiLCJ1cGRhdGVTY29yZSIsInBvdyIsImRlbGV0ZSIsInJlY292ZXIiLCJwb2ludCIsInNlbGVjdCIsImxhc3RTZWxlY3RlZFRyaWFuZ2xlIiwicHJlTGFzdFNlbGVjdGVkVHJpYW5nbGUiLCJjaGVja1RyaWFuZ2xlTGluayIsInRyMSIsInRyMiIsInJhbmRvbUNvbG9yU2V0IiwiY29sb3IiLCJtYXJnaW5SaWdodCIsImZvbnRTdHls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RUFzRixjQUFRQyxHQUFSLENBQVksS0FBS3ZGLEtBQWpCO0FBQ0Q7Ozs7RUFsTmdCaEQsT0FBT0M7O0FBcU4xQmQsT0FBT3VHLElBQVAsR0FBY0EsSUFBZDtBQ3JOQTs7O0FDQUF2RyxPQUFPZ0IsSUFBUCxHQUFjLElBQUlILE9BQU8wRixJQUFYLENBQWdCdkcsT0FBT0csUUFBdkIsRUFBaUNILE9BQU9JLFNBQXhDLEVBQW1EUyxPQUFPd0ksSUFBMUQsQ0FBZDs7QUFFQXJKLE9BQU9nQixJQUFQLENBQVlMLEtBQVosQ0FBa0JXLEdBQWxCLENBQXNCLE1BQXRCLEVBQThCdEIsT0FBT08sSUFBckM7QUFDQVAsT0FBT2dCLElBQVAsQ0FBWUwsS0FBWixDQUFrQlcsR0FBbEIsQ0FBc0IsUUFBdEIsRUFBZ0N0QixPQUFPZSxNQUF2QztBQUNBO0FBQ0FmLE9BQU9nQixJQUFQLENBQVlMLEtBQVosQ0FBa0JXLEdBQWxCLENBQXNCLE1BQXRCLEVBQThCdEIsT0FBT3VHLElBQXJDO0FBQ0E7O0FBRUF2RyxPQUFPZ0IsSUFBUCxDQUFZTCxLQUFaLENBQWtCQyxLQUFsQixDQUF3QixNQUF4QiIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgRW5naW5lID0ge1xyXG4gIG1pbldpZHRoOiA2NDAsXHJcbiAgbWluSGVpZ2h0OiAzMjAsXHJcbiAgbWF4V2lkdGg6IDEwMjQsXHJcbiAgbWF4SGVpZ2h0OiA3MjAsXHJcbn07XHJcblxyXG4vKipcclxuICogU3ByaXRlLCBCaXRtYXAsIGV0Yy4uLiBjaGFjaGUga2V5c1xyXG4gKiBAdHlwZSB7T2JqZWN0fVxyXG4gKi9cclxuRW5naW5lLmtleXMgPSB7XHJcbiAgdHJpYW5nbGU6ICd0cmlhbmdsZScsXHJcbn1cclxuIiwiY2xhc3MgQm9vdCBleHRlbmRzIFBoYXNlci5TdGF0ZSB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgcHJlbG9hZCgpIHtcclxuXHJcbiAgfVxyXG5cclxuICBjcmVhdGUoKSB7XHJcbiAgICB0aGlzLnNjYWxlLnBhZ2VBbGlnbkhvcml6b250YWxseSA9IHRydWU7XHJcbiAgICB0aGlzLnNjYWxlLnBhZ2VBbGlnblZlcnRpY2FsbHkgPSB0cnVlO1xyXG4gICAgdGhpcy5zdGF0ZS5zdGFydCgnTG9hZGVyJyk7XHJcbiAgfVxyXG59XHJcblxyXG5FbmdpbmUuQm9vdCA9IEJvb3Q7XHJcbiIsImNsYXNzIExvYWRlciBleHRlbmRzIFBoYXNlci5TdGF0ZSB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgcHJlbG9hZCgpIHtcclxuICAgIHRoaXMuZ2FtZS5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzAwMCc7XHJcbiAgICB0aGlzLmFkZFByb2dyZXNzTGFibGUoKTtcclxuXHJcbiAgICB0aGlzLmxvYWQub25GaWxlQ29tcGxldGUuYWRkKHRoaXMucmVmcmVzaFByb2dyZXNzLCB0aGlzKTsgICAgXHJcblxyXG4gICAgdGhpcy5nZW5lcmF0ZVRyaWFuZ2xlKCk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGUoKSB7XHJcbiAgICBsZXQgbnVtYmVyT2ZHcmFkYXRpb24gPSAzO1xyXG4gICAgdGhpcy5zdGF0ZS5zdGFydCgnR2FtZScsIHRydWUsIGZhbHNlLCBudW1iZXJPZkdyYWRhdGlvbik7XHJcbiAgfVxyXG5cclxuICBhZGRQcm9ncmVzc0xhYmxlKCkge1xyXG4gICAgbGV0IHN0eWxlID0ge1xyXG4gICAgICBmb250OiAnNDFweCBPcGVuIFNhbnMnLFxyXG4gICAgICBmaWxsOiAnIzAwRTY3NidcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnByb2dyZXNzTGFibGUgPSB0aGlzLmFkZC50ZXh0KHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYLCB0aGlzLmdhbWUud29ybGQuY2VudGVyWSwgJ0xvYWRpbmc6IDAlICgwLzApJywgc3R5bGUpO1xyXG4gICAgdGhpcy5wcm9ncmVzc0xhYmxlLmFuY2hvci5zZXRUbygwLjUpO1xyXG4gIH1cclxuXHJcbiAgcmVmcmVzaFByb2dyZXNzKHByb2dyZXNzLCBjYWNoZUtleSwgc3VjY2VzcywgdG90YWxMb2FkZWQsIHRvdGFsRmlsZXMpIHtcclxuICAgIHRoaXMucHJvZ3Jlc3NMYWJsZS50ZXh0ID0gYExvYWRpbmcgJHtwcm9ncmVzc30lICgke3RvdGFsTG9hZGVkfS8ke3RvdGFsRmlsZXN9KWA7XHJcbiAgfVxyXG5cclxuICBnZW5lcmF0ZVRyaWFuZ2xlKCkge1xyXG4gICAgY29uc3Qgc2l6ZSA9IDI1NTtcclxuXHJcbiAgICBsZXQgYml0bWFwID0gbmV3IFBoYXNlci5CaXRtYXBEYXRhKHNpemUsIHNpemUpO1xyXG5cclxuICAgIGJpdG1hcC5jdHguYmVnaW5QYXRoKCk7XHJcbiAgICBiaXRtYXAuY3R4LmZpbGxTdHlsZSA9ICd3aGl0ZSc7XHJcbiAgICBiaXRtYXAuY3R4Lm1vdmVUbygwLCBzaXplKTtcclxuICAgIGJpdG1hcC5jdHgubGluZVRvKHNpemUgLyAyLCAwKTtcclxuICAgIGJpdG1hcC5jdHgubGluZVRvKHNpemUsIHNpemUpO1xyXG4gICAgYml0bWFwLmN0eC5saW5lVG8oMCwgc2l6ZSk7XHJcbiAgICBiaXRtYXAuY3R4LmZpbGwoKTtcclxuXHJcbiAgICB0aGlzLmdhbWUuY2FjaGUuYWRkQml0bWFwRGF0YShFbmdpbmUua2V5cy50cmlhbmdsZSwgYml0bWFwKTtcclxuICB9XHJcbn1cclxuXHJcbkVuZ2luZS5Mb2FkZXIgPSBMb2FkZXI7XHJcbiIsbnVsbCwiY2xhc3MgQ29sb3JTZXQge1xyXG4gIC8qKlxyXG4gICAqIENvbG9yIFNldFxyXG4gICAqIEBwYXJhbSAge0FycmF5fSBncmFkaXRpb24gQXJyYXkgb2YgY29sb3JzXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoZ3JhZGl0aW9uKSB7XHJcbiAgICB0aGlzLmdyYWRpdGlvbiA9IGdyYWRpdGlvbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCByYW5kb20gY29sb3IgZnJvbSBzZXRcclxuICAgKiBAcmV0dXJuIHtbdHlwZV19IFtkZXNjcmlwdGlvbl1cclxuICAgKi9cclxuICBnZXRSYW5kb21Db2xvcigpIHtcclxuICAgIHJldHVybiBFbmdpbmUuZ2FtZS5ybmQucGljayh0aGlzLmdyYWRpdGlvbik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgY29sb3IgYnkgbnVtYmVyXHJcbiAgICovXHJcbiAgZ2V0QnlOdW1iZXIobnVtYmVyKSB7XHJcbiAgICByZXR1cm4gdGhpcy5ncmFkaXRpb25bbnVtYmVyXTtcclxuICB9XHJcblxyXG4gIGdldExhc3RDb2xvcigpIHtcclxuICAgIHJldHVybiB0aGlzLmdyYWRpdGlvblt0aGlzLmdyYWRpdGlvbi5sZW5ndGggLSAxXTtcclxuICB9XHJcbn1cclxuXHJcbkNvbG9yU2V0LkdSQURBVElPTlMgPSBbXHJcbiAgLy8gaW5kaWdvXHJcbiAgW1xyXG4gICAgMHgzRjUxQjUsXHJcbiAgICAweDM5NDlBQixcclxuICAgIDB4MzAzRjlGLFxyXG4gICAgMHgyODM1OTMsXHJcbiAgXSxcclxuICAvLyBibHVlXHJcbiAgW1xyXG4gICAgMHgyMTk2RjMsXHJcbiAgICAweDFFODhFNSxcclxuICAgIDB4MTk3NkQyLFxyXG4gICAgMHgxNTY1QzAsXHJcbiAgXSxcclxuICAvLyB5ZWxsb3dcclxuICBbXHJcbiAgICAweEZGRjE3NixcclxuICAgIDB4RkZFRTU4LFxyXG4gICAgMHhGRkVCM0IsXHJcbiAgICAweEZERDgzNSxcclxuICBdLFxyXG4gIC8vIHBpbmtcclxuICBbXHJcbiAgICAweEU5MUU2MyxcclxuICAgIDB4RDgxQjYwLFxyXG4gICAgMHhDMjE4NUIsXHJcbiAgICAweEFEMTQ1NyxcclxuICBdLFxyXG4gIC8vIGJyb3duXHJcbiAgW1xyXG4gICAgMHg3OTU1NDgsXHJcbiAgICAweDZENEM0MSxcclxuICAgIDB4NUQ0MDM3LFxyXG4gICAgMHg0RTM0MkUsXHJcbiAgXSxcclxuICAvLyAvLyBkZWVwb3JhbmdlXHJcbiAgLy8gW1xyXG4gIC8vICAgMHhGRjU3MjIsXHJcbiAgLy8gICAweEY0NTExRSxcclxuICAvLyAgIDB4RTY0QTE5LFxyXG4gIC8vICAgMHhEODQzMTUsXHJcbiAgLy8gXSxcclxuICAvLyBncmV5XHJcbiAgW1xyXG4gICAgMHg5RTlFOUUsXHJcbiAgICAweDc1NzU3NSxcclxuICAgIDB4NjE2MTYxLFxyXG4gICAgMHg0MjQyNDIsXHJcbiAgXSxcclxuICAvLyAvLyByZWRcclxuICAvLyBbXHJcbiAgLy8gICAweEY0NDMzNixcclxuICAvLyAgIDB4RTUzOTM1LFxyXG4gIC8vICAgMHhEMzJGMkYsXHJcbiAgLy8gICAweEM2MjgyOCxcclxuICAvLyBdLFxyXG5dO1xyXG5cclxuRW5naW5lLkNvbG9yU2V0ID0gQ29sb3JTZXQ7XHJcbiIsImNsYXNzIFNjb3JlTGFibGUgZXh0ZW5kcyBQaGFzZXIuVGV4dCB7XHJcbiAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgc2NvcmUsIHN0eWxlKSB7XHJcbiAgICBzdXBlcihnYW1lLCB4LCB5LCBgU2NvcmU6ICR7TWF0aC5yb3VuZChzY29yZSl9YCwgc3R5bGUpO1xyXG5cclxuICAgIHRoaXMuc2NvcmUgPSBzY29yZTtcclxuXHJcbiAgICB0aGlzLmdhbWUuYWRkLmV4aXN0aW5nKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIHNjb3JlIGxhYmxlIHZhbHVlXHJcbiAgICogQHBhcmFtICB7TnVtYmVyfSBzY29yZSBOZXcgc2NvcmVcclxuICAgKi9cclxuICBjaGFuZ2VWYWx1ZShzY29yZSkge1xyXG4gICAgdGhpcy5nYW1lLnR3ZWVucy5yZW1vdmUodGhpcyk7XHJcblxyXG4gICAgbGV0IHR3ZWVuID0gdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzKVxyXG4gICAgICAudG8oe1xyXG4gICAgICAgIHNjb3JlXHJcbiAgICAgIH0sIFNjb3JlTGFibGUuYW5pbWF0aW9uQ2hhbmdlVmFsKVxyXG4gICAgICAub25VcGRhdGVDYWxsYmFjaygoKSA9PiB7XHJcbiAgICAgICAgdGhpcy50ZXh0ID0gYFNjb3JlOiAke01hdGgucm91bmQodGhpcy5zY29yZSl9YDtcclxuICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgdHdlZW4ub25Db21wbGV0ZVxyXG4gICAgICAuYWRkKCgpID0+IHtcclxuICAgICAgICB0aGlzLnRleHQgPSBgU2NvcmU6ICR7TWF0aC5yb3VuZCh0aGlzLnNjb3JlKX1gO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB0d2Vlbi5zdGFydCgpO1xyXG4gIH1cclxufVxyXG5cclxuU2NvcmVMYWJsZS5hbmltYXRpb25DaGFuZ2VWYWwgPSA1MDA7XHJcbkVuZ2luZS5TY29yZUxhYmxlID0gU2NvcmVMYWJsZTtcclxuIiwiY2xhc3MgVHJpYW5nbGUgZXh0ZW5kcyBQaGFzZXIuU3ByaXRlIHtcclxuXHJcbiAgLyoqXHJcbiAgICogSXQncyBhIHRyaWFuZ2xlLCB5YXNoIGl0J3Mgbm90IGEgam9rZVxyXG4gICAqIEBwYXJhbSAge1BoYXNlci5HYW1lfSAgZ2FtZSAgICAgIFtkZXNjcmlwdGlvbl1cclxuICAgKiBAcGFyYW0gIHtbdHlwZV19ICB4ICAgICAgICAgW2Rlc2NyaXB0aW9uXVxyXG4gICAqIEBwYXJhbSAge1t0eXBlXX0gIHkgICAgICAgICBbZGVzY3JpcHRpb25dXHJcbiAgICogQHBhcmFtICB7Qm9vbGVhbn0gaXNSb3RhdGVkIFtkZXNjcmlwdGlvbl1cclxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9ICBjb2xvciAgICAgW2Rlc2NyaXB0aW9uXVxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIGlzUm90YXRlZCwgY29sb3JTZXQsIG1hdHJpeFBvc2l0aW9uKSB7XHJcbiAgICBzdXBlcihnYW1lLCB4LCB5LCBFbmdpbmUuZ2FtZS5jYWNoZS5nZXRCaXRtYXBEYXRhKEVuZ2luZS5rZXlzLnRyaWFuZ2xlKSk7XHJcblxyXG4gICAgdGhpcy53aWR0aCA9IFRyaWFuZ2xlLnNpemU7XHJcbiAgICB0aGlzLmhlaWdodCA9IFRyaWFuZ2xlLnNpemU7XHJcbiAgICB0aGlzLmFuY2hvci5zZXRUbygwLjUpO1xyXG4gICAgdGhpcy5jb2xvclNldCA9IGNvbG9yU2V0O1xyXG4gICAgdGhpcy50aW50ID0gdGhpcy5jb2xvclNldC5nZXRSYW5kb21Db2xvcigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUG9pdGlvbiBpbiB0aGUgbWF0cml4IG9mIHRyaWFuZ2xlc1xyXG4gICAgICogQHR5cGUge1t0eXBlXX1cclxuICAgICAqL1xyXG4gICAgdGhpcy5tYXRyaXhQb3MgPSBtYXRyaXhQb3NpdGlvbjtcclxuXHJcbiAgICB0aGlzLmlucHV0RW5hYmxlZCA9IHRydWU7XHJcbiAgICB0aGlzLmlucHV0LnBpeGVsUGVyZmVjdE92ZXIgPSB0cnVlO1xyXG4gICAgdGhpcy5pbnB1dC5waXhlbFBlcmZlY3RDbGljayA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5ldmVudHMuZGVsZXRlQ29tcGxldGUgPSBuZXcgUGhhc2VyLlNpZ25hbCgpO1xyXG5cclxuICAgIHRoaXMuc2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuaXNSb3RhdGVkID0gaXNSb3RhdGVkO1xyXG5cclxuICAgIGlmIChpc1JvdGF0ZWQpIHtcclxuICAgICAgdGhpcy5yb3RhdGlvbiA9IE1hdGguUEk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdGhpcy5hZGRUZXh0UG9zaXRpb24oKTtcclxuXHJcbiAgICB0aGlzLmdhbWUuYWRkLmV4aXN0aW5nKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgYWRkVGV4dFBvc2l0aW9uKCkge1xyXG4gICAgbGV0IHRleHQgPSBuZXcgUGhhc2VyLlRleHQoXHJcbiAgICAgIHRoaXMuZ2FtZSxcclxuICAgICAgVHJpYW5nbGUuc2l6ZSAvIDIsXHJcbiAgICAgIFRyaWFuZ2xlLnNpemUgLyAyLFxyXG4gICAgICBgJHt0aGlzLm1hdHJpeFBvcy54fToke3RoaXMubWF0cml4UG9zLnl9YCxcclxuICAgICAge1xyXG4gICAgICAgIGZvbnQ6ICc2NHB4IE9wZW4gU2FucycsXHJcbiAgICAgICAgZmlsbDogJ2JsYWNrJ1xyXG4gICAgICB9XHJcbiAgICApXHJcblxyXG4gICAgaWYgKHRoaXMuaXNSb3RhdGVkKSB7XHJcbiAgICAgIHRleHQucm90YXRpb24gKz0gTWF0aC5QSTtcclxuICAgICAgdGV4dC55ID0gK3RleHQuaGVpZ2h0O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGV4dC54ID0gLXRleHQud2lkdGggLyAyO1xyXG4gICAgICB0ZXh0LnkgPSAtdGV4dC5oZWlnaHQgLyA0O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYWRkQ2hpbGQodGV4dCk7XHJcbiAgfVxyXG5cclxuICBzZWxlY3QoKSB7XHJcbiAgICBpZiAoIXRoaXMuc2VsZWN0ZWQpIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZCA9IHRydWU7XHJcblxyXG4gICAgICB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMpXHJcbiAgICAgICAgLnRvKHtcclxuICAgICAgICAgIHdpZHRoOiBUcmlhbmdsZS5zaXplIC8gMS41LFxyXG4gICAgICAgICAgaGVpZ2h0OiBUcmlhbmdsZS5zaXplIC8gMS41XHJcbiAgICAgICAgfSwgVHJpYW5nbGUuYW5pbWF0aW9uVGltZSlcclxuICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgfVxyXG4gIH1cclxuXHJcbiAgdW5zZWxlY3QoKSB7XHJcbiAgICBpZiAodGhpcy5zZWxlY3RlZCkge1xyXG5cclxuICAgICAgdGhpcy5nYW1lLnR3ZWVucy5yZW1vdmUodGhpcyk7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgIHRoaXMuZ2FtZS5hZGQudHdlZW4odGhpcylcclxuICAgICAgICAudG8oe1xyXG4gICAgICAgICAgd2lkdGg6IFRyaWFuZ2xlLnNpemUsXHJcbiAgICAgICAgICBoZWlnaHQ6IFRyaWFuZ2xlLnNpemVcclxuICAgICAgICB9LCBUcmlhbmdsZS5hbmltYXRpb25UaW1lKVxyXG4gICAgICAgIC5zdGFydCgpO1xyXG4gICAgICB9XHJcbiAgfVxyXG5cclxuICBkZWxldGUoKSB7XHJcbiAgICBpZiAodGhpcy5nYW1lLmlucHV0LmFjdGl2ZVBvaW50ZXIuaXNEb3duKSB7XHJcbiAgICAgIHRoaXMuZ2FtZS5hZGQudHdlZW4odGhpcylcclxuICAgICAgICAudG8oe1xyXG4gICAgICAgICAgd2lkdGg6IDAsXHJcbiAgICAgICAgICBoZWlnaHQ6IDAsXHJcbiAgICAgICAgICBhbHBoYTogMFxyXG4gICAgICAgIH0sIFRyaWFuZ2xlLmFuaW1hdGlvblRpbWUpXHJcbiAgICAgICAgLnN0YXJ0KClcclxuICAgICAgICAub25Db21wbGV0ZVxyXG4gICAgICAgIC5hZGQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5ldmVudHMuZGVsZXRlQ29tcGxldGUuZGlzcGF0Y2godGhpcyk7XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZWNvdmVyKGNvbG9yU2V0KSB7XHJcbiAgICB0aGlzLmNvbG9yU2V0ID0gY29sb3JTZXQ7XHJcbiAgICB0aGlzLnRpbnQgPSB0aGlzLmNvbG9yU2V0LmdldFJhbmRvbUNvbG9yKCk7XHJcbiAgICB0aGlzLndpZHRoID0gVHJpYW5nbGUuc2l6ZTtcclxuICAgIHRoaXMuaGVpZ2h0ID0gVHJpYW5nbGUuc2l6ZTtcclxuICAgIHRoaXMuc2VsZWN0ZWQgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMpXHJcbiAgICAgIC50byh7XHJcbiAgICAgICAgYWxwaGE6IDFcclxuICAgICAgfSwgMTAwMCwgUGhhc2VyLkVhc2luZy5Cb3VuY2UuT3V0KVxyXG4gICAgICAuc3RhcnQoKTtcclxuICB9XHJcbn1cclxuXHJcblRyaWFuZ2xlLnNpemUgPSA3MTtcclxuVHJpYW5nbGUuYW5pbWF0aW9uVGltZSA9IDIwMDtcclxuRW5naW5lLlRyaWFuZ2xlID0gVHJpYW5nbGU7XHJcbiIsImNsYXNzIEdhbWUgZXh0ZW5kcyBQaGFzZXIuU3RhdGUge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIGluaXQobnVtYmVyT2ZHcmFkYXRpb24pIHtcclxuICAgIHRoaXMuY29sb3JTZXRzID0gW107XHJcbiAgICAvKipcclxuICAgICAqIE51bWJlciBvZiBjb2xvclNldHMgd2lsbCB1c2UgaW4gdGhpcyBnYW1lIGxldmVsXHJcbiAgICAgKiBAdHlwZSB7W3R5cGVdfVxyXG4gICAgICovXHJcbiAgICB0aGlzLm51bWJlck9mR3JhZGF0aW9uID0gbnVtYmVyT2ZHcmFkYXRpb247XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYXJnaW5Ub3Agb2YgdHJpYW5nbGVzIG1hdHJpeFxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5tYXJnaW5Ub3AgPSAxMDA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYXJnaW5MZWZ0IG9mIHRyaWFuZ2xlcyBtYXRyaXhcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIHRoaXMubWFyZ2luTGVmdCA9IDY0O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWluaW1hbCB0cmlhbmdsZXMgZGVzdHJveSBsZW5ndGhcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIHRoaXMubWluVHJpYW5nbGVzRGVzdHJveSA9IDM7XHJcblxyXG4gICAgdGhpcy50cmlhbmdsZXNNYXRyaXggPSBbXTtcclxuICAgIHRoaXMuc2VsZWN0ZWRUcmlhbmdsZXMgPSBbXTtcclxuXHJcbiAgICB0aGlzLnNjb3JlID0gMDtcclxuICB9XHJcblxyXG4gIGNyZWF0ZSgpIHtcclxuICAgIHRoaXMuZ2FtZS5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzAwMCc7XHJcblxyXG4gICAgdGhpcy5jcmVhdGVHcmFkYXRpb25zKCk7XHJcblxyXG4gICAgdGhpcy5za2V0Y2goKTtcclxuICAgIHRoaXMuaW5pdEV2ZW50cygpO1xyXG4gICAgdGhpcy5jcmVhdGVTY29yZUxhYmxlKCk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICAvLyB0aGlzLmdhbWUuZGVidWcuaW5wdXRJbmZvKDUwLCA1MCwgJ3JnYigyNTUsIDI1NSwgMjU1KScpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlR3JhZGF0aW9ucygpIHtcclxuICAgIGxldCBhbGxHcmFkYXRpb24gPSBQaGFzZXIuQXJyYXlVdGlscy5zaHVmZmxlKENvbG9yU2V0LkdSQURBVElPTlMpO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5udW1iZXJPZkdyYWRhdGlvbjsgaSsrKSB7XHJcbiAgICAgIGxldCBjb2xvclNldCA9IG5ldyBDb2xvclNldChhbGxHcmFkYXRpb25baV0pO1xyXG4gICAgICB0aGlzLmNvbG9yU2V0cy5wdXNoKGNvbG9yU2V0KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYWxpemF0aW9uIGV2ZW50IGluIHRoZSBnYW1lXHJcbiAgICovXHJcbiAgaW5pdEV2ZW50cygpIHtcclxuICAgIHRoaXMuZ2FtZS5pbnB1dC5vblVwLmFkZCh0aGlzLmRlc3Ryb3lUcmlhbmdsZSwgdGhpcyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgdHJpYW5nbGVzIG9uIGNhbnZhc1xyXG4gICAqL1xyXG4gIHNrZXRjaCgpIHtcclxuICAgIGZvciAobGV0IHggPSAwOyB4IDwgMjc7IHgrKykge1xyXG4gICAgICB0aGlzLnRyaWFuZ2xlc01hdHJpeFt4XSA9IFtdO1xyXG4gICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IDk7IHkrKykge1xyXG4gICAgICAgIGxldCBwb3NYID0gdGhpcy5tYXJnaW5MZWZ0ICsgeCAqIChFbmdpbmUuVHJpYW5nbGUuc2l6ZSAvIDIgLSAxKTtcclxuICAgICAgICBsZXQgcG9zWSA9IHRoaXMubWFyZ2luVG9wICsgeSAqIChFbmdpbmUuVHJpYW5nbGUuc2l6ZSAtIDEpO1xyXG4gICAgICAgIGxldCBpc1JvdGF0ZWQgPSB4ICUgMiA9PT0gMTtcclxuXHJcbiAgICAgICAgaWYgKHkgJSAyID09PSAxKSB7XHJcbiAgICAgICAgICBpc1JvdGF0ZWQgPSAhaXNSb3RhdGVkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHRyaWFuZ2xlID0gbmV3IEVuZ2luZS5UcmlhbmdsZShcclxuICAgICAgICAgIHRoaXMuZ2FtZSxcclxuICAgICAgICAgIHBvc1gsXHJcbiAgICAgICAgICBwb3NZLFxyXG4gICAgICAgICAgaXNSb3RhdGVkLFxyXG4gICAgICAgICAgdGhpcy5nYW1lLnJuZC5waWNrKHRoaXMuY29sb3JTZXRzKSxcclxuICAgICAgICAgIHsgeCwgeSB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgdHJpYW5nbGUuZXZlbnRzLm9uSW5wdXRPdmVyLmFkZCh0aGlzLnNlbGVjdFRyaWFuZ2xlLCB0aGlzKTtcclxuICAgICAgICB0cmlhbmdsZS5ldmVudHMub25JbnB1dERvd24uYWRkKHRoaXMuc2VsZWN0VHJpYW5nbGUsIHRoaXMpO1xyXG4gICAgICAgIC8vIHRyaWFuZ2xlLmV2ZW50cy5vbklucHV0T3V0LmFkZCh0aGlzLnNlbGVjdFRyaWFuZ2xlLCB0aGlzKTtcclxuICAgICAgICB0cmlhbmdsZS5ldmVudHMuZGVsZXRlQ29tcGxldGUuYWRkKHRoaXMucmVjb3ZlclRyaWFuZ2xlLCB0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy50cmlhbmdsZXNNYXRyaXhbeF1beV0gPSB0cmlhbmdsZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVzdHJveSBvciB1bnNlbGVjdCB0cmlhbmdsZXNcclxuICAgKi9cclxuICBkZXN0cm95VHJpYW5nbGUoKSB7XHJcbiAgICBpZiAodGhpcy5zZWxlY3RlZFRyaWFuZ2xlcy5sZW5ndGggPCB0aGlzLm1pblRyaWFuZ2xlc0Rlc3Ryb3kpIHtcclxuICAgICAgd2hpbGUgKHRoaXMuc2VsZWN0ZWRUcmlhbmdsZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGxldCB0cmlhbmdsZSA9IHRoaXMuc2VsZWN0ZWRUcmlhbmdsZXMucG9wKCk7XHJcbiAgICAgICAgdHJpYW5nbGUudW5zZWxlY3QoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy51cGRhdGVTY29yZShNYXRoLnBvdyh0aGlzLnNlbGVjdGVkVHJpYW5nbGVzLmxlbmd0aCwgMi4xNSkgKiAxMCk7XHJcblxyXG4gICAgICB3aGlsZSAodGhpcy5zZWxlY3RlZFRyaWFuZ2xlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgbGV0IHRyaWFuZ2xlID0gdGhpcy5zZWxlY3RlZFRyaWFuZ2xlcy5wb3AoKTtcclxuICAgICAgICB0cmlhbmdsZS5kZWxldGUoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVjb3ZlclRyaWFuZ2xlKHRyaWFuZ2xlKSB7XHJcbiAgICB0cmlhbmdsZS5yZWNvdmVyKHRoaXMuZ2FtZS5ybmQucGljayh0aGlzLmNvbG9yU2V0cykpO1xyXG4gIH1cclxuXHJcbiAgc2VsZWN0VHJpYW5nbGUodHJpYW5nbGUsIHBvaW50KSB7XHJcbiAgICBpZiAoIXRoaXMuZ2FtZS5pbnB1dC5hY3RpdmVQb2ludGVyLmlzRG93bikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRUcmlhbmdsZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHRyaWFuZ2xlLnNlbGVjdCgpO1xyXG4gICAgICB0aGlzLnNlbGVjdGVkVHJpYW5nbGVzLnB1c2godHJpYW5nbGUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IGxhc3RTZWxlY3RlZFRyaWFuZ2xlID0gdGhpcy5zZWxlY3RlZFRyaWFuZ2xlc1t0aGlzLnNlbGVjdGVkVHJpYW5nbGVzLmxlbmd0aCAtIDFdO1xyXG4gICAgICBsZXQgcHJlTGFzdFNlbGVjdGVkVHJpYW5nbGUgPSB0aGlzLnNlbGVjdGVkVHJpYW5nbGVzW3RoaXMuc2VsZWN0ZWRUcmlhbmdsZXMubGVuZ3RoIC0gMl07XHJcblxyXG4gICAgICBpZiAodHJpYW5nbGUuc2VsZWN0ZWQgJiYgdHJpYW5nbGUgPT09IHByZUxhc3RTZWxlY3RlZFRyaWFuZ2xlKSB7XHJcbiAgICAgICAgbGFzdFNlbGVjdGVkVHJpYW5nbGUudW5zZWxlY3QoKTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkVHJpYW5nbGVzLnBvcCgpO1xyXG4gICAgICB9IGVsc2UgaWYgKFxyXG4gICAgICAgICF0cmlhbmdsZS5zZWxlY3RlZCAmJlxyXG4gICAgICAgIHRoaXMuY2hlY2tUcmlhbmdsZUxpbmsobGFzdFNlbGVjdGVkVHJpYW5nbGUsIHRyaWFuZ2xlKSAmJlxyXG4gICAgICAgIGxhc3RTZWxlY3RlZFRyaWFuZ2xlLmNvbG9yU2V0ID09PSB0cmlhbmdsZS5jb2xvclNldFxyXG4gICAgICApIHtcclxuICAgICAgICAgIHRyaWFuZ2xlLnNlbGVjdCgpO1xyXG4gICAgICAgICAgdGhpcy5zZWxlY3RlZFRyaWFuZ2xlcy5wdXNoKHRyaWFuZ2xlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2sgdHJpYW5nbGVzIGxpbmtcclxuICAgKi9cclxuICBjaGVja1RyaWFuZ2xlTGluayh0cjEsIHRyMikge1xyXG4gICAgaWYgKHRyMS5tYXRyaXhQb3MueSA9PT0gdHIyLm1hdHJpeFBvcy55ICkge1xyXG4gICAgICBpZiAodHIxLm1hdHJpeFBvcy54ICsgMSA9PT0gdHIyLm1hdHJpeFBvcy54IHx8XHJcbiAgICAgICAgICB0cjEubWF0cml4UG9zLnggLSAxID09PSB0cjIubWF0cml4UG9zLngpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodHIxLm1hdHJpeFBvcy54ID09PSB0cjIubWF0cml4UG9zLngpIHtcclxuICAgICAgaWYgKHRyMS5tYXRyaXhQb3MueCAlIDIgPT09IDApIHtcclxuICAgICAgICBpZiAodHIxLmlzUm90YXRlZCAmJiB0cjIubWF0cml4UG9zLnkgPT09IHRyMS5tYXRyaXhQb3MueSAgLSAxKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKCF0cjEuaXNSb3RhdGVkICYmIHRyMi5tYXRyaXhQb3MueSA9PT0gdHIxLm1hdHJpeFBvcy55ICsgMSkge1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICghdHIxLmlzUm90YXRlZCAmJiB0cjIubWF0cml4UG9zLnkgPT09IHRyMS5tYXRyaXhQb3MueSAgKyAxKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRyMS5pc1JvdGF0ZWQgJiYgdHIyLm1hdHJpeFBvcy55ID09PSB0cjEubWF0cml4UG9zLnkgLSAxKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgc2NvcmUgb24gc3RhZ2VcclxuICAgKi9cclxuICBjcmVhdGVTY29yZUxhYmxlKCkge1xyXG4gICAgY29uc3QgcmFuZG9tQ29sb3JTZXQgPSB0aGlzLmdhbWUucm5kLnBpY2sodGhpcy5jb2xvclNldHMpO1xyXG4gICAgY29uc3QgY29sb3IgPSAnI2ZmZic7IC8vICsgUGhhc2VyLkNvbG9yLmNvbXBvbmVudFRvSGV4KHJhbmRvbUNvbG9yU2V0LmdldExhc3RDb2xvcigpKTtcclxuICAgIGNvbnN0IG1hcmdpblJpZ2h0ID0gMjU7XHJcbiAgICBjb25zdCBtYXJnaW5Ub3AgPSAxNTtcclxuXHJcbiAgICBjb25zdCBzdHlsZSA9IHtcclxuICAgICAgZm9udDogJzQycHggT3BlbiBTYW5zJyxcclxuICAgICAgZm9udFN0eWxlOiAnaXRhbGljJyxcclxuICAgICAgZmlsbDogY29sb3JcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNjb3JlTGFibGUgPSBuZXcgRW5naW5lLlNjb3JlTGFibGUoXHJcbiAgICAgIHRoaXMuZ2FtZSxcclxuICAgICAgdGhpcy5nYW1lLndpZHRoIC0gbWFyZ2luUmlnaHQsXHJcbiAgICAgIG1hcmdpblRvcCxcclxuICAgICAgMCxcclxuICAgICAgc3R5bGVcclxuICAgICk7XHJcbiAgICB0aGlzLnNjb3JlTGFibGUuYW5jaG9yLnNldFRvKDEsIDApO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlU2NvcmUodmFsKSB7XHJcbiAgICB2YWwgPSBNYXRoLnJvdW5kKHZhbCk7XHJcblxyXG4gICAgdGhpcy5zY29yZSArPSB2YWw7XHJcbiAgICB0aGlzLnNjb3JlTGFibGUuY2hhbmdlVmFsdWUodGhpcy5zY29yZSk7XHJcblxyXG4gICAgY29uc29sZS5sb2codGhpcy5zY29yZSk7XHJcbiAgfVxyXG59XHJcblxyXG5FbmdpbmUuR2FtZSA9IEdhbWU7XHJcbiIsbnVsbCwiRW5naW5lLmdhbWUgPSBuZXcgUGhhc2VyLkdhbWUoRW5naW5lLm1heFdpZHRoLCBFbmdpbmUubWF4SGVpZ2h0LCBQaGFzZXIuQVVUTyk7XHJcblxyXG5FbmdpbmUuZ2FtZS5zdGF0ZS5hZGQoJ0Jvb3QnLCBFbmdpbmUuQm9vdCk7XHJcbkVuZ2luZS5nYW1lLnN0YXRlLmFkZCgnTG9hZGVyJywgRW5naW5lLkxvYWRlcik7XHJcbi8vIEVuZ2luZS5nYW1lLnN0YXRlLmFkZCgnTWVudScsIEVuZ2luZS5NZW51KTtcclxuRW5naW5lLmdhbWUuc3RhdGUuYWRkKCdHYW1lJywgRW5naW5lLkdhbWUpO1xyXG4vLyBFbmdpbmUuZ2FtZS5zdGF0ZS5hZGQoJ1Njb3JlQm9hcmQnLCBFbmdpbmUuU2NvcmVCb2FyZCk7XHJcblxyXG5FbmdpbmUuZ2FtZS5zdGF0ZS5zdGFydCgnQm9vdCcpO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
