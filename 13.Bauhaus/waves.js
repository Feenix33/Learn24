// 13 Bauhaus Grid
// stuff AlexCodesArt.com
// Waves
//
/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

const colors = [
    { "color": "#ecd2b0", "importance": 4 },
    { "color": "#efcea5", "importance": 1 },
    { "color": "#e7b987", "importance": 3 },
    { "color": "#e0ab84", "importance": 2 },
    { "color": "#e7eceb", "importance": 2 },
    { "color": "#72adc5", "importance": 2 },
    { "color": "#3783af", "importance": 2 },
    { "color": "#06649c", "importance": 2 },
    { "color": "#0258a3", "importance": 2 },
    { "color": "#0452a8", "importance": 2 }
];

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
function preload() {}

function setup() {
    cmeLogTime("Started @"); // log start time

    // create the canvas
    createCanvas(400, 500);
    noLoop();
}

function drawWaveWithNoise(curveWidth) {
    let noiseLevel = random(70, 110);
    let noiseScale = random(0.004, 0.008);
    noiseSeed(random(0, 1000));
    // iterate over every pixel
    for (let j=0; j<height; j++) {
        let y = j;
        let noiseInput = noiseScale * j;
        let x = (noiseLevel * noise(noiseInput)) - (j * 0.5);
        line(x, y, x+curveWidth, y);
    }
}

function fillPrefixSum(arr) {
    let prefixSum = [];
    prefixSum[0] = arr[0];
    for (let i=1; i < arr.length; ++i) {
        prefixSum[i] = prefixSum[i-1] + arr[i];
    }
    return prefixSum;
}

function draw() {
    background(colors[colors.length - 1].color);
    let spaceBetween = width / (colors.length - 1);
    let curveWidth;

    let importanceTotal = 0;
    let importanceArr = [];

    for (let i=colors.length-1; i >= 0; i--) {
        importanceTotal += colors[i].imporance;
        importanceArr[i] = colors[i].importance;
    }
    importancePointToPixel = width / importanceTotal;

    prefixSum = fillPrefixSum(importanceArr);

    for (let i = colors.length-1; i >= 0; i--) {
        stroke(colors[i].color);
        drawWaveWithNoise(prefixSum[i] * importancePointToPixel);
    }
}

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/
