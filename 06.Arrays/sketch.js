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

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
function experiment02() {
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

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
function experiment03() {
    // 03 draw a perspective quilt
    // didn't do with quads
    const szBoxTop =  50; // box width at top
    const szBoxBot = 150; // box width at bottom
    let x, y, n;
    let pts = [];

    const nPtsRowH = floor(width/szBoxTop/2) + 1; // max top in horz row halved
    const nPtsRow = (2*nPtsRowH) + 1;
    print ('nPtsRowH=' + nPtsRowH);
    //pts.push({x:0, y:0});

    let delta = szBoxTop;
    for (x=nPtsRowH*(-delta); x <= nPtsRowH*delta; x += delta) {
        pts.push({x:x, y:0});
    }
    delta = szBoxTop + (szBoxBot - szBoxTop)/2;
    for (x=nPtsRowH*(-delta); x <= nPtsRowH*delta; x += delta) {
        pts.push({x:x, y:height/5});
    }
    delta = szBoxBot;
    for (x=nPtsRowH*(-delta); x <= nPtsRowH*delta; x += delta) {
        pts.push({x:x, y:height/5*2});
    }

    // draw everything
    background(random(['MistyRose', 'AliceBlue', 'GhostWhite', 'WhiteSmoke', 'SeaShell', 'Beige', 'OldLace', 'FloralWhite', 'Ivory', 'AntiqueWhite']));
    strokeWeight(8);
    noFill();

    push();
    translate (width/2, height/2);

    stroke('red');
    strokeWeight(8);
    for (pt of pts) {
        point (pt.x, pt.y);
    }

    strokeWeight(1);
    for (n=0; n<nPtsRow; n++) {
        stroke('blue');
        line (pts[n].x,pts[n].y, pts[n+nPtsRow].x,pts[n+nPtsRow].y);
        stroke('green');
        line (pts[n+nPtsRow].x,pts[n+nPtsRow].y, pts[n+nPtsRow*2].x,pts[n+nPtsRow*2].y);
    }

    //horizontals
    let w2 = width/2
    y=0;
    stroke('orange');
    while (y < height/2) {
        line (-w2, y, w2,y);
        y = (y+1) * 1.5;
    }
    pop();

    noLoop();
}

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
function experiment04() {
    // 04 quads a four points elements
    // drawing some log like scales
    const szBox =  50; // box size
    let x, y, n;
    let boxes = [];

    let hBox = szBox;
    let vBox = szBox*0.25;
    y=height/2; 
    while (y < height) {
        hBox = szBox;
        x=szBox/2;
        while (x < width) {
            boxes.push({
                x1: x,       y1: y,
                x2: x+hBox, y2: y,
                x3: x+hBox, y3: y+vBox,
                x4: x,       y4: y+vBox});
            x += hBox;
            hBox *= 1.25;
        }
        y+=vBox;
        vBox *= 1.5;
    }

    // draw everything
    background(random(['MistyRose', 'AliceBlue', 'GhostWhite', 'WhiteSmoke', 'SeaShell', 'Beige', 'OldLace', 'FloralWhite', 'Ivory', 'AntiqueWhite']));
    strokeWeight(8);
    noFill();

    stroke('blue');
    strokeWeight(2);
    for (box of boxes) {
        quad(box.x1,box.y1, box.x2,box.y2, box.x3,box.y3, box.x4,box.y4);
    }

    noLoop();
}

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
function experiment() {
    // 05 new perspective
    const szBox =  50; // box size
    let x, y, n;
    let boxes = [];
    let dy, dx;

    y=height/2; 
    dy = szBox/5;
    while (y < height) {
        dx = 1.25;
        x=1;
        while (x < width) {
            boxes.push({
                x1: x,       y1: y,
                x2: x*dx, y2: y,
                x3: x*dx*dx, y3: y+dy,
                x4: x*dx,       y4: y+dy});
            x *= dx;
            //dx *= 1.25;
        }
        y+=dy;
        dy *= 1.5;
    }

    // draw everything
    background(random(['MistyRose', 'AliceBlue', 'GhostWhite', 'WhiteSmoke', 'SeaShell', 'Beige', 'OldLace', 'FloralWhite', 'Ivory', 'AntiqueWhite']));
    strokeWeight(8);
    noFill();
    push();
    translate(width/2,0);

    stroke('blue');
    strokeWeight(2);
    for (box of boxes) {
        quad(box.x1,box.y1, box.x2,box.y2, box.x3,box.y3, box.x4,box.y4);
    }
    for (box of boxes) {
        quad(-box.x1,box.y1, -box.x2,box.y2, -box.x3,box.y3, -box.x4,box.y4);
    }

    pop();
    noLoop();
}
