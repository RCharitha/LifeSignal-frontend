import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './Auth.css';
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaPhone, 
  FaUserPlus,
  FaGoogle, 
  FaFacebook,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
  FaMapMarkerAlt
} from 'react-icons/fa';
import { MdEmail, MdPerson } from 'react-icons/md';

function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [location, setLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }

    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    if (!password) {
      setPasswordStrength('');
      return;
    }

    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const strengthCount = [hasLowerCase, hasUpperCase, hasNumbers, hasSpecialChar].filter(Boolean).length;

    if (password.length < 6) setPasswordStrength('weak');
    else if (password.length >= 8 && strengthCount >= 3) setPasswordStrength('strong');
    else if (password.length >= 6 && strengthCount >= 2) setPasswordStrength('medium');
    else setPasswordStrength('weak');
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    else if (formData.fullName.length < 3) newErrors.fullName = 'Name must be at least 3 characters';

    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';

    if (!formData.phone) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, '')))
      newErrors.phone = 'Enter valid 10-digit number';

    if (!formData.password) newErrors.password = 'Password required';
    else if (formData.password.length < 6) newErrors.password = 'Min 6 characters';

    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm password';
    else if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = 'Passwords do not match';

    if (!formData.agreeTerms) newErrors.agreeTerms = 'Accept terms required';
    if (!location) newErrors.location = "Please allow location access";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

   
  
  try {
    const response = await fetch('https://lifesignal-backend.onrender.com/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        latitude: location?.latitude || null,
        longitude: location?.longitude || null
      })
    });
    
    const data = await response.json();
    
    if (response.ok && data.success) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('userData', JSON.stringify(data.user));
      
      // Navigate to Add Emergency Contacts page instead of directly to dashboard
      navigate("/add-contacts", { state: data.user });
    } else {
      setErrors({ submit: data.message || 'Registration failed' });
    }
  } catch (error) {
    setErrors({ submit: 'Network error. Please try again.' });
  } finally {
    setIsLoading(false);
  }
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("Geolocation not supported");
      setErrors(prev => ({ ...prev, location: 'Geolocation not supported' }));
      return;
    }

    setLocationStatus("Fetching location...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setLocationStatus("✅ Location captured successfully");
        setErrors(prev => ({ ...prev, location: '' }));
      },
      (error) => {
        console.error("Location error:", error);
        setLocationStatus("❌ Permission denied or error occurred");
        setErrors(prev => ({ ...prev, location: 'Location access is required for registration' }));
      }
    );
  };

  const handleSocialRegister = (provider) => {
    console.log(`Register with ${provider}`);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>

        {/* Display submit error */}
        {errors.submit && (
          <div className="error-message" style={{marginBottom: '20px', padding: '10px', background: '#fed7d7', color: '#c53030', borderRadius: '8px'}}>
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {/* Full Name */}
          <div className="form-group">
            <label><MdPerson /> Full Name</label>
            <div className="input-container">
              <FaUser className="input-icon" />
              <input 
                type="text" 
                name="fullName" 
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                className={errors.fullName ? 'error' : ''}
              />
            </div>
            {errors.fullName && <small className="error-text">{errors.fullName}</small>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label><MdEmail /> Email</label>
            <div className="input-container">
              <FaEnvelope className="input-icon" />
              <input 
                type="email" 
                name="email" 
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
            </div>
            {errors.email && <small className="error-text">{errors.email}</small>}
          </div>

          {/* Phone */}
          <div className="form-group">
            <label><FaPhone /> Phone</label>
            <div className="input-container">
              <FaPhone className="input-icon" />
              <input 
                type="tel" 
                name="phone" 
                placeholder="Enter 10-digit phone number"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? 'error' : ''}
              />
            </div>
            {errors.phone && <small className="error-text">{errors.phone}</small>}
          </div>

          {/* Password */}
          <div className="form-group">
            <label><FaLock /> Password</label>
            <div className="input-container">
              <FaLock className="input-icon" />
              <input 
                type={showPassword ? "text" : "password"}
                name="password" 
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <small className="error-text">{errors.password}</small>}
            
            {/* Password strength indicator */}
            {formData.password && (
              <div className="password-strength">
                <div className="strength-bar">
                  <div className={`strength-fill ${passwordStrength}`}></div>
                </div>
                <span className="strength-text">
                  {passwordStrength === 'weak' && 'Weak password'}
                  {passwordStrength === 'medium' && 'Medium password'}
                  {passwordStrength === 'strong' && 'Strong password'}
                </span>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label><FaShieldAlt /> Confirm Password</label>
            <div className="input-container">
              <FaShieldAlt className="input-icon" />
              <input 
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword" 
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'error' : ''}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && <small className="error-text">{errors.confirmPassword}</small>}
          </div>

          {/* Location */}
          <div className="form-group">
            <label><FaMapMarkerAlt /> Location Access</label>
            <button 
              type="button" 
              onClick={getLocation} 
              className={`location-btn ${location ? 'success' : ''}`}
            >
              <FaMapMarkerAlt />
              {location ? " Location Captured ✓" : " Allow Location Access"}
            </button>
            {locationStatus && <small className="location-status">{locationStatus}</small>}
            {errors.location && <small className="error-text">{errors.location}</small>}
          </div>

          {/* Terms and Conditions */}
          <div className="form-group terms-group">
            <input
              type="checkbox"
              name="agreeTerms"
              id="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
            />
            <label htmlFor="agreeTerms">
              I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>
            </label>
          </div>
          {errors.agreeTerms && <small className="error-text">{errors.agreeTerms}</small>}

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={isLoading}
            className="auth-button"
          >
            {isLoading ? (
              <>
                <FaUserPlus className="spinning" /> Creating Account...
              </>
            ) : (
              <>
                Create Account <FaUserPlus />
              </>
            )}
          </button>
        </form>

        {/* Social Login */}
        <div className="social-login">
          <p>Or sign up with</p>
          <div className="social-buttons">
            <button 
              className="social-btn google"
              onClick={() => handleSocialRegister('google')}
            >
              <FaGoogle /> Google
            </button>
            <button 
              className="social-btn facebook"
              onClick={() => handleSocialRegister('facebook')}
            >
              <FaFacebook /> Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;