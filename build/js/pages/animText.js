"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AnimText = /*#__PURE__*/function () {
  function AnimText(text) {
    var _this = this;

    _classCallCheck(this, AnimText);

    this.text = text;
    this.particles = [];
    this.mouseX = 0;
    this.mouseY = 0;
    $(this.text.children).each(function (i, p) {
      _this.particles.push(new Part(p, i, text));
    });
    window.addEventListener('mousemove', this.mouse.bind(this));

    if (_g.isDesktop) {
      gsap.ticker.add(this.update.bind(this));
      this.isActive = true;
    }

    window.addEventListener('resize', this.onResizeHandler.bind(this));
  }

  _createClass(AnimText, [{
    key: "mouse",
    value: function mouse(e) {
      // console.dir(e);
      this.mouseX = e.pageX;
      this.mouseY = e.pageY;
    }
  }, {
    key: "updateOriginalCoords",
    value: function updateOriginalCoords(top) {
      var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      this.particles.forEach(function (p) {
        p.updateOriginalCoords(top, speed);
      });
    }
  }, {
    key: "update",
    value: function update() {
      var _this2 = this;

      this.particles.forEach(function (p) {
        p.update(_this2.mouseX, _this2.mouseY);
      });
    }
  }, {
    key: "onResizeHandler",
    value: function onResizeHandler() {
      if (_g.isDesktop) {
        if (!this.isActive) {
          this.isActive = true;
          gsap.ticker.add(this.update.bind(this));
        }
      } // else {
      //   if(this.isActive) {
      //     gsap.ticker.remove(this.update.bind(this));
      //     this.isActive = false;
      //   }
      // }

    }
  }]);

  return AnimText;
}();

var Part = /*#__PURE__*/function () {
  function Part(particle, i, text) {
    _classCallCheck(this, Part);

    this.particle = particle;
    this.i = i;
    this.text = text;
    this.width = particle.offsetWidth;
    this.height = particle.offsetHeight;
    this.textTop = this.text.getBoundingClientRect().top;
    this.textLeft = this.text.getBoundingClientRect().left; // this.particleTop = this.particle.offsetTop;
    // this.particleLeft = this.particle.offsetLeft;

    this.particleTop = $(this.particle).position().top;
    this.particleLeft = $(this.particle).position().left; // this.top = particle.getBoundingClientRect().top;
    // this.left = particle.getBoundingClientRect().left;
    // this.originalCenterX = this.left + this.width/2;
    // this.originalCenterY = this.top + this.height/2;

    this.originalCenterX = this.textLeft + this.particleLeft + this.width / 2;
    this.originalCenterY = this.textTop + this.particleTop + this.height / 2;

    if (this.i == 7) {
      console.log('this.textTop', this.textTop);
      console.log('this.particleTop', this.particleTop);
    }

    this.offX = 0;
    this.offY = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.radius = 100;
    this.friction = 0.9;
    this.gravity = 0.01;
    this.maxGravity = 0.01 + Math.random() * 0.05;
    window.addEventListener('resize', this.onResizeHandler.bind(this));
  }

  _createClass(Part, [{
    key: "updateOriginalCoords",
    value: function updateOriginalCoords(top, speed) {
      var _this3 = this;

      if (!this.isInAnim) {
        this.isInAnim = true;
        gsap.to(this, speed, {
          originalCenterY: "+=".concat(top),
          onComplete: function onComplete() {
            _this3.isInAnim = false;
            _this3.onCompleteAnim && _this3.onCompleteAnim();
          }
        });
      } else {
        this.onCompleteAnim = function () {
          _this3.updateOriginalCoords(top, speed);

          _this3.onCompleteAnim = false;
        };
      }
    }
  }, {
    key: "update",
    value: function update(mouseX, mouseY) {
      // this.textTop = this.text.getBoundingClientRect().top;
      // this.textLeft = this.text.getBoundingClientRect().left;
      this.particleTop = $(this.particle).position().top;
      this.particleLeft = $(this.particle).position().left;
      this.centerX = this.textLeft + this.particleLeft + this.width / 2;
      this.centerY = this.textTop + this.particleTop + this.height / 2; // if(this.i == 7) {
      //   console.log('this.centerX', this.centerX);
      //   console.log('this.centerY', this.centerY);
      // }
      // this.top = this.particle.getBoundingClientRect().top;
      // this.left = this.particle.getBoundingClientRect().left;
      // this.centerX = this.left + this.width/2;
      // this.centerY = this.top + this.height/2;

      this.distanceX = this.centerX - mouseX;
      this.distanceY = this.centerY - mouseY;
      this.distance = Math.sqrt(Math.pow(this.distanceX, 2) + Math.pow(this.distanceY, 2));
      this.normalX = this.distanceX / this.distance;
      this.normalY = this.distanceY / this.distance;

      if (this.distance < this.radius) {
        this.speedX += this.normalX;
        this.speedY += this.normalY;
      } else {
        this.gravity += 0.1 * (this.maxGravity - this.gravity);
      }

      this.oDistX = this.originalCenterX - this.centerX;
      this.oDistY = this.originalCenterY - this.centerY;
      this.speedX += this.oDistX * this.gravity;
      this.speedY += this.oDistY * this.gravity;
      this.speedX *= this.friction;
      this.speedY *= this.friction;
      this.offX += this.speedX;
      this.offY += this.speedY;
      this.rotate = 0;
      this.rotate = this.speedY * 5;
      this.particle.style.transform = "translate3d(".concat(this.offX, "px, ").concat(this.offY, "px, 0) rotate(").concat(this.rotate, "deg)");
    }
  }, {
    key: "onResizeHandler",
    value: function onResizeHandler() {
      this.width = this.particle.offsetWidth;
      this.height = this.particle.offsetHeight; // this.top = this.particle.getBoundingClientRect().top;
      // this.left = this.particle.getBoundingClientRect().left;
      // this.originalCenterX = this.left + this.width/2;
      // this.originalCenterY = this.top + this.height/2;

      this.textTop = this.text.getBoundingClientRect().top;
      this.textLeft = this.text.getBoundingClientRect().left;
      this.particleTop = this.particle.offsetTop;
      this.particleLeft = this.particle.offsetLeft;
      this.originalCenterX = this.textLeft + this.particleLeft + this.width / 2;
      this.originalCenterY = this.textTop + this.particleTop + this.height / 2;
    }
  }]);

  return Part;
}();

$(function () {});