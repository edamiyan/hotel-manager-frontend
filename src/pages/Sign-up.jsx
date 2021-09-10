import React, {useContext, useState} from 'react';
import {AuthContext} from "../context";
import axios from "axios";
import {url} from "../api";

const SignUp = () => {
    const {setIsAuth} = useContext(AuthContext);
    const [user, setUser] = useState({name:'', username: '', password: ''});
    const register = async event => {
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

    const login = async event => {
        event.preventDefault();
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
    };

    return (
        <div>
            <form action="">
                <input
                    value={user.name}
                    onChange={e => setUser({...user, name: e.target.value})}
                    type="text"
                    placeholder={'Фамилия Имя Отчество'}
                />
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
                <button onClick={register}>Зарегистрироваться</button>
            </form>
        </div>
    );
};

export default SignUp;