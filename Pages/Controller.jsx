import React, { useState } from 'react';
import './controller.css';

const ControlPanel = () => {
  const [lightStatus, setLightStatus] = useState(true);
  const [energyGenerated, setEnergyGenerated] = useState(12.5); // Sample initial data
  const [energyStored, setEnergyStored] = useState(7);
  const [batteryPercentage, setBatteryPercentage] = useState(85);
  const [footstepSensitivity, setFootstepSensitivity] = useState(5);
  const [lightStartTime, setLightStartTime] = useState('18:00');
  const [lightDuration, setLightDuration] = useState(3600);
  const [autoLightSchedule, setAutoLightSchedule] = useState(false);
  const [energyThreshold, setEnergyThreshold] = useState(10);
  const [alerts, setAlerts] = useState([]);
  const [isAlertEnabled, setIsAlertEnabled] = useState(true);
  const [chargingStatus, setChargingStatus] = useState(false);

  // Function to send a command to the Arduino via the Python server
  const sendCommandToArduino = async (command) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/send-command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command }),
      });
      const data = await response.json();
      console.log(data.message || data.error);
    } catch (error) {
      console.error("Error sending command:", error);
    }
  };

  // Function to toggle light status and send a command
  const toggleLight = () => {
    const command = lightStatus ? "TURN_OFF_LIGHT" : "TURN_ON_LIGHT";
    sendCommandToArduino(command);
    setLightStatus(!lightStatus);
  };

  // Function to handle charging status toggle
  const toggleCharging = () => {
    const command = chargingStatus ? "STOP_CHARGING" : "START_CHARGING";
    sendCommandToArduino(command);
    setChargingStatus(!chargingStatus);
    setAlerts([...alerts, chargingStatus ? 'Charging stopped' : 'Charging started']);
  };

  // Function to check energy threshold
  const checkEnergyThreshold = () => {
    if (energyGenerated < energyThreshold) {
      setAlerts([...alerts, `Energy generated is below ${energyThreshold}W, consider adjusting the system.`]);
    }
  };

  return (
    <div className="control-panel">
      <h1 className="panel-header">Piezoelectric Power Generation Control Panel</h1>

      {/* Energy Generation Status Section */}
      <div className="card energy-status">
        <h2 className="card-title">Energy Generation Status</h2>
        <p>Energy Generated: {energyGenerated} kWh</p>
        <p>Energy Stored: {energyStored} kWh</p>
        <p>Battery Percentage: {batteryPercentage}%</p>
        <button className="btn check-energy" onClick={checkEnergyThreshold}>
          Check Energy Threshold
        </button>
      </div>

      {/* Street Light Control Section */}
      <div className="card light-control">
        <h2 className="card-title">Street Light Control</h2>
        <button className="btn toggle-light" onClick={toggleLight}>
          {lightStatus ? 'Turn Off Street Lights' : 'Turn On Street Lights'}
        </button>
        <div className="light-settings">
          <p>Current Light Status: {lightStatus ? 'On' : 'Off'}</p>
          <p>Light Start Time: {lightStartTime}</p>
          <p>Light Duration: {lightDuration / 60} minutes</p>
        </div>

        <div className="input-group">
          <label>Set Start Time:</label>
          <input
            type="time"
            value={lightStartTime}
            onChange={(e) => setLightStartTime(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Set Duration (minutes):</label>
          <input
            type="number"
            value={lightDuration / 60}
            onChange={(e) => setLightDuration(e.target.value * 60)}
          />
        </div>

        <div className="input-group toggle-auto">
          <label>Enable Automatic Light Schedule</label>
          <input
            type="checkbox"
            checked={autoLightSchedule}
            onChange={() => {
              setAutoLightSchedule(!autoLightSchedule);
              if (autoLightSchedule) sendCommandToArduino("ENABLE_AUTO_LIGHT_SCHEDULE");
              else sendCommandToArduino("DISABLE_AUTO_LIGHT_SCHEDULE");
            }}
          />
        </div>
      </div>

      {/* Footstep Sensor Sensitivity Section */}
      <div className="card footstep-sensitivity">
        <h2 className="card-title">Footstep Sensor Sensitivity</h2>
        <input
          type="range"
          min="1"
          max="10"
          value={footstepSensitivity}
          onChange={(e) => setFootstepSensitivity(e.target.value)}
          className="slider"
        />
        <p>Footstep Sensitivity: {footstepSensitivity}</p>
      </div>

      {/* Energy Threshold Section */}
      <div className="card energy-threshold">
        <h2 className="card-title">Energy Generation Threshold</h2>
        <input
          type="number"
          value={energyThreshold}
          onChange={(e) => setEnergyThreshold(e.target.value)}
        />
        <p>Set Minimum Energy Level for Light Trigger: {energyThreshold}W</p>
      </div>

      {/* Battery Management Section */}
      <div className="card battery-management">
        <h2 className="card-title">Battery Management</h2>
        <button className="btn toggle-charging" onClick={toggleCharging}>
          {chargingStatus ? 'Stop Charging Battery' : 'Start Charging Battery'}
        </button>
      </div>

      {/* Alerts Section */}
      <div className="card alerts">
        <h2 className="card-title">System Alerts</h2>
        <div className="toggle-alerts">
          <label>Enable Alerts:</label>
          <input
            type="checkbox"
            checked={isAlertEnabled}
            onChange={() => setIsAlertEnabled(!isAlertEnabled)}
          />
        </div>
        <div className="alert-list">
          <h3>Alerts:</h3>
          <ul>
            {alerts.map((alert, index) => (
              <li key={index}>{alert}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
