import {
  COUNTRIES_REQUEST,
  COUNTRIES_SUCCESS,
  COUNTRY_DATA,
  DISTRICES_SUCCESS,
  SUBDISTRICTS_SUCCESS,
  SUBDIVISIONS_REQUEST,
  SUBDIVISIONS_SUCCESS,
  SUBDIVISION_SUCCESS
} from "../constants/formConstants"
import {
  commerce
} from "../lib/commerce"
import dataProvinces from "../components/CheckoutForm/db.json"

export const fetchCountries = (checkoutTokenId) => async (dispatch) => {
  dispatch({
    type: COUNTRIES_REQUEST
  })
  const {
    countries
  } = await commerce.services.localeListShippingCountries(checkoutTokenId)
  dispatch({
    type: COUNTRIES_SUCCESS,
    payload: countries
  })
  dispatch({
    type: COUNTRY_DATA,
    payload: Object.keys(countries)[0]
  })
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
  newSubs.map(sub => {
    let dataTh = dataProvinces.find((data) => {
      return sub.id == data.PROVINCE_CODE
    })
    if (dataTh) {
      sub.name = dataTh.PROVINCE_NAME
    } else {
      sub.name = "พัทยา"
    }
  })
  dispatch({
    type: SUBDIVISION_SUCCESS,
    payload: Object.keys(subdivisions)[0]
  })
  dispatch({
    type: SUBDIVISIONS_SUCCESS,
    payload: newSubs
  })
  // dispatch({type:SUBDIVISIONS_SUCCESS,payload:subdivisions})
}

export const fetchDistricts = () => async (dispatch, getState) => {
  const {
    subdivisionsRe
  } = getState().formPosition;
  // console.log(subdivisionsRe)
  const province = subdivisionsRe.find(sub => sub.id === getState().formPosition.subdivisionId)
  // console.log(province)
  const res = await fetch(`https://thaiaddressapi-thaikub.herokuapp.com/v1/thailand/provinces/${province.name}/district`)
  const data = await res.json()
  dispatch({
    type: DISTRICES_SUCCESS,
    payload: data.data,
    name:Object.values(data.data)[0]
  })
}

export const fetchSubDistrictRedux = (dis) => async (dispatch, getState) => {
  const {
    subdivisionsRe,
    districtName
  } = getState().formPosition;
  // console.log(subdivisionsRe)
  const province = subdivisionsRe.find(sub => sub.id === getState().formPosition.subdivisionId)
  const res = await fetch(`https://thaiaddressapi-thaikub.herokuapp.com/v1/thailand/provinces/${province.name}/district/${districtName}`)
  const data = await res.json()
  dispatch({type:SUBDISTRICTS_SUCCESS, payload:data.data,name:Object.values(data.data)[0]})
  if (data.data) {
    
    // setSubDists(data)
    // setNameSubDistrict(Object.values(data.data)[0])
    // console.log(nameSubDistrict);
    // setSubDist(Object.keys(data.data)[0])

  }
}