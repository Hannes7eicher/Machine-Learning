// Position Variables
let x = 0;
let y = 0;

// Speed - Velocity
let vx = 600;
let vy = 600;

// Acceleration
let ax = 4;
let ay = 4;

let vMultiplier = 0.6;
let bMultiplier = 0.6;

// Additional Variables
let video;
let poseNet;
let pose;
let skeleton;
var capture

function setup() {
    createCanvas(940, 580);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
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

function draw () {
   clear();
    push();
    translate(width,0);
    scale(-1, 1);
    //image(video, 0, 0);

    if (pose) {

      let eyeR = pose.rightEye;
      let eyeL = pose.leftEye;
      let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);

      let yellow = fill(255, 204, 0);
      ellipse(pose.leftWrist.x, pose.leftWrist.y, 24);
      ellipse(pose.rightWrist.x, pose.rightWrist.y, 24);

      ballMove();
      rect(x, y, 55, 50);

      if (x > width) {
          println('OFF SCREEN');
      }

      if(y > height){
        println('OFF SCREEN');
      }

    }


}


function ballMove() {
  let eyeR = pose.rightEye;
  let eyeL = pose.leftEye;
  let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
  ax = accelerationX;
  ay = accelerationY;

  vx = vx + ay;
  vy = vy + ax;
  y = y + vy * vMultiplier;
  x = x + vx * vMultiplier;

  // Bounce when touch the edge of the canvas
  if (x < 0) {
    x = 0;
    vx = -vx * bMultiplier;
  }
  if (y < 0) {
    y = 0;
    vy = -vy * bMultiplier;
  }
  if (x > width - 20) {
    x = width - 20;
    vx = -vx * bMultiplier ;
  }
  if (y > height - 20) {
    y = height - 20;
    vy = -vy * bMultiplier;
  }

  // Change size depending on measurement between eyes
  if (x > pose.rightWrist.x && x < pose.leftWrist.x) {
    rect(x, y, 24, d); 
    fill(102, 102, 51);
  }
}

