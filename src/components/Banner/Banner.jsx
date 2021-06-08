import { ThemeProvider,createMuiTheme,Box, Button } from '@material-ui/core'
import React from 'react'
import useStyles from './styles'
const theme =  createMuiTheme({
    palette:{
        primary:{
            main:"#fff"
        },
        secondary: {
            main: "#ffa500"
        }
    }
})
const Banner = () => {
    const classes = useStyles()
    return (
    <>
    
    <Box width="100%" className={classes.hero}>
        <Box>Welcome to Pontina Shop</Box>
        <ThemeProvider theme={theme}>
            <Button type="button" className={classes.btn} variant="contained" type="button" size='large' color='secondary' href="#products">เลือกซื้อสินค้า</Button>
        </ThemeProvider>
    </Box>
    </>
    )
}

export default Banner
