import React from "react";
import "./Feature.css";
import FeatureCard from "./FeatureCard";

import {
  FaUserShield,
  FaMapMarkerAlt,
  FaHandsHelping,
  FaBell,
  FaLocationArrow,
} from "react-icons/fa";

function Feature() {
  return (
    <section className="features-section" id="feature">
      <h2 className="features-title">Why Choose Our Safety Network? <br /></h2>


      <div className="features-container">

        <FeatureCard
          icon={<FaUserShield />}
          title="Easy & Quick Registration"
          description="Create your account in seconds with a simple and secure signup process. No lengthy forms, no complications. Just basic details and you’re ready to become part of a life-saving community. Quick onboarding ensures that help is always just a tap away whenever an emergency occurs."
        />

        <FeatureCard
          icon={<FaMapMarkerAlt />}
          title="Find Nearest Responder"
          description="Our smart location system instantly connects you with verified volunteers and responders near you. In critical situations, every second matters — this feature ensures the closest help reaches you first, reducing response time and increasing safety."
        />

        <FeatureCard
          icon={<FaHandsHelping />}
          title="Save People & Be a Hero"
          description="Become a real-life hero by helping those in need around you. Receive alerts when someone nearby requires assistance and step forward to make a difference. Your small action could save a life, support a victim, or prevent a crisis from escalating."
        />

        <FeatureCard
          icon={<FaBell />}
          title="Instant SOS Alert"
          description="Send emergency alerts to nearby helpers, trusted contacts, and authorities with just one tap (or shake). Your live location, emergency type, and urgency level are shared instantly so responders know exactly how to help — fast, precise, and reliable."
        />

        <FeatureCard
          icon={<FaLocationArrow />}
          title="Live Location Tracking"
          description="Share your real-time location continuously during an emergency so rescuers can track your movement accurately. This feature is crucial when you are unable to communicate or are on the move. It ensures responders never lose sight of you until you are safe."
        />

      </div>
      <div>
        <p>----</p>
      </div>
    </section>
  );
}

export default Feature;