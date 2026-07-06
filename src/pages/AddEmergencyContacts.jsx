import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function AddEmergencyContacts() {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state;

  const [contacts, setContacts] = useState([
    { id: 1, name: '', phone: '', relationship: '', contactOrder: 1 },
    { id: 2, name: '', phone: '', relationship: '', contactOrder: 2 },
    { id: 3, name: '', phone: '', relationship: '', contactOrder: 3 }
  ]);

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (id, field, value) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? { ...contact, [field]: value } : contact
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate first two contacts
    const newErrors = {};
    contacts.forEach(contact => {
      if (contact.contactOrder <= 2) {
        if (!contact.name.trim()) {
          newErrors[`name_${contact.id}`] = 'Name is required';
        }
        if (!contact.phone.trim()) {
          newErrors[`phone_${contact.id}`] = 'Phone number is required';
        } else if (!/^\d{10}$/.test(contact.phone)) {
          newErrors[`phone_${contact.id}`] = 'Enter valid 10-digit number';
        }
      }
    });
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    
    // Save contacts to localStorage
    const validContacts = contacts.filter(c => c.name && c.phone);
    localStorage.setItem('emergencyContacts', JSON.stringify(validContacts));
    
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard", { state: userData });
    }, 1000);
  };

  const handleSkip = () => {
    navigate("/dashboard", { state: userData });
  };

  // Inline styles
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif'
    },
    card: {
      maxWidth: '800px',
      width: '100%',
      background: 'white',
      borderRadius: '20px',
      padding: '40px',
      boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px'
    },
    title: {
      fontSize: '28px',
      color: '#2d3748',
      marginBottom: '10px'
    },
    subtitle: {
      color: '#718096',
      fontSize: '14px'
    },
    contactCard: {
      background: '#f7fafc',
      borderRadius: '15px',
      padding: '20px',
      marginBottom: '20px',
      border: '1px solid #e2e8f0'
    },
    contactTitle: {
      fontSize: '18px',
      color: '#2d3748',
      marginBottom: '15px',
      paddingBottom: '10px',
      borderBottom: '2px solid #e2e8f0'
    },
    required: {
      color: '#e53e3e',
      fontSize: '12px',
      marginLeft: '8px'
    },
    optional: {
      color: '#a0aec0',
      fontSize: '12px',
      marginLeft: '8px'
    },
    row: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '15px',
      marginBottom: '15px'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '5px'
    },
    label: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#4a5568'
    },
    input: {
      padding: '10px 12px',
      border: '2px solid #e2e8f0',
      borderRadius: '10px',
      fontSize: '14px',
      width: '100%',
      boxSizing: 'border-box'
    },
    errorText: {
      color: '#e53e3e',
      fontSize: '12px',
      marginTop: '5px'
    },
    buttonGroup: {
      display: 'flex',
      gap: '15px',
      marginTop: '30px'
    },
    primaryBtn: {
      flex: 1,
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: 'white',
      padding: '12px 20px',
      border: 'none',
      borderRadius: '10px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer'
    },
    secondaryBtn: {
      flex: 1,
      background: 'white',
      color: '#718096',
      padding: '12px 20px',
      border: '2px solid #e2e8f0',
      borderRadius: '10px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer'
    },
    infoBox: {
      background: '#ebf8ff',
      padding: '15px',
      borderRadius: '10px',
      marginTop: '20px'
    },
    infoText: {
      color: '#2c5282',
      fontSize: '14px',
      margin: '5px 0'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Add Emergency Contacts</h1>
          <p style={styles.subtitle}>
            Add trusted people who will receive your SOS alerts with live location
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Contact 1 */}
          <div style={styles.contactCard}>
            <h3 style={styles.contactTitle}>
              📍 Primary Contact <span style={styles.required}>(Required)</span>
            </h3>
            <div style={styles.row}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Full Name *</label>
                <input
                  type="text"
                  style={styles.input}
                  placeholder="Enter full name"
                  value={contacts[0].name}
                  onChange={(e) => handleChange(1, 'name', e.target.value)}
                />
                {errors.name_1 && <span style={styles.errorText}>{errors.name_1}</span>}
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Phone Number *</label>
                <input
                  type="tel"
                  style={styles.input}
                  placeholder="10-digit mobile number"
                  value={contacts[0].phone}
                  onChange={(e) => handleChange(1, 'phone', e.target.value)}
                />
                {errors.phone_1 && <span style={styles.errorText}>{errors.phone_1}</span>}
              </div>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Relationship</label>
              <input
                type="text"
                style={styles.input}
                placeholder="e.g., Mother, Father, Spouse"
                value={contacts[0].relationship}
                onChange={(e) => handleChange(1, 'relationship', e.target.value)}
              />
            </div>
          </div>

          {/* Contact 2 */}
          <div style={styles.contactCard}>
            <h3 style={styles.contactTitle}>
              👤 Secondary Contact <span style={styles.required}>(Required)</span>
            </h3>
            <div style={styles.row}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Full Name *</label>
                <input
                  type="text"
                  style={styles.input}
                  placeholder="Enter full name"
                  value={contacts[1].name}
                  onChange={(e) => handleChange(2, 'name', e.target.value)}
                />
                {errors.name_2 && <span style={styles.errorText}>{errors.name_2}</span>}
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Phone Number *</label>
                <input
                  type="tel"
                  style={styles.input}
                  placeholder="10-digit mobile number"
                  value={contacts[1].phone}
                  onChange={(e) => handleChange(2, 'phone', e.target.value)}
                />
                {errors.phone_2 && <span style={styles.errorText}>{errors.phone_2}</span>}
              </div>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Relationship</label>
              <input
                type="text"
                style={styles.input}
                placeholder="e.g., Brother, Sister, Friend"
                value={contacts[1].relationship}
                onChange={(e) => handleChange(2, 'relationship', e.target.value)}
              />
            </div>
          </div>

          {/* Contact 3 (Optional) */}
          <div style={styles.contactCard}>
            <h3 style={styles.contactTitle}>
              👥 Tertiary Contact <span style={styles.optional}>(Optional)</span>
            </h3>
            <div style={styles.row}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Full Name</label>
                <input
                  type="text"
                  style={styles.input}
                  placeholder="Enter full name"
                  value={contacts[2].name}
                  onChange={(e) => handleChange(3, 'name', e.target.value)}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Phone Number</label>
                <input
                  type="tel"
                  style={styles.input}
                  placeholder="10-digit mobile number"
                  value={contacts[2].phone}
                  onChange={(e) => handleChange(3, 'phone', e.target.value)}
                />
              </div>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Relationship</label>
              <input
                type="text"
                style={styles.input}
                placeholder="e.g., Colleague, Neighbor"
                value={contacts[2].relationship}
                onChange={(e) => handleChange(3, 'relationship', e.target.value)}
              />
            </div>
          </div>

          {/* Info Box */}
          <div style={styles.infoBox}>
            <p style={styles.infoText}>🚨 During emergency, these contacts will receive:</p>
            <p style={styles.infoText}>• SMS with your live location link</p>
            <p style={styles.infoText}>• Emergency alert notification</p>
            <p style={styles.infoText}>• Real-time tracking for 1 hour</p>
          </div>

          <div style={styles.buttonGroup}>
            <button type="button" onClick={handleSkip} style={styles.secondaryBtn}>
              Skip for Now
            </button>
            <button type="submit" style={styles.primaryBtn} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save & Continue →"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEmergencyContacts;