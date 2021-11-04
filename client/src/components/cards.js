import React from "react";
import { Link } from "react-router-dom";
import './cards.css'

//H3 en realidad tendría que ser un link, para que el apretar sobre el nombre me derive a el detalle del país!!!!

export default function Card({flag, name, continent, id}){
    return(
        <div className = 'contenedor' key = {name}>
            <Link to = {'/home/' + id}>
            <img className = 'imagen' src = {flag} alt = "img not found" />
            </Link>
            <div>
            <Link className = 'country' to = {'/home/' + id}> {name}</Link>
            <h5 className = 'continent'>{continent}</h5>
            </div>
        </div>
    )
}