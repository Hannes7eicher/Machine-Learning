let video;
let poseNet;
let pose;
let skeleton;

var b1;
//var b2;

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);

    b1 = new Bubble(255,200);
    //b2 = new Bubble(255,200);

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
    push();
    translate(width,0);
    scale(-1, 1);
    image(video, 0, 0);

    b1.update();
    //b2.update();
    b1.display();
    //b2.display();

    if (pose) {
        let eyeR = pose.rightEye;
        let eyeL = pose.leftEye;
        let wristR = pose.rightWrist;
        let wristL = pose.leftWrist;

        let size = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
        fill(255, 200)
        ellipse(wristR.x, wristR.y, size);
        ellipse(wristL.x, wristL.y, size);

        var d1 = dist(b1.x, b1.y, wristR.x, wristR.y);
        var d2 = dist(b1.x, b1.y, wristL.x, wristL.y);
        
        if (d1 < b1.r + size || d2 < b1.r + size) {
            b1. changeColor();
        } 
    }
}

function Bubble(x, y, xspeed, yspeed) {
    this.x = x;
    this.y = y;
    this.xspeed = -5;
    this.yspeed = -2;
    this.r = 48;
    this.col = color(255);
    this.changeColor = function() {
        this.col = color(random(255), random(255), random(255));
    }



    this.display = function() {
        stroke(255);
        fill(this.col);
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }

    this.update = function() {
        this.x =+ this.x + this.xspeed;
        this.y =+ this.y + this.yspeed; 
        
        if (this.x > width - this.r || this.x < this.r) {
            this.xspeed = -this.xspeed;
          }
          if (this.y > height - this.r || this.y < this.r) {
            this.yspeed = -this.yspeed;
          }
        
    }
} 


