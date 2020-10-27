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

bodies.addEventListener('bodiesDetected', (e) => {
  body = e.detail.bodies.getBodyAt(0)
  const leftWrist = body.getBodyPart(bodyParts.leftWrist)
  const rightWrist = body.getBodyPart(bodyParts.rightWrist)
  const distance = Math.round(body.getDistanceBetweenBodyParts(bodyParts.leftWrist, bodyParts.rightWrist))
  
  globalDistance = distance;
  document.getElementById('output').innerText = `Position of left wrist: ${distance}`
  body.getDistanceBetweenBodyParts(bodyParts.leftWrist, bodyParts.rightWrist)
 // console.log(rightWrist.position.y);
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
  //ctx.drawImage(video, 0, 0, video.width, video.height);
  
  if (body) {
      // draw circle for left and right wrist
      const leftWrist = body.getBodyPart(bodyParts.leftWrist)
      const rightWrist = body.getBodyPart(bodyParts.rightWrist)
      const rightHip = body.getBodyPart(bodyParts.rightHip)
      const distance = Math.round(body.getDistanceBetweenBodyParts(bodyParts.leftWrist, bodyParts.rightWrist))

      var col1 = leftWrist.speed.absoluteSpeed / 2;
      var col2 = rightWrist.speed.absoluteSpeed / 2;
      var col3 = rightHip.speed.absoluteSpeed;

      if (col1 > 150) {
        ctx.fillStyle = ('black');
      }

        ctx.beginPath();
        ctx.rect(0, 0, 540, 480);
        ctx.fillStyle = 'rgb('+ col1 + ', '+ col2 + ', '+ col3 + ')';
        ctx.fill();
      

      let dis = distance -100;

      console.log(leftWrist.speed.absoluteSpeed);

      if (dis <= 0) {
          dis = 10; 
      }
     
  }
  requestAnimationFrame(drawCameraIntoCanvas)
}

/* ----- run ------ */

// start body detecting 
bodies.start()
// draw video and body parts into canvas continously 
drawCameraIntoCanvas();

