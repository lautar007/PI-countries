import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameCountry } from "../actions";

export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChange (e){
        e.preventDefault();
        setName(e.target.value);
        console.log(name)
    } 

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getNameCountry(name));
    }

    return(
        <div>
            <input
            onChange = {(e) =>handleInputChange(e)}
            type = 'text'
            placeholder = 'Nombre del País'
            />
            <button onClick = {(e)=> handleSubmit(e)} type = 'submit'>Buscar</button>
        </div>
    )
}