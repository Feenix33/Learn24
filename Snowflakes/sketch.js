// main routine
const FLAKE_SIZE = 500;
const CANVAS_W = 800;
const CANVAS_H = 600;

let CRAYONS = [];

function setup() {
    //CRAYONS = palMITCHIE.slice(0);
    CRAYONS = palDEEP_AUTUMN_1.slice(0);
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
    //translate (300, 300);

    //testFrame(FLAKE_SIZE);
    let snowflake = new Snowflake(300,300); 
    snowflake.render();
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
    //console.log ("mouse (" + mouseX + "," + mouseY + ")");
    loop();
}
