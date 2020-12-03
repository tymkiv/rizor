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

    this.particleSize = 2;
    // this.rows = 274;
    // this.cols = 1200;
    this.rows = 137;
    this.cols = 600;
    // this.rows = 68;
    // this.cols = 300;
    // this.rows = 34;
    // this.cols = 150;
    // this.rows = 3;
    // this.cols = 3;

    this.particles = [];

    this.container = new PIXI.ParticleContainer(100000);
    this.app.stage.addChild(this.container);

    this.addObjects();
  }

  hasFill(x, y, ctx) {
    for(let i = 0; i < this.particleSize; i++) {
      for(let j = 0; j < this.particleSize; j++) {
        
        // if(ctx.getImageData(x+i, y+1, 1, 1).data[0] > 0) {
        //   console.log(ctx.getImageData(x+i, y+1, 1, 1).data);
        // }
        // if(ctx.getImageData(x+i, y+1, 1, 1).data[1] > 0) {
        //   console.log(ctx.getImageData(x+i, y+1, 1, 1).data);
        // }
        // if(ctx.getImageData(x+i, y+1, 1, 1).data[2] > 0) {
        //   console.log(ctx.getImageData(x+i, y+1, 1, 1).data);
        // }
        if(
          // ctx.getImageData(x+i, y+1, 1, 1).data[0] != 0 ||
          // ctx.getImageData(x+i, y+1, 1, 1).data[1] != 0 ||
          ctx.getImageData(x+i, y+j, 1, 1).data[3] != 0
          // ctx.getImageData(x+i, y+1, 1, 1).data[3] != 0
          ) {
          // console.log(ctx.getImageData(x+i, y+1, 1, 1).data);
          return true;
        }
        // if( 
        //   ctx.getImageData(x+i, y+1, 1, 1).data[0] != 0 ||
        //   ctx.getImageData(x+i, y+1, 1, 1).data[1] != 0 ||
        //   ctx.getImageData(x+i, y+1, 1, 1).data[2] != 0 ||
        //   ctx.getImageData(x+i, y+1, 1, 1).data[3] != 0 
        // ) {
        //   return true;
        // }
      }
    }
    return false
  }

  addObjects() {
    PIXI.loader.add('dust', './build/images/content/2.png').load((loader, resources) => {

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      // document.body.appendChild(canvas);
      canvas.width = this.cols * this.particleSize;
      canvas.height = this.rows * this.particleSize;
      ctx.drawImage(resources.dust.data, 0, 0);
      

      this.dust = new PIXI.Sprite(resources.dust.texture);
      
      this.dust.x = this.app.renderer.width / 2;
      this.dust.y = this.app.renderer.height / 2;

      
      this.dust.anchor.x = 0.5;
      this.dust.anchor.y = 0.5;

      // this.app.stage.addChild(this.dust);

      for(let i = 0; i < this.cols; i++) {
        for(let j = 0; j < this.rows; j++) {
          
          if( this.hasFill(i*this.particleSize, j*this.particleSize, ctx) ){
            const p = new Particle( i*this.particleSize, j*this.particleSize, resources.dust.texture, this.particleSize );
            this.particles.push(p);
            // this.app.stage.addChild(p.sprite);
            this.container.addChild(p.sprite);
          };

          
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

