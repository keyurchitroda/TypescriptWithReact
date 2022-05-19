import { createStore, combineReducers, applyMiddleware } from "redux";
import loginReducer from "./auth";
import productReducer from "./product";
import thunk from "redux-thunk";

const rootreducer = combineReducers({
  auth: loginReducer,
  product: productReducer,
});

const store = createStore(rootreducer, applyMiddleware(thunk));

export default store;
