import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import "./css/Auth.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
    else if (name === "username") setUsername(value);
  };

  useEffect(() => {
    if (Cookies.get("token")) {
      navigate("/dashboard", { replace: true });
    }
  }, []);

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
      // Handle form submission
      if (isLogin) {
        try {
          setIsRequesting(true);
          const res = await axios({
            url: "http://localhost:3001/api/auth/login",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            data: {
              emailOrUsername: email,
              password: password,
            },
          });
          if (res.status === 200) {
            toast.success("Login successful");
            Cookies.set("token", res.data.token, { expires: 1 });
            navigate("/dashboard", { replace: true });
          }
        } catch (err) {
          console.log(err.response.data.message);
          toast.error(err.response.data.message);
        } finally {
          setIsRequesting(false);
        }
      } else {
        try {
          setIsRequesting(true);
          const res = await axios({
            url: "http://localhost:3001/api/auth/register",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            data: {
              username: username,
              email: email,
              password: password,
            },
          });
          if (res.status === 201 || res.status === 200) {
            toast.success(res.data.message);
            console.log(res.data.message);
          }
        } catch (err) {
          console.log(err.response.data.message);
          toast.error(err.response.data.message);
        } finally {
          setIsRequesting(false);
        }
      }
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3001/api/auth/google-request"
      );
      console.log(res.data);
      window.location.href = res.data.url;
    } catch (err) {
      console.log(err.response.data.message);
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <p>{isLogin ? "Login" : "Register"}</p>
          <p>
            {isLogin
              ? "Welcome back! Please enter your details."
              : "Create an account to get started."}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                value={username}
                onChange={handleChange}
                placeholder="Enter your username"
              />
              {errors.username && (
                <p className="auth-error">{errors.username}</p>
              )}
            </div>
          )}
          <div>
            <label htmlFor="email">
              {isLogin ? "Email or Username" : "Email"}
            </label>
            <input
              id="email"
              name="email"
              type="text"
              value={email}
              onChange={handleChange}
              placeholder={
                isLogin ? "Enter your email or username" : "Enter your email"
              }
            />
            {errors.email && <p className="auth-error">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            {errors.password && <p className="auth-error">{errors.password}</p>}
          </div>
          <button className="auth-button" type="submit" disabled={isRequesting}>
            {isRequesting ? "Processing..." : isLogin ? "Login" : "Register"}
          </button>
        </form>
        <div className="auth-toggle">
          <span>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </span>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setIsLogin(!isLogin);
              resetData();
            }}
          >
            {isLogin ? " Register" : " Login"}
          </a>
        </div>
        <div className="auth-divider">
          <span></span>
          <div>Or continue with</div>
          <span></span>
        </div>
        <button className="auth-google-btn" onClick={handleGoogleAuth}>
          <FcGoogle />
          Google
        </button>
      </div>
    </div>
  );
}
