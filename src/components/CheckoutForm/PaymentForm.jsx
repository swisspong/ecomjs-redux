import { Button, Divider, Typography } from '@material-ui/core'
import React from 'react'
import Review from './Review'
import {loadStripe} from '@stripe/stripe-js'
import { CardElement, Elements, ElementsConsumer } from '@stripe/react-stripe-js'
import { useDispatch, useSelector } from 'react-redux'
import { captureCheckout } from '../../actions/checkoutActions'
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

const PaymentForm = ({shippingData,backStep,nextStep}) => {
    const checkoutTokenCart = useSelector(state => state.checkoutTokenCart)
    const {token} = checkoutTokenCart

    console.log(shippingData);
    const dispatch = useDispatch()

    const handleSubmit = async (event,elements,stripe)=>{
        event.preventDefault();
        
        if(!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);
        
        const {error ,paymentMethod} = await stripe.createPaymentMethod({type:'card',card:cardElement})
        if(error){
            console.log(error);
        }else{
            const orderData={
                line_items:token.live.line_items,
                extra_fields:{
                    extr_Kvg9l6AYq51bB7:shippingData.tel
                },
                customer:{firstname:shippingData.firstName,lastname:shippingData.lastName,email:shippingData.email},
                shipping:{
                    name: shippingData.firstName,
                    street:shippingData.address1,
                    town_city:"--",
                    county_state:`TH-${shippingData.subdivisionId}`,
                    postal_zip_code:shippingData.zip,
                    country:shippingData.country    
                },
                fulfillment:{shipping_method:shippingData.optionId},
                payment:{
                    gateway:'stripe',
                    stripe:{
                        payment_method_id:paymentMethod.id
                    }
                }
            }
            console.log(orderData);
            dispatch(captureCheckout(token.id,orderData));
            nextStep()
        }
    }

    return (
        <>
            <Review checkoutToken={token}/>
            <Divider/>
            <Typography variant="h6" gutterBottom style={{margin:'20px 0'}}>Payment method</Typography>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {({elements,stripe}) =>(
                        <form onSubmit={(e)=> handleSubmit(e,elements,stripe)}>
                            <CardElement/>
                            <br/><br/>
                            <div style={{display: 'flex',justifyContent: 'space-between'}}>
                                <Button variant="outlined" onClick={backStep}>Back</Button>
                                <Button type="submit" variant="contained" disabled={!stripe} color="primary">
                                    Pay {token.live.subtotal.formatted_with_symbol}
                                </Button>
                            </div>
                        </form>
                    )}
                </ElementsConsumer>
            </Elements>
        </>
    )
}

export default PaymentForm
