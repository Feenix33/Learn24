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
}

let grid, next;
let cell = 10;
let rows, cols;
let land = [];
let dx; // dx = dx ? 0 : 1;

function setup() {
  createCanvas(800, 600);
  rows = floor(height / cell);
  cols = floor(width / cell);
  
  grid = make2DArray(cols, rows);
  next = make2DArray(cols, rows);
  land.push( make2DArray(cols, rows) );
  land.push( make2DArray(cols, rows) );
  dx = 0;
  for (let i=0; i < cols; i++) {
    for (let j=0; j < rows; j++) {
      grid[i][j] = floor(random(2));
      land[dx][i][j] = floor(random(2));
    }
  }
  ellipseMode(CORNER);
}

function countNeighbors(g, ci, ri) {
  let c, r, cnt;
  cnt = 0;
  for (let i=-1; i < 2; i++) {
    c = (i+ci+cols) % cols;
    for (let j=-1; j < 2; j++) {
      r = (j+ri+rows) % rows;
      cnt += g[c][r];
    }
  }
  cnt -= g[ci][ri];
  return cnt;
}

function countNeigh(g, dx, ci, ri) {
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

function draw() {
  background(0);

  for (let i=0; i < cols; i++) {
    for (let j=0; j < rows; j++) {
      //if (grid[i][j]) {
      if (land[dx][i][j]) {
        fill(255);
      }
      else { fill(0); }
      //rect(i*cell, j*cell, cell, cell);
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

  // compute next
  let neigh;
  for (let i=0; i < cols; i++) {
    for (let j=0; j < rows; j++) {
      neigh = countNeighbors(grid, i, j);
      if (grid[i][j]==0 && neigh == 3) next[i][j] = 1;
      else if (grid[i][j] ==1 & (neigh < 2 || neigh > 3)) { next[i][j] = 0; }
      else { next[i][j] = grid[i][j]; }
    }
  }

  // copy next to display
  for (let i=0; i < cols; i++) {
    for (let j=0; j < rows; j++) {
      grid[i][j] = next[i][j];
    }
  }
}

