import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PageTitle = styled.h1`
    font-size: 3.2rem;
    text-align: center;
    margin: 30px;
`

const Header = () => (
    <header>
        <Link to="/" style={{textDecoration: "none"}}>
            <PageTitle>Project Manager</PageTitle>
        </Link>
    </header>
)

export default Header;