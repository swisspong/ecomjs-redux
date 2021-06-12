import {
    COUNTRIES_REQUEST, 
    COUNTRIES_SUCCESS,
    COUNTRY_DATA,
    SUBDIVISIONS_REQUEST,
    SUBDIVISIONS_SUCCESS
} from '../constants/formConstants'

export const formReducer = (state ={countriesRe:[],subdivisionsRe:[],country:''},action) =>{
    switch(action.type){
        case COUNTRIES_REQUEST:
            return {loading:true,...state}
        case COUNTRIES_SUCCESS:
            return {loading:false,...state,countriesRe:action.payload}
        case COUNTRY_DATA:
            return {...state,country:action.payload}
        case SUBDIVISIONS_REQUEST:
            return {loading:true,...state}
        case SUBDIVISIONS_SUCCESS:
            return {loading:false,...state,subdivisionsRe:action.payload}
        default:
            return state
    }
}