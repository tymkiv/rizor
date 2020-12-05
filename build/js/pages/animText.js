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
    console.dir(this);
    this.mouseX = 0;
    this.mouseY = 0;
    $(this.text.children).each(function (i, p) {
      _this.particles.push(new Part(p, i));
    });
    window.addEventListener('mousemove', this.mouse.bind(this));
    gsap.ticker.add(this.update.bind(this));
  }

  _createClass(AnimText, [{
    key: "mouse",
    value: function mouse(e) {
      this.mouseX = e.pageX;
      this.mouseY = e.pageY;
    }
  }, {
    key: "update",
    value: function update() {
      var _this2 = this;

      this.particles.forEach(function (p) {
        p.update(_this2.mouseX, _this2.mouseY);
      });
    }
  }]);

  return AnimText;
}();

var Part = /*#__PURE__*/function () {
  function Part(particle, i) {
    _classCallCheck(this, Part);

    this.particle = particle;
    this.i = i;
    this.width = particle.offsetWidth;
    this.height = particle.offsetHeight;
    this.top = particle.getBoundingClientRect().top;
    this.left = particle.getBoundingClientRect().left;
    this.originalCenterX = this.left + this.width / 2;
    this.originalCenterY = this.top + this.height / 2;
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
    key: "update",
    value: function update(mouseX, mouseY) {
      this.top = this.particle.getBoundingClientRect().top;
      this.left = this.particle.getBoundingClientRect().left;
      this.centerX = this.left + this.width / 2;
      this.centerY = this.top + this.height / 2;
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
      this.speedX *= this.friction.toFixed(3);
      this.speedY *= this.friction.toFixed(3);
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
      this.height = this.particle.offsetHeight;
      this.top = this.particle.getBoundingClientRect().top;
      this.left = this.particle.getBoundingClientRect().left;
      this.originalCenterX = this.left + this.width / 2;
      this.originalCenterY = this.top + this.height / 2;
    }
  }]);

  return Part;
}();

$(function () {});