import {CART_ADD_REQUEST, CART_ADD_SUCCESS, CART_REMOVE, CART_RETRIEVE_REQUEST, CART_RETRIEVE_SUCCESS, CART_UPDATE} from '../constants/cartConstants'
export const cartRetrieveReducer = (state = {cart:{}},action) => {
    switch (action.type){
        case CART_RETRIEVE_REQUEST:
            return {loading:true,cart:{}};
        case CART_RETRIEVE_SUCCESS:
            return {loading:false,cart:action.payload};
        case CART_ADD_REQUEST:
            return {
                loading:true , 
                cart:{}
            }
        case CART_ADD_SUCCESS:
            return {
                loading:false,
                cart:action.payload}
        case CART_REMOVE:
            return {loading:false,cart:action.payload}
        case CART_UPDATE:
            return {loading:false,cart:action.payload}
        default:
            return state
    }
}

// export const cartAddReducer = (state = {cart})