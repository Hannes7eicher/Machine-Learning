
// Declaring Variables we are going to use
let video;
let poseNet;
let pose;
let skeleton;
let bubbles = [];
let eyes = [];
let count = 0;


//Setting up the video and poseNet
function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);

//for loop which creates bubbles
    for (i = 0; i < 3; i++) {
        bubbles[i] = new Bubble(random(600), random(400));
    }

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
    translate(width,0);
    scale(-1, 1);
    image(video, 0, 0);
    
    if (pose) {

        let eyeR = pose.rightEye;
        let eyeL = pose.leftEye;
        let wristR = pose.rightWrist;
        let wristL = pose.leftWrist;
        let shoulderR = pose.rightShoulder;
        let shoulderL = pose.leftShoulder;
        let elbowR = pose.rightElbow;
        let elbowL = pose.leftElbow;

        //change the size of the wrists according to distance between eyes -> distance between user and camera
        fill(255, 200)

        //draw circles on right eye
        //let circleEye = ellipse(eyeR.x, eyeR.y, 64);

        for (var i = 0; i < bubbles.length; i++) {
            bubbles[i].display();
            bubbles[i].update();
            for (var k = 0; k < eyes.length; k++) {
                if (bubbles[i].intersects(eyes[k])) {
                    bubbles.splice(i, 1);
                    count++;
                    if (count >= 3) {
                        alert("GAME OVER");
                    }
                }   
            }
        }

    
        for (var k = 0; k < eyes.length; k++) {
            eyes[k].display();
    
        }

        for (var k = 0; k < 1; k++) {
            eyes[k] = new Bubble(eyeR.x, eyeR.y);
        }

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
        this.col = ('red');
    }
    // A function which is called to draw the bubble
display = function () {
    stroke(255);
    fill(this.col);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }

intersects = function (other)  {
    var d = dist (this.x, this.y, other.x, other.y);
    if (d < this.r + other.r) {
        return true;
    } else {
        return false;
    }
}   
    
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

// Object declares how the new Bubble should look and behave
class Eye {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 64;
        this.col = 'blue'
    }

    show = function () {
        stroke(255);
        fill(this.col);
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
        }

} 



console.log(bubbles)