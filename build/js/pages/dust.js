"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ParticleText = /*#__PURE__*/function () {
  function ParticleText() {
    _classCallCheck(this, ParticleText);

    this.app = new PIXI.Application(document.getElementById('wrapper-for-dust').offsetWidth, document.getElementById('wrapper-for-dust').offsetHeight, {
      autoResize: true,
      autoDensity: true,
      transparent: true
    });
    document.getElementById('wrapper-for-dust').appendChild(this.app.view);
    this.particleSize = 10;
    this.particles = [];
    this.addObjects();
  }

  _createClass(ParticleText, [{
    key: "addObjects",
    value: function addObjects() {
      var _this = this;

      PIXI.loader.add('dust', './build/images/content/1.png').load(function (loader, resources) {
        _this.dust = new PIXI.Sprite(resources.dust.texture);
        _this.dust.x = _this.app.renderer.width / 2;
        _this.dust.y = _this.app.renderer.height / 2;
        _this.dust.anchor.x = 0.5;
        _this.dust.anchor.y = 0.5; // this.app.stage.addChild(this.dust);

        for (var i = 0; i < 50; i++) {
          for (var j = 0; j < 50; j++) {
            var p = new Particle(i * _this.particleSize, j * _this.particleSize, resources.dust.texture, _this.particleSize);

            _this.particles.push(p);

            _this.app.stage.addChild(p.sprite);
          }
        }

        console.log(_this.particles);

        _this.animate();
      });
    }
  }, {
    key: "animate",
    value: function animate() {
      var _this2 = this;

      this.app.ticker.add(function () {
        _this2.mouse = _this2.app.renderer.plugins.interaction.mouse.global;

        _this2.particles.forEach(function (p) {
          p.update(_this2.mouse);
        });
      });
    }
  }]);

  return ParticleText;
}();

$(function () {
  var PT = new ParticleText();
});