import React from "react";
import './activities.css'

export default function Activities({ name, difficulty, duration, season}){
    return(
        <div className = 'conteiner'>
        <h3 className = 'names'>{name}</h3>
        <h4 className = 'actinfo'>Dificultad: {difficulty}</h4>
        <h4 className = 'actinfo'>Duración: {duration}</h4>
        <h4 className = 'actinfo'>Temporada: {season}</h4>
    </div>
    )
}