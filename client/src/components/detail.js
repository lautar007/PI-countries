import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import Activities from "./activities";

export default function Detail(props){


    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getDetail(props.match.params.id)); 
    }, [dispatch]);

    const myCountry = useSelector((state) => state.detail)
    
    

    return(
        <div>
            {
                myCountry? 
                <div>
                    <div>
                       <h1>{myCountry.Name}</h1>
                       <img src = {myCountry.flag}/>
                    </div>
                    <div>
                        <h4>Código de país: {myCountry.id}</h4>
                        <h4>Capital: {myCountry.capital}</h4>
                        <h4>Subregión: {myCountry.subregion}</h4>
                        <h4>Área: {myCountry.area}</h4>
                        <h4>Población: {myCountry.population}</h4>
                    </div>
                    <div>
                        <h2>Actividades</h2>
                        {
                    myCountry.activities && myCountry.activities.map((el)=>{
                        return(
                            <div key = {el.name}>
                        <Activities name = {el.name} difficulty = {el.difficulty} duration = {el.duration} season = {el.season}/>
                        <hr/>
                        </div>
                        )
                    })
                }
                        
                    </div>
                </div>
                :
                <p>Cargando...</p>
            }
            <Link to = '/home'>
                <button>
                    Volver al Home
                </button>
            </Link>
        </div>
    )
}