// main routine
const FLAKE_SIZE = 100;
const ROWS = 4
const COLS = 8
const PAGE_MARGIN = 30;
const BUTTON_ROW = 40;
const GUTTER = 20;

let btnCrayons;  // change the crayon color

let CRAYONS = [];
let SNOWFLAKES = [];
let gTestFrame = false; // draw test frame toggle-only works on next paint
let CRAYON_NAME = "";

function setup() {
    // create the canvas
    var widthCanvas = (COLS * FLAKE_SIZE) + 2*PAGE_MARGIN + ((COLS-1)*GUTTER);
    var heightCanvas = (ROWS * FLAKE_SIZE) + 2*PAGE_MARGIN + ((ROWS-1)*GUTTER) + BUTTON_ROW;
    createCanvas(widthCanvas, heightCanvas);

    // get the colors
    random_palette();

    // other setup
    angleMode(DEGREES);
    ellipseMode(CENTER);
    rectMode(CENTER);
    noLoop();

    // user interface
    btnCrayons = createButton('Crayons', 'red');
    btnCrayons.position (PAGE_MARGIN+GUTTER, PAGE_MARGIN);
    btnCrayons.mousePressed (random_palette);
}

function random_palette() {
    // get the colors
    const boxCrayons = cmeGetRandomCanva();
    CRAYONS = boxCrayons.crayons;
    //console.log ("Crayons = " + boxCrayons.name);
    CRAYON_NAME = boxCrayons.name;
    loop();
}

function draw() {
    noLoop();

    clear();
    //background(220);
    background ('floralwhite');

    stroke(0);
    strokeWeight(1);
    textSize(15);
    text (CRAYON_NAME,PAGE_MARGIN+GUTTER+100, PAGE_MARGIN);

    for (let x=0; x < COLS; x++) {
        for (let y=0; y < ROWS; y++) {
            const posX = PAGE_MARGIN + (x*FLAKE_SIZE + FLAKE_SIZE/2) + (x*GUTTER);
            const posY = PAGE_MARGIN + (y*FLAKE_SIZE + FLAKE_SIZE/2) + (y*GUTTER) + BUTTON_ROW;
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
        case 'p': // palette (duplicate w/button)
            random_palette();
            break;
    }
}

function mousePressed() {
    //console.log ("mouse (" + mouseX + "," + mouseY + ")");
    loop();
}
