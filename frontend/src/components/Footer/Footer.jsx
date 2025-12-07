import React from "react";
import "./Footer.css";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer-grid">

        {/* Brand + Social */}
        <div className="footer-brand">
          <div className="footer-logo">
            {/* If you have a logo, replace with img tag */}
            <h2>TechForTechies</h2>
            <p>LEARN, TEST, IMPROVE</p>
          </div>

          <div className="social-icons">
            <a className="icon-circle"><FaFacebookF /></a>
            <a className="icon-circle"><FaInstagram /></a>
            <a className="icon-circle"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li><a>Home</a></li>
            <li><a>How it Works</a></li>
            <li><a>Pricing</a></li>
            <li><a>Blogs</a></li>
            <li><a href="/about">Contact Us</a></li>
            <li><a>Privacy Policy</a></li>
            <li><a>Terms and Conditions</a></li>
          </ul>
        </div>



        {/* Contact */}
        <div className="footer-col">
          <h3>Contact Us</h3>

          <p className="footer-contact">
            <FaPhoneAlt /> +1206–337–9539 
          </p>

          <p className="footer-contact">
            <HiOutlineMail /> support@techfortechies.com 
          </p>

          <p className="footer-contact">
            <FaMapMarkerAlt /> UPES, Dehradun, Uttarakhand, India - 248007
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} TechforTechies. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
