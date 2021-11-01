import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postActivities, getCountries, putActivityCountry } from "../actions";

export default function Activity(){
    const dispatch = useDispatch();
    const countries = useSelector((state)=> state.countries);

    const [input, setInput] = useState({
        name: "",
        difficulty: 0,
        duration: "",
        season: ""
    })

    const [count, setCount] =useState({
        countryName: "",
        activityName: ""
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    }

    function handleActivityName(e){
        setCount({
            ...count,
            activityName: e.target.value
        })
    }

    function handleCheck(e){
        if(e.target.checked){
            setInput({
                ...input,
                season: e.target.value
            })
        }
    }

    function handleCountryName(e){
        setCount({
            ...count,
            countryName: e.target.value
        });
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(input);
        console.log(count);
        dispatch(postActivities(input));
        dispatch(putActivityCountry(count));
        alert('Actividad creada con éxito :)');
        setInput({
            name: "",
            difficulty: 0,
            duration: "",
            season: ""
        });
        setCount({
            countryName: "",
            activityName: ""
        });

    }

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
            <form onSubmit = {(e) => handleSubmit(e)}>
                <div>
                    <label>Nombre:</label>
                   <input
                   type = 'text'
                   value = {input.name}
                   name = 'name'
                   onChange= {(e) => {
                       handleChange(e);
                       handleActivityName(e);
                    }}
                   /> 
                </div>
                <div>
                    <label>Dificultad:</label>
                    <input
                    type = 'number'
                    value = {input.difficulty}
                    name = 'difficulty'
                    onChange= {(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Duración:</label>
                   <input
                   type = 'text'
                   value = {input.duration}
                   name = 'duration'
                   onChange= {(e) => handleChange(e)}
                   /> 
                </div>
                <div>
                    <label>Estación:</label>
                    <label>
                    <input
                    type = 'checkbox'
                    name = 'Primavera'
                    value = 'Primavera'
                    onChange = {(e) => handleCheck(e)}
                    />
                    Primavera
                    </label>
                    <label>
                    <input
                    type = 'checkbox'
                    name = 'Verano'
                    value = 'Verano'
                    onChange = {(e) => handleCheck(e)}
                    />
                    Verano
                    </label>
                    <label>
                    <input
                    type = 'checkbox'
                    name = 'Otoño'
                    value = 'Otoño'
                    onChange = {(e) => handleCheck(e)}
                    />
                    Otoño
                    </label>
                    <label>
                    <input
                    type = 'checkbox'
                    name = 'Invierno'
                    value = 'Invierno'
                    onChange = {(e) => handleCheck(e)}
                    />
                    Invierno
                    </label>
                </div>
                <div>
                    <label>¿En qué páis se puede realizar la actividad?</label>
                <select onChange = {(e) => {handleCountryName(e)}}>
                    <option key = 'selec'>Seleccionar</option>
                    {countries.map((el) => (
                        <option key = {el.id}  value = {el.Name}>{el.Name}</option>
                    ))}
                </select>
                </div>
                <div>
                    <button type = 'submit'>Crear</button>
                </div>
            </form>
        </div>
    )

}