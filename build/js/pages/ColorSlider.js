"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ColorSlider = /*#__PURE__*/function () {
  function ColorSlider(thumb_selector, top_selector) {
    _classCallCheck(this, ColorSlider);

    this.thumb_selector = thumb_selector;
    this.top_selector = top_selector;
    this.init();
    window.addEventListener('resize', this.onResizeHandler.bind(this));
  }

  _createClass(ColorSlider, [{
    key: "init",
    value: function init(lastActiveIndex) {
      this.galleryThumbs = new Swiper(this.thumb_selector, {
        spaceBetween: 25,
        slidesPerView: 5,
        freeMode: true,
        // centeredSlides: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true
      });
      this.galleryTop = new Swiper(this.top_selector, {
        spaceBetween: 10,
        thumbs: {
          swiper: this.galleryThumbs
        }
      });

      if (lastActiveIndex) {
        this.galleryTop.slideTo(lastActiveIndex, 0);
      }
    }
  }, {
    key: "onResizeHandler",
    value: function onResizeHandler() {
      if (this.galleryThumbs && this.galleryTop) {
        this.lastActiveIndex = this.galleryTop.activeIndex;
        this.galleryTop.destroy();
        this.galleryThumbs.destroy();
      }

      this.init(this.lastActiveIndex);
    }
  }]);

  return ColorSlider;
}();