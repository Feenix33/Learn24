// main routine

const CHIPSZ = 50;
const ROWS = 10;
const COLS = 10;
const PAGE_MARGIN = 30;
const GUTTER = CHIPSZ * 0.1;

let tblTest;
let MAX_PALETTE; // rows in the palette file

function preload() {
    tblHSBPalette = loadTable("cmeHSB.csv", "csv", "header");
    //tblTest = loadTable("testTable.csv", "csv", "header");
}
function draw_HSBPalette() {
    let maxRow = tblHSBPalette.getRowCount();
    let maxCol = tblHSBPalette.getColumnCount(); // should be 15
    for (let y=0; y < maxRow; y++) {
        let yPos = PAGE_MARGIN+(CHIPSZ + GUTTER)*y;
        let xPos = PAGE_MARGIN;
        for (let x=0; x < maxCol; x+= 3) {
            let h = int(tblHSBPalette.get(y,x));
            let s = int(tblHSBPalette.get(y,x+1));
            let v = int(tblHSBPalette.get(y,x+2));
            fill(color(h,s,v));
            square(xPos, yPos, CHIPSZ);
            xPos += CHIPSZ;
        }
    }
}

function get_color(i,j) {
    return [ tblHSBPalette.get(i,j*3),
            tblHSBPalette.get(i,j*3+1),
            tblHSBPalette.get(i,j*3+2)];
}

function draw_quilt() {
    let iPal = floor(random(MAX_PALETTE));
    console.log ("Palette row = " + iPal);
    for (let y=0; y < ROWS; y++) {
        let yPos = PAGE_MARGIN+CHIPSZ*y;
        for (let x=0; x < COLS; x++) {
            let xPos = PAGE_MARGIN+CHIPSZ*x;
            let ci1 = floor(random(5));
            let ci2 = ci1;
            while (ci2 == ci1) {ci2 = floor(random(5))};
            let clr1 = get_color(iPal, ci1);
            let clr2 = get_color(iPal, ci2);
            fill(clr1);
            square(xPos, yPos, CHIPSZ);
            fill(clr2);
            circle(xPos, yPos, CHIPSZ/2);
        }
    }
}

function setup() {
    // create the canvas
    var widthCanvas = 800;
    var heightCanvas = 1200;
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
    //draw_HSBPalette();
    draw_quilt();

    noLoop();
}


// ************************************************************
// test routines
// ************************************************************
let hexTestColor;

function table_test() {
    // illustrates working with a table
    // Header: ID,Color,R,G,B,Hex
    //print (tblTest);
    print (tblTest.getRowCount() + ' total rows in test table');
    print (tblTest.getColumnCount() + ' total cols in test table');
    print ('Color Names:');
    print (tblTest.getColumn('Color'));
    let rows = tblTest.getRows();
    print ('rows');
    print (rows[1]);
    print (tblTest.get(1, 1));
    let hexColor = tblTest.get(3,5);
    print ('hexColor = ' + hexColor);
    hexTestColor = tblTest.get(4,5);
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
