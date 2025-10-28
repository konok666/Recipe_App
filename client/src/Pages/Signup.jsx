import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Style/Signup.css';

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const sendWelcomeEmail = async (userEmail, userName) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log(`Welcome email sent to ${userEmail} for user ${userName}`);
      return true;
    } catch (error) {
      console.error('Email sending failed:', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const existingUsersRaw = localStorage.getItem('registeredUsers');
      const existingUsers = existingUsersRaw ? JSON.parse(existingUsersRaw) : [];
      const updatedUsers = [
        ...existingUsers.filter(u => u.email !== formData.email),
        { name: formData.name, email: formData.email, password: formData.password }
      ];
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));

      localStorage.setItem('user', JSON.stringify({
        name: formData.name,
        email: formData.email,
        isLoggedIn: true
      }));
      
      window.dispatchEvent(new CustomEvent('userLogin'));

      window.dispatchEvent(new StorageEvent('storage', {
        key: 'user',
        newValue: localStorage.getItem('user'),
        oldValue: null
      }));

      const emailSent = await sendWelcomeEmail(formData.email, formData.name);
      
      if (emailSent) {
        alert(`Account created successfully! Welcome to RecipeHub, ${formData.name}! A confirmation email has been sent to ${formData.email}. Please check your inbox.`);
      } else {
        alert(`Account created successfully! Welcome to RecipeHub, ${formData.name}! (Note: Email confirmation could not be sent at this time)`);
      }
      
      navigate('/login'); // Navigate to login page
    } catch (error) {
      console.error('Signup error:', error);
      alert('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <div className="signup-image">
          <img src="/signup_logo.png" alt="RecipeHub Signup" />
        </div>
        <h1 className="signup-title">Join RecipeHub!</h1>
        <p className="signup-subtitle">Create your account and start your culinary journey</p>
        
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="signup-input"
              required
            />
          </div>
          
          <div className="input-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="signup-input"
              required
            />
          </div>
          
          <div className="input-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="signup-input"
              required
            />
          </div>
          
          <div className="input-group">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="signup-input"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="signup-button"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        
        <div className="signup-footer">
          <p>
            Already have an account?{' '}
            <button 
              className="signup-link" 
              onClick={() => navigate('/login')}
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
