// 16 Nature of Code 
// Experiments and exercises from Dan Shipman's Nature of Code
//  6 Autonomous 
// 01 simple but with sliders in html
// 02 complex, all behaviors
// 02 add the update behavior on the target
// 02 adding a slider
// 03 try angleBetween example
// 04 scalar projection
// 05 simple path follow
// 06 complex path follow
// 07 added flow fields and followers


/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

class FlowField {
  constructor() {
    this.resolution = 20;
    this.arrow = this.resolution * 0.45;
    this.cols = floor(width / this.resolution);
    this.rows = floor(height / this.resolution);
    this.field = new Array(this.cols);
    for (let i = 0; i < this.cols; i++) {
      this.field[i] = new Array(this.rows);
    }
    this.init(0);
  }
  init() {
    noiseSeed(random(10000));
    let xoff=0;
    for (let i = 0; i < this.cols; i++) {
      let yoff=0;
      for (let j = 0; j < this.rows; j++) {
        //this.field[i][j] = createVector(-1,1);
        //this.field[i][j] = p5.Vector.random2D();
        let angle = map(noise(xoff, yoff), 0, 1, 0, TWO_PI);
        this.field[i][j] = p5.Vector.fromAngle(angle);
        yoff+=0.1;
      }
      xoff+=0.1;
    }
  }
  render() {
    stroke(0);
    strokeWeight(1);
    let x, y;
    for (let j = 0; j < this.rows; j++) {
      y = (this.resolution/2) + j*this.resolution;
      x = this.resolution / 2;
      for (let i = 0; i < this.cols; i++) {
        push();
        translate(x, y);
        let v = this.field[i][j]; // not a copy

        /****
        rectMode(CENTER);
        stroke('yellow');
        noFill();
        strokeWeight(1);
        rect(0,0,this.resolution, this.resolution);
        ****/

        rotate(v.heading());

        fill('red'); stroke('red'); circle(0,0,3); // at center

        stroke(0);
        line(0,0, this.arrow, 0);
        line(this.arrow-2, 2, this.arrow, 0);
        line(this.arrow-2,-2, this.arrow, 0);
        pop();

        x += this.resolution;
      }
    }
  }
  lookup(pos) {
    let col = constrain(floor(pos.x / this.resolution), 0, this.cols-1);
    let row = constrain(floor(pos.y / this.resolution), 0, this.rows-1);
    return this.field[col][row].copy();
  }
}

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

class Path {
  constructor() {
    // Arbitrary radius of 20
    // A path has a radius, i.e how far is it ok for the boid to wander off
    this.radius = 20;
    // A Path is an arraylist of points (PVector objects)
    this.points = [];
  }

  // Add a point to the path
  addPoint(x, y) {
    let point = createVector(x, y);
    this.points.push(point);
  }

  // Draw the path
  display() {
    strokeJoin(ROUND);

    // Draw thick line for radius
    stroke(175);
    strokeWeight(this.radius * 2);
    noFill();
    beginShape();
    for (let v of this.points) {
      vertex(v.x, v.y);
    }
    endShape(CLOSE);
    // Draw thin line for center of path
    stroke(0);
    strokeWeight(1);
    noFill();
    beginShape();
    for (let v of this.points) {
      vertex(v.x, v.y);
    }
    endShape(CLOSE);
  }
}

/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

class Vehicle {
  // Constructor initialize all values
  constructor(x, y, ms, mf, clr=null) {
    this.position = createVector(x, y);
    this.r = 12;
    this.maxspeed = ms;
    this.maxforce = mf;
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(this.maxspeed, 0);
    this.clr = clr ? clr : 128;
  }

  applyForces(f, s) {
    f.mult(3);
    s.mult(1);
    // Accumulate in acceleration
    this.applyForce(f);
    this.applyForce(s);
  }

  applySeeker(vehicles) {
    // Separate from other boids force
    let s = this.separate(vehicles);
    // seek the mouse
    let f = this.seek(createVector(mouseX, mouseY));
    this.applyForces(f,s);
  }

