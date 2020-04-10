import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Projects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/projects/')
        .then(res => {
            //console.log(res)
            setProjects(res.data);
        })
        .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <h2>Your Projects</h2>
            {projects.map(project => (
                <Link to={`/projects/${project.id}`} style={{textDecoration: "none"}} >
                    <div key={project.id}>{project.name}</div>
                </Link>
            ))}
        </div>
    )
}

export default Projects;