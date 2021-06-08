import { Button, Divider, Typography } from '@material-ui/core'
import React from 'react'
import Review from './Review'
import {loadStripe} from '@stripe/stripe-js'
import {commerce} from '../../lib/commerce'
import { CardElement, Elements, ElementsConsumer } from '@stripe/react-stripe-js'
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

const PaymentForm = ({checkoutToken,shippingData,backStep,onCaptureCheckout,nextStep}) => {
    console.log(shippingData);
    console.log(checkoutToken.live.line_items)
    const handleSubmit = async (event,elements,stripe)=>{
        event.preventDefault();
        const {data} = await commerce.products.list()
        console.log(data)
        
        
        if(!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);
        
        const {error ,paymentMethod} = await stripe.createPaymentMethod({type:'card',card:cardElement})
        if(error){
            console.log(error);
        }else{
            const orderData={
                line_items:checkoutToken.live.line_itmes,
                extra_fields:{
                    extr_Kvg9l6AYq51bB7:shippingData.tel
                },
                customer:{firstname:shippingData.firstName,lastname:shippingData.lastName,email:shippingData.email},
                shipping:{
                    name: shippingData.firstName,
                    street:shippingData.address1,
                    town_city:"--",
                    county_state:`TH-${shippingData.shippingSubdivision}`,
                    postal_zip_code:shippingData.zip,
                    country:shippingData.shippingCountry    
                },
                fulfillment:{shipping_method:shippingData.shippingOption},
                payment:{
                    gateway:'stripe',
                    stripe:{
                        payment_method_id:paymentMethod.id
                    }
                }
            }
            console.log(orderData);
            onCaptureCheckout(checkoutToken.id,orderData)
            nextStep()
        }
    }
    console.log(checkoutToken.live.line_items)

    return (
        <>
            <Review checkoutToken={checkoutToken}/>
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
                                    Pay {checkoutToken.live.subtotal.formatted_with_symbol}
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
