let video;
let poseNet;
let pose;
let skeleton;

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}


function gotPoses(poses) {
    // console.log(poses);
     if (poses.length > 0) {
         pose = poses[0].pose;
         skeleton = poses[0].skeleton;
     }
 }


function modelLoaded() {
    console.log('poseNet ready');
}


function draw() {
    push();
    image(video, 0, 0);

<<<<<<< HEAD
    if (pose) {
        noStroke();
=======
    if (pose) { 

>>>>>>> 6f519fc2644f81d5776593bde2b166955a52fa76
        fill(255, 0, 0);
        ellipse(pose.nose.x, pose.nose.y, 64);
        
    }
}

