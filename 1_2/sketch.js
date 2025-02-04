let x = 200, y = 200;
let dragging = false;
let color = '';

function setup() {
  createCanvas(screen.width, screen.height);
  colorMode(HSB);
}

function draw() {
  strokeWeight(1);
  stroke(0,0,100);
  fill('red');
  square(0,0,30);
  fill('orange');
  square(0,30,30);
  fill('yellow');
  square(0,60,30);
  fill('LawnGreen');
  square(0,90,30);
  fill('aqua');
  square(0,120,30);
  fill('blue');
  square(0,150,30);
  fill(300,100,100);
  square(0,180,30);
  fill(30,100,59);
  square(0,210,30);
  fill(0,0,100);
  square(0,240,30);
  fill(0,100,0);
  square(0,270,30);
}


// function mousePressed(){
//   console.log("mouse pressed");
//   if(dragging || (mouseX >= x && mouseX <= x + 100 
//       && mouseY >= y && mouseY <= y + 100)){
//         dragging = true;
//         //fill('purple');
//       }
// }

// function mouseDragged(){
//   console.log('mouse position: (${mouseX}, ${mouseY})')
//   if(dragging){
//     x += mouseX - pmouseX;
//     y += mouseY - pmouseY;
//   }
// }

function mouseReleased(){
  dragging = false;
}

function mousePressed(){
  if(mouseX < 30){
        if(mouseY < 30){
          color = 'red';
        }else if(mouseY < 60){
          color = 'orange';
        }else if(mouseY < 90){
          color = 'yellow';
        }else if(mouseY < 120){
          color = 'LawnGreen';
        }else if(mouseY < 150){
          color = 'aqua';
        }else if(mouseY < 180){
          color = 'blue';
        }else if(mouseY < 210){
          color = 'fuchsia';
        }else if(mouseY < 240){
          color = 'saddlebrown';
        }else if(mouseY < 270){
          color = 'white';
        }else if(mouseY < 300){
          color = 'black';
        }else{

        }
  }else{
    dragging = true;
    x = mouseX;
    y = mouseY;
    stroke(color);
  }
}


function mouseDragged(){
  // console.log('mouse position: (${mouseX}, ${mouseY})')
  if(dragging){
    x = mouseX;
    y = mouseY;
    strokeWeight(5);
    stroke(color);
    line(x,y,pmouseX,pmouseY);
  }
}