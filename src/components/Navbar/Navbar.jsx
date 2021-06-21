import { AppBar, Badge, CircularProgress, IconButton, Toolbar, Typography } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'
import React, { useEffect } from 'react'
import logo from '../../assets/commerce.png'
import {Link,useLocation} from 'react-router-dom'
import useStyles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { retrieveCart } from '../../actions/cartActions'

const Navbar = () => {
    const dispatch = useDispatch()
    const cartRetrieve = useSelector(state => state.cartRetrieve);
    const {loading,loadingAdd,cart} = cartRetrieve;
    const classes = useStyles();
    const location = useLocation()
    useEffect(() => {
        dispatch(retrieveCart())
    }, [dispatch])
    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="Commerce.js" height="25px" className={classes.image}/>
                        Pontina Wapipatum
                    </Typography>
                    <div className={classes.grow}/>
                    {location.pathname === '/' &&(
                        <div className={classes.button}>
                            <IconButton component={Link} to="/cart" aria-label="Show cart items" color='inherit'>
                                <Badge badgeContent={
                                    loading || loadingAdd ?<CircularProgress size={10} color="white"/> :cart.total_items
                                } color="secondary">
                                    <ShoppingCart/>
                                </Badge>
                            </IconButton>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
