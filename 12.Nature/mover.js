// Acceleration Vector
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/T84AWnntxZA
// https://thecodingtrain.com/learning/nature-of-code/1.6-acceleration-vector.html
// https://editor.p5js.org/codingtrain/sketches/OjCfrdWX

class Mover01 {
  constructor(x, y,vi,vmax,gl) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.vmax = vmax;
    this.vel.mult(random(vi));
    this.gl = gl;
  }
  /***
  constructor(x, y) {
    this.pos = createVector(x, y);
    // this.vel = createVector(1, -1);
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(3));
  }
  ***/

  update() {  
    
    let mouse = createVector(mouseX, mouseY);
    this.acc = p5.Vector.sub(mouse, this.pos);
    this.acc.setMag(1);
    
    this.vel.add(this.acc); 
    this.vel.limit(this.vmax);

    this.pos.add(this.vel);
  }

  target(mx, my) {  
    
    let mouse = createVector(mx, my);
    this.acc = p5.Vector.sub(mouse, this.pos);
    this.acc.setMag(1);
    
    this.vel.add(this.acc); 
    this.vel.limit(this.vmax);

    this.pos.add(this.vel);
  }

  show() {
    stroke(this.gl);
    strokeWeight(2);
    fill(this.gl);
    ellipse(this.pos.x, this.pos.y, 32);
  }
}
