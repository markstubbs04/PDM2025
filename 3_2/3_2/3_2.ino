// https://youtube.com/shorts/BPoxhh6SZu4


const int analogInPin = A0;  // Analog input pin that the potentiometer is attached to
const int analogOutPin = 9;  // Analog output pin that the LED is attached to

int sensorValue = 0;  // value read from the pot
int outputValue = 0;  // value output to the PWM (analog out)
int ledBright = 0;
long tiebreaker = random(200)+55;
bool gameOver = false;

void setup() {

}

void loop() {
  // read the analog in value:
  sensorValue = analogRead(analogInPin);
  ledBright = map(sensorValue, 0, 1023, 0, 100);
  // map it to the range of the analog out:
  outputValue = map(sensorValue, 0, 1023, 0, 255);
  if(outputValue >= tiebreaker || gameOver){
    gameOver = true;
    analogWrite(analogOutPin, 0);
  }else{
    analogWrite(analogOutPin, outputValue);
  }

  if(gameOver && sensorValue == 0){
    gameOver = false;
    tiebreaker = random(255)+55;
  }
  // change the analog out value:
}