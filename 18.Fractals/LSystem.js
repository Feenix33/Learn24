// Nature of Code 
// Experiments and exercises from Dan Shipman's Nature of Code
// 18 Fractals
// 01 Draw a recursive circle
// 02 Draw a Sierpinski trianges
// 03 Draw a fractal trees
// 04 Draw a fractal trees but push segments into stack
// 05 L Systems start

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/



/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
function keyPressed() { if (key == "g") { ; } }
function mousePressed() { generate(); loop(); }

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

let rules;
let sentence;
let axiom;
let angle;
let len;

function initializeLSystem() {
  rules = [];
  rules[0] = {a: "F", b: "FF+[+F-F-F]-[-F+F+F]" }
  len = 100;
  axiom = "F";
  angle = PI/6;
  sentence = axiom;
}

function outSent() {
  print (axiom);
  print (sentence);
}

function generate() {
  len *= 0.5;
  let next = "";
  for (var c=0; c < sentence.length; c++) {
    var ltr = sentence.charAt(c);
    var found = false;
    for (var r=0; r < rules.length; r++) {
      if (ltr == rules[r].a) {
        next += rules[r].b;
        found = true;
        break;
      }
    }
    if (!found) {
      next += ltr;
    }
  }
  sentence = next;
  outSent();
  turtle();
}

function turtle() {
  background(190,100,100);
  resetMatrix();
  translate(width/2, height);


  stroke(255, 100);
  strokeWeight(1);

  for (var c=0; c < sentence.length; c++) {
    var ltr = sentence.charAt(c);
    if (ltr == "F") {
      line(0, 0, 0, -len);
      translate(0, -len);
    }
    else if (ltr == "+") {
      rotate(angle);
    }
    else if (ltr == "-") {
      rotate(-angle);
    }
    else if (ltr == "[") {
      push();
    }
    else if (ltr == "]") {
      pop();
    }
    //else { print ("unhandled ", ltr); }
  }
}

function setup()
{
  createCanvas(800, 600);
  initializeLSystem();
}



function draw() 
{
  background(190,100,100);
  turtle();
  noLoop();
}
