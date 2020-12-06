let AT;
$(function () { 
  const fullPageSlider = new FullPageSlider();
  
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




