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