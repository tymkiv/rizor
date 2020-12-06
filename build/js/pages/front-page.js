"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AT, fullPageSlider;
$(function () {
  fullPageSlider = new FullPageSlider();
  document.querySelectorAll('.video-wrapper').forEach(function (video_wrapper) {
    new VideoChanger(video_wrapper);
  });
  setTimeout(function () {
    movePlayBtnForSec1();
    new SpellerText(document.querySelector('.section--first .section__title'));
    AT = new AnimText(document.querySelector('.section--first .section__title'));
    new MovePlayBtnOnVideo(document.querySelector('.section--first .section__video-wrapper'), document.querySelector('.section--first .section__video-wrapper .video-wrapper__play-btn'), document.querySelector('.section--first .section__video-wrapper .play-btn__icon'));
    new MovePlayBtnOnVideo(document.querySelector('.section--advantages .section__video-wrapper'), document.querySelector('.section--advantages .section__video-wrapper .video-wrapper__play-btn'), document.querySelector('.section--advantages .section__video-wrapper .play-btn__icon'));
  }, 100);
  new ColorSlider('.section--advantages .gallery-thumbs', '.section--advantages .gallery-top');
  window.addEventListener('resize', function () {
    movePlayBtnForSec1();
  });
}); // Двигаю кнопку play туда куда нужно

function movePlayBtnForSec1() {
  var height = document.querySelector('.section--first .section__text-wrapper').offsetHeight;
  var play_btn_node = document.querySelector('.section--first .video-wrapper__play-btn');

  if (_g.isDesktop) {
    play_btn_node.style.marginTop = -height / 2 + 'px';
  } else {
    play_btn_node.style.marginTop = '';
  }
}

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