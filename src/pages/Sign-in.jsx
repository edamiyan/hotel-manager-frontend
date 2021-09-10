import React, {useContext, useState} from 'react';
import {AuthContext} from "../context";
import axios from "axios";
import {url} from "../api";

const SignIn = () => {
    const {setIsAuth} = useContext(AuthContext);
    const [user, setUser] = useState({username: '', password: ''});

    const login = async event => {
        event.preventDefault();
        console.log(user)
        axios.post(
            `http://${url}/auth/sign-in`,
            {
                username: user.username,
                password: user.password,
            }
        ).then(response => {
            if (response.status === 200) {
                setIsAuth(true);
                localStorage.setItem('auth', 'true');
                localStorage.setItem('token', response.data.token);
            }
        })
    }

    return (
        <div>
            <form action="">
                <input
                    value={user.username}
                    onChange={e => setUser({...user, username: e.target.value})}
                    type="text"
                    placeholder={'Имя пользователя'}
                />
                <input
                    value={user.password}
                    onChange={e => setUser({...user, password: e.target.value})}
                    type="password"
                    placeholder={'Пароль'}
                />
                <button onClick={login}>Войти</button>
            </form>
        </div>
    );
};

export default SignIn;