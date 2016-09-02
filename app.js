'use strict';

var Engine = {
  minWidth: 640,
  minHeight: 320,
  maxWidth: 825,
  maxHeight: 580
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
// deeporange
[0xFF5722, 0xF4511E, 0xE64A19, 0xD84315],
// grey
[0x9E9E9E, 0x757575, 0x616161, 0x424242],
// red
[0xF44336, 0xE53935, 0xD32F2F, 0xC62828]];

Engine.ColorSet = ColorSet;
"use strict";

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
  function Triangle(game, x, y, isRotated, colorSet) {
    _classCallCheck(this, Triangle);

    var _this = _possibleConstructorReturn(this, (Triangle.__proto__ || Object.getPrototypeOf(Triangle)).call(this, game, x, y, Engine.game.cache.getBitmapData(Engine.keys.triangle)));

    _this.width = Triangle.size;
    _this.height = Triangle.size;
    _this.anchor.setTo(0.5);
    _this.colorSet = colorSet;
    _this.tint = _this.colorSet.getRandomColor();

    _this.inputEnabled = true;
    _this.input.pixelPerfectOver = true;
    _this.input.pixelPerfectClick = true;
    _this.events.onInputOver.add(_this.delete, _this);
    _this.events.onInputDown.add(_this.delete, _this);

    _this.events.triangleDelete = new Phaser.Signal();

    if (isRotated) {
      _this.rotation = Math.PI;
    }

    _this.game.add.existing(_this);
    return _this;
  }

  _createClass(Triangle, [{
    key: "delete",
    value: function _delete() {
      var _this2 = this;

      if (this.game.input.activePointer.isDown) {
        this.game.add.tween(this).to({
          alpha: 0
        }).start().onComplete.add(function () {
          _this2.events.triangleDelete.dispatch(_this2);
        }, this);
      }
    }
  }, {
    key: "recover",
    value: function recover(colorSet) {
      this.colorSet = colorSet;
      this.tint = this.colorSet.getRandomColor();

      this.game.add.tween(this).to({
        alpha: 1
      }, 1000, Phaser.Easing.Bounce.Out).start();
    }
  }]);

  return Triangle;
}(Phaser.Sprite);

