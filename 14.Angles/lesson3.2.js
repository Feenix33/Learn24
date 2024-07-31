// 14 Nature of Code Angles
// Experiments and exercises from Dan Shipman's Nature of Code
// 3.2 grab the spinning rect


/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
//function keyReleased() { print("key pressed, value= " + key + " keyCode= " + keyCode); }
//function mousePressed() { console.log ("mouse (" + mouseX + "," + mouseY + ")"); loop(); }

function preload() {}

function setup() {
    // create the canvas
    createCanvas(800, 500);
}

let ang=0;
let avel=0.01;

function draw() {
    background('blue');
    translate(width/2,height/2);

    // axis
    stroke('white');
    strokeWeight(1);
    line(0,-height/2,0,height/2);
    line(-width/2,0,width/2,0);

    if (mouseIsPressed) {
        avel = 0;
        let mx = map(mouseX, 0, width, -width/2, width/2);
        let my = map(mouseY, 0, height, -height/2, height/2);
        let mVect = createVector(mx, my);
        ang = mVect.heading();
    }
    else {
        avel = map(mouseX, 0, width, -0.20, 0.20);
    }
    // shape
    stroke('yellow');
    fill('yellow');
    strokeWeight(5);
    rotate(ang);
    rect(0,-10,150,20);

    ang += avel;
}

