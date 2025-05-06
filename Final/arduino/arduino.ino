int ledPin = 13;
int buttonPin = 2;
const int joystickXPin = A0; // Analog input for joystick X-axis


// Variables for storing sensor data
int buttonState = 0;
int joystickX = 0;

void setup() {
  // Initialize serial communication
  Serial.begin(9600);
  // Set pin modes
  pinMode(ledPin, OUTPUT);
  pinMode(buttonPin, INPUT_PULLUP); // Use internal pull-up resistor for button
  // No need to set joystick pins as INPUT, analogRead() does that automatically.
}

void loop() {
  // Read button state
  buttonState = digitalRead(buttonPin);

  // Read joystick values
  joystickX = analogRead(joystickXPin);

  // Read serial data, if available
  if (Serial.available() > 0) {
    String data = Serial.readStringUntil('\n');
    data.trim(); // Remove any leading/trailing whitespace and newline

    if (data.startsWith("H,")) {
      String pinStr = data.substring(2); // Extract the pin number
      int pin = pinStr.toInt();
      if (pin == ledPin) {
        digitalWrite(ledPin, HIGH);
        delay(20);
        digitalWrite(ledPin, LOW);
      }
    } else if (data.startsWith("L,")) {
      // You could add logic here to turn the LED OFF if needed in the future
      String pinStr = data.substring(2);
      int pin = pinStr.toInt();
      if (pin == ledPin) {
        digitalWrite(ledPin, LOW);
      }
    }
  }
    //Print to serial
    Serial.print("Button: ");
    Serial.print(buttonState);
    Serial.print(", Joystick X: ");
    Serial.println(joystickX);
}
