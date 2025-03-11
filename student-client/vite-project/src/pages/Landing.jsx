import React from "react";
import { Link } from "react-router-dom";
import "./landing.css";
import Footer from "./Footer";

const Landing = () => {
  return (
    <div className="landing">
      <nav className="navbar navbar-expand-lg navbar-dark bg-teal">
        <div className="container">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#features">Features</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#contact">Contact</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/auth">Login</Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container landing-content">
        <div className="row">
          <div className="col-md-6 landing-left">
            <h1 className="landing-h1">
              Welcome to <span className="typewriter">Student Test Portal</span>
            </h1>
            <p className="landing-desc">
              Take your tests easily with our intuitive platform designed for students.
            </p>
            <Link to="/auth" className="btn btn-teal get-started">
              Get Started
            </Link>
          </div>

          <div className="col-md-6 landing-img">
            <img
              src="/src/assets/landing1.png"
              alt="Student Test Portal"
              className="img-fluid"
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Landing;