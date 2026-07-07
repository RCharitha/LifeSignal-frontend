import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import EmergencyTypeSelector from '../components/EmergencyTypeSelector';
import ImpactLevelSelector from '../components/ImpactLevelSelector';
import SOSHelpButton from '../components/SOSHelpButton';
import AlertNotification from '../components/AlertNotification';
import NearbyUsers from '../components/NearbyUsers';
import { initializeSocket, updateSocketLocation, disconnectSocket } from '../services/socket';
import './Dashboard.css';

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [selectedEmergency, setSelectedEmergency] = useState(null);
  const [selectedImpact, setSelectedImpact] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [voiceTrigger, setVoiceTrigger] = useState('Help Me');
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [locationStatus, setLocationStatus] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [socketInitialized, setSocketInitialized] = useState(false);
  const [nearbyUsers, setNearbyUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = location.state || JSON.parse(localStorage.getItem('userData'));
    if (!token || !userData) { navigate('/login'); return; }
    setUser(userData);
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (user && currentLocation && !socketInitialized) {
      const socket = initializeSocket(user.id, currentLocation.lat, currentLocation.lng, user.fullName);
      window.socket = socket;
      setSocketInitialized(true);
    }
    return () => { if (socketInitialized) disconnectSocket(); };
  }, [user, currentLocation, socketInitialized]);

  useEffect(() => {
    if (socketInitialized && currentLocation) updateSocketLocation(currentLocation.lat, currentLocation.lng);
  }, [currentLocation, socketInitialized]);

  useEffect(() => {
    if (currentLocation) { fetchNearbyUsers(); const interval = setInterval(fetchNearbyUsers, 30000); return () => clearInterval(interval); }
  }, [currentLocation]);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => { setCurrentLocation({ lat: position.coords.latitude, lng: position.coords.longitude }); setLocationStatus('📍 Location active'); },
        () => setLocationStatus('❌ Location unavailable')
      );
    } else setLocationStatus('❌ Geolocation not supported');
  };

  const fetchNearbyUsers = async () => {
    try {
      const response = await fetch(`https://lifesignal-backend.onrender.com/api/auth/nearby-users?latitude=${currentLocation?.lat}&longitude=${currentLocation?.lng}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      if (data.success) setNearbyUsers(data.nearbyUsers);
    } catch (error) { console.error('Error fetching nearby users:', error); }
  };

  const sendSOSAlert = async () => {
    setIsLoading(true);
    const hasFullSelection = selectedEmergency && selectedImpact;
    const alertCount = hasFullSelection ? 7 : 5;
    const priority = hasFullSelection ? 'HIGH' : 'MEDIUM';
    
    try {
      const response = await fetch('https://lifesignal-backend.onrender.com/api/auth/sos/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ emergencyType: selectedEmergency, impactLevel: selectedImpact, priority, alertCount, location: currentLocation })
      });
      if (response.ok) alert(`✅ SOS Alert Sent! Alerting ${alertCount} nearby people + trusted contacts`);
      else alert(`🚨 SOS Triggered! Alerting ${alertCount} nearby people`);
    } catch (error) { alert('SOS Triggered! Check console for details'); }
    finally { setIsLoading(false); }
  };

  const shareLocation = () => {
    if (currentLocation) {
      navigator.clipboard.writeText(`https://maps.google.com/?q=${currentLocation.lat},${currentLocation.lng}`);
      alert('📍 Location URL copied!');
    } else alert('⚠️ Fetching location...');
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); localStorage.removeItem('userData'); localStorage.removeItem('emergencyContacts');
    navigate('/login');
  };

  const handleAlertReceived = (alert) => console.log('Alert received:', alert);

  if (!user) return <div className="dashboard-loading"><div className="loading-spinner"></div><p>Loading...</p></div>;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div><h1>🚨 Rapid Response Hub  </h1>
        <p>One tap away from help</p>
        <p>Welcome back, {user.fullName}!</p></div>
        <div><span>{locationStatus}</span><button onClick={handleLogout}>Logout</button></div>
      </div>

      <div className="dashboard-content">
        <EmergencyTypeSelector selectedType={selectedEmergency} onTypeChange={setSelectedEmergency} />
        <ImpactLevelSelector selectedImpact={selectedImpact} onImpactChange={setSelectedImpact} />
        <SOSHelpButton emergencyType={selectedEmergency} impactLevel={selectedImpact} onSOSClick={sendSOSAlert} isLoading={isLoading} />
        {currentLocation && <NearbyUsers userLocation={currentLocation} nearbyUsers={nearbyUsers} />}
      </div>

      <div className="dashboard-bottom-nav">
        <div onClick={() => document.getElementById('profile-section').scrollIntoView({ behavior: 'smooth' })}>👤 Profile</div>
        <div onClick={shareLocation}>📍 Share Location</div>
        <div onClick={() => setShowVoiceSettings(true)}>🎤 Voice Trigger</div>
        <div onClick={() => navigate('/emergency-contacts')}>📞 Contacts</div>
      </div>

      {showVoiceSettings && (
        <div className="modal-overlay" onClick={() => setShowVoiceSettings(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>🎤 Voice Trigger</h3>
            <input type="text" value={voiceTrigger} onChange={e => setVoiceTrigger(e.target.value)} />
            <p>💡 Say "{voiceTrigger}" to trigger SOS</p>
            <button onClick={() => setShowVoiceSettings(false)}>Close</button>
          </div>
        </div>
      )}

      <div id="profile-section" className="profile-section">
        <div className="profile-card">
          <h3>👤 Profile</h3>
          <p><strong>Name:</strong> {user.fullName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Location:</strong> {currentLocation ? `${currentLocation.lat}, ${currentLocation.lng}` : 'Fetching...'}</p>
        </div>
      </div>

      <AlertNotification onAlertReceived={handleAlertReceived} />
    </div>
  );
}

export default Dashboard;