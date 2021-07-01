import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@material-ui/core'
import Product from '../Product/Product'
import useStyles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import { listProducts } from '../../actions/productActions'
import LoadingProduct from '../loadingProduct/LoadingProduct'
import Script from 'react-load-script'
import axios from 'axios'
import qs from 'qs';
import { refreshCartRedux } from '../../actions/cartActions'

// const omise = require('../../../node_modules/omise/index.js')({
//     'publicKey':'pkey_test_5obqhbx1cdiouwg1eqz',
//     'secretKey':'skey_test_5obqhbx1asdpjxlp98d'

// })

// console.log(omise)
// const createCard = async (token) => {
//     const customer = await omise.customers.create({
//         email: 'john.doe@example.com',
//         description:'John Doe (id:30)',
//         token:token,
//     })
//     const charge = await omise.charges.create({
//         amount:10000,
//         currency:'THB',
//         customer: customer.id
//     })

//     console.log('Charge -->',charge)
// }

const Products = () => {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const { loading, products } = productList
    let OmiseCard
    const handleLoadScript = () => {
        OmiseCard = window.OmiseCard
        console.log(OmiseCard)
        OmiseCard.configure({
            publicKey: 'pkey_test_5oc74zlgju54ed9huzv',
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
    const omiseHandler = () => {
        OmiseCard = window.OmiseCard
        OmiseCard.open({
            amount:100000,
            frameDescription: 'invoice #3847',
            onCreateTokenSuccess: (token) => {
                console.log(token)
                // createCard(token)
                cardCharge(token)
            }
        })
    }
    const cardCharge = async (token) => {
        const sk = Buffer.from(`${'skey_test_5oc74zlgtte397g5irt'+":"+''}`, 'utf8').toString('base64')
        try{
            const config ={
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization:`Basic ${sk}`
                },   
            }
            const data = await axios.post(
                '/charges',
                qs.stringify({
                    amount:100000,
                    currency: 'THB',
                    card:token
                }),
                config,
            )
            console.log(data)
        }catch(e){
            console.log(e.message)
        }

    }
    const handleClick = e => {
        e.preventDefault()
        creditCardConfigure()
        omiseHandler()
    }
    useEffect(() => {
        dispatch(listProducts())
        dispatch(refreshCartRedux())
    }, [dispatch])
    const classes = useStyles();
    return (
        <main className={classes.content} id="products">
            <Script
                url="https://cdn.omise.co/omise.js"
                onLoad={() => handleLoadScript()}
            />
            <div className={classes.toolbar} />
            <Typography variant="h3" className={classes.title}>
                สินค้าของเรา
            </Typography>
            <div className={classes.toolbar} />
            <Grid container justify="center" spacing={4}>
                {!loading ? products.map(product => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} />
                    </Grid>
                )) : (
                    Array.from(new Array(3)).map((index) => (
                        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                            <LoadingProduct />
                        </Grid>
                    ))
                )}
            </Grid>
            <div>
                <form>
                    <button type="button" id='checkout-button' onClick={(e) => handleClick(e)}>Pay with Credit Card</button>
                </form>
            </div>
        </main>
    )
}

export default Products