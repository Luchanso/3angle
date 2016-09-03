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
      this.game.stage.backgroundColor = '#006064';
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
[0x9E9E9E, 0x757575, 0x616161, 0x424242],
// red
[0xF44336, 0xE53935, 0xD32F2F, 0xC62828]];

Engine.ColorSet = ColorSet;
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
       * Margin of triangles matrix
       * @type {Number}
       */
      this.margin = 64;

      /**
       * Minimal triangles destroy length
       * @type {Number}
       */
      this.minTrianglesDestroy = 3;

      this.trianglesMatrix = [];
      this.selectedTriangles = [];
    }
  }, {
    key: 'create',
    value: function create() {
      this.game.stage.backgroundColor = '#000';

      this.createGradations();

      this.sketch();
      this.initEvents();
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
          var posX = this.margin + x * (Engine.Triangle.size / 2 - 1);
          var posY = this.margin + y * (Engine.Triangle.size - 1);
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
        } else if (!triangle.selected && this.checkTriangleLink(lastSelectedTriangle, triangle)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS5qcyIsImJvb3QuanMiLCJsb2FkZXIuanMiLCJtZW51LmpzIiwiY29sb3JzZXQuanMiLCJ0cmlhbmdsZS5qcyIsImdhbWUuanMiLCJzY29yZWJvYXJkLmpzIiwiYXBwLmpzIl0sIm5hbWVzIjpbIkVuZ2luZSIsIm1pbldpZHRoIiwibWluSGVpZ2h0IiwibWF4V2lkdGgiLCJtYXhIZWlnaHQiLCJrZXlzIiwidHJpYW5nbGUiLCJCb290Iiwic2NhbGUiLCJwYWdlQWxpZ25Ib3Jpem9udGFsbHkiLCJwYWdlQWxpZ25WZXJ0aWNhbGx5IiwiZ2FtZSIsInN0YWdlIiwiYmFja2dyb3VuZENvbG9yIiwic3RhdGUiLCJzdGFydCIsIlBoYXNlciIsIlN0YXRlIiwiTG9hZGVyIiwiYWRkUHJvZ3Jlc3NMYWJsZSIsImxvYWQiLCJvbkZpbGVDb21wbGV0ZSIsImFkZCIsInJlZnJlc2hQcm9ncmVzcyIsImdlbmVyYXRlVHJpYW5nbGUiLCJudW1iZXJPZkdyYWRhdGlvbiIsInN0eWxlIiwiZm9udCIsImZpbGwiLCJwcm9ncmVzc0xhYmxlIiwidGV4dCIsIndvcmxkIiwiY2VudGVyWCIsImNlbnRlclkiLCJhbmNob3IiLCJzZXRUbyIsInByb2dyZXNzIiwiY2FjaGVLZXkiLCJzdWNjZXNzIiwidG90YWxMb2FkZWQiLCJ0b3RhbEZpbGVzIiwic2l6ZSIsImJpdG1hcCIsIkJpdG1hcERhdGEiLCJjdHgiLCJiZWdpblBhdGgiLCJmaWxsU3R5bGUiLCJtb3ZlVG8iLCJsaW5lVG8iLCJjYWNoZSIsImFkZEJpdG1hcERhdGEiLCJDb2xvclNldCIsImdyYWRpdGlvbiIsInJuZCIsInBpY2siLCJHUkFEQVRJT05TIiwiVHJpYW5nbGUiLCJ4IiwieSIsImlzUm90YXRlZCIsImNvbG9yU2V0IiwibWF0cml4UG9zaXRpb24iLCJnZXRCaXRtYXBEYXRhIiwid2lkdGgiLCJoZWlnaHQiLCJ0aW50IiwiZ2V0UmFuZG9tQ29sb3IiLCJtYXRyaXhQb3MiLCJpbnB1dEVuYWJsZWQiLCJpbnB1dCIsInBpeGVsUGVyZmVjdE92ZXIiLCJwaXhlbFBlcmZlY3RDbGljayIsImV2ZW50cyIsImRlbGV0ZUNvbXBsZXRlIiwiU2lnbmFsIiwic2VsZWN0ZWQiLCJyb3RhdGlvbiIsIk1hdGgiLCJQSSIsImV4aXN0aW5nIiwiVGV4dCIsImFkZENoaWxkIiwidHdlZW4iLCJ0byIsImFuaW1hdGlvblRpbWUiLCJ0d2VlbnMiLCJyZW1vdmUiLCJhY3RpdmVQb2ludGVyIiwiaXNEb3duIiwiYWxwaGEiLCJvbkNvbXBsZXRlIiwiZGlzcGF0Y2giLCJFYXNpbmciLCJCb3VuY2UiLCJPdXQiLCJTcHJpdGUiLCJHYW1lIiwiY29sb3JTZXRzIiwibWFyZ2luIiwibWluVHJpYW5nbGVzRGVzdHJveSIsInRyaWFuZ2xlc01hdHJpeCIsInNlbGVjdGVkVHJpYW5nbGVzIiwiY3JlYXRlR3JhZGF0aW9ucyIsInNrZXRjaCIsImluaXRFdmVudHMiLCJhbGxHcmFkYXRpb24iLCJBcnJheVV0aWxzIiwic2h1ZmZsZSIsImkiLCJwdXNoIiwib25VcCIsImRlc3Ryb3lUcmlhbmdsZSIsInBvc1giLCJwb3NZIiwib25JbnB1dE92ZXIiLCJzZWxlY3RUcmlhbmdsZSIsIm9uSW5wdXREb3duIiwicmVjb3ZlclRyaWFuZ2xlIiwibGVuZ3RoIiwicG9wIiwidW5zZWxlY3QiLCJkZWxldGUiLCJyZWNvdmVyIiwicG9pbnQiLCJzZWxlY3QiLCJsYXN0U2VsZWN0ZWRUcmlhbmdsZSIsInByZUxhc3RTZWxlY3RlZFRyaWFuZ2xlIiwiY2hlY2tUcmlhbmdsZUxpbmsiLCJ0cjEiLCJ0cjIiLCJBVVRPIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFNBQVM7QUFDWEMsWUFBVSxHQURDO0FBRVhDLGFBQVcsR0FGQTtBQUdYQyxZQUFVLElBSEM7QUFJWEMsYUFBVztBQUpBLENBQWI7O0FBT0E7Ozs7QUFJQUosT0FBT0ssSUFBUCxHQUFjO0FBQ1pDLFlBQVU7QUFERSxDQUFkOzs7Ozs7Ozs7OztJQ1hNQzs7O0FBQ0osa0JBQWM7QUFBQTs7QUFB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LEdBQWxCLENBQXNCLE1BQXRCLEVBQThCdEIsT0FBT08sSUFBckM7QUFDQVAsT0FBT1csSUFBUCxDQUFZRyxLQUFaLENBQWtCUSxHQUFsQixDQUFzQixRQUF0QixFQUFnQ3RCLE9BQU9rQixNQUF2QztBQUNBO0FBQ0FsQixPQUFPVyxJQUFQLENBQVlHLEtBQVosQ0FBa0JRLEdBQWxCLENBQXNCLE1BQXRCLEVBQThCdEIsT0FBT2dHLElBQXJDO0FBQ0E7O0FBRUFoRyxPQUFPVyxJQUFQLENBQVlHLEtBQVosQ0FBa0JDLEtBQWxCLENBQXdCLE1BQXhCIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImxldCBFbmdpbmUgPSB7XHJcbiAgbWluV2lkdGg6IDY0MCxcclxuICBtaW5IZWlnaHQ6IDMyMCxcclxuICBtYXhXaWR0aDogMTAyNCxcclxuICBtYXhIZWlnaHQ6IDcyMCxcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTcHJpdGUsIEJpdG1hcCwgZXRjLi4uIGNoYWNoZSBrZXlzXHJcbiAqIEB0eXBlIHtPYmplY3R9XHJcbiAqL1xyXG5FbmdpbmUua2V5cyA9IHtcclxuICB0cmlhbmdsZTogJ3RyaWFuZ2xlJyxcclxufVxyXG4iLCJjbGFzcyBCb290IGV4dGVuZHMgUGhhc2VyLlN0YXRlIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICBwcmVsb2FkKCkge1xyXG5cclxuICB9XHJcblxyXG4gIGNyZWF0ZSgpIHtcclxuICAgIHRoaXMuc2NhbGUucGFnZUFsaWduSG9yaXpvbnRhbGx5ID0gdHJ1ZTtcclxuICAgIHRoaXMuc2NhbGUucGFnZUFsaWduVmVydGljYWxseSA9IHRydWU7XHJcbiAgICB0aGlzLmdhbWUuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gJyMwMDYwNjQnO1xyXG4gICAgdGhpcy5zdGF0ZS5zdGFydCgnTG9hZGVyJyk7XHJcbiAgfVxyXG59XHJcblxyXG5FbmdpbmUuQm9vdCA9IEJvb3Q7XHJcbiIsImNsYXNzIExvYWRlciBleHRlbmRzIFBoYXNlci5TdGF0ZSB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgcHJlbG9hZCgpIHtcclxuICAgIHRoaXMuYWRkUHJvZ3Jlc3NMYWJsZSgpO1xyXG5cclxuICAgIHRoaXMubG9hZC5vbkZpbGVDb21wbGV0ZS5hZGQodGhpcy5yZWZyZXNoUHJvZ3Jlc3MsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMuZ2VuZXJhdGVUcmlhbmdsZSgpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlKCkge1xyXG4gICAgbGV0IG51bWJlck9mR3JhZGF0aW9uID0gMztcclxuICAgIHRoaXMuc3RhdGUuc3RhcnQoJ0dhbWUnLCB0cnVlLCBmYWxzZSwgbnVtYmVyT2ZHcmFkYXRpb24pO1xyXG4gIH1cclxuXHJcbiAgYWRkUHJvZ3Jlc3NMYWJsZSgpIHtcclxuICAgIGxldCBzdHlsZSA9IHtcclxuICAgICAgZm9udDogJzQxcHggT3BlbiBTYW5zJyxcclxuICAgICAgZmlsbDogJyMwMEU2NzYnXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5wcm9ncmVzc0xhYmxlID0gdGhpcy5hZGQudGV4dCh0aGlzLmdhbWUud29ybGQuY2VudGVyWCwgdGhpcy5nYW1lLndvcmxkLmNlbnRlclksICdMb2FkaW5nOiAwJSAoMC8wKScsIHN0eWxlKTtcclxuICAgIHRoaXMucHJvZ3Jlc3NMYWJsZS5hbmNob3Iuc2V0VG8oMC41KTtcclxuICB9XHJcblxyXG4gIHJlZnJlc2hQcm9ncmVzcyhwcm9ncmVzcywgY2FjaGVLZXksIHN1Y2Nlc3MsIHRvdGFsTG9hZGVkLCB0b3RhbEZpbGVzKSB7XHJcbiAgICB0aGlzLnByb2dyZXNzTGFibGUudGV4dCA9IGBMb2FkaW5nICR7cHJvZ3Jlc3N9JSAoJHt0b3RhbExvYWRlZH0vJHt0b3RhbEZpbGVzfSlgO1xyXG4gIH1cclxuXHJcbiAgZ2VuZXJhdGVUcmlhbmdsZSgpIHtcclxuICAgIGNvbnN0IHNpemUgPSAyNTU7XHJcblxyXG4gICAgbGV0IGJpdG1hcCA9IG5ldyBQaGFzZXIuQml0bWFwRGF0YShzaXplLCBzaXplKTtcclxuXHJcbiAgICBiaXRtYXAuY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgYml0bWFwLmN0eC5maWxsU3R5bGUgPSAnd2hpdGUnO1xyXG4gICAgYml0bWFwLmN0eC5tb3ZlVG8oMCwgc2l6ZSk7XHJcbiAgICBiaXRtYXAuY3R4LmxpbmVUbyhzaXplIC8gMiwgMCk7XHJcbiAgICBiaXRtYXAuY3R4LmxpbmVUbyhzaXplLCBzaXplKTtcclxuICAgIGJpdG1hcC5jdHgubGluZVRvKDAsIHNpemUpO1xyXG4gICAgYml0bWFwLmN0eC5maWxsKCk7XHJcblxyXG4gICAgdGhpcy5nYW1lLmNhY2hlLmFkZEJpdG1hcERhdGEoRW5naW5lLmtleXMudHJpYW5nbGUsIGJpdG1hcCk7XHJcbiAgfVxyXG59XHJcblxyXG5FbmdpbmUuTG9hZGVyID0gTG9hZGVyO1xyXG4iLG51bGwsImNsYXNzIENvbG9yU2V0IHtcclxuICAvKipcclxuICAgKiBDb2xvciBTZXRcclxuICAgKiBAcGFyYW0gIHtBcnJheX0gZ3JhZGl0aW9uIEFycmF5IG9mIGNvbG9yc1xyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGdyYWRpdGlvbikge1xyXG4gICAgdGhpcy5ncmFkaXRpb24gPSBncmFkaXRpb247XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgcmFuZG9tIGNvbG9yIGZyb20gc2V0XHJcbiAgICogQHJldHVybiB7W3R5cGVdfSBbZGVzY3JpcHRpb25dXHJcbiAgICovXHJcbiAgZ2V0UmFuZG9tQ29sb3IoKSB7XHJcbiAgICByZXR1cm4gRW5naW5lLmdhbWUucm5kLnBpY2sodGhpcy5ncmFkaXRpb24pO1xyXG4gIH1cclxufVxyXG5cclxuQ29sb3JTZXQuR1JBREFUSU9OUyA9IFtcclxuICAvLyBpbmRpZ29cclxuICBbXHJcbiAgICAweDNGNTFCNSxcclxuICAgIDB4Mzk0OUFCLFxyXG4gICAgMHgzMDNGOUYsXHJcbiAgICAweDI4MzU5MyxcclxuICBdLFxyXG4gIC8vIGJsdWVcclxuICBbXHJcbiAgICAweDIxOTZGMyxcclxuICAgIDB4MUU4OEU1LFxyXG4gICAgMHgxOTc2RDIsXHJcbiAgICAweDE1NjVDMCxcclxuICBdLFxyXG4gIC8vIHllbGxvd1xyXG4gIFtcclxuICAgIDB4RkZGMTc2LFxyXG4gICAgMHhGRkVFNTgsXHJcbiAgICAweEZGRUIzQixcclxuICAgIDB4RkREODM1LFxyXG4gIF0sXHJcbiAgLy8gcGlua1xyXG4gIFtcclxuICAgIDB4RTkxRTYzLFxyXG4gICAgMHhEODFCNjAsXHJcbiAgICAweEMyMTg1QixcclxuICAgIDB4QUQxNDU3LFxyXG4gIF0sXHJcbiAgLy8gYnJvd25cclxuICBbXHJcbiAgICAweDc5NTU0OCxcclxuICAgIDB4NkQ0QzQxLFxyXG4gICAgMHg1RDQwMzcsXHJcbiAgICAweDRFMzQyRSxcclxuICBdLFxyXG4gIC8vIC8vIGRlZXBvcmFuZ2VcclxuICAvLyBbXHJcbiAgLy8gICAweEZGNTcyMixcclxuICAvLyAgIDB4RjQ1MTFFLFxyXG4gIC8vICAgMHhFNjRBMTksXHJcbiAgLy8gICAweEQ4NDMxNSxcclxuICAvLyBdLFxyXG4gIC8vIGdyZXlcclxuICBbXHJcbiAgICAweDlFOUU5RSxcclxuICAgIDB4NzU3NTc1LFxyXG4gICAgMHg2MTYxNjEsXHJcbiAgICAweDQyNDI0MixcclxuICBdLFxyXG4gIC8vIHJlZFxyXG4gIFtcclxuICAgIDB4RjQ0MzM2LFxyXG4gICAgMHhFNTM5MzUsXHJcbiAgICAweEQzMkYyRixcclxuICAgIDB4QzYyODI4LFxyXG4gIF0sXHJcbl07XHJcblxyXG5FbmdpbmUuQ29sb3JTZXQgPSBDb2xvclNldDtcclxuIiwiY2xhc3MgVHJpYW5nbGUgZXh0ZW5kcyBQaGFzZXIuU3ByaXRlIHtcclxuXHJcbiAgLyoqXHJcbiAgICogSXQncyBhIHRyaWFuZ2xlLCB5YXNoIGl0J3Mgbm90IGEgam9rZVxyXG4gICAqIEBwYXJhbSAge1BoYXNlci5HYW1lfSAgZ2FtZSAgICAgIFtkZXNjcmlwdGlvbl1cclxuICAgKiBAcGFyYW0gIHtbdHlwZV19ICB4ICAgICAgICAgW2Rlc2NyaXB0aW9uXVxyXG4gICAqIEBwYXJhbSAge1t0eXBlXX0gIHkgICAgICAgICBbZGVzY3JpcHRpb25dXHJcbiAgICogQHBhcmFtICB7Qm9vbGVhbn0gaXNSb3RhdGVkIFtkZXNjcmlwdGlvbl1cclxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9ICBjb2xvciAgICAgW2Rlc2NyaXB0aW9uXVxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIGlzUm90YXRlZCwgY29sb3JTZXQsIG1hdHJpeFBvc2l0aW9uKSB7XHJcbiAgICBzdXBlcihnYW1lLCB4LCB5LCBFbmdpbmUuZ2FtZS5jYWNoZS5nZXRCaXRtYXBEYXRhKEVuZ2luZS5rZXlzLnRyaWFuZ2xlKSk7XHJcblxyXG4gICAgdGhpcy53aWR0aCA9IFRyaWFuZ2xlLnNpemU7XHJcbiAgICB0aGlzLmhlaWdodCA9IFRyaWFuZ2xlLnNpemU7XHJcbiAgICB0aGlzLmFuY2hvci5zZXRUbygwLjUpO1xyXG4gICAgdGhpcy5jb2xvclNldCA9IGNvbG9yU2V0O1xyXG4gICAgdGhpcy50aW50ID0gdGhpcy5jb2xvclNldC5nZXRSYW5kb21Db2xvcigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUG9pdGlvbiBpbiB0aGUgbWF0cml4IG9mIHRyaWFuZ2xlc1xyXG4gICAgICogQHR5cGUge1t0eXBlXX1cclxuICAgICAqL1xyXG4gICAgdGhpcy5tYXRyaXhQb3MgPSBtYXRyaXhQb3NpdGlvbjtcclxuXHJcbiAgICB0aGlzLmlucHV0RW5hYmxlZCA9IHRydWU7XHJcbiAgICB0aGlzLmlucHV0LnBpeGVsUGVyZmVjdE92ZXIgPSB0cnVlO1xyXG4gICAgdGhpcy5pbnB1dC5waXhlbFBlcmZlY3RDbGljayA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5ldmVudHMuZGVsZXRlQ29tcGxldGUgPSBuZXcgUGhhc2VyLlNpZ25hbCgpO1xyXG5cclxuICAgIHRoaXMuc2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuaXNSb3RhdGVkID0gaXNSb3RhdGVkO1xyXG5cclxuICAgIGlmIChpc1JvdGF0ZWQpIHtcclxuICAgICAgdGhpcy5yb3RhdGlvbiA9IE1hdGguUEk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdGhpcy5hZGRUZXh0UG9zaXRpb24oKTtcclxuXHJcbiAgICB0aGlzLmdhbWUuYWRkLmV4aXN0aW5nKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgYWRkVGV4dFBvc2l0aW9uKCkge1xyXG4gICAgbGV0IHRleHQgPSBuZXcgUGhhc2VyLlRleHQoXHJcbiAgICAgIHRoaXMuZ2FtZSxcclxuICAgICAgVHJpYW5nbGUuc2l6ZSAvIDIsXHJcbiAgICAgIFRyaWFuZ2xlLnNpemUgLyAyLFxyXG4gICAgICBgJHt0aGlzLm1hdHJpeFBvcy54fToke3RoaXMubWF0cml4UG9zLnl9YCxcclxuICAgICAge1xyXG4gICAgICAgIGZvbnQ6ICc2NHB4IE9wZW4gU2FucycsXHJcbiAgICAgICAgZmlsbDogJ2JsYWNrJ1xyXG4gICAgICB9XHJcbiAgICApXHJcblxyXG4gICAgaWYgKHRoaXMuaXNSb3RhdGVkKSB7XHJcbiAgICAgIHRleHQucm90YXRpb24gKz0gTWF0aC5QSTtcclxuICAgICAgdGV4dC55ID0gK3RleHQuaGVpZ2h0O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGV4dC54ID0gLXRleHQud2lkdGggLyAyO1xyXG4gICAgICB0ZXh0LnkgPSAtdGV4dC5oZWlnaHQgLyA0O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYWRkQ2hpbGQodGV4dCk7XHJcbiAgfVxyXG5cclxuICBzZWxlY3QoKSB7XHJcbiAgICBpZiAoIXRoaXMuc2VsZWN0ZWQpIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZCA9IHRydWU7XHJcblxyXG4gICAgICB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMpXHJcbiAgICAgICAgLnRvKHtcclxuICAgICAgICAgIHdpZHRoOiBUcmlhbmdsZS5zaXplIC8gMS41LFxyXG4gICAgICAgICAgaGVpZ2h0OiBUcmlhbmdsZS5zaXplIC8gMS41XHJcbiAgICAgICAgfSwgVHJpYW5nbGUuYW5pbWF0aW9uVGltZSlcclxuICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgfVxyXG4gIH1cclxuXHJcbiAgdW5zZWxlY3QoKSB7XHJcbiAgICBpZiAodGhpcy5zZWxlY3RlZCkge1xyXG5cclxuICAgICAgdGhpcy5nYW1lLnR3ZWVucy5yZW1vdmUodGhpcyk7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgIHRoaXMuZ2FtZS5hZGQudHdlZW4odGhpcylcclxuICAgICAgICAudG8oe1xyXG4gICAgICAgICAgd2lkdGg6IFRyaWFuZ2xlLnNpemUsXHJcbiAgICAgICAgICBoZWlnaHQ6IFRyaWFuZ2xlLnNpemVcclxuICAgICAgICB9LCBUcmlhbmdsZS5hbmltYXRpb25UaW1lKVxyXG4gICAgICAgIC5zdGFydCgpO1xyXG4gICAgICB9XHJcbiAgfVxyXG5cclxuICBkZWxldGUoKSB7XHJcbiAgICBpZiAodGhpcy5nYW1lLmlucHV0LmFjdGl2ZVBvaW50ZXIuaXNEb3duKSB7XHJcbiAgICAgIHRoaXMuZ2FtZS5hZGQudHdlZW4odGhpcylcclxuICAgICAgICAudG8oe1xyXG4gICAgICAgICAgd2lkdGg6IDAsXHJcbiAgICAgICAgICBoZWlnaHQ6IDAsXHJcbiAgICAgICAgICBhbHBoYTogMFxyXG4gICAgICAgIH0sIFRyaWFuZ2xlLmFuaW1hdGlvblRpbWUpXHJcbiAgICAgICAgLnN0YXJ0KClcclxuICAgICAgICAub25Db21wbGV0ZVxyXG4gICAgICAgIC5hZGQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5ldmVudHMuZGVsZXRlQ29tcGxldGUuZGlzcGF0Y2godGhpcyk7XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZWNvdmVyKGNvbG9yU2V0KSB7XHJcbiAgICB0aGlzLmNvbG9yU2V0ID0gY29sb3JTZXQ7XHJcbiAgICB0aGlzLnRpbnQgPSB0aGlzLmNvbG9yU2V0LmdldFJhbmRvbUNvbG9yKCk7XHJcbiAgICB0aGlzLndpZHRoID0gVHJpYW5nbGUuc2l6ZTtcclxuICAgIHRoaXMuaGVpZ2h0ID0gVHJpYW5nbGUuc2l6ZTtcclxuICAgIHRoaXMuc2VsZWN0ZWQgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMpXHJcbiAgICAgIC50byh7XHJcbiAgICAgICAgYWxwaGE6IDFcclxuICAgICAgfSwgMTAwMCwgUGhhc2VyLkVhc2luZy5Cb3VuY2UuT3V0KVxyXG4gICAgICAuc3RhcnQoKTtcclxuICB9XHJcbn1cclxuXHJcblRyaWFuZ2xlLnNpemUgPSA3MTtcclxuVHJpYW5nbGUuYW5pbWF0aW9uVGltZSA9IDIwMDtcclxuRW5naW5lLlRyaWFuZ2xlID0gVHJpYW5nbGU7XHJcbiIsImNsYXNzIEdhbWUgZXh0ZW5kcyBQaGFzZXIuU3RhdGUge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIGluaXQobnVtYmVyT2ZHcmFkYXRpb24pIHtcclxuICAgIHRoaXMuY29sb3JTZXRzID0gW107XHJcbiAgICAvKipcclxuICAgICAqIE51bWJlciBvZiBjb2xvclNldHMgd2lsbCB1c2UgaW4gdGhpcyBnYW1lIGxldmVsXHJcbiAgICAgKiBAdHlwZSB7W3R5cGVdfVxyXG4gICAgICovXHJcbiAgICB0aGlzLm51bWJlck9mR3JhZGF0aW9uID0gbnVtYmVyT2ZHcmFkYXRpb247XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYXJnaW4gb2YgdHJpYW5nbGVzIG1hdHJpeFxyXG4gICAgICogQHR5cGUge051bWJlcn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5tYXJnaW4gPSA2NDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1pbmltYWwgdHJpYW5nbGVzIGRlc3Ryb3kgbGVuZ3RoXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICB0aGlzLm1pblRyaWFuZ2xlc0Rlc3Ryb3kgPSAzO1xyXG5cclxuICAgIHRoaXMudHJpYW5nbGVzTWF0cml4ID0gW107XHJcbiAgICB0aGlzLnNlbGVjdGVkVHJpYW5nbGVzID0gW107XHJcbiAgfVxyXG5cclxuICBjcmVhdGUoKSB7XHJcbiAgICB0aGlzLmdhbWUuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gJyMwMDAnO1xyXG5cclxuICAgIHRoaXMuY3JlYXRlR3JhZGF0aW9ucygpO1xyXG5cclxuICAgIHRoaXMuc2tldGNoKCk7XHJcbiAgICB0aGlzLmluaXRFdmVudHMoKTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIC8vIHRoaXMuZ2FtZS5kZWJ1Zy5pbnB1dEluZm8oNTAsIDUwLCAncmdiKDI1NSwgMjU1LCAyNTUpJyk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVHcmFkYXRpb25zKCkge1xyXG4gICAgbGV0IGFsbEdyYWRhdGlvbiA9IFBoYXNlci5BcnJheVV0aWxzLnNodWZmbGUoQ29sb3JTZXQuR1JBREFUSU9OUyk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm51bWJlck9mR3JhZGF0aW9uOyBpKyspIHtcclxuICAgICAgbGV0IGNvbG9yU2V0ID0gbmV3IENvbG9yU2V0KGFsbEdyYWRhdGlvbltpXSk7XHJcbiAgICAgIHRoaXMuY29sb3JTZXRzLnB1c2goY29sb3JTZXQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdGlhbGl6YXRpb24gZXZlbnQgaW4gdGhlIGdhbWVcclxuICAgKi9cclxuICBpbml0RXZlbnRzKCkge1xyXG4gICAgdGhpcy5nYW1lLmlucHV0Lm9uVXAuYWRkKHRoaXMuZGVzdHJveVRyaWFuZ2xlLCB0aGlzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSB0cmlhbmdsZXMgb24gY2FudmFzXHJcbiAgICovXHJcbiAgc2tldGNoKCkge1xyXG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCAyNzsgeCsrKSB7XHJcbiAgICAgIHRoaXMudHJpYW5nbGVzTWF0cml4W3hdID0gW107XHJcbiAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgOTsgeSsrKSB7XHJcbiAgICAgICAgbGV0IHBvc1ggPSB0aGlzLm1hcmdpbiArIHggKiAoRW5naW5lLlRyaWFuZ2xlLnNpemUgLyAyIC0gMSk7XHJcbiAgICAgICAgbGV0IHBvc1kgPSB0aGlzLm1hcmdpbiArIHkgKiAoRW5naW5lLlRyaWFuZ2xlLnNpemUgLSAxKTtcclxuICAgICAgICBsZXQgaXNSb3RhdGVkID0geCAlIDIgPT09IDE7XHJcblxyXG4gICAgICAgIGlmICh5ICUgMiA9PT0gMSkge1xyXG4gICAgICAgICAgaXNSb3RhdGVkID0gIWlzUm90YXRlZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0cmlhbmdsZSA9IG5ldyBFbmdpbmUuVHJpYW5nbGUoXHJcbiAgICAgICAgICB0aGlzLmdhbWUsXHJcbiAgICAgICAgICBwb3NYLFxyXG4gICAgICAgICAgcG9zWSxcclxuICAgICAgICAgIGlzUm90YXRlZCxcclxuICAgICAgICAgIHRoaXMuZ2FtZS5ybmQucGljayh0aGlzLmNvbG9yU2V0cyksXHJcbiAgICAgICAgICB7IHgsIHkgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHRyaWFuZ2xlLmV2ZW50cy5vbklucHV0T3Zlci5hZGQodGhpcy5zZWxlY3RUcmlhbmdsZSwgdGhpcyk7XHJcbiAgICAgICAgdHJpYW5nbGUuZXZlbnRzLm9uSW5wdXREb3duLmFkZCh0aGlzLnNlbGVjdFRyaWFuZ2xlLCB0aGlzKTtcclxuICAgICAgICAvLyB0cmlhbmdsZS5ldmVudHMub25JbnB1dE91dC5hZGQodGhpcy5zZWxlY3RUcmlhbmdsZSwgdGhpcyk7XHJcbiAgICAgICAgdHJpYW5nbGUuZXZlbnRzLmRlbGV0ZUNvbXBsZXRlLmFkZCh0aGlzLnJlY292ZXJUcmlhbmdsZSwgdGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMudHJpYW5nbGVzTWF0cml4W3hdW3ldID0gdHJpYW5nbGU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlc3Ryb3kgb3IgdW5zZWxlY3QgdHJpYW5nbGVzXHJcbiAgICovXHJcbiAgZGVzdHJveVRyaWFuZ2xlKCkge1xyXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRUcmlhbmdsZXMubGVuZ3RoIDwgdGhpcy5taW5UcmlhbmdsZXNEZXN0cm95KSB7XHJcbiAgICAgIHdoaWxlICh0aGlzLnNlbGVjdGVkVHJpYW5nbGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBsZXQgdHJpYW5nbGUgPSB0aGlzLnNlbGVjdGVkVHJpYW5nbGVzLnBvcCgpO1xyXG4gICAgICAgIHRyaWFuZ2xlLnVuc2VsZWN0KCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHdoaWxlICh0aGlzLnNlbGVjdGVkVHJpYW5nbGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBsZXQgdHJpYW5nbGUgPSB0aGlzLnNlbGVjdGVkVHJpYW5nbGVzLnBvcCgpO1xyXG4gICAgICAgIHRyaWFuZ2xlLmRlbGV0ZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZWNvdmVyVHJpYW5nbGUodHJpYW5nbGUpIHtcclxuICAgIHRyaWFuZ2xlLnJlY292ZXIodGhpcy5nYW1lLnJuZC5waWNrKHRoaXMuY29sb3JTZXRzKSk7XHJcbiAgfVxyXG5cclxuICBzZWxlY3RUcmlhbmdsZSh0cmlhbmdsZSwgcG9pbnQpIHtcclxuICAgIGlmICghdGhpcy5nYW1lLmlucHV0LmFjdGl2ZVBvaW50ZXIuaXNEb3duKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5zZWxlY3RlZFRyaWFuZ2xlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgdHJpYW5nbGUuc2VsZWN0KCk7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRUcmlhbmdsZXMucHVzaCh0cmlhbmdsZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsZXQgbGFzdFNlbGVjdGVkVHJpYW5nbGUgPSB0aGlzLnNlbGVjdGVkVHJpYW5nbGVzW3RoaXMuc2VsZWN0ZWRUcmlhbmdsZXMubGVuZ3RoIC0gMV07XHJcbiAgICAgIGxldCBwcmVMYXN0U2VsZWN0ZWRUcmlhbmdsZSA9IHRoaXMuc2VsZWN0ZWRUcmlhbmdsZXNbdGhpcy5zZWxlY3RlZFRyaWFuZ2xlcy5sZW5ndGggLSAyXTtcclxuXHJcbiAgICAgIGlmICh0cmlhbmdsZS5zZWxlY3RlZCAmJiB0cmlhbmdsZSA9PT0gcHJlTGFzdFNlbGVjdGVkVHJpYW5nbGUpIHtcclxuICAgICAgICBsYXN0U2VsZWN0ZWRUcmlhbmdsZS51bnNlbGVjdCgpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUcmlhbmdsZXMucG9wKCk7XHJcbiAgICAgIH0gZWxzZSBpZiAoIXRyaWFuZ2xlLnNlbGVjdGVkICYmIHRoaXMuY2hlY2tUcmlhbmdsZUxpbmsobGFzdFNlbGVjdGVkVHJpYW5nbGUsIHRyaWFuZ2xlKSkge1xyXG4gICAgICAgICAgdHJpYW5nbGUuc2VsZWN0KCk7XHJcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkVHJpYW5nbGVzLnB1c2godHJpYW5nbGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVjayB0cmlhbmdsZXMgbGlua1xyXG4gICAqL1xyXG4gIGNoZWNrVHJpYW5nbGVMaW5rKHRyMSwgdHIyKSB7XHJcbiAgICBpZiAodHIxLm1hdHJpeFBvcy55ID09PSB0cjIubWF0cml4UG9zLnkgKSB7XHJcbiAgICAgIGlmICh0cjEubWF0cml4UG9zLnggKyAxID09PSB0cjIubWF0cml4UG9zLnggfHxcclxuICAgICAgICAgIHRyMS5tYXRyaXhQb3MueCAtIDEgPT09IHRyMi5tYXRyaXhQb3MueCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0cjEubWF0cml4UG9zLnggPT09IHRyMi5tYXRyaXhQb3MueCkge1xyXG4gICAgICBpZiAodHIxLm1hdHJpeFBvcy54ICUgMiA9PT0gMCkge1xyXG4gICAgICAgIGlmICh0cjEuaXNSb3RhdGVkICYmIHRyMi5tYXRyaXhQb3MueSA9PT0gdHIxLm1hdHJpeFBvcy55ICAtIDEpIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIXRyMS5pc1JvdGF0ZWQgJiYgdHIyLm1hdHJpeFBvcy55ID09PSB0cjEubWF0cml4UG9zLnkgKyAxKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKCF0cjEuaXNSb3RhdGVkICYmIHRyMi5tYXRyaXhQb3MueSA9PT0gdHIxLm1hdHJpeFBvcy55ICArIDEpIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHIxLmlzUm90YXRlZCAmJiB0cjIubWF0cml4UG9zLnkgPT09IHRyMS5tYXRyaXhQb3MueSAtIDEpIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbn1cclxuXHJcbkVuZ2luZS5HYW1lID0gR2FtZTtcclxuIixudWxsLCJFbmdpbmUuZ2FtZSA9IG5ldyBQaGFzZXIuR2FtZShFbmdpbmUubWF4V2lkdGgsIEVuZ2luZS5tYXhIZWlnaHQsIFBoYXNlci5BVVRPKTtcclxuXHJcbkVuZ2luZS5nYW1lLnN0YXRlLmFkZCgnQm9vdCcsIEVuZ2luZS5Cb290KTtcclxuRW5naW5lLmdhbWUuc3RhdGUuYWRkKCdMb2FkZXInLCBFbmdpbmUuTG9hZGVyKTtcclxuLy8gRW5naW5lLmdhbWUuc3RhdGUuYWRkKCdNZW51JywgRW5naW5lLk1lbnUpO1xyXG5FbmdpbmUuZ2FtZS5zdGF0ZS5hZGQoJ0dhbWUnLCBFbmdpbmUuR2FtZSk7XHJcbi8vIEVuZ2luZS5nYW1lLnN0YXRlLmFkZCgnU2NvcmVCb2FyZCcsIEVuZ2luZS5TY29yZUJvYXJkKTtcclxuXHJcbkVuZ2luZS5nYW1lLnN0YXRlLnN0YXJ0KCdCb290Jyk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
