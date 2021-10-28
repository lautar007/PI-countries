
const initialState = {
    allCountries: [],
    countries: [],
    activities: []
}

function rootReducer (state = initialState, action){
    switch(action.type){
        case 'GET_COUNTRIES': 
        return{
            ...state,
            allCountries:action.payload,
            countries: action.payload
        }
        case 'GET_ACTIVITIES':
            return{
                ...state,
                activities: action.payload
            }
        case 'FILTER_CONTINENT':
            const allCountries = state.allCountries;
            const continentFilter = action.payload === 'Todos'? allCountries
            :
            allCountries.filter(el => el.continent === action.payload)
            return{
                ...state,
                countries: continentFilter
            }
        default:
            return state;
    }

}

export default rootReducer;