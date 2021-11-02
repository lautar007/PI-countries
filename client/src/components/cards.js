import React from "react";
import { Link } from "react-router-dom";

//H3 en realidad tendría que ser un link, para que el apretar sobre el nombre me derive a el detalle del país!!!!

export default function Card({flag, name, continent, id}){
    return(
        <div key = {name}>
            <img src = {flag} alt = "img not found" width = '300px' height = '150px'/>
            <div>
            <Link to = {'/home/' + id}> {name}</Link>
            <h5>{continent}</h5>
            </div>
        </div>
    )
}