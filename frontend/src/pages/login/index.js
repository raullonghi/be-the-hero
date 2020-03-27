import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import herosImg from '../../assets/heroes.png';

export default function Login() {
    
    const [id, setId] = useState('');

    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault(); // faz com que não recarregue a página

        try {
            const response = await api.post('sessions', { id });
            //console.log(response.data.name);

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');

        } catch (err) {
            alert('ONG não cadastrada.');
        }
    }

    return (
        <div className="login-container">
            <session className="form">
                <img src={logoImg} alt="Be The Hero" />
                <form onSubmit={handleLogin}>
                    <h1>Faça seu login</h1>
                    
                    <input 
                        placeHolder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />

                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="E02041" /> 
                        Não tenho cadastro
                    </Link>

                </form>
            </session>

            <img src={herosImg} alt="Heros" />

        </div>
    );
}