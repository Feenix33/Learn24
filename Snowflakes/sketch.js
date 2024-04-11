// main routine
const FLAKE_SIZE = 500;
const CANVAS_W = 800;
const CANVAS_H = 600;

let CRAYONS = [];

function setup() {
    CRAYONS = palMITCHIE.slice(0);
    createCanvas(CANVAS_W, CANVAS_H);
    noLoop();
    angleMode(DEGREES);
    ellipseMode(CENTER);
    rectMode(CENTER);
}

function draw() {
    noLoop();

    clear();
    background(220);
    translate (300, 300);

    testFrame(FLAKE_SIZE);
    /****
    if (random() < 0.35) { someCircles(FLAKE_SIZE); }
    if (random() < 0.35) { drawHexes(FLAKE_SIZE); }
    if (random() < 0.35) { centerShape(FLAKE_SIZE);}
    if (random() < 0.35) { spokeShape(FLAKE_SIZE);}
    if (random() < 0.35) { spokes(FLAKE_SIZE);}
    ****/
    let snowflake = new SpokeFlake(); 
    snowflake.render();
}

function spokes(Diam) {
    console.log ("spokes"); // DEBUG
    stroke(random (CRAYONS));
    strokeWeight( floor (random(1, 6)));
    let xPos = random(0.05,0.5) * Diam;
    push(); {
        for (let n=0; n < 6; n++) {
            line (0, 0, xPos, 0);
            rotate(60);
        }
    } pop();
}

function spokeShape(Diam) {
    // draw shapes on the spoke
    console.log ("spoke shape"); // DEBUG
    noStroke();
    fill(random (CRAYONS));
    let shape = random();
    let radius = random(0.03, 0.16) * Diam;
    let spoke = Diam * random (0.2, 0.4);
    push(); {
        for (let n=0; n < 6; n++) {
            if (shape < 0.25) { circle(spoke, 0, radius*2);
            } else if (shape < 0.5) { polygon(spoke, 0, radius, 6);
            } else if (shape < 0.75) { polygon(spoke, 0, radius, 4);
            } else {polygon(spoke, 0, radius, 3);
            }
            rotate (60);
        }
    }
    pop();
}

function centerShape(Diam) {
    console.log ("center shape"); // DEBUG
    noStroke();
    fill(random (CRAYONS));
    radius = Diam * random(0.5, 0.40);
    if (random() < 0.5) circle (0, 0, radius);
    else polygon(0, 0, radius, 6);
}

function someCircles(Dim) {
    let n = floor(random(1, 10));
    let delta = Dim / n;
    console.log ("circles n=" + n); // DEBUG
    stroke( random (CRAYONS) );
    noFill();
    for (let j=1; j <= n; j++) {
        circle(0, 0, j*delta);
    }
}

function testFrame(Dim) {
    noFill();
    stroke (color ('blue'));
    strokeWeight(1);
    rect (0, 0, Dim, Dim);
    stroke (color ('blue'));
    circle(0, 0, Dim);
}


function mousePressed() {
    console.log ("mouse (" + mouseX + "," + mouseY + ")");
    loop();
}
