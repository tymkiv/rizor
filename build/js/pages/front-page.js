"use strict";

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
  window.addEventListener('resize', function () {
    movePlayBtnForSec1();
  });
  var galleryThumbs = new Swiper('.section--advantages .gallery-thumbs', {
    spaceBetween: 35,
    slidesPerView: 'auto',
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true
  });
  var galleryTop = new Swiper('.section--advantages .gallery-top', {
    spaceBetween: 10,
    thumbs: {
      swiper: galleryThumbs
    }
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