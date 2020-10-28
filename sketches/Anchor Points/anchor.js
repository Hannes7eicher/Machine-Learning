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
speed1 = 3;
speed2 = 3;
speed3 = 3;
speed4 = 3;
speed5 = 3;
speed6 = 3;

speed7 = 3;
speed8 = 3;
speed9 = 3;
speed10 = 3;
speed11 = 3;
speed12 = 3;
// variable for ellipse size

let eSize = 30;
    // variables for ellipses starting point on x axis
let el1 = 0;
let el2 = 0;
let el3 = 0;
let el4 = 0;
let el5 = 0;
let el6 = 0;
// variables for ellipses on y axis
let el7 = 0;
let el8 = 0;
let el9 = 0;
let el10 = 0;
let el11 = 0;
let el12 = 0;

  

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
        
        // noStroke();
        // ellipse(pose.rightWrist.x, pose.rightWrist.y, 10);
        // ellipse(pose.leftWrist.x, pose.leftWrist.y, 10);
        // ellipse(pose.rightAnkle.x, pose.rightAnkle.y, 10);
        // ellipse(pose.leftAnkle.x, pose.leftAnkle.y, 10);
        // ellipse(pose.rightShoulder.x, pose.rightShoulder.y, 10);
        // ellipse(pose.leftShoulder.x, pose.leftShoulder.y, 10);
        // ellipse(pose.leftHip.x, pose.leftHip.y, 10);
        // ellipse(pose.rightHip.x, pose.rightHip.y, 10);
        // ellipse(pose.rightKnee.x, pose.rightKnee.y, 10);
        // ellipse(pose.leftKnee.x, pose.leftKnee.y, 10);
        // ellipse(pose.leftEye.x, pose.leftEye.y, 10);
        // ellipse(pose.rightEye.x, pose.rightEye.y, 10);
        // ellipse(pose.nose.x, pose.nose.y, 10);

        

        // declaring movement directions of ellipses according to width
    el1 = el1 + speed1;
    if (el1 > width) {
        speed1 *= -1;
    }
    if (el1 == 0) {
        speed1 *= -1;
    }

    el2 = el2 + speed2;
    if (el2 > width) {
        speed2 *= -1;
    }

    if (el2 == 0) {
        speed2 *= -1;
    }
    
    el3 = el3 + speed3;
        if (el3 > width) {
            speed3 *= -1;
        }
        if (el3 == 0) {
            speed3 *= -1;
        }

    el4 = el4 + speed4;
        if (el4 > width) {
            speed4 *= -1;
        }
        if (el4 == 0) {
            speed4 *= -1;
        }

    el5 = el5 + speed5;
        if (el5 > width) {
            speed4 *= -1;
        }
        if (el5 == 0) {
            speed5 *= -1;
        }

     el6 = el6 + speed6;
        if (el6 > width) {
            speed6 *= -1;
        }
        if (el6 == 0) {
            speed6 *= -1;
        } 

        el7 = el7 + speed7;
        if (el7 > height) {
            speed7 *= -1;
        }
        if (el7 == 0) {
            speed7 *= -1;
        }
    
        el8 = el8 + speed8;
        if (el8 > height) {
            speed8 *= -1;
        }
    
        if (el8 == 0) {
            speed8 *= -1;
        }
        
        el9 = el9 + speed9;
            if (el9 > height) {
                speed9 *= -1;
            }
            if (el9 == 0) {
                speed9 *= -1;
            }
    
        el10 = el10 + speed10;
            if (el10 > height) {
                speed10 *= -1;
            }
            if (el10 == 0) {
                speed10 *= -1;
            }
    
        el11 = el11 + speed11;
            if (el11 > height) {
                speed11 *= -1;
            }
            if (el11 == 0) {
                speed11 *= -1;
            }
    
         el12 = el12 + speed12;
            if (el12 > height) {
                speed12 *= -1;
            }
            if (el12 == 0) {
                speed12 *= -1;
            } 

        //reading position of body parts to manipulate individual ellipses behavior

        if (pose.leftWrist.y || pose.rightWrist.y < pose.nose.y) {

            el2 = 0;

        }

        if (pose.leftWrist.y > pose.nose.y && pose.rightWrist.y < pose.nose.y) {

            el1 = 0;
        }

        if(pose.leftHip.x > width/2) {

            el6 = 0;
            el5 = 0;
        }


        
    }

    
      
    };
 


// draw rectangle and cut out circle. Supposed to be used so video caption is revealed in the cut out.
// NOT USED ATM
    // function drawRect() {
    //     //image(video, 0, 0);

    //     //draw();
        
    //     rect(0, 0, 620, 55);
    //     fill('pink');
    //     noStroke();

    //     rect(0, 0, 620, 55);
    //     fill('blue');
    //     noStroke();

    //erases ellipse within black rectangle
        // erase(200, 0);
        // ellipse(300, 220, 420);
        // noErase();

    
    // }

    // NOT USED ATM

//    let reacher;

//     function reach() {
//     background(220);
//     stroke(9);
//     line(width/2, 0, width/2, frameCount*0.2);
// }
      
