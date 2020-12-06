class FullPageSlider {
  constructor(){
    // Инициируем поэкранный скролл, если мы на компьюторной версии
    if(_g.isDesktop) {
      this.init();
    }

    window.addEventListener('resize', () => {
      this.onResizeHandler();
    })
  }

  // Метод, создающий слайдер и индикатор
  init(lastActiveIndex){
    this.slider = this.createSlider();
    this.indicator = this.createIndicator();

    if(lastActiveIndex) {
      this.slider.slideTo(lastActiveIndex, 0);
    }
  }

  // Метод, возвращающий слайдер
  createSlider(){
    return new Swiper('.full-page-slider', {
      speed: 800,
      direction: 'vertical',
      allowTouchMove: false,
      pagination: {
        el: '.full-page-slider__pagination',
        type: 'bullets',
        clickable: true,
      },
      on: {
        transitionStart:  (e)=> {
          if(this.slider.previousIndex == 0) {
            AT.updateOriginalCoords(-_g.clientH/2, 0.5);
          }
          if(this.slider.activeIndex == 0) {
            AT.updateOriginalCoords(0, 0.5);
          }
        },
      },
    })
  }

  // Метод, возвращающий индикатор скролла
  // Индикатор рещает проблему иннерциального скролла
  createIndicator(){
    return new WheelIndicator({
      elem: window,
      preventMouse: false,
      callback: e => {
        const section = document.querySelectorAll('.full-page-slider__section')[this.slider.activeIndex];
        const wrapper = document.querySelectorAll('.full-page-slider__section .section__wrapper')[this.slider.activeIndex];
        
        const height = section.offsetHeight - +$(section).css('paddingTop').slice(0, -2) ;
        const factHeight = wrapper.scrollHeight;

        const offset = factHeight - height;

        // Если слайд больше высоты экрана
        if(offset > 0) {
          // Если слайд в самом начале, и мы скролим вверх
          if( section.scrollTop == 0 && e.direction == 'up' ) {
            this.onSlideUp();
          } 
          // Если слайд в самом конце, и мы скролим вниз
          if( section.scrollTop >= offset && e.direction == 'down' ) {
            this.onSlideDown();          
          }
        } 
        // Если слайд не больше высоты экрана (стандартный)
        else {
          if(e.direction == 'up') {
            this.onSlideUp();
          }
          if(e.direction == 'down') {
            this.onSlideDown();
          }
        }        
      }
    })
  }

  onSlideDown(){
    this.slider.slideNext();
  }

  onSlideUp(){
    this.slider.slidePrev();
  }

  // Обработчик события ресайза
  onResizeHandler(){
    if(this.slider) {
      this.lastActiveIndex = this.slider.activeIndex;
      this.slider.destroy();
    }

    this.indicator && this.indicator.destroy();
    if(_g.isDesktop) {
      this.init(this.lastActiveIndex);
    }
  }
}