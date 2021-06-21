import { CAPTURE_CHECKOUT_REQUEST,CAPTURE_CHECKOUT, ORDER_ERROR } from "../constants/checkoutConstants";

export const checkoutReducer = (state ={order:{},error:''},action) => {
    switch(action.type) {
        case CAPTURE_CHECKOUT_REQUEST:
            return {order:{},error:''}
        case CAPTURE_CHECKOUT:
            return {order:action.payload}
        case ORDER_ERROR:
            return {error:action.payload}
        default:
            return state
    }
}