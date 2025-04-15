let port;
let connectButton;
let buttonStatus = "";
let backgroundColor;
let isConnected = false;
const ledPin = '13';

function setup() {
  createCanvas(400, 400);
  colorMode(HSB);

  port = createSerial();
  connectButton = createButton("Connect to Arduino");
  connectButton.mousePressed(connectToSerial);

  backgroundColor = color(220);
}

function draw() {
  background(backgroundColor);

  let str = port.readUntil("\n");
  if (str !== "") {
    buttonStatus = str;
    let val = Number(str);
    if (!isNaN(val)) {
      // if (val === 1) {
      //   backgroundColor = color(255, 0, 0);
      // } else if (val === 0) {
      //   backgroundColor = color(220);
      // }
      let hue = map(val, 0, 1023, 0, 255);
      backgroundColor = color(hue, 255, 255);
    }
  }
  text(buttonStatus, 20, 20);
}

function connectToSerial() {
  port.open('Arduino', 9600);
  isConnected = true;
}

function mousePressed(){
  if (isConnected) {
    // Send a message to Arduino to turn the LED ON
    port.write('H,' + ledPin + '\n'); // 'H' for HIGH (on), followed by pin and newline
  } else {
    console.log('Not connected to Arduino.');
  }
}

function mouseReleased() {
  if (isConnected) {
    port.write('L,' + ledPin + '\n'); // Send 'L' (LOW) on mouse release
    console.log('Sending: L,' + ledPin);
  } else {
    console.log('Not connected to Arduino.');
  }
}