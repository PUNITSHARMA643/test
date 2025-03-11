import React from "react";
import "./landing.css";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import Footer from "./Footer";

export default function Landing() {
  return (
    <div className="landing">
      {/* Navigation Bar */}
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
              <Link className="nav-link" to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Landing Content */}
      <div className="container landing-content">
        <div className="row">
          {/* Left Section */}
          <div className="col-md-6 landing-left">
            <h1 className="landing-h1">
              Welcome to <span className="typewriter">Test Generator</span>
            </h1>
            <p className="landing-desc">
              Simplify your test creation process with an intuitive platform 
              designed for educators. From managing syllabus to generating question papers, 
              everything you need is just a click away.
            </p>
            <Link to="/login" className="btn btn-teal get-started">
              Get Started <FaArrowRightLong size={18} className="arrow" />
            </Link>
          </div>

          {/* Right Section */}
          <div className="col-md-6 landing-img">
            <img
              src="src/assets/landing1.png"
              alt="Test Generator"
              className="img-fluid"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features" id="features">
        <div className="container">
          <h2 className="features-heading">Why Choose Test Generator?</h2>
          <div className="row features-container">
            <div className="col-md-6 feature">
              <h3>Seamless Authentication</h3>
              <p>
                Secure login with Google OAuth and manual registration with email
                verification ensures your data remains safe.
              </p>
            </div>
            <div className="col-md-6 feature">
              <h3>Syllabus Management</h3>
              <p>
                Effortlessly manage books, chapters, subjects, and titles to keep
                your teaching materials organized.
              </p>
            </div>
            <div className="col-md-6 feature">
              <h3>Custom Test Creation</h3>
              <p>
                Generate tests tailored to your requirements, complete with
                customizable question types and downloadable answer keys.
              </p>
            </div>
            <div className="col-md-6 feature">
              <h3>Data Storage & Security</h3>
              <p>
                All data is securely stored using MongoDB, ensuring a smooth and
                reliable experience.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}