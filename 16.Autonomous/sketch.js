// 16 Nature of Code 
// Experiments and exercises from Dan Shipman's Nature of Code
//  6 Autonomous 
// 01 simple but with sliders in html
// 02 complex, all behaviors
// 02 add the update behavior on the target
// 02 adding a slider
// 03 try angleBetween example
// 04 scalar projection
// 05 simple path follow

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
function findProjection(pos, a, b) {
  let v1 = p5.Vector.sub(a, pos);
  let v2 = p5.Vector.sub(b, pos);
  v2.normalize();
  let sp = v1.dot(v2);
  v2.mult(sp);
  v2.add(pos);
  return v2;
}

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

class Path {
  constructor(x1, y1, x2, y2) {
    this.start = createVector(x1, y1);
    this.end = createVector(x2, y2);
    this.radius = 5; //20;
  }

  show() {
    stroke(255);
    strokeWeight(2);
    line(this.start.x, this.start.y, this.end.x, this.end.y);

    stroke(255, 100);
    strokeWeight(this.radius * 2);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }
}

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
class Vehicle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 6; // 6;
    this.maxForce = 0.10; // 0.1;
    this.r = 8; // 16;
    this.clr = color(255,255,255);
  }

  follow(path) {
    // Path following algorithm here!!

    // Step 1 calculate future position
    let future = this.vel.copy();
    future.mult(20);
    future.add(this.pos);
    fill(255, 0, 0);
    noStroke();
    circle(future.x, future.y, 16);

    // Step 2 Is future on path?
    let target = findProjection(path.start, future, path.end);
    fill(0, 255, 0);
    noStroke();
    circle(target.x, target.y, 16);

    let d = p5.Vector.dist(future, target);
    if (d > path.radius) {
      return this.seek(target);
    } else {
      return createVector(0, 0);
    }
  }

  seek(target, arrival = false) {
    let force = p5.Vector.sub(target, this.pos);
    let desiredSpeed = this.maxSpeed;
    if (arrival) {
      let slowRadius = 100;
      let distance = force.mag();
      if (distance < slowRadius) {
        desiredSpeed = map(distance, 0, slowRadius, 0, this.maxSpeed);
      }
    }
    force.setMag(desiredSpeed);
    force.sub(this.vel);
    force.limit(this.maxForce);
    return force;
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
    stroke(this.clr);
    strokeWeight(2);
    fill(this.clr);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0);
    pop();
  }

  edges() {
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }
    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
    }
  }
}
/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/


let vehicle;
let pursuit;
let path;

function setup() {
  createCanvas(800, 600);

  vehicle = new Vehicle(100, 100);
  vehicle.vel.x = 2;
  vehicle.clr = color(255,255,0);

  pursuit = new Vehicle(200, 100);
  pursuit.vel.x = 2;
  pursuit.clr = color('blue');

  path = new Path(0, height / 2, width, height / 2);
}

function draw() {
  background(0);

  path.end.y = mouseY;

  let force = vehicle.follow(path);
  vehicle.applyForce(force);

  pursuit.applyForce(pursuit.seek(vehicle.pos));
  /*****
  vehicle.edges();
  vehicle.update();
  vehicle.show();

  pursuit.edges();
  pursuit.update();
  pursuit.show();
  *****/

  let cars = [vehicle, pursuit];
  for (let c of cars) {
    c.edges();
    c.update();
    c.show();
  }

  path.show();
}
