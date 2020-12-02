class Particle {
  constructor(x, y, texture, size) {
    this.x = x;
    this.y = y;

    this.texture = texture;
    this.size = size;

    this.sprite = new PIXI.Sprite(new PIXI.Texture(this.texture));
    this.sprite.texture.frame = new PIXI.Rectangle(this.x, this.y, this.size, this.size);

    this.sprite.x = this.x;
    this.sprite.y = this.y;

    this.speedX = 0;
    this.speedY = 0;

    this.radius = 100;

    this.friction = 0.9;
    this.gravity = 0.01;

    this.dirX = Math.random() - 0.5;
    this.dirY = Math.random() - 0.5;
  }

  update(mouse) {
    let distanceX = mouse.x - this.sprite.x;
    let distanceY = mouse.y - this.sprite.y;

    let distance = Math.sqrt(distanceX**2 + distanceY**2);

    let normalX = distanceX/distance;
    let normalY = distanceY/distance;

    // mouse interaction
    if(distance < this.radius){
      this.speedX -= normalX;
      this.speedY -= normalY;
    }

    //back home

    let oDistX = this.x - this.sprite.x;
    let oDistY = this.y - this.sprite.y;

    this.speedX += oDistX * this.gravity;
    this.speedY += oDistY * this.gravity;


    this.speedX *= this.friction;
    this.speedY *= this.friction;

    this.sprite.x += this.speedX;
    this.sprite.y += this.speedY;
  }
}