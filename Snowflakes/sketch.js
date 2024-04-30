// main routine
const FLAKE_SIZE = 175;
const CANVAS_W = 800;
const CANVAS_H = 600;
const ROWS = 3
const COLS = 4
const PAGE_MARGIN = 30;
const GUTTER = 20;

let CRAYONS = [];
let SNOWFLAKES = [];
let gTestFrame = false; // draw test frame toggle-only works on next paint

function setup() {
    // create the canvas
    var widthCanvas = (COLS * FLAKE_SIZE) + 2*PAGE_MARGIN + ((COLS-1)*GUTTER);
    var heightCanvas = (ROWS * FLAKE_SIZE) + 2*PAGE_MARGIN + ((ROWS-1)*GUTTER);
    createCanvas(widthCanvas, heightCanvas);

    // get the colors
    const boxCrayons = cmeGetRandomCanva();
    CRAYONS = boxCrayons.crayons;
    console.log ("Crayons = " + boxCrayons.name);

    // other setup
    angleMode(DEGREES);
    ellipseMode(CENTER);
    rectMode(CENTER);
    noLoop();
}

function draw() {
    noLoop();

    clear();
    //background(220);
    background ('floralwhite');

    for (let x=0; x < COLS; x++) {
        for (let y=0; y < ROWS; y++) {
            const posX = PAGE_MARGIN + (x*FLAKE_SIZE + FLAKE_SIZE/2) + (x*GUTTER);
            const posY = PAGE_MARGIN + (y*FLAKE_SIZE + FLAKE_SIZE/2) + (y*GUTTER);
            SNOWFLAKES.push( new Snowflake(posX, posY) );
        }
    }

    SNOWFLAKES.forEach(aSnowflake => {
        aSnowflake.render();
    })
}


function testFrame(Dim) {
    push();
    translate(Dim/2, Dim/2);
    noFill();
    stroke (color ('blue'));
    strokeWeight(1);
    rect (0, 0, Dim, Dim);
    stroke (color ('blue'));
    circle(0, 0, Dim);
    pop();
}

function keyReleased() {
    switch (key) {
        case 't': // test image
            gTestFrame = !gTestFrame; 
            break;
        default:
            print ("key pressed, value= " + key + " keyCode= " + keyCode);
            break;
    }
}

function mousePressed() {
    //console.log ("mouse (" + mouseX + "," + mouseY + ")");
    loop();
}
