import axios from "axios"
import { CAPTURE_CHECKOUT, CAPTURE_CHECKOUT_REQUEST, ORDER_ERROR } from "../constants/checkoutConstants"
import { commerce } from "../lib/commerce"
import { refreshCartRedux } from "./cartActions"
import { listPorductOther } from "./productActions"
import qs from 'qs';
export const captureCheckout = (checkoutTokenId,newOrder) => async (dispatch,getState) => {
    try{
        dispatch({type:CAPTURE_CHECKOUT_REQUEST})
        const incomingOrder = await commerce.checkout.capture(checkoutTokenId,newOrder)
    
        console.log(incomingOrder)
     
        dispatch({type:CAPTURE_CHECKOUT,payload:incomingOrder})
        console.log("refresh22")
        dispatch(refreshCartRedux())
    }catch(e){
        console.log(e)
        let id

        let productSoldOut =[]
        if(e.data.error.message === "The given data was invalid."){
            console.log(Object.keys(e.data.error.errors))
            const textE = Object.keys(e.data.error.errors)
            id = textE.map((text) => text.split('.')[1])
            const soldOut = Object.entries(id).map(([id,label])=>({id:label}))

            await dispatch(listPorductOther())
            const {products} = getState().productList
            const {cart} = getState().cartRetrieve
            soldOut.forEach(sold => {
                const inCart = cart.line_items.find(item => item.id === sold.id)
                console.log(inCart)
                if(inCart !== undefined){
                    const pro = products.filter(product => product.id === inCart.product_id)
                    productSoldOut=[...productSoldOut,...pro]
                }
            })
            console.log(productSoldOut)
            
        }
        dispatch({type:ORDER_ERROR,payload:e.data.error.message,more:id.lenght !== 0 ? productSoldOut:e.data.error})
        console.log(e.data)
    }
}

const updateOrder = (orderId,transacId) => async (dispatch,getState) => {
    try{

        const config={
            headers:{
                "Content-Type":"application/json",
                "X-Authorization":"sk_25499582a8b372793d1aac0eeaba196a8ec8f27124b17"
            }
        }
        const {data} = await axios.put(`https://api.chec.io/v1/orders/${orderId}/transactions/${transacId}`,
            {
                "status": "complete",
                "gateway_transaciton_id":""
            },
            config
        )
        return data
    }catch(e){
        console.log(e)
    }
}