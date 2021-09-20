import React, {useContext, useState} from 'react';
import {AuthContext} from "../context";
import axios from "axios";
import {url} from "../api";
import {Button, Container, Form} from "react-bootstrap";
import {useHistory} from "react-router-dom";

const SignUp = () => {
    const {setIsAuth} = useContext(AuthContext);
    const [user, setUser] = useState({name: '', username: '', password: ''});
    const [validated, setValidated] = useState(false);
    const history = useHistory();

    async function login(event) {
        axios.post(
            `https://${url}/auth/sign-in`,
            {
                username: user.username,
                password: user.password,
            }
        ).then(
            (response) => {
                if (response.status === 200) {
                    localStorage.setItem('auth', 'true');
                    localStorage.setItem('token', response.data.token);
                    setIsAuth(true);
                    history.push('/home')
                }
            }
        ).catch(
            function (error) {
                return Promise.reject(error)
            }
        )

    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            axios.post(
                `http://${url}/auth/sign-up`,
                {
                    name: user.name,
                    username: user.username,
                    password: user.password,
                }
            ).then(response => {
                if (response.status === 200) {
                    login(event)
                }
            })
        }
        setValidated(true);
    };


    return (
        <Container>
            <Form
                className={'ms-auto me-auto mt-5 col-xl-4 col-md-6 col-sm-12'}
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
            >
                <Form.Group controlId="validationName" className="mb-3">
                    <Form.Label>Название гостиницы</Form.Label>
                    <Form.Control
                        required
                        value={user.name}
                        onChange={e => setUser({...user, name: e.target.value})}
                        type="login"
                        placeholder="Введите название гостиницы"/>
                    <Form.Control.Feedback type="invalid">
                        Введите корректное название.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationUsername" className="mb-3">
                    <Form.Label>Имя пользователя</Form.Label>
                    <Form.Control
                        required
                        value={user.username}
                        onChange={e => setUser({...user, username: e.target.value})}
                        type="login"
                        placeholder="Введите имя пользователя"/>
                    <Form.Control.Feedback type="invalid">
                        Введите корректный логин.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="validationPassword">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control
                        required
                        value={user.password}
                        onChange={e => setUser({...user, password: e.target.value})}
                        type="password"
                        placeholder="Введите пароль"
                    />
                    <Form.Control.Feedback type="invalid">
                        Введите корректный пароль.
                    </Form.Control.Feedback>
                </Form.Group>
                <Button style={{backgroundColor: '#06276F', color: 'white'}} className="btn mt-2" type="submit">
                    Зарегистрироваться
                </Button>
            </Form>
        </Container>
    );
};

export default SignUp;
