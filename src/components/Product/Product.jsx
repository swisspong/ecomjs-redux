
import { Card, CardActions, CardContent, CardMedia, CircularProgress, IconButton, Typography } from '@material-ui/core'
import { AddShoppingCart } from '@material-ui/icons'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, refreshCartRedux, removeItem } from '../../actions/cartActions'

import useStyles from './styles'


const Product = ({product}) => {
    const dispatch=useDispatch()
    const classes = useStyles();
    const cartRetrieve = useSelector(state => state.cartRetrieve);
    const {loadingAdd,productIdLoading,cart} = cartRetrieve
    const handleAddToCart = (productId)=>{
        const inCart = cart.line_items.find(item => productId === item.product_id)
        if(inCart){
            if(product.inventory.available > inCart.quantity){
                dispatch(addToCart(productId,1))
            }
        }else{
            dispatch(addToCart(productId,1))
        }
    }
    useEffect(()=>{
        if(product.is.sold_out) {
            if(cart.line_items){
                const found = cart.line_items.find(item => item.product_id === product.id)
                if(found) {
                    // dispatch(refreshCartRedux())
                    // dispatch(removeItem(found.id))
                    
                }
            }
        }
        // console.log("productsss")
    },[dispatch,cart.line_items,product.id,product.is.sold_out])
  
    return (
        
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={product.media.source} title={product.name}/>
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant="h5" gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant="h5">
                        {product.price.formatted_with_symbol}
                    </Typography>
                </div>
                <Typography dangerouslySetInnerHTML={{ __html: product.description}} variant="body2" color="textSecondary"/>
            </CardContent>
                <CardActions className={classes.cardActions}>
                {product.is.sold_out ? (
                    <Typography variant="h6" color="error">สินค้าหมด</Typography>
                ):(
                    <Typography variant="body2">{`จำนวนคงเหลือ ${product.inventory.available}`}</Typography>
                )}
            <div className={classes.wrapper}>
                    <IconButton aria-label="Add to Cart" disabled={product.is.sold_out} onClick={() => handleAddToCart(product.id)}>
                        <AddShoppingCart />
                    </IconButton>
                {loadingAdd && product.id === productIdLoading  && <CircularProgress size={40} color='secondary' className={classes.fabProgress} />}
            </div>
                </CardActions>
        </Card>
    )
}

export default Product
