"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VideoChanger = function VideoChanger(video_wrapper) {
  var _this = this;

  _classCallCheck(this, VideoChanger);

  this.video_wrapper = video_wrapper;
  this.play_btn = video_wrapper.querySelector('.video-wrapper__play-btn');
  this.poster = video_wrapper.querySelector('.video-wrapper__poster');
  this.video = video_wrapper.querySelector('.video-wrapper__video');
  this.video_wrapper.addEventListener('click', function () {
    _this.video_wrapper.classList.add('active');

    _this.video.play();

    _this.video.requestFullscreen();
  });
  this.video.addEventListener('pause', function () {
    _this.video_wrapper.classList.remove('active');

    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  });
  this.video.addEventListener('fullscreenchange', function () {
    if (!document.fullscreenElement) {
      _this.video.pause();
    }
  });
};