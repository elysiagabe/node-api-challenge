import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Title = styled.h2`
    font-size: 2.4rem;
    font-weight: 600;
    text-align: center;
`
const ProjectList = styled.div`
    width: 40%;
    background-color: #F6F8F7;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    margin: 20px auto;
`

const Project = styled.div`
    color: #8149F6;
    font-size: 1.4rem;
    font-weight: 600;
    padding: 20px;
    border-bottom: 1px solid #8149F6;
`

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
            <Title>Your Projects</Title>
            <ProjectList>
                {projects.map(project => (
                    <Link to={`/projects/${project.id}`} style={{textDecoration: "none"}} >
                        <Project key={project.id}>{project.name}</Project>
                    </Link>
                ))}
            </ProjectList>
        </div>
    )
}

export default Projects;