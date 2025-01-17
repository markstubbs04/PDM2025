function setup() {
  createCanvas(300, 300);
  colorMode(HSB);
}

function draw() {
  background(255,100,50);

  fill(150,100,50);
  strokeWeight(5);
  stroke(0,0,100);
  circle(150,150,150);

  fill(0,100,100);

  beginShape();
  vertex(150,75);
  vertex(170,130);
  vertex(220,125);
  vertex(180,160);
  vertex(200,210);
  vertex(150,180);
  vertex(100,210);
  vertex(120,160);
  vertex(80,125);
  vertex(130,130);
  endShape(CLOSE);
  
}
