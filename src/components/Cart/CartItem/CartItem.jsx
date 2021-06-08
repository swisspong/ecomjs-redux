import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { removeItem, updateItem } from '../../../actions/cartActions'
import useStyles from './styles'
const CartItem = ({inventory,item,onUpdateCartQty,onRemoveFromCart}) => {
    const dispatch = useDispatch()
    
    const classes = useStyles()
    const handleUpdateCartQty = (lineItemId, newQuantity,max,qty) => {
        if(qty < max){
            onUpdateCartQty(lineItemId, newQuantity)
        }
    };
    // const handleUpdateCartQty = (lineItemId, newQuantity) => onUpdateCartQty(lineItemId, newQuantity);
    const handleRemoveFromCart = (lineItemId) => onRemoveFromCart(lineItemId);
    useEffect(() => {

        if(inventory){
            if(item.quantity > inventory.inventory.available) {
                handleRemoveFromCart(item.id)
            }
        }else{
            console.log("dosn't not exits");
        }
        console.log("cartItem effect")
    },[])
    return (
        
        <Card className="cart-item">
            {/* {console.log("tttttt")} */}
            <CardMedia image={item.media.source} alt={item.name} className={classes.media} />
            <CardContent className={classes.cardContent}>
                <Typography variant="h4">{item.name}</Typography>
                <Typography variant="h5">{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <div className={classes.buttons}>
                    <Button type="button" size="small" onClick={() => {
                        // if(inventory){
                        //     console.log("exits");
                        //     handleUpdateCartQty(item.id, item.quantity - 1,inventory.inventory.available + 1,item.quantity)
                        // }else{
                        //     console.log("dosn't not exits");
                        // }
                        // handleUpdateCartQty(item.id, item.quantity - 1)
                        dispatch(updateItem(item.id,item.quantity - 1))

                    }}>-</Button>
                    <Typography>&nbsp;{item.quantity}&nbsp;</Typography>
                    <Button type="button" size="small" onClick={() => {
                        // if(inventory){
                        //     console.log("exits");
                        //     handleUpdateCartQty(item.id, item.quantity + 1,inventory.inventory.available,item.quantity)
                        // }else{
                        //     console.log("dosn't not exits");
                        // }
                        // handleUpdateCartQty(item.id, item.quantity + 1)
                        dispatch(updateItem(item.id,item.quantity + 1))
                    }}>+</Button>
                </div>
                <Button variant="contained" type="button" color="secondary" onClick={() =>{ 
                    // handleRemoveFromCart(item.id)
                    dispatch(removeItem(item.id))
                }}>ลบ</Button>
            </CardActions>
        </Card>
        
    );
}

export default CartItem
