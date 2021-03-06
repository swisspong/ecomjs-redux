import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { cartRetrieveReducer } from "./reducers/cartReducer";
import { checkoutTokenReducer } from "./reducers/checkoutTokenReducer";
import { checkoutReducer } from "./reducers/checkoutReducer";
import { formReducer } from "./reducers/formReducer";
import { productListReducer } from "./reducers/productReducer";
const reducer = combineReducers({
    productList:productListReducer,
    cartRetrieve: cartRetrieveReducer,
    checkoutTokenCart:checkoutTokenReducer,
    formPosition:formReducer,
    checkout:checkoutReducer
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