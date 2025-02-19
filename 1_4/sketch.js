let GameStates = Object.freeze({
  START: "start",
  PLAY: "play",
  END: "end"
});
let gameState = GameStates.START;
let score = 0;
let time = 30;
let textPadding = 15;
let highScore = 0;
let bug;
let gameFont;
let numBugs = 50;
let character;
let characters = [];
let speed = 1;
let directionChange = 0;

function preload(){
  gameFont = loadFont("PressStart2P-Regular.ttf");
  bug = loadImage("bug.png");
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  textFont(gameFont);

  imageMode(CENTER);

  for(let i = 0; i<numBugs; i++){
    character = new Character(random(80, width-80),random(80, height-80));
    character.addAnimation("down", new SpriteAnimation(bug, 0, 1, 3));
    character.addAnimation("up", new SpriteAnimation(bug, 0, 0, 3));
    character.addAnimation("left", new SpriteAnimation(bug, 0, 3, 3));
    character.addAnimation("right", new SpriteAnimation(bug, 0, 2, 3));
    character.addAnimation("splat", new SpriteAnimation(bug, 0, 4, 1));
    character.addAnimation("vanish", new SpriteAnimation(bug, 0, 5, 1));
    direction = random(0,4);
    if(direction<1){
      character.currentAnimation = "right";
    }else if(direction< 2){
      character.currentAnimation = "left";
    }else if(direction<3){
      character.currentAnimation = "up";
    }else{
      character.currentAnimation = "down";
    }
    characters.push(character);
  }
  

}

function draw() {
  background(220);
  switch(gameState){
    case GameStates.START:
      textAlign(CENTER,CENTER);
      textSize(18);
      text("Press ENTER to start", width/2, height/2);
      break;
    case GameStates.PLAY:
      textAlign(LEFT, TOP);
      text("Score: " + score,textPadding,textPadding);
      textAlign(RIGHT,TOP);
      text("Time: " + Math.ceil(time), width-textPadding,textPadding);
      time -= deltaTime / 1000;
      if(time<=0){
        gameState = GameStates.END
      }
      for(let i = 0; i < numBugs; i++){
        characters[i].draw();
      }
      break;
    case GameStates.END:
      textAlign(CENTER,CENTER);
      textSize(18);
      text("GAME OVER!", width/2, height/2-20);
      text("Score: " + score, width/2, height/2);
      if(score > highScore){
        highScore = score;
      }
      text("High Score: " + highScore, width/2, height/2+20);
      break;
  }
}

function mousePressed(){
  switch(gameState){
    case GameStates.PLAY:
      for(let i = 0; i< numBugs; i++){
        if(characters[i].contains(mouseX,mouseY)){
          characters[i].currentAnimation = 'splat';
          if(!characters[i].splatted()){
            characters[i].die();
            console.log(i);
            score +=1;
            if(speed<5){
              speed += 1;
            }
          }
          
        }
      }
      break;
  }
  
}

function keyPressed(){
  switch(gameState){
    case GameStates.START:
      if(keyCode === ENTER){
        gameState = GameStates.PLAY;
      }
      break;
    case GameStates.PLAY:
      break;
    case GameStates.END:
      break;
  }

}

class Character {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.currentAnimation = null;
    this.animations = {};
    this.splat = false;
    this.deathCount = 0;
  }

  x(){
    return this.x;
  }

  y(){
    return this.y;
  }

  splatted(){
    return this.splat;
  }

  die(){
    this.splat = true;
  }

  deaded(){
    return this.deathCount;
  }

  addAnimation(key, animation) {
    this.animations[key] = animation;
  }

  contains(x,y){
    if((x>this.x-40 && x<this.x+40) && (y>this.y-40 && y<this.y+40)){
      return true;
    }
    return false;
  }

  outside(){
    if(this.x<0 || this.x> width || this.y<0||this.y>height){
      return true;
    }
    return false;
  }

  draw() {
    directionChange++;
    if(directionChange%500==0){
      for(let i = 0; i<numBugs; i++){
        if(characters[i].splatted()){
          return;
        }
        // if(characters[i].outside){
        //   x = characters[i].x();
        //   y = characters[i].y();
        //   if(x < - 40){
        //     characters[i].currentAnimation = "right";
        //     return;
        //   }else if(x>width + 40){
        //     characters[i].currentAnimation = "left";
        //     return;
        //   }else if(y < -40){
        //     characters[i].currentAnimation = "down";
        //     return;
        //   }else if(y>height+40){
        //     characters[i].currentAnimation = "up";
        //     return;
        //   }
        // }
        // switch(characters[i].currentAnimation){
        //   case "up":
        //     characters[i].currentAnimation = "left";
        //     break;
        //   case "down": 
        //     characters[i].currentAnimation = "right";
        //     break;
        //   case "left":
        //     characters[i].currentAnimation = "down";
        //     break;
        //   case "right":
        //     characters[i].currentAnimation = "up";
        //     break;
        // }
        direction = random(0,4);
        if(direction<1){
          characters[i].currentAnimation = "right";
        }else if(direction< 2){
          characters[i].currentAnimation = "left";
        }else if(direction<3){
          characters[i].currentAnimation = "up";
        }else{
          characters[i].currentAnimation = "down";
        }
      }
    
    }
    let animation = this.animations[this.currentAnimation];

    let move = speed;
    if(speed>5){
      move = 5;
    }

    if (animation) {
      switch (this.currentAnimation) {
        case "up":
          // if(this.y > 0){
            this.y -= move;
          // }
          break;
        case "down": 
          // if(this.y < height){
            this.y += move;
          // }
          break;
        case "left":
          // if(this.x>0){
            this.x-= move;
          // }
          break;
        case "right":
          // if(this.x<width){
            this.x += move;
          // }
          break;
        case "splat":
          this.deathCount++;
          break;
      }
      push();
      translate(this.x, this.y);
      animation.draw();
      pop();
    }
  }

  
  keyReleased() {
    this.currentAnimation = "stand";
  }
}

class SpriteAnimation {
  constructor(spritesheet, startU, startV, duration) {
    this.spritesheet = spritesheet;
    this.u = startU;
    this.v = startV;
    this.duration = duration;
    this.startU = startU;
    this.frameCount = 0;
    this.flipped = false;
  }

  draw() {

    image(this.spritesheet, 0, 0, 80, 80, this.u*80, this.v*80, 80, 80);

    this.frameCount++;
    if (this.frameCount % 7 === 0)
      this.u++;

    if (this.u === this.startU + this.duration)
      this.u = this.startU;

  }
}