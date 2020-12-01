class FocusTrap {
  constructor(wrapper, callBackAfterClose) {
    this.wrapper = wrapper;
    this.callBackAfterClose = callBackAfterClose;
    this.statusFree = true;

    this.update();

    this._keyboardHandler = (e) => {
      if (e.keyCode === 9) 
      { // Клавиша Tab
        if(this._firstTabStop) 
        { // Если элементы существуют
          if (e.shiftKey) 
          { // Клавиша Shift + Tab
            if (document.activeElement === this._firstTabStop) 
            {
              e.preventDefault();
              this._lastTabStop.focus();
            }
          } else 
          { // Просто Tab
            if (document.activeElement === this._lastTabStop) 
            {
              e.preventDefault();
              this._firstTabStop.focus();
            }
          }
        } else 
        {
          // console.dir(this);
          e.preventDefault();
          this.wrapper.focus();
        }
      }
      if(e.keyCode === 27) 
      { // Клавиша Esc
        // console.dir(this.callBackAfterClose);
        // console.dir( this.callBackAfterClose.toString() );
        this.callBackAfterClose();
      }
    }
  }

  update(callBackAfterClose) {
    // this.wrapper.tabIndex = 0;
    if(callBackAfterClose) this.callBackAfterClose = callBackAfterClose;
    this.focusableElements = this.wrapper.querySelectorAll( 'a[href], area[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]' );
    this.focusableElements = Array.prototype.slice.call(this.focusableElements);
    // console.log(this.focusableElements);
    this._firstTabStop = this.focusableElements[0];
    this._lastTabStop = this.focusableElements[this.focusableElements.length - 1];
  }

  catch() {
    this.statusFree = false;
    _g.lastFocusedElement = document.activeElement;
    // console.log(_g.lastFocusedElement);
    // this._firstTabStop.focus();
    this.wrapper.focus();
    // console.log(this._firstTabStop);
    this.wrapper.addEventListener('keydown', this._keyboardHandler);
  }

  free() {
    if(!this.statusFree) {
      this.statusFree = true;
      _g.lastFocusedElement.focus();
      this.wrapper.removeEventListener('keydown', this._keyboardHandler);
    }
  }

  
}