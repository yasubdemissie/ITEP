from flask import Flask, request, jsonify
from flask_cors import CORS
import serial
import time

app = Flask(__name__)
CORS(app)  # This will allow all domains to make requests

BT_PORT = 'COM7'
BAUD_RATE = 9600

@app.route('/send-command', methods=['POST'])
def send_command():
    command = request.json.get('command', '').strip()
    if not command:
        return jsonify({"error": "No command provided"}), 400

    print(f"Command received by Python server: {command}")
  
    # Send command to Arduino via Bluetooth
    try:
        arduino = serial.Serial(BT_PORT, BAUD_RATE, timeout=2)  # Adjust timeout if needed
        time.sleep(2)  # Allow time for Arduino to reset on serial connection
        arduino.write((command + '\n').encode())  # Send command with newline

        response = arduino.readline().decode().strip()  # Read the response from Arduino
        print(f"Arduino response: {response}")

        # Save the response to a text file
        with open('arduino_data.txt', 'a') as file:
            file.write(f"{response}\n")

        arduino.close()
        return jsonify({"message": response}), 200
    except Exception as e:
        print(f"Error sending command to Arduino: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
