import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/Login.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Login failed. Please try again.");
        setIsLoading(false);
        return;
      }

      // ✅ Store token & user info
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: data.user.name,
          email: data.user.email,
          token: data.token,
          isLoggedIn: true,
        })
      );

      alert("✅ Login successful! Welcome to RecipeHub 🍳");
      navigate("/allrecipe");
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again later.");
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
              onClick={() => navigate("/forgotpassword")}
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
              {isLoading ? "Signing In..." : "Sign In"}
            </button>

            <div className="divider">
              <span>or</span>
            </div>

            <button
              type="button"
              className="login-button"
              onClick={() => navigate("/signup")}
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
