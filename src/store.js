import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { cartRetrieveReducer } from "./reducers/cartReducer";
import { checkoutReducer } from "./reducers/checkoutReducer";
import { productListReducer } from "./reducers/productReducer";
const reducer = combineReducers({
    productList:productListReducer,
    cartRetrieve: cartRetrieveReducer,
    checkoutToken:checkoutReducer
})
const initialState ={

}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store