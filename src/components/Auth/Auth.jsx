import { useState } from 'react';
import { Heart } from 'lucide-react';
import './Auth.css';

function Auth({ onAuthComplete }) {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Sign Up specific validations
    if (!isSignIn) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulate API call
      console.log(isSignIn ? 'Signing in...' : 'Signing up...', formData);
      
      // For demo purposes, proceed to next step
      setTimeout(() => {
        onAuthComplete();
      }, 500);
    }
  };

  const toggleAuthMode = () => {
    setIsSignIn(!isSignIn);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
  };

  return (
    <div className="auth-screen">
      <div className="auth-container">
        {/* Logo */}
        <div className="auth-logo">
          <Heart size={80} fill="#ff4e7a" color="#ff4e7a" />
        </div>

        {/* Title */}
        <h1 className="auth-title">
          {isSignIn ? 'Welcome' : 'Create Account'}
        </h1>
        <p className="auth-subtitle">
          {isSignIn 
            ? 'Sign in to continue your journey' 
            : 'Sign up to find your perfect match'}
        </p>

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit}>
          {!isSignIn && (
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
          )}

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          {!isSignIn && (
            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>
          )}

          {isSignIn && (
            <div className="forgot-password">
              <a href="#">Forgot Password?</a>
            </div>
          )}

          <button type="submit" className="auth-submit-btn">
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        {/* Toggle Auth Mode */}
        <div className="auth-toggle">
          <span>
            {isSignIn ? "Don't have an account? " : "Already have an account? "}
          </span>
          <button onClick={toggleAuthMode} className="toggle-btn">
            {isSignIn ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
      </div>

      {/* Decorative Couple Silhouette */}
      <div className="auth-decoration">
        <svg viewBox="0 0 400 300" className="couple-silhouette">
          {/* Male figure */}
          <ellipse cx="150" cy="240" rx="35" ry="50" fill="rgba(255,255,255,0.15)" />
          <circle cx="150" cy="200" r="25" fill="rgba(255,255,255,0.15)" />
          
          {/* Female figure */}
          <ellipse cx="250" cy="245" rx="40" ry="50" fill="rgba(255,255,255,0.15)" />
          <circle cx="250" cy="205" r="22" fill="rgba(255,255,255,0.15)" />
          
          {/* Heart between them */}
          <path 
            d="M200 225 L195 230 L200 235 L205 230 Z" 
            fill="rgba(255,255,255,0.3)"
          />
        </svg>
      </div>
    </div>
  );
}

export default Auth;
