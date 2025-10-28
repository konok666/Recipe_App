import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/ForgotPassword.css";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1); // Step 1 = enter email, Step 2 = enter new password

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const usersRaw = localStorage.getItem("registeredUsers");
    const registeredUsers = usersRaw ? JSON.parse(usersRaw) : [];
    const foundUser = registeredUsers.find((u) => u.email === email);

    if (!foundUser) {
      alert("No account found with this email.");
      return;
    }
    setStep(2);
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    const usersRaw = localStorage.getItem("registeredUsers");
    let registeredUsers = usersRaw ? JSON.parse(usersRaw) : [];

    registeredUsers = registeredUsers.map((u) =>
      u.email === email ? { ...u, password: newPassword } : u
    );

    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
    alert("Password reset successful! Please login with your new password.");
    navigate("/login");
  };

  return (
    <div className="forgot-page">
      <div className="forgot-card">
        <h1 className="forgot-title">Reset Your Password</h1>
        <p className="forgot-subtitle">
          {step === 1
            ? "Enter your registered email to reset your password."
            : "Enter your new password below."}
        </p>

        {step === 1 ? (
          <form onSubmit={handleEmailSubmit} className="forgot-form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="forgot-input"
            />
            <button type="submit" className="forgot-button">
              Verify Email
            </button>
          </form>
        ) : (
          <form onSubmit={handlePasswordReset} className="forgot-form">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              required
              className="forgot-input"
            />
            <button type="submit" className="forgot-button">
              Reset Password
            </button>
          </form>
        )}

        <button
          className="back-to-login"
          onClick={() => navigate("/login")}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;
