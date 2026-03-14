import React, { useEffect, useState } from "react";
import "./Dashbord.css";
import axios from "axios";
import {
  FaTachometerAlt,
  FaEnvelope,
  FaTools,
  FaProjectDiagram,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

import {
  useNavigate,
  useLocation,
  Routes,
  Route,
} from "react-router-dom";

import Messages from "./Message";
import AddSkills from "./Addskills";
import AddProject from "./Addproject";
import Profile from "./Profile";
import API from "../components/Api";

const Dashboard = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const [totalMessages, setTotalMessages] = useState(0);
  const [totalSkills, setTotalSkills] = useState(0);
  const [totalProjects, setTotalProjects] = useState(0);

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {

    try {

      const token = localStorage.getItem("token");

      // Messages (Protected Route)
      const msg = await axios.get(`${API}/messages`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Skills
      const skills = await axios.get(`${API}/skills`);

      // Projects
      const projects = await axios.get(`${API}/projects`);

      // FIXED RESPONSE STRUCTURE
      setTotalMessages(msg.data.messages.length);
      setTotalSkills(skills.data.length);
      setTotalProjects(projects.data.length);

    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">

      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="logo">Admin Panel</h2>

        <ul>
          <li
            className={location.pathname === "/dashboard" ? "active" : ""}
            onClick={() => navigate("/dashboard")}
          >
            <FaTachometerAlt /> Dashboard
          </li>

          <li
            className={location.pathname === "/dashboard/messages" ? "active" : ""}
            onClick={() => navigate("/dashboard/messages")}
          >
            <FaEnvelope /> Messages
          </li>

          <li
            className={location.pathname === "/dashboard/addskills" ? "active" : ""}
            onClick={() => navigate("/dashboard/addskills")}
          >
            <FaTools /> Add Skills
          </li>

          <li
            className={location.pathname === "/dashboard/addproject" ? "active" : ""}
            onClick={() => navigate("/dashboard/addproject")}
          >
            <FaProjectDiagram /> Add Project
          </li>

          <li
            className={location.pathname === "/dashboard/profile" ? "active" : ""}
            onClick={() => navigate("/dashboard/profile")}
          >
            <FaUser /> Profile
          </li>

          <li className="logout" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <Routes>

          <Route
            index
            element={
              <>
                <h1>Dashboard Overview</h1>

                <div className="cards">

                  <div className="card">
                    <h3>Total Messages</h3>
                    <p>{totalMessages}</p>
                  </div>

                  <div className="card">
                    <h3>Total Skills</h3>
                    <p>{totalSkills}</p>
                  </div>

                  <div className="card">
                    <h3>Total Projects</h3>
                    <p>{totalProjects}</p>
                  </div>

                </div>

                <div className="welcome-box">
                  <h2>Welcome Back 👋</h2>
                  <p>Manage your portfolio content from here.</p>
                </div>
              </>
            }
          />

          <Route path="messages" element={<Messages />} />
          <Route path="addskills" element={<AddSkills />} />
          <Route path="addproject" element={<AddProject />} />
          <Route path="profile" element={<Profile />} />

        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;