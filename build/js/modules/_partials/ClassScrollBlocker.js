"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ScrollBlocker = /*#__PURE__*/function () {
  function ScrollBlocker(scroller) {
    var _this = this;

    _classCallCheck(this, ScrollBlocker);

    this.scroller = scroller;
    this.startPoint = {};
    this.nowPoint;
    this.ldelay;

    this.handlerTouchmove = function (event) {
      event.stopPropagation();
      var otk = {};
      _this.nowPoint = event.changedTouches[0];
      otk.y = _this.nowPoint.pageY - _this.startPoint.y;
      otk.x = _this.nowPoint.pageX - _this.startPoint.x;
      var offsetHeight = scroller.offsetHeight;
      var scrollTop = scroller.scrollTop;
      var scrollHeight = scroller.scrollHeight;

      if (event.cancelable && Math.abs(otk.x) < Math.abs(otk.y) && offsetHeight + scrollTop + 1 >= scrollHeight && otk.y < 0) {
        event.preventDefault ? event.preventDefault() : event.returnValue = false;
      }

      if (event.cancelable && Math.abs(otk.x) < Math.abs(otk.y) && scrollTop <= 0 && otk.y > 0) {
        event.preventDefault ? event.preventDefault() : event.returnValue = false;
      }
    };

    this.handlerTouchStart = function (event) {
      event.stopPropagation();
      _this.startPoint.y = event.changedTouches[0].pageY;
      _this.startPoint.x = event.changedTouches[0].pageX;
      _this.ldelay = new Date();
    };

    this.handlerWheel = function (e) {
      e = e || window.event;
      e.stopPropagation();
      var delta = e.deltaY || e.detail || e.wheelDelta;
      var offsetHeight = scroller.offsetHeight;
      var scrollTop = scroller.scrollTop;
      var scrollHeight = scroller.scrollHeight;

      if (offsetHeight + scrollTop + 1 >= scrollHeight && delta > 0) {
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
      }

      if (scrollTop <= 0 && delta < 0) {
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
      }
    };

    this.blockMF = function (e) {
      e = e || window.event;

      if (e.cancelable) {
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        return false;
      }
    };
  }

  _createClass(ScrollBlocker, [{
    key: "blockScroll",
    value: function blockScroll() {
      // if(!g_isIE) {
      window.addEventListener('wheel', this.blockMF, {
        passive: false
      });
      window.addEventListener('touchmove', this.blockMF, {
        passive: false
      });
      this.scroller.addEventListener('touchstart', this.handlerTouchStart, {
        passive: false
      });
      this.scroller.addEventListener('touchmove', this.handlerTouchmove, {
        passive: false
      });
      this.scroller.addEventListener('wheel', this.handlerWheel, {
        passive: false
      });
      console.log('%cThe scroll was blocked', 'background: #F5A545; color: #fff; padding: 10px; font-weight: 700;'); // }
    }
  }, {
    key: "openScroll",
    value: function openScroll() {
      this.scroller.removeEventListener('touchstart', this.handlerTouchStart, {
        passive: false
      });
      this.scroller.removeEventListener('touchmove', this.handlerTouchmove, {
        passive: false
      });
      this.scroller.removeEventListener('wheel', this.handlerWheel, {
        passive: false
      });
      this.scroller.removeEventListener('wheel', this.blockMF, {
        passive: false
      });
      this.scroller.removeEventListener('touchmove', this.blockMF, {
        passive: false
      });
      window.removeEventListener('wheel', this.blockMF, {
        passive: false
      });
      window.removeEventListener('touchmove', this.blockMF, {
        passive: false
      });
      console.log('%cThe scroll was unblocked', 'background: #3DA5FA; color: #fff; padding: 10px; font-weight: 700;');
    }
  }, {
    key: "fullBlock",
    value: function fullBlock() {
      this.openScroll(); // if(!g_isIE) {

      window.addEventListener('wheel', this.blockMF, {
        passive: false
      });
      window.addEventListener('touchmove', this.blockMF, {
        passive: false
      });
      this.scroller.addEventListener('wheel', this.blockMF, {
        passive: false
      });
      this.scroller.addEventListener('touchmove', this.blockMF, {
        passive: false
      }); // }   
    }
  }]);

  return ScrollBlocker;
}();