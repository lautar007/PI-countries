import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getActivities, getCountries, filterContinent, orderAlpha, orderPopulation, filterActivity } from "../actions";
import { Link } from "react-router-dom";
import Card from "./cards";
import Paginado from "./paginado";
import SearchBar from "./searchBar";
import './home.css'

export default function Home(){
    
    const dispatch = useDispatch();
    const allCountries = useSelector((state)=>state.countries);
    const allActivities = useSelector((state)=>state.activities);
    const allActivitiesAlpha =  allActivities.sort(function(a,b){
        if(a.name > b.name){
            return 1;
        }
        if(b.name > a.name){
            return -1;
        }
        return 0;
    })

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

    function handleFilterActivity(e){
        e.preventDefault();
        dispatch(filterActivity(e.target.value));
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
        <div className = 'fondo'>
            <h1>¿A dónde querés vacacionar?</h1>
            <Link className = 'crear' to = '/activity'>Crea tu propia actividad</Link>
            <br/>
            <button className = 'recarga' onClick={(e)=>{handleRecarga(e)}}>
                Recargar países
            </button>
            <div>
                <SearchBar/>
            </div>
            <div className = 'filtros'>
                <div id = 'A'>
                <h4 className = 'opciones'>Ordenar alfabéticamente</h4>
                <select onChange = {e => handleOrderAlpha(e)}>
                    <option>Seleccionar</option>
                    <option value = 'asc'>Ascendente</option>
                    <option value = 'des'>Descendente</option>
                </select>
                </div>
                <div id = 'B'>
                <h4 className = 'opciones'>Ordenar por población</h4>
                <select onChange = {e => handleOrderPopulation(e)}>
                    <option>Seleccionar</option>
                    <option value = 'asc'>Ascendente</option>
                    <option value = 'des'>Descendente</option>
                </select>
                </div>
                <div id= 'C'>
                <h4 className = 'opciones'>Selecciona un Continente</h4>
                <select onChange = {e => handleFilterContinent(e)}>
                    <option value = 'Todos'>Todos</option> 
                    <option value = 'Americas'>Américas</option>
                    <option value = 'Europe'>Europa</option>
                    <option value = 'Asia'>Asia</option>
                    <option value = 'Africa'>África</option>
                    <option value = 'Oceania'>Oceanía</option>
                </select>
                </div>
                <div id = 'D'>
                <h4 className = 'opciones'>Selecciona una actividad</h4>
                <select onChange = {e => handleFilterActivity(e)}>
                    <option value = 'Todas'>Todas</option>
                    {
                        allActivitiesAlpha.map((el)=>{
                            return(
                                <option key = {el.id} value = {el.name}>{el.name}</option>
                            )
                        })
                    }
                </select>
                </div>
            </div>
            <div>
                <Paginado
                countriesPorPagina = {countriesPorPagina}
                allCountries = {allCountries.length}
                paginado = {paginado}
                />
                <div className = 'cards'>
                {
                    countriesActuales && countriesActuales.map((el)=>{
                        return(
                            <div key = {el.id}>
                        <Card flag = {el.flag} name = {el.Name} continent = {el.continent} id = {el.id}/>
                        </div>
                        )
                    })
                }
                </div>
            </div>
        </div>
    )
}
