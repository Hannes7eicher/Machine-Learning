// Declaring Variables we are going to use
let video;
let poseNet;
let pose;
let skeleton;
let bubbles = [];

//Setting up the video and poseNet
function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);

//for loop which creates bubbles
    for (i = 0; i < 2; i++) {
        bubbles[i] = new Bubble(255, 200);
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
    push();
    translate(width,0);
    scale(-1, 1);
    image(video, 0, 0);

    for (i = 0; i < 2; i++) {
        bubbles[i].display();
        bubbles[i].update();
    }
    
    if (pose) {
        // making additional variables to assign keypoints of poseNet Skeleton
        let eyeR = pose.rightEye;
        let eyeL = pose.leftEye;
        let wristR = pose.rightWrist;
        let wristL = pose.leftWrist;

        //change the size of the wrists according to distance between eyes -> distance between user and camera
        let size = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
        fill(255, 200)
    }
}

// Object declares how the new Bubble should look and behave
class Bubble {
    constructor(x, y, xspeed, yspeed) {
        this.x = x;
        this.y = y;
        this.xspeed = random(-5);
        this.yspeed = random(-2, 0);
        this.r = 48;
        this.col = color(255);
        this.changeColor = function () {
            this.col = color(random(255), random(255), random(255));
        }
    }
    // A function which is called to draw the bubble
display = function () {
    stroke(255);
    fill(this.col);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
    };
    
    // function which gives bubble the bouncing behavior and rules for when the bubble should bounce back.
    update = function () {
    this.x = +this.x + this.xspeed;
    this.y = +this.y + this.yspeed;
    
        if (this.x > width - this.r || this.x < this.r) {
            this.xspeed = -this.xspeed;
        }
        if (this.y > height - this.r || this.y < this.r) {
            this.yspeed = -this.yspeed;
        }
    
    }
} 



