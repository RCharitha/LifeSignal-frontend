import React from "react";
import "./Hero.css";
import heroImage from "../assets/img1.png";

function Hero() {
  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>
            A COMMUNITY-POWERED <br /> 
            <span>Emergency Response Network</span>
          </h1>
          <p className="tagline">Help is closer than you think.</p>
          <p className="subtext">Because emergencies don't wait.</p>
          
          <div className="hero-buttons">
            <button className="hero-btn hero-btn-primary">
              Get Started
            </button>
            <button className="hero-btn hero-btn-secondary">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Optional scroll indicator */}
      <div className="scroll-indicator">
        <span className="scroll-text">Scroll</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
}

export default Hero;