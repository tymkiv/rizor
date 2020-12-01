"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Popup = /*#__PURE__*/function () {
  function Popup(popup) {
    _classCallCheck(this, Popup);

    this.popup = popup;
    this.bg = popup.querySelector('.popup__bg');
    this.wrapper = popup.querySelector('.popup__wrapper');
    this.content = popup.querySelector('.popup__content');
    this.loader = popup.querySelector('.popup__loader');
    this.scrollBlocker = new ScrollBlocker(this.wrapper);
  }

  _createClass(Popup, [{
    key: "open",
    value: function open() {
      this.popup.classList.add('popup--open');
      this.scrollBlocker.blockScroll();
    }
  }, {
    key: "close",
    value: function close() {
      this.popup.classList.remove('popup--open');
      this.scrollBlocker.openScroll();
    }
  }, {
    key: "insert",
    value: function insert(something) {
      $(this.content).html(something);
    }
  }, {
    key: "showLoader",
    value: function showLoader() {
      this.loader.classList.remove('hidden');
    }
  }, {
    key: "hideLoader",
    value: function hideLoader() {
      this.loader.classList.add('hidden');
    }
  }, {
    key: "showContent",
    value: function showContent() {
      $(this.content).slideDown();
    }
  }, {
    key: "hideContent",
    value: function hideContent() {
      $(this.content).slideUp();
    }
  }]);

  return Popup;
}();