let video;
let pose;
let poseNet;
// let darkness;
// let darkMove;
// let leftW;
// let rightW;
// let leftA;
// let rightA;


function setup(){
    createCanvas(620, 440);
    background(51);
    video = createCapture(VIDEO);
    video.size(620, 440);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
    //frameRate(30); // trying for drawing 'reaches'
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
    
    image(video, 0, 0);
    //drawRect();
    //reach();


    // drawing surrounding rectangles

    //surrounding rectangles
    rect(0, 0, 620, 55);
    rect(0, 385, 620, 55);
    rect(0, 0, 55, 440);
    rect(565, 0, 55, 440);
    noStroke();


    
    

    if(pose) {
       
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
 

// draw rectangle and cut out circle. Supposed to be used so video caption is revealed in the cut out.
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

   let reacher;

    function reach() {
    background(220);
    stroke(9);
    line(width/2, 0, width/2, frameCount*0.2);
}
      