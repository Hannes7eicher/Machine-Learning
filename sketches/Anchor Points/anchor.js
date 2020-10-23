let video;
let pose;
let poseNet;
let darkness;
let darkMove;
let leftW;
let rightW;
let leftA;
let rightA;
let canvas;

function setup(){
    canvas = createCanvas(620, 440);
    background(51);
    video = createCapture(VIDEO);
    video.size(620, 440);
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

//draw rectangle on top of video capture.
function drawRect(){
    fill();
    rect(127, get.canvas.x, get.canvas.y);

    //fill rectangle until the point of transparent circles contour.
}

function draw() {
    image(video, 0, 0);

    if(pose) {
        fill(244, 0, 0);
        ellipse(pose.rightWrist.x, pose.rightWrist.y, 20);
        ellipse(pose.leftWrist.x, pose.leftWrist.y, 20);
        ellipse(pose.rightAnkle.x, pose.rightAnkle.y, 20);
        ellipse(pose.leftAnkle.x, pose.leftAnkle.y, 20);
        ellipse(pose.rightShoulder.x, pose.rightShoulder.y, 20);
        ellipse(pose.leftShoulder.x, pose.leftShoulder.y, 20);
        ellipse(pose.leftHip.x, pose.leftHip.y, 20);
        ellipse(pose.rightHip.x, pose.leftHip.y, 20);
    }
}

