import React, {useContext, useState} from 'react';
import {AuthContext} from "../context";
import axios from "axios";
import {url} from "../.env/configs";
import {Button, Container, Form} from "react-bootstrap";
import {useHistory} from "react-router-dom";

const SignUp = () => {
    const {setIsAuth} = useContext(AuthContext);
    const [user, setUser] = useState({name: '', username: '', password: ''});
    const [validated, setValidated] = useState(false);
    const [invalidData, setInvalidData] = useState(false);
    const history = useHistory();

    async function login(event) {
        axios.post(
            `${url}/auth/sign-in`,
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
            event.stopPropagation();
            setValidated(true);

        } else {
            setValidated(false);
            event.preventDefault();
            axios.post(
                `${url}/auth/sign-up`,
                {
                    name: user.name,
                    username: user.username,
                    password: user.password,
                }
            ).then(response => {
                if (response.status === 200) {
                    login(event)
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
                <Form.Group controlId="validationName" className="mb-3">
                    <Form.Label>???????????????? ??????????????????</Form.Label>
                    <Form.Control
                        required
                        value={user.name}
                        onChange={e => setUser({...user, name: e.target.value})}
                        type="login"
                        placeholder="?????????????? ???????????????? ??????????????????"/>
                    <Form.Control.Feedback type="invalid">
                        ?????????????? ???????????????????? ????????????????.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationUsername" className="mb-3">
                    <Form.Label>?????? ????????????????????????</Form.Label>
                    <Form.Control
                        required
                        isInvalid={invalidData}
                        value={user.username}
                        onChange={e => setUser({...user, username: e.target.value})}
                        type="login"
                        placeholder="?????????????? ?????? ????????????????????????"/>
                    <Form.Control.Feedback type="invalid">
                        ???????????????????????? ?? ?????????? ???????????? ?????? ????????????????????.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="validationPassword">
                    <Form.Label>????????????</Form.Label>
                    <Form.Control
                        required
                        value={user.password}
                        onChange={e => setUser({...user, password: e.target.value})}
                        type="password"
                        placeholder="?????????????? ????????????"
                    />
                    <Form.Control.Feedback type="invalid">
                        ?????????????? ???????????????????? ????????????.
                    </Form.Control.Feedback>
                </Form.Group>
                <Button style={{backgroundColor: '#06276F', color: 'white'}} className="btn mt-2" type="submit">
                    ????????????????????????????????????
                </Button>
            </Form>
        </Container>
    );
};

export default SignUp;
