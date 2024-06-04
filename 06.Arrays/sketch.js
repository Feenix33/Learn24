// 06.Arrays
// Play around with arrays
//

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
    randomSeed(240531);
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
function experiment01() {
    // 01 quads
    const szBox = 100; // nominal size of a box (tile)
    let x, y, n;
    let xpts = [], ypts=[]; // array of the corners

    // generate corner matrices
    const boxesPerRow = int (width/szBox) - 1; // boxes per row
    const boxesPerCol = int (height/szBox) - 1; // boxes per row
    const offX = (width-(boxesPerRow*szBox))/2;
    const offY = (height-(boxesPerCol*szBox))/2; 
    const rndLim = szBox / 4;
    //print("boxesPerRow = " + boxesPerRow);
    //print("boxesPerCol = " + boxesPerCol);

    for (y=offY; y < height; y+= szBox) {
        for (x=offX; x < width; x+=szBox) {
            xpts.push(x + random(-rndLim,rndLim));
            ypts.push(y + random(-rndLim,rndLim));
        }
    }

    // draw the quads
    background(random(['MistyRose', 'AliceBlue', 'GhostWhite', 'WhiteSmoke', 'SeaShell', 'Beige', 'OldLace', 'FloralWhite', 'Ivory', 'AntiqueWhite']));
    stroke('blue');
    strokeWeight(8);
    noFill();

    /**** access pts linearly ***/
    for (n=0; n < xpts.length; n++) {
        point(xpts[n], ypts[n]);
    }

    /**** access pts box by box ***/
    strokeWeight(2);
    stroke('red');
    for (y=0; y < boxesPerCol; y++) {
        for (x=0; x < boxesPerRow; x++) {
            n = x+y*(boxesPerRow+1);
            fill(color(random(255),random(255),random(255),random(128)+128));
            quad (xpts[n], ypts[n], xpts[n+1], ypts[n+1],
                    xpts[n+boxesPerRow+2],ypts[n+boxesPerRow+2],
                    xpts[n+boxesPerRow+1],ypts[n+boxesPerRow+1]);

        }
    }
    
    /***/
    //print ("Number of points = " + xpts.length);
    noLoop();
}
function experiment() {
    // 02 push x and y
    const szBox = 100; // nominal size of a box (tile)
    let x, y, n;
    let pts = [];

    // generate corner matrices
    const boxesPerRow = int (width/szBox) - 1; // boxes per row
    const boxesPerCol = int (height/szBox) - 1; // boxes per row
    const offX = (width-(boxesPerRow*szBox))/2;
    const offY = (height-(boxesPerCol*szBox))/2; 
    const rndLim = szBox / 3;

    for (y=offY; y < height; y+= szBox) {
        for (x=offX; x < width; x+=szBox) {
            pts.push({x:x+ random(-rndLim,rndLim), 
                y:y+ random(-rndLim,rndLim)});
        }
    }

    // draw the quads
    background(random(['MistyRose', 'AliceBlue', 'GhostWhite', 'WhiteSmoke', 'SeaShell', 'Beige', 'OldLace', 'FloralWhite', 'Ivory', 'AntiqueWhite']));
    strokeWeight(8);
    noFill();

    for (y=0; y < boxesPerCol; y++) {
        for (x=0; x < boxesPerRow; x++) {
            n = x+y*(boxesPerRow+1);

            stroke('blue');
            quad (pts[n].x, pts[n].y, pts[n+1].x, pts[n+1].y,
                    pts[n+boxesPerRow+2].x,pts[n+boxesPerRow+2].y,
                    pts[n+boxesPerRow+1].x,pts[n+boxesPerRow+1].y);

            stroke('red');
            let dent = 15;
            quad (pts[n].x+dent,               pts[n].y+dent, 
                  pts[n+1].x-dent,             pts[n+1].y+dent,
                  pts[n+boxesPerRow+2].x-dent, pts[n+boxesPerRow+2].y-dent,
                  pts[n+boxesPerRow+1].x+dent, pts[n+boxesPerRow+1].y-dent);

            stroke('yellow');
            dent += 15;
            quad (pts[n].x+dent,               pts[n].y+dent, 
                  pts[n+1].x-dent,             pts[n+1].y+dent,
                  pts[n+boxesPerRow+2].x-dent, pts[n+boxesPerRow+2].y-dent,
                  pts[n+boxesPerRow+1].x+dent, pts[n+boxesPerRow+1].y-dent);
        }
    }
    noLoop();
}
