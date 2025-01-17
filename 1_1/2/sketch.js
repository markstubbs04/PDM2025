function setup() {
  createCanvas(400, 400);
  colorMode(HSB);
}

function draw() {
  background(255);

  fill(0,100,100,0.4);
  strokeWeight(0);
  circle(150,100,100);
  fill(100,100,100,0.4);
  circle(180,150,100);
  fill(200,100,100,0.4);
  circle(120,150,100);
}
