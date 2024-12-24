from flask import Flask, request, jsonify
from flask_cors import CORS
import serial

app = Flask(__name__)
CORS(app)  # This will allow all domains to make requests

# Your existing code here
@app.route('/send-command', methods=['POST'])
def send_command():
    command = request.json.get('command')
    print(f"Command received by Python server: {command}")
  
    
    # Send command to Arduino via serial
    try:
        print("opening serial port")
        arduino = serial.Serial("COM7", 9600, timeout=1)
        print(f"Sending command: {command}")
        arduino.write(command.encode())  # Send the command to Arduino
        arduino.close()
        print("Command sent to Arduino")
        return jsonify({"message": f"Command {command} sent to Arduino."}), 200
    except Exception as e:
        print(f"Error sending command to Arduino: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
