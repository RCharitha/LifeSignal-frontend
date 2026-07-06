import React, { useState, useEffect } from 'react';
import './AlertNotification.css';
import { FaBell, FaMapMarkerAlt, FaTimes, FaVolumeUp } from 'react-icons/fa';

function AlertNotification({ onAlertReceived }) {
  const [alerts, setAlerts] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [currentAlert, setCurrentAlert] = useState(null);

  useEffect(() => {
    // Listen for SOS alerts from socket
    if (window.socket) {
      window.socket.on('sos-alert', (alert) => {
        console.log('🚨 SOS Alert received:', alert);
        
        // Play sound
        const audio = new Audio('/alert-sound.mp3');
        audio.play().catch(e => console.log('Audio play failed:', e));
        
        // Show notification
        setCurrentAlert(alert);
        setShowAlert(true);
        setAlerts(prev => [alert, ...prev]);
        
        // Auto hide after 10 seconds
        setTimeout(() => {
          setShowAlert(false);
        }, 10000);
        
        // Callback for parent
        if (onAlertReceived) {
          onAlertReceived(alert);
        }
      });
    }
  }, []);

  const closeAlert = () => {
    setShowAlert(false);
  };

  const openGoogleMaps = (lat, lng) => {
    window.open(`https://maps.google.com/?q=${lat},${lng}`, '_blank');
  };

  return (
    <>
      {/* Floating Alert Popup */}
      {showAlert && currentAlert && (
        <div className="alert-popup">
          <div className="alert-header">
            <div className="alert-icon">
              <FaBell className="bell-ring" />
              <span className="sos-badge">SOS</span>
            </div>
            <h3>Emergency Alert!</h3>
            <button className="close-btn" onClick={closeAlert}>
              <FaTimes />
            </button>
          </div>
          
          <div className="alert-body">
            <div className="alert-sender">
              <strong>{currentAlert.from}</strong> needs immediate help!
            </div>
            
            <div className="alert-details">
              <p>🚨 {currentAlert.emergencyType}</p>
              <p>⚡ {currentAlert.impactLevel} Priority</p>
              <p>📍 {currentAlert.distanceText}</p>
            </div>
            
            <div className="alert-actions">
              <button 
                className="map-btn"
                onClick={() => {
                  // You'll need to store coordinates in the alert
                  alert('Location shared via WhatsApp/SMS');
                }}
              >
                <FaMapMarkerAlt /> View Location
              </button>
              <button className="help-btn">
                <FaVolumeUp /> I'll Help!
              </button>
            </div>
          </div>
          
          <div className="alert-footer">
            <small>Received: {new Date(currentAlert.timestamp).toLocaleTimeString()}</small>
          </div>
        </div>
      )}
      
      {/* Alert History (Optional) */}
      {alerts.length > 0 && (
        <div className="alert-history">
          <h4>Recent Alerts</h4>
          {alerts.slice(0, 3).map((alert, index) => (
            <div key={index} className="history-item">
              <span>🚨 {alert.from}</span>
              <span>{alert.distanceText}</span>
              <small>{new Date(alert.timestamp).toLocaleTimeString()}</small>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default AlertNotification;