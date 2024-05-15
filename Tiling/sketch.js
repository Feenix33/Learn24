// Tilings
// generate and create images with tiles
// learn offscreen buffer
// simple - draw random simple 
// wang2e - draw wang2e and follow the rules

const CHIPSZ = 50;
const PAGE_MARGIN = 30;
const GUTTER = CHIPSZ * 0.1;
const TILE = 100; // tilesize
const WANG_TILE = 32; // wang file tilesize
let Tileset; // tileset
let wangtile; // wang base set
const xWang = [0,0,1,1, 0,0,1,1, 3,3,2,2, 3,3,2,2]; // tile # x pos in wang tileset
const yWang = [3,2,3,2, 0,1,0,1, 3,2,3,2, 0,1,0,1];
let grid = [];
let gridMaxRow = 5;
let gridMaxCol = 8;
let wangFiles; // list of wang files
let wangset = [];


function buildWangGrid() {
    // build the grid
    let vn, vs, ve, vw; // values nsew
    for (let r=0; r < gridMaxRow; r++) { // y dir
        grid[r] = [];
        for (let c=0; c < gridMaxCol; c++) {
            if (r>0) {vn = (grid[r-1][c] & 0x4) ? 0x1 : 0x0; } else { vn = (random()<0.5) ? 0x1 : 0; }
            if (c>0) {vw = (grid[r][c-1] & 0x2) ? 0x8 : 0x0; } else { vw = (random()<0.5) ? 0x8 : 0; }
            ve = (random()<0.5) ? 0x2 : 0;
            vs = (random()<0.5) ? 0x4 : 0;
            grid[r][c] = (vn | vs | ve | vw);
        }
    }
}

function cleanWangGrid() {
    // delete all the edges on the edges (no offscreen paths)
    // top and bottom row
    for (let c=0; c< gridMaxCol; c++) {
        grid[0][c] = grid[0][c] & 14;
        grid[gridMaxRow-1][c] = grid[gridMaxRow-1][c] & 11;
    }
    // left and right side
    for (let r=0; r<gridMaxRow; r++) {
        grid[r][0] = grid[r][0] & 7;
        grid[r][gridMaxCol-1] = grid[r][gridMaxCol-1] & 13;
    }
}

function placeWangSet(sn, n, x, y, d) {
    // n=tile number, xpos on buffer, ypos, d draw dimension
    let tx = xWang[n]*WANG_TILE;
    let ty = yWang[n]*WANG_TILE;
    image(wangset[sn], x,y, d, d, tx,ty, WANG_TILE, WANG_TILE);
}

function placeWang(n, x, y, d) {
    // n=tile number, xpos on buffer, ypos, d draw dimension
    let tx = xWang[n]*WANG_TILE;
    let ty = yWang[n]*WANG_TILE;
    image(wangtile, x,y, d, d, tx,ty, WANG_TILE, WANG_TILE);
}

function loadWangTilesets () {
    for (let j=0; j < wangFiles.length-1; j++) {
        if (wangFiles[j].length > 0)
            wangset[j] = loadImage(wangFiles[j]);
    }
}

function preload() {
    wangtile = loadImage('../assets/Wang2Edge/wang2e.png');
    wangFiles = loadStrings('wang.txt',loadWangTilesets);
}

function setup() {
    // log start time
    var now = new Date();
    console.log ("Running @"
        + now.getHours() + ":"
        + now.getMinutes() + ":"
        + now.getSeconds()
    );

    // create the canvas
    var widthCanvas = 1200;
    var heightCanvas = 600;
    createCanvas(widthCanvas, heightCanvas);

    // other setup
    colorMode(HSB,360,100,100);
    noLoop();

    gridMaxRow = floor(height / CHIPSZ);
    gridMaxCol = floor(width / CHIPSZ);
}

function keyReleased() {
    switch (key) {
        case 'R': loop(); break;
        default: print ("key pressed, value= " + key + " keyCode= " + keyCode); break;
    }
}

function mousePressed() {
    //console.log ("mouse (" + mouseX + "," + mouseY + ")");
    loop();
}

function draw() {
    clear();
    background ('floralwhite');

    //draw_simples(); // *** simples ***

    /** wang2e **/
    let x=0;
    let y=0;
    
    buildWangGrid();
    cleanWangGrid();

    sn = floor(random(wangset.length));
    // draw the grid
    for (let r=0; r < gridMaxRow; r++) {
        y = r*CHIPSZ;
        for (let c=0; c < gridMaxCol; c++) {
            x = c*CHIPSZ;
            //placeWang(grid[r][c], x, y, CHIPSZ);
            placeWangSet(sn, grid[r][c], x, y, CHIPSZ);
        }
    }

    /** wang2e **/

    noLoop();
}
