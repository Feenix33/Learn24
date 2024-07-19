// 10 WebGL
// Play around with WebGL
//
//for (pt of pts) { }
//pts.forEach((pt)=> { });

function preload() {}

function setup() {
    // log start time
    var now = new Date();
    console.log(
        "Running @" + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds(),
    );

    // create the canvas
    var widthCanvas = 800;
    var heightCanvas = 500;
    createCanvas(widthCanvas, heightCanvas, WEBGL);
    rectMode(CENTER)
    background(150);
    //rotateX(PI*0.1);
    //rotateY(PI*0.1);
    //rect(0, 0, 200);
    //fill('red'); circle(0,0,200);
    //noStroke();
    //sphere(200);
    //translate(100,100,-300);
    translate(0,0,-300);
    //box(200,300,100);
    rotateX(PI*0.3);
    rotateY(PI*0.3);
    //ellipsoid(200,300,100);
    fill('red');
    cylinder(20,300);

    noLoop();
}


function keyReleased() {
    switch (key) {
        default:
            print("key pressed, value= " + key + " keyCode= " + keyCode);
            break;
    }
}

function mousePressed() {
    console.log ("mouse (" + mouseX + "," + mouseY + ")");
    loop();
}

function draw() {
    experiment();
    noLoop();
}

/***** ***** ***** ***** EXPERIMENTS ***** ***** ***** *****/

function experiment() {
}

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

