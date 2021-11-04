import React from 'react';
import {Link} from 'react-router-dom';
import './landingCSS.css';

export default function LandingPage (){
    return(
        <div className = 'landing'>
            <h1 className = 'bienvenida'>¡Hola Mundo!</h1>
            <Link to = '/home'>
                <button className = 'boton'>Entrar</button>
            </Link>
        </div>
    )
}