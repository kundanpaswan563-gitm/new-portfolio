import React, { useState, useEffect } from "react";
import axios from "axios";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import * as MdIcons from "react-icons/md";
import "./Addskills.css";
import API from "../components/Api";

const icons = {
  ...FaIcons,
  ...SiIcons,
  ...MdIcons,
};

const Addskill = () => {

  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    const res = await axios.get(`${API}/skills`);
    setSkills(res.data);
  };

  const addSkill = async (e) => {

    e.preventDefault();

    await axios.post(`${API}/add-skills`, {
      name,
      icon,
    });

    setName("");
    setIcon("");

    fetchSkills();
  };

  const deleteSkill = async (id) => {

    await axios.delete(`${API}/delete-skills/${id}`);

    fetchSkills();
  };

  const IconComponent = icons[icon];

  return (
    <div className="addskill-page">

      <h2>Add Skill</h2>

      <form onSubmit={addSkill} className="skill-form">

        <input
          type="text"
          placeholder="Skill Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
<select
  value={icon}
  onChange={(e) => setIcon(e.target.value)}
  required
>
  <option value="">Select Icon</option>

  {/* Frontend */}
  <option value="FaHtml5">HTML</option>
  <option value="FaCss3Alt">CSS</option>
  <option value="FaJs">JavaScript</option>
  <option value="SiTypescript">TypeScript</option>
  <option value="FaReact">React</option>
  <option value="SiNextdotjs">Next.js</option>
  <option value="SiRedux">Redux</option>
  <option value="SiTailwindcss">Tailwind CSS</option>
  <option value="SiBootstrap">Bootstrap</option>
  <option value="SiSass">Sass</option>

  {/* Backend */}
  <option value="FaNodeJs">NodeJS</option>
  <option value="SiExpress">Express</option>
  <option value="SiDjango">Django</option>
  <option value="SiSpring">Spring Boot</option>

  {/* Database */}
  <option value="SiMongodb">MongoDB</option>
  <option value="SiMysql">MySQL</option>
  <option value="SiPostgresql">PostgreSQL</option>
  <option value="SiFirebase">Firebase</option>

  {/* Programming Languages */}
  <option value="SiPython">Python</option>
  <option value="SiC">C</option>
  <option value="SiCplusplus">C++</option>
  <option value="SiJava">Java</option>
  <option value="SiPhp">PHP</option>
  <option value="SiGo">Go</option>
  <option value="SiRust">Rust</option>

  {/* Tools */}
  <option value="FaGitAlt">Git</option>
  <option value="FaGithub">GitHub</option>
  <option value="SiDocker">Docker</option>
  <option value="SiKubernetes">Kubernetes</option>
  <option value="SiLinux">Linux</option>
  <option value="SiNpm">NPM</option>
  <option value="SiVite">Vite</option>

  {/* Cloud */}
  <option value="SiAmazonaws">AWS</option>
  <option value="SiGooglecloud">Google Cloud</option>
  <option value="SiMicrosoftazure">Azure</option>

</select>

        <button>Add Skill</button>

      </form>

      {/* ICON PREVIEW */}

      {IconComponent && (
        <div className="icon-preview">
          <IconComponent size={40} />
        </div>
      )}

      <h3>Added Skills</h3>

      <div className="skills-list">

        {skills.map((skill) => {

          const SkillIcon = icons[skill.icon];

          return (
            <div className="skill-card" key={skill._id}>

              {SkillIcon && <SkillIcon />}

              <span>{skill.name}</span>

              <button
                className="delete-btn"
                onClick={() => deleteSkill(skill._id)}
              >
                Delete
              </button>

            </div>
          );
        })}

      </div>

    </div>
  );
};

export default Addskill;