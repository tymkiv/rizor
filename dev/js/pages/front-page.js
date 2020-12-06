let AT, fullPageSlider;
$(function () { 
  fullPageSlider = new FullPageSlider();
  
  document.querySelectorAll('.video-wrapper').forEach((video_wrapper)=>{
    new VideoChanger(video_wrapper);
  });
  
  setTimeout(() => {
    movePlayBtnForSec1();
    new SpellerText(document.querySelector('.section--first .section__title'));
    AT = new AnimText(document.querySelector('.section--first .section__title'));

    new MovePlayBtnOnVideo(
      document.querySelector('.section--first .section__video-wrapper'), 
      document.querySelector('.section--first .section__video-wrapper .video-wrapper__play-btn'),
      document.querySelector('.section--first .section__video-wrapper .play-btn__icon'),
    );

    new MovePlayBtnOnVideo(
      document.querySelector('.section--advantages .section__video-wrapper'), 
      document.querySelector('.section--advantages .section__video-wrapper .video-wrapper__play-btn'),
      document.querySelector('.section--advantages .section__video-wrapper .play-btn__icon'),
    );

  }, 100);

  new ColorSlider('.section--advantages .gallery-thumbs', '.section--advantages .gallery-top');
  


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

class ColorSlider{
  constructor(thumb_selector, top_selector){
    this.thumb_selector = thumb_selector;
    this.top_selector = top_selector;

    this.init();

    window.addEventListener('resize', this.onResizeHandler.bind(this));
  }

  init(lastActiveIndex){
    this.galleryThumbs = new Swiper(this.thumb_selector, {
      spaceBetween: 25,
      slidesPerView: 5,
      freeMode: true,
      // centeredSlides: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
    });
    this.galleryTop = new Swiper(this.top_selector, {
      spaceBetween: 10,
      
      thumbs: {
        swiper: this.galleryThumbs
      }
    });
    if(lastActiveIndex) {
      this.galleryTop.slideTo(lastActiveIndex, 0);
    }
    
  }

  onResizeHandler(){
    if(this.galleryThumbs && this.galleryTop) {
      this.lastActiveIndex = this.galleryTop.activeIndex;
      this.galleryTop.destroy();
      this.galleryThumbs.destroy();
    }

    this.init(this.lastActiveIndex);
  }
}




