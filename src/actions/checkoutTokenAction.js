import { CHECKOUT_TOKEN } from "../constants/checkoutTokenConstants"
import { commerce } from "../lib/commerce"

export const generateCheckoutToken = (cartId)=>async (dispatch ) => {
    const token = await commerce.checkout.generateToken(cartId,{type:'cart'})
    dispatch({type:CHECKOUT_TOKEN,payload:token})
}