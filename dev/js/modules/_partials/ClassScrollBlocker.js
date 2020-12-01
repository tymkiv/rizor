class ScrollBlocker {
  constructor(scroller){
    this.scroller = scroller;
    this.startPoint={};
    this.nowPoint;
    this.ldelay;

    this.handlerTouchmove = (event)=> {
      event.stopPropagation();
      var otk={};
      this.nowPoint=event.changedTouches[0];
      otk.y=this.nowPoint.pageY-this.startPoint.y;
      otk.x=this.nowPoint.pageX-this.startPoint.x;
  
      var offsetHeight = scroller.offsetHeight;
      var scrollTop = scroller.scrollTop;
      var scrollHeight = scroller.scrollHeight;
  
      if(event.cancelable && Math.abs(otk.x) < Math.abs(otk.y) && offsetHeight + scrollTop + 1 >= scrollHeight && otk.y < 0) {
        event.preventDefault ? event.preventDefault() : (event.returnValue = false);
      }
      if(event.cancelable &&  Math.abs(otk.x) < Math.abs(otk.y) && scrollTop <= 0 && otk.y > 0) {
        event.preventDefault ? event.preventDefault() : (event.returnValue = false);
      }
    }

    this.handlerTouchStart = (event)=> {
      event.stopPropagation();
      this.startPoint.y=event.changedTouches[0].pageY;
      this.startPoint.x=event.changedTouches[0].pageX;
      this.ldelay=new Date();
    }

    this.handlerWheel = (e)=> {
      e = e || window.event;
      e.stopPropagation();
      var delta = e.deltaY || e.detail || e.wheelDelta;
      var offsetHeight = scroller.offsetHeight;
      var scrollTop = scroller.scrollTop;
      var scrollHeight = scroller.scrollHeight;

      if( offsetHeight + scrollTop + 1 >= scrollHeight && delta > 0) {
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
      }
      if( scrollTop <= 0 && delta < 0) {
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
      }
    }

    this.blockMF = (e) => {
      e = e || window.event;
      if(e.cancelable) {
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        return false;
      }
      
    }
  }

  blockScroll(){
    // if(!g_isIE) {
      window.addEventListener('wheel', this.blockMF, {passive: false});
      window.addEventListener('touchmove', this.blockMF, {passive: false});

      this.scroller.addEventListener('touchstart', this.handlerTouchStart, {passive: false});
      this.scroller.addEventListener('touchmove', this.handlerTouchmove, {passive: false});
      this.scroller.addEventListener('wheel', this.handlerWheel, {passive: false});

      console.log('%cThe scroll was blocked', 'background: #F5A545; color: #fff; padding: 10px; font-weight: 700;');
    // }
  }

  openScroll(){
    this.scroller.removeEventListener('touchstart', this.handlerTouchStart, {passive: false});
    this.scroller.removeEventListener('touchmove', this.handlerTouchmove, {passive: false});
    this.scroller.removeEventListener('wheel', this.handlerWheel, {passive: false});

    this.scroller.removeEventListener('wheel', this.blockMF, {passive: false});
    this.scroller.removeEventListener('touchmove', this.blockMF, {passive: false});

    window.removeEventListener('wheel', this.blockMF, {passive: false});
    window.removeEventListener('touchmove', this.blockMF, {passive: false});

    console.log('%cThe scroll was unblocked', 'background: #3DA5FA; color: #fff; padding: 10px; font-weight: 700;');
  }

  fullBlock() {
    this.openScroll();
    // if(!g_isIE) {
      window.addEventListener('wheel', this.blockMF, {passive: false});
      window.addEventListener('touchmove', this.blockMF, {passive: false});
      this.scroller.addEventListener('wheel', this.blockMF, {passive: false});
      this.scroller.addEventListener('touchmove', this.blockMF, {passive: false});
    // }   
  }
}