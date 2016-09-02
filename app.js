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
      var numberOfGradation = 2;
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

      console.log(this.numberOfGradation);
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

Engine.game = new Phaser.Game(Engine.maxWidth, Engine.maxHeight, Phaser.WEBGL);

Engine.game.state.add('Boot', Engine.Boot);
Engine.game.state.add('Loader', Engine.Loader);
// Engine.game.state.add('Menu', Engine.Menu);
Engine.game.state.add('Game', Engine.Game);
// Engine.game.state.add('ScoreBoard', Engine.ScoreBoard);

Engine.game.state.start('Boot');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS5qcyIsImJvb3QuanMiLCJsb2FkZXIuanMiLCJtZW51LmpzIiwiY29sb3JzZXQuanMiLCJ0cmlhbmdsZS5qcyIsImdhbWUuanMiLCJzY29yZWJvYXJkLmpzIiwiYXBwLmpzIl0sIm5hbWVzIjpbIkVuZ2luZSIsIm1pbldpZHRoIiwibWluSGVpZ2h0IiwibWF4V2lkdGgiLCJtYXhIZWlnaHQiLCJrZXlzIiwidHJpYW5nbGUiLCJCb290Iiwic2NhbGUiLCJwYWdlQWxpZ25Ib3Jpem9udGFsbHkiLCJwYWdlQWxpZ25WZXJ0aWNhbGx5IiwiZ2FtZSIsInN0YWdlIiwiYmFja2dyb3VuZENvbG9yIiwic3RhdGUiLCJzdGFydCIsIlBoYXNlciIsIlN0YXRlIiwiTG9hZGVyIiwiYWRkUHJvZ3Jlc3NMYWJsZSIsImxvYWQiLCJvbkZpbGVDb21wbGV0ZSIsImFkZCIsInJlZnJlc2hQcm9ncmVzcyIsImdlbmVyYXRlVHJpYW5nbGUiLCJudW1iZXJPZkdyYWRhdGlvbiIsInN0eWxlIiwiZm9udCIsImZpbGwiLCJwcm9ncmVzc0xhYmxlIiwidGV4dCIsIndvcmxkIiwiY2VudGVyWCIsImNlbnRlclkiLCJhbmNob3IiLCJzZXRUbyIsInByb2dyZXNzIiwiY2FjaGVLZXkiLCJzdWNjZXNzIiwidG90YWxMb2FkZWQiLCJ0b3RhbEZpbGVzIiwic2l6ZSIsImJpdG1hcCIsIkJpdG1hcERhdGEiLCJjdHgiLCJiZWdpblBhdGgiLCJmaWxsU3R5bGUiLCJtb3ZlVG8iLCJsaW5lVG8iLCJjYWNoZSIsImFkZEJpdG1hcERhdGEiLCJDb2xvclNldCIsImdyYWRpdGlvbiIsInJuZCIsInBpY2siLCJHUkFEQVRJT05TIiwiVHJpYW5nbGUiLCJ4IiwieSIsImlzUm90YXRlZCIsImNvbG9yU2V0IiwiZ2V0Qml0bWFwRGF0YSIsIndpZHRoIiwiaGVpZ2h0IiwidGludCIsImdldFJhbmRvbUNvbG9yIiwicm90YXRpb24iLCJNYXRoIiwiUEkiLCJpbnB1dEVuYWJsZWQiLCJldmVudHMiLCJvbklucHV0T3ZlciIsImRlbGV0ZSIsInR3ZWVuIiwidG8iLCJhbHBoYSIsImNvbG9yIiwiU3ByaXRlIiwiR2FtZSIsImNyZWF0ZUdyYWRhdGlvbnMiLCJza2V0Y2giLCJjb2xvclNldHMiLCJhbGxHcmFkYXRpb24iLCJBcnJheVV0aWxzIiwic2h1ZmZsZSIsImkiLCJwdXNoIiwiY29uc29sZSIsImxvZyIsIm1hcmdpbiIsInBhZGRpbmciLCJwb3NYIiwicG9zWSIsImV4aXN0aW5nIiwiV0VCR0wiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsU0FBUztBQUNYQyxZQUFVLEdBREM7QUFFWEMsYUFBVyxHQUZBO0FBR1hDLFlBQVUsR0FIQztBQUlYQyxhQUFXO0FBSkEsQ0FBYjs7QUFPQTs7OztBQUlBSixPQUFPSyxJQUFQLEdBQWM7QUFDWkMsWUFBVTtBQURFLENBQWQ7Ozs7Ozs7Ozs7O0lDWE1DOzs7QUFDSixrQkFBYztBQUFBOztBQUFBO0FBRWI7Ozs7OEJBRVMsQ0FFVDs7OzZCQUVRO0FBQ1AsV0FBS0MsS0FBTCxDQUFXQyxxQkFBWCxHQUFtQyxJQUFuQztBQUNBLFdBQUtELEtBQUwsQ0FBV0UsbUJBQVgsR0FBaUMsSUFBakM7QUFDQSxXQUFLQyxJQUFMLENBQVVDLEtBQVYsQ0FBZ0JDLGVBQWhCLEdBQWtDLFNBQWxDO0FBQ0EsV0FBS0MsS0FBTCxDQUFXQyxLQUFYLENBQWlCLFFBQWpCO0FBQ0Q7Ozs7RUFkZ0JDLE9BQU9DOztBQWlCMUJqQixPQUFPTyxJQUFQLEdBQWNBLElBQWQ7Ozs7Ozs7Ozs7O0lDakJNVzs7O0FBQ0osb0JBQWM7QUFBQTs7QUFBQTtBQUViOzs7OzhCQUVTO0FBQ1IsV0FBS0MsZ0JBQUw7O0FBRUEsV0FBS0MsSUFBTCxDQUFVQyxjQUFWLENBQXlCQyxHQUF6QixDQUE2QixLQUFLQyxlQUFsQyxFQUFtRCxJQUFuRDs7QUFFQSxXQUFLQyxnQkFBTDtBQUNEOzs7NkJBRVE7QUFDUCxVQUFJQyxvQkFBb0IsQ0FBeEI7QUFDQSxXQUFLWCxLQUFMLENBQVdDLEtBQVgsQ0FBaUIs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QVcsSUFBSU4sT0FBT3dELFFBQVgsQ0FDYixLQUFLN0MsSUFEUSxFQUViZ0YsSUFGYSxFQUdiQyxJQUhhLEVBSWJqQyxTQUphLEVBS2IsS0FBS2hELElBQUwsQ0FBVTBDLEdBQVYsQ0FBY0MsSUFBZCxDQUFtQixLQUFLMkIsU0FBeEIsQ0FMYSxDQUFmOztBQVFBLGVBQUt0RSxJQUFMLENBQVVXLEdBQVYsQ0FBY3VFLFFBQWQsQ0FBdUJ2RixRQUF2QjtBQUNEO0FBQ0Y7QUFDRjs7OztFQWpFZ0JVLE9BQU9DOztBQW9FMUJqQixPQUFPOEUsSUFBUCxHQUFjQSxJQUFkO0FDcEVBOzs7QUNBQTlFLE9BQU9XLElBQVAsR0FBYyxJQUFJSyxPQUFPOEQsSUFBWCxDQUFnQjlFLE9BQU9HLFFBQXZCLEVBQWlDSCxPQUFPSSxTQUF4QyxFQUFtRFksT0FBTzhFLEtBQTFELENBQWQ7O0FBRUE5RixPQUFPVyxJQUFQLENBQVlHLEtBQVosQ0FBa0JRLEdBQWxCLENBQXNCLE1BQXRCLEVBQThCdEIsT0FBT08sSUFBckM7QUFDQVAsT0FBT1csSUFBUCxDQUFZRyxLQUFaLENBQWtCUSxHQUFsQixDQUFzQixRQUF0QixFQUFnQ3RCLE9BQU9rQixNQUF2QztBQUNBO0FBQ0FsQixPQUFPVyxJQUFQLENBQVlHLEtBQVosQ0FBa0JRLEdBQWxCLENBQXNCLE1BQXRCLEVBQThCdEIsT0FBTzhFLElBQXJDO0FBQ0E7O0FBRUE5RSxPQUFPVyxJQUFQLENBQVlHLEtBQVosQ0FBa0JDLEtBQWxCLENBQXdCLE1BQXhCIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImxldCBFbmdpbmUgPSB7XHJcbiAgbWluV2lkdGg6IDY0MCxcclxuICBtaW5IZWlnaHQ6IDMyMCxcclxuICBtYXhXaWR0aDogODI1LFxyXG4gIG1heEhlaWdodDogNTgwLFxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNwcml0ZSwgQml0bWFwLCBldGMuLi4gY2hhY2hlIGtleXNcclxuICogQHR5cGUge09iamVjdH1cclxuICovXHJcbkVuZ2luZS5rZXlzID0ge1xyXG4gIHRyaWFuZ2xlOiAndHJpYW5nbGUnLFxyXG59XHJcbiIsImNsYXNzIEJvb3QgZXh0ZW5kcyBQaGFzZXIuU3RhdGUge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIHByZWxvYWQoKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgY3JlYXRlKCkge1xyXG4gICAgdGhpcy5zY2FsZS5wYWdlQWxpZ25Ib3Jpem9udGFsbHkgPSB0cnVlO1xyXG4gICAgdGhpcy5zY2FsZS5wYWdlQWxpZ25WZXJ0aWNhbGx5ID0gdHJ1ZTtcclxuICAgIHRoaXMuZ2FtZS5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzAwNjA2NCc7XHJcbiAgICB0aGlzLnN0YXRlLnN0YXJ0KCdMb2FkZXInKTtcclxuICB9XHJcbn1cclxuXHJcbkVuZ2luZS5Cb290ID0gQm9vdDtcclxuIiwiY2xhc3MgTG9hZGVyIGV4dGVuZHMgUGhhc2VyLlN0YXRlIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICBwcmVsb2FkKCkge1xyXG4gICAgdGhpcy5hZGRQcm9ncmVzc0xhYmxlKCk7XHJcblxyXG4gICAgdGhpcy5sb2FkLm9uRmlsZUNvbXBsZXRlLmFkZCh0aGlzLnJlZnJlc2hQcm9ncmVzcywgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5nZW5lcmF0ZVRyaWFuZ2xlKCk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGUoKSB7XHJcbiAgICBsZXQgbnVtYmVyT2ZHcmFkYXRpb24gPSAyO1xyXG4gICAgdGhpcy5zdGF0ZS5zdGFydCgnR2FtZScsIHRydWUsIGZhbHNlLCBudW1iZXJPZkdyYWRhdGlvbik7XHJcbiAgfVxyXG5cclxuICBhZGRQcm9ncmVzc0xhYmxlKCkge1xyXG4gICAgbGV0IHN0eWxlID0ge1xyXG4gICAgICBmb250OiAnNDFweCBPcGVuIFNhbnMnLFxyXG4gICAgICBmaWxsOiAnIzAwRTY3NidcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnByb2dyZXNzTGFibGUgPSB0aGlzLmFkZC50ZXh0KHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYLCB0aGlzLmdhbWUud29ybGQuY2VudGVyWSwgJ0xvYWRpbmc6IDAlICgwLzApJywgc3R5bGUpO1xyXG4gICAgdGhpcy5wcm9ncmVzc0xhYmxlLmFuY2hvci5zZXRUbygwLjUpO1xyXG4gIH1cclxuXHJcbiAgcmVmcmVzaFByb2dyZXNzKHByb2dyZXNzLCBjYWNoZUtleSwgc3VjY2VzcywgdG90YWxMb2FkZWQsIHRvdGFsRmlsZXMpIHtcclxuICAgIHRoaXMucHJvZ3Jlc3NMYWJsZS50ZXh0ID0gYExvYWRpbmcgJHtwcm9ncmVzc30lICgke3RvdGFsTG9hZGVkfS8ke3RvdGFsRmlsZXN9KWA7XHJcbiAgfVxyXG5cclxuICBnZW5lcmF0ZVRyaWFuZ2xlKCkge1xyXG4gICAgY29uc3Qgc2l6ZSA9IDI1NTtcclxuXHJcbiAgICBsZXQgYml0bWFwID0gbmV3IFBoYXNlci5CaXRtYXBEYXRhKHNpemUsIHNpemUpO1xyXG5cclxuICAgIGJpdG1hcC5jdHguYmVnaW5QYXRoKCk7XHJcbiAgICBiaXRtYXAuY3R4LmZpbGxTdHlsZSA9ICd3aGl0ZSc7XHJcbiAgICBiaXRtYXAuY3R4Lm1vdmVUbygwLCBzaXplKTtcclxuICAgIGJpdG1hcC5jdHgubGluZVRvKHNpemUgLyAyLCAwKTtcclxuICAgIGJpdG1hcC5jdHgubGluZVRvKHNpemUsIHNpemUpO1xyXG4gICAgYml0bWFwLmN0eC5saW5lVG8oMCwgc2l6ZSk7XHJcbiAgICBiaXRtYXAuY3R4LmZpbGwoKTtcclxuXHJcbiAgICB0aGlzLmdhbWUuY2FjaGUuYWRkQml0bWFwRGF0YShFbmdpbmUua2V5cy50cmlhbmdsZSwgYml0bWFwKTtcclxuICB9XHJcbn1cclxuXHJcbkVuZ2luZS5Mb2FkZXIgPSBMb2FkZXI7XHJcbiIsbnVsbCwiY2xhc3MgQ29sb3JTZXQge1xyXG4gIC8qKlxyXG4gICAqIENvbG9yIFNldFxyXG4gICAqIEBwYXJhbSAge0FycmF5fSBncmFkaXRpb24gQXJyYXkgb2YgY29sb3JzXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoZ3JhZGl0aW9uKSB7XHJcbiAgICB0aGlzLmdyYWRpdGlvbiA9IGdyYWRpdGlvbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCByYW5kb20gY29sb3IgZnJvbSBzZXRcclxuICAgKiBAcmV0dXJuIHtbdHlwZV19IFtkZXNjcmlwdGlvbl1cclxuICAgKi9cclxuICBnZXRSYW5kb21Db2xvcigpIHtcclxuICAgIHJldHVybiBFbmdpbmUuZ2FtZS5ybmQucGljayh0aGlzLmdyYWRpdGlvbik7XHJcbiAgfVxyXG59XHJcblxyXG5Db2xvclNldC5HUkFEQVRJT05TID0gW1xyXG4gIC8vIGluZGlnb1xyXG4gIFtcclxuICAgIDB4M0Y1MUI1LFxyXG4gICAgMHgzOTQ5QUIsXHJcbiAgICAweDMwM0Y5RixcclxuICAgIDB4MjgzNTkzLFxyXG4gIF0sXHJcbiAgLy8gYmx1ZVxyXG4gIFtcclxuICAgIDB4MjE5NkYzLFxyXG4gICAgMHgxRTg4RTUsXHJcbiAgICAweDE5NzZEMixcclxuICAgIDB4MTU2NUMwLFxyXG4gIF0sXHJcbiAgLy8geWVsbG93XHJcbiAgW1xyXG4gICAgMHhGRkYxNzYsXHJcbiAgICAweEZGRUU1OCxcclxuICAgIDB4RkZFQjNCLFxyXG4gICAgMHhGREQ4MzUsXHJcbiAgXSxcclxuICAvLyBwaW5rXHJcbiAgW1xyXG4gICAgMHhFOTFFNjMsXHJcbiAgICAweEQ4MUI2MCxcclxuICAgIDB4QzIxODVCLFxyXG4gICAgMHhBRDE0NTcsXHJcbiAgXSxcclxuICAvLyBicm93blxyXG4gIFtcclxuICAgIDB4Nzk1NTQ4LFxyXG4gICAgMHg2RDRDNDEsXHJcbiAgICAweDVENDAzNyxcclxuICAgIDB4NEUzNDJFLFxyXG4gIF0sXHJcbiAgLy8gZGVlcG9yYW5nZVxyXG4gIFtcclxuICAgIDB4RkY1NzIyLFxyXG4gICAgMHhGNDUxMUUsXHJcbiAgICAweEU2NEExOSxcclxuICAgIDB4RDg0MzE1LFxyXG4gIF0sXHJcbiAgLy8gZ3JleVxyXG4gIFtcclxuICAgIDB4OUU5RTlFLFxyXG4gICAgMHg3NTc1NzUsXHJcbiAgICAweDYxNjE2MSxcclxuICAgIDB4NDI0MjQyLFxyXG4gIF0sXHJcbiAgLy8gcmVkXHJcbiAgW1xyXG4gICAgMHhGNDQzMzYsXHJcbiAgICAweEU1MzkzNSxcclxuICAgIDB4RDMyRjJGLFxyXG4gICAgMHhDNjI4MjgsXHJcbiAgXSxcclxuXTtcclxuXHJcbkVuZ2luZS5Db2xvclNldCA9IENvbG9yU2V0O1xyXG4iLCJjbGFzcyBUcmlhbmdsZSBleHRlbmRzIFBoYXNlci5TcHJpdGUge1xyXG5cclxuICAvKipcclxuICAgKiBJdCdzIGEgdHJpYW5nbGUsIHlhc2ggaXQncyBub3QgYSBqb2tlXHJcbiAgICogQHBhcmFtICB7UGhhc2VyLkdhbWV9ICBnYW1lICAgICAgW2Rlc2NyaXB0aW9uXVxyXG4gICAqIEBwYXJhbSAge1t0eXBlXX0gIHggICAgICAgICBbZGVzY3JpcHRpb25dXHJcbiAgICogQHBhcmFtICB7W3R5cGVdfSAgeSAgICAgICAgIFtkZXNjcmlwdGlvbl1cclxuICAgKiBAcGFyYW0gIHtCb29sZWFufSBpc1JvdGF0ZWQgW2Rlc2NyaXB0aW9uXVxyXG4gICAqIEBwYXJhbSAge051bWJlcn0gIGNvbG9yICAgICBbZGVzY3JpcHRpb25dXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgaXNSb3RhdGVkLCBjb2xvclNldCkge1xyXG4gICAgc3VwZXIoZ2FtZSwgeCwgeSwgRW5naW5lLmdhbWUuY2FjaGUuZ2V0Qml0bWFwRGF0YShFbmdpbmUua2V5cy50cmlhbmdsZSkpO1xyXG5cclxuICAgIHRoaXMud2lkdGggPSBUcmlhbmdsZS5zaXplO1xyXG4gICAgdGhpcy5oZWlnaHQgPSBUcmlhbmdsZS5zaXplO1xyXG4gICAgdGhpcy5hbmNob3Iuc2V0VG8oMC41KTtcclxuICAgIHRoaXMuY29sb3JTZXQgPSBjb2xvclNldDtcclxuICAgIHRoaXMudGludCA9IHRoaXMuY29sb3JTZXQuZ2V0UmFuZG9tQ29sb3IoKTtcclxuXHJcbiAgICBpZiAoaXNSb3RhdGVkKSB7XHJcbiAgICAgIHRoaXMucm90YXRpb24gPSBNYXRoLlBJO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaW5wdXRFbmFibGVkID0gdHJ1ZTtcclxuICAgIHRoaXMuZXZlbnRzLm9uSW5wdXRPdmVyLmFkZCh0aGlzLmRlbGV0ZSwgdGhpcyk7XHJcbiAgfVxyXG5cclxuICBkZWxldGUoKSB7XHJcbiAgICB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMpXHJcbiAgICAgIC50byh7XHJcbiAgICAgICAgYWxwaGE6IDBcclxuICAgICAgfSlcclxuICAgICAgLnN0YXJ0KCk7XHJcbiAgfVxyXG5cclxuICByZWNvdmVyeShjb2xvcikge1xyXG5cclxuICB9XHJcbn1cclxuXHJcblRyaWFuZ2xlLnNpemUgPSA2NTtcclxuRW5naW5lLlRyaWFuZ2xlID0gVHJpYW5nbGU7XHJcbiIsImNsYXNzIEdhbWUgZXh0ZW5kcyBQaGFzZXIuU3RhdGUge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIGluaXQobnVtYmVyT2ZHcmFkYXRpb24pIHsgICAgXHJcbiAgICAvKipcclxuICAgICAqIE51bWJlciBvZiBjb2xvclNldHMgd2lsbCB1c2UgaW4gdGhpcyBnYW1lIGxldmVsXHJcbiAgICAgKiBAdHlwZSB7W3R5cGVdfVxyXG4gICAgICovXHJcbiAgICB0aGlzLm51bWJlck9mR3JhZGF0aW9uID0gbnVtYmVyT2ZHcmFkYXRpb247XHJcbiAgfVxyXG5cclxuICBjcmVhdGUoKSB7XHJcbiAgICB0aGlzLmdhbWUuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gJyMwMDAnO1xyXG5cclxuICAgIHRoaXMuY3JlYXRlR3JhZGF0aW9ucygpO1xyXG5cclxuICAgIHRoaXMuc2tldGNoKCk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICAvLyB0aGlzLmdhbWUuZGVidWcuaW5wdXRJbmZvKDUwLCA1MCwgJ3JnYigyNTUsIDI1NSwgMjU1KScpO1xyXG4gICAgLy8gdGhpcy5nYW1lLmRlYnVnLmdlb20obmV3IFBoYXNlci5MaW5lKHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYLCAwLCB0aGlzLmdhbWUud29ybGQuY2VudGVyWCwgdGhpcy5nYW1lLmhlaWdodCksICcjOTBDQUY5Jyk7XHJcbiAgICAvLyB0aGlzLmdhbWUuZGVidWcuZ2VvbShuZXcgUGhhc2VyLkxpbmUoMCwgdGhpcy5nYW1lLndvcmxkLmNlbnRlclksIHRoaXMuZ2FtZS53aWR0aCwgdGhpcy5nYW1lLndvcmxkLmNlbnRlclkpLCAnIzkwQ0FGOScpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlR3JhZGF0aW9ucygpIHtcclxuICAgIHRoaXMuY29sb3JTZXRzID0gW107XHJcblxyXG4gICAgbGV0IGFsbEdyYWRhdGlvbiA9IFBoYXNlci5BcnJheVV0aWxzLnNodWZmbGUoQ29sb3JTZXQuR1JBREFUSU9OUyk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm51bWJlck9mR3JhZGF0aW9uOyBpKyspIHtcclxuICAgICAgbGV0IGNvbG9yU2V0ID0gbmV3IENvbG9yU2V0KGFsbEdyYWRhdGlvbltpXSk7XHJcbiAgICAgIHRoaXMuY29sb3JTZXRzLnB1c2goY29sb3JTZXQpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKHRoaXMubnVtYmVyT2ZHcmFkYXRpb24pO1xyXG4gIH1cclxuXHJcbiAgc2tldGNoKCkge1xyXG4gICAgY29uc3QgbWFyZ2luID0gMzI7XHJcbiAgICBjb25zdCBwYWRkaW5nID0gMDtcclxuXHJcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IDI1OyB4KyspIHtcclxuICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCA5OyB5KyspIHtcclxuICAgICAgICBsZXQgcG9zWCA9IG1hcmdpbiArIHggKiAoRW5naW5lLlRyaWFuZ2xlLnNpemUgLyAyICsgcGFkZGluZyAtIDEpO1xyXG4gICAgICAgIGxldCBwb3NZID0gbWFyZ2luICsgeSAqIChFbmdpbmUuVHJpYW5nbGUuc2l6ZSArIHBhZGRpbmcgLSAxKTtcclxuICAgICAgICBsZXQgaXNSb3RhdGVkID0geCAlIDIgPT09IDE7XHJcblxyXG4gICAgICAgIGlmICh5ICUgMiA9PT0gMSkge1xyXG4gICAgICAgICAgaXNSb3RhdGVkID0gIWlzUm90YXRlZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0cmlhbmdsZSA9IG5ldyBFbmdpbmUuVHJpYW5nbGUoXHJcbiAgICAgICAgICB0aGlzLmdhbWUsXHJcbiAgICAgICAgICBwb3NYLFxyXG4gICAgICAgICAgcG9zWSxcclxuICAgICAgICAgIGlzUm90YXRlZCxcclxuICAgICAgICAgIHRoaXMuZ2FtZS5ybmQucGljayh0aGlzLmNvbG9yU2V0cylcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICB0aGlzLmdhbWUuYWRkLmV4aXN0aW5nKHRyaWFuZ2xlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuRW5naW5lLkdhbWUgPSBHYW1lO1xyXG4iLG51bGwsIkVuZ2luZS5nYW1lID0gbmV3IFBoYXNlci5HYW1lKEVuZ2luZS5tYXhXaWR0aCwgRW5naW5lLm1heEhlaWdodCwgUGhhc2VyLldFQkdMKTtcclxuXHJcbkVuZ2luZS5nYW1lLnN0YXRlLmFkZCgnQm9vdCcsIEVuZ2luZS5Cb290KTtcclxuRW5naW5lLmdhbWUuc3RhdGUuYWRkKCdMb2FkZXInLCBFbmdpbmUuTG9hZGVyKTtcclxuLy8gRW5naW5lLmdhbWUuc3RhdGUuYWRkKCdNZW51JywgRW5naW5lLk1lbnUpO1xyXG5FbmdpbmUuZ2FtZS5zdGF0ZS5hZGQoJ0dhbWUnLCBFbmdpbmUuR2FtZSk7XHJcbi8vIEVuZ2luZS5nYW1lLnN0YXRlLmFkZCgnU2NvcmVCb2FyZCcsIEVuZ2luZS5TY29yZUJvYXJkKTtcclxuXHJcbkVuZ2luZS5nYW1lLnN0YXRlLnN0YXJ0KCdCb290Jyk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
