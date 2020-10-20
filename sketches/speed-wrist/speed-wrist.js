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

bodies.addEventListener('bodiesDetected', (e) => {
  body = e.detail.bodies.getBodyAt(0)
  const distance = Math.round(body.getDistanceBetweenBodyParts(bodyParts.leftShoulder, bodyParts.rightShoulder))
  document.getElementById('output').innerText = `Speed of right wrist: ${speed}`
  body.getDistanceBetweenBodyParts(bodyParts.leftShoulder, bodyParts.rightShoulder)
})

// get elements
let video = document.getElementById("video");
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// draw the video, nose and eyes into the canvas
function drawCameraIntoCanvas() {

    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

  // draw the video element into the canvas
  //ctx.drawImage(video, 0, 0, video.width, video.height);
  
  if (body) {
      // draw circle according to right wrist speed
      const rightWrist = body.getBodyPart(bodyParts.rightWrist);
      const speed = Math.round(body.getBodyPart(bodyParts.rightWrist));

      var canvas = document.getElementById("canvas");
      ctx.beginPath();
      ctx.arc(550, 360, speed, 0, 2 * Math.PI);
      ctx.fillStyle = 'salmon';
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