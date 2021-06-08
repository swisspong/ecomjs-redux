import { Button, Container, Grid, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import CartItem from './CartItem/CartItem';
import useStyles from './styles'
import {Link} from 'react-router-dom'
import { commerce } from '../../lib/commerce'
import {retrieveCart} from '../../actions/cartActions'
import { useDispatch, useSelector } from 'react-redux';
const Cart = ({
    cart,
    handleUpdateCartQty,handleRemoveFromCart,handleEmptyCart,products,fetchProducts}) => {

    // const dispatch = useDispatch();
    // const cartRetrieve = useSelector(state => state.cartRetrieve);
    // const {loading ,cart} = cartRetrieve;
    console.log(cart)
    // const [products,setProducts] = useState([])
    const [check,setCheck] = useState(false);
    const classes = useStyles();
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
                        <CartItem 
                            inventory={findInventory(item.product_id)} 
                            item={item} 
                            onUpdateCartQty={handleUpdateCartQty} 
                            onRemoveFromCart={handleRemoveFromCart}
                        />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">
                    ยอดรวม: {cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>ลบตระกร้าสินค้า</Button>
                    <Button component={Link} to='/checkout' className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary" onClick={setCheck(true)}>ตรวจสอบ</Button>
                </div>
            </div>
            <div className={classes.toolbar}/> 
        </>
    )
    const findInventory = (productId) =>{
        return products.find(product => product.id === productId)
    }
    // const fetchCheckStocks = async () =>{
    //     const {data} = await commerce.products.list();
    //     const c = await commerce.cart.retrieve()
    //     setProducts(data)
    //     let exitsProducts=[]
    //     c.line_items.forEach(lineItem =>{
    //         let findProducts =data.find(product => product.id === lineItem.product_id)
    //         exitsProducts=[...exitsProducts,findProducts]
    //     })  
    //     let checkProducts=exitsProducts.filter(exits => exits.inventory.available <= 0);
    //     c.line_items.map(item=>{
    //         const find = checkProducts.find(check => check.id === item.product_id)
    //         if(find){
    //             handleRemoveFromCart(item.id)
    //         }
    //     })  
    // }

    // finish real time
    // const fetchProducts = async () =>{
    //     const {data} = await commerce.products.list();
    //     return data
    // }
    // finish real time
    // useEffect(() => {
    //     fetchProducts().then((data) =>{
    //         setProducts(data)
    //     })
    //     .then(()=>console.log(products))
    //     console.log("check");
    // },[products])
    useEffect(() => {
        fetchProducts()
        // dispatch(retrieveCart())
       
    },[])
    // if(products.length !== 0){
    //     console.log(products)
    //     console.log(cart)
    //     let exitsProducts=[]
    //     cart.line_items.forEach(lineItem =>{
    //         let findProducts =products.find(product => product.id === lineItem.product_id)
    //         exitsProducts=[...exitsProducts,findProducts]
    //     })  
    //     let checkProducts=exitsProducts.filter(exits => exits.inventory.available <= 0);
    //     cart.line_items.map(item=>{
    //         const find = checkProducts.find(check => check.id === item.product_id)
    //         if(find){
    //             handleRemoveFromCart(item.id)
    //         }
    //     })  
    // }else{
    //     console.log("isEmpty")
    // }
    if(products.length !== 0 && cart){
        console.log(products)
        console.log(cart)
        let exitsProducts=[]
        if(Object.entries(cart).length !== 0){
            console.log("have")
            if(cart.line_items.length !== 0){
                cart.line_items.map(lineItem =>{
                    let findProducts =products.find(product => product.id === lineItem.product_id)
                    exitsProducts=[...exitsProducts,findProducts]
                })  
                let checkProducts=exitsProducts.filter(exits => exits.inventory.available <= 0);
                cart.line_items.map(item=>{
                    const find = checkProducts.find(check => check.id === item.product_id)
                    if(find){
                        handleRemoveFromCart(item.id)
                        console.log("delete page cart "+item.id)
                    }
                })  
            }
        }else{
            console.log(cart)
            console.log("not have")
        }
    }else{
        console.log("isEmpty")
    }
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
