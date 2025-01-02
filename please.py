from flask import Flask, request, jsonify
from flask_cors import CORS
import serial
import time
import datetime

app = Flask(__name__)
CORS(app) 
BT_PORT = 'COM7'
BAUD_RATE = 9600

@app.route('/send-command', methods=['POST'])
def send_command():
    command = request.json.get('command', '').strip()
    if not command:
        return jsonify({"error": "No command provided"}), 400

    print(f"Command received by Python server: {command}")
    try:
        
        arduino = serial.Serial(BT_PORT, BAUD_RATE, timeout=2)  
        time.sleep(2) 
        arduino.write((command + '\n').encode())  
 
        response = arduino.readline().decode().strip()  
        print(f"Arduino response: {response}")

        d=datetime.datetime.now()
        with open('arduino_data.txt', 'a') as file:
            file.write(f"{response}\t{d}\n")

        arduino.close()
        return jsonify({"message": response}), 200
    except Exception as e:
        print(f"Error sending command to Arduino: {e}")
        return jsonify({"error": str(e)}), 500
@app.route('/provide', methods=['GET'])
def provide():
    try:
        steps = []
        with open('arduino_data.txt', 'r') as file:
            for line in file:
                # Remove extra whitespace and validate format
                line = line.strip()
                if not line:
                    continue  # Skip empty lines
                parts = line.split(" ")
                if len(parts) != 3:
                    raise ValueError(f"Invalid line format: {line}")
                
                step, power, time = parts
                steps.append({"step": step, "power": power, "time": time})
            print(jsonify(steps))
        return jsonify({"data": steps}), 200
    except FileNotFoundError:
        return jsonify({"error": "File not found. Ensure 'arduino_data.txt' exists."}), 404
    except ValueError as ve:
        return jsonify({"error": f"Data format issue: {str(ve)}"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500
if __name__ == '__main__':
    app.run(debug=True)
