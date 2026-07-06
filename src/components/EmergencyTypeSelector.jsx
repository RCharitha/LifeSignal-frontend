import React from 'react';
import './EmergencyTypeSelector.css';

const EmergencyTypeSelector = ({ selectedType, onTypeChange }) => {
  const emergencyTypes = [
    { 
      id: 'accident', 
      label: '🚗 Accident', 
      description: 'Road accident, vehicle collision',
      color: '#e53e3e'
    },
    { 
      id: 'medical', 
      label: '🏥 Medical', 
      description: 'Heart attack, injury, bleeding',
      color: '#ed8936'
    },
    { 
      id: 'fire', 
      label: '🔥 Fire', 
      description: 'Building fire, wildfire',
      color: '#dd6b20'
    },
    { 
      id: 'girls_emergency', 
      label: '👧 Women Safety', 
      description: 'Harassment, stalking, unsafe situation',
      color: '#d53f8c'
    },
    { 
      id: 'theft', 
      label: '👮 Theft/Robbery', 
      description: 'Stolen items, robbery in progress',
      color: '#805ad5'
    },
    { 
      id: 'natural_disaster', 
      label: '🌊 Natural Disaster', 
      description: 'Flood, earthquake, storm',
      color: '#319795'
    }
  ];

  return (
    <div className="emergency-type-container">
      <h3 className="section-title">
        <span>🚨 What is the emergency?</span>
      </h3>
      <div className="emergency-grid">
        {emergencyTypes.map((type) => (
          <div
            key={type.id}
            className={`emergency-card ${selectedType === type.id ? 'selected' : ''}`}
            onClick={() => onTypeChange(type.id)}
            style={{ borderColor: selectedType === type.id ? type.color : '#e2e8f0' }}
          >
            <div className="emergency-emoji">{type.label.split(' ')[0]}</div>
            <div className="emergency-info">
              <h4>{type.label}</h4>
              <p>{type.description}</p>
            </div>
            {selectedType === type.id && (
              <div className="check-mark">✓</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmergencyTypeSelector;