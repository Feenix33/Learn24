// 12 Nature of Code
// Experiments and exercises from Dan Shipman's Nature of Code
//
// This is chapter 2.6, all files
//

////////////////////////////////////////////////////////////////////////////////
// sketch.js
// Mutual Attract// The Nature of Code

let movers = [];
let sun;
const numMovers = 10;

function setup() {
  createCanvas(1000, 600);
  for (let i = 0; i < numMovers; i++) {
    let pos = p5.Vector.random2D();
    let vel = pos.copy();
    //vel.setMag(random(10, 15));
    vel.setMag(random(1, 25));
    pos.setMag(random(100, 150));
    vel.rotate(PI / 2);
    let m = random(10, 15);
    movers[i] = new Mover(pos.x, pos.y, vel.x, vel.y, m);
  }
  //sun = new Mover(0, 0, 0, 0, 500);
  sun = new Mover(0, 0, 0.1, 0.1, 500);
  sun.setColor('#ffff00');
  // movers[0] = new Mover(300, 200, 0, 5, 10);
  // movers[1] = new Mover(100, 200, 0, -5, 10);
  // movers[2] = new Mover(200, 300, -5, 0, 10);
  // movers[3] = new Mover(200, 100, 5, 0, 10);
  background(0);
}

function draw() {
  background(0, 20);
  translate(width / 2, height / 2);

  for (let mover of movers) {
    sun.attract(mover);
    for (let other of movers) {
      if (mover !== other) {
        mover.attract(other);
        // stroke(255);
        // line(mover.pos.x, mover.pos.y, other.pos.x, other.pos.y);
      }
    }
  }

  for (let mover of movers) {
    mover.update();
    mover.show();
  }
  sun.update();
  sun.show();
}
////////////////////////////////////////////////////////////////////////////////
// mover.js
// Gravitational Attraction
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/EpgB3cNhKPM
// https://thecodingtrain.com/learning/nature-of-code/2.5-gravitational-attraction.html
// https://editor.p5js.org/codingtrain/sketches/MkLraatd

class Mover {
  constructor(x, y, vx, vy, m) {
    this.pos = createVector(x, y);
    this.vel = createVector(vx, vy);
    this.acc = createVector(0, 0);
    this.mass = m;
    this.r = sqrt(this.mass) * 2;
    this.clr = '#' + (((1<<24)*Math.random()) | 0).toString(16).padStart(6, 0);
  }

  setColor(clr) {
    this.clr = clr;
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }

  attract(mover) {
    let force = p5.Vector.sub(this.pos, mover.pos);
    let distanceSq = constrain(force.magSq(), 100, 1000);
    let G = 1;
    let strength = (G * (this.mass * mover.mass)) / distanceSq;
    force.setMag(strength);
    mover.applyForce(force);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  show() {
    stroke(this.clr);
    strokeWeight(2);
    //fill(255, 100);
    fill(this.clr);
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}
