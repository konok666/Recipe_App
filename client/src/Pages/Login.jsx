import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Style/Login.css';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const usersRaw = localStorage.getItem('registeredUsers');
      const registeredUsers = usersRaw ? JSON.parse(usersRaw) : [];
      const foundUser = registeredUsers.find(u => u.email === formData.email && u.password === formData.password);
      if (!foundUser) {
        alert('No account found for these credentials. Please sign up first.');
        setIsLoading(false);
        return;
      }
      
      localStorage.setItem('user', JSON.stringify({
        name: foundUser.name,
        email: foundUser.email,
        isLoggedIn: true
      }));
      
      window.dispatchEvent(new CustomEvent('userLogin'));
      
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'user',
        newValue: localStorage.getItem('user'),
        oldValue: null
      }));
      
      alert('Login successful! Welcome to RecipeHub!');
      navigate('/allrecipe'); // Navigate to all recipes page
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-image">
          <img src="/login_logo.png" alt="RecipeHub Login" />
        </div>
        <h1 className="login-title">Welcome Back!</h1>
        <p className="login-subtitle">Sign in to your RecipeHub account</p>
        
        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="login-input"
              required
            />
          </div>
          
          <div className="input-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="login-input"
              required
            />
          </div>
          <div className="login-footer">
            <button 
              type="button" 
              className="forgot-password" 
              onClick={() => navigate('/forgotpassword')}
            >
              Forgot Password?
            </button>
          </div>
          <div className="login-buttons">
            <button 
              type="submit" 
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
            
            <div className="divider">
              <span>or</span>
            </div>
            
            <button 
              type="button" 
              className="login-button" 
              onClick={() => navigate('/signup')}
            >
              Create New Account
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
}

export default Login;
