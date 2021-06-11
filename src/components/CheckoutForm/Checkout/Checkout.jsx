
import { Button, CircularProgress, Divider, Paper, Step, StepLabel, Stepper, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import useStyles from './styles'
import {commerce} from '../../../lib/commerce'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { generateCheckoutToken } from '../../../actions/checkoutTokenAction'
const steps = ["ที่อยู่จัดส่ง","รายละเอียดการชำระเงิน"]
const Checkout = ({cart,order,onCaptureCheckout,error}) => {
    const dispatch = useDispatch()
    const checkoutTokenCart = useSelector(state => state.checkoutTokenCart);
    const {token} = checkoutTokenCart
    const [activeStep,setActiveStep] = useState(0);
    const [checkoutToken,setCheckoutToken] =useState(null);
    const [shippingData,setShippingData] = useState({})
    const [setErrors,errors] = useState("")
    const classes = useStyles();

    useEffect(() => {
        // const generateToken = async()=>{
        //     try{
        //         const token = await commerce.checkout.generateToken(cart.id,{type:'cart'})
               
        //         setCheckoutToken(token);
        //     }catch(err){
        //         console.log(err);
        //     }
        // }
        // generateToken();
        dispatch(generateCheckoutToken(cart.id))
    }, [cart])

    const nextStep =()=> setActiveStep((prevActiveStep) => prevActiveStep + 1)
    const backStep =()=> setActiveStep((prevActiveStep) => prevActiveStep - 1)

    const next = (data) => {
        setShippingData(data)

        nextStep()
    }

    const Confirmation = () => order.customer ?(
        <>
            <div>
                <Typography variant='h5'>Thank you for your pruchase,{order.customer.firstname} {order.customer.lastname}</Typography>
                <Divider className={classes.divider}/>
                <Typography variant='subtitle2'>Order ref: {order.customer_reference}</Typography>
            </div>
            <br/>
            <Button component={Link} to="/" variant='outlined' type="button">Back to Home</Button>
        </>

    ):(
        <div className={classes.spinner}>
            <CircularProgress/>
        </div>
    )
    console.log(shippingData);
    if(error){
        <>
            <Typography variant='h5'>Error: {error}</Typography>
            <br/>
            <Button component={Link} to="/" variant='outlined' type="button">Back to Home</Button>
        </>
    }
    const Form = ()=> activeStep === 0 
        ? <AddressForm 
            cart={cart} 
            checkoutToken={checkoutToken} 
            next={next}
        />
        : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} onCaptureCheckout={onCaptureCheckout}/>

    return (
        <>
            <div className={classes.toolbar}/>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Checkout</Typography>
                        <Stepper activeStep={activeStep} className={classes.stepper}>
                           {steps.map(step =>(
                                <Step key={step}>
                                    <StepLabel>{step}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === steps.length ? <Confirmation/>: 
                            // checkoutToken
                            token
                             && <Form/>}
                    </Paper>
                </main>
             
        </>
    )
}

export default Checkout
