let poseNet;
let video;
let pose;
let monoSynth;
var button;
let scale = ['C4','D4','E4','F4','G4','A4','B4']

function setup() {
  createCanvas(640, 480);

  video = createCapture(VIDEO);
  video.hide();

  getAudioContext().suspend();

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);

  monoSynth = new p5.MonoSynth();
  
}

function gotPoses(poses) {
  if (poses.length > 0) {
    pose = poses[0].pose;
    playSound();
  }
}

function playSound() {
  let dur = map(pose.leftWrist.y, 0, height, 1/16, 1);
  print(dur)
  let note = floor(map(pose.rightWrist.y, 0, height, 6, 0));

  monoSynth.play(scale[note], 0.5, 0, dur);
}

function modelLoaded() {
  console.log("Model Loaded!!");
}

function draw() {
  image(video, 0, 0);
  if (pose) {
    fill(255);
    noStroke();
    ellipse(pose.leftWrist.x, pose.leftWrist.y, 64);

    fill(0);
    noStroke();
    ellipse(pose.rightWrist.x, pose.rightWrist.y, 64);
  }
}

function mousePressed(){
  userStartAudio();
}
