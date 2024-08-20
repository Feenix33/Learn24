// Nature of Code 
// Experiments and exercises from Dan Shipman's Nature of Code
// 17 Game of Life

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i=0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

function keyPressed() {
  if (key == "l") { print("hello"); }
}

function mousePressed() {
  let x = floor(mouseX / cell);
  let y = floor(mouseY / cell);
  land[dx][x][y] = 1;
}

let cell = 10;
let rows, cols;
let land = [];
let dx; // dx = dx ? 0 : 1;

function setup() {
  createCanvas(800, 600);
  rows = floor(height / cell);
  cols = floor(width / cell);
  
  land.push( make2DArray(cols, rows) );
  land.push( make2DArray(cols, rows) );
  dx = 0;
  for (let i=0; i < cols; i++) {
    for (let j=0; j < rows; j++) {
      land[dx][i][j] = floor(random(2));
    }
  }
  ellipseMode(CORNER);
}


function countNeigh(g, dx, ci, ri) {
  let c, r, cnt;
  cnt = 0;
  for (let i=-1; i < 2; i++) {
    c = (i+ci+cols) % cols;
    for (let j=-1; j < 2; j++) {
      r = (j+ri+rows) % rows;
      if (g[dx][c][r] > 0) cnt += 1;
    }
  }
  if (g[dx][ci][ri] > 0) cnt -= 1;
  return cnt;
}

function OLDcountNeigh(g, dx, ci, ri) {
  let c, r, cnt;
  cnt = 0;
  for (let i=-1; i < 2; i++) {
    c = (i+ci+cols) % cols;
    for (let j=-1; j < 2; j++) {
      r = (j+ri+rows) % rows;
      cnt += g[dx][c][r];
    }
  }
  cnt -= g[dx][ci][ri];
  return cnt;
}

function OLDdraw() {
  background(0);

  for (let i=0; i < cols; i++) {
    for (let j=0; j < rows; j++) {
      //fill (land[dx][i][j]);
      if (land[dx][i][j]) fill(255);
      else fill(0);
      circle(i*cell, j*cell, cell);
    }
  }

  // compute next
  let cnt;
  let nx = dx ? 0 : 1;
  for (let i=0; i < cols; i++) {
    for (let j=0; j < rows; j++) {
      cnt = countNeigh(land, dx, i, j);
      if (land[dx][i][j]==0 && cnt == 3) land[nx][i][j] = 1;
      else if (land[dx][i][j] ==1 & (cnt < 2 || cnt > 3)) { land[nx][i][j] = 0; }
      else { land[nx][i][j] = land[dx][i][j]; }
    }
  }
  dx = nx;

}


function draw() {
  background(0);

  for (let i=0; i < cols; i++) {
    for (let j=0; j < rows; j++) {
      if (land[dx][i][j]) fill (land[dx][i][j] + 100);
      else fill(0);
      circle(i*cell, j*cell, cell);
    }
  }

  // compute next
  let cnt;
  let nx = dx ? 0 : 1;
  for (let i=0; i < cols; i++) {
    for (let j=0; j < rows; j++) {
      cnt = countNeigh(land, dx, i, j);
      if (land[dx][i][j]==0 && cnt == 3) land[nx][i][j] = 1;
      else if (land[dx][i][j] >= 1 & (cnt < 2 || cnt > 3)) { land[nx][i][j] = 0; }
      else { 
        if (land[dx][i][j] >= 1) {
          land[nx][i][j] = land[dx][i][j] + 1;
        }
        else {
          land[nx][i][j] = land[dx][i][j];
        }
        if (land[nx][i][j] > 155) land[nx][i][j] = 155;
      }
    }
  }
  dx = nx;

}

