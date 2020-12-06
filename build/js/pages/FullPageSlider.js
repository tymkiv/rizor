"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FullPageSlider = /*#__PURE__*/function () {
  function FullPageSlider() {
    var _this = this;

    _classCallCheck(this, FullPageSlider);

    // Инициируем поэкранный скролл, если мы на компьюторной версии
    if (_g.isDesktop) {
      this.init();
    }

    window.addEventListener('resize', function () {
      _this.onResizeHandler();
    });
  } // Метод, создающий слайдер и индикатор


  _createClass(FullPageSlider, [{
    key: "init",
    value: function init(lastActiveIndex) {
      this.slider = this.createSlider();
      this.indicator = this.createIndicator();

      if (lastActiveIndex) {
        this.slider.slideTo(lastActiveIndex, 0);
      }
    } // Метод, возвращающий слайдер

  }, {
    key: "createSlider",
    value: function createSlider() {
      var _this2 = this;

      return new Swiper('.full-page-slider', {
        speed: 800,
        direction: 'vertical',
        allowTouchMove: false,
        pagination: {
          el: '.full-page-slider__pagination',
          type: 'bullets',
          clickable: true
        },
        on: {
          transitionStart: function transitionStart(e) {
            if (_this2.slider.previousIndex == 0) {
              AT.updateOriginalCoords(-_g.clientH / 2, 0.5);
            }

            if (_this2.slider.activeIndex == 0) {
              AT.updateOriginalCoords(0, 0.5);
            }
          }
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
          // console.dir(e);
          var section = document.querySelectorAll('.full-page-slider__section')[_this3.slider.activeIndex];

          var wrapper = document.querySelectorAll('.full-page-slider__section .section__wrapper')[_this3.slider.activeIndex];

          var height = section.offsetHeight - +$(section).css('paddingTop').slice(0, -2);
          var factHeight = wrapper.offsetHeight; // console.dir(wrapper);

          var offset = factHeight - height;
          console.log('factHeight', factHeight);
          console.log('height', height);
          console.log('offset', offset); // Если слайд больше высоты экрана

          if (offset > 0) {
            // Если слайд в самом начале, и мы скролим вверх
            if (section.scrollTop == 0 && e.direction == 'up') {
              _this3.onSlideUp();
            } // Если слайд в самом конце, и мы скролим вниз


            if (section.scrollTop >= offset && e.direction == 'down') {
              _this3.onSlideDown();
            }
          } // Если слайд не больше высоты экрана (стандартный)
          else {
              if (e.direction == 'up') {
                _this3.onSlideUp();
              }

              if (e.direction == 'down') {
                _this3.onSlideDown();
              }
            }
        }
      });
    }
  }, {
    key: "onSlideDown",
    value: function onSlideDown() {
      this.slider.slideNext();
    }
  }, {
    key: "onSlideUp",
    value: function onSlideUp() {
      this.slider.slidePrev();
    } // Обработчик события ресайза

  }, {
    key: "onResizeHandler",
    value: function onResizeHandler() {
      if (this.slider) {
        this.lastActiveIndex = this.slider.activeIndex;
        this.slider.destroy();
      }

      this.indicator && this.indicator.destroy();

      if (_g.isDesktop) {
        this.init(this.lastActiveIndex);
      }
    }
  }]);

  return FullPageSlider;
}();