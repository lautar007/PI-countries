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