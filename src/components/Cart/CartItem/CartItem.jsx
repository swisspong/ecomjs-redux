import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeItem, updateItem } from '../../../actions/cartActions'
import useStyles from './styles'
const CartItem = ({item}) => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const cartRetrieve = useSelector(state => state.cartRetrieve);
    const {cart} = cartRetrieve;
    const productList = useSelector(state => state.productList)
    const {products} = productList
    // console.log(item.id)
    const handleUpdateCartQty = (lineItemId,newQuantity,qty) => {
        const product = products.find(p => p.id === item.product_id)
        if(qty < product.inventory.available) {
            dispatch(updateItem(lineItemId,newQuantity))
        }
    }
    return (
        <Card className="cart-item" >
            <CardMedia image={item.media.source} alt={item.name} className={classes.media} />
            <CardContent className={classes.cardContent}>
                <Typography variant="h5">{item.name}</Typography>
                <Typography variant="h5">{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <div className={classes.buttons}>
                    <Button type="button" size="small" onClick={() => {
                        // dispatch(updateItem(item.id,item.quantity - 1))
                        handleUpdateCartQty(item.id,item.quantity - 1,item.quantity)
                    }}>-</Button>
                    <Typography>&nbsp;{item.quantity}&nbsp;</Typography>
                    <Button type="button" size="small" onClick={() => {
                        // dispatch(updateItem(item.id,item.quantity + 1))
                        handleUpdateCartQty(item.id,item.quantity + 1,item.quantity)
                    }}>+</Button>
                </div>
                <Button variant="contained" type="button" color="secondary" onClick={() =>{ 
                    dispatch(removeItem(item.id))
                }}>ลบ</Button>
            </CardActions>
        </Card>
    );
}

export default CartItem
