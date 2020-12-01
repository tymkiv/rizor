$(function () {
  const navigation_menu = {
    nav: document.querySelector('.header__nav'),
    list_items: document.querySelectorAll('.header__nav .navigation-menu__item'),
    is_open: false,
  }
  navigation_menu.scrollBlocker = new ScrollBlocker(navigation_menu.nav);
  navigation_menu.focusTrap = new FocusTrap(document.querySelector('.header'), () => {
    navigation_menu.close();
    burger.close();
  });
  navigation_menu.createGsapAnim = () => {
    return gsap.timeline({paused: true})
    .to(navigation_menu.nav, 0.3, {x: 0, ease: Power0.easeNone}, 0)
    // .fromTo(navigation_menu.list_items, 0.5, 
    //   {x: 50, opacity: 0}, {x: 0, opacity: 1, ease: Power0.easeNone}, 0)
  }
  navigation_menu.gsapAnim = navigation_menu.createGsapAnim();
  navigation_menu.open = () => {
    navigation_menu.gsapAnim.play();
    navigation_menu.scrollBlocker.blockScroll();
    navigation_menu.is_open = true;
    navigation_menu.focusTrap.catch();
  }
  navigation_menu.close = () => {
    navigation_menu.gsapAnim.reverse();
    navigation_menu.scrollBlocker.openScroll();
    navigation_menu.is_open = false;
    navigation_menu.focusTrap.free();
  }
  navigation_menu.onResizeHandler = () => {
    navigation_menu.gsapAnim = updateGsapForResize(
      [navigation_menu.nav],
      navigation_menu.gsapAnim,
      navigation_menu.createGsapAnim,
      navigation_menu.is_open
    );
  }

  const burger = {
    btn: document.querySelector('.header__burger'),
    sp_1: document.querySelector('.header__burger .burger__sp--1'),
    sp_2: document.querySelector('.header__burger .burger__sp--2'),
    sp_3: document.querySelector('.header__burger .burger__sp--3'),
    
    is_open: false,
  }
  // Метод, возвращающий gsap timeline
  burger.createGsapAnim = () => {
    return gsap.timeline({paused: true})
    .to(burger.sp_1, {duration: 0.2, rotation: '+=90', ease: "none"} , 0)
    .to(burger.sp_1, {duration: 0.1, rotation: '+=45', ease: "none"}, 0.2)
    .to(burger.sp_1, {duration: 0.2, top: '+=-10%', ease: "power1.out"}, 0)
    .to(burger.sp_1, {duration: 0.1, top: '50%', ease: "power1.out"}, 0.2)
    
    .to(burger.sp_3, {duration: 0.2, rotation: '+=-90', ease: "none"}, 0)
    .to(burger.sp_3, {duration: 0.1, rotation: '+=-45', ease: "none"}, 0.2)
    .to(burger.sp_3, {duration: 0.2, top: '+=10%', ease: "power1.out"}, 0)
    .to(burger.sp_3, {duration: 0.1, top: '50%', ease: "power1.out"}, 0.2)

    .to(burger.sp_2, {duration: 0.3, x: '0', width: '0', ease: Power3.easeInOut}, 0)
  }
  // gsap timeline
  burger.gsapAnim = burger.createGsapAnim();
  // Метод, открывающий бургер
  burger.open = () => {
    burger.gsapAnim.play();
    burger.is_open = true;
  }
  // Метод, закрывающий бургер
  burger.close = () => {
    burger.gsapAnim.reverse();
    burger.is_open = false;
  }
  // Обработчик клика по бургеру
  burger.btn.addEventListener('click', () => {
    if(burger.is_open) {
      burger.close();
      navigation_menu.close();
    } else {
      burger.open();
      navigation_menu.open();
    }
  })
  // Обработчик ресайза, пересоздаю gsap анимацию
  burger.onResizeHandler = () => {
    burger.gsapAnim = updateGsapForResize(
      [burger.sp_1, burger.sp_2, burger.sp_3],
      burger.gsapAnim,
      burger.createGsapAnim,
      burger.is_open,
    );
  }

/* -- BEGIN TOUCHMOVE -- */
let touch = {};
let menuWidth = navigation_menu.nav.offsetWidth;
let isTouch = false;
let dierection = false;
let procentX = 0;
let deltaX = 0;
let deltaY = 0;

const rendering = (a,i,t) => {
  if(isTouch && dierection === 'x') {
    navigation_menu.nav.style.transform = `translateX(${deltaX}px)`;
  }
}

const touchstartHandler = e => {
  e.stopPropagation();
  if(navigation_menu.is_open && !_g.isDesktop) {
    isTouch = true;
    procentX = 0;
    touch.x = e.touches[0].clientX;
    touch.y = e.touches[0].clientY;
    gsap.ticker.add(rendering);
  }
}

const touchmoveHandler = e => {
  e.stopPropagation();
  if(navigation_menu.is_open && !_g.isDesktop) {
    deltaX = e.touches[0].clientX - touch.x;
    deltaY = e.touches[0].clientY - touch.y;

    if(Math.abs(deltaX) > Math.abs(deltaY)) {
      if(!dierection) {dierection = 'x'; navigation_menu.scrollBlocker.fullBlock(); }
    } else {
      if(!dierection) dierection = 'y';
    }

    if(dierection === 'x') {
      procentX = +(deltaX*100/menuWidth).toFixed(2);
      procentX = (procentX > 0) ? procentX : 0;
      procentX = (procentX < 100) ? procentX : 100;
      deltaX = (deltaX > 0) ? deltaX : 0;
      
    }
  }
}

const touchendHandler = e => {
  e.stopPropagation();
    dierection = false; isTouch = false;

    gsap.ticker.remove(rendering);

    if(procentX >= 30) {
      
      navigation_menu.nav.style.transition = 'all 0.3s ease-in-out';
      navigation_menu.nav.style.transform = 'translate3d(' + menuWidth + 'px,0,0)';

      setTimeout(()=>{
        navigation_menu.nav.style.transition = ''; 
      }, 300);
      navigation_menu.is_open  = false;
      navigation_menu.gsapAnim.pause(0);
      burger.close();
      navigation_menu.scrollBlocker.openScroll();
      navigation_menu.focusTrap.free();
    } else if(procentX >= 1) {
      
      navigation_menu.nav.style.transition = 'all 0.3s ease-in-out';
      navigation_menu.nav.style.transform = 'translate3d(' + 0 + 'px,0,0)';

      setTimeout(()=>{
        navigation_menu.nav.style.transition = '';
      }, 300);
      navigation_menu.scrollBlocker.openScroll();
      navigation_menu.scrollBlocker.blockScroll();
    }
}

navigation_menu.nav.addEventListener('touchstart', touchstartHandler, {passive: false});
navigation_menu.nav.addEventListener('touchmove', touchmoveHandler, {passive: false});
navigation_menu.nav.addEventListener('touchend', touchendHandler, {passive: false});

/* -- END TOUCHMOVE -- */

  window.addEventListener('resize', () => {
    burger.onResizeHandler();
    navigation_menu.onResizeHandler();
    menuWidth = navigation_menu.nav.offsetWidth;
  })
  window.addEventListener('orientationchange', () => {
    burger.onResizeHandler();
    navigation_menu.onResizeHandler();
    menuWidth = navigation_menu.nav.offsetWidth;
  });
});