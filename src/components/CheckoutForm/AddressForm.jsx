
import React, { useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';
import FormInput from './CustomTextField';
// import dataProvinces from './db.json'
// import { commerce } from '../../lib/commerce'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries, fetchDistricts, fetchOptionsRedux, fetchSubDistrictRedux, fetchSubdivisionsAc, handleSetDistrictNameAndId, handleSetOptionId, handleSetSubDistrictNameAndId, handleSetSubdivisionId } from '../../actions/formActions';

const AddressForm = ({ next }) => {
  const dispatch = useDispatch()
  const formPosition = useSelector(state => state.formPosition);
  const {country, subdivisionsRe, subdivisionId, districtName, districtId, districtsRe, subDistrictsRe, subDistrictId, optionsRe, optionId, subDistrictName } = formPosition
  const cartRetrieve = useSelector(state => state.cartRetrieve);
  const {cart} = cartRetrieve
  // const checkoutTokenCart = useSelector(state => state.checkoutTokenCart)
  // const {token} = checkoutTokenCart
  const methods = useForm()

  useEffect(() => {
    dispatch(fetchCountries())
  }, [dispatch,cart])
  useEffect(() => {
    if (country) {
      dispatch(fetchSubdivisionsAc(country))
    }
  }, [dispatch,country])
  useEffect(() => {
    if (subdivisionId) dispatch(fetchDistricts())
    if (subdivisionId) dispatch(fetchOptionsRedux())
  }, [
    dispatch,
    subdivisionId
  ])
  useEffect(() => {
    if (districtName) dispatch(fetchSubDistrictRedux())
  }, [
    dispatch,
    districtName
  ])

  return (
    <>
      <Typography variant="h6" gutterBottom>ที่อยู่จัดส่ง</Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => next({
          ...data, country, subdivisionId, optionId, districtName, subDistrictName
        }))}>
          <Grid container spacing={3}>
            <FormInput name="firstName" label="ชื่อ" />
            <FormInput name="lastName" label="นามสกุล" />
            <FormInput name="email" label="อีเมล" />
            <FormInput name="address1" label="ที่อยู่" />
            <FormInput name="tel" label="เบอร์มือถือ" />
            <FormInput name="zip" label="รหัสไปรษณีย์" />
            <Grid item xs={12} sm={6}>
              <InputLabel>เขต/อำเภอ</InputLabel>
              <Select value={districtId} fullWidth onChange={(e) => dispatch(handleSetDistrictNameAndId(e.target.value))}>
                {districtsRe.map((dis) => (
                  <MenuItem key={dis.id} value={dis.id}>
                    {dis.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>แขวง/ตำบล</InputLabel>
              <Select value={subDistrictId} fullWidth onChange={(e) => dispatch(handleSetSubDistrictNameAndId(e.target.value))}>

                {subDistrictsRe.map((subDis) => (
                  <MenuItem key={subDis.id} value={subDis.id}>
                    {subDis.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>จังหวัด</InputLabel>
              <Select value={subdivisionId} fullWidth onChange={(e) => dispatch(handleSetSubdivisionId(e.target.value))}>
                {subdivisionsRe.map((subdivision) => (
                  <MenuItem key={subdivision.id} value={subdivision.id}>
                    {subdivision.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>ค่าจัดส่ง</InputLabel>
              <Select value={optionId} fullWidth onChange={(e) => dispatch(handleSetOptionId(e.target.value))}>
                {optionsRe.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button component={Link} to="/cart" variant="outlined">Back to Cart</Button>
            <Button type="submit" variant="contained" color="primary">Next</Button>
          </div>

        </form>
      </FormProvider>
    </>
  );
}

export default AddressForm
