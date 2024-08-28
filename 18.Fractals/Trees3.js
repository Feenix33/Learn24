// Nature of Code 
// Experiments and exercises from Dan Shipman's Nature of Code
// 18 Fractals
// 01 Draw a recursive circle
// 02 Draw a Sierpinski trianges
// 03 Draw a fractal trees
// 04 Draw a fractal trees but push segments into stack

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

let branches;

class Branch {
  constructor (pos, len, ang, sw, hue) {
    // ang is from stright up (-pi/2)
    this.bgn = pos.copy();
    this.ang = ang;
    this.len = len;
    //let e = createVector(1, 1).setHeading(ang-PI/2).setMag(len);
    this.end = pos.copy();
    this.end.add( createVector(1, 1).setHeading(ang-PI/2).setMag(len) );
    this.sw = max(sw, 1);
    this.hue = min(hue, 160);
  }
  render() {
    stroke(this.hue, 100,  70);
    strokeWeight(this.sw);
    line(this.bgn.x, this.bgn.y, this.end.x, this.end.y);
  }
}


/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
function keyPressed() {
  if (key == "g") { ; }
}

function mousePressed() {
  regenerate(); loop();
}

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

function regenerate() {
  branches = [];
  branches.push (new Branch(createVector(0, 0), 100, 0, 8, 30) );
  grow(branches[0]);
}

function grow(root) {
  const MUL = 0.65;
  if (root.len >  10) {
    let lim = floor(nrandom(0, 4)) + 2;
    for (let n=0; n < lim; n++) {
      let ang = nrandom(-PI/4, PI/4);
      let mul = nrandom(0.65, 0.82);
      branches.push (new Branch(root.end,  root.len*mul, root.ang+ang, root.sw-2, root.hue*1.2) );
      grow(branches[branches.length-1]);
    }
  }
}

let noiseLevel = 10;
let noiseScale = 0.045;
let nrt= 1;
function nrandom(a, b) {
  // assumes a < b
  let nt = noiseScale * nrt;
  nrt++;
  return (a + noise(nt) * (b-a));
}

function setup()
{
  createCanvas(800, 600);
  colorMode(HSB, 360, 100, 100);
  regenerate();
}



function draw() 
{
  background(190,100,100);

  strokeWeight(1);

  translate(width/2, height);

  for (branch of branches) {
    branch.render();
  }

  noLoop();
}
