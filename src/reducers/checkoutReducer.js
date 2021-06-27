import { CAPTURE_CHECKOUT_REQUEST,CAPTURE_CHECKOUT, ORDER_ERROR } from "../constants/checkoutConstants";

export const checkoutReducer = (state ={order:{},error:'',errors:[]},action) => {
    switch(action.type) {
        case CAPTURE_CHECKOUT_REQUEST:
            return {order:{},error:'',errors:[]}
        case CAPTURE_CHECKOUT:
            return {order:action.payload}
        case ORDER_ERROR:
            return {...state,error:action.payload,errors:action.more}
        default:
            return state
    }
}