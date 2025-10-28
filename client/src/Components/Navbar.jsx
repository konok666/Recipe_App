import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserStatus = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        if (parsedUser.isLoggedIn) {
          setIsLoggedIn(true);
          setUser(parsedUser);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    checkUserStatus();

    const handleFocus = () => {
      checkUserStatus();
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkUserStatus();
      }
    };

    const handleStorageChange = (e) => {
      if (e.key === 'user') {
        checkUserStatus();
      }
    };

    const handleLoginEvent = () => {
      setTimeout(checkUserStatus, 100);
    };

    const handleLogoutEvent = () => {
      setTimeout(checkUserStatus, 100);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('userLogin', handleLoginEvent);
    window.addEventListener('userLogout', handleLogoutEvent);

    const interval = setInterval(checkUserStatus, 2000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('userLogin', handleLoginEvent);
      window.removeEventListener('userLogout', handleLogoutEvent);
      clearInterval(interval);
    };
  }, []);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    setOpen(false);

    window.dispatchEvent(new CustomEvent('userLogout'));
    
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2 className="app-title">RecipeHub</h2>
        <Link to="/" className="nav-link home-link">
          Home
        </Link>
        
        {/* Show these links only when user is logged in */}
        {isLoggedIn && (
          <>
            <Link to="/allrecipe" className="nav-link">
              All Recipes
            </Link>
            <Link to="/mycookbook" className="nav-link">
              My Cookbook
            </Link>
            <Link to="/favorites" className="nav-link">
              My Favorites
            </Link>
            <Link to="/mealplanner" className="nav-link">
              My Plan
            </Link>
          </>
        )}
      </div>

      <div className="navbar-center">
        {/* Center content can be added here if needed */}
      </div>

      <div className="navbar-right">
        <div className="user-menu" ref={dropdownRef}>
          <FaUserCircle className="user-icon" onClick={toggleDropdown} />
          {open && (
            <div className="dropdown-menu">
              {isLoggedIn ? (
                <>
                  <div className="user-info">
                    <p>Welcome, {user?.name || user?.email}</p>
                  </div>
                  <Link to="/profile" onClick={() => setOpen(false)}>Profile</Link>
                  <button onClick={handleLogout} className="logout-btn">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setOpen(false)}>Sign In</Link>
                  <Link to="/signup" onClick={() => setOpen(false)}>Sign Up</Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