  // A function to deal with path following and separation
  applyBehaviors(vehicles, path, flow=null, tgt=null) {
    // Follow path force

    let f;
    if (path != null) {
      f = this.follow(path);
    }
    else if (flow != null) {
      // Follow flow field
      f = this.follow_flow(flow);
    }
    else if (tgt != null) {
      //f = this.follow_tgt(tgt);
      f = this.follow_tgt(tgt);
    }


    // Separate from other boids force
    let s = this.separate(vehicles);
    this.applyForces(f,s);
  }

  applyForce(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }

  // Main "run" function
  run() {
    this.update();
    this.render();
  }

  follow_tgt(tgt) {
    let desired = tgt.position;
    desired.setMag(this.maxspeed);

    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    //this.applyForce(steer);
    return steer;
  }

  follow_flow(flow) {
    let desired = flow.lookup(this.position);
    desired.setMag(this.maxspeed);

    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    //this.applyForce(steer);
    return steer;
  }

  // This function implements Craig Reynolds' path following algorithm
  // http://www.red3d.com/cwr/steer/PathFollow.html
  follow(path) {
    // Predict position 25 (arbitrary choice) frames ahead
    let predict = this.velocity.copy();
    predict.normalize();
    predict.mult(25);
    let predictpos = p5.Vector.add(this.position, predict);

    // Now we must find the normal to the path from the predicted position
    // We look at the normal for each line segment and pick out the closest one
    let normal = null;
    let target = null;
    let worldRecord = 1000000; // Start with a very high worldRecord distance that can easily be beaten

    // Loop through all points of the path
    for (let i = 0; i < path.points.length; i++) {
      // Look at a line segment
      let a = path.points[i];
      let b = path.points[(i + 1) % path.points.length]; // Note Path has to wraparound

      // Get the normal point to that line
      let normalPoint = getNormalPoint(predictpos, a, b);

      // Check if normal is on line segment
      let dir = p5.Vector.sub(b, a);
      // If it's not within the line segment, consider the normal to just be the end of the line segment (point b)
      //if (da + db > line.mag()+1) {
      if (
        normalPoint.x < min(a.x, b.x) ||
        normalPoint.x > max(a.x, b.x) ||
        normalPoint.y < min(a.y, b.y) ||
        normalPoint.y > max(a.y, b.y)
      ) {
        normalPoint = b.copy();
        // If we're at the end we really want the next line segment for looking ahead
        a = path.points[(i + 1) % path.points.length];
        b = path.points[(i + 2) % path.points.length]; // Path wraps around
        dir = p5.Vector.sub(b, a);
      }

      // How far away are we from the path?
      let d = p5.Vector.dist(predictpos, normalPoint);
      // Did we beat the worldRecord and find the closest line segment?
      if (d < worldRecord) {
        worldRecord = d;
        normal = normalPoint;

        // Look at the direction of the line segment so we can seek a little bit ahead of the normal
        dir.normalize();
        // This is an oversimplification
        // Should be based on distance to path & velocity
        dir.mult(25);
        target = normal.copy();
        target.add(dir);
      }
    }

    // Draw the debugging stuff
    if (debug) {
      // Draw predicted future position
      stroke(0);
      fill(0);
      line(this.position.x, this.position.y, predictpos.x, predictpos.y);
      ellipse(predictpos.x, predictpos.y, 4, 4);

      // Draw normal position
      stroke(0);
      fill(0);
      ellipse(normal.x, normal.y, 4, 4);
      // Draw actual target (red if steering towards it)
      line(predictpos.x, predictpos.y, target.x, target.y);
      if (worldRecord > path.radius) fill(255, 0, 0);
      noStroke();
      ellipse(target.x, target.y, 8, 8);
    }

    // Only if the distance is greater than the path's radius do we bother to steer
    if (worldRecord > path.radius) {
      return this.seek(target);
    } else {
      return createVector(0, 0);
    }
  }

  // Separation
  // Method checks for nearby boids and steers away
  separate(boids) {
    let desiredseparation = this.r * 2;
    let steer = createVector(0, 0, 0);
    let count = 0;
    // For every boid in the system, check if it's too close
    for (let i = 0; i < boids.length; i++) {
      let other = boids[i];
      let d = p5.Vector.dist(this.position, other.position);
      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if (d > 0 && d < desiredseparation) {
        // Calculate vector pointing away from neighbor
        let diff = p5.Vector.sub(this.position, other.position);
        diff.normalize();
        diff.div(d); // Weight by distance
        steer.add(diff);
        count++; // Keep track of how many
      }
    }
    // Average -- divide by how many
    if (count > 0) {
      steer.div(count);
    }

    // As long as the vector is greater than 0
    if (steer.mag() > 0) {
      // Implement Reynolds: Steering = Desired - Velocity
      steer.normalize();
      steer.mult(this.maxspeed);
      steer.sub(this.velocity);
      steer.limit(this.maxforce);
    }
    return steer;
  }

