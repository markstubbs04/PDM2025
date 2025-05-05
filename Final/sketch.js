let GameStates = Object.freeze({
  START: "start",
  PLAY: "play",
  GAMEOVER: "gameover",
  WIN: "win",
});
let gameState = GameStates.START;



let player;
let samus;
let enemies = [];
let enemyFlag = true;
let enemyFlagCounter = 0;
let lasers = [];
let score = 0;
let bugs;
let startscreen;
let gameFont;
let energy = 10;
let flag = true;

let newEnemyTimer = 30;
let enemySideSpawn = 0;


let synth;
let isPlaying = false;
let loopInterval;
let baseFrequency = 440;


// This is the difficulty adjuster. The speed of the bugs progress as the game continues, but these
// are the score indeces where the bugs get faster in the middle of a round.
const difficulty = [6,12,18,32,40];
let difficultyIndex = 0;
let difficultyMultiplyer = 1;


const waveSizes = [5,5,6,6,8,8,9,50];
let waveIndex = 0;

const screenText = ["Kill those damn bugs", 
  "Make sure you dont use all your energy", 
  "Are they getting faster?",
  "Motherfucking bugs man",
  "They're still going???",
  "WHY ARE THEY GETTING SO DAMN FAST??",
  "THIS GOTTA BE THE LAST ONE WTH???",
  "LAST WAVE FIRE EVERYTHING YOU HAVE!!!"
];
let screenTextTimer = 0;


const enemyType = [[0,0],[9,4],[9,0],[6,0],[3,4],[3,0],[6,4],[0,4]];
let enemyIndex = 0;


function preload(){
  bugs = loadImage("bugs.png");
  samus = loadImage("Custom Edited - Metroid Customs - Samus (1).png");
  startscreen = loadImage("startscreen.png");
  samus_stand = loadImage("samus_stand_still.png");
}

function setup() {
  createCanvas(400, 600);

  Tone.start();

  synth = new Tone.Synth({ // Use a basic Synth, we'll shape it
    oscillator: {
      type: 'square' // Square wave is very retro
    },
    envelope: {
      attack: 0.001, // Very short attack
      decay: 0.1,
      sustain: 0.01, // Very short sustain
      release: 0.1 // Short release
    }
  }).toDestination();




  player = new Player();
  player.addAnimation("left", new SpriteAnimation(samus,0,1,3));
  player.addAnimation("right", new SpriteAnimation(samus,0,0,3));
  player.addAnimation("left_stand", new SpriteAnimation(samus_stand,0,1,1));
  player.addAnimation("right_stand", new SpriteAnimation(samus_stand,0,0,1));
  gameFont = loadFont("PressStart2P-Regular.ttf");
  // for (let i = 0; i < 5; i++) {
  //   enemies.push(new Enemy(i * 60 - 100, 50));
  //   enemies[i].addAnimation("left", new SpriteAnimation(bugs,enemyType[enemyIndex][0],enemyType[enemyIndex][1]+1,3));
  //   enemies[i].addAnimation("right", new SpriteAnimation(bugs,enemyType[enemyIndex][0],enemyType[enemyIndex][1]+2,3));
  //   enemies[i].addAnimation("forward", new SpriteAnimation(bugs,enemyType[enemyIndex][0],enemyType[enemyIndex][1],3));
  // }
  // enemies.push(new Enemy(0, 50));
  // enemies[0].addAnimation("left", new SpriteAnimation(bugs,enemyType[enemyIndex][0],enemyType[enemyIndex][1]+1,3));
  // enemies[0].addAnimation("right", new SpriteAnimation(bugs,enemyType[enemyIndex][0],enemyType[enemyIndex][1]+2,3));
  // enemies[0].addAnimation("forward", new SpriteAnimation(bugs,enemyType[enemyIndex][0],enemyType[enemyIndex][1],3));
  soundEffects = new Tone.Players({
      laser: "laser-312360.mp3",
      hiss: "his_hissing_cat_snake-46467.mp3",
      levelUp: "going-to-the-next-level-114480.mp3",
    }).toDestination()

}

