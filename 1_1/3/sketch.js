function setup() {
  createCanvas(400, 200);
  colorMode(HSB);
}

function draw() {
  background(0);

  strokeWeight(0);
  fill(60,100,100);
  arc(100,100,100,100,PI+PI/4,3*PI/4);
  
  fill(0,100,100);
  arc(250,100,100,100,PI,0);
  fill(0,100,100);
  rect(200,100,100,50);

  fill(0,0,100);
  circle(225,100,30);
  circle(275,100,30);

  fill(255,100,100);
  circle(225,100,20);
  circle(275,100,20);
}
