"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Particle = /*#__PURE__*/function () {
  function Particle(x, y, texture, size) {
    _classCallCheck(this, Particle);

    this.x = x;
    this.y = y;
    this.texture = texture;
    this.size = size;
    this.sprite = new PIXI.Sprite(new PIXI.Texture(this.texture));
    this.sprite.texture.frame = new PIXI.Rectangle(this.x, this.y, this.size, this.size);
    this.sprite.x = this.x;
    this.sprite.y = this.y;
    this.speedX = 0;
    this.speedY = 0;
    this.radius = 50;
    this.friction = 0.9;
    this.gravity = 0.01;
    this.maxGravity = 0.01 + Math.random() * 0.03;
    this.dirX = Math.random() - 0.5;
    this.dirY = Math.random() - 0.5;
  }

  _createClass(Particle, [{
    key: "update",
    value: function update(mouse) {
      var distanceX = mouse.x - this.sprite.x;
      var distanceY = mouse.y - this.sprite.y;
      var distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
      var normalX = distanceX / distance;
      var normalY = distanceY / distance; // mouse interaction

      if (distance < this.radius) {
        this.gravity *= this.friction;
        this.speedX -= normalX;
        this.speedY -= normalY;
      } else {
        this.gravity += 0.1 * (this.maxGravity - this.gravity);
      } //back home


      var oDistX = this.x - this.sprite.x;
      var oDistY = this.y - this.sprite.y;
      this.speedX += oDistX * this.gravity;
      this.speedY += oDistY * this.gravity;
      this.speedX *= this.friction;
      this.speedY *= this.friction;
      this.sprite.x += this.speedX;
      this.sprite.y += this.speedY;
    }
  }]);

  return Particle;
}();