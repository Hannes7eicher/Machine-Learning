let video;
let pose;
let poseNet;
// copy from P5 example: https://p5js.org/examples/motion-morph.html 
// Two ArrayLists to store the vertices for two shapes
// This example assumes that each shape will have the same
// number of vertices, i.e. the size of each ArrayList will be the same
let circle = [];
let square = [];

// An ArrayList for a third set of vertices, the ones we will be drawing
// in the window
let morph = [];

// This boolean variable will control if we are morphing to a circle or square
let state = false;

// -----------------------------------------------------------------------
function setup(){
    createCanvas(620, 440);
    background(51);
    video = createCapture(VIDEO);
    video.size(620, 440);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
    

    // copy from P5 example: https://p5js.org/examples/motion-morph.html
    // Create a circle using vectors pointing from center
  for (let angle = 0; angle < 360; angle += 9) {
    // Note we are not starting from 0 in order to match the
    // path of a circle.
    let v = p5.Vector.fromAngle(radians(angle - 135));
    v.mult(100);
    circle.push(v);
    // Let's fill out morph ArrayList with blank PVectors while we are at it
    morph.push(createVector());
  }

  // A square is a bunch of vertices along straight lines
  // Top of square
  for (let x = -50; x < 50; x += 10) {
    square.push(createVector(x, -50));
  }
  // Right side
  for (let y = -50; y < 50; y += 10) {
    square.push(createVector(50, y));
  }
  // Bottom
  for (let x = 50; x > -50; x -= 10) {
    square.push(createVector(x, 50));
  }
  // Left side
  for (let y = 50; y > -50; y -= 10) {
    square.push(createVector(-50, y));
  }

}

function gotPoses(poses) {
    console.log(poses);
    if (poses.length > 0) {
        pose = poses[0].pose;
        skeleton = poses[0].skeleton;
    }
}


function modelLoaded() {
   console.log('poseNet ready');
}




function draw() {
    
    //image(video, 0, 0);
    //drawRect();
    //reach();

    background('grey');

    // drawing surrounding rectangles

    //surrounding rectangles
    rect(0, 0, 620, 55);
    rect(0, 385, 620, 55);
    rect(0, 0, 55, 440);
    rect(565, 0, 55, 440);
    fill('pink');
    //noStroke();

    if(pose) {
       
        ellipse(pose.rightWrist.x, pose.rightWrist.y, 20);
        ellipse(pose.leftWrist.x, pose.leftWrist.y, 20);
        ellipse(pose.rightAnkle.x, pose.rightAnkle.y, 20);
        ellipse(pose.leftAnkle.x, pose.leftAnkle.y, 20);
        ellipse(pose.rightShoulder.x, pose.rightShoulder.y, 20);
        ellipse(pose.leftShoulder.x, pose.leftShoulder.y, 20);
        ellipse(pose.leftHip.x, pose.leftHip.y, 20);
        ellipse(pose.rightHip.x, pose.leftHip.y, 20);

        
    }

// Copy from P5 example: https://p5js.org/examples/motion-morph.html

// We will keep how far the vertices are from their target
let totalDistance = 0;

// Look at each vertex
for (let i = 0; i < circle.length; i++) {
  let v1;
  // Are we lerping to the circle or square?
  if (state) {
    v1 = circle[i];
  } else {
    v1 = square[i];
  }
  // Get the vertex we will draw
  let v2 = morph[i];
  // Lerp to the target
  v2.lerp(v1, 0.1);
  // Check how far we are from target
  totalDistance += p5.Vector.dist(v1, v2);
}

// If all the vertices are close, switch shape
if (totalDistance < 0.1) {
  state = !state;
}

// Draw relative to center
translate(width / 2, height / 2);
strokeWeight(4);
// Draw a polygon that makes up all the vertices
beginShape();
noFill();
stroke(255);

morph.forEach(v => {
  vertex(v.x, v.y);
});
endShape(CLOSE);
    
    

   

      
    }
 

// draw rectangle and cut out circle. Supposed to be used so video caption is revealed in the cut out.
    function drawRect() {
        //image(video, 0, 0);

        //draw();
        
        rect(0, 0, 620, 55);
        fill('pink');
        noStroke();

        rect(0, 0, 620, 55);
        fill('blue');
        noStroke();

    //erases ellipse within black rectangle
        // erase(200, 0);
        // ellipse(300, 220, 420);
        // noErase();

    
    }

   let reacher;

    function reach() {
    background(220);
    stroke(9);
    line(width/2, 0, width/2, frameCount*0.2);
}
      