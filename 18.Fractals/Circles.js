// Nature of Code 
// Experiments and exercises from Dan Shipman's Nature of Code
// 18 Fractals
// 01 Draw a recursive circle

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
function keyPressed() { if (key == "r") { print ('hello'); } }
function mousePressed() { }
/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

function setup()
{
  createCanvas(800, 600);

}

function cantor(x, y, len) {
  line(x, y, x+len, y);
  if (len >= 3) {
    cantor(x, y+10, len/3);
    cantor(x+(2*len/3), y+10, len/3);
  }
}

function fractalCircle(x, y, r) {
  circle (x, y, r);
  if (r > 16) { 
    fractalCircle (x+r/2, y, r*0.5);
    fractalCircle (x-r/2, y, r*0.5);
    fractalCircle (x, y+r/2, r*0.5);
    fractalCircle (x, y-r/2, r*0.5);
  }
}

function draw() 
{
  background(100);

  stroke(255);
  noFill();

  // fractalCircle (width/2, height/2, 300);

  strokeWeight(3);
  cantor(0, 10, width);
}
