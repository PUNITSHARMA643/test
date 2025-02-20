import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [isRequesting, setIsRequesting] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    setEmailOrUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (emailOrUsername === "") {
      setMessage("Email or Username is required");
      return;
    }
    setIsRequesting(true);
    setMessage("");
    try {
      const res = await axios.post(
        "http://localhost:3001/api/auth/forgot-password",
        { emailOrUsername }
      );
      setMessage(
        "If an account with that email or username exists, a password reset link has been sent."
      );
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
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="emailOrUsername"
              style={{ display: "block", marginBottom: "0.5rem", color: "#333" }}
            >
              Email or Username
            </label>
            <input
              type="text"
              id="emailOrUsername"
              name="emailOrUsername"
              value={emailOrUsername}
              onChange={handleInputChange}
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

export default ForgotPassword;