/*
  Button

  Turns on and off a light emitting diode(LED) connected to digital pin 13,
  when pressing a pushbutton attached to pin 2.

  The circuit:
  - LED attached from pin 13 to ground through 220 ohm resistor
  - pushbutton attached to pin 2 from +5V
  - 10K resistor attached to pin 2 from ground

  - Note: on most Arduinos there is already an LED on the board
    attached to pin 13.

  created 2005
  by DojoDave <http://www.0j0.org>
  modified 30 Aug 2011
  by Tom Igoe

  This example code is in the public domain.

  https://www.arduino.cc/en/Tutorial/BuiltInExamples/Button
*/

// constants won't change. They're used here to set pin numbers:
const int buttonPin = 2;  // the number of the pushbutton pin
const int ledPin = 13;    // the number of the LED pin
const int buttonPin2 = 4;

// variables will change:
int buttonState = 0;  // variable for reading the pushbutton status
int buttonState2 = 0;

int ledState = LOW;  // ledState used to set the LED
int lastButtonState = LOW;  // the previous reading from the input pin


void setup() {
  // initialize the LED pin as an output:
  pinMode(ledPin, OUTPUT);
  // initialize the pushbutton pin as an input:
  pinMode(buttonPin, INPUT);
  pinMode(buttonPin2, INPUT);
}

void sendHello() {
  int dotTime = 250;  // 250ms for a dot
  int dashTime = 750; // 750ms for a dash
  int letterPause = 750;  // Pause between letters
  int wordPause = 2000;   // Pause between words

  // H (....)
  blinkMorse(dotTime);
  blinkMorse(dotTime);
  blinkMorse(dotTime);
  blinkMorse(dotTime);
  delay(letterPause);

  // E (.)
  blinkMorse(dotTime);
  delay(letterPause);

  // L (.-..)
  blinkMorse(dotTime);
  blinkMorse(dashTime);
  blinkMorse(dotTime);
  blinkMorse(dotTime);
  delay(letterPause);

  // L (.-..)
  blinkMorse(dotTime);
  blinkMorse(dashTime);
  blinkMorse(dotTime);
  blinkMorse(dotTime);
  delay(letterPause);

  // O (---)
  blinkMorse(dashTime);
  blinkMorse(dashTime);
  blinkMorse(dashTime);
  delay(wordPause);
}

void sendSOS() {
  // SOS in Morse Code: "... --- ..."
  int dotTime = 250;  // 250ms for a dot
  int dashTime = 750; // 750ms for a dash
  int letterPause = 750;  // Pause between letters
  int wordPause = 2000;   // Pause between SOS signals

  // Letter S ( ... )
  blinkMorse(dotTime);
  blinkMorse(dotTime);
  blinkMorse(dotTime);
  delay(letterPause);

  // Letter O ( --- )
  blinkMorse(dashTime);
  blinkMorse(dashTime);
  blinkMorse(dashTime);
  delay(letterPause);

  // Letter S ( ... )
  blinkMorse(dotTime);
  blinkMorse(dotTime);
  blinkMorse(dotTime);
  delay(wordPause);
}

void blinkMorse(int duration) {
  digitalWrite(ledPin, HIGH);  
  delay(duration);  
  digitalWrite(ledPin, LOW);   
  delay(250);  // Space between signals
}


void loop() {
  // read the state of the pushbutton value:
  buttonState = digitalRead(buttonPin);

  if (digitalRead(buttonPin) == HIGH) {  // Button pressed
    sendSOS();
  }

  if(digitalRead(buttonPin2) == HIGH){
    sendHello();
  }
}