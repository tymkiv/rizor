"use strict";

var AT, fullPageSlider;
$(function () {
  fullPageSlider = new FullPageSlider();
  document.querySelectorAll('.video-wrapper').forEach(function (video_wrapper) {
    new VideoChanger(video_wrapper);
  });
  setTimeout(function () {
    // movePlayBtnForSec1();
    setHeightForPlayBtnBorderForSec1.updateHeight();
    setHeightForPlayBtnBorderForSec4.updateHeight();
    new SpellerText(document.querySelector('.section--first .section__title'));
    AT = new AnimText(document.querySelector('.section--first .section__title'));
    new MovePlayBtnOnVideo(document.querySelector('.section--first .section__video-wrapper'), document.querySelector('.section--first .section__video-wrapper .video-wrapper__play-btn'), document.querySelector('.section--first .section__video-wrapper .play-btn__icon'));
    new MovePlayBtnOnVideo(document.querySelector('.section--advantages .section__video-wrapper'), document.querySelector('.section--advantages .section__video-wrapper .video-wrapper__play-btn'), document.querySelector('.section--advantages .section__video-wrapper .play-btn__icon'));
    new MovePlayBtnOnVideo(document.querySelector('.section--specification .section__video-wrapper'), document.querySelector('.section--specification .section__video-wrapper .video-wrapper__play-btn'), document.querySelector('.section--specification .section__video-wrapper .play-btn__icon'));
  }, 300);
  new ColorSlider('.section--advantages .gallery-thumbs', '.section--advantages .gallery-top');
  window.addEventListener('resize', function () {
    // movePlayBtnForSec1();
    setHeightForPlayBtnBorderForSec1.updateHeight();
    setHeightForPlayBtnBorderForSec4.updateHeight();
  }); //Задаю нужную длину для бордера (костыль)
  // Использую обьект, для хранения внутреннего состояния

  var setHeightForPlayBtnBorderForSec4 = {
    playBtn: document.querySelector('.section--specification .video-wrapper .play-btn'),
    anchorText: document.querySelector('#anchor-for-specification-blay-btn-border'),
    svg: document.querySelector('.section--specification .video-wrapper .play-btn .play-btn__border svg'),
    path: document.querySelector('.section--specification .video-wrapper .play-btn .play-btn__border svg path'),
    borderHeight: 490
  };

  setHeightForPlayBtnBorderForSec4.updateHeight = function () {
    var that = setHeightForPlayBtnBorderForSec4;
    var searchRegExp = new RegExp("".concat(that.borderHeight), 'g');
    that.borderHeight = $(that.playBtn).offset().top - $(that.anchorText).offset().top - that.anchorText.offsetHeight / 2 - 10;
    that.svg.setAttribute('viewBox', "0 0 ".concat(that.borderHeight, " 160"));
    that.svg.setAttribute('width', that.borderHeight);
    var newD = that.path.getAttribute('d').replace(searchRegExp, that.borderHeight);
    that.path.setAttribute('d', newD);
  };

  var setHeightForPlayBtnBorderForSec1 = {
    playBtn: document.querySelector('.section--first .video-wrapper .play-btn'),
    anchorText: document.querySelector('#anchor-for-first-blay-btn-border'),
    border: document.querySelector('.section--first .video-wrapper .play-btn .play-btn__border'),
    svg: document.querySelector('.section--first .video-wrapper .play-btn .play-btn__border svg'),
    path: document.querySelector('.section--first .video-wrapper .play-btn .play-btn__border svg path'),
    borderHeight: 20
  };

  setHeightForPlayBtnBorderForSec1.updateHeight = function () {
    if (_g.isDesktop) {
      var that = setHeightForPlayBtnBorderForSec1;
      var searchRegExp = new RegExp("".concat(that.borderHeight - 1), 'g'); // console.log(searchRegExp);

      that.borderHeight = Math.abs($(that.playBtn).offset().top - $(that.anchorText).offset().top) - that.anchorText.offsetHeight / 2 + 25;
      console.log(that.borderHeight);
      that.border.style.width = that.borderHeight + 'px';
      that.svg.setAttribute('viewBox', "0 0 ".concat(that.borderHeight, " 100"));
      that.svg.setAttribute('width', that.borderHeight);
      var newD = that.path.getAttribute('d').replace(searchRegExp, that.borderHeight - 1);
      that.path.setAttribute('d', newD);
    }
  };
}); // Двигаю кнопку play туда куда нужно (костыль)

function movePlayBtnForSec1() {//   const height = document.querySelector('.section--first .section__text-wrapper').offsetHeight;
  //   const play_btn_node = document.querySelector('.section--first .video-wrapper__play-btn');
  // if(_g.isDesktop) {
  //   play_btn_node.style.marginTop = -height/2 + 'px'; 
  // } else {
  //   play_btn_node.style.marginTop = ''; 
  // }
}