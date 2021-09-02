import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";

const MyNavbar = () => {
    return (
        <Navbar bg="danger" variant="dark">
            <Container>
                <Navbar.Brand>Hotel</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to={`/home`}>Главная</Nav.Link>
                        <Nav.Link as={NavLink} to={`/rooms`}>Номера</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default MyNavbar;