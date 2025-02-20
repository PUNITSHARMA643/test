import React, { useState } from "react";
import "./footer.css";
import { MdEmail } from "react-icons/md";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Footer() {
  const [email, setEmail] = useState(""); // Correct naming for the state setter

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email);
    toast.success(`Subscribed Successfully`); // Updated alert message to include the email
  };

  return (
    <footer className="footer">
      <section className="contact" id="contact">
        <h2 className="footer-heading">Stay Updated</h2>
        <p className="footer-description">
          Subscribe to our newsletter to get the latest updates and news about
          Test Generator.
        </p>
        <form action="" className="email" onSubmit={handleSubmit}>
          <MdEmail className="emailicon" />
          <input
            type="email"
            placeholder="Enter your email to subscribe"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Correct usage of the state setter
          />
          <button type="submit" className="send">
            Subscribe
          </button>
        </form>
      </section>

      <div className="footer-info">
        <div className="info-item">
          <h3>Contact Number</h3>
          <p>+91 9653214789</p>
        </div>
        <div className="info-item">
          <h3>Email</h3>
          <p>support@testgenerator.com</p>
        </div>
        <div className="info-item">
          <h3>Address</h3>
          <p> Lovely Professional University, Punjab, India</p>
        </div>
      </div>

      <div className="social-icons">
        <h3>Follow Us</h3>
        <div className="icon-list">
          <Link
            to="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF className="social-icon" />
          </Link>
          <Link
            to="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="social-icon" />
          </Link>
          <Link
            to="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="social-icon" />
          </Link>
          <Link
            to="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn className="social-icon" />
          </Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 Test Generator </p>
      </div>
    </footer>
  );
}
