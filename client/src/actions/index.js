import axios from 'axios';

export function getCountries(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/countries');
        return dispatch({
            type: 'GET_COUNTRIES',
            payload: json.data
        })
    }
}

export function getNameCountry(payload){
    return{
        type: 'GET_NAME_COUNTRY',
        payload
    }
}

export function getActivities(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/activity');
        return dispatch({
            type: 'GET_ACTIVITIES',
            payload: json.data
        })
    }
}

export function filterContinent(payload){
    return{
        type:'FILTER_CONTINENT',
        payload
    }
}

export function filterActivity(payload){
    return{
        type: 'FILTER_ACTIVITY',
        payload
    }
}

export function orderAlpha(payload){
    return{
        type: 'ORDER_ALPHA',
        payload
    }
}

export function orderPopulation(payload){
    return{
        type: 'ORDER_POPULATION',
        payload
    }
}

export function postActivities(payload){
    return async function (dispatch){
        const data = await axios.post('http://localhost:3001/activity', payload);
        return data;
    }
}

export function putActivityCountry(payload){
    return async function (dispatch){
        const dato = await axios.put('http://localhost:3001/countries', payload);
        return dato;
    }
}

export function getDetail(id){
    return async function (dispatch){
        try{
        var json = await axios('http://localhost:3001/countries/' + id);
        return dispatch({
            type: 'GET_DETAIL',
            payload: json.data
        })
    } catch(error){
        console.log(error)
    }
    }
}