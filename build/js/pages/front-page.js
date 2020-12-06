"use strict";

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AT;
$(function () {
  var fullPageSlider = new FullPageSlider();
  document.querySelectorAll('.video-wrapper').forEach(function (video_wrapper) {
    new VideoChanger(video_wrapper);
  });
  setTimeout(function () {
    movePlayBtnForSec1();
    new SpellerText(document.querySelector('.section--first .section__title'));
    AT = new AnimText(document.querySelector('.section--first .section__title'));
  }, 100);
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

var VideoChanger = function VideoChanger(video_wrapper) {
  var _this = this;

  _classCallCheck(this, VideoChanger);

  this.video_wrapper = video_wrapper;
  this.play_btn = video_wrapper.querySelector('.video-wrapper__play-btn');
  this.poster = video_wrapper.querySelector('.video-wrapper__poster');
  this.video = video_wrapper.querySelector('.video-wrapper__video');
  this.video_wrapper.addEventListener('click', function () {
    _this.video_wrapper.classList.add('active');

    _this.video.play();

    _this.video.requestFullscreen();
  });
  this.video.addEventListener('pause', function () {
    _this.video_wrapper.classList.remove('active');

    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  });
  this.video.addEventListener('fullscreenchange', function () {
    if (!document.fullscreenElement) {
      _this.video.pause();
    }
  });
};

var FullPageSlider = /*#__PURE__*/function () {
  function FullPageSlider() {
    var _this2 = this;

    _classCallCheck(this, FullPageSlider);

    // Инициируем поэкранный скролл, если мы на компьюторной версии
    if (_g.isDesktop) {
      this.init();
    }

    window.addEventListener('resize', function () {
      _this2.onResizeHandler();
    });
  } // Метод, создающий слайдер и индикатор


  _createClass(FullPageSlider, [{
    key: "init",
    value: function init() {
      this.slider = this.createSlider();
      this.indicator = this.createIndicator();
    } // Метод, возвращающий слайдер

  }, {
    key: "createSlider",
    value: function createSlider() {
      return new Swiper('.full-page-slider', {
        speed: 800,
        direction: 'vertical',
        allowTouchMove: false,
        pagination: {
          el: '.full-page-slider__pagination',
          type: 'bullets',
          clickable: true
        }
      });
    } // Метод, возвращающий индикатор скролла
    // Индикатор рещает проблему иннерциального скролла

  }, {
    key: "createIndicator",
    value: function createIndicator() {
      var _this3 = this;

      return new WheelIndicator({
        elem: window,
        preventMouse: false,
        callback: function callback(e) {
          var section = document.querySelectorAll('.full-page-slider__section')[_this3.slider.activeIndex];

          var wrapper = document.querySelectorAll('.full-page-slider__section .section__wrapper')[_this3.slider.activeIndex];

          var height = section.offsetHeight;
          var factHeight = wrapper.scrollHeight;
          var offset = factHeight - height; // Если слайд больше высоты экрана

          if (offset > 0) {
            // Если слайд в самом начале, и мы скролим вверх
            if (section.scrollTop == 0 && e.direction == 'up') {
              _this3.slider.slidePrev();
            } // Если слайд в самом конце, и мы скролим вниз


            if (section.scrollTop >= offset && e.direction == 'down') {
              if (_this3.slider.activeIndex == 1) {
                console.log('Hello');
              }

              _this3.slider.slideNext();
            }
          } // Если слайд не больше высоты экрана (стандартный)
          else {
              if (e.direction == 'up') {
                console.log(_this3.slider.activeIndex);

                if (_this3.slider.activeIndex == 1) {
                  console.log('up'); // setTimeout(()=>{

                  AT.updateOriginalCoords(600, 0.5); // }, 800)
                }

                _this3.slider.slidePrev();
              }

              if (e.direction == 'down') {
                if (_this3.slider.activeIndex == 0) {
                  console.log('down');
                  AT.updateOriginalCoords(-600, 0.5);
                }

                _this3.slider.slideNext();
              }
            }
        }
      });
    } // Обработчик события ресайза

  }, {
    key: "onResizeHandler",
    value: function onResizeHandler() {
      this.slider && this.slider.destroy();
      this.indicator && this.indicator.destroy();

      if (_g.isDesktop) {
        this.init();
      }
    }
  }]);

  return FullPageSlider;
}();