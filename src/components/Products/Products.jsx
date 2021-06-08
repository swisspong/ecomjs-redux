import React, { useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core'
import Product from '../Product/Product'
import useStyles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../../actions/productActions'


const Products = ({ dispatchCart,cart, onAddToCart, handleRemoveFromCart }) => {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const { loading, products } = productList
    useEffect(() => {
        dispatch(listProducts())
        // fetchProducts()
        // console.log(products);
        // console.log('products')
        // if(products.length !== 0 && cart){
        //     console.log(products)
        //     console.log(cart)
        //     let exitsProducts=[]
        //     if(Object.entries(cart).length !== 0){
        //         console.log("have")
        //         if(cart.line_items.length !== 0){
        //             console.log("page product in cart")
        //             cart.line_items.map(lineItem =>{
        //                 let findProducts =products.find(product => product.id === lineItem.product_id)
        //                 exitsProducts=[...exitsProducts,findProducts]
        //             })  
        //             let checkProducts=exitsProducts.filter(exits => exits.inventory.available <= 0);
        //             console.log(exitsProducts)
        //             cart.line_items.map(item=>{
        //                 const find = checkProducts.find(check => check.id === item.product_id)
        //                 console.log(find)
        //                 if(find){
        //                     handleRemoveFromCart(item.id)
        //                     console.log("delete page app "+item.id)
        //                 }
        //             })  
        //             // console.log(cart)
        //         }
        //     }else{
        //         console.log(cart)
        //         console.log("not have")
        //     }
        // }else{
        //     console.log("isEmpty")
        // }
    }, [])
    const checkProducts = products.filter(product => product.inventory.available > 0)
    const findCartData = (productId) => {
        if (cart.line_items) {

            return cart.line_items.find(item => item.product_id === productId)
        }
    }
    const classes = useStyles();
    if (loading) return (
        <main className={classes.content} id="products">
            <div className={classes.toolbar} />
            <Typography variant="h3" className={classes.title}>
                Loading...
        </Typography>
        </main>
    )
    return (
        <main className={classes.content} id="products">
            <div className={classes.toolbar} />
            <Typography variant="h3" className={classes.title}>
                สินค้าของเรา
            </Typography>
            <div className={classes.toolbar} />
            <Grid container justify="center" spacing={4}>
                {checkProducts.map(product => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product
                            dispatchCart={dispatchCart}
                            quantity={findCartData(product.id)}
                            product={product}
                            onAddToCart={onAddToCart} />
                    </Grid>
                ))}
            </Grid>
        </main>
    )
}

export default Products