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
var globalDistance = 0;
console.log(globalDistance);

bodies.addEventListener('bodiesDetected', (e) => {
  body = e.detail.bodies.getBodyAt(0)
  const leftWrist = body.getBodyPart(bodyParts.leftWrist)
  const rightWrist = body.getBodyPart(bodyParts.rightWrist)
  const distance = Math.round(body.getDistanceBetweenBodyParts(bodyParts.leftWrist, bodyParts.rightWrist))
  globalDistance = distance;
  document.getElementById('output').innerText = `Position of left wrist: ${leftWrist.position.x}`
  body.getDistanceBetweenBodyParts(bodyParts.leftWrist, bodyParts.rightWrist)
})

// get elements
let video = document.getElementById("video");
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let globalPosition;

// draw the video, nose and eyes into the canvas
function drawCameraIntoCanvas() {

    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;    

  // draw the video element into the canvas
  ctx.drawImage(video, 0, 0, video.width, video.height);
  
  if (body) {
      // draw circle for left and right wrist
      const leftWrist = body.getBodyPart(bodyParts.leftWrist)
      const rightWrist = body.getBodyPart(bodyParts.rightWrist)
      let pos1 = leftWrist.position.x;
      let pos2 = rightWrist.position.y;

      // draw circle on canvas
      var c = document.getElementById("canvas");
      ctx.beginPath();
      ctx.arc(pos1, pos2, 100,0, 2 * Math.PI);
      ctx.fillStyle = 'black';
      ctx.stroke();
      ctx.fill();      
  }
  requestAnimationFrame(drawCameraIntoCanvas)
}

/* ----- run ------ */

// start body detecting 
bodies.start()
// draw video and body parts into canvas continously 
drawCameraIntoCanvas();

