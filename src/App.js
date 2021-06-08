import React, { useEffect, useState } from 'react'
// import Products from './components/Products/Products'
import {Products,Navbar,Cart,Checkout, Banner} from './components'

import { commerce } from './lib/commerce'
import {BrowserRouter as Router,Switch ,Route} from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { retrieveCart } from './actions/cartActions'

const App = () => {
    const dispatch = useDispatch();
    const cartRetrieve = useSelector(state => state.cartRetrieve);
    const {loading ,cart} = cartRetrieve
    const [products,setProducts] = useState([])
    const [cartState,setCart] = useState({})
    // setCart(cart)
    const [order,setOrder] = useState({})
    const [errorMessage,setErrorMessage] = useState('')
 
    const fetchProducts = async () =>{
        const {data} = await commerce.products.list();
        setProducts(data);
        console.log(data);
    }

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve())
    }

    const handleAddToCart = async (productId,quantity) => {
        const {cart} = await commerce.cart.add(productId,quantity);
        setCart(cart)
    }
    const handleUpdateCartQty = async (productId,quantity) => {
        const {cart} = await commerce.cart.update(productId,{quantity})
        setCart(cart)
    }
    const handleRemoveFromCart = async (productId)=>{
        const {cart} =await commerce.cart.remove(productId);
        setCart(cart)
    }
    const handleEmptyCart = async ()=>{
        const {cart} = await commerce.cart.empty()
        setCart(cart)
    }
    const refreshCart = async ()=>{
        const newCart = await commerce.cart.refresh()
        setCart(newCart)
    }
    const handleCaptureCheckout = async (checkoutTokenId,newOrder)=>{
        try{
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId,newOrder)
            setOrder(incomingOrder)
            refreshCart()
        }catch(e){
            setErrorMessage(e.data.error.message)
        }
    }

    useEffect(()=>{
        // refreshCart();
      
        // fetchProducts();
        // dispatch(retrieveCart())
        // fetchCart();
        // console.log("effect app")
        dispatch(retrieveCart())
        console.log("effect app retrieve")
    },[])
    console.log(cart);
    // console.log('test')
    // useEffect(()=>{
    //     console.log('app tests');
    //     if(products.length !== 0 && cart){
    //         // console.log(products)
    //         // console.log(cart)
    //         let exitsProducts=[]
    //         if(Object.entries(cart).length !== 0){
    //             // console.log("have")
    //             if(cart.line_items.length !== 0){
    //                 cart.line_items.map(lineItem =>{
    //                     let findProducts =products.find(product => product.id === lineItem.product_id)
    //                     exitsProducts=[...exitsProducts,findProducts]
    //                 })  
    //                 let checkProducts=exitsProducts.filter(exits => exits.inventory.available <= 0);
    //                 cart.line_items.map(item=>{
    //                     const find = checkProducts.find(check => check.id === item.product_id)
    //                     if(find){
    //                         handleRemoveFromCart(item.id)
    //                         // console.log("delete page app "+item.id)
    //                     }
    //                 })  
    //                 // console.log(cart)
    //             }
    //         }else{
    //             // console.log(cart)
    //             // console.log("not have")
    //         }
    //     }else{
    //         // console.log("isEmpty")
    //     }
    // },[cart,products])
    return (
        <Router>
            <div>
                <Navbar
                    // totalItems={cart.total_items}
                />
                <CssBaseline/>
                <Switch>
                    <Route exact path='/'>
                        <Banner/>
                        <Products
                            // fetchProducts={fetchProducts}
                            dispatchCart={dispatch} 
                            cart={cart} 
                            // products={products} 
                            onAddToCart={handleAddToCart}
                            handleRemoveFromCart={handleRemoveFromCart}
                            />
                    </Route>
                    <Route exact path='/cart'>
                        <Cart 
                            products={products}
                            fetchProducts={fetchProducts}
                            // test
                            cart={cart}
                            handleUpdateCartQty={handleUpdateCartQty}
                            handleRemoveFromCart={handleRemoveFromCart}
                            handleEmptyCart={handleEmptyCart}
                        />
                    </Route>
                    <Route exact path='/checkout'> 
                        <Checkout 
                            cart={cart}
                            order={order}
                            onCaptureCheckout={handleCaptureCheckout}
                            error={errorMessage}
                        />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App
