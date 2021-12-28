import React from "react";
import './paginado.css'

export default function Paginado ({countriesPorPagina, allCountries, paginado}){
    const numerosPagina = [];

    for(let i = 1; i<= Math.ceil(allCountries/countriesPorPagina); i++){
        numerosPagina.push(i)
    }

    return(
        <nav >
            <ul className = 'paginado'>
                {numerosPagina &&
                numerosPagina.map(number =>(
                    <li className = 'numeros' key = {number}>
                    <button onClick = {()=> paginado(number)}>{number}</button>
                    </li>
                ))
                }
            </ul>
        </nav>
    )
}