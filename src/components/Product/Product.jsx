
import { Card, CardActions, CardContent, CardMedia, CircularProgress, IconButton, Typography } from '@material-ui/core'
import { AddShoppingCart } from '@material-ui/icons'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../actions/cartActions'

import useStyles from './styles'


const Product = ({product}) => {
    const dispatch=useDispatch()
    const classes = useStyles();
    const cartRetrieve = useSelector(state => state.cartRetrieve);
    const {loadingAdd,productIdLoading} = cartRetrieve
    const handleAddToCart = (productId)=>{
        dispatch(addToCart(productId,1))
    }
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
            <div className={classes.wrapper}>
                    <IconButton aria-label="Add to Cart" onClick={() => handleAddToCart(product.id)}>
                        <AddShoppingCart />
                    </IconButton>
                {loadingAdd && product.id === productIdLoading  && <CircularProgress size={40} color='secondary' className={classes.fabProgress} />}
            </div>
                </CardActions>
        </Card>
    )
}

export default Product
