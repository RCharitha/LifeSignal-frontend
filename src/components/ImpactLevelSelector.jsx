import React from 'react';
import './ImpactLevelSelector.css';

const ImpactLevelSelector = ({ selectedImpact, onImpactChange }) => {
  const impactLevels = [
    { 
      id: 'critical', 
      label: '🔴 CRITICAL', 
      description: 'Life-threatening, immediate danger',
      color: '#e53e3e',
      alertCount: 7,
      priority: 1
    },
    { 
      id: 'high', 
      label: '🟠 HIGH', 
      description: 'Serious situation, urgent help needed',
      color: '#ed8936',
      alertCount: 7,
      priority: 2
    },
    { 
      id: 'medium', 
      label: '🟡 MEDIUM', 
      description: 'Need assistance, not life-threatening',
      color: '#ecc94b',
      alertCount: 5,
      priority: 3
    }
  ];

  return (
    <div className="impact-container">
      <h3 className="section-title">
        <span>⚡ Impact Level</span>
      </h3>
      <div className="impact-grid">
        {impactLevels.map((level) => (
          <div
            key={level.id}
            className={`impact-card ${selectedImpact === level.id ? 'selected' : ''}`}
            onClick={() => onImpactChange(level.id)}
            style={{ 
              borderColor: selectedImpact === level.id ? level.color : '#e2e8f0',
              background: selectedImpact === level.id ? `${level.color}10` : 'white'
            }}
          >
            <div className="impact-header">
              <span className="impact-label" style={{ color: level.color }}>
                {level.label}
              </span>
              <span className="impact-badge" style={{ background: level.color }}>
                {level.alertCount} people
              </span>
            </div>
            <p className="impact-description">{level.description}</p>
            {selectedImpact === level.id && (
              <div className="impact-selected">✓ Selected</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImpactLevelSelector;