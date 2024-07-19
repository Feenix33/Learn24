// 14 Nature of Code Angles
// Experiments and exercises from Dan Shipman's Nature of Code


/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
//function keyReleased() { print("key pressed, value= " + key + " keyCode= " + keyCode); }
//function mousePressed() { console.log ("mouse (" + mouseX + "," + mouseY + ")"); loop(); }

function preload() {}

function setup() {
    // create the canvas
    createCanvas(800, 500);
}

let ang=0;
let avel=0.18;
let aacc=-0.001;

function draw() {
    background('blue');
    stroke('yellow');
    strokeWeight(5);
    translate(width/2,height/2);
    rotate(ang);
    line(0,0,100,0);

    ang += avel;
    avel += aacc;
    if (avel < 0) {avel = 0; aacc=0;}
}

