// Nature of Code 
// Experiments and exercises from Dan Shipman's Nature of Code
// 18 Fractals
// 01 Draw a recursive circle

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
function keyPressed() {
  if (key == "g") { generate(); }
}

function mousePressed() { }

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

let tris = [];

class Koch {
  constructor (a, b) {
    this.bgn = a.copy();
    this.end = b.copy();
  }
  show () {
    line (this.bgn.x, this.bgn.y, this.end.x, this.end.y);
  }
}

class Sierpinski {
  constructor (a, b, c) {
    this.a = a.copy();
    this.b = b.copy();
    this.c = c.copy();
  }
  show() {
    triangle(this.a.x, this.a.y, this.b.x, this.b.y, this.c.x, this.c.y);
  }
}

function generate() {
  let next = [];


  for (let tri of tris) {
    let ab = p5.Vector.sub(tri.a, tri.b);
    ab.div(2);
    ab.add(tri.b);
    let bc = p5.Vector.sub(tri.b, tri.c);
    bc.div(2);
    bc.add(tri.c);
    let ca = p5.Vector.sub(tri.c, tri.a);
    ca.div(2);
    ca.add(tri.a);

    next.push(new Sierpinski (tri.a, ab, ca));
    next.push(new Sierpinski (ab, tri.b, bc));
    next.push(new Sierpinski (bc, tri.c, ca));
  }
  tris = next;
}

function setup()
{
  createCanvas(800, 600);

  tris.push(new Sierpinski (
    createVector(400, 50), 
    createVector(700,500),
    createVector(100,500) 
  ));

}

function draw() 
{
  background(128);

  stroke(255);
  strokeWeight(1);
  fill('blue');

  for (let tri of tris) {
    tri.show();
  }
}