function draw() {
  textFont(gameFont);
  switch(gameState){
    case GameStates.START:
      image(startscreen,0,0,400,600,0,0,1024,1024);
      break;
    case GameStates.PLAY:
      background(0);
      textSize(15);
      if(enemyFlag){
        enemyFlagCounter++;
        if(enemyFlagCounter % newEnemyTimer === 0){
          if(enemySideSpawn%2===0){
            enemies.push(new Enemy(-40, random(50, 125),"right"));
          }else{
            enemies.push(new Enemy(width+20, random(50, 125),"left"));
          }
          enemySideSpawn++;
          
          let enemy = enemies[enemies.length-1];
          enemy.addAnimation("left", new SpriteAnimation(bugs,enemyType[enemyIndex][0],enemyType[enemyIndex][1]+1,3));
          enemy.addAnimation("right", new SpriteAnimation(bugs,enemyType[enemyIndex][0],enemyType[enemyIndex][1]+2,3));
          enemy.addAnimation("forward", new SpriteAnimation(bugs,enemyType[enemyIndex][0],enemyType[enemyIndex][1],3));
        }
        if(enemyFlagCounter>newEnemyTimer*waveSizes[waveIndex]){
          enemyFlagCounter = 0;
          enemyFlag = false;
          waveIndex++;
        }
        //add an enemy if the timing is correct
      }
      fill(255);
      text("Score: " + score, 10, 20);
      text("Energy: " + energy, 240, 20);
      
      player.update();
      player.show();
      if (keyIsDown(LEFT_ARROW)) {
        player.move(-5);
        player.changeAnimation("left");
      } else if (keyIsDown(RIGHT_ARROW)) {
        player.move(5);
        player.changeAnimation("right");
      }else{
        switch(player.returnCurrentAnimation()){
          case "right":
            player.changeAnimation("right_stand");
            break;
          case "left":
            player.changeAnimation("left_stand");
            break;
        }
      }

      if(!enemies.length && !enemyFlagCounter){
        energy+=10;
        enemyIndex++;
        if(enemyIndex==7){
          energy = 99;
          difficultyMultiplyer = 4;
          newEnemyTimer = 5;
        }
        // for (let i = 0; i < 5; i++) {
        //   enemies.push(new Enemy(50 + i * 60, 50));
        //   enemies[i].addAnimation("left", new SpriteAnimation(bugs,enemyType[enemyIndex][0],enemyType[enemyIndex][1]+1,3));
        //   enemies[i].addAnimation("right", new SpriteAnimation(bugs,enemyType[enemyIndex][0],enemyType[enemyIndex][1]+2,3));
        //   enemies[i].addAnimation("forward", new SpriteAnimation(bugs,enemyType[enemyIndex][0],enemyType[enemyIndex][1],3));
        // }
        enemyFlag = true;
        stopGalagaLoop();
        soundEffects.player("levelUp").start();
        setTimeout(5000);
        startGalagaLoop();
        screenTextTimer = 0;
        newEnemyTimer -= 2;

        //text(screenText[enemyIndex],150,300);
      }
      console.log(difficultyMultiplyer);


      //CHEATING FOR TESTING
      // if(key === ' '){
      //   lasers.push(new Laser(player.x, height - player.r*3));
      //   soundEffects.player("laser").start();
      // }
      if(screenTextTimer<180){
        // let x = map(screenText[enemyIndex].length,0,100);
        textSize(10);
        // let x = map(200-screenText[enemyIndex].length*5,0,200,0,200);
        text(screenText[enemyIndex],200-screenText[enemyIndex].length*5,300);
        screenTextTimer++;
      }

      for (let i = lasers.length - 1; i >= 0; i--) {

        lasers[i].update();
        lasers[i].show();
        if (lasers[i].offscreen()) {
          lasers.splice(i, 1);
        } else {
          for (let j = enemies.length - 1; j >= 0; j--) {
            if (lasers[i].hits(enemies[j])) {
              enemies.splice(j, 1);
              lasers.splice(i, 1);
              score++;
              break;
            }
          }
        }
      }

      for (let i = enemies.length - 1; i >= 0; i--) {
        if(score > difficulty[difficultyIndex]){
          console.log(difficulty[difficultyIndex]);
          difficultyMultiplyer*=1.05;
          enemies[i].update();
        }
        enemies[i].show();
        // Basic enemy movement (you'll need more complex AI)
        enemies[i].move();
        if (enemies[i].y > height) {
          enemies.splice(i, 1); // Remove enemies that go off-screen
        }
      }
      if(score > difficulty[difficultyIndex]){
        difficultyMultiplyer*=1.05;
        difficultyIndex++;
      }
      if(score == 97){
        gameState = GameStates.WIN;
      }
      break;
    case GameStates.GAMEOVER:
      background(0);
      color(255);
      text("GAME OVER",140,250);
      stopGalagaLoop();
      // if(keyIsDown(ENTER)){
      //   for(let i = 0; i < enemies.length; i++){
      //     enemies.pop();
      //   }
      //   for (let i = 0; i < 5; i++) {
      //     enemies.push(new Enemy(50 + i * 60, 50));
      //     enemies[i].addAnimation("left", new SpriteAnimation(bugs,0,1,3));
      //     enemies[i].addAnimation("right", new SpriteAnimation(bugs,0,2,3));
      //     enemies[i].addAnimation("forward", new SpriteAnimation(bugs,0,0,3));
      //   }
      //   energy = 15;
      //   score = 0;
      // }
      break;
    case GameStates.WIN:
      text("WINNER WINNER",140,250)
      stopGalagaLoop();
      break;
  }
  
}

