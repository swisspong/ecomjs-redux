import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstants"
import { commerce } from "../lib/commerce";
// import { commerce } from './lib/commerce'
export const listProducts = () => async (dispatch ) => {
    try {
        dispatch({type:PRODUCT_LIST_REQUEST})
        const {data} = await commerce.products.list();
        dispatch({type:PRODUCT_LIST_SUCCESS,payload:data})

    } catch (error) {
        
    }
}