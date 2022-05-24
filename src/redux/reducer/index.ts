import { createStore, combineReducers, applyMiddleware } from "redux";
import loginReducer from "./auth";
import productReducer from "./product";
import cartReducer from "./cart";
import myorderReducer from "./myorder";
import categoryReducer from "./category";
import thunk from "redux-thunk";

let items: any = JSON.parse(localStorage.getItem("cartItems") as any);

const cartItems: any = localStorage.getItem("cartItems") ? items : [];

const rootreducer = combineReducers({
  auth: loginReducer,
  product: productReducer,
  cartReducer: cartReducer,
  myOrder: myorderReducer,
  AllCategory: categoryReducer,
});

const initialState: any = {
  cartReducer: {
    cartItems: cartItems,
  },
};

const store = createStore(rootreducer, initialState, applyMiddleware(thunk));

export default store;