  // Method to update position
  update() {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelertion to 0 each cycle
    this.acceleration.mult(0);
  }

  // A method that calculates and applies a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  seek(target) {
    let desired = p5.Vector.sub(target, this.position); // A vector pointing from the position to the target

    // Normalize desired and scale to maximum speed
    desired.normalize();
    desired.mult(this.maxspeed);
    // Steering = Desired minus Vepositionity
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce); // Limit to maximum steering force

    return steer;
  }

  render() {
    // Simpler boid is just a circle
    fill(this.clr);
    stroke(0);
    push();
    translate(this.position.x, this.position.y);
    ellipse(0, 0, this.r, this.r);
    pop();
  }
}

// A function to get the normal point from a point (p) to a line segment (a-b)
// This function could be optimized to make fewer new Vector objects
function getNormalPoint(p, a, b) {
  // Vector from a to p
  let ap = p5.Vector.sub(p, a);
  // Vector from a to b
  let ab = p5.Vector.sub(b, a);
  ab.normalize(); // Normalize the line
  // Project vector "diff" onto line by using the dot product
  ab.mult(ap.dot(ab));
  let normalPoint = p5.Vector.add(a, ab);
  return normalPoint;
}
/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/


/***** ***** ***** ***** ***** ***** ***** ***** ***** *****/

// Using this variable to decide whether to draw all the stuff
let debug = false;

// A path object (series of connected points)
let path;

// Two vehicles
let vehicles = [];
let blewies = [];

function setup() {
  //createCanvas(640, 360);
  createCanvas(800, 600);

  // create the flowfield
  field = new FlowField();

  // Call a function to generate new Path object
  newPath();

  // We are now making random vehicles and storing them in an ArrayList
  for (let i = 0; i < 10; i++) {
    newVehicle(random(width), random(height), color('green'));
  }
  // createP("Hit 'd' to toggle debugging lines.<br/>Click the mouse to generate new vehicles.");

}

function draw() {
  background(240);

  // Display the field
  //field.render();

  // Display the path
  // path.display();

  /*****
  for (let v of blewies) {
    // Path following and separation are worked on in this function
    v.applyBehaviors(vehicles, null, field, null);
    // Call the generic run method (update, borders, display, etc.)
    v.run();
  }
  *****/

  for (let v of vehicles) {
    // Path following and separation are worked on in this function
    /***
    if (blewies.length > 0) { v.applyBehaviors(vehicles, null, null, blewies[0]); }
    else { v.applyBehaviors(vehicles, path, null); }
    ***/
    v.applySeeker(vehicles);
    // Call the generic run method (update, borders, display, etc.)
    v.run();
  }
}

function newPath() {
  // A path is a series of connected points
  // A more sophisticated path might be a curve
  path = new Path();
  let offset = 30;
  path.addPoint(offset, offset);
  path.addPoint(width - offset, offset);
  path.addPoint(width - offset, height - offset);
  path.addPoint(width / 2, height - offset * 3);
  path.addPoint(offset, height - offset);
}

function newVehicle(x, y, clr=null) {
  let maxspeed = random(2, 4);
  let maxforce = 0.3;
  vehicles.push(new Vehicle(x, y, maxspeed, maxforce, clr));
}

function newBlewie(x, y, clr=null) {
  let maxspeed = random(2, 4);
  let maxforce = 0.3;
  blewies.push(new Vehicle(x, y, maxspeed, maxforce, clr));
}

function keyPressed() {
  if (key == "d") { debug = !debug; }
  if (key == "l") { print("#vehicles = ",vehicles.length); }
}

function mousePressed() {
  newVehicle(mouseX, mouseY, color('blue'));
  //newBlewie(mouseX, mouseY, color('blue'));
}
