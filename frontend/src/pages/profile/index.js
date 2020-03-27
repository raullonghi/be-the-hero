import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FiPower, FiTrash2 } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';

import './styles.css';

import api from '../../services/api';

export default function Profile () {

    const history = useHistory();

    const [ incidents, setIncidents ] = useState([]); // como vai receber um conjunto de dados, inicia o array vazio.

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    //useEffect(() => {}, []);  // estrutura
    useEffect(() => {
        api.get('ong', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    function handleDeleteIncident(id) {
        try{
            api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            // Aqui é feito filtro em todos os incidentes. Serão mantidos os incidentes que atendem a condição
            setIncidents(incidents.filter( incident => incident.id !== id));

        } catch (err) {
            alert('Erro ao deletar o caso, tente novamente.');
        }
    }

    function handleLogout(){
        localStorage.clear();

        // direcionando para a pagina inicial
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vindo(a), {ongName}</span>
                
                <Link className="button" to="/incident">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={48} color="#E02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>Caso:</strong>
                        <p>{incident.title}</p>
                        
                        <strong>Descrição:</strong>
                        <p>{incident.description}</p>
                        
                        <strong>Valor:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>
                        
                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>                          
                    </li>    
                ))}
            </ul>
            
        </div>
    );
}