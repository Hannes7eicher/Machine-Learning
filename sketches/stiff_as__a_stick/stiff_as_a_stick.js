// Position Variables
let x = 0;
let y = 0;


// Additional Variables
let video;
let poseNet;
let pose;
let skeleton;
var capture;

function setup() {
    createCanvas(640, 480);
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
   // image(video, 0, 0);

    if (pose) {

      let eyeR = pose.rightEye;
      let eyeL = pose.leftEye;
      let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);

      let red = fill(255,0,0);
      //let yellow = fill(255,204,0);
      stroke(255, 204, 0);
      strokeWeight(4);
      line(320, 100, pose.rightEye.x, pose.leftEye.y);
      line(320, 120, pose.rightHip.x, pose.rightHip.y); 


      if (x > width) {
          //println('OFF SCREEN')
      }

    }


}
