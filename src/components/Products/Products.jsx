import React, { useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core'
import Product from '../Product/Product'
import useStyles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../../actions/productActions'
import LoadingProduct from '../loadingProduct/LoadingProduct'


const Products = () => {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const { loading, products } = productList
    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])
    const checkProducts = products.filter(product => product.inventory.available > 0)
    const classes = useStyles();
    return (
        <main className={classes.content} id="products">
            <div className={classes.toolbar} />
            <Typography variant="h3" className={classes.title}>
                สินค้าของเรา
            </Typography>
            
                    <div className={classes.toolbar} />
                    <Grid container justify="center" spacing={4}>
                        {!loading ? checkProducts.map(product => (
                            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                                <Product product={product} />
                            </Grid>
                        )):(
                            Array.from(new Array(3)).map((index) => (
                                <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                                    <LoadingProduct/>
                                </Grid>
                            )) 
                        
                        )}
                    </Grid>

        </main>
    )
}

export default Products