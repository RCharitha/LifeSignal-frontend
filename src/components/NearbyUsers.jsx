import React from 'react';
import './NearbyUsers.css';
import { FaUserFriends, FaMapMarkerAlt } from 'react-icons/fa';

function NearbyUsers({ userLocation, nearbyUsers }) {
  if (!nearbyUsers || nearbyUsers.length === 0) {
    return (
      <div className="nearby-users-container">
        <div className="nearby-header">
          <FaUserFriends className="header-icon" />
          <h3>Nearby Helpers</h3>
        </div>
        <div className="no-users">
          <p>No nearby users found within 10km</p>
          <small>Share your location to see nearby helpers</small>
        </div>
      </div>
    );
  }

  return (
    <div className="nearby-users-container">
      <div className="nearby-header">
        <div className="header-left">
          <FaUserFriends className="header-icon" />
          <h3>Nearby Helpers</h3>
          <span className="user-count">{nearbyUsers.length} people nearby</span>
        </div>
      </div>

      <div className="nearby-content">
        <div className="nearby-stats">
          <div className="stat">
            <span className="stat-value">{nearbyUsers.length}</span>
            <span className="stat-label">Potential Helpers</span>
          </div>
          <div className="stat">
            <span className="stat-value">
              {nearbyUsers.filter(u => parseFloat(u.distance) < 1).length}
            </span>
            <span className="stat-label">Within 1km</span>
          </div>
        </div>

        <div className="users-list">
          {nearbyUsers.map((user) => (
            <div key={user.id} className="user-card">
              <div className="user-avatar">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="user-info">
                <div className="user-name">
                  {user.name}
                  {parseFloat(user.distance) < 0.5 && (
                    <span className="nearby-badge">Very Close!</span>
                  )}
                </div>
                <div className="user-distance">
                  <FaMapMarkerAlt />
                  <span>{user.distanceText}</span>
                </div>
                <div className="user-phone">
                  📞 {user.phone}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="alert-info">
          <span>🚨 When you trigger SOS, these {nearbyUsers.length} nearby helpers will receive your alert with live location!</span>
        </div>
      </div>
    </div>
  );
}

export default NearbyUsers;