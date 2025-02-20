import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const passwordRegex = /^(?=.\d)(?=.[!@#$%^&])(?=.[a-z])(?=.*[A-Z]).{8,}$/;

const ResetPassword = () => {
  const params = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRequesting, setIsRequesting] = useState(false);
  const [message, setMessage] = useState("");

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword === "" || confirmPassword === "") {
      setMessage("Both fields are required");
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    if (!passwordRegex.test(newPassword)) {
      setMessage(
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
      return;
    }
    setIsRequesting(true);
    setMessage("");
    try {
      const res = await axios.post(
        `http://localhost:3001/api/auth/reset-password`,
        { password: newPassword, token: params.token }
      );
      setNewPassword("");
      setConfirmPassword("");
      setMessage("Password has been reset successfully.");
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
        padding: "1rem",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#333", marginBottom: "1.5rem" }}>
          Reset Password
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="newPassword"
              style={{ display: "block", marginBottom: "0.5rem", color: "#333" }}
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={handleNewPasswordChange}
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "5px",
                border: "1px solid #ccc",
                fontSize: "1rem",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              htmlFor="confirmPassword"
              style={{ display: "block", marginBottom: "0.5rem", color: "#333" }}
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "5px",
                border: "1px solid #ccc",
                fontSize: "1rem",
                boxSizing: "border-box",
              }}
            />
          </div>
          <button
            type="submit"
            disabled={isRequesting}
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#007bff",
              color: "#fff",
              fontSize: "1rem",
              cursor: isRequesting ? "not-allowed" : "pointer",
              transition: "background-color 0.3s ease",
            }}
          >
            {isRequesting ? "Requesting..." : "Submit"}
          </button>
        </form>
        {message && (
          <p
            style={{
              marginTop: "1rem",
              textAlign: "center",
              color: message.includes("error") ? "#d9534f" : "#5cb85c",
              fontSize: "0.9rem",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;