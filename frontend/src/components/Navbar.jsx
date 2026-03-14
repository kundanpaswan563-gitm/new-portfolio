

import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      
        
        
        <div className="logo">kundan <span>paswan</span></div>
            
        
    

        {/* Menu */}
        <ul className="navbar-menu">
          <li>
            <NavLink to="/" end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/skills">Skills</NavLink>
          </li>
          <li>
            <NavLink to="/projects">Projects</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
           <NavLink to="/login">Admin</NavLink>
      
        </ul>
      
    </div>
  );
};

export default Navbar;
