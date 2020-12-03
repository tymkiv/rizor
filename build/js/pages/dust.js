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
    this.particleSize = 2; // this.rows = 274;
    // this.cols = 1200;

    this.rows = 137;
    this.cols = 600; // this.rows = 68;
    // this.cols = 300;
    // this.rows = 34;
    // this.cols = 150;
    // this.rows = 3;
    // this.cols = 3;

    this.particles = [];
    this.container = new PIXI.ParticleContainer(100000);
    this.app.stage.addChild(this.container);
    this.addObjects();
  }

  _createClass(ParticleText, [{
    key: "hasFill",
    value: function hasFill(x, y, ctx) {
      for (var i = 0; i < this.particleSize; i++) {
        for (var j = 0; j < this.particleSize; j++) {
          // if(ctx.getImageData(x+i, y+1, 1, 1).data[0] > 0) {
          //   console.log(ctx.getImageData(x+i, y+1, 1, 1).data);
          // }
          // if(ctx.getImageData(x+i, y+1, 1, 1).data[1] > 0) {
          //   console.log(ctx.getImageData(x+i, y+1, 1, 1).data);
          // }
          // if(ctx.getImageData(x+i, y+1, 1, 1).data[2] > 0) {
          //   console.log(ctx.getImageData(x+i, y+1, 1, 1).data);
          // }
          if ( // ctx.getImageData(x+i, y+1, 1, 1).data[0] != 0 ||
          // ctx.getImageData(x+i, y+1, 1, 1).data[1] != 0 ||
          ctx.getImageData(x + i, y + j, 1, 1).data[3] != 0 // ctx.getImageData(x+i, y+1, 1, 1).data[3] != 0
          ) {
              // console.log(ctx.getImageData(x+i, y+1, 1, 1).data);
              return true;
            } // if( 
          //   ctx.getImageData(x+i, y+1, 1, 1).data[0] != 0 ||
          //   ctx.getImageData(x+i, y+1, 1, 1).data[1] != 0 ||
          //   ctx.getImageData(x+i, y+1, 1, 1).data[2] != 0 ||
          //   ctx.getImageData(x+i, y+1, 1, 1).data[3] != 0 
          // ) {
          //   return true;
          // }

        }
      }

      return false;
    }
  }, {
    key: "addObjects",
    value: function addObjects() {
      var _this = this;

      PIXI.loader.add('dust', './build/images/content/2.png').load(function (loader, resources) {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d'); // document.body.appendChild(canvas);

        canvas.width = _this.cols * _this.particleSize;
        canvas.height = _this.rows * _this.particleSize;
        ctx.drawImage(resources.dust.data, 0, 0);
        _this.dust = new PIXI.Sprite(resources.dust.texture);
        _this.dust.x = _this.app.renderer.width / 2;
        _this.dust.y = _this.app.renderer.height / 2;
        _this.dust.anchor.x = 0.5;
        _this.dust.anchor.y = 0.5; // this.app.stage.addChild(this.dust);

        for (var i = 0; i < _this.cols; i++) {
          for (var j = 0; j < _this.rows; j++) {
            if (_this.hasFill(i * _this.particleSize, j * _this.particleSize, ctx)) {
              var p = new Particle(i * _this.particleSize, j * _this.particleSize, resources.dust.texture, _this.particleSize);

              _this.particles.push(p); // this.app.stage.addChild(p.sprite);


              _this.container.addChild(p.sprite);
            }

            ;
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