import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../logo.svg'; // CORRECTED PATH: Trying one more level up to resolve compilation
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo-group">
        <Link to="/" className="navbar-brand-link">
          {/* <img 
            src={logo} 
            alt="Assessify Logo" 
            className="navbar-logo-img" 
          /> */}
          <span className="navbar-brand-text">
            Assessify
          </span>
        </Link>
      </div>
      <ul className="navbar-links">
        <li>
            <Link to="/" className="nav-link">Home</Link>
        </li>
        <li>
          <Link to="/quizes" className="nav-link">Learning Resources</Link>
        </li>
        <li>
          <Link to="/teacher" className="nav-link">Faculty Dashboard</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
