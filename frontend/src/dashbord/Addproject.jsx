import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Addproject.css";

const AddProject = () => {

  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [technology, setTechnology] = useState("");
  const [link, setLink] = useState("");

  const [projects, setProjects] = useState([]);

  // fetch projects
  const fetchProjects = async () => {
    const res = await axios.get("http://localhost:5000/projects");
    setProjects(res.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // add project
  const addProject = async () => {

    if(!name || !detail){
      alert("Please fill all fields");
      return;
    }

    await axios.post("http://localhost:5000/add-project", {
      name,
      detail,
      technology,
      link
    });

    setName("");
    setDetail("");
    setTechnology("");
    setLink("");

    fetchProjects();
  };

  // delete project
  const deleteProject = async (id) => {
    await axios.delete(`http://localhost:5000/delete-project/${id}`);
    fetchProjects();
  };

  return (
    <div className="project-page">

      <h2>Add Project</h2>

      <div className="project-form">

        <input
          type="text"
          placeholder="Project Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <textarea
          placeholder="Project Details"
          value={detail}
          onChange={(e)=>setDetail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Technology Used (React, Node, MongoDB)"
          value={technology}
          onChange={(e)=>setTechnology(e.target.value)}
        />

        <input
          type="text"
          placeholder="Project Link"
          value={link}
          onChange={(e)=>setLink(e.target.value)}
        />

        <button onClick={addProject}>Add Project</button>

      </div>


      <div className="project-list">

        {projects.map((project)=>(
          <div className="project-card" key={project._id}>

            <h3>{project.name}</h3>
            <p>{project.detail}</p>

            <span>{project.technology}</span>

            <div className="project-buttons">

              <a href={project.link} target="_blank" rel="noreferrer">
                View Project
              </a>

              <button onClick={()=>deleteProject(project._id)}>
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default AddProject;