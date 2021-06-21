import {
    COUNTRIES_REQUEST, 
    COUNTRIES_SUCCESS,
    DISTRICES_SUCCESS,
    OPTIONS_SUCCESS,
    SET_DISTRICT_NAME_ID,
    SET_OPTION_ID,
    SET_SUBDISTRICT_NAME_ID,
    SET_SUBDIVISION_ID,
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
        optionsRe:[],
        country:'',
        subdivisionId:'',
        districtName:'',
        districtId:'',
        subDistrictName:'',
        subDistrictId:'',
        optionId:'',
    },action) =>{
    switch(action.type){
        case COUNTRIES_REQUEST:
            return {loading:true,...state}
        case COUNTRIES_SUCCESS:
            return {loading:false,...state,countriesRe:action.payload,country:action.id}
        // case COUNTRY_DATA:
        //     return {...state,country:action.payload}
        case SUBDIVISIONS_REQUEST:
            return {loading:true,...state}
        case SUBDIVISIONS_SUCCESS:
            return {loading:false,...state,subdivisionsRe:action.payload}
        case SUBDIVISION_SUCCESS:
            return {loading:false,...state,subdivisionId:action.payload}
        case DISTRICES_SUCCESS:
            return {...state,districtsRe:action.payload,districtName:action.name,districtId:action.id}
        case SUBDISTRICTS_SUCCESS:
            return {...state,subDistrictsRe:action.payload,subDistrictName:action.name,subDistrictId:action.id}
        case OPTIONS_SUCCESS:
            return {...state,optionsRe:action.payload,optionId:action.id}
        case SET_SUBDIVISION_ID:
            return {...state,subdivisionId:action.payload}
        case SET_DISTRICT_NAME_ID:
            return {...state,districtName:action.name,districtId:action.id}
        case SET_SUBDISTRICT_NAME_ID:
            return {...state,subDistrictName:action.name,subDistrictId:action.id}
        case SET_OPTION_ID:
            return {...state,optionId:action.payload}
        default:
            return state
    }
}