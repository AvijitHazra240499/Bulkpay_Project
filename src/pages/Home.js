import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [templates, setTemplates] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch templates
    axios.get('https://contentcrafter.bulkpe.in/api/Listtempltes', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`
      }
    })
      .then(response => {
        setTemplates(response.data.result);
      })
      .catch(error => {
        console.error('Error fetching templates:', error);
      });

    // Fetch projects
    axios.get('https://contentcrafter.bulkpe.in/api/listProjects', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`
      }
    })
      .then(response => {
        setProjects(response.data.result);
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
      });
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, marginRight: '120px' }}>
        <h2>Templates</h2>
        <ul>
          {templates.map(template => (
            <li key={template._id}>
              <a href={template.html}>{template.template_ref}</a>
            </li>
          ))}
        </ul>
        <div style={{ marginTop: '20px' }}>
          <a href={'/CreateandEditTemplate'}><button>Create Template</button></a>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <h2>Projects</h2>
        <ul>
          {projects.map(project => (
            <li key={project._id}>
              <a href={`/taskStatus/project/${project.project_ref}`}>{project.project_ref}</a>
            </li>
          ))}
        </ul>
        <div style={{ marginTop: '20px' }}>
          <a href={'/createandEditProjects'}><button>Create Projects</button></a>
        </div>
      </div>
    </div>
  );
};

export default Home;
