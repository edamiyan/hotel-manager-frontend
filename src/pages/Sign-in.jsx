import React, {useContext, useState} from 'react';
import {AuthContext} from "../context";
import axios from "axios";
import {url} from "../.env/configs";
import {Button, Container, Form} from "react-bootstrap";
import {useHistory} from "react-router-dom";

const SignIn = () => {
    const history = useHistory();
    const {setIsAuth} = useContext(AuthContext);
    const [user, setUser] = useState({username: '', password: ''});
    const [validated, setValidated] = useState(false);
    const [invalidData, setInvalidData] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setInvalidData(false);
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
        } else {
            setValidated(false);
            event.preventDefault();
            axios.post(
                `${url}/auth/sign-in`,
                {
                    username: user.username,
                    password: user.password,
                }
            ).then(response => {
                if (response.status === 200) {
                    localStorage.setItem('auth', 'true');
                    localStorage.setItem('token', response.data.token);
                    setIsAuth(true);
                    history.push('/home');
                }
            }).catch(err => {
                setInvalidData(true);
            })
        }
    };

    return (
        <Container>
            <Form
                className={'ms-auto me-auto mt-5 col-xl-4 col-md-6 col-sm-12'}
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
            >
                <Form.Group controlId="validationLogin" className="mb-3">
                    <Form.Label>Имя пользователя</Form.Label>
                    <Form.Control
                        required
                        value={user.username}
                        onChange={e => setUser({...user, username: e.target.value})}
                        type="login"
                        placeholder="Введите логин" />
                    <Form.Control.Feedback type="invalid">
                        Введите корректный логин.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="validationPassword">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control
                        isInvalid={invalidData}
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
                    Войти
                </Button>
            </Form>
        </Container>
    );
};

export default SignIn;
