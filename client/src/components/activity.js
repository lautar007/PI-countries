import React, {useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postActivities, getCountries } from "../actions";

export default function Activity(){
    const dispatch = useDispatch();
    const countries = useSelector((state)=> state.countries);

    const [input, setInput] = useState({
        name: "",
        difficulty: 0,
        duration: "",
        season: ""
    })

    useEffect(()=>{
        dispatch(getCountries());
    },[]);

    return(
        <div>
            <Link to = '/home'>
                <button>
                    Volver al Home
                </button>
            </Link>
            <h1>Crear una actividad</h1>
            <form>
                <div>
                    <label>Nombre:</label>
                   <input
                   type = 'text'
                   value = {input.name}
                   name = 'name'
                   /> 
                </div>
                <div>
                    <lable>Dificultad:</lable>
                    <input
                    type = 'number'
                    value = {input.difficulty}
                    name = 'difficulty'
                    />
                </div>
                <div>
                    <label>Duración:</label>
                   <input
                   type = 'text'
                   value = {input.duration}
                   name = 'duration'
                   /> 
                </div>
                <div>
                    <label>Estación:</label>
                    <label>
                    <input
                    type = 'checkbox'
                    name = 'Primavera'
                    value = 'Primavera'
                    />
                    Primavera
                    </label>
                    <label>
                    <input
                    type = 'checkbox'
                    name = 'Verano'
                    value = 'Verano'
                    />
                    Verano
                    </label>
                    <label>
                    <input
                    type = 'checkbox'
                    name = 'Otoño'
                    value = 'Otoño'
                    />
                    Otoño
                    </label>
                    <label>
                    <input
                    type = 'checkbox'
                    name = 'Invierno'
                    value = 'Invierno'
                    />
                    Invierno
                    </label>
                </div>
                <div>
                    <label>¿En cuál páis se puede realizar la actividad?</label>
                <select>
                    {countries.map((el) => (
                        <option value = {el.Name}>{el.Name}</option>
                    ))}
                </select>
                </div>
            </form>
        </div>
    )

}