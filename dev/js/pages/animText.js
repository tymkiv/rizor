class AnimText {
  constructor(text){
    this.text = text;
    this.particles = [];

    this.mouseX = 0;
    this.mouseY = 0;

    $(this.text.children).each((i, p) => {
      this.particles.push( new Part(p, i) );
    });
  
    window.addEventListener('mousemove', this.mouse.bind(this))
    gsap.ticker.add(this.update.bind(this));
  }

  mouse(e){
    this.mouseX = e.pageX;
    this.mouseY = e.pageY;
  }

  update(){
    this.particles.forEach(p => {
      p.update(this.mouseX, this.mouseY);
    });
  }

}

class Part {
  constructor(particle, i){
    this.particle = particle;

    this.i = i;

    this.width = particle.offsetWidth;
    this.height = particle.offsetHeight;
    
    this.top = particle.getBoundingClientRect().top;
    this.left = particle.getBoundingClientRect().left;
    
    this.originalCenterX = this.left + this.width/2;
    this.originalCenterY = this.top + this.height/2;

    this.offX = 0;
    this.offY = 0;

    this.speedX = 0;
    this.speedY = 0;

    this.radius = 100;

    this.friction = 0.9;

    this.gravity = 0.01;
    this.maxGravity = 0.01 + Math.random()*0.05;
  }

  update(mouseX, mouseY){
    this.top = this.particle.getBoundingClientRect().top;
    this.left = this.particle.getBoundingClientRect().left;

    this.centerX = this.left + this.width/2;
    this.centerY = this.top + this.height/2;

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

    this.rotate =  this.speedY*5;

    this.particle.style.transform = `translate3d(${this.offX}px, ${this.offY}px, 0) rotate(${this.rotate}deg)`;
  }
}

$(function(){
  new AnimText(document.querySelector('#anim-text h2'));
})