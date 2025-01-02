import React, { useState, useEffect } from 'react';
import './controller.css';

const ControlPanel = () => {
  const [lightStatus, setLightStatus] = useState(true);
  const [recentSteps, setRecentSteps] = useState(0);
  const [recentVoltage, setRecentVoltage] = useState(0);
  const [efficiency, setEfficiency] = useState(0);
  const [threshold, setThreshold] = useState(5);
  const [alerts, setAlerts] = useState([]);
  const [activityLog, setActivityLog] = useState([]);

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

  
  const fetchRecentData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/provide');
      const data = await response.json();
      if (data.error) {
        console.error(data.error);
      } else {
        const latest = data.data[data.data.length - 1];
        setRecentSteps(parseInt(latest.step, 10));
        setRecentVoltage(parseFloat(latest.power));
        setActivityLog(data.data);
        setEfficiency(parseFloat(latest.power) / parseInt(latest.step, 10));
      }
    } catch (error) {
      console.error("Error fetching recent data:", error);
    }
  };

  // Check thresholds
  const checkThresholds = () => {
    if (recentSteps < threshold) {
      setAlerts([...alerts, `Steps per minute below threshold: ${recentSteps}`]);
    }
    if (recentVoltage < threshold) {
      setAlerts([...alerts, `Voltage below threshold: ${recentVoltage}V`]);
    }
  };

  // Toggle street light
  const toggleLight = () => {
    const command = lightStatus ? "TURN_OFF_LIGHT" : "TURN_ON_LIGHT";
    sendCommandToArduino(command);
    setLightStatus(!lightStatus);
  };

  useEffect(() => {
    fetchRecentData();
    const interval = setInterval(fetchRecentData, 5000); // Fetch data every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="control-panel">
      <h1 className="panel-header">Piezoelectric Power Generation Control Panel</h1>

      {/* Real-Time Data */}
      <div className="card real-time-data">
        <h2>Real-Time Data</h2>
        <p>Steps per Minute: {recentSteps}</p>
        <p>Voltage Generated: {recentVoltage}V</p>
        <p>Efficiency: {efficiency.toFixed(2)} kWh/step</p>
      </div>

      {/* Threshold Management */}
  

      {/* Street Light Control */}
      <div className="card light-control">
        <h2>Street Light Control</h2>
        <button className="btn" onClick={toggleLight}>
          {lightStatus ? 'Turn Off Lights' : 'Turn On Lights'}
        </button>
      </div>

      {/* Activity Log */}
      <div className="card activity-log">
        <h2>Activity Log</h2>
        <ul>
          {activityLog.slice(-10).map((log, index) => (
            <li key={index}>
              Steps: {log.step}, Voltage: {log.power}V, Time: {log.time}
            </li>
          ))}
        </ul>
      </div>

      {/* Alerts */}
      <div className="card alerts">
        <h2>Alerts</h2>
        <ul>
          {alerts.map((alert, index) => (
            <li key={index}>{alert}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ControlPanel;
