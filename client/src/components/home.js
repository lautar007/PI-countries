import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getCountries } from "../actions";
import { Link } from "react-router-dom";
import Card from "./cards";

export default function Home(){
    
    const dispatch = useDispatch();
    const allCountries = useSelector((state)=>state.countries);

    useEffect(()=>{
        dispatch(getCountries());
    },[]);

    function handleRecarga(e){
        e.preventDefault();
        dispatch(getCountries());
    }

    return(
        <div>
            <h1>¿A dónde querés vacacionar?</h1>
            <Link to = '/activity'>Crear una actividad</Link>
            <button onClick={(e)=>{handleRecarga(e)}}>
                Recargar países
            </button>
            <div>
                <h4>Ordenar alfabéticamente</h4>
                <select>
                    <option value = 'asc'>Ascendente</option>
                    <option value = 'des'>Descendente</option>
                </select>
                <h4>Ordenar por población</h4>
                <select>
                    <option value = 'asc'>Ascendente</option>
                    <option value = 'des'>Descendente</option>
                </select>
                <h4>Selecciona un Continente</h4>
                <select>
                    <option value = 'Todos'>Todos</option> 
                    <option value = 'Americas'>Américas</option>
                    <option value = 'Europe'>Europa</option>
                    <option value = 'Asia'>Asia</option>
                    <option value = 'Africa'>África</option>
                    <option value = 'Oceania'>Oceanía</option>
                </select>
                {
                    allCountries && allCountries.map((el)=>{
                        return(
                            <div>
                        <Card key = {el.id} flag = {el.flag} name = {el.Name} continent = {el.continent}/>
                        <hr/>
                        </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
