// import React from "react";
// import { NavLink } from "react-router-dom";
// import "./Navbar.css";

// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <div className="navbar-container">
//         {/* Logo */}
//         <div className="navbar-logo">
//           <NavLink to="/">
//             Kundan<span>Paswan</span>
//           </NavLink>
//         </div>

//         {/* Menu */}
//         <ul className="navbar-menu">
//           <li>
//             <NavLink to="/" end>
//               Home
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/skills">
//               Skills
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/projects">
//               Projects
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/contact">
//               Contact
//             </NavLink>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

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
