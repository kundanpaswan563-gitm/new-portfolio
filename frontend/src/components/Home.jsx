import React, { useEffect, useState } from "react";
import profile from "../assets/profile.png";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {

  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    name: "",
    heroTitle: "",
    heroLine1: "",
    heroLine2: "",
    description: "",
    profileImage: ""
  });

  const handleHireMe = () => {
    navigate("/contact");
  };

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/cv.pdf";
    link.download = "Kundan_Paswan_CV.pdf";
    link.click();
  };

  // Fetch profile from backend
  useEffect(() => {

    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/profile");
        setProfileData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();

  }, []);

  return (
    <section className="home">
      <div className="home-container">

        {/* Left Side Content */}
        <div className="home-left">

          <h4 className="welcome">HELLO, I'M</h4>

          <h1 className="name">
            {profileData.name || "Kundan Paswan"}
          </h1>

          <h2 className="role">
            {profileData.heroTitle || "Full Stack Web Developer"}
          </h2>

          <h2 className="role2">
            {profileData.heroLine1 || (
              <>
                coding fulfills my <span>dopamine</span>
              </>
            )}
          </h2>

          <h2 className="role3">
            {profileData.heroLine2 || (
              <>
                problem solving keeps alive my <span>adrenaline</span>
              </>
            )}
          </h2>

          <p className="description">
            {profileData.description ||
              "I build modern, responsive and secure web applications using React, Node.js and MongoDB."}
          </p>

          <div className="home-buttons">

            <button className="btn primary" onClick={handleHireMe}>
              Hire Me
            </button>

            <button className="btn secondary" onClick={handleDownloadCV}>
              Download CV
            </button>

          </div>

        </div>

        {/* Right Side Image */}
        <div className="home-right">

          <img
            src={
              profileData.profileImage
                ? `http://localhost:5000/uploads/${profileData.profileImage}`
                : profile
            }
            alt="Profile"
            className="profile-img"
          />

        </div>

      </div>
    </section>
  );
};

export default Home;