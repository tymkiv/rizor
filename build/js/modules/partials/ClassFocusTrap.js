"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FocusTrap = /*#__PURE__*/function () {
  function FocusTrap(wrapper, callBackAfterClose) {
    var _this = this;

    _classCallCheck(this, FocusTrap);

    this.wrapper = wrapper;
    this.callBackAfterClose = callBackAfterClose;
    this.statusFree = true;
    this.update();

    this._keyboardHandler = function (e) {
      if (e.keyCode === 9) {
        // Клавиша Tab
        if (_this._firstTabStop) {
          // Если элементы существуют
          if (e.shiftKey) {
            // Клавиша Shift + Tab
            if (document.activeElement === _this._firstTabStop) {
              e.preventDefault();

              _this._lastTabStop.focus();
            }
          } else {
            // Просто Tab
            if (document.activeElement === _this._lastTabStop) {
              e.preventDefault();

              _this._firstTabStop.focus();
            }
          }
        } else {
          // console.dir(this);
          e.preventDefault();

          _this.wrapper.focus();
        }
      }

      if (e.keyCode === 27) {
        // Клавиша Esc
        // console.dir(this.callBackAfterClose);
        // console.dir( this.callBackAfterClose.toString() );
        _this.callBackAfterClose();
      }
    };
  }

  _createClass(FocusTrap, [{
    key: "update",
    value: function update(callBackAfterClose) {
      // this.wrapper.tabIndex = 0;
      if (callBackAfterClose) this.callBackAfterClose = callBackAfterClose;
      this.focusableElements = this.wrapper.querySelectorAll('a[href], area[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]');
      this.focusableElements = Array.prototype.slice.call(this.focusableElements); // console.log(this.focusableElements);

      this._firstTabStop = this.focusableElements[0];
      this._lastTabStop = this.focusableElements[this.focusableElements.length - 1];
    }
  }, {
    key: "catch",
    value: function _catch() {
      this.statusFree = false;
      _g.lastFocusedElement = document.activeElement; // console.log(_g.lastFocusedElement);
      // this._firstTabStop.focus();

      this.wrapper.focus(); // console.log(this._firstTabStop);

      this.wrapper.addEventListener('keydown', this._keyboardHandler);
    }
  }, {
    key: "free",
    value: function free() {
      if (!this.statusFree) {
        this.statusFree = true;

        _g.lastFocusedElement.focus();

        this.wrapper.removeEventListener('keydown', this._keyboardHandler);
      }
    }
  }]);

  return FocusTrap;
}();