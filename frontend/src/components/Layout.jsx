// // 
// import React from "react";
// import { Outlet } from "react-router-dom";
// import Navbar from "../components/Navbar/Navbar";

// const Layout = () => {
//   return (
//     <>
//       <Navbar />
//       <Outlet />
//     </>
//   );
// };

// export default Layout;

import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import "./Layout.css";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="layout-main">
        <Outlet />
        
      </main>
    </>
  );
};

export default Layout;
