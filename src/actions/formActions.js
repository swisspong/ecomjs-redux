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
} from "../constants/formConstants"
import {commerce} from "../lib/commerce"
import dataProvinces from "../components/CheckoutForm/db.json"
export const fetchCountries = () => async (dispatch,getState) => {
  try{
    dispatch({type: COUNTRIES_REQUEST})
    const {countries} = await commerce.services.localeListShippingCountries(getState().checkoutTokenCart.token.id)
    const newCountries =  Object.entries(countries).map(([code, name])=> ({id:code,label:name}))
    dispatch({
      type: COUNTRIES_SUCCESS,
      payload: newCountries,
      id:newCountries[0].id
    })
  }catch(e){
    console.log(e)
  }
}
export const fetchSubdivisionsAc = (countryCode) => async (dispatch) => {
  dispatch({
    type: SUBDIVISIONS_REQUEST
  })
  const {
    subdivisions
  } = await commerce.services.localeListSubdivisions(countryCode)
  const newSubs = Object.entries(subdivisions).map(([code, name]) => ({
    id: code,
    label: name,
    name: ''
  }))
  newSubs.map((sub) => {  
    let dataTh = dataProvinces.find((data) => sub.id === data.PROVINCE_CODE)
    return dataTh ? sub.name = dataTh.PROVINCE_NAME: sub.name ="พัทยา"
  })
  dispatch({
    type: SUBDIVISION_SUCCESS,
    payload: Object.keys(subdivisions)[0]
  })
  dispatch({
    type: SUBDIVISIONS_SUCCESS,
    payload: newSubs
  })
}
export const fetchDistricts = () => async (dispatch, getState) => {
  const {
    subdivisionsRe
  } = getState().formPosition;
  const province = subdivisionsRe.find(sub => sub.id === getState().formPosition.subdivisionId)
  const res = await fetch(`https://thaiaddressapi-thaikub.herokuapp.com/v1/thailand/provinces/${province.name}/district`)
  const data = await res.json()
  dispatch({
    type: DISTRICES_SUCCESS,
    payload: Object.entries(data.data).map(([code, name]) => ({ id: code, label: name })),
    name: Object.values(data.data)[0],
    id: Object.keys(data.data)[0]
  })
}
export const fetchSubDistrictRedux = () => async (dispatch, getState) => {
  const {
    subdivisionsRe,
    districtName
  } = getState().formPosition;
  const province = subdivisionsRe.find(sub => sub.id === getState().formPosition.subdivisionId)
  const res = await fetch(`https://thaiaddressapi-thaikub.herokuapp.com/v1/thailand/provinces/${province.name}/district/${districtName}`)
  const data = await res.json()
  const newData = Object.entries(data.data).map(([code, name]) => ({ id: code, label: name }))
  dispatch({
    type: SUBDISTRICTS_SUCCESS,
    payload: newData,
    name: newData[0].label,
    id: newData[0].id
  })
}
export const fetchOptionsRedux = () => async (dispatch, getState) => {
  const { token } = getState().checkoutTokenCart
  const { country, subDivisionId } = getState().formPosition
  const options = await commerce.checkout.getShippingOptions(token.id, { country, subDivisionId })
  const newOp = options.map((sO) => ({ id: sO.id, label: `${sO.price.formatted_with_symbol}` }))
  dispatch({
    type: OPTIONS_SUCCESS,
    payload: newOp,
    id: newOp[0].id
  })
}
export const handleSetSubdivisionId = (subDivisionId) => (dispatch) => {
  dispatch({ type: SET_SUBDIVISION_ID, payload: subDivisionId })
}
export const handleSetDistrictNameAndId = (districtId) => (dispatch, getState) => {
  const { districtsRe } = getState().formPosition
  const dis = districtsRe.find(dis => dis.id === districtId)
  dispatch({ type: SET_DISTRICT_NAME_ID, name: dis.label, id: districtId })
}
export const handleSetSubDistrictNameAndId = (subDistrictId) => (dispatch, getState) => {
  const { subDistrictsRe } = getState().formPosition
  const subDistrict = subDistrictsRe.find(subDis => subDis.id === subDistrictId)
  dispatch({ type: SET_SUBDISTRICT_NAME_ID, name: subDistrict.label, id: subDistrict.id })
}
export const handleSetOptionId = (optionId) => (dispatch) => {
  dispatch({ type: SET_OPTION_ID, name: optionId })
}
