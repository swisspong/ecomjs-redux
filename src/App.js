import React from 'react'
import {Products,Navbar,Cart,Checkout, Banner} from './components'
import {BrowserRouter as Router,Switch ,Route} from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'

const App = () => {
    
    return (
        <Router>
            <div>
                <Navbar/>
                <CssBaseline/>
                <Switch>
                    <Route exact path='/'>
                        <Banner/>
                        <Products/>
                    </Route>
                    <Route exact path='/cart'>
                        <Cart/>
                    </Route>
                    <Route exact path='/checkout'> 
                        <Checkout />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App
