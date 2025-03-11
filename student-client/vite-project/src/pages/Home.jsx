import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "./Footer";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auth');
  };

  return (
    <div className="home">
      <Navbar />
      <main className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="hero-title">
                Welcome to <span className="highlight">Student Test Portal</span>
              </h1>
              <p className="hero-description">
                Experience seamless online testing with our modern, user-friendly platform 
                designed specifically for students.
              </p>
              <button onClick={handleGetStarted} className="btn btn-primary hero-cta">
                Get Started
              </button>
            </div>
            {/* ... rest of your component ... */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;