Triangle.size = 65;
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
      this.margin = 32;

      this.trianglesMatrix = [];
    }
  }, {
    key: 'create',
    value: function create() {
      this.game.stage.backgroundColor = '#000';

      this.createGradations();

      this.sketch();
    }
  }, {
    key: 'render',
    value: function render() {
      // this.game.debug.inputInfo(50, 50, 'rgb(255, 255, 255)');
      // this.game.debug.geom(new Phaser.Line(this.game.world.centerX, 0, this.game.world.centerX, this.game.height), '#90CAF9');
      // this.game.debug.geom(new Phaser.Line(0, this.game.world.centerY, this.game.width, this.game.world.centerY), '#90CAF9');
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
     * Create triangles on canvas
     */

  }, {
    key: 'sketch',
    value: function sketch() {
      for (var x = 0; x < 25; x++) {
        this.trianglesMatrix[x] = [];
        for (var y = 0; y < 9; y++) {
          var posX = this.margin + x * (Engine.Triangle.size / 2 - 1);
          var posY = this.margin + y * (Engine.Triangle.size - 1);
          var isRotated = x % 2 === 1;

          if (y % 2 === 1) {
            isRotated = !isRotated;
          }

          var triangle = new Engine.Triangle(this.game, posX, posY, isRotated, this.game.rnd.pick(this.colorSets));

          triangle.events.triangleDelete.add(this.recoverTriangle, this);

          this.trianglesMatrix[x][y] = triangle;
        }
      }
    }
  }, {
    key: 'recoverTriangle',
    value: function recoverTriangle(triangle) {
      triangle.recover(this.game.rnd.pick(this.colorSets));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS5qcyIsImJvb3QuanMiLCJsb2FkZXIuanMiLCJtZW51LmpzIiwiY29sb3JzZXQuanMiLCJ0cmlhbmdsZS5qcyIsImdhbWUuanMiLCJzY29yZWJvYXJkLmpzIiwiYXBwLmpzIl0sIm5hbWVzIjpbIkVuZ2luZSIsIm1pbldpZHRoIiwibWluSGVpZ2h0IiwibWF4V2lkdGgiLCJtYXhIZWlnaHQiLCJrZXlzIiwidHJpYW5nbGUiLCJCb290Iiwic2NhbGUiLCJwYWdlQWxpZ25Ib3Jpem9udGFsbHkiLCJwYWdlQWxpZ25WZXJ0aWNhbGx5IiwiZ2FtZSIsInN0YWdlIiwiYmFja2dyb3VuZENvbG9yIiwic3RhdGUiLCJzdGFydCIsIlBoYXNlciIsIlN0YXRlIiwiTG9hZGVyIiwiYWRkUHJvZ3Jlc3NMYWJsZSIsImxvYWQiLCJvbkZpbGVDb21wbGV0ZSIsImFkZCIsInJlZnJlc2hQcm9ncmVzcyIsImdlbmVyYXRlVHJpYW5nbGUiLCJudW1iZXJPZkdyYWRhdGlvbiIsInN0eWxlIiwiZm9udCIsImZpbGwiLCJwcm9ncmVzc0xhYmxlIiwidGV4dCIsIndvcmxkIiwiY2VudGVyWCIsImNlbnRlclkiLCJhbmNob3IiLCJzZXRUbyIsInByb2dyZXNzIiwiY2FjaGVLZXkiLCJzdWNjZXNzIiwidG90YWxMb2FkZWQiLCJ0b3RhbEZpbGVzIiwic2l6ZSIsImJpdG1hcCIsIkJpdG1hcERhdGEiLCJjdHgiLCJiZWdpblBhdGgiLCJmaWxsU3R5bGUiLCJtb3ZlVG8iLCJsaW5lVG8iLCJjYWNoZSIsImFkZEJpdG1hcERhdGEiLCJDb2xvclNldCIsImdyYWRpdGlvbiIsInJuZCIsInBpY2siLCJHUkFEQVRJT05TIiwiVHJpYW5nbGUiLCJ4IiwieSIsImlzUm90YXRlZCIsImNvbG9yU2V0IiwiZ2V0Qml0bWFwRGF0YSIsIndpZHRoIiwiaGVpZ2h0IiwidGludCIsImdldFJhbmRvbUNvbG9yIiwiaW5wdXRFbmFibGVkIiwiaW5wdXQiLCJwaXhlbFBlcmZlY3RPdmVyIiwicGl4ZWxQZXJmZWN0Q2xpY2siLCJldmVudHMiLCJvbklucHV0T3ZlciIsImRlbGV0ZSIsIm9uSW5wdXREb3duIiwidHJpYW5nbGVEZWxldGUiLCJTaWduYWwiLCJyb3RhdGlvbiIsIk1hdGgiLCJQSSIsImV4aXN0aW5nIiwiYWN0aXZlUG9pbnRlciIsImlzRG93biIsInR3ZWVuIiwidG8iLCJhbHBoYSIsIm9uQ29tcGxldGUiLCJkaXNwYXRjaCIsIkVhc2luZyIsIkJvdW5jZSIsIk91dCIsIlNwcml0ZSIsIkdhbWUiLCJjb2xvclNldHMiLCJtYXJnaW4iLCJ0cmlhbmdsZXNNYXRyaXgiLCJjcmVhdGVHcmFkYXRpb25zIiwic2tldGNoIiwiYWxsR3JhZGF0aW9uIiwiQXJyYXlVdGlscyIsInNodWZmbGUiLCJpIiwicHVzaCIsInBvc1giLCJwb3NZIiwicmVjb3ZlclRyaWFuZ2xlIiwicmVjb3ZlciIsIkFVVE8iXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsU0FBUztBQUNYQyxZQUFVLEdBREM7QUFFWEMsYUFBVyxHQUZBO0FBR1hDLFlBQVUsR0FIQztBQUlYQyxhQUFXO0FBSkEsQ0FBYjs7QUFPQTs7OztBQUlBSixPQUFPSyxJQUFQLEdBQWM7QUFDWkMsWUFBVTtBQURFLENBQWQ7Ozs7Ozs7Ozs7O0lDWE1DOzs7QUFDSixrQkFBYztBQUFBOztBQUFBO0FBRWI7Ozs7OEJBRVMsQ0FFVDs7OzZCQUVRO0FBQ1AsV0FBS0MsS0FBTCxDQUFXQyxxQkFBWCxHQUFtQyxJQUFuQztBQUNBLFdBQUtELEtBQUwsQ0FBV0UsbUJBQVgsR0FBaUMsSUFBakM7QUFDQSxXQUFLQyxJQUFMLENBQVVDLEtBQVYsQ0FBZ0JDLGVBQWhCLEdBQWtDLFNBQWxDO0FBQ0EsV0FBS0MsS0FBTCxDQUFXQyxLQUFYLENBQWlCLFFBQWpCO0FBQ0Q7Ozs7RUFkZ0JDLE9BQU9DOztBQWlCMUJqQixPQUFPTyxJQUFQLEdBQWNBLElBQWQ7Ozs7Ozs7Ozs7O0lDakJNVzs7O0FBQ0osb0JBQWM7QUFBQTs7QUFBQTtBQUViOzs7OzhCQUVTO0FBQ1Is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RUFHYkMsSUFIYSxFQUliNUMsU0FKYSxFQUtiLEtBQUtoRCxJQUFMLENBQVUwQyxHQUFWLENBQWNDLElBQWQsQ0FBbUIsS0FBS3NDLFNBQXhCLENBTGEsQ0FBZjs7QUFRQXRGLG1CQUFTZ0UsTUFBVCxDQUFnQkksY0FBaEIsQ0FBK0JwRCxHQUEvQixDQUFtQyxLQUFLa0YsZUFBeEMsRUFBeUQsSUFBekQ7O0FBRUEsZUFBS1YsZUFBTCxDQUFxQnJDLENBQXJCLEVBQXdCQyxDQUF4QixJQUE2QnBELFFBQTdCO0FBQ0Q7QUFDRjtBQUNGOzs7b0NBRWVBLFVBQVU7QUFDeEJBLGVBQVNtRyxPQUFULENBQWlCLEtBQUs5RixJQUFMLENBQVUwQyxHQUFWLENBQWNDLElBQWQsQ0FBbUIsS0FBS3NDLFNBQXhCLENBQWpCO0FBQ0Q7Ozs7RUE3RWdCNUUsT0FBT0M7O0FBZ0YxQmpCLE9BQU8yRixJQUFQLEdBQWNBLElBQWQ7QUNoRkE7OztBQ0FBM0YsT0FBT1csSUFBUCxHQUFjLElBQUlLLE9BQU8yRSxJQUFYLENBQWdCM0YsT0FBT0csUUFBdkIsRUFBaUNILE9BQU9JLFNBQXhDLEVBQW1EWSxPQUFPMEYsSUFBMUQsQ0FBZDs7QUFFQTFHLE9BQU9XLElBQVAsQ0FBWUcsS0FBWixDQUFrQlEsR0FBbEIsQ0FBc0IsTUFBdEIsRUFBOEJ0QixPQUFPTyxJQUFyQztBQUNBUCxPQUFPVyxJQUFQLENBQVlHLEtBQVosQ0FBa0JRLEdBQWxCLENBQXNCLFFBQXRCLEVBQWdDdEIsT0FBT2tCLE1BQXZDO0FBQ0E7QUFDQWxCLE9BQU9XLElBQVAsQ0FBWUcsS0FBWixDQUFrQlEsR0FBbEIsQ0FBc0IsTUFBdEIsRUFBOEJ0QixPQUFPMkYsSUFBckM7QUFDQTs7QUFFQTNGLE9BQU9XLElBQVAsQ0FBWUcsS0FBWixDQUFrQkMsS0FBbEIsQ0FBd0IsTUFBeEIiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsibGV0IEVuZ2luZSA9IHtcclxuICBtaW5XaWR0aDogNjQwLFxyXG4gIG1pbkhlaWdodDogMzIwLFxyXG4gIG1heFdpZHRoOiA4MjUsXHJcbiAgbWF4SGVpZ2h0OiA1ODAsXHJcbn07XHJcblxyXG4vKipcclxuICogU3ByaXRlLCBCaXRtYXAsIGV0Yy4uLiBjaGFjaGUga2V5c1xyXG4gKiBAdHlwZSB7T2JqZWN0fVxyXG4gKi9cclxuRW5naW5lLmtleXMgPSB7XHJcbiAgdHJpYW5nbGU6ICd0cmlhbmdsZScsXHJcbn1cclxuIiwiY2xhc3MgQm9vdCBleHRlbmRzIFBoYXNlci5TdGF0ZSB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgcHJlbG9hZCgpIHtcclxuXHJcbiAgfVxyXG5cclxuICBjcmVhdGUoKSB7XHJcbiAgICB0aGlzLnNjYWxlLnBhZ2VBbGlnbkhvcml6b250YWxseSA9IHRydWU7XHJcbiAgICB0aGlzLnNjYWxlLnBhZ2VBbGlnblZlcnRpY2FsbHkgPSB0cnVlO1xyXG4gICAgdGhpcy5nYW1lLnN0YWdlLmJhY2tncm91bmRDb2xvciA9ICcjMDA2MDY0JztcclxuICAgIHRoaXMuc3RhdGUuc3RhcnQoJ0xvYWRlcicpO1xyXG4gIH1cclxufVxyXG5cclxuRW5naW5lLkJvb3QgPSBCb290O1xyXG4iLCJjbGFzcyBMb2FkZXIgZXh0ZW5kcyBQaGFzZXIuU3RhdGUge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIHByZWxvYWQoKSB7XHJcbiAgICB0aGlzLmFkZFByb2dyZXNzTGFibGUoKTtcclxuXHJcbiAgICB0aGlzLmxvYWQub25GaWxlQ29tcGxldGUuYWRkKHRoaXMucmVmcmVzaFByb2dyZXNzLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLmdlbmVyYXRlVHJpYW5nbGUoKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZSgpIHtcclxuICAgIGxldCBudW1iZXJPZkdyYWRhdGlvbiA9IDM7XHJcbiAgICB0aGlzLnN0YXRlLnN0YXJ0KCdHYW1lJywgdHJ1ZSwgZmFsc2UsIG51bWJlck9mR3JhZGF0aW9uKTtcclxuICB9XHJcblxyXG4gIGFkZFByb2dyZXNzTGFibGUoKSB7XHJcbiAgICBsZXQgc3R5bGUgPSB7XHJcbiAgICAgIGZvbnQ6ICc0MXB4IE9wZW4gU2FucycsXHJcbiAgICAgIGZpbGw6ICcjMDBFNjc2J1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucHJvZ3Jlc3NMYWJsZSA9IHRoaXMuYWRkLnRleHQodGhpcy5nYW1lLndvcmxkLmNlbnRlclgsIHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJZLCAnTG9hZGluZzogMCUgKDAvMCknLCBzdHlsZSk7XHJcbiAgICB0aGlzLnByb2dyZXNzTGFibGUuYW5jaG9yLnNldFRvKDAuNSk7XHJcbiAgfVxyXG5cclxuICByZWZyZXNoUHJvZ3Jlc3MocHJvZ3Jlc3MsIGNhY2hlS2V5LCBzdWNjZXNzLCB0b3RhbExvYWRlZCwgdG90YWxGaWxlcykge1xyXG4gICAgdGhpcy5wcm9ncmVzc0xhYmxlLnRleHQgPSBgTG9hZGluZyAke3Byb2dyZXNzfSUgKCR7dG90YWxMb2FkZWR9LyR7dG90YWxGaWxlc30pYDtcclxuICB9XHJcblxyXG4gIGdlbmVyYXRlVHJpYW5nbGUoKSB7XHJcbiAgICBjb25zdCBzaXplID0gMjU1O1xyXG5cclxuICAgIGxldCBiaXRtYXAgPSBuZXcgUGhhc2VyLkJpdG1hcERhdGEoc2l6ZSwgc2l6ZSk7XHJcblxyXG4gICAgYml0bWFwLmN0eC5iZWdpblBhdGgoKTtcclxuICAgIGJpdG1hcC5jdHguZmlsbFN0eWxlID0gJ3doaXRlJztcclxuICAgIGJpdG1hcC5jdHgubW92ZVRvKDAsIHNpemUpO1xyXG4gICAgYml0bWFwLmN0eC5saW5lVG8oc2l6ZSAvIDIsIDApO1xyXG4gICAgYml0bWFwLmN0eC5saW5lVG8oc2l6ZSwgc2l6ZSk7XHJcbiAgICBiaXRtYXAuY3R4LmxpbmVUbygwLCBzaXplKTtcclxuICAgIGJpdG1hcC5jdHguZmlsbCgpO1xyXG5cclxuICAgIHRoaXMuZ2FtZS5jYWNoZS5hZGRCaXRtYXBEYXRhKEVuZ2luZS5rZXlzLnRyaWFuZ2xlLCBiaXRtYXApO1xyXG4gIH1cclxufVxyXG5cclxuRW5naW5lLkxvYWRlciA9IExvYWRlcjtcclxuIixudWxsLCJjbGFzcyBDb2xvclNldCB7XHJcbiAgLyoqXHJcbiAgICogQ29sb3IgU2V0XHJcbiAgICogQHBhcmFtICB7QXJyYXl9IGdyYWRpdGlvbiBBcnJheSBvZiBjb2xvcnNcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihncmFkaXRpb24pIHtcclxuICAgIHRoaXMuZ3JhZGl0aW9uID0gZ3JhZGl0aW9uO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHJhbmRvbSBjb2xvciBmcm9tIHNldFxyXG4gICAqIEByZXR1cm4ge1t0eXBlXX0gW2Rlc2NyaXB0aW9uXVxyXG4gICAqL1xyXG4gIGdldFJhbmRvbUNvbG9yKCkge1xyXG4gICAgcmV0dXJuIEVuZ2luZS5nYW1lLnJuZC5waWNrKHRoaXMuZ3JhZGl0aW9uKTtcclxuICB9XHJcbn1cclxuXHJcbkNvbG9yU2V0LkdSQURBVElPTlMgPSBbXHJcbiAgLy8gaW5kaWdvXHJcbiAgW1xyXG4gICAgMHgzRjUxQjUsXHJcbiAgICAweDM5NDlBQixcclxuICAgIDB4MzAzRjlGLFxyXG4gICAgMHgyODM1OTMsXHJcbiAgXSxcclxuICAvLyBibHVlXHJcbiAgW1xyXG4gICAgMHgyMTk2RjMsXHJcbiAgICAweDFFODhFNSxcclxuICAgIDB4MTk3NkQyLFxyXG4gICAgMHgxNTY1QzAsXHJcbiAgXSxcclxuICAvLyB5ZWxsb3dcclxuICBbXHJcbiAgICAweEZGRjE3NixcclxuICAgIDB4RkZFRTU4LFxyXG4gICAgMHhGRkVCM0IsXHJcbiAgICAweEZERDgzNSxcclxuICBdLFxyXG4gIC8vIHBpbmtcclxuICBbXHJcbiAgICAweEU5MUU2MyxcclxuICAgIDB4RDgxQjYwLFxyXG4gICAgMHhDMjE4NUIsXHJcbiAgICAweEFEMTQ1NyxcclxuICBdLFxyXG4gIC8vIGJyb3duXHJcbiAgW1xyXG4gICAgMHg3OTU1NDgsXHJcbiAgICAweDZENEM0MSxcclxuICAgIDB4NUQ0MDM3LFxyXG4gICAgMHg0RTM0MkUsXHJcbiAgXSxcclxuICAvLyBkZWVwb3JhbmdlXHJcbiAgW1xyXG4gICAgMHhGRjU3MjIsXHJcbiAgICAweEY0NTExRSxcclxuICAgIDB4RTY0QTE5LFxyXG4gICAgMHhEODQzMTUsXHJcbiAgXSxcclxuICAvLyBncmV5XHJcbiAgW1xyXG4gICAgMHg5RTlFOUUsXHJcbiAgICAweDc1NzU3NSxcclxuICAgIDB4NjE2MTYxLFxyXG4gICAgMHg0MjQyNDIsXHJcbiAgXSxcclxuICAvLyByZWRcclxuICBbXHJcbiAgICAweEY0NDMzNixcclxuICAgIDB4RTUzOTM1LFxyXG4gICAgMHhEMzJGMkYsXHJcbiAgICAweEM2MjgyOCxcclxuICBdLFxyXG5dO1xyXG5cclxuRW5naW5lLkNvbG9yU2V0ID0gQ29sb3JTZXQ7XHJcbiIsImNsYXNzIFRyaWFuZ2xlIGV4dGVuZHMgUGhhc2VyLlNwcml0ZSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEl0J3MgYSB0cmlhbmdsZSwgeWFzaCBpdCdzIG5vdCBhIGpva2VcclxuICAgKiBAcGFyYW0gIHtQaGFzZXIuR2FtZX0gIGdhbWUgICAgICBbZGVzY3JpcHRpb25dXHJcbiAgICogQHBhcmFtICB7W3R5cGVdfSAgeCAgICAgICAgIFtkZXNjcmlwdGlvbl1cclxuICAgKiBAcGFyYW0gIHtbdHlwZV19ICB5ICAgICAgICAgW2Rlc2NyaXB0aW9uXVxyXG4gICAqIEBwYXJhbSAge0Jvb2xlYW59IGlzUm90YXRlZCBbZGVzY3JpcHRpb25dXHJcbiAgICogQHBhcmFtICB7TnVtYmVyfSAgY29sb3IgICAgIFtkZXNjcmlwdGlvbl1cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBpc1JvdGF0ZWQsIGNvbG9yU2V0KSB7XHJcbiAgICBzdXBlcihnYW1lLCB4LCB5LCBFbmdpbmUuZ2FtZS5jYWNoZS5nZXRCaXRtYXBEYXRhKEVuZ2luZS5rZXlzLnRyaWFuZ2xlKSk7XHJcblxyXG4gICAgdGhpcy53aWR0aCA9IFRyaWFuZ2xlLnNpemU7XHJcbiAgICB0aGlzLmhlaWdodCA9IFRyaWFuZ2xlLnNpemU7XHJcbiAgICB0aGlzLmFuY2hvci5zZXRUbygwLjUpO1xyXG4gICAgdGhpcy5jb2xvclNldCA9IGNvbG9yU2V0O1xyXG4gICAgdGhpcy50aW50ID0gdGhpcy5jb2xvclNldC5nZXRSYW5kb21Db2xvcigpO1xyXG5cclxuICAgIHRoaXMuaW5wdXRFbmFibGVkID0gdHJ1ZTtcclxuICAgIHRoaXMuaW5wdXQucGl4ZWxQZXJmZWN0T3ZlciA9IHRydWU7XHJcbiAgICB0aGlzLmlucHV0LnBpeGVsUGVyZmVjdENsaWNrID0gdHJ1ZTtcclxuICAgIHRoaXMuZXZlbnRzLm9uSW5wdXRPdmVyLmFkZCh0aGlzLmRlbGV0ZSwgdGhpcyk7XHJcbiAgICB0aGlzLmV2ZW50cy5vbklucHV0RG93bi5hZGQodGhpcy5kZWxldGUsIHRoaXMpO1xyXG5cclxuICAgIHRoaXMuZXZlbnRzLnRyaWFuZ2xlRGVsZXRlID0gbmV3IFBoYXNlci5TaWduYWwoKTtcclxuXHJcbiAgICBpZiAoaXNSb3RhdGVkKSB7XHJcbiAgICAgIHRoaXMucm90YXRpb24gPSBNYXRoLlBJO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZ2FtZS5hZGQuZXhpc3RpbmcodGhpcyk7XHJcbiAgfVxyXG5cclxuICBkZWxldGUoKSB7XHJcbiAgICBpZiAodGhpcy5nYW1lLmlucHV0LmFjdGl2ZVBvaW50ZXIuaXNEb3duKSB7XHJcbiAgICAgIHRoaXMuZ2FtZS5hZGQudHdlZW4odGhpcylcclxuICAgICAgICAudG8oe1xyXG4gICAgICAgICAgYWxwaGE6IDBcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGFydCgpXHJcbiAgICAgICAgLm9uQ29tcGxldGVcclxuICAgICAgICAuYWRkKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuZXZlbnRzLnRyaWFuZ2xlRGVsZXRlLmRpc3BhdGNoKHRoaXMpO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVjb3Zlcihjb2xvclNldCkge1xyXG4gICAgdGhpcy5jb2xvclNldCA9IGNvbG9yU2V0O1xyXG4gICAgdGhpcy50aW50ID0gdGhpcy5jb2xvclNldC5nZXRSYW5kb21Db2xvcigpO1xyXG5cclxuICAgIHRoaXMuZ2FtZS5hZGQudHdlZW4odGhpcylcclxuICAgICAgLnRvKHtcclxuICAgICAgICBhbHBoYTogMVxyXG4gICAgICB9LCAxMDAwLCBQaGFzZXIuRWFzaW5nLkJvdW5jZS5PdXQpXHJcbiAgICAgIC5zdGFydCgpO1xyXG4gIH1cclxufVxyXG5cclxuVHJpYW5nbGUuc2l6ZSA9IDY1O1xyXG5FbmdpbmUuVHJpYW5nbGUgPSBUcmlhbmdsZTtcclxuIiwiY2xhc3MgR2FtZSBleHRlbmRzIFBoYXNlci5TdGF0ZSB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgaW5pdChudW1iZXJPZkdyYWRhdGlvbikge1xyXG4gICAgdGhpcy5jb2xvclNldHMgPSBbXTtcclxuICAgIC8qKlxyXG4gICAgICogTnVtYmVyIG9mIGNvbG9yU2V0cyB3aWxsIHVzZSBpbiB0aGlzIGdhbWUgbGV2ZWxcclxuICAgICAqIEB0eXBlIHtbdHlwZV19XHJcbiAgICAgKi9cclxuICAgIHRoaXMubnVtYmVyT2ZHcmFkYXRpb24gPSBudW1iZXJPZkdyYWRhdGlvbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1hcmdpbiBvZiB0cmlhbmdsZXMgbWF0cml4XHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICB0aGlzLm1hcmdpbiA9IDMyO1xyXG5cclxuICAgIHRoaXMudHJpYW5nbGVzTWF0cml4ID0gW107XHJcbiAgfVxyXG5cclxuICBjcmVhdGUoKSB7XHJcbiAgICB0aGlzLmdhbWUuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gJyMwMDAnO1xyXG5cclxuICAgIHRoaXMuY3JlYXRlR3JhZGF0aW9ucygpO1xyXG5cclxuICAgIHRoaXMuc2tldGNoKCk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICAvLyB0aGlzLmdhbWUuZGVidWcuaW5wdXRJbmZvKDUwLCA1MCwgJ3JnYigyNTUsIDI1NSwgMjU1KScpO1xyXG4gICAgLy8gdGhpcy5nYW1lLmRlYnVnLmdlb20obmV3IFBoYXNlci5MaW5lKHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYLCAwLCB0aGlzLmdhbWUud29ybGQuY2VudGVyWCwgdGhpcy5nYW1lLmhlaWdodCksICcjOTBDQUY5Jyk7XHJcbiAgICAvLyB0aGlzLmdhbWUuZGVidWcuZ2VvbShuZXcgUGhhc2VyLkxpbmUoMCwgdGhpcy5nYW1lLndvcmxkLmNlbnRlclksIHRoaXMuZ2FtZS53aWR0aCwgdGhpcy5nYW1lLndvcmxkLmNlbnRlclkpLCAnIzkwQ0FGOScpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlR3JhZGF0aW9ucygpIHtcclxuICAgIGxldCBhbGxHcmFkYXRpb24gPSBQaGFzZXIuQXJyYXlVdGlscy5zaHVmZmxlKENvbG9yU2V0LkdSQURBVElPTlMpO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5udW1iZXJPZkdyYWRhdGlvbjsgaSsrKSB7XHJcbiAgICAgIGxldCBjb2xvclNldCA9IG5ldyBDb2xvclNldChhbGxHcmFkYXRpb25baV0pO1xyXG4gICAgICB0aGlzLmNvbG9yU2V0cy5wdXNoKGNvbG9yU2V0KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSB0cmlhbmdsZXMgb24gY2FudmFzXHJcbiAgICovXHJcbiAgc2tldGNoKCkge1xyXG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCAyNTsgeCsrKSB7XHJcbiAgICAgIHRoaXMudHJpYW5nbGVzTWF0cml4W3hdID0gW107XHJcbiAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgOTsgeSsrKSB7XHJcbiAgICAgICAgbGV0IHBvc1ggPSB0aGlzLm1hcmdpbiArIHggKiAoRW5naW5lLlRyaWFuZ2xlLnNpemUgLyAyIC0gMSk7XHJcbiAgICAgICAgbGV0IHBvc1kgPSB0aGlzLm1hcmdpbiArIHkgKiAoRW5naW5lLlRyaWFuZ2xlLnNpemUgLSAxKTtcclxuICAgICAgICBsZXQgaXNSb3RhdGVkID0geCAlIDIgPT09IDE7XHJcblxyXG4gICAgICAgIGlmICh5ICUgMiA9PT0gMSkge1xyXG4gICAgICAgICAgaXNSb3RhdGVkID0gIWlzUm90YXRlZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0cmlhbmdsZSA9IG5ldyBFbmdpbmUuVHJpYW5nbGUoXHJcbiAgICAgICAgICB0aGlzLmdhbWUsXHJcbiAgICAgICAgICBwb3NYLFxyXG4gICAgICAgICAgcG9zWSxcclxuICAgICAgICAgIGlzUm90YXRlZCxcclxuICAgICAgICAgIHRoaXMuZ2FtZS5ybmQucGljayh0aGlzLmNvbG9yU2V0cylcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICB0cmlhbmdsZS5ldmVudHMudHJpYW5nbGVEZWxldGUuYWRkKHRoaXMucmVjb3ZlclRyaWFuZ2xlLCB0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy50cmlhbmdsZXNNYXRyaXhbeF1beV0gPSB0cmlhbmdsZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVjb3ZlclRyaWFuZ2xlKHRyaWFuZ2xlKSB7XHJcbiAgICB0cmlhbmdsZS5yZWNvdmVyKHRoaXMuZ2FtZS5ybmQucGljayh0aGlzLmNvbG9yU2V0cykpO1xyXG4gIH1cclxufVxyXG5cclxuRW5naW5lLkdhbWUgPSBHYW1lO1xyXG4iLG51bGwsIkVuZ2luZS5nYW1lID0gbmV3IFBoYXNlci5HYW1lKEVuZ2luZS5tYXhXaWR0aCwgRW5naW5lLm1heEhlaWdodCwgUGhhc2VyLkFVVE8pO1xyXG5cclxuRW5naW5lLmdhbWUuc3RhdGUuYWRkKCdCb290JywgRW5naW5lLkJvb3QpO1xyXG5FbmdpbmUuZ2FtZS5zdGF0ZS5hZGQoJ0xvYWRlcicsIEVuZ2luZS5Mb2FkZXIpO1xyXG4vLyBFbmdpbmUuZ2FtZS5zdGF0ZS5hZGQoJ01lbnUnLCBFbmdpbmUuTWVudSk7XHJcbkVuZ2luZS5nYW1lLnN0YXRlLmFkZCgnR2FtZScsIEVuZ2luZS5HYW1lKTtcclxuLy8gRW5naW5lLmdhbWUuc3RhdGUuYWRkKCdTY29yZUJvYXJkJywgRW5naW5lLlNjb3JlQm9hcmQpO1xyXG5cclxuRW5naW5lLmdhbWUuc3RhdGUuc3RhcnQoJ0Jvb3QnKTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
