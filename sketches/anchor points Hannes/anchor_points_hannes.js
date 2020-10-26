let video;
let pose;
let poseNet;
let darkness = [];


function setup(){
    createCanvas(620, 440);
    background(51);
    video = createCapture(VIDEO);
    video.size(620, 440);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
    createDarkness();
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



    //surrounding rectangles
    rect(0, 0, 620, 55);
    rect(0, 384, 620, 55);
    rect(0, 0, 55, 440);
    rect(565, 0, 55, 440);
    fill("black");


    
    

    if(pose) {
       
        ellipse(pose.rightWrist.x, pose.rightWrist.y, 20);
        ellipse(pose.leftWrist.x, pose.leftWrist.y, 20);
        ellipse(pose.rightAnkle.x, pose.rightAnkle.y, 20);
        ellipse(pose.leftAnkle.x, pose.leftAnkle.y, 20);
        ellipse(pose.rightShoulder.x, pose.rightShoulder.y, 20);
        ellipse(pose.leftShoulder.x, pose.leftShoulder.y, 20);
        ellipse(pose.leftHip.x, pose.leftHip.y, 20);
        ellipse(pose.rightHip.x, pose.leftHip.y, 20);

        for (var i = 0; i < darkness.length; i++) {
            darkness[i].display();
            darkness[i].update();
        }
        
    }

      
    }

    class Dark {
        constructor(x, y, xspeed, yspeed) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.xspeed = -4;
            this.yspeed = -1;
            this.col = ('black');
        }
        // A function which is called to draw the bubble
    display = function () {
        stroke(255);
        fill(this.col);
        rect(this.x, this.y, this.width, this.height);
        }

        
        // function which gives bubble the bouncing behavior and rules for when the bubble should bounce back.
        update = function () {
        this.x =+ this.x + this.xspeed;
        this.y =+ this.y + this.yspeed;
        
            // if (this.x > width - this.r || this.x < this.r) {
            //     this.xspeed = -this.xspeed;
            // }
            // if (this.y > height - this.r || this.y < this.r) {
            //     this.yspeed = -this.yspeed;
            // }
        
        }
    } 

    createDarkness = function() {
        for (var i = 0; i < 1; i++) {
            darkness[i] = new Dark(600, 350, 1, 1);
        }
    }