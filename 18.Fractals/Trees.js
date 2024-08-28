// Nature of Code 
// Experiments and exercises from Dan Shipman's Nature of Code
// 18 Fractals
// 01 Draw a recursive circle

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
function keyPressed() {
  if (key == "g") { generate(); }
}

function mousePressed() {loop(); }

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

function setup()
{
  createCanvas(800, 600);
  print ('trees');
}

function tree(len, sw) {
  strokeWeight(sw);
  line(0, 0, 0, -len);
  translate(0, -len);
  len *= 0.67;
  //len *= random(0.5, 0.9); //0.67;
  sw = max(1, sw-1);
 
  if (len > 4) {
    let n = Math.floor(random(1,4));
    n += 1;
    for (let i=0; i < n; i++) {
      let ang = random(-PI*4/10, PI*4/10);
      push();
      rotate(ang);
      tree(len, sw);
      pop();
    }
  }
}

function branch(len, sw, ang) {
  strokeWeight(sw);
  line(0, 0, 0, -len);
  translate (0, -len);
  len *= 0.67;
  sw = max(1, sw-1);
  if (len > 2) {
    push();
    rotate(ang);
    branch(len, sw, ang);
    pop();

    push();
    rotate(-ang);
    branch(len, sw, ang);
    pop();
  }
}

function draw() 
{
  background(128);

  strokeWeight(1);

  push();
  stroke('yellow');
  translate(width/2, height);
  tree(150, 8);
  //branch(150, 8, PI/6);
  pop();

  push();
  stroke('green');
  translate(width/4, height);
  tree(150, 8);
  pop();

  push();
  stroke('red');
  translate(3*width/4, height);
  tree(random(100,200), 8);
  pop();
  /****
  ****/

  noLoop();
}
