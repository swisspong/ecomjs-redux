  
import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';
import FormInput from './CustomTextField';
import dataProvinces from './db.json'
import { commerce} from '../../lib/commerce'

const AddressForm = ({cart,checkoutToken,next}) => {
    const [shippingCountries,setShippingCountries] = useState([])
    const [shippingCountry,setShippingCountry] = useState('')
    const [shippingSubdivisions,setSubdivisions] = useState([])
    const [shippingSubdivision,setShippingSubdivision] = useState('')
    const [shippingOptions,setShippingOptions] = useState([])
    const [shippingOption,setShippingOption] = useState('')
    const [thDistricts,setThDisticts] = useState([])
    const [district,setDistrict] = useState('')
    const [nameDistrict,setNameDistrict] = useState('')
    const [subDists,setSubDists] = useState([])
    const [subDist,setSubDist] = useState('')
    const [nameSubDistrict,setNameSubDistrict] = useState('')
    const methods = useForm()

    const countries = Object.entries(shippingCountries).map(([code,name]) => ({id:code,label:name}))
    let subdivisions = Object.entries(shippingSubdivisions).map(([code,name]) => ({id:code,label:name,name:''}))
    let districts=[]
    if(thDistricts.data){
      districts = Object.entries(thDistricts.data).map(([code,name])=>({id:code,label:name}))
    }
    // console.log(districts);
    let subDistricts=[]
    if(subDists.data){
      subDistricts = Object.entries(subDists.data).map(([code,name])=>({id:code,label:name}))
    }

    subdivisions.map(sub=>{
      let dataTh = dataProvinces.find((data) => {
        return sub.id == data.PROVINCE_CODE
      })
      if(dataTh){
        sub.name=dataTh.PROVINCE_NAME
      }else{
        sub.name="พัทยา"
      }
    })
    
    const options =shippingOptions.map((sO)=>({id:sO.id,label: `${sO.price.formatted_with_symbol}`}))
    // console.log(shippingOptions);

    const fetchShippingCountries = async(checkoutTokenId) => {
      try{
        const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId)
        console.log(countries)
        setShippingCountries(countries)
        setShippingCountry(Object.keys(countries)[0])

      }catch(err){
        console.log(err);
      }
    }
    
    const fetchDistrict = async (pro) => {
       const res = await fetch(`https://thaiaddressapi-thaikub.herokuapp.com/v1/thailand/provinces/${pro}/district`)
       const data = await res.json()
       setThDisticts(data)
       setNameDistrict(Object.values(data.data)[0])
      //  console.log(nameDistrict);
       setDistrict(Object.keys(data.data)[0])
       
    }
    const fetchSubDistrict = async (pro,dis) => {
       const res = await fetch(`https://thaiaddressapi-thaikub.herokuapp.com/v1/thailand/provinces/${pro}/district/${dis}`)
       const data = await res.json()
       if(data.data){
         setSubDists(data)
          setNameSubDistrict(Object.values(data.data)[0])
          console.log(nameSubDistrict);
          setSubDist(Object.keys(data.data)[0])

       }
       
       
    }
    
    const fetchSubdivisions = async(countryCode)=>{
      const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode)
      
      setSubdivisions(subdivisions)
      
      setShippingSubdivision(Object.keys(subdivisions)[0])
      
    }
    
    const fetchShippingOptions = async(checkoutTokenId,country,region) => {
      const options = await commerce.checkout.getShippingOptions(checkoutTokenId,{country,region})
      setShippingOptions(options)
      setShippingOption(options[0].id)
    }
    
    const handleSelectDistrict =(dis)=>{
      const sub =districts.find(dist=>dist.id===dis)
      setDistrict(dis)
      console.log(sub.label)
      setNameDistrict(sub.label)
    }
    const handleSelectSubDistrict =(subDis)=>{
      const subDist = subDistricts.find(subDist=>subDist.id===subDis);
    
      setNameSubDistrict(subDist.label)
      setSubDist(subDis)
      
    }
    
    useEffect(() => {
      fetchShippingCountries(checkoutToken.id)
      console.log("address form")
    },[cart])

    useEffect(() => {
      if(shippingCountry) fetchSubdivisions(shippingCountry)
    },[shippingCountry])

    useEffect(() => {
      if(shippingSubdivision){
       const province = subdivisions.find(sub => sub.id == shippingSubdivision)
       fetchDistrict(province.name)
      }
      
      // console.log(province);
      if(shippingSubdivision) fetchShippingOptions(checkoutToken.id,shippingCountry,shippingSubdivision)
     
    },[shippingSubdivision])

    useEffect(async()=>{
        if(district) {
          const province = subdivisions.find(sub => sub.id == shippingSubdivision)
          const dist = districts.find(dis=> dis.id == district)
          await fetchSubDistrict(province.name,dist.label)
          console.log("change");
        }
      
    },[district,nameDistrict])
    
    // console.log(thDistricts);
    // console.log(district);
    // console.log(nameDistrict);
    return (
        <>
          <Typography variant="h6" gutterBottom>ที่อยู่จัดส่ง</Typography>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit((data)=> next({...data,shippingCountry,shippingSubdivision,shippingOption,nameDistrict,nameSubDistrict}))}>
                <Grid container spacing={3}>
                    <FormInput name="firstName" label="ชื่อ" />
                    <FormInput name="lastName" label="นามสกุล" />
                    <FormInput name="email" label="อีเมล" />
                    <FormInput name="address1" label="ที่อยู่" />
                    <FormInput name="tel" label="เบอร์มือถือ" />
                    <FormInput name="zip" label="รหัสไปรษณีย์" />
                    <Grid item xs={12} sm={6}>
                      <InputLabel>เขต/อำเภอ</InputLabel>
                      <Select value={district} fullWidth onChange={(e)=> handleSelectDistrict(e.target.value)}>
                     
                        {districts.map((dis)=>(
                          <MenuItem key={dis.id} value={dis.id}>
                            {dis.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel>แขวง/ตำบล</InputLabel>
                      <Select value={subDist} fullWidth onChange={(e)=> handleSelectSubDistrict(e.target.value)}>
                     
                        {subDistricts.map((subDis)=>(
                          <MenuItem key={subDis.id} value={subDis.id}>
                            {subDis.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel>จังหวัด</InputLabel>
                      <Select value={shippingSubdivision} fullWidth onChange={(e)=> setShippingSubdivision(e.target.value)}>
                        
                        {subdivisions.map((subdivision)=>(
                          <MenuItem key={subdivision.id} value={subdivision.id}>
                            {subdivision.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputLabel>ค่าจัดส่ง</InputLabel>
                      <Select value={shippingOption} fullWidth onChange={(e)=> setShippingOption(e.target.value)}>
                        {options.map((option)=>(
                          <MenuItem key={option.id} value={option.id}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                </Grid>
                <br/>
                <div style={{display: 'flex',justifyContent: 'space-between'}}>
                    <Button component={Link} to="/cart" variant="outlined">Back to Cart</Button>
                    <Button type="submit" variant="contained" color="primary">Next</Button>
                </div>
                
            </form>
          </FormProvider>
        </>
      );
}

export default AddressForm
