// main routine
// some simple experiments of p5js functions
//   draw_HSBPalette(); try out an HSB palette
//   draw_quilt(); -- quilt
//   patterned_quilt(); -- random quilt
//   vertex_diff(); -- see random shape with curves or hard lines
//   leaf(); -- random leaf like shape using curves
//   leaf2(); -- random leaf with ribs
//   quilt(); -- a quilt pattern
//   dice_quilt(); -- a wall of dice
//   maze_quilt(); -- two triangles in each square rotated

const CHIPSZ = 40;
const ROWS = 10;
const COLS = 10;
const PAGE_MARGIN = 30;
const GUTTER = CHIPSZ * 0.1;

let tblTest;
let MAX_PALETTE; // rows in the palette file


function maze_quilt() {
    // setup
    rectMode(CENTER);
    ellipseMode(CENTER);
    colorMode(HSB,360,100,100);
    noStroke();
    noLoop();

    let iPal = floor(random(MAX_PALETTE));
    let clr1 = floor(random(5));
    let clr2 = clr1
    while (clr2==clr1) {clr2 = floor(random(5));}

    clr1 = get_color(iPal, clr1);
    clr2 = get_color(iPal, clr2);
    let sz2 = CHIPSZ/2;
    let sz4 = CHIPSZ/4;
    // loop the quilt
    for (let y=sz2; y < height-CHIPSZ; y+=CHIPSZ) {
        for (let x=sz2; x < width-CHIPSZ; x+=CHIPSZ) {
            push();
            translate(x, y);
            rotate(PI/2 * floor(random(4)));
            fill(clr1);
            rect(0, 0, CHIPSZ, CHIPSZ);
            fill(clr2);
            //if (random() < 0.5) {triangle(-sz2,-sz2, -sz2,sz2, sz2,sz2); } 
            //else {triangle(-sz2,-sz2, sz2,-sz2, sz2,sz2); }
            triangle(-sz2,-sz2, sz2,-sz2, sz2,sz2);
            pop();
        }
    }
}

function preload() {
    tblHSBPalette = loadTable("cmeHSB.csv", "csv", "header");
    //tblTest = loadTable("testTable.csv", "csv", "header");
}

function get_color(i,j) {
    return [ tblHSBPalette.get(i,j*3),
            tblHSBPalette.get(i,j*3+1),
            tblHSBPalette.get(i,j*3+2)];
}

function setup() {
    // create the canvas
    var widthCanvas = 1200;
    var heightCanvas = 600;
    createCanvas(widthCanvas, heightCanvas);

    // other tests
    //table_test();
    
    // HSB table items
    //print (tblHSBPalette.getRowCount() + ' total rows in HSB table');
    //print (tblHSBPalette.getColumnCount() + ' total cols in HSB table');
    MAX_PALETTE = tblHSBPalette.getRowCount();


    // other setup
    rectMode(CENTER);
    ellipseMode(CENTER);
    colorMode(HSB,360,100,100);
    noLoop();
    //frameRate(0.25);
    console.log ("Setup complete");
}


function draw() {
    clear();
    background ('floralwhite');
    // draw_HSBPalette();
    // draw_quilt();
    // patterned_quilt();
    // vertex_diff();
    // leaf();
    // leaf2();
    // quilt();
    // dice_quilt();
    maze_quilt();

    noLoop();
}


function keyReleased() {
    switch (key) {
        case 'R':
            loop();
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
