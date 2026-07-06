import React from "react";
import "./HowItWorks.css";
import { FaUserShield, FaBell, FaUsers, FaMapMarkerAlt, FaHandsHelping } from "react-icons/fa";

function HowItWorks() {
  const steps = [
    {
      icon: <FaUserShield />,
      title: "Register & Set Contacts",
      text: "Create your secure profile in just a few moments and add trusted family members, friends, or guardians as emergency contacts. You can also enable permissions for location sharing and notifications to ensure seamless communication during critical situations. This step prepares your safety network before any emergency occurs."
    },
    {
      icon: <FaBell />,
      title: "Trigger SOS",
      text: "When you feel unsafe or encounter danger, activate the SOS alert with a single tap or by shaking your phone. The system is designed to work even under panic conditions — no complex navigation required. This ensures that help can be requested immediately, even if you cannot speak or type."
    },
    {
      icon: <FaUsers />,
      title: "Alert Sent Nearby",
      text: "Once triggered, your emergency alert is broadcast to nearby verified users, volunteers, and your trusted contacts. They receive your exact location, time of alert, and the severity level, enabling them to assess the situation quickly and respond appropriately."
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Live Location Tracking",
      text: "Your real-time location is continuously shared so responders can track your movement accurately. This is especially crucial if you are on the move, disoriented, or unable to communicate. The system updates your position automatically until the emergency is resolved."
    },
    {
      icon: <FaHandsHelping />,
      title: "Help Reaches You",
      text: "Nearby helpers navigate directly to your location using optimized routing. Whether it’s a volunteer, passerby, or emergency service, the goal is rapid assistance. The platform bridges the critical gap between the moment of danger and the arrival of help."
    }
  ];

  return (
    <section className="how-section">
      <h2 className="how-title">How It Works</h2>
      <p className="how-subtitle">
        From danger to safety — in just seconds.
      </p>

      <div className="timeline">
        <div className="line"></div>

        {steps.map((step, index) => (
          <div className="timeline-item" key={index}>
            
            <div className="node">
              <div className="icon">{step.icon}</div>
            </div>

            <div className="content">
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;