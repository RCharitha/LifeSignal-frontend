import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import { 
  FaEnvelope, 
  FaLock, 
  FaSignInAlt, 
  FaGoogle, 
  FaFacebook,
  FaEye,
  FaEyeSlash,
  FaExclamationCircle
} from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
    setLoginError('');
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

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
    setLoginError('');

    try {
      // Send login request to backend
      const response = await fetch('https://lifesignal-backend.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Store token and user data
        localStorage.setItem('token', data.token);
        localStorage.setItem('userData', JSON.stringify(data.user));
        
        // If remember me is checked, store additional info
        if (formData.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        } else {
          localStorage.removeItem('rememberMe');
        }
        
        console.log('Login successful!', data.user);
        
        // Navigate to dashboard with user data
        navigate("/dashboard", { state: data.user });
      } else {
        // Handle login error
        setLoginError(data.message || 'Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Cannot connect to the server. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    // Implement social login logic here
  };

  // Check if user was previously logged in with remember me
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    const rememberMe = localStorage.getItem('rememberMe');
    const userData = localStorage.getItem('userData');
    
    if (token && rememberMe === 'true' && userData) {
      // Auto-login if remember me was checked
      const user = JSON.parse(userData);
      navigate("/dashboard", { state: user });
    }
  }, [navigate]);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>

        {loginError && (
          <div className="error-message">
            <FaExclamationCircle />
            {loginError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>
              <MdEmail /> Email Address
            </label>
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

          <div className="form-group">
            <label>
              <FaLock /> Password
            </label>
            <div className="input-container">
              <FaLock className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter your password"
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
          </div>

          <div className="form-group terms-group">
            <input
              type="checkbox"
              name="rememberMe"
              id="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <label htmlFor="rememberMe">Remember me for 30 days</label>
          </div>

          <div className="forgot-password">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <button 
            type="submit" 
            className={`auth-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <FaSignInAlt className="spinning" /> Logging in...
              </>
            ) : (
              <>
                Login <FaSignInAlt />
              </>
            )}
          </button>
        </form>

        <div className="social-login">
          <p>Or continue with</p>
          <div className="social-buttons">
            <button 
              className="social-btn google"
              onClick={() => handleSocialLogin('google')}
            >
              <FaGoogle /> Google
            </button>
            <button 
              className="social-btn facebook"
              onClick={() => handleSocialLogin('facebook')}
            >
              <FaFacebook /> Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;