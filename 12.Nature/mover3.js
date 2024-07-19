// Acceleration Vector
// The Nature of Code
// The Coding Train / Daniel Shiffman
class Mover {
  constructor(x, y, m, col) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(5, 15));
    this.acc = createVector(0, 0);
    this.mass = m;
    this.r = sqrt(this.mass) * 10;
    this.col = col;
  }


  friction() {
    // shorcut to friction!
    // this.vel.mult(0.95);

    // Direction of Friction
    let friction = this.vel.copy();
    friction.normalize();
    friction.mult(-1);

    // chained version
    // let friction = this.vel.copy().normalize().mult(-1);

    // Magnitude of Friction
    let normal = this.mass;
    friction.setMag(mu * normal);
    this.applyForce(friction);

  }



  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }


  edges() {
    if (this.pos.y >= height - this.r) {
      this.pos.y = height - this.r;
      this.vel.y *= -1;
    } else if (this.pos.y <= this.r) {
      this.pos.y = this.r;
      this.vel.y *= -1;
    }

    if (this.pos.x >= width - this.r) {
      this.pos.x = width - this.r;
      this.vel.x *= -1;
    } else if (this.pos.x <= this.r) {
      this.pos.x = this.r;
      this.vel.x *= -1;
    }
  }


  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  show() {
    stroke(this.col.r, this.col.g, this.col.b);
    strokeWeight(4);
    fill(this.col.r, this.col.g, this.col.b, 150);
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }

}
