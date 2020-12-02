class ParticleText {
  constructor() {
    this.app = new PIXI.Application(
      document.getElementById('wrapper-for-dust').offsetWidth, 
      document.getElementById('wrapper-for-dust').offsetHeight, 
      {
        autoResize: true,
        autoDensity: true,
        transparent: true,
      },

    );
    document.getElementById('wrapper-for-dust').appendChild(this.app.view);

    this.particleSize = 10;
    this.particles = [];

    this.addObjects();
  }

  addObjects() {
    PIXI.loader.add('dust', './build/images/content/1.png').load((loader, resources) => {

      this.dust = new PIXI.Sprite(resources.dust.texture);
      
      this.dust.x = this.app.renderer.width / 2;
      this.dust.y = this.app.renderer.height / 2;

      
      this.dust.anchor.x = 0.5;
      this.dust.anchor.y = 0.5;

      // this.app.stage.addChild(this.dust);

      for(let i = 0; i < 50; i++) {
        for(let j = 0; j < 50; j++) {
          const p = new Particle( i*this.particleSize, j*this.particleSize, resources.dust.texture, this.particleSize );
          this.particles.push(p);
          this.app.stage.addChild(p.sprite);
        }
      }
      console.log(this.particles);

      
      this.animate();
  });
  }

  animate() {
    this.app.ticker.add(() => {
      this.mouse = this.app.renderer.plugins.interaction.mouse.global;
      this.particles.forEach((p)=>{
        p.update(this.mouse);
      })
    });
  }
}

$(function() {
  const PT = new ParticleText();
})