function keyPressed() {
  if(keyIsDown(ENTER)){
    if(gameState === GameStates.START){
      gameState = GameStates.PLAY;
      if (!isPlaying) {
        startGalagaLoop();
      }
    }
  }
  if (key === ' ') {
    if(energy>0){
      lasers.push(new Laser(player.x, height - player.r*3));
      soundEffects.player("laser").start();
      energy--;
    }
    else{

    }
  }
}

// Player Class
class Player {
  constructor() {
    this.r = 20;
    this.x = width / 2;
    this.y = height - this.r * 2;
    this.xdir = 0;
    this.currentAnimation = "left_stand";
    this.animations = {};
  }

  move(dir) {
    this.x += dir;
    this.x = constrain(this.x, this.r, width - this.r);
  }

  update() {
    // No specific update logic for now
  }

  show() {
    let animation = this.animations[this.currentAnimation]
    if(animation){
      push();
      translate(this.x,this.y);
      animation.draw_samus();
      pop();
  }
  }

  addAnimation(key,animation){
    this.animations[key] = animation;
  }

  changeAnimation(currentAnimation){
    this.currentAnimation = currentAnimation;
  }

  returnCurrentAnimation(){
    return this.currentAnimation;
  }
}

// Enemy Class
class Enemy {
  constructor(x, y, dir) {
    this.r = 20;
    this.x = x;
    this.y = y;
    this.xdir = difficultyMultiplyer*2;
    this.currentAnimation = dir;
    this.animations = {};
  }

  move() {
    if(!energy){
      if(flag){
        soundEffects.player("hiss").start();
      }
      flag = false;
      this.currentAnimation = 'forward';
      this.y += 5;
    }else{
      this.x = this.x + this.xdir;
      if (this.x > width + this.r) {
        this.xdir *= -1;
        this.y += this.r*2; // Move down slightly on direction change
        this.currentAnimation = "left";
      }
      if(this.x < -2*this.r){
        this.xdir *= -1;
        this.y += this.r*2; // Move down slightly on direction change
        this.currentAnimation = 'right';
      }
    }
    if(this.y>560){
      gameState = GameStates.GAMEOVER;
    }
  }

