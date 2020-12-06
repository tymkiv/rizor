class AnimText {
  constructor(text){
    this.text = text;
    this.particles = [];

    this.mouseX = 0;
    this.mouseY = 0;

    $(this.text.children).each((i, p) => {
      this.particles.push( new Part(p, i, text) );
    });
  
    window.addEventListener('mousemove', this.mouse.bind(this))
    
    if(_g.isDesktop) {
      gsap.ticker.add(this.update.bind(this));
      this.isActive = true;
    }

    window.addEventListener('resize',this.onResizeHandler.bind(this) )
  }

  mouse(e){
    this.mouseX = e.pageX;
    this.mouseY = e.pageY;
  }

  updateOriginalCoords(top, speed = 1){
    this.particles.forEach(p => {
      p.updateOriginalCoords(top, speed);
    });
  }

  update(){
    this.particles.forEach(p => {
      p.update(this.mouseX, this.mouseY);
    });
  }

  onResizeHandler(){
    if(_g.isDesktop) {
      if(!this.isActive) {
        this.isActive = true;
        gsap.ticker.add(this.update.bind(this));
        
      }
    } 
    // else {
    //   if(this.isActive) {
    //     gsap.ticker.remove(this.update.bind(this));
    //     this.isActive = false;
    //   }
    // }
  }

}

class Part {
  constructor(particle, i, text){
    this.particle = particle;
    
    this.i = i;
    this.text = text;

    this.width = particle.offsetWidth;
    this.height = particle.offsetHeight;
    
    this.textTop = this.text.getBoundingClientRect().top;
    this.textLeft = this.text.getBoundingClientRect().left;

    // this.particleTop = this.particle.offsetTop;
    // this.particleLeft = this.particle.offsetLeft;
    this.particleTop = $(this.particle).position().top;
    this.particleLeft = $(this.particle).position().left;

    // this.top = particle.getBoundingClientRect().top;
    // this.left = particle.getBoundingClientRect().left;
    
    // this.originalCenterX = this.left + this.width/2;
    // this.originalCenterY = this.top + this.height/2;
    this.originalCenterX = this.textLeft + this.particleLeft + this.width/2;
    this.originalCenterY = this.textTop + this.particleTop + this.height/2;

    if(this.i == 7) {
      // console.log('this.textTop', this.textTop);
      // console.log('this.particleTop', this.particleTop);
    }

    this.offX = 0;
    this.offY = 0;

    this.speedX = 0;
    this.speedY = 0;

    this.radius = 100;

    this.friction = 0.9;

    this.gravity = 0.01;
    this.maxGravity = 0.01 + Math.random()*0.05;

    window.addEventListener('resize', this.onResizeHandler.bind(this));
  }

  updateOriginalCoords(top, speed) {
    if(!this.isInAnim) {
      this.isInAnim = true;
      gsap.to(this, speed, { originalCenterY: `+=${top}`, onComplete: ()=> {
        this.isInAnim = false;
        this.onCompleteAnim && this.onCompleteAnim();
      } })
    } else {
      this.onCompleteAnim = () => {
        this.updateOriginalCoords(top, speed);
        this.onCompleteAnim = false;
      }
    }
    
  }

  update(mouseX, mouseY){
    // this.textTop = this.text.getBoundingClientRect().top;
    // this.textLeft = this.text.getBoundingClientRect().left;

    this.particleTop = $(this.particle).position().top;
    this.particleLeft = $(this.particle).position().left;

    this.centerX = this.textLeft + this.particleLeft + this.width/2;
    this.centerY = this.textTop + this.particleTop + this.height/2;

    // if(this.i == 7) {
    //   console.log('this.centerX', this.centerX);
    //   console.log('this.centerY', this.centerY);
    // }

    // this.top = this.particle.getBoundingClientRect().top;
    // this.left = this.particle.getBoundingClientRect().left;

    // this.centerX = this.left + this.width/2;
    // this.centerY = this.top + this.height/2;

    this.distanceX = this.centerX - mouseX;
    this.distanceY = this.centerY - mouseY;

    this.distance = Math.sqrt( this.distanceX**2 + this.distanceY**2 );
    
    this.normalX = this.distanceX/this.distance;
    this.normalY = this.distanceY/this.distance;
    
    if(this.distance < this.radius) {
      this.speedX += this.normalX;
      this.speedY += this.normalY;
    } else {
      this.gravity += 0.1 * (this.maxGravity - this.gravity);
    }

    this.oDistX = this.originalCenterX - this.centerX;
    this.oDistY = this.originalCenterY - this.centerY;

    this.speedX += this.oDistX * this.gravity;
    this.speedY += this.oDistY * this.gravity;

    this.speedX *= this.friction;
    this.speedY *= this.friction;

    this.offX += this.speedX;
    this.offY += this.speedY;

    this.rotate = 0;

    this.rotate =  this.speedY*5 * Math.floor((Math.random() * 1) + 1);

    this.particle.style.transform = `translate3d(${this.offX}px, ${this.offY}px, 0) rotate(${this.rotate}deg)`;
  }

  onResizeHandler(){
    this.width = this.particle.offsetWidth;
    this.height = this.particle.offsetHeight;
    
    // this.top = this.particle.getBoundingClientRect().top;
    // this.left = this.particle.getBoundingClientRect().left;
    
    // this.originalCenterX = this.left + this.width/2;
    // this.originalCenterY = this.top + this.height/2;

    this.textTop = this.text.getBoundingClientRect().top;
    this.textLeft = this.text.getBoundingClientRect().left;

    this.particleTop = this.particle.offsetTop;
    this.particleLeft = this.particle.offsetLeft;

    this.originalCenterX = this.textLeft + this.particleLeft + this.width/2;
    this.originalCenterY = this.textTop + this.particleTop + this.height/2;
  }
}

$(function(){
  
})