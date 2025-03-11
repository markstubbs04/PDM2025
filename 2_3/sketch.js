let basicSynth, filt, LFOfilt, panner, fmSynth, values, noise1, noiseEnv, filt1, values1, img, count, flag;

function setup() {
  count=0;
  flag = false;
  img = loadImage("gameover.jpg")
  createCanvas(400, 400);
  panner = new Tone.AutoPanner({
    frequency: 0.1,
    depth: 1
  }).toDestination().start()
  filt = new Tone.Filter(300, "lowpass", -48).connect(panner);
  basicSynth = new Tone.Synth().connect(filt);
  LFOfilt = new Tone.LFO(0.1, 200, 2000).start();
  LFOfilt.connect(filt.frequency);
  fmSynth = new Tone.FMSynth({
    harmonicity: 1,
    modulationIndex: 10
  }).toDestination();
  values = new Float32Array([20]);
  filt1 = new Tone.AutoFilter({
    frequency: 100,
    depth: 0.3,
    baseFrequency: 500,
    octaves: 4
  }).toDestination().start();
  noiseEnv = new Tone.AmplitudeEnvelope({
    attack: 0.01,
    decay: 0.1,
    sustain: 1,
    release: 3
  }).connect(filt1)
  noise1 = new Tone.Noise().connect(noiseEnv).start();
  values1 = new Float32Array([0])
}

function draw() {
  background(220);
  count+=1
  if(mouseIsPressed || flag){
    image(img,0,0,400,400)
    if(count%120==0){
      flag = false;
      count=0
    }
  }
}

function mouseClicked() {
  flag = true;
  count=0
  basicSynth.triggerAttackRelease(500, 2);
  basicSynth.frequency.rampTo(300, 2);
  // LFOfilt.frequency.value = 1;
  // LFOfilt.frequency.rampTo(40, 1);
  // fmSynth.harmonicity.value = 1;
  fmSynth.triggerAttackRelease(100, 2);
  // fmSynth.harmonicity.setValueAtTime(random(0.1, 0.5), "+2.5");
  // fmSynth.harmonicity.setValueCurveAtTime(values, Tone.now(), 10)
}