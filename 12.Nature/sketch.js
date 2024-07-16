// 12 Nature of Code
// Experiments and exercises from Dan Shipman's Nature of Code
//
//for (pt of pts) { }
//pts.forEach((pt)=> { });
// ternary operator: let r = (x > b) ? t : f
// eg = [1, 2, 3...]; res=eg.filter(x => x<99);

//import cmeHelpers;

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
let walker;
let mover;

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
function preload() {}

function setup() {
    // log start time
    var now = new Date();
    console.log(
        "Running @" + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds(),
    );

    // create the canvas
    createCanvas(800, 500);
    //walker = new Walker(200, 200); 
    //moverA = new Mover (200, 200,1.5,1.5,color(255,0,0));
    //moverB = new Mover (400, 300,3,20,color(0,0,255));
    mover = new Mover(200, 200);
    background('blue');
    angleMode(DEGREES);
    colorMode(HSB,360,100,100);
}


function keyReleased() {
    switch (key) {
        default:
            print("key pressed, value= " + key + " keyCode= " + keyCode);
            break;
    }
}

/***
function mousePressed() {
    console.log ("mouse (" + mouseX + "," + mouseY + ")"); loop();
    //print (walker.pos.x, walker.pos.y);
}
***/

function draw() {
    //walker.update();
    //walker.show();
    //randomVectors();
    // perlinVectors();
    background(0);
    //moverA.target(moverB.pos.x, moverB.pos.y);
    //moverB.target(moverA.pos.x, moverA.pos.y);
    //moverA.show();
    //moverB.show();

    if (mouseIsPressed) {
        let wind = createVector(0.1, 0);
        mover.applyForce(wind);
    }
    let gravity = createVector(0, 0.2);
    mover.applyForce(gravity);
    mover.update();
    mover.edges();
    mover.show();
}

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
function randomVectors() {
    // draw some random unit vectors
    translate(width/2, height/2);
    let v = p5.Vector.random2D();
    v.mult(random(50,100));

    strokeWeight(4);
    stroke('yellow');
    line(0,0, v.x, v.y);
}

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
let inc = 0.1;
let start = 0;
let ang = 0;
function perlinVectors() {
    let xoff = start;
    let v = createVector(1,1);
    v.setMag(noise(xoff)*height/4);
    v.setHeading(ang);

    strokeWeight(1);
    stroke(color(ang,100,100));

    push();
    translate(width/4, height/2);
    line(0,0, v.x, v.y);
    pop();

    push();
    translate(3*width/4, height/2);
    v.setMag(random()*100);
    //v.setMag(200);
    line(0,0, v.x, v.y);
    pop();

    start += inc;
    ang += 0.2;
    if (ang > 360.) {ang -= 360.;}
}

