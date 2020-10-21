// Declaring Variables we are going to use
let video;
let poseNet;
let pose;
let skeleton;

var b1;
//var b2;


//Setting up the video and poseNet
function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);

    //create a new Object
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
        // making additional variables to assign keypoints of poseNet Skeleton
        let eyeR = pose.rightEye;
        let eyeL = pose.leftEye;
        let wristR = pose.rightWrist;
        let wristL = pose.leftWrist;

        //change the size of the wrists according to distance between eyes -> distance between user and camera
        let size = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
        fill(255, 200)
        ellipse(wristR.x, wristR.y, size);
        ellipse(wristL.x, wristL.y, size);

        //checking distance between bouncing ball (new Bubble) and wrists 
        var d1 = dist(b1.x, b1.y, wristR.x, wristR.y);
        var d2 = dist(b1.x, b1.y, wristL.x, wristL.y);

        //if they collide the bouncing bubble changes color randomly for as long as they touch each other
        if (d1 < b1.r + size || d2 < b1.r + size) {
            b1. changeColor();
        } 
    }
}

// Object declares how the new Bubble should look and behave
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


    // A function which is called to draw the bubble
    this.display = function() {
        stroke(255);
        fill(this.col);
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }

    // function which gives bubble the bouncing behavior and rules for when the bubble should bounce back.
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

