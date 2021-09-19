import React, {useContext} from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../../../context";

const MyNavbar = () => {
    const {setIsAuth} = useContext(AuthContext);
    const history = useHistory()
    function logout() {
        localStorage.clear();
        setIsAuth(false);
        history.push('/sign-in');
    }
    return (
        <Navbar style={{backgroundColor: '#06266F'}} variant="dark">
            <Container>
                <Navbar.Brand>Hotel</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    {(localStorage.getItem('auth'))
                        ?
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link as={NavLink} to={`/home`}>Главная</Nav.Link>
                                <Nav.Link as={NavLink} to={`/rooms`}>Номера</Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Link onClick={logout}>Выход</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                        :
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link as={NavLink} to={`/sign-in`}>Войти</Nav.Link>
                                <Nav.Link as={NavLink} to={`/sign-up`}>Зарегистрироваться</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>

                    }
            </Container>
        </Navbar>
    );
};

export default MyNavbar;