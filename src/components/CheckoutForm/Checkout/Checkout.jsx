
import { Button, CircularProgress, Divider, Paper, Step, StepLabel, Stepper, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import ModalError from '../../Modal/ModalError'
import useStyles from './styles'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { generateCheckoutToken } from '../../../actions/checkoutTokenAction'
import { removeItem } from '../../../actions/cartActions'
import SweetAlert2 from 'react-sweetalert2';
import Swal from 'sweetalert2'
import { useHistory } from "react-router-dom";
const steps = ["ที่อยู่จัดส่ง", "รายละเอียดการชำระเงิน"]
const Checkout = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const checkoutTokenCart = useSelector(state => state.checkoutTokenCart);
    const { token } = checkoutTokenCart
    const checkout = useSelector(state => state.checkout)
    const { order, error, errors } = checkout
    console.log(process.env.REACT_APP_CHEC_PUBLIC_KEY)
    // const SweetAlert = withSwalInstance(Swal);
    const [swalProps, setSwalProps] = useState({
        show: true,
        icon: 'error',
        title: 'Oops...',
        text: 'จำนวนสินค้ามีไม่เพียงพอ',
        allowOutsideClick: false,
        showCloseButton: false,
        confirmButtonText: `กลับไปที่หน้าหลักเพื่อเลือกจำนวนสินค้าใหม่`,
        focusConfirm: true,
    });
    const cartRetrieve = useSelector(state => state.cartRetrieve);
    const { cart } = cartRetrieve

    const [activeStep, setActiveStep] = useState(0);
    const [shippingData, setShippingData] = useState({})
    const classes = useStyles();
    useEffect(() => {
        dispatch(generateCheckoutToken(cart.id))
    }, [cart, dispatch])

    useEffect(() => {

        if (error) {
            // const textE = Object.keys(errors.errors)
            // const id = textE.map((text) => text.split('.')[1])
            // console.log(id)

            // console.log(textE[0].split('.')[1])
            // const id = textE[0].split('.')[1]

            // dispatch(removeItem(id))
        }
    }, [dispatch, error])

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

    const next = (data) => {
        setShippingData(data)
        nextStep()
    }

    let Confirmation = () => order.customer ? (
        <>
            <div>
                <Typography variant='h5'>Thank you for your pruchase,{order.customer.firstname} {order.customer.lastname}</Typography>
                <Divider className={classes.divider} />
                <Typography variant='subtitle2'>Order ref: {order.customer_reference}</Typography>
            </div>
            <br />
            <Button component={Link} to="/" variant='outlined' type="button">Back to Home</Button>
        </>

    ) : (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    )
    if (error) {
        Confirmation = () => (
            <>
                <Typography variant='h5'>เกิดข้อผิดพลาด: {error === "The given data was invalid." ? "สินค้ามีจำนวนจำกัด" : error }</Typography>
                <br />
                <Button component={Link} to="/" variant='outlined' type="button">Back to Home</Button>
                {errors.length !== 0 && (<SweetAlert2 {...swalProps} onConfirm={() => history.push('/')}/>)}
                
            </>
        )
    }
    const Form = () => activeStep === 0
        ? <AddressForm next={next} />
        : <PaymentForm shippingData={shippingData} nextStep={nextStep} backStep={backStep} />

    return (
        <>
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map(step => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : token && <Form />}
                </Paper>
            </main>
        </>
    )
}

export default Checkout
