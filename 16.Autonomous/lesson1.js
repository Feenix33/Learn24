// 16 Nature of Code 
// Experiments and exercises from Dan Shipman's Nature of Code
//  6 Autonomous 


/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

let slider1;
let slider2;

class Vehicle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 4;
    this.maxForce = 0.25
    this.r = 16;
  }

  setSpeedForce(spd, frc) {
    this.maxSpeed = spd;
    this.maxForce = frc;
  }

  seek (target) {
    let force = p5.Vector.sub(target, this.pos);
    force.setMag(this.maxSpeed);
    force.sub(this.vel);
    force.limit(this.maxForce);
    this.applyForce(force);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  show() {
    stroke(255);
    strokeWeight(2);
    fill(255);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    triangle(-this.r,-this.r/2, -this.r,this.r/2, this.r,0);
    pop();
  }

}


/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

let vehicle;
let target;

function setup() {
    createCanvas(800, windowHeight);
    vehicle = new Vehicle(width/2, height*7/8);
    slider1 = select("#maxspeed");
    slider2 = select("#maxforce");
}

function mousePressed() {
}

function draw() {
  background(0);

  fill(255, 0, 0);
  noStroke();
  target = createVector(mouseX, mouseY);
  circle(target.x, target.y, 32);

  vehicle.setSpeedForce(slider1.value(), slider2.value());

  vehicle.seek(target);
  vehicle.show();
  vehicle.update();
}