  update() {
    this.xdir *= difficultyMultiplyer;
  }

  show() {
    let animation = this.animations[this.currentAnimation]
    if(animation){
      // switch(this.currentAnimation){
      //   case "left":
      //     this.animations[this.currentAnimation].flipped = true;
      //     break;
      //   case "right":
      //     this.animations[this.currentAnimation].flipped = false;
      //     break;
      // }
      push();
      translate(this.x,this.y);
      animation.draw();
      pop();
  }
}

  addAnimation(key,animation){
    this.animations[key] = animation;
  }
}

// Laser Class
class Laser {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 5;
    this.speed = -15;
  }

  update() {
    this.y += this.speed;
  }

  show() {
    fill(50,255,50,150);
    ellipse(this.x, this.y, this.r * 4, this.r * 3);
    ellipse(this.x+3, this.y+6, this.r * 2, this.r * 2);
    ellipse(this.x-2, this.y-7, this.r * 3, this.r * 3);
    ellipse(this.x+1, this.y-3, this.r * 1, this.r * 3);
    ellipse(this.x-2, this.y+2, this.r * 3, this.r * 2);
    strokeWeight(0);
  }

  offscreen() {
    return (this.y < 0);
  }

  hits(enemy) {
    let d = dist(this.x, this.y, enemy.x, enemy.y);
    return (d < this.r + enemy.r);
  }
}

class SpriteAnimation{
  constructor(spritesheet,startU,startV, duration){
    this.spritesheet = spritesheet;
    this.u = startU;
    this.v = startV;
    this.duration = duration;
    this.startU = startU;
    this.frameCount = 0;
  }

  draw(){

    image(this.spritesheet,-40,-32,80,64,this.u*80,this.v*64,80,64);

    this.frameCount++;
    if(this.frameCount % 10 === 0){
      this.u++;
    }
    
    if(this.u == this.startU + this.duration){
      this.u = this.startU;
    }
  }

  draw_samus(){

    image(this.spritesheet,-20,-40,40,80,this.u*23,this.v*43,20,43);

    this.frameCount++;
    if(this.frameCount % 10 === 0){
      this.u++;
    }
    
    if(this.u == this.startU + this.duration){
      this.u = this.startU;
    }
  }

}
/////THE BUGS ARE 90*64 pixels


// function mousePressed() {
//   if (!isPlaying) {
//     startSciFiLoop();
//   } else {
//     stopSciFiLoop();
//   }
//   isPlaying = !isPlaying;
// }


// function playSciFiTone() {
//   // Generate a slightly varying frequency each time
//   let freq = baseFrequency * random(0.45, 1.05);
//   synth.triggerAttackRelease(freq, '0.3');
// }

// function startSciFiLoop() {
//   loopInterval = setInterval(() => {
//     playSciFiTone();
//   }, 500); // Play a tone every 500 milliseconds (adjust as needed)
//   console.log("Loop started");
// }

// function stopSciFiLoop() {
//   clearInterval(loopInterval);
//   console.log("Loop stopped");
// }

function mousePressed() {
  if (!isPlaying) {
    startGalagaLoop();
  } else {
    stopGalagaLoop();
  }
  isPlaying = !isPlaying;
}

let lastPlayedTime = 0; // added to help with timing

function playGalagaTune() {
  const now = Tone.now();
  // Play a short, blippy sound
  let freq = baseFrequency * random(0.8, 1.2); //slightly varied

  // Check if enough time has passed since the last sound
  if (now > lastPlayedTime + 0.05) { // 0.05 second minimum spacing.
    synth.triggerAttackRelease(freq, '0.08', now); // Use 'now' for precise timing
    lastPlayedTime = now;
  }
}


function startGalagaLoop() {
  loopInterval = setInterval(() => {
    playGalagaTune();
  }, 200 - difficultyMultiplyer * 10);
  console.log("Galaga loop started");
}

function stopGalagaLoop() {
  clearInterval(loopInterval);
  console.log("Galaga loop stopped");
}
