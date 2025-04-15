const int ledPin = 13; // Changed to digital pin 13
const int sensorPin = A0;

void setup() {
  Serial.begin(9600);
  pinMode(ledPin, OUTPUT);
}

void loop() {
  if (Serial.available() > 0) {
    String data = Serial.readStringUntil('\n');
    data.trim(); // Remove any leading/trailing whitespace and newline

    if (data.startsWith("H,")) {
      String pinStr = data.substring(2); // Extract the pin number
      int pin = pinStr.toInt();
      if (pin == ledPin) {
        digitalWrite(ledPin, HIGH);
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
  int sensorValue = analogRead(sensorPin);
  Serial.println(sensorValue); // Send the analog reading to p5
  delay(100); // Small delay to avoid overwhelming the serial port
}