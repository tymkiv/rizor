"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

$(function () {});

var SpellerText = function SpellerText(textNode) {
  var _this = this;

  _classCallCheck(this, SpellerText);

  this.textNode = textNode;
  this.string = this.textNode.innerText;
  this.string2 = $(this.textNode).text();
  this.str = this.string.split('');
  this.str2 = this.string2.split('');
  this.textNode.innerHTML = '';
  this.str.forEach(function (letter) {
    var span = document.createElement('span');
    span.innerHTML = letter;

    if (letter == ' ') {
      var br = document.createElement('br');

      _this.textNode.appendChild(br);
    } else {
      _this.textNode.appendChild(span);
    }
  });
};