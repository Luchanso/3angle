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

    if (isRotated) {
      _this.rotation = Math.PI;
    }

    _this.inputEnabled = true;
    _this.events.onInputOver.add(_this.delete, _this);
    return _this;
  }

  _createClass(Triangle, [{
    key: "delete",
    value: function _delete() {
      this.game.add.tween(this).to({
        alpha: 0
      }).start();
    }
  }, {
    key: "recovery",
    value: function recovery(color) {}
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
      /**
       * Number of colorSets will use in this game level
       * @type {[type]}
       */
      this.numberOfGradation = numberOfGradation;
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
      this.colorSets = [];

      var allGradation = Phaser.ArrayUtils.shuffle(ColorSet.GRADATIONS);

      for (var i = 0; i < this.numberOfGradation; i++) {
        var colorSet = new ColorSet(allGradation[i]);
        this.colorSets.push(colorSet);
      }
    }
  }, {
    key: 'sketch',
    value: function sketch() {
      var margin = 32;
      var padding = 0;

      for (var x = 0; x < 25; x++) {
        for (var y = 0; y < 9; y++) {
          var posX = margin + x * (Engine.Triangle.size / 2 + padding - 1);
          var posY = margin + y * (Engine.Triangle.size + padding - 1);
          var isRotated = x % 2 === 1;

          if (y % 2 === 1) {
            isRotated = !isRotated;
          }

          var triangle = new Engine.Triangle(this.game, posX, posY, isRotated, this.game.rnd.pick(this.colorSets));

          this.game.add.existing(triangle);
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS5qcyIsImJvb3QuanMiLCJsb2FkZXIuanMiLCJtZW51LmpzIiwiY29sb3JzZXQuanMiLCJ0cmlhbmdsZS5qcyIsImdhbWUuanMiLCJzY29yZWJvYXJkLmpzIiwiYXBwLmpzIl0sIm5hbWVzIjpbIkVuZ2luZSIsIm1pbldpZHRoIiwibWluSGVpZ2h0IiwibWF4V2lkdGgiLCJtYXhIZWlnaHQiLCJrZXlzIiwidHJpYW5nbGUiLCJCb290Iiwic2NhbGUiLCJwYWdlQWxpZ25Ib3Jpem9udGFsbHkiLCJwYWdlQWxpZ25WZXJ0aWNhbGx5IiwiZ2FtZSIsInN0YWdlIiwiYmFja2dyb3VuZENvbG9yIiwic3RhdGUiLCJzdGFydCIsIlBoYXNlciIsIlN0YXRlIiwiTG9hZGVyIiwiYWRkUHJvZ3Jlc3NMYWJsZSIsImxvYWQiLCJvbkZpbGVDb21wbGV0ZSIsImFkZCIsInJlZnJlc2hQcm9ncmVzcyIsImdlbmVyYXRlVHJpYW5nbGUiLCJudW1iZXJPZkdyYWRhdGlvbiIsInN0eWxlIiwiZm9udCIsImZpbGwiLCJwcm9ncmVzc0xhYmxlIiwidGV4dCIsIndvcmxkIiwiY2VudGVyWCIsImNlbnRlclkiLCJhbmNob3IiLCJzZXRUbyIsInByb2dyZXNzIiwiY2FjaGVLZXkiLCJzdWNjZXNzIiwidG90YWxMb2FkZWQiLCJ0b3RhbEZpbGVzIiwic2l6ZSIsImJpdG1hcCIsIkJpdG1hcERhdGEiLCJjdHgiLCJiZWdpblBhdGgiLCJmaWxsU3R5bGUiLCJtb3ZlVG8iLCJsaW5lVG8iLCJjYWNoZSIsImFkZEJpdG1hcERhdGEiLCJDb2xvclNldCIsImdyYWRpdGlvbiIsInJuZCIsInBpY2siLCJHUkFEQVRJT05TIiwiVHJpYW5nbGUiLCJ4IiwieSIsImlzUm90YXRlZCIsImNvbG9yU2V0IiwiZ2V0Qml0bWFwRGF0YSIsIndpZHRoIiwiaGVpZ2h0IiwidGludCIsImdldFJhbmRvbUNvbG9yIiwicm90YXRpb24iLCJNYXRoIiwiUEkiLCJpbnB1dEVuYWJsZWQiLCJldmVudHMiLCJvbklucHV0T3ZlciIsImRlbGV0ZSIsInR3ZWVuIiwidG8iLCJhbHBoYSIsImNvbG9yIiwiU3ByaXRlIiwiR2FtZSIsImNyZWF0ZUdyYWRhdGlvbnMiLCJza2V0Y2giLCJjb2xvclNldHMiLCJhbGxHcmFkYXRpb24iLCJBcnJheVV0aWxzIiwic2h1ZmZsZSIsImkiLCJwdXNoIiwibWFyZ2luIiwicGFkZGluZyIsInBvc1giLCJwb3NZIiwiZXhpc3RpbmciLCJBVVRPIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQUlBLFNBQVM7QUFDWEMsWUFBVSxHQURDO0FBRVhDLGFBQVcsR0FGQTtBQUdYQyxZQUFVLEdBSEM7QUFJWEMsYUFBVztBQUpBLENBQWI7O0FBT0E7Ozs7QUFJQUosT0FBT0ssSUFBUCxHQUFjO0FBQ1pDLFlBQVU7QUFERSxDQUFkOzs7Ozs7Ozs7OztJQ1hNQzs7O0FBQ0osa0JBQWM7QUFBQTs7QUFBQTtBQUViOzs7OzhCQUVTLENBRVQ7Ozs2QkFFUTtBQUNQLFdBQUtDLEtBQUwsQ0FBV0MscUJBQVgsR0FBbUMsSUFBbkM7QUFDQSxXQUFLRCxLQUFMLENBQVdFLG1CQUFYLEdBQWlDLElBQWpDO0FBQ0EsV0FBS0MsSUFBTCxDQUFVQyxLQUFWLENBQWdCQyxlQUFoQixHQUFrQyxTQUFsQztBQUNBLFdBQUtDLEtBQUwsQ0FBV0MsS0FBWCxDQUFpQixRQUFqQjtBQUNEOzs7O0VBZGdCQyxPQUFPQzs7QUFpQjFCakIsT0FBT08sSUFBUCxHQUFjQSxJQUFkOzs7Ozs7Ozs7OztJQ2pCTVc7OztBQUNKLG9CQUFjO0FBQUE7O0FBQUE7QUFFYjs7Ozs4QkFFUztBQUNSLFdBQUtDLGdCQUFMOztBQUVBLFdBQUtDLElBQUwsQ0FBVUMsY0FBVixDQUF5QkMsR0FBekIsQ0FBNkIsS0FBS0MsZUFBbEMsRUFBbUQsSUFBbkQ7O0FBRUEsV0FBS0MsZ0JBQUw7QUFDRDs7OzZCQUVRO0FBQ1AsVUFBSUMsb0JBQW9CLENBQXhCO0FBQ0EsV0FBS1gsS0FBTCxDQUFXQyxLQUFYLENBQWlCLE1BQWpCLEVBQXlCLElBQXpC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LElBSGEsRUFJYi9CLFNBSmEsRUFLYixLQUFLaEQsSUFBTCxDQUFVMEMsR0FBVixDQUFjQyxJQUFkLENBQW1CLEtBQUsyQixTQUF4QixDQUxhLENBQWY7O0FBUUEsZUFBS3RFLElBQUwsQ0FBVVcsR0FBVixDQUFjcUUsUUFBZCxDQUF1QnJGLFFBQXZCO0FBQ0Q7QUFDRjtBQUNGOzs7O0VBL0RnQlUsT0FBT0M7O0FBa0UxQmpCLE9BQU84RSxJQUFQLEdBQWNBLElBQWQ7QUNsRUE7OztBQ0FBOUUsT0FBT1csSUFBUCxHQUFjLElBQUlLLE9BQU84RCxJQUFYLENBQWdCOUUsT0FBT0csUUFBdkIsRUFBaUNILE9BQU9JLFNBQXhDLEVBQW1EWSxPQUFPNEUsSUFBMUQsQ0FBZDs7QUFFQTVGLE9BQU9XLElBQVAsQ0FBWUcsS0FBWixDQUFrQlEsR0FBbEIsQ0FBc0IsTUFBdEIsRUFBOEJ0QixPQUFPTyxJQUFyQztBQUNBUCxPQUFPVyxJQUFQLENBQVlHLEtBQVosQ0FBa0JRLEdBQWxCLENBQXNCLFFBQXRCLEVBQWdDdEIsT0FBT2tCLE1BQXZDO0FBQ0E7QUFDQWxCLE9BQU9XLElBQVAsQ0FBWUcsS0FBWixDQUFrQlEsR0FBbEIsQ0FBc0IsTUFBdEIsRUFBOEJ0QixPQUFPOEUsSUFBckM7QUFDQTs7QUFFQTlFLE9BQU9XLElBQVAsQ0FBWUcsS0FBWixDQUFrQkMsS0FBbEIsQ0FBd0IsTUFBeEIiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsibGV0IEVuZ2luZSA9IHtcclxuICBtaW5XaWR0aDogNjQwLFxyXG4gIG1pbkhlaWdodDogMzIwLFxyXG4gIG1heFdpZHRoOiA4MjUsXHJcbiAgbWF4SGVpZ2h0OiA1ODAsXHJcbn07XHJcblxyXG4vKipcclxuICogU3ByaXRlLCBCaXRtYXAsIGV0Yy4uLiBjaGFjaGUga2V5c1xyXG4gKiBAdHlwZSB7T2JqZWN0fVxyXG4gKi9cclxuRW5naW5lLmtleXMgPSB7XHJcbiAgdHJpYW5nbGU6ICd0cmlhbmdsZScsXHJcbn1cclxuIiwiY2xhc3MgQm9vdCBleHRlbmRzIFBoYXNlci5TdGF0ZSB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgcHJlbG9hZCgpIHtcclxuXHJcbiAgfVxyXG5cclxuICBjcmVhdGUoKSB7XHJcbiAgICB0aGlzLnNjYWxlLnBhZ2VBbGlnbkhvcml6b250YWxseSA9IHRydWU7XHJcbiAgICB0aGlzLnNjYWxlLnBhZ2VBbGlnblZlcnRpY2FsbHkgPSB0cnVlO1xyXG4gICAgdGhpcy5nYW1lLnN0YWdlLmJhY2tncm91bmRDb2xvciA9ICcjMDA2MDY0JztcclxuICAgIHRoaXMuc3RhdGUuc3RhcnQoJ0xvYWRlcicpO1xyXG4gIH1cclxufVxyXG5cclxuRW5naW5lLkJvb3QgPSBCb290O1xyXG4iLCJjbGFzcyBMb2FkZXIgZXh0ZW5kcyBQaGFzZXIuU3RhdGUge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIHByZWxvYWQoKSB7XHJcbiAgICB0aGlzLmFkZFByb2dyZXNzTGFibGUoKTtcclxuXHJcbiAgICB0aGlzLmxvYWQub25GaWxlQ29tcGxldGUuYWRkKHRoaXMucmVmcmVzaFByb2dyZXNzLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLmdlbmVyYXRlVHJpYW5nbGUoKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZSgpIHtcclxuICAgIGxldCBudW1iZXJPZkdyYWRhdGlvbiA9IDM7XHJcbiAgICB0aGlzLnN0YXRlLnN0YXJ0KCdHYW1lJywgdHJ1ZSwgZmFsc2UsIG51bWJlck9mR3JhZGF0aW9uKTtcclxuICB9XHJcblxyXG4gIGFkZFByb2dyZXNzTGFibGUoKSB7XHJcbiAgICBsZXQgc3R5bGUgPSB7XHJcbiAgICAgIGZvbnQ6ICc0MXB4IE9wZW4gU2FucycsXHJcbiAgICAgIGZpbGw6ICcjMDBFNjc2J1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucHJvZ3Jlc3NMYWJsZSA9IHRoaXMuYWRkLnRleHQodGhpcy5nYW1lLndvcmxkLmNlbnRlclgsIHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJZLCAnTG9hZGluZzogMCUgKDAvMCknLCBzdHlsZSk7XHJcbiAgICB0aGlzLnByb2dyZXNzTGFibGUuYW5jaG9yLnNldFRvKDAuNSk7XHJcbiAgfVxyXG5cclxuICByZWZyZXNoUHJvZ3Jlc3MocHJvZ3Jlc3MsIGNhY2hlS2V5LCBzdWNjZXNzLCB0b3RhbExvYWRlZCwgdG90YWxGaWxlcykge1xyXG4gICAgdGhpcy5wcm9ncmVzc0xhYmxlLnRleHQgPSBgTG9hZGluZyAke3Byb2dyZXNzfSUgKCR7dG90YWxMb2FkZWR9LyR7dG90YWxGaWxlc30pYDtcclxuICB9XHJcblxyXG4gIGdlbmVyYXRlVHJpYW5nbGUoKSB7XHJcbiAgICBjb25zdCBzaXplID0gMjU1O1xyXG5cclxuICAgIGxldCBiaXRtYXAgPSBuZXcgUGhhc2VyLkJpdG1hcERhdGEoc2l6ZSwgc2l6ZSk7XHJcblxyXG4gICAgYml0bWFwLmN0eC5iZWdpblBhdGgoKTtcclxuICAgIGJpdG1hcC5jdHguZmlsbFN0eWxlID0gJ3doaXRlJztcclxuICAgIGJpdG1hcC5jdHgubW92ZVRvKDAsIHNpemUpO1xyXG4gICAgYml0bWFwLmN0eC5saW5lVG8oc2l6ZSAvIDIsIDApO1xyXG4gICAgYml0bWFwLmN0eC5saW5lVG8oc2l6ZSwgc2l6ZSk7XHJcbiAgICBiaXRtYXAuY3R4LmxpbmVUbygwLCBzaXplKTtcclxuICAgIGJpdG1hcC5jdHguZmlsbCgpO1xyXG5cclxuICAgIHRoaXMuZ2FtZS5jYWNoZS5hZGRCaXRtYXBEYXRhKEVuZ2luZS5rZXlzLnRyaWFuZ2xlLCBiaXRtYXApO1xyXG4gIH1cclxufVxyXG5cclxuRW5naW5lLkxvYWRlciA9IExvYWRlcjtcclxuIixudWxsLCJjbGFzcyBDb2xvclNldCB7XHJcbiAgLyoqXHJcbiAgICogQ29sb3IgU2V0XHJcbiAgICogQHBhcmFtICB7QXJyYXl9IGdyYWRpdGlvbiBBcnJheSBvZiBjb2xvcnNcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihncmFkaXRpb24pIHtcclxuICAgIHRoaXMuZ3JhZGl0aW9uID0gZ3JhZGl0aW9uO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHJhbmRvbSBjb2xvciBmcm9tIHNldFxyXG4gICAqIEByZXR1cm4ge1t0eXBlXX0gW2Rlc2NyaXB0aW9uXVxyXG4gICAqL1xyXG4gIGdldFJhbmRvbUNvbG9yKCkge1xyXG4gICAgcmV0dXJuIEVuZ2luZS5nYW1lLnJuZC5waWNrKHRoaXMuZ3JhZGl0aW9uKTtcclxuICB9XHJcbn1cclxuXHJcbkNvbG9yU2V0LkdSQURBVElPTlMgPSBbXHJcbiAgLy8gaW5kaWdvXHJcbiAgW1xyXG4gICAgMHgzRjUxQjUsXHJcbiAgICAweDM5NDlBQixcclxuICAgIDB4MzAzRjlGLFxyXG4gICAgMHgyODM1OTMsXHJcbiAgXSxcclxuICAvLyBibHVlXHJcbiAgW1xyXG4gICAgMHgyMTk2RjMsXHJcbiAgICAweDFFODhFNSxcclxuICAgIDB4MTk3NkQyLFxyXG4gICAgMHgxNTY1QzAsXHJcbiAgXSxcclxuICAvLyB5ZWxsb3dcclxuICBbXHJcbiAgICAweEZGRjE3NixcclxuICAgIDB4RkZFRTU4LFxyXG4gICAgMHhGRkVCM0IsXHJcbiAgICAweEZERDgzNSxcclxuICBdLFxyXG4gIC8vIHBpbmtcclxuICBbXHJcbiAgICAweEU5MUU2MyxcclxuICAgIDB4RDgxQjYwLFxyXG4gICAgMHhDMjE4NUIsXHJcbiAgICAweEFEMTQ1NyxcclxuICBdLFxyXG4gIC8vIGJyb3duXHJcbiAgW1xyXG4gICAgMHg3OTU1NDgsXHJcbiAgICAweDZENEM0MSxcclxuICAgIDB4NUQ0MDM3LFxyXG4gICAgMHg0RTM0MkUsXHJcbiAgXSxcclxuICAvLyBkZWVwb3JhbmdlXHJcbiAgW1xyXG4gICAgMHhGRjU3MjIsXHJcbiAgICAweEY0NTExRSxcclxuICAgIDB4RTY0QTE5LFxyXG4gICAgMHhEODQzMTUsXHJcbiAgXSxcclxuICAvLyBncmV5XHJcbiAgW1xyXG4gICAgMHg5RTlFOUUsXHJcbiAgICAweDc1NzU3NSxcclxuICAgIDB4NjE2MTYxLFxyXG4gICAgMHg0MjQyNDIsXHJcbiAgXSxcclxuICAvLyByZWRcclxuICBbXHJcbiAgICAweEY0NDMzNixcclxuICAgIDB4RTUzOTM1LFxyXG4gICAgMHhEMzJGMkYsXHJcbiAgICAweEM2MjgyOCxcclxuICBdLFxyXG5dO1xyXG5cclxuRW5naW5lLkNvbG9yU2V0ID0gQ29sb3JTZXQ7XHJcbiIsImNsYXNzIFRyaWFuZ2xlIGV4dGVuZHMgUGhhc2VyLlNwcml0ZSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEl0J3MgYSB0cmlhbmdsZSwgeWFzaCBpdCdzIG5vdCBhIGpva2VcclxuICAgKiBAcGFyYW0gIHtQaGFzZXIuR2FtZX0gIGdhbWUgICAgICBbZGVzY3JpcHRpb25dXHJcbiAgICogQHBhcmFtICB7W3R5cGVdfSAgeCAgICAgICAgIFtkZXNjcmlwdGlvbl1cclxuICAgKiBAcGFyYW0gIHtbdHlwZV19ICB5ICAgICAgICAgW2Rlc2NyaXB0aW9uXVxyXG4gICAqIEBwYXJhbSAge0Jvb2xlYW59IGlzUm90YXRlZCBbZGVzY3JpcHRpb25dXHJcbiAgICogQHBhcmFtICB7TnVtYmVyfSAgY29sb3IgICAgIFtkZXNjcmlwdGlvbl1cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBpc1JvdGF0ZWQsIGNvbG9yU2V0KSB7XHJcbiAgICBzdXBlcihnYW1lLCB4LCB5LCBFbmdpbmUuZ2FtZS5jYWNoZS5nZXRCaXRtYXBEYXRhKEVuZ2luZS5rZXlzLnRyaWFuZ2xlKSk7XHJcblxyXG4gICAgdGhpcy53aWR0aCA9IFRyaWFuZ2xlLnNpemU7XHJcbiAgICB0aGlzLmhlaWdodCA9IFRyaWFuZ2xlLnNpemU7XHJcbiAgICB0aGlzLmFuY2hvci5zZXRUbygwLjUpO1xyXG4gICAgdGhpcy5jb2xvclNldCA9IGNvbG9yU2V0O1xyXG4gICAgdGhpcy50aW50ID0gdGhpcy5jb2xvclNldC5nZXRSYW5kb21Db2xvcigpO1xyXG5cclxuICAgIGlmIChpc1JvdGF0ZWQpIHtcclxuICAgICAgdGhpcy5yb3RhdGlvbiA9IE1hdGguUEk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5pbnB1dEVuYWJsZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5ldmVudHMub25JbnB1dE92ZXIuYWRkKHRoaXMuZGVsZXRlLCB0aGlzKTtcclxuICB9XHJcblxyXG4gIGRlbGV0ZSgpIHtcclxuICAgIHRoaXMuZ2FtZS5hZGQudHdlZW4odGhpcylcclxuICAgICAgLnRvKHtcclxuICAgICAgICBhbHBoYTogMFxyXG4gICAgICB9KVxyXG4gICAgICAuc3RhcnQoKTtcclxuICB9XHJcblxyXG4gIHJlY292ZXJ5KGNvbG9yKSB7XHJcblxyXG4gIH1cclxufVxyXG5cclxuVHJpYW5nbGUuc2l6ZSA9IDY1O1xyXG5FbmdpbmUuVHJpYW5nbGUgPSBUcmlhbmdsZTtcclxuIiwiY2xhc3MgR2FtZSBleHRlbmRzIFBoYXNlci5TdGF0ZSB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgaW5pdChudW1iZXJPZkdyYWRhdGlvbikge1xyXG4gICAgLyoqXHJcbiAgICAgKiBOdW1iZXIgb2YgY29sb3JTZXRzIHdpbGwgdXNlIGluIHRoaXMgZ2FtZSBsZXZlbFxyXG4gICAgICogQHR5cGUge1t0eXBlXX1cclxuICAgICAqL1xyXG4gICAgdGhpcy5udW1iZXJPZkdyYWRhdGlvbiA9IG51bWJlck9mR3JhZGF0aW9uO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlKCkge1xyXG4gICAgdGhpcy5nYW1lLnN0YWdlLmJhY2tncm91bmRDb2xvciA9ICcjMDAwJztcclxuXHJcbiAgICB0aGlzLmNyZWF0ZUdyYWRhdGlvbnMoKTtcclxuXHJcbiAgICB0aGlzLnNrZXRjaCgpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgLy8gdGhpcy5nYW1lLmRlYnVnLmlucHV0SW5mbyg1MCwgNTAsICdyZ2IoMjU1LCAyNTUsIDI1NSknKTtcclxuICAgIC8vIHRoaXMuZ2FtZS5kZWJ1Zy5nZW9tKG5ldyBQaGFzZXIuTGluZSh0aGlzLmdhbWUud29ybGQuY2VudGVyWCwgMCwgdGhpcy5nYW1lLndvcmxkLmNlbnRlclgsIHRoaXMuZ2FtZS5oZWlnaHQpLCAnIzkwQ0FGOScpO1xyXG4gICAgLy8gdGhpcy5nYW1lLmRlYnVnLmdlb20obmV3IFBoYXNlci5MaW5lKDAsIHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJZLCB0aGlzLmdhbWUud2lkdGgsIHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJZKSwgJyM5MENBRjknKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZUdyYWRhdGlvbnMoKSB7XHJcbiAgICB0aGlzLmNvbG9yU2V0cyA9IFtdO1xyXG5cclxuICAgIGxldCBhbGxHcmFkYXRpb24gPSBQaGFzZXIuQXJyYXlVdGlscy5zaHVmZmxlKENvbG9yU2V0LkdSQURBVElPTlMpO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5udW1iZXJPZkdyYWRhdGlvbjsgaSsrKSB7XHJcbiAgICAgIGxldCBjb2xvclNldCA9IG5ldyBDb2xvclNldChhbGxHcmFkYXRpb25baV0pO1xyXG4gICAgICB0aGlzLmNvbG9yU2V0cy5wdXNoKGNvbG9yU2V0KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNrZXRjaCgpIHtcclxuICAgIGNvbnN0IG1hcmdpbiA9IDMyO1xyXG4gICAgY29uc3QgcGFkZGluZyA9IDA7XHJcblxyXG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCAyNTsgeCsrKSB7XHJcbiAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgOTsgeSsrKSB7XHJcbiAgICAgICAgbGV0IHBvc1ggPSBtYXJnaW4gKyB4ICogKEVuZ2luZS5UcmlhbmdsZS5zaXplIC8gMiArIHBhZGRpbmcgLSAxKTtcclxuICAgICAgICBsZXQgcG9zWSA9IG1hcmdpbiArIHkgKiAoRW5naW5lLlRyaWFuZ2xlLnNpemUgKyBwYWRkaW5nIC0gMSk7XHJcbiAgICAgICAgbGV0IGlzUm90YXRlZCA9IHggJSAyID09PSAxO1xyXG5cclxuICAgICAgICBpZiAoeSAlIDIgPT09IDEpIHtcclxuICAgICAgICAgIGlzUm90YXRlZCA9ICFpc1JvdGF0ZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdHJpYW5nbGUgPSBuZXcgRW5naW5lLlRyaWFuZ2xlKFxyXG4gICAgICAgICAgdGhpcy5nYW1lLFxyXG4gICAgICAgICAgcG9zWCxcclxuICAgICAgICAgIHBvc1ksXHJcbiAgICAgICAgICBpc1JvdGF0ZWQsXHJcbiAgICAgICAgICB0aGlzLmdhbWUucm5kLnBpY2sodGhpcy5jb2xvclNldHMpXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgdGhpcy5nYW1lLmFkZC5leGlzdGluZyh0cmlhbmdsZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbkVuZ2luZS5HYW1lID0gR2FtZTtcclxuIixudWxsLCJFbmdpbmUuZ2FtZSA9IG5ldyBQaGFzZXIuR2FtZShFbmdpbmUubWF4V2lkdGgsIEVuZ2luZS5tYXhIZWlnaHQsIFBoYXNlci5BVVRPKTtcclxuXHJcbkVuZ2luZS5nYW1lLnN0YXRlLmFkZCgnQm9vdCcsIEVuZ2luZS5Cb290KTtcclxuRW5naW5lLmdhbWUuc3RhdGUuYWRkKCdMb2FkZXInLCBFbmdpbmUuTG9hZGVyKTtcclxuLy8gRW5naW5lLmdhbWUuc3RhdGUuYWRkKCdNZW51JywgRW5naW5lLk1lbnUpO1xyXG5FbmdpbmUuZ2FtZS5zdGF0ZS5hZGQoJ0dhbWUnLCBFbmdpbmUuR2FtZSk7XHJcbi8vIEVuZ2luZS5nYW1lLnN0YXRlLmFkZCgnU2NvcmVCb2FyZCcsIEVuZ2luZS5TY29yZUJvYXJkKTtcclxuXHJcbkVuZ2luZS5nYW1lLnN0YXRlLnN0YXJ0KCdCb290Jyk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
