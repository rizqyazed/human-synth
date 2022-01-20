let poseNet;
let video;
let pose;
let osc;
var button;

function setup() {
  createCanvas(640, 480);

  video = createCapture(VIDEO);
  video.hide();

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);

  osc = new p5.TriOsc();
  osc.amp(0.5);

  osc.start();
}

function gotPoses(poses) {
  console.log(poses)
  if (poses.length > 0) {
    pose = poses[0].pose;
  }
}

function modelLoaded() {
  console.log("Model Loaded!!");
}

function draw() {
  image(video, 0, 0);
  if (pose) {
    fill(255);
    noStroke();
    ellipse(pose.leftEye.x, pose.leftEye.y, 64);

    fill(255);
    noStroke();
    ellipse(pose.rightEye.x, pose.rightEye.y, 64);

    // let freq = map(pose.leftWrist.x, 0, width, 40, 880);
    // osc.freq(freq);
  
    // let amp = map(pose.leftWrist.y, 0, height, 1, 0.01);
    // osc.amp(amp);
  }
}
