// 15 Nature of Code 
//  4 Particle Systems
// Experiments and exercises from Dan Shipman's Nature of Code
// 4.1 particle class
// 4.2 add the emitter
// 4.2a fireworks
// 4.2b raybursts
// 4.3 inheritance of 4.2


/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

class Particle extends p5.Vector {
  constructor(x, y) {
    super(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(0.5, 2));
    this.acc = createVector(0, 0);
    this.r = 8;
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
    this.add(this.vel);
    this.acc.set(0, 0);
    this.lifetime -= 5;
  }

  show() {
    stroke(255, this.lifetime);
    strokeWeight(2);
    fill(255, this.lifetime);

    ellipse(this.x, this.y, this.r * 2);
  }

}


class Emitter {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.particles = [];
  }

  emit(num) {
    for (let i = 0; i < num; i++) {
      if (random(1) < 0.5) {
        this.particles.push(new Particle(this.position.x, this.position.y));
      } else {
        this.particles.push(new Confetti(this.position.x, this.position.y));
      }
    }
  }

  update() {
    for (let particle of this.particles) {
      let gravity = createVector(0, 0.2);
      particle.applyForce(gravity);
      particle.update();
    }

    /****
    for (let i = this.particles.length - 1; i >= 0; i--) {
      if (this.particles[i].finished()) {
        this.particles.splice(i, 1);
      }
    }
    ****/
    this.particles = this.particles.filter(p => p.lifetime > 0);
  }

  show() {
    for (let particle of this.particles) {
      particle.show();
    }
  }
}


class Confetti extends Particle {
  constructor(x, y) {
    super(x, y);
    this.angle = random(TWO_PI);
  }

  show() {
    noStroke();
    fill(255, this.lifetime);
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    square(0, 0, this.r * 2);
    pop();
  }
}


/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

let emitters = [];

function setup() {
    createCanvas(800, windowHeight);
}


function mousePressed() {
  emitters.push(new Emitter(mouseX, mouseY));
}


function draw() {
  background(0);
  let count = 0;

  for (let emitter of emitters) {
    emitter.emit(1);
    emitter.show();
    emitter.update();
    count += emitter.particles.length;
  }
  stroke(255);
  strokeWeight(1);
  fill(255);
  textSize(30);
  text(floor(count/10), 10, 40);
}

