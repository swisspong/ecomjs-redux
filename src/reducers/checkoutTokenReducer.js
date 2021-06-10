import { CHECKOUT_TOKEN } from "../constants/checkoutTokenConstants";

export const checkoutTokenReducer =(state={token:null},action) =>{
    switch(action.type){
        case CHECKOUT_TOKEN:
            return {token:action.payload}
        default:
            return state
    }
}