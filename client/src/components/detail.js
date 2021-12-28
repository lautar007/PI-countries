import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import Activities from "./activities";
import './detail.css'

export default function Detail(props){
    console.log(props)

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getDetail(props.match.params.id)); 
    }, [dispatch, props.match.params.id]);

    const myCountry = useSelector((state) => state.detail)
    
    

    return(
        <div className = 'fondo1'>
            {
                myCountry? 
                <div>
                    <h1 className = 'nombre'>{myCountry.Name}</h1>
                    <div className = 'infopais'>
                        <div>
                            <img className = 'bandera' src = {myCountry.flag} alt = ''/>
                        </div>
                        <div className = 'info'>
                            <h4>Código de país: {myCountry.id}</h4>
                            <h4>Capital: {myCountry.capital}</h4>
                            <h4>Subregión: {myCountry.subregion}</h4>
                            <h4>Área: {myCountry.area} Km2</h4>
                            <h4>Población: {myCountry.population}</h4>
                        </div>
                    </div>
                    <div>
                        <h2 className = 'actividades'>Actividades</h2>
                        <div className = 'infoact'>
                        {
                    myCountry.activities && myCountry.activities.map((el)=>{
                        return(
                            <div key = {el.name}>
                        <Activities name = {el.name} difficulty = {el.difficulty} duration = {el.duration} season = {el.season}/>
                        </div>
                        )
                    })
                }
                </div>
                        
                    </div>
                </div>
                :
                <p>Cargando...</p>
            }
            <Link to = '/home'>
                <button className = 'botonback'>
                    Volver al Home
                </button>
            </Link>
        </div>
    )
}