class MovePlayBtnOnVideo{
  constructor(wrapper, playBtn, icoForMove){
    this.wrapper = wrapper;
    this.playBtn = playBtn;
    this.icoForMove = icoForMove;

    window.addEventListener('resize', this.onResizeHandler.bind(this));

    this.height = this.playBtn.offsetHeight;
    this.width = this.playBtn.offsetWidth;

    this.playBtnTop = $(this.playBtn).position().top + +$(this.playBtn).css('marginTop').slice(0, -2);
    this.playBtnLeft = $(this.playBtn).position().left;

    this.originalCenterY = this.playBtnTop + this.height/2;
    this.originalCenterX = this.playBtnLeft + this.width/2;

    this.mouseY = this.originalCenterY;
    this.mouseX = this.originalCenterX;
    

    if(_g.isDesktop) {
      this.wrapper.addEventListener('mousemove', this.mouse.bind(this));
      this.wrapper.addEventListener('mouseover', this.mouseoverHandler.bind(this));
      this.wrapper.addEventListener('mouseleave', this.mouseoutHandler.bind(this));

      gsap.ticker.add(this.update.bind(this));
      this.isActive = true;
    }
  }

  mouseoverHandler(e){
    this.mouseIn = true;
    this.playBtn.classList.add('hover');
  }

  mouseoutHandler(e){
    this.mouseIn = false;
    this.playBtn.classList.remove('hover');
    this.mouseY = this.originalCenterY;
    this.mouseX = this.originalCenterX;
  }

  mouse(e){
    if(!$(e.target).closest(this.playBtn)[0]) {
      this.mouseIn = true;
      this.mouseY = e.offsetY;
      this.mouseX = e.offsetX;
    }
    
  }

  onResizeHandler(){
      this.height = this.playBtn.offsetHeight;
      this.width = this.playBtn.offsetWidth;

      this.playBtnTop = $(this.playBtn).position().top + +$(this.playBtn).css('marginTop').slice(0, -2);
      this.playBtnLeft = $(this.playBtn).position().left;

      this.originalCenterY = this.playBtnTop + this.height/2;
      this.originalCenterX = this.playBtnLeft + this.width/2;

      this.mouseY = this.originalCenterY;
      this.mouseX = this.originalCenterX;
    
    if(_g.isDesktop && !this.isActive) {
      this.wrapper.addEventListener('mousemove', this.mouse.bind(this));
      this.wrapper.addEventListener('mouseover', this.mouseoverHandler.bind(this));
      this.wrapper.addEventListener('mouseleave', this.mouseoutHandler.bind(this));

      gsap.ticker.add(this.update.bind(this));
      this.isActive = true;
    }
  }

  update(){
    
    const distY = this.mouseY - this.originalCenterY;
    const distX = this.mouseX - this.originalCenterX;

    if(this.mouseIn && _g.isDesktop) {
      gsap.to(this.icoForMove, 0.5, {x: distX, y: distY})
    } else {
      gsap.to(this.icoForMove, 1, {x: 0, y: 0})
    }
    
  }
}