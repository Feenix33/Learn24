// 09 Clipping
// Play around with clipping
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
    createCanvas(widthCanvas, heightCanvas);

    //colorMode (HSB, 360, 100, 100, 255);
    
    // other setup
    //randomSeed(20240607);
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

function experiment01() {
    // 01 old style clipping

    background(random(['MistyRose', 'AliceBlue', 'GhostWhite', 'WhiteSmoke', 'SeaShell', 'Beige', 'OldLace', 'FloralWhite', 'Ivory', 'AntiqueWhite']));

    stroke('black');

    fill('blue');
    rect( 50, 50, 100,150);
    //canvas.getContext("2d").clip();

    fill('skyblue');
    rect(160, 50, 150,150);
    //canvas.getContext("2d").clip();

    fill ('yellow');
    rect( 75,100, 200, 50);
    canvas.getContext("2d").clip();

    fill('red');
    circle(150,100,50);

    noLoop();
}
/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

function experiment() {
    // 02 new clips

    background(random(['MistyRose', 'AliceBlue', 'GhostWhite', 'WhiteSmoke', 'SeaShell', 'Beige', 'OldLace', 'FloralWhite', 'Ivory', 'AntiqueWhite']));

    stroke('black');

    push();
    beginClip();
    rect( 50, 50, 100,150);
    endClip();

    fill('blue'); rect( 50, 50, 100,150);
    fill ('yellow'); rect( 75,100, 200, 50);
    pop();
    fill('skyblue'); rect(160, 50, 150,150);

    fill('red'); circle(150,100,50);

    noLoop();
}
/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
