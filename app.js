"use strict";

var Engine = {
  minWidth: 640,
  minHeight: 320,
  maxWidth: 1366,
  maxHeight: 768
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

      // this.load.audio('music1', 'assets/music/Yal!X - Forgiven.mp3');

      this.game.cache.addBitmapData(Engine.Triangle.bitmapKey, Engine.Triangle.generateSprite(this.game));
      this.game.cache.addBitmapData(Engine.Meteor.bitmapKey, Engine.Meteor.generateSprite(this.game));
      this.game.cache.addBitmapData(Engine.Universe.bitmapKey, Engine.Universe.generateSprite(this.game));
      // this.game.cache.addBitmapData(Engine.Wave.bitmapKey, Engine.Wave.generateSprite(this.game));
      var data = Engine.Wave.generateAtlasData();
      this.game.cache.addTextureAtlas('circle', '', data.bitmap.canvas, data.atlasData, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Menu = function (_Phaser$State) {
  _inherits(Menu, _Phaser$State);

  function Menu() {
    _classCallCheck(this, Menu);

    return _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this));
  }

  _createClass(Menu, [{
    key: "create",
    value: function create() {}
  }]);

  return Menu;
}(Phaser.State);
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

    var _this = _possibleConstructorReturn(this, (Meteor.__proto__ || Object.getPrototypeOf(Meteor)).call(this, game, x, y, game.cache.getBitmapData(Meteor.bitmapKey)));

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

Meteor.bitmapKey = 'meteor';

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
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tone = function () {
  function Tone(game) {
    _classCallCheck(this, Tone);

    this.game = game;
    this.current = 0;
  }

  _createClass(Tone, [{
    key: "create",
    value: function create() {}

    /**
     * Up and play next tone
     */

  }, {
    key: "up",
    value: function up() {
      return;
      if (this.current > Tone.count) {
        this.current = Tone.count - 1;
      }

      this.tones[this.current].play();
      this.current++;
    }
  }, {
    key: "low",
    value: function low() {
      return;
      if (this.current < 0) {
        this.current = 0;
      }

      this.tones[this.current].play();
      this.current--;
    }

    /**
     * Reset tone
     */

  }, {
    key: "reset",
    value: function reset() {
      this.current = 0;
    }
  }]);

  return Tone;
}();

