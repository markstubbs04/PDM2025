let startContext, samples, sampler, button1, button2;

function preload(){
  // sampler = new Tone.Player("meow.mp3").toDestination()
  samples = new Tone.Players({
    cat: "meow.mp3",
    seagull: "seagull.mp3"
  }).toDestination();
}

function setup() {
  createCanvas(400, 400);
  startContext = createButton('Start Audio Context');
  startContext.position(0,0);
  startContext.mousePressed(startAudioContext);
  button1 = createButton("meow");
  button1.position(10,30);
  button2 = createButton("squaaak");
  button2.position(100,30);
  button1.mousePressed(()=>{samples.player("cat").start()});
  button2.mousePressed(()=>{samples.player("seagull").start()});
  // button1.mousePressed(() => sampler.start());
}

function draw() {
  background(220);
}

// function playSample(){
//   sampler.start();
// }


function startAudioContext(){
  if(Tone.context.state != 'running'){
    Tone.start()
    console.log("audio context started")
  }else{
    console.log("Audio context is already running")
  }
}