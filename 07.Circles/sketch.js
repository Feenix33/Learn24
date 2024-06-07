// 07.Circles and Random Paths
// Play around random circles and paths
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
    background("ghostwhite");
    
    // other setup
    randomSeed(20240607);
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
    //console.log ("mouse (" + mouseX + "," + mouseY + ")");
    loop();
}

function draw() {
    experiment();
    noLoop();
}

/***** ***** ***** ***** EXPERIMENTS ***** ***** ***** *****/

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
function experiment01() {
    // 01 sin circles

    // draw everything
    background(random(['MistyRose', 'AliceBlue', 'GhostWhite', 'WhiteSmoke', 'SeaShell', 'Beige', 'OldLace', 'FloralWhite', 'Ivory', 'AntiqueWhite']));

    push();
    translate (width/2, height/2);
    noFill();
    stroke('red');
    strokeWeight(8);

    let ang=0;
    const numPts = 90; //180; //360;
    const da = TWO_PI/numPts // angle increment
    let x,y, xp, yp;

    const radBase = 50; // base amount for radius
    let rad; // radius variable amount
    let radAng = 0; // current radius angle
    const radCyles = 12; // number of cycles in the rad sinusoid
    let radInc = da*radCyles; // increment per loop

    ang = 0;
    xp = cos(ang) * rad;
    yp = sin(ang) * rad;
    while (ang < TWO_PI) {
        //rad = 2*radBase;
        rad = 2*radBase + radBase * cos(radAng)
        x = cos(ang) * rad;
        y = sin(ang) * rad;

        stroke('red');
        strokeWeight(8);
        point (x, y);

        stroke('blue');
        strokeWeight(1);
        line (x,y, xp, yp);

        xp=x; yp=y;
        ang += da;
        radAng += radInc;
    }


    pop();
    noLoop();
}
/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
function experiment() {
    // 01 sin circles
    // 02 random circumference circles

    // generate the circles
    let ang=0;
    const numPts = 360;
    const da = TWO_PI/numPts // angle increment
    let x,y, xp, yp;
    let pts = []; // array of pts for the circle

    const radBase = 50; // base amount for radius
    let rad; // radius variable amount
    let radAng = 0; // current radius angle
    const radCyles = 12; // number of cycles in the rad sinusoid
    let radInc = da*radCyles; // increment per loop

    ang = 0;
    xp = cos(ang) * rad;
    yp = sin(ang) * rad;
    while (ang < TWO_PI) {
        //rad = 2*radBase;
        rad = 2*radBase + radBase * cos(radAng) + random(radBase);
        x = cos(ang) * rad;
        y = sin(ang) * rad;

        pts.push({x:x, y:y});

        xp=x; yp=y;
        ang += da;
        radAng += radInc;
    }


    // draw everything
    background(random(['MistyRose', 'AliceBlue', 'GhostWhite', 'WhiteSmoke', 'SeaShell', 'Beige', 'OldLace', 'FloralWhite', 'Ivory', 'AntiqueWhite']));

    push();
    translate (width/2, height/2);
    noFill();


    for (n=0; n < pts.length-1; n++) {
        /***
        stroke('red');
        strokeWeight(8);
        point (pts[n].x, pts[n].y);
        ***/
        
        stroke('blue');
        strokeWeight(1);
        line (pts[n].x, pts[n].y, pts[n+1].x, pts[n+1].y);
    }

    pop();
    noLoop();
}
