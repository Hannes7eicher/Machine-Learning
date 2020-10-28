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


x = 0;
speed = 3;

// variable for ellipse size

let eSize = 30;
    // variables for ellipses starting point on x axis
let el1 = 0;
let el2 = 0;
let el3 = 0;
let el4 = 0;
let el5 = 0;
let el6 = 0;

  

// -----------------------------------------------------------------------
function setup(){
    createCanvas(620, 440);


   


    //background(51);
    video = createCapture(VIDEO);
    video.size(620, 440);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);


    // color variables for ellipses
    let p = color('pink');
    let m = color('midnight blue'); 
    
    
    


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
    
    background(20, 40);
    //image(video, 0, 0);
    //drawRect();
    //reach();

    // drawing surrounding rectangles
    //fill('m');
    //surrounding rectangles
    // rect(0, 0, 620, 55);
    // rect(0, 385, 620, 55);
    // rect(0, 0, 55, 440);
    // rect(565, 0, 55, 440);
    

   /// ellipse along y axis

   ellipse(67, el1, 40, eSize);
   ellipse(127, el2, 40, eSize);
   ellipse(187, el3, 40, eSize);
   ellipse(247, el4, 40, eSize);
   ellipse(307, el5, 40, eSize);
   ellipse(367, el6, 40, eSize);

       

//ellipses along x axis   

        ellipse(el1, 67, 40, eSize);
        ellipse(el2, 127, 40, eSize);
        ellipse(el3, 187, 40, eSize);
        ellipse(el4, 247, 40, eSize);
        ellipse(el5, 307, 40, eSize);
        ellipse(el6, 367, 40, eSize);

        noStroke();


        fill('white');

    if(pose) {
        
        ellipse(pose.rightWrist.x, pose.rightWrist.y, 10);
        ellipse(pose.leftWrist.x, pose.leftWrist.y, 10);
        ellipse(pose.rightAnkle.x, pose.rightAnkle.y, 10);
        ellipse(pose.leftAnkle.x, pose.leftAnkle.y, 10);
        ellipse(pose.rightShoulder.x, pose.rightShoulder.y, 10);
        ellipse(pose.leftShoulder.x, pose.leftShoulder.y, 10);
        ellipse(pose.leftHip.x, pose.leftHip.y, 10);
        ellipse(pose.rightHip.x, pose.rightHip.y, 10);
        ellipse(pose.rightKnee.x, pose.rightKnee.y, 10);
        ellipse(pose.leftKnee.x, pose.leftKnee.y, 10);
        ellipse(pose.leftEye.x, pose.leftEye.y, 10);
        ellipse(pose.rightEye.x, pose.rightEye.y, 10);
        ellipse(pose.nose.x, pose.nose.y, 10);

        // declaring movement direction of according to width
    el1 = el1 + speed;
    if (el1 > width) {
        speed *= -1;
    }
    if (el1 == 0) {
        speed *= -1;
    }

    el2 = el2 + speed;
    if (el2 > width) {
        speed *= -1;
    }

    if (el2 == 0) {
        speed *= -1;
    }
    
    el3 = el3 + speed;
        if (el3 > width) {
            speed *= -1;
        }
        if (el3 == 0) {
            speed *= -1;
        }

    el4 = el4 + speed;
        if (el4 > width) {
            speed *= -1;
        }
        if (el4 == 0) {
            speed *= -1;
        }

    el5 = el5 + speed;
        if (el5 > width) {
            speed *= -1;
        }
        if (el5 == 0) {
            speed *= -1;
        }

     el6 = el6 + speed;
        if (el6 > width) {
            speed *= -1;
        }
        if (el6 == 0) {
            speed *= -1;
        } 

        //reading position of body parts to manipulate ellipses 
        // if (pose.leftWrist.y || pose.rightWrist.y < pose.nose.y) {

        //     el2 = 3;

        // }

        if (pose.leftWrist.y > pose.nose.y && pose.rightWrist.y < pose.nose.y) {

            el1 = 0;
        }
        
    }

    
      
    }
 


// draw rectangle and cut out circle. Supposed to be used so video caption is revealed in the cut out.
// NOT USED ATM
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

    // NOT USED ATM

   let reacher;

    function reach() {
    background(220);
    stroke(9);
    line(width/2, 0, width/2, frameCount*0.2);
}
      
