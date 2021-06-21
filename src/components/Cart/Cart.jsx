import { Button, Container, Grid, Typography } from '@material-ui/core'
import React from 'react'
import CartItem from './CartItem/CartItem';
import useStyles from './styles'
import {Link} from 'react-router-dom'
import {emptyCartRedux} from '../../actions/cartActions'
import { useDispatch, useSelector} from 'react-redux';
const Cart = () => {

    const dispatch = useDispatch();
    const classes = useStyles();
    const cartRetrieve = useSelector(state => state.cartRetrieve);
    const {cart} = cartRetrieve
    const EmptyCart = () =>(
        <Typography variant="subtitle1">ไม่มีสินค้าในตระกร้าของคุณ, 
            <Link to="/" className={classes.link}>เลือกซื้อสินค้า</Link>
        </Typography>
    )
    const FilledCart = () =>(
        <>
            <Grid container spacing={3}>
                {cart.line_items.map(item =>(
                    <Grid item  xs={12} sm={4} key={item.id}>
                        <CartItem item={item} />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">
                    ยอดรวม: {cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={()=>dispatch(emptyCartRedux())}>ลบตระกร้าสินค้า</Button>
                    <Button component={Link} to='/checkout' className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">ตรวจสอบ</Button>
                </div>
            </div>
            <div className={classes.toolbar}/> 
        </>
    )
    if(!cart.line_items) return 'Loading...'
    return (
        <Container>
            <div className={classes.toolbar}/>
            <Typography className={classes.title} variant="h3" gutterBottom>
                ตระกร้าของสินค้าคุณ
            </Typography>
            {!cart.line_items.length ? <EmptyCart />:<FilledCart />}
        </Container>
    )
}

export default Cart
