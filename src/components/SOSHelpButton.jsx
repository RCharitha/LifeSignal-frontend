import React, { useState } from 'react';
import './SOSHelpButton.css';

const SOSHelpButton = ({ 
  emergencyType, 
  impactLevel, 
  onSOSClick, 
  isLoading 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getButtonText = () => {
    if (isLoading) return 'SENDING ALERT...';
    if (emergencyType && impactLevel) return '🚨 SEND EMERGENCY SOS 🚨';
    if (emergencyType) return '⚠️ SELECT IMPACT LEVEL ⚠️';
    if (impactLevel) return '⚠️ SELECT EMERGENCY TYPE ⚠️';
    return '🆘 HELP ME 🆘';
  };

  const getButtonClass = () => {
    if (isLoading) return 'sos-button loading';
    if (emergencyType && impactLevel) return 'sos-button ready';
    return 'sos-button default';
  };

  return (
    <div className="sos-container">
      <button
        className={getButtonClass()}
        onClick={onSOSClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        disabled={isLoading}
      >
        <div className="sos-pulse-ring"></div>
        <div className="sos-content">
          <span className="sos-icon">🆘</span>
          <span className="sos-text">{getButtonText()}</span>
        </div>
      </button>
      
      <div className="sos-info">
        <p>
          {emergencyType && impactLevel ? (
            <>✅ Ready: Will send to <strong>7 nearby people + your trusted contacts</strong> with HIGH priority</>
          ) : emergencyType || impactLevel ? (
            <>⚠️ Please select both emergency type and impact level for best response</>
          ) : (
            <>⚠️ Sending to <strong>5 nearby people + trusted contacts</strong> with MEDIUM priority</>
          )}
        </p>
      </div>
    </div>
  );
};

export default SOSHelpButton;