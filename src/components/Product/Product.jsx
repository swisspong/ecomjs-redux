
import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@material-ui/core'
import { AddShoppingCart } from '@material-ui/icons'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../actions/cartActions'

import useStyles from './styles'


const Product = ({
    dispatchCart,
    quantity,product,onAddToCart}) => {
    const dispatch=useDispatch()
    const classes = useStyles();
    const handleAddToCart = (productId)=>{
        // if(quantity){
        //     if(product.inventory.available > quantity.quantity){
        //         dispatch(addToCart(productId,1))
        //     }else{
        //         console.log(quantity.quantity)
        //         console.log("full")
        //     }
        // }else{
        //     dispatch(addToCart(productId,1))
        // }
        dispatch(addToCart(productId,1))
    }
    return (
        <Card className={classes.root}>
            {console.log(product.inventory.available)}
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
            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton aria-label="Add to Cart" onClick={() => handleAddToCart(product.id)}>
                    <AddShoppingCart />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default Product
