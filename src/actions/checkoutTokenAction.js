import { CHECKOUT_TOKEN_REQUEST, CHECKOUT_TOKEN_SUCCESS } from "../constants/checkoutTokenConstants"
import { commerce } from "../lib/commerce"

export const generateCheckoutToken = (cartId)=>async (dispatch ) => {
    dispatch({type: CHECKOUT_TOKEN_REQUEST})
    const token = await commerce.checkout.generateToken(cartId,{type:'cart'})
    dispatch({type:CHECKOUT_TOKEN_SUCCESS,payload:token})
}