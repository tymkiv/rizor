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