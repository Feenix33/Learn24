// 13 Bauhaus Grid
// Bauhaus Grid from AlexCodesArt.com
//
//for (pt of pts) { }
//pts.forEach((pt)=> { });
// ternary operator: let r = (x > b) ? t : f
// eg = [1, 2, 3...]; res=eg.filter(x => x<99);

//import cmeHelpers;

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
let rows = 4;
let cols = 4;
let vertMargin = 40;
let horzMargin = 40;
let borderRadius = 40;
let cellWidth, cellHeight;
let vertPadding, horzPadding;

let colors = ["#000000", "#5090ae", "#ed5731", "#f8a31e"];

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
function preload() {}

function setup() {
    cmeLogTime("Started @"); // log start time

    // create the canvas
    //createCanvas(400, 400);
    createCanvas(500, 500);
    cellWidth = (width - horzMargin) / cols;
    cellHeight = (height - vertMargin) / rows;
    vertPadding = cellHeight / 15;
    horzPadding = cellWidth / 15;
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
    console.log ("mouse (" + mouseX + "," + mouseY + ")"); loop();
}

function getBorderRadius(colIndex) {
    switch(colIndex) {
        //case 0: return [0, 0, 0, 0]; 
        case 0: return [borderRadius/2, borderRadius/3, borderRadius/4, 2*borderRadius]; 
        case 1: return [0, 0, 0, borderRadius]; 
        case 2: return [0, borderRadius, 0, borderRadius]; 
        case 3: return [borderRadius, borderRadius, 0, borderRadius]; 
        case 4: return [borderRadius, borderRadius, borderRadius, borderRadius]; 
        default: return [0, 0, 0, 0]; 
    }
}

function draw() {
    background("#ece2c8");
    noStroke();
    translate(horzMargin/2, vertMargin/2);

    for (let i=0; i < rows; i++) {
        for (let j=0; j < cols; j++) {
            fill(colors[(j+i) % colors.length]);

            let radius = getBorderRadius(j);

            rect( horzPadding / 2, vertPadding /2,
                cellWidth - horzPadding, cellHeight - vertPadding,
                ...radius);
            translate(cellWidth, 0);
        }
        translate(-cols*cellWidth, cellHeight);
    }
}

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
