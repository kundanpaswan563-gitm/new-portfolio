import React, { useEffect, useState } from "react";
import axios from "axios";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import * as MdIcons from "react-icons/md";
import "./Skills.css";

const icons = {
  ...FaIcons,
  ...SiIcons,
  ...MdIcons,
};

const Skills = () => {

  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {

    const res = await axios.get("http://localhost:5000/skills");

    setSkills(res.data);

  };

  return (
    <section className="skills">

      <div className="skills-container">

        <h2 className="skills-title">My Skills</h2>

        <p className="skills-subtitle">
          Technologies I use to build modern web applications
        </p>

        <div className="skills-grid">

          {skills.map((skill) => {

            const IconComponent = icons[skill.icon];

            return (
              <div className="skill-card" key={skill._id}>

                {IconComponent && <IconComponent />}

                <h3>{skill.name}</h3>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
};

export default Skills;