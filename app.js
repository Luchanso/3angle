'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Engine = {
  minWidth: 640,
  minHeight: 320,
  maxWidth: window.innerWidth,
  maxHeight: window.innerHeight
};

var Lvl = function () {
  function Lvl(caller) {
    _classCallCheck(this, Lvl);

    if (caller !== Lvl) {
      throw 'Its singleton class, try use Lvl.instance';
    }
  }

  _createClass(Lvl, null, [{
    key: 'instance',
    get: function get() {
      if (!Lvl._instance) {
        Lvl._instance = new Lvl(Lvl);
      }

      return Lvl._instance;
    }
  }]);

  return Lvl;
}();

Engine.Lvl = Lvl;

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

var Loader = function (_Phaser$State2) {
  _inherits(Loader, _Phaser$State2);

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
      this.load.image('icon-play', 'assets/img/icon-play.png');
      this.load.image('icon-share', 'assets/img/icon-share.png');
      this.load.image('icon-settings', 'assets/img/icon-settings.png');
      this.load.image('icon-star', 'assets/img/icon-star.png');
      this.load.image('icon-apps', 'assets/img/icon-apps.png');

      this.game.cache.addBitmapData(Engine.Triangle.bitmapKey, Engine.Triangle.generateSprite(this.game));
      this.game.cache.addBitmapData(Engine.Meteor.bitmapKey, Engine.Meteor.generateSprite(this.game));

      this.generateWaveTexture();
    }
  }, {
    key: 'create',
    value: function create() {
      // let numberOfGradation = 3;
      this.state.start('Menu');
      // this.state.start('Game', true, false, numberOfGradation);
      // this.state.start('Lvlpick', true, false, 0x3F51B5);
    }
  }, {
    key: 'generateWaveTexture',
    value: function generateWaveTexture() {
      var data = Engine.Wave.generateAtlasData();
      this.game.cache.addTextureAtlas(Wave.bitmapKey, '', data.bitmap.canvas, data.atlasData, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
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

var Settings = function (_Phaser$State3) {
  _inherits(Settings, _Phaser$State3);

  function Settings() {
    _classCallCheck(this, Settings);

    return _possibleConstructorReturn(this, (Settings.__proto__ || Object.getPrototypeOf(Settings)).call(this));
  }

  _createClass(Settings, [{
    key: 'init',
    value: function init(bgColor) {
      this.stage.backgroundColor = bgColor;
    }
  }, {
    key: 'create',
    value: function create() {
      var test = this.add.text(this.game.world.centerX, this.game.world.centerY, 'Settings page', {
        fill: 'White',
        font: '41px Open Sans'
      });

      test.alpha = 0;

      this.add.tween(test).to({
        alpha: 1
      }).start();
    }
  }]);

  return Settings;
}(Phaser.State);

Engine.Settings = Settings;

var CircleButton = function (_Phaser$Graphics) {
  _inherits(CircleButton, _Phaser$Graphics);

  _createClass(CircleButton, [{
    key: 'radius',
    get: function get() {
      return this.data.radius;
    },
    set: function set(val) {
      this.data.radius = val;
      this.reDraw();
    }
  }]);

  function CircleButton(game, x, y, radius, color) {
    var iconName = arguments.length <= 5 || arguments[5] === undefined ? null : arguments[5];

    _classCallCheck(this, CircleButton);

    var _this4 = _possibleConstructorReturn(this, (CircleButton.__proto__ || Object.getPrototypeOf(CircleButton)).call(this, game, 0, 0));

    _this4.game.add.existing(_this4);

    if (iconName !== null) {
      _this4.icon = _this4.game.add.sprite(x, y, iconName);
      _this4.icon.anchor.setTo(0.5);
      _this4.icon.width = radius * 1.5;
      _this4.icon.height = radius * 1.5;

      _this4.addChild(_this4.icon);
    }

    _this4.data.x = x;
    _this4.data.y = y;
    _this4.data.color = color;

    _this4.inputEnabled = true;

    _this4.radius = radius;
    _this4.onClick = new Phaser.Signal();

    _this4.events.onInputDown.addOnce(_this4.animateBtn, _this4);
    return _this4;
  }

  _createClass(CircleButton, [{
    key: 'animateBtn',
    value: function animateBtn() {
      var _this5 = this;

      var animationTime = 350;
      var newBtnRadius = Math.sqrt(this.game.width ** 2 + this.game.height ** 2);

      this.parent.bringToTop(this);

      this.hideIcon();

      var tween = this.game.add.tween(this).to({
        radius: newBtnRadius
      }, animationTime, Phaser.Easing.Sinusoidal.InOut);

      tween.onComplete.add(function () {
        _this5.onClick.dispatch();
      }, this);

      tween.start();
    }
  }, {
    key: 'hideIcon',
    value: function hideIcon() {
      var animationTime = 325;

      this.game.add.tween(this.icon).to({
        alpha: 0
      }, animationTime).start();
    }
  }, {
    key: 'reDraw',
    value: function reDraw() {
      this.clear();
      this.beginFill(this.data.color);
      this.drawCircle(this.data.x, this.data.y, this.data.radius * 2);
      this.endFill();
    }
  }]);

  return CircleButton;
}(Phaser.Graphics);

Engine.CircleButton = CircleButton;

var Menu = function (_Phaser$State4) {
  _inherits(Menu, _Phaser$State4);

  function Menu() {
    _classCallCheck(this, Menu);

    return _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this));
  }

  _createClass(Menu, [{
    key: 'init',
    value: function init() {
      this.playBtnColor = 0x2196F3;
      this.playBtnRadius = 50;
      this.orbitsRadius = this.playBtnRadius + 100;

      this.stage.backgroundColor = 0x4A148C;
    }
  }, {
    key: 'create',
    value: function create() {
      this.createLogo();
      this.createBtns();
    }
  }, {
    key: 'createLogo',
    value: function createLogo() {
      return;
      var style = {
        font: '52px Open Sans',
        fill: 'white'
      };

      this.logoLable = this.add.text(this.game.world.centerX, this.game.world.centerY / 2, 'Three Angle', style);
      this.logoLable.anchor.setTo(0.5);
    }
  }, {
    key: 'createBtns',
    value: function createBtns() {
      var leaderboardBtn = this.createLeaderboardBtn();
      var settingsBtn = this.createSettingsBtn();
      var shareBtn = this.createShareBtn();
      var lvlPickBtn = this.createLvlPickBtn();

      var playBtn = this.createPlayBtn();

      var additionalBtns = [settingsBtn, leaderboardBtn, lvlPickBtn, shareBtn];

      this.animateAdditionalBtns(additionalBtns);
    }
  }, {
    key: 'createPlayBtn',
    value: function createPlayBtn() {
      this.playBtn = new Engine.CircleButton(this.game, this.game.world.centerX, this.game.world.centerY, this.playBtnRadius, this.playBtnColor, 'icon-play');

      this.playBtn.onClick.add(this.clickPlayBtn, this);

      return this.playBtn;
    }
  }, {
    key: 'createSettingsBtn',
    value: function createSettingsBtn() {
      var btnColor = 0x009688;

      this.settingsBtn = new Engine.CircleButton(this.game, this.game.world.centerX, this.game.world.centerY, this.playBtnRadius / 2, btnColor, 'icon-settings');

      this.settingsBtn.onClick.add(this.clickSettingsBtn, this);

      return this.settingsBtn;
    }
  }, {
    key: 'createShareBtn',
    value: function createShareBtn() {
      var btnColor = 0xE91E63;

      this.shareBtn = new Engine.CircleButton(this.game, this.game.world.centerX, this.game.world.centerY, this.playBtnRadius / 2, btnColor, 'icon-share');

      this.shareBtn.onClick.add(this.clickShareBtn, this);

      return this.shareBtn;
    }
  }, {
    key: 'createLeaderboardBtn',
    value: function createLeaderboardBtn() {
      var btnColor = 0xFF5722;

      this.leaderboardBtn = new Engine.CircleButton(this.game, this.game.world.centerX, this.game.world.centerY, this.playBtnRadius / 2, btnColor, 'icon-star');

      this.leaderboardBtn.onClick.add(this.clickLeaderboardBtn, this);

      return this.leaderboardBtn;
    }
  }, {
    key: 'createLvlPickBtn',
    value: function createLvlPickBtn() {
      var btnColor = 0x3F51B5;

      this.lvlPickBtn = new Engine.CircleButton(this.game, this.game.world.centerX, this.game.world.centerY, this.playBtnRadius / 2, btnColor, 'icon-apps');

      this.lvlPickBtn.onClick.add(this.clickLvlPickBtn, this);

      return this.lvlPickBtn;
    }
  }, {
    key: 'animateAdditionalBtns',
    value: function animateAdditionalBtns(btns) {
      var animationTime = 1000;
      var maxDelay = 500;

      var anglePart = Math.PI * 2 / btns.length;

      for (var i = 0; i < btns.length; i++) {
        var btn = btns[i];

        this.add.tween(btn).to({
          x: this.playBtn.x + Math.cos(Math.PI / 4 + anglePart * (1 + i)) * this.orbitsRadius,
          y: this.playBtn.y + Math.sin(Math.PI / 4 + anglePart * (1 + i)) * this.orbitsRadius
        }, animationTime + this.rnd.between(0, maxDelay), Phaser.Easing.Elastic.Out).start();
      }

      // this.add.tween(this.shareBtn)
      //   .to({
      //     x: this.playBtn.x + Math.cos(anglePart) * this.orbitsRadius,
      //     y: this.playBtn.y + Math.sin(anglePart) * this.orbitsRadius
      //   }, animationTime + this.rnd.between(0, maxDelay), Phaser.Easing.Elastic.Out)
      //   .start();
      //
      // this.add.tween(this.settingsBtn)
      //   .to({
      //     x: this.playBtn.x + Math.cos(anglePart * 2) * this.orbitsRadius,
      //     y: this.playBtn.y + Math.sin(anglePart * 2) * this.orbitsRadius
      //   }, animationTime + this.rnd.between(0, maxDelay), Phaser.Easing.Elastic.Out)
      //   .start();
      //
      // this.add.tween(this.leaderboardBtn)
      //   .to({
      //     x: this.playBtn.x + Math.cos(anglePart * 3) * this.orbitsRadius,
      //     y: this.playBtn.y + Math.sin(anglePart * 3) * this.orbitsRadius
      //   }, animationTime + this.rnd.between(0, maxDelay), Phaser.Easing.Elastic.Out)
      //   .start();
    }
  }, {
    key: 'createStartGameText',
    value: function createStartGameText() {
      var style = {
        font: '41px Open Sans',
        fill: '#FFFFFF'
      };

      this.startText = this.add.text(this.game.world.centerX, this.game.world.centerY, 'Starting game...', style);

      this.startText.alpha = 0;
      this.startText.anchor.setTo(0.5);

      this.add.tween(this.startText).to({
        alpha: 1
      }, 1000).start();
    }
  }, {
    key: 'clickPlayBtn',
    value: function clickPlayBtn() {
      var _this7 = this;

      var delay = 2000;

      this.createStartGameText();
      this.createBlackoutAnimation(delay).onComplete.add(function () {
        // this.state.restart();
        var numberOfGradation = 3;
        _this7.state.start('Game', true, false, numberOfGradation);
      }, this);
    }
  }, {
    key: 'clickLvlPickBtn',
    value: function clickLvlPickBtn() {
      this.state.start('Lvlpick', true, false, this.lvlPickBtn.data.color);
    }
  }, {
    key: 'clickSettingsBtn',
    value: function clickSettingsBtn() {
      this.state.start('Settings', true, false, this.settingsBtn.data.color);
    }
  }, {
    key: 'clickLeaderboardBtn',
    value: function clickLeaderboardBtn() {
      var _this8 = this;

      this.createBlackoutAnimation().onComplete.add(function () {
        _this8.state.restart();
      }, this);
    }
  }, {
    key: 'clickShareBtn',
    value: function clickShareBtn() {
      var _this9 = this;

      this.createBlackoutAnimation().onComplete.add(function () {
        _this9.state.restart();
      }, this);
    }
  }, {
    key: 'createBlackoutAnimation',
    value: function createBlackoutAnimation() {
      var delay = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

      var blackoutLayout = this.add.graphics(0, 0);
      blackoutLayout.alpha = 0;
      blackoutLayout.beginFill(0);
      blackoutLayout.drawRect(0, 0, this.game.width, this.game.height);
      blackoutLayout.endFill();

      var tween = this.add.tween(blackoutLayout).to({
        alpha: 1
      }, 400).delay(delay).start();

      return tween;
    }
  }, {
    key: 'render',
    value: function render() {
      var color = 'rgba(65, 194, 242, 0)';

      this.game.debug.geom(new Phaser.Line(0, this.game.world.centerY, this.game.width, this.game.world.centerY), color);
      this.game.debug.geom(new Phaser.Line(this.game.world.centerX, 0, this.game.world.centerX, this.game.height), color);

      // this.game.debug.inputInfo(25, 25);
    }
  }]);

  return Menu;
}(Phaser.State);

Engine.Menu = Menu;

var LvlpickBtn = function (_Phaser$Graphics2) {
  _inherits(LvlpickBtn, _Phaser$Graphics2);

  function LvlpickBtn(game, x, y, number, isLock) {
    _classCallCheck(this, LvlpickBtn);

    var _this10 = _possibleConstructorReturn(this, (LvlpickBtn.__proto__ || Object.getPrototypeOf(LvlpickBtn)).call(this, game, x, y));

    _this10.data.isLock = isLock;
    _this10.data.numberPosition = number;

    _this10.drawBtn();
    _this10.addText();
    return _this10;
  }

  _createClass(LvlpickBtn, [{
    key: 'drawBtn',
    value: function drawBtn() {
      var size = LvlpickBtn.size;
      var activeColor = 0xCFD8DC; // 0x9d9d9d;
      var lockedColor = 0x546E7A;

      var color = void 0;

      if (this.data.isLock) {
        color = lockedColor;
      } else {
        color = activeColor;
      }

      this.beginFill(color);
      this.drawRect(0, 0, size, size);
      this.endFill();
    }
  }, {
    key: 'addText',
    value: function addText() {
      var size = LvlpickBtn.size;
      var style = {
        font: '23px Open Sans',
        fill: 'black'
      };

      this.lable = this.game.make.text(size / 2, size / 2, this.data.numberPosition, style);
      this.lable.anchor.setTo(0.5);

      this.addChild(this.lable);
    }
  }]);

  return LvlpickBtn;
}(Phaser.Graphics);

LvlpickBtn.size = 75;

Engine.LvlpickBtn = LvlpickBtn;

var Lvlpick = function (_Phaser$State5) {
  _inherits(Lvlpick, _Phaser$State5);

  function Lvlpick() {
    _classCallCheck(this, Lvlpick);

    return _possibleConstructorReturn(this, (Lvlpick.__proto__ || Object.getPrototypeOf(Lvlpick)).call(this));
  }

  _createClass(Lvlpick, [{
    key: 'init',
    value: function init(bgColor) {
      this.stage.backgroundColor = bgColor;

      this.btnGridWidth = 5;
      this.btnGridHeight = 3;
    }
  }, {
    key: 'create',
    value: function create() {
      this.animateBackground();

      this.createLable();
      this.createBtns();
    }
  }, {
    key: 'render',
    value: function render() {
      return;
      var line1 = new Phaser.Line(this.game.world.centerX, 0, this.game.world.centerX, this.game.height);
      var line2 = new Phaser.Line(0, this.game.world.centerY, this.game.width, this.game.world.centerY);

      this.game.debug.geom(line1, 'rgb(0, 70, 255)');
      this.game.debug.geom(line2, 'rgb(0, 70, 255)');
    }
  }, {
    key: 'animateBackground',
    value: function animateBackground() {
      var _this12 = this;

      var targetColor = 0x0;
      var targetRadius = Math.sqrt(Math.pow(this.game.width, 2) + Math.pow(this.game.height, 2));
      var animationTime = 350;

      var animation = {
        graphics: this.add.graphics(0, 0),
        _radius: 0,
        game: this.game
      };

      Object.defineProperty(animation, 'radius', {
        get: function get() {
          return this._radius;
        },
        set: function set(value) {
          this._radius = value;

          this.graphics.beginFill(targetColor);
          this.graphics.drawCircle(this.game.world.centerX, this.game.world.centerY, this._radius);
          this.graphics.endFill();
        }
      });

      var tween = this.add.tween(animation).to({
        radius: targetRadius
      }, animationTime).start();

      tween.onComplete.add(function () {
        _this12.stage.backgroundColor = targetColor;
        animation.graphics.kill();
      }, this);
    }
  }, {
    key: 'createLable',
    value: function createLable() {
      var style = {
        font: '51px Open Sans',
        fill: 'white'
      };
      var animationTime = 1000;
      var animationDelay = 350;
      var marginTop = 100;

      this.lable = this.add.text(this.game.world.centerX, marginTop, 'Select level', style);

      this.lable.anchor.setTo(0.5, 0);

      this.lable.alpha = 0;

      this.add.tween(this.lable).to({
        alpha: 1
      }, animationTime).delay(animationDelay).start();
    }
  }, {
    key: 'createBtns',
    value: function createBtns() {
      var margin = 50;
      var btnSize = Engine.LvlpickBtn.size;
      var animationDelay = 350;
      var animationTime = 250;

      var number = 1;

      this.btnGroup = this.add.group();

      for (var y = 0; y < this.btnGridHeight; y++) {
        for (var x = 0; x < this.btnGridWidth; x++, number++) {
          var posX = x * (btnSize + margin);
          var posY = y * (btnSize + margin);

          var btn = new Engine.LvlpickBtn(this.game, posX, posY, number, number % 5 === 0);

          btn.alpha = 0;
          btn.inputEnabled = true;
          btn.events.onInputDown.add(this.btnClick, this);

          this.add.tween(btn).to({
            alpha: 1
          }, animationTime).delay(animationDelay).start();

          this.btnGroup.add(btn);
        }
      }

      this.btnGroup.x = this.game.width / 2 - this.btnGroup.width / 2;
      this.btnGroup.y = this.game.height / 2 - this.btnGroup.height / 2;
    }
  }, {
    key: 'btnClick',
    value: function btnClick(btn) {
      var _this13 = this;

      // console.log(this.world.children);
      this.fadeAnimation().onComplete.add(function () {
        _this13.state.start('Game', true, false, 3);
      }, this);
    }
  }, {
    key: 'fadeAnimation',
    value: function fadeAnimation() {
      var animationTime = 250;
      var lastTween = {};

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.world.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var displayObj = _step.value;

          lastTween = this.add.tween(displayObj).to({
            alpha: 0
          }, animationTime).start();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return lastTween;
    }
  }]);

  return Lvlpick;
}(Phaser.State);

Engine.Lvlpick = Lvlpick;

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
    key: 'getRandomColor',
    value: function getRandomColor() {
      return Engine.game.rnd.pick(this.gradition);
    }

    /**
     * Get color by number
     */

  }, {
    key: 'getByNumber',
    value: function getByNumber(number) {
      return this.gradition[number];
    }
  }, {
    key: 'getLastColor',
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

var Linker = function () {
  function Linker() {
    _classCallCheck(this, Linker);
  }

  _createClass(Linker, null, [{
    key: 'canTriangleLink',
    value: function canTriangleLink(tr1, tr2) {}
  }]);

  return Linker;
}();

var Meteor = function (_Phaser$Sprite) {
  _inherits(Meteor, _Phaser$Sprite);

  function Meteor(game) {
    var x = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
    var y = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
    var rotation = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
    var speed = arguments.length <= 4 || arguments[4] === undefined ? 100 : arguments[4];

    _classCallCheck(this, Meteor);

    var _this14 = _possibleConstructorReturn(this, (Meteor.__proto__ || Object.getPrototypeOf(Meteor)).call(this, game, x, y, game.cache.getBitmapData(Meteor.bitmapKey)));

    _this14.speed = speed;
    _this14.anchor.setTo(1);
    _this14.refreshRotation(rotation);
    return _this14;
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

var ScoreBadge = function (_Phaser$Graphics3) {
  _inherits(ScoreBadge, _Phaser$Graphics3);

  function ScoreBadge(game, x, y) {
    _classCallCheck(this, ScoreBadge);

    var _this15 = _possibleConstructorReturn(this, (ScoreBadge.__proto__ || Object.getPrototypeOf(ScoreBadge)).call(this, game, x, y));

    _this15.createLable();
    _this15.reDrawBadge();

    _this15.isVisible = false;
    _this15.alpha = 0;
    return _this15;
  }

  _createClass(ScoreBadge, [{
    key: 'createLable',
    value: function createLable() {
      var style = {
        font: '26px Open Sans',
        fill: 'white'
      };

      this.lable = this.game.make.text(0, 0, '0', style);
      this.lable.anchor.setTo(0.5);

      this.addChild(this.lable);
    }
  }, {
    key: 'reDrawBadge',
    value: function reDrawBadge() {
      var backgroundColor = 0;
      var radius = 5;
      var paddings = 5;

      this.clear();

      this.beginFill(backgroundColor, 0.8);
      this.drawRoundedRect(-(this.lable.width + paddings * 2) / 2, -(this.lable.height + paddings) / 2, this.lable.width + paddings * 2, this.lable.height, radius);
      this.endFill();
    }
  }, {
    key: 'show',
    value: function show() {
      if (this.isVisible) {
        console.log("visible:", this.isVisible);
        return;
      }

      var animationTime = 1000;

      var tween = this.game.add.tween(this).to({
        width: this.width,
        height: this.height
      }, animationTime, Phaser.Easing.Elastic.Out);

      this.width = 0;
      this.height = 0;
      this.alpha = 1;

      tween.start();

      this.isVisible = true;
    }
  }, {
    key: 'hide',
    value: function hide() {
      var _this16 = this;

      if (!this.isVisible) {
        return;
      }

      var animationTime = 250;
      var width = this.width;
      var height = this.height;

      var tween = this.game.add.tween(this).to({
        width: 0,
        height: 0
      }, animationTime, Phaser.Easing.Back.In);

      tween.onComplete.add(function () {
        _this16.width = width;
        _this16.height = height;
        _this16.alpha = 0;
      }, this);

      tween.start();

      this.isVisible = false;
      console.log(this.isVisible);
    }
  }, {
    key: 'score',
    get: function get() {
      return this._score;
    },
    set: function set(value) {
      this._score = value;
      this.lable.text = value.toString();
      this.reDrawBadge();
    }
  }]);

  return ScoreBadge;
}(Phaser.Graphics);

Engine.ScoreBadge = ScoreBadge;

var ScoreLable = function (_Phaser$Text) {
  _inherits(ScoreLable, _Phaser$Text);

  function ScoreLable(game, x, y, score, style) {
    _classCallCheck(this, ScoreLable);

    var _this17 = _possibleConstructorReturn(this, (ScoreLable.__proto__ || Object.getPrototypeOf(ScoreLable)).call(this, game, x, y, 'Score: ' + Math.round(score), style));

    _this17.score = score;

    _this17.game.add.existing(_this17);
    return _this17;
  }

  /**
   * Update score lable value
   * @param  {Number} score New score
   */


  _createClass(ScoreLable, [{
    key: 'changeValue',
    value: function changeValue(score) {
      var _this18 = this;

      this.game.tweens.remove(this);

      var tween = this.game.add.tween(this).to({
        score: score
      }, ScoreLable.animationChangeVal).onUpdateCallback(function () {
        _this18.text = 'Score: ' + Math.round(_this18.score);
      }, this);

      tween.onComplete.add(function () {
        _this18.text = 'Score: ' + Math.round(_this18.score);
      });

      tween.start();
    }
  }]);

  return ScoreLable;
}(Phaser.Text);

ScoreLable.animationChangeVal = 500;
Engine.ScoreLable = ScoreLable;

var Snake = function (_Phaser$Graphics4) {
  _inherits(Snake, _Phaser$Graphics4);

  function Snake(game) {
    _classCallCheck(this, Snake);

    var _this19 = _possibleConstructorReturn(this, (Snake.__proto__ || Object.getPrototypeOf(Snake)).call(this, game, 0, 0));

    _this19.head = {
      x: 0,
      y: 0
    };
    _this19.velocityX = 0;
    _this19.velocityY = 0;
    _this19.segments = [];
    return _this19;
  }

  _createClass(Snake, [{
    key: 'run',
    value: function run(x, y, targetX, targetY, impulseX, impulseY, color) {
      this.reset(0, 0);
      this.firstImpulse = Math.sqrt(Math.pow(impulseX, 2) + Math.pow(impulseX, 2));
      this.targetX = targetX;
      this.targetY = targetY;
      this.velocityX = impulseX;
      this.velocityY = impulseY;
      this.color = color;
      this.segments = [];
      this.head = {
        x: x,
        y: y
      };

      this.isRun = true;
      this.finishPhase = false;
    }
  }, {
    key: 'update',
    value: function update() {
      if (this.isRun) {
        this.updateVelocity();
        this.head.x += this.velocityX;
        this.head.y += this.velocityY;
        this.makeSnapshot();

        if (this.isFinish()) {
          this.stop();
        }
      }

      if (this.finishPhase) {
        this.makeSnapshot();

        if (this.segments[0].x === this.head.x && this.segments[0].y === this.head.y) {
          this.finishPhase = false;
          this.kill();
        }
      }

      this.drawAllSegments();
    }
  }, {
    key: 'updateVelocity',
    value: function updateVelocity() {
      var stepsUpdate = 60 * 0.1;

      var angle = this.game.math.angleBetween(this.head.x, this.head.y, this.targetX, this.targetY);
      var velocityX = Math.cos(angle) * Snake.speed;
      var velocityY = Math.sin(angle) * Snake.speed;

      this.velocityX += (velocityX - this.velocityX) / stepsUpdate;
      this.velocityY += (velocityY - this.velocityY) / stepsUpdate;
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.isRun = false;
      this.finishPhase = true;
    }
  }, {
    key: 'isFinish',
    value: function isFinish() {
      this.distance = this.game.math.distance(this.head.x, this.head.y, this.targetX, this.targetY);

      return this.distance < this.firstImpulse + Snake.speed;
    }
  }, {
    key: 'makeSnapshot',
    value: function makeSnapshot() {
      var segment = void 0;

      while (this.segments.length > Snake.maxSegments) {
        segment = this.segments.shift();
      }segment = {
        x: this.head.x,
        y: this.head.y
      };

      this.segments.push(segment);
    }
  }, {
    key: 'drawAllSegments',
    value: function drawAllSegments() {
      this.clear();

      for (var i = 0; i < this.segments.length; i++) {
        var segment = this.segments[i];
        var nextSegment = this.segments[i + 1] || segment;

        this.moveTo(segment.x, segment.y);

        this.lineStyle(Snake.size, this.color, 1);

        this.lineTo(nextSegment.x, nextSegment.y);

        if (this.isRun) {
          this.lineStyle(0, 0, 0);

          this.beginFill(this.color);
          this.drawCircle(segment.x, segment.y, Snake.size);
          this.endFill();
        }
      }
    }
  }]);

  return Snake;
}(Phaser.Graphics);

Snake.maxSegments = 10;
Snake.size = 10;
Snake.speed = 50;

Engine.Snake = Snake;

var Tone = function () {
  function Tone(game) {
    _classCallCheck(this, Tone);

    this.game = game;
    this.current = 0;
  }

  _createClass(Tone, [{
    key: 'create',
    value: function create() {}

    /**
     * Up and play next tone
     */

  }, {
    key: 'up',
    value: function up() {
      if (this.current > Tone.count) {
        this.current = Tone.count - 1;
      }

      this.tones[this.current].play();
      this.current++;
    }
  }, {
    key: 'low',
    value: function low() {
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
    key: 'reset',
    value: function reset() {
      this.current = 0;
    }
  }]);

  return Tone;
}();

Tone.count = 10;
Engine.Tone = Tone;

var Triangle = function (_Phaser$Sprite2) {
  _inherits(Triangle, _Phaser$Sprite2);

  /**
   * It's a triangle, yash it's not a joke
   * @param  {Phaser.Game}  game      [description]
   * @param  {[type]}  x         [description]
   * @param  {[type]}  y         [description]
   * @param  {Boolean} isRotated [description]
   * @param  {Number}  color     [description]
   */
  function Triangle(game, x, y, isRotated, colorSet) {
    var matrixPosition = arguments.length <= 5 || arguments[5] === undefined ? null : arguments[5];

    _classCallCheck(this, Triangle);

    var _this20 = _possibleConstructorReturn(this, (Triangle.__proto__ || Object.getPrototypeOf(Triangle)).call(this, game, x, y, Engine.game.cache.getBitmapData(Triangle.bitmapKey)));

    _this20.width = Triangle.size;
    _this20.height = Triangle.size;
    _this20.anchor.setTo(0.5);
    _this20.colorSet = colorSet;
    _this20.tint = _this20.colorSet.getRandomColor();

    /**
     * Poition in the matrix of triangles
     * @type {[type]}
     */
    _this20.matrixPos = matrixPosition;

    _this20.inputEnabled = true;
    _this20.input.pixelPerfectOver = true;
    _this20.input.pixelPerfectClick = true;

    _this20.events.deleteComplete = new Phaser.Signal();

    _this20.selected = false;
    _this20.isRotated = isRotated;

    if (isRotated) {
      _this20.rotation = Math.PI;
    }

    // this.addTextPosition();
    return _this20;
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
      var _this21 = this;

      var dalay = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

      if (this.game.input.activePointer.isDown) {
        this.game.add.tween(this).to({
          width: 0,
          height: 0,
          alpha: 0
        }, Triangle.animationTimeDelete).delay(dalay).start().onComplete.add(function () {
          _this21.events.deleteComplete.dispatch(_this21);
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
      var _this22 = this;

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
        _this22.tint = _this22.colorSet.getRandomColor();
      }, this);

      hideTween.delay(delay);

      hideTween.chain(showTween);
      hideTween.start();
    }
  }, {
    key: 'blink',
    value: function blink() {
      var _this23 = this;

      var lastColor = this.tint;
      var tween = this.game.add.tween(this);

      tween.to({
        alpha: 2
      }, 100).onComplete.add(function () {
        _this23.tint = lastColor;
        Triangle.blinks = [];
      }, this);

      tween.onStart.add(function () {
        _this23.alpha = 0;
        _this23.tint = 0x00FF00;
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
Triangle.animationTimeRecover = 300;
Triangle.bitmapKey = 'triangle';

Engine.Triangle = Triangle;

var Universe = function (_Phaser$Graphics5) {
  _inherits(Universe, _Phaser$Graphics5);

  function Universe(game) {
    var rotationSpeed = arguments.length <= 1 || arguments[1] === undefined ? 2.5 : arguments[1];

    _classCallCheck(this, Universe);

    var _this24 = _possibleConstructorReturn(this, (Universe.__proto__ || Object.getPrototypeOf(Universe)).call(this, game, game.world.centerX, game.world.centerY));

    _this24.anchor.setTo(0.5);

    _this24.rotationSpeed = rotationSpeed;
    _this24.rotation = _this24.game.rnd.realInRange(0, Math.PI * 2);

    _this24.drawUniverse();
    return _this24;
  }

  _createClass(Universe, [{
    key: 'drawUniverse',
    value: function drawUniverse() {
      var maxStarSize = 4;
      var minStarSize = 1;
      var universeSize = Math.sqrt(Math.pow(window.screen.availWidth, 2) + Math.pow(window.screen.availHeight, 2));
      var stars = 500;

      for (var i = 0; i < stars; i++) {
        var whiteGradation = 255 - this.game.rnd.between(0, 32);
        var starColor = Phaser.Color.getColor(whiteGradation, whiteGradation, whiteGradation);
        var x = this.game.rnd.between(-universeSize / 2, universeSize / 2);
        var y = this.game.rnd.between(-universeSize / 2, universeSize / 2);
        var starSize = this.game.rnd.between(minStarSize, maxStarSize);

        this.beginFill(starColor, Math.random());
        this.drawCircle(x, y, starSize);
        this.endFill();
      }
    }
  }, {
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
  }]);

  return Universe;
}(Phaser.Graphics);

Engine.Universe = Universe;

var Wave = function (_Phaser$Sprite3) {
  _inherits(Wave, _Phaser$Sprite3);

  function Wave(game, x, y) {
    _classCallCheck(this, Wave);

    var _this25 = _possibleConstructorReturn(this, (Wave.__proto__ || Object.getPrototypeOf(Wave)).call(this, game, x, y, Wave.bitmapKey, 0));

    _this25.anchor.setTo(0.5);

    _this25.alpha = 0;
    _this25.width = Engine.Triangle.size / 2;
    _this25.height = Engine.Triangle.size / 2;
    return _this25;
  }

  _createClass(Wave, [{
    key: 'playAnimation',
    value: function playAnimation(x, y) {
      var _this26 = this;

      var animationTime = 200;
      this.alpha = 1;
      this.x = x;
      this.y = y;
      this.frame = 0;
      this.width = Engine.Triangle.size / 2;
      this.height = Engine.Triangle.size / 2;

      var tweenSize = this.game.add.tween(this).to({
        width: Engine.Triangle.size * Wave.sizeRatio,
        height: Engine.Triangle.size * Wave.sizeRatio
      }, animationTime);

      var tweenDestroy = this.game.add.tween(this).to({ alpha: 0 }, animationTime).onUpdateCallback(function () {
        if (_this26.frame === Wave.countFrameAnimation - 1) {
          _this26.alpha = 0;
        }
        _this26.frame++;
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

      var size = Engine.Triangle.size * Wave.sizeRatio;
      var lineSize = 15;
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

Wave.sizeRatio = 3.5;
Wave.bitmapKey = 'wave';
Wave.countFrameAnimation = 12;

Engine.Wave = Wave;

var Game = function (_Phaser$State6) {
  _inherits(Game, _Phaser$State6);

  function Game() {
    _classCallCheck(this, Game);

    var _this27 = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this));

    window.gg = _this27;
    return _this27;
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

      this.tone.create();

      this.sketch();
      this.initEvents();
      this.createWave();
      this.createSounds();
      this.createSnakes();
      this.createHintTimer();
      this.createScoreBadge();
      this.createScoreLable();
      this.initializationFullScreen();

      this.createMeteor();

      this.forcePortrait = true;
    }
  }, {
    key: 'render',
    value: function render() {
      // this.game.debug.sprite
    }
  }, {
    key: 'update',
    value: function update() {}
  }, {
    key: 'createScoreBadge',
    value: function createScoreBadge() {
      var _this28 = this;

      var marginBadge = 35;

      this.scoreBadge = new Engine.ScoreBadge(this.game, 850, 500);

      this.scoreBadge.update = function () {
        _this28.scoreBadge.x = _this28.game.input.x;
        _this28.scoreBadge.y = _this28.game.input.y - marginBadge;
      };

      this.game.add.existing(this.scoreBadge);
    }
  }, {
    key: 'createSnakes',
    value: function createSnakes() {
      var snakesPullSize = 30;
      this.snakes = this.game.add.group();

      for (var i = 0; i < snakesPullSize; i++) {
        this.addSnake();
      }
    }
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
      var delayForSecondUniverseShow = 500;

      this.universeFirst = new Engine.Universe(this.game);
      this.universeSecond = new Engine.Universe(this.game, secondRotationSpeed);

      this.universeFirst.alpha = 0;
      this.universeSecond.alpha = 0;

      this.game.add.existing(this.universeFirst);
      this.game.add.existing(this.universeSecond);

      this.add.tween(this.universeFirst).to({
        alpha: 1
      }).start();

      this.add.tween(this.universeSecond).to({
        alpha: 1
      }).delay(delayForSecondUniverseShow).start();
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
      this.scoreLable.alpha = 0;

      this.add.tween(this.scoreLable).to({
        alpha: 1
      }).start();

      // TODO: TEMP
      this.scoreLable.inputEnabled = true;
      this.scoreLable.events.onInputDown.add(this.toggleFullScreen, this);
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
      var _this29 = this;

      var meteorTimerDelay = 20 * 1000;

      this.meteor = new Engine.Meteor(this.game);
      this.game.add.existing(this.meteor);
      this.meteor.sendToBack();
      this.meteor.outOfCameraBoundsKill = true;
      this.meteor.kill();

      this.meteorTimer = this.game.time.create();
      this.meteorTimer.loop(meteorTimerDelay, function () {
        if (_this29.game.rnd.pick([true, false])) {
          _this29.runMeteor();
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
        this.shakeItShakeIt(this.selectedTriangles.length);
        this.hintTimer.stop(false);
        this.hintTimer.start();
      }

      var betweenAnimationDalay = 25;
      var snakeForTriangle = 2;

      for (var i = 0; this.selectedTriangles.length > 0; i++) {
        var triangle = this.selectedTriangles.shift();

        if (isUnselect) {
          triangle.unselect();
        } else {
          triangle.delete(i * betweenAnimationDalay);
          if (this.selectedTriangles.length === 0) {
            this.scoreBadge.hide();
            this.snakesAnimationRun(triangle.world.x, triangle.world.y, triangle.colorSet, Math.floor((i + 1) / snakeForTriangle));
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
        this.selectedTriangles.push(triangle);
      } else {
        var lastSelectedTriangle = this.selectedTriangles[this.selectedTriangles.length - 1];
        var preLastSelectedTriangle = this.selectedTriangles[this.selectedTriangles.length - 2];

        if (triangle.selected && triangle === preLastSelectedTriangle) {
          lastSelectedTriangle.unselect();
          this.selectedTriangles.pop();
          this.newUnselect(this.selectedTriangles.length);
        } else if (!triangle.selected && this.canTriangleLink(lastSelectedTriangle, triangle) && lastSelectedTriangle.colorSet === triangle.colorSet) {
          triangle.select();
          this.selectedTriangles.push(triangle);
          this.newSelect(this.selectedTriangles.length);
        }
      }
    }
  }, {
    key: 'newSelect',
    value: function newSelect(count) {
      if (count > this.minTrianglesDestroy - 1) {
        this.scoreBadge.score = Math.round(Math.pow(count, 2.15) * 10);
        this.scoreBadge.show();
      }
      // this.tone.up();
    }
  }, {
    key: 'newUnselect',
    value: function newUnselect(count) {
      if (count < this.minTrianglesDestroy) {
        this.scoreBadge.hide();
      } else {
        this.scoreBadge.score = Math.round(Math.pow(count, 2.15) * 10);
      }
      // this.tone.low();
    }

    /**
     * Check triangles link
     */

  }, {
    key: 'canTriangleLink',
    value: function canTriangleLink(tr1, tr2) {
      var result = false;
      if (tr1.matrixPos.y === tr2.matrixPos.y) {
        if (tr1.matrixPos.x + 1 === tr2.matrixPos.x || tr1.matrixPos.x - 1 === tr2.matrixPos.x) {
          result = true;
        }
      } else if (tr1.matrixPos.x === tr2.matrixPos.x) {
        if (tr1.matrixPos.x % 2 === 0) {
          if (tr1.isRotated && tr2.matrixPos.y === tr1.matrixPos.y - 1) {
            result = true;
          } else if (!tr1.isRotated && tr2.matrixPos.y === tr1.matrixPos.y + 1) {
            result = true;
          }
        } else {
          if (!tr1.isRotated && tr2.matrixPos.y === tr1.matrixPos.y + 1) {
            result = true;
          } else if (tr1.isRotated && tr2.matrixPos.y === tr1.matrixPos.y - 1) {
            result = true;
          }
        }
      }

      return result;
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
      if (this.getSomeCombination().length === 0) {
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

      for (var _x12 = 0; _x12 < this.triangleMatrixWidth; _x12++) {
        for (var _y = 0; _y < this.triangleMatrixHeight; _y++) {
          if (!usedCell[_x12][_y] && this.hasCombination(usedCell, this.trianglesMatrix[_x12][_y].colorSet, _x12, _y, 1)) {
            triangles.push(this.trianglesMatrix[_x12][_y]);
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

    /**
     * ScreeShaker Hero
     */

  }, {
    key: 'shakeItShakeIt',
    value: function shakeItShakeIt(destroyedTriangles) {
      var _this30 = this;

      var x = this.triangleGroup.x;
      var y = this.triangleGroup.y;
      var amplitudeY = this.rnd.between(1, destroyedTriangles * 0.9);
      var amplitudeX = this.rnd.between(1, destroyedTriangles * 0.9);
      var timeAnimation = 15;
      var numbersPulse = 10;
      var amplitudePart = Math.sqrt(Math.pow(amplitudeX, 2) + Math.pow(amplitudeY, 2)) / numbersPulse;

      var shakerTween = this.add.tween(this.triangleGroup);

      for (var i = 0; i < numbersPulse; i++) {
        if (i % 2 === 0) {
          shakerTween.to({
            x: x + amplitudeX,
            y: y + amplitudeY
          }, timeAnimation, Phaser.Easing.Linear.None);
        } else {
          shakerTween.to({
            x: x - amplitudeX,
            y: y - amplitudeY
          }, timeAnimation, Phaser.Easing.Linear.None);
        }

        amplitudeX -= amplitudePart;
        amplitudeY -= amplitudePart;
      }

      shakerTween.onComplete.add(function () {
        _this30.triangleGroup.x = x;
        _this30.triangleGroup.y = y;
      }, this);
      shakerTween.start();
    }
  }, {
    key: 'snakesAnimationRun',
    value: function snakesAnimationRun(x, y, colorGradation, count) {
      var force = 25;

      for (var i = 0; i < count; i++) {
        var snake = this.snakes.getFirstDead();

        if (snake === null) {
          snake = this.addSnake();
        }

        var angle = Math.PI * 2 / count * i;
        var impulseX = Math.cos(angle) * force;
        var impulseY = Math.sin(angle) * force;

        snake.run(x, y, this.scoreLable.world.x, this.scoreLable.world.y, impulseX, impulseY, colorGradation.getRandomColor());
      }
    }
  }, {
    key: 'addSnake',
    value: function addSnake() {
      var snake = new Engine.Snake(this.game);
      snake.kill();

      this.snakes.add(snake);

      return snake;
    }
  }]);

  return Game;
}(Phaser.State);

Engine.Game = Game;

var Log = function () {
  function Log() {
    _classCallCheck(this, Log);
  }

  _createClass(Log, null, [{
    key: 'init',
    value: function init() {
      this.startTime = new Date();
    }
  }, {
    key: 'write',
    value: function write(part, msg) {
      var time = (new Date() - this.startTime) / 1000;
      console.log('[' + time + ' sec] [' + part + '] ' + msg);
    }
  }]);

  return Log;
}();

Engine.Log = Log;

Engine.game = new Phaser.Game(Engine.maxWidth, Engine.maxHeight, Phaser.AUTO);

window.onresize = function () {
  Engine.game.scale.setGameSize(window.innerWidth, window.innerHeight);
};

Engine.game.state.add('Boot', Engine.Boot);
Engine.game.state.add('Menu', Engine.Menu);
Engine.game.state.add('Game', Engine.Game);
Engine.game.state.add('Loader', Engine.Loader);
Engine.game.state.add('Lvlpick', Engine.Lvlpick);
Engine.game.state.add('Settings', Engine.Settings);
// Engine.game.state.add('Leaderboard', Engine.Leaderboard);

Engine.game.state.start('Boot');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS5qcyIsImx2bC5qcyIsImJvb3QuanMiLCJsb2FkZXIuanMiLCJzZXR0aW5ncy5qcyIsImNpcmNsZS1idXR0b24uanMiLCJtZW51LmpzIiwibHZscGljay1idG4uanMiLCJsdmxwaWNrLmpzIiwiY29sb3JzZXQuanMiLCJsaW5rZXIuanMiLCJtZXRlb3IuanMiLCJzY29yZS1iYWRnZS5qcyIsInNjb3JlbGFibGUuanMiLCJzbmFrZS5qcyIsInRvbmUuanMiLCJ0cmlhbmdsZS5qcyIsInVuaXZlcnNlLmpzIiwid2F2ZS5qcyIsImdhbWUuanMiLCJsb2dnZXIuanMiLCJhcHAuanMiXSwibmFtZXMiOlsiRW5naW5lIiwibWluV2lkdGgiLCJtaW5IZWlnaHQiLCJtYXhXaWR0aCIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJtYXhIZWlnaHQiLCJpbm5lckhlaWdodCIsIkx2bCIsImNhbGxlciIsIl9pbnN0YW5jZSIsIkJvb3QiLCJnYW1lIiwic3RhZ2UiLCJkaXNhYmxlVmlzaWJpbGl0eUNoYW5nZSIsInNjYWxlIiwicGFnZUFsaWduSG9yaXpvbnRhbGx5IiwicGFnZUFsaWduVmVydGljYWxseSIsInN0YXRlIiwic3RhcnQiLCJQaGFzZXIiLCJTdGF0ZSIsIkxvYWRlciIsImJhY2tncm91bmRDb2xvciIsImFkZFByb2dyZXNzTGFibGUiLCJsb2FkIiwib25GaWxlQ29tcGxldGUiLCJhZGQiLCJyZWZyZXNoUHJvZ3Jlc3MiLCJpbWFnZSIsImNhY2hlIiwiYWRkQml0bWFwRGF0YSIsIlRyaWFuZ2xlIiwiYml0bWFwS2V5IiwiZ2VuZXJhdGVTcHJpdGUiLCJNZXRlb3IiLCJnZW5lcmF0ZVdhdmVUZXh0dXJlIiwiZGF0YSIsIldhdmUiLCJnZW5lcmF0ZUF0bGFzRGF0YSIsImFkZFRleHR1cmVBdGxhcyIsImJpdG1hcCIsImNhbnZhcyIsImF0bGFzRGF0YSIsIlRFWFRVUkVfQVRMQVNfSlNPTl9IQVNIIiwic3R5bGUiLCJmb250IiwiZmlsbCIsInByb2dyZXNzTGFibGUiLCJ0ZXh0Iiwid29ybGQiLCJjZW50ZXJYIiwiY2VudGVyWSIsImFuY2hvciIsInNldFRvIiwicHJvZ3Jlc3MiLCJjYWNoZUtleSIsInN1Y2Nlc3MiLCJ0b3RhbExvYWRlZCIsInRvdGFsRmlsZXMiLCJTZXR0aW5ncyIsImJnQ29sb3IiLCJ0ZXN0IiwiYWxwaGEiLCJ0d2VlbiIsInRvIiwiQ2lyY2xlQnV0dG9uIiwicmFkaXVzIiwidmFsIiwicmVEcmF3IiwieCIsInkiLCJjb2xvciIsImljb25OYW1lIiwiZXhpc3RpbmciLCJpY29uIiwic3ByaXRlIiwid2lkdGgiLCJoZWlnaHQiLCJhZGRDaGlsZCIsImlucHV0RW5hYmxlZCIsIm9uQ2xpY2siLCJTaWduYWwiLCJldmVudHMiLCJvbklucHV0RG93biIsImFkZE9uY2UiLCJhbmltYXRlQnRuIiwiYW5pbWF0aW9uVGltZSIsIm5ld0J0blJhZGl1cyIsIk1hdGgiLCJzcXJ0IiwicGFyZW50IiwiYnJpbmdUb1RvcCIsImhpZGVJY29uIiwiRWFzaW5nIiwiU2ludXNvaWRhbCIsIkluT3V0Iiwib25Db21wbGV0ZSIsImRpc3BhdGNoIiwiY2xlYXIiLCJiZWdpbkZpbGwiLCJkcmF3Q2lyY2xlIiwiZW5kRmlsbCIsIkdyYXBoaWNzIiwiTWVudSIsInBsYXlCdG5Db2xvciIsInBsYXlCdG5SYWRpdXMiLCJvcmJpdHNSYWRpdXMiLCJjcmVhdGVMb2dvIiwiY3JlYXRlQnRucyIsImxvZ29MYWJsZSIsImxlYWRlcmJvYXJkQnRuIiwiY3JlYXRlTGVhZGVyYm9hcmRCdG4iLCJzZXR0aW5nc0J0biIsImNyZWF0ZVNldHRpbmdzQnRuIiwic2hhcmVCdG4iLCJjcmVhdGVTaGFyZUJ0biIsImx2bFBpY2tCdG4iLCJjcmVhdGVMdmxQaWNrQnRuIiwicGxheUJ0biIsImNyZWF0ZVBsYXlCdG4iLCJhZGRpdGlvbmFsQnRucyIsImFuaW1hdGVBZGRpdGlvbmFsQnRucyIsImNsaWNrUGxheUJ0biIsImJ0bkNvbG9yIiwiY2xpY2tTZXR0aW5nc0J0biIsImNsaWNrU2hhcmVCdG4iLCJjbGlja0xlYWRlcmJvYXJkQnRuIiwiY2xpY2tMdmxQaWNrQnRuIiwiYnRucyIsIm1heERlbGF5IiwiYW5nbGVQYXJ0IiwiUEkiLCJsZW5ndGgiLCJpIiwiYnRuIiwiY29zIiwic2luIiwicm5kIiwiYmV0d2VlbiIsIkVsYXN0aWMiLCJPdXQiLCJzdGFydFRleHQiLCJkZWxheSIsImNyZWF0ZVN0YXJ0R2FtZVRleHQiLCJjcmVhdGVCbGFja291dEFuaW1hdGlvbiIsIm51bWJlck9mR3JhZGF0aW9uIiwicmVzdGFydCIsImJsYWNrb3V0TGF5b3V0IiwiZ3JhcGhpY3MiLCJkcmF3UmVjdCIsImRlYnVnIiwiZ2VvbSIsIkxpbmUiLCJMdmxwaWNrQnRuIiwibnVtYmVyIiwiaXNMb2NrIiwibnVtYmVyUG9zaXRpb24iLCJkcmF3QnRuIiwiYWRkVGV4dCIsInNpemUiLCJhY3RpdmVDb2xvciIsImxvY2tlZENvbG9yIiwibGFibGUiLCJtYWtlIiwiTHZscGljayIsImJ0bkdyaWRXaWR0aCIsImJ0bkdyaWRIZWlnaHQiLCJhbmltYXRlQmFja2dyb3VuZCIsImNyZWF0ZUxhYmxlIiwibGluZTEiLCJsaW5lMiIsInRhcmdldENvbG9yIiwidGFyZ2V0UmFkaXVzIiwicG93IiwiYW5pbWF0aW9uIiwiX3JhZGl1cyIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZ2V0Iiwic2V0IiwidmFsdWUiLCJraWxsIiwiYW5pbWF0aW9uRGVsYXkiLCJtYXJnaW5Ub3AiLCJtYXJnaW4iLCJidG5TaXplIiwiYnRuR3JvdXAiLCJncm91cCIsInBvc1giLCJwb3NZIiwiYnRuQ2xpY2siLCJmYWRlQW5pbWF0aW9uIiwibGFzdFR3ZWVuIiwiY2hpbGRyZW4iLCJkaXNwbGF5T2JqIiwiQ29sb3JTZXQiLCJncmFkaXRpb24iLCJwaWNrIiwiR1JBREFUSU9OUyIsIkxpbmtlciIsInRyMSIsInRyMiIsInJvdGF0aW9uIiwic3BlZWQiLCJnZXRCaXRtYXBEYXRhIiwicmVmcmVzaFJvdGF0aW9uIiwidmVsb2NpdHlYIiwidmVsb2NpdHlZIiwiYWxpdmUiLCJiaXRtYXBEYXRhIiwiZ3JhZGllbnQiLCJjdHgiLCJjcmVhdGVMaW5lYXJHcmFkaWVudCIsImFkZENvbG9yU3RvcCIsImJlZ2luUGF0aCIsImZpbGxTdHlsZSIsInJlY3QiLCJTcHJpdGUiLCJTY29yZUJhZGdlIiwicmVEcmF3QmFkZ2UiLCJpc1Zpc2libGUiLCJwYWRkaW5ncyIsImRyYXdSb3VuZGVkUmVjdCIsImNvbnNvbGUiLCJsb2ciLCJCYWNrIiwiSW4iLCJfc2NvcmUiLCJ0b1N0cmluZyIsIlNjb3JlTGFibGUiLCJzY29yZSIsInJvdW5kIiwidHdlZW5zIiwicmVtb3ZlIiwiYW5pbWF0aW9uQ2hhbmdlVmFsIiwib25VcGRhdGVDYWxsYmFjayIsIlRleHQiLCJTbmFrZSIsImhlYWQiLCJzZWdtZW50cyIsInRhcmdldFgiLCJ0YXJnZXRZIiwiaW1wdWxzZVgiLCJpbXB1bHNlWSIsInJlc2V0IiwiZmlyc3RJbXB1bHNlIiwiaXNSdW4iLCJmaW5pc2hQaGFzZSIsInVwZGF0ZVZlbG9jaXR5IiwibWFrZVNuYXBzaG90IiwiaXNGaW5pc2giLCJzdG9wIiwiZHJhd0FsbFNlZ21lbnRzIiwic3RlcHNVcGRhdGUiLCJhbmdsZSIsIm1hdGgiLCJhbmdsZUJldHdlZW4iLCJkaXN0YW5jZSIsInNlZ21lbnQiLCJtYXhTZWdtZW50cyIsInNoaWZ0IiwicHVzaCIsIm5leHRTZWdtZW50IiwibW92ZVRvIiwibGluZVN0eWxlIiwibGluZVRvIiwiVG9uZSIsImN1cnJlbnQiLCJjb3VudCIsInRvbmVzIiwicGxheSIsImlzUm90YXRlZCIsImNvbG9yU2V0IiwibWF0cml4UG9zaXRpb24iLCJ0aW50IiwiZ2V0UmFuZG9tQ29sb3IiLCJtYXRyaXhQb3MiLCJpbnB1dCIsInBpeGVsUGVyZmVjdE92ZXIiLCJwaXhlbFBlcmZlY3RDbGljayIsImRlbGV0ZUNvbXBsZXRlIiwic2VsZWN0ZWQiLCJhbmltYXRpb25UaW1lU2VsZWN0IiwiZGFsYXkiLCJhY3RpdmVQb2ludGVyIiwiaXNEb3duIiwiYW5pbWF0aW9uVGltZURlbGV0ZSIsIkxpbmVhciIsIk5vbmUiLCJoaWRlVHdlZW4iLCJzaG93VHdlZW4iLCJjaGFpbiIsImxhc3RDb2xvciIsImJsaW5rcyIsIm9uU3RhcnQiLCJsYXN0QmxpbmsiLCJ0aW1lIiwiYW5pbWF0aW9uVGltZVJlY292ZXIiLCJVbml2ZXJzZSIsInJvdGF0aW9uU3BlZWQiLCJyZWFsSW5SYW5nZSIsImRyYXdVbml2ZXJzZSIsIm1heFN0YXJTaXplIiwibWluU3RhclNpemUiLCJ1bml2ZXJzZVNpemUiLCJzY3JlZW4iLCJhdmFpbFdpZHRoIiwiYXZhaWxIZWlnaHQiLCJzdGFycyIsIndoaXRlR3JhZGF0aW9uIiwic3RhckNvbG9yIiwiQ29sb3IiLCJnZXRDb2xvciIsInN0YXJTaXplIiwicmFuZG9tIiwiZnJhbWUiLCJ0d2VlblNpemUiLCJzaXplUmF0aW8iLCJ0d2VlbkRlc3Ryb3kiLCJjb3VudEZyYW1lQW5pbWF0aW9uIiwiZnJhbWVzIiwibGluZVNpemUiLCJzcHJpdGVTaGVldFdpZHRoIiwic3Ryb2tlU3R5bGUiLCJ3IiwiaCIsImxpbmVXaWR0aCIsImVsbGlwc2UiLCJzdHJva2UiLCJHYW1lIiwiZ2ciLCJjb2xvclNldHMiLCJ0b25lIiwibWFyZ2luTGVmdCIsIm1pblRyaWFuZ2xlc0Rlc3Ryb3kiLCJ0cmlhbmdsZXNNYXRyaXgiLCJzZWxlY3RlZFRyaWFuZ2xlcyIsInRyaWFuZ2xlTWF0cml4V2lkdGgiLCJ0cmlhbmdsZU1hdHJpeEhlaWdodCIsImNyZWF0ZVVuaXZlcnNlIiwiY3JlYXRlR3JhZGF0aW9ucyIsInRyaWFuZ2xlR3JvdXAiLCJjcmVhdGUiLCJza2V0Y2giLCJpbml0RXZlbnRzIiwiY3JlYXRlV2F2ZSIsImNyZWF0ZVNvdW5kcyIsImNyZWF0ZVNuYWtlcyIsImNyZWF0ZUhpbnRUaW1lciIsImNyZWF0ZVNjb3JlQmFkZ2UiLCJjcmVhdGVTY29yZUxhYmxlIiwiaW5pdGlhbGl6YXRpb25GdWxsU2NyZWVuIiwiY3JlYXRlTWV0ZW9yIiwiZm9yY2VQb3J0cmFpdCIsIm1hcmdpbkJhZGdlIiwic2NvcmVCYWRnZSIsInVwZGF0ZSIsInNuYWtlc1B1bGxTaXplIiwic25ha2VzIiwiYWRkU25ha2UiLCJhbGxHcmFkYXRpb24iLCJBcnJheVV0aWxzIiwic2h1ZmZsZSIsInNlY29uZFJvdGF0aW9uU3BlZWQiLCJkZWxheUZvclNlY29uZFVuaXZlcnNlU2hvdyIsInVuaXZlcnNlRmlyc3QiLCJ1bml2ZXJzZVNlY29uZCIsInJhbmRvbUNvbG9yU2V0IiwibWFyZ2luUmlnaHQiLCJmb250U3R5bGUiLCJzY29yZUxhYmxlIiwidG9nZ2xlRnVsbFNjcmVlbiIsImhpbnRUaW1lb3V0IiwiaGludFRpbWVyIiwibG9vcCIsInZpc3VhbGlzYXRpb25IaW50IiwibWV0ZW9yVGltZXJEZWxheSIsIm1ldGVvciIsInNlbmRUb0JhY2siLCJvdXRPZkNhbWVyYUJvdW5kc0tpbGwiLCJtZXRlb3JUaW1lciIsInJ1bk1ldGVvciIsIndhdmUiLCJtYXJnaW5YIiwibWFyZ2luWSIsIm1hcmdpblJvdGF0aW9uIiwic2lkZSIsInRyaWFuZ2xlIiwiZ2V0SGludFRyaWFuZ2xlIiwidW5kZWZpbmVkIiwiaGludE1lIiwib25VcCIsImRlc3Ryb3lUcmlhbmdsZSIsImRlbGF5Rm9yRGlzcGxheSIsImdyb3dVcCIsIm9uSW5wdXRPdmVyIiwic2VsZWN0VHJpYW5nbGUiLCJyZWNvdmVyVHJpYW5nbGUiLCJjZW50ZXJpbmdNYXRyaXgiLCJpc1Vuc2VsZWN0IiwidXBkYXRlU2NvcmUiLCJzaGFrZUl0U2hha2VJdCIsImJldHdlZW5BbmltYXRpb25EYWxheSIsInNuYWtlRm9yVHJpYW5nbGUiLCJ1bnNlbGVjdCIsImRlbGV0ZSIsImhpZGUiLCJzbmFrZXNBbmltYXRpb25SdW4iLCJmbG9vciIsInBsYXlBbmltYXRpb24iLCJ0aW1lckV4aXN0TW92ZSIsInByb2Nlc3NQb3NpdGlvbiIsInJlY292ZXIiLCJwb2ludCIsInNlbGVjdCIsImxhc3RTZWxlY3RlZFRyaWFuZ2xlIiwicHJlTGFzdFNlbGVjdGVkVHJpYW5nbGUiLCJwb3AiLCJuZXdVbnNlbGVjdCIsImNhblRyaWFuZ2xlTGluayIsIm5ld1NlbGVjdCIsInNob3ciLCJyZXN1bHQiLCJmdWxsU2NyZWVuU2NhbGVNb2RlIiwiU2NhbGVNYW5hZ2VyIiwiUkVTSVpFIiwib25GdWxsU2NyZWVuQ2hhbmdlIiwicmVzaXplU2NyZWVuIiwiaXNGdWxsU2NyZWVuIiwic3RvcEZ1bGxTY3JlZW4iLCJzdGFydEZ1bGxTY3JlZW4iLCJjaGFuZ2VWYWx1ZSIsInJlc2l6ZSIsImhhbGZUcmlhbmdsZVNpemUiLCJ0aW1lRGVsYXkiLCJ1cGRhdGVDb2xvciIsImdldFNvbWVDb21iaW5hdGlvbiIsImRlbGF5RGVzdHJveSIsInRpbWVyIiwicmVidWlsZE1hcCIsInVzZWRDZWxsIiwidHJpYW5nbGVzIiwiaGFzQ29tYmluYXRpb24iLCJjbnQiLCJkZXN0cm95ZWRUcmlhbmdsZXMiLCJhbXBsaXR1ZGVZIiwiYW1wbGl0dWRlWCIsInRpbWVBbmltYXRpb24iLCJudW1iZXJzUHVsc2UiLCJhbXBsaXR1ZGVQYXJ0Iiwic2hha2VyVHdlZW4iLCJjb2xvckdyYWRhdGlvbiIsImZvcmNlIiwic25ha2UiLCJnZXRGaXJzdERlYWQiLCJydW4iLCJMb2ciLCJzdGFydFRpbWUiLCJEYXRlIiwicGFydCIsIm1zZyIsIkFVVE8iLCJvbnJlc2l6ZSIsInNldEdhbWVTaXplIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxTQUFBO0FBQ0FDLFlBQUEsR0FEQTtBQUVBQyxhQUFBLEdBRkE7QUFHQUMsWUFBQUMsT0FBQUMsVUFIQTtBQUlBQyxhQUFBRixPQUFBRztBQUpBLENBQUE7O0lDQUFDLEc7QUFDQSxlQUFBQyxNQUFBLEVBQUE7QUFBQTs7QUFDQSxRQUFBQSxXQUFBRCxHQUFBLEVBQUE7QUFDQSxZQUFBLDJDQUFBO0FBQ0E7QUFDQTs7Ozt3QkFFQTtBQUNBLFVBQUEsQ0FBQUEsSUFBQUUsU0FBQSxFQUFBO0FBQ0FGLFlBQUFFLFNBQUEsR0FBQSxJQUFBRixHQUFBLENBQUFB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QUEsQ0FBQU0sS0FBQSxDQUFBUyxHQUFBLENBQUEsU0FBQSxFQUFBM0IsT0FBQXFLLE9BQUE7QUFDQXJLLE9BQUFZLElBQUEsQ0FBQU0sS0FBQSxDQUFBUyxHQUFBLENBQUEsVUFBQSxFQUFBM0IsT0FBQTRELFFBQUE7QUFDQTs7QUFFQTVELE9BQUFZLElBQUEsQ0FBQU0sS0FBQSxDQUFBQyxLQUFBLENBQUEsTUFBQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgRW5naW5lID0ge1xyXG4gIG1pbldpZHRoOiA2NDAsXHJcbiAgbWluSGVpZ2h0OiAzMjAsXHJcbiAgbWF4V2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLFxyXG4gIG1heEhlaWdodDogd2luZG93LmlubmVySGVpZ2h0LFxyXG59O1xyXG4iLCJjbGFzcyBMdmwge1xyXG4gIGNvbnN0cnVjdG9yKGNhbGxlcikge1xyXG4gICAgaWYgKGNhbGxlciAhPT0gTHZsKSB7XHJcbiAgICAgIHRocm93ICdJdHMgc2luZ2xldG9uIGNsYXNzLCB0cnkgdXNlIEx2bC5pbnN0YW5jZSdcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXQgaW5zdGFuY2UoKSB7XHJcbiAgICBpZiAoIUx2bC5faW5zdGFuY2UpIHtcclxuICAgICAgTHZsLl9pbnN0YW5jZSA9IG5ldyBMdmwoTHZsKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gTHZsLl9pbnN0YW5jZTtcclxuICB9XHJcbn1cclxuXHJcbkVuZ2luZS5MdmwgPSBMdmw7XHJcbiIsImNsYXNzIEJvb3QgZXh0ZW5kcyBQaGFzZXIuU3RhdGUge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIHByZWxvYWQoKSB7XHJcbiAgfVxyXG5cclxuICBjcmVhdGUoKSB7XHJcbiAgICB0aGlzLmdhbWUuc3RhZ2UuZGlzYWJsZVZpc2liaWxpdHlDaGFuZ2UgPSB0cnVlO1xyXG4gICAgdGhpcy5zY2FsZS5wYWdlQWxpZ25Ib3Jpem9udGFsbHkgPSB0cnVlO1xyXG4gICAgdGhpcy5zY2FsZS5wYWdlQWxpZ25WZXJ0aWNhbGx5ID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLnN0YXRlLnN0YXJ0KCdMb2FkZXInKTtcclxuICB9XHJcbn1cclxuXHJcbkVuZ2luZS5Cb290ID0gQm9vdDtcclxuIiwiY2xhc3MgTG9hZGVyIGV4dGVuZHMgUGhhc2VyLlN0YXRlIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICBwcmVsb2FkKCkge1xyXG4gICAgdGhpcy5nYW1lLnN0YWdlLmJhY2tncm91bmRDb2xvciA9ICcjMDAwJztcclxuICAgIHRoaXMuYWRkUHJvZ3Jlc3NMYWJsZSgpO1xyXG5cclxuICAgIHRoaXMubG9hZC5vbkZpbGVDb21wbGV0ZS5hZGQodGhpcy5yZWZyZXNoUHJvZ3Jlc3MsIHRoaXMpO1xyXG5cclxuICAgIC8vIHRoaXMubG9hZC5hdWRpbygnbXVzaWMxJywgJ2Fzc2V0cy9tdXNpYy9ZYWwhWCAtIEZvcmdpdmVuLm1wMycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCdpY29uLXBsYXknLCAnYXNzZXRzL2ltZy9pY29uLXBsYXkucG5nJyk7XHJcbiAgICB0aGlzLmxvYWQuaW1hZ2UoJ2ljb24tc2hhcmUnLCAnYXNzZXRzL2ltZy9pY29uLXNoYXJlLnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCdpY29uLXNldHRpbmdzJywgJ2Fzc2V0cy9pbWcvaWNvbi1zZXR0aW5ncy5wbmcnKTtcclxuICAgIHRoaXMubG9hZC5pbWFnZSgnaWNvbi1zdGFyJywgJ2Fzc2V0cy9pbWcvaWNvbi1zdGFyLnBuZycpO1xyXG4gICAgdGhpcy5sb2FkLmltYWdlKCdpY29uLWFwcHMnLCAnYXNzZXRzL2ltZy9pY29uLWFwcHMucG5nJyk7XHJcblxyXG4gICAgdGhpcy5nYW1lLmNhY2hlLmFkZEJpdG1hcERhdGEoRW5naW5lLlRyaWFuZ2xlLmJpdG1hcEtleSwgRW5naW5lLlRyaWFuZ2xlLmdlbmVyYXRlU3ByaXRlKHRoaXMuZ2FtZSkpO1xyXG4gICAgdGhpcy5nYW1lLmNhY2hlLmFkZEJpdG1hcERhdGEoRW5naW5lLk1ldGVvci5iaXRtYXBLZXksIEVuZ2luZS5NZXRlb3IuZ2VuZXJhdGVTcHJpdGUodGhpcy5nYW1lKSk7XHJcblxyXG4gICAgdGhpcy5nZW5lcmF0ZVdhdmVUZXh0dXJlKCk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGUoKSB7XHJcbiAgICAvLyBsZXQgbnVtYmVyT2ZHcmFkYXRpb24gPSAzO1xyXG4gICAgdGhpcy5zdGF0ZS5zdGFydCgnTWVudScpO1xyXG4gICAgLy8gdGhpcy5zdGF0ZS5zdGFydCgnR2FtZScsIHRydWUsIGZhbHNlLCBudW1iZXJPZkdyYWRhdGlvbik7XHJcbiAgICAvLyB0aGlzLnN0YXRlLnN0YXJ0KCdMdmxwaWNrJywgdHJ1ZSwgZmFsc2UsIDB4M0Y1MUI1KTtcclxuICB9XHJcblxyXG4gIGdlbmVyYXRlV2F2ZVRleHR1cmUoKSB7XHJcbiAgICBsZXQgZGF0YSA9IEVuZ2luZS5XYXZlLmdlbmVyYXRlQXRsYXNEYXRhKCk7XHJcbiAgICB0aGlzLmdhbWUuY2FjaGUuYWRkVGV4dHVyZUF0bGFzKFdhdmUuYml0bWFwS2V5LCAnJywgZGF0YS5iaXRtYXAuY2FudmFzLCBkYXRhLmF0bGFzRGF0YSwgUGhhc2VyLkxvYWRlci5URVhUVVJFX0FUTEFTX0pTT05fSEFTSCk7XHJcbiAgfVxyXG5cclxuICBhZGRQcm9ncmVzc0xhYmxlKCkge1xyXG4gICAgbGV0IHN0eWxlID0ge1xyXG4gICAgICBmb250OiAnNDFweCBPcGVuIFNhbnMnLFxyXG4gICAgICBmaWxsOiAnIzAwRTY3NicsXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5wcm9ncmVzc0xhYmxlID0gdGhpcy5hZGQudGV4dCh0aGlzLmdhbWUud29ybGQuY2VudGVyWCwgdGhpcy5nYW1lLndvcmxkLmNlbnRlclksICdMb2FkaW5nOiAwJSAoMC8wKScsIHN0eWxlKTtcclxuICAgIHRoaXMucHJvZ3Jlc3NMYWJsZS5hbmNob3Iuc2V0VG8oMC41KTtcclxuICB9XHJcblxyXG4gIHJlZnJlc2hQcm9ncmVzcyhwcm9ncmVzcywgY2FjaGVLZXksIHN1Y2Nlc3MsIHRvdGFsTG9hZGVkLCB0b3RhbEZpbGVzKSB7XHJcbiAgICB0aGlzLnByb2dyZXNzTGFibGUudGV4dCA9IGBMb2FkaW5nICR7cHJvZ3Jlc3N9JSAoJHt0b3RhbExvYWRlZH0vJHt0b3RhbEZpbGVzfSlgO1xyXG4gIH1cclxufVxyXG5cclxuRW5naW5lLkxvYWRlciA9IExvYWRlcjtcclxuIiwiY2xhc3MgU2V0dGluZ3MgZXh0ZW5kcyBQaGFzZXIuU3RhdGUge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIGluaXQoYmdDb2xvcikge1xyXG4gICAgdGhpcy5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSBiZ0NvbG9yO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlKCkge1xyXG4gICAgbGV0IHRlc3QgPSB0aGlzLmFkZC50ZXh0KFxyXG4gICAgICB0aGlzLmdhbWUud29ybGQuY2VudGVyWCxcclxuICAgICAgdGhpcy5nYW1lLndvcmxkLmNlbnRlclksXHJcbiAgICAgICdTZXR0aW5ncyBwYWdlJywge1xyXG4gICAgICAgIGZpbGw6ICdXaGl0ZScsXHJcbiAgICAgICAgZm9udDogJzQxcHggT3BlbiBTYW5zJ1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB0ZXN0LmFscGhhID0gMDtcclxuXHJcbiAgICB0aGlzLmFkZC50d2Vlbih0ZXN0KVxyXG4gICAgLnRvKHtcclxuICAgICAgYWxwaGE6IDFcclxuICAgIH0pXHJcbiAgICAuc3RhcnQoKTtcclxuICB9XHJcbn1cclxuXHJcbkVuZ2luZS5TZXR0aW5ncyA9IFNldHRpbmdzO1xyXG4iLCJjbGFzcyBDaXJjbGVCdXR0b24gZXh0ZW5kcyBQaGFzZXIuR3JhcGhpY3Mge1xyXG4gIGdldCByYWRpdXMoKSB7IHJldHVybiB0aGlzLmRhdGEucmFkaXVzIH1cclxuICBzZXQgcmFkaXVzKHZhbCkge1xyXG4gICAgdGhpcy5kYXRhLnJhZGl1cyA9IHZhbDtcclxuICAgIHRoaXMucmVEcmF3KCk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5LCByYWRpdXMsIGNvbG9yLCBpY29uTmFtZSA9IG51bGwpIHtcclxuICAgIHN1cGVyKGdhbWUsIDAsIDApO1xyXG5cclxuICAgIHRoaXMuZ2FtZS5hZGQuZXhpc3RpbmcodGhpcyk7XHJcblxyXG4gICAgaWYgKGljb25OYW1lICE9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMuaWNvbiA9IHRoaXMuZ2FtZS5hZGQuc3ByaXRlKHgsIHksIGljb25OYW1lKTtcclxuICAgICAgdGhpcy5pY29uLmFuY2hvci5zZXRUbygwLjUpO1xyXG4gICAgICB0aGlzLmljb24ud2lkdGggPSByYWRpdXMgKiAxLjU7XHJcbiAgICAgIHRoaXMuaWNvbi5oZWlnaHQgPSByYWRpdXMgKiAxLjU7XHJcblxyXG4gICAgICB0aGlzLmFkZENoaWxkKHRoaXMuaWNvbik7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5kYXRhLnggPSB4O1xyXG4gICAgdGhpcy5kYXRhLnkgPSB5O1xyXG4gICAgdGhpcy5kYXRhLmNvbG9yID0gY29sb3I7XHJcblxyXG4gICAgdGhpcy5pbnB1dEVuYWJsZWQgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMucmFkaXVzID0gcmFkaXVzO1xyXG4gICAgdGhpcy5vbkNsaWNrID0gbmV3IFBoYXNlci5TaWduYWwoKTtcclxuXHJcbiAgICB0aGlzLmV2ZW50cy5vbklucHV0RG93bi5hZGRPbmNlKHRoaXMuYW5pbWF0ZUJ0biwgdGhpcyk7XHJcbiAgfVxyXG5cclxuICBhbmltYXRlQnRuKCkge1xyXG4gICAgY29uc3QgYW5pbWF0aW9uVGltZSA9IDM1MDtcclxuICAgIGNvbnN0IG5ld0J0blJhZGl1cyA9IE1hdGguc3FydChcclxuICAgICAgdGhpcy5nYW1lLndpZHRoKioyICtcclxuICAgICAgdGhpcy5nYW1lLmhlaWdodCoqMlxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLnBhcmVudC5icmluZ1RvVG9wKHRoaXMpO1xyXG5cclxuICAgIHRoaXMuaGlkZUljb24oKTtcclxuXHJcbiAgICBsZXQgdHdlZW4gPSB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMpXHJcbiAgICAgIC50byh7XHJcbiAgICAgICAgcmFkaXVzOiBuZXdCdG5SYWRpdXNcclxuICAgICAgfSwgYW5pbWF0aW9uVGltZSwgUGhhc2VyLkVhc2luZy5TaW51c29pZGFsLkluT3V0KTtcclxuXHJcbiAgICB0d2Vlbi5vbkNvbXBsZXRlLmFkZCgoKSA9PiB7XHJcbiAgICAgIHRoaXMub25DbGljay5kaXNwYXRjaCgpO1xyXG4gICAgfSwgdGhpcyk7XHJcblxyXG4gICAgdHdlZW4uc3RhcnQoKTtcclxuICB9XHJcblxyXG4gIGhpZGVJY29uKCkge1xyXG4gICAgY29uc3QgYW5pbWF0aW9uVGltZSA9IDMyNTtcclxuXHJcbiAgICB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMuaWNvbilcclxuICAgICAgLnRvKHtcclxuICAgICAgICBhbHBoYTogMFxyXG4gICAgICB9LCBhbmltYXRpb25UaW1lKVxyXG4gICAgICAuc3RhcnQoKTtcclxuICB9XHJcblxyXG4gIHJlRHJhdygpIHtcclxuICAgIHRoaXMuY2xlYXIoKTtcclxuICAgIHRoaXMuYmVnaW5GaWxsKHRoaXMuZGF0YS5jb2xvcik7XHJcbiAgICB0aGlzLmRyYXdDaXJjbGUoXHJcbiAgICAgIHRoaXMuZGF0YS54LFxyXG4gICAgICB0aGlzLmRhdGEueSxcclxuICAgICAgdGhpcy5kYXRhLnJhZGl1cyAqIDJcclxuICAgICk7XHJcbiAgICB0aGlzLmVuZEZpbGwoKTtcclxuICB9XHJcbn1cclxuXHJcbkVuZ2luZS5DaXJjbGVCdXR0b24gPSBDaXJjbGVCdXR0b247XHJcbiIsImNsYXNzIE1lbnUgZXh0ZW5kcyBQaGFzZXIuU3RhdGUge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIGluaXQoKSB7XHJcbiAgICB0aGlzLnBsYXlCdG5Db2xvciA9IDB4MjE5NkYzO1xyXG4gICAgdGhpcy5wbGF5QnRuUmFkaXVzID0gNTA7XHJcbiAgICB0aGlzLm9yYml0c1JhZGl1cyA9IHRoaXMucGxheUJ0blJhZGl1cyArIDEwMDtcclxuXHJcbiAgICB0aGlzLnN0YWdlLmJhY2tncm91bmRDb2xvciA9IDB4NEExNDhDO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlKCkge1xyXG4gICAgdGhpcy5jcmVhdGVMb2dvKCk7XHJcbiAgICB0aGlzLmNyZWF0ZUJ0bnMoKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZUxvZ28oKSB7XHJcbiAgICByZXR1cm47XHJcbiAgICBjb25zdCBzdHlsZSA9IHtcclxuICAgICAgZm9udDogJzUycHggT3BlbiBTYW5zJyxcclxuICAgICAgZmlsbDogJ3doaXRlJ1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmxvZ29MYWJsZSA9IHRoaXMuYWRkLnRleHQoXHJcbiAgICAgIHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYLFxyXG4gICAgICB0aGlzLmdhbWUud29ybGQuY2VudGVyWSAvIDIsXHJcbiAgICAgICdUaHJlZSBBbmdsZScsXHJcbiAgICAgIHN0eWxlXHJcbiAgICApO1xyXG4gICAgdGhpcy5sb2dvTGFibGUuYW5jaG9yLnNldFRvKDAuNSk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVCdG5zKCkge1xyXG4gICAgbGV0IGxlYWRlcmJvYXJkQnRuID0gdGhpcy5jcmVhdGVMZWFkZXJib2FyZEJ0bigpO1xyXG4gICAgbGV0IHNldHRpbmdzQnRuID0gdGhpcy5jcmVhdGVTZXR0aW5nc0J0bigpO1xyXG4gICAgbGV0IHNoYXJlQnRuID0gdGhpcy5jcmVhdGVTaGFyZUJ0bigpO1xyXG4gICAgbGV0IGx2bFBpY2tCdG4gPSB0aGlzLmNyZWF0ZUx2bFBpY2tCdG4oKTtcclxuXHJcbiAgICBsZXQgcGxheUJ0biA9IHRoaXMuY3JlYXRlUGxheUJ0bigpO1xyXG5cclxuICAgIGxldCBhZGRpdGlvbmFsQnRucyA9IFtcclxuICAgICAgc2V0dGluZ3NCdG4sXHJcbiAgICAgIGxlYWRlcmJvYXJkQnRuLFxyXG4gICAgICBsdmxQaWNrQnRuLFxyXG4gICAgICBzaGFyZUJ0blxyXG4gICAgXTtcclxuXHJcbiAgICB0aGlzLmFuaW1hdGVBZGRpdGlvbmFsQnRucyhhZGRpdGlvbmFsQnRucyk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVQbGF5QnRuKCkge1xyXG4gICAgdGhpcy5wbGF5QnRuID0gbmV3IEVuZ2luZS5DaXJjbGVCdXR0b24oXHJcbiAgICAgIHRoaXMuZ2FtZSxcclxuICAgICAgdGhpcy5nYW1lLndvcmxkLmNlbnRlclgsXHJcbiAgICAgIHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJZLFxyXG4gICAgICB0aGlzLnBsYXlCdG5SYWRpdXMsXHJcbiAgICAgIHRoaXMucGxheUJ0bkNvbG9yLFxyXG4gICAgICAnaWNvbi1wbGF5J1xyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLnBsYXlCdG4ub25DbGljay5hZGQodGhpcy5jbGlja1BsYXlCdG4sIHRoaXMpO1xyXG5cclxuICAgIHJldHVybiB0aGlzLnBsYXlCdG47XHJcbiAgfVxyXG5cclxuICBjcmVhdGVTZXR0aW5nc0J0bigpIHtcclxuICAgIGNvbnN0IGJ0bkNvbG9yID0gMHgwMDk2ODg7XHJcblxyXG4gICAgdGhpcy5zZXR0aW5nc0J0biA9IG5ldyBFbmdpbmUuQ2lyY2xlQnV0dG9uKFxyXG4gICAgICB0aGlzLmdhbWUsXHJcbiAgICAgIHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYLFxyXG4gICAgICB0aGlzLmdhbWUud29ybGQuY2VudGVyWSxcclxuICAgICAgdGhpcy5wbGF5QnRuUmFkaXVzIC8gMixcclxuICAgICAgYnRuQ29sb3IsXHJcbiAgICAgICdpY29uLXNldHRpbmdzJ1xyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLnNldHRpbmdzQnRuLm9uQ2xpY2suYWRkKHRoaXMuY2xpY2tTZXR0aW5nc0J0biwgdGhpcyk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuc2V0dGluZ3NCdG47XHJcbiAgfVxyXG5cclxuICBjcmVhdGVTaGFyZUJ0bigpIHtcclxuICAgIGNvbnN0IGJ0bkNvbG9yID0gMHhFOTFFNjM7XHJcblxyXG4gICAgdGhpcy5zaGFyZUJ0biA9IG5ldyBFbmdpbmUuQ2lyY2xlQnV0dG9uKFxyXG4gICAgICB0aGlzLmdhbWUsXHJcbiAgICAgIHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYLFxyXG4gICAgICB0aGlzLmdhbWUud29ybGQuY2VudGVyWSxcclxuICAgICAgdGhpcy5wbGF5QnRuUmFkaXVzIC8gMixcclxuICAgICAgYnRuQ29sb3IsXHJcbiAgICAgICdpY29uLXNoYXJlJ1xyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLnNoYXJlQnRuLm9uQ2xpY2suYWRkKHRoaXMuY2xpY2tTaGFyZUJ0biwgdGhpcyk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuc2hhcmVCdG47XHJcbiAgfVxyXG5cclxuICBjcmVhdGVMZWFkZXJib2FyZEJ0bigpIHtcclxuICAgIGNvbnN0IGJ0bkNvbG9yID0gMHhGRjU3MjI7XHJcblxyXG4gICAgdGhpcy5sZWFkZXJib2FyZEJ0biA9IG5ldyBFbmdpbmUuQ2lyY2xlQnV0dG9uKFxyXG4gICAgICB0aGlzLmdhbWUsXHJcbiAgICAgIHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYLFxyXG4gICAgICB0aGlzLmdhbWUud29ybGQuY2VudGVyWSxcclxuICAgICAgdGhpcy5wbGF5QnRuUmFkaXVzIC8gMixcclxuICAgICAgYnRuQ29sb3IsXHJcbiAgICAgICdpY29uLXN0YXInXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMubGVhZGVyYm9hcmRCdG4ub25DbGljay5hZGQodGhpcy5jbGlja0xlYWRlcmJvYXJkQnRuLCB0aGlzKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5sZWFkZXJib2FyZEJ0bjtcclxuICB9XHJcblxyXG4gIGNyZWF0ZUx2bFBpY2tCdG4oKSB7XHJcbiAgICBjb25zdCBidG5Db2xvciA9IDB4M0Y1MUI1O1xyXG5cclxuICAgIHRoaXMubHZsUGlja0J0biA9IG5ldyBFbmdpbmUuQ2lyY2xlQnV0dG9uKFxyXG4gICAgICB0aGlzLmdhbWUsXHJcbiAgICAgIHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYLFxyXG4gICAgICB0aGlzLmdhbWUud29ybGQuY2VudGVyWSxcclxuICAgICAgdGhpcy5wbGF5QnRuUmFkaXVzIC8gMixcclxuICAgICAgYnRuQ29sb3IsXHJcbiAgICAgICdpY29uLWFwcHMnXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMubHZsUGlja0J0bi5vbkNsaWNrLmFkZCh0aGlzLmNsaWNrTHZsUGlja0J0biwgdGhpcyk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMubHZsUGlja0J0bjtcclxuICB9XHJcblxyXG4gIGFuaW1hdGVBZGRpdGlvbmFsQnRucyhidG5zKSB7XHJcbiAgICBjb25zdCBhbmltYXRpb25UaW1lID0gMTAwMDtcclxuICAgIGNvbnN0IG1heERlbGF5ID0gNTAwO1xyXG5cclxuICAgIGxldCBhbmdsZVBhcnQgPSAoTWF0aC5QSSAqIDIpIC8gYnRucy5sZW5ndGg7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBidG5zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGxldCBidG4gPSBidG5zW2ldO1xyXG5cclxuICAgICAgdGhpcy5hZGQudHdlZW4oYnRuKVxyXG4gICAgICAudG8oe1xyXG4gICAgICAgIHg6IHRoaXMucGxheUJ0bi54ICsgTWF0aC5jb3MoTWF0aC5QSSAvIDQgKyBhbmdsZVBhcnQgKiAoMSArIGkpKSAqIHRoaXMub3JiaXRzUmFkaXVzLFxyXG4gICAgICAgIHk6IHRoaXMucGxheUJ0bi55ICsgTWF0aC5zaW4oTWF0aC5QSSAvIDQgKyBhbmdsZVBhcnQgKiAoMSArIGkpKSAqIHRoaXMub3JiaXRzUmFkaXVzXHJcbiAgICAgIH0sIGFuaW1hdGlvblRpbWUgKyB0aGlzLnJuZC5iZXR3ZWVuKDAsIG1heERlbGF5KSwgUGhhc2VyLkVhc2luZy5FbGFzdGljLk91dClcclxuICAgICAgLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdGhpcy5hZGQudHdlZW4odGhpcy5zaGFyZUJ0bilcclxuICAgIC8vICAgLnRvKHtcclxuICAgIC8vICAgICB4OiB0aGlzLnBsYXlCdG4ueCArIE1hdGguY29zKGFuZ2xlUGFydCkgKiB0aGlzLm9yYml0c1JhZGl1cyxcclxuICAgIC8vICAgICB5OiB0aGlzLnBsYXlCdG4ueSArIE1hdGguc2luKGFuZ2xlUGFydCkgKiB0aGlzLm9yYml0c1JhZGl1c1xyXG4gICAgLy8gICB9LCBhbmltYXRpb25UaW1lICsgdGhpcy5ybmQuYmV0d2VlbigwLCBtYXhEZWxheSksIFBoYXNlci5FYXNpbmcuRWxhc3RpYy5PdXQpXHJcbiAgICAvLyAgIC5zdGFydCgpO1xyXG4gICAgLy9cclxuICAgIC8vIHRoaXMuYWRkLnR3ZWVuKHRoaXMuc2V0dGluZ3NCdG4pXHJcbiAgICAvLyAgIC50byh7XHJcbiAgICAvLyAgICAgeDogdGhpcy5wbGF5QnRuLnggKyBNYXRoLmNvcyhhbmdsZVBhcnQgKiAyKSAqIHRoaXMub3JiaXRzUmFkaXVzLFxyXG4gICAgLy8gICAgIHk6IHRoaXMucGxheUJ0bi55ICsgTWF0aC5zaW4oYW5nbGVQYXJ0ICogMikgKiB0aGlzLm9yYml0c1JhZGl1c1xyXG4gICAgLy8gICB9LCBhbmltYXRpb25UaW1lICsgdGhpcy5ybmQuYmV0d2VlbigwLCBtYXhEZWxheSksIFBoYXNlci5FYXNpbmcuRWxhc3RpYy5PdXQpXHJcbiAgICAvLyAgIC5zdGFydCgpO1xyXG4gICAgLy9cclxuICAgIC8vIHRoaXMuYWRkLnR3ZWVuKHRoaXMubGVhZGVyYm9hcmRCdG4pXHJcbiAgICAvLyAgIC50byh7XHJcbiAgICAvLyAgICAgeDogdGhpcy5wbGF5QnRuLnggKyBNYXRoLmNvcyhhbmdsZVBhcnQgKiAzKSAqIHRoaXMub3JiaXRzUmFkaXVzLFxyXG4gICAgLy8gICAgIHk6IHRoaXMucGxheUJ0bi55ICsgTWF0aC5zaW4oYW5nbGVQYXJ0ICogMykgKiB0aGlzLm9yYml0c1JhZGl1c1xyXG4gICAgLy8gICB9LCBhbmltYXRpb25UaW1lICsgdGhpcy5ybmQuYmV0d2VlbigwLCBtYXhEZWxheSksIFBoYXNlci5FYXNpbmcuRWxhc3RpYy5PdXQpXHJcbiAgICAvLyAgIC5zdGFydCgpO1xyXG5cclxuICB9XHJcblxyXG4gIGNyZWF0ZVN0YXJ0R2FtZVRleHQoKSB7XHJcbiAgICBjb25zdCBzdHlsZSA9IHtcclxuICAgICAgZm9udDogJzQxcHggT3BlbiBTYW5zJyxcclxuICAgICAgZmlsbDogJyNGRkZGRkYnLFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnN0YXJ0VGV4dCA9IHRoaXMuYWRkLnRleHQoXHJcbiAgICAgIHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYLFxyXG4gICAgICB0aGlzLmdhbWUud29ybGQuY2VudGVyWSxcclxuICAgICAgJ1N0YXJ0aW5nIGdhbWUuLi4nLFxyXG4gICAgICBzdHlsZVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLnN0YXJ0VGV4dC5hbHBoYSA9IDA7XHJcbiAgICB0aGlzLnN0YXJ0VGV4dC5hbmNob3Iuc2V0VG8oMC41KTtcclxuXHJcbiAgICB0aGlzLmFkZC50d2Vlbih0aGlzLnN0YXJ0VGV4dClcclxuICAgICAgLnRvKHtcclxuICAgICAgICBhbHBoYTogMVxyXG4gICAgICB9LCAxMDAwKVxyXG4gICAgICAuc3RhcnQoKTtcclxuICB9XHJcblxyXG4gIGNsaWNrUGxheUJ0bigpIHtcclxuICAgIGNvbnN0IGRlbGF5ID0gMjAwMDtcclxuXHJcbiAgICB0aGlzLmNyZWF0ZVN0YXJ0R2FtZVRleHQoKTtcclxuICAgIHRoaXMuY3JlYXRlQmxhY2tvdXRBbmltYXRpb24oZGVsYXkpXHJcbiAgICAgIC5vbkNvbXBsZXRlXHJcbiAgICAgIC5hZGQoKCkgPT4ge1xyXG4gICAgICAgIC8vIHRoaXMuc3RhdGUucmVzdGFydCgpO1xyXG4gICAgICAgIGxldCBudW1iZXJPZkdyYWRhdGlvbiA9IDM7XHJcbiAgICAgICAgdGhpcy5zdGF0ZS5zdGFydCgnR2FtZScsIHRydWUsIGZhbHNlLCBudW1iZXJPZkdyYWRhdGlvbik7XHJcbiAgICAgIH0sIHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgY2xpY2tMdmxQaWNrQnRuKCkge1xyXG4gICAgdGhpcy5zdGF0ZS5zdGFydChcclxuICAgICAgJ0x2bHBpY2snLFxyXG4gICAgICB0cnVlLFxyXG4gICAgICBmYWxzZSxcclxuICAgICAgdGhpcy5sdmxQaWNrQnRuLmRhdGEuY29sb3JcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBjbGlja1NldHRpbmdzQnRuKCkge1xyXG4gICAgdGhpcy5zdGF0ZS5zdGFydChcclxuICAgICAgJ1NldHRpbmdzJyxcclxuICAgICAgdHJ1ZSxcclxuICAgICAgZmFsc2UsXHJcbiAgICAgIHRoaXMuc2V0dGluZ3NCdG4uZGF0YS5jb2xvclxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGNsaWNrTGVhZGVyYm9hcmRCdG4oKSB7XHJcbiAgICB0aGlzLmNyZWF0ZUJsYWNrb3V0QW5pbWF0aW9uKClcclxuICAgICAgLm9uQ29tcGxldGVcclxuICAgICAgLmFkZCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZS5yZXN0YXJ0KCk7XHJcbiAgICAgIH0sIHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgY2xpY2tTaGFyZUJ0bigpIHtcclxuICAgIHRoaXMuY3JlYXRlQmxhY2tvdXRBbmltYXRpb24oKVxyXG4gICAgICAub25Db21wbGV0ZVxyXG4gICAgICAuYWRkKCgpID0+IHtcclxuICAgICAgICB0aGlzLnN0YXRlLnJlc3RhcnQoKTtcclxuICAgICAgfSwgdGhpcyk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVCbGFja291dEFuaW1hdGlvbihkZWxheSA9IDApIHtcclxuICAgIGxldCBibGFja291dExheW91dCA9IHRoaXMuYWRkLmdyYXBoaWNzKDAsIDApO1xyXG4gICAgYmxhY2tvdXRMYXlvdXQuYWxwaGEgPSAwO1xyXG4gICAgYmxhY2tvdXRMYXlvdXQuYmVnaW5GaWxsKDApO1xyXG4gICAgYmxhY2tvdXRMYXlvdXQuZHJhd1JlY3QoMCwgMCwgdGhpcy5nYW1lLndpZHRoLCB0aGlzLmdhbWUuaGVpZ2h0KTtcclxuICAgIGJsYWNrb3V0TGF5b3V0LmVuZEZpbGwoKTtcclxuXHJcbiAgICBsZXQgdHdlZW4gPSB0aGlzLmFkZC50d2VlbihibGFja291dExheW91dClcclxuICAgICAgLnRvKHtcclxuICAgICAgICBhbHBoYTogMVxyXG4gICAgICB9LCA0MDApXHJcbiAgICAgIC5kZWxheShkZWxheSlcclxuICAgICAgLnN0YXJ0KCk7XHJcblxyXG4gICAgcmV0dXJuIHR3ZWVuO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgY29sb3IgPSAncmdiYSg2NSwgMTk0LCAyNDIsIDApJztcclxuXHJcbiAgICB0aGlzLmdhbWUuZGVidWcuZ2VvbShuZXcgUGhhc2VyLkxpbmUoMCwgdGhpcy5nYW1lLndvcmxkLmNlbnRlclksIHRoaXMuZ2FtZS53aWR0aCwgdGhpcy5nYW1lLndvcmxkLmNlbnRlclkpLCBjb2xvcik7XHJcbiAgICB0aGlzLmdhbWUuZGVidWcuZ2VvbShuZXcgUGhhc2VyLkxpbmUodGhpcy5nYW1lLndvcmxkLmNlbnRlclgsIDAsIHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYLCB0aGlzLmdhbWUuaGVpZ2h0KSwgY29sb3IpO1xyXG5cclxuICAgIC8vIHRoaXMuZ2FtZS5kZWJ1Zy5pbnB1dEluZm8oMjUsIDI1KTtcclxuICB9XHJcbn1cclxuXHJcbkVuZ2luZS5NZW51ID0gTWVudTtcclxuIiwiY2xhc3MgTHZscGlja0J0biBleHRlbmRzIFBoYXNlci5HcmFwaGljcyB7XHJcbiAgY29uc3RydWN0b3IoZ2FtZSwgeCwgeSwgbnVtYmVyLCBpc0xvY2spIHtcclxuICAgIHN1cGVyKGdhbWUsIHgsIHkpO1xyXG5cclxuICAgIHRoaXMuZGF0YS5pc0xvY2sgPSBpc0xvY2s7XHJcbiAgICB0aGlzLmRhdGEubnVtYmVyUG9zaXRpb24gPSBudW1iZXI7XHJcblxyXG4gICAgdGhpcy5kcmF3QnRuKCk7XHJcbiAgICB0aGlzLmFkZFRleHQoKTtcclxuICB9XHJcblxyXG4gIGRyYXdCdG4oKSB7XHJcbiAgICBjb25zdCBzaXplID0gTHZscGlja0J0bi5zaXplO1xyXG4gICAgY29uc3QgYWN0aXZlQ29sb3IgPSAweENGRDhEQzsvLyAweDlkOWQ5ZDtcclxuICAgIGNvbnN0IGxvY2tlZENvbG9yID0gMHg1NDZFN0E7XHJcblxyXG4gICAgbGV0IGNvbG9yO1xyXG5cclxuICAgIGlmICh0aGlzLmRhdGEuaXNMb2NrKSB7XHJcbiAgICAgIGNvbG9yID0gbG9ja2VkQ29sb3I7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb2xvciA9IGFjdGl2ZUNvbG9yO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYmVnaW5GaWxsKGNvbG9yKTtcclxuICAgIHRoaXMuZHJhd1JlY3QoMCwgMCwgc2l6ZSwgc2l6ZSk7XHJcbiAgICB0aGlzLmVuZEZpbGwoKTtcclxuICB9XHJcblxyXG4gIGFkZFRleHQoKSB7XHJcbiAgICBjb25zdCBzaXplID0gTHZscGlja0J0bi5zaXplO1xyXG4gICAgY29uc3Qgc3R5bGUgPSB7XHJcbiAgICAgIGZvbnQ6ICcyM3B4IE9wZW4gU2FucycsXHJcbiAgICAgIGZpbGw6ICdibGFjaydcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5sYWJsZSA9IHRoaXMuZ2FtZS5tYWtlLnRleHQoc2l6ZSAvIDIsIHNpemUgLyAyLCB0aGlzLmRhdGEubnVtYmVyUG9zaXRpb24sIHN0eWxlKTtcclxuICAgIHRoaXMubGFibGUuYW5jaG9yLnNldFRvKDAuNSk7XHJcblxyXG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLmxhYmxlKTtcclxuICB9XHJcbn1cclxuXHJcbkx2bHBpY2tCdG4uc2l6ZSA9IDc1O1xyXG5cclxuRW5naW5lLkx2bHBpY2tCdG4gPSBMdmxwaWNrQnRuO1xyXG4iLCJjbGFzcyBMdmxwaWNrIGV4dGVuZHMgUGhhc2VyLlN0YXRlIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICBpbml0KGJnQ29sb3IpIHtcclxuICAgIHRoaXMuc3RhZ2UuYmFja2dyb3VuZENvbG9yID0gYmdDb2xvcjtcclxuXHJcbiAgICB0aGlzLmJ0bkdyaWRXaWR0aCA9IDU7XHJcbiAgICB0aGlzLmJ0bkdyaWRIZWlnaHQgPSAzO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlKCkge1xyXG4gICAgdGhpcy5hbmltYXRlQmFja2dyb3VuZCgpO1xyXG5cclxuICAgIHRoaXMuY3JlYXRlTGFibGUoKTtcclxuICAgIHRoaXMuY3JlYXRlQnRucygpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgcmV0dXJuO1xyXG4gICAgbGV0IGxpbmUxID0gbmV3IFBoYXNlci5MaW5lKHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYLCAwLCB0aGlzLmdhbWUud29ybGQuY2VudGVyWCwgdGhpcy5nYW1lLmhlaWdodCk7XHJcbiAgICBsZXQgbGluZTIgPSBuZXcgUGhhc2VyLkxpbmUoMCwgdGhpcy5nYW1lLndvcmxkLmNlbnRlclksIHRoaXMuZ2FtZS53aWR0aCwgdGhpcy5nYW1lLndvcmxkLmNlbnRlclkpO1xyXG5cclxuICAgIHRoaXMuZ2FtZS5kZWJ1Zy5nZW9tKGxpbmUxLCAncmdiKDAsIDcwLCAyNTUpJyk7XHJcbiAgICB0aGlzLmdhbWUuZGVidWcuZ2VvbShsaW5lMiwgJ3JnYigwLCA3MCwgMjU1KScpO1xyXG4gIH1cclxuXHJcbiAgYW5pbWF0ZUJhY2tncm91bmQoKSB7XHJcbiAgICBjb25zdCB0YXJnZXRDb2xvciA9IDB4MDtcclxuICAgIGNvbnN0IHRhcmdldFJhZGl1cyA9IE1hdGguc3FydChNYXRoLnBvdyh0aGlzLmdhbWUud2lkdGgsIDIpICsgTWF0aC5wb3codGhpcy5nYW1lLmhlaWdodCwgMikpO1xyXG4gICAgY29uc3QgYW5pbWF0aW9uVGltZSA9IDM1MDtcclxuXHJcbiAgICBsZXQgYW5pbWF0aW9uID0ge1xyXG4gICAgICBncmFwaGljczogdGhpcy5hZGQuZ3JhcGhpY3MoMCwgMCksXHJcbiAgICAgIF9yYWRpdXM6IDAsXHJcbiAgICAgIGdhbWU6IHRoaXMuZ2FtZSxcclxuICAgIH07XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGFuaW1hdGlvbiwgJ3JhZGl1cycsIHtcclxuICAgICAgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMuX3JhZGl1czsgfSxcclxuICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuX3JhZGl1cyA9IHZhbHVlO1xyXG5cclxuICAgICAgICB0aGlzLmdyYXBoaWNzLmJlZ2luRmlsbCh0YXJnZXRDb2xvcik7XHJcbiAgICAgICAgdGhpcy5ncmFwaGljcy5kcmF3Q2lyY2xlKHRoaXMuZ2FtZS53b3JsZC5jZW50ZXJYLCB0aGlzLmdhbWUud29ybGQuY2VudGVyWSwgdGhpcy5fcmFkaXVzKTtcclxuICAgICAgICB0aGlzLmdyYXBoaWNzLmVuZEZpbGwoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IHR3ZWVuID0gdGhpcy5hZGQudHdlZW4oYW5pbWF0aW9uKVxyXG4gICAgICAudG8oe1xyXG4gICAgICAgIHJhZGl1czogdGFyZ2V0UmFkaXVzXHJcbiAgICAgIH0sIGFuaW1hdGlvblRpbWUpXHJcbiAgICAgIC5zdGFydCgpO1xyXG5cclxuICAgIHR3ZWVuLm9uQ29tcGxldGVcclxuICAgICAgLmFkZCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSB0YXJnZXRDb2xvcjtcclxuICAgICAgICBhbmltYXRpb24uZ3JhcGhpY3Mua2lsbCgpO1xyXG4gICAgICB9LCB0aGlzKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZUxhYmxlKCkge1xyXG4gICAgY29uc3Qgc3R5bGUgPSB7XHJcbiAgICAgIGZvbnQ6ICc1MXB4IE9wZW4gU2FucycsXHJcbiAgICAgIGZpbGw6ICd3aGl0ZSdcclxuICAgIH07XHJcbiAgICBjb25zdCBhbmltYXRpb25UaW1lID0gMTAwMDtcclxuICAgIGNvbnN0IGFuaW1hdGlvbkRlbGF5ID0gMzUwO1xyXG4gICAgY29uc3QgbWFyZ2luVG9wID0gMTAwO1xyXG5cclxuICAgIHRoaXMubGFibGUgPSB0aGlzLmFkZC50ZXh0KFxyXG4gICAgICB0aGlzLmdhbWUud29ybGQuY2VudGVyWCxcclxuICAgICAgbWFyZ2luVG9wLFxyXG4gICAgICAnU2VsZWN0IGxldmVsJyxcclxuICAgICAgc3R5bGVcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5sYWJsZS5hbmNob3Iuc2V0VG8oMC41LCAwKTtcclxuXHJcbiAgICB0aGlzLmxhYmxlLmFscGhhID0gMDtcclxuXHJcbiAgICB0aGlzLmFkZC50d2Vlbih0aGlzLmxhYmxlKVxyXG4gICAgICAudG8oe1xyXG4gICAgICAgIGFscGhhOiAxXHJcbiAgICAgIH0sIGFuaW1hdGlvblRpbWUpXHJcbiAgICAgIC5kZWxheShhbmltYXRpb25EZWxheSlcclxuICAgICAgLnN0YXJ0KCk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVCdG5zKCkge1xyXG4gICAgY29uc3QgbWFyZ2luID0gNTA7XHJcbiAgICBjb25zdCBidG5TaXplID0gRW5naW5lLkx2bHBpY2tCdG4uc2l6ZTtcclxuICAgIGNvbnN0IGFuaW1hdGlvbkRlbGF5ID0gMzUwO1xyXG4gICAgY29uc3QgYW5pbWF0aW9uVGltZSA9IDI1MDtcclxuXHJcbiAgICBsZXQgbnVtYmVyID0gMTtcclxuXHJcbiAgICB0aGlzLmJ0bkdyb3VwID0gdGhpcy5hZGQuZ3JvdXAoKTtcclxuXHJcbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuYnRuR3JpZEhlaWdodDsgeSsrKSB7XHJcbiAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy5idG5HcmlkV2lkdGg7IHgrKywgbnVtYmVyKyspIHtcclxuICAgICAgICBsZXQgcG9zWCA9IHggKiAoYnRuU2l6ZSArIG1hcmdpbik7XHJcbiAgICAgICAgbGV0IHBvc1kgPSB5ICogKGJ0blNpemUgKyBtYXJnaW4pO1xyXG5cclxuICAgICAgICBsZXQgYnRuID0gbmV3IEVuZ2luZS5MdmxwaWNrQnRuKFxyXG4gICAgICAgICAgdGhpcy5nYW1lLFxyXG4gICAgICAgICAgcG9zWCxcclxuICAgICAgICAgIHBvc1ksXHJcbiAgICAgICAgICBudW1iZXIsXHJcbiAgICAgICAgICBudW1iZXIgJSA1ID09PSAwXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgYnRuLmFscGhhID0gMDtcclxuICAgICAgICBidG4uaW5wdXRFbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICBidG4uZXZlbnRzLm9uSW5wdXREb3duLmFkZCh0aGlzLmJ0bkNsaWNrLCB0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGQudHdlZW4oYnRuKVxyXG4gICAgICAgICAgLnRvKHtcclxuICAgICAgICAgICAgYWxwaGE6IDFcclxuICAgICAgICAgIH0sIGFuaW1hdGlvblRpbWUpXHJcbiAgICAgICAgICAuZGVsYXkoYW5pbWF0aW9uRGVsYXkpXHJcbiAgICAgICAgICAuc3RhcnQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5idG5Hcm91cC5hZGQoYnRuKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYnRuR3JvdXAueCA9IHRoaXMuZ2FtZS53aWR0aCAvIDIgLSB0aGlzLmJ0bkdyb3VwLndpZHRoIC8gMjtcclxuICAgIHRoaXMuYnRuR3JvdXAueSA9IHRoaXMuZ2FtZS5oZWlnaHQgLyAyIC0gdGhpcy5idG5Hcm91cC5oZWlnaHQgLyAyO1xyXG4gIH1cclxuXHJcbiAgYnRuQ2xpY2soYnRuKSB7XHJcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLndvcmxkLmNoaWxkcmVuKTtcclxuICAgIHRoaXMuZmFkZUFuaW1hdGlvbigpXHJcbiAgICAgIC5vbkNvbXBsZXRlXHJcbiAgICAgIC5hZGQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc3RhdGUuc3RhcnQoJ0dhbWUnLCB0cnVlLCBmYWxzZSwgMyk7XHJcbiAgICAgIH0sIHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgZmFkZUFuaW1hdGlvbigpIHtcclxuICAgIGNvbnN0IGFuaW1hdGlvblRpbWUgPSAyNTA7XHJcbiAgICBsZXQgbGFzdFR3ZWVuID0ge31cclxuXHJcbiAgICBmb3IgKGxldCBkaXNwbGF5T2JqIG9mIHRoaXMud29ybGQuY2hpbGRyZW4pIHtcclxuICAgICAgbGFzdFR3ZWVuID0gdGhpcy5hZGQudHdlZW4oZGlzcGxheU9iailcclxuICAgICAgICAudG8oe1xyXG4gICAgICAgICAgYWxwaGE6IDBcclxuICAgICAgICB9LCBhbmltYXRpb25UaW1lKVxyXG4gICAgICAgIC5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBsYXN0VHdlZW47XHJcbiAgfVxyXG59XHJcblxyXG5FbmdpbmUuTHZscGljayA9IEx2bHBpY2s7XHJcbiIsImNsYXNzIENvbG9yU2V0IHtcclxuICAvKipcclxuICAgKiBDb2xvciBTZXRcclxuICAgKiBAcGFyYW0gIHtBcnJheX0gZ3JhZGl0aW9uIEFycmF5IG9mIGNvbG9yc1xyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGdyYWRpdGlvbikge1xyXG4gICAgdGhpcy5ncmFkaXRpb24gPSBncmFkaXRpb247XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgcmFuZG9tIGNvbG9yIGZyb20gc2V0XHJcbiAgICogQHJldHVybiB7W3R5cGVdfSBbZGVzY3JpcHRpb25dXHJcbiAgICovXHJcbiAgZ2V0UmFuZG9tQ29sb3IoKSB7XHJcbiAgICByZXR1cm4gRW5naW5lLmdhbWUucm5kLnBpY2sodGhpcy5ncmFkaXRpb24pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGNvbG9yIGJ5IG51bWJlclxyXG4gICAqL1xyXG4gIGdldEJ5TnVtYmVyKG51bWJlcikge1xyXG4gICAgcmV0dXJuIHRoaXMuZ3JhZGl0aW9uW251bWJlcl07XHJcbiAgfVxyXG5cclxuICBnZXRMYXN0Q29sb3IoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5ncmFkaXRpb25bdGhpcy5ncmFkaXRpb24ubGVuZ3RoIC0gMV07XHJcbiAgfVxyXG59XHJcblxyXG5Db2xvclNldC5HUkFEQVRJT05TID0gW1xyXG4gIC8vIGluZGlnb1xyXG4gIFtcclxuICAgIDB4M0Y1MUI1LFxyXG4gICAgMHgzOTQ5QUIsXHJcbiAgICAweDMwM0Y5RixcclxuICAgIDB4MjgzNTkzLFxyXG4gIF0sXHJcbiAgLy8gYmx1ZVxyXG4gIFtcclxuICAgIDB4MjE5NkYzLFxyXG4gICAgMHgxRTg4RTUsXHJcbiAgICAweDE5NzZEMixcclxuICAgIDB4MTU2NUMwLFxyXG4gIF0sXHJcbiAgLy8geWVsbG93XHJcbiAgW1xyXG4gICAgMHhGRkYxNzYsXHJcbiAgICAweEZGRUU1OCxcclxuICAgIDB4RkZFQjNCLFxyXG4gICAgMHhGREQ4MzUsXHJcbiAgXSxcclxuICAvLyBwaW5rXHJcbiAgW1xyXG4gICAgMHhFOTFFNjMsXHJcbiAgICAweEQ4MUI2MCxcclxuICAgIDB4QzIxODVCLFxyXG4gICAgMHhBRDE0NTcsXHJcbiAgXSxcclxuICAvLyBicm93blxyXG4gIFtcclxuICAgIDB4Nzk1NTQ4LFxyXG4gICAgMHg2RDRDNDEsXHJcbiAgICAweDVENDAzNyxcclxuICAgIDB4NEUzNDJFLFxyXG4gIF0sXHJcbiAgLy8gLy8gZGVlcG9yYW5nZVxyXG4gIC8vIFtcclxuICAvLyAgIDB4RkY1NzIyLFxyXG4gIC8vICAgMHhGNDUxMUUsXHJcbiAgLy8gICAweEU2NEExOSxcclxuICAvLyAgIDB4RDg0MzE1LFxyXG4gIC8vIF0sXHJcbiAgLy8gZ3JleVxyXG4gIFtcclxuICAgIDB4OUU5RTlFLFxyXG4gICAgMHg3NTc1NzUsXHJcbiAgICAweDYxNjE2MSxcclxuICAgIDB4NDI0MjQyLFxyXG4gIF0sXHJcbiAgLy8gLy8gcmVkXHJcbiAgLy8gW1xyXG4gIC8vICAgMHhGNDQzMzYsXHJcbiAgLy8gICAweEU1MzkzNSxcclxuICAvLyAgIDB4RDMyRjJGLFxyXG4gIC8vICAgMHhDNjI4MjgsXHJcbiAgLy8gXSxcclxuXTtcclxuXHJcbkVuZ2luZS5Db2xvclNldCA9IENvbG9yU2V0O1xyXG4iLCJjbGFzcyBMaW5rZXIge1xyXG4gIHN0YXRpYyBjYW5UcmlhbmdsZUxpbmsodHIxLCB0cjIpIHtcclxuXHJcbiAgfVxyXG59XHJcbiIsImNsYXNzIE1ldGVvciBleHRlbmRzIFBoYXNlci5TcHJpdGUge1xyXG4gIGNvbnN0cnVjdG9yKGdhbWUsIHggPSAwLCB5ID0gMCwgcm90YXRpb24gPSAwLCBzcGVlZCA9IDEwMCkge1xyXG4gICAgc3VwZXIoZ2FtZSwgeCwgeSwgZ2FtZS5jYWNoZS5nZXRCaXRtYXBEYXRhKE1ldGVvci5iaXRtYXBLZXkpKTtcclxuXHJcbiAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XHJcbiAgICB0aGlzLmFuY2hvci5zZXRUbygxKTtcclxuICAgIHRoaXMucmVmcmVzaFJvdGF0aW9uKHJvdGF0aW9uKTtcclxuICB9XHJcblxyXG4gIHJlc2V0KHgsIHksIHJvdGF0aW9uKSB7XHJcbiAgICB0aGlzLnJlZnJlc2hSb3RhdGlvbihyb3RhdGlvbik7XHJcblxyXG4gICAgc3VwZXIucmVzZXQoeCwgeSk7XHJcbiAgfVxyXG5cclxuICByZWZyZXNoUm90YXRpb24ocm90YXRpb24pIHtcclxuICAgIHRoaXMucm90YXRpb24gPSByb3RhdGlvbjtcclxuICAgIHRoaXMudmVsb2NpdHlYID0gTWF0aC5jb3Mocm90YXRpb24pICogdGhpcy5zcGVlZDtcclxuICAgIHRoaXMudmVsb2NpdHlZID0gTWF0aC5zaW4ocm90YXRpb24pICogdGhpcy5zcGVlZDtcclxuICB9XHJcblxyXG4gIHVwZGF0ZSgpIHtcclxuICAgIGlmICh0aGlzLmFsaXZlKSB7XHJcbiAgICAgIHRoaXMueCArPSB0aGlzLnZlbG9jaXR5WDtcclxuICAgICAgdGhpcy55ICs9IHRoaXMudmVsb2NpdHlZO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIG5ldyBtZXRlb3Igc3ByaXRlXHJcbiAgICovXHJcbiAgc3RhdGljIGdlbmVyYXRlU3ByaXRlKGdhbWUpIHtcclxuICAgIGNvbnN0IHdpZHRoID0gMTAyNDtcclxuICAgIGNvbnN0IGhlaWdodCA9IDI7XHJcblxyXG4gICAgbGV0IGJpdG1hcCA9IGdhbWUuYWRkLmJpdG1hcERhdGEod2lkdGgsIGhlaWdodCk7XHJcbiAgICBsZXQgZ3JhZGllbnQgPSBiaXRtYXAuY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KDAsIDAsIHdpZHRoLCAwKTtcclxuXHJcbiAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMS4wLCAncmdiYSgyNTUsIDI1NSwgMjU1LCAxKScpO1xyXG4gICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuOCwgJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC40KScpO1xyXG4gICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuNiwgJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC4zKScpO1xyXG4gICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuNCwgJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKScpO1xyXG4gICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuMiwgJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKScpO1xyXG4gICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAuMCwgJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMCknKTtcclxuXHJcbiAgICBiaXRtYXAuY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgYml0bWFwLmN0eC5maWxsU3R5bGUgPSBncmFkaWVudDtcclxuICAgIGJpdG1hcC5jdHgucmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgIGJpdG1hcC5jdHguZmlsbCgpO1xyXG5cclxuICAgIHJldHVybiBiaXRtYXA7XHJcbiAgfVxyXG59XHJcblxyXG5NZXRlb3IuYml0bWFwS2V5ID0gJ21ldGVvcic7XHJcblxyXG5FbmdpbmUuTWV0ZW9yID0gTWV0ZW9yO1xyXG4iLCJjbGFzcyBTY29yZUJhZGdlIGV4dGVuZHMgUGhhc2VyLkdyYXBoaWNzIHtcclxuICBjb25zdHJ1Y3RvcihnYW1lLCB4LCB5KSB7XHJcbiAgICBzdXBlcihnYW1lLCB4LCB5KTtcclxuXHJcbiAgICB0aGlzLmNyZWF0ZUxhYmxlKCk7XHJcbiAgICB0aGlzLnJlRHJhd0JhZGdlKCk7XHJcblxyXG4gICAgdGhpcy5pc1Zpc2libGUgPSBmYWxzZTtcclxuICAgIHRoaXMuYWxwaGEgPSAwO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHNjb3JlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Njb3JlXHJcbiAgfVxyXG4gIHNldCBzY29yZSh2YWx1ZSkge1xyXG4gICAgdGhpcy5fc2NvcmUgPSB2YWx1ZTtcclxuICAgIHRoaXMubGFibGUudGV4dCA9IHZhbHVlLnRvU3RyaW5nKCk7XHJcbiAgICB0aGlzLnJlRHJhd0JhZGdlKCk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVMYWJsZSgpIHtcclxuICAgIGNvbnN0IHN0eWxlID0ge1xyXG4gICAgICBmb250OiAnMjZweCBPcGVuIFNhbnMnLFxyXG4gICAgICBmaWxsOiAnd2hpdGUnXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5sYWJsZSA9IHRoaXMuZ2FtZS5tYWtlLnRleHQoMCwgMCwgJzAnLCBzdHlsZSk7XHJcbiAgICB0aGlzLmxhYmxlLmFuY2hvci5zZXRUbygwLjUpO1xyXG5cclxuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5sYWJsZSk7XHJcbiAgfVxyXG5cclxuICByZURyYXdCYWRnZSgpIHtcclxuICAgIGNvbnN0IGJhY2tncm91bmRDb2xvciA9IDA7XHJcbiAgICBjb25zdCByYWRpdXMgPSA1O1xyXG4gICAgY29uc3QgcGFkZGluZ3MgPSA1O1xyXG5cclxuICAgIHRoaXMuY2xlYXIoKTtcclxuXHJcbiAgICB0aGlzLmJlZ2luRmlsbChiYWNrZ3JvdW5kQ29sb3IsIDAuOCk7XHJcbiAgICB0aGlzLmRyYXdSb3VuZGVkUmVjdCgtKHRoaXMubGFibGUud2lkdGggKyBwYWRkaW5ncyAqIDIpIC8gMiwgLSh0aGlzLmxhYmxlLmhlaWdodCArIHBhZGRpbmdzKSAvIDIsIHRoaXMubGFibGUud2lkdGggKyBwYWRkaW5ncyAqIDIsIHRoaXMubGFibGUuaGVpZ2h0LCByYWRpdXMpO1xyXG4gICAgdGhpcy5lbmRGaWxsKCk7XHJcbiAgfVxyXG5cclxuICBzaG93KCkge1xyXG4gICAgaWYgKHRoaXMuaXNWaXNpYmxlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwidmlzaWJsZTpcIiwgdGhpcy5pc1Zpc2libGUpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYW5pbWF0aW9uVGltZSA9IDEwMDA7XHJcblxyXG4gICAgbGV0IHR3ZWVuID0gdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzKVxyXG4gICAgICAudG8oe1xyXG4gICAgICAgIHdpZHRoOiB0aGlzLndpZHRoLFxyXG4gICAgICAgIGhlaWdodDogdGhpcy5oZWlnaHQsXHJcbiAgICAgIH0sIGFuaW1hdGlvblRpbWUsIFBoYXNlci5FYXNpbmcuRWxhc3RpYy5PdXQpO1xyXG5cclxuICAgIHRoaXMud2lkdGggPSAwO1xyXG4gICAgdGhpcy5oZWlnaHQgPSAwO1xyXG4gICAgdGhpcy5hbHBoYSA9IDE7XHJcblxyXG4gICAgdHdlZW4uc3RhcnQoKTtcclxuXHJcbiAgICB0aGlzLmlzVmlzaWJsZSA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBoaWRlKCkge1xyXG4gICAgaWYgKCF0aGlzLmlzVmlzaWJsZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYW5pbWF0aW9uVGltZSA9IDI1MDtcclxuICAgIGNvbnN0IHdpZHRoID0gdGhpcy53aWR0aDtcclxuICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuaGVpZ2h0O1xyXG5cclxuICAgIGxldCB0d2VlbiA9IHRoaXMuZ2FtZS5hZGQudHdlZW4odGhpcylcclxuICAgICAgLnRvKHtcclxuICAgICAgICB3aWR0aDogMCxcclxuICAgICAgICBoZWlnaHQ6IDBcclxuICAgICAgfSwgYW5pbWF0aW9uVGltZSwgUGhhc2VyLkVhc2luZy5CYWNrLkluKTtcclxuXHJcbiAgICB0d2Vlbi5vbkNvbXBsZXRlXHJcbiAgICAgIC5hZGQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICB0aGlzLmFscGhhID0gMDtcclxuICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgdHdlZW4uc3RhcnQoKTtcclxuXHJcbiAgICB0aGlzLmlzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgY29uc29sZS5sb2codGhpcy5pc1Zpc2libGUpO1xyXG4gIH1cclxufVxyXG5cclxuRW5naW5lLlNjb3JlQmFkZ2UgPSBTY29yZUJhZGdlO1xyXG4iLCJjbGFzcyBTY29yZUxhYmxlIGV4dGVuZHMgUGhhc2VyLlRleHQge1xyXG4gIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIHNjb3JlLCBzdHlsZSkge1xyXG4gICAgc3VwZXIoZ2FtZSwgeCwgeSwgYFNjb3JlOiAke01hdGgucm91bmQoc2NvcmUpfWAsIHN0eWxlKTtcclxuXHJcbiAgICB0aGlzLnNjb3JlID0gc2NvcmU7XHJcblxyXG4gICAgdGhpcy5nYW1lLmFkZC5leGlzdGluZyh0aGlzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSBzY29yZSBsYWJsZSB2YWx1ZVxyXG4gICAqIEBwYXJhbSAge051bWJlcn0gc2NvcmUgTmV3IHNjb3JlXHJcbiAgICovXHJcbiAgY2hhbmdlVmFsdWUoc2NvcmUpIHtcclxuICAgIHRoaXMuZ2FtZS50d2VlbnMucmVtb3ZlKHRoaXMpO1xyXG5cclxuICAgIGxldCB0d2VlbiA9IHRoaXMuZ2FtZS5hZGQudHdlZW4odGhpcylcclxuICAgICAgLnRvKHtcclxuICAgICAgICBzY29yZVxyXG4gICAgICB9LCBTY29yZUxhYmxlLmFuaW1hdGlvbkNoYW5nZVZhbClcclxuICAgICAgLm9uVXBkYXRlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgICAgIHRoaXMudGV4dCA9IGBTY29yZTogJHtNYXRoLnJvdW5kKHRoaXMuc2NvcmUpfWA7XHJcbiAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgIHR3ZWVuLm9uQ29tcGxldGVcclxuICAgICAgLmFkZCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy50ZXh0ID0gYFNjb3JlOiAke01hdGgucm91bmQodGhpcy5zY29yZSl9YDtcclxuICAgICAgfSk7XHJcblxyXG4gICAgdHdlZW4uc3RhcnQoKTtcclxuICB9XHJcbn1cclxuXHJcblNjb3JlTGFibGUuYW5pbWF0aW9uQ2hhbmdlVmFsID0gNTAwO1xyXG5FbmdpbmUuU2NvcmVMYWJsZSA9IFNjb3JlTGFibGU7XHJcbiIsImNsYXNzIFNuYWtlIGV4dGVuZHMgUGhhc2VyLkdyYXBoaWNzIHtcclxuICBjb25zdHJ1Y3RvcihnYW1lKSB7XHJcbiAgICBzdXBlcihnYW1lLCAwLCAwKTtcclxuXHJcbiAgICB0aGlzLmhlYWQgPSB7XHJcbiAgICAgIHg6IDAsXHJcbiAgICAgIHk6IDAsXHJcbiAgICB9O1xyXG4gICAgdGhpcy52ZWxvY2l0eVggPSAwO1xyXG4gICAgdGhpcy52ZWxvY2l0eVkgPSAwO1xyXG4gICAgdGhpcy5zZWdtZW50cyA9IFtdO1xyXG4gIH1cclxuXHJcbiAgcnVuKHgsIHksIHRhcmdldFgsIHRhcmdldFksIGltcHVsc2VYLCBpbXB1bHNlWSwgY29sb3IpIHtcclxuICAgIHRoaXMucmVzZXQoMCwgMCk7XHJcbiAgICB0aGlzLmZpcnN0SW1wdWxzZSA9IE1hdGguc3FydChNYXRoLnBvdyhpbXB1bHNlWCwgMikgKyBNYXRoLnBvdyhpbXB1bHNlWCwgMikpO1xyXG4gICAgdGhpcy50YXJnZXRYID0gdGFyZ2V0WDtcclxuICAgIHRoaXMudGFyZ2V0WSA9IHRhcmdldFk7XHJcbiAgICB0aGlzLnZlbG9jaXR5WCA9IGltcHVsc2VYO1xyXG4gICAgdGhpcy52ZWxvY2l0eVkgPSBpbXB1bHNlWTtcclxuICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcclxuICAgIHRoaXMuc2VnbWVudHMgPSBbXTtcclxuICAgIHRoaXMuaGVhZCA9IHtcclxuICAgICAgeCxcclxuICAgICAgeSxcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5pc1J1biA9IHRydWU7XHJcbiAgICB0aGlzLmZpbmlzaFBoYXNlID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoKSB7XHJcbiAgICBpZiAodGhpcy5pc1J1bikge1xyXG4gICAgICB0aGlzLnVwZGF0ZVZlbG9jaXR5KCk7XHJcbiAgICAgIHRoaXMuaGVhZC54ICs9IHRoaXMudmVsb2NpdHlYO1xyXG4gICAgICB0aGlzLmhlYWQueSArPSB0aGlzLnZlbG9jaXR5WTtcclxuICAgICAgdGhpcy5tYWtlU25hcHNob3QoKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLmlzRmluaXNoKCkpIHtcclxuICAgICAgICB0aGlzLnN0b3AoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmZpbmlzaFBoYXNlKSB7XHJcbiAgICAgIHRoaXMubWFrZVNuYXBzaG90KCk7XHJcblxyXG4gICAgICBpZiAoXHJcbiAgICAgICAgdGhpcy5zZWdtZW50c1swXS54ID09PSB0aGlzLmhlYWQueCAmJlxyXG4gICAgICAgIHRoaXMuc2VnbWVudHNbMF0ueSA9PT0gdGhpcy5oZWFkLnlcclxuICAgICAgKSB7XHJcbiAgICAgICAgdGhpcy5maW5pc2hQaGFzZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMua2lsbCgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5kcmF3QWxsU2VnbWVudHMoKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVZlbG9jaXR5KCkge1xyXG4gICAgY29uc3Qgc3RlcHNVcGRhdGUgPSA2MCAqIDAuMTtcclxuXHJcbiAgICBsZXQgYW5nbGUgPSB0aGlzLmdhbWUubWF0aC5hbmdsZUJldHdlZW4odGhpcy5oZWFkLngsIHRoaXMuaGVhZC55LCB0aGlzLnRhcmdldFgsIHRoaXMudGFyZ2V0WSk7XHJcbiAgICBsZXQgdmVsb2NpdHlYID0gTWF0aC5jb3MoYW5nbGUpICogU25ha2Uuc3BlZWQ7XHJcbiAgICBsZXQgdmVsb2NpdHlZID0gTWF0aC5zaW4oYW5nbGUpICogU25ha2Uuc3BlZWQ7XHJcblxyXG4gICAgdGhpcy52ZWxvY2l0eVggKz0gKHZlbG9jaXR5WCAtIHRoaXMudmVsb2NpdHlYKSAvIHN0ZXBzVXBkYXRlO1xyXG4gICAgdGhpcy52ZWxvY2l0eVkgKz0gKHZlbG9jaXR5WSAtIHRoaXMudmVsb2NpdHlZKSAvIHN0ZXBzVXBkYXRlO1xyXG4gIH1cclxuXHJcbiAgc3RvcCgpIHtcclxuICAgIHRoaXMuaXNSdW4gPSBmYWxzZTtcclxuICAgIHRoaXMuZmluaXNoUGhhc2UgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgaXNGaW5pc2goKSB7XHJcbiAgICB0aGlzLmRpc3RhbmNlID0gdGhpcy5nYW1lLm1hdGguZGlzdGFuY2UoXHJcbiAgICAgIHRoaXMuaGVhZC54LFxyXG4gICAgICB0aGlzLmhlYWQueSxcclxuICAgICAgdGhpcy50YXJnZXRYLFxyXG4gICAgICB0aGlzLnRhcmdldFlcclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuZGlzdGFuY2UgPCB0aGlzLmZpcnN0SW1wdWxzZSArIFNuYWtlLnNwZWVkO1xyXG4gIH1cclxuXHJcbiAgbWFrZVNuYXBzaG90KCkge1xyXG4gICAgbGV0IHNlZ21lbnQ7XHJcblxyXG4gICAgd2hpbGUgKHRoaXMuc2VnbWVudHMubGVuZ3RoID4gU25ha2UubWF4U2VnbWVudHMpIHNlZ21lbnQgPSB0aGlzLnNlZ21lbnRzLnNoaWZ0KCk7XHJcblxyXG4gICAgc2VnbWVudCA9IHtcclxuICAgICAgeDogdGhpcy5oZWFkLngsXHJcbiAgICAgIHk6IHRoaXMuaGVhZC55LFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnNlZ21lbnRzLnB1c2goc2VnbWVudCk7XHJcbiAgfVxyXG5cclxuICBkcmF3QWxsU2VnbWVudHMoKSB7XHJcbiAgICB0aGlzLmNsZWFyKCk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNlZ21lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGxldCBzZWdtZW50ID0gdGhpcy5zZWdtZW50c1tpXTtcclxuICAgICAgbGV0IG5leHRTZWdtZW50ID0gdGhpcy5zZWdtZW50c1tpICsgMV0gfHwgc2VnbWVudDtcclxuXHJcbiAgICAgIHRoaXMubW92ZVRvKFxyXG4gICAgICAgIHNlZ21lbnQueCxcclxuICAgICAgICBzZWdtZW50LnlcclxuICAgICAgKTtcclxuXHJcbiAgICAgIHRoaXMubGluZVN0eWxlKFNuYWtlLnNpemUsIHRoaXMuY29sb3IsIDEpO1xyXG5cclxuICAgICAgdGhpcy5saW5lVG8oXHJcbiAgICAgICAgbmV4dFNlZ21lbnQueCxcclxuICAgICAgICBuZXh0U2VnbWVudC55XHJcbiAgICAgICk7XHJcblxyXG4gICAgICBpZiAodGhpcy5pc1J1bikge1xyXG4gICAgICAgIHRoaXMubGluZVN0eWxlKDAsIDAsIDApO1xyXG5cclxuICAgICAgICB0aGlzLmJlZ2luRmlsbCh0aGlzLmNvbG9yKTtcclxuICAgICAgICB0aGlzLmRyYXdDaXJjbGUoXHJcbiAgICAgICAgICBzZWdtZW50LngsXHJcbiAgICAgICAgICBzZWdtZW50LnksXHJcbiAgICAgICAgICBTbmFrZS5zaXplXHJcbiAgICAgICAgKVxyXG4gICAgICAgIHRoaXMuZW5kRmlsbCgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5TbmFrZS5tYXhTZWdtZW50cyA9IDEwO1xyXG5TbmFrZS5zaXplID0gMTA7XHJcblNuYWtlLnNwZWVkID0gNTA7XHJcblxyXG5FbmdpbmUuU25ha2UgPSBTbmFrZTtcclxuIiwiY2xhc3MgVG9uZSB7XHJcbiAgY29uc3RydWN0b3IoZ2FtZSkge1xyXG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcclxuICAgIHRoaXMuY3VycmVudCA9IDA7XHJcbiAgfVxyXG5cclxuICBjcmVhdGUoKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXAgYW5kIHBsYXkgbmV4dCB0b25lXHJcbiAgICovXHJcbiAgdXAoKSB7XHJcbiAgICBpZiAodGhpcy5jdXJyZW50ID4gVG9uZS5jb3VudCkge1xyXG4gICAgICB0aGlzLmN1cnJlbnQgPSBUb25lLmNvdW50IC0gMTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnRvbmVzW3RoaXMuY3VycmVudF0ucGxheSgpO1xyXG4gICAgdGhpcy5jdXJyZW50Kys7XHJcbiAgfVxyXG5cclxuICBsb3coKSB7XHJcbiAgICBpZiAodGhpcy5jdXJyZW50IDwgMCkge1xyXG4gICAgICB0aGlzLmN1cnJlbnQgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudG9uZXNbdGhpcy5jdXJyZW50XS5wbGF5KCk7XHJcbiAgICB0aGlzLmN1cnJlbnQtLTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlc2V0IHRvbmVcclxuICAgKi9cclxuICByZXNldCgpIHtcclxuICAgIHRoaXMuY3VycmVudCA9IDA7XHJcbiAgfVxyXG59XHJcblxyXG5Ub25lLmNvdW50ID0gMTA7XHJcbkVuZ2luZS5Ub25lID0gVG9uZTtcclxuIiwiY2xhc3MgVHJpYW5nbGUgZXh0ZW5kcyBQaGFzZXIuU3ByaXRlIHtcclxuXHJcbiAgLyoqXHJcbiAgICogSXQncyBhIHRyaWFuZ2xlLCB5YXNoIGl0J3Mgbm90IGEgam9rZVxyXG4gICAqIEBwYXJhbSAge1BoYXNlci5HYW1lfSAgZ2FtZSAgICAgIFtkZXNjcmlwdGlvbl1cclxuICAgKiBAcGFyYW0gIHtbdHlwZV19ICB4ICAgICAgICAgW2Rlc2NyaXB0aW9uXVxyXG4gICAqIEBwYXJhbSAge1t0eXBlXX0gIHkgICAgICAgICBbZGVzY3JpcHRpb25dXHJcbiAgICogQHBhcmFtICB7Qm9vbGVhbn0gaXNSb3RhdGVkIFtkZXNjcmlwdGlvbl1cclxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9ICBjb2xvciAgICAgW2Rlc2NyaXB0aW9uXVxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHksIGlzUm90YXRlZCwgY29sb3JTZXQsIG1hdHJpeFBvc2l0aW9uID0gbnVsbCkge1xyXG4gICAgc3VwZXIoZ2FtZSwgeCwgeSwgRW5naW5lLmdhbWUuY2FjaGUuZ2V0Qml0bWFwRGF0YShUcmlhbmdsZS5iaXRtYXBLZXkpKTtcclxuXHJcbiAgICB0aGlzLndpZHRoID0gVHJpYW5nbGUuc2l6ZTtcclxuICAgIHRoaXMuaGVpZ2h0ID0gVHJpYW5nbGUuc2l6ZTtcclxuICAgIHRoaXMuYW5jaG9yLnNldFRvKDAuNSk7XHJcbiAgICB0aGlzLmNvbG9yU2V0ID0gY29sb3JTZXQ7XHJcbiAgICB0aGlzLnRpbnQgPSB0aGlzLmNvbG9yU2V0LmdldFJhbmRvbUNvbG9yKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQb2l0aW9uIGluIHRoZSBtYXRyaXggb2YgdHJpYW5nbGVzXHJcbiAgICAgKiBAdHlwZSB7W3R5cGVdfVxyXG4gICAgICovXHJcbiAgICB0aGlzLm1hdHJpeFBvcyA9IG1hdHJpeFBvc2l0aW9uO1xyXG5cclxuICAgIHRoaXMuaW5wdXRFbmFibGVkID0gdHJ1ZTtcclxuICAgIHRoaXMuaW5wdXQucGl4ZWxQZXJmZWN0T3ZlciA9IHRydWU7XHJcbiAgICB0aGlzLmlucHV0LnBpeGVsUGVyZmVjdENsaWNrID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLmV2ZW50cy5kZWxldGVDb21wbGV0ZSA9IG5ldyBQaGFzZXIuU2lnbmFsKCk7XHJcblxyXG4gICAgdGhpcy5zZWxlY3RlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5pc1JvdGF0ZWQgPSBpc1JvdGF0ZWQ7XHJcblxyXG4gICAgaWYgKGlzUm90YXRlZCkge1xyXG4gICAgICB0aGlzLnJvdGF0aW9uID0gTWF0aC5QSTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB0aGlzLmFkZFRleHRQb3NpdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgYWRkVGV4dFBvc2l0aW9uKCkge1xyXG4gICAgbGV0IHRleHQgPSBuZXcgUGhhc2VyLlRleHQoXHJcbiAgICAgIHRoaXMuZ2FtZSxcclxuICAgICAgVHJpYW5nbGUuc2l6ZSAvIDIsXHJcbiAgICAgIFRyaWFuZ2xlLnNpemUgLyAyLFxyXG4gICAgICBgJHt0aGlzLm1hdHJpeFBvcy54fToke3RoaXMubWF0cml4UG9zLnl9YCxcclxuICAgICAge1xyXG4gICAgICAgIGZvbnQ6ICc2NHB4IE9wZW4gU2FucycsXHJcbiAgICAgICAgZmlsbDogJ2JsYWNrJ1xyXG4gICAgICB9XHJcbiAgICApXHJcblxyXG4gICAgaWYgKHRoaXMuaXNSb3RhdGVkKSB7XHJcbiAgICAgIHRleHQucm90YXRpb24gKz0gTWF0aC5QSTtcclxuICAgICAgdGV4dC55ID0gK3RleHQuaGVpZ2h0O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGV4dC54ID0gLXRleHQud2lkdGggLyAyO1xyXG4gICAgICB0ZXh0LnkgPSAtdGV4dC5oZWlnaHQgLyA0O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYWRkQ2hpbGQodGV4dCk7XHJcbiAgfVxyXG5cclxuICBzZWxlY3QoKSB7XHJcbiAgICBpZiAoIXRoaXMuc2VsZWN0ZWQpIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZCA9IHRydWU7XHJcblxyXG4gICAgICB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMpXHJcbiAgICAgICAgLnRvKHtcclxuICAgICAgICAgIHdpZHRoOiBUcmlhbmdsZS5zaXplIC8gMS41LFxyXG4gICAgICAgICAgaGVpZ2h0OiBUcmlhbmdsZS5zaXplIC8gMS41XHJcbiAgICAgICAgfSwgVHJpYW5nbGUuYW5pbWF0aW9uVGltZVNlbGVjdClcclxuICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgfVxyXG4gIH1cclxuXHJcbiAgdW5zZWxlY3QoKSB7XHJcbiAgICBpZiAodGhpcy5zZWxlY3RlZCkge1xyXG5cclxuICAgICAgdGhpcy5nYW1lLnR3ZWVucy5yZW1vdmUodGhpcyk7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgIHRoaXMuZ2FtZS5hZGQudHdlZW4odGhpcylcclxuICAgICAgICAudG8oe1xyXG4gICAgICAgICAgd2lkdGg6IFRyaWFuZ2xlLnNpemUsXHJcbiAgICAgICAgICBoZWlnaHQ6IFRyaWFuZ2xlLnNpemVcclxuICAgICAgICB9LCBUcmlhbmdsZS5hbmltYXRpb25UaW1lU2VsZWN0KVxyXG4gICAgICAgIC5zdGFydCgpO1xyXG4gICAgICB9XHJcbiAgfVxyXG5cclxuICBkZWxldGUoZGFsYXkgPSAwKSB7XHJcbiAgICBpZiAodGhpcy5nYW1lLmlucHV0LmFjdGl2ZVBvaW50ZXIuaXNEb3duKSB7XHJcbiAgICAgIHRoaXMuZ2FtZS5hZGQudHdlZW4odGhpcylcclxuICAgICAgICAudG8oe1xyXG4gICAgICAgICAgd2lkdGg6IDAsXHJcbiAgICAgICAgICBoZWlnaHQ6IDAsXHJcbiAgICAgICAgICBhbHBoYTogMFxyXG4gICAgICAgIH0sIFRyaWFuZ2xlLmFuaW1hdGlvblRpbWVEZWxldGUpXHJcbiAgICAgICAgLmRlbGF5KGRhbGF5KVxyXG4gICAgICAgIC5zdGFydCgpXHJcbiAgICAgICAgLm9uQ29tcGxldGVcclxuICAgICAgICAuYWRkKCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuZXZlbnRzLmRlbGV0ZUNvbXBsZXRlLmRpc3BhdGNoKHRoaXMpO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmVjb3Zlcihjb2xvclNldCkge1xyXG4gICAgY29uc3QgYW5pbWF0aW9uVGltZSA9IHRoaXMuZ2FtZS5ybmQuYmV0d2VlbigyNTAsIDMwMCk7XHJcblxyXG4gICAgdGhpcy5jb2xvclNldCA9IGNvbG9yU2V0O1xyXG4gICAgdGhpcy50aW50ID0gdGhpcy5jb2xvclNldC5nZXRSYW5kb21Db2xvcigpO1xyXG4gICAgdGhpcy53aWR0aCA9IFRyaWFuZ2xlLnNpemU7XHJcbiAgICB0aGlzLmhlaWdodCA9IFRyaWFuZ2xlLnNpemU7XHJcbiAgICB0aGlzLnNlbGVjdGVkID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzKVxyXG4gICAgICAudG8oe1xyXG4gICAgICAgIGFscGhhOiAxXHJcbiAgICAgIH0sIGFuaW1hdGlvblRpbWUsIFBoYXNlci5FYXNpbmcuTGluZWFyLk5vbmUpXHJcbiAgICAgIC5zdGFydCgpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlQ29sb3IoY29sb3JTZXQsIGRlbGF5ID0gMCkge1xyXG4gICAgY29uc3QgYW5pbWF0aW9uVGltZSA9IDEwMDA7XHJcbiAgICB0aGlzLmNvbG9yU2V0ID0gY29sb3JTZXQ7XHJcblxyXG4gICAgbGV0IGhpZGVUd2VlbiA9IHRoaXMuZ2FtZS5hZGQudHdlZW4odGhpcylcclxuICAgICAgLnRvKHtcclxuICAgICAgICBhbHBoYTogMFxyXG4gICAgICB9LCBhbmltYXRpb25UaW1lKTtcclxuXHJcbiAgICBsZXQgc2hvd1R3ZWVuID0gdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzKVxyXG4gICAgICAudG8oe1xyXG4gICAgICAgIGFscGhhOiAxXHJcbiAgICAgIH0sIGFuaW1hdGlvblRpbWUpO1xyXG5cclxuICAgIGhpZGVUd2VlblxyXG4gICAgICAub25Db21wbGV0ZVxyXG4gICAgICAuYWRkKCgpID0+IHtcclxuICAgICAgICB0aGlzLnRpbnQgPSB0aGlzLmNvbG9yU2V0LmdldFJhbmRvbUNvbG9yKCk7XHJcbiAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgIGhpZGVUd2Vlbi5kZWxheShkZWxheSk7XHJcblxyXG4gICAgaGlkZVR3ZWVuLmNoYWluKHNob3dUd2Vlbik7XHJcbiAgICBoaWRlVHdlZW4uc3RhcnQoKTtcclxuICB9XHJcblxyXG4gIGJsaW5rKCkge1xyXG4gICAgY29uc3QgbGFzdENvbG9yID0gdGhpcy50aW50O1xyXG4gICAgbGV0IHR3ZWVuID0gdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzKTtcclxuXHJcbiAgICB0d2Vlbi50byh7XHJcbiAgICAgICAgYWxwaGE6IDJcclxuICAgICAgfSwgMTAwKVxyXG4gICAgICAub25Db21wbGV0ZVxyXG4gICAgICAuYWRkKCgpID0+IHtcclxuICAgICAgICB0aGlzLnRpbnQgPSBsYXN0Q29sb3I7XHJcbiAgICAgICAgVHJpYW5nbGUuYmxpbmtzID0gW107XHJcbiAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgIHR3ZWVuLm9uU3RhcnRcclxuICAgICAgLmFkZCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5hbHBoYSA9IDA7XHJcbiAgICAgICAgdGhpcy50aW50ID0gMHgwMEZGMDA7XHJcbiAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgIGlmIChUcmlhbmdsZS5ibGlua3MubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIFRyaWFuZ2xlLmJsaW5rcy5wdXNoKHR3ZWVuKTtcclxuICAgICAgdHdlZW4uc3RhcnQoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxldCBsYXN0QmxpbmsgPSBUcmlhbmdsZS5ibGlua3NbVHJpYW5nbGUuYmxpbmtzLmxlbmd0aCAtIDFdO1xyXG4gICAgICBsYXN0QmxpbmsuY2hhaW4odHdlZW4pO1xyXG4gICAgICBUcmlhbmdsZS5ibGlua3MucHVzaCh0d2Vlbik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBoaW50TWUoKSB7XHJcbiAgICBsZXQgdHdlZW4gPSB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMpXHJcbiAgICAgIC50byh7XHJcbiAgICAgICAgd2lkdGg6IHRoaXMud2lkdGggKiAwLjc1LFxyXG4gICAgICAgIGhlaWdodDogdGhpcy5oZWlnaHQgKiAwLjc1XHJcbiAgICAgIH0sIDIwMClcclxuICAgICAgLnRvKHtcclxuICAgICAgICByb3RhdGlvbjogdGhpcy5yb3RhdGlvbiArIE1hdGguUEkgLyAzMlxyXG4gICAgICB9LCAxMDApXHJcbiAgICAgIC50byh7XHJcbiAgICAgICAgcm90YXRpb246IHRoaXMucm90YXRpb24gLSBNYXRoLlBJICogMiAvIDMyXHJcbiAgICAgIH0sIDEwMClcclxuICAgICAgLnRvKHtcclxuICAgICAgICByb3RhdGlvbjogTWF0aC5QSSAqIHRoaXMuaXNSb3RhdGVkXHJcbiAgICAgIH0sIDEwMClcclxuICAgICAgLnRvKHtcclxuICAgICAgICB3aWR0aDogVHJpYW5nbGUuc2l6ZSxcclxuICAgICAgICBoZWlnaHQ6IFRyaWFuZ2xlLnNpemVcclxuICAgICAgfSwgMjAwKTtcclxuXHJcbiAgICB0d2Vlbi5zdGFydCgpO1xyXG4gIH1cclxuXHJcbiAgZ3Jvd1VwKGRlbGF5ID0gMCkge1xyXG4gICAgY29uc3QgdGltZSA9IDMwMCArIHRoaXMuZ2FtZS5ybmQuYmV0d2VlbigtNTAsIDUwKTtcclxuXHJcbiAgICB0aGlzLndpZHRoID0gMDtcclxuICAgIHRoaXMuaGVpZ2h0ID0gMDtcclxuICAgIHRoaXMuYWxwaGEgPSAwO1xyXG5cclxuICAgIHRoaXMuZ2FtZS5hZGQudHdlZW4odGhpcylcclxuICAgICAgLnRvKHtcclxuICAgICAgICB3aWR0aDogVHJpYW5nbGUuc2l6ZSxcclxuICAgICAgICBoZWlnaHQ6IFRyaWFuZ2xlLnNpemUsXHJcbiAgICAgICAgYWxwaGE6IDFcclxuICAgICAgfSwgdGltZSlcclxuICAgICAgLmRlbGF5KGRlbGF5KVxyXG4gICAgICAuc3RhcnQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBuZXcgdHJpYW5nbGUgc3ByaXRlXHJcbiAgICovXHJcbiAgc3RhdGljIGdlbmVyYXRlU3ByaXRlKGdhbWUpIHtcclxuICAgIGNvbnN0IHNpemUgPSAyNTU7XHJcblxyXG4gICAgbGV0IGJpdG1hcCA9IGdhbWUuYWRkLmJpdG1hcERhdGEoc2l6ZSwgc2l6ZSk7XHJcblxyXG4gICAgYml0bWFwLmN0eC5iZWdpblBhdGgoKTtcclxuICAgIGJpdG1hcC5jdHguZmlsbFN0eWxlID0gJ3doaXRlJztcclxuICAgIGJpdG1hcC5jdHgubW92ZVRvKDAsIHNpemUpO1xyXG4gICAgYml0bWFwLmN0eC5saW5lVG8oc2l6ZSAvIDIsIDApO1xyXG4gICAgYml0bWFwLmN0eC5saW5lVG8oc2l6ZSwgc2l6ZSk7XHJcbiAgICBiaXRtYXAuY3R4LmxpbmVUbygwLCBzaXplKTtcclxuICAgIGJpdG1hcC5jdHguZmlsbCgpO1xyXG5cclxuICAgIHJldHVybiBiaXRtYXA7XHJcbiAgfVxyXG59XHJcblxyXG5UcmlhbmdsZS5zaXplID0gNzE7XHJcblRyaWFuZ2xlLmJsaW5rcyA9IFtdO1xyXG5UcmlhbmdsZS5hbmltYXRpb25UaW1lU2VsZWN0ID0gMjAwO1xyXG5UcmlhbmdsZS5hbmltYXRpb25UaW1lRGVsZXRlID0gMTUwO1xyXG5UcmlhbmdsZS5hbmltYXRpb25UaW1lUmVjb3ZlciA9IDMwMDtcclxuVHJpYW5nbGUuYml0bWFwS2V5ID0gJ3RyaWFuZ2xlJztcclxuXHJcbkVuZ2luZS5UcmlhbmdsZSA9IFRyaWFuZ2xlO1xyXG4iLCJjbGFzcyBVbml2ZXJzZSBleHRlbmRzIFBoYXNlci5HcmFwaGljcyB7XHJcbiAgY29uc3RydWN0b3IoZ2FtZSwgcm90YXRpb25TcGVlZCA9IDIuNSkge1xyXG4gICAgc3VwZXIoZ2FtZSwgZ2FtZS53b3JsZC5jZW50ZXJYLCBnYW1lLndvcmxkLmNlbnRlclkpO1xyXG4gICAgdGhpcy5hbmNob3Iuc2V0VG8oMC41KTtcclxuXHJcbiAgICB0aGlzLnJvdGF0aW9uU3BlZWQgPSByb3RhdGlvblNwZWVkO1xyXG4gICAgdGhpcy5yb3RhdGlvbiA9IHRoaXMuZ2FtZS5ybmQucmVhbEluUmFuZ2UoMCwgTWF0aC5QSSAqIDIpO1xyXG5cclxuICAgIHRoaXMuZHJhd1VuaXZlcnNlKCk7XHJcbiAgfVxyXG5cclxuICBkcmF3VW5pdmVyc2UoKSB7XHJcbiAgICBjb25zdCBtYXhTdGFyU2l6ZSA9IDQ7XHJcbiAgICBjb25zdCBtaW5TdGFyU2l6ZSA9IDE7XHJcbiAgICBjb25zdCB1bml2ZXJzZVNpemUgPSBNYXRoLnNxcnQoTWF0aC5wb3cod2luZG93LnNjcmVlbi5hdmFpbFdpZHRoLCAyKSArIE1hdGgucG93KHdpbmRvdy5zY3JlZW4uYXZhaWxIZWlnaHQsIDIpKTtcclxuICAgIGNvbnN0IHN0YXJzID0gNTAwO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RhcnM7IGkrKykge1xyXG4gICAgICBjb25zdCB3aGl0ZUdyYWRhdGlvbiA9IDI1NSAtIHRoaXMuZ2FtZS5ybmQuYmV0d2VlbigwLCAzMik7XHJcbiAgICAgIGNvbnN0IHN0YXJDb2xvciA9IFBoYXNlci5Db2xvci5nZXRDb2xvcih3aGl0ZUdyYWRhdGlvbiwgd2hpdGVHcmFkYXRpb24sIHdoaXRlR3JhZGF0aW9uKTtcclxuICAgICAgbGV0IHggPSB0aGlzLmdhbWUucm5kLmJldHdlZW4oLXVuaXZlcnNlU2l6ZSAvIDIsIHVuaXZlcnNlU2l6ZSAvIDIpO1xyXG4gICAgICBsZXQgeSA9IHRoaXMuZ2FtZS5ybmQuYmV0d2VlbigtdW5pdmVyc2VTaXplIC8gMiwgdW5pdmVyc2VTaXplIC8gMik7XHJcbiAgICAgIGxldCBzdGFyU2l6ZSA9IHRoaXMuZ2FtZS5ybmQuYmV0d2VlbihtaW5TdGFyU2l6ZSwgbWF4U3RhclNpemUpO1xyXG5cclxuICAgICAgdGhpcy5iZWdpbkZpbGwoc3RhckNvbG9yLCBNYXRoLnJhbmRvbSgpKTtcclxuICAgICAgdGhpcy5kcmF3Q2lyY2xlKHgsIHksIHN0YXJTaXplKTtcclxuICAgICAgdGhpcy5lbmRGaWxsKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoKSB7XHJcbiAgICB0aGlzLnJvdGF0aW9uICs9IE1hdGguUEkgLyAxODAwIC8gNjAgKiB0aGlzLnJvdGF0aW9uU3BlZWQ7XHJcbiAgfVxyXG5cclxuICByZXNpemUoKSB7XHJcbiAgICB0aGlzLnggPSB0aGlzLmdhbWUud2lkdGggLyAyO1xyXG4gICAgdGhpcy55ID0gdGhpcy5nYW1lLmhlaWdodCAvIDI7XHJcbiAgfVxyXG59XHJcblxyXG5FbmdpbmUuVW5pdmVyc2UgPSBVbml2ZXJzZTtcclxuIiwiY2xhc3MgV2F2ZSBleHRlbmRzIFBoYXNlci5TcHJpdGUge1xyXG4gIGNvbnN0cnVjdG9yKGdhbWUsIHgsIHkpIHtcclxuICAgIHN1cGVyKGdhbWUsIHgsIHksIFdhdmUuYml0bWFwS2V5LCAwKTtcclxuXHJcbiAgICB0aGlzLmFuY2hvci5zZXRUbygwLjUpO1xyXG5cclxuICAgIHRoaXMuYWxwaGEgPSAwO1xyXG4gICAgdGhpcy53aWR0aCA9IEVuZ2luZS5UcmlhbmdsZS5zaXplIC8gMjtcclxuICAgIHRoaXMuaGVpZ2h0ID0gRW5naW5lLlRyaWFuZ2xlLnNpemUgLyAyO1xyXG4gIH1cclxuXHJcbiAgcGxheUFuaW1hdGlvbih4LCB5KSB7XHJcbiAgICBjb25zdCBhbmltYXRpb25UaW1lID0gMjAwO1xyXG4gICAgdGhpcy5hbHBoYSA9IDE7XHJcbiAgICB0aGlzLnggPSB4O1xyXG4gICAgdGhpcy55ID0geTtcclxuICAgIHRoaXMuZnJhbWUgPSAwO1xyXG4gICAgdGhpcy53aWR0aCA9IEVuZ2luZS5UcmlhbmdsZS5zaXplIC8gMjtcclxuICAgIHRoaXMuaGVpZ2h0ID0gRW5naW5lLlRyaWFuZ2xlLnNpemUgLyAyO1xyXG5cclxuICAgIGxldCB0d2VlblNpemUgPSB0aGlzLmdhbWUuYWRkLnR3ZWVuKHRoaXMpXHJcbiAgICAgIC50byh7XHJcbiAgICAgICAgd2lkdGg6IEVuZ2luZS5UcmlhbmdsZS5zaXplICogV2F2ZS5zaXplUmF0aW8sXHJcbiAgICAgICAgaGVpZ2h0OiBFbmdpbmUuVHJpYW5nbGUuc2l6ZSAqIFdhdmUuc2l6ZVJhdGlvLFxyXG4gICAgICB9LCBhbmltYXRpb25UaW1lKTtcclxuXHJcbiAgICBsZXQgdHdlZW5EZXN0cm95ID0gdGhpcy5nYW1lLmFkZC50d2Vlbih0aGlzKVxyXG4gICAgICAudG8oe2FscGhhOiAwfSwgYW5pbWF0aW9uVGltZSlcclxuICAgICAgLm9uVXBkYXRlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmZyYW1lID09PSBXYXZlLmNvdW50RnJhbWVBbmltYXRpb24gLSAxKSB7XHJcbiAgICAgICAgICB0aGlzLmFscGhhID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5mcmFtZSsrO1xyXG4gICAgICB9LCB0aGlzKTtcclxuXHJcbiAgICB0d2VlblNpemUuY2hhaW4odHdlZW5EZXN0cm95KTtcclxuICAgIHR3ZWVuU2l6ZS5zdGFydCgpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdlbmVyYXRlQXRsYXNEYXRhKCkge1xyXG4gICAgbGV0IGF0bGFzRGF0YSA9IHtcclxuICAgICAgZnJhbWVzOiBbXVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBzaXplID0gRW5naW5lLlRyaWFuZ2xlLnNpemUgKiBXYXZlLnNpemVSYXRpbztcclxuICAgIGNvbnN0IGxpbmVTaXplID0gMTU7XHJcbiAgICBjb25zdCBzcHJpdGVTaGVldFdpZHRoID0gV2F2ZS5jb3VudEZyYW1lQW5pbWF0aW9uO1xyXG5cclxuICAgIGxldCBiaXRtYXAgPSBFbmdpbmUuZ2FtZS5tYWtlLmJpdG1hcERhdGEoc2l6ZSAqIHNwcml0ZVNoZWV0V2lkdGgsIHNpemUpO1xyXG4gICAgYml0bWFwLmN0eC5zdHJva2VTdHlsZSA9ICcjZTllOWU5JztcclxuXHJcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHNwcml0ZVNoZWV0V2lkdGg7IHgrKykge1xyXG4gICAgICBhdGxhc0RhdGEuZnJhbWVzW3hdID0ge1xyXG4gICAgICAgIGZyYW1lOiB7XHJcbiAgICAgICAgICB4OiB4ICogc2l6ZSxcclxuICAgICAgICAgIHk6IDAsXHJcbiAgICAgICAgICB3OiBzaXplLFxyXG4gICAgICAgICAgaDogc2l6ZSxcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBiaXRtYXAuY3R4LmxpbmVXaWR0aCA9IGxpbmVTaXplIC8gKDEgKyB4KTtcclxuICAgICAgYml0bWFwLmN0eC5tb3ZlVG8oc2l6ZSArIHggKiBzaXplIC0gbGluZVNpemUgLyAyLCBzaXplIC8gMik7XHJcblxyXG4gICAgICBsZXQgcmFkaXVzID0gc2l6ZSAvIDIgLSBsaW5lU2l6ZSAvIDI7XHJcblxyXG4gICAgICBiaXRtYXAuY3R4LmVsbGlwc2UoXHJcbiAgICAgICAgc2l6ZSAvIDIgKyB4ICogc2l6ZSxcclxuICAgICAgICBzaXplIC8gMixcclxuICAgICAgICByYWRpdXMsXHJcbiAgICAgICAgcmFkaXVzLFxyXG4gICAgICAgIDAsXHJcbiAgICAgICAgMCxcclxuICAgICAgICBNYXRoLlBJICogMlxyXG4gICAgICApO1xyXG4gICAgICBiaXRtYXAuY3R4LnN0cm9rZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGJpdG1hcCxcclxuICAgICAgYXRsYXNEYXRhLFxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuXHJcbldhdmUuc2l6ZVJhdGlvID0gMy41O1xyXG5XYXZlLmJpdG1hcEtleSA9ICd3YXZlJztcclxuV2F2ZS5jb3VudEZyYW1lQW5pbWF0aW9uID0gMTI7XHJcblxyXG5FbmdpbmUuV2F2ZSA9IFdhdmU7XHJcbiIsImNsYXNzIEdhbWUgZXh0ZW5kcyBQaGFzZXIuU3RhdGUge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuXHJcbiAgICB3aW5kb3cuZ2cgPSB0aGlzO1xyXG4gIH1cclxuXHJcbiAgaW5pdChudW1iZXJPZkdyYWRhdGlvbikge1xyXG4gICAgdGhpcy5jb2xvclNldHMgPSBbXTtcclxuICAgIC8qKlxyXG4gICAgICogTnVtYmVyIG9mIGNvbG9yU2V0cyB3aWxsIHVzZSBpbiB0aGlzIGdhbWUgbGV2ZWxcclxuICAgICAqIEB0eXBlIHtbdHlwZV19XHJcbiAgICAgKi9cclxuICAgIHRoaXMubnVtYmVyT2ZHcmFkYXRpb24gPSBudW1iZXJPZkdyYWRhdGlvbjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRvbmUgc3lzdGVtIG1hbmFnZXJcclxuICAgICAqIEB0eXBlIHtFbmdpbmV9XHJcbiAgICAgKi9cclxuICAgIHRoaXMudG9uZSA9IG5ldyBFbmdpbmUuVG9uZSh0aGlzLmdhbWUpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFyZ2luVG9wIG9mIHRyaWFuZ2xlcyBtYXRyaXhcclxuICAgICAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIHRoaXMubWFyZ2luVG9wID0gMTAwO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFyZ2luTGVmdCBvZiB0cmlhbmdsZXMgbWF0cml4XHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICB0aGlzLm1hcmdpbkxlZnQgPSA2NDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIE1pbmltYWwgdHJpYW5nbGVzIGRlc3Ryb3kgbGVuZ3RoXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICB0aGlzLm1pblRyaWFuZ2xlc0Rlc3Ryb3kgPSAzO1xyXG5cclxuICAgIHRoaXMudHJpYW5nbGVzTWF0cml4ID0gW107XHJcbiAgICB0aGlzLnNlbGVjdGVkVHJpYW5nbGVzID0gW107XHJcblxyXG4gICAgdGhpcy5zY29yZSA9IDA7XHJcblxyXG4gICAgdGhpcy50cmlhbmdsZU1hdHJpeFdpZHRoID0gMjU7XHJcbiAgICB0aGlzLnRyaWFuZ2xlTWF0cml4SGVpZ2h0ID0gOTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZSgpIHtcclxuICAgIHRoaXMuZ2FtZS5zdGFnZS5iYWNrZ3JvdW5kQ29sb3IgPSAnIzAwMCc7XHJcblxyXG4gICAgdGhpcy5jcmVhdGVVbml2ZXJzZSgpO1xyXG4gICAgdGhpcy5jcmVhdGVHcmFkYXRpb25zKCk7XHJcblxyXG4gICAgdGhpcy50cmlhbmdsZUdyb3VwID0gdGhpcy5nYW1lLmFkZC5ncm91cCgpO1xyXG5cclxuICAgIHRoaXMudG9uZS5jcmVhdGUoKTtcclxuXHJcbiAgICB0aGlzLnNrZXRjaCgpO1xyXG4gICAgdGhpcy5pbml0RXZlbnRzKCk7XHJcbiAgICB0aGlzLmNyZWF0ZVdhdmUoKTtcclxuICAgIHRoaXMuY3JlYXRlU291bmRzKCk7XHJcbiAgICB0aGlzLmNyZWF0ZVNuYWtlcygpO1xyXG4gICAgdGhpcy5jcmVhdGVIaW50VGltZXIoKTtcclxuICAgIHRoaXMuY3JlYXRlU2NvcmVCYWRnZSgpO1xyXG4gICAgdGhpcy5jcmVhdGVTY29yZUxhYmxlKCk7XHJcbiAgICB0aGlzLmluaXRpYWxpemF0aW9uRnVsbFNjcmVlbigpO1xyXG5cclxuICAgIHRoaXMuY3JlYXRlTWV0ZW9yKCk7XHJcblxyXG4gICAgdGhpcy5mb3JjZVBvcnRyYWl0ID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIC8vIHRoaXMuZ2FtZS5kZWJ1Zy5zcHJpdGVcclxuICB9XHJcblxyXG4gIHVwZGF0ZSgpIHt9XHJcblxyXG4gIGNyZWF0ZVNjb3JlQmFkZ2UoKSB7XHJcbiAgICBjb25zdCBtYXJnaW5CYWRnZSA9IDM1O1xyXG5cclxuICAgIHRoaXMuc2NvcmVCYWRnZSA9IG5ldyBFbmdpbmUuU2NvcmVCYWRnZSh0aGlzLmdhbWUsIDg1MCwgNTAwKTtcclxuXHJcbiAgICB0aGlzLnNjb3JlQmFkZ2UudXBkYXRlID0gKCkgPT4ge1xyXG4gICAgICB0aGlzLnNjb3JlQmFkZ2UueCA9IHRoaXMuZ2FtZS5pbnB1dC54O1xyXG4gICAgICB0aGlzLnNjb3JlQmFkZ2UueSA9IHRoaXMuZ2FtZS5pbnB1dC55IC0gbWFyZ2luQmFkZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5nYW1lLmFkZC5leGlzdGluZyh0aGlzLnNjb3JlQmFkZ2UpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlU25ha2VzKCkge1xyXG4gICAgY29uc3Qgc25ha2VzUHVsbFNpemUgPSAzMDtcclxuICAgIHRoaXMuc25ha2VzID0gdGhpcy5nYW1lLmFkZC5ncm91cCgpO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc25ha2VzUHVsbFNpemU7IGkrKykge1xyXG4gICAgICB0aGlzLmFkZFNuYWtlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjcmVhdGVTb3VuZHMoKSB7XHJcbiAgICAvLyB0aGlzLm11c2ljMSA9IHRoaXMuZ2FtZS5zb3VuZC5hZGQoJ211c2ljMScsIDEsIHRydWUpO1xyXG4gICAgLy8gdGhpcy5tdXNpYzEucGxheSgpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlR3JhZGF0aW9ucygpIHtcclxuICAgIGxldCBhbGxHcmFkYXRpb24gPSBQaGFzZXIuQXJyYXlVdGlscy5zaHVmZmxlKENvbG9yU2V0LkdSQURBVElPTlMpO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5udW1iZXJPZkdyYWRhdGlvbjsgaSsrKSB7XHJcbiAgICAgIGxldCBjb2xvclNldCA9IG5ldyBDb2xvclNldChhbGxHcmFkYXRpb25baV0pO1xyXG4gICAgICB0aGlzLmNvbG9yU2V0cy5wdXNoKGNvbG9yU2V0KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNyZWF0ZVVuaXZlcnNlKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBSb3RhdGlvbiBzcGVlZCBmb3Igc2Vjb25kIHVuaXZlcnNlXHJcbiAgICAgKiBAdHlwZSB7TnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBjb25zdCBzZWNvbmRSb3RhdGlvblNwZWVkID0gNTtcclxuICAgIGNvbnN0IGRlbGF5Rm9yU2Vjb25kVW5pdmVyc2VTaG93ID0gNTAwO1xyXG5cclxuICAgIHRoaXMudW5pdmVyc2VGaXJzdCA9IG5ldyBFbmdpbmUuVW5pdmVyc2UodGhpcy5nYW1lKTtcclxuICAgIHRoaXMudW5pdmVyc2VTZWNvbmQgPSBuZXcgRW5naW5lLlVuaXZlcnNlKHRoaXMuZ2FtZSwgc2Vjb25kUm90YXRpb25TcGVlZCk7XHJcblxyXG4gICAgdGhpcy51bml2ZXJzZUZpcnN0LmFscGhhID0gMDtcclxuICAgIHRoaXMudW5pdmVyc2VTZWNvbmQuYWxwaGEgPSAwO1xyXG5cclxuICAgIHRoaXMuZ2FtZS5hZGQuZXhpc3RpbmcodGhpcy51bml2ZXJzZUZpcnN0KTtcclxuICAgIHRoaXMuZ2FtZS5hZGQuZXhpc3RpbmcodGhpcy51bml2ZXJzZVNlY29uZCk7XHJcblxyXG4gICAgdGhpcy5hZGQudHdlZW4odGhpcy51bml2ZXJzZUZpcnN0KVxyXG4gICAgICAudG8oe1xyXG4gICAgICAgIGFscGhhOiAxXHJcbiAgICAgIH0pXHJcbiAgICAgIC5zdGFydCgpO1xyXG5cclxuICAgIHRoaXMuYWRkLnR3ZWVuKHRoaXMudW5pdmVyc2VTZWNvbmQpXHJcbiAgICAgIC50byh7XHJcbiAgICAgICAgYWxwaGE6IDFcclxuICAgICAgfSlcclxuICAgICAgLmRlbGF5KGRlbGF5Rm9yU2Vjb25kVW5pdmVyc2VTaG93KVxyXG4gICAgICAuc3RhcnQoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBzY29yZSBvbiBzdGFnZVxyXG4gICAqL1xyXG4gIGNyZWF0ZVNjb3JlTGFibGUoKSB7XHJcbiAgICBjb25zdCByYW5kb21Db2xvclNldCA9IHRoaXMuZ2FtZS5ybmQucGljayh0aGlzLmNvbG9yU2V0cyk7XHJcbiAgICBjb25zdCBjb2xvciA9ICcjMDBFNjc2JzsgLy8gKyBQaGFzZXIuQ29sb3IuY29tcG9uZW50VG9IZXgocmFuZG9tQ29sb3JTZXQuZ2V0TGFzdENvbG9yKCkpO1xyXG4gICAgY29uc3QgbWFyZ2luUmlnaHQgPSAxNTtcclxuICAgIGNvbnN0IG1hcmdpblRvcCA9IDE1O1xyXG5cclxuICAgIGNvbnN0IHN0eWxlID0ge1xyXG4gICAgICBmb250OiAnNDJweCBPcGVuIFNhbnMnLFxyXG4gICAgICBmb250U3R5bGU6ICdpdGFsaWMnLFxyXG4gICAgICBmaWxsOiBjb2xvclxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2NvcmVMYWJsZSA9IG5ldyBFbmdpbmUuU2NvcmVMYWJsZShcclxuICAgICAgdGhpcy5nYW1lLFxyXG4gICAgICB0aGlzLmdhbWUud2lkdGggLSBtYXJnaW5SaWdodCxcclxuICAgICAgbWFyZ2luVG9wLFxyXG4gICAgICAwLFxyXG4gICAgICBzdHlsZVxyXG4gICAgKTtcclxuICAgIHRoaXMuc2NvcmVMYWJsZS5hbmNob3Iuc2V0VG8oMSwgMCk7XHJcbiAgICB0aGlzLnNjb3JlTGFibGUuYWxwaGEgPSAwO1xyXG5cclxuICAgIHRoaXMuYWRkLnR3ZWVuKHRoaXMuc2NvcmVMYWJsZSlcclxuICAgICAgLnRvKHtcclxuICAgICAgICBhbHBoYTogMVxyXG4gICAgICB9KVxyXG4gICAgICAuc3RhcnQoKTtcclxuXHJcbiAgICAvLyBUT0RPOiBURU1QXHJcbiAgICB0aGlzLnNjb3JlTGFibGUuaW5wdXRFbmFibGVkID0gdHJ1ZTtcclxuICAgIHRoaXMuc2NvcmVMYWJsZS5ldmVudHMub25JbnB1dERvd24uYWRkKHRoaXMudG9nZ2xlRnVsbFNjcmVlbiwgdGhpcyk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVIaW50VGltZXIoKSB7XHJcbiAgICBjb25zdCBoaW50VGltZW91dCA9IDIwMDAwO1xyXG4gICAgdGhpcy5oaW50VGltZXIgPSB0aGlzLmdhbWUudGltZS5jcmVhdGUoKTtcclxuXHJcbiAgICB0aGlzLmhpbnRUaW1lci5sb29wKGhpbnRUaW1lb3V0LCB0aGlzLnZpc3VhbGlzYXRpb25IaW50LCB0aGlzKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZU1ldGVvcigpIHtcclxuICAgIGNvbnN0IG1ldGVvclRpbWVyRGVsYXkgPSAyMCAqIDEwMDA7XHJcblxyXG4gICAgdGhpcy5tZXRlb3IgPSBuZXcgRW5naW5lLk1ldGVvcih0aGlzLmdhbWUpO1xyXG4gICAgdGhpcy5nYW1lLmFkZC5leGlzdGluZyh0aGlzLm1ldGVvcik7XHJcbiAgICB0aGlzLm1ldGVvci5zZW5kVG9CYWNrKCk7XHJcbiAgICB0aGlzLm1ldGVvci5vdXRPZkNhbWVyYUJvdW5kc0tpbGwgPSB0cnVlO1xyXG4gICAgdGhpcy5tZXRlb3Iua2lsbCgpO1xyXG5cclxuICAgIHRoaXMubWV0ZW9yVGltZXIgPSB0aGlzLmdhbWUudGltZS5jcmVhdGUoKTtcclxuICAgIHRoaXMubWV0ZW9yVGltZXIubG9vcChtZXRlb3JUaW1lckRlbGF5LCAoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLmdhbWUucm5kLnBpY2soW3RydWUsIGZhbHNlXSkpIHtcclxuICAgICAgICB0aGlzLnJ1bk1ldGVvcigpO1xyXG4gICAgICB9XHJcbiAgICB9LCB0aGlzKTtcclxuICAgIHRoaXMubWV0ZW9yVGltZXIuc3RhcnQoKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZVdhdmUoKSB7XHJcbiAgICB0aGlzLndhdmUgPSBuZXcgRW5naW5lLldhdmUodGhpcy5nYW1lLCAwLCAwKTtcclxuXHJcbiAgICB0aGlzLmdhbWUuYWRkLmV4aXN0aW5nKHRoaXMud2F2ZSk7XHJcbiAgfVxyXG5cclxuICBydW5NZXRlb3IoKSB7XHJcbiAgICBjb25zdCBtYXJnaW5YID0gdGhpcy5nYW1lLndpZHRoIC8gMTA7XHJcbiAgICBjb25zdCBtYXJnaW5ZID0gdGhpcy5nYW1lLmhlaWdodCAvIDEwO1xyXG4gICAgY29uc3QgbWFyZ2luUm90YXRpb24gPSBNYXRoLlBJIC8gMTA7XHJcbiAgICBsZXQgeCwgeSwgcm90YXRpb247XHJcbiAgICBsZXQgc2lkZSA9IHRoaXMuZ2FtZS5ybmQucGljayhbJ3RvcCcsICdsZWZ0JywgJ3JpZ2h0JywgJ2JvdHRvbSddKTtcclxuXHJcbiAgICBzd2l0Y2ggKHNpZGUpIHtcclxuICAgICAgY2FzZSAndG9wJzpcclxuICAgICAgICB4ID0gdGhpcy5nYW1lLnJuZC5iZXR3ZWVuKG1hcmdpblgsIHRoaXMuZ2FtZS53aWR0aCAtIG1hcmdpblgpO1xyXG4gICAgICAgIHkgPSAwO1xyXG4gICAgICAgIHJvdGF0aW9uID0gdGhpcy5nYW1lLnJuZC5yZWFsSW5SYW5nZShtYXJnaW5Sb3RhdGlvbiwgTWF0aC5QSSAtIG1hcmdpblJvdGF0aW9uKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnbGVmdCc6XHJcbiAgICAgICAgeCA9IDA7XHJcbiAgICAgICAgeSA9IHRoaXMuZ2FtZS5ybmQuYmV0d2VlbihtYXJnaW5ZLCB0aGlzLmdhbWUuaGVpZ2h0IC0gbWFyZ2luWSk7XHJcbiAgICAgICAgcm90YXRpb24gPSB0aGlzLmdhbWUucm5kLnJlYWxJblJhbmdlKC1NYXRoLlBJIC8gMiArIG1hcmdpblJvdGF0aW9uLCBNYXRoLlBJIC8gMiAtIG1hcmdpblJvdGF0aW9uKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAncmlnaHQnOlxyXG4gICAgICAgIHggPSB0aGlzLmdhbWUud2lkdGg7XHJcbiAgICAgICAgeSA9IHRoaXMuZ2FtZS5ybmQuYmV0d2VlbihtYXJnaW5ZLCB0aGlzLmdhbWUuaGVpZ2h0IC0gbWFyZ2luWSk7XHJcbiAgICAgICAgcm90YXRpb24gPSB0aGlzLmdhbWUucm5kLnJlYWxJblJhbmdlKE1hdGguUEkgLyAyICsgbWFyZ2luUm90YXRpb24sIE1hdGguUEkgKiAzIC8gMiAtIG1hcmdpblJvdGF0aW9uKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnYm90dG9tJzpcclxuICAgICAgICB4ID0gdGhpcy5nYW1lLnJuZC5iZXR3ZWVuKG1hcmdpblgsIHRoaXMuZ2FtZS53aWR0aCAtIG1hcmdpblgpO1xyXG4gICAgICAgIHkgPSB0aGlzLmdhbWUuaGVpZ2h0O1xyXG4gICAgICAgIHJvdGF0aW9uID0gdGhpcy5nYW1lLnJuZC5yZWFsSW5SYW5nZShtYXJnaW5Sb3RhdGlvbiwgLU1hdGguUEkgKyBtYXJnaW5Sb3RhdGlvbik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5tZXRlb3IucmVzZXQoeCwgeSwgcm90YXRpb24pO1xyXG4gIH1cclxuXHJcbiAgdmlzdWFsaXNhdGlvbkhpbnQoKSB7XHJcbiAgICBsZXQgdHJpYW5nbGUgPSB0aGlzLmdldEhpbnRUcmlhbmdsZSgpO1xyXG5cclxuICAgIGlmICh0cmlhbmdsZSAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICB0cmlhbmdsZS5oaW50TWUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluaXRpYWxpemF0aW9uIGV2ZW50IGluIHRoZSBnYW1lXHJcbiAgICovXHJcbiAgaW5pdEV2ZW50cygpIHtcclxuICAgIHRoaXMuZ2FtZS5pbnB1dC5vblVwLmFkZCh0aGlzLmRlc3Ryb3lUcmlhbmdsZSwgdGhpcyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgdHJpYW5nbGVzIG9uIGNhbnZhc1xyXG4gICAqL1xyXG4gIHNrZXRjaCgpIHtcclxuICAgIGNvbnN0IGRlbGF5Rm9yRGlzcGxheSA9IDUwMDtcclxuXHJcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMudHJpYW5nbGVNYXRyaXhXaWR0aDsgeCsrKSB7XHJcbiAgICAgIHRoaXMudHJpYW5nbGVzTWF0cml4W3hdID0gW107XHJcbiAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy50cmlhbmdsZU1hdHJpeEhlaWdodDsgeSsrKSB7XHJcbiAgICAgICAgbGV0IHBvc1ggPSB4ICogKEVuZ2luZS5UcmlhbmdsZS5zaXplIC8gMiAtIDEpO1xyXG4gICAgICAgIGxldCBwb3NZID0geSAqIChFbmdpbmUuVHJpYW5nbGUuc2l6ZSAtIDEpO1xyXG4gICAgICAgIGxldCBpc1JvdGF0ZWQgPSB4ICUgMiA9PT0gMTtcclxuICAgICAgICBsZXQgY29sb3JTZXQgPSB0aGlzLmdhbWUucm5kLnBpY2sodGhpcy5jb2xvclNldHMpO1xyXG5cclxuICAgICAgICBpZiAoeSAlIDIgPT09IDEpIHtcclxuICAgICAgICAgIGlzUm90YXRlZCA9ICFpc1JvdGF0ZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdHJpYW5nbGUgPSBuZXcgRW5naW5lLlRyaWFuZ2xlKFxyXG4gICAgICAgICAgdGhpcy5nYW1lLFxyXG4gICAgICAgICAgcG9zWCxcclxuICAgICAgICAgIHBvc1ksXHJcbiAgICAgICAgICBpc1JvdGF0ZWQsXHJcbiAgICAgICAgICBjb2xvclNldCwge1xyXG4gICAgICAgICAgICB4LFxyXG4gICAgICAgICAgICB5XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgdHJpYW5nbGUuZ3Jvd1VwKGRlbGF5Rm9yRGlzcGxheSArICh4ICsgeSkgKiAyNSk7XHJcblxyXG4gICAgICAgIHRyaWFuZ2xlLmV2ZW50cy5vbklucHV0T3Zlci5hZGQodGhpcy5zZWxlY3RUcmlhbmdsZSwgdGhpcyk7XHJcbiAgICAgICAgdHJpYW5nbGUuZXZlbnRzLm9uSW5wdXREb3duLmFkZCh0aGlzLnNlbGVjdFRyaWFuZ2xlLCB0aGlzKTtcclxuICAgICAgICB0cmlhbmdsZS5ldmVudHMuZGVsZXRlQ29tcGxldGUuYWRkKHRoaXMucmVjb3ZlclRyaWFuZ2xlLCB0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy50cmlhbmdsZXNNYXRyaXhbeF1beV0gPSB0cmlhbmdsZTtcclxuICAgICAgICAvLyB0aGlzLmFkZC5leGlzdGluZyh0cmlhbmdsZSk7XHJcbiAgICAgICAgdGhpcy50cmlhbmdsZUdyb3VwLmFkZCh0cmlhbmdsZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNlbnRlcmluZ01hdHJpeCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVzdHJveSBvciB1bnNlbGVjdCB0cmlhbmdsZXNcclxuICAgKi9cclxuICBkZXN0cm95VHJpYW5nbGUoKSB7XHJcbiAgICB0aGlzLnRvbmUucmVzZXQoKTtcclxuXHJcbiAgICBsZXQgaXNVbnNlbGVjdCA9IHRoaXMuc2VsZWN0ZWRUcmlhbmdsZXMubGVuZ3RoIDwgdGhpcy5taW5UcmlhbmdsZXNEZXN0cm95O1xyXG5cclxuICAgIGlmICghaXNVbnNlbGVjdCkge1xyXG4gICAgICB0aGlzLnVwZGF0ZVNjb3JlKE1hdGgucG93KHRoaXMuc2VsZWN0ZWRUcmlhbmdsZXMubGVuZ3RoLCAyLjE1KSAqIDEwKTtcclxuICAgICAgdGhpcy5zaGFrZUl0U2hha2VJdCh0aGlzLnNlbGVjdGVkVHJpYW5nbGVzLmxlbmd0aCk7XHJcbiAgICAgIHRoaXMuaGludFRpbWVyLnN0b3AoZmFsc2UpO1xyXG4gICAgICB0aGlzLmhpbnRUaW1lci5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGJldHdlZW5BbmltYXRpb25EYWxheSA9IDI1O1xyXG4gICAgY29uc3Qgc25ha2VGb3JUcmlhbmdsZSA9IDI7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IHRoaXMuc2VsZWN0ZWRUcmlhbmdsZXMubGVuZ3RoID4gMDsgaSsrKSB7XHJcbiAgICAgIGxldCB0cmlhbmdsZSA9IHRoaXMuc2VsZWN0ZWRUcmlhbmdsZXMuc2hpZnQoKTtcclxuXHJcbiAgICAgIGlmIChpc1Vuc2VsZWN0KSB7XHJcbiAgICAgICAgdHJpYW5nbGUudW5zZWxlY3QoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0cmlhbmdsZS5kZWxldGUoaSAqIGJldHdlZW5BbmltYXRpb25EYWxheSk7XHJcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRUcmlhbmdsZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICB0aGlzLnNjb3JlQmFkZ2UuaGlkZSgpO1xyXG4gICAgICAgICAgdGhpcy5zbmFrZXNBbmltYXRpb25SdW4odHJpYW5nbGUud29ybGQueCwgdHJpYW5nbGUud29ybGQueSwgdHJpYW5nbGUuY29sb3JTZXQsIE1hdGguZmxvb3IoKGkgKyAxKSAvIHNuYWtlRm9yVHJpYW5nbGUpKTtcclxuICAgICAgICAgIHRoaXMud2F2ZS5wbGF5QW5pbWF0aW9uKHRyaWFuZ2xlLndvcmxkLngsIHRyaWFuZ2xlLndvcmxkLnksIHRyaWFuZ2xlLmlzUm90YXRlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFpc1Vuc2VsZWN0KSB7XHJcbiAgICAgIGxldCB0aW1lckV4aXN0TW92ZSA9IHRoaXMuZ2FtZS50aW1lLmNyZWF0ZSgpO1xyXG5cclxuICAgICAgdGltZXJFeGlzdE1vdmUuYWRkKFxyXG4gICAgICAgIFRyaWFuZ2xlLmFuaW1hdGlvblRpbWVEZWxldGUgK1xyXG4gICAgICAgIFRyaWFuZ2xlLmFuaW1hdGlvblRpbWVSZWNvdmVyLFxyXG4gICAgICAgIHRoaXMucHJvY2Vzc1Bvc2l0aW9uLFxyXG4gICAgICAgIHRoaXNcclxuICAgICAgKTtcclxuXHJcbiAgICAgIHRpbWVyRXhpc3RNb3ZlLnN0YXJ0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZWNvdmVyVHJpYW5nbGUodHJpYW5nbGUpIHtcclxuICAgIHRyaWFuZ2xlLnJlY292ZXIodGhpcy5nYW1lLnJuZC5waWNrKHRoaXMuY29sb3JTZXRzKSk7XHJcbiAgfVxyXG5cclxuICBzZWxlY3RUcmlhbmdsZSh0cmlhbmdsZSwgcG9pbnQpIHtcclxuICAgIGlmICghdGhpcy5nYW1lLmlucHV0LmFjdGl2ZVBvaW50ZXIuaXNEb3duKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5zZWxlY3RlZFRyaWFuZ2xlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgdHJpYW5nbGUuc2VsZWN0KCk7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRUcmlhbmdsZXMucHVzaCh0cmlhbmdsZSk7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbGV0IGxhc3RTZWxlY3RlZFRyaWFuZ2xlID0gdGhpcy5zZWxlY3RlZFRyaWFuZ2xlc1t0aGlzLnNlbGVjdGVkVHJpYW5nbGVzLmxlbmd0aCAtIDFdO1xyXG4gICAgICBsZXQgcHJlTGFzdFNlbGVjdGVkVHJpYW5nbGUgPSB0aGlzLnNlbGVjdGVkVHJpYW5nbGVzW3RoaXMuc2VsZWN0ZWRUcmlhbmdsZXMubGVuZ3RoIC0gMl07XHJcblxyXG4gICAgICBpZiAodHJpYW5nbGUuc2VsZWN0ZWQgJiYgdHJpYW5nbGUgPT09IHByZUxhc3RTZWxlY3RlZFRyaWFuZ2xlKSB7XHJcbiAgICAgICAgbGFzdFNlbGVjdGVkVHJpYW5nbGUudW5zZWxlY3QoKTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkVHJpYW5nbGVzLnBvcCgpO1xyXG4gICAgICAgIHRoaXMubmV3VW5zZWxlY3QodGhpcy5zZWxlY3RlZFRyaWFuZ2xlcy5sZW5ndGgpO1xyXG4gICAgICB9IGVsc2UgaWYgKCF0cmlhbmdsZS5zZWxlY3RlZCAmJlxyXG4gICAgICAgIHRoaXMuY2FuVHJpYW5nbGVMaW5rKGxhc3RTZWxlY3RlZFRyaWFuZ2xlLCB0cmlhbmdsZSkgJiZcclxuICAgICAgICBsYXN0U2VsZWN0ZWRUcmlhbmdsZS5jb2xvclNldCA9PT0gdHJpYW5nbGUuY29sb3JTZXRcclxuICAgICAgKSB7XHJcbiAgICAgICAgdHJpYW5nbGUuc2VsZWN0KCk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFRyaWFuZ2xlcy5wdXNoKHRyaWFuZ2xlKTtcclxuICAgICAgICB0aGlzLm5ld1NlbGVjdCh0aGlzLnNlbGVjdGVkVHJpYW5nbGVzLmxlbmd0aCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5ld1NlbGVjdChjb3VudCkge1xyXG4gICAgaWYgKGNvdW50ID4gdGhpcy5taW5UcmlhbmdsZXNEZXN0cm95IC0gMSkge1xyXG4gICAgICB0aGlzLnNjb3JlQmFkZ2Uuc2NvcmUgPSBNYXRoLnJvdW5kKE1hdGgucG93KGNvdW50LCAyLjE1KSAqIDEwKTtcclxuICAgICAgdGhpcy5zY29yZUJhZGdlLnNob3coKTtcclxuICAgIH1cclxuICAgIC8vIHRoaXMudG9uZS51cCgpO1xyXG4gIH1cclxuXHJcbiAgbmV3VW5zZWxlY3QoY291bnQpIHtcclxuICAgIGlmIChjb3VudCA8IHRoaXMubWluVHJpYW5nbGVzRGVzdHJveSkge1xyXG4gICAgICB0aGlzLnNjb3JlQmFkZ2UuaGlkZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zY29yZUJhZGdlLnNjb3JlID0gTWF0aC5yb3VuZChNYXRoLnBvdyhjb3VudCwgMi4xNSkgKiAxMCk7XHJcbiAgICB9XHJcbiAgICAvLyB0aGlzLnRvbmUubG93KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVjayB0cmlhbmdsZXMgbGlua1xyXG4gICAqL1xyXG4gIGNhblRyaWFuZ2xlTGluayh0cjEsIHRyMikge1xyXG4gICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xyXG4gICAgaWYgKHRyMS5tYXRyaXhQb3MueSA9PT0gdHIyLm1hdHJpeFBvcy55KSB7XHJcbiAgICAgIGlmICh0cjEubWF0cml4UG9zLnggKyAxID09PSB0cjIubWF0cml4UG9zLnggfHxcclxuICAgICAgICB0cjEubWF0cml4UG9zLnggLSAxID09PSB0cjIubWF0cml4UG9zLngpIHtcclxuICAgICAgICByZXN1bHQgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHRyMS5tYXRyaXhQb3MueCA9PT0gdHIyLm1hdHJpeFBvcy54KSB7XHJcbiAgICAgIGlmICh0cjEubWF0cml4UG9zLnggJSAyID09PSAwKSB7XHJcbiAgICAgICAgaWYgKHRyMS5pc1JvdGF0ZWQgJiYgdHIyLm1hdHJpeFBvcy55ID09PSB0cjEubWF0cml4UG9zLnkgLSAxKSB7XHJcbiAgICAgICAgICByZXN1bHQgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIXRyMS5pc1JvdGF0ZWQgJiYgdHIyLm1hdHJpeFBvcy55ID09PSB0cjEubWF0cml4UG9zLnkgKyAxKSB7XHJcbiAgICAgICAgICByZXN1bHQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoIXRyMS5pc1JvdGF0ZWQgJiYgdHIyLm1hdHJpeFBvcy55ID09PSB0cjEubWF0cml4UG9zLnkgKyAxKSB7XHJcbiAgICAgICAgICByZXN1bHQgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHIxLmlzUm90YXRlZCAmJiB0cjIubWF0cml4UG9zLnkgPT09IHRyMS5tYXRyaXhQb3MueSAtIDEpIHtcclxuICAgICAgICAgIHJlc3VsdCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIGluaXRpYWxpemF0aW9uRnVsbFNjcmVlbigpIHtcclxuICAgIHRoaXMuZ2FtZS5zY2FsZS5mdWxsU2NyZWVuU2NhbGVNb2RlID0gUGhhc2VyLlNjYWxlTWFuYWdlci5SRVNJWkU7XHJcbiAgICB0aGlzLmdhbWUuc2NhbGUub25GdWxsU2NyZWVuQ2hhbmdlXHJcbiAgICAgIC5hZGQodGhpcy5yZXNpemVTY3JlZW4sIHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlRnVsbFNjcmVlbigpIHtcclxuICAgIGlmICh0aGlzLmdhbWUuc2NhbGUuaXNGdWxsU2NyZWVuKSB7XHJcbiAgICAgIHRoaXMuZ2FtZS5zY2FsZS5zdG9wRnVsbFNjcmVlbigpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5nYW1lLnNjYWxlLnN0YXJ0RnVsbFNjcmVlbigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlU2NvcmUodmFsKSB7XHJcbiAgICB2YWwgPSBNYXRoLnJvdW5kKHZhbCk7XHJcblxyXG4gICAgdGhpcy5zY29yZSArPSB2YWw7XHJcbiAgICB0aGlzLnNjb3JlTGFibGUuY2hhbmdlVmFsdWUodGhpcy5zY29yZSk7XHJcbiAgfVxyXG5cclxuICByZXNpemVTY3JlZW4oKSB7XHJcbiAgICB0aGlzLnNjb3JlTGFibGUueCA9IHRoaXMuZ2FtZS53aWR0aCAtIDE1O1xyXG4gICAgdGhpcy5zY29yZUxhYmxlLnkgPSAxNTtcclxuXHJcbiAgICB0aGlzLnVuaXZlcnNlRmlyc3QucmVzaXplKCk7XHJcbiAgICB0aGlzLnVuaXZlcnNlU2Vjb25kLnJlc2l6ZSgpO1xyXG5cclxuICAgIHRoaXMuY2VudGVyaW5nTWF0cml4KCk7XHJcbiAgfVxyXG5cclxuICBjZW50ZXJpbmdNYXRyaXgoKSB7XHJcbiAgICBjb25zdCBoYWxmVHJpYW5nbGVTaXplID0gRW5naW5lLlRyaWFuZ2xlLnNpemUgLyAyO1xyXG5cclxuICAgIHRoaXMudHJpYW5nbGVHcm91cC54ID0gdGhpcy5nYW1lLndpZHRoIC8gMiAtIHRoaXMudHJpYW5nbGVHcm91cC53aWR0aCAvIDIgKyBoYWxmVHJpYW5nbGVTaXplO1xyXG4gICAgdGhpcy50cmlhbmdsZUdyb3VwLnkgPSB0aGlzLmdhbWUuaGVpZ2h0IC8gMiAtIHRoaXMudHJpYW5nbGVHcm91cC5oZWlnaHQgLyAyICsgaGFsZlRyaWFuZ2xlU2l6ZTtcclxuICB9XHJcblxyXG4gIHJlYnVpbGRNYXAoKSB7XHJcbiAgICBjb25zdCB0aW1lRGVsYXkgPSA1MDtcclxuXHJcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMudHJpYW5nbGVNYXRyaXhXaWR0aDsgeCsrKSB7XHJcbiAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy50cmlhbmdsZU1hdHJpeEhlaWdodDsgeSsrKSB7XHJcbiAgICAgICAgbGV0IHRyaWFuZ2xlID0gdGhpcy50cmlhbmdsZXNNYXRyaXhbeF1beV07XHJcbiAgICAgICAgbGV0IHJhbmRvbUNvbG9yU2V0ID0gdGhpcy5nYW1lLnJuZC5waWNrKHRoaXMuY29sb3JTZXRzKTtcclxuXHJcbiAgICAgICAgdHJpYW5nbGUudXBkYXRlQ29sb3IocmFuZG9tQ29sb3JTZXQsIHggKiB0aW1lRGVsYXkgKyB5ICogdGltZURlbGF5KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJvY2Vzc1Bvc2l0aW9uKCkge1xyXG4gICAgaWYgKHRoaXMuZ2V0U29tZUNvbWJpbmF0aW9uKCkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIGNvbnN0IGRlbGF5RGVzdHJveSA9IDUwMDA7XHJcbiAgICAgIGxldCB0aW1lciA9IHRoaXMuZ2FtZS50aW1lLmNyZWF0ZSgpO1xyXG5cclxuICAgICAgdGltZXIuYWRkKGRlbGF5RGVzdHJveSwgdGhpcy5yZWJ1aWxkTWFwLCB0aGlzKTtcclxuICAgICAgdGltZXIuc3RhcnQoMCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRIaW50VHJpYW5nbGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5nYW1lLnJuZC5waWNrKHRoaXMuZ2V0U29tZUNvbWJpbmF0aW9uKCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGV4aXN0aW5nIGNvbWJpbmF0aW9uLCBpZiB3ZSBoYXZlbid0IGV4aXN0IG1vdmUsIHRoZW4gcmV0dXJuIGVtcHR5IGFycmF5XHJcbiAgICovXHJcbiAgZ2V0U29tZUNvbWJpbmF0aW9uKCkge1xyXG4gICAgbGV0IHVzZWRDZWxsID0gW107XHJcbiAgICBsZXQgdHJpYW5nbGVzID0gW107XHJcblxyXG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLnRyaWFuZ2xlTWF0cml4V2lkdGg7IHgrKykge1xyXG4gICAgICB1c2VkQ2VsbFt4XSA9IFtdO1xyXG4gICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMudHJpYW5nbGVNYXRyaXhIZWlnaHQ7IHkrKykge1xyXG4gICAgICAgIHVzZWRDZWxsW3hdW3ldID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMudHJpYW5nbGVNYXRyaXhXaWR0aDsgeCsrKSB7XHJcbiAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy50cmlhbmdsZU1hdHJpeEhlaWdodDsgeSsrKSB7XHJcbiAgICAgICAgaWYgKCF1c2VkQ2VsbFt4XVt5XSAmJiB0aGlzLmhhc0NvbWJpbmF0aW9uKHVzZWRDZWxsLCB0aGlzLnRyaWFuZ2xlc01hdHJpeFt4XVt5XS5jb2xvclNldCwgeCwgeSwgMSkpIHtcclxuICAgICAgICAgIHRyaWFuZ2xlcy5wdXNoKHRoaXMudHJpYW5nbGVzTWF0cml4W3hdW3ldKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJpYW5nbGVzO1xyXG4gIH1cclxuXHJcbiAgaGFzQ29tYmluYXRpb24odXNlZENlbGwsIGNvbG9yU2V0LCB4LCB5LCBjbnQpIHtcclxuICAgIGlmIChjb2xvclNldCAhPT0gdGhpcy50cmlhbmdsZXNNYXRyaXhbeF1beV0uY29sb3JTZXQgfHwgdXNlZENlbGxbeF1beV0pIHtcclxuICAgICAgcmV0dXJuIChjbnQgPiB0aGlzLm1pblRyaWFuZ2xlc0Rlc3Ryb3kpO1xyXG4gICAgfVxyXG5cclxuICAgIHVzZWRDZWxsW3hdW3ldID0gdHJ1ZTtcclxuICAgIGlmICh4ICsgMSA8IHRoaXMudHJpYW5nbGVNYXRyaXhXaWR0aCkge1xyXG4gICAgICBpZiAodGhpcy5oYXNDb21iaW5hdGlvbih1c2VkQ2VsbCwgY29sb3JTZXQsIHggKyAxLCB5LCBjbnQgKyAxKSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHggLSAxID49IDApIHtcclxuICAgICAgaWYgKHRoaXMuaGFzQ29tYmluYXRpb24odXNlZENlbGwsIGNvbG9yU2V0LCB4IC0gMSwgeSwgY250ICsgMSkpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnRyaWFuZ2xlc01hdHJpeFt4XVt5XS5pc1JvdGF0ZWQpIHtcclxuICAgICAgaWYgKHkgLSAxID49IDApIHtcclxuICAgICAgICBpZiAodGhpcy5oYXNDb21iaW5hdGlvbih1c2VkQ2VsbCwgY29sb3JTZXQsIHgsIHkgLSAxLCBjbnQgKyAxKSkge1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoeSArIDEgPCB0aGlzLnRyaWFuZ2xlTWF0cml4SGVpZ2h0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzQ29tYmluYXRpb24odXNlZENlbGwsIGNvbG9yU2V0LCB4LCB5ICsgMSwgY250ICsgMSkpIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNjcmVlU2hha2VyIEhlcm9cclxuICAgKi9cclxuICBzaGFrZUl0U2hha2VJdChkZXN0cm95ZWRUcmlhbmdsZXMpIHtcclxuICAgIGxldCB4ID0gdGhpcy50cmlhbmdsZUdyb3VwLng7XHJcbiAgICBsZXQgeSA9IHRoaXMudHJpYW5nbGVHcm91cC55O1xyXG4gICAgbGV0IGFtcGxpdHVkZVkgPSB0aGlzLnJuZC5iZXR3ZWVuKDEsIGRlc3Ryb3llZFRyaWFuZ2xlcyAqIDAuOSk7XHJcbiAgICBsZXQgYW1wbGl0dWRlWCA9IHRoaXMucm5kLmJldHdlZW4oMSwgZGVzdHJveWVkVHJpYW5nbGVzICogMC45KTtcclxuICAgIGxldCB0aW1lQW5pbWF0aW9uID0gMTU7XHJcbiAgICBsZXQgbnVtYmVyc1B1bHNlID0gMTA7XHJcbiAgICBsZXQgYW1wbGl0dWRlUGFydCA9IE1hdGguc3FydChNYXRoLnBvdyhhbXBsaXR1ZGVYLCAyKSArIE1hdGgucG93KGFtcGxpdHVkZVksIDIpKSAvIG51bWJlcnNQdWxzZTtcclxuXHJcbiAgICBsZXQgc2hha2VyVHdlZW4gPSB0aGlzLmFkZC50d2Vlbih0aGlzLnRyaWFuZ2xlR3JvdXApO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtYmVyc1B1bHNlOyBpKyspIHtcclxuICAgICAgaWYgKGkgJSAyID09PSAwKSB7XHJcbiAgICAgICAgc2hha2VyVHdlZW4udG8oe1xyXG4gICAgICAgICAgeDogeCArIGFtcGxpdHVkZVgsXHJcbiAgICAgICAgICB5OiB5ICsgYW1wbGl0dWRlWVxyXG4gICAgICAgIH0sIHRpbWVBbmltYXRpb24sIFBoYXNlci5FYXNpbmcuTGluZWFyLk5vbmUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNoYWtlclR3ZWVuLnRvKHtcclxuICAgICAgICAgIHg6IHggLSBhbXBsaXR1ZGVYLFxyXG4gICAgICAgICAgeTogeSAtIGFtcGxpdHVkZVlcclxuICAgICAgICB9LCB0aW1lQW5pbWF0aW9uLCBQaGFzZXIuRWFzaW5nLkxpbmVhci5Ob25lKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgYW1wbGl0dWRlWCAtPSBhbXBsaXR1ZGVQYXJ0O1xyXG4gICAgICBhbXBsaXR1ZGVZIC09IGFtcGxpdHVkZVBhcnQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2hha2VyVHdlZW4ub25Db21wbGV0ZS5hZGQoKCkgPT4ge1xyXG4gICAgICB0aGlzLnRyaWFuZ2xlR3JvdXAueCA9IHg7XHJcbiAgICAgIHRoaXMudHJpYW5nbGVHcm91cC55ID0geTtcclxuICAgIH0sIHRoaXMpO1xyXG4gICAgc2hha2VyVHdlZW4uc3RhcnQoKTtcclxuICB9XHJcblxyXG4gIHNuYWtlc0FuaW1hdGlvblJ1bih4LCB5LCBjb2xvckdyYWRhdGlvbiwgY291bnQpIHtcclxuICAgIGNvbnN0IGZvcmNlID0gMjU7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XHJcbiAgICAgIGxldCBzbmFrZSA9IHRoaXMuc25ha2VzLmdldEZpcnN0RGVhZCgpO1xyXG5cclxuICAgICAgaWYgKHNuYWtlID09PSBudWxsKSB7XHJcbiAgICAgICAgc25ha2UgPSB0aGlzLmFkZFNuYWtlKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxldCBhbmdsZSA9IChNYXRoLlBJICogMikgLyBjb3VudCAqIGk7XHJcbiAgICAgIGxldCBpbXB1bHNlWCA9IE1hdGguY29zKGFuZ2xlKSAqIGZvcmNlO1xyXG4gICAgICBsZXQgaW1wdWxzZVkgPSBNYXRoLnNpbihhbmdsZSkgKiBmb3JjZTtcclxuXHJcbiAgICAgIHNuYWtlLnJ1bihcclxuICAgICAgICB4LFxyXG4gICAgICAgIHksXHJcbiAgICAgICAgdGhpcy5zY29yZUxhYmxlLndvcmxkLngsXHJcbiAgICAgICAgdGhpcy5zY29yZUxhYmxlLndvcmxkLnksXHJcbiAgICAgICAgaW1wdWxzZVgsXHJcbiAgICAgICAgaW1wdWxzZVksXHJcbiAgICAgICAgY29sb3JHcmFkYXRpb24uZ2V0UmFuZG9tQ29sb3IoKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYWRkU25ha2UoKSB7XHJcbiAgICBsZXQgc25ha2UgPSBuZXcgRW5naW5lLlNuYWtlKHRoaXMuZ2FtZSk7XHJcbiAgICBzbmFrZS5raWxsKCk7XHJcblxyXG4gICAgdGhpcy5zbmFrZXMuYWRkKHNuYWtlKTtcclxuXHJcbiAgICByZXR1cm4gc25ha2U7XHJcbiAgfVxyXG59XHJcblxyXG5FbmdpbmUuR2FtZSA9IEdhbWU7XHJcbiIsImNsYXNzIExvZyB7XHJcbiAgc3RhdGljIGluaXQoKSB7XHJcbiAgICB0aGlzLnN0YXJ0VGltZSA9IG5ldyBEYXRlKCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgd3JpdGUocGFydCwgbXNnKSB7XHJcbiAgICBsZXQgdGltZSA9IChuZXcgRGF0ZSgpIC0gdGhpcy5zdGFydFRpbWUpIC8gMTAwMDtcclxuICAgIGNvbnNvbGUubG9nKGBbJHt0aW1lfSBzZWNdIFske3BhcnR9XSAke21zZ31gKTtcclxuICB9XHJcbn1cclxuXHJcbkVuZ2luZS5Mb2cgPSBMb2c7XHJcbiIsIkVuZ2luZS5nYW1lID0gbmV3IFBoYXNlci5HYW1lKEVuZ2luZS5tYXhXaWR0aCwgRW5naW5lLm1heEhlaWdodCwgUGhhc2VyLkFVVE8pO1xyXG5cclxud2luZG93Lm9ucmVzaXplID0gKCkgPT4ge1xyXG4gIEVuZ2luZS5nYW1lLnNjYWxlLnNldEdhbWVTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xyXG59O1xyXG5cclxuRW5naW5lLmdhbWUuc3RhdGUuYWRkKCdCb290JywgRW5naW5lLkJvb3QpO1xyXG5FbmdpbmUuZ2FtZS5zdGF0ZS5hZGQoJ01lbnUnLCBFbmdpbmUuTWVudSk7XHJcbkVuZ2luZS5nYW1lLnN0YXRlLmFkZCgnR2FtZScsIEVuZ2luZS5HYW1lKTtcclxuRW5naW5lLmdhbWUuc3RhdGUuYWRkKCdMb2FkZXInLCBFbmdpbmUuTG9hZGVyKTtcclxuRW5naW5lLmdhbWUuc3RhdGUuYWRkKCdMdmxwaWNrJywgRW5naW5lLkx2bHBpY2spO1xyXG5FbmdpbmUuZ2FtZS5zdGF0ZS5hZGQoJ1NldHRpbmdzJywgRW5naW5lLlNldHRpbmdzKTtcclxuLy8gRW5naW5lLmdhbWUuc3RhdGUuYWRkKCdMZWFkZXJib2FyZCcsIEVuZ2luZS5MZWFkZXJib2FyZCk7XHJcblxyXG5FbmdpbmUuZ2FtZS5zdGF0ZS5zdGFydCgnQm9vdCcpO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
