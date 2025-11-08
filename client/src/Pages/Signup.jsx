import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // 👁️ import icons
import "../Style/Signup.css";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("❌ Passwords do not match!");
      return;
    }

    if (formData.password.length < 6) {
      alert("⚠️ Password must be at least 6 characters long!");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert("🎉 Account created successfully!");

        // ✅ Save this user to the list of all users for Profile search
        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
        const isAlreadyRegistered = existingUsers.some(
          (u) => u.email === formData.email.trim().toLowerCase()
        );

        if (!isAlreadyRegistered) {
          existingUsers.push({
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            image: "",
          });
          localStorage.setItem("users", JSON.stringify(existingUsers));
        }

        navigate("/login");
      } else {
        alert(data.message || "❌ Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("🚨 Something went wrong. Please try again later.");
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
        <p className="signup-subtitle">
          Create your account and start your culinary journey 🍳
        </p>

        <form className="signup-form" onSubmit={handleSubmit}>
          {/* Name */}
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

          {/* Email */}
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

          {/* Password */}
          <div className="input-group password-group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="signup-input"
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="input-group password-group">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="signup-input"
              required
            />
            <span
              className="toggle-password"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" className="signup-button" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="signup-footer">
          <p>
            Already have an account?{" "}
            <button
              className="signup-link"
              onClick={() => navigate("/login")}
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
