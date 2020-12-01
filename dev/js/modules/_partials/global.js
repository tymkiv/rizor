const _g = {}; // Глобальная переменная

_g.desktopWidth = 968;

$(function () { 
  _update_global_vars();
  window.addEventListener('resize', _update_global_vars);
  window.addEventListener('orientationchange', _update_global_vars);
});

function _update_global_vars() {
  _g.rem = parseInt( $('html').css('fontSize') );

  _g.innerW = window.innerWidth;
  _g.innerH = window.innerHeight;

  _g.clientW = document.documentElement.clientWidth;
  _g.clientH = document.documentElement.clientHeight;

  _g.vw = +( _g.innerW * 0.01 ).toFixed(3);
  _g.vh = +( _g.innerH * 0.01 ).toFixed(3);

  _g.isDesktop = ( _g.innerW < _g.desktopWidth ) ? false : true;

  document.querySelector('body').style.setProperty( '--vh', `${_g.vh}px` );

  console.log('%cGlobal vars were updated', 'background: #6E038C; color: #fff; padding: 2px; font-weight: 700;');
}