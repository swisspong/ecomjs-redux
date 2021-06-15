import {
    COUNTRIES_REQUEST, 
    COUNTRIES_SUCCESS,
    COUNTRY_DATA,
    DISTRICES_SUCCESS,
    DISTRICT_NAME,
    SUBDISTRICTS_SUCCESS,
    SUBDIVISIONS_REQUEST,
    SUBDIVISIONS_SUCCESS,
    SUBDIVISION_SUCCESS
} from '../constants/formConstants'

export const formReducer = (state ={
        countriesRe:[],
        subdivisionsRe:[],
        districtsRe:[],
        subDistrictsRe:[],
        country:'',
        subdivisionId:'',
        districtName:'',
        subDistrictName:''
    },action) =>{
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
        case SUBDIVISION_SUCCESS:
            return {loading:false,...state,subdivisionId:action.payload}
        case DISTRICES_SUCCESS:
            return {...state,districtsRe:action.payload,districtName:action.name}
        case SUBDISTRICTS_SUCCESS:
            return {...state,subDistrictsRe:action.payload,subDistrictName:action.name}
        case DISTRICT_NAME:
            return {...state,districtName:action.payload}
        default:
            return state
    }
}