import { CHECKOUT_TOKEN } from "../constants/checkoutTokenConstants";

export const checkoutReducer =(state={checkoutToken:null},action) =>{
    switch(action.type){
        case CHECKOUT_TOKEN:
            return {checkoutToken:action.payload}
        default:
            return state
    }
}