Tone.count = 10;
Engine.Tone = Tone;
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

    var _this = _possibleConstructorReturn(this, (Triangle.__proto__ || Object.getPrototypeOf(Triangle)).call(this, game, x, y, Engine.game.cache.getBitmapData(Triangle.bitmapKey)));

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

      var dalay = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

      if (this.game.input.activePointer.isDown) {
        this.game.add.tween(this).to({
          width: 0,
          height: 0,
          alpha: 0
        }, Triangle.animationTimeDelete).delay(dalay).start().onComplete.add(function () {
          _this2.events.deleteComplete.dispatch(_this2);
        }, this);
      }
    }
  }, {
    key: 'recover',
    value: function recover(colorSet) {
      var animationTime = this.game.rnd.between(250, 300);

      this.colorSet = colorSet;
      this.tint = this.colorSet.getRandomColor();
      this.width = Triangle.size;
      this.height = Triangle.size;
      this.selected = false;

      this.game.add.tween(this).to({
        alpha: 1
      }, animationTime, Phaser.Easing.Linear.None).start();
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
  }, {
    key: 'growUp',
    value: function growUp() {
      var delay = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

      var time = 300 + this.game.rnd.between(-50, 50);

      this.width = 0;
      this.height = 0;
      this.alpha = 0;

      this.game.add.tween(this).to({
        width: Triangle.size,
        height: Triangle.size,
        alpha: 1
      }, time).delay(delay).start();
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
Triangle.animationTimeDelete = 150;
Triangle.bitmapKey = 'triangle';

Engine.Triangle = Triangle;
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Universe = function (_Phaser$Sprite) {
  _inherits(Universe, _Phaser$Sprite);

  function Universe(game) {
    var rotationSpeed = arguments.length <= 1 || arguments[1] === undefined ? 2.5 : arguments[1];

    _classCallCheck(this, Universe);

    var _this = _possibleConstructorReturn(this, (Universe.__proto__ || Object.getPrototypeOf(Universe)).call(this, game, game.width / 2, game.height / 2, game.cache.getBitmapData(Universe.bitmapKey)));

    _this.anchor.setTo(0.5);

    /**
     * Deegre/Sec
     * @type {[type]}
     */
    _this.rotationSpeed = rotationSpeed;
    _this.rotation = _this.game.rnd.realInRange(0, Math.PI * 2);
    return _this;
  }

  _createClass(Universe, [{
    key: 'update',
    value: function update() {
      this.rotation += Math.PI / 1800 / 60 * this.rotationSpeed;
    }
  }, {
    key: 'resize',
    value: function resize() {
      this.x = this.game.width / 2;
      this.y = this.game.height / 2;
    }
  }], [{
    key: 'generateSprite',
    value: function generateSprite() {
      var maxStarSize = 4;
      var minStarSize = 1;
      var bitmapSize = Math.sqrt(Math.pow(window.screen.availWidth, 2) + Math.pow(window.screen.availHeight, 2));
      var stars = 300;

      var bitmap = Engine.game.make.bitmapData(bitmapSize, bitmapSize);
      bitmap.ctx.fillStyle = 'white';

      for (var i = 0; i < stars; i++) {
        var starSize = Engine.game.rnd.between(minStarSize, maxStarSize);
        var x = Engine.game.rnd.between(0, bitmapSize);
        var y = Engine.game.rnd.between(0, bitmapSize);

        bitmap.ctx.rect(x, y, starSize, starSize);
        bitmap.ctx.fill();
      }

      return bitmap;
    }
  }]);

  return Universe;
}(Phaser.Sprite);

Universe.bitmapKey = 'universe';

Engine.Universe = Universe;
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Wave = function (_Phaser$Sprite) {
  _inherits(Wave, _Phaser$Sprite);

  function Wave(game, x, y) {
    _classCallCheck(this, Wave);

    var _this = _possibleConstructorReturn(this, (Wave.__proto__ || Object.getPrototypeOf(Wave)).call(this, game, x, y, 'circle', 0));

    _this.anchor.setTo(0.5);

    _this.alpha = 0;
    _this.width = Engine.Triangle.size / 2;
    _this.height = Engine.Triangle.size / 2;
    return _this;
  }

  _createClass(Wave, [{
    key: 'playAnimation',
    value: function playAnimation(x, y) {
      var _this2 = this;

      this.alpha = 1;
      this.x = x;
      this.y = y;
      this.frame = 0;
      this.width = Engine.Triangle.size / 2;
      this.height = Engine.Triangle.size / 2;

      var tweenSize = this.game.add.tween(this).to({
        width: Engine.Triangle.size * 4,
        height: Engine.Triangle.size * 4
      }, 200);

      window.test = 0;
      var tweenDestroy = this.game.add.tween(this).to({ alpha: 0 }, 200).onUpdateCallback(function () {
        if (_this2.frame === Wave.countFrameAnimation - 1) {
          _this2.alpha = 0;
        }
        _this2.frame++;
      }, this);

      tweenSize.chain(tweenDestroy);
      tweenSize.start();
    }
  }], [{
    key: 'generateAtlasData',
    value: function generateAtlasData() {
      var atlasData = {
        frames: []
      };

      var size = Engine.Triangle.size * 4;
      var lineSize = 20;
      var spriteSheetWidth = Wave.countFrameAnimation;

      var bitmap = Engine.game.make.bitmapData(size * spriteSheetWidth, size);
      bitmap.ctx.strokeStyle = '#e9e9e9';

      for (var x = 0; x < spriteSheetWidth; x++) {
        atlasData.frames[x] = {
          frame: {
            x: x * size,
            y: 0,
            w: size,
            h: size
          }
        };

        bitmap.ctx.lineWidth = lineSize / (1 + x);
        bitmap.ctx.moveTo(size + x * size - lineSize / 2, size / 2);

        var radius = size / 2 - lineSize / 2;

        bitmap.ctx.ellipse(size / 2 + x * size, size / 2, radius, radius, 0, 0, Math.PI * 2);
        bitmap.ctx.stroke();
      }

      return {
        bitmap: bitmap,
        atlasData: atlasData
      };
    }
  }]);

  return Wave;
}(Phaser.Sprite);

Wave.bitmapKey = 'wave';
Wave.countFrameAnimation = 12;

Engine.Wave = Wave;
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
       * Tone system manager
       * @type {Engine}
       */
      this.tone = new Engine.Tone(this.game);

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

      this.triangleMatrixWidth = 26;
      this.triangleMatrixHeight = 9;
    }
  }, {
    key: 'create',
    value: function create() {
      this.game.stage.backgroundColor = '#000';

      this.createUniverse();
      this.createGradations();

      this.triangleGroup = this.game.add.group();

      this.tone.create();

      this.sketch();
      this.initEvents();
      this.createWave();
      this.createSounds();
      this.createHintTimer();
      this.createScoreLable();
      this.initializationFullScreen();

      this.createMeteor();

      this.forcePortrait = true;
    }
  }, {
    key: 'render',
    value: function render() {}
  }, {
    key: 'update',
    value: function update() {}
  }, {
    key: 'createSounds',
    value: function createSounds() {
      // this.music1 = this.game.sound.add('music1', 1, true);
      // this.music1.play();
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
      /**
       * Rotation speed for second universe
       * @type {Number}
       */
      var secondRotationSpeed = 5;

      this.universeFirst = new Engine.Universe(this.game);
      this.universeSecond = new Engine.Universe(this.game, secondRotationSpeed);

      this.game.add.existing(this.universeFirst);
      this.game.add.existing(this.universeSecond);
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
    key: 'createWave',
    value: function createWave() {
      this.wave = new Engine.Wave(this.game, 0, 0);

      this.game.add.existing(this.wave);
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
      var delayForDisplay = 500;

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

          triangle.growUp(delayForDisplay + (x + y) * 25);

          triangle.events.onInputOver.add(this.selectTriangle, this);
          triangle.events.onInputDown.add(this.selectTriangle, this);
          triangle.events.deleteComplete.add(this.recoverTriangle, this);

          this.trianglesMatrix[x][y] = triangle;
          // this.add.existing(triangle);
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
      this.tone.reset();

      var isUnselect = this.selectedTriangles.length < this.minTrianglesDestroy;

      if (!isUnselect) {
        this.updateScore(Math.pow(this.selectedTriangles.length, 2.15) * 10);
        this.shakeItShakeIt();
        this.hintTimer.stop(false);
        this.hintTimer.start();
      }

      for (var i = 0; this.selectedTriangles.length > 0; i++) {
        var betweenAnimationDalay = 25;

        var triangle = this.selectedTriangles.shift();

        if (isUnselect) {
          triangle.unselect();
        } else {
          triangle.delete(i * betweenAnimationDalay);
          if (this.selectedTriangles.length === 0) {
            this.wave.playAnimation(triangle.world.x, triangle.world.y, triangle.isRotated);
          }
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
        this.tone.up();
        this.selectedTriangles.push(triangle);
      } else {
        var lastSelectedTriangle = this.selectedTriangles[this.selectedTriangles.length - 1];
        var preLastSelectedTriangle = this.selectedTriangles[this.selectedTriangles.length - 2];

        if (triangle.selected && triangle === preLastSelectedTriangle) {
          lastSelectedTriangle.unselect();
          this.tone.low();
          this.selectedTriangles.pop();
        } else if (!triangle.selected && this.canTriangleLink(lastSelectedTriangle, triangle) && lastSelectedTriangle.colorSet === triangle.colorSet) {
          triangle.select();
          this.tone.up();
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
      var color = '#00E676'; // + Phaser.Color.componentToHex(randomColorSet.getLastColor());
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

      this.universeFirst.resize();
      this.universeSecond.resize();

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
      // if (!this.getSomeCombination().length) {
      var delayDestroy = 5000;
      var timer = this.game.time.create();

      timer.add(delayDestroy, this.rebuildMap, this);
      timer.start(0);
      // }
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
  }, {
    key: 'shakeItShakeIt',
    value: function shakeItShakeIt() {
      var x = this.triangleGroup.x;
      var y = this.triangleGroup.y;
      var amplitudeY = 0.75;
      var amplitudeX = 2;
      var timeAnimation = 20;

      this.add.tween(this.triangleGroup).to({
        x: x + amplitudeX, y: y + amplitudeY
      }, timeAnimation, Phaser.Easing.Linear.None).to({
        x: x - amplitudeX, y: y - amplitudeY
      }, timeAnimation, Phaser.Easing.Linear.None).to({
        x: x, y: y
      }, timeAnimation, Phaser.Easing.Linear.None).start();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS5qcyIsImJvb3QuanMiLCJsb2FkZXIuanMiLCJtZW51LmpzIiwiY29sb3JzZXQuanMiLCJtZXRlb3IuanMiLCJzY29yZWxhYmxlLmpzIiwidG9uZS5qcyIsInRyaWFuZ2xlLmpzIiwidW5pdmVyc2UuanMiLCJ3YXZlLmpzIiwiZ2FtZS5qcyIsInNjb3JlYm9hcmQuanMiLCJhcHAuanMiXSwibmFtZXMiOlsiRW5naW5lIiwibWluV2lkdGgiLCJtaW5IZWlnaHQiLCJtYXhXaWR0aCIsIm1heEhlaWdodCIsIkJvb3QiLCJnYW1lIiwic3RhZ2UiLCJkaXNhYmxlVmlzaWJpbGl0eUNoYW5nZSIsInNjYWxlIiwicGFnZUFsaWduSG9yaXpvbnRhbGx5IiwicGFnZUFsaWduVmVydGljYWxseSIsInN0YXRlIiwic3RhcnQiLCJQaGFzZXIiLCJTdGF0ZSIsIkxvYWRlciIsImJhY2tncm91bmRDb2xvciIsImFkZFByb2dyZXNzTGFibGUiLCJsb2FkIiwib25GaWxlQ29tcGxldGUiLCJhZGQiLCJyZWZyZXNoUHJvZ3Jlc3MiLCJjYWNoZSIsImFkZEJpdG1hcERhdGEiLCJUcmlhbmdsZSIsImJpdG1hcEtleSIsImdlbmVyYXRlU3ByaXRlIiwiTWV0ZW9yIiwiVW5pdmVyc2UiLCJkYXRhIiwiV2F2ZSIsImdlbmVyYXRlQXRsYXNEYXRhIiwiYWRkVGV4dHVyZUF0bGFzIiwiYml0bWFwIiwiY2FudmFzIiwiYXRsYXNEYXRhIiwiVEVYVFVSRV9BVExBU19KU09OX0hBU0giLCJudW1iZXJPZkdyYWRhdGlvbiIsInN0eWxlIiwiZm9udCIsImZpbGwiLCJwcm9ncmVzc0xhYmxlIiwidGV4dCIsIndvcmxkIiwiY2VudGVyWCIsImNlbnRlclkiLCJhbmNob3IiLCJzZXRUbyIsInByb2dyZXNzIiwiY2FjaGVLZXkiLCJzdWNjZXNzIiwidG90YWxMb2FkZWQiLCJ0b3RhbEZpbGVzIiwiTWVudSIsIkNvbG9yU2V0IiwiZ3JhZGl0aW9uIiwicm5kIiwicGljayIsIm51bWJlciIsImxlbmd0aCIsIkdSQURBVElPTlMiLCJ4IiwieSIsInJvdGF0aW9uIiwic3BlZWQiLCJnZXRCaXRtYXBEYXRhIiwicmVmcmVzaFJvdGF0aW9uIiwidmVsb2NpdHlYIiwiTWF0aCIsImNvcyIsInZlbG9jaXR5WSIsInNpbiIsImFsaXZlIiwid2lkdGgiLCJoZWlnaHQiLCJiaXRtYXBEYXRhIiwiZ3JhZGllbnQiLCJjdHgiLCJjcmVhdGVMaW5lYXJHcmFkaWVudCIsImFkZENvbG9yU3RvcCIsImJlZ2luUGF0aCIsImZpbGxTdHlsZSIsInJlY3QiLCJTcHJpdGUiLCJTY29yZUxhYmxlIiwic2NvcmUiLCJyb3VuZCIsImV4aXN0aW5nIiwidHdlZW5zIiwicmVtb3ZlIiwidHdlZW4iLCJ0byIsImFuaW1hdGlvbkNoYW5nZVZhbCIsIm9uVXBkYXRlQ2FsbGJhY2siLCJvbkNvbXBsZXRlIiwiVGV4dCIsIlRvbmUiLCJjdXJyZW50IiwiY291bnQiLCJ0b25lcyIsInBsYXkiLCJpc1JvdGF0ZWQiLCJjb2xvclNldCIsIm1hdHJpeFBvc2l0aW9uIiwic2l6ZSIsInRpbnQiLCJnZXRSYW5kb21Db2xvciIsIm1hdHJpeFBvcyIsImlucHV0RW5hYmxlZCIsImlucHV0IiwicGl4ZWxQZXJmZWN0T3ZlciIsInBpeGVsUGVyZmVjdENsaWNrIiwiZXZlbnRzIiwiZGVsZXRlQ29tcGxldGUiLCJTaWduYWwiLCJzZWxlY3RlZCIsIlBJIiwiYWRkQ2hpbGQiLCJhbmltYXRpb25UaW1lU2VsZWN0IiwiZGFsYXkiLCJhY3RpdmVQb2ludGVyIiwiaXNEb3duIiwiYWxwaGEiLCJhbmltYXRpb25UaW1lRGVsZXRlIiwiZGVsYXkiLCJkaXNwYXRjaCIsImFuaW1hdGlvblRpbWUiLCJiZXR3ZWVuIiwiRWFzaW5nIiwiTGluZWFyIiwiTm9uZSIsImhpZGVUd2VlbiIsInNob3dUd2VlbiIsImNoYWluIiwibGFzdENvbG9yIiwiYmxpbmtzIiwib25TdGFydCIsInB1c2giLCJsYXN0QmxpbmsiLCJ0aW1lIiwibW92ZVRvIiwibGluZVRvIiwicm90YXRpb25TcGVlZCIsInJlYWxJblJhbmdlIiwibWF4U3RhclNpemUiLCJtaW5TdGFyU2l6ZSIsImJpdG1hcFNpemUiLCJzcXJ0IiwicG93Iiwid2luZG93Iiwic2NyZWVuIiwiYXZhaWxXaWR0aCIsImF2YWlsSGVpZ2h0Iiwic3RhcnMiLCJtYWtlIiwiaSIsInN0YXJTaXplIiwiZnJhbWUiLCJ0d2VlblNpemUiLCJ0ZXN0IiwidHdlZW5EZXN0cm95IiwiY291bnRGcmFtZUFuaW1hdGlvbiIsImZyYW1lcyIsImxpbmVTaXplIiwic3ByaXRlU2hlZXRXaWR0aCIsInN0cm9rZVN0eWxlIiwidyIsImgiLCJsaW5lV2lkdGgiLCJyYWRpdXMiLCJlbGxpcHNlIiwic3Ryb2tlIiwiR2FtZSIsImdnIiwiY29sb3JTZXRzIiwidG9uZSIsIm1hcmdpblRvcCIsIm1hcmdpbkxlZnQiLCJtaW5UcmlhbmdsZXNEZXN0cm95IiwidHJpYW5nbGVzTWF0cml4Iiwic2VsZWN0ZWRUcmlhbmdsZXMiLCJ0cmlhbmdsZU1hdHJpeFdpZHRoIiwidHJpYW5nbGVNYXRyaXhIZWlnaHQiLCJjcmVhdGVVbml2ZXJzZSIsImNyZWF0ZUdyYWRhdGlvbnMiLCJ0cmlhbmdsZUdyb3VwIiwiZ3JvdXAiLCJjcmVhdGUiLCJza2V0Y2giLCJpbml0RXZlbnRzIiwiY3JlYXRlV2F2ZSIsImNyZWF0ZVNvdW5kcyIsImNyZWF0ZUhpbnRUaW1lciIsImNyZWF0ZVNjb3JlTGFibGUiLCJpbml0aWFsaXphdGlvbkZ1bGxTY3JlZW4iLCJjcmVhdGVNZXRlb3IiLCJmb3JjZVBvcnRyYWl0IiwiYWxsR3JhZGF0aW9uIiwiQXJyYXlVdGlscyIsInNodWZmbGUiLCJzZWNvbmRSb3RhdGlvblNwZWVkIiwidW5pdmVyc2VGaXJzdCIsInVuaXZlcnNlU2Vjb25kIiwiaGludFRpbWVvdXQiLCJoaW50VGltZXIiLCJsb29wIiwidmlzdWFsaXNhdGlvbkhpbnQiLCJtZXRlb3JUaW1lckRlbGF5IiwibWV0ZW9yIiwic2VuZFRvQmFjayIsIm91dE9mQ2FtZXJhQm91bmRzS2lsbCIsImtpbGwiLCJtZXRlb3JUaW1lciIsInJ1bk1ldGVvciIsIndhdmUiLCJtYXJnaW5YIiwibWFyZ2luWSIsIm1hcmdpblJvdGF0aW9uIiwic2lkZSIsInJlc2V0IiwidHJpYW5nbGUiLCJnZXRIaW50VHJpYW5nbGUiLCJ1bmRlZmluZWQiLCJoaW50TWUiLCJvblVwIiwiZGVzdHJveVRyaWFuZ2xlIiwiZGVsYXlGb3JEaXNwbGF5IiwicG9zWCIsInBvc1kiLCJncm93VXAiLCJvbklucHV0T3ZlciIsInNlbGVjdFRyaWFuZ2xlIiwib25JbnB1dERvd24iLCJyZWNvdmVyVHJpYW5nbGUiLCJjZW50ZXJpbmdNYXRyaXgiLCJpc1Vuc2VsZWN0IiwidXBkYXRlU2NvcmUiLCJzaGFrZUl0U2hha2VJdCIsInN0b3AiLCJiZXR3ZWVuQW5pbWF0aW9uRGFsYXkiLCJzaGlmdCIsInVuc2VsZWN0IiwiZGVsZXRlIiwicGxheUFuaW1hdGlvbiIsInRpbWVyRXhpc3RNb3ZlIiwiYW5pbWF0aW9uVGltZVJlY292ZXIiLCJwcm9jZXNzUG9zaXRpb24iLCJyZWNvdmVyIiwicG9pbnQiLCJzZWxlY3QiLCJ1cCIsImxhc3RTZWxlY3RlZFRyaWFuZ2xlIiwicHJlTGFzdFNlbGVjdGVkVHJpYW5nbGUiLCJsb3ciLCJwb3AiLCJjYW5UcmlhbmdsZUxpbmsiLCJ0cjEiLCJ0cjIiLCJyYW5kb21Db2xvclNldCIsImNvbG9yIiwibWFyZ2luUmlnaHQiLCJmb250U3R5bGUiLCJzY29yZUxhYmxlIiwidG9nZ2xlRnVsbFNjcmVlbiIsImZ1bGxTY3JlZW5TY2FsZU1vZGUiLCJTY2FsZU1hbmFnZXIiLCJSRVNJWkUiLCJvbkZ1bGxTY3JlZW5DaGFuZ2UiLCJyZXNpemVTY3JlZW4iLCJpc0Z1bGxTY3JlZW4iLCJzdG9wRnVsbFNjcmVlbiIsInN0YXJ0RnVsbFNjcmVlbiIsInZhbCIsImNoYW5nZVZhbHVlIiwicmVzaXplIiwiaGFsZlRyaWFuZ2xlU2l6ZSIsInRpbWVEZWxheSIsInVwZGF0ZUNvbG9yIiwiZGVsYXlEZXN0cm95IiwidGltZXIiLCJyZWJ1aWxkTWFwIiwiZ2V0U29tZUNvbWJpbmF0aW9uIiwidXNlZENlbGwiLCJ0cmlhbmdsZXMiLCJoYXNDb21iaW5hdGlvbiIsImNudCIsImFtcGxpdHVkZVkiLCJhbXBsaXR1ZGVYIiwidGltZUFuaW1hdGlvbiIsIkFVVE8iXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSUEsU0FBUztBQUNYQyxZQUFVLEdBREM7QUFFWEMsYUFBVyxHQUZBO0FBR1hDLFlBQVUsSUFIQztBQUlYQyxhQUFXO0FBSkEsQ0FBYjs7Ozs7Ozs7Ozs7SUNBTUM7OztBQUNKLGtCQUFjO0FBQUE7O0FBQUE7QUFFYjs7Ozs4QkFFUyxDQUVUOzs7NkJBRVE7QUFDUCxXQUFLQyxJQUFMLENBQVVDLEtBQVYsQ0FBZ0JDLHVCQUFoQixHQUEwQyxJQUExQztBQUNBLFdBQUtDLEtBQUwsQ0FBV0MscUJBQVgsR0FBbUMsSUFBbkM7QUFDQSxXQUFLRCxLQUFMLENBQVdFLG1CQUFYLEdBQWlDLElBQWpDO0FBQ0EsV0FBS0MsS0FBTCxDQUFXQyxLQUFYLENBQWlCLFFBQWpCO0FBQ0Q7Ozs7RUFkZ0JDLE9BQU9DOztBQWlCMUJmLE9BQU9LLElBQVAsR0FBY0EsSUFBZDs7Ozs7Ozs7Ozs7SUNqQk1XOzs7QUFDSixvQkFBYztBQUFBOztBQUFBO0FBRWI7Ozs7OEJBRVM7QUFDUixXQUFLVixJQUFMLENBQVVDLEtBQVYsQ0FBZ0JVLGVBQWhCLEdBQWtDLE1BQWxDO0FBQ0EsV0FBS0MsZ0JBQUw7O0FBRUEsV0FBS0MsSUFBTCxDQUFVQyxjQUFWLENBQXlCQyxHQUF6QixDQUE2QixLQUFLQyxlQUFsQyxFQUFtRCxJQUFuRDs7QUFFQTs7QUFFQSxXQUFLaEIsSUFBTCxDQUFVaUIsS0FBVixDQUFnQkMsYUFBaEIsQ0FBOEJ4QixPQUFPeUIsUUFBUCxDQUFnQkMsU0FBOUMsRUFBeUQxQixPQUFPeUIsUUFBUCxDQUFnQkUsY0FBaEIsQ0FBK0IsS0FBS3JCLElBQXBDLENBQXpEO0FBQ0EsV0FBS0EsSUFBTCxDQUFVaUIsS0FBVixDQUFnQkMs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LENBT007QUFDRjlCLFlBREUsRUFDQ0M7QUFERCxPQVBOLEVBU0trTyxhQVRMLEVBU29CblIsT0FBT21ILE1BQVAsQ0FBY0MsTUFBZCxDQUFxQkMsSUFUekMsRUFVR3RILEtBVkg7QUFZRDs7OztFQXhmZ0JDLE9BQU9DOztBQTJmMUJmLE9BQU82SyxJQUFQLEdBQWNBLElBQWQ7QUMzZkE7OztBQ0FBN0ssT0FBT00sSUFBUCxHQUFjLElBQUlRLE9BQU8rSixJQUFYLENBQWdCN0ssT0FBT0csUUFBdkIsRUFBaUNILE9BQU9JLFNBQXhDLEVBQW1EVSxPQUFPb1IsSUFBMUQsQ0FBZDs7QUFFQWxTLE9BQU9NLElBQVAsQ0FBWU0sS0FBWixDQUFrQlMsR0FBbEIsQ0FBc0IsTUFBdEIsRUFBOEJyQixPQUFPSyxJQUFyQztBQUNBTCxPQUFPTSxJQUFQLENBQVlNLEtBQVosQ0FBa0JTLEdBQWxCLENBQXNCLFFBQXRCLEVBQWdDckIsT0FBT2dCLE1BQXZDO0FBQ0E7QUFDQWhCLE9BQU9NLElBQVAsQ0FBWU0sS0FBWixDQUFrQlMsR0FBbEIsQ0FBc0IsTUFBdEIsRUFBOEJyQixPQUFPNkssSUFBckM7QUFDQTs7QUFFQTdLLE9BQU9NLElBQVAsQ0FBWU0sS0FBWixDQUFrQkMsS0FBbEIsQ0FBd0IsTUFBeEIiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsibGV0IEVuZ2luZSA9IHtcclxuICBtaW5XaWR0aDogNjQwLFxyXG4gIG1pbkhlaWdodDogMzIwLFxyXG4gIG1heFdpZHRoOiAxMzY2LFxyXG4gIG1heEhlaWdodDogNzY4LFxyXG59O1xyXG4iLCJjbGFzcyBCb290IGV4dGVuZHMgUGhhc2VyLlN0YXRlIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICBwcmVsb2FkKCkge1xyXG5cclxuICB9XHJcblxyXG4gIGNyZWF0ZSgpIHtcclxuICAgIHRoaXMuZ2FtZS5zdGFnZS5kaXNhYmxlVmlzaWJpbGl0eUNoYW5nZSA9IHRydWU7XHJcbiAgICB0aGlzLnNjYWxlLnBhZ2VBbGlnbkhvcml6b250YWxseSA9IHRydWU7XHJcbiAgICB0aGlzLnNjYWxlLnBhZ2VBbGlnblZlcnRpY2FsbHkgPSB0cnVlO1xyXG4gICAgdGhpcy5zdGF0ZS5zdGFydCgnTG9hZGVyJyk7XHJcbiAgfVxyXG59XHJcblxyXG5FbmdpbmUuQm9vdCA9IEJvb3Q7XHJcbiIsImNsYXNzIExvYWRlciBleHRlbmRzIFBoYXNlci5TdGF0ZSB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgcHJlbG9hZCgpIHtcclxuICAgIHRoaXMuZ2FtZS5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzAwMCc7XHJcbiAgICB0aGlzLmFkZFByb2dyZXNzTGFibGUoKTtcclxuXHJcbiAgICB0aGlzLmxvYWQub25GaWxlQ29tcGxldGUuYWRkKHRoaXMucmVmcmVzaFByb2dyZXNzLCB0aGlzKTtcclxuXHJcbiAgICAvLyB0aGlzLmxvYWQuYXVkaW8oJ211c2ljMScsICdhc3NldHMvbXVzaWMvWWFsIVggLSBGb3JnaXZlbi5tcDMnKTtcclxuXHJcbiAgICB0aGlzLmdhbWUuY2FjaGUuYWRkQml0bWFwRGF0YShFbmdpbmUuVHJpYW5nbGUuYml0bWFwS2V5LCBFbmdpbmUuVHJpYW5nbGUuZ2VuZXJhdGVTcHJpdGUodGhpcy5nYW1lKSk7XHJcbiAgICB0aGlzLmdhbWUuY2FjaGUuYWRkQml0bWFwRGF0YShFbmdpbmUuTWV0ZW9yLmJpdG1hcEtleSwgRW5naW5lLk1ldGVvci5nZW5lcmF0ZVNwcml0ZSh0aGlzLmdhbWUpKTtcclxuICAgIHRoaXMuZ2FtZS5jYWNoZS5hZGRCaXRtYXBEYXRhKEVuZ2luZS5Vbml2ZXJzZS5iaXRtYXBLZXksIEVuZ2luZS5Vbml2ZXJzZS5nZW5lcmF0ZVNwcml0ZSh0aGlzLmdhbWUpKTtcclxuICAgIC8vIHRoaXMuZ2FtZS5jYWNoZS5hZGRCaXRtYXBEYXRhKEVuZ2luZS5XYXZlLmJpdG1hcEtleSwgRW5naW5lLldhdmUuZ2VuZXJhdGVTcHJpdGUodGhpcy5nYW1lKSk7XHJcbiAgICBsZXQgZGF0YSA9IEVuZ2luZS5XYXZlLmdlbmVyYXRlQXRsYXNEYXRhKCk7XHJcbiAgICB0aGlzLmdhbWUuY2FjaGUuYWRkVGV4dHVyZUF0bGFzKCdjaXJjbGUnLCAnJywgZGF0YS5iaXRtYXAuY2FudmFzLCBkYXRhLmF0bGFzRGF0YSwgUGhhc2VyLkxvYWRlci5URVhUVVJFX0FUTEFTX0pTT05fSEFTSCk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGUoKSB7XHJcbiAgICBsZXQgbnVtYmVyT2ZHcmFkYXRpb24gPSAzO1xyXG4gICAgdGhpcy5zdGF0ZS5zdGFydCgnR2FtZScsIHRydWUsIGZhbHNlLCBudW1iZXJPZkdyYWRhdGlvbik7XHJcbiAgfVxyXG5cclxuICBhZGRQcm9ncmVzc0xhYmxlKCkge1xyXG4gICAgbGV0IHN0eWxlID0ge1xyXG4gICAgICBmb250OiAnNDFweCBPcGVuIFNhbnMnLFxyXG4gICAgICBmaWxsOiAnIzAwRTY3NicsXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5wcm9ncmVzc0xhYmxlID0gdGhpcy5hZGQudGV4dCh0aGlzLmdhbWUud29ybGQuY2VudGVyWCwgdGhpcy5nYW1lLndvcmxkLmNlbnRlclksICdMb2FkaW5nOiAwJSAoMC8wKScsIHN0eWxlKTtcclxuICAgIHRoaXMucHJvZ3Jlc3NMYWJsZS5hbmNob3Iuc2V0VG8oMC41KTtcclxuICB9XHJcblxyXG4gIHJlZnJlc2hQcm9ncmVzcyhwcm9ncmVzcywgY2FjaGVLZXksIHN1Y2Nlc3MsIHRvdGFsTG9hZGVkLCB0b3RhbEZpbGVzKSB7XHJcbiAgICB0aGlzLnByb2dyZXNzTGFibGUudGV4dCA9IGBMb2FkaW5nICR7cHJvZ3Jlc3N9JSAoJHt0b3RhbExvYWRlZH0vJHt0b3RhbEZpbGVzfSlgO1xyXG4gIH1cclxufVxyXG5cclxuRW5naW5lLkxvYWRlciA9IExvYWRlcjtcclxuIiwiY2xhc3MgTWVudSBleHRlbmRzIFBoYXNlci5TdGF0ZSB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlKCkge1xyXG5cclxuICB9XHJcbn1cclxuIiwiY2xhc3MgQ29sb3JTZXQge1xyXG4gIC8qKlxyXG4gICAqIENvbG9yIFNldFxyXG4gICAqIEBwYXJhbSAge0FycmF5fSBncmFkaXRpb24gQXJyYXkgb2YgY29sb3JzXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoZ3JhZGl0aW9uKSB7XHJcbiAgICB0aGlzLmdyYWRpdGlvbiA9IGdyYWRpdGlvbjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCByYW5kb20gY29sb3IgZnJvbSBzZXRcclxuICAgKiBAcmV0dXJuIHtbdHlwZV19IFtkZXNjcmlwdGlvbl1cclxuICAgKi9cclxuICBnZXRSYW5kb21Db2xvcigpIHtcclxuICAgIHJldHVybiBFbmdpbmUuZ2FtZS5ybmQucGljayh0aGlzLmdyYWRpdGlvbik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgY29sb3IgYnkgbnVtYmVyXHJcbiAgICovXHJcbiAgZ2V0QnlOdW1iZXIobnVtYmVyKSB7XHJcbiAgICByZXR1cm4gdGhpcy5ncmFkaXRpb25bbnVtYmVyXTtcclxuICB9XHJcblxyXG4gIGdldExhc3RDb2xvcigpIHtcclxuICAgIHJldHVybiB0aGlzLmdyYWRpdGlvblt0aGlzLmdyYWRpdGlvbi5sZW5ndGggLSAxXTtcclxuICB9XHJcbn1cclxuXHJcbkNvbG9yU2V0LkdSQURBVElPTlMgPSBbXHJcbiAgLy8gaW5kaWdvXHJcbiAgW1xyXG4gICAgMHgzRjUxQjUsXHJcbiAgICAweDM5NDlBQixcclxuICAgIDB4MzAzRjlGLFxyXG4gICAgMHgyODM1OTMsXHJcbiAgXSxcclxuICAvLyBibHVlXHJcbiAgW1xyXG4gICAgMHgyMTk2RjMsXHJcbiAgICAweDFFODhFNSxcclxuICAgIDB4MTk3NkQyLFxyXG4gICAgMHgxNTY1QzAsXHJcbiAgXSxcclxuICAvLyB5ZWxsb3dcclxuICBbXHJcbiAgICAweEZGRjE3NixcclxuICAgIDB4RkZFRTU4LFxyXG4gICAgMHhGRkVCM0IsXHJcbiAgICAweEZERDgzNSxcclxuICBdLFxyXG4gIC8vIHBpbmtcclxuICBbXHJcbiAgICAweEU5MUU2MyxcclxuICAgIDB4RDgxQjYwLFxyXG4gICAgMHhDMjE4NUIsXHJcbiAgICAweEFEMTQ1NyxcclxuICBdLFxyXG4gIC8vIGJyb3duXHJcbiAgW1xyXG4gICAgMHg3OTU1NDgsXHJcbiAgICAweDZENEM0MSxcclxuICAgIDB4NUQ0MDM3LFxyXG4gICAgMHg0RTM0MkUsXHJcbiAgXSxcclxuICAvLyAvLyBkZWVwb3JhbmdlXHJcbiAgLy8gW1xyXG4gIC8vICAgMHhGRjU3MjIsXHJcbiAgLy8gICAweEY0NTExRSxcclxuICAvLyAgIDB4RTY0QTE5LFxyXG4gIC8vICAgMHhEODQzMTUsXHJcbiAgLy8gXSxcclxuICAvLyBncmV5XHJcbiAgW1xyXG4gICAgMHg5RTlFOUUsXHJcbiAgICAweDc1NzU3NSxcclxuICAgIDB4NjE2MTYxLFxyXG4gICAgMHg0MjQyNDIsXHJcbiAgXSxcclxuICAvLyAvLyByZWRcclxuICAvLyBbXHJcbiAgLy8gICAweEY0NDMzNixcclxuICAvLyAgIDB4RTUzOTM1LFxyXG4gIC8vICAgMHhEMzJGMkYsXHJcbiAgLy8gICAweEM2MjgyOCxcclxuICAvLyBdLFxyXG5dO1xyXG5cclxuRW5naW5lLkNvbG9yU2V0ID0gQ29sb3JTZXQ7XHJcbiIsImNsYXNzIE1ldGVvciBleHRlbmRzIFBoYXNlci5TcHJpdGUge1xyXG4gIGNvbnN0cnVjdG9yKGdhbWUsIHggPSAwLCB5ID0gMCwgcm90YXRpb24gPSAwLCBzcGVlZCA9IDEwMCkge1xyXG4gICAgc3VwZXIoZ2FtZSwgeCwgeSwgZ2FtZS5jYWNoZS5nZXRCaXRtYXBEYXRhKE1ldGVvci5iaXRtYXBLZXkpKTtcclxuXHJcbiAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XHJcbiAgICB0aGlzLmFuY2hvci5zZXRUbygxKTtcclxuICAgIHRoaXMucmVmcmVzaFJvdGF0aW9uKHJvdGF0aW9uKTtcclxuICB9XHJcblxyXG4gIHJlc2V0KHgsIHksIHJvdGF0aW9uKSB7XHJcbiAgICB0aGlzLnJlZnJlc2hSb3RhdGlvbihyb3RhdGlvbik7XHJcblxyXG4gICAgc3VwZXIucmVzZXQoeCwgeSk7XHJcbiAgfVxyXG5cclxuICByZWZyZXNoUm90YXRpb24ocm90YXRpb24pIHtcclxuICAgIHRoaXMucm90YXRpb24gPSByb3RhdGlvbjtcclxuICAgIHRoaXMudmVsb2NpdHlYID0gTWF0aC5jb3Mocm90YXRpb24pICogdGhpcy5zcGVlZDtcclxuICAgIHRoaXMudmVsb2NpdHlZID0gTWF0aC5zaW4ocm90YXRpb24pICogdGhpcy5zcGVlZDtcclxuICB9XHJcblxyXG4gIHVwZGF0ZSgpIHtcclxuICAgIGlmICh0aGlzLmFsaXZlKSB7XHJcbiAgICAgIHRoaXMueCArPSB0aGlzLnZlbG9jaXR5WDtcclxuICAgICAgdGhpcy55ICs9IHRoaXMudmVsb2NpdHlZO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIG5ldyBtZXRlb3Igc3ByaXRlXHJcbiAgICovXHJcbiAgc3RhdGljIGdlbmVyYXRlU3ByaXRlKGdhbWUpIHtcclxuICAgIGNvbnN0IHdpZHRoID0gMTAyNDtcclxuICAgIGNvbnN0IGhlaWdodCA9IDI7XHJcblxyXG4gICAgbGV0IGJpdG1hcCA9IGdhbWUuYWRkLmJpdG1hcERhdGEod2lkdGgsIGhlaWdodCk7XHJcbiAgICBsZXQgZ3JhZGllbnQgPSBiaXRtYXAuY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KDAsIDAsIHdpZHRoLCAwKTtcclxuXHJcbiAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMS4wLCAncmdiYSgyNTUsIDI1NSwgMjU1LCAxKScpO1xyXG4gICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuOCwgJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC40KScpO1xyXG4gICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuNiwgJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC4zKScpO1xyXG4gICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuNCwgJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKScpO1xyXG4gICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuMiwgJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKScpO1xyXG4gICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuMCwgJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMCknKTtcclxuXHJcbiAgICBiaXRtYXAuY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgYml0bWFwLmN0eC5maWxsU3R5bGUgPSBncmFkaWVudDtcclxuICAgIGJpdG1hcC5jdHgucmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgIGJpdG1hcC5jdHguZmlsbCgpO1xyXG5cclxuICAgIHJldHVybiBiaXRtYXA7XHJcbiAgfVxyXG59XHJcblxyXG5NZXRlb3IuYml0bWFwS2V5ID0gJ21ldGVvcic7XHJcblxyXG5FbmdpbmUuTWV0ZW9yID0gTWV0ZW9yO1xyXG4iLCJjbGFzcyBTY29yZUxhYmxlIGV4dGVuZHMgUGhhc2VyLlRleHQge1xyXG4gIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNjb3JlLCBzdHlsZSkge1xyXG4gICAgc3VwZXIoZ2FtZSwgeCwgeSwgYFNjb3JlOiAke01hdGgucm91bmQoc2NvcmUpfWAsIHN0eWxlKTtcclxuXHJcbiAgICB0aGlzLnNjb3JlID0gc2NvcmU7XHJcblxyXG4gICAgdGhpcy5nYW1lLmFkZC5leGlzdGluZyh0aGlzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSBzY29yZSBsYWJsZSB2YWx1ZVxyXG4gICAqIEBwYXJhbSAge051bWJlcn0gc2NvcmUgTmV3IHNjb3JlXHJcbiAgICovXHJcbiAgY2hhbmdlVmFsdWUoc2NvcmUpIHtcclxuICAgIHRoaXMuZ2FtZS50d2VlbnMucmVtb3ZlKHRoaXMpO1xyXG5cclxuICAgIGxldCB0d2VlbiA9IHRoaXMuZ2FtZS5hZGQudHdlZW4odGhpcylcclxuICAgICAgLnRvKHtcclxuICAgICAgICBzY29yZVxyXG4gICAgICB9LCBTY29yZUxhYmxlLmFuaW1hdGlvbkNoYW5nZVZhbClcclxuICAgICAgLm9uVXBkYXRlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgICAgIHRoaXMudGV4dCA9IGBTY29yZTogJHtNYXRoLnJvdW5kKHRoaXMuc2NvcmUpfWA7XHJcbiAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgIHR3ZWVuLm9uQ29tcGxldGVcclxuICAgICAgLmFkZCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy50ZXh0ID0gYFNjb3JlOiAke01hdGgucm91bmQodGhpcy5zY29yZSl9YDtcclxuICAgICAgfSk7XHJcblxyXG4gICAgdHdlZW4uc3RhcnQoKTtcclxuICB9XHJcbn1cclxuXHJcblNjb3JlTGFibGUuYW5pbWF0aW9uQ2hhbmdlVmFsID0gNTAwO1xyXG5FbmdpbmUuU2NvcmVMYWJsZSA9IFNjb3JlTGFibGU7XHJcbiIsImNsYXNzIFRvbmUge1xyXG4gIGNvbnN0cnVjdG9yKGdhbWUpIHtcclxuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcbiAgICB0aGlzLmN1cnJlbnQgPSAwO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlKCkge1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwIGFuZCBwbGF5IG5leHQgdG9uZVxyXG4gICAqL1xyXG4gIHVwKCkge1xyXG4gICAgcmV0dXJuO1xyXG4gICAgaWYgKHRoaXMuY3VycmVudCA+IFRvbmUuY291bnQpIHtcclxuICAgICAgdGhpcy5jdXJyZW50ID0gVG9uZS5jb3VudCAtIDE7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy50b25lc1t0aGlzLmN1cnJlbnRdLnBsYXkoKTtcclxuICAgIHRoaXMuY3VycmVudCsrO1xyXG4gIH1cclxuXHJcbiAgbG93KCkge1xyXG4gICAgcmV0dXJuO1xyXG4gICAgaWYgKHRoaXMuY3VycmVudCA8IDApIHtcclxuICAgICAgdGhpcy5jdXJyZW50ID0gMDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnRvbmVzW3RoaXMuY3VycmVudF0ucGxheSgpO1xyXG4gICAgdGhpcy5jdXJyZW50LS07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXNldCB0b25lXHJcbiAgICovXHJcbiAgcmVzZXQoKSB7XHJcbiAgICB0aGlzLmN1cnJlbnQgPSAwO1xyXG4gIH1cclxufVxyXG5cclxuVG9uZS5jb3VudCA9IDEwO1xyXG5FbmdpbmUuVG9uZSA9IFRvbmU7XHJcbiIsImNsYXNzIFRyaWFuZ2xlIGV4dGVuZHMgUGhhc2VyLlNwcml0ZSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEl0J3MgYSB0cmlhbmdsZSwgeWFzaCBpdCdzIG5vdCBhIGpva2VcclxuICAgKiBAcGFyYW0gIHtQaGFzZXIuR2FtZX0gIGdhbWUgICAgICBbZGVzY3JpcHRpb25dXHJcbiAgICogQHBhcmFtICB7W3R5cGVdfSAgeCAgICAgICAgIFtkZXNjcmlwdGlvbl1cclxuICAgKiBAcGFyYW0gIHtbdHlwZV19ICB5ICAgICAgICAgW2Rlc2NyaXB0aW9uXVxyXG4gICAqIEBwYXJhbSAge0Jvb2xlYW59IGlzUm90YXRlZCBbZGVzY3JpcHRpb25dXHJcbiAgICogQHBhcmFtICB7TnVtYmVyfSAgY29sb3IgICAgIFtkZXNjcmlwdGlvbl1cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCBpc1JvdGF0ZWQsIGNvbG9yU2V0LCBtYXRyaXhQb3NpdGlvbikge1xyXG4gICAgc3VwZXIoZ2FtZSwgeCwgeSwgRW5naW5lLmdhbWUuY2FjaGUuZ2V0Qml0bWFwRGF0YShUcmlhbmdsZS5iaXRtYXBLZXkpKTtcclxuXHJcbiAgICB0aGlzLndpZHRoID0gVHJpYW5nbGUuc2l6ZTtcclxuICAgIHRoaXMuaGVpZ2h0ID0gVHJpYW5nbGUuc2l6ZTtcclxuICAgIHRoaXMuYW5jaG9yLnNldFRvKDAuNSk7XHJcbiAgICB0aGlzLmNvbG9yU2V0ID0gY29sb3JTZXQ7XHJcbiAgICB0aGlzLnRpbnQgPSB0aGlzLmNvbG9yU2V0LmdldFJhbmRvbUNvbG9yKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQb2l0aW9uIGluIHRoZSBtYXRyaXggb2YgdHJpYW5nbGVzXHJcbiAgICAgKiBAdHlwZSB7W3R5cGVdfVxyXG4gICAgICovXHJcbiAgICB0aGlzLm1hdHJpeFBvcyA9IG1hdHJpeFBvc2l0aW9uO1xyXG5cclxuICAgIHRoaXMuaW5wdXRFbmFibGVkID0gdHJ1ZTtcclxuICAgIHRoaXMuaW5wdXQucGl4ZWxQZXJmZWN0T3ZlciA9IHRydWU7XHJcbiAgICB0aGlzLmlucHV0LnBpeGVsUGVyZmVjdENsaWNrID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLmV2ZW50cy5kZWxldGVDb21wbGV0ZSA9IG5ldyBQaGFzZXIuU2lnbmFsKCk7XHJcblxyXG4gICAgdGhpcy5zZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5pc1JvdGF0ZWQgPSBpc1JvdGF0ZWQ7XHJcblxyXG4gICAgaWYgKGlzUm90YXRlZCkge1xyXG4gICAgICB0aGlzLnJvdGF0aW9uID0gTWF0aC5QSTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB0aGlzLmFkZFRleHRQb3NpdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgYWRkVGV4dFBvc2l0aW9uKCkge1xyXG4gICAgbGV0IHRleHQgPSBuZXcgUGhhc2VyLlRleHQoXHJcbiAgICAgIHRoaXMuZ2FtZSxcclxuICAgICAgVHJpYW5nbGUuc2l6ZSAvIDIsXHJcbiAgICAgIFRyaWFuZ2xlLnNpemUgLyAyLFxyXG4gICAgICBgJHt0aGlzLm1hdHJpeFBvcy54fToke3RoaXMubWF0cml4UG9zLnl9YCxcclxuICAgICAge1xyXG4gICAgICAgIGZvbnQ6ICc2NHB4IE9wZW4gU2FucycsXHJcbiAgICAgICAgZmlsbDogJ2JsYWNrJ1xyXG4gICAgICB9XHJcbiAgICApXHJcblxyXG4gICAgaWYgKHRoaXMuaXNSb3RhdGVkKSB7XHJcbiAgICAgIHRleHQucm90YXRpb24gKz0gTWF0aC5QSTtcclxuICAgICAgdGV4dC55ID0gK3RleHQuaGVpZ2h0O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGV4dC54ID0gLXRleHQud2lkdGggLyAyO1xyXG4gICAgICB0ZXh0LnkgPSAtdGV4dC5oZWlnaHQgLyA0O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYWRkQ2hpbGQodGV4dCk7XHJcbiAgfVxyXG5cclxuICBzZWxlY3QoKSB7XHJcbiAgICBpZiAoIXRoaXMuc2VsZWN0ZWQpIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZCA9IHRydWU7XHJcblxyXG4gICAgICB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMpXHJcbiAgICAgICAgLnRvKHtcclxuICAgICAgICAgIHdpZHRoOiBUcmlhbmdsZS5zaXplIC8gMS41LFxyXG4gICAgICAgICAgaGVpZ2h0OiBUcmlhbmdsZS5zaXplIC8gMS41XHJcbiAgICAgICAgfSwgVHJpYW5nbGUuYW5pbWF0aW9uVGltZVNlbGVjdClcclxuICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgfVxyXG4gIH1cclxuXHJcbiAgdW5zZWxlY3QoKSB7XHJcbiAgICBpZiAodGhpcy5zZWxlY3RlZCkge1xyXG5cclxuICAgICAgdGhpcy5nYW1lLnR3ZWVucy5yZW1vdmUodGhpcyk7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgIHRoaXMuZ2FtZS5hZGQudHdlZW4odGhpcylcclxuICAgICAgICAudG8oe1xyXG4gICAgICAgICAgd2lkdGg6IFRyaWFuZ2xlLnNpemUsXHJcbiAgICAgICAgICBoZWlnaHQ6IFRyaWFuZ2xlLnNpemVcclxuICAgICAgICB9LCBUcmlhbmdsZS5hbmltYXRpb25UaW1lU2VsZWN0KVxyXG4gICAgICAgIC5zdGFydCgpO1xyXG4gICAgICB9XHJcbiAgfVxyXG5cclxuICBkZWxldGUoZGFsYXkgPSAwKSB7XHJcbiAgICBpZiAodGhpcy5nYW1lLmlucHV0LmFjdGl2ZVBvaW50ZXIuaXNEb3duKSB7XHJcbiAgICAgIHRoaXMuZ2FtZS5hZGQudHdlZW4odGhpcylcclxuICAgICAgICAudG8oe1xyXG4gICAgICAgICAgd2lkdGg6IDAsXHJcbiAgICAgICAgICBoZWlnaHQ6IDAsXHJcbiAgICAgICAgICBhbHBoYTogMFxyXG4gICAgICAgIH0sIFRyaWFuZ2xlLmFuaW1hdGlvblRpbWVEZWxldGUpXHJcbiAgICAgICAgLmRlbGF5KGRhbGF5KVxyXG4gICAgICAgIC5zdGFydCgpXHJcbiAgICAgICAgLm9uQ29tcGxldGVcclxuICAgICAgICAuYWRkKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuZXZlbnRzLmRlbGV0ZUNvbXBsZXRlLmRpc3BhdGNoKHRoaXMpO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVjb3Zlcihjb2xvclNldCkge1xyXG4gICAgY29uc3QgYW5pbWF0aW9uVGltZSA9IHRoaXMuZ2FtZS5ybmQuYmV0d2VlbigyNTAsIDMwMCk7XHJcblxyXG4gICAgdGhpcy5jb2xvclNldCA9IGNvbG9yU2V0O1xyXG4gICAgdGhpcy50aW50ID0gdGhpcy5jb2xvclNldC5nZXRSYW5kb21Db2xvcigpO1xyXG4gICAgdGhpcy53aWR0aCA9IFRyaWFuZ2xlLnNpemU7XHJcbiAgICB0aGlzLmhlaWdodCA9IFRyaWFuZ2xlLnNpemU7XHJcbiAgICB0aGlzLnNlbGVjdGVkID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzKVxyXG4gICAgICAudG8oe1xyXG4gICAgICAgIGFscGhhOiAxXHJcbiAgICAgIH0sIGFuaW1hdGlvblRpbWUsIFBoYXNlci5FYXNpbmcuTGluZWFyLk5vbmUpXHJcbiAgICAgIC5zdGFydCgpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlQ29sb3IoY29sb3JTZXQsIGRlbGF5ID0gMCkge1xyXG4gICAgY29uc3QgYW5pbWF0aW9uVGltZSA9IDEwMDA7XHJcbiAgICB0aGlzLmNvbG9yU2V0ID0gY29sb3JTZXQ7XHJcblxyXG4gICAgbGV0IGhpZGVUd2VlbiA9IHRoaXMuZ2FtZS5hZGQudHdlZW4odGhpcylcclxuICAgICAgLnRvKHtcclxuICAgICAgICBhbHBoYTogMFxyXG4gICAgICB9LCBhbmltYXRpb25UaW1lKTtcclxuXHJcbiAgICBsZXQgc2hvd1R3ZWVuID0gdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzKVxyXG4gICAgICAudG8oe1xyXG4gICAgICAgIGFscGhhOiAxXHJcbiAgICAgIH0sIGFuaW1hdGlvblRpbWUpO1xyXG5cclxuICAgIGhpZGVUd2VlblxyXG4gICAgICAub25Db21wbGV0ZVxyXG4gICAgICAuYWRkKCgpID0+IHtcclxuICAgICAgICB0aGlzLnRpbnQgPSB0aGlzLmNvbG9yU2V0LmdldFJhbmRvbUNvbG9yKCk7XHJcbiAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgIGhpZGVUd2Vlbi5kZWxheShkZWxheSk7XHJcblxyXG4gICAgaGlkZVR3ZWVuLmNoYWluKHNob3dUd2Vlbik7XHJcbiAgICBoaWRlVHdlZW4uc3RhcnQoKTtcclxuICB9XHJcblxyXG4gIGJsaW5rKCkge1xyXG4gICAgY29uc3QgbGFzdENvbG9yID0gdGhpcy50aW50O1xyXG4gICAgbGV0IHR3ZWVuID0gdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzKTtcclxuXHJcbiAgICB0d2Vlbi50byh7XHJcbiAgICAgICAgYWxwaGE6IDJcclxuICAgICAgfSwgMTAwKVxyXG4gICAgICAub25Db21wbGV0ZVxyXG4gICAgICAuYWRkKCgpID0+IHtcclxuICAgICAgICB0aGlzLnRpbnQgPSBsYXN0Q29sb3I7XHJcbiAgICAgICAgVHJpYW5nbGUuYmxpbmtzID0gW107XHJcbiAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgIHR3ZWVuLm9uU3RhcnRcclxuICAgICAgLmFkZCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5hbHBoYSA9IDA7XHJcbiAgICAgICAgdGhpcy50aW50ID0gMHgwMEZGMDA7XHJcbiAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgIGlmIChUcmlhbmdsZS5ibGlua3MubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIFRyaWFuZ2xlLmJsaW5rcy5wdXNoKHR3ZWVuKTtcclxuICAgICAgdHdlZW4uc3RhcnQoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxldCBsYXN0QmxpbmsgPSBUcmlhbmdsZS5ibGlua3NbVHJpYW5nbGUuYmxpbmtzLmxlbmd0aCAtIDFdO1xyXG4gICAgICBsYXN0QmxpbmsuY2hhaW4odHdlZW4pO1xyXG4gICAgICBUcmlhbmdsZS5ibGlua3MucHVzaCh0d2Vlbik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBoaW50TWUoKSB7XHJcbiAgICBsZXQgdHdlZW4gPSB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMpXHJcbiAgICAgIC50byh7XHJcbiAgICAgICAgd2lkdGg6IHRoaXMud2lkdGggKiAwLjc1LFxyXG4gICAgICAgIGhlaWdodDogdGhpcy5oZWlnaHQgKiAwLjc1XHJcbiAgICAgIH0sIDIwMClcclxuICAgICAgLnRvKHtcclxuICAgICAgICByb3RhdGlvbjogdGhpcy5yb3RhdGlvbiArIE1hdGguUEkgLyAzMlxyXG4gICAgICB9LCAxMDApXHJcbiAgICAgIC50byh7XHJcbiAgICAgICAgcm90YXRpb246IHRoaXMucm90YXRpb24gLSBNYXRoLlBJICogMiAvIDMyXHJcbiAgICAgIH0sIDEwMClcclxuICAgICAgLnRvKHtcclxuICAgICAgICByb3RhdGlvbjogTWF0aC5QSSAqIHRoaXMuaXNSb3RhdGVkXHJcbiAgICAgIH0sIDEwMClcclxuICAgICAgLnRvKHtcclxuICAgICAgICB3aWR0aDogVHJpYW5nbGUuc2l6ZSxcclxuICAgICAgICBoZWlnaHQ6IFRyaWFuZ2xlLnNpemVcclxuICAgICAgfSwgMjAwKTtcclxuXHJcbiAgICB0d2Vlbi5zdGFydCgpO1xyXG4gIH1cclxuXHJcbiAgZ3Jvd1VwKGRlbGF5ID0gMCkge1xyXG4gICAgY29uc3QgdGltZSA9IDMwMCArIHRoaXMuZ2FtZS5ybmQuYmV0d2VlbigtNTAsIDUwKTtcclxuXHJcbiAgICB0aGlzLndpZHRoID0gMDtcclxuICAgIHRoaXMuaGVpZ2h0ID0gMDtcclxuICAgIHRoaXMuYWxwaGEgPSAwO1xyXG5cclxuICAgIHRoaXMuZ2FtZS5hZGQudHdlZW4odGhpcylcclxuICAgICAgLnRvKHtcclxuICAgICAgICB3aWR0aDogVHJpYW5nbGUuc2l6ZSxcclxuICAgICAgICBoZWlnaHQ6IFRyaWFuZ2xlLnNpemUsXHJcbiAgICAgICAgYWxwaGE6IDFcclxuICAgICAgfSwgdGltZSlcclxuICAgICAgLmRlbGF5KGRlbGF5KVxyXG4gICAgICAuc3RhcnQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBuZXcgdHJpYW5nbGUgc3ByaXRlXHJcbiAgICovXHJcbiAgc3RhdGljIGdlbmVyYXRlU3ByaXRlKGdhbWUpIHtcclxuICAgIGNvbnN0IHNpemUgPSAyNTU7XHJcblxyXG4gICAgbGV0IGJpdG1hcCA9IGdhbWUuYWRkLmJpdG1hcERhdGEoc2l6ZSwgc2l6ZSk7XHJcblxyXG4gICAgYml0bWFwLmN0eC5iZWdpblBhdGgoKTtcclxuICAgIGJpdG1hcC5jdHguZmlsbFN0eWxlID0gJ3doaXRlJztcclxuICAgIGJpdG1hcC5jdHgubW92ZVRvKDAsIHNpemUpO1xyXG4gICAgYml0bWFwLmN0eC5saW5lVG8oc2l6ZSAvIDIsIDApO1xyXG4gICAgYml0bWFwLmN0eC5saW5lVG8oc2l6ZSwgc2l6ZSk7XHJcbiAgICBiaXRtYXAuY3R4LmxpbmVUbygwLCBzaXplKTtcclxuICAgIGJpdG1hcC5jdHguZmlsbCgpO1xyXG5cclxuICAgIHJldHVybiBiaXRtYXA7XHJcbiAgfVxyXG59XHJcblxyXG5UcmlhbmdsZS5zaXplID0gNzE7XHJcblRyaWFuZ2xlLmJsaW5rcyA9IFtdO1xyXG5UcmlhbmdsZS5hbmltYXRpb25UaW1lU2VsZWN0ID0gMjAwO1xyXG5UcmlhbmdsZS5hbmltYXRpb25UaW1lRGVsZXRlID0gMTUwO1xyXG5UcmlhbmdsZS5iaXRtYXBLZXkgPSAndHJpYW5nbGUnO1xyXG5cclxuRW5naW5lLlRyaWFuZ2xlID0gVHJpYW5nbGU7XHJcbiIsImNsYXNzIFVuaXZlcnNlIGV4dGVuZHMgUGhhc2VyLlNwcml0ZSB7XHJcbiAgY29uc3RydWN0b3IoZ2FtZSwgcm90YXRpb25TcGVlZCA9IDIuNSkge1xyXG4gICAgc3VwZXIoZ2FtZSwgZ2FtZS53aWR0aCAvIDIsIGdhbWUuaGVpZ2h0IC8gMiwgZ2FtZS5jYWNoZS5nZXRCaXRtYXBEYXRhKFVuaXZlcnNlLmJpdG1hcEtleSkpO1xyXG4gICAgdGhpcy5hbmNob3Iuc2V0VG8oMC41KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZWdyZS9TZWNcclxuICAgICAqIEB0eXBlIHtbdHlwZV19XHJcbiAgICAgKi9cclxuICAgIHRoaXMucm90YXRpb25TcGVlZCA9IHJvdGF0aW9uU3BlZWQ7XHJcbiAgICB0aGlzLnJvdGF0aW9uID0gdGhpcy5nYW1lLnJuZC5yZWFsSW5SYW5nZSgwLCBNYXRoLlBJICogMik7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2VuZXJhdGVTcHJpdGUoKSB7XHJcbiAgICBjb25zdCBtYXhTdGFyU2l6ZSA9IDQ7XHJcbiAgICBjb25zdCBtaW5TdGFyU2l6ZSA9IDE7XHJcbiAgICBjb25zdCBiaXRtYXBTaXplID0gTWF0aC5zcXJ0KE1hdGgucG93KHdpbmRvdy5zY3JlZW4uYXZhaWxXaWR0aCwgMikgKyBNYXRoLnBvdyh3aW5kb3cuc2NyZWVuLmF2YWlsSGVpZ2h0LCAyKSk7XHJcbiAgICBjb25zdCBzdGFycyA9IDMwMDtcclxuXHJcbiAgICBsZXQgYml0bWFwID0gRW5naW5lLmdhbWUubWFrZS5iaXRtYXBEYXRhKGJpdG1hcFNpemUsIGJpdG1hcFNpemUpO1xyXG4gICAgYml0bWFwLmN0eC5maWxsU3R5bGUgPSAnd2hpdGUnO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RhcnM7IGkrKykge1xyXG4gICAgICBsZXQgc3RhclNpemUgPSBFbmdpbmUuZ2FtZS5ybmQuYmV0d2VlbihtaW5TdGFyU2l6ZSwgbWF4U3RhclNpemUpO1xyXG4gICAgICBsZXQgeCA9IEVuZ2luZS5nYW1lLnJuZC5iZXR3ZWVuKDAsIGJpdG1hcFNpemUpO1xyXG4gICAgICBsZXQgeSA9IEVuZ2luZS5nYW1lLnJuZC5iZXR3ZWVuKDAsIGJpdG1hcFNpemUpO1xyXG5cclxuICAgICAgYml0bWFwLmN0eC5yZWN0KHgsIHksIHN0YXJTaXplLCBzdGFyU2l6ZSk7XHJcbiAgICAgIGJpdG1hcC5jdHguZmlsbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBiaXRtYXA7XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoKSB7XHJcbiAgICB0aGlzLnJvdGF0aW9uICs9IE1hdGguUEkgLyAxODAwIC8gNjAgKiB0aGlzLnJvdGF0aW9uU3BlZWQ7XHJcbiAgfVxyXG5cclxuICByZXNpemUoKSB7XHJcbiAgICB0aGlzLnggPSB0aGlzLmdhbWUud2lkdGggLyAyO1xyXG4gICAgdGhpcy55ID0gdGhpcy5nYW1lLmhlaWdodCAvIDI7XHJcbiAgfVxyXG59XHJcblxyXG5Vbml2ZXJzZS5iaXRtYXBLZXkgPSAndW5pdmVyc2UnO1xyXG5cclxuRW5naW5lLlVuaXZlcnNlID0gVW5pdmVyc2U7XHJcbiIsImNsYXNzIFdhdmUgZXh0ZW5kcyBQaGFzZXIuU3ByaXRlIHtcclxuICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5KSB7XHJcbiAgICBzdXBlcihnYW1lLCB4LCB5LCAnY2lyY2xlJywgMCk7XHJcblxyXG4gICAgdGhpcy5hbmNob3Iuc2V0VG8oMC41KTtcclxuXHJcbiAgICB0aGlzLmFscGhhID0gMDtcclxuICAgIHRoaXMud2lkdGggPSBFbmdpbmUuVHJpYW5nbGUuc2l6ZSAvIDI7XHJcbiAgICB0aGlzLmhlaWdodCA9IEVuZ2luZS5UcmlhbmdsZS5zaXplIC8gMjtcclxuICB9XHJcblxyXG4gIHBsYXlBbmltYXRpb24oeCwgeSkge1xyXG4gICAgdGhpcy5hbHBoYSA9IDE7XHJcbiAgICB0aGlzLnggPSB4O1xyXG4gICAgdGhpcy55ID0geTtcclxuICAgIHRoaXMuZnJhbWUgPSAwO1xyXG4gICAgdGhpcy53aWR0aCA9IEVuZ2luZS5UcmlhbmdsZS5zaXplIC8gMjtcclxuICAgIHRoaXMuaGVpZ2h0ID0gRW5naW5lLlRyaWFuZ2xlLnNpemUgLyAyO1xyXG5cclxuICAgIGxldCB0d2VlblNpemUgPSB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMpXHJcbiAgICAgIC50byh7XHJcbiAgICAgICAgd2lkdGg6IEVuZ2luZS5UcmlhbmdsZS5zaXplICogNCxcclxuICAgICAgICBoZWlnaHQ6IEVuZ2luZS5UcmlhbmdsZS5zaXplICogNCxcclxuICAgICAgfSwgMjAwKTtcclxuXHJcbiAgICB3aW5kb3cudGVzdCA9IDA7XHJcbiAgICBsZXQgdHdlZW5EZXN0cm95ID0gdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzKVxyXG4gICAgICAudG8oe2FscGhhOiAwfSwgMjAwKVxyXG4gICAgICAub25VcGRhdGVDYWxsYmFjaygoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuZnJhbWUgPT09IFdhdmUuY291bnRGcmFtZUFuaW1hdGlvbiAtIDEpIHtcclxuICAgICAgICAgIHRoaXMuYWxwaGEgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZyYW1lKys7XHJcbiAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgIHR3ZWVuU2l6ZS5jaGFpbih0d2VlbkRlc3Ryb3kpO1xyXG4gICAgdHdlZW5TaXplLnN0YXJ0KCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2VuZXJhdGVBdGxhc0RhdGEoKSB7XHJcbiAgICBsZXQgYXRsYXNEYXRhID0ge1xyXG4gICAgICBmcmFtZXM6IFtdXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHNpemUgPSBFbmdpbmUuVHJpYW5nbGUuc2l6ZSAqIDQ7XHJcbiAgICBjb25zdCBsaW5lU2l6ZSA9IDIwO1xyXG4gICAgY29uc3Qgc3ByaXRlU2hlZXRXaWR0aCA9IFdhdmUuY291bnRGcmFtZUFuaW1hdGlvbjtcclxuXHJcbiAgICBsZXQgYml0bWFwID0gRW5naW5lLmdhbWUubWFrZS5iaXRtYXBEYXRhKHNpemUgKiBzcHJpdGVTaGVldFdpZHRoLCBzaXplKTtcclxuICAgIGJpdG1hcC5jdHguc3Ryb2tlU3R5bGUgPSAnI2U5ZTllOSc7XHJcblxyXG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCBzcHJpdGVTaGVldFdpZHRoOyB4KyspIHtcclxuICAgICAgYXRsYXNEYXRhLmZyYW1lc1t4XSA9IHtcclxuICAgICAgICBmcmFtZToge1xyXG4gICAgICAgICAgeDogeCAqIHNpemUsXHJcbiAgICAgICAgICB5OiAwLFxyXG4gICAgICAgICAgdzogc2l6ZSxcclxuICAgICAgICAgIGg6IHNpemUsXHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgYml0bWFwLmN0eC5saW5lV2lkdGggPSBsaW5lU2l6ZSAvICgxICsgeCk7XHJcbiAgICAgIGJpdG1hcC5jdHgubW92ZVRvKHNpemUgKyB4ICogc2l6ZSAtIGxpbmVTaXplIC8gMiwgc2l6ZSAvIDIpO1xyXG5cclxuICAgICAgbGV0IHJhZGl1cyA9IHNpemUgLyAyIC0gbGluZVNpemUgLyAyO1xyXG5cclxuICAgICAgYml0bWFwLmN0eC5lbGxpcHNlKFxyXG4gICAgICAgIHNpemUgLyAyICsgeCAqIHNpemUsXHJcbiAgICAgICAgc2l6ZSAvIDIsXHJcbiAgICAgICAgcmFkaXVzLFxyXG4gICAgICAgIHJhZGl1cyxcclxuICAgICAgICAwLFxyXG4gICAgICAgIDAsXHJcbiAgICAgICAgTWF0aC5QSSAqIDJcclxuICAgICAgKTtcclxuICAgICAgYml0bWFwLmN0eC5zdHJva2UoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBiaXRtYXAsXHJcbiAgICAgIGF0bGFzRGF0YSxcclxuICAgIH07XHJcbiAgfVxyXG59XHJcblxyXG5XYXZlLmJpdG1hcEtleSA9ICd3YXZlJztcclxuV2F2ZS5jb3VudEZyYW1lQW5pbWF0aW9uID0gMTI7XHJcblxyXG5FbmdpbmUuV2F2ZSA9IFdhdmU7XHJcbiIsImNsYXNzIEdhbWUgZXh0ZW5kcyBQaGFzZXIuU3RhdGUge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuXHJcbiAgICB3aW5kb3cuZ2cgPSB0aGlzO1xyXG4gIH1cclxuXHJcbiAgaW5pdChudW1iZXJPZkdyYWRhdGlvbikge1xyXG4gICAgdGhpcy5jb2xvclNldHMgPSBbXTtcclxuICAgIC8qKlxyXG4gICAgICogTnVtYmVyIG9mIGNvbG9yU2V0cyB3aWxsIHVzZSBpbiB0aGlzIGdhbWUgbGV2ZWxcclxuICAgICAqIEB0eXBlIHtbdHlwZV19XHJcbiAgICAgKi9cclxuICAgIHRoaXMubnVtYmVyT2ZHcmFkYXRpb24gPSBudW1iZXJPZkdyYWRhdGlvbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRvbmUgc3lzdGVtIG1hbmFnZXJcclxuICAgICAqIEB0eXBlIHtFbmdpbmV9XHJcbiAgICAgKi9cclxuICAgIHRoaXMudG9uZSA9IG5ldyBFbmdpbmUuVG9uZSh0aGlzLmdhbWUpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFyZ2luVG9wIG9mIHRyaWFuZ2xlcyBtYXRyaXhcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIHRoaXMubWFyZ2luVG9wID0gMTAwO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFyZ2luTGVmdCBvZiB0cmlhbmdsZXMgbWF0cml4XHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICB0aGlzLm1hcmdpbkxlZnQgPSA2NDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1pbmltYWwgdHJpYW5nbGVzIGRlc3Ryb3kgbGVuZ3RoXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICB0aGlzLm1pblRyaWFuZ2xlc0Rlc3Ryb3kgPSAzO1xyXG5cclxuICAgIHRoaXMudHJpYW5nbGVzTWF0cml4ID0gW107XHJcbiAgICB0aGlzLnNlbGVjdGVkVHJpYW5nbGVzID0gW107XHJcblxyXG4gICAgdGhpcy5zY29yZSA9IDA7XHJcblxyXG4gICAgdGhpcy50cmlhbmdsZU1hdHJpeFdpZHRoID0gMjY7XHJcbiAgICB0aGlzLnRyaWFuZ2xlTWF0cml4SGVpZ2h0ID0gOTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZSgpIHtcclxuICAgIHRoaXMuZ2FtZS5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzAwMCc7XHJcblxyXG4gICAgdGhpcy5jcmVhdGVVbml2ZXJzZSgpO1xyXG4gICAgdGhpcy5jcmVhdGVHcmFkYXRpb25zKCk7XHJcblxyXG4gICAgdGhpcy50cmlhbmdsZUdyb3VwID0gdGhpcy5nYW1lLmFkZC5ncm91cCgpO1xyXG5cclxuICAgIHRoaXMudG9uZS5jcmVhdGUoKTtcclxuXHJcbiAgICB0aGlzLnNrZXRjaCgpO1xyXG4gICAgdGhpcy5pbml0RXZlbnRzKCk7XHJcbiAgICB0aGlzLmNyZWF0ZVdhdmUoKTtcclxuICAgIHRoaXMuY3JlYXRlU291bmRzKCk7XHJcbiAgICB0aGlzLmNyZWF0ZUhpbnRUaW1lcigpO1xyXG4gICAgdGhpcy5jcmVhdGVTY29yZUxhYmxlKCk7XHJcbiAgICB0aGlzLmluaXRpYWxpemF0aW9uRnVsbFNjcmVlbigpO1xyXG5cclxuICAgIHRoaXMuY3JlYXRlTWV0ZW9yKCk7XHJcblxyXG4gICAgdGhpcy5mb3JjZVBvcnRyYWl0ID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICB9XHJcblxyXG4gIHVwZGF0ZSgpIHtcclxuICB9XHJcblxyXG4gIGNyZWF0ZVNvdW5kcygpIHtcclxuICAgIC8vIHRoaXMubXVzaWMxID0gdGhpcy5nYW1lLnNvdW5kLmFkZCgnbXVzaWMxJywgMSwgdHJ1ZSk7XHJcbiAgICAvLyB0aGlzLm11c2ljMS5wbGF5KCk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVHcmFkYXRpb25zKCkge1xyXG4gICAgbGV0IGFsbEdyYWRhdGlvbiA9IFBoYXNlci5BcnJheVV0aWxzLnNodWZmbGUoQ29sb3JTZXQuR1JBREFUSU9OUyk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm51bWJlck9mR3JhZGF0aW9uOyBpKyspIHtcclxuICAgICAgbGV0IGNvbG9yU2V0ID0gbmV3IENvbG9yU2V0KGFsbEdyYWRhdGlvbltpXSk7XHJcbiAgICAgIHRoaXMuY29sb3JTZXRzLnB1c2goY29sb3JTZXQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY3JlYXRlVW5pdmVyc2UoKSB7XHJcbiAgICAvKipcclxuICAgICAqIFJvdGF0aW9uIHNwZWVkIGZvciBzZWNvbmQgdW5pdmVyc2VcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIGNvbnN0IHNlY29uZFJvdGF0aW9uU3BlZWQgPSA1O1xyXG5cclxuICAgIHRoaXMudW5pdmVyc2VGaXJzdCA9IG5ldyBFbmdpbmUuVW5pdmVyc2UodGhpcy5nYW1lKTtcclxuICAgIHRoaXMudW5pdmVyc2VTZWNvbmQgPSBuZXcgRW5naW5lLlVuaXZlcnNlKHRoaXMuZ2FtZSwgc2Vjb25kUm90YXRpb25TcGVlZCk7XHJcblxyXG4gICAgdGhpcy5nYW1lLmFkZC5leGlzdGluZyh0aGlzLnVuaXZlcnNlRmlyc3QpO1xyXG4gICAgdGhpcy5nYW1lLmFkZC5leGlzdGluZyh0aGlzLnVuaXZlcnNlU2Vjb25kKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZUhpbnRUaW1lcigpIHtcclxuICAgIGNvbnN0IGhpbnRUaW1lb3V0ID0gMjAwMDA7XHJcbiAgICB0aGlzLmhpbnRUaW1lciA9IHRoaXMuZ2FtZS50aW1lLmNyZWF0ZSgpO1xyXG5cclxuICAgIHRoaXMuaGludFRpbWVyLmxvb3AoaGludFRpbWVvdXQsIHRoaXMudmlzdWFsaXNhdGlvbkhpbnQsIHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlTWV0ZW9yKCkge1xyXG4gICAgY29uc3QgbWV0ZW9yVGltZXJEZWxheSA9IDIwICogMTAwMDtcclxuXHJcbiAgICB0aGlzLm1ldGVvciA9IG5ldyBFbmdpbmUuTWV0ZW9yKHRoaXMuZ2FtZSk7XHJcbiAgICB0aGlzLmdhbWUuYWRkLmV4aXN0aW5nKHRoaXMubWV0ZW9yKTtcclxuICAgIHRoaXMubWV0ZW9yLnNlbmRUb0JhY2soKTtcclxuICAgIHRoaXMubWV0ZW9yLm91dE9mQ2FtZXJhQm91bmRzS2lsbCA9IHRydWU7XHJcbiAgICB0aGlzLm1ldGVvci5raWxsKCk7XHJcblxyXG4gICAgdGhpcy5tZXRlb3JUaW1lciA9IHRoaXMuZ2FtZS50aW1lLmNyZWF0ZSgpO1xyXG4gICAgdGhpcy5tZXRlb3JUaW1lci5sb29wKG1ldGVvclRpbWVyRGVsYXksICgpID0+IHtcclxuICAgICAgaWYgKHRoaXMuZ2FtZS5ybmQucGljayhbdHJ1ZSwgZmFsc2VdKSkge1xyXG4gICAgICAgIHRoaXMucnVuTWV0ZW9yKCk7XHJcbiAgICAgIH1cclxuICAgIH0sIHRoaXMpO1xyXG4gICAgdGhpcy5tZXRlb3JUaW1lci5zdGFydCgpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlV2F2ZSgpIHtcclxuICAgIHRoaXMud2F2ZSA9IG5ldyBFbmdpbmUuV2F2ZSh0aGlzLmdhbWUsIDAsIDApO1xyXG5cclxuICAgIHRoaXMuZ2FtZS5hZGQuZXhpc3RpbmcodGhpcy53YXZlKTtcclxuICB9XHJcblxyXG4gIHJ1bk1ldGVvcigpIHtcclxuICAgIGNvbnN0IG1hcmdpblggPSB0aGlzLmdhbWUud2lkdGggLyAxMDtcclxuICAgIGNvbnN0IG1hcmdpblkgPSB0aGlzLmdhbWUuaGVpZ2h0IC8gMTA7XHJcbiAgICBjb25zdCBtYXJnaW5Sb3RhdGlvbiA9IE1hdGguUEkgLyAxMDtcclxuICAgIGxldCB4LCB5LCByb3RhdGlvbjtcclxuICAgIGxldCBzaWRlID0gdGhpcy5nYW1lLnJuZC5waWNrKFsndG9wJywgJ2xlZnQnLCAncmlnaHQnLCAnYm90dG9tJ10pO1xyXG5cclxuICAgIHN3aXRjaCAoc2lkZSkge1xyXG4gICAgICBjYXNlICd0b3AnOlxyXG4gICAgICAgIHggPSB0aGlzLmdhbWUucm5kLmJldHdlZW4obWFyZ2luWCwgdGhpcy5nYW1lLndpZHRoIC0gbWFyZ2luWCk7XHJcbiAgICAgICAgeSA9IDA7XHJcbiAgICAgICAgcm90YXRpb24gPSB0aGlzLmdhbWUucm5kLnJlYWxJblJhbmdlKG1hcmdpblJvdGF0aW9uLCBNYXRoLlBJIC0gbWFyZ2luUm90YXRpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdsZWZ0JzpcclxuICAgICAgICB4ID0gMDtcclxuICAgICAgICB5ID0gdGhpcy5nYW1lLnJuZC5iZXR3ZWVuKG1hcmdpblksIHRoaXMuZ2FtZS5oZWlnaHQgLSBtYXJnaW5ZKTtcclxuICAgICAgICByb3RhdGlvbiA9IHRoaXMuZ2FtZS5ybmQucmVhbEluUmFuZ2UoLU1hdGguUEkgLyAyICsgbWFyZ2luUm90YXRpb24sIE1hdGguUEkgLyAyIC0gbWFyZ2luUm90YXRpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdyaWdodCc6XHJcbiAgICAgICAgeCA9IHRoaXMuZ2FtZS53aWR0aDtcclxuICAgICAgICB5ID0gdGhpcy5nYW1lLnJuZC5iZXR3ZWVuKG1hcmdpblksIHRoaXMuZ2FtZS5oZWlnaHQgLSBtYXJnaW5ZKTtcclxuICAgICAgICByb3RhdGlvbiA9IHRoaXMuZ2FtZS5ybmQucmVhbEluUmFuZ2UoTWF0aC5QSSAvIDIgKyBtYXJnaW5Sb3RhdGlvbiwgTWF0aC5QSSAqIDMgLyAyIC0gbWFyZ2luUm90YXRpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdib3R0b20nOlxyXG4gICAgICAgIHggPSB0aGlzLmdhbWUucm5kLmJldHdlZW4obWFyZ2luWCwgdGhpcy5nYW1lLndpZHRoIC0gbWFyZ2luWCk7XHJcbiAgICAgICAgeSA9IHRoaXMuZ2FtZS5oZWlnaHQ7XHJcbiAgICAgICAgcm90YXRpb24gPSB0aGlzLmdhbWUucm5kLnJlYWxJblJhbmdlKG1hcmdpblJvdGF0aW9uLCAtTWF0aC5QSSArIG1hcmdpblJvdGF0aW9uKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm1ldGVvci5yZXNldCh4LCB5LCByb3RhdGlvbik7XHJcbiAgfVxyXG5cclxuICB2aXN1YWxpc2F0aW9uSGludCgpIHtcclxuICAgIGxldCB0cmlhbmdsZSA9IHRoaXMuZ2V0SGludFRyaWFuZ2xlKCk7XHJcblxyXG4gICAgaWYgKHRyaWFuZ2xlICE9PSB1bmRlZmluZWQpXHJcbiAgICAgIHRyaWFuZ2xlLmhpbnRNZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW5pdGlhbGl6YXRpb24gZXZlbnQgaW4gdGhlIGdhbWVcclxuICAgKi9cclxuICBpbml0RXZlbnRzKCkge1xyXG4gICAgdGhpcy5nYW1lLmlucHV0Lm9uVXAuYWRkKHRoaXMuZGVzdHJveVRyaWFuZ2xlLCB0aGlzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSB0cmlhbmdsZXMgb24gY2FudmFzXHJcbiAgICovXHJcbiAgc2tldGNoKCkge1xyXG4gICAgY29uc3QgZGVsYXlGb3JEaXNwbGF5ID0gNTAwO1xyXG5cclxuICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy50cmlhbmdsZU1hdHJpeFdpZHRoOyB4KyspIHtcclxuICAgICAgdGhpcy50cmlhbmdsZXNNYXRyaXhbeF0gPSBbXTtcclxuICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLnRyaWFuZ2xlTWF0cml4SGVpZ2h0OyB5KyspIHtcclxuICAgICAgICBsZXQgcG9zWCA9IHggKiAoRW5naW5lLlRyaWFuZ2xlLnNpemUgLyAyIC0gMSk7XHJcbiAgICAgICAgbGV0IHBvc1kgPSB5ICogKEVuZ2luZS5UcmlhbmdsZS5zaXplIC0gMSk7XHJcbiAgICAgICAgbGV0IGlzUm90YXRlZCA9IHggJSAyID09PSAxO1xyXG4gICAgICAgIGxldCBjb2xvclNldCA9IHRoaXMuZ2FtZS5ybmQucGljayh0aGlzLmNvbG9yU2V0cyk7XHJcblxyXG4gICAgICAgIGlmICh5ICUgMiA9PT0gMSkge1xyXG4gICAgICAgICAgaXNSb3RhdGVkID0gIWlzUm90YXRlZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0cmlhbmdsZSA9IG5ldyBFbmdpbmUuVHJpYW5nbGUoXHJcbiAgICAgICAgICB0aGlzLmdhbWUsXHJcbiAgICAgICAgICBwb3NYLFxyXG4gICAgICAgICAgcG9zWSxcclxuICAgICAgICAgIGlzUm90YXRlZCxcclxuICAgICAgICAgIGNvbG9yU2V0LCB7XHJcbiAgICAgICAgICAgIHgsXHJcbiAgICAgICAgICAgIHlcclxuICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICB0cmlhbmdsZS5ncm93VXAoZGVsYXlGb3JEaXNwbGF5ICsgKHggKyB5KSAqIDI1KTtcclxuXHJcbiAgICAgICAgdHJpYW5nbGUuZXZlbnRzLm9uSW5wdXRPdmVyLmFkZCh0aGlzLnNlbGVjdFRyaWFuZ2xlLCB0aGlzKTtcclxuICAgICAgICB0cmlhbmdsZS5ldmVudHMub25JbnB1dERvd24uYWRkKHRoaXMuc2VsZWN0VHJpYW5nbGUsIHRoaXMpO1xyXG4gICAgICAgIHRyaWFuZ2xlLmV2ZW50cy5kZWxldGVDb21wbGV0ZS5hZGQodGhpcy5yZWNvdmVyVHJpYW5nbGUsIHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLnRyaWFuZ2xlc01hdHJpeFt4XVt5XSA9IHRyaWFuZ2xlO1xyXG4gICAgICAgIC8vIHRoaXMuYWRkLmV4aXN0aW5nKHRyaWFuZ2xlKTtcclxuICAgICAgICB0aGlzLnRyaWFuZ2xlR3JvdXAuYWRkKHRyaWFuZ2xlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY2VudGVyaW5nTWF0cml4KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZXN0cm95IG9yIHVuc2VsZWN0IHRyaWFuZ2xlc1xyXG4gICAqL1xyXG4gIGRlc3Ryb3lUcmlhbmdsZSgpIHtcclxuICAgIHRoaXMudG9uZS5yZXNldCgpO1xyXG5cclxuICAgIGxldCBpc1Vuc2VsZWN0ID0gdGhpcy5zZWxlY3RlZFRyaWFuZ2xlcy5sZW5ndGggPCB0aGlzLm1pblRyaWFuZ2xlc0Rlc3Ryb3k7XHJcblxyXG4gICAgaWYgKCFpc1Vuc2VsZWN0KSB7XHJcbiAgICAgIHRoaXMudXBkYXRlU2NvcmUoTWF0aC5wb3codGhpcy5zZWxlY3RlZFRyaWFuZ2xlcy5sZW5ndGgsIDIuMTUpICogMTApO1xyXG4gICAgICB0aGlzLnNoYWtlSXRTaGFrZUl0KCk7XHJcbiAgICAgIHRoaXMuaGludFRpbWVyLnN0b3AoZmFsc2UpO1xyXG4gICAgICB0aGlzLmhpbnRUaW1lci5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyB0aGlzLnNlbGVjdGVkVHJpYW5nbGVzLmxlbmd0aCA+IDA7IGkrKykge1xyXG4gICAgICBjb25zdCBiZXR3ZWVuQW5pbWF0aW9uRGFsYXkgPSAyNTtcclxuXHJcbiAgICAgIGxldCB0cmlhbmdsZSA9IHRoaXMuc2VsZWN0ZWRUcmlhbmdsZXMuc2hpZnQoKTtcclxuXHJcbiAgICAgIGlmIChpc1Vuc2VsZWN0KSB7XHJcbiAgICAgICAgdHJpYW5nbGUudW5zZWxlY3QoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0cmlhbmdsZS5kZWxldGUoaSAqIGJldHdlZW5BbmltYXRpb25EYWxheSk7XHJcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRUcmlhbmdsZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICB0aGlzLndhdmUucGxheUFuaW1hdGlvbih0cmlhbmdsZS53b3JsZC54LCB0cmlhbmdsZS53b3JsZC55LCB0cmlhbmdsZS5pc1JvdGF0ZWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICghaXNVbnNlbGVjdCkge1xyXG4gICAgICBsZXQgdGltZXJFeGlzdE1vdmUgPSB0aGlzLmdhbWUudGltZS5jcmVhdGUoKTtcclxuXHJcbiAgICAgIHRpbWVyRXhpc3RNb3ZlLmFkZChcclxuICAgICAgICBUcmlhbmdsZS5hbmltYXRpb25UaW1lRGVsZXRlICtcclxuICAgICAgICBUcmlhbmdsZS5hbmltYXRpb25UaW1lUmVjb3ZlcixcclxuICAgICAgICB0aGlzLnByb2Nlc3NQb3NpdGlvbixcclxuICAgICAgICB0aGlzXHJcbiAgICAgICk7XHJcblxyXG4gICAgICB0aW1lckV4aXN0TW92ZS5zdGFydCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVjb3ZlclRyaWFuZ2xlKHRyaWFuZ2xlKSB7XHJcbiAgICB0cmlhbmdsZS5yZWNvdmVyKHRoaXMuZ2FtZS5ybmQucGljayh0aGlzLmNvbG9yU2V0cykpO1xyXG4gIH1cclxuXHJcbiAgc2VsZWN0VHJpYW5nbGUodHJpYW5nbGUsIHBvaW50KSB7XHJcbiAgICBpZiAoIXRoaXMuZ2FtZS5pbnB1dC5hY3RpdmVQb2ludGVyLmlzRG93bikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRUcmlhbmdsZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHRyaWFuZ2xlLnNlbGVjdCgpO1xyXG4gICAgICB0aGlzLnRvbmUudXAoKTtcclxuICAgICAgdGhpcy5zZWxlY3RlZFRyaWFuZ2xlcy5wdXNoKHRyaWFuZ2xlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxldCBsYXN0U2VsZWN0ZWRUcmlhbmdsZSA9IHRoaXMuc2VsZWN0ZWRUcmlhbmdsZXNbdGhpcy5zZWxlY3RlZFRyaWFuZ2xlcy5sZW5ndGggLSAxXTtcclxuICAgICAgbGV0IHByZUxhc3RTZWxlY3RlZFRyaWFuZ2xlID0gdGhpcy5zZWxlY3RlZFRyaWFuZ2xlc1t0aGlzLnNlbGVjdGVkVHJpYW5nbGVzLmxlbmd0aCAtIDJdO1xyXG5cclxuICAgICAgaWYgKHRyaWFuZ2xlLnNlbGVjdGVkICYmIHRyaWFuZ2xlID09PSBwcmVMYXN0U2VsZWN0ZWRUcmlhbmdsZSkge1xyXG4gICAgICAgIGxhc3RTZWxlY3RlZFRyaWFuZ2xlLnVuc2VsZWN0KCk7XHJcbiAgICAgICAgdGhpcy50b25lLmxvdygpXHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFRyaWFuZ2xlcy5wb3AoKTtcclxuICAgICAgfSBlbHNlIGlmICghdHJpYW5nbGUuc2VsZWN0ZWQgJiZcclxuICAgICAgICB0aGlzLmNhblRyaWFuZ2xlTGluayhsYXN0U2VsZWN0ZWRUcmlhbmdsZSwgdHJpYW5nbGUpICYmXHJcbiAgICAgICAgbGFzdFNlbGVjdGVkVHJpYW5nbGUuY29sb3JTZXQgPT09IHRyaWFuZ2xlLmNvbG9yU2V0XHJcbiAgICAgICkge1xyXG4gICAgICAgIHRyaWFuZ2xlLnNlbGVjdCgpO1xyXG4gICAgICAgIHRoaXMudG9uZS51cCgpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUcmlhbmdsZXMucHVzaCh0cmlhbmdsZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrIHRyaWFuZ2xlcyBsaW5rXHJcbiAgICovXHJcbiAgY2FuVHJpYW5nbGVMaW5rKHRyMSwgdHIyKSB7XHJcbiAgICBpZiAodHIxLm1hdHJpeFBvcy55ID09PSB0cjIubWF0cml4UG9zLnkpIHtcclxuICAgICAgaWYgKHRyMS5tYXRyaXhQb3MueCArIDEgPT09IHRyMi5tYXRyaXhQb3MueCB8fFxyXG4gICAgICAgIHRyMS5tYXRyaXhQb3MueCAtIDEgPT09IHRyMi5tYXRyaXhQb3MueCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHRyMS5tYXRyaXhQb3MueCA9PT0gdHIyLm1hdHJpeFBvcy54KSB7XHJcbiAgICAgIGlmICh0cjEubWF0cml4UG9zLnggJSAyID09PSAwKSB7XHJcbiAgICAgICAgaWYgKHRyMS5pc1JvdGF0ZWQgJiYgdHIyLm1hdHJpeFBvcy55ID09PSB0cjEubWF0cml4UG9zLnkgLSAxKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKCF0cjEuaXNSb3RhdGVkICYmIHRyMi5tYXRyaXhQb3MueSA9PT0gdHIxLm1hdHJpeFBvcy55ICsgMSkge1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmICghdHIxLmlzUm90YXRlZCAmJiB0cjIubWF0cml4UG9zLnkgPT09IHRyMS5tYXRyaXhQb3MueSArIDEpIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHIxLmlzUm90YXRlZCAmJiB0cjIubWF0cml4UG9zLnkgPT09IHRyMS5tYXRyaXhQb3MueSAtIDEpIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBzY29yZSBvbiBzdGFnZVxyXG4gICAqL1xyXG4gIGNyZWF0ZVNjb3JlTGFibGUoKSB7XHJcbiAgICBjb25zdCByYW5kb21Db2xvclNldCA9IHRoaXMuZ2FtZS5ybmQucGljayh0aGlzLmNvbG9yU2V0cyk7XHJcbiAgICBjb25zdCBjb2xvciA9ICcjMDBFNjc2JzsgLy8gKyBQaGFzZXIuQ29sb3IuY29tcG9uZW50VG9IZXgocmFuZG9tQ29sb3JTZXQuZ2V0TGFzdENvbG9yKCkpO1xyXG4gICAgY29uc3QgbWFyZ2luUmlnaHQgPSAxNTtcclxuICAgIGNvbnN0IG1hcmdpblRvcCA9IDE1O1xyXG5cclxuICAgIGNvbnN0IHN0eWxlID0ge1xyXG4gICAgICBmb250OiAnNDJweCBPcGVuIFNhbnMnLFxyXG4gICAgICBmb250U3R5bGU6ICdpdGFsaWMnLFxyXG4gICAgICBmaWxsOiBjb2xvclxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2NvcmVMYWJsZSA9IG5ldyBFbmdpbmUuU2NvcmVMYWJsZShcclxuICAgICAgdGhpcy5nYW1lLFxyXG4gICAgICB0aGlzLmdhbWUud2lkdGggLSBtYXJnaW5SaWdodCxcclxuICAgICAgbWFyZ2luVG9wLFxyXG4gICAgICAwLFxyXG4gICAgICBzdHlsZVxyXG4gICAgKTtcclxuICAgIHRoaXMuc2NvcmVMYWJsZS5hbmNob3Iuc2V0VG8oMSwgMCk7XHJcblxyXG4gICAgLy8gVE9ETzogVEVNUFxyXG4gICAgdGhpcy5zY29yZUxhYmxlLmlucHV0RW5hYmxlZCA9IHRydWU7XHJcbiAgICB0aGlzLnNjb3JlTGFibGUuZXZlbnRzLm9uSW5wdXREb3duLmFkZCh0aGlzLnRvZ2dsZUZ1bGxTY3JlZW4sIHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgaW5pdGlhbGl6YXRpb25GdWxsU2NyZWVuKCkge1xyXG4gICAgdGhpcy5nYW1lLnNjYWxlLmZ1bGxTY3JlZW5TY2FsZU1vZGUgPSBQaGFzZXIuU2NhbGVNYW5hZ2VyLlJFU0laRTtcclxuICAgIHRoaXMuZ2FtZS5zY2FsZS5vbkZ1bGxTY3JlZW5DaGFuZ2VcclxuICAgICAgLmFkZCh0aGlzLnJlc2l6ZVNjcmVlbiwgdGhpcyk7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVGdWxsU2NyZWVuKCkge1xyXG4gICAgaWYgKHRoaXMuZ2FtZS5zY2FsZS5pc0Z1bGxTY3JlZW4pIHtcclxuICAgICAgdGhpcy5nYW1lLnNjYWxlLnN0b3BGdWxsU2NyZWVuKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmdhbWUuc2NhbGUuc3RhcnRGdWxsU2NyZWVuKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB1cGRhdGVTY29yZSh2YWwpIHtcclxuICAgIHZhbCA9IE1hdGgucm91bmQodmFsKTtcclxuXHJcbiAgICB0aGlzLnNjb3JlICs9IHZhbDtcclxuICAgIHRoaXMuc2NvcmVMYWJsZS5jaGFuZ2VWYWx1ZSh0aGlzLnNjb3JlKTtcclxuICB9XHJcblxyXG4gIHJlc2l6ZVNjcmVlbigpIHtcclxuICAgIHRoaXMuc2NvcmVMYWJsZS54ID0gdGhpcy5nYW1lLndpZHRoIC0gMTU7XHJcbiAgICB0aGlzLnNjb3JlTGFibGUueSA9IDE1O1xyXG5cclxuICAgIHRoaXMudW5pdmVyc2VGaXJzdC5yZXNpemUoKTtcclxuICAgIHRoaXMudW5pdmVyc2VTZWNvbmQucmVzaXplKCk7XHJcblxyXG4gICAgdGhpcy5jZW50ZXJpbmdNYXRyaXgoKTtcclxuICB9XHJcblxyXG4gIGNlbnRlcmluZ01hdHJpeCgpIHtcclxuICAgIGNvbnN0IGhhbGZUcmlhbmdsZVNpemUgPSBFbmdpbmUuVHJpYW5nbGUuc2l6ZSAvIDI7XHJcblxyXG4gICAgdGhpcy50cmlhbmdsZUdyb3VwLnggPSB0aGlzLmdhbWUud2lkdGggLyAyIC0gdGhpcy50cmlhbmdsZUdyb3VwLndpZHRoIC8gMiArIGhhbGZUcmlhbmdsZVNpemU7XHJcbiAgICB0aGlzLnRyaWFuZ2xlR3JvdXAueSA9IHRoaXMuZ2FtZS5oZWlnaHQgLyAyIC0gdGhpcy50cmlhbmdsZUdyb3VwLmhlaWdodCAvIDIgKyBoYWxmVHJpYW5nbGVTaXplO1xyXG4gIH1cclxuXHJcbiAgcmVidWlsZE1hcCgpIHtcclxuICAgIGNvbnN0IHRpbWVEZWxheSA9IDUwO1xyXG5cclxuICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy50cmlhbmdsZU1hdHJpeFdpZHRoOyB4KyspIHtcclxuICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLnRyaWFuZ2xlTWF0cml4SGVpZ2h0OyB5KyspIHtcclxuICAgICAgICBsZXQgdHJpYW5nbGUgPSB0aGlzLnRyaWFuZ2xlc01hdHJpeFt4XVt5XTtcclxuICAgICAgICBsZXQgcmFuZG9tQ29sb3JTZXQgPSB0aGlzLmdhbWUucm5kLnBpY2sodGhpcy5jb2xvclNldHMpO1xyXG5cclxuICAgICAgICB0cmlhbmdsZS51cGRhdGVDb2xvcihyYW5kb21Db2xvclNldCwgeCAqIHRpbWVEZWxheSArIHkgKiB0aW1lRGVsYXkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcm9jZXNzUG9zaXRpb24oKSB7XHJcbiAgICAvLyBpZiAoIXRoaXMuZ2V0U29tZUNvbWJpbmF0aW9uKCkubGVuZ3RoKSB7XHJcbiAgICAgIGNvbnN0IGRlbGF5RGVzdHJveSA9IDUwMDA7XHJcbiAgICAgIGxldCB0aW1lciA9IHRoaXMuZ2FtZS50aW1lLmNyZWF0ZSgpO1xyXG5cclxuICAgICAgdGltZXIuYWRkKGRlbGF5RGVzdHJveSwgdGhpcy5yZWJ1aWxkTWFwLCB0aGlzKTtcclxuICAgICAgdGltZXIuc3RhcnQoMCk7XHJcbiAgICAvLyB9XHJcbiAgfVxyXG5cclxuICBnZXRIaW50VHJpYW5nbGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5nYW1lLnJuZC5waWNrKHRoaXMuZ2V0U29tZUNvbWJpbmF0aW9uKCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGV4aXN0aW5nIGNvbWJpbmF0aW9uLCBpZiB3ZSBoYXZlbid0IGV4aXN0IG1vdmUsIHRoZW4gcmV0dXJuIGVtcHR5IGFycmF5XHJcbiAgICovXHJcbiAgZ2V0U29tZUNvbWJpbmF0aW9uKCkge1xyXG4gICAgbGV0IHVzZWRDZWxsID0gW107XHJcbiAgICBsZXQgdHJpYW5nbGVzID0gW107XHJcblxyXG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLnRyaWFuZ2xlTWF0cml4V2lkdGg7IHgrKykge1xyXG4gICAgICB1c2VkQ2VsbFt4XSA9IFtdO1xyXG4gICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMudHJpYW5nbGVNYXRyaXhIZWlnaHQ7IHkrKykge1xyXG4gICAgICAgIHVzZWRDZWxsW3hdW3ldID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMudHJpYW5nbGVNYXRyaXhXaWR0aDsgeCsrKSB7XHJcbiAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy50cmlhbmdsZU1hdHJpeEhlaWdodDsgeSsrKSB7XHJcbiAgICAgICAgaWYgKCF1c2VkQ2VsbFt4XVt5XSAmJiB0aGlzLmhhc0NvbWJpbmF0aW9uKHVzZWRDZWxsLCB0aGlzLnRyaWFuZ2xlc01hdHJpeFt4XVt5XS5jb2xvclNldCwgeCwgeSwgMSkpIHtcclxuICAgICAgICAgIHRyaWFuZ2xlcy5wdXNoKHRoaXMudHJpYW5nbGVzTWF0cml4W3hdW3ldKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJpYW5nbGVzO1xyXG4gIH1cclxuXHJcbiAgaGFzQ29tYmluYXRpb24odXNlZENlbGwsIGNvbG9yU2V0LCB4LCB5LCBjbnQpIHtcclxuICAgIGlmIChjb2xvclNldCAhPT0gdGhpcy50cmlhbmdsZXNNYXRyaXhbeF1beV0uY29sb3JTZXQgfHwgdXNlZENlbGxbeF1beV0pIHtcclxuICAgICAgcmV0dXJuIChjbnQgPiB0aGlzLm1pblRyaWFuZ2xlc0Rlc3Ryb3kpO1xyXG4gICAgfVxyXG5cclxuICAgIHVzZWRDZWxsW3hdW3ldID0gdHJ1ZTtcclxuICAgIGlmICh4ICsgMSA8IHRoaXMudHJpYW5nbGVNYXRyaXhXaWR0aCkge1xyXG4gICAgICBpZiAodGhpcy5oYXNDb21iaW5hdGlvbih1c2VkQ2VsbCwgY29sb3JTZXQsIHggKyAxLCB5LCBjbnQgKyAxKSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHggLSAxID49IDApIHtcclxuICAgICAgaWYgKHRoaXMuaGFzQ29tYmluYXRpb24odXNlZENlbGwsIGNvbG9yU2V0LCB4IC0gMSwgeSwgY250ICsgMSkpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnRyaWFuZ2xlc01hdHJpeFt4XVt5XS5pc1JvdGF0ZWQpIHtcclxuICAgICAgaWYgKHkgLSAxID49IDApIHtcclxuICAgICAgICBpZiAodGhpcy5oYXNDb21iaW5hdGlvbih1c2VkQ2VsbCwgY29sb3JTZXQsIHgsIHkgLSAxLCBjbnQgKyAxKSkge1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoeSArIDEgPCB0aGlzLnRyaWFuZ2xlTWF0cml4SGVpZ2h0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzQ29tYmluYXRpb24odXNlZENlbGwsIGNvbG9yU2V0LCB4LCB5ICsgMSwgY250ICsgMSkpIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHNoYWtlSXRTaGFrZUl0KCkge1xyXG4gICAgbGV0IHggPSB0aGlzLnRyaWFuZ2xlR3JvdXAueDtcclxuICAgIGxldCB5ID0gdGhpcy50cmlhbmdsZUdyb3VwLnk7XHJcbiAgICBsZXQgYW1wbGl0dWRlWSA9IDAuNzU7XHJcbiAgICBsZXQgYW1wbGl0dWRlWCA9IDI7XHJcbiAgICBsZXQgdGltZUFuaW1hdGlvbiA9IDIwO1xyXG5cclxuICAgIHRoaXMuYWRkLnR3ZWVuKHRoaXMudHJpYW5nbGVHcm91cClcclxuICAgICAgLnRvKHtcclxuICAgICAgICB4OiB4ICsgYW1wbGl0dWRlWCwgeTogeSArIGFtcGxpdHVkZVlcclxuICAgICAgfSwgdGltZUFuaW1hdGlvbiwgUGhhc2VyLkVhc2luZy5MaW5lYXIuTm9uZSlcclxuICAgICAgLnRvKHtcclxuICAgICAgICB4OiB4IC0gYW1wbGl0dWRlWCwgeTogeSAtIGFtcGxpdHVkZVlcclxuICAgICAgfSwgdGltZUFuaW1hdGlvbiwgUGhhc2VyLkVhc2luZy5MaW5lYXIuTm9uZSlcclxuICAgICAgLnRvKHtcclxuICAgICAgICB4LCB5XHJcbiAgICAgIH0sIHRpbWVBbmltYXRpb24sIFBoYXNlci5FYXNpbmcuTGluZWFyLk5vbmUpXHJcbiAgICAgIC5zdGFydCgpO1xyXG5cclxuICB9XHJcbn1cclxuXHJcbkVuZ2luZS5HYW1lID0gR2FtZTtcclxuIixudWxsLCJFbmdpbmUuZ2FtZSA9IG5ldyBQaGFzZXIuR2FtZShFbmdpbmUubWF4V2lkdGgsIEVuZ2luZS5tYXhIZWlnaHQsIFBoYXNlci5BVVRPKTtcclxuXHJcbkVuZ2luZS5nYW1lLnN0YXRlLmFkZCgnQm9vdCcsIEVuZ2luZS5Cb290KTtcclxuRW5naW5lLmdhbWUuc3RhdGUuYWRkKCdMb2FkZXInLCBFbmdpbmUuTG9hZGVyKTtcclxuLy8gRW5naW5lLmdhbWUuc3RhdGUuYWRkKCdNZW51JywgRW5naW5lLk1lbnUpO1xyXG5FbmdpbmUuZ2FtZS5zdGF0ZS5hZGQoJ0dhbWUnLCBFbmdpbmUuR2FtZSk7XHJcbi8vIEVuZ2luZS5nYW1lLnN0YXRlLmFkZCgnU2NvcmVCb2FyZCcsIEVuZ2luZS5TY29yZUJvYXJkKTtcclxuXHJcbkVuZ2luZS5nYW1lLnN0YXRlLnN0YXJ0KCdCb290Jyk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
