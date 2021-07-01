import { Button, Divider, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import Review from './Review'
import { loadStripe } from '@stripe/stripe-js'
import { CardElement, Elements, ElementsConsumer } from '@stripe/react-stripe-js'
import { useDispatch, useSelector } from 'react-redux'
import { captureCheckout } from '../../actions/checkoutActions'
import Script from 'react-load-script'
import axios from 'axios'
import qs from 'qs';
import { commerce } from '../../lib/commerce'
import { TOKEN_REQUEST } from '../../constants/checkoutConstants'

// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)


const PaymentForm = ({ shippingData, backStep, nextStep }) => {
    const checkoutTokenCart = useSelector(state => state.checkoutTokenCart)
    const { token } = checkoutTokenCart
    const cartRetrieve = useSelector(state => state.cartRetrieve)
    const { cart } = cartRetrieve
    const checkout = useSelector(state => state.checkout)
    const { order } = checkout

    console.log(shippingData);
    console.log(token)
    const dispatch = useDispatch()

    let OmiseCard


    const handleLoadScript = () => {
        OmiseCard = window.OmiseCard
        console.log(OmiseCard)
        OmiseCard.configure({
            publicKey: 'pkey_test_5ockeldmlq6ody9lnxj',
            currency: "THB",
            frameLabel: 'Pontina Shop',
            submitLabel: 'PAY NOW',
            buttonLabel: 'Pay with Omise'
        })
    }
    const creditCardConfigure = () => {
        OmiseCard = window.OmiseCard
        OmiseCard.configure({
            defaultPaymentMethod: "credit_card",
            otherPaymentMethods: []
        })
        OmiseCard.configureButton('#checkout-button');
        OmiseCard.attach()
    }
    const omiseHandler = async () => {
        OmiseCard = window.OmiseCard
        OmiseCard.open({
            amount: token.live.subtotal.raw * 100,
            frameDescription: 'invoice #3847',
            onCreateTokenSuccess: (tokenOmise) => {
                console.log(tokenOmise)
                const orderData = {
                    line_items: token.live.line_items,
                    extra_fields: {
                        extr_Kvg9l6AYq51bB7: shippingData.tel
                    },
                    customer: { firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email },
                    shipping: {
                        name: shippingData.firstName,
                        street: shippingData.address1,
                        town_city: "--",
                        county_state: `TH-${shippingData.subdivisionId}`,
                        postal_zip_code: shippingData.zip,
                        country: shippingData.country
                    },
                    fulfillment: { shipping_method: shippingData.optionId },
                    payment: {
                        gateway: 'manual',
                        manual: {
                            id: 'gway_M5QZ1v91rjvalZ'
                        }
                    }
                }
                dispatch({ type: TOKEN_REQUEST, payload: tokenOmise })
                dispatch(captureCheckout(token.id, orderData));
                cardCharge(tokenOmise).then((data) => {
                    console.log(data)
                    // updateOrder(order.id,order.transactions[0].id)
                })
            }
        })
    }
    const cardCharge = async (tokenOmise) => {
        const sk = Buffer.from(`${'skey_test_5ockeldmu1qjsbpkwk3' + ":" + ''}`, 'utf8').toString('base64')
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Basic ${sk}`
                },
            }
            const data = await axios.post(
                '/charges',
                qs.stringify({
                    amount: token.live.subtotal.raw * 100,
                    currency: 'THB',
                    card: tokenOmise
                }),
                config,
            )
            return data
            // dispatch()
        } catch (e) {
            console.log(e.message)
        }
    }
    const updateOrder = async (orderId, transacId) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "X-Authorization": "sk_25499582a8b372793d1aac0eeaba196a8ec8f27124b17"
                }
            }
            const { data } = await axios.put(`https://api.chec.io/v1/orders/${orderId}/transactions/${transacId}`,
                {
                    "status": "complete",
                    "gateway_transaciton_id": ""
                },
                config
            )
            // return data
            nextStep()
        } catch (e) {
            console.log(e)
        }
    }
    // const handleClick = e => {
    //     e.preventDefault()
    //     creditCardConfigure()
    //     omiseHandler()
    // }


    useEffect(() => {
        if (order && order.id && order.transactions) {
            updateOrder(order.id, order.transactions[0].id)
        }
    }, [order, dispatch])
    const handleSubmit = async (event) => {
        event.preventDefault();


        console.log(token.live.line_items)
        creditCardConfigure()
        omiseHandler()
        // dispatch(captureCheckout(token.id,orderData));
        // nextStep()

    }

    return (
        <>
            <Review checkoutToken={token} />
            <Script
                url="https://cdn.omise.co/omise.js"
                onLoad={() => handleLoadScript()}
            />
            <Divider />
            <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>Payment method</Typography>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="outlined" onClick={backStep}>Back</Button>
                <form>
                    <Button id="checkout-button" type="button" variant="contained" disabled={false} onClick={(e) => handleSubmit(e)} color="primary">
                        Pay {token.live.subtotal.formatted_with_symbol}
                    </Button>
                </form>
            </div>
        </>
    )
}

export default PaymentForm
