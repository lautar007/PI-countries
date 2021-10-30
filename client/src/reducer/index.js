
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
        case 'GET_NAME_COUNTRY':
            const allCountries1 = state.allCountries;
            const country = allCountries1.filter(el => el.Name.toUpperCase() === action.payload.toUpperCase())
            return{
                ...state,
                countries: country
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
        case 'ORDER_ALPHA':
            const orden = action.payload === 'asc' ?
            state.countries.sort(function(a,b){
                if(a.Name > b.Name){
                    return 1;
                }
                if(b.Name > a.Name){
                    return -1;
                }
                return 0;
            }) :
            state.countries.sort( function (a,b){
                if(a.Name > b.Name){
                    return -1;
                }
                if(b.Name > a.Name){
                    return 1;
                }
                return 0;
            }) 
            return{
                ...state,
                countries: orden
            }
        case 'ORDER_POPULATION':
            const orden2 = action.payload === 'asc' ?
            state.countries.sort(function(a,b){
                if(a.population > b.population){
                    return 1;
                }
                if(b.population > a.population){
                    return -1;
                }
                return 0;
            }) :
            state.countries.sort( function (a,b){
                if(a.population > b.population){
                    return -1;
                }
                if(b.population > a.population){
                    return 1;
                }
                return 0;
            }) 
            return{
                ...state,
                countries: orden2
            }
        case 'POST_ACTIVITIES':
            return{
                ...state
            }
        default:
            return state;
    }

}

export default rootReducer;