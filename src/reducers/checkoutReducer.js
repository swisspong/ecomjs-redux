import { CAPTURE_CHECKOUT_REQUEST,CAPTURE_CHECKOUT, ORDER_ERROR, TOKEN_REQUEST,PAYEMENT_REQUEST,PAYEMENT_SUCCESS } from "../constants/checkoutConstants";

export const checkoutReducer = (state ={order:{},error:'',errors:[],tokenOmise:null,payment:{success:false}},action) => {
    switch(action.type) {
        case CAPTURE_CHECKOUT_REQUEST:
            return {order:{},error:'',errors:[]}
        case CAPTURE_CHECKOUT:
            return {...state,order:action.payload}
        case ORDER_ERROR:
            return {...state,error:action.payload,errors:action.more}
        case TOKEN_REQUEST:
            return {...state,tokenOmise:action.payload}
        case PAYEMENT_REQUEST:
            return {...state,payment:{success:false}}
        case PAYEMENT_SUCCESS:
            return {...state,payment:{success:true}}
        default:
            return state
    }
}