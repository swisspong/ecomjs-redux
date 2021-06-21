import { CHECKOUT_TOKEN_REQUEST, CHECKOUT_TOKEN_SUCCESS } from "../constants/checkoutTokenConstants";

export const checkoutTokenReducer =(state={token:null},action) =>{
    switch(action.type){
        case CHECKOUT_TOKEN_REQUEST:
            return {token:null}
        case CHECKOUT_TOKEN_SUCCESS:
            return {token:action.payload}
        default:
            return state
    }
}