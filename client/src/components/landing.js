import React from 'react';
import {Link} from 'react-router-dom';

export default function LandingPage (){
    return(
        <div>
            <h1>¡Hola Mundo!</h1>
            <Link to = '/home'>
                <button>Entrar</button>
            </Link>
        </div>
    )
}