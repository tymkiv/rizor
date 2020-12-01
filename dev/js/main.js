if (navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {
  console.log(
    "%c Coder: Tymkiv, for Rivercode ❤️", 
    "border: 5px solid tomato;color: #000; background: #fff;padding:15px 5px;font-size: 14px;"
  );
} else {
  console.log("Coder: Tymkiv, for Rivercode ❤️");
}


$(function () { 
  // Полифил для object-fit
  objectFitImages();
  // Обнаружить хеш и прокрутить к нужному блоку
  detectHash();
  // Полифил для svg use xlink в IE
  svg4everybody();
  
});


/* --- Кастомные функции --- */

// Обработчик ссылок-якорей
function linkAnchorHandler(e) {
  let url = e.target.href;
  const urlParsed = new URL(url);
  console.dir(urlParsed);
  if(urlParsed.hash.length > 0) {
    let currentHref = window.location.href.slice(0, window.location.href.indexOf('#'));
    if(currentHref[currentHref.length-1] != '/') currentHref += '/';
    if(currentHref === urlParsed.href.slice(0, urlParsed.href.indexOf('#'))) {
      e.preventDefault();
      let top = $(urlParsed.hash).offset().top - 200;
      $('body,html').animate({scrollTop: top}, 600);
    }
  }
}

// Обнаруживает # и прокручивает к нужному блоку
function detectHash() {
  let hash = window.location.hash;
  if(hash.length > 1) {
    if(document.querySelector( hash )) {
      $('body,html').animate({scrollTop: 0}, 0);
      let offset = (window.innerWidth >= 968) ? 200 : 70;
      let top = $(hash).offset().top - offset;
      $('body,html').animate({scrollTop: top}, 600);
    }
  }
}

// Пересоздает gsap анимацию, принимает:
// - массив элементов, которые изменяла старая анимация
// - gsap анимация
// - функция созданние новой анимации
// - true/false если анимация на момент пересоздания была проиграна
function updateGsapForResize(arrayOfElements, animation, createAnimation, inEnd) {
  if(animation && createAnimation) {
    gsap.set(arrayOfElements, {clearProps: 'all'});
    animation.clear();
    animation = createAnimation();
    if(inEnd) {
      animation.progress(1);
    }
    return animation;
  }
}


/* --- Полифилы --- */

// forEach IE 11
if ('NodeList' in window && !NodeList.prototype.forEach) {
    console.info('polyfill for IE11');
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

// closest IE 11
(function () {
    if (!Element.prototype.closest) {
        Element.prototype.closest = function (css) {
            var node = this;
            while (node) {
                if (node.matches(css)) return node;
                else node = node.parentElement;
            }
            return null;
        };
    }
})();

// matches IE 11
(function () {
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.matchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector;
    }
})();

//Array.form IE 11
if (!Array.from) {
  Array.from = function (object) {
      'use strict';
      return [].slice.call(object);
  };
}