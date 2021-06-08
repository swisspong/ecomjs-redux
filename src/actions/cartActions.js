import { CART_ADD_REQUEST, CART_ADD_SUCCESS, CART_REMOVE, CART_RETRIEVE_REQUEST, CART_RETRIEVE_SUCCESS, CART_UPDATE } from "../constants/cartConstants";
import { commerce } from "../lib/commerce";

export const retrieveCart = () => async (dispatch)=>{
    try{
        dispatch({type:CART_RETRIEVE_REQUEST})
        const data = await commerce.cart.retrieve();
        dispatch({type:CART_RETRIEVE_SUCCESS,payload:data})
    }catch(e){

    }
}
export const addToCart = (productId,quantity) => async (dispatch) => {
    dispatch({type:CART_ADD_REQUEST})
    const {cart} = await commerce.cart.add(productId,quantity);
    console.log(cart);
    dispatch({type:CART_ADD_SUCCESS,payload:cart})
}
export const removeItem = (productId) => async (dispatch) => {
    const {cart} = await commerce.cart.remove(productId);
    dispatch({type:CART_REMOVE,payload:cart})
}
export const updateItem = (productId, quantity) => async (dispatch) => {
    const {cart} = await commerce.cart.update(productId,{quantity})
    dispatch({type:CART_UPDATE,payload:cart})
}