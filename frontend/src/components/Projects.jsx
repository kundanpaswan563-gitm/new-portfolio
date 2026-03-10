import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Projects.css";

const Projects = () => {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/projects");
      setProjects(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="projects">
      <div className="projects-container">
        <h2 className="projects-title">Projects</h2>
        <p className="projects-subtitle">
          Some of the work I’ve built using modern web technologies
        </p>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div className="project-card" key={index}>
              <h3>{project.name}</h3>
              <p>{project.detail}</p>

              <div className="project-tech">
                <span>{project.technology}</span>
              </div>

              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="project-link"
              >
                View Project →
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;