// @ts-nocheck


/* ----- setup ------ */

// sets up a bodystream with configuration object
const bodies = new BodyStream ({
  posenet: posenet,
  architecture: modelArchitecture.MobileNetV1, 
  detectionType: detectionType.singleBody, 
  videoElement: document.getElementById('video'), 
  samplingRate: 250})

let body

//Variables for drawing the ball
let color = "green";

bodies.addEventListener('bodiesDetected', (e) => {
body = e.detail.bodies.getBodyAt(0)
const distance = Math.round(body.getDistanceBetweenBodyParts(bodyParts.leftWrist, bodyParts.leftAnkle))
document.getElementById('output').innerText = `Distance between wrists: ${distance}`
body.getDistanceBetweenBodyParts(bodyParts.leftWrist, bodyParts.leftAnkle)
})

// get elements
let video = document.getElementById("video");
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// draw the video, nose and eyes into the canvas
function drawCameraIntoCanvas() {

// draw the video element into the canvas
ctx.drawImage(video, 0, 0, video.width, video.height);

if (body) {
    // draw circle for left and right wrist
    const distance = Math.round(body.getDistanceBetweenBodyParts(bodyParts.leftWrist, bodyParts.leftAnkle))
    const leftWrist = body.getBodyPart(bodyParts.leftWrist)
    const rightWrist = body.getBodyPart(bodyParts.rightWrist)
    const leftEye = body.getBodyPart(bodyParts.rightEye)
    const rightEye = body.getBodyPart(bodyParts.leftEye)
    const leftAnkle = body.getBodyPart(bodyParts.leftAnkle)

  drawBall();

  if (distance < 50) {
    color = "red";
  } else { 
    color = "green";
  }

}
requestAnimationFrame(drawCameraIntoCanvas)
}

/* ----- run ------ */

// start body detecting 
bodies.start()
// draw video and body parts into canvas continously 
drawCameraIntoCanvas();

function drawBall() {
    // Draw Ball
    ctx.beginPath();
    ctx.arc(250, 250, 50 ,0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.stroke();
    ctx.fill();    
}
