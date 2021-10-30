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