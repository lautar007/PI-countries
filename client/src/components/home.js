import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getActivities, getCountries, filterContinent, orderAlpha, orderPopulation } from "../actions";
import { Link } from "react-router-dom";
import Card from "./cards";
import Paginado from "./paginado";
import SearchBar from "./searchBar";

export default function Home(){
    
    const dispatch = useDispatch();
    const allCountries = useSelector((state)=>state.countries);
    const allActivities = useSelector((state)=>state.activities);

    //PAGINADO
    const [paginaActual, setPaginaActual] = useState(1);
    const [countriesPorPagina, setCountriesPorPagina] = useState(9);
    const ultimoCountry = paginaActual * countriesPorPagina;
    const primerCountry = ultimoCountry - countriesPorPagina;
    const countriesActuales = allCountries.slice(primerCountry, ultimoCountry)
    const [orden, setOrden] = useState('');

    const paginado = (numeroPagina) =>{
        setPaginaActual(numeroPagina)
    }

    useEffect(()=>{
        dispatch(getCountries());
    },[]);

    useEffect(()=>{
        dispatch(getActivities());
    },[]);

    function handleRecarga(e){
        e.preventDefault();
        dispatch(getCountries());
    }

    function handleFilterContinent(e){
        e.preventDefault();
        dispatch(filterContinent(e.target.value));
    }

    function handleOrderAlpha(e){
        e.preventDefault();
        dispatch(orderAlpha(e.target.value));
        setPaginaActual(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleOrderPopulation(e){
        e.preventDefault();
        dispatch(orderPopulation(e.target.value));
        setPaginaActual(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    return(
        <div>
            <h1>¿A dónde querés vacacionar?</h1>
            <Link to = '/activity'>Crear una actividad</Link>
            <button onClick={(e)=>{handleRecarga(e)}}>
                Recargar países
            </button>
            <div>
                <SearchBar/>
            </div>
            <div>
                <h4>Ordenar alfabéticamente</h4>
                <select onChange = {e => handleOrderAlpha(e)}>
                    <option>Seleccionar</option>
                    <option value = 'asc'>Ascendente</option>
                    <option value = 'des'>Descendente</option>
                </select>
                <h4>Ordenar por población</h4>
                <select onChange = {e => handleOrderPopulation(e)}>
                    <option>Seleccionar</option>
                    <option value = 'asc'>Ascendente</option>
                    <option value = 'des'>Descendente</option>
                </select>
                <h4>Selecciona un Continente</h4>
                <select onChange = {e => handleFilterContinent(e)}>
                    <option value = 'Todos'>Todos</option> 
                    <option value = 'Americas'>Américas</option>
                    <option value = 'Europe'>Europa</option>
                    <option value = 'Asia'>Asia</option>
                    <option value = 'Africa'>África</option>
                    <option value = 'Oceania'>Oceanía</option>
                </select>
                <h4>Selecciona una actividad</h4>
                <select>
                    <option value = 'Todas'>Todas</option>
                    {
                        allActivities && allActivities.map((el)=>{
                            return(
                                <option key = {el.id} value = {el.name}>{el.name}</option>
                            )
                        })
                    }
                </select> 
                <Paginado
                countriesPorPagina = {countriesPorPagina}
                allCountries = {allCountries.length}
                paginado = {paginado}
                />
                {
                    countriesActuales && countriesActuales.map((el)=>{
                        return(
                            <div key = {el.id}>
                        <Card flag = {el.flag} name = {el.Name} continent = {el.continent}/>
                        <hr/>
                        </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
