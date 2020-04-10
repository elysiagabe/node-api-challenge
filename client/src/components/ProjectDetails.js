import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProjectDetails = () => {
    const { id } = useParams();

    const [project, setProject] = useState({});
    const [projectActions, setProjectActions] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/projects/${id}`)
        .then(res => {
            setProject(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:5000/api/projects/${id}/actions`)
        .then(res => {
            setProjectActions(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <h2>Project: {project.name}</h2>
            <h3>Description: {project.description}</h3>
            <p>Status: {project.completed ? "Completed" : "Incomplete"}</p>
            <p>To do:</p>

            {projectActions.map(a => (
                <div key={a.id}>
                    <p>{a.description}</p>
                    <p>{a.notes}</p>
                    <p>Status: {a.completed ? "Completed" : "Incomplete"}</p>
                </div>
            ))}
        </div>
    )
}

export default ProjectDetails;