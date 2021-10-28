import React from "react";

export default function Paginado ({countriesPorPagina, allCountries, paginado}){
    const numerosPagina = [];

    for(let i = 1; i<= Math.ceil(allCountries/countriesPorPagina); i++){
        numerosPagina.push(i)
    }

    return(
        <nav>
            <ul>
                {numerosPagina &&
                numerosPagina.map(number =>(
                    <li key = {number}>
                    <a onClick = {()=> paginado(number)}>{number}</a>
                    </li>
                ))
                }
            </ul>
        </nav>
    )
}