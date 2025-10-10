import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        {/* Logo / Brand - UPDATED */}
        <div className="footer-brand-section">
          <h2>Assessify</h2>
          <p>The unified platform for streamlined academic automation and assessment.</p>
        </div>

        {/* Quick Links */}
        <div className="footer-links-group">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/" className="footer-link">Home</a></li>
            <li><a href="/student" className="footer-link">Student Portal</a></li>
            <li><a href="/teacher" className="footer-link">Faculty Portal</a></li>
            <li><a href="/quizes" className="footer-link">Learning Resources</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="footer-social-group">
          <h3>Follow Us</h3>
          <div className="social-icons-list">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon">🐦</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon">💼</a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="social-icon">💻</a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom-bar">
        <p>© {new Date().getFullYear()} Assessify. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
