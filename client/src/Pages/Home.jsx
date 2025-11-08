import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from "../Components/Dashboard";
import "../Style/Home.css";

function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUserStatus = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          const parsed = JSON.parse(userData);
          setIsLoggedIn(!!parsed?.isLoggedIn);
        } catch {
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    checkUserStatus();

    const handleStorage = (e) => {
      if (e.key === 'user') checkUserStatus();
    };
    const handleLoginEvent = () => setTimeout(checkUserStatus, 100);
    const handleLogoutEvent = () => setTimeout(checkUserStatus, 100);

    window.addEventListener('storage', handleStorage);
    window.addEventListener('userLogin', handleLoginEvent);
    window.addEventListener('userLogout', handleLogoutEvent);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('userLogin', handleLoginEvent);
      window.removeEventListener('userLogout', handleLogoutEvent);
    };
  }, []);

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <div className="home-container">
      {/* Main Content */}
      <div className="hero-content">
        <h1 className="recipe-title">Welcome to RecipeHub</h1>
        
        <div className="website-description">
          <h2>Discover, Create, and Share Amazing Recipes</h2>
          <p>
            RecipeHub is the premier web-based destination for food ideas. Whether you're an experienced chef,
            or a cooking beginner, our platform offers a rich repository of delicious dishes from all over the world.
            the world. Create your personal cookbook, share your favorite dishes with the community, and
            Discover new flavors that will delight your taste buds.
          </p>
          
          <div className="features">
            <div className="feature-item">
              <h3>🍳 Explore Recipes</h3>
              <p>Browse through hundreds of carefully curated recipes from different cuisines and cultures.</p>
            </div>
            
            <div className="feature-item">
              <h3>📚 Personal Cookbook</h3>
              <p>Save your favorite recipes and create your own personalized cookbook collection.</p>
            </div>
            
            <div className="feature-item">
              <h3>👨‍🍳 Share & Connect</h3>
              <p>You can share your food creations and connect with other food enthusiasts.</p>
            </div>
          </div>
          
          {!isLoggedIn && (
            <div className="cta-section">
              <p className="cta-text">Ready to start your culinary journey?</p>
              <button className="get-started-btn" onClick={handleGetStarted}>Get Started</button>
            </div>
          )}
        </div>
      </div>

      {/* ✅ Dashboard Section */}
      <Dashboard />
    </div>
  );
}

export default Home;
