import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postActivities, getCountries, putActivityCountry } from "../actions";
import './activity.css';

function validatorInput (input){
    let errores = {};
    if(!input.name){
        errores.name = 'Defina el nombre de la actividad'
    } else if (!input.difficulty){
        errores.difficulty = 'Defina la dificultad de la actividad'
    } else if(input.difficulty <= 0 || input.difficulty > 5){
        errores.difficulty = 'Debe ser un número del 1 al 5'
    }else if (!input.duration){
        errores.duration = 'Defina la duración de la actividad'
    } else if (!input.season){
        errores.season = 'Defina la estación de la actividad'
    } 

    return errores;
}

function validatorCount (count){
    let errores = {};
    if (count.countryName.length === 0){
        errores.country = 'Defina en qué país/es se realiza la actividad'
    }

    return errores;
}

export default function Activity(){
    const dispatch = useDispatch();
    const countries = useSelector((state)=> state.countries);
    const countriesAlpha = countries.sort(function(a,b){
        if(a.Name > b.Name){
            return 1;
        }
        if(b.Name > a.Name){
            return -1;
        }
        return 0;
    })

    const [input, setInput] = useState({
        name: "",
        difficulty: 0,
        duration: "",
        season: ""
    })

    const [count, setCount] =useState({
        countryName: [],
        activityName: ""
    })

    const [errores, setErrores] =useState({})

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        setErrores(validatorInput({
            ...input,
            [e.target.name]: e.target.value,
        }))
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
            setErrores(validatorInput({
                ...input,
                season: e.target.value,
            }))
        }
    }

    function handleCountryName(e){
        setCount({
            ...count,
            countryName: [...count.countryName, e.target.value]
        });
        setErrores(validatorCount({
            ...count,
            countryName: [...count.countryName, e.target.value]
        }))
        console.log(count)
    }

    function handleDelete(el){
        setCount({
            ...count,
            countryName: count.countryName.filter(country => country !== el)
        })
    }

    function handleActividad(e){
        e.preventDefault();
        console.log(input);
        if(!input.name ||
            !input.duration ||
            input.difficulty <= 0 ||
            input.difficulty > 5 ||
            !input.season){
                alert('Todos los campos deben ser completados correctamente')
            } else {
                dispatch(postActivities(input));
                alert('actividad creada con éxito :)')
                setInput({
                    name: "",
                    difficulty: 0,
                    duration: "",
                    season: ""
                });
            }
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(count);
        if(!input.name){
            alert('Debe aclarar el nombre de la actividad')
        }else if(count.countryName.length === 0){
            alert('Debe seleccionar la menos un país')
        } else {
        dispatch(putActivityCountry(count));
        alert('La actividad se ha asignado a el/los país/es');
        setCount({
            countryName: "",
            activityName: ""
        });
    }
    }

    useEffect(()=>{
        dispatch(getCountries());
    });

    return(
        <div className = 'fondo1'>
            <Link to = '/home'>
                <button className = 'botonback'>
                    Volver al Home
                </button>
            </Link>
            <h1>Crear una actividad</h1>
            <p className = 'instrucciones'>Para crear una nueva actividad, simplemente complete los campos del formulario y haga click en el botón de 'crear'. Luego, para asignar la actividad a los países, coloque el nombre de la actividad creada en el campo correspondiente y luego elija el o los países que prefiera. Finalmente haga click en 'asignar'.</p>
            <form className = 'formulario' onSubmit = {(e) => handleSubmit(e)}>
                <div className = 'input'>
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
                   {errores.name && (
                       <p className = 'error'>{errores.name}</p>
                   )}
                </div>
                <div className = 'input'>
                    <label>Dificultad:</label>
                    <input
                    type = 'number'
                    value = {input.difficulty}
                    name = 'difficulty'
                    onChange= {(e) => handleChange(e)}
                    />
                     {errores.difficulty && (
                       <p className = 'error'>{errores.difficulty}</p>
                   )}
                </div>
                <div className = 'input'>
                    <label>Duración:</label>
                   <input
                   type = 'text'
                   value = {input.duration}
                   name = 'duration'
                   onChange= {(e) => handleChange(e)}
                   /> 
                   {errores.duration && (
                       <p className = 'error'>{errores.duration}</p>
                   )}
                </div>
                <div className = 'checkbox'>
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
                    {errores.season && (
                       <p className = 'error'>{errores.season}</p>
                   )}
                </div>
                <div>
                    <button className = 'crear' onClick = {(e) => handleActividad(e)}>Crear Actividad</button>
                </div>
                <div className = 'select'>
                    <label>¿En qué páis se puede realizar la actividad?</label>
                <select onChange = {(e) => {handleCountryName(e)}}>
                    <option key = 'selec'>Seleccionar</option>
                    {
                    countriesAlpha.map((el) => (
                        <option key = {el.id}  value = {el.Name}>{el.Name}</option>
                    ))}
                </select>
                <ul className = 'listado'>
                    { count.countryName ? count.countryName.map(el =>{
                        return(
                            <div className = 'listadopais'>
                                <li key = {el}>{el}</li>
                                <button onClick = {()=>handleDelete(el)}>X</button>
                            </div>    
                        )
                    }) : 'Lista de países elegidos'}
                </ul>
                {errores.country && (
                       <p className = 'error'>{errores.country}</p>
                   )}
                </div>
                <div className = 'divcrear'>
                    <button className = 'crear' type = 'submit'>Asignar País/es</button>
                </div>
            </form>
        </div>
    )

}