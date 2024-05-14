// grids.js
// various experiments
// moved from sketch.js to here to simplify the code

function leaf2() {
    rectMode(CORNER);
    translate (0, 250);
    stroke(0);
    fill('SeaGreen');
    strokeWeight(1);
    //noStroke();

    let x1=30;
    let y1=0;
    let x5=480;
    let y5=0;

    let x2=random( 80,180);
    let x3=random(200,320);
    let x4=random(350,450);

    let y2=random(50,100);
    let y3=random(80, 200);
    let y4=random(50, 200);

    beginShape();
    curveVertex(x1,y1);
    curveVertex(x1,y1);
    curveVertex(x2,y2);
    curveVertex(x3,y3);
    curveVertex(x4,y4);
    curveVertex(x5,y5);
    curveVertex(x5,y5);
    endShape();

    beginShape();
    curveVertex(x1,y1);
    curveVertex(x1,y1);
    curveVertex(x2,-y2);
    curveVertex(x3,-y3);
    curveVertex(x4,-y4);
    curveVertex(x5,y5);
    curveVertex(x5,y5);
    endShape();
    
    strokeWeight( 3);
    stroke('YellowGreen');
    line (x1,y1, x5,y5);
    line (x2,y2, x2-30,0);
    line (x2,-y2, x2-30,0);
    line (x3,y3, x3-50,0);
    line (x3,-y3, x3-50,0);
    line (x4,y4, x4-70,0);
    line (x4,-y4, x4-70,0);
    /****
    line (x2,y2, x2*0.8,0);
    line (x2,-y2, x2*0.8,0);
    line (x3,y3, x3*0.8,0);
    line (x3,-y3, x3*0.8,0);
    line (x4,y4, x4*0.8,0);
    line (x4,-y4, x4*0.8,0);
    ****/
    //print (x2*.2,x3*.2,x4*.2);
}

function leaf() {
    //console.log('leaf start');
    rectMode(CORNER);
    translate (0, 250);
    stroke(0);
    fill('green');
    strokeWeight(1);
    //noStroke();

    let x1=30;
    let y1=0;
    let x4=480;
    let y4=0;

    let x2=random(100,250);
    let y2=random(50,200);
    let x3=random(300,460);
    let y3=random(50, 200);

    beginShape();
    curveVertex(x1,y1);
    curveVertex(x1,y1);
    curveVertex(x2,y2);
    curveVertex(x3,y3);
    curveVertex(x4,y4);
    curveVertex(x4,y4);
    endShape();

    beginShape();
    curveVertex(x1,y1);
    curveVertex(x1,y1);
    curveVertex(x2,-y2);
    curveVertex(x3,-y3);
    curveVertex(x4,y4);
    curveVertex(x4,y4);
    endShape();
    
    strokeWeight(10);
    stroke('red');
    point(x2,y2);
    point(x3,y3);
    point(x2,-y2);
    point(x3,-y3);

    //console.log('leaf fini');
}

function vertex_diff() {

  stroke (0);
  beginShape();
  vertex(100,100); vertex(150,150); vertex(200,150);
  vertex(250,50); vertex(300,100); vertex(300,160);
  vertex(200,340); vertex(100,100);
  endShape();

  stroke(1,100,100);
  noFill();
  beginShape();
  curveVertex(100,100); //anchor point
  curveVertex(100,100); curveVertex(150,150); curveVertex(200,150);
  curveVertex(250,50); curveVertex(300,100); curveVertex(300,160);
  curveVertex(200,340); curveVertex(100,100);
  curveVertex(100,100); //anchor point
  endShape(); //CLOSE optional
}

function patterned_quilt() {
    let iPal = floor(random(MAX_PALETTE));
    for (let y=0; y < ROWS; y++) {
        let yPos = PAGE_MARGIN+CHIPSZ*y;
        for (let x=0; x < COLS; x++) {
            let xPos = PAGE_MARGIN+CHIPSZ*x;
            fill( get_color(iPal, floor(random(5))) );
            let chShape = floor(random(4));
            switch (chShape) {
                case 0:
                    square(xPos, yPos, CHIPSZ); break;
                case 1:
                    circle(xPos, yPos, CHIPSZ); break;
                case 2:
                    triangle(xPos-CHIPSZ/2,yPos-CHIPSZ/2, xPos+CHIPSZ/2,yPos, xPos-CHIPSZ/2,yPos+CHIPSZ/2);
                    break;
                case 3:
                    triangle(xPos+CHIPSZ/2,yPos+CHIPSZ/2, xPos,yPos-CHIPSZ/2, xPos-CHIPSZ/2,yPos+CHIPSZ/2);
                    break;
                default:
                    fill(0);
                    square(xPos, yPos, CHIPSZ); break;
            }
        }
    }
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

