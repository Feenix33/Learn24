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
let linem;

function dansTree() {
  rules = [];
  rules[0] = {a: "F", b: "FG+[+F-G-G]-[-G+F+F]" }
  rules[1] = {a: "G", b: "FG+[+F-G-G]-[-G+F+F]" }
  len = 100;
  linem = 0.5;
  axiom = "G";
  angle = PI/6;
  sentence = axiom;
}

function fractalPlant() {
  rules = [];
  rules.push({a: "X", b: "F+[[X]-]-F[-FX]+X" });
  rules.push({a: "F", b: "FF" });
  len = 100;
  linem = 0.5;
  axiom = "X";
  angle = radians(25);
  sentence = axiom;
}

function dragonCurve() {
  rules = [];
  len = 100;
  angle = radians(90);
  axiom = "F";
  linem = 0.8;
  sentence = axiom;
  rules.push({a: "F", b: "F+G" });
  rules.push({a: "G", b: "F-G" });
}


function bushes() {
  rules = [];
  len = 100;
  angle = radians(25.7);
  axiom = "Y";
  linem = 0.6;
  sentence = axiom;
  rules.push({a: "X", b: "X[-FFF][+FFF]FX" });
  rules.push({a: "Y", b: "YFX[+Y][-Y]" });
}

function initializeLSystem() {
  //fractalPlant();
  //dragonCurve();
  bushes();
}

function outSent() {
  print (axiom);
  print (sentence);
  print (sentence.length);
}

function generate() {
  len *= linem;
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
  //translate(width/2, height/2);


  stroke(255, 100);
  strokeWeight(1);

  for (var c=0; c < sentence.length; c++) {
    var ltr = sentence.charAt(c);
    switch (ltr) {
      case "F": // draw the line
      case "G":
        line(0, 0, 0, -len);
        translate(0, -len);
        break;
      case "f": // move but don't draw
      case "g":
        translate(0, -len);
        break;
      case "+":
        rotate(angle);
        break;
      case "-":
        rotate(-angle);
        break;
      case "[":
        push();
        break;
      case "]":
        pop();
        break;
      default:
        break;
    }
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
