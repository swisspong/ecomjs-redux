import { CAPTURE_CHECKOUT, CAPTURE_CHECKOUT_REQUEST, ORDER_ERROR } from "../constants/checkoutConstants"
import { commerce } from "../lib/commerce"
import { refreshCartRedux } from "./cartActions"

export const captureCheckout = (checkoutTokenId,newOrder) => async (dispatch) => {
    try{
        dispatch({type:CAPTURE_CHECKOUT_REQUEST})
        const incomingOrder = await commerce.checkout.capture(checkoutTokenId,newOrder)
        dispatch({type:CAPTURE_CHECKOUT,payload:incomingOrder})
        dispatch(refreshCartRedux())
    }catch(e){
        dispatch({type:ORDER_ERROR,payload:e.data.error.message})
    }
}