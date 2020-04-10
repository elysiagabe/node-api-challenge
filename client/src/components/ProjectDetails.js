import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const ProjectContainer = styled.div`
    background-color: #393540;
    width: 80%;
    margin: 0 auto;
    border-radius: 3px;
    color: #F6F8F7;
`

const ProjectInfo = styled.div`
    width: 70%;
    margin: 0 auto;
`

const ProjectTitle = styled.h2`
    font-size: 2.4rem;
    padding: 40px 0 20px;
`

const Description = styled.h3`
    font-size: 2rem;
    padding: 12px 0;
`

const Status = styled.p`
    font-size: 1.6rem;
    padding-bottom: 40px;
`

const ActionSection = styled.div`
    display: flex;
    flex-direction: column;
    padding-bottom: 50px;
`

const ActionCard = styled.div`
    background-color: #F6F8F7;
    width: 40%;
    text-align: center;
    margin: 0 auto 10px;
    padding: 16px;
    border-radius: 3px;
`

const ActionName = styled.p`
    font-size: 1.6rem;
    font-weight: 600;
    padding: 8px;
    color: #8149F6;
`

const ActionInfo = styled.p`
    font-size: 1.3rem;
    padding: 2px;
    color: #212024;
`

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
        <ProjectContainer>
            <ProjectInfo>
                <ProjectTitle>{project.name}</ProjectTitle>
                <Description>{project.description}</Description>
                <Status>Status: {project.completed ? "COMPLETED" : "INCOMPLETE"}</Status>
            </ProjectInfo>

            <ActionSection>
                <p style={{textAlign: "center", fontSize: "1.4rem", paddingBottom: "16px" }}>To Do: </p>
            {projectActions.map(a => (
                <ActionCard key={a.id}>
                    <ActionName>{a.description}</ActionName>
                    <ActionInfo>{a.notes}</ActionInfo>
                    <ActionInfo>Status: {a.completed ? "Completed" : "Incomplete"}</ActionInfo>
                </ActionCard>
            ))}
            </ActionSection>
        </ProjectContainer>
    )
}

export default ProjectDetails;