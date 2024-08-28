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

let segs = [];

class Koch {
  constructor (a, b) {
    this.bgn = a.copy();
    this.end = b.copy();
  }
  show () {
    line (this.bgn.x, this.bgn.y, this.end.x, this.end.y);
  }
}

function generate() {
  let next = [];

  for (let seg of segs) {
    let v=p5.Vector.sub(seg.end, seg.bgn);
    v.div(3);
    let a = p5.Vector.add(seg.bgn, v);
    let b = p5.Vector.add(a, v);
    v.rotate(-PI/3);
    let c = p5.Vector.add(a,v);
    next.push(new Koch(seg.bgn, a));
    next.push(new Koch(a, c));
    next.push(new Koch(c, b));
    next.push(new Koch(b, seg.end));
  }
  segs = next;
}

function setup()
{
  createCanvas(800, 600);

  const BRDR = 10;
  //segs.push (new Koch(createVector(BRDR, height/2), createVector(width-BRDR, height/2)));

  segs.push (new Koch(createVector(400,100), createVector(600,440)));
  segs.push (new Koch(createVector(600,440), createVector(200,440)));
  //segs.push (new Koch( createVector(200,440), createVector(600,440)));
  segs.push (new Koch(createVector(200,440), createVector(400,100)));

}

function draw() 
{
  background(128);

  stroke(255);
  strokeWeight(3);

  for (let seg of segs) {
    seg.show();
  }
}
