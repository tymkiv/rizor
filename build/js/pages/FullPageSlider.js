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
      var _this2 = this;

      return new WheelIndicator({
        elem: window,
        preventMouse: false,
        callback: function callback(e) {
          var section = document.querySelectorAll('.full-page-slider__section')[_this2.slider.activeIndex];

          var wrapper = document.querySelectorAll('.full-page-slider__section .section__wrapper')[_this2.slider.activeIndex];

          var height = section.offsetHeight;
          var factHeight = wrapper.scrollHeight;
          var offset = factHeight - height; // Если слайд больше высоты экрана

          if (offset > 0) {
            // Если слайд в самом начале, и мы скролим вверх
            if (section.scrollTop == 0 && e.direction == 'up') {
              _this2.onSlideUp();
            } // Если слайд в самом конце, и мы скролим вниз


            if (section.scrollTop >= offset && e.direction == 'down') {
              _this2.onSlideDown();
            }
          } // Если слайд не больше высоты экрана (стандартный)
          else {
              if (e.direction == 'up') {
                _this2.onSlideUp();
              }

              if (e.direction == 'down') {
                _this2.onSlideDown();
              }
            }
        }
      });
    }
  }, {
    key: "onSlideDown",
    value: function onSlideDown() {
      if (this.slider.activeIndex == 0) {
        AT.updateOriginalCoords(-_g.clientH / 2, 0.5);
      }

      this.slider.slideNext();
    }
  }, {
    key: "onSlideUp",
    value: function onSlideUp() {
      if (this.slider.activeIndex == 1) {
        AT.updateOriginalCoords(_g.clientH / 2, 0.5);
      }

      this.slider.slidePrev();
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