import { 
    COUNTRIES_REQUEST, 
    COUNTRIES_SUCCESS, 
    COUNTRY_DATA, 
    SUBDIVISIONS_REQUEST, 
    SUBDIVISIONS_SUCCESS
} from "../constants/formConstants"
import { commerce } from "../lib/commerce"

export const fetchCountries = (checkoutTokenId) => async (dispatch) =>{
    dispatch({type:COUNTRIES_REQUEST})
    const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId)
    dispatch({type:COUNTRIES_SUCCESS,payload:countries})
    dispatch({type:COUNTRY_DATA,payload:Object.keys(countries)[0]})
}
export const fetchSubdivisionsAc = (countryCode) => async (dispatch) =>{
    dispatch({type:SUBDIVISIONS_REQUEST})
    const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode)
    dispatch({type:SUBDIVISIONS_SUCCESS,payload:subdivisions})
}