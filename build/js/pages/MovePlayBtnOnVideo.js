"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MovePlayBtnOnVideo = /*#__PURE__*/function () {
  function MovePlayBtnOnVideo(wrapper, playBtn, icoForMove) {
    _classCallCheck(this, MovePlayBtnOnVideo);

    this.wrapper = wrapper;
    this.playBtn = playBtn;
    this.icoForMove = icoForMove;
    window.addEventListener('resize', this.onResizeHandler.bind(this));
    this.height = this.playBtn.offsetHeight;
    this.width = this.playBtn.offsetWidth;
    this.playBtnTop = $(this.playBtn).position().top + +$(this.playBtn).css('marginTop').slice(0, -2);
    this.playBtnLeft = $(this.playBtn).position().left;
    this.originalCenterY = this.playBtnTop + this.height / 2;
    this.originalCenterX = this.playBtnLeft + this.width / 2;
    this.mouseY = this.originalCenterY;
    this.mouseX = this.originalCenterX;

    if (_g.isDesktop) {
      this.wrapper.addEventListener('mousemove', this.mouse.bind(this));
      this.wrapper.addEventListener('mouseover', this.mouseoverHandler.bind(this));
      this.wrapper.addEventListener('mouseleave', this.mouseoutHandler.bind(this));
      gsap.ticker.add(this.update.bind(this));
      this.isActive = true;
    }
  }

  _createClass(MovePlayBtnOnVideo, [{
    key: "mouseoverHandler",
    value: function mouseoverHandler(e) {
      this.mouseIn = true;
      this.playBtn.classList.add('hover');
    }
  }, {
    key: "mouseoutHandler",
    value: function mouseoutHandler(e) {
      this.mouseIn = false;
      this.playBtn.classList.remove('hover');
      this.mouseY = this.originalCenterY;
      this.mouseX = this.originalCenterX;
    }
  }, {
    key: "mouse",
    value: function mouse(e) {
      if (!$(e.target).closest(this.playBtn)[0]) {
        this.mouseIn = true;
        this.mouseY = e.offsetY;
        this.mouseX = e.offsetX;
      }
    }
  }, {
    key: "onResizeHandler",
    value: function onResizeHandler() {
      this.height = this.playBtn.offsetHeight;
      this.width = this.playBtn.offsetWidth;
      this.playBtnTop = $(this.playBtn).position().top + +$(this.playBtn).css('marginTop').slice(0, -2);
      this.playBtnLeft = $(this.playBtn).position().left;
      this.originalCenterY = this.playBtnTop + this.height / 2;
      this.originalCenterX = this.playBtnLeft + this.width / 2;
      this.mouseY = this.originalCenterY;
      this.mouseX = this.originalCenterX;

      if (_g.isDesktop && !this.isActive) {
        this.wrapper.addEventListener('mousemove', this.mouse.bind(this));
        this.wrapper.addEventListener('mouseover', this.mouseoverHandler.bind(this));
        this.wrapper.addEventListener('mouseleave', this.mouseoutHandler.bind(this));
        gsap.ticker.add(this.update.bind(this));
        this.isActive = true;
      }
    }
  }, {
    key: "update",
    value: function update() {
      var distY = this.mouseY - this.originalCenterY;
      var distX = this.mouseX - this.originalCenterX;

      if (this.mouseIn && _g.isDesktop) {
        gsap.to(this.icoForMove, 0.5, {
          x: distX,
          y: distY
        });
      } else {
        gsap.to(this.icoForMove, 1, {
          x: 0,
          y: 0
        });
      }
    }
  }]);

  return MovePlayBtnOnVideo;
}();