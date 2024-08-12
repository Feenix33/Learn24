// 15 Nature of Code 
//  4 Particle Systems
// Experiments and exercises from Dan Shipman's Nature of Code
// 4.1 particle class
// 4.2 add the emitter
// 4.2a fireworks
// 4.2b raybursts
// 4.3 inheritance of 4.2
// 4.4 textures


/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(0.5, 2));
    this.acc = createVector(0, 0);
    this.r = 64;
    this.lifetime = 255;
  }

  finished() {
    return this.lifetime < 0;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
    this.lifetime -= 7;
  }

  show() {
      tint(150, 10, 20, this.lifetime);
      imageMode(CENTER);
      image(img, this.pos.x, this.pos.y, this.r, this.r);
  }

}


class Emitter {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.particles = [];
  }

  emit(num) {
    for (let i = 0; i < num; i++) {
        this.particles.push(new Particle(this.position.x, this.position.y));
    }
  }

  applyForce(force) {
      for (let particle of this.particles) {
          particle.applyForce(force);
      }
  }

  update() {
    for (let particle of this.particles) {
      particle.update();
    }

    this.particles = this.particles.filter(p => p.lifetime > 0);
  }

  show() {
    for (let particle of this.particles) {
      particle.show();
    }
  }
}



/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

let emitter;
let img;


function preload() {
    img = loadImage('texture.png');
}

function setup() {
    createCanvas(800, windowHeight);
    emitter = new Emitter(width/2, height*7/8);
}


function draw() {
    clear();
    background(0);
    blendMode(ADD);
    //blendMode(BLEND);
    //blendMode(MULTIPLY);

    let force = createVector(0, -0.1); // gravity
    emitter.applyForce(force);

    let dir = map(mouseX, 0, width, -0.1, 0.1);
    let wind = createVector(dir, 0);
    emitter.applyForce(wind);

    emitter.emit(1);
    emitter.show();
    emitter.update();
}

