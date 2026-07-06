import React from 'react';
import './FinalSection.css';
import { FaHeart, FaShieldAlt, FaUsers } from 'react-icons/fa';

function FinalSection() {
  return (
    <section className="final-section">
      <div className="final-content">
        
        {/* First quote */}
        <div className="final-quote-top">
          One signal. A hundred hearts respond.
        </div>

        {/* Second quote */}
        <div className="final-quote-middle">
          “When the world feels unsafe… someone nearby is ready to stand for you.”
        </div>

        {/* Big bold text - You are never alone */}
        <div className="final-bold-text">
          You are never alone.
        </div>

        {/* OR separator */}
        <div className="final-or">OR</div>

        {/* Alternative bold text */}
        <div className="final-bold-text-alt">
          Not when <span>help is one tap away.</span>
        </div>

        {/* CTA Buttons */}
        <div className="final-buttons">
          <button className="final-btn final-btn-primary">
            Get Started Now
          </button>
          <button className="final-btn final-btn-secondary">
            Learn More
          </button>
        </div>

        {/* Stats section for social proof */}
        <div className="final-stats">
          <div className="stat-item">
            <div className="stat-number">10K+</div>
            <div className="stat-label">Active Users</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">5K+</div>
            <div className="stat-label">Lives Saved</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">2min</div>
            <div className="stat-label">Avg Response</div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default FinalSection;