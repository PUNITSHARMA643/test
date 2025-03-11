import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import "./Auth.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Navbar from "./Navbar";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const usernameRegex = /^[a-z0-9_.]{2,}$/;

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({});
  const [isRequesting, setIsRequesting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get("token")) {
      navigate("/take-test", { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
    else if (name === "username") setUsername(value);
  };

  const resetData = () => {
    setEmail("");
    setPassword("");
    setUsername("");
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};
    if (!emailRegex.test(email) && !isLogin)
      newErrors.email = "Invalid email address";
    if (email.length <= 0 && isLogin)
      newErrors.email = "Email or Username is required";
    if (!passwordRegex.test(password)) {
      newErrors.password =
        "Password must be at least 8 characters long, contain at least one number, one special character, one uppercase and one lowercase letter";
    }
    if (!isLogin && !usernameRegex.test(username)) {
      newErrors.username =
        "Username must be at least 2 characters long and can contain only letters, numbers, underscores, and periods";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      if (isLogin) {
        try {
          setIsRequesting(true);
          const res = await axios.post("http://localhost:3001/api/auth/login", {
            emailOrUsername: email,
            password: password,
          });
          
          if (res.status === 200) {
            toast.success("Login successful");
            Cookies.set("token", res.data.token, { expires: 1 });
            navigate("/take-test", { replace: true });
          }
        } catch (err) {
          console.error('Login error:', err.response || err);
          toast.error(err.response?.data?.message || "Login failed");
        } finally {
          setIsRequesting(false);
        }
      } else {
        try {
          setIsRequesting(true);
          const res = await axios.post("http://localhost:3001/api/auth/register", {
            username: username,
            email: email,
            password: password,
          });
          
          if (res.status === 201 || res.status === 200) {
            toast.success(res.data.message);
            setIsLogin(true);
            resetData();
          }
        } catch (err) {
          toast.error(err.response?.data?.message || "Registration failed");
        } finally {
          setIsRequesting(false);
        }
      }
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/auth/google-request");
      window.location.href = res.data.url;
    } catch (err) {
      toast.error(err.response?.data?.message || "Google authentication failed");
    }
  };

  return (
    <div className="auth-page">
      <Navbar />
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>{isLogin ? "Welcome Back!" : "Create Account"}</h2>
            <p>{isLogin ? "Sign in to continue" : "Get started with your account"}</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={handleChange}
                  placeholder="Enter username"
                />
                {errors.username && <span className="error">{errors.username}</span>}
              </div>
            )}

            <div className="form-group">
              <label>{isLogin ? "Email or Username" : "Email"}</label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder={isLogin ? "Enter email or username" : "Enter email"}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Enter password"
              />
              {errors.password && <span className="error">{errors.password}</span>}
            </div>

            <button type="submit" className="auth-button" disabled={isRequesting}>
              {isRequesting ? "Processing..." : isLogin ? "Sign In" : "Sign Up"}
            </button>
          </form>

          <div className="auth-divider">
            <span></span>
            <div>or continue with</div>
            <span></span>
          </div>

          <button onClick={handleGoogleAuth} className="google-button">
            <FcGoogle size={20} />
            <span>Google</span>
          </button>

          <div className="auth-toggle">
            {isLogin ? (
              <p>Don't have an account? <button onClick={() => setIsLogin(false)}>Sign Up</button></p>
            ) : (
              <p>Already have an account? <button onClick={() => setIsLogin(true)}>Sign In</button></p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}