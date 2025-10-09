import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from './logo (1).png';


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/"><img src={logo} alt="Site Logo" style={{ width: "40px", height: "auto" }} /></Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/quizes">Courses</Link>
        </li>
        <li>
          <Link to="/teacher">Teacher Dashboard</Link>
        </li>
        <li>
          <Link to="/quizes">Support</Link>
        </li>
        {/* <li>
          <Link to="/admin">Admin Panel</Link>
        </li> */}
      </ul>
    </nav>
  );
};

export default Navbar;
