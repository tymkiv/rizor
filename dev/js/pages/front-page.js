$(function () { 
  const fullPageSlider = new FullPageSlider();

  document.querySelectorAll('.video-wrapper').forEach((video_wrapper)=>{
    new VideoChanger(video_wrapper);
  });
  
  setTimeout(() => {
    movePlayBtnForSec1();
    new SpellerText(document.querySelector('.section--first .section__title'));
    new AnimText(document.querySelector('.section--first .section__title'));
  }, 100);
  


  window.addEventListener('resize', () => {
    movePlayBtnForSec1();
  })

});

// Двигаю кнопку play туда куда нужно
function movePlayBtnForSec1() {
    const height = document.querySelector('.section--first .section__text-wrapper').offsetHeight;
    const play_btn_node = document.querySelector('.section--first .video-wrapper__play-btn');
  if(_g.isDesktop) {
    play_btn_node.style.marginTop = -height/2 + 'px'; 
  } else {
    play_btn_node.style.marginTop = ''; 
  }
}

class VideoChanger {
  constructor(video_wrapper){
    this.video_wrapper = video_wrapper;

    this.play_btn = video_wrapper.querySelector('.video-wrapper__play-btn');
    this.poster = video_wrapper.querySelector('.video-wrapper__poster');
    this.video = video_wrapper.querySelector('.video-wrapper__video');

    this.video_wrapper.addEventListener('click', ()=>{
      this.video_wrapper.classList.add('active');
      this.video.play();
      this.video.requestFullscreen()
    });

    this.video.addEventListener('pause', ()=>{
      this.video_wrapper.classList.remove('active');
      if(document.fullscreenElement) {
        document.exitFullscreen();
      }
    })

    this.video.addEventListener('fullscreenchange', ()=>{
      if(!document.fullscreenElement) {
        this.video.pause();
      }
    });
  }
}

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
  init(){
    this.slider = this.createSlider();
    this.indicator = this.createIndicator();
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
        
        const height = section.offsetHeight;
        const factHeight = wrapper.scrollHeight;

        const offset = factHeight - height;

        // Если слайд больше высоты экрана
        if(offset > 0) {
          // Если слайд в самом начале, и мы скролим вверх
          if( section.scrollTop == 0 && e.direction == 'up' ) {
            this.slider.slidePrev();
          } 
          // Если слайд в самом конце, и мы скролим вниз
          if( section.scrollTop >= offset && e.direction == 'down' ) {
            this.slider.slideNext();
          }
        } 
        // Если слайд не больше высоты экрана (стандартный)
        else {
          if(e.direction == 'up') {
            this.slider.slidePrev();
          }
          if(e.direction == 'down') {
            this.slider.slideNext();
          }
        }        
      }
    })
  }

  // Обработчик события ресайза
  onResizeHandler(){
    this.slider && this.slider.destroy();
    this.indicator && this.indicator.destroy();
    if(_g.isDesktop) {
      this.init();
    }
  }
}