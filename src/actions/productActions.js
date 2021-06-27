
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstants"
import { commerce } from "../lib/commerce";
import { addToCart, refreshCartRedux } from "./cartActions";

export const listProducts = () => async (dispatch,getState) => {
    try {
        dispatch({type:PRODUCT_LIST_REQUEST})
        const {data} = await commerce.products.list();
        dispatch({type:PRODUCT_LIST_SUCCESS,payload:data})
        const prodSoldOut = data.filter(prod => prod.is.sold_out === true)
        
        const {cart }= getState().cartRetrieve
        if(prodSoldOut.length !== 0) {
            console.log(prodSoldOut)
            console.log(cart.line_items)
            if(cart.line_items.length !== 0){
                const productNotSoldOut = data.filter(product => product.is.sold_out !== true)
                console.log(productNotSoldOut)
                if(productNotSoldOut){
                    const soldOutInCart = prodSoldOut.map(product =>{ return cart.line_items.find(item => item.product_id === product.id)})
                    console.log(soldOutInCart)
                    const result = soldOutInCart.some((item) => { return item === undefined})
                    console.log(!result)
                    if(!result){
                        console.log('incart')
                        let arr =[]
                        productNotSoldOut.forEach(product =>{
                            const found = cart.line_items.filter(item => item.product_id === product.id)
                            console.log(found)
                            if(found){
                                console.log('test')
                                arr = [...arr,...found]
                                console.log(arr)
                            } 
                        })
                        await dispatch(refreshCartRedux())
                        arr.map(prod => dispatch(addToCart(prod.product_id,prod.quantity)))
                    }else{
                        console.log('isundi')
                    }

                }else{
                    console.log('not have')
                    await dispatch(refreshCartRedux())
                }
            }else{
                console.log("product not")
            }
        }else{
            const {errors} = getState().checkout
            if(errors.length !== 0){
                console.log('fdfsd')
                await dispatch(refreshCartRedux())
                // cart.line_items.forEach(item => {
                //     const foundProd = data.find(prod => prod.id === item.product_id)
                //     const foundProdtest = data.find(prod => prod.id === item.product_id)
                //     if (item.quantity > foundProd.inventory.available) {
                //         dispatch(addToCart(foundProd.id, foundProd.inventory.available))
                //     } else {
                //         dispatch(addToCart(foundProdtest.id, item.quantity))
                //     }
                // })
            }
            // console.log('ttet')
            // console.log("productSold")
            // await dispatch(refreshCartRedux())
            // if(cart.line_items.length !== 0){
            //     let arr = []
            //     let notThan =[]
            //     cart.line_items.forEach(item => {
            //         const foundProd = data.find(prod => prod.id === item.product_id)
            //         const foundProdtest = data.find(prod => prod.id === item.product_id)
            //         if(item.quantity > foundProd.inventory.available){
            //             // arr = [...arr,{id:foundProd.id,quantity:foundProd.inventory.available}]
            //             dispatch(addToCart(foundProd.id,foundProd.inventory.available))
            //         }else{
            //             // notThan =[...notThan,{id:foundProdtest.id,quantity:item.quantity}]
            //             dispatch(addToCart(foundProdtest.id,item.quantity))
            //         }
            //         // arr.forEach(prod => {
            //         //     console.log(prod)
                         
            //         // })
            //         // foundProd.forEach(prod =>{
            //         //     if(item.quantity > prod.inventory.available){
            //         //         arr = [...arr,...foundProd]
            //         //     }else{
            //         //         notThan =[...notThan,{id:foundProdtest.id,quantity:item.quantity}]
            //         //     }
            //         // })
            //     })
            // //    console.log(arr)
            // //     console.log(notThan)
            // //     if(arr.length !== 0) {
            // //         await dispatch(refreshCartRedux())
            // //         arr.forEach(prod => {
            // //             console.log(prod)
            // //              dispatch(addToCart(prod.id,prod.quantity))
            // //         }) 
            // //         notThan.forEach(item =>{
            // //             console.log(item)
            // //              dispatch(addToCart(item.id,item.quantity))
            // //         })
            // //     }
            // }

        }

    } catch (error) {
        
    }
}

export const listPorductOther = () => async (dispatch) => {
    dispatch({type:PRODUCT_LIST_REQUEST})
    const {data} = await commerce.products.list();
    dispatch({type:PRODUCT_LIST_SUCCESS,payload:data})
}