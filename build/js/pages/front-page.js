"use strict";

$(function () {
  var fullPageSlider = {}; // Метод, возвращающий слайдер

  fullPageSlider.createSlider = function () {
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
  }; // Метод, возвращающий индикатор скролла


  fullPageSlider.createIndicator = function () {
    return new WheelIndicator({
      elem: window,
      callback: function callback(e) {
        if (e.direction == 'up') {
          fullPageSlider.slider.slidePrev();
        }

        if (e.direction == 'down') {
          fullPageSlider.slider.slideNext();
        }
      }
    });
  }; // Метод, создающий слайдер и индикатор


  fullPageSlider.init = function () {
    fullPageSlider.slider = fullPageSlider.createSlider();
    fullPageSlider.indicator = fullPageSlider.createIndicator();
  }; // Обработчик события ресайза


  fullPageSlider.onResizeHandler = function () {
    fullPageSlider.slider && fullPageSlider.slider.destroy();
    fullPageSlider.indicator && fullPageSlider.indicator.destroy();

    if (_g.isDesktop) {
      fullPageSlider.init();
    }
  }; // Инициируем поэкранный скролл, если мы на компьюторной версии


  if (_g.isDesktop) {
    fullPageSlider.init();
  }

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  ctx.font = "48px RubikMonoOne";
  ctx.fillText("Hello world", 10, 50);
  window.addEventListener('resize', function () {
    fullPageSlider.onResizeHandler();
  });
});