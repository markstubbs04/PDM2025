let cyclops;
let guy;
let green;

function preload(){
  cyclops = loadImage("cyclops.png");
  guy = loadImage("SpelunkyGuy.png");
  green = loadImage("Green.png");
}

function setup() {
  createCanvas(400, 400);

  imageMode(CENTER);

  //animation = new SpriteAnimation(cyclops, 0, 5, 6);

  character = new Character(random(80,width-80),random(80,width-80));
  // character.addAnimation("down", new SpriteAnimation(cyclops,6,5,6));
  // character.addAnimation("up", new SpriteAnimation(cyclops,0,5,6));
  character.addAnimation("left", new SpriteAnimation(cyclops,0,0,9));
  character.addAnimation("right", new SpriteAnimation(cyclops,0,0,9));
  character.addAnimation("stand",new SpriteAnimation(cyclops,0,0,1));
  character.currentAnimation = "stand";

  characterOne = new Character(random(80,width-80),random(80,width-80));
  characterOne.addAnimation("left", new SpriteAnimation(guy,0,0,9));
  characterOne.addAnimation("right", new SpriteAnimation(guy,0,0,9));
  characterOne.addAnimation("stand",new SpriteAnimation(guy,0,0,1));
  characterOne.currentAnimation = "stand";

  characterTwo = new Character(random(80,width-80),random(80,width-80));
  characterTwo.addAnimation("left", new SpriteAnimation(green,0,0,9));
  characterTwo.addAnimation("right", new SpriteAnimation(green,0,0,9));
  characterTwo.addAnimation("stand",new SpriteAnimation(green,0,0,1));
  characterTwo.currentAnimation = "stand";
}

function draw() {
  background(220);

  character.draw();
  characterOne.draw();
  characterTwo.draw();
}

// function keyPressed(){
//   character.keyPressed();
//   characterOne.keyPressed();
// }

// function keyReleased(){
//   character.keyReleased();
//   characterOne.keyReleased();
// }

function keyPressed(){
  switch (keyCode){
    case LEFT_ARROW:
      character.currentAnimation = "left";
      characterOne.currentAnimation = "left";
      characterTwo.currentAnimation = 'left';
      break;
    case RIGHT_ARROW:
      character.currentAnimation = "right";
      characterOne.currentAnimation = "right";
      characterTwo.currentAnimation = 'right';
      break;
  }
  }
  function keyReleased(){
    character.currentAnimation = "stand";
    characterOne.currentAnimation = "stand";
    characterTwo.currentAnimation = 'stand';
  }



class Character {
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.currentAnimation = null;
    this.animations = {};
  }

  addAnimation(key,animation){
    this.animations[key] = animation;
  }
  
  draw(){
    let animation = this.animations[this.currentAnimation]
    if(animation){
      switch(this.currentAnimation){
        case "left":
          this.animations[this.currentAnimation].flipped = true;
          this.x -= 2;
          break;
        case "right":
          this.animations[this.currentAnimation].flipped = false;
          this.x+=2;
          break;
      }
      push();
      translate(this.x,this.y);
      animation.draw();
      pop();
    }
  }

  // keyPressed(){
  // switch (keyCode){
  //   // case UP_ARROW:
  //   //   character.currentAnimation = "up";
  //   //   break;
  //   // case DOWN_ARROW:
  //   //   character.currentAnimation = "down";
  //   //   break;
  //   case LEFT_ARROW:
  //     this.animations[this.currentAnimation].flipped = true;
  //     character.currentAnimation = "left";
  //     break;
  //   case RIGHT_ARROW:
  //     this.animations[this.currentAnimation].flipped = false;
  //     character.currentAnimation = "right";
  //     break;
  // }
  // }
  // keyReleased(){
  //   character.currentAnimation = "stand";
  // }
}

class SpriteAnimation{
  constructor(spritesheet,startU,startV, duration){
    this.spritesheet = spritesheet;
    this.u = startU;
    this.v = startV;
    this.duration = duration;
    this.startU = startU;
    this.frameCount = 0;
    this.flipped = false;
  }

  draw(){

    let s = (this.flipped) ? -1 : 1;
    scale(s,1);
    image(this.spritesheet,0,0,80,80,this.u*80,this.v*80,80,80)

    this.frameCount++;
    if(this.frameCount % 10 === 0){
      this.u++;
    }
    
    if(this.u == this.startU + this.duration){
      this.u = this.startU;
    }
  }

